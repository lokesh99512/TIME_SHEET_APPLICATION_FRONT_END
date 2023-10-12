import React, { useRef, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { airplane_filled, avtar_filled, calendar_filled, cube_filled, delete_icon, location_filled, pickup_icon, ship_filled, swap_arrow, truk_filled } from '../../../../assets/images';
import { countryList, optionAirTransportBy, optionCargoType, optionContainerType, optionContainerTypeRefrigerated, optionContainerTypeWithoutRefri, optionCurrency, optionCustomerName, optionIncoterm, optionLandTransportBy, optionPortList, optionServiceType, optionTransportBy, optionlocationType, weightUnitOption } from '../../../../common/data/sales';
import { useOutsideClick } from '../../../../components/Common/CommonLogic';
import SimpleBar from "simplebar-react"
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from 'react-redux';
import { AccordionBody, AccordionHeader, AccordionItem, Collapse, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledAccordion, UncontrolledDropdown } from 'reactstrap';
import { UPDATE_CONTAINERTYPE_CONFIRM, UPDATE_CONTAINER_CHANGE, UPDATE_SEARCH_QUOTATION_CURRENCY, UPDATE_SEARCH_QUOTATION_DATA, UPDATE_SEARCH_QUOTATION_DATE, UPDATE_SEARCH_QUOTATION_LOCATION_FROM, UPDATE_SEARCH_QUOTATION_LOCATION_TO, UPDATE_SEARCH_QUOTATION_SWAP, UPDATE_VALUE_BLANK } from '../../../../store/Sales/actiontype';

export default function CreateQuoteTop({ searchView, setSearchView, searchResult }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropId, setDropId] = useState(false);
    const dropdownRef = useRef(null);
    const [classHazardous, setClassHazardous] = useState(0);
    const createFields = useSelector((state) => state?.sales?.createFields);
    const dispatch = useDispatch();
    const [containerArray, setcontainerArray] = useState([]);
    const [calculateVal, setCalculateVal] = useState();
    const ref = useRef();
    const [unitValue, setUnitValue] = useState({
        _standard1: 0,
        _standard2: 0,
        _high_cube1: 0,
        _high_cube2: 0,
        _refrigerated1: 0,
        _refrigerated2: 0,
    })
    const [containerType, setContainerType] = useState([
        {
            no_unit: '',
            weight: '',
            weight_unit: 'KG',
            dimensions_l: '',
            dimensions_w: '',
            dimensions_h: '',
            dimensions_unit: 'IN',
        }
    ])

    const handleChangeHandler = (item, name, blank, blank_name) => {
        if (blank) {
            dispatch({ type: UPDATE_VALUE_BLANK, payload: blank_name })
        }
        dispatch({ type: UPDATE_SEARCH_QUOTATION_DATA, payload: { item, name } })
    }

    const handleContainerChangeHandler = (item, name) => {
        let newArray = [...containerArray];

        if (containerArray.some((obj) => obj?.id === item.id)) {
            console.log(containerArray, "else containerArray");
        } else {
            newArray.push(item);
            let updatedArray = [...newArray];
            setcontainerArray(updatedArray);
            dispatch({ type: UPDATE_CONTAINER_CHANGE, payload: updatedArray })
        }
    }

    const handleCurrencyChangeHandler = (item, name) => {
        dispatch({ type: UPDATE_SEARCH_QUOTATION_CURRENCY, payload: { currency_item: item, currency_name: name } })
    }

    // -------------- location from / to 
    const locationChangeHandler = (item, name, type) => {
        if (type === 'from') {
            dispatch({ type: UPDATE_SEARCH_QUOTATION_LOCATION_FROM, payload: { location_item: item, location_name: name } })
        } else {
            dispatch({ type: UPDATE_SEARCH_QUOTATION_LOCATION_TO, payload: { location_item2: item, location_name2: name } })
        }
    }

    const handleDateChnage = (arr, value, target) => {
        let arrItem = arr
        dispatch({ type: UPDATE_SEARCH_QUOTATION_DATE, payload: { arrItem } })
    }

    // ------------- swap

    const swapHandler = () => {
        dispatch({ type: UPDATE_SEARCH_QUOTATION_SWAP })
    }

    // --------------- Container type
    const AddLoadHandler = () => {
        setContainerType(s => {
            return [
                ...s,
                {
                    no_unit: '',
                    weight: '',
                    weight_unit: 'KG',
                    dimensions_l: '',
                    dimensions_w: '',
                    dimensions_h: '',
                    dimensions_unit: 'IN',
                }
            ]
        })
    }

    const removeInputFields = (index) => {
        const rows = [...containerType];
        rows.splice(index, 1);
        setContainerType(rows);
    }

    const contanerTypeValHandler = (val, name, index) => {
        const list = [...containerType];
        list[index][name] = val;
        setContainerType(list);
    }
    const confirmHandler = () => {
        // console.log(calculateVal,"calculateVal");
        // console.log(calculateVal,"calculateVal");
        console.log(containerType, "containerType-------------");
        dispatch({ type: UPDATE_CONTAINERTYPE_CONFIRM, payload: [...containerType] });
        setIsOpen(false);
    }
    // --------- increament / decreament
    const countMinusHandler = (e, id) => {
        e.stopPropagation();
        let count = unitValue[id];
        let newObj;
        if (count >= 1) {
            newObj = {
                ...unitValue,
                [id]: count - 1
            }
            setUnitValue(newObj);
        }
    }
    const countPlusHandler = (e, id) => {
        e.stopPropagation();
        let count = unitValue[id];
        let newObj;
        if (count >= 0) {
            newObj = {
                ...unitValue,
                [id]: count + 1
            }
            setUnitValue(newObj);
        }
    }
    const handleQuantity = (e, id) => {
        let newObj = {
            ...unitValue,
            [id]: e.target.value
        }
        setUnitValue(newObj);
    }
    // ------------ custom dropdown -------------------
    const toggleDropdown = (id) => {
        setIsOpen(!isOpen);
        setDropId(id);
    };
    useOutsideClick(dropdownRef, setIsOpen);
    // ------------ custom dropdown -------------------    
    console.log(createFields, "createFields")
    return (
        <>
            <div className="create_sales_search_forms">
                {searchView && (
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="common_dropdwon_btn_wrap mb-3">
                                <div
                                    id='more_menu'
                                    className={`prof_wrap d-flex ${isOpen && dropId === 1 ? 'openmenu' : ''}`}
                                    onClick={() => { toggleDropdown(1) }}
                                >
                                    <div className={`icon d-flex align-items-center justify-content-center ${createFields?.customer_name?.img ? 'customer_name' : ''}`}>
                                        <img src={createFields?.customer_name?.img || avtar_filled} alt="Avatar" />
                                    </div>
                                    <div className="con">
                                        <label className="form-label">Select Customer</label>
                                        <span className={`value ${createFields?.customer_name?.name ? 'value_focus' : ''}`}>{(createFields?.customer_name?.name || 'Select customer')}</span>
                                    </div>
                                    <i className="mdi mdi-chevron-down" />
                                </div>
                                {isOpen && dropId === 1 ?
                                    <ul className="common_dropdown_wrap" ref={dropdownRef}>
                                        <SimpleBar style={{ maxHeight: "300px" }} ref={ref}>
                                            {(optionCustomerName || '').map(({ value, name, img }, index) => (
                                                <li key={index} onClick={() => { handleChangeHandler({ value, name, img }, 'customer_name'); setIsOpen(false); }} className={createFields?.customer_name?.value === value ? 'active' : ''}>
                                                    <div className="custom-option">
                                                        <img src={img} alt="Avatar" />
                                                        <p>{name}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </SimpleBar>
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="common_dropdwon_btn_wrap mb-3">
                                <div
                                    id='more_menu'
                                    className={`prof_wrap d-flex ${isOpen && dropId === 2 ? 'openmenu' : ''}`}
                                    onClick={() => { toggleDropdown(2) }}
                                >
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                    </div>
                                    <div className="con">
                                        <label className="form-label">Shipping By</label>
                                        <span className={`value ${createFields?.shipping_by?.name ? 'value_focus' : ''}`}>{(createFields?.shipping_by?.name || 'Select transport by')}</span>
                                    </div>
                                    <i className="mdi mdi-chevron-down" />
                                </div>
                                {isOpen && dropId === 2 ?
                                    <ul className="common_dropdown_wrap shipping" ref={dropdownRef}>
                                        <li className={`sea ${createFields?.shipping_by?.value === 'sea' ? 'active' : ''}`} onClick={() => { handleChangeHandler({ value: 'sea', name: 'Sea', img: ship_filled }, 'shipping_by', true, 'container_type'); setIsOpen(false); setcontainerArray([]); }}>
                                            <div className="custom-option">
                                                <p>Sea</p>
                                            </div>
                                        </li>
                                        <li className={`land ${createFields?.shipping_by?.value === 'land' ? 'active' : ''}`} onClick={() => { handleChangeHandler({ value: 'land', name: 'Land', img: truk_filled }, 'shipping_by', true, 'container_type'); setIsOpen(false); setcontainerArray([]); }}>
                                            <div className="custom-option">
                                                <p>Land</p>
                                            </div>
                                        </li>
                                        <li className={`air ${createFields?.shipping_by?.value === 'air' ? 'active' : ''}`} onClick={() => { handleChangeHandler({ value: 'air', name: 'Air', img: airplane_filled }, 'shipping_by', true, 'container_type'); setIsOpen(false); setcontainerArray([]); }}>
                                            <div className="custom-option">
                                                <p>Air</p>
                                            </div>
                                        </li>
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="common_dropdwon_btn_wrap mb-3">
                                <div
                                    id='more_menu'
                                    className={`prof_wrap d-flex ${isOpen && dropId === 3 ? 'openmenu' : ''}`}
                                    onClick={() => { toggleDropdown(3) }}
                                >
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                    </div>
                                    <div className="con">
                                        <label className="form-label">Service Type</label>
                                        <span className={`value ${createFields?.service_type?.name ? 'value_focus' : ''}`}>{(createFields?.service_type?.name || 'Select type')}</span>
                                    </div>
                                    <i className="mdi mdi-chevron-down" />
                                </div>
                                {isOpen && dropId === 3 ?
                                    <ul className="common_dropdown_wrap" ref={dropdownRef}>
                                        {(optionServiceType || '').map(({ value, name }, index) => (
                                            <li key={index} className={`${createFields?.service_type?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({ value, name }, 'service_type'); setIsOpen(false); }}>
                                                <div className="custom-option">
                                                    <p>{name}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul> : null
                                }
                            </div>
                        </div>
                    </div>
                )}

                {/* Port From && To */}
                <div className="quotation_select_port_wrap d-flex mb-3">
                    <div className={`quotation_from_wrap ${isOpen && dropId === 9 ? 'openmenu' : ''}`}>
                        <div className={`common_dropdwon_btn_wrap`}>
                            <div
                                id='more_menu'
                                className={`location_wrap d-flex`}
                                onClick={() => { toggleDropdown(9) }}
                            >
                                <div className="icon me-3 d-flex align-items-center justify-content-center">
                                    <img src={location_filled} alt="Location" />
                                </div>
                                <div className="con">
                                    <label className="form-label">From</label>
                                    <span className={`value ${createFields?.location_from?.address ? 'value_focus' : ''}`}>
                                        {(createFields?.location_from?.address !== undefined && createFields?.location_from?.address) ? (
                                            <>
                                                <img src={createFields?.location_from?.country?.flag} alt="Flag" />
                                                {createFields?.location_from?.address?.label}
                                            </>
                                        ) : 'Select Location'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isOpen && dropId === 9 ?
                        <div className="location_dropdown_wrap " ref={dropdownRef}>
                            <div className="field_input_wrap">
                                <label htmlFor="" className='form-label'>Type</label>
                                <UncontrolledDropdown>
                                    <DropdownToggle className="btn btn-link shadow-none" tag="a">
                                        <span><img src={createFields?.location_from?.port_type?.icon || pickup_icon} alt="Pickup" />
                                            {createFields?.location_from?.port_type?.name || 'Select Type'}
                                        </span>
                                        <i className="mdi mdi-chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        {(optionlocationType || '')?.map((item) => (
                                            <DropdownItem
                                                key={item.value}
                                                className={createFields?.location_from?.port_type?.value === item.value ? 'active' : ''}
                                                onClick={() => { locationChangeHandler(item, 'port_type', 'from') }}
                                            >
                                                <div className="custom-option">
                                                    <p className='m-0'>{item.name}</p>
                                                    <img src={item.icon} alt="Location" className='ms-auto' />
                                                </div>
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <div className="field_input_wrap">
                                <label htmlFor="" className='form-label'>Select Country</label>
                                <Select
                                    value={createFields?.location_from?.country}
                                    name='country'
                                    onChange={(opt) => {
                                        locationChangeHandler(opt, 'country', 'from')
                                    }}
                                    options={countryList}
                                    // isOptionDisabled={(option) => option.value === createFields?.location_to?.country?.value}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                            <div className="field_input_wrap">
                                <label htmlFor="" className='form-label'>Address</label>
                                <Select
                                    value={createFields?.location_from?.address}
                                    name='address'
                                    onChange={(opt) => {
                                        locationChangeHandler(opt, 'address', 'from')
                                    }}
                                    options={optionPortList}
                                    isOptionDisabled={(option) => option.value === createFields?.location_to?.address?.value}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div> : null
                    }
                    <button type="button" className='swap_btn_wrap' onClick={swapHandler}><img src={swap_arrow} alt="Swap Arrow" /></button>
                    <div className={`quotation_to_wrap ${isOpen && dropId === 10 ? 'openmenu' : ''}`}>
                        <div className="common_dropdwon_btn_wrap">
                            <div
                                id='more_menu'
                                className={`location_wrap d-flex`}
                                onClick={() => { toggleDropdown(10) }}
                            >
                                <div className="icon me-3 d-flex align-items-center justify-content-center">
                                    <img src={location_filled} alt="Location" />
                                </div>
                                <div className="con">
                                    <label className="form-label">To</label>
                                    <span className={`value ${createFields?.location_to?.address ? 'value_focus' : ''}`}>
                                        {(createFields?.location_to?.address !== undefined && createFields?.location_to?.address) ? (
                                            <>
                                                <img src={createFields?.location_to?.country?.flag} alt="Flag" />
                                                {createFields?.location_to?.address?.label}
                                            </>
                                        ) : 'Select Location'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isOpen && dropId === 10 ?
                        <div className="location_dropdown_wrap " ref={dropdownRef}>
                            <div className="field_input_wrap">
                                <label htmlFor="" className='form-label'>Type</label>
                                <UncontrolledDropdown>
                                    <DropdownToggle className="btn btn-link shadow-none" tag="a">
                                        <span><img src={createFields?.location_to?.port_type?.icon || pickup_icon} alt="Pickup" />
                                            {createFields?.location_to?.port_type?.name || 'Select Type'}
                                        </span>
                                        <i className="mdi mdi-chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        {(optionlocationType || '')?.map((item) => (
                                            <DropdownItem
                                                key={item.value}
                                                className={createFields?.location_to?.port_type?.value === item.value ? 'active' : ''}
                                                onClick={() => { locationChangeHandler(item, 'port_type', 'to') }}
                                            >
                                                <div className="custom-option">
                                                    <p className='m-0'>{item.name}</p>
                                                    <img src={item.icon} alt="Location" className='ms-auto' />
                                                </div>
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <div className="field_input_wrap">
                                <label htmlFor="" className='form-label'>Select Country</label>
                                <Select
                                    value={createFields?.location_to?.country}
                                    name='country'
                                    onChange={(opt) => {
                                        locationChangeHandler(opt, 'country', 'to')
                                    }}
                                    options={countryList}
                                    classNamePrefix="select2-selection form-select"
                                // isOptionDisabled={(option) => option.value === createFields?.location_from?.country?.value}
                                />
                            </div>
                            <div className="field_input_wrap">
                                <label htmlFor="" className='form-label'>Address</label>
                                <Select
                                    value={createFields?.location_to?.address}
                                    name='address'
                                    onChange={(opt) => {
                                        locationChangeHandler(opt, 'address', 'to')
                                    }}
                                    options={optionPortList}
                                    isOptionDisabled={(option) => option.value === createFields?.location_from?.address?.value}
                                    classNamePrefix="select2-selection form-select"
                                // defaultMenuIsOpen
                                />
                            </div>
                        </div> : null
                    }
                </div>
                {/* Port From && To */}

                {searchView && (
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="prof_wrap calendar_field_wrap d-flex mb-3">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <img src={calendar_filled} alt="Avatar" />
                                </div>
                                <div className="con">
                                    <label className="form-label">Cargo Ready Date</label>
                                    <Flatpickr
                                        value={createFields?.cargo_date}
                                        className="form-control d-block"
                                        placeholder="Select Date"
                                        options={{
                                            mode: "range",
                                            dateFormat: "Y-m-d"
                                        }}
                                        onChange={handleDateChnage}
                                    />
                                </div>
                            </div>
                        </div>
                        {createFields?.service_type?.value && (
                            <>
                                {createFields?.shipping_by?.value !== 'air' && (
                                    <>
                                        <div className="col-lg-4">
                                            <div className="common_dropdwon_btn_wrap mb-3">
                                                <div
                                                    id='more_menu'
                                                    className={`prof_wrap d-flex ${isOpen && dropId === 4 ? 'openmenu' : ''}`}
                                                    onClick={() => { toggleDropdown(4) }}
                                                >
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                                    </div>
                                                    <div className="con">
                                                        <label className="form-label">Transport By</label>
                                                        <span className={`value ${createFields?.transport_by?.name ? 'value_focus' : ''}`}>{(createFields?.transport_by?.name || 'Select Transport By')}</span>
                                                    </div>
                                                    <i className="mdi mdi-chevron-down" />
                                                </div>
                                                {isOpen && dropId === 4 ?
                                                    <ul className="common_dropdown_wrap" ref={dropdownRef}>
                                                        {(createFields?.shipping_by?.value === 'land' ? optionLandTransportBy : optionTransportBy || '').map(({ value, name }, index) => (
                                                            <li key={index} className={`${createFields?.transport_by?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({ value, name }, 'transport_by', true,'container_type'); setIsOpen(false); }}>
                                                                <div className="custom-option">
                                                                    <p>{name}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul> : null
                                                }
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="col-lg-4">
                                    <div className="common_dropdwon_btn_wrap mb-3">
                                        <div
                                            id='more_menu'
                                            className={`prof_wrap d-flex ${isOpen && dropId === 7 ? 'openmenu' : ''}`}
                                            onClick={() => { toggleDropdown(7) }}
                                        >
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                            </div>
                                            <div className="con">
                                                <label className="form-label">Cargo Type</label>
                                                <span className={`value ${createFields?.cargo_type?.name ? 'value_focus' : ''}`}>
                                                    {(createFields?.cargo_type?.name || 'Select Cargo Type')}
                                                    {createFields?.cargo_type?.value === 'hazardous' && classHazardous !== 0 ? (
                                                        <>
                                                            , class: {classHazardous}
                                                        </>
                                                    ) : ''}
                                                </span>
                                            </div>
                                            <i className="mdi mdi-chevron-down" />
                                        </div>
                                        {isOpen && dropId === 7 ?
                                            <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                                                {(optionCargoType || '').map(({ value, name }, index) => (
                                                    <li key={index}
                                                        className={`${createFields?.cargo_type?.value === value ? 'active' : ''}`}
                                                        onClick={() => { handleChangeHandler({ value, name }, 'cargo_type', true, 'container_type'); (value !== 'hazardous' ? setIsOpen(false) : null); setcontainerArray([]); }}>
                                                        <div className="custom-option">
                                                            <p>{name}</p>
                                                            {value === 'hazardous' && (
                                                                <div className='d-flex ms-auto'>
                                                                    <p className='me-2'>class:</p>
                                                                    <div className="quantity_wrap">
                                                                        <button className="minus" onClick={() => { setClassHazardous(prev => prev >= 1 ? prev - 1 : 0) }}> <i className='fas fa-minus'></i> </button>
                                                                        <input type="number" name={`${value}_class`} id={`${value}_class`} value={classHazardous} onChange={(e) => { setClassHazardous(e.target.value) }} />
                                                                        <button className="plus" onClick={() => { setClassHazardous(prev => prev <= 8 ? prev + 1 : prev) }}> <i className=' fas fa-plus'></i> </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul> : null
                                        }
                                    </div>
                                </div>
                                {(createFields?.transport_by?.value === 'fcl' || createFields?.transport_by?.value === 'ftl') && (
                                    <div className="col-lg-4">
                                        <div className="common_dropdwon_btn_wrap mb-3">
                                            <div
                                                id='more_menu'
                                                className={`prof_wrap d-flex ${isOpen && dropId === 5 ? 'openmenu' : ''}`}
                                                onClick={() => { toggleDropdown(5) }}
                                            >
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                                </div>
                                                <div className="con">
                                                    <label className="form-label">Container Type</label>
                                                    <span className={`value ${createFields?.container_type.length !== 0 ? 'value_focus' : ''}`}>
                                                        {/* {(createFields?.container_type?.name || 'Select Container Type')} */}
                                                        {/* {(unitValue[createFields?.container_type?.id] !== undefined && unitValue[createFields?.container_type?.id] !== 0) ? (
                                                            <>
                                                                , unit: "{unitValue[createFields?.container_type?.id]}"
                                                            </>
                                                        ) : ''
                                                        } */}
                                                        {createFields?.container_type !== '' && createFields?.container_type !== undefined ? createFields?.container_type?.map((item) => (
                                                            <span key={item.id}>{item.name}, unit: "{unitValue[item.id]}" ,  &nbsp;</span>
                                                        )) : 'Select Container Type'}
                                                    </span>
                                                </div>
                                                <i className="mdi mdi-chevron-down" />
                                            </div>
                                            {isOpen && dropId === 5 ?
                                                <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                                                    {(createFields?.cargo_type?.value === 'refrigerated' ? optionContainerTypeRefrigerated
                                                        : createFields?.cargo_type?.value === 'hazardous' ? optionContainerType : optionContainerTypeWithoutRefri || '').map(({ id, value, name }, index) => (
                                                            <li key={index} className={`${createFields?.container_type?.value === value ? 'active' : ''}`} onClick={() => { handleContainerChangeHandler({ id, value, name }, 'container_type'); }}>
                                                                <div className="custom-option">
                                                                    <p>{name}</p>
                                                                    <div className="quantity_wrap">
                                                                        <button className="minus" onClick={(e) => { countMinusHandler(e, id) }}> <i className='fas fa-minus'></i> </button>
                                                                        <input type="number" name={`${id}_unit`} id={`${id}_unit`} value={unitValue[id]} onChange={(e) => { handleQuantity(e, id) }} />
                                                                        <button className="plus" onClick={(e) => { countPlusHandler(e, id) }}> <i className=' fas fa-plus'></i> </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                </ul> : null
                                            }
                                        </div>
                                    </div>
                                )}

                                {(createFields?.transport_by?.value === 'lcl' || createFields?.shipping_by?.value === 'air' || createFields?.transport_by?.value === 'ltl') && (
                                    <div className="col-lg-4">
                                        <div className="common_dropdwon_btn_wrap mb-3">
                                            <div
                                                id='more_menu'
                                                className={`prof_wrap d-flex ${isOpen && dropId === 11 ? 'openmenu' : ''}`}
                                                onClick={() => { toggleDropdown(11) }}
                                            >
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                                </div>
                                                <div className="con">
                                                    <label className="form-label">Shipment Details</label>
                                                    <span className={`value ${createFields?.container_type?.length !== 0 ? 'value_focus' : ''}`}>
                                                        {/* {(createFields?.container_type?.name || 'Select Container Type')} */}
                                                        {createFields?.container_type?.length !== 0 ? (
                                                            <>
                                                            {createFields?.container_type[0].no_unit} Units | 0.007 cbm | {createFields?.container_type[0].weight} {createFields?.container_type[0].weight_unit}                                                            
                                                            </>
                                                        ) : 'Select Container Type'}
                                                    </span>
                                                </div>
                                                <i className="mdi mdi-chevron-down" />
                                            </div>
                                            {isOpen && dropId === 11 ?
                                                <div className="common_dropdown_wrap container_drop_wrap" ref={dropdownRef}>
                                                    {containerType.length !== 0 && (
                                                        <UncontrolledAccordion defaultOpen="1">
                                                            {(containerType || '')?.map((item, index) => (
                                                                <AccordionItem key={index}>
                                                                    <AccordionHeader targetId={`${index + 1}`}>
                                                                        Load {index + 1}
                                                                        <span className='p-0 ms-auto' onClick={() => { removeInputFields(index) }}><img src={delete_icon} alt="Delete" /></span>
                                                                    </AccordionHeader>
                                                                    <AccordionBody accordionId={`${index + 1}`}>
                                                                        <div className="field_wrap">
                                                                            <div className="input_field">
                                                                                <label htmlFor={`no_unit_${index}`} className="form-label">No. Of Units</label>
                                                                                <input type="number" value={containerType[index].no_unit || ''} className="form-control" id={`no_unit_${index}`} onChange={(e) => { contanerTypeValHandler(e.target.value, 'no_unit', index); }} />
                                                                            </div>
                                                                            <div className="input_field field_dropdown">
                                                                                <label htmlFor={`weight_${index}`} className="form-label">weight</label>
                                                                                <input type="number" value={containerType[index].weight || ''} className="form-control" id={`weight_${index}`} onChange={(e) => { contanerTypeValHandler(e.target.value, 'weight', index); }} />
                                                                                <UncontrolledDropdown>
                                                                                    <DropdownToggle className="btn btn-link" tag="a">
                                                                                        {containerType[index].weight_unit}
                                                                                        <i className="mdi mdi-chevron-down" />
                                                                                    </DropdownToggle>
                                                                                    <DropdownMenu className="dropdown-menu-end">
                                                                                        {(weightUnitOption || '').map((item) => (
                                                                                            <DropdownItem key={item?.value} onClick={() => { contanerTypeValHandler(item?.name, 'weight_unit', index); }}>{item?.name}</DropdownItem>
                                                                                        ))}
                                                                                    </DropdownMenu>
                                                                                </UncontrolledDropdown>
                                                                            </div>
                                                                        </div>
                                                                        <div className="dimention_field mt-3">
                                                                            <p className="form-label">Dimensions (L×W×H per unit)</p>
                                                                            <div className="input_field_wrap d-flex">
                                                                                <div className="input_field dimention_l">
                                                                                    <input type="number" value={containerType[index].dimensions_l || ''} className="form-control" id={`dimensions_l_${index}`} onChange={(e) => { contanerTypeValHandler(e.target.value, 'dimensions_l', index); }} />
                                                                                </div>
                                                                                <div className="input_field dimention_w">
                                                                                    <input type="number" value={containerType[index].dimensions_w || ''} className="form-control" id={`dimensions_w_${index}`} onChange={(e) => { contanerTypeValHandler(e.target.value, 'dimensions_w', index); }} />
                                                                                </div>
                                                                                <div className="input_field dimention_h">
                                                                                    <input type="number" value={containerType[index].dimensions_h || ''} className="form-control" id={`dimensions_h_${index}`} onChange={(e) => { contanerTypeValHandler(e.target.value, 'dimensions_h', index); }} />
                                                                                </div>
                                                                                <div className="input_field">
                                                                                    <UncontrolledDropdown>
                                                                                        <DropdownToggle className="btn btn-link dimention_drop d-flex justify-content-between" tag="a">
                                                                                            {containerType[index].dimensions_unit}
                                                                                            <i className="mdi mdi-chevron-down" />
                                                                                        </DropdownToggle>
                                                                                        <DropdownMenu className="dropdown-menu-end">
                                                                                            <DropdownItem onClick={() => { contanerTypeValHandler('IN', 'dimensions_unit', index); }}>IN</DropdownItem>
                                                                                            <DropdownItem onClick={() => { contanerTypeValHandler('CM', 'dimensions_unit', index); }}>CM</DropdownItem>
                                                                                            <DropdownItem onClick={() => { contanerTypeValHandler('MM', 'dimensions_unit', index); }}>MM</DropdownItem>
                                                                                        </DropdownMenu>
                                                                                    </UncontrolledDropdown>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </AccordionBody>
                                                                </AccordionItem>
                                                            ))}
                                                        </UncontrolledAccordion>
                                                    )}
                                                    <div className="btn_wrap d-flex justify-content-end">
                                                        <button type="button" className='btn border_btn' onClick={AddLoadHandler}>Add Another Load</button>
                                                        <button type="button" className='btn btn-primary' onClick={confirmHandler}>Confirm</button>
                                                    </div>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                )}
                                <div className="col-lg-4">
                                    <div className="common_dropdwon_btn_wrap mb-3">
                                        <div
                                            id='more_menu'
                                            className={`prof_wrap d-flex ${isOpen && dropId === 6 ? 'openmenu' : ''}`}
                                            onClick={() => { toggleDropdown(6) }}
                                        >
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                            </div>
                                            <div className="con">
                                                <label className="form-label">Incoterm</label>
                                                <span className={`value ${createFields?.incoterm?.name ? 'value_focus' : ''}`}>{(createFields?.incoterm?.name || 'Select Incoterm')}</span>
                                            </div>
                                            <i className="mdi mdi-chevron-down" />
                                        </div>
                                        {isOpen && dropId === 6 ?
                                                <ul className="common_dropdown_wrap" ref={dropdownRef}>
                                                    <SimpleBar style={{ maxHeight: "300px" }} ref={ref}>
                                                    {(optionIncoterm || '').map(({ value, name }, index) => (
                                                        <li key={index} className={`${createFields?.incoterm?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({ value, name }, 'incoterm'); setIsOpen(false); }}>
                                                            <div className="custom-option">
                                                                <p>{name}</p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                    </SimpleBar>
                                                </ul> 
                                        : null
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="prof_wrap number_field_wrap d-flex mb-3">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                                        </div>
                                        <div className="con d-flex align-items-center">
                                            <div className="left_field">
                                                <label htmlFor='cargo_value' className="form-label">Cargo Value</label>
                                                <input type="number" value={createFields?.cargo_value?.value?.value || ''} name="cargo_value" id="cargo_value" placeholder='Enter amount' onChange={(e) => { handleCurrencyChangeHandler({ value: e.target.value }, 'value') }} />
                                            </div>
                                            <div className="common_dropdwon_btn_wrap">
                                                <div
                                                    id='more_menu'
                                                    className={`d-flex align-items-center ${isOpen && dropId === 8 ? 'openmenu' : ''}`}
                                                    onClick={() => { toggleDropdown(8) }}
                                                >
                                                    <span>{createFields?.cargo_value?.currency?.code} </span>
                                                    <i className="mdi mdi-chevron-down" />
                                                </div>
                                                {isOpen && dropId === 8 ?
                                                    <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                                                        {(optionCurrency || '')?.map((item, index) => (
                                                            <li key={index} className={`${createFields?.cargo_value?.currency?.value === item?.value ? 'active' : ''}`} onClick={() => { handleCurrencyChangeHandler(item, 'currency'); setIsOpen(false); }}>
                                                                <span>{item?.code}</span>{item?.name}
                                                            </li>
                                                        ))}
                                                    </ul> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
                {searchResult ? <button className='btn d-table ms-auto p-0 search_view_btn' onClick={() => { setSearchView(!searchView) }}>{!searchView ? 'Expand' : 'Less'} Search View </button> : null}
            </div>
        </>
    )
}
