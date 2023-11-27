import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal } from 'reactstrap';
import { cma_logo, cube_filled, delete_icon, oocl_logo, zim_logo } from '../../../../assets/images';
import { optionChargeBasis, optionCurrency, optionCurrencyCharges, optionCustomerName, optionMarkupType, optionOceanCharge, optionOriginPortCharge, optionPickupCharge, optionPortDischargeCharge, optionQuoteContactCode, optionQuoteContacttitle } from '../../../../common/data/sales';
import { convertToINR, useOutsideClick } from '../../../../components/Common/CommonLogic';
import { ADD_QUOTE_MODAL_CHARGES, BLANK_MODAL_CHARGE, REMOVE_QUOTE_MODAL_CHARGES, UPDATE_QUOTE_MODAL_CHARGES } from '../../../../store/Sales/Quotation/actiontype';
import { getCurrencyExchangeRate } from '../../../../store/Sales/actions';
import { QUOTATION_RESULT_SELECTED_BLANK, QUOTATION_RESULT_UPDATE } from '../../../../store/Sales/actiontype';
import ShipmentForm from './ShipmentForm';
import CompanyForm from './CompanyForm';

const QuotationModalComp = ({ quoteModal, setQuoteModal, QuoteModalHandler, setPreviewModal, viewData }) => {
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

    const blankFieldHandle = () => {
        dispatch({ type: BLANK_MODAL_CHARGE, payload: {} });
        dispatch({ type: QUOTATION_RESULT_SELECTED_BLANK, payload: {} });
    }

    // ------------- dynamic field ------------------------
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
    const mappCharge = {
        "pickup_quote_charge": inputObj,
        "originport_quote_charge": inputObj,
        "ocean_quote_charge": inputObj,
        "port_discharge_charges": inputObj,
        "delivery_quote_charge": inputObj,
    }
    const addHandler = (charge_name, id) => {
        dispatch({ type: ADD_QUOTE_MODAL_CHARGES, payload: { name: charge_name, id, charges: mappCharge[charge_name] } })
    }

    const handleChange = (value, name, index, charge_name, objId, sales_cost, newVal) => {
        dispatch({ type: UPDATE_QUOTE_MODAL_CHARGES, payload: { charge_name, id: objId, value, name, index, sales_cost, newVal } })
    }

    const removeInputFields = (index, id, charge_name) => {
        dispatch({ type: REMOVE_QUOTE_MODAL_CHARGES, payload: { index, id, charge_name } })
    }

    const existingHandleChange = (value, name, index, charge_name, objId, sales_cost, marginVal) => {
        dispatch({ type: QUOTATION_RESULT_UPDATE, payload: { value, name, index, charge_name, id: objId, sales_cost, marginVal } })
    }

    const existingHandleChangeMargin = (data, e, name, index, charge_name, objId) => {
        let sale_cost = 0;
        let marginValue = 0;

        if (e?.target?.name === 'markup_val') {
            marginValue = calculateMarkupVal(data.markup_type, Number(data.buy_cost), Number(e.target.value));
            sale_cost = Number(data.buy_cost) + marginValue + (data.tax ? calculateTax(Number(data.buy_cost), Number(data.tax)) : 0);
        }

        existingHandleChange(e.target.value, name, index, charge_name, objId, sale_cost, marginValue);
    }

    const calculateMarkupVal = (type, buycost, value) => {
        if (type === 'percentage') {
            return (buycost * value / 100)
        } else {
            return value;
        }
    }
    const calculateTax = (buycost, value) => {
        return (buycost * value / 100)
    }

    const handleChangeAndCalculate = (data, e, name, index, charge_name, objId) => {
        let sale_cost = 0;
        if (e.target.name === 'markup_val') {
            let marginValue = calculateMarkupVal(data.markup_type, Number(data.buy_cost), Number(e.target.value));
            sale_cost = Number(data.buy_cost) + marginValue + (data.tax ? calculateTax(Number(data.buy_cost), Number(data.tax)) : 0);
            handleChange(e.target.value, name, index, charge_name, objId, sale_cost, marginValue);
        } else if (e.target.name === 'tax') {
            let taxAmt = calculateTax(Number(data.buy_cost), Number(e.target.value))
            sale_cost = Number(data.buy_cost) + taxAmt + (data.markup_val ? calculateMarkupVal(data.markup_type, Number(data.buy_cost), Number(data.markup_val)) : 0);
            handleChange(e.target.value, name, index, charge_name, objId, sale_cost, taxAmt);
        }
    }

    // ---------------- SubTotal / Total and Tax ------------------------------
    const innerTotalHandler = (array, newArray) => {
        return array?.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost), charge.currency), 0) + (newArray !== undefined ? newArray?.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost), charge.currency), 0) : 0);
    }
    const subTotalHandler = (quoteObject) => {
        
        let mainChargeCurr = mainChargeObj?.find(obj => obj.id === quoteObject.id);

        let pickupbuyVal = quoteObject?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0) + (mainChargeCurr?.pickup_quote_charge !== undefined && mainChargeCurr?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0));
        let pickupmarginVal = quoteObject?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.pickup_quote_charge !== undefined && mainChargeCurr?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));
        // let pickupTotalVal = convertToINR(Number(quoteObject?.truck ? quoteObject?.truck_charge : quoteObject?.rail ? quoteObject?.rail_charge : 0), null)
        let pickupSubTotal = pickupbuyVal + pickupmarginVal

        let originbuyVal = quoteObject?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0) + (mainChargeCurr?.originport_quote_charge !== undefined && mainChargeCurr?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0));
        let originmarginVal = quoteObject?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.originport_quote_charge !== undefined && mainChargeCurr?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));
        let originSubTotal = originbuyVal + originmarginVal

        let oceanbuyVal = quoteObject?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0) + (mainChargeCurr?.ocean_quote_charge !== undefined && mainChargeCurr?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0));
        let oceanmarginVal = quoteObject?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.ocean_quote_charge !== undefined && mainChargeCurr?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));
        // let oceanTotalVal = convertToINR(Number(quoteObject?.ocean_freight_charge || 0), quoteObject?.ocean_freight_charge_currency)
        
        let oceanSubTotal = oceanbuyVal + oceanmarginVal 

        let portdischargebuyVal = quoteObject?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0) + (mainChargeCurr?.port_discharge_charges !== undefined && mainChargeCurr?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0));
        let portdischargemarginVal = quoteObject?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.port_discharge_charges !== undefined && mainChargeCurr?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));
        // console.log(portdischargebuyVal,"portdischargebuyVal");
        let portdischargeSubTotal = portdischargebuyVal + portdischargemarginVal

        let deliveryVal = quoteObject?.delivery_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0) + (mainChargeCurr?.delivery_quote_charge !== undefined && mainChargeCurr?.delivery_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost), charge.currency), 0));
        let deliverymarginVal = quoteObject?.delivery_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.delivery_quote_charge !== undefined && mainChargeCurr?.delivery_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));
        let deliverySubTotal = deliveryVal + deliverymarginVal
        // let deliveryVal = convertToINR(Number(quoteObject?.road ? quoteObject?.road_charge : 0), quoteObject?.delivery_currency);

        // console.log(pickupSubTotal, originSubTotal, oceanSubTotal, portdischargeSubTotal, deliverySubTotal, "all charges")

        return pickupSubTotal + originSubTotal + oceanSubTotal + portdischargeSubTotal + deliverySubTotal;
    }

    const totalTaxHandler = (quoteObject) => {
        let mainChargeCurr = mainChargeObj?.find(obj => obj.id === quoteObject.id);
        let pickuptaxVal = quoteObject?.pickup_quote_charge.reduce((total, charge) => total + (convertToINR(Number(charge?.buy_cost || 0), charge.currency) * Number(charge?.tax || 0) / 100), 0) + (mainChargeCurr?.pickup_quote_charge !== undefined && mainChargeCurr?.pickup_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.tax_amount || 0), charge.currency), 0));

        let origintaxVal = quoteObject?.originport_quote_charge.reduce((total, charge) => total + (convertToINR(Number(charge?.buy_cost || 0), charge.currency) * Number(charge?.tax || 0) / 100), 0) + (mainChargeCurr?.originport_quote_charge !== undefined && mainChargeCurr?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.tax_amount || 0), charge.currency), 0));

        let oceantaxVal = quoteObject?.ocean_quote_charge.reduce((total, charge) => total + (convertToINR(Number(charge?.buy_cost || 0), charge.currency) * Number(charge?.tax || 0) / 100), 0) + (mainChargeCurr?.ocean_quote_charge !== undefined && mainChargeCurr?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.tax_amount || 0), charge.currency), 0));

        let portDischargetaxVal = quoteObject?.port_discharge_charges?.reduce((total, charge) => total + (convertToINR(Number(charge?.buy_cost || 0), charge.currency) * Number(charge?.tax || 0) / 100), 0) + (mainChargeCurr?.port_discharge_charges !== undefined && mainChargeCurr?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge?.tax_amount || 0), charge.currency), 0));

        // console.log(pickuptaxVal, origintaxVal, oceantaxVal, portDischargetaxVal)

        return pickuptaxVal + origintaxVal + oceantaxVal + portDischargetaxVal;
    }    

    const overAllMarginHandler = (quoteObject, subtotalvalue) => {        
        let mainChargeCurr = mainChargeObj?.find(obj => obj.id === quoteObject.id);
        let pickupmarginVal = quoteObject?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.pickup_quote_charge !== undefined && mainChargeCurr?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));

        let originmarginVal = quoteObject?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.originport_quote_charge !== undefined && mainChargeCurr?.originport_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));

        let oceanmarginVal = quoteObject?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.ocean_quote_charge !== undefined && mainChargeCurr?.ocean_quote_charge?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));
        let portDischargemarginVal = quoteObject?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0) + (mainChargeCurr?.port_discharge_charges !== undefined && mainChargeCurr?.port_discharge_charges?.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));

        let totalMargin = pickupmarginVal + originmarginVal + oceanmarginVal + portDischargemarginVal;
        let buyvalue = subtotalvalue - totalMargin

        return (totalMargin * 100 / buyvalue).toFixed(2)
    }

    // ----------------- preview quotation -------------------
    const previewQuotationHandler = () => {
        console.log(quoteData, "quoteData");
        console.log(mainChargeObj, "mainChargeObj");
        setPreviewModal(true);
        QuoteModalHandler();
    }

    // ------------ custom dropdown -------------------
    const toggleDropdown = (id) => {
        setIsOpen(!isOpen);
        setDropId(id);
    };
    useOutsideClick(dropdownRef, setIsOpen);
    // ------------ custom dropdown ------------------- ")
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
                                    className={`d-flex align-items-center ${isOpen && dropId === 8 ? 'openmenu' : ''} ${viewData ? 'disable' : ''}`}
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
                                    onChange={(e) => { formik.setFieldValue('exchangeRate', e.target.value) }} disabled={viewData} /></span>
                        </div>
                        <button
                            onClick={() => {
                                blankFieldHandle();
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
                            {!viewData && (
                                <>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`customerdetails_${quoteData.id}`}>
                                            Company Details
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`customerdetails_${quoteData.id}`}>
                                            <CompanyForm />
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`shipmentdetails_${quoteData.id}`}>
                                            Shipment Details
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`shipmentdetails_${quoteData.id}`}>
                                            <ShipmentForm />
                                        </AccordionBody>
                                    </AccordionItem>                                
                                </>
                            )}

                            {quoteData.map((item, mainindex) => (
                                <AccordionItem key={item.id}>
                                    <AccordionHeader targetId={`main_${mainindex}`}>
                                        <div className="card_img d-flex align-items-center">
                                            <span className='d-flex align-items-center justify-content-center img me-2'>
                                                <img src={item?.carrier_name?.toLowerCase() === 'oocl' ? oocl_logo : item?.carrier_name?.toLowerCase() === 'zim' ? zim_logo : cube_filled} alt="Logo" />
                                            </span>
                                            <div className="con d-flex align-items-center">
                                                <span className="title d-block text-center me-2">{item.carrier_name || '-'}</span>
                                                <span className={`tag ${item.quote_type || 'preferred'}`}>{item.quote_type || '-'}</span>
                                            </div>
                                        </div>
                                        <div className="right_con d-flex ms-auto">
                                            {/* {console.log(item,"<--item")} */}
                                            <div className="margin_wrap">Margin Value: <b>{overAllMarginHandler(item, subTotalHandler(item))}%</b></div>
                                            <span className='text-primary'>
                                                {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '}
                                                {formik.values.currencyVal !== 'rupee' ? ((subTotalHandler(item) + totalTaxHandler(item)) * Number(formik.values.exchangeRate)).toFixed(2) : (subTotalHandler(item) + totalTaxHandler(item))}
                                            </span>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={`main_${mainindex}`}>
                                        <Accordion flush open={openInner} toggle={toggle2}>
                                            {item.pickup && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`pickup_${item.id}`}>
                                                        Pickup
                                                        {/* <div className="right_con ms-auto">
                                                            <span className="price text-primary">{'₹'} {item?.truck ? Number(item?.truck_charge) + innerTotalHandler((item?.pickup_quote_charge || []), (mainChargeObj?.find(obj => obj.id === item.id)?.pickup_quote_charge || [])) : item?.rail ? Number(item?.rail_charge) + innerTotalHandler((item?.pickup_quote_charge || []), (mainChargeObj?.find(obj => obj.id === item.id)?.pickup_quote_charge || [])) : innerTotalHandler((item?.pickup_quote_charge || []), (mainChargeObj?.find(obj => obj.id === item.id)?.pickup_quote_charge || []))}</span>
                                                        </div> */}
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">{'₹'} {innerTotalHandler((item?.pickup_quote_charge || []), (mainChargeObj?.find(obj => obj.id === item.id)?.pickup_quote_charge || []))}</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`pickup_${item.id}`}>
                                                        {/* <div className="charges_wrap pickup_charge mb-3">
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="field_wrap">
                                                                        <b>{item?.truck ? 'Truck' : 'Rail'}</b>
                                                                    </div>
                                                                </div>
                                                                <div className="col-8">
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="field_wrap text-end ">
                                                                        <span className='text-primary'>₹ {item?.truck ? (item?.truck_charge || 0) : (item?.rail_charge || 0)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        {item?.pickup_quote_charge?.length !== 0 && item?.pickup_quote_charge?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="charges_name">Pickup Charge</label>}
                                                                            <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="uom">Charge Basis</label>}
                                                                            <input type="text" value={data?.uom || ''} name="uom" id="uom" readOnly disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="quantity">Quantity</label>}
                                                                            <input type="text" value={data?.quantity || ''} name="quantity" id="quantity" readOnly disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="buy_currency">Buy Currency</label>}
                                                                            <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="buy_cost">Total Buy Cost</label>}
                                                                            <input type="text" value={''} name="buy_cost" id="buy_cost" readOnly disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    existingHandleChange(opt.value, 'markup_type', index, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                isDisabled={viewData}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="markup_val">Markup Value</label>}
                                                                            <input type="text" name="markup_val" id="markup_val"
                                                                                value={data?.markup_val || ''}
                                                                                onChange={(e) => {
                                                                                    existingHandleChangeMargin(data, e, 'markup_val', index, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter value' disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="tax">Tax</label>}
                                                                            <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                            <input type="text" value={Number(data?.total_sale_cost).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" placeholder='2200' readOnly disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {mainChargeObj?.find(obj => obj.id === item.id)?.pickup_quote_charge?.map((data, i) => (
                                                            <div className="charges_wrap mt-3" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i, item.id, 'pickup_quote_charge') }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionPickupCharge ? optionPickupCharge.find(obj => obj.label === data?.charges_name) : ''}
                                                                                name='charges_name'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.label, 'charges_name', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionPickupCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {/* <input type="text" name="uom" id="uom" value={data?.uom || ''} onChange={(e) => handleChange(e.target.value, 'uom', i, 'pickup_quote_charge', item.id)} placeholder='Enter Charge basis' /> */}
                                                                            <Select
                                                                                value={optionChargeBasis ? optionChargeBasis.find(obj => obj.label === data?.uom) : ''}
                                                                                name='uom'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.label, 'uom', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionChargeBasis}
                                                                                placeholder='Select'
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" value={data?.quantity || ''} onChange={(e) => handleChange(e.target.value, 'quantity', i, 'pickup_quote_charge', item.id)} placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionCurrencyCharges ? optionCurrencyCharges.find(obj => obj.value === data?.currency) : ''}
                                                                                name='currency'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'currency', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" value={data?.buy_cost || ''} onChange={(e) => handleChange(e.target.value, 'buy_cost', i, 'pickup_quote_charge', item.id)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'markup_type', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_val`} id="markup_val"
                                                                                value={data?.markup_val || ''}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'markup_val', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax"
                                                                                value={data?.tax || ''}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'tax', i, 'pickup_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter tax'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(data?.total_sale_cost).toFixed(2)} placeholder='Enter cost' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {!viewData && (
                                                            <div className="add_btn_box mt-3">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('pickup_quote_charge', item.id); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.origin_port && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`origin_port_${item.id}`}>
                                                        Port of origin
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹{innerTotalHandler(item?.originport_quote_charge, mainChargeObj?.find(obj => obj.id === item.id)?.originport_quote_charge)}</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`origin_port_${item.id}`}>
                                                        {item?.originport_quote_charge?.length !== 0 && item?.originport_quote_charge?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="charges_name">Charge Name</label>}
                                                                            <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="uom">Charge Basis</label>}
                                                                            <input type="text" value={data?.uom || ''} name="uom" id="uom"  readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="quantity">Quantity</label>}
                                                                            <input type="text" value={data?.quantity || ''} name="quantity" id="quantity"  readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="buy_currency">Buy Currency</label>}
                                                                            <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency"  readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="buy_cost">Total Buy Cost</label>}
                                                                            <input type="text" value={data?.buy_cost || ''} name="buy_cost" id="buy_cost"  readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    existingHandleChange(opt.value, 'markup_type', index, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                isDisabled={viewData}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="markup_val">Markup Value</label>}
                                                                            <input type="text" name="markup_val" id="markup_val"
                                                                                value={data?.markup_val || ''}
                                                                                onChange={(e) => {
                                                                                    existingHandleChangeMargin(data, e, 'markup_val', index, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter value' disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="tax">Tax</label>}
                                                                            <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="total_sale_cost">Total Sale Cost</label>}
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
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionOriginPortCharge ? optionOriginPortCharge.find(obj => obj.value === data?.charges_name) : ''}
                                                                                name='charges_name'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'charges_name', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionOriginPortCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {/* <input type="text" name="uom" id="uom" value={data?.uom} onChange={(e) => handleChange(e.target.value, 'uom', i, 'originport_quote_charge', item.id)}  /> */}
                                                                            <Select
                                                                                value={optionChargeBasis ? optionChargeBasis.find(obj => obj.label === data?.uom) : ''}
                                                                                name='uom'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.label, 'uom', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionChargeBasis}
                                                                                placeholder='Select'
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" value={data?.quantity} onChange={(e) => handleChange(e.target.value, 'quantity', i, 'originport_quote_charge', item.id)} placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionCurrencyCharges ? optionCurrencyCharges.find(obj => obj.value === data?.currency) : ''}
                                                                                name='currency'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'currency', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" value={data?.buy_cost} onChange={(e) => handleChange(e.target.value, 'buy_cost', i, 'originport_quote_charge', item.id)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'markup_type', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_val`} id="markup_val"
                                                                                value={data?.markup_val || ''}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'markup_val', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax"
                                                                                value={data?.tax}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'tax', i, 'originport_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter tax'
                                                                                disabled={data?.total_sale_cost === ''}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(data?.total_sale_cost).toFixed(2)} placeholder='Enter cost' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {!viewData && (
                                                            <div className="add_btn_box mt-3">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('originport_quote_charge', item.id); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.ocean_freight && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`ocean_freight_${item.id}`}>
                                                        Ocean Freight
                                                        {/* {item?.ocean_freight_charge !== undefined && (
                                                            <div className="right_con ms-auto">
                                                                <span className="price text-primary">{mainChargeObj?.find(obj => obj.id === item.id)?.ocean_quote_charge !== undefined ? '₹' : item?.ocean_freight_charge_currency} {item?.ocean_freight_charge ? convertToINR(Number(item?.ocean_freight_charge), item?.ocean_freight_charge_currency) + innerTotalHandler((item?.ocean_quote_charge || []), (mainChargeObj?.find(obj => obj.id === item.id)?.ocean_quote_charge || [])) : innerTotalHandler((item?.ocean_quote_charge || []), (mainChargeObj?.find(obj => obj.id === item.id)?.ocean_quote_charge || []))}</span>
                                                            </div>
                                                        )} */}
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹{innerTotalHandler(item?.ocean_quote_charge, mainChargeObj?.find(obj => obj.id === item.id)?.ocean_quote_charge)}</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`ocean_freight_${item.id}`}>
                                                        {/* {(item?.ocean_freight_charge !== '' && item?.ocean_freight_charge !== undefined) && (
                                                            <div className="charges_wrap pickup_charge mb-3">
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <b>Ocean Freight</b>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-8">
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap text-end ">
                                                                            <span className='text-primary'>{item?.ocean_freight_charge_currency || '₹'}{item?.ocean_freight_charge}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )} */}
                                                        {item?.ocean_quote_charge?.length !== 0 && item?.ocean_quote_charge?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="charges_wrap mb-3" key={index}>
                                                                    <div className="row">
                                                                        <div className="col-2">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="charges_name">Ocean Charge</label>}
                                                                                <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="uom">Charge Basis</label>}
                                                                                <input type="text" value={data?.uom || ''} name="uom" id="uom" readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="quantity">Quantity</label>}
                                                                                <input type="text" value={data?.quantity || ''} name="quantity" id="quantity" readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="buy_currency">Buy Currency</label>}
                                                                                <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="buy_cost">Total Buy Cost</label>}
                                                                                <input type="text" value={''} name="buy_cost" id="buy_cost" readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                                <Select
                                                                                    value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                    name='markup_type'
                                                                                    onChange={(opt) => {
                                                                                        existingHandleChange(opt.value, 'markup_type', index, 'ocean_quote_charge', item.id);
                                                                                    }}
                                                                                    options={optionMarkupType}
                                                                                    isDisabled={viewData}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                    menuPlacement="auto"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="markup_val">Markup Value</label>}
                                                                                <input type="text" name="markup_val" id="markup_val"
                                                                                    value={data?.markup_val || ''}
                                                                                    onChange={(e) => {
                                                                                        existingHandleChangeMargin(data, e, 'markup_val', index, 'ocean_quote_charge', item.id);
                                                                                    }}
                                                                                    placeholder='Enter value' disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="tax">Tax</label>}
                                                                                <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                                <input type="text" value={Number(data?.total_sale_cost).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" placeholder='2200' readOnly disabled={viewData} />
                                                                            </div>
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
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionOceanCharge ? optionOceanCharge.find(obj => obj.value === data?.charges_name) : ''}
                                                                                name='charges_name'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'charges_name', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionOceanCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {/* <input type="text" name="uom" id="uom" value={data?.uom || ''} onChange={(e) => handleChange(e.target.value, 'uom', i, 'ocean_quote_charge', item.id)} /> */}
                                                                            <Select
                                                                                value={optionChargeBasis ? optionChargeBasis.find(obj => obj.label === data?.uom) : ''}
                                                                                name='uom'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.label, 'uom', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionChargeBasis}
                                                                                placeholder='Select'
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" value={data?.quantity || ''} onChange={(e) => handleChange(e.target.value, 'quantity', i, 'ocean_quote_charge', item.id)} placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionCurrencyCharges ? optionCurrencyCharges.find(obj => obj.value === data?.currency) : ''}
                                                                                name='currency'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'currency', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" value={data?.buy_cost || ''} onChange={(e) => handleChange(e.target.value, 'buy_cost', i, 'ocean_quote_charge', item.id)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'markup_type', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_val`} id="markup_val"
                                                                                value={data?.markup_val || ''}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'markup_val', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax"
                                                                                value={data?.tax || ''}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'tax', i, 'ocean_quote_charge', item.id);
                                                                                }}
                                                                                placeholder='Enter tax'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(data?.total_sale_cost).toFixed(2)} placeholder='Enter cost' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {!viewData && (
                                                            <div className="add_btn_box mt-3">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('ocean_quote_charge', item.id); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.pickport_discharge && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`pickport_discharge_${item.id}`}>
                                                        Port of Discharge
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹{innerTotalHandler(item?.port_discharge_charges, mainChargeObj?.find(obj => obj.id === item.id)?.port_discharge_charges)}</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`pickport_discharge_${item.id}`}>
                                                        {item?.port_discharge_charges?.length !== 0 && item?.port_discharge_charges?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="charges_name">Charge Name</label>}
                                                                            <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="uom">Charge Basis</label>}
                                                                            <input type="text" value={data?.uom || ''} name="uom" id="uom" readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="quantity">Quantity</label>}
                                                                            <input type="text" value={data?.quantity || ''} name="quantity" id="quantity" placeholder='2' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="buy_currency">Buy Currency</label>}
                                                                            <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="buy_cost">Total Buy Cost</label>}
                                                                            <input type="text" value={data?.buy_cost || ''} name="buy_cost" id="buy_cost" placeholder='2000' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    existingHandleChange(opt.value, 'markup_type', index, 'port_discharge_charges', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                isDisabled={viewData}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="markup_val">Markup Value</label>}
                                                                            <input type="text" name="markup_val" id="markup_val"
                                                                                value={data?.markup_val || ''}
                                                                                onChange={(e) => {
                                                                                    existingHandleChangeMargin(data, e, 'markup_val', index, 'port_discharge_charges', item.id);
                                                                                }} placeholder='Enter value' disabled={viewData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="tax">Tax</label>}
                                                                            <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            {index === 0 && <label className='form-label' htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                            <input type="text" value={Number(data?.total_sale_cost).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" placeholder='2200' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {mainChargeObj.find(obj => obj.id === item.id)?.port_discharge_charges?.map((data, i) => (
                                                            <div className="charges_wrap mt-3" key={i}>
                                                                <div className="label_delete_wwrap d-flex justify-content-between">
                                                                    <label className="form-label">Select Charge</label>
                                                                    <div className="btn_wrap">
                                                                        <button type='button' onClick={() => { removeInputFields(i, item.id, 'port_discharge_charges') }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionPortDischargeCharge ? optionPortDischargeCharge.find(obj => obj.value === data?.charges_name) : ''}
                                                                                name='charges_name'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'charges_name', i, 'port_discharge_charges', item.id);
                                                                                }}
                                                                                options={optionPortDischargeCharge}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            // defaultMenuIsOpen
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            {/* <input type="text" name="uom" id="uom" value={data?.uom || ''} onChange={(e) => handleChange(e.target.value, 'uom', i, 'port_discharge_charges', item.id)} /> */}
                                                                            <Select
                                                                                value={optionChargeBasis ? optionChargeBasis.find(obj => obj.label === data?.uom) : ''}
                                                                                name='uom'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.label, 'uom', i, 'port_discharge_charges', item.id);
                                                                                }}
                                                                                options={optionChargeBasis}
                                                                                placeholder='Select'
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="quantity" id="quantity" value={data?.quantity || ''} onChange={(e) => handleChange(e.target.value, 'quantity', i, 'port_discharge_charges', item.id)} placeholder='Enter quantity' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionCurrencyCharges ? optionCurrencyCharges.find(obj => obj.value === data?.currency) : ''}
                                                                                name='currency'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'currency', i, 'port_discharge_charges', item.id);
                                                                                }}
                                                                                options={optionCurrencyCharges}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="buy_cost" id="buy_cost" value={data?.buy_cost || ''} onChange={(e) => handleChange(e.target.value, 'buy_cost', i, 'port_discharge_charges', item.id)} placeholder='Enter cost' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <Select
                                                                                value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                name='markup_type'
                                                                                onChange={(opt) => {
                                                                                    handleChange(opt?.value, 'markup_type', i, 'port_discharge_charges', item.id);
                                                                                }}
                                                                                options={optionMarkupType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                                menuPlacement="auto"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name={`markup_val`} id="markup_val"
                                                                                value={data?.markup_val || ''}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'markup_val', i, 'port_discharge_charges', item.id);
                                                                                }}
                                                                                placeholder='Enter value' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="tax" id="tax"
                                                                                value={data?.tax || ''}
                                                                                onChange={(e) => {
                                                                                    handleChangeAndCalculate(data, e, 'tax', i, 'port_discharge_charges', item.id);
                                                                                }}
                                                                                placeholder='Enter tax'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(data?.total_sale_cost).toFixed(2)} placeholder='Enter cost' readOnly disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {!viewData && (
                                                            <div className="add_btn_box mt-3">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler('port_discharge_charges', item.id); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                            {item.delivery && (
                                                <AccordionItem>
                                                    <AccordionHeader targetId={`delivery_${item.id}`}>
                                                        Delivery
                                                        {/* {item?.delivery_charge !== undefined && (
                                                            <div className="right_con ms-auto">
                                                                <span className="price text-primary">{item?.delivery_currency || '₹'} {item?.delivery_charge}</span>
                                                            </div>
                                                        )} */}
                                                        <div className="right_con ms-auto">
                                                            <span className="price text-primary">₹ {innerTotalHandler(item?.delivery_quote_charge, mainChargeObj?.find(obj => obj.id === item.id)?.delivery_quote_charge)}</span>
                                                        </div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`delivery_${item.id}`}>
                                                        {item?.delivery_quote_charge?.length !== 0 && item?.delivery_quote_charge?.map((data, index) => (
                                                            <div className="charges_wrap mb-3" key={index}>
                                                                <div className="charges_wrap mb-3" key={index}>
                                                                    <div className="row">
                                                                        <div className="col-2">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="charges_name">Delivery Charge</label>}
                                                                                <input type="text" value={data?.charges_name || ''} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="uom">Charge Basis</label>}
                                                                                <input type="text" value={data?.uom || ''} name="uom" id="uom" readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="quantity">Quantity</label>}
                                                                                <input type="text" value={data?.quantity || ''} name="quantity" id="quantity" readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="buy_currency">Buy Currency</label>}
                                                                                <input type="text" value={data?.currency || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="buy_cost">Total Buy Cost</label>}
                                                                                <input type="text" value={''} name="buy_cost" id="buy_cost" readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                                <Select
                                                                                    value={optionMarkupType ? optionMarkupType.find(obj => obj.value === data?.markup_type) : ''}
                                                                                    name='markup_type'
                                                                                    onChange={(opt) => {
                                                                                        existingHandleChange(opt.value, 'markup_type', index, 'delivery_quote_charge', item.id);
                                                                                    }}
                                                                                    options={optionMarkupType}
                                                                                    isDisabled={viewData}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                    menuPlacement="auto"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="markup_val">Markup Value</label>}
                                                                                <input type="text" name="markup_val" id="markup_val"
                                                                                    value={data?.markup_val || ''}
                                                                                    onChange={(e) => {
                                                                                        existingHandleChangeMargin(data, e, 'markup_val', index, 'delivery_quote_charge', item.id);
                                                                                    }}
                                                                                    placeholder='Enter value' disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="tax">Tax</label>}
                                                                                <input type="text" value={data?.tax || ''} name="tax" id="tax" placeholder='18' readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <div className="field_wrap">
                                                                                {index === 0 && <label className='form-label' htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                                <input type="text" value={Number(data?.total_sale_cost).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" readOnly disabled={viewData} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {/* {(item?.delivery_charge !== '' && item?.delivery_charge !== undefined) && (
                                                            <div className="charges_wrap pickup_charge mb-3">
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div className="field_wrap">
                                                                            <b>Road</b>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-8">
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="field_wrap text-end ">
                                                                            <span className='text-primary'>{item?.delivery_currency || '₹'}{item?.delivery_charge}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )} */}
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                        </Accordion>
                                        <div className="row">
                                            <div className="col-4 d-flex justify-content-between">
                                                <span>Sub Total:</span>
                                                <span>
                                                    <b>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '}
                                                        {formik.values.currencyVal !== 'rupee' ? (subTotalHandler(item) * Number(formik.values.exchangeRate)).toFixed(2) : subTotalHandler(item)}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-between">
                                                <span>Tax:</span>
                                                <span>
                                                    <b>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '}
                                                        {formik.values.currencyVal !== 'rupee' ? (totalTaxHandler(item) * Number(formik.values.exchangeRate)).toFixed(2) : totalTaxHandler(item)}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-between">
                                                <span>Total Amount:</span>
                                                <span>
                                                    <b className='h5'>
                                                        {optionCurrency ? optionCurrency.find(obj => obj.value === formik.values.currencyVal).code + ' ' : '₹ '}
                                                        {formik.values.currencyVal !== 'rupee' ? ((subTotalHandler(item) + totalTaxHandler(item)) * Number(formik.values.exchangeRate)).toFixed(2) : (subTotalHandler(item) + totalTaxHandler(item))}
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
                {!viewData && (
                    <div className="modal-footer">
                        <div className="btn_wrap">
                            <button type="button" className='btn border_btn' onClick={() => {
                                blankFieldHandle();
                                setQuoteModal(false);
                            }}>Cancel</button>
                            <button type="button" className='btn btn-primary ms-2' onClick={() => { previewQuotationHandler() }}>Preview Quotation</button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default QuotationModalComp
