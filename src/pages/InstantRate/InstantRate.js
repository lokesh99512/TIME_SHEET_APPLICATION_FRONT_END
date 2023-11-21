import React from 'react'
import classnames from "classnames";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown, NavLink, Card, CardBody, TabContent, TabPane } from 'reactstrap'

import Flatpickr from "react-flatpickr";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { calendar_filled, cube_filled, filter_icon, location_filled, swap_arrow } from '../../assets/images';
import SearchForm from './SearchForm';

const optionPortList = [
    {value: 'INMAA', label:'INMAA'},
    {value: 'INKTP', label:'INKTP'},
    {value: 'BDDAC', label:'BDDAC'},
    {value: 'IDSUB', label:'IDSUB'},
    {value: 'BLRICD', label:'BLR ICD'},
    {value: 'DHAKAICD', label:'DHAKA ICD'},
    {value: 'JAKARTAICD', label:'JAKARTA ICD'},
]

const optionIncoterm = [
    {value: "CPT", label: 'Carraige Paid To(CPT)'},
    {value: "CFR", label: 'Cost & Freight(CFR)'},
    {value: "CIF", label: 'Cost Insurance and Freight(CIF)'},
    {value: "CIP", label: 'Carraige and Insurance Paid To(CIP)'},
    {value: "DAP", label: 'Delivery at Place(DAP)'},
    {value: "DAT", label: 'Delivery At Terminal(DAT)'},
    {value: "DDU", label: 'Delivery Duty Unpaid(DDU)'},
    {value: "DPU", label: 'Delivered At Place Unploaded(DPU)'},
    {value: "EXW", label: 'EX Works(EXW)'},
]

const InstantRate = () => {
    const [activeTab, toggleTab] = useState("FCL");
    const [searchView, setSearchView] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [searchResult, setSearchResult] = useState(false);
    const [unitValue, setUnitValue] = useState({
        _standard1: 0,
        _standard2: 0,
        _high_cube1: 0,
        _high_cube2: 0,
        _refrigerated1: 0,
        _refrigerated2: 0,
    })
    const createFields = useSelector((state) => state?.sales?.createFields);
    const resultData = useSelector((state) => state?.sales?.quotation_result_data);


    const swapHandler = () => {}
    const handleDateChnage = () => {}
    const navToggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

  return (
    <>
            <div className="page-content">
                <Container fluid>
                    <div className="create_sales_wrapper instant_rate_wrapper">

                        {/* --------------------------tabs------------------------------- */}
                        <Card>
                        <CardBody>
                            <Nav className="nav-tabs-custom card-header-tabs">
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({
                                            active: activeTab === "FCL",
                                        }, "px-3")}
                                        onClick={() => {
                                            toggleTab("FCL")
                                        }}>
                                            <i className='bx bx-cube mx-1'></i>
                                        FCL</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({
                                            active: activeTab === "LCL",
                                        }, "px-3")}
                                        onClick={() => {
                                            toggleTab("LCL")
                                        }}
                                    ><i className='bx bx-package mx-1'></i>LCL</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({
                                            active: activeTab === "Air",
                                        }, "px-3")}
                                        onClick={() => {
                                            toggleTab("Air")
                                        }}
                                    ><i className='bx bx-rocket mx-1'></i>Air</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({
                                            active: activeTab === "Land",
                                        }, "px-3")}
                                        onClick={() => {
                                            toggleTab("Land")
                                        }}
                                    ><i className='bx bx-train mx-1'></i>Land</NavLink>
                                </NavItem>
                            </Nav>
                        </CardBody>
                    </Card>
                    <TabContent activeTab={activeTab}>
                        {/* <TabPane tabId="FCL">
                            <SearchForm activeTab={activeTab}/>
                        </TabPane>
                        <TabPane tabId="LCL">
                            <SearchForm activeTab={activeTab}/>
                        </TabPane>
                            <TabPane tabId="Air">
                        <SearchForm activeTab={activeTab}/>
                        </TabPane>
                            <TabPane tabId="Land">
                        <SearchForm activeTab={activeTab}/>
                        </TabPane> */}

                        <TabPane tabId={activeTab}>
                            <SearchForm activeTab={activeTab}/>
                        </TabPane>
                    </TabContent>
                        {/* --------------------------tabs------------------------------- */}
                    

                    </div>
                </Container>
            </div>
        </>
  )
}

export default InstantRate
