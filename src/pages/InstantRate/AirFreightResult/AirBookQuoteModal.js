import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal } from 'reactstrap';

import { cube_filled, delete_icon, oocl_logo, zim_logo } from '../../../assets/images';
import { optionMarkupType } from '../../../common/data/common';
import { convertToINR, useOutsideClick } from '../../../components/Common/CommonLogic';
import { QUOTATION_RESULT_SELECTED_BLANK } from '../../../store/InstantRate/actionType';
import { BLANK_MODAL_CHARGE, REMOVE_QUOTE_MODAL_CHARGES, UPDATE_QUOTE_MODAL_CHARGES } from '../../../store/Sales/Quotation/actiontype';
import CompanyForm from '../partials/CompanyForm';
import ShipmentForm from '../partials/ShipmentForm';
import AirConsigneeForm from './AirConsigneeForm';

const AirBookQuoteModal = ({ bookModal, setBookModal, QuoteModalHandler, viewData }) => {
    const [open, setOpen] = useState('');
    const [openInner, setOpenInner] = useState('');
    const quoteData = useSelector((state) => state.instantRate.quote_selected_data);
    const { $instantActiveTab } = useSelector((state) => state.instantRate);
    const mainChargeObj = useSelector((state) => state?.quotation?.mainChargeObj);
    const { surchargeCode_data, UOM_data, currency_data } = useSelector((state) => state?.globalReducer);
    const dispatch = useDispatch();

    console.log($instantActiveTab,"$instantActiveTab");

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
    const blankFieldHandle = () => {
        dispatch({ type: BLANK_MODAL_CHARGE, payload: {} });
        dispatch({ type: QUOTATION_RESULT_SELECTED_BLANK, payload: {} });
    }

    // ------------- dynamic field ------------------------
    const handleChange = (value, name, index, charge_name, objId, sales_cost, newVal) => {
        console.log(charge_name, "charge_name")
        dispatch({ type: UPDATE_QUOTE_MODAL_CHARGES, payload: { charge_name, id: objId, value, name, index, sales_cost, newVal } })
    }

    const removeInputFields = (index, id, header) => {
        dispatch({ type: REMOVE_QUOTE_MODAL_CHARGES, payload: { index, id, header } })
    }
    const calculateMarkupVal = (type, buycost, value) => {
        if (type === 'PERCENTAGE') {
            return (buycost * value / 100)
        } else {
            return value;
        }
    }
    const calculateTax = (buycost, value) => {
        return (buycost * value / 100)
    }

    const handleChangeAndCalculate = (data, e, name, index, charge_name, objId) => {
        console.log(data);
        let sale_cost = 0;
        if (e.target.name === 'markup_val') {
            let totalAmt = Number(data.unitPerPrice) * Number(data.unit || 1);
            let marginValue = calculateMarkupVal(data.markup_type, totalAmt, Number(e.target.value));
            sale_cost = totalAmt + marginValue + (data?.taxDetail?.taxPercentage ? calculateTax(totalAmt, Number(data?.taxDetail?.taxPercentage)) : 0);
            handleChange(e.target.value, name, index, charge_name, objId, sale_cost, marginValue);
        } else if (e.target.name === 'taxPercentage') {
            let totalAmt = Number(data.unitPerPrice) * Number(data.unit || 1);
            let taxAmt = calculateTax(totalAmt, Number(e.target.value))
            sale_cost = totalAmt + taxAmt + (data.markup_val ? calculateMarkupVal(data.markup_type, totalAmt, Number(data.markup_val)) : 0);
            handleChange(e.target.value, name, index, charge_name, objId, sale_cost, taxAmt);
        }
    }

    // ---------------- SubTotal / Total and Tax ------------------------------
    const innerTotalHandler = (array, newArray) => {
        return array?.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost) || (Number(charge.amount + (charge?.taxDetail?.value || 0))), charge.currencyCode), 0) + (newArray !== undefined ? newArray?.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost), charge.currencyCode), 0) : 0);
    }

    const subTotalHandler = (quoteObject) => {
        let mainChargeCurr = mainChargeObj?.find(obj => obj.id === quoteObject.quote_id) || [];

        const totalSum = quoteObject?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = 0;
            if (currentOuter?.selected) {
                innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                    return accInner + convertToINR(Number(currentInner.amount), currentInner.currencyCode);
                }, 0);
            }
            return accOuter + innerSum;
        }, 0);
        const totalMarginSum = quoteObject?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = 0;
            if (currentOuter?.selected) {
                innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                    return accInner + (convertToINR(currentInner?.margin_value ? Number(currentInner.margin_value) : 0, currentInner.currencyCode) || 0);
                }, 0);
            }
            return accOuter + innerSum;
        }, 0);

        const newSubTotal = mainChargeCurr?.tariffDetails !== undefined ? mainChargeCurr?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                let totalAmt = Number(currentInner.unitPerPrice || 0) * Number(currentInner.unit || 1);
                return accInner + convertToINR(Number(totalAmt), currentInner.currencyCode);
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;
        const totalNewMarginSum = mainChargeCurr?.tariffDetails !== undefined ? mainChargeCurr?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                return accInner + (convertToINR(currentInner?.margin_value ? Number(currentInner.margin_value) : 0, currentInner.currencyCode) || 0);
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;

        return totalSum + newSubTotal + totalMarginSum + totalNewMarginSum;
    }

    const totalTaxHandler = (quoteObject) => {

        let mainChargeCurr = mainChargeObj?.find(obj => obj.id === quoteObject.quote_id) || [];
        const totalTax = quoteObject?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = 0;
            if (currentOuter?.selected) {
                innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                    return accInner + (currentInner?.taxDetail !== undefined && (convertToINR(Number(currentInner?.taxDetail?.value || 0), currentInner.currencyCode || 'INR') || 0));
                }, 0);
            }
            return accOuter + innerSum;
        }, 0);

        const totalNewTax = mainChargeCurr?.tariffDetails !== undefined ? mainChargeCurr?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                return accInner + (currentInner?.taxDetail !== undefined && (convertToINR(Number(currentInner?.taxDetail?.value || 0), currentInner.currencyCode) || 0));
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;

        return totalTax + totalNewTax
    }

    // ----------------- preview quotation -------------------
    const previewQuotationHandler = () => {
        console.log(quoteData, "quoteData");
        console.log(mainChargeObj, "mainChargeObj");
        // setPreviewModal(true);
        QuoteModalHandler();
    }
    return (
        <>
            <Modal size="xl" isOpen={bookModal} toggle={() => { QuoteModalHandler(); }} className='quotation_modal_wrap' >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myExtraLargeModalLabel" >
                        Book Now
                    </h5>
                    <div className="right_wrap">
                        <button
                            onClick={() => {
                                blankFieldHandle();
                                setBookModal(false);
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
                                        <AccordionHeader targetId={`customerdetails`}>
                                            Shipper Details
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`customerdetails`}>
                                            <CompanyForm />
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`consigneedetails`}>
                                            Consignee Details
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`consigneedetails`}>
                                            <AirConsigneeForm />
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId={`shipmentdetails`}>
                                            Shipment Details
                                        </AccordionHeader>
                                        <AccordionBody accordionId={`shipmentdetails`}>
                                            <ShipmentForm />
                                        </AccordionBody>
                                    </AccordionItem>
                                </>
                            )}

                            {quoteData.map((item, mainindex) => (
                                <AccordionItem key={item.quote_id}>
                                    <AccordionHeader targetId={`main_${mainindex}`}>
                                        <div className="card_img d-flex align-items-center">
                                            <span className='d-flex align-items-center justify-content-center img me-2'>
                                                <img src={$instantActiveTab?.sub === "dom_air" ? item?.carrierLogo : item?.carrierName?.toLowerCase() === 'oocl' ? oocl_logo : item?.carrierName?.toLowerCase() === 'zim' ? zim_logo : cube_filled} alt="Logo" />
                                            </span>
                                            <div className="con d-flex align-items-center">
                                                <span className="title d-block text-center me-2">
                                                    {$instantActiveTab?.sub === "dom_air" ? item?.flightname || '-' : item.carrierName || '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={`main_${mainindex}`}>
                                        <Accordion flush open={openInner} toggle={toggle2}>
                                            {item?.tariffDetails?.length !== 0 && item?.tariffDetails?.map((data, index) => {
                                                if (data?.selected) {
                                                    return (
                                                        <AccordionItem key={index}>
                                                            <AccordionHeader targetId={`subacco_${index}`}>
                                                                {data?.header?.split('_').join(" ") || '-'}
                                                                <div className="right_con ms-auto">
                                                                    <span className="price text-primary">{'₹'} {innerTotalHandler((data?.tariffBreakDowns || []), (mainChargeObj?.find(obj => obj.id === item.quote_id)?.tariffDetails?.find(obj => obj.header === data?.header)?.tariffBreakDowns || []))}</span>                                                                    
                                                                </div>
                                                            </AccordionHeader>
                                                            <AccordionBody accordionId={`subacco_${index}`}>
                                                                {data?.tariffBreakDowns?.length !== 0 && data?.tariffBreakDowns?.map((subData, subindex) => (
                                                                    <div className="charges_wrap mb-3" key={subindex}>
                                                                        <div className="row">
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="charges_name">Charge Name</label>}
                                                                                    <input type="text" value={`${subData?.component || ''}${subData?.containerDetail ? '- ' + subData?.containerDetail : ''}`} name="charges_name" id="charges_name" placeholder='Freight' readOnly disabled={viewData} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="uom">Charge Basis</label>}
                                                                                    <input type="text" value={subData?.uomCode?.split('_').join(' ') || ''} name="uom" id="uom" readOnly disabled={viewData} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="quantity">Quantity</label>}
                                                                                    <input type="text" value={subData?.unit || 1} name="quantity" id="quantity" readOnly disabled={viewData} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="buy_currency">Buy Currency</label>}
                                                                                    <input type="text" value={subData?.currencyCode || ''} name="buy_currency" id="buy_currency" placeholder='USD' readOnly disabled={viewData} />
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="buy_cost">Total Buy Cost</label>}
                                                                                    <input type="text" value={parseInt(subData?.unitPerPrice, 10) || ''} name="buy_cost" id="buy_cost" readOnly disabled={viewData} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label htmlFor='markup_type' className='form-label'>Markup Type</label>}
                                                                                    <Select
                                                                                        value={optionMarkupType ? optionMarkupType.find(obj => obj.value === subData?.markup_type) : ''}
                                                                                        name='markup_type'
                                                                                        onChange={(opt) => {
                                                                                            existingHandleChange(opt.value, 'markup_type', subindex, `${data?.header}`, item.quote_id, index);
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
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="markup_val">Markup Value</label>}
                                                                                    <input type="text" name="markup_val" id="markup_val"
                                                                                        value={subData?.markup_val || ''}
                                                                                        onChange={(e) => {
                                                                                            existingHandleChangeMargin(subData, e, 'markup_val', subindex, `${data?.header}`, item.quote_id, index);
                                                                                        }}
                                                                                        placeholder='Enter value' disabled={viewData} />
                                                                                </div>
                                                                            </div> */}
                                                                            <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="tax">Tax</label>}
                                                                                    <input type="text" value={subData?.taxDetail?.taxPercentage || ''} name="tax" id="tax" placeholder='tax' readOnly disabled={viewData} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    {subindex === 0 && <label className='form-label' htmlFor="total_sale_cost">Total Sale Cost</label>}
                                                                                    <input type="text" value={subData?.total_sale_cost || Number(subData?.amount + (subData?.taxDetail?.value || 0)).toFixed(2) || ''} name="total_sale_cost" id="total_sale_cost" placeholder='2200' readOnly disabled={viewData} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {mainChargeObj?.find(obj => obj.id === item.quote_id)?.tariffDetails?.find(obj => obj.header === data?.header)?.tariffBreakDowns?.map((newdata, i) => (
                                                                    <div className="charges_wrap mt-3" key={i}>
                                                                        <div className="label_delete_wwrap d-flex justify-content-between">
                                                                            <label className="form-label">Select Charge</label>
                                                                            <div className="btn_wrap">
                                                                                <button type='button' onClick={() => { removeInputFields(i, item.quote_id, `${data?.header}`) }} className="btn p-0"><img src={delete_icon} alt="Delete" /></button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    <Select
                                                                                        value={newdata?.component || ''}
                                                                                        name='component'
                                                                                        onChange={(opt) => {
                                                                                            handleChange(opt, 'component', i, `${data?.header}`, item.quote_id);
                                                                                        }}
                                                                                        options={surchargeCode_data}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                        menuPlacement="auto"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    <Select
                                                                                        value={newdata?.uomCode || ''}
                                                                                        name='uomCode'
                                                                                        onChange={(opt) => {
                                                                                            handleChange(opt, 'uomCode', i, `${data?.header}`, item.quote_id);
                                                                                        }}
                                                                                        options={UOM_data}
                                                                                        placeholder='Select'
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                        menuPlacement="auto"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    <input type="text" name="unit" id="unit" value={newdata?.unit || 1} onChange={(e) => handleChange(e.target.value, 'unit', i, `${data?.header}`, item.quote_id)} placeholder='Enter quantity' />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    <Select
                                                                                        value={currency_data ? currency_data.find(obj => obj.value === newdata?.currencyCode) : ''}
                                                                                        name='currencyCode'
                                                                                        onChange={(opt) => {
                                                                                            handleChange(opt?.currencyCode, 'currencyCode', i, `${data?.header}`, item.quote_id);
                                                                                        }}
                                                                                        options={currency_data}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                        menuPlacement="auto"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    <input type="text" name="unitPerPrice" id="unitPerPrice" value={newdata?.unitPerPrice || ''} onChange={(e) => handleChange(e.target.value, 'unitPerPrice', i, `${data?.header}`, item.quote_id)} placeholder='Enter cost' />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    <Select
                                                                                        value={optionMarkupType ? optionMarkupType.find(obj => obj.value === newdata?.markup_type) : ''}
                                                                                        name='markup_type'
                                                                                        onChange={(opt) => {
                                                                                            handleChange(opt?.value, 'markup_type', i, `${data?.header}`, item.quote_id);
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
                                                                                        value={newdata?.markup_val || ''}
                                                                                        onChange={(e) => {
                                                                                            handleChangeAndCalculate(newdata, e, 'markup_val', i, `${data?.header}`, item.quote_id);
                                                                                        }}
                                                                                        placeholder='Enter value' />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <div className="field_wrap">
                                                                                    <input type="text" name="taxPercentage" id="taxPercentage"
                                                                                        value={newdata?.taxDetail?.taxPercentage || ''}
                                                                                        onChange={(e) => {
                                                                                            handleChangeAndCalculate(newdata, e, 'taxPercentage', i, `${data?.header}`, item.quote_id);
                                                                                        }}
                                                                                        placeholder='Enter tax'
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="field_wrap">
                                                                                    <input type="text" name="total_sale_cost" id="total_sale_cost" value={Number(newdata?.total_sale_cost).toFixed(2)} placeholder='Enter cost' readOnly disabled />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </AccordionBody>
                                                        </AccordionItem>
                                                    )
                                                }
                                            })}
                                        </Accordion>
                                        <div className="row">
                                            <div className="col-4 d-flex justify-content-between">
                                                <span>Sub Total:</span>
                                                <span>
                                                    <b>
                                                        ₹ {subTotalHandler(item)}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-between">
                                                <span>Tax:</span>
                                                <span>
                                                    <b>
                                                        ₹ {totalTaxHandler(item)}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-between">
                                                <span>Total Amount:</span>
                                                <span>
                                                    <b className='h5'>
                                                        ₹ {(subTotalHandler(item) + totalTaxHandler(item))}
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
                                setBookModal(false);
                            }}>Cancel</button>
                            <button type="button" className='btn btn-primary ms-2' onClick={() => { previewQuotationHandler() }}>Book Now</button>
                            {/* <button type="button" className='btn btn-primary ms-2' onClick={() => { previewQuotationHandler() }}>Preview Quotation</button> */}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default AirBookQuoteModal
