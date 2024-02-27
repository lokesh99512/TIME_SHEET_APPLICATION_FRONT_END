import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Container } from 'reactstrap';

const VendorDashboard = () => {
    const options = {
        chart: {
            height: 50,
            type: "bar",
            toolbar: { show: false },
        },
        colors: ["#5156be"],
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            labels: {
                show: false
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function (seriesName) {
                        return ''
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    const series= [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15]
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="main_dashboard_wrapper vendor_dashboard_wrapper">
                        <div className="row">
                            <div className="col-xl-4">
                                <div>
                                    <h3 className="sub_title">Vendor Spend</h3>
                                    <Card>
                                        <CardBody>
                                            Vendor Spend
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div>
                                    <h3 className="sub_title">Carrier Distribution</h3>
                                    <Card>
                                        <CardBody>
                                            <ReactApexChart
                                                options={options}
                                                series={[{ data: series }]}
                                                type="line"
                                                className="apex-charts"
                                                dir="ltr"
                                            />
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default VendorDashboard;
