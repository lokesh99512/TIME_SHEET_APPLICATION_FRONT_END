import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import FilterOffCanvasComp from '../../Modal/FilterOffCanvasComp';
import TableCompareRate from './TableCompareRate';
import { CommonValue } from '../../partials/OceanCol';
import AirCompare from './AirCompare';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_CARGO_TYPE_DATA } from '../../../../../store/Global/actiontype';

const CompareRate = () => {
    document.title="Air Master || Navigating Freight Costs with Precision || Ultimate Rate Management platform"
    const [modal, setModal] = useState(false);
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

    const onCloseClick = () => {
        setModal(false);
    }

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        setIsRight(false);
        console.log(filterDetails,"filterDetails Air MaterBill-----------------------")
    }
    const clearValueHandler = () => {
        setfilterDetails(inputArr)
    }    

    const columns = useMemo(() => [
        {
            Header: "test1",
            columns:[
                {
                    Header: 'Booking Mode',
                    accessor: 'bookingMode',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test2",
            columns:[
                {
                    Header: 'Origin',
                    accessor: 'origin',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test3",
            columns:[
                {
                    Header: 'Destination',
                    accessor: 'destination',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test4",
            columns:[
                {
                    Header: 'Cargo Mode',
                    accessor: 'cargomode',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test5",
            columns:[
                {
                    Header: 'Cargo Type',
                    accessor: 'cargoType',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "test6",
            columns:[
                {
                    Header: 'Weight',
                    accessor: 'weight',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
            ]
        },
        {
            Header: "L1 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l1Details.l1fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l1Details.l1charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l1Details.l1total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        },
        {
            Header: "L2 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l2Details.l2fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l2Details.l2charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l2Details.l2total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        },
        {
            Header: "L3 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l3Details.l3fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l3Details.l3charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l3Details.l3total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        },
        {
            Header: "L4 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l4Details.l4fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l4Details.l4charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l4Details.l4total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        }, 
        {
            Header: "L5 - Ariline/Vendor",
            columns:[
                {
                    Header: 'FR/kg',
                    accessor: 'l5Details.l5fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'dd. Charges',
                    accessor: 'l5Details.l5charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l5Details.l5total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                    }
                }
            ]
        },
    ]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        {/* Compare */}
                        <AirCompare />

                        <TableCompareRate 
                            columns={columns}
                            data={[]}
                            isGlobalFilter={true}
                            isAddInvoiceList={true}
                            customPageSize={10}
                            toggleRightCanvas={toggleRightCanvas}
                            component={'air-waybill'}
                            loader={false}                        
                        />

                        {/* modal */}
                        {/* <ModalAir modal={modal} onCloseClick={onCloseClick} viewData={waybillFreightData} modalType={'air_waybill'} /> */}
                    </div>
                </Container>
            </div>
            {/* filter right sidebar */}
            <FilterOffCanvasComp isRight={isRight} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} />
        </>
    )
}

export default CompareRate
