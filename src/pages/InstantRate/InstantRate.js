import classnames from "classnames";
import React from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useState } from 'react';

import SearchForm from './SearchForm';

const InstantRate = () => {
    const [activeTab, toggleTab] = useState("FCL"); 
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
                                    onClick={() => { toggleTab("FCL") }}>
                                    <i className='bx bx-cube mx-1'></i>
                                    FCL</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === "LCL", }, "px-3 py-2")}
                                    onClick={() => { toggleTab("LCL") }}
                                ><i className='bx bx-package mx-1'></i>LCL</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === "Air", }, "px-3 py-2")}
                                    onClick={() => { toggleTab("Air") }}
                                ><i className='bx bx-rocket mx-1'></i>Air</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: activeTab === "Land", }, "px-3 py-2")}
                                    onClick={() => { toggleTab("Land") }}
                                ><i className='bx bx-train mx-1'></i>Land</NavLink>
                            </NavItem>
                        </Nav>
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
                                <SearchForm activeTab={activeTab} />
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
