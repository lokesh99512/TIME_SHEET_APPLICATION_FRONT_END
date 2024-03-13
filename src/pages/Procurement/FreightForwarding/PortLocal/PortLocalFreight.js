import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { edit_icon } from '../../../../assets/images'
import { portLocalBreadcrumb } from '../../../../common/data/procurement'
import { getPortLocalChargesData, postPortLocalChargesData } from '../../../../store/Procurement/actions'
import { FILTER_PORTLOCALCHARGES_DATA } from '../../../../store/Procurement/actiontype'
import FilterPortCanvasComp from '../Modal/FilterPortCanvasComp'
import ModalSurchargeValue from '../Modal/ModalSurchargeValue'
import { Carriername, MovementType, PortName, SurchargeCategory, SurchargeId, Terminals, Validtill, Vendorname } from '../partials/OceanCol'
import TopBreadcrumbs from '../partials/TopBreadcrumbs'
import TableReact from './TableReactPortLocalCharges'

export default function PortLocalFreight() {
    const [isRight, setIsRight] = useState(false);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const inputArr = {
        carriers:'',
        sur_category: '',
        from: '',
        to: '',
        status: '',
        movement: '',
        ports: '',
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const dispatch = useDispatch();
    const {portLocalChargesData, fclplChargesLoader} = useSelector((state) => state.procurement);

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
        if(filterDetails?.carriers || filterDetails?.sur_category || filterDetails?.from || filterDetails?.to || filterDetails?.status || filterDetails?.movement || filterDetails?.ports){
            let url = '?'
            url +=  `${filterDetails?.carriers?.id ? `carriers=${filterDetails?.carriers?.id}&` : ''}${filterDetails.sur_category?.id ? `chargeCategories=${filterDetails.sur_category?.id}&` : ''}${filterDetails?.ports?.id ? `ports=${filterDetails?.ports?.id}&` : ''}${filterDetails?.from ? `validFrom=${filterDetails?.from}&` : ''}${filterDetails.to ? `validTo=${filterDetails?.to}&` : ''}${filterDetails?.status ? `status=${filterDetails?.status}&` : ''}${filterDetails?.movement?.value ? `movementType=${filterDetails?.movement?.value}&` : ''}`;
            let newurl = url.substring(0, url.length - 1);
            dispatch(getPortLocalChargesData(newurl));
        }
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
        dispatch(getPortLocalChargesData());
    }

    // Activate deactivate table data
    const switchHandler = (data) => {
        let obj = {
            id: data.id,
            version: data.version,
            status: data.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }
        console.log(obj,"port obj");
        dispatch(postPortLocalChargesData(obj));
    }

    useEffect(() => {
        dispatch(getPortLocalChargesData());        
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Surcharge ID',
            accessor: 'id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <SurchargeId cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Surcharge Category',
            accessor: 'surchargeCategory.name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <SurchargeCategory cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Port Name',
            accessor: 'oceanPort.name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <PortName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Terminals',
            accessor: 'oceanPortTerminal.name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <Terminals cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Movement Type',
            accessor: 'movementType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <MovementType cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Carrier Name',
            accessor: 'tenantCarrier.name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <Carriername cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Name',
            accessor: 'tenantVendor.name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <Vendorname cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Valid Till',
            accessor: 'validFrom',
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
                            data={portLocalChargesData?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'PortLocalCharges'}
                            loader={fclplChargesLoader || false}
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
