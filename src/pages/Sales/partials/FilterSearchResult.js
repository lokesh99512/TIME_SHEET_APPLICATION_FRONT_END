import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import CheckboxCommon from '../../Common/CheckboxCommon';

export default function FilterSearchResult({ isRight, toggleRightCanvas, filterDetails, setfilterDetails, applyFilterHandler, clearValueHandler }) {
    const [rangeValues, setRangeValues] = useState([45, 2500]); // Initial values for the range slider
    const [dateRange, setDateRange] = useState([new Date(2024, 0, 1), new Date(2024, 5, 9)]);
    const [AllVendors, setAllVendors] = useState([]);
    const { vendor_data, currency_data } = useSelector((state) => state?.globalReducer);

    useEffect(() => {
        const vendorMap = new Map();
        if (vendor_data?.content) {
            vendor_data.content.forEach((item) => {
                const vendorType = item.vendorType;
                const vendor = {
                    label: item.name,
                    value: item.name,
                    version: item.version,
                    id: item.id,
                };

                const vendorsForType = vendorMap.get(vendorType) || [];
                vendorsForType.push(vendor);
                vendorMap.set(vendorType, vendorsForType);
            });

            setAllVendors(vendorMap);
        }
    }, [vendor_data]);

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
            validity: newDate
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

    const handleMultiSelectChange = useCallback((opt, name, options) => {

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
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='carriers' className="form-label">Carriers</label>
                                        <Select
                                            value={filterDetails.carriers}
                                            name='carriers'
                                            isMulti
                                            options={Array.from(AllVendors)?.filter(([key]) => key === "CARRIER").flatMap(([, values]) => values) || []}
                                            onChange={(opt) => { handleMultiSelectChange(opt, 'carriers', Array.from(AllVendors)?.filter(([key]) => key === "CARRIER").flatMap(([, values]) => values) || []) }}
                                            className="basic-multi-select"
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <label htmlFor='agents' className="form-label">Agents</label>
                                    <Select
                                        value={filterDetails.agents}
                                        name='agents'
                                        isMulti
                                        options={Array.from(AllVendors)?.filter(([key]) => key !== "CARRIER").flatMap(([, values]) => values) || []}
                                        onChange={(opt) => { handleMultiSelectChange(opt, 'agents', Array.from(AllVendors)?.filter(([key]) => key !== "CARRIER").flatMap(([, values]) => values) || []) }}
                                        className="basic-multi-select"
                                        classNamePrefix="select2-selection form-select"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Charges</p>
                                    <div className="checkbox_wrap">
                                        <CheckboxCommon label={'Origin Inland Charges'} id={'origin_inland_charges'} name={'origin_inland_charges'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Origin Local Port Charges'} id={'origin_local_port_charges'} name={'origin_local_port_charges'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Freight Charges'} id={'freight_charges'} name={'freight_charges'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Destination Local Port Charges'} id={'dest_local_port_charges'} name={'dest_local_port_charges'} className={'mb-3'} array={filterDetails} setArray={setfilterDetails} />
                                        <CheckboxCommon label={'Destination Inland Charges'} id={'dest_inland_charges'} name={'dest_inland_charges'} array={filterDetails} setArray={setfilterDetails} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <p className="form-label">Validity</p>
                                    <Nouislider
                                        range={{
                                            min: new Date(2024, 0, 1).getTime(),
                                            max: new Date(2024, 11, 31).getTime(),
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
                                </div>
                                <div className="col-lg-12">
                                    <span className="divider"></span>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor='charge_currency' className="form-label">Currency</label>
                                        <Select
                                            value={filterDetails?.charge_currency || ''}
                                            name='charge_currency'
                                            onChange={(opt) => {
                                                handleSelectGroup('charge_currency', opt);
                                            }}
                                            options={currency_data}
                                            classNamePrefix="select2-selection form-select"
                                        />
                                    </div>
                                </div>
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
