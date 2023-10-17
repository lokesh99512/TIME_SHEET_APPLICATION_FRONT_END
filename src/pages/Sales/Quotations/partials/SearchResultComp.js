import React, { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from "classnames";
import SearchResultCard from './SearchResultCard';
import { useSelector } from 'react-redux';
import QuotationModalComp from './QuotationModalComp';

const SearchResultComp = ({QuoteModalHandler}) => {
    const [activeTab, setactiveTab] = useState("preferred");
    const [prefferedData, setPrefferedData] = useState([]);
    const [cheaperData, setCheaperData] = useState([]);
    const [fasterData, setFasterData] = useState([]);
    const data = useSelector((state) => state?.sales?.quotation_result_data);
    const navToggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    useEffect(() => {
        data?.map((item) => {
            if(item.quote_type === 'preffered'){
                return setPrefferedData([...prefferedData,item]);
            } 
            if(item.quote_type === 'cheaper'){
                return setCheaperData([...cheaperData,item]);
            } 
            if(item.quote_type === 'faster'){
                return setFasterData([...fasterData,item]);
            } 
        })
    },[data]);
    return (
        <>
            <div className="search_result_wrap">
                <div className="length_wrap">
                    <span>{data?.length} Search Results</span>
                </div>
                <div className="result_tab_wrap">
                    <Nav pills className="navtab-bg nav-justified">
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
                    </Nav>
                </div>

                {activeTab === 'preferred' ? (
                    <SearchResultCard data={data} QuoteModalHandler={QuoteModalHandler} />
                ) : activeTab === "cheaper" ? (
                    <SearchResultCard data={data} QuoteModalHandler={QuoteModalHandler} />
                ) : (
                    <SearchResultCard data={data} QuoteModalHandler={QuoteModalHandler} />
                )}
            </div>

            {/* Quotation Modal */}
            {/* <QuotationModalComp quoteModal={quoteModal} setQuoteModal={setQuoteModal} QuoteModalHandler={QuoteModalHandler} quoteModalId={quoteModalId} /> */}
        </>
    )
}

export default SearchResultComp
