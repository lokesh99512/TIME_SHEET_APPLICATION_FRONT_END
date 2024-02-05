import classnames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';


import { ADD_OBJECT_INSTANT_SEARCH, BLANK_INSTANT_SEARCH, QUOTATION_RESULT_SELECTED_BLANK, REMOVE_OBJECT_INSTANT_SEARCH } from "../../../store/InstantRate/actionType";
import CustomerFclFreight from "./CustomerRatesTabs/FclFreight";
import CustomerFclPortLocal from "./CustomerRatesTabs/FclPortLocal";
import CustomerFclInaland from "./CustomerRatesTabs/FclInalnd";

const CustomerRates = () => {
    const [mainactiveTab, setMainactiveTab] = useState("ocean_freight");
    const [activeTab, toggleTab] = useState("FCL_FREIGHT");
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

    // const showSearchResultHandler = () => {
    //     console.log(searchData, "searchForm------------------------------------")
    //     console.log(activeTab, "activeTab------------------------------------")
    //     let dateFrom = moment(searchData?.cargo_date?.[0]).format("YYYY-MM-DD");
    //     let dateTo = moment(searchData?.cargo_date?.[1]).format("YYYY-MM-DD");
    //     let data = {
    //         fclInquiryField: {
    //             customerId: searchData?.customerName?.value || null,
    //             findAlternativeRoute: searchData?.alternate_route,
    //             originLocationTypeId: searchData?.location_from?.locationType || null,
    //             destinationLocationTypeId: searchData?.location_to?.locationType || null,

    //             ...(searchData?.location_from?.locationType === "PORT" ? {
    //                 "originPortId": searchData?.location_from?.value || null,
    //             } : searchData?.location_from?.locationType === "CITY" ? {
    //                 "originCityId": searchData?.location_from?.value || null,
    //             } : searchData?.location_from?.locationType === "ICD" ? {
    //                 "originIcdId": searchData?.location_from?.value || null,
    //             } : ''),

    //             ...(searchData?.location_to?.locationType === "PORT" ? {
    //                 "destinationPortId": searchData?.location_to?.value || null,
    //             } : searchData?.location_to?.locationType === "CITY" ? {
    //                 "destinationCityId": searchData?.location_to?.value || null,
    //             } : searchData?.location_to?.locationType === "ICD" ? {
    //                 "destinationIcdId": searchData?.location_to?.value || null,
    //             } : ''),

    //             cargoDateFrom: dateFrom || null,
    //             cargoDateTo: dateTo || null,
    //             cargoTypeId: searchData?.cargo_type?.id || null,
    //             cargoValue: searchData?.cargo_value?.value || 0,
    //             cargoWeight: searchData?.container_type?.cargo_weight?.value || 0,
    //             cargoWeightUOMId: searchData?.container_type?.cargo_weight?.weight?.id || null,
    //             intercomId: searchData?.incoterm?.value || null,
    //             containerDetails: (searchData?.container_type?.containerArray || [])
    //                 .map((data) => (
    //                     data?.unitNew !== 0
    //                         ? {
    //                             id: data?.id,
    //                             size: data?.size,
    //                             noOfUnits: data?.unitNew
    //                         }
    //                         : null
    //                 ))
    //                 .filter(Boolean)
    //         }
    //     }

    //     console.log(data, "data");

    //    // dispatch(postInstantSearchAction(data));
    //     setSearchResult(true);
    // }

    // Preview Modal
    const previewModalHand = () => {
        setPreviewModal(!previewModal);
    }

    // useEffect(() => {
    //     dispatch({ type: GET_CARGO_TYPE_DATA });
    //     dispatch({ type: GET_CONTAINER_DATA });
    //     dispatch({ type: GET_UOM_WEIGHT_DATA });
    //     dispatch(getAllCompanyDetailData());
    //     dispatch({ type: BLANK_MODAL_CHARGE, payload: {} });
    //     dispatch({ type: QUOTATION_RESULT_SELECTED_BLANK, payload: {} });
    //     dispatch({ type: BLANK_INSTANT_SEARCH });
    // }, []);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="create_sales_wrapper instant_rate_wrapper">
                        <div>
                            <h5>Select Customer</h5>
                        </div>
                        <div className="row align-items-center mb-3" >
                            <div className="col-12 col-md-3">
                                <div className="position-relative align-items-center d-flex">
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search"
                                    />
                                    <button className="btn" type="button">
                                        <i className="bx bx-search-alt-2 align-middle"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-9 d-flex justify-content-end main_tab_wrap">
                                <button
                                    type="button"
                                    className={`btn d-flex align-items-center ${mainactiveTab === "ocean_freight" ? "active" : ""}`}
                                    onClick={() => { setMainactiveTab("ocean_freight"); toggleTab("FCL_FREIGHT"); }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M18.1759 8.02297C18.1697 7.12967 16.9554 6.42834 15.4618 6.42834H12.3524C11.9267 6.42834 11.7704 6.35469 11.5162 6.0695L6.37672 0.516913C6.21351 0.335065 6.01651 0.244141 5.7892 0.244141H4.82435C4.62598 0.244141 4.51096 0.419776 4.61083 0.631932L7.26384 6.42289L3.38062 6.86102L1.99555 4.37952C1.89432 4.18873 1.7249 4.10538 1.47895 4.10538H1.14086C0.93704 4.10538 0.800049 4.24101 0.800049 4.44483V11.6012C0.800049 11.8036 0.93704 11.9344 1.14086 11.9344H1.47895C1.7249 11.9344 1.89432 11.8497 1.99555 11.6665L3.38062 9.18499L7.26384 9.62175L4.61083 15.4127C4.51096 15.6186 4.62598 15.8019 4.82435 15.8019H5.7892C6.01651 15.8019 6.21351 15.7047 6.37672 15.5291L11.5162 9.9689C11.7704 9.68997 11.9267 9.61768 12.3524 9.61768H15.4618C16.9554 9.61768 18.1697 8.91014 18.1759 8.02297Z" fill="#6264A0" />
                                    </svg>
                                    Ocean Freight
                                </button>
                                <button
                                    type="button"
                                    className={`btn d-flex align-items-center ms-3 ${mainactiveTab === "air_freight" ? "active" : ""}`}
                                    onClick={() => { setMainactiveTab("air_freight"); toggleTab("dom_air"); }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                                    <path d="M18.1759 8.02297C18.1697 7.12967 16.9554 6.42834 15.4618 6.42834H12.3524C11.9267 6.42834 11.7704 6.35469 11.5162 6.0695L6.37672 0.516913C6.21351 0.335065 6.01651 0.244141 5.7892 0.244141H4.82435C4.62598 0.244141 4.51096 0.419776 4.61083 0.631932L7.26384 6.42289L3.38062 6.86102L1.99555 4.37952C1.89432 4.18873 1.7249 4.10538 1.47895 4.10538H1.14086C0.93704 4.10538 0.800049 4.24101 0.800049 4.44483V11.6012C0.800049 11.8036 0.93704 11.9344 1.14086 11.9344H1.47895C1.7249 11.9344 1.89432 11.8497 1.99555 11.6665L3.38062 9.18499L7.26384 9.62175L4.61083 15.4127C4.51096 15.6186 4.62598 15.8019 4.82435 15.8019H5.7892C6.01651 15.8019 6.21351 15.7047 6.37672 15.5291L11.5162 9.9689C11.7704 9.68997 11.9267 9.61768 12.3524 9.61768H15.4618C16.9554 9.61768 18.1697 8.91014 18.1759 8.02297Z" fill="#6264A0" />
                                    </svg>
                                    Air Freight
                                </button>
                            </div>
                        </div>



                        {/* --------------------------tabs------------------------------- */}
                        <Nav className="nav-tabs-custom card-header-tabs border-bottom mb-3">
                            {mainactiveTab === "ocean_freight" ? (
                                <React.Fragment>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: activeTab === "FCL_FREIGHT", }, "px-3 py-2")}
                                            onClick={() => { toggleTab("FCL_FREIGHT"); }}>
                                            <i className='bx bx-cube mx-1'></i>
                                            FCL Freight</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: activeTab === "FCL_PORT", }, "px-3 py-2")}
                                            onClick={() => { toggleTab("FCL_PORT"); }}
                                        ><i className='bx bx-package mx-1'></i>Fcl Port & Local</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: activeTab === "FCL_LAND", }, "px-3 py-2")}
                                            onClick={() => { toggleTab("FCL_LAND"); }}
                                        ><i className='bx bx-train mx-1'></i>Fcl InLand</NavLink>
                                    </NavItem>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: activeTab === "DOM_MAWB_FREIGHT", }, "px-3 py-2")}
                                            onClick={() => { toggleTab("DOM_MAWB_FREIGHT") }}
                                        >  <i className='bx bx-cube mx-1'></i>DOM-MAWB FREIGHT</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: activeTab === "DOM_CONSOL_FREIGHT", }, "px-3 py-2")}
                                            onClick={() => { toggleTab("DOM_CONSOL_FREIGHT"); }}
                                        ><i className='bx bx-rocket mx-1'></i>DOM-CONSOL FREIGHT</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: activeTab === "DOM_AIRPORT_CHARGES", }, "px-3 py-2")}
                                            onClick={() => { toggleTab("DOM_AIRPORT_CHARGES"); }}
                                        ><i className='bx bx-train mx-1'></i>DOM-AIRPORT CHARGES</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: activeTab === "DOM_AIRLINE_SURCHARGES", }, "px-3 py-2")}
                                            onClick={() => { toggleTab("DOM_AIRLINE_SURCHARGES"); }}
                                        ><i className='bx bx-cog mx-1'></i>DOM-AIRLINE SURCHARGES</NavLink>
                                    </NavItem>
                                </React.Fragment>
                            )}
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId='FCL_FREIGHT'>
                                <CustomerFclFreight />
                            </TabPane>
                            <TabPane tabId='FCL_PORT'>
                                <CustomerFclPortLocal />
                            </TabPane>
                            <TabPane tabId='FCL_LAND'>
                                <CustomerFclInaland />
                            </TabPane>
                            <TabPane tabId='DOM_MAWB_FREIGHT'>
                                
                            </TabPane>
                            <TabPane tabId='DOM_AIRPORT_CHARGES'>
 
                            </TabPane>
                            <TabPane tabId='DOM_CONSOL_FREIGHT'>
                               
                            </TabPane>
                            <TabPane tabId='DOM_AIRLINE_SURCHARGES'>
                           
                            </TabPane>
                        </TabContent>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default CustomerRates
