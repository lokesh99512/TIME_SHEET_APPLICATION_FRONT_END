import classnames from "classnames";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import SearchResultCard from './SearchResultCard';

const SearchResultComp = ({QuoteModalHandler}) => {
    const [activeTab, setactiveTab] = useState("preferred");
    // const [prefferedData, setPrefferedData] = useState([]);
    // const [cheaperData, setCheaperData] = useState([]);
    // const [fasterData, setFasterData] = useState([]);
    const prefferedData = useSelector((state) => state?.sales?.quotation_result_prefData);
    const cheaperData = useSelector((state) => state?.sales?.quotation_result_cheapData);
    const fasterData = useSelector((state) => state?.sales?.quotation_result_fasterData);

    const navToggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    // useEffect(() => {
    //     setPrefferedData([]);
    //     setCheaperData([]);
    //     setFasterData([]);
    //     data?.map((item) => {
    //         if(item?.quote_type === 'preffered'){
    //             return setPrefferedData([...prefferedData,item]);
    //         } 
    //         if(item?.quote_type === 'cheaper'){
    //             return setCheaperData([...cheaperData,item]);
    //         } 
    //         if(item?.quote_type === 'faster'){
    //             return setFasterData([...fasterData,item]);
    //         } 
    //     })
    // },[data]);

    

    return (
        <>
            <div className="search_result_wrap">
                <div className="length_wrap">
                    <span>{prefferedData?.length + cheaperData?.length + fasterData?.length} Search Results</span>
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
                    <SearchResultCard data={prefferedData} QuoteModalHandler={QuoteModalHandler} />
                ) : activeTab === "cheaper" ? (
                    <SearchResultCard data={cheaperData} QuoteModalHandler={QuoteModalHandler} />
                ) : (
                    <SearchResultCard data={fasterData} QuoteModalHandler={QuoteModalHandler} />
                )}
            </div>
        </>
    )
}

export default SearchResultComp
