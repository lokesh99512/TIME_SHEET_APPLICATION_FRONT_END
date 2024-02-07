import React, { useEffect, useState } from 'react'
import ResultCardSkeleton from '../../Skeleton/ResultCardSkeleton';
import { airplane_filled, cube_filled, indigo_img, ship_filled } from '../../../assets/images';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const AirFreightCard = ({ data, QuoteModalHandler, mainTab }) => {
    const [showDetails, setShowDetails] = useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState('');
    const [resultRoute, setResultRoute] = useState([]);
    const quote_Selected = useSelector((state) => state.instantRate.quote_selected_data);
    const { instantRateLocation, result_loader } = useSelector((state) => state.instantRate);

    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

    const showDetailsHandler = (index, id) => {
        let newArr = [...showDetails];
        if (newArr?.length !== 0) {
            if (newArr.some(obj => obj.index === index)) {
                newArr.find(obj => obj.index === index).details = !newArr.find(obj => obj.index === index).details
            } else {
                let newObj = { details: true, index }
                newArr.push(newObj);
            }
        } else {
            let newObj = { details: true, index }
            newArr.push(newObj);
        }
        setShowDetails(newArr);
    }

    const handleChange = (val, name, index, id) => {
        dispatch({ type: UPDATE_QUOTATION_RESULT_DETAILS, payload: { name, value: val, id, index } })
        let newArry = [];
        dispatch({ type: QUOTATION_RESULT_SELECTED, payload: newArry })
    }

    const quotationCheckHandler = (item) => {
        const maxSelection = 3;

        if (quote_Selected.length < maxSelection) {
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.quote_id === item.quote_id);

            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.quote_id !== item.quote_id);
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            } else {
                const updatedSelection = [...quote_Selected, item];
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            }
        } else {
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.quote_id === item.quote_id);
            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.quote_id !== item.quote_id);
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            }
            console.log("You can select a maximum of 3 items.");
        }
    }
    const singleQuoteModal = (item) => {
        let newArry = [item]
        dispatch({ type: QUOTATION_RESULT_SELECTED, payload: newArry })
    }

    // Total & SubTotal ----------------------------------     
    const innerTotalHandler = (array) => {
        return array !== undefined ? array?.reduce((total, charge) => total + convertToINR(Number(charge.amount), charge.currencyCode), 0) : 0;
    }
    const TotalQuotationCount = (item) => {
        const totalSum = item?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = 0;
            if (currentOuter?.selected) {
                innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                    return accInner + convertToINR(Number(currentInner.amount), currentInner.currencyCode);
                }, 0);
            }
            return accOuter + innerSum;
        }, 0);
        return totalSum;
    }

    useEffect(() => {
        let routeArray = data?.map((item, index) => {
            let newArray = [];
            item.tariffDetails?.map((charge) => {
                if (charge?.selected) {
                    if (charge.from !== undefined) {
                        newArray = [...newArray, charge.from, charge.to];
                    }
                }
            })
            return newArray
        })

        let uniqueArray = routeArray?.map((item) => {
            let newitem = item.filter((value, index, self) => self.indexOf(value) === index);
            return newitem
        })

        setResultRoute(uniqueArray);
    }, [data]);


    const bookNowHandler = () => {
        console.log("bookNowHandler");
    }

    return (
        <div>
            {result_loader ? <ResultCardSkeleton /> : (
                <div className="result_tab_content_wrap air_freight_result_wrap">
                    {/* {data?.length !== 0 ? data?.map((item, index) => ( */}
                    <div className="search_result_card_check_wrap d-flex align-items-center">
                        <div className={`form-check me-2`} >
                            {/* onClick={(e) => quotationCheckHandler(item)} */}
                            <input
                                className="form-check-input"
                                type="checkbox"
                                // id={`result_card_${index}`}
                                // name={`result_card_${index}`}
                                // checked={quote_Selected.some(obj => obj.quote_id === item.quote_id)}
                                readOnly
                            />
                        </div>
                        <div className="search_result_card air_freight_result_card">
                            {/* <div className="search_card_top d-flex align-items-center justify-content-between">
                                <div className="left_details d-flex align-items-center">
                                    <div className="icon"><img src={indigo_img} alt="indigo_img" /></div>
                                    <div className="con">
                                        <p className='flight_name'>INDIGO</p>
                                        <p className="flight_num">32W/6E-6779</p>
                                    </div>
                                </div>
                                <div className="center_details">
                                    <span className="carrier_name">GCR</span>
                                </div>
                                <div className="right_details">
                                    <button type='button' className='btn text-primary view_detail_btn'>
                                            View Detail</button>
                                    <button type='button' className='btn btn-primary quote_now_btn'>Quote Now</button>
                                </div>
                            </div>                            
                            <div className="middle_content">
                                <span className="duration text-center d-block"><b>5 hrs</b></span>
                                <div className="from_to_wrap multi_route mt-2 mb-3 d-flex justify-content-between">
                                    <span className="icon d-flex align-items-center justify-content-center"><img src={airplane_filled} alt="Shipping" /></span>
                                    <span className="from_loc">BLR</span>
                                    <span className="from_loc">BOM</span>
                                </div>
                            </div> */}
                            <div className="card_corder-label"><span>Mode Type</span></div>
                            <div className="search_result_card_header d-flex align-items-center">
                                <div className="card_img">
                                    <span className='d-flex align-items-center justify-content-center img mx-auto'>
                                        <img src={indigo_img} alt="Logo" />
                                    </span>
                                    <div className='mt-2 text-center'>
                                        <span className="flight_name d-block">INDIGO</span>
                                        <p className="flight_num">32W/6E-6779</p>
                                    </div>
                                </div>
                                <div className="middle_content">
                                    <span className="duration text-center d-block"><b>5 hrs</b></span>
                                    <div className="from_to_wrap multi_route mt-2 mb-3 d-flex justify-content-between">
                                        <span className="icon d-flex align-items-center justify-content-center"><img src={airplane_filled} alt="Shipping" /></span>
                                        <span className="from_loc">test</span>
                                        <span className="from_loc">test</span>
                                    </div>
                                </div>
                                <div className="total_wrap">
                                    <p className="total_price text-center"><b>₹ 100</b></p>
                                    <div className="btn_wrap d-flex">
                                        <button type='button' className='btn text-primary view_detail_btn'>View Detail</button>
                                        {mainTab === 'dom_air' ? (
                                            <UncontrolledDropdown>
                                                <DropdownToggle className="shadow-none prof_wrap1 btn btn-primary w-100 d-flex justify-space-between" tag="div">
                                                    See More
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end quantity_drop_wrap">
                                                        <DropdownItem tag="div">
                                                            <button type='button' className='btn btn-primary quote_now_btn w-100' onClick={() => bookNowHandler()}>Book Now</button>
                                                        </DropdownItem>
                                                        <DropdownItem tag="div">
                                                            <button type='button' className='btn btn-primary quote_now_btn w-100'>Quote Now</button>
                                                        </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        ) : (
                                            <button type='button' className='btn btn-primary quote_now_btn'>Quote Now</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="search_card_middle d-flex justify-content-between">
                                <div className="origin_details">
                                    <p>Bengaluru</p>
                                    <p className="time">02:40</p>
                                    <p className="date">Mon, 12 February, 2024</p>
                                </div>
                                <div className="destination_details">
                                    <p>Chatrapati Shivaji</p>
                                    <p className="time">04:40</p>
                                    <p className="date">Mon, 12 February, 2024</p>
                                </div>
                            </div>
                            <div className="search_card_bottom d-flex justify-content-between">
                                <p className='mb-0'><b>Carrier Name:</b> GCR</p>
                                <p className='mb-0'><b>Agent Name:</b> Test</p>
                            </div>
                            {/* {showDetails?.find(obj => obj.index === index)?.details && (
                                    <div className="search_result_accordion_details">
                                        {item?.tariffDetails?.length !== 0 && (
                                            <Accordion flush open={open} toggle={toggle}>
                                                {item?.tariffDetails?.map((data, i) => (
                                                    <AccordionItem key={i}>
                                                        <AccordionHeader targetId={`${data?.header}_${index}${i}`}>
                                                            <div className="left_lable d-flex align-items-center">
                                                                <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!data?.selected, data?.header, i, item?.quote_id); }}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id={`${data?.header}${item.quote_id}`}
                                                                        name={`${data?.header}`}
                                                                        checked={data?.selected || false}
                                                                        readOnly
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`${data?.header}`}></label>
                                                                </div>
                                                                <img src={truck_outline} alt="Truck" className='me-2' />
                                                                {data?.header?.split('_').join(' ') || '-'}
                                                            </div>
                                                            <div className="right_con d-flex ms-auto">
                                                                <span className='text-primary'>{'₹'} {innerTotalHandler(data?.tariffBreakDowns || [])}</span>
                                                            </div>
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId={`${data?.header}_${index}${i}`}>
                                                            <div className="price_details_wrap ps-5">
                                                                {data?.tariffBreakDowns?.length !== 0 && data?.tariffBreakDowns?.map((val, ind) => (
                                                                    <div className="details d-flex justify-content-between" key={`key_${ind}`}>
                                                                        <p className='me-2'>{`${val?.component || ''} ${val?.containerDetail ? '- ' + val?.containerDetail : ''}`}</p>
                                                                        <span className='text-primary'>{val?.currencyCode || '₹'} {val?.amount || '0'}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        )}
                                    </div>
                                )} */}
                        </div>
                    </div>
                    {/* )) : (
                        <div className='no_data_found p-5 border rounded mt-4'>
                            <p className='text-center'>
                                <b>No Data Found</b>
                                <button type='button' className='btn btn-primary d-table mx-auto mt-3'>Request For Quote</button>
                            </p>
                        </div>
                    )} */}
                </div>
            )}
        </div>
    )
}

export default AirFreightCard
