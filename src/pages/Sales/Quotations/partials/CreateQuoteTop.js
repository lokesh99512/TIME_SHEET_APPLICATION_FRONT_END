import React, { useRef, useState } from 'react'
import Select from 'react-select';
import { airplane_filled, avtar_filled, calendar_filled, cube_filled, ship_filled, truk_filled } from '../../../../assets/images';
import { optionCargoType, optionContainerType, optionCustomerName, optionIncoterm, optionServiceType, optionTransportBy } from '../../../../common/data/sales';
import { useOutsideClick } from '../../../../components/Common/CommonLogic';
import "react-datepicker/dist/react-datepicker.css"
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

export default function CreateQuoteTop() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropId, setDropId] = useState(false);
    const dropdownRef = useRef(null);
    const [classHazardous, setClassHazardous] = useState(0);
    const [createFields,setCreateFields] = useState({
        customer_name: {},
        shipping_by: {},
        service_type: {},
        transport_by: {},
        container_type: {},
        incoterm: {},
        cargo_type: {},
    })

    const [unitValue, setUnitValue] = useState({
        _standard1: 0,
        _standard2: 0,
        _high_cube1: 0,
        _high_cube2: 0,
        _refrigerated1: 0,
        _refrigerated2: 0,
    })

    const handleChangeHandler = (item,name) => {
        let newObj = {
            ...createFields,
            [name]: item
        }
        setCreateFields(newObj);
    }

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

    // -------------- react select ---------------------------
    const CustomOption = ({ children, innerProps }) => (
        <div {...innerProps}>{children}</div>
    );
    const filterOption = (option, inputValue) => {
        const label = option?.label?.props?.children[1]?.props?.children;
        return label.toLowerCase().includes(inputValue.toLowerCase());
    };
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
                    {/* <div className="col-lg-4">
                        <div className="mb-3">
                            <div className="prof_wrap d-flex">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <img src={avtar_filled} alt="Avatar" />
                                </div>
                                <div className="con">
                                    <label className="form-label">Select Customer</label>
                                    <Select
                                        name='rate_type'
                                        // onChange={(opt) => {
                                        //     handleSelectGroup('rate_type', opt);
                                        // }}
                                        value={selectedValue}
                                        onChange={handleChange} // Callback to get selected value
                                        options={optionCustomerName}
                                        filterOption={filterOption} 
                                        components={{ Option: CustomOption }}
                                        placeholder={'Select customer'}
                                        classNamePrefix="select2-selection form-select"
                                        defaultMenuIsOpen
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
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
                                <div className="con">
                                    <label className="form-label">Container Type</label>
                                    <span className={`value ${createFields?.container_type?.name ? 'value_focus' : ''}`}>{(createFields?.container_type?.name || 'Select Container Type')}</span>
                                </div>
                            </div>
                            {isOpen && dropId === 5 ?
                                <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                                    {(optionContainerType || '').map(({id,value,name},index) => (
                                        <li key={index} className={`${createFields?.container_type?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({value, name}, 'container_type'); }}>
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
                                    <span className={`value ${createFields?.cargo_type?.name ? 'value_focus' : ''}`}>{(createFields?.cargo_type?.name || 'Select Cargo Type')}</span>
                                </div>
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
                    {/* <div className="col-lg-4">
                        <div className="prof_wrap calendar_field_wrap d-flex">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <img src={calendar_filled} alt="Avatar" />
                            </div>
                            <div className="con">
                                <label className="form-label">Cargo Value</label>
                                <input type="number" name="" id="" />
                            </div>
                        </div> 
                    </div> */}
                </div>
            </div>
        </>
    )
}
