import React, { useMemo } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import AnimatedCounter from '../Dashboard/Partials/AnimatedCounter';
import CarrierChart from './CarrierChart';
import { CommonValue } from './DashboardCol';
import VendorCommonTable from './VendorCommonTable';

const VendorDashboard = () => {
    const columns = useMemo(() => [
        {
            Header: 'Lane',
            accessor: 'lane',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Total Queries',
            accessor: 'queries',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Conversion',
            accessor: 'conversion',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        },
        {
            Header: 'Trend',
            accessor: 'trend',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} />
            }
        }
    ]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="main_dashboard_wrapper vendor_dashboard_wrapper">
                        <div className="row">
                            <div className="col-xl-4">
                                <div>
                                    <Card>
                                        <CardBody>
                                            <h3 className="sub_title">Vendor Spend</h3>
                                            <div className="sh_box_wrap d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title">Total Vendors</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${20 < 0 ? 'red_text' : 'green_text'}`}>20%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">Total Spend MTD</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">Total Spend Projected</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${-15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">Total Vendor</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div>
                                    <h3 className="sub_title">Weight Exceptions</h3>
                                    <Card>
                                        <CardBody>
                                            <div className="sh_box_wrap d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title">Total Wt Exception</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${20 < 0 ? 'red_text' : 'green_text'}`}>20%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">Spend Impact</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div>
                                    <h3 className="sub_title">Flight Exceptions</h3>
                                    <Card>
                                        <CardBody>
                                            <div className="sh_box_wrap d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title">Total Flight Changes</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${20 < 0 ? 'red_text' : 'green_text'}`}>20%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">Spend Impact</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div>
                                    <CarrierChart />
                                </div>
                                <div>
                                    <h3 className="sub_title">Shipment Status</h3>
                                    <Card>
                                        <CardBody>
                                            <div className="sh_box_wrap sh_box-4 d-flex">
                                                <div className="sh_box" >
                                                    <p className="box_title">Total Shipments</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${20 < 0 ? 'red_text' : 'green_text'}`}>20%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">Delivered</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">In Transit</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sh_box" >
                                                    <p className="box_title">Exceptions</p>
                                                    <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                        <AnimatedCounter rate={100} />
                                                        <div className="text-nowrap fs-5">
                                                            <span className={`${15 < 0 ? 'red_text' : 'green_text'}`}>15%</span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        {/* dashboard tables */}
                        <Row className="sh_dashboar_table_wrap">
                            {/* Export Summary table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Top 10 Lanes by Weight</h3>
                                    <VendorCommonTable 
                                        columns={columns}
                                        data={[]}
                                        customPageSize={10}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Top 10 Lanes by Spend</h3>
                                    <VendorCommonTable 
                                        columns={columns}
                                        data={[]}
                                        customPageSize={10}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Top 10 Customer</h3>
                                    <VendorCommonTable 
                                        columns={columns}
                                        data={[]}
                                        customPageSize={10}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Customerwise Inquiries</h3>
                                    <VendorCommonTable 
                                        columns={columns}
                                        data={[]}
                                        customPageSize={10}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default VendorDashboard;
