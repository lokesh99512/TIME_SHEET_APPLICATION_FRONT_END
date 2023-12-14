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
import { getAllTableSurcharge, getAllTableSurchargeAlias, getFclSurchargeData } from '../../../store/Settings/actions'
import { useDispatch } from 'react-redux'
import { CarrierName, ChargeAliasCode, ChargeCategory, ChargeCode, ChargeDesc, ChargeId } from './SurchargeCol'
import { edit_icon, eye_icon } from '../../../assets/images'
import ModalAddNew from './Modal/ModalAddNewCategory'
import { useNavigate } from 'react-router-dom'


export default function FclSurcharge() {
    const { settings_surcharges_table_data, settings_surcharges_alias_table_data } = useSelector((state) => state?.settings);

    // console.log(settings_surcharges_table_data, "<<<<");
    // console.log(settings_surcharges_alias_table_data, "<<<settings_surcharges_alias_table_data");
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
    // const navigate = useNavigate();

    const viewPopupHandler = (data) => {
        // console.log(data, "data in viewPopupHandler");
        setModal(true);
        setViewData(data);
    }

    const onCloseClick = () => {
        setModal(false);
    }

    const editHandler = (id) => {
        console.log(id, "e.target.value");
        // navigate("/settings/upload/fclSurcharge", {
        //     state: {
        //         id
        //     }
        // })
    }

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        console.log(filterDetails, "filterDetails fcl-----------------------")
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }



    useEffect(() => {
        dispatch(getAllTableSurcharge())
        dispatch(getAllTableSurchargeAlias())

        // dispatch(getFclSurchargeData());
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'Surcharge Code',
            accessor: 'code',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeCode cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Surcharge Desc',
            accessor: 'description',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeDesc cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Surcharge Category',
            accessor: 'surchargeCategory.name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {

                return <ChargeCategory cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'SurchargeAliasCode',
            accessor: "surchargeAlias.name",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeAliasCode cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Action',
            Cell: (cellProps) => {
                // console.log(cellProps, "cellProps in actions")
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                                onClick={() => {
                                    editHandler(cellProps?.row?.original?.id)
                                }}
                            >
                                Edit
                                <img
                                    src={edit_icon}
                                    alt="Edit"
                                // onClick={() => {
                                //     editHandler(cellProps?.row?.original?.id)
                                // }}
                                />
                            </DropdownItem>
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
                            data={settings_surcharges_table_data?.content || []}
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