import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import { ship_filled, truck_outline } from '../../../../assets/images';
import { QUOTATION_RESULT_SELECTED, UPDATE_QUOTATION_RESULT_DETAILS } from '../../../../store/Sales/actiontype';
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

    const showDetailsHandler = (index,id) => {
        let newArr = [...showDetails];
        if (newArr?.length !== 0) {
            if(newArr.some(obj => obj.id === id)){
                newArr.find(obj => obj.id === id).details = !newArr.find(obj => obj.id === id).details
            } else {
                let newObj = { details: true,id }
                newArr.push(newObj);
            }
        } else {
            let newObj = { details: true,id }
            newArr.push(newObj);
        }
        setShowDetails(newArr);
    }

    const handleChange = (val, name, index, id) => {
        dispatch({ type: UPDATE_QUOTATION_RESULT_DETAILS, payload: { name, value: val, id } })
        let newArry = [];
        dispatch({type: QUOTATION_RESULT_SELECTED, payload: newArry})
    }

    const countPickup = (item) => {
        if (item.pickup_val === 'truck') {
            return item.truck_charge
        } else {
            return item.rail_charge
        }
    }

    const TotalQuotationCount = (item) => {
        let amount = 0;
        let pickupCharge = 0;
        let originPortCharge = 0;
        if (item.pickup) {
            if (item.pickup_val === 'truck') {
                pickupCharge = Number(item.truck_charge || 0)
            } else {
                pickupCharge = Number(item.rail_charge || 0)
            }
            amount += pickupCharge
        }
        if (item.origin_port) {
            originPortCharge = Number(item.origin_pch_charge || 0) + Number(item.origin_pcsd_charge || 0)
                + Number(item.origin_sbcio_charge || 0) + Number(item.origin_dfo_charge || 0)
                + Number(item.origin_dtc_charge || 0) + Number(item.origin_eds_charge || 0)
                + Number(item.origin_ips_charge || 0) + Number(item.origin_por_charge || 0)
                + Number(item.origin_sse_charge || 0) + Number(item.origin_war_charge || 0) + Number(item.origin_othc_charge || 0)
            amount += originPortCharge
        }
        if (item.ocean_freight) {
            amount += Number(item.fifo_standard || 0);
        }
        if (item.pickport_discharge) {
            amount += Number(item.pickport_discharge_charge || 0);
        }
        if (item.delivery) {
            amount += Number(item.delivery_charge || 0);
        }
        return amount;
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
        dispatch({type: QUOTATION_RESULT_SELECTED, payload: newArry})
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
                                    <span className='d-flex align-items-center justify-content-center img mx-auto'><img src={item?.logo} alt="Logo" /></span>
                                    <span className="title d-block text-center mt-2">{item?.name}</span>
                                </div>
                                <div className="middle_content">
                                    <span className="duration text-center d-block">Duration <b>{item.duration} days</b></span>
                                    <div className="from_to_wrap mt-2 mb-3 d-flex justify-content-between">
                                        <span className="from_loc">{item.location_from}</span>
                                        <span className="icon d-flex align-items-center justify-content-center"><img src={ship_filled} alt="Shipping" /></span>
                                        <span className="to_loc">{item.location_to}</span>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4 text-left"><span>Valid: <b>{item.valid_from || '-'}</b></span></div>
                                        <div className="col-lg-4 text-center"><span>Id: <b>{item.id || '-'}</b></span></div>
                                        <div className="col-lg-4 text-end"><span>CO2: <b>{item.co_two || '-'}</b></span></div>
                                    </div>
                                </div>
                                <div className="total_wrap">
                                    <p className="total_price text-center"><b>${TotalQuotationCount(item)}</b></p>
                                    <div className="btn_wrap d-flex">
                                        <button type='button' className='btn text-primary view_detail_btn' onClick={() => { showDetailsHandler(index,item.id); }}>
                                            View{showDetails?.find(obj => obj.id === item.id)?.details ? 'Less' : 'Detail'}</button>
                                        <button type='button' className='btn btn-primary' onClick={() => { QuoteModalHandler(); singleQuoteModal(item)}} disabled={quote_Selected.some(obj => obj.id === item.id) || quote_Selected?.length >= 2}>Quote Now</button>
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
                                                <div className="right_con d-flex ms-auto">
                                                    <span>CO2: <b>{item.pickup_co}</b></span>
                                                    <span className='text-primary'>${countPickup(item)}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`pickup_${index}`}>
                                                <div className="radio_wrap">
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
                                                            <span className='text-primary'>${item.truck_charge || '0'}</span>
                                                        </div>
                                                    </div>
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
                                                            <span className='text-primary'>${item.rail_charge || '0'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`origin_port_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.origin_port, 'origin_port', index,item.id); }}>
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
                                                    Port of origin(Shekou)
                                                </div>
                                                <div className="right_con d-flex ms-auto">
                                                    <span>CO2: <b>{item.origin_port_co}</b></span>
                                                    <span className='text-primary'>$207</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`origin_port_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>CMA-PCH</b> - Pre carriage haulage</p>
                                                        <span className='text-primary'>${item.origin_pch_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>CMA-PCSD</b> - Pre carriage haulage</p>
                                                        <span className='text-primary'>${item.origin_pcsd_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>CMA-SBCIO</b> - Scanning by customs, incl other</p>
                                                        <span className='text-primary'>${item.origin_sbcio_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>DFO</b> - DOC FEE ORIGIN</p>
                                                        <span className='text-primary'>${item.origin_dfo_charge || '0'}/per lot</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>DTC</b> - Import Serenity Container Guar</p>
                                                        <span className='text-primary'>${item.origin_dtc_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>EDS</b> - Export Declaration Surcharge</p>
                                                        <span className='text-primary'>${item.origin_eds_charge || '0'}/per lot</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>IPS</b> - Destinat.Terminal-Intl Ship&Po</p>
                                                        <span className='text-primary'>${item.origin_ips_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>POR</b> - Port and/or Terminal wharfage</p>
                                                        <span className='text-primary'>${item.origin_por_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>SSE</b> - Sealing service export</p>
                                                        <span className='text-primary'>${item.origin_sse_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>WAR</b> - Extra risk coverage surcharge</p>
                                                        <span className='text-primary'>${item.origin_war_charge || '0'}</span>
                                                    </div>
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'><b>OTHC</b> - Original Terminal Handling Charge</p>
                                                        <span className='text-primary'>${item.origin_othc_charge || '0'}</span>
                                                    </div>
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`ocean_freight_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.ocean_freight, 'ocean_freight', index,item.id); }}>
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
                                                    Ocean Freight(FIFO)
                                                </div>
                                                <div className="right_con d-flex ms-auto">
                                                    <span>CO2: <b>{item.ocean_freight_co}</b></span>
                                                    <span className='text-primary'>${item.fifo_standard || '0'}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`ocean_freight_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'>20 Standard</p>
                                                        <span className='text-primary'>${item.fifo_standard || '0'}</span>
                                                    </div>
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`pickport_discharge_${index}`}>
                                                <div className="left_lable d-flex align-items-center">
                                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.pickport_discharge, 'pickport_discharge', index,item.id); }}>
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
                                                    PickPort of discharge(Winnipeg)
                                                </div>
                                                <div className="right_con d-flex ms-auto">
                                                    <span>CO2: <b>{item.pickport_discharge_co}</b></span>
                                                    <span className='text-primary'>${item.pickport_discharge_charge || '0'}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`pickport_discharge_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='me-2'>PickPort of discharge(Winnipeg)</p>
                                                        <span className='text-primary'>${item.pickport_discharge_charge || '0'}</span>
                                                    </div>
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
                                                    <span>CO2: <b>{item.delivery_co}</b></span>
                                                    <span className='text-primary'>${item.delivery_charge || '0'}</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`delivery_charge_${index}`}>
                                                <div className="price_details_wrap ps-5">
                                                    <div className="details d-flex justify-content-between">
                                                        <p className='m-0 me-2'>Delivery</p>
                                                        <span className='text-primary'>${item.delivery_charge || '0'}</span>
                                                    </div>
                                                </div>
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
