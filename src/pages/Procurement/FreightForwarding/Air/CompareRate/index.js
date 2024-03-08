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
import { airDummyData } from '../../../../../common/data/procurement';

const CompareRate = () => {
    document.title = "Air Master || Navigating Freight Costs with Precision || Ultimate Rate Management platform"
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
        console.log(filterDetails, "filterDetails Air MaterBill-----------------------")
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
                        return <CommonValue cellProps={cellProps} />
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
                        return <CommonValue cellProps={cellProps} />
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
                        return <CommonValue cellProps={cellProps} />
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
                        return <CommonValue cellProps={cellProps} />
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
                        return <CommonValue cellProps={cellProps} />
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
                        return <CommonValue cellProps={cellProps} />
                    }
                },
            ]
        },
        {
            Header: "L1 - Go Indigo",
            columns:[
                {
                    Header: 'Frght/Kg',
                    accessor: 'l1Details.l1fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Oth Chrgs/KG',
                    accessor: 'l1Details.l1charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l1Details.l1total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                }
            ]
        },
        {
            Header: "L2 - Go Indigo - BALAJI",
            columns:[
                {
                    Header: 'Frght/Kg',
                    accessor: 'l2Details.l2fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Oth Chrgs/KG',
                    accessor: 'l2Details.l2charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l2Details.l2total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                }
            ]
        },
        {
            Header: "L3 - AIR ASIA",
            columns:[
                {
                    Header: 'Frght/Kg',
                    accessor: 'l3Details.l3fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Oth Chrgs/KG',
                    accessor: 'l3Details.l3charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l3Details.l3total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                }
            ]
        },
        {
            Header: "L4 - Go Indigo",
            columns:[
                {
                    Header: 'Frght/Kg',
                    accessor: 'l4Details.l4fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Oth Chrgs/KG',
                    accessor: 'l4Details.l4charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l4Details.l4total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                }
            ]
        }, 
        {
            Header: "L5 - Go Indigo",
            columns:[
                {
                    Header: 'Frght/Kg',
                    accessor: 'l5Details.l5fr',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Oth Chrgs/KG',
                    accessor: 'l5Details.l5charges',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                },
                {
                    Header: 'Total/KG',
                    accessor: 'l5Details.l5total',
                    filterable: true,
                    disableFilters: true,
                    Cell: (cellProps) => {
                        return <CommonValue cellProps={cellProps} />
                    }
                }
            ]
        },
    ]);

    // const columns = useMemo(() => [
    //     {
    //         id: 'expander',
    //         Header: 'Booking Mode',
    //         accessor: 'bookingMode',
    //         filterable: true,
    //         disableFilters: true,
    //         Cell: (cellProps) => {
    //             // console.log(cellProps.row,"cellProps.row");
    //             return (
    //                 <span onClick={() => {cellProps.row.toggleRowExpanded(); }}>{cellProps.value ? cellProps.value : '-'} {cellProps?.row?.isExpanded ? '👇' : '👉'}</span>
    //             )
    //         }
    //     },
    //     {
    //         Header: 'Origin',
    //         accessor: 'origin',
    //         filterable: true,
    //         disableFilters: true,
    //         Cell: (cellProps) => {
    //             return <CommonValue cellProps={cellProps} />
    //         },
    //         footer: props => props.column.id,
    //     },
    //     {
    //         Header: 'Destination',
    //         accessor: 'destination',
    //         filterable: true,
    //         disableFilters: true,
    //         Cell: (cellProps) => {
    //             return <CommonValue cellProps={cellProps} />
    //         },
    //         footer: props => props.column.id,
    //     },
    //     {
    //         Header: 'Cargo Mode',
    //         accessor: 'cargomode',
    //         filterable: true,
    //         disableFilters: true,
    //         Cell: (cellProps) => {
    //             return <CommonValue cellProps={cellProps} />
    //         },
    //         footer: props => props.column.id,
    //     },
    //     {
    //         Header: 'Cargo Type',
    //         accessor: 'cargoType',
    //         filterable: true,
    //         disableFilters: true,
    //         Cell: (cellProps) => {
    //             return <CommonValue cellProps={cellProps} />
    //         },
    //         footer: props => props.column.id,
    //     },
    //     {
    //         Header: 'Weight',
    //         accessor: 'weight',
    //         filterable: true,
    //         disableFilters: true,
    //         Cell: (cellProps) => {
    //             return <CommonValue cellProps={cellProps} />
    //         },
    //         footer: props => props.column.id,
    //     }
    // ])

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        {/* Compare */}
                        <AirCompare />

                        <TableCompareRate
                            columns={columns}
                            data={airDummyData || []}
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
