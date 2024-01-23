import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import { cube_filled, oocl_logo, ship_filled, truck_outline, zim_logo } from '../../../../assets/images';
import { convertToINR } from '../../../../components/Common/CommonLogic';
import { QUOTATION_RESULT_SELECTED, UPDATE_QUOTATION_RESULT_DETAILS } from '../../../../store/InstantRate/actionType';
import ResultCardSkeleton from '../../../Skeleton/ResultCardSkeleton';
const SearchResultCard = ({ data, QuoteModalHandler }) => {
    const [showDetails, setShowDetails] = useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState('');
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
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.carrierId === item.carrierId);

            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.carrierId !== item.carrierId);
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            } else {
                const updatedSelection = [...quote_Selected, item];
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            }
        } else {
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.carrierId === item.carrierId);
            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.carrierId !== item.carrierId);
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
            if(currentOuter?.selected){
                innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                return accInner + convertToINR(Number(currentInner.amount), currentInner.currencyCode);
                }, 0);
            }          
            return accOuter + innerSum;
        }, 0);
        return totalSum;
    }
    return (
        <div>
            {result_loader ? <ResultCardSkeleton /> : (
                <div className="result_tab_content_wrap">  
                    {data?.length !== 0 ? data?.map((item, index) => (
                        <div className="search_result_card_check_wrap d-flex align-items-center" key={`main_${index}`}>
                            <div className={`form-check me-2`} onClick={(e) => quotationCheckHandler(item)}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`result_card_${index}`}
                                    name={`result_card_${index}`}
                                    checked={quote_Selected.some(obj => obj.carrierId === item.carrierId)}
                                    readOnly
                                />
                            </div>
                            <div className="search_result_card">
                                <div className="search_result_card_header d-flex align-items-center">
                                    <div className="card_img">
                                        <span className='d-flex align-items-center justify-content-center img mx-auto'>
                                            <img src={item?.carrierLogo ? item?.carrierLogo : cube_filled} alt="Logo" />
                                        </span>
                                        <span className="title d-block text-center mt-2">{item?.carrierName || '-'}</span>
                                    </div>
                                    <div className="middle_content">
                                        {/* {console.log(instantRateLocation,"instantRateLocation")} */}
                                        <span className="duration text-center d-block">Duration <b>{item.oceanTransitTime || 0} days</b></span>
                                        <div className="from_to_wrap mt-2 mb-3 d-flex justify-content-between">
                                            <span className="from_loc">{item?.originName || '-'}</span>
                                            <span className="icon d-flex align-items-center justify-content-center"><img src={ship_filled} alt="Shipping" /></span>
                                            <span className="to_loc">{item?.destinationName || '-'}</span>
                                        </div>
                                        {/* <div className="from_to_wrap mt-2 mb-3 d-flex justify-content-between">
                                            {item.location_route.length === 4 ? (
                                                <>
                                                    <span className="from_loc">{item?.location_route[0]}</span>
                                                    <span className="from_loc text-center">{item?.location_route[1]}</span>
                                                    <span className="icon d-flex align-items-center justify-content-center"><img src={ship_filled} alt="Shipping" /></span>
                                                    <span className="to_loc text-center">{item?.location_route[2]}</span>
                                                    <span className="to_loc">{item?.location_route[3]}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="from_loc">{item?.location_route[0]}</span>
                                                    <span className="icon d-flex align-items-center justify-content-center"><img src={ship_filled} alt="Shipping" /></span>
                                                    <span className="to_loc">{item?.location_route[1]}</span>
                                                </>
                                            )}
                                        </div> */}
                                        <div className="row">
                                            <div className="col-lg-6 text-left"><span>Valid: <b>{item?.validTo || '-'}</b></span></div>
                                            {/* <div className="col-lg-4 text-center"><span>Id: <b>{item.id || '-'}</b></span></div> */}
                                            {/* <div className="col-lg-6 text-end"><span>CO2: <b>{item.co_two || '-'}</b></span></div> */}
                                        </div>
                                    </div>
                                    <div className="total_wrap">
                                        <p className="total_price text-center"><b>₹ {TotalQuotationCount(item)}</b></p>
                                        <div className="btn_wrap d-flex">
                                            <button type='button' className='btn text-primary view_detail_btn' onClick={() => { showDetailsHandler(index, item.carrierId); }}>
                                                View{showDetails?.find(obj => obj.index === index)?.details ? 'Less' : 'Detail'}</button>
                                            <button type='button' className='btn btn-primary quote_now_btn' onClick={() => { QuoteModalHandler(); singleQuoteModal(item) }} disabled={quote_Selected.some(obj => obj.id === item.carrierId) || quote_Selected?.length >= 2}>Quote Now</button>
                                        </div>
                                    </div>
                                </div>
                                {showDetails?.find(obj => obj.index === index)?.details && (
                                    <div className="search_result_accordion_details">  
                                        {item?.tariffDetails?.length !== 0 && (                                    
                                            <Accordion flush open={open} toggle={toggle}>
                                                {item?.tariffDetails?.map((data, index) => (                                            
                                                    <AccordionItem key={index}>
                                                        <AccordionHeader targetId={`detail_${index}`}>
                                                            <div className="left_lable d-flex align-items-center">
                                                                <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!data?.selected, data?.header,index,item?.carrierId); }}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id={`${data?.header}`}
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
                                                                {/* {item.pickup_co !== '' && <span>CO2: <b>{item.pickup_co}</b></span>} */}
                                                                <span className='text-primary'>{'₹'} {innerTotalHandler(data?.tariffBreakDowns || [])}</span>
                                                            </div>
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId={`detail_${index}`}>
                                                            <div className="price_details_wrap ps-5">
                                                                {data?.tariffBreakDowns?.length !== 0 && data?.tariffBreakDowns?.map((val,index) => (
                                                                    <div className="details d-flex justify-content-between" key={`key_${index}`}>
                                                                        <p className='me-2'>{val?.component || 'Pickup'}</p>
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
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className='no_data_found p-5 border rounded mt-4'>
                            <p className='text-center'>
                                <b>No Data Found</b>
                                <button type='button' className='btn btn-primary d-table mx-auto mt-3'>Request For Quote</button>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchResultCard
