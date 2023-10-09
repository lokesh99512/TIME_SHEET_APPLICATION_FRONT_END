import React, { useEffect, useMemo, useState } from 'react';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap';

import { useDispatch, useSelector } from "react-redux";
import { edit_icon, eye_icon } from '../../../assets/images';
import { inLandBreadcrumb, inLandRateData } from "../../../common/data/procurement";
import { getInLandData, updateInLandSwitchData } from "../../../store/Procurement/actions";
import FilterOffCanvasComp from './partials/Modal/FilterOffCanvasComp';
import ModalFreight from './partials/Modal/ModalFreight';
import { CargoType, CarrierName, ChargeId, CommonValue, DetentionFree, MinValue, TransitTime, ValidTill, VendorName } from './partials/OceanCol';
import TableReact from './partials/TableReact';
import TopBreadcrumbs from "./partials/TopBreadcrumbs";

const FreightForwarding = () => {
    const inlandData = useSelector((state) => state?.procurement?.inlandData);
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
        container_type: '',
        unit_type: '',
    };
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

    // Activate deactivate table data
    const switchHandler = (data) => {
        dispatch(updateInLandSwitchData(data.id,data.is_active));
    }

    useEffect(() => {
        dispatch(getInLandData());
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Charge ID',
            accessor: 'charge_id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeId cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Charge Name',
            accessor: 'charge_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Service Type',
            accessor: 'service_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
            Header: 'Transport Mode',
            accessor: 'transport_mode',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Origin',
            accessor: 'origin',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Destination',
            accessor: 'destination',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Charge Basis',
            accessor: 'charge_basis',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Slab',
            accessor: 'slab',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
            Header: 'Min. Val',
            accessor: 'min_value',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <MinValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Currency',
            accessor: 'currency',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
                                Activate
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
                        <TopBreadcrumbs breadcrumbs={inLandBreadcrumb} data={inLandRateData} />            

                        {/* React Table */}
                        <TableReact
                            columns={columns}
                            data={inlandData}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'inland'}
                        />

                        {/* modal */}
                        <ModalFreight modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'inland'} />
                    </div>
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} filterType={'inland'} clearValueHandler={clearValueHandler} />
        </>
    );
}

export default FreightForwarding;
