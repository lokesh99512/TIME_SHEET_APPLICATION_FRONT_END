import React, { useEffect, useMemo, useState } from 'react'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import TopBreadcrumbs from './TopBreadcrumbs'
import TableReact from './TableReactPortLocalCharges'
import ModalFreight from './Modal/ModalFreight'
import { fclBreadcrumb, fclRateData } from '../../../../common/data/procurement'
import FilterOffCanvasComp from './Modal/FilterOffCanvasComp'
import { CargoType, CarrierName, Carriername, ChargeId, DestPort, DetentionFree, MovementType, OrgPort, PortName, SurchargeCategory, SurchargeId, Terminals, TransitTime, ValidTill, Validtill, VendorName, Vendorname, ViaPort } from './OceanCol'
import { useSelector } from 'react-redux'
import { edit_icon, eye_icon } from '../../../../assets/images'
import { getPortLocalChargesData } from '../../../../store/Procurement/actions'
import { useDispatch } from 'react-redux'

export default function PortLocalFreight() {
    const [isRight, setIsRight] = useState(false);
    const dispatch = useDispatch();
    const portLocalData = useSelector((state) => state.procurement.portLocalChargesData);
    // console.log(portLocalData,"<---plcharges table data");

    const viewPopupHandler = (data) => {
        // setModal(true);
        // setViewData(data);
    }

    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    useEffect(() => {
        dispatch(getPortLocalChargesData());
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
                        <TopBreadcrumbs breadcrumbs={fclBreadcrumb} data={fclRateData} />

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
                        {/* <ModalFreight modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'fcl'} /> */}
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            {/* <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} /> */}
        </>
    )
}
