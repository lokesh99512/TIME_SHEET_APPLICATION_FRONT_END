import React, { useState } from 'react';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import classnames from "classnames";
import TfBreadcrumbs from '../../../components/Common/TfBreadcrumbs';

const FreightForwarding = () => {
    const [activeTab, setactiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) {
          setactiveTab(tab);
        }
    };
    const breadcrumb = [
        {
            label: 'Procurement',
            link: '/#',
            active: false
        },
        {
            label: 'Freight Forwarding',
            link: '/#',
            active: false
        },
        {
            label: 'Ocean Freight',
            link: '/#',
            active: false
        },
        {
            label: 'FCL(Full Container Load)',
            link: '/#',
            active: true
        },
    ]
    return (
        <React.StrictMode>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <div className="freight_tabing_wrap">
                            <Nav pills className="navtab-bg nav-justified">
                                <NavItem>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "1",
                                        },"tab_menu")}
                                        onClick={() => {
                                            toggle("1");
                                        }}
                                    >                                    
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="btn btn-secondary" type="button" tag="a" >
                                                Ocean Freight
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem to="#">FCL</DropdownItem>
                                                <DropdownItem to="#">LCL</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "2",
                                        },"tab_menu")}
                                        onClick={() => {
                                            toggle("2");
                                        }}
                                    >                                    
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="btn btn-secondary" type="button" tag="a" >
                                                Air Freight
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem to="#">Master Waybill</DropdownItem>
                                                <DropdownItem to="#">Console</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "3",
                                        },"tab_menu")}
                                        onClick={() => {
                                            toggle("3");
                                        }}
                                    >
                                        Port & Local Charges
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "4",
                                        },"tab_menu")}
                                        onClick={() => {
                                            toggle("4");
                                        }}
                                    >
                                        Inland Charges
                                    </div>
                                </NavItem>
                            </Nav>
                        </div>
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={breadcrumb} />
                            <div className="tf_box_wrap">
                                {/* {(salesEnquiryData || [])?.map(item => (
                                    <div className="sh_box" key={item?.id}>
                                        <p className="box_title">{item?.title}</p>
                                        <p className="sh_inquiry_rate">{item?.rate}
                                            <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span>
                                        </p>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.StrictMode>
    );
}

export default FreightForwarding;
