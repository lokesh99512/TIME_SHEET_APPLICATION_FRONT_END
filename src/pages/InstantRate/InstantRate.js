import classnames from "classnames";
import React from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useState } from 'react';

import SearchForm from './SearchForm';
import { useSelector } from "react-redux";
import { getSalesQuotationResultData, getSalesQuotationResultData1, getSalesQuotationResultData2, getSalesQuotationResultData3 } from "../../store/Sales/actions";
import SearchResultComp from "../Sales/Quotations/partials/SearchResultComp";
import { useDispatch } from "react-redux";
import QuotationModalComp from "../Sales/Quotations/partials/QuotationModalComp";
import PreviewQuotationModal from "../Sales/Quotations/partials/PreviewQuotationModal";
import { ADD_OBJECT_INSTANT_SEARCH, REMOVE_OBJECT_INSTANT_SEARCH } from "../../store/InstantRate/actionType";

const InstantRate = () => {
    const [activeTab, toggleTab] = useState("FCL");
    const [searchResult, setSearchResult] = useState(false);
    const searchData = useSelector((state) => state?.instantRate?.searchForm);
    const [quoteModal, setQuoteModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const dispatch = useDispatch();

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    function QuoteModalHandler() {
        setQuoteModal(!quoteModal);
        removeBodyCss();
    }

    const showSearchResultHandler = () => {
        console.log(searchData, "searchForm------------------------------------")
        console.log(activeTab, "activeTab------------------------------------")

        setSearchResult(true);
        if (searchData?.location_from?.address?.value === "INMAA" && searchData?.location_to?.address?.value === "BDDAC") {
            console.log("search1")
            dispatch(getSalesQuotationResultData1());
        } else if (searchData?.location_from?.address?.value === "BLRICD" && searchData?.location_to?.address?.value === "DHAKAICD") {
            console.log("search2")
            dispatch(getSalesQuotationResultData2());
        } else if (searchData?.location_from?.address?.value === "BLRICD" && searchData?.location_to?.address?.value === "JAKARTAICD") {
            console.log("search3")
            dispatch(getSalesQuotationResultData3());
        } else {
            dispatch(getSalesQuotationResultData());
        }
    }

    // Preview Modal
    const previewModalHand = () => {
        setPreviewModal(!previewModal);
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="create_sales_wrapper instant_rate_wrapper">
                        {/* --------------------------tabs------------------------------- */}
                        <Nav className="nav-tabs-custom card-header-tabs border-bottom mb-3">
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === "FCL", }, "px-3 py-2")}
                                    onClick={() => { toggleTab("FCL"); dispatch({type: REMOVE_OBJECT_INSTANT_SEARCH, payload: 'shipment_details'}) }}>
                                    <i className='bx bx-cube mx-1'></i>
                                    FCL</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === "LCL", }, "px-3 py-2")}
                                    onClick={() => { toggleTab("LCL"); dispatch({type: ADD_OBJECT_INSTANT_SEARCH, payload: 'shipment_details'}) }}
                                ><i className='bx bx-package mx-1'></i>LCL</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === "Air", }, "px-3 py-2")}
                                    onClick={() => { toggleTab("Air"); dispatch({type: ADD_OBJECT_INSTANT_SEARCH, payload: 'shipment_details'}) }}
                                ><i className='bx bx-rocket mx-1'></i>Air</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === "Land", }, "px-3 py-2")}
                                    onClick={() => { toggleTab("Land"); dispatch({type: ADD_OBJECT_INSTANT_SEARCH, payload: 'shipment_details'}) }}
                                ><i className='bx bx-train mx-1'></i>Land</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId={activeTab}>
                                <SearchForm activeTab={activeTab} searchQuoteHandler={showSearchResultHandler} />
                            </TabPane>
                        </TabContent>
                        {/* --------------------------tabs------------------------------- */}

                        {/* Search Result */}
                        {searchResult && (
                            <SearchResultComp QuoteModalHandler={QuoteModalHandler} searchResult={searchResult} />
                        )}
                    </div>
                </Container>
            </div>

            {/* Quotation Modal */}
            {quoteModal && <QuotationModalComp quoteModal={quoteModal} setQuoteModal={setQuoteModal} QuoteModalHandler={QuoteModalHandler} setPreviewModal={setPreviewModal} />}

            {/* Preview Quotation Modal */}
            {previewModal && <PreviewQuotationModal previewModal={previewModal} previewModalHand={previewModalHand} setPreviewModal={setPreviewModal} QuoteModalHandler={QuoteModalHandler} />}
        </>
    )
}

export default InstantRate
