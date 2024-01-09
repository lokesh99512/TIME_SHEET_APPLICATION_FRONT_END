import classnames from "classnames";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { filter_icon } from "../../../../assets/images";
import FilterSalesComp from "../../partials/FilterSalesComp";
import SearchResultCard from './SearchResultCard';

const SearchResultComp = ({ QuoteModalHandler, searchResult }) => {
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
    const quote_Selected = useSelector((state) => state.instantRate.quote_selected_data);
    const {instantSearchResult, instantSearchResultCopy} = useSelector((state) => state?.instantRate);
    // console.log(resultsDataOr, "resultsDataOr");

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
        console.log(filterDetails, "filterDetails Quotation Result-----------------------");
    }

    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    const getResultCount = () => {
        let filteredResults = instantSearchResultCopy || [];
      
        // if (activeTab === 'preferred') {
        //   filteredResults = resultData?.filter(item => item?.quote_type === 'preffered');
        // } else if (activeTab === 'cheaper') {
        //   filteredResults = resultData?.filter(item => item?.quote_type === 'cheaper');
        // } else if (activeTab === 'faster') {
        //   filteredResults = resultData?.filter(item => item?.quote_type === 'faster');
        // }
      
        return filteredResults?.length || 0;
    };

    return (
        <>
            <div className="search_result_wrap">
                <div className="length_wrap">
                    <span>{getResultCount()} Search Results</span>
                    
                    {searchResult && <button type="button" className='btn btn-primary ms-auto quote_btn' onClick={QuoteModalHandler} 
                             disabled={quote_Selected?.length === 0}>Quote Now</button>}
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
                    <SearchResultCard data={instantSearchResultCopy} QuoteModalHandler={QuoteModalHandler} />
                ) : activeTab === 'preferred' ? (
                    <SearchResultCard data={instantSearchResultCopy} QuoteModalHandler={QuoteModalHandler} />
                ) : activeTab === "cheaper" ? (
                    <SearchResultCard data={instantSearchResultCopy} QuoteModalHandler={QuoteModalHandler} />
                ) : (
                    <SearchResultCard data={instantSearchResultCopy} QuoteModalHandler={QuoteModalHandler} />
                    // <SearchResultCard data={resultData?.filter(item => item?.quote_type === 'faster')} QuoteModalHandler={QuoteModalHandler} />
                )}
            </div>
            {/* Filter Modal */}
            <FilterSalesComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}

export default SearchResultComp
