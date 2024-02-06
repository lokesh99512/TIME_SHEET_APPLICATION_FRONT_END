import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'reactstrap'
import { salesEnquiryData } from '../../../common/data/dashboard'
import { inquiryBreadcrumb } from '../../../common/data/sales'
import TfBreadcrumbs from '../../../components/Common/TfBreadcrumbs'
import { getInquirySummeryData, getSalesInquiryData } from '../../../store/Sales/actions'
import { QueriesColVal } from "../partials/SalesCol"
import SalesCommonTable from '../partials/SalesCommonTable'
import FilterSalesInquiryComp from '../partials/FilterSalesInquiryComp'
import { FILTER_INQUIRY_DATA, GET_INQUIRY_DATA_SUCCESS } from '../../../store/Sales/actiontype'
import { useLocation } from 'react-router-dom'

export default function QueriesComp() {
    document.title = "Inquiry || Navigating Freight Costs with Precision||Ultimate Rate Management platform"   
    
    const inquiryData = useSelector((state) => state?.sales?.inquiry_data);
    const [isRight, setIsRight] = useState(false);
    const  { inquiry_summary_data}= useSelector((state) => state?.sales);

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
        dispatch(getInquirySummeryData());
    },[]);

    const salesEnquirySummery = Object.entries(inquiry_summary_data).map(([key, value], index) => {
        let rate_type = 'up';
        if (index === 3) { 
            rate_type = 'down';
        }
        return {
            id: index + 1,
            title: index==0?"Total Inquires":index==1?"Enquires Actioned":index==2?"Pending Enquires":index==3?"SLA breached":"",
            rate: value.toString(),
            compare_rate: (index + 1) * 3, 
            rate_type: rate_type
        };
    });
    const columns = useMemo(() => [
        {
            Header: 'Inquiry ID',
            accessor: 'inquiryId',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Inquiry Dt',
            accessor: 'inquiryDate',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Customer Name',
            accessor: 'customerName',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Customer Contact No',
            accessor: 'customerContactNo',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Origin',
            accessor: 'origin',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Destination',
            accessor: 'destination',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Ready Date',
            accessor: 'cargoDate',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Cargo Type',
            accessor: 'cargoType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Container type',
            accessor: 'containerTypes',
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
            accessor: 'cargoValue',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Incoterms',
            accessor: 'incoterm',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <QueriesColVal cellProps={cellProps} />
            }
        },
        {
            Header: 'Sales Emp',
            accessor: 'salesEmp',
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
                                {(salesEnquirySummery.length>0?salesEnquirySummery:salesEnquiryData).map((item) => (
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
                            data={!!inquiryData.content?inquiryData.content:[]}
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
