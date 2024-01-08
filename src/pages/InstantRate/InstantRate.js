import classnames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { useDispatch, useSelector } from "react-redux";
import { GET_CARGO_TYPE_DATA, GET_CONTAINER_DATA, GET_UOM_WEIGHT_DATA } from "../../store/Global/actiontype";
import { ADD_OBJECT_INSTANT_SEARCH, REMOVE_OBJECT_INSTANT_SEARCH } from "../../store/InstantRate/actionType";
import { postInstantSearchAction } from "../../store/InstantRate/actions";
import { getSalesQuotationResultData, getSalesQuotationResultData1, getSalesQuotationResultData2, getSalesQuotationResultData3 } from "../../store/Sales/actions";
import PreviewQuotationModal from "../Sales/Quotations/partials/PreviewQuotationModal";
import QuotationModalComp from "../Sales/Quotations/partials/QuotationModalComp";
import SearchResultComp from "../Sales/Quotations/partials/SearchResultComp";
import SearchForm from './SearchForm';

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
        let dateFrom = moment(searchData?.cargo_date?.[0]).format("YYYY-MM-DD");
        let dateTo = moment(searchData?.cargo_date?.[1]).format("YYYY-MM-DD");
        let data = {
            fclInquiryField: {
                customerId: searchData?.customerName || null,
                ...(searchData?.location_from?.locationType === "PORT" ? {
                    "originPortId": searchData?.location_from?.value || null,
                } : searchData?.location_from?.locationType === "CITY" ? {
                    "originCityId": searchData?.location_from?.value || null,
                } : searchData?.location_from?.locationType === "ICD" ? {
                    "originIcdId": searchData?.location_from?.value || null,
                } : ''),

                ...(searchData?.location_to?.locationType === "PORT" ? {
                    "destinationPortId": searchData?.location_to?.value || null,
                } : searchData?.location_to?.locationType === "CITY" ? {
                    "destinationCityId": searchData?.location_to?.value || null,
                } : searchData?.location_to?.locationType === "ICD" ? {
                    "destinationIcdId": searchData?.location_to?.value || null,
                } : ''),
                cargoDateFrom: dateFrom || null,
                cargoDateTo: dateTo || null,
                cargoTypeId: searchData?.cargo_type?.id || null,
                cargoValue: searchData?.cargo_value?.value || 0,
                cargoWeight: searchData?.container_type?.cargo_weight?.value || 0,
                cargoWeightUOMId: searchData?.container_type?.cargo_weight?.weight?.id || null,
                intercomId: searchData?.incoterm || null,
                containerDetails: searchData?.container_type?.containerArray?.map((data) => {
                    return {
                        id: data?.id,
                        size: data?.size,
                        noOfUnits: data?.unitNew
                    }
                }) || null
            }
        }

        console.log(data,"data");

        dispatch(postInstantSearchAction(data));

        setSearchResult(true);
        // if (searchData?.location_from?.address?.value === "INMAA" && searchData?.location_to?.address?.value === "BDDAC") {
        //     console.log("search1")
        //     dispatch(getSalesQuotationResultData1());
        // } else if (searchData?.location_from?.address?.value === "BLRICD" && searchData?.location_to?.address?.value === "DHAKAICD") {
        //     console.log("search2")
        //     dispatch(getSalesQuotationResultData2());
        // } else if (searchData?.location_from?.address?.value === "BLRICD" && searchData?.location_to?.address?.value === "JAKARTAICD") {
        //     console.log("search3")
        //     dispatch(getSalesQuotationResultData3());
        // } else {
        //     dispatch(getSalesQuotationResultData());
        // }
    }

    // Preview Modal
    const previewModalHand = () => {
        setPreviewModal(!previewModal);
    }

    useEffect(() => {
        dispatch({type: GET_CARGO_TYPE_DATA});
        dispatch({type: GET_CONTAINER_DATA});
        dispatch({type: GET_UOM_WEIGHT_DATA});
    },[]);

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
