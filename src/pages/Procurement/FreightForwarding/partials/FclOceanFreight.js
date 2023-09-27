import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Modal, ModalBody, ModalHeader, UncontrolledDropdown } from 'reactstrap'
import { fclBreadcrumb, fclRateData } from '../../../../common/data/procurement'
import { CargoType, CarrierName, ChargeId, DestPort, OrgPort, TransitTime, ValidFrom, ValidTill, VendorName, ViaPort } from './OceanCol'
import TableReact from './TableReact'
import TopBreadcrumbs from './TopBreadcrumbs'
import { edit_icon, eye_icon } from '../../../../assets/images'

export default function FclOceanFreight() {
    const fclData = useSelector((state) => state.procurement.fcl_data);
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const [state, setState] = useState(true);

    const viewPopupHandler = (data) => {
        setModal(true);
        setViewData(data);
    }

    const onCloseClick = () => {
        setModal(false);
    }

    const columns = useMemo(() => [
        {
            Header: 'Charge ID',
            accessor: 'charge_id',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ChargeId {...cellProps} />
            }
        },
        {
            Header: 'Carrier Name',
            accessor: 'carrier_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CarrierName {...cellProps} />
            }
        },
        {
            Header: 'Vendor Name',
            accessor: 'vendor_name',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <VendorName {...cellProps} />
            }
        },
        {
            Header: 'Org Port',
            accessor: 'org_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <OrgPort {...cellProps} />
            }
        },
        {
            Header: 'Dest Port',
            accessor: 'dest_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <DestPort {...cellProps} />
            }
        },
        {
            Header: 'Via Port',
            accessor: 'via_port',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ViaPort {...cellProps} />
            }
        },
        {
            Header: 'Valid From',
            accessor: 'valid_form',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidFrom {...cellProps} />
            }
        },
        {
            Header: 'Valid Till',
            accessor: 'valid_till',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <ValidTill {...cellProps} />
            }
        },
        {
            Header: 'Transit Time',
            accessor: 'transit_time',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <TransitTime {...cellProps} />
            }
        },
        {
            Header: 'Cargo Type',
            accessor: 'cargo_type',
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return <CargoType {...cellProps} />
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
                                        checked={state}
                                        onClick={() => {
                                            setState(!state);
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
    // const handleSorting = (sortField, sortOrder,type) => {
    //     const sorted = customSort(fclData, sortField, sortOrder);
    //     dispatch(updateFclData(sorted));
    // };  
    return (
        <>
            {/* breadcrumbs && rate */}
            <TopBreadcrumbs breadcrumbs={fclBreadcrumb} data={fclRateData} />
            
            {/* filter */}
            {/* <CommonFilterComp />  */}

            {/* React Table */}
            <TableReact
                columns={columns}
                data={fclData}
                isGlobalFilter={true}
                isAddInvoiceList={true}
                customPageSize={10}
            />

            {/* modal */}
            <Modal isOpen={modal} toggle={onCloseClick} className='table_view_modal'>
                <ModalHeader tag="h4">
                    View Details
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <div className="table_view_data_wrap">
                        <div className="view_data_wrap d-flex flex-wrap">
                            <div className="details">
                                <span className="title">Cargo Type:</span>
                                <span className="data">{viewData?.cargo_type || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">Last Update on:</span>
                                <span className="data">{viewData?.last_update || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">Cargo Class:</span>
                                <span className="data">{viewData?.cargo_class || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">Last Update By:</span>
                                <span className="data">{viewData?.last_update_by || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">Product:</span>
                                <span className="data">{viewData?.product || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">Created On:</span>
                                <span className="data">{viewData?.created_on || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">Validity Application:</span>
                                <span className="data">{viewData?.validity_application || '-'}</span>
                            </div>
                        </div>
                        <div className="view_data_wrap d-flex flex-wrap">
                            <div className="details">
                                <span className="title">20 DV/GP:</span>
                                <span className="data">{viewData?.dv_gp || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">War Risk Surcharge:</span>
                                <span className="data">{viewData?.war_surcharges || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">20 DV/GP:</span>
                                <span className="data">{viewData?.dv_gp2 || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">BAF Per Container:</span>
                                <span className="data">{viewData?.baf || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">40 HQ/HC:</span>
                                <span className="data">{viewData?.hq_hc || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">Currency:</span>
                                <span className="data">{viewData?.currency || '-'}</span>
                            </div>
                            <div className="details">
                                <span className="title">40 HQ/HC:</span>
                                <span className="data">{viewData?.hq_hc2 || '-'}</span>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            
            {/* Table */}
            {/* <FreightCommonTable column={fclColumn} data={fclData} type={'fcl_ocean'} handleSorting={handleSorting} /> */}
            {/* <BootstrapTable keyField='id' data={ data } columns={ fclColumn }  /> */}
        </>
    )
}