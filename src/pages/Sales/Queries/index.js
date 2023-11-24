import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'reactstrap'
import { salesEnquiryData } from '../../../common/data/dashboard'
import { inquiryBreadcrumb } from '../../../common/data/sales'
import TfBreadcrumbs from '../../../components/Common/TfBreadcrumbs'
import { getSalesInquiryData } from '../../../store/Sales/actions'
import { QueriesColVal } from "../partials/SalesCol"
import SalesCommonTable from '../partials/SalesCommonTable'
import FilterSalesInquiryComp from '../partials/FilterSalesInquiryComp'
import { FILTER_INQUIRY_DATA, GET_INQUIRY_DATA_SUCCESS } from '../../../store/Sales/actiontype'
import { useLocation } from 'react-router-dom'

export default function QueriesComp() {
    document.title = "Sales || Navigating Freight Costs with Precision||Ultimate Rate Management platform"   
    
    const inquiryData = useSelector((state) => state?.sales?.inquiry_data);
    const [isRight, setIsRight] = useState(false);
    const dispatch = useDispatch();
    const inputArr = {
        org_port: '',
        dest_port: '',
        status: '',
        // quote_value: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const navigateType = useLocation();

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        let newArr = [...inquiryData];
        const filteredDataArr = newArr.filter(item => {
            const originNameMatch = filterDetails?.org_port?.value === '' ||
                item?.org_port?.toLowerCase().includes(filterDetails?.org_port?.value?.toLowerCase());

            const isDestPortMatch = filterDetails?.dest_port?.value === '' ||
                item?.dest_port?.toLowerCase().includes(filterDetails?.dest_port?.value?.toLowerCase());

            const statusMatch = filterDetails?.status?.value === '' ||
                item?.status?.toLowerCase().includes(filterDetails?.status?.value?.toLowerCase());

            return originNameMatch && isDestPortMatch && statusMatch;
        });
        console.log(filteredDataArr, "filterDetails lcl-----------------------");
        dispatch({type: GET_INQUIRY_DATA_SUCCESS, payload: filteredDataArr})
    }

    const clearValueHandler = () => {
        setfilterDetails(inputArr)
        dispatch(getSalesInquiryData()); 
    }

    useEffect(() => {
        dispatch(getSalesInquiryData());
    },[]);

    const columns = useMemo(() => [
        {
            Header: 'Inquiry ID',
            accessor: 'inquiry_id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Inquiry Dt',
            accessor: 'inquiry_dt',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Customer Name',
            accessor: 'customer_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Customer Contact No',
            accessor: 'customer_contact',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Origin',
            accessor: 'org_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Destination',
            accessor: 'dest_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Ready Date',
            accessor: 'cargo_ready_date',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Type',
            accessor: 'cargo_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Container type',
            accessor: 'container_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Weight',
            accessor: 'weight',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Value',
            accessor: 'cargo_value',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Incoterms',
            accessor: 'incoterms',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Sales Emp',
            accessor: 'sales_person',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Status',
            accessor: 'status',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        }      
    ]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        {/* breadcrumbs && rate */}
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={inquiryBreadcrumb} />
                            <div className="tf_box_wrap d-flex">
                                {(salesEnquiryData || []).map((item) => (
                                    <div className="sh_box flex-grow-1" key={item?.id}>
                                        <p className="box_title">{item?.title}</p>
                                        <div className="sh_inquiry_rate">{item?.rate}
                                            {item?.compare_rate !== '' ? (
                                                <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* sales table && filter */}
                        <SalesCommonTable
                            columns={columns}
                            data={navigateType?.state?.id === 'Pending Enquires' ? inquiryData?.filter((item) => item?.status.toLowerCase() === 'pending') : 
                                navigateType?.state?.id === 'Enquires Actioned' ? inquiryData?.filter((item) => item?.status.toLowerCase() === 'actioned') :
                                navigateType?.state?.id === 'SLA breached' ? inquiryData?.filter((item) => item?.status.toLowerCase() === 'sla')
                                 : inquiryData}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'inquiry'}
                        />
                    </div>
                </Container>
            </div>            

            {/* filter right sidebar */}            
            <FilterSalesInquiryComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}
