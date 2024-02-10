import React, { useEffect, useState } from 'react'
import ResultCardSkeleton from '../../Skeleton/ResultCardSkeleton';
import { airasia_logo, airplane_filled, cube_filled, indigo_img, ship_filled, vistara_logo } from '../../../assets/images';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const AirFreightCard = ({ data, QuoteModalHandler, mainTab }) => {
    const [currentButton, setCurrentButton] = useState('Book Now');
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
        console.log("show details");
        // let newArr = [...showDetails];
        // if (newArr?.length !== 0) {
        //     if (newArr.some(obj => obj.index === index)) {
        //         newArr.find(obj => obj.index === index).details = !newArr.find(obj => obj.index === index).details
        //     } else {
        //         let newObj = { details: true, index }
        //         newArr.push(newObj);
        //     }
        // } else {
        //     let newObj = { details: true, index }
        //     newArr.push(newObj);
        // }
        // setShowDetails(newArr);
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
                            <div className="search_card_top d-flex align-items-center justify-content-between">
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
                                    <div className="total_wrap">
                                        <p className="total_price text-center" onClick={() => showDetailsHandler()}><b>₹ 525120</b></p>
                                    </div>
                                </div>
                            </div>
                            <div className="search_card_bottom d-flex justify-content-between align-items-center">
                                <p className='mb-0'><b>Agent Name:</b> ABC</p>
                                {console.log(currentButton,"currentButton")}
                                <div className="btn_wrap d-flex">
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="shadow-none prof_wrap1 btn btn-primary w-100 d-flex justify-space-between" tag="div">
                                            {currentButton || 'Book Now'}  <i className="mdi mdi-chevron-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end quantity_drop_wrap">
                                            {/* {mainTab === 'dom_air' && ( */}
                                                <DropdownItem tag="div">
                                                    <button type='button' className={`btn quote_now_btn w-100 ${currentButton === 'Book Now' ? 'active' : ''}`} onClick={() => {setCurrentButton('Book Now');bookNowHandler();}}>Book Now</button>
                                                </DropdownItem>
                                            {/* )} */}
                                            <DropdownItem tag="div">
                                                <button type='button' className={`btn quote_now_btn w-100 ${currentButton === 'Quote Now' ? 'active' : ''}`} onClick={() => {setCurrentButton('Quote Now');bookNowHandler();}}>Quote Now</button>
                                            </DropdownItem>
                                            {/* <DropdownItem tag="div">
                                                        <button type='button' className='btn quote_now_btn w-100'>View Detail</button>
                                                    </DropdownItem> */}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </div>
                            <div className="card_corder-label"><span><b>Master Air waybill</b></span></div>
                            <div className="search_card_middle_wrap">
                                <div className="d-flex justify-content-center align-items-center mb-2">
                                    <span><b>5 hrs</b></span>
                                    <span className="icon d-flex align-items-center justify-content-center icon_wrap"><img src={airplane_filled} alt="Shipping" /></span>
                                </div>
                                <div className="search_card_middle d-flex justify-content-between">
                                    <div className="origin_details">
                                        <p>Chatrapati Shivaji</p>
                                        <p className="time">02:40</p>
                                        <p className="date">Mon, 12 February, 2024</p>
                                    </div>
                                    <div className="origin_details">
                                        <p>Chatrapati Shivaji</p>
                                        <p className="time">02:40</p>
                                        <p className="date">Mon, 12 February, 2024</p>
                                    </div>
                                    <div className="destination_details">
                                        <p>Bengaluru</p>
                                        <p className="time">04:40</p>
                                        <p className="date">Mon, 12 February, 2024</p>
                                    </div>
                                    <div className="destination_details">
                                        <p>Bengaluru</p>
                                        <p className="time">04:40</p>
                                        <p className="date">Mon, 12 February, 2024</p>
                                    </div>
                                </div>
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
                            <div className="search_card_top d-flex align-items-center justify-content-between">
                                <div className="left_details d-flex align-items-center">
                                    <div className="icon"><img src={airasia_logo} alt="indigo_img" /></div>
                                    <div className="con">
                                        <p className='flight_name'>Air Asia</p>
                                        <p className="flight_num">32W/6E-6780</p>
                                    </div>
                                </div>
                                <div className="center_details">
                                    <span className="carrier_name">GCR</span>
                                </div>
                                <div className="right_details">
                                    <div className="total_wrap">
                                        <p className="total_price text-center" onClick={() => showDetailsHandler()}><b>₹ 525120</b></p>
                                    </div>
                                </div>
                            </div>
                            <div className="search_card_bottom d-flex justify-content-between align-items-center">
                                <p className='mb-0'><b>Agent Name:</b> ABC</p>
                                {console.log(currentButton,"currentButton")}
                                <div className="btn_wrap d-flex">
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="shadow-none prof_wrap1 btn btn-primary w-100 d-flex justify-space-between" tag="div">
                                            {currentButton || 'Book Now'}  <i className="mdi mdi-chevron-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end quantity_drop_wrap">
                                            {/* {mainTab === 'dom_air' && ( */}
                                                <DropdownItem tag="div">
                                                    <button type='button' className={`btn quote_now_btn w-100 ${currentButton === 'Book Now' ? 'active' : ''}`} onClick={() => {setCurrentButton('Book Now');bookNowHandler();}}>Book Now</button>
                                                </DropdownItem>
                                            {/* )} */}
                                            <DropdownItem tag="div">
                                                <button type='button' className={`btn quote_now_btn w-100 ${currentButton === 'Quote Now' ? 'active' : ''}`} onClick={() => {setCurrentButton('Quote Now');bookNowHandler();}}>Quote Now</button>
                                            </DropdownItem>
                                            {/* <DropdownItem tag="div">
                                                        <button type='button' className='btn quote_now_btn w-100'>View Detail</button>
                                                    </DropdownItem> */}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </div>
                            <div className="card_corder-label"><span><b>Console</b></span></div>
                            <div className="search_card_middle_wrap">
                                <div className="d-flex justify-content-center align-items-center mb-2">
                                    <span><b>05 h 15 m</b></span>
                                    <span className="icon d-flex align-items-center justify-content-center icon_wrap"><img src={airplane_filled} alt="Shipping" /></span>
                                </div>
                                <div className="search_card_middle d-flex justify-content-between">
                                    <div className="origin_details">
                                        <p>Chatrapati Shivaji</p>
                                        <p className="time">02:40</p>
                                        <p className="date">Mon, 12 February, 2024</p>
                                    </div>
                                    <div className="destination_details">
                                        <p>Bengaluru</p>
                                        <p className="time">04:40</p>
                                        <p className="date">Mon, 12 February, 2024</p>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
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
                            <div className="search_card_top d-flex align-items-center justify-content-between">
                                <div className="left_details d-flex align-items-center">
                                    <div className="icon"><img src={vistara_logo} alt="indigo_img" /></div>
                                    <div className="con">
                                        <p className='flight_name'>Vistara</p>
                                        <p className="flight_num">UK 983</p>
                                    </div>
                                </div>
                                <div className="center_details">
                                    <span className="carrier_name">GCR</span>
                                </div>
                                <div className="right_details">
                                    <div className="total_wrap">
                                        <p className="total_price text-center" onClick={() => showDetailsHandler()}><b>₹ 525120</b></p>
                                    </div>
                                </div>
                            </div>
                            <div className="search_card_bottom d-flex justify-content-between align-items-center">
                                <p className='mb-0'><b>Agent Name:</b> ABC</p>
                                {console.log(currentButton,"currentButton")}
                                <div className="btn_wrap d-flex">
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="shadow-none prof_wrap1 btn btn-primary w-100 d-flex justify-space-between" tag="div">
                                            {currentButton || 'Book Now'}  <i className="mdi mdi-chevron-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end quantity_drop_wrap">
                                            {/* {mainTab === 'dom_air' && ( */}
                                                <DropdownItem tag="div">
                                                    <button type='button' className={`btn quote_now_btn w-100 ${currentButton === 'Book Now' ? 'active' : ''}`} onClick={() => {setCurrentButton('Book Now');bookNowHandler();}}>Book Now</button>
                                                </DropdownItem>
                                            {/* )} */}
                                            <DropdownItem tag="div">
                                                <button type='button' className={`btn quote_now_btn w-100 ${currentButton === 'Quote Now' ? 'active' : ''}`} onClick={() => {setCurrentButton('Quote Now');bookNowHandler();}}>Quote Now</button>
                                            </DropdownItem>
                                            {/* <DropdownItem tag="div">
                                                        <button type='button' className='btn quote_now_btn w-100'>View Detail</button>
                                                    </DropdownItem> */}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </div>
                            <div className="card_corder-label"><span><b>Master Air waybill</b></span></div>
                            <div className="search_card_middle_wrap">
                                <div className="d-flex justify-content-center align-items-center mb-2">
                                    <span><b>02 h 15 m</b></span>
                                    <span className="icon d-flex align-items-center justify-content-center icon_wrap"><img src={airplane_filled} alt="Shipping" /></span>
                                </div>
                                <div className="search_card_middle d-flex justify-content-between">
                                    <div className="origin_details">
                                        <p>Mumbai, India</p>
                                        <p className="time">08:50</p>
                                        <p className="date">Sun, 11 Feb 24</p>
                                    </div>
                                    <div className="destination_details">
                                        <p>New Delhi, India</p>
                                        <p className="time">11:10</p>
                                        <p className="date">Sun, 11 Feb 24</p>
                                    </div>
                                </div>
                            </div>
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
