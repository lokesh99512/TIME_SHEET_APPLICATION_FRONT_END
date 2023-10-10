import React, { useRef, useState } from 'react'
import Select from 'react-select';
import { airplane_filled, australia, avtar_filled, calendar_filled, cube_filled, location_filled, pickup_icon, ship_filled, swap_arrow, truk_filled } from '../../../../assets/images';
import { countryList, optionCargoType, optionContainerType, optionCurrency, optionCustomerName, optionIncoterm, optionPortList, optionServiceType, optionTransportBy, optionlocationType } from '../../../../common/data/sales';
import { useOutsideClick } from '../../../../components/Common/CommonLogic';
import "react-datepicker/dist/react-datepicker.css"
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import { optionRateType } from '../../../../common/data/procurement';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { UPDATE_SEARCH_QUOTATION_CURRENCY, UPDATE_SEARCH_QUOTATION_DATA, UPDATE_SEARCH_QUOTATION_DATE, UPDATE_SEARCH_QUOTATION_LOCATION, UPDATE_SEARCH_QUOTATION_LOCATION_FROM, UPDATE_SEARCH_QUOTATION_LOCATION_TO, UPDATE_SEARCH_QUOTATION_SWAP } from '../../../../store/Sales/actiontype'; 

export default function CreateQuoteTop() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropId, setDropId] = useState(false);
    const dropdownRef = useRef(null);
    const [classHazardous, setClassHazardous] = useState(0);
    // const [createFields,setCreateFields] = useState({
    //     customer_name: {},
    //     shipping_by: {},
    //     service_type: {},
    //     transport_by: {},
    //     container_type: {},
    //     incoterm: {},
    //     cargo_type: {},
    //     cargo_value: {currency: {name: 'Rupee', value: 'rupee', code: '₹'}},
    //     cargo_date: {},
    //     location_from: {port_type: {},country: '',address: ''},
    //     location_to: {port_type: {},country: {value: 'AU', label:'Australia',phonecode: '61', flag: australia},address: ''},
    // })

    const createFields = useSelector((state) => state?.sales?.createFields);
    const dispatch = useDispatch();
    console.log(createFields,"createFields")

    const [unitValue, setUnitValue] = useState({
        _standard1: 0,
        _standard2: 0,
        _high_cube1: 0,
        _high_cube2: 0,
        _refrigerated1: 0,
        _refrigerated2: 0,
    })

    const handleChangeHandler = (item,name) => {
        // let newObj = {
        //     ...createFields,
        //     [name]: item
        // }
        dispatch({type: UPDATE_SEARCH_QUOTATION_DATA, payload: {item,name}}) 
        // setCreateFields(newObj);
    }

    const handleCurrencyChangeHandler = (item, name) => {
        // let newObj = {
        //     ...createFields,
        //     cargo_value: {
        //         ...createFields.cargo_value,
        //         [name]: item
        //     }
        // }
        // setCreateFields(newObj);
        dispatch({type: UPDATE_SEARCH_QUOTATION_CURRENCY, payload: {currency_item:item,currency_name:name}})
    }

    // -------------- location from / to 
    const locationChangeHandler = (item, name, type) => {
        let newObj;
        if(type === 'from'){
            newObj = {
                ...createFields,
                location_from: {
                    ...createFields.location_from,
                    [name]: item
                }
            }
            dispatch({type: UPDATE_SEARCH_QUOTATION_LOCATION_FROM, payload: {location_item: item, location_name: name }})
        } else {
            newObj = {
                ...createFields,
                location_to: {
                    ...createFields.location_to,
                    [name]: item
                }
            }
            dispatch({type: UPDATE_SEARCH_QUOTATION_LOCATION_TO, payload: {location_item2: item, location_name2: name}})
        }
        // setCreateFields(newObj)
    }

    const handleDateChnage = (arr,value,target) => {
        // let newObj = {
        //     ...createFields,
        //     cargo_date: arr
        // }
        // setCreateFields(newObj);
        dispatch({type: UPDATE_SEARCH_QUOTATION_DATE, payload: {arr}}) 
        
    }

    const swapHandler = () => {
        // let newObj = {
        //     ...createFields,
        //     location_from: createFields.location_to,
        //     location_to: createFields.location_from
        // }
        // setCreateFields(newObj);
        dispatch({type: UPDATE_SEARCH_QUOTATION_SWAP})
    }

    // --------- increament / decreament
    const countMinusHandler = (e,id) => {
        e.stopPropagation();
        let count = unitValue[id];
        let newObj;
        if(count >= 1){
            newObj = {
                ...unitValue,
                [id]: count - 1
            }
            setUnitValue(newObj);            
        } 
    }
    const countPlusHandler = (e,id) => {
        e.stopPropagation();
        let count = unitValue[id];
        let newObj;
        if(count >= 0){
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
    // console.log(createFields,"createFields------------------")
    return (
        <>
            <div className="create_sales_search_forms">
                <div className="row mt-3">
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
                                    {(optionCustomerName || '').map(({value, name, img}, index) => (
                                        <li key={index} onClick={() => { handleChangeHandler({value,name,img}, 'customer_name'); setIsOpen(false); }} className={createFields?.customer_name?.value === value ? 'active' : ''}>
                                            <div className="custom-option">
                                                <img src={img} alt="Avatar" />
                                                <p>{name}</p>
                                            </div>
                                        </li>
                                    ))}
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
                                    <li className={`sea ${createFields?.shipping_by?.value === 'sea' ? 'active' : ''}`} onClick={() => { handleChangeHandler({value: 'sea',name: 'Sea', img: ship_filled}, 'shipping_by'); setIsOpen(false); }}>
                                        <div className="custom-option">
                                            <p>Sea</p>
                                        </div>
                                    </li>
                                    <li className={`land ${createFields?.shipping_by?.value === 'land' ? 'active' : ''}`} onClick={() => { handleChangeHandler({value: 'land',name: 'Land', img: truk_filled}, 'shipping_by'); setIsOpen(false); }}>
                                        <div className="custom-option">
                                            <p>Land</p>
                                        </div>
                                    </li>
                                    <li className={`air ${createFields?.shipping_by?.value === 'air' ? 'active' : ''}`} onClick={() => { handleChangeHandler({value: 'air',name: 'Air', img: airplane_filled}, 'shipping_by'); setIsOpen(false); }}>
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
                                    {(optionServiceType || '').map(({value,name},index) => (
                                        <li key={index} className={`${createFields?.service_type?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({value, name}, 'service_type'); setIsOpen(false); }}>
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
                                                onClick={() => {locationChangeHandler(item,'port_type','from')}}
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
                                        locationChangeHandler(opt,'country','from')
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
                                        locationChangeHandler(opt,'address','from')
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
                                                onClick={() => {locationChangeHandler(item,'port_type','to')}}
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
                                        locationChangeHandler(opt,'country','to')
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
                                        locationChangeHandler(opt,'address','to')
                                    }}
                                    options={optionPortList}
                                    isOptionDisabled={(option) => option.value === createFields?.location_from?.address?.value}
                                    classNamePrefix="select2-selection form-select"
                                    defaultMenuIsOpen
                                />
                            </div>
                        </div> : null
                    }
                </div>
                {/* Port From && To */}

                <div className="row">
                    <div className="col-lg-4">
                        <div className="prof_wrap calendar_field_wrap d-flex">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <img src={calendar_filled} alt="Avatar" />
                            </div>
                            <div className="con">
                                <label className="form-label">Cargo Ready Date</label>
                                <Flatpickr
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
                                    {(optionTransportBy || '').map(({value,name},index) => (
                                        <li key={index} className={`${createFields?.transport_by?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({value, name}, 'transport_by'); setIsOpen(false); }}>
                                            <div className="custom-option">
                                                <p>{name}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul> : null
                            }
                        </div>
                    </div>
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
                                {console.log(createFields,"createFields===========")}
                                <div className="con">
                                    <label className="form-label">Container Type</label>
                                    <span className={`value ${createFields?.container_type?.name ? 'value_focus' : ''}`}>
                                        {(createFields?.container_type?.name || 'Select Container Type')} 
                                        {(unitValue[createFields?.container_type?.id] !== undefined && unitValue[createFields?.container_type?.id] !== 0) ? (
                                            <>
                                                , unit: "{unitValue[createFields?.container_type?.id]}"
                                            </>
                                        ) : ''
                                        }
                                    </span>
                                </div>
                                <i className="mdi mdi-chevron-down" />
                            </div>
                            {isOpen && dropId === 5 ?
                                <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                                    {(optionContainerType || '').map(({id,value,name},index) => (
                                        <li key={index} className={`${createFields?.container_type?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({id,value, name}, 'container_type'); }}>
                                            <div className="custom-option">
                                                <p>{name}</p>
                                                <div className="quantity_wrap">
                                                    <button className="minus" onClick={(e) => {countMinusHandler(e,id)}}> <i className='fas fa-minus'></i> </button>
                                                    <input type="number" name={`${id}_unit`} id={`${id}_unit`} value={unitValue[id]} onChange={(e) => {handleQuantity(e,id)}}  />
                                                    <button className="plus" onClick={(e) => {countPlusHandler(e,id)}}> <i className=' fas fa-plus'></i> </button>
                                                </div>  
                                            </div>
                                        </li>
                                    ))}
                                </ul> : null
                            }
                        </div>
                    </div>
                </div>
                
                <div className="row">
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
                                    {(optionIncoterm || '').map(({value,name},index) => (
                                        <li key={index} className={`${createFields?.incoterm?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({value, name}, 'incoterm'); setIsOpen(false); }}>
                                            <div className="custom-option">
                                                <p>{name}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul> : null
                            }
                        </div>
                    </div>
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
                                    {(optionCargoType || '').map(({value,name},index) => (
                                        <li key={index} className={`${createFields?.cargo_type?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({value, name}, 'cargo_type'); (value !== 'hazardous' ? setIsOpen(false) : null) }}>
                                            <div className="custom-option">
                                                <p>{name}</p>
                                                 {value === 'hazardous' && (
                                                    <div className='d-flex ms-auto'>
                                                        <p className='me-2'>class:</p>
                                                        <div className="quantity_wrap">
                                                            <button className="minus" onClick={() => {setClassHazardous(prev => prev >= 1 ? prev - 1 : 0)}}> <i className='fas fa-minus'></i> </button>
                                                            <input type="number" name={`${value}_class`} id={`${value}_class`} value={classHazardous} onChange={(e) => {setClassHazardous(e.target.value)}} />
                                                            <button className="plus" onClick={() => {setClassHazardous(prev => prev <= 8 ? prev + 1 : prev)}}> <i className=' fas fa-plus'></i> </button>
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
                    <div className="col-lg-4">
                        <div className="prof_wrap number_field_wrap d-flex">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <img src={createFields?.shipping_by?.img || cube_filled} alt="Avatar" />
                            </div>
                            <div className="con d-flex align-items-center">
                                <div className="left_field">
                                    <label htmlFor='cargo_value' className="form-label">Cargo Value</label>
                                    <input type="number" name="cargo_value" id="cargo_value" placeholder='Enter amount' onChange={(e) => {handleCurrencyChangeHandler({value: e.target.value},'value')}} />
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
                                                <li key={index} className={`${createFields?.cargo_value?.currency.value === item?.value ? 'active' : ''}`} onClick={() => { handleCurrencyChangeHandler(item, 'currency'); setIsOpen(false); }}>
                                                    <span>{item?.code}</span>{item?.name}
                                                </li>
                                            ))}
                                        </ul> : null
                                    }
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}
