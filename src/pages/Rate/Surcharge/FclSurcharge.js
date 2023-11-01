import React, { useEffect, useMemo, useState } from 'react'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
// import ModalFreight from '../../Procurement/FreightForwarding/partials/Modal/ModalFreight'
// import FilterOffCanvasComp from '../../Procurement/FreightForwarding/partials/Modal/FilterOffCanvasComp'
import FilterOffCanvasComp from "./Modal/FilterOffCanvasComp"
import TopBreadcrumbs from './TopBreadcrumbs'
import TableReact from "./TableReact"
import { fclSurchargeBreadcrumb, fclSurchargeRateData } from '../../../common/data/procurement'
import { useSelector } from 'react-redux'
import { getFclData } from '../../../store/Procurement/actions'
import { getFclSurchargeData } from '../../../store/RateManagement/actions'
import { useDispatch } from 'react-redux'
import { CarrierName, ChargeAliasCode, ChargeCategory, ChargeCode, ChargeDesc, ChargeId } from './SurchargeCol'
import { edit_icon, eye_icon } from '../../../assets/images'
import ModalAddNew from './Modal/ModalAddNewCategory'


export default function FclSurcharge() {
    const fclSurchargeData = useSelector((state) => state.rate.fcl_surcharge_data);

    // console.log(fclSurchargeData,"<<<<");
    const [isRight, setIsRight] = useState(false);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const inputArr = {
        status: '',
        surcharge_code: '',
        surcharge_desc: '',
        surcharge_category: '',
        alias_code: '',
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
        console.log(filterDetails,"filterDetails fcl-----------------------")
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }
   
    useEffect(() => {

        // console.log(getFclSurchargeData() , "getFclSurchargeData");
       
        dispatch(getFclSurchargeData());
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            Header: 'Surcharge Code',
            accessor: 'charge_code',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeCode cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Surcharge Desc',
            accessor: 'charge_desc',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeDesc cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Surcharge Category',
            accessor: 'charge_category',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeCategory cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'SurchargeAliasCode',
            accessor: 'charge_alias_code',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeAliasCode cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'BL FEE',
            accessor: 'bl_fee',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeAliasCode cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'CERTIFICATE FEE',
            accessor: 'certificate_fee',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeAliasCode cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'EMPTY CONTAINER LIFT FEE',
            accessor: 'empty_container_fee',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeAliasCode cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
                            <DropdownItem onClick={(e)=>{console.log(e,"e")}}>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
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
  
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">

                        {/* breadcrumbs && rate */}
                        {/* <TopBreadcrumbs breadcrumbs={fclSurchargeBreadcrumb} data={fclSurchargeRateData} /> */}
                        <TopBreadcrumbs breadcrumbs={fclSurchargeBreadcrumb} />

                        {/* React Table */}
                        <TableReact
                            columns={columns}
                            data={fclSurchargeData || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'fclSurcharge'}
                        />

                        {/* modal */}
                        {/* <ModalAddNew modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'fclSurcharge'} /> */}
                    </div>
                </Container>
            </div>

            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}