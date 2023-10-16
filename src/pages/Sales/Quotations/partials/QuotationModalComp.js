import React, { useRef, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal } from 'reactstrap';
import { optionCurrency } from '../../../../common/data/sales';
import { useOutsideClick } from '../../../../components/Common/CommonLogic';
import { cma_logo } from '../../../../assets/images';

const QuotationModalComp = ({ quoteModal, setQuoteModal, QuoteModalHandler, quoteModalId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropId, setDropId] = useState(false);
    const [currencyVal, setCurrencyVal] = useState({value: "rupee", name: "Rupee", code: '₹'});
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState('');
    const [openInner, setOpenInner] = useState('');

    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };
    const toggle2 = (id) => {
        if (openInner === id) {
            setOpenInner('');
        } else {
            setOpenInner(id);
        }
    };

    const currencyHandler = (item) => {
        setCurrencyVal(item);
    }

    // ------------ custom dropdown -------------------
    const toggleDropdown = (id) => {
        setIsOpen(!isOpen);
        setDropId(id);
    };
    useOutsideClick(dropdownRef, setIsOpen);
    // ------------ custom dropdown -------------------  
    return (
        <>
            <Modal size="xl" isOpen={quoteModal} toggle={() => { QuoteModalHandler(); }} className='quotation_modal_wrap' >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myExtraLargeModalLabel" >
                        Quotations
                    </h5>
                    <div className="right_wrap">
                        <div className="exchange_currency_wrap d-flex">
                            <div className="common_dropdwon_btn_wrap">
                                <div
                                    id='more_menu'
                                    className={`d-flex align-items-center ${isOpen && dropId === 8 ? 'openmenu' : ''}`}
                                    onClick={() => { toggleDropdown(8) }}
                                >
                                    {currencyVal?.code} {currencyVal?.name}
                                    <i className="mdi mdi-chevron-down" />
                                </div>
                                {isOpen && dropId === 8 ?
                                    <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                                        {(optionCurrency || '')?.map((item, index) => (
                                            <li key={index} onClick={() => { currencyHandler(item); setIsOpen(false); }}>
                                                {/* <div className={`form-check me-2`}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={item?.value}
                                                        name={item?.value}
                                                        // checked={item.pickup || false}
                                                        // readOnly
                                                    />
                                                    <label className="form-check-label" htmlFor={`pickup_${index}`}>{item?.code}{item?.name}</label>
                                                </div> */}
                                                <span>{item?.code} &nbsp; {item?.name}</span>
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                            <span className='exchange_rate'>Exchange Rate: <b className="value text-primary">-</b></span>
                        </div>
                        <button
                            onClick={() => {
                                setQuoteModal(false);
                            }}
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    <Accordion flush open={open} toggle={toggle} className='main_accordion'>
                        <AccordionItem>
                            <AccordionHeader targetId={`1`}>
                                <div className="card_img d-flex align-items-center">
                                    <span className='d-flex align-items-center justify-content-center img me-2'><img src={cma_logo} alt="Logo" /></span>
                                    <div className="con d-flex align-items-center">
                                        <span className="title d-block text-center me-2">CMA CGM</span>
                                        <span className="tag preferred">Preferred</span>
                                    </div>
                                </div>                                
                                <div className="right_con d-flex ms-auto">
                                    <div className="margin_wrap">Margin Value: <b>12%</b></div>
                                    <span className='text-primary'>₹12,333</span>
                                    {/* <span className='text-primary'>${countPickup(item)}</span> */}
                                </div>
                            </AccordionHeader>
                            <AccordionBody accordionId={`1`}>
                                <Accordion flush open={openInner} toggle={toggle2}>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`inner_1`}>
                                            Pickup
                                            <div className="right_con ms-auto">
                                                <span className="price text-primary">₹207</span>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`inner_1`}>
                                            <div className="charges_wrap">
                                                <div className="row">
                                                    <div className="col-lg-2">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">Charge Name</label> 
                                                            <input type="text" name="charges_name" id="charges_name" placeholder='Freight' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">UoM</label> 
                                                            <input type="text" name="uom" id="uom" placeholder='20GP' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">Quantity</label> 
                                                            <input type="text" name="quantity" id="quantity" placeholder='2' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">Buy Currency</label> 
                                                            <input type="text" name="buy_currency" id="buy_currency" placeholder='USD' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">Total Buy Cost</label> 
                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='2000' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="field_wrap">
                                                            <label className='form-label'>Markup Type</label> 
                                                            <div className="common_dropdwon_btn_wrap mb-3">
                                                                <div
                                                                    id='more_menu'
                                                                    className={`prof_wrap d-flex ${isOpen && dropId === 'markup_type' ? 'openmenu' : ''}`}
                                                                    onClick={() => { toggleDropdown('markup_type') }}
                                                                >
                                                                    <span className={`value value_focus`}>Percentage</span>
                                                                    <i className="mdi mdi-chevron-down" />
                                                                </div>
                                                                {isOpen && dropId === 'markup_type' ?
                                                                    <ul className="common_dropdown_wrap" ref={dropdownRef}>
                                                                        <li onClick={() => {setIsOpen(false)}}>Percentage</li>
                                                                    </ul> : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">Markup Value</label> 
                                                            <input type="text" name="buy_cost" id="buy_cost" value={'2'} placeholder='Enter value' readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">Tax</label> 
                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='18' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="field_wrap">
                                                            <label htmlFor="name">Total Sale Cost</label> 
                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='2200' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="charges_wrap">
                                                <div className="row">
                                                    <div className="col-lg-2">
                                                        <div className="field_wrap"> 
                                                            <input type="text" name="charges_name" id="charges_name" placeholder='Freight' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <input type="text" name="uom" id="uom" placeholder='20GP' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <input type="text" name="quantity" id="quantity" placeholder='2' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <input type="text" name="buy_currency" id="buy_currency" placeholder='USD' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='2000' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="field_wrap">
                                                            <div className="common_dropdwon_btn_wrap mb-3">
                                                                <div
                                                                    id='more_menu'
                                                                    className={`prof_wrap d-flex ${isOpen && dropId === 'markup_type_2' ? 'openmenu' : ''}`}
                                                                    onClick={() => { toggleDropdown('markup_type_2') }}
                                                                >
                                                                    <span className={`value value_focus`}>Percentage</span>
                                                                    <i className="mdi mdi-chevron-down" />
                                                                </div>
                                                                {isOpen && dropId === 'markup_type_2' ?
                                                                    <ul className="common_dropdown_wrap" ref={dropdownRef}>
                                                                        <li onClick={() => {setIsOpen(false)}}>Percentage</li>
                                                                    </ul> : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <input type="text" name="buy_cost" id="buy_cost" value={'2'} placeholder='Enter value' readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <div className="field_wrap">
                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='18' />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="field_wrap">
                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='2200' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`inner_2`}>
                                            Port of origin(Shekou)
                                            <div className="right_con ms-auto">
                                                <span className="price text-primary">₹3731</span>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`inner_2`}>
                                            test
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`inner_3`}>
                                            Port of origin(Shekou)
                                            <div className="right_con ms-auto">
                                                <span className="price text-primary">₹3731</span>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`inner_3`}>
                                            test
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                                <div className="row">
                                    <div className="col-lg-4 d-flex justify-content-between">
                                        <span>Sub Total:</span>
                                        <span><b>₹12,333</b></span>
                                    </div>
                                    <div className="col-lg-4 d-flex justify-content-between">
                                        <span>Tax:</span>
                                        <span><b>₹120</b></span>
                                    </div>
                                    <div className="col-lg-4 d-flex justify-content-between">
                                        <span>Total Amount:</span>
                                        <span><b className='h5'>₹12,333</b></span>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId={`2`}>
                                <div className="card_img d-flex align-items-center">
                                    <span className='d-flex align-items-center justify-content-center img me-2'><img src={cma_logo} alt="Logo" /></span>
                                    <div className="con d-flex align-items-center">
                                        <span className="title d-block text-center me-2">CMA CGM</span>
                                        <span className="tag cheaper">Cheaper</span>
                                    </div>
                                </div>                                
                                <div className="right_con d-flex ms-auto">
                                    <div className="margin_wrap">Margin Value: <b>12%</b></div>
                                    <span className='text-primary'>₹12,333</span>
                                    {/* <span className='text-primary'>${countPickup(item)}</span> */}
                                </div>
                            </AccordionHeader>
                            <AccordionBody accordionId={`2`}>
                                {/* <Accordion flush open={openInner} toggle={toggle2}>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`inner_1`}>test</AccordionHeader>
                                        <AccordionBody accordionId={`inner_1`}>
                                            test
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`inner_2`}>test</AccordionHeader>
                                        <AccordionBody accordionId={`inner_2`}>
                                            test
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`inner_3`}>test</AccordionHeader>
                                        <AccordionBody accordionId={`inner_3`}>
                                            test
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion> */}
                                <div className="row">
                                    <div className="col-lg-4 d-flex justify-content-between">
                                        <span>Sub Total:</span>
                                        <span><b>₹12,333</b></span>
                                    </div>
                                    <div className="col-lg-4 d-flex justify-content-between">
                                        <span>Tax:</span>
                                        <span><b>₹120</b></span>
                                    </div>
                                    <div className="col-lg-4 d-flex justify-content-between">
                                        <span>Total Amount:</span>
                                        <span><b className='h5'>₹12,333</b></span>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        {/* <AccordionItem>
                            <AccordionHeader targetId={`origin_port_${index}`}>
                                <div className="left_lable d-flex align-items-center">
                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.origin_port, 'origin_port', index); }}>
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
                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.ocean_freight, 'ocean_freight', index); }}>
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
                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.pickport_discharge, 'pickport_discharge', index); }}>
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
                                    <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!item.delivery, 'delivery', index); }}>
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
                        </AccordionItem> */}
                    </Accordion>
                </div>
                <div className="modal-footer">
                    <div className="btn_wrap">
                        <button type="button" className='btn border_btn'>Cancel</button>
                        <button type="button" className='btn btn-primary ms-2'>Create A Quotations</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default QuotationModalComp
