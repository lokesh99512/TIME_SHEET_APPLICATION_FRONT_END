import React, { useEffect, useRef, useState } from 'react';


//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    Col,
    Container, Row, Table
} from "reactstrap";


/** import Mini Widget data */
import { exportSumData, impExColumnData, inquiryColumnData, inquirySumData, quotSumData, salesColumnData, salesEnquiryData, salesPerformData } from "../../common/data/dashboard";
import CommonTable from './Partials/CommonTable';
import ContainerTrackChart from './Partials/ContainerTrackChart';
import MainDnd from './Partials/MainDnd';
import RevenueChart from './Partials/RevenueChart';
import { customSort } from '../../components/Common/CommonLogic';
import AnimatedCounter from './Partials/AnimatedCounter';

const Dashboard = () => {
    const [tableData, setTableData] = useState(exportSumData);
    const [tableData2, setTableData2] = useState(exportSumData);
    const [tableData3, setTableData3] = useState(inquirySumData);
    const [tableData4, setTableData4] = useState(salesPerformData);

    //meta title
    document.title = "Dashboard || Navigating Freight Costs with Precision||Ultimate Rate Management platform";

    const handleSorting = (sortField, sortOrder, type) => {
        const tables = {
            export_sum: tableData,
            import_sum: tableData2,
            equiry_sum: tableData3,
            default: tableData4,
        };

        const selectedTable = tables[type] || tables.default;
        const sorted = customSort(selectedTable, sortField, sortOrder);

        switch (type) {
            case 'export_sum':
                setTableData(sorted);
                break;
            case 'import_sum':
                setTableData2(sorted);
                break;
            case 'equiry_sum':
                setTableData3(sorted);
                break;
            default:
                setTableData4(sorted);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    {/* <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" /> */}

                    <div className="main_dashboard_wrapper">
                        <Row className="dashboard_inquiries_summary_wrap">
                            <Col xl={9} lg={8} className="left_summary_wrap">
                                {/* Sales Enquiry */}
                                <div className="sh_inquiry_wrap">
                                    <h3 className="sub_title">Sales Enquires</h3>
                                    <div className="sh_box_wrap">
                                        {(salesEnquiryData || [])?.map(item => (
                                            <div className="sh_box" key={item?.id}>
                                                <p className="box_title">{item?.title}</p>
                                                <p className="sh_inquiry_rate">
                                                    <AnimatedCounter rate={Number(item?.rate)} />
                                                    <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quatation */}
                                <div className="sh_inquiry_wrap">
                                    <h3 className="sub_title">Quotation summary</h3>
                                    <div className="sh_box_wrap">
                                        {(quotSumData || [])?.map(item => (
                                            <div className="sh_box" key={item?.id}>
                                                <p className="box_title">{item?.title}</p>
                                                <p className="sh_inquiry_rate">
                                                    <AnimatedCounter rate={Number(item?.rate)} />
                                                    <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Container Tracking Charts */}
                                <ContainerTrackChart />

                                {/* Revenue Run Rate charts */}
                                <RevenueChart />
                            </Col>

                            {/* Right draggble Summary */}
                            <Col xl={3} lg={4} className="sh_right_summary_wrap">
                                <MainDnd />
                            </Col>
                        </Row>
                        {/* dashboard tables */}
                        <Row className="sh_dashboar_table_wrap">

                            {/* Export Summary table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Export Summary</h3>
                                    <CommonTable column={impExColumnData} data={tableData} handleSorting={handleSorting} type={'export_sum'} />
                                </div>
                            </Col>

                            {/* Import Summary table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Import Summary</h3>
                                    <CommonTable column={impExColumnData} data={tableData2} handleSorting={handleSorting} type={'import_sum'} />
                                </div>
                            </Col>

                            {/* Enquiry Summary table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Enquiry Summary</h3>
                                    <CommonTable column={inquiryColumnData} data={tableData3} handleSorting={handleSorting} type={'equiry_sum'} />
                                </div>
                            </Col>

                            {/* Sales Performance table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Sales Performance</h3>
                                    <CommonTable column={salesColumnData} data={tableData4} handleSorting={handleSorting} type={'salesPerformance'} />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* <Row>
                        {(WidgetsData || []).map((widget, key) => (
                            <Col xl={3} md={6} key={key}>
                                <Card className="card-h-100">
                                    <CardBody>
                                        <Row className="align-items-center">
                                            <Col xs={6}>
                                                <span className="text-muted mb-3 lh-1 d-block text-truncate">{widget.title}</span>
                                                <h4 className="mb-3">
                                                    {widget.isDoller === true ? '$' : ''}
                                                    <span className="counter-value">
                                                        <CountUp
                                                            start={0}
                                                            end={widget.price}
                                                            duration={12}
                                                        />
                                                        {widget.postFix}
                                                    </span>
                                                </h4>
                                            </Col>
                                            <Col xs={6}>
                                                <ReactApexChart
                                                    options={options}
                                                    series={[{ data: [...widget['series']] }]}
                                                    type="line"
                                                    className="apex-charts"
                                                    dir="ltr"
                                                />
                                            </Col>
                                        </Row>
                                        <div className="text-nowrap">
                                            <span className={"badge badge-soft-" + widget.statusColor + " text-" + widget.statusColor}>
                                                {widget.rank}
                                            </span>
                                            <span className="ms-1 text-muted font-size-13">Since last week</span>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                    <Row>
                        <WalletBalance />
                        <Col>
                            <Row>
                                <InvestedOverview />
                                <NewSlider />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <MarketOverview />
                        <Locations />
                    </Row>
                    <Row>
                        <Trading />
                        <Transactions />
                        <RecentActivity />
                    </Row> */}
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
