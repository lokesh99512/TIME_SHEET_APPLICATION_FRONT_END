import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { edit_icon, eye_icon } from '../../../../assets/images'
import { waybillBreadcrumb, waybillRateData } from '../../../../common/data/procurement'
import { getAirwaybillData, updateAirwaybillSwitchData } from '../../../../store/Procurement/actions'
import FilterOffCanvasComp from './Modal/FilterOffCanvasComp'
import ModalFreight from './Modal/ModalFreight'
import { CargoType, CarrierName, ChargeId, DestPort, DetentionFree, OrgPort, TransitTime, ValidTill, VendorName, ViaPort } from './OceanCol'
import TableReact from './TableReact'
import TopBreadcrumbs from './TopBreadcrumbs'

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
    const dispatch = useDispatch();

    const viewPopupHandler = (data) => {
        if (data?.is_active) {
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
        {
            Header: 'Charge ID',
            accessor: 'charge_id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeId cellProps={cellProps} viewPopupHandler={viewPopupHandler}  />
            }
        },
        {
            Header: 'Carrier Name',
            accessor: 'carrier_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CarrierName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Name',
            accessor: 'vendor_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <VendorName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Org Airport',
            accessor: 'org_airport',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <OrgPort cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Dest Airport',
            accessor: 'dest_airport',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <DestPort cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Via Airport',
            accessor: 'via_airport',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ViaPort cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Detention Free',
            accessor: 'detention_free',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <DetentionFree cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Valid Till',
            accessor: 'valid_till',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Transit Time',
            accessor: 'transit_time',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <TransitTime cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Cargo Type',
            accessor: 'cargo_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CargoType cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
                            <DropdownItem>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
                            <DropdownItem onClick={(e) => {e.stopPropagation(); viewPopupHandler(cellProps.row.original)}}>View <img src={eye_icon} alt="Eye" /></DropdownItem>
                            <DropdownItem onClick={(e) => e.stopPropagation()}>
                                {cellProps.row.original?.is_active ? "Activate" : "Deactivate"} 
                                <div className="switch_wrap">
                                    <FormGroup switch>
                                        <Input 
                                            type="switch"
                                            checked={cellProps.row.original?.is_active || false}
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

                        {/* React Table */}
                        <TableReact
                            columns={columns}
                            data={waybillData}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'air_waybill'}
                        />

                        {/* modal */}
                        <ModalFreight modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'air_waybill'} />
                    </div>
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}
