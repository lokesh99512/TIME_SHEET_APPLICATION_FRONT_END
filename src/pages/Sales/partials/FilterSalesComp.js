import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import React, { useCallback, useState } from 'react';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { optionDestQuote, optionModeQuote, optionOriginQuote, optionStatusQuote } from '../../../common/data/sales';

export default function FilterSalesComp({ isRight, toggleRightCanvas, filterDetails, setfilterDetails, applyFilterHandler, clearValueHandler }) {
    const [rangeValues, setRangeValues] = useState([45, 2500]); // Initial values for the range slider
    const [dateRange, setDateRange] = useState([new Date(2023, 0, 1), new Date(2023, 10, 5)]);

    const formatDate = (date) => {
        // Format date as needed (e.g., "MM/DD/YYYY")
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-GB', options);
    };

    const handleRangeChange = (values, handle) => {
        let newObj = {
            ...filterDetails,
            quote_value: values
        }
        setRangeValues(values);
        setfilterDetails(newObj);
    };

    const handleDateChange = (values, handle) => {
        let newDate = values.map((value) => new Date(Number(value)));
        setDateRange(newDate);
        let newObj = {
            ...filterDetails,
            expiration_date: newDate
        }
        setfilterDetails(newObj);
    };

    const handleSelectGroup = useCallback((name, opt) => {
        let newObj = {
            ...filterDetails,
            [name]: opt
        }
        setfilterDetails(newObj);
    }, [filterDetails]);

    return (
        <>
            <Offcanvas
                isOpen={isRight}
                direction="end"
                toggle={toggleRightCanvas}>
                <OffcanvasHeader toggle={toggleRightCanvas}>
                    Filter
                </OffcanvasHeader>
                <OffcanvasBody>
                    <form className='h-100'>
                        <div className="fcl_filter_sidebar_wrap sales_filter_wrap d-flex flex-column h-100">
                            <div className="row">
                                {/* <div className="col-lg-12">
                                    <p className="form-label">Quotation Date</p>
                                    <Nouislider
                                        range={{
                                            min: new Date(2023, 0, 1).getTime(),
                                            max: new Date(2023, 11, 31).getTime(),
                                        }}
                                        start={dateRange.map((date) => date.getTime())}
                                        step={24 * 60 * 60 * 1000}
                                        connect={true}
                                        tooltips={[
                                            {
                                                to: (value) => formatDate(new Date(value)),
                                                from: (value) => formatDate(new Date(value)),
                                            },
                                            {
                                                to: (value) => formatDate(new Date(value)),
                                                from: (value) => formatDate(new Date(value)),
                                            },
                                        ]}
                                        onChange={handleDateChange}
                                    />
                                    <div className='range_label'>
                                        {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </div>
                                </div> */}
                                {/* <div className="col-lg-12">
                                    <p className="form-label">Price</p>
                                    <Nouislider
                                        range={{ min: 45, max: 3000 }}
                                        step={5}
                                        start={rangeValues}
                                        onSlide={handleRangeChange}
                                        connect
                                    />
                                    <div className='range_label'>
                                        ${rangeValues[0]} - ${rangeValues[1]}
                                    </div>
                                </div> */}
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='quotation_from' className="form-label">Quotation From</label>
                                        <input type="date" name="quotation_from" id="quotation_from" className='form-control' value={filterDetails.quotation_from} onChange={(e) => handleSelectGroup('quotation_from', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='quotation_to' className="form-label">Quotation To</label>
                                        <input type="date" name="quotation_to" id="quotation_to" className='form-control' value={filterDetails.quotation_to} onChange={(e) => handleSelectGroup('quotation_to', e.target.value)} />
                                    </div>
                                </div>                            
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Origin</label>
                                        <Select
                                            value={filterDetails.org_port}
                                            name='org_port'
                                            onChange={(opt) => {
                                                handleSelectGroup('org_port', opt);
                                            }}
                                            options={optionOriginQuote}
                                            placeholder={'Select Origin'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Destination</label>
                                        <Select
                                            value={filterDetails.dest_port}
                                            name='dest_port'
                                            onChange={(opt) => {
                                                handleSelectGroup('dest_port', opt);
                                            }}
                                            options={optionDestQuote}
                                            placeholder={'Select Destination'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Mode</label>
                                        <Select
                                            value={filterDetails.quote_mode}
                                            name='quote_mode'
                                            onChange={(opt) => {
                                                handleSelectGroup('quote_mode', opt);
                                            }}
                                            options={optionModeQuote}
                                            placeholder={'Select Mode'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <label className="form-label">Status</label>
                                    <Select
                                        value={filterDetails.quote_status}
                                        name='quote_status'
                                        onChange={(opt) => {
                                            handleSelectGroup('quote_status', opt);
                                        }}
                                        options={optionStatusQuote}
                                        placeholder={'Select Status'}
                                        classNamePrefix="select2-selection form-select"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Quotation Value</p>
                                    <Nouislider
                                        range={{ min: 45, max: 3000 }}
                                        step={5}
                                        start={rangeValues}
                                        onSlide={handleRangeChange}
                                        connect
                                    />
                                    <div className='range_label'>
                                        ${rangeValues[0]} - ${rangeValues[1]}
                                    </div>
                                </div>
                                {/* <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Quotation Value</label>
                                        <Select
                                            value={filterDetails.quote_value}
                                            name='quote_value'
                                            onChange={(opt) => {
                                                handleSelectGroup('quote_value', opt);
                                            }}
                                            options={optionQuoteValueQuote}
                                            placeholder={'Select Destination'}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div> */}
                                {/* <div className="col-lg-12">
                                    <p className="form-label">Type of Containers</p>
                                    <div className="radio_wrap d-flex flex-wrap">
                                        <RadioCommon label={'20’ Standard'} id={'container_radio1'} name={'containerradio'} className={'mb-3'} value={'20_std'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'20’ Refrigerated'} id={'container_radio2'} name={'containerradio'} className={'mb-3'} value={'20_refi'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'40’ Standard'} id={'container_radio3'} name={'containerradio'} className={'mb-3'} value={'40_std'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'40’ Refrigerated'} id={'container_radio4'} name={'containerradio'} className={'mb-3'} value={'40_refi'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'40’ High Cube'} id={'container_radio5'} name={'containerradio'} value={'40_high'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'45’ High Cube'} id={'container_radio6'} name={'containerradio'} value={'45_high'} array={filterDetails} setArray={setfilterDetails} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>

                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Destination port</p>
                                    <div className="radio_wrap d-flex flex-wrap">
                                        <RadioCommon label={'Chennai'} id={'destport1'} name={'destport'} className={'mb-3'} value={'chennai'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'Mumbai'} id={'destport2'} name={'destport'} className={'mb-3'} value={'mumbai'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'Dhaka'} id={'destport3'} name={'destport'} className={'mb-3'} value={'dhaka'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'Chennai'} id={'destport4'} name={'destport'} className={'mb-3'} value={'chennai2'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'Mumbai'} id={'destport5'} name={'destport'} value={'mumbai2'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'Chennai'} id={'destport6'} name={'destport'} value={'chennai3'} array={filterDetails} setArray={setfilterDetails} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Included service</p>
                                    <div className="checkbox_wrap">
                                        <CheckboxCommon label={'Pick up'} id={'pickup'} name={'pickup'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Port of origin'} id={'port_origin'} name={'port_origin'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Ocean Freight'} id={'ocean_freight'} name={'ocean_freight'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Port of discharge'} id={'port_discharge'} name={'port_discharge'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Delivery'} id={'delivery'} name={'delivery'} array={filterDetails} setArray={setfilterDetails} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Vendor</p>
                                    <div className="radio_wrap d-flex flex-wrap">
                                        <RadioCommon label={'ABC'} id={'vendorradio1'} name={'vendorradio'} className={'mb-3'} value={'abc1'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'ABC'} id={'vendorradio2'} name={'vendorradio'} className={'mb-3'} value={'abc2'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'ABC'} id={'vendorradio3'} name={'vendorradio'} className={'mb-3'} value={'abc3'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'ABC'} id={'vendorradio4'} name={'vendorradio'} className={'mb-3'} value={'abc4'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'ABC'} id={'vendorradio5'} name={'vendorradio'} value={'abc5'} array={filterDetails} setArray={setfilterDetails} />
                                        <RadioCommon label={'ABC'} id={'vendorradio6'} name={'vendorradio'} value={'abc6'} array={filterDetails} setArray={setfilterDetails} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Shipping Line</p>
                                    <div className="checkbox_wrap half_size d-flex flex-wrap">
                                        <CheckboxCommon label={'CMA CGM'} id={'shipping_cma'} name={'shipping_cma'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'MSC'} id={'shipping_msc'} name={'shipping_msc'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                    </div>
                                </div> */}
                            </div>
                            <div className="btn_wrap d-flex mt-auto">
                                <button className='btn border' type='button' onClick={() => { setRangeValues([45, 2500]); setDateRange([new Date(2023, 0, 1), new Date(2023, 10, 5)]); clearValueHandler(); }}>Clear</button>
                                <button className='btn btn-primary' type='button' onClick={applyFilterHandler}>Apply Filter</button>
                            </div>
                        </div>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
