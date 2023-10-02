import classnames from "classnames";
import React, { useEffect, useState } from 'react';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown } from 'reactstrap';

import { useDispatch } from "react-redux";
import { getFclData, getLclData } from "../../../store/Procurement/actions";
import AirConsoleComp from "./partials/AirConsoleComp";
import AirLocalFreight from "./partials/AirLocalFreight";
import AirMasterBill from "./partials/AirMasterBill";
import FclOceanFreight from "./partials/FclOceanFreight";
import InLandCharge from "./partials/InLandCharge";
import LclOceanFreight from "./partials/LclOceanFreight";
import PortLocalFreight from "./partials/PortLocalFreight";

const FreightForwarding = () => {
    const [activeTab, setactiveTab] = useState("1");
    const [oceanType, setOceanType] = useState('fcl');
    const [airType, setAirTypee] = useState('master_bill');
    const dispatch = useDispatch();    
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
                                                <DropdownItem to="#" onClick={() => { setOceanType('port_local') }}>Port/Local Charges</DropdownItem>
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
                                                <DropdownItem to="#" onClick={() => {setAirTypee('air_local')}}>Airport/Local Charges</DropdownItem>
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
                                        Inland Charges
                                    </div>
                                </NavItem>
                            </Nav>
                        </div>
                        {/* {activeTab === '1' ?
                            oceanType === 'lcl' ? <LclOceanFreight /> : oceanType === 'port_local' ? <PortLocalFreight /> : <FclOceanFreight />
                            : activeTab === '2' ? 
                                airType === 'console' ? <AirConsoleComp /> : airType === 'air_local' ? <AirLocalFreight /> : <AirMasterBill />
                                : activeTab === '3' ? <InLandCharge /> : null} */}

                    </div>
                </Container>
            </div>
        </>
    );
}

export default FreightForwarding;
