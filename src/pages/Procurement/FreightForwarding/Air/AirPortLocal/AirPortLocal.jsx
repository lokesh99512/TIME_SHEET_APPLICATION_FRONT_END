import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'

import { edit_icon } from '../../../../../assets/images'
import { airPortLocalBreadcrumb } from '../../../../../common/data/procurement'
import TopBreadcrumbs from '../../../../Settings/Surcharge/TopBreadcrumbs'
import { CommonValue } from '../../partials/OceanCol'
import AirPortLocalTableReact from './partials/AirPortLocalTableReact'
import FilterAirPortCanvasComp from './partials/FilterAirPortCanvasComp'
import { getAIrPortLocalChargesData } from '../../../../../store/Procurement/actions'
import { useSelector } from 'react-redux'


const AirPortLocal = () => {
    const [isRight, setIsRight] = useState(false);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);

    const {airportLocalChargesData,airportLocalChargesLoder} =useSelector(state=>state.procurement)

    const inputArr = {
        surcharge_category: '',
        port_name: '',
        carrier_name: '',
        movement_type: ''
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const dispatch = useDispatch();
    const portLocalData = [];

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
        let newArr = [...portLocalData];
        // const filteredDataArr = newArr.filter(item => {
        //     const isPortNameMatch = filterDetails?.port_name?.value === '' ||
        //         item?.port_name?.toLowerCase().includes(filterDetails?.port_name?.value?.toLowerCase());

        //     const isCarrierNameMatch = filterDetails?.carrier_name?.value === '' ||
        //         item?.carrier_name?.toLowerCase().includes(filterDetails?.carrier_name?.value?.toLowerCase());

        //     const isMovementMatch = filterDetails?.org_port?.value === '' ||
        //         item?.movement_type?.toLowerCase().includes(filterDetails?.movement_type?.value?.toLowerCase());

        //     return isCarrierNameMatch && isPortNameMatch && isMovementMatch;
        // });
        // dispatch({ type: FILTER_PORTLOCALCHARGES_DATA, payload: filteredDataArr });
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
        // dispatch(getPortLocalChargesData());
    }

    useEffect(() => {
        dispatch(getAIrPortLocalChargesData());
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Surcharge ID',
            accessor: 'id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Surcharge Category',
            accessor: (row) => `${row.surchargeCategory === null ? '' : row.surchargeCategory.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Port Name',
            accessor: (row) => `${row.airPort === null ? '' : row.airPort.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Terminals',
            accessor: 'terminals',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Movement Type',
            accessor: 'movementType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Carrier Name',
            accessor: (row) => `${row.tenantCarrierVendor === null ? '' : row.tenantCarrierVendor.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Name',
            accessor: (row) => `${row.tenantVendor === null ? '' : row.tenantVendor.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Valid Till',
            accessor: 'validFrom',
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
                            <DropdownItem>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
                            {/* <DropdownItem onClick={(e) => {e.stopPropagation(); viewPopupHandler(cellProps.row.original)}}>View <img src={eye_icon} alt="Eye" /></DropdownItem> */}
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
    document.title = "Air Port & Local Charges || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">

                        {/* breadcrumbs && rate */}
                        <TopBreadcrumbs breadcrumbs={airPortLocalBreadcrumb} />

                        {/* React Table */}
                        <AirPortLocalTableReact
                            columns={columns}
                            loader={airportLocalChargesLoder}
                            data={airportLocalChargesData || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'PortLocalCharges'}
                        />

                        {/* modal */}
                        {/* <ModalSurchargeValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'PortLocalCharges'} /> */}
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterAirPortCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />            
        </>
    )
}

export default AirPortLocal
