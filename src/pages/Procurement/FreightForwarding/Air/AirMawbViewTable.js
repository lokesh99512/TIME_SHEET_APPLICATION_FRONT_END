import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container
} from "reactstrap";


import { useLocation, useNavigate } from "react-router-dom";
import { CommonValue } from "../partials/OceanCol";
import { Edit } from "../../../Settings/SettingsCol";
import { getAirConsoleDetails, getAirMawbDetails } from "../../../../store/Procurement/actions";
import TableMawbDetails from "./TableMawbDetails";
import TfBreadcrumbs from "../../../../components/Common/TfBreadcrumbs";
import { mawbBreadcrumb } from "../../../../common/data/sales";

const AirMawbDetails = () => {
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const navigateState = useLocation();
    const { consoleDetailsData, consoleDetailsDataLoader } = useSelector((state) => state?.procurement);

    const viewPopupHandler = (data) => {
        setModal(true);
        setViewData(data);
    };

    const onCloseClick = () => {
        setModal(false);
    }

    const switchHandler = (data) => {
        //dispatch(updateCustomerSwitchData(data.id, data.is_active));
    }
    const editHandler = (data) => {
        // navigate(`/customers/add-customer`, {
        //     state: {
        //         id: data?.id || '',
        //         data: data
        //     },
        // });
    };

    useEffect(() => {
        if (currentPage !== '' && currentPage !== undefined && navigateState?.state?.data) {
            let url = `?page=${currentPage}&size=10`;
            Object.entries(navigateState.state.data).forEach(([key, value]) => {
                if (value !== '' && value !== undefined && key !== "totalCount") {
                    url += `&${key}=${encodeURIComponent(value)}`;
                }
            });

            dispatch(getAirConsoleDetails(url));
        }
    }, [dispatch, currentPage, navigateState.state.data]);


    const columns = useMemo(
        () => [
            {
                Header: 'Org Port',
                accessor: (row) => `${row.originPort === null ? '' : row.originPort.name}`,
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: 'Dest Port',
                accessor: (row) => `${row.destinationPort === null ? '' : row.destinationPort.name}`,
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: 'Flight Mode',
                accessor: (row) => `${row.tenantCargoMode === null ? '' : row.tenantCargoMode.code}`,
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: 'Min Rate',
                accessor: 'minValue',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: 'N Rate',
                accessor: 'nrate',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: '+45kg',
                accessor: 'slab45',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: '+100Kg',
                accessor: 'slab100',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: '+250Kg',
                accessor: 'slab250',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: '+300Kg',
                accessor: 'slab300',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: '+500Kg',
                accessor: 'slab500',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
            {
                Header: '+1000Kg',
                accessor: 'slab1000',
                filterable: true,
                disableFilters: true,
                Cell: (cellProps) => {
                    return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                }
            },
         
            {
                Header: "Edit",
                Cell: (cellProps) => {
                    return <Edit cellProps={cellProps} viewPopupHandler={editHandler} />
                },
            },
        ],
        []
    );

    return (
        <>
            <div className="page-content settings_users_wrapper">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button
                            type="button"
                            className="btn border mb-3"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Back
                        </button>
                        <div className="tf_top_breadcrumb_rate_wrap">
                            <TfBreadcrumbs breadcrumb={mawbBreadcrumb} />
                            <div className="tf_box_wrap d-flex">
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Carrier Name</p>
                                    <div>
                                        {navigateState.state.data?.carrierName}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Vendor Name</p>
                                    <div>
                                        {navigateState.state.data?.agentName}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Valid From</p>
                                    <div>
                                        {navigateState.state.data?.validFrom}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Valid To</p>
                                    <div>
                                        {navigateState.state.data?.validTo}
                                    </div>
                                </div>
                                <div className="sh_box flex-grow-1" >
                                    <p className="box_title">Rate Rype</p>
                                    <div>
                                        {navigateState.state.data?.rateType}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TableMawbDetails
                            columns={columns}
                            data={consoleDetailsData?.content || []}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            // toggleRightCanvas={toggleRightCanvas}
                            component={"Customers"}
                            loader={consoleDetailsDataLoader || false}
                            setCurrentPage={setCurrentPage}
                            totalPages={consoleDetailsData?.totalPages || 0}
                            totalEntries={consoleDetailsData?.totalElements || 0}
                        />

                    </div>
                </Container>
            </div>
        </>
    );
};

export default AirMawbDetails;
