import classnames from "classnames";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { filter_icon } from "../../../../assets/images";
import FilterSalesComp from "../../partials/FilterSalesComp";
import SearchResultCard from './SearchResultCard';

const SearchResultComp = ({QuoteModalHandler}) => {
    const [activeTab, setactiveTab] = useState("all");
    const [isRight, setIsRight] = useState(false);
    const inputArr = {
        priceRange: [],
        expiration_date: [],
        containerradio: '',
        destport: '',
        vendorradio: '',
        pickup: false,
        port_origin: false,
        ocean_freight: false,
        port_discharge: false,
        delivery: false,
        shipping_cma: false,
        shipping_msc: false,
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const resultData = useSelector((state) => state?.sales?.quotation_result_data);

    const navToggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

     // right filter sidebar 
     const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        console.log(filterDetails,"filterDetails Quotation Result-----------------------");
    }

    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    return (
        <>
            <div className="search_result_wrap">
                <div className="length_wrap">
                    <span>{activeTab === 'all' ? resultData?.length : activeTab === 'preferred' ? 
                    resultData?.filter(item => item?.quote_type === 'preffered')?.length : 
                    activeTab === 'cheaper' ? resultData?.filter(item => item?.quote_type === 'cheaper')?.length :
                    activeTab === 'faster' ? resultData?.filter(item => item?.quote_type === 'faster')?.length : 0} Search Results</span>
                </div>
                <div className="result_tab_wrap">
                    <Nav pills className="navtab-bg nav-justified">
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === 'all', })} onClick={() => { navToggle("all"); }} >
                                All
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === 'preferred', })} onClick={() => { navToggle("preferred"); }} >
                                Preferred
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === "cheaper", })} onClick={() => { navToggle("cheaper"); }} >
                                Cheaper
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === "faster", })} onClick={() => { navToggle("faster"); }} >
                                Faster
                            </NavLink>
                        </NavItem>
                        <NavItem className="filter_wrap">
                            <NavLink onClick={() => { toggleRightCanvas(); }} >
                                <img src={filter_icon} alt="filter" />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>

                {activeTab === 'all' ? (
                    <SearchResultCard data={resultData} QuoteModalHandler={QuoteModalHandler} />
                ) : activeTab === 'preferred' ? (
                    <SearchResultCard data={resultData?.filter(item => item?.quote_type === 'preffered')} QuoteModalHandler={QuoteModalHandler} />
                ) : activeTab === "cheaper" ? (
                    <SearchResultCard data={resultData?.filter(item => item?.quote_type === 'cheaper')} QuoteModalHandler={QuoteModalHandler} />
                ) : (
                    <SearchResultCard data={resultData?.filter(item => item?.quote_type === 'faster')} QuoteModalHandler={QuoteModalHandler} />
                )}
            </div>
            {/* Filter Modal */}
            <FilterSalesComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}

export default SearchResultComp
