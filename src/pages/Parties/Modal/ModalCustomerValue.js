import classnames from "classnames";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    Modal,
    ModalBody,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import TabOneCustomerDetails from "./viewData/customers/TabOneCustomerDetails";
import TabThreeDocuments from "./viewData/customers/TabThreeDocuments";
import TabTwoContacts from "./viewData/customers/TabTwoContacts";

const ModalCustomerValue = ({ viewData, modal, onCloseClick, modalType }) => {
    const [activeTab, toggleTab] = useState("1");

    return (
        <>
            <Modal
                isOpen={modal}
                toggle={onCloseClick}
                className="table_view_modal"
                style={{ maxWidth: "1345px" }}
            >
                <ModalHeader tag="h4">
                    Customer value
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <div className="col">
                            <Card>
                                <CardBody>
                                    {/* <Row>
                                <div className="col-sm order-2 order-sm-1">
                                    <div className="d-flex align-items-start mt-3 mt-sm-0">
                                        <div className="flex-shrink-0">
                                            <div className="avatar-xl me-3">
                                                <img src={avatar1} alt="" className="img-fluid rounded-circle d-block" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div>
                                                <h5 className="font-size-16 mb-1">Phyllis Gatlin</h5>
                                                <p className="text-muted font-size-13">Full Stack Developer</p>

                                                <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                                                    <div><i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>Development</div>
                                                    <div><i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>phyllisgatlin@minia.com</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-auto order-1 order-sm-2">
                                    <div className="d-flex align-items-start justify-content-end gap-2">
                                        <div>
                                            <button type="button" className="btn btn-soft-light"><i className="me-1"></i> Message</button>
                                        </div>
                                        <div>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className="btn btn-link font-size-16 shadow-none text-muted" tag="a">
                                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end">
                                                    <li><DropdownItem href="#">Action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Another action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Something else here</DropdownItem></li>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                </div>
                            </Row> */}

                                    <Nav className="nav-tabs-custom card-header-tabs justify-content-between">
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === "1",
                                                }, "px-3")}
                                                onClick={() => {
                                                    toggleTab("1")
                                                }}>
                                                Customer Details</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === "2",
                                                }, "px-3")}
                                                onClick={() => {
                                                    toggleTab("2")
                                                }}
                                            >Contacts</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === "3",
                                                }, "px-3")}
                                                onClick={() => {
                                                    toggleTab("3")
                                                }}
                                            >Documents</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === "4",
                                                }, "px-3")}
                                                onClick={() => {
                                                    toggleTab("4")
                                                }}
                                            >Rates</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === "5",
                                                }, "px-3")}
                                                onClick={() => {
                                                    toggleTab("5")
                                                }}
                                            >Discounts</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === "6",
                                                }, "px-3")}
                                                onClick={() => {
                                                    toggleTab("6")
                                                }}
                                            >Invoice Settings</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({
                                                    active: activeTab === "7",
                                                }, "px-3")}
                                                onClick={() => {
                                                    toggleTab("7")
                                                }}
                                            >Communications</NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardBody>
                            </Card>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <TabOneCustomerDetails viewData1={viewData} />
                                </TabPane>
                                <TabPane tabId="2">
                                    <TabTwoContacts viewData2={viewData} />
                                </TabPane>
                                <TabPane tabId="3">
                                    <TabThreeDocuments viewData3={viewData} />
                                </TabPane>
                                <TabPane tabId="4">
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                tab 4 details
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane>
                                <TabPane tabId="5">
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                tab 5 details
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane>
                                <TabPane tabId="6">
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                tab 6 details
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane>
                                <TabPane tabId="7">
                                    <>
                                        <Card className="m-4">
                                            <CardBody>
                                                tab 7 details
                                            </CardBody>
                                        </Card>
                                    </>
                                </TabPane>
                            </TabContent>
                        </div>
                    </Row>
                    {/* </SimpleBar> */}
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalCustomerValue;
