import classnames from "classnames";
import React, { useEffect, useState } from 'react';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown } from 'reactstrap';

import TopBreadcrumbs from './partials/TopBreadcrumbs';
import { fclBreadcrumb, fclRateData } from "../../../common/data/procurement";
import FclOceanFreight from "./partials/FclOceanFreight";
import AirFreightComp from "./partials/AirFreightComp";
import PortLocalFreight from "./partials/PortLocalFreight";
import InLandCharge from "./partials/InLandCharge";
import LclOceanFreight from "./partials/LclOceanFreight";
import AirConsoleComp from "./partials/AirConsoleComp";
import AirMasterBill from "./partials/AirMasterBill";
import { useDispatch } from "react-redux";
import { getFclData, getLclData } from "../../../store/Procurement/actions";
import { useSelector } from "react-redux";

const FreightForwarding = () => {
    const [activeTab, setactiveTab] = useState("1");
    const [oceanType, setOceanType] = useState('fcl');
    const [airType, setAirTypee] = useState('master_bill');
    const dispatch = useDispatch();    
    // console.log(fclData,"fclData=====");
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    useEffect(() => {
        dispatch(getFclData());
        dispatch(getLclData());
    }, [dispatch]);

    return (
        <>
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
                                        }, "tab_menu")}
                                        onClick={() => {
                                            toggle("1");
                                        }}
                                    >
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="btn btn-secondary" type="button" tag="a" >
                                                Ocean Freight
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem to="#" onClick={() => { setOceanType('fcl') }}>FCL</DropdownItem>
                                                <DropdownItem to="#" onClick={() => { setOceanType('lcl') }}>LCL</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "2",
                                        }, "tab_menu")}
                                        onClick={() => {
                                            toggle("2");
                                        }}
                                    >
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="btn btn-secondary" type="button" tag="a" >
                                                Air Freight
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem to="#" onClick={() => {setAirTypee('master_bill')}}>Master Waybill</DropdownItem>
                                                <DropdownItem to="#" onClick={() => {setAirTypee('console')}}>Console</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "3",
                                        }, "tab_menu")}
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
                                        }, "tab_menu")}
                                        onClick={() => {
                                            toggle("4");
                                        }}
                                    >
                                        Inland Charges
                                    </div>
                                </NavItem>
                            </Nav>
                        </div>
                        {activeTab === '1' ?
                            oceanType === 'lcl' ? <LclOceanFreight /> : <FclOceanFreight />
                            : activeTab === '2' ? 
                                airType === 'console' ? <AirConsoleComp /> : <AirMasterBill />
                                : activeTab === '3' ? <PortLocalFreight />
                                    : activeTab === '4' ? <InLandCharge /> : null}

                    </div>
                </Container>
            </div>
        </>
    );
}

export default FreightForwarding;
