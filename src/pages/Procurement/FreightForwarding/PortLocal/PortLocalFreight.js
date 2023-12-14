import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { edit_icon } from '../../../../assets/images'
import { fclRateData, portLocalBreadcrumb } from '../../../../common/data/procurement'
import { getPortLocalChargesData } from '../../../../store/Procurement/actions'
import ModalSurchargeValue from '../Modal/ModalSurchargeValue'
import { Carriername, MovementType, PortName, SurchargeCategory, SurchargeId, Terminals, Validtill, Vendorname } from '../partials/OceanCol'
import TableReact from './TableReactPortLocalCharges'
import TopBreadcrumbs from '../partials/TopBreadcrumbs'
import FilterPortCanvasComp from '../Modal/FilterPortCanvasComp'
import { FILTER_PORTLOCALCHARGES_DATA } from '../../../../store/Procurement/actiontype'
import axios from 'axios'

export default function PortLocalFreight() {
    const [isRight, setIsRight] = useState(false);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const inputArr = {
        surcharge_category: '',
        port_name: '',
        carrier_name:'',
        movement_type: ''
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const dispatch = useDispatch();
    const portLocalData2 = useSelector((state) => state.procurement.portLocalChargesData);
    const portLocalData = [];

    console.log(portLocalData2,"portLocalData2");

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
        const filteredDataArr = newArr.filter(item => {
            const isPortNameMatch = filterDetails?.port_name?.value === '' ||
              item?.port_name?.toLowerCase().includes(filterDetails?.port_name?.value?.toLowerCase());
          
            const isCarrierNameMatch = filterDetails?.carrier_name?.value === '' ||
              item?.carrier_name?.toLowerCase().includes(filterDetails?.carrier_name?.value?.toLowerCase());
          
            const isMovementMatch = filterDetails?.org_port?.value === '' ||
              item?.movement_type?.toLowerCase().includes(filterDetails?.movement_type?.value?.toLowerCase());
          
            return isCarrierNameMatch && isPortNameMatch && isMovementMatch;
        });
        dispatch({type: FILTER_PORTLOCALCHARGES_DATA, payload: filteredDataArr});
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
        dispatch(getPortLocalChargesData());
    }

    let token = localStorage.getItem('token');

    useEffect(() => {
        // dispatch(getPortLocalChargesData());

        let data = {
            "username": "setuptarrfitales@gmail.com",
            "password": "P@ssw0rd123",
            "rememberMe": false
        }

        axios({
            method: 'GET',
            url: '/api/v1/tenant-ocean-fcl-rp/port-and-local-charges/all',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  JSON.parse(token),
            },
        }).then((res) => {
            console.log(res.data, "res.data");
        }).catch((err) => {
            console.log(err, "err");
        })

    }, [dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Surcharge ID',
            accessor: 'surcharge_id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <SurchargeId cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Surcharge Category',
            accessor: 'surcharge_category',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <SurchargeCategory cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Port Name',
            accessor: 'port_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <PortName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Terminals',
            accessor: 'terminals',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <Terminals cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Movement Type',
            accessor: 'movement_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <MovementType cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Carrier Name',
            accessor: 'carrier_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <Carriername cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Name',
            accessor: 'vendor_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <Vendorname cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Valid Till',
            accessor: 'valid_till',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <Validtill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
    document.title="Port & Local Charges || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">

                        {/* breadcrumbs && rate */}
                        <TopBreadcrumbs breadcrumbs={portLocalBreadcrumb} />

                        {/* React Table */}
                        <TableReact
                            columns={columns}
                            data={portLocalData}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'PortLocalCharges'}
                        />

                        {/* modal */}
                        <ModalSurchargeValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'PortLocalCharges'} />
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterPortCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />            
        </>
    )
}
