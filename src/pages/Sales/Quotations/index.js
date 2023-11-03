import React, { useEffect, useMemo, useState } from 'react'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import TfBreadcrumbs from '../../../components/Common/TfBreadcrumbs'
import { quotationBreadcrumb, quotationRateData } from '../../../common/data/sales'
import SalesCommonTable from '../partials/SalesCommonTable'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSalesQuotationData } from '../../../store/Sales/actions'
import { edit_icon, eye_icon, status_update } from '../../../assets/images'
import { CommonValue } from '../partials/SalesCol'
import FilterSalesComp from '../partials/FilterSalesComp'

export default function Quotations() {
    document.title="Sales || Navigating Freight Costs with Precision||Ultimate Rate Management platform"

    const quotationData = useSelector((state) => state?.sales?.quotation_data);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const inputArr = {
        // priceRange: [],
        expiration_date: [],
        origin_name: '',
        destination_name: '',
        quote_mode: '',
        quote_status: '',
        quote_value: '',
        // containerradio: '',
        // destport: '',
        // vendorradio: '',
        // pickup: false,
        // port_origin: false,
        // ocean_freight: false,
        // port_discharge: false,
        // delivery: false,
        // shipping_cma: false,
        // shipping_msc: false,
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const dispatch = useDispatch();

    const viewPopupHandler = (data) => {
        setModal(true);
        setViewData(data);
    }

    const onCloseClick = () => {
        setModal(false);
    }

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        console.log(filterDetails,"filterDetails lcl-----------------------");
    }

    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    useEffect(() => {
        dispatch(getSalesQuotationData());
    },[dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Quotation Date',
            accessor: 'quotation_date',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Quotation ID',
            accessor: 'quotation_id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Customer Name',
            accessor: 'customer_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Origin',
            accessor: 'org_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Destination',
            accessor: 'dest_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Mode',
            accessor: 'quote_mode',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Transport By',
            accessor: 'transport_by',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },        
        {
            Header: 'Weight/Container Type',
            accessor: 'weight_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },    
        {
            Header: 'Quotation Value',
            accessor: 'quote_val',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },    
        {
            Header: 'Status',
            accessor: 'quote_status',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },                
        {
            Header: 'Sales Person',
            accessor: 'sales_person',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },                            
        {
            Header: 'Action',
            Cell: (cellProps) => {
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem onClick={(e) => {e.stopPropagation(); viewPopupHandler(cellProps.row.original)}}>View Quotation <img src={eye_icon} alt="Eye" /></DropdownItem>
                            <DropdownItem onClick={(e) => e.stopPropagation()}>
                                Status Update <img src={status_update} alt="Status" />
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }
        },
    ]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper main_sales_wrapper">
                        {/* breadcrumbs && rate */}
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={quotationBreadcrumb} />
                            <div className="tf_box_wrap d-flex">
                                {(quotationRateData || []).map((item) => (
                                    <div className="sh_box flex-grow-1" key={item?.id}>
                                        <p className="box_title">{item?.title}</p>
                                        <p className="sh_inquiry_rate">{item?.rate}
                                            <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* sales table && filter */}
                        <SalesCommonTable 
                            columns={columns}
                            data={quotationData}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'quotation'}
                        />
                    </div>
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterSalesComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}
