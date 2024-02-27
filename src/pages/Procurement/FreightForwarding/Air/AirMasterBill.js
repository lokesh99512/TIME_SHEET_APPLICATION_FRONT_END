import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { edit_icon, eye_icon } from '../../../../assets/images'
import { airDummyData, waybillBreadcrumb, waybillRateData } from '../../../../common/data/procurement'
import { getAirwaybillData, updateAirwaybillSwitchData,getAirwaybillDataById } from '../../../../store/Procurement/actions'
import FilterOffCanvasComp from '../Modal/FilterOffCanvasComp'
import ModalAir from './ModalAir'
import {  ChargeId, CommonReplaceValue, CommonValue, ValidTill, VendorName, ViaPort } from '../partials/OceanCol'
import TableAirwayBill from './TableAirwayBill'
import TopBreadcrumbs from '../partials/TopBreadcrumbs'
import AirCompare from './partials/AirCompare'

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
        {
            Header: "test1",
            columns:[
                {
                    Header: 'Booking Mode',
                    accessor: 'bookingMode',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test2",
            columns:[
                {
                    Header: 'Origin',
                    accessor: 'origin',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test3",
            columns:[
                {
                    Header: 'Destination',
                    accessor: 'destination',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test4",
            columns:[
                {
                    Header: 'Cargo Mode',
                    accessor: 'cargomode',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test5",
            columns:[
                {
                    Header: 'Cargo Type',
                    accessor: 'cargoType',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test6",
            columns:[
                {
                    Header: 'Weight',
                    accessor: 'weight',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "L1 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l1Details.l1fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l1Details.l1charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l1Details.l1total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        },
        {
            Header: "L2 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l2Details.l2fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l2Details.l2charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l2Details.l2total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        },
        {
            Header: "L3 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l3Details.l3fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l3Details.l3charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l3Details.l3total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        },
        {
            Header: "L4 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l4Details.l4fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l4Details.l4charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l4Details.l4total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        }, 
        {
            Header: "L5 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l5Details.l5fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l5Details.l5charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l5Details.l5total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        }, 
        // {
        //     Header: 'Action',
        //     Cell: (cellProps) => {
        //         return (
        //             <UncontrolledDropdown>
        //                 <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
        //                     <i className='bx bx-dots-vertical-rounded'></i>
        //                 </DropdownToggle>
        //                 <DropdownMenu className="dropdown-menu-end">
        //                     <DropdownItem onClick={(e) => {e.stopPropagation(); editPopupHandler(cellProps.row.original)}}>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
        //                     <DropdownItem onClick={(e) => {e.stopPropagation(); viewPopupHandler(cellProps.row.original)}}>View <img src={eye_icon} alt="Eye" /></DropdownItem>
        //                     <DropdownItem onClick={(e) => e.stopPropagation()}>
        //                         {cellProps.row.original?.status === "ACTIVE" ? "Activate" : "Deactive"}
        //                         <div className="switch_wrap">
        //                             <FormGroup switch>
        //                                 <Input 
        //                                 type="switch"
        //                                 checked={cellProps.row.original?.status === "ACTIVE" || false}
        //                                 onClick={() => {
        //                                     switchHandler(cellProps.row.original);
        //                                 }}
        //                                 readOnly
        //                                 />
        //                             </FormGroup>
        //                         </div>
        //                     </DropdownItem>
        //                 </DropdownMenu>
        //             </UncontrolledDropdown>
        //         )
        //     }
        // },
    ]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        {/* breadcrumbs && rate */}
                        {/* <TopBreadcrumbs breadcrumbs={waybillBreadcrumb} data={waybillRateData} />       */}

                        {/* Compare */}
                        <AirCompare />

                        <TableAirwayBill
                            columns={columns}
                            data={[]}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'air-waybill'}
                            loader={false}
                        />

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
