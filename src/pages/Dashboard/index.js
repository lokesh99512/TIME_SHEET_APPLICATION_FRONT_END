import React, { useEffect, useState } from 'react';


//import Breadcrumbs

import {
    Col,
    Container, Row
} from "reactstrap";


/** import Mini Widget data */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { exportSumData, impColumnData, impExColumnData, importSumData, inquiryColumnData, inquirySumData, quotSumData, salesColumnData, salesEnquiryData, salesPerformData } from "../../common/data/dashboard";
import { customSort } from '../../components/Common/CommonLogic';
import AnimatedCounter from './Partials/AnimatedCounter';
import CommonTable from './Partials/CommonTable';
import ContainerTrackChart from './Partials/ContainerTrackChart';
import MainDnd from './Partials/MainDnd';
import RevenueChart from './Partials/RevenueChart';
import { getInquiryCustomerSummeryData, getInquiryExportSummeryData, getInquiryImportSummeryData, getInquirySalesCustomerSummeryData, getInquirySummeryData } from '../../store/Sales/actions';
import { useDispatch } from 'react-redux';
const Dashboard = () => {
    const [tableData, setTableData] = useState(exportSumData);
    const [tableData2, setTableData2] = useState(importSumData);
    const [tableData3, setTableData3] = useState(inquirySumData);
    const [tableData4, setTableData4] = useState(salesPerformData);
    const navigate = useNavigate();
    const  { inquiry_export_data , inquiry_import_data, inquiry_customer_data,inquiry_summary_data, inquiry_sales_customer_data}= useSelector((state) => state?.sales);    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getInquiryCustomerSummeryData());
        dispatch(getInquirySalesCustomerSummeryData());
        dispatch(getInquiryImportSummeryData());
        dispatch(getInquiryExportSummeryData());
    }, []);

    const salesEnquirySummary = Object.entries(inquiry_summary_data).map(([key, value], index) => {
        let rate_type = 'up';
        if (index === 3) { 
            rate_type = 'down';
        }
        return {
            id: index + 1,
            title: index==0?"Total Inquires":index==1?"Inquires Actioned":index==2?"Pending Inquires":index==3?"SLA breached":"",
            rate: value.toString(),
            compare_rate: (index + 1) * 3, 
            rate_type: rate_type
        };
    });

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
                                    <h3 className="sub_title">Sales Inquires</h3>
                                    <div className="sh_box_wrap">
                                        {(salesEnquirySummary.length>0?salesEnquirySummary: salesEnquiryData)?.map(item => (
                                            <div className="sh_box" key={item?.id}>
                                                <p className="box_title" onClick={() => navigate('/sales/inquiry', { state: { id: item?.title } })}>{item?.title}</p>
                                                <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                    <AnimatedCounter rate={Number(item?.rate)} />
                                                    {/* <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span> */}
                                                    <div className="text-nowrap fs-5">
                                                        <span className={"badge badge-soft-" + `${item?.rate_type === 'down' ? "danger" : "success"}` + " text-" + `${item?.rate_type === 'down' ? "danger" : "success"}`}>
                                                        {item?.compare_rate}%
                                                        </span>
                                                        <span className="ms-1 box_bottom_text">Since last month</span>
                                                    </div>
                                                </div>
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
                                                <p className="box_title" onClick={() => navigate('/sales/quotation', { state: { id: item?.title } })}>{item?.title}</p>
                                                <div className="sh_inquiry_rate justify-content-between align-items-center">
                                                    <AnimatedCounter rate={Number(item?.rate)} />
                                                    {/* <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span> */}
                                                    {item?.compare_rate !== '' && (
                                                        <div className="text-nowrap fs-5">
                                                            <span className={"badge badge-soft-" + `${item?.rate_type === 'down' ? "danger" : "success"}` + " text-" + `${item?.rate_type === 'down' ? "danger" : "success"}`}>
                                                            {item?.compare_rate}%
                                                            </span>
                                                            <span className="ms-1 box_bottom_text">Since last month</span>
                                                        </div>
                                                    )}
                                                </div>
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
                                    <CommonTable column={impExColumnData} data={inquiry_export_data} handleSorting={handleSorting} type={'export_sum'} />
                                </div>
                            </Col>

                            {/* Import Summary table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Import Summary</h3>
                                    <CommonTable column={impColumnData} data={inquiry_import_data} handleSorting={handleSorting} type={'import_sum'} />
                                </div>
                            </Col>

                            {/* Enquiry Summary table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Inquiry Summary</h3>
                                    <CommonTable column={inquiryColumnData} data={inquiry_customer_data} handleSorting={handleSorting} type={'equiry_sum'} />
                                </div>
                            </Col>

                            {/* Sales Performance table */}
                            <Col lg={6}>
                                <div className="sh_summary_table_wrap">
                                    <h3 className="sub_title">Sales Performance</h3>
                                    <CommonTable column={salesColumnData} data={inquiry_sales_customer_data} handleSorting={handleSorting} type={'salesPerformance'} />
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
