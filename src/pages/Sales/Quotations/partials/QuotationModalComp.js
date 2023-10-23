import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal } from 'reactstrap';
import { cma_logo, delete_icon } from '../../../../assets/images';
import { optionCurrency, optionCurrencyCharges, optionMarkupType, optionPickupCharge } from '../../../../common/data/sales';
import { useOutsideClick } from '../../../../components/Common/CommonLogic';
import { getCurrencyExchangeRate } from '../../../../store/Sales/actions';
import { ADD_QUOTE_MODAL_CHARGES, REMOVE_QUOTE_MODAL_CHARGES, UPDATE_QUOTE_MODAL_CHARGES } from '../../../../store/Sales/Quotation/actiontype';
import { QUOTATION_RESULT_SELECTED, QUOTATION_RESULT_UPDATE } from '../../../../store/Sales/actiontype';


const QuotationModalComp = ({ quoteModal, setQuoteModal, QuoteModalHandler,setPreviewModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropId, setDropId] = useState(false);
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState('');
    const [openInner, setOpenInner] = useState('');
    const quoteData = useSelector((state) => state.sales.quote_selected_data);
    const exchangedata = useSelector((state) => state?.quotation?.currency_ExchangeRate);
    const mainChargeObj = useSelector((state) => state?.quotation?.mainChargeObj);
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
    }, [])

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


    let inputObj = {
        charges_name: '',
        uom: '',
        quantity: '',
        currency: '',
        buy_cost: '',
        markup_type: '',
        markup_val: '',
        tax: '',
        total_sale_cost: ''
    }
    // ------------- dynamic field ------------------------
    const mappCharge = {
        "pickup_quote_charge": inputObj,
        "originport_quote_charge": inputObj,
        "ocean_quote_charge": inputObj,
        "portdischarge_quote_charge": inputObj,
        "delivery_quote_charge": inputObj,
    }
    const addHandler = (charge_name, id) => {
        dispatch({ type: ADD_QUOTE_MODAL_CHARGES, payload: { name: charge_name, id, charges: mappCharge[charge_name] } })
    }

    const handleChange = (value, name, index, charge_name, objId,sales_cost) => {
        dispatch({ type: UPDATE_QUOTE_MODAL_CHARGES, payload: { charge_name, id: objId, value, name, index,sales_cost } })
    }

    const removeInputFields = (index, id, charge_name) => {
        dispatch({ type: REMOVE_QUOTE_MODAL_CHARGES, payload: { index, id, charge_name } })
    }

    const existingHandleChange = (value, name, index, charge_name, objId,sales_cost) => {
        dispatch({type: QUOTATION_RESULT_UPDATE, payload: {value,name,index,charge_name,id: objId,sales_cost} })
    }

    // ----------------- preview quotation -------------------
    const previewQuotationHandler = () => {
        console.log(quoteData,"quoteData");
        console.log(mainChargeObj,"mainChargeObj");
        setPreviewModal(true);
        QuoteModalHandler();
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
                                                    formik.setFieldValue('currencyVal', item.value);
                                                    formik.setFieldValue('exchangeRate', (item.value !== 'rupee' ? exchangedata[item.value]?.rate : '-'))
                                                }}>
                                                <span>{item?.code} &nbsp; {item?.name}</span>
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                            <span className='exchange_rate'>Exchange Rate:
                                <input type="number" name="exchangeRate" id="exchange_rate" placeholder='-' value={formik.values.exchangeRate}
                                    onChange={(e) => { formik.setFieldValue('exchangeRate', e.target.value) }} /></span>
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
                            {quoteData.map((item, mainindex) => (
                                <AccordionItem key={item.id}>
                                    <AccordionHeader targetId={`main_${mainindex}`}>
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
                                    <AccordionBody accordionId={`main_${mainindex}`}>
                                        <Accordion flush open={openInner} toggle={toggle2}>
                                            {item.pickup && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`pickup_${item.id}`}>
                                                        Pickup
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹207</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`pickup_${item.id}`}>
                                                        {item?.pickup_quote_charge?.length !== 0 && item?.pickup_quote_charge?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="charges_name">Charge Name</label>}
                                                                            <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="uom">UoM</label>}
                                                                            <input type="text" value={data?.uom || ''} name="uom" id="uom" placeholder='20GP' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="quantity">Quantity</label>}
                                                                            <input type="text" value={data?.quantity || ''} name="quantity" id="quantity" placeholder='2' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="buy_currency">Buy Currency</label>}
                                                                            <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="buy_cost">Total Buy Cost</label>}
                                                                            <input type="text" value={data?.buy_cost || ''} name="buy_cost" id="buy_cost" placeholder='2000' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                            <Select
                                                                                value={optionMarkupType? optionMarkupType.find(obj => obj.value === data?.markup_type) : '' }
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    existingHandleChange(opt.value, 'markup_type', index, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="markup_val">Markup Value</label>}
                                                                            <input type="text" name="markup_val" id="markup_val" 
                                                                                value={data?.markup_val} 
                                                                                onChange={(e) => {
                                                                                    let sale_cost;
                                                                                    if(data?.markup_type === 'percentage'){
                                                                                        sale_cost = Number(data?.buy_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                    } else {
                                                                                        sale_cost = Number(data?.buy_cost) + Number(e.target.value);
                                                                                    }
                                                                                    existingHandleChange(e.target.value, 'markup_val', index, 'pickup_quote_charge', item.id,sale_cost);
                                                                                }} 
                                                                                placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="tax">Tax</label>}
                                                                            <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                            <input type="text" value={Number(data?.total_sale_cost).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" placeholder='2200' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {mainChargeObj.find(obj => obj.id === item.id)?.pickup_quote_charge?.map((data, i) => (
                                                            <div className="charges_wrap mt-3" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i, item.id, 'pickup_quote_charge') }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionPickupCharge ? optionPickupCharge.find(obj => obj.name === data?.charges_name) : ''}
                                                                                name='charges_name'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.name, 'charges_name', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionPickupCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="uom" id="uom" value={data?.uom} onChange={(e) => handleChange(e.target.value, 'uom', i, 'pickup_quote_charge', item.id)} placeholder='Enter uom' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" value={data?.quantity} onChange={(e) => handleChange(e.target.value, 'quantity', i, 'pickup_quote_charge', item.id)} placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionCurrencyCharges ? optionCurrencyCharges.find(obj => obj.value === data?.currency) : ''}
                                                                                name='currency'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'currency', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" value={data?.buy_cost} onChange={(e) => handleChange(e.target.value, 'buy_cost', i, 'pickup_quote_charge', item.id)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'markup_type', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_val`} id="markup_val" 
                                                                            value={data?.markup_val} 
                                                                            onChange={(e) => {
                                                                                let sale_cost;
                                                                                if(data?.markup_type === 'percentage'){
                                                                                    sale_cost = Number(data?.buy_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                } else {
                                                                                    sale_cost = Number(data?.buy_cost) + Number(e.target.value);
                                                                                }
                                                                                handleChange(e.target.value, 'markup_val', i, 'pickup_quote_charge', item.id,sale_cost)
                                                                            }} 
                                                                            placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax" 
                                                                            value={data?.tax} 
                                                                            onChange={(e) => {
                                                                                let sale_cost = Number(data?.total_sale_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                handleChange(e.target.value, 'tax', i, 'pickup_quote_charge', item.id,sale_cost)
                                                                            }} 
                                                                            placeholder='Enter tax' 
                                                                            disabled={data?.total_sale_cost === ''}
                                                                            />                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(data?.total_sale_cost).toFixed(2)} placeholder='Enter cost' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add_btn_box mt-3">
                                                            <div className="add_btn_wrap">
                                                                <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('pickup_quote_charge', item.id); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.origin_port && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`origin_port_${item.id}`}>
                                                        Port of origin(Shekou)
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`origin_port_${item.id}`}>
                                                        {item?.originport_quote_charge?.length !== 0 && item?.originport_quote_charge?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="charges_name">Charge Name</label>}
                                                                            <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="uom">UoM</label>}
                                                                            <input type="text" value={data?.uom || ''} name="uom" id="uom" placeholder='20GP' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="quantity">Quantity</label>}
                                                                            <input type="text" value={data?.quantity || ''} name="quantity" id="quantity" placeholder='2' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="buy_currency">Buy Currency</label>}
                                                                            <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="buy_cost">Total Buy Cost</label>}
                                                                            <input type="text" value={data?.buy_cost || ''} name="buy_cost" id="buy_cost" placeholder='2000' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                            <Select
                                                                                value={optionMarkupType? optionMarkupType.find(obj => obj.value === data?.markup_type) : '' }
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    existingHandleChange(opt.value, 'markup_type', index, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="markup_val">Markup Value</label>}
                                                                            <input type="text" name="markup_val" id="markup_val" 
                                                                                value={data?.markup_val} 
                                                                                onChange={(e) => {
                                                                                    let sale_cost;
                                                                                    if(data?.markup_type === 'percentage'){
                                                                                        sale_cost = Number(data?.buy_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                    } else {
                                                                                        sale_cost = Number(data?.buy_cost) + Number(e.target.value);
                                                                                    }
                                                                                    existingHandleChange(e.target.value, 'markup_val', index, 'originport_quote_charge', item.id,sale_cost);
                                                                                }} 
                                                                                placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="tax">Tax</label>}
                                                                            <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                            <input type="text" value={Number(data?.total_sale_cost).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" placeholder='2200' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {mainChargeObj.find(obj => obj.id === item.id)?.originport_quote_charge?.map((data, i) => (
                                                            <div className="charges_wrap mt-3" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i, item.id, 'originport_quote_charge') }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionPickupCharge ? optionPickupCharge.find(obj => obj.value === data?.charges_name) : ''}
                                                                                name='charges_name'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'charges_name', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionPickupCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="uom" id="uom" value={data?.uom} onChange={(e) => handleChange(e.target.value, 'uom', i, 'originport_quote_charge', item.id)} placeholder='Enter uom' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" value={data?.quantity} onChange={(e) => handleChange(e.target.value, 'quantity', i, 'originport_quote_charge', item.id)} placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionCurrencyCharges ? optionCurrencyCharges.find(obj => obj.value === data?.currency) : ''}
                                                                                name='currency'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'currency', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" value={data?.buy_cost} onChange={(e) => handleChange(e.target.value, 'buy_cost', i, 'originport_quote_charge', item.id)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'markup_type', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_val`} id="markup_val" 
                                                                            value={data?.markup_val} 
                                                                            onChange={(e) => {
                                                                                let sale_cost;
                                                                                if(data?.markup_type === 'percentage'){
                                                                                    sale_cost = Number(data?.buy_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                } else {
                                                                                    sale_cost = Number(data?.buy_cost) + Number(e.target.value);
                                                                                }
                                                                                console.log(sale_cost,"sale_cost")
                                                                                handleChange(e.target.value, 'markup_val', i, 'originport_quote_charge', item.id,sale_cost)
                                                                            }} 
                                                                            placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax" 
                                                                                value={data?.tax} 
                                                                                onChange={(e) => {
                                                                                    let sale_cost = Number(data?.total_sale_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                    handleChange(e.target.value, 'tax', i, 'originport_quote_charge', item.id,sale_cost)
                                                                                }} 
                                                                                placeholder='Enter tax' 
                                                                                disabled={data?.total_sale_cost === ''}
                                                                            /> 
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(data?.total_sale_cost).toFixed(2)} placeholder='Enter cost' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add_btn_box mt-3">
                                                            <div className="add_btn_wrap">
                                                                <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('originport_quote_charge', item.id); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.ocean_freight && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`ocean_freight_${item.id}`}>
                                                        Ocean Freight(FIFO)
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`ocean_freight_${item.id}`}>
                                                        {item?.ocean_quote_charge?.length !== 0 && item?.ocean_quote_charge?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="charges_name">Charge Name</label>}
                                                                            <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="uom">UoM</label>}
                                                                            <input type="text" value={data?.uom || ''} name="uom" id="uom" placeholder='20GP' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="quantity">Quantity</label>}
                                                                            <input type="text" value={data?.quantity || ''} name="quantity" id="quantity" placeholder='2' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="buy_currency">Buy Currency</label>}
                                                                            <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="buy_cost">Total Buy Cost</label>}
                                                                            <input type="text" value={data?.buy_cost || ''} name="buy_cost" id="buy_cost" placeholder='2000' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                            <Select
                                                                                value={optionMarkupType? optionMarkupType.find(obj => obj.value === data?.markup_type) : '' }
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    existingHandleChange(opt.value, 'markup_type', index, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="markup_val">Markup Value</label>}
                                                                            <input type="text" name="markup_val" id="markup_val" 
                                                                                    value={data?.markup_val} 
                                                                                    onChange={(e) => {
                                                                                        let sale_cost;
                                                                                        if(data?.markup_type === 'percentage'){
                                                                                            sale_cost = Number(data?.buy_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                        } else {
                                                                                            sale_cost = Number(data?.buy_cost) + Number(e.target.value);
                                                                                        }
                                                                                        existingHandleChange(e.target.value, 'markup_val', index, 'ocean_quote_charge', item.id,sale_cost);
                                                                                    }} placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="tax">Tax</label>}
                                                                            <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                            <input type="text" value={Number(data?.total_sale_cost).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" placeholder='2200' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {mainChargeObj.find(obj => obj.id === item.id)?.ocean_quote_charge?.map((data, i) => (
                                                            <div className="charges_wrap mt-3" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i, item.id, 'ocean_quote_charge') }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionPickupCharge ? optionPickupCharge.find(obj => obj.value === data?.charges_name) : ''}
                                                                                name='charges_name'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'charges_name', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionPickupCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="uom" id="uom" value={data?.uom} onChange={(e) => handleChange(e.target.value, 'uom', i, 'ocean_quote_charge', item.id)} placeholder='Enter uom' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" value={data?.quantity} onChange={(e) => handleChange(e.target.value, 'quantity', i, 'ocean_quote_charge', item.id)} placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionCurrencyCharges ? optionCurrencyCharges.find(obj => obj.value === data?.currency) : ''}
                                                                                name='currency'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'currency', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" value={data?.buy_cost} onChange={(e) => handleChange(e.target.value, 'buy_cost', i, 'ocean_quote_charge', item.id)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'markup_type', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_val`} id="markup_val" 
                                                                            value={data?.markup_val} 
                                                                            onChange={(e) => {
                                                                                let sale_cost;
                                                                                if(data?.markup_type === 'percentage'){
                                                                                    sale_cost = Number(data?.buy_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                } else {
                                                                                    sale_cost = Number(data?.buy_cost) + Number(e.target.value);
                                                                                }
                                                                                handleChange(e.target.value, 'markup_val', i, 'ocean_quote_charge', item.id,sale_cost)
                                                                            }} 
                                                                            placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax" 
                                                                                value={data?.tax} 
                                                                                onChange={(e) => {
                                                                                    let sale_cost = Number(data?.total_sale_cost) + ((Number(data?.buy_cost) * Number(e.target.value)/100));
                                                                                    handleChange(e.target.value, 'tax', i, 'ocean_quote_charge', item.id,sale_cost)
                                                                                }} 
                                                                                placeholder='Enter tax' 
                                                                                disabled={data?.total_sale_cost === ''}
                                                                            />     
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(data?.total_sale_cost).toFixed(2)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add_btn_box mt-3">
                                                            <div className="add_btn_wrap">
                                                                <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('ocean_quote_charge', item.id); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.pickport_discharge && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`pickport_discharge_${item.id}`}>
                                                        Port of Discharge(Winningpeg)
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`pickport_discharge_${item.id}`}>
                                                        Port of Discharge(Winningpeg)
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.delivery && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`delivery_${item.id}`}>
                                                        Delivery
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹3731</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`delivery_${item.id}`}>
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
                                                        {formik.values.currencyVal !== 'rupee' ? (Number(12333) * Number(formik.values.exchangeRate)).toFixed(2) : '12333'}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-lg-4 d-flex justify-content-between">
                                                <span>Tax:</span>
                                                <span>
                                                    <b>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '}
                                                        {formik.values.currencyVal !== 'rupee' ? (Number(120) * Number(formik.values.exchangeRate)).toFixed(2) : '120'}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-lg-4 d-flex justify-content-between">
                                                <span>Total Amount:</span>
                                                <span>
                                                    <b className='h5'>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '}
                                                        {formik.values.currencyVal !== 'rupee' ? (Number(12333) * Number(formik.values.exchangeRate)).toFixed(2) : '12333'}
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
                        <button type="button" className='btn btn-primary ms-2' onClick={() => {previewQuotationHandler()}}>Preview Quotation</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default QuotationModalComp
