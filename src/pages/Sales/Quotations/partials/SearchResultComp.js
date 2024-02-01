import classnames from "classnames";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { filter_icon } from "../../../../assets/images";
import FilterSalesComp from "../../partials/FilterSalesComp";
import SearchResultCard from './SearchResultCard';
import ResultCardSkeleton from "../../../Skeleton/ResultCardSkeleton";
import FilterSearchResult from "../../partials/FilterSearchResult";
import { useDispatch } from "react-redux";
import { CLEAR_SEARCH_RESULT_FILTER, SEARCH_RESULT_FILTER_UPDATE } from "../../../../store/InstantRate/actionType";

const SearchResultComp = ({ QuoteModalHandler, searchResult }) => {
    const [activeTab, setactiveTab] = useState("all");
    const [isRight, setIsRight] = useState(false);
    const [filterLoader, setFilterLoader] = useState(false);
    const inputArr = {
        carriers: [],
        agents: [],
        validity: [],
        charge_currency: "INR",
        charges: ['ORIGIN_INLAND_CHARGES', 'ORIGIN_LOCAL_PORT_CHARGES', 'FREIGHT_CHARGES', 'DESTINATION_LOCAL_PORT_CHARGES', 'DESTINATION_INLAND_CHARGES'],
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const resultData = useSelector((state) => state?.sales?.quotation_result_data);
    // const quote_Selected = useSelector((state) => state.instantRate.quote_selected_data);
    const { quote_selected_data, result_loader, instantSearchResultCopy } = useSelector((state) => state.instantRate);
    const dispatch = useDispatch();

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
        console.log(filterDetails, "filterDetails Quotation Result-----------------------");
        setFilterLoader(true);
        // setTimeout(() => {
            setIsRight(false);
            setFilterLoader(false);            
            dispatch({ type: SEARCH_RESULT_FILTER_UPDATE, payload: { obj: filterDetails?.charges } });
        // }, 5000);
    }

    const clearValueHandler = () => {
        setFilterLoader(true);
        // setTimeout(() => {
            setFilterLoader(false);            
            setfilterDetails(inputArr)
            dispatch({ type: CLEAR_SEARCH_RESULT_FILTER });
        // }, 5000);
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
                        disabled={quote_selected_data?.length === 0}>Quote Now</button>}
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
                {/* {result_loader ? } */}
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
            <FilterSearchResult isRight={isRight} filterLoader={filterLoader} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}

export default SearchResultComp
