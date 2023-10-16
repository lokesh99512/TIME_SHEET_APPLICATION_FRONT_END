import React, { useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from "classnames";
import SearchResultCard from './SearchResultCard';
import { useSelector } from 'react-redux';
import QuotationModalComp from './QuotationModalComp';

const SearchResultComp = () => {
    const [activeTab, setactiveTab] = useState("preferred");
    const [quoteModal, setQuoteModal] = useState(false);
    const [quoteModalId, setQuoteModalId] = useState(false);
    const data = useSelector((state) => state?.sales?.quotation_result_data);
    const navToggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    function removeBodyCss() {
        document.body.classList.add("no_padding");
      }

    function QuoteModalHandler(id) {
        setQuoteModalId(id);
        setQuoteModal(!quoteModal);
        removeBodyCss();
    }
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
                    <SearchResultCard data={data} />
                ) : (
                    <SearchResultCard data={data} />
                )}
            </div>

            {/* Quotation Modal */}
            <QuotationModalComp quoteModal={quoteModal} setQuoteModal={setQuoteModal} QuoteModalHandler={QuoteModalHandler} quoteModalId={quoteModalId} />
        </>
    )
}

export default SearchResultComp
