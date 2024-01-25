import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap';

import { edit_icon, eye_icon } from '../../../../assets/images';
import { inLandBreadcrumb, inLandRateData } from '../../../../common/data/procurement';
import { getInLandData, getInLandFreightAction, getInLandSurchargeAction, updateInLandSwitchData, uploadFclInlandCarrierAction } from '../../../../store/Procurement/actions';
import FilterOffCanvasComp from '../Modal/FilterOffCanvasComp';
import ModalFclInlandCharge from '../Modal/ModalFclInlandCharge';
import { CarrierName, ChargeId, CommonReplaceValue, CommonValue, ValidTill, VendorName } from '../partials/OceanCol';
import TableReact from '../partials/TableReact';
import TopBreadcrumbs from '../partials/TopBreadcrumbs';

const FclInlandCharge = () => {
    document.title = "Inland Charges || Navigating Freight Costs with Precision||Ultimate Rate Management platform"

    const inlandData = useSelector((state) => state?.procurement?.fclInlandData);
    const inlandloader = useSelector((state) => state?.procurement?.fclInlandLoader);
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
        dispatch(getInLandFreightAction(data?.id));        
        dispatch(getInLandSurchargeAction(data?.id));        
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
        console.log(filterDetails, "filterDetails lcl-----------------------");
    }

    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }

    // Activate deactivate table data
    const switchHandler = (data) => {
        let obj = {
            id: data.id,
            version: data.version,
            status: data.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }
        console.log(obj, "obj inland");
        dispatch(uploadFclInlandCarrierAction(obj));
    }

    useEffect(() => {
        dispatch(getInLandData());
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
            accessor: (row) => `${row.tenantVendor === null ? row.tenantCarrier?.name : row.tenantVendor?.name}`,
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CarrierName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Rate Type',
            accessor: 'rateType',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
            }
        },
        {
            Header: 'Rate Source',
            accessor: 'rateSource',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
            Header: 'Action',
            Cell: (cellProps) => {
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem>Edit <img src={edit_icon} alt="Edit" /></DropdownItem>
                            <DropdownItem onClick={(e) => { e.stopPropagation(); viewPopupHandler(cellProps.row.original) }}>View <img src={eye_icon} alt="Eye" /></DropdownItem>
                            <DropdownItem onClick={(e) => e.stopPropagation()}>
                                {cellProps.row.original?.status === "ACTIVE" ? "Activate" : "Deactive"}
                                <div className="switch_wrap">
                                    <FormGroup switch>
                                        <Input
                                            type="switch"
                                            checked={cellProps.row.original?.status === 'ACTIVE' || false}
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
                            data={inlandData || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'inland'}
                            loader={inlandloader}
                        />

                        {/* modal */}
                        <ModalFclInlandCharge modal={modal} onCloseClick={onCloseClick} viewData={viewData} />
                    </div>
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} filterType={'inland'} clearValueHandler={clearValueHandler} />
        </>
    );
}

export default FclInlandCharge;
