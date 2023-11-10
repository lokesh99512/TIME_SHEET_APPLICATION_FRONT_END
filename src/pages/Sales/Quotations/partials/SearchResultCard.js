import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import { cube_filled, oocl_logo, ship_filled, truck_outline, zim_logo } from '../../../../assets/images';
import { QUOTATION_RESULT_SELECTED, UPDATE_QUOTATION_RESULT_DETAILS } from '../../../../store/Sales/actiontype';
import { convertToINR } from '../../../../components/Common/CommonLogic';
const SearchResultCard = ({ data, QuoteModalHandler }) => {
    const [showDetails, setShowDetails] = useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState('');
    const quote_Selected = useSelector((state) => state.sales.quote_selected_data);

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
            if (newArr.some(obj => obj.id === id)) {
                newArr.find(obj => obj.id === id).details = !newArr.find(obj => obj.id === id).details
            } else {
                let newObj = { details: true, id }
                newArr.push(newObj);
            }
        } else {
            let newObj = { details: true, id }
            newArr.push(newObj);
        }
        setShowDetails(newArr);
    }

    const handleChange = (val, name, index, id) => {
        dispatch({ type: UPDATE_QUOTATION_RESULT_DETAILS, payload: { name, value: val, id } })
        let newArry = [];
        dispatch({ type: QUOTATION_RESULT_SELECTED, payload: newArry })
    }

    const countPickup = (item) => {
        if (item.pickup_val === 'truck') {
            return item.truck_charge
        } else {
            return item.rail_charge
        }
    }    

    const quotationCheckHandler = (item) => {
        const maxSelection = 3;

        if (quote_Selected.length < maxSelection) {
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.id === item.id);

            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.id !== item.id);
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            } else {
                const updatedSelection = [...quote_Selected, item];
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            }
        } else {
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.id === item.id);
            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.id !== item.id);
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            }
            console.log("You can select a maximum of 3 items.");
        }
    }
    const singleQuoteModal = (item) => {
        let newArry = [item]
        dispatch({ type: QUOTATION_RESULT_SELECTED, payload: newArry })
    }

    // Total------------------     

    const innerTotalHandler = (array) => {
        return array !== undefined ? array?.reduce((total, charge) => total + convertToINR(Number(charge.buy_cost), charge.currency), 0) : 0;
    }

    const TotalQuotationCount = (item) => {
        let amount = 0;
        let pickupCharge = 0;
        let originPortCharge = 0;
        if (item.pickup) {
            // if (item.pickup_val === 'truck') {
            //     pickupCharge = Number(item.truck_charge || 0)
            // } else {
            //     pickupCharge = Number(item.rail_charge || 0)
            // }
            pickupCharge = item?.pickup_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge.buy_cost), charge.currency), 0)
            amount += pickupCharge
        }
        if (item.origin_port) {
            originPortCharge = item?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge.buy_cost), charge.currency), 0)
            amount += originPortCharge
        }
        if (item.ocean_freight) {
            // amount += convertToINR((Number(item.ocean_freight_charge) || 0), item.ocean_freight_charge_currency);
            amount += item?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge.buy_cost), charge.currency), 0)
        }
        if (item.pickport_discharge) {
            amount += item?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge.buy_cost), charge.currency), 0);
        }
        if (item.delivery) {
            // amount += convertToINR((Number(item.delivery_charge) || 0), item.delivery_currency);
            amount += item?.delivery_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge.buy_cost), charge.currency), 0);
        }
        return amount;
    }

    return (
        <div>
            <div className="result_tab_content_wrap">                
                {data?.length !== 0 ? data.map((item, index) => (
                    <div className="search_result_card_check_wrap d-flex align-items-center" key={item.id}>
                        <div className={`form-check me-2`} onClick={(e) => quotationCheckHandler(item)}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`result_card_${index}`}
                                name={`result_card_${index}`}
                                checked={quote_Selected.some(obj => obj.id === item.id)}
                                readOnly
                            />
                        </div>
                        <div className="search_result_card">
                            <div className="search_result_card_header d-flex align-items-center">
                                <div className="card_img">
                                    <span className='d-flex align-items-center justify-content-center img mx-auto'>
                                        <img src={item?.carrier_name.toLowerCase() === 'oocl' ? oocl_logo : item?.carrier_name.toLowerCase() === 'zim' ? zim_logo : cube_filled} alt="Logo" />
                                    </span>
                                    <span className="title d-block text-center mt-2">{item?.carrier_name}</span>
                                </div>
                                <div className="middle_content">
                                    <span className="duration text-center d-block">Duration <b>{item.duration} days</b></span>
                                    <div className="from_to_wrap mt-2 mb-3 d-flex justify-content-between">
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
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 text-left"><span>Valid: <b>{item.valid_to || '-'}</b></span></div>
                                        {/* <div className="col-lg-4 text-center"><span>Id: <b>{item.id || '-'}</b></span></div> */}
                                        <div className="col-lg-6 text-end"><span>CO2: <b>{item.co_two || '-'}</b></span></div>
                                    </div>
                                </div>
                                <div className="total_wrap">
                                    {/* <p className="total_price text-center"><b>${item?.total_cost}</b></p> */}
                                    <p className="total_price text-center"><b>₹ {TotalQuotationCount(item)}</b></p>
                                    <div className="btn_wrap d-flex">
                                        <button type='button' className='btn text-primary view_detail_btn' onClick={() => { showDetailsHandler(index, item.id); }}>
                                            View{showDetails?.find(obj => obj.id === item.id)?.details ? 'Less' : 'Detail'}</button>
                                        <button type='button' className='btn btn-primary' onClick={() => { QuoteModalHandler(); singleQuoteModal(item) }} disabled={quote_Selected.some(obj => obj.id === item.id) || quote_Selected?.length >= 2}>Quote Now</button>
                                    </div>
                                </div>
                            </div>
                            {showDetails?.find(obj => obj.id === item.id)?.details && (
                                <div className="search_result_accordion_details">
                                    <Accordion flush open={open} toggle={toggle}>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`pickup_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.pickup, 'pickup', index, item.id); }}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`pickup_${index}`}
                                                            name={`pickup`}
                                                            checked={item.pickup || false}
                                                            readOnly
                                                        />
                                                        <label className="form-check-label" htmlFor={`pickup_${index}`}></label>
                                                    </div>
                                                    <img src={truck_outline} alt="Truck" className='me-2' />
                                                    Pick up
                                                </div>
                                                {/* <div className="right_con d-flex ms-auto">
                                                    {item.pickup_co !== '' && <span>CO2: <b>{item.pickup_co}</b></span>}
                                                    <span className='text-primary'>₹ {countPickup(item)}</span>
                                                </div> */}
                                                <div className="right_con d-flex ms-auto">
                                                    {item.pickup_co !== '' && <span>CO2: <b>{item.pickup_co}</b></span>}
                                                    <span className='text-primary'>{'₹'} {innerTotalHandler(item?.pickup_quote_charge)}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`pickup_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    {item?.pickup_quote_charge?.length !== 0 && item?.pickup_quote_charge?.map((data,index) => (
                                                        <div className="details d-flex justify-content-between" key={`key_${index}`}>
                                                            <p className='me-2'>{data?.charges_name || 'Pickup'}</p>
                                                            <span className='text-primary'>{data?.currency || '₹'} {data.buy_cost || '0'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* {item?.pickup && (
                                                    <div className="radio_wrap">
                                                        {item?.truck && (
                                                            <div className="radio_con d-flex ps-5">
                                                                <div className={`form-check d-flex align-items-center`} onClick={(e) => handleChange('truck', 'pickup_val', index, item.id)}>
                                                                    <input
                                                                        className="form-check-input me-2"
                                                                        type="radio"
                                                                        name={'pickup_val'}
                                                                        id={'pickup_truck'}
                                                                        value={'truck'}
                                                                        checked={item.pickup_val === 'truck'}
                                                                        readOnly
                                                                    />
                                                                    <label className="form-check-label" htmlFor={'pickup_truck'}>
                                                                        Truck
                                                                    </label>
                                                                </div>
                                                                <div className="pickup_details ms-auto d-flex justify-content-end">
                                                                    <span>{item.truck_day ? `${item.truck_day} day` : ''}</span>
                                                                    <span>{item.truck_km} km</span>
                                                                    <span className='text-primary'>₹ {item.truck_charge || '0'}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {item?.rail && (
                                                            <div className="radio_con d-flex ps-5 mt-3">
                                                                <div className={`form-check d-flex align-items-center`} onClick={(e) => handleChange('rail', 'pickup_val', index, item.id)}>
                                                                    <input
                                                                        className="form-check-input me-2"
                                                                        type="radio"
                                                                        name={'pickup_val'}
                                                                        id={'pickup_rail'}
                                                                        value={'rail'}
                                                                        checked={item.pickup_val === 'rail'}
                                                                        readOnly
                                                                    />
                                                                    <label className="form-check-label" htmlFor={'pickup_rail'}>
                                                                        Rail
                                                                    </label>
                                                                </div>
                                                                <div className="pickup_details ms-auto d-flex justify-content-end">
                                                                    <span className='text-primary'>₹ {item.rail_charge || '0'}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )} */}
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`origin_port_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.origin_port, 'origin_port', index, item.id); }}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`origin_port${index}`}
                                                            name={`origin_port`}
                                                            checked={item.origin_port || false}
                                                            readOnly
                                                        />
                                                        <label className="form-check-label" htmlFor={`origin_port${index}`}></label>
                                                    </div>
                                                    <img src={truck_outline} alt="Truck" className='me-2' />
                                                    Port of origin
                                                </div>
                                                <div className="right_con d-flex ms-auto">
                                                    {item.pickup_co !== '' && <span>CO2: <b>{item.origin_port_co}</b></span>}
                                                    <span className='text-primary'>{'₹'} {innerTotalHandler(item?.originport_quote_charge)}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`origin_port_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    {item?.originport_quote_charge?.length !== 0 && item?.originport_quote_charge?.map((data) => (
                                                        <div className="details d-flex justify-content-between" key={`key_${data?.charges_name}`}>
                                                            <p className='me-2'>{data?.charges_name}</p>
                                                            <span className='text-primary'>{data?.currency || '₹'} {data.buy_cost || '0'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`ocean_freight_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.ocean_freight, 'ocean_freight', index, item.id); }}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`ocean_freight${index}`}
                                                            name={`ocean_freight`}
                                                            checked={item.ocean_freight}
                                                            readOnly
                                                        />
                                                        <label className="form-check-label" htmlFor={`ocean_freight${index}`}></label>
                                                    </div>
                                                    <img src={truck_outline} alt="Truck" className='me-2' />
                                                    Ocean Freight
                                                </div>
                                                {/* <div className="right_con d-flex ms-auto">
                                                    {item.ocean_freight_co !== '' && <span>CO2: <b>{item.ocean_freight_co}</b></span>}
                                                    <span className='text-primary'>{item.ocean_freight_charge_currency || '₹'} {item.ocean_freight_charge || '0'}</span>
                                                </div> */}
                                                <div className="right_con d-flex ms-auto">
                                                    {item.ocean_freight_co !== '' && <span>CO2: <b>{item.ocean_freight_co}</b></span>}
                                                    <span className='text-primary'>{'₹'} {innerTotalHandler(item?.ocean_quote_charge)}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`ocean_freight_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    {item?.ocean_quote_charge?.length !== 0 && item?.ocean_quote_charge?.map((data,index) => (
                                                        <div className="details d-flex justify-content-between" key={`key_${index}`}>
                                                            <p className='me-2'>{data?.charges_name || 'Ocean Freight'}</p>
                                                            <span className='text-primary'>{data?.currency || '₹'} {data.buy_cost || '0'}</span>
                                                        </div>
                                                    ))}
                                                    {/* <div className="details d-flex justify-content-between">
                                                        <p className='me-2'>Ocean Freight</p>
                                                        <span className='text-primary'>{item?.ocean_freight_charge_currency || '₹'}{item?.ocean_freight_charge || 0}</span>
                                                    </div> */}
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`pickport_discharge_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.pickport_discharge, 'pickport_discharge', index, item.id); }}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`pickport_discharge${index}`}
                                                            name={`pickport_discharge`}
                                                            checked={item.pickport_discharge}
                                                            readOnly
                                                        />
                                                        <label className="form-check-label" htmlFor={`pickport_discharge${index}`}></label>
                                                    </div>
                                                    <img src={truck_outline} alt="Truck" className='me-2' />
                                                    Port of discharge
                                                </div>
                                                <div className="right_con d-flex ms-auto">
                                                    {item?.port_discharge_co !== '' && <span>CO2: <b>{item.port_discharge_co}</b></span>}
                                                    <span className='text-primary'>{'₹'} {innerTotalHandler(item?.port_discharge_charges)}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`pickport_discharge_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    {item?.port_discharge_charges?.length !== 0 && item?.port_discharge_charges?.map((data) => (
                                                        <div className="details d-flex justify-content-between" key={`key_${data?.charges_name}`}>
                                                            <p className='me-2'>{data?.charges_name}</p>
                                                            <span className='text-primary'>{data?.currency || '₹'}  {data.buy_cost || '0'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`delivery_charge_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.delivery, 'delivery', index, item.id); }}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`delivery${index}`}
                                                            name={`delivery`}
                                                            checked={item.delivery}
                                                            readOnly
                                                        />
                                                        <label className="form-check-label" htmlFor={`delivery${index}`}></label>
                                                    </div>
                                                    <img src={truck_outline} alt="Truck" className='me-2' />
                                                    Delivery
                                                </div>
                                                <div className="right_con d-flex ms-auto">
                                                    {item?.port_discharge_co !== '' && <span>CO2: <b>{item.port_discharge_co}</b></span>}
                                                    <span className='text-primary'>{'₹'} {innerTotalHandler(item?.delivery_quote_charge)}</span>
                                                </div>
                                                {/* <div className="right_con d-flex ms-auto">
                                                    {item.delivery_co !== '' && <span>CO2: <b>{item.delivery_co}</b></span>}
                                                    <span className='text-primary'>{item?.delivery_currency || '₹'} {item.delivery_charge || '0'}</span>
                                                </div> */}
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`delivery_charge_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    {item?.delivery_quote_charge?.length !== 0 && item?.delivery_quote_charge?.map((data,index) => (
                                                        <div className="details d-flex justify-content-between" key={`key_${index}`}>
                                                            <p className='me-2'>{data?.charges_name || 'Delivery'}</p>
                                                            <span className='text-primary'>{data?.currency || '₹'} {data.buy_cost || '0'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* <div className="radio_wrap">
                                                    {item?.road && (
                                                        <div className="radio_con d-flex ps-5">
                                                            <div className={`form-check d-flex align-items-center`} onClick={(e) => handleChange('road', 'delivery_val', index, item.id)}>
                                                                <input
                                                                    className="form-check-input me-2"
                                                                    type="radio"
                                                                    name={'delivery_val'}
                                                                    id={'delivery_road'}
                                                                    value={'road'}
                                                                    checked={item.delivery_val === 'road'}
                                                                    readOnly
                                                                />
                                                                <label className="form-check-label" htmlFor={'delivery_road'}>
                                                                    Road
                                                                </label>
                                                            </div>
                                                            <div className="pickup_details ms-auto d-flex justify-content-end">
                                                                <span className='text-primary'>{item?.delivery_currency || '₹'} {item.road_charge || '0'}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div> */}
                                            </AccordionBody>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className='no_data_found p-5 border rounded mt-4'>
                        <p className='text-center'><b>No Data Found</b></p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchResultCard
