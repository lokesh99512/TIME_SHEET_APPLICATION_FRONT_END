import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal } from 'reactstrap';
import { cma_logo, delete_icon } from '../../../../assets/images';
import { optionCurrency, optionCurrencyCharges, optionMarkupType, optionPickupCharge } from '../../../../common/data/sales';
import { useOutsideClick } from '../../../../components/Common/CommonLogic';
import { getCurrencyExchangeRate } from '../../../../store/Sales/actions';


const QuotationModalComp = ({ quoteModal, setQuoteModal, QuoteModalHandler }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropId, setDropId] = useState(false);
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState('');
    const [openInner, setOpenInner] = useState('');
    const [chargePickup, setChargePickup] = useState([]);
    const quoteData = useSelector((state) => state.sales.quote_selected_data);
    const exchangedata = useSelector((state) => state?.quotation?.currency_ExchangeRate)
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getCurrencyExchangeRate());
    },[])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            currencyVal: 'rupee',
            exchangeRate: ''
        },
        onSubmit: (value) => {
          console.log(value, "value");
        }
    })

    // ------------- dynamic field ------------------------
    const addHandler = (name) => {
        setChargePickup(s => {
            return [
                ...s,
                {
                    charges_name: '',
                    UoM: [],
                    quantity: '',
                    currency: '',
                    buy_cost: '',
                    markup_type: '',
                    markup_value: '',
                    tax: '',
                    total_cost: ''
                }
            ]
        })
    }
    const removeInputFields = (index) => {
        const rows = [...chargePickup];
        rows.splice(index, 1);
        setChargePickup(rows);
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
                                    {optionCurrency ? `${optionCurrency.find(obj => obj.value === formik.values.currencyVal).code} ${optionCurrency.find(obj => obj.value === formik.values.currencyVal).name}` : ''}                            
                                    <i className="mdi mdi-chevron-down" />
                                </div>
                                {isOpen && dropId === 8 ?
                                    <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                                        {(optionCurrency || '')?.map((item, index) => (
                                            <li 
                                                className={`${item.value === formik.values.currencyVal ? 'active' : ''}`} key={index} 
                                                onClick={() => { 
                                                    setIsOpen(false); 
                                                    formik.setFieldValue('currencyVal',item.value );
                                                    formik.setFieldValue('exchangeRate',(item.value !== 'rupee' ? exchangedata[item.value]?.rate : '-' ))
                                                }}>
                                                <span>{item?.code} &nbsp; {item?.name}</span>
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                            <span className='exchange_rate'>Exchange Rate: 
                            <input type="number" name="exchangeRate" id="exchange_rate" placeholder='-' value={formik.values.exchangeRate} 
                            onChange={(e) => {formik.setFieldValue('exchangeRate', e.target.value)}} /></span>
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
                    {quoteData?.length !== 0 ? (
                        <Accordion flush open={open} toggle={toggle} className='main_accordion'>
                            {quoteData.map((item, index) => (
                                <AccordionItem key={item.id}>
                                    <AccordionHeader targetId={`main_${index}`}>
                                        <div className="card_img d-flex align-items-center">
                                            <span className='d-flex align-items-center justify-content-center img me-2'><img src={item.logo || cma_logo} alt="Logo" /></span>
                                            <div className="con d-flex align-items-center">
                                                <span className="title d-block text-center me-2">{item.name || '-'}</span>
                                                <span className={`tag ${item.quote_type || 'preferred'}`}>{item.quote_type || '-'}</span>
                                            </div>
                                        </div>
                                        <div className="right_con d-flex ms-auto">
                                            <div className="margin_wrap">Margin Value: <b>12%</b></div>
                                            <span className='text-primary'>₹12,333</span>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={`main_${index}`}>
                                        <Accordion flush open={openInner} toggle={toggle2}>
                                            {item.pickup && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`pickup`}>
                                                        Pickup
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹207</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`pickup`}>
                                                        <div className="charges_wrap mb-3">
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Charge Name</label>
                                                                        <input type="text" name="charges_name" id="charges_name" placeholder='Freight' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">UoM</label>
                                                                        <input type="text" name="uom" id="uom" placeholder='20GP' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Quantity</label>
                                                                        <input type="text" name="quantity" id="quantity" placeholder='2' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Buy Currency</label>
                                                                        <input type="text" name="buy_currency" id="buy_currency" placeholder='USD' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Total Buy Cost</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" placeholder='2000' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label className='form-label'>Markup Type</label>
                                                                        <Select
                                                                            // value={item.surcharges_name}
                                                                            name='surcharges_name'
                                                                            // onChange={(opt) => {
                                                                            //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                            // }}
                                                                            options={optionMarkupType}
                                                                            classNamePrefix="select2-selection form-select"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Markup Value</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" defaultValue={'2'} placeholder='Enter value' />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Tax</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" placeholder='18' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Total Sale Cost</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" placeholder='2200' readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="charges_wrap">
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="charges_name" id="charges_name" placeholder='Freight' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="uom" id="uom" placeholder='20GP' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="quantity" id="quantity" placeholder='2' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_currency" id="buy_currency" placeholder='USD' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" placeholder='2000' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <Select
                                                                            // value={item.surcharges_name}
                                                                            name='surcharges_name'
                                                                            // onChange={(opt) => {
                                                                            //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                            // }}
                                                                            options={optionMarkupType}
                                                                            classNamePrefix="select2-selection form-select"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" defaultValue={'2'} placeholder='Enter value' />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" placeholder='18' readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" placeholder='2200' readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {chargePickup?.map((item, i) => (
                                                            <div className="charges_wrap mt-3" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i) }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                // value={item.surcharges_name}
                                                                                name='surcharges_name'
                                                                                // onChange={(opt) => {
                                                                                //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                // }}
                                                                                options={optionPickupCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="uom" id="uom" placeholder='Enter uom' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                // value={item.surcharges_name}
                                                                                name='surcharges_name'
                                                                                // onChange={(opt) => {
                                                                                //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                // }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                // value={item.surcharges_name}
                                                                                name='surcharges_name'
                                                                                // onChange={(opt) => {
                                                                                //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                // }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_value`} id="markup_value" defaultValue={'2'} placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax" placeholder='Enter tax' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_cost" id="total_cost" placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add_btn_box mt-3">
                                                            <div className="add_btn_wrap">
                                                                <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('pickup'); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.origin_port && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`origin_port`}>
                                                        Port of origin(Shekou)
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`origin_port`}>
                                                        <div className="charges_wrap mb-3">
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Charge Name</label>
                                                                        <input type="text" name="charges_name" id="charges_name" placeholder='Freight' value={'OTHC'} readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">UoM</label>
                                                                        <input type="text" name="uom" id="uom" value={'BL'} readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Quantity</label>
                                                                        <input type="text" name="quantity" id="quantity" placeholder='2' value={'2'} readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Buy Currency</label>
                                                                        <input type="text" name="buy_currency" id="buy_currency" value='USD' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Total Buy Cost</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='2000' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label className='form-label'>Markup Type</label>
                                                                        <Select
                                                                            // value={item.surcharges_name}
                                                                            name='surcharges_name'
                                                                            // onChange={(opt) => {
                                                                            //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                            // }}
                                                                            options={optionMarkupType}
                                                                            classNamePrefix="select2-selection form-select"                                                                            
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Markup Value</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" defaultValue={'2'} placeholder='Enter value' />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Tax</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='18' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Total Sale Cost</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='2200' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="charges_wrap mb-3">
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="charges_name" id="charges_name" value='DFO' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="uom" id="uom" value='BL' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="quantity" id="quantity" value='2' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_currency" id="buy_currency" value='USD' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='800' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <Select
                                                                            // value={item.surcharges_name}
                                                                            name='surcharges_name'
                                                                            // onChange={(opt) => {
                                                                            //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                            // }}
                                                                            options={optionMarkupType}
                                                                            classNamePrefix="select2-selection form-select"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" defaultValue={'2'} placeholder='Enter value' />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='18' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='2200' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {chargePickup?.map((item, i) => (
                                                            <div className="charges_wrap" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i) }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                // value={item.surcharges_name}
                                                                                name='surcharges_name'
                                                                                // onChange={(opt) => {
                                                                                //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                // }}
                                                                                options={optionPickupCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="uom" id="uom" placeholder='Enter uom' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                // value={item.surcharges_name}
                                                                                name='surcharges_name'
                                                                                // onChange={(opt) => {
                                                                                //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                // }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <div className="common_dropdwon_btn_wrap mb-3">
                                                                                <Select
                                                                                    // value={item.surcharges_name}
                                                                                    name='surcharges_name'
                                                                                    // onChange={(opt) => {
                                                                                    //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                    // }}
                                                                                    options={optionMarkupType}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_value`} id="markup_value" defaultValue={'2'} placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax" placeholder='Enter tax' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_cost" id="total_cost" placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add_btn_box mt-3">
                                                            <div className="add_btn_wrap">
                                                                <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('pickup'); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.ocean_freight && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`ocean_freight`}>
                                                        Ocean Freight(FIFO)
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`ocean_freight`}>
                                                        <div className="charges_wrap mb-3">
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Charge Name</label>
                                                                        <input type="text" name="charges_name" id="charges_name" placeholder='Freight' value={'Freight'} readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">UoM</label>
                                                                        <input type="text" name="uom" id="uom" value={'BL'} readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Quantity</label>
                                                                        <input type="text" name="quantity" id="quantity" placeholder='2' value={'2'} readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Buy Currency</label>
                                                                        <input type="text" name="buy_currency" id="buy_currency" value='USD' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Total Buy Cost</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='2000' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label className='form-label'>Markup Type</label>
                                                                        <Select
                                                                            // value={item.surcharges_name}
                                                                            name='surcharges_name'
                                                                            // onChange={(opt) => {
                                                                            //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                            // }}
                                                                            options={optionMarkupType}
                                                                            classNamePrefix="select2-selection form-select"                                                                            
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Markup Value</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" defaultValue={'2'} placeholder='Enter value' />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Tax</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='18' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="field_wrap">
                                                                        <label htmlFor="name">Total Sale Cost</label>
                                                                        <input type="text" name="buy_cost" id="buy_cost" value='2200' readOnly disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {chargePickup?.map((item, i) => (
                                                            <div className="charges_wrap" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i) }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                // value={item.surcharges_name}
                                                                                name='surcharges_name'
                                                                                // onChange={(opt) => {
                                                                                //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                // }}
                                                                                options={optionPickupCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="uom" id="uom" placeholder='Enter uom' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                // value={item.surcharges_name}
                                                                                name='surcharges_name'
                                                                                // onChange={(opt) => {
                                                                                //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                // }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <div className="common_dropdwon_btn_wrap mb-3">
                                                                                <Select
                                                                                    // value={item.surcharges_name}
                                                                                    name='surcharges_name'
                                                                                    // onChange={(opt) => {
                                                                                    //     handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                    // }}
                                                                                    options={optionMarkupType}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_value`} id="markup_value" defaultValue={'2'} placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax" placeholder='Enter tax' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_cost" id="total_cost" placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add_btn_box mt-3">
                                                            <div className="add_btn_wrap">
                                                                <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('pickup'); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.pickport_discharge && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`pickport_discharge`}>
                                                        Port of Discharge(Winningpeg)
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`pickport_discharge`}>
                                                        Port of Discharge(Winningpeg)
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.delivery && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`delivery`}>
                                                        Delivery
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`delivery`}>
                                                        Delivery
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                        </Accordion>
                                        <div className="row">
                                            <div className="col-lg-4 d-flex justify-content-between">
                                                <span>Sub Total:</span>
                                                <span>
                                                    <b>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '} 
                                                        {formik.values.currencyVal !== 'rupee' ? (Number(12333) * Number(formik.values.exchangeRate)).toFixed(2) : '12333' }
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-lg-4 d-flex justify-content-between">
                                                <span>Tax:</span>
                                                <span>
                                                    <b>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '} 
                                                        {formik.values.currencyVal !== 'rupee' ? (Number(120) * Number(formik.values.exchangeRate)).toFixed(2) : '120' }
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-lg-4 d-flex justify-content-between">
                                                <span>Total Amount:</span>
                                                <span>
                                                    <b className='h5'>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '} 
                                                        {formik.values.currencyVal !== 'rupee' ? (Number(12333) * Number(formik.values.exchangeRate)).toFixed(2) : '12333' }
                                                    </b>
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                            ))}                            
                        </Accordion>
                    ) : <p>No data found</p>}
                </div>
                <div className="modal-footer">
                    <div className="btn_wrap">
                        <button type="button" className='btn border_btn'>Cancel</button>
                        <button type="button" className='btn btn-primary ms-2'>Preview Quotation</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default QuotationModalComp
