import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { edit_icon, eye_icon } from '../../../../assets/images'
import { waybillBreadcrumb, waybillRateData } from '../../../../common/data/procurement'
import { getAirwaybillData, getAirwaybillDataById, updateAirwaybillSwitchData } from '../../../../store/Procurement/actions'
import FilterOffCanvasComp from '../Modal/FilterOffCanvasComp'
import { ChargeId, CommonReplaceValue, ValidTill, VendorName } from '../partials/OceanCol'
import TopBreadcrumbs from '../partials/TopBreadcrumbs'
import ModalAir from './ModalAir'
import TableAirwayBill from './TableAirwayBill'

export default function AirMasterBill() {
    document.title="Air Master || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const inputArr = {
        vendor_name: '',
        carrier_name: '',
        validity_from: '',
        validity_to: '',
        org_port: '',
        dest_port: '',
        cargo_type: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const waybillData = useSelector((state) => state?.procurement?.waybillData);
    const waybillFreightData = useSelector((state) => state?.procurement?.airFreightData);
    const dispatch = useDispatch();

    const viewPopupHandler = (data) => {
        if (data?.status == "ACTIVE") {
            dispatch(getAirwaybillDataById(data?.id));  
            setModal(true);
            setViewData(data);
        } else {
            console.log("Cannot view details for inactive data");
        }
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
        console.log(filterDetails,"filterDetails Air MaterBill-----------------------")
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    // Activate deactivate table data
    const switchHandler = (data) => {
        dispatch(updateAirwaybillSwitchData(data.id,data.is_active));
    }

    useEffect(() => {
        dispatch(getAirwaybillData());
    },[dispatch]);

    console.log(waybillData, "-->waybillData")

    const columns = useMemo(() => [
        // {
        //     Header: 'Charge ID',
        //     accessor: 'id',
        //     filterable: true,
        //     disableFilters: true,
        //     Cell: (cellProps) => {
        //         return <ChargeId cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        //     }
        // },
        {
            Header: 'Agent',
                  accessor: (row) => `${row.tenantVendor === null ? '' : row.tenantVendor.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Carrier name',
            accessor: (row) => `${row.tenantCarrierVendor === null ? '' : row.tenantCarrierVendor.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Type',
            accessor: (row) => `${row.tenantVendor === null ? '' : row.tenantVendor.vendorType}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <VendorName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Rate Type',
            accessor: 'rateType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        
        {
            Header: 'Valid From',
            accessor: 'validFrom',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },  
        {
            Header: 'Valid To',
            accessor: 'validTo',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
                            <DropdownItem onClick={(e) => {e.stopPropagation(); editPopupHandler(cellProps.row.original)}}>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
                            <DropdownItem onClick={(e) => {e.stopPropagation(); viewPopupHandler(cellProps.row.original)}}>View <img src={eye_icon} alt="Eye" /></DropdownItem>
                            <DropdownItem onClick={(e) => e.stopPropagation()}>
                                {cellProps.row.original?.status === "ACTIVE" ? "Activate" : "Deactive"}
                                <div className="switch_wrap">
                                    <FormGroup switch>
                                        <Input 
                                        type="switch"
                                        checked={cellProps.row.original?.status === "ACTIVE" || false}
                                        onClick={() => {
                                            switchHandler(cellProps.row.original);
                                        }}
                                        readOnly
                                        />
                                    </FormGroup>
                                </div>
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
                    <div className="main_freight_wrapper">
                        {/* breadcrumbs && rate */}
                        <TopBreadcrumbs breadcrumbs={waybillBreadcrumb} data={waybillRateData} />            

                        {/* {waybillData ? ( */}
                            <TableAirwayBill
                            columns={columns}
                            data={waybillData?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'air-waybill'}
                            loader={false}
                            />
                        {/* ) : (
                            <p>Loading...</p>
                        )} */}

                        {/* modal */}
                        <ModalAir modal={modal} onCloseClick={onCloseClick} viewData={waybillFreightData} modalType={'air_waybill'} />
                    </div>  
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}
