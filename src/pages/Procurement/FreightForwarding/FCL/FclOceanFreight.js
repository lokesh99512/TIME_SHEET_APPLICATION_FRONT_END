import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'

import { useDispatch } from 'react-redux'
import { edit_icon, eye_icon } from '../../../../assets/images'
import { fclBreadcrumb, fclRateData, fclTableData } from '../../../../common/data/procurement'
import { getFclData, getFclDestinationAction, getFclFreightViewAction, getFclSurchargeViewAction, updatefclSwitchData } from '../../../../store/Procurement/actions'
import FilterOffCanvasComp from '../Modal/FilterOffCanvasComp'
import ModalFreight from '../Modal/ModalFreight'
import { CargoType, CarrierName, ChargeId, CommonReplaceValue, DestPort, DetentionFree, OrgPort, TransitTime, ValidTill, VendorName, ViaPort } from '../partials/OceanCol'
import TableReact from '../partials/TableReact'
import TopBreadcrumbs from '../partials/TopBreadcrumbs'
import { FILTER_FCL_DATA } from '../../../../store/Procurement/actiontype'
import ModalFCLFreight from './ModalFCLFreight'
import { useNavigate } from 'react-router-dom'

export default function FclOceanFreight() {
    document.title="FCL || Navigating Freight Costs with Precision||Ultimate Rate Management platform"
    // const navigate = useNavigate();
    const fclData = useSelector((state) => state.procurement.fcl_data);
    const fcl_loader = useSelector((state) => state.procurement.fcl_get_loader);
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
    const dispatch = useDispatch();     

    const viewPopupHandler = (data) => {
        if (data?.status === "ACTIVE") {
            setModal(true);
            setViewData(data);
            dispatch(getFclFreightViewAction(data?.id));
            dispatch(getFclSurchargeViewAction(data?.id));            
        } else {
            console.log("Cannot view details for inactive data");
        }
    }

    const editPopupHandler = (data) => {
        console.log(data,"data");
        // navigate('/freight/ocean/fcl', { state: { data: data?.id } });
    }

    // modal
    const onCloseClick = () => {
        setModal(false);
    }

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        let newArr = [...fclTableData];
        const filteredDataArr = newArr.filter(item => {
            const isCarrierNameMatch = filterDetails?.carrier_name?.value === '' ||
              item?.carrier_name?.toLowerCase().includes(filterDetails?.carrier_name?.value?.toLowerCase());
          
            const isDestPortMatch = filterDetails?.dest_port?.value === '' ||
              item?.dest_port?.toLowerCase().includes(filterDetails?.dest_port?.value?.toLowerCase());
          
            const isOrgPortMatch = filterDetails?.org_port?.value === '' ||
              item?.org_port?.toLowerCase().includes(filterDetails?.org_port?.value?.toLowerCase());
          
            return isCarrierNameMatch && isDestPortMatch && isOrgPortMatch;
        });
        dispatch({type: FILTER_FCL_DATA, payload: filteredDataArr});

    }
    const clearValueHandler = () => {
        dispatch(getFclData());
        setfilterDetails(inputArr)
    }
    
    // Activate deactivate table data
    const switchHandler = (data) => {
        dispatch(updatefclSwitchData(data.id,data.is_active));
    }

    useEffect(() => {
        dispatch(getFclData());        
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Charge ID',
            accessor: 'id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeId cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Vendor Name/Carrier Name',
            accessor: (row) => `${row.tenantVendor === null ? row.tenantCarrierVendor.name : row.tenantVendor.name}`,
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
            Header: 'Rate Source',
            accessor: 'rateSource',
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
            Header: 'Valid From',
            accessor: 'validFrom',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Validity Application',
            accessor: 'validityApplication',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
                        <TopBreadcrumbs breadcrumbs={fclBreadcrumb} data={fclRateData} />

                        {/* React Table */}
                        <TableReact
                            columns={columns}
                            data={fclData?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'fcl'}
                            loader={fcl_loader}
                        />

                        {/* modal */}
                        <ModalFCLFreight modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'fcl'} />
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}