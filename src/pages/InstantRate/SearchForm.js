import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import { calendar_filled, cube_filled, delete_icon, filter_img, location_filled, swap_arrow } from '../../assets/images';
import { cargoWeightUnitOption, optionCargoType, optionContainerType, optionContainerTypeRefrigerated, optionContainerTypeWithoutRefri, optionCurrency, optionIncoterm, optionPortList, weightUnitOption } from "../../common/data/sales";
import { isAnyValueEmpty, useOutsideClick } from "../../components/Common/CommonLogic";
import { UPDATE_INSTANT_RATE_SWAP, UPDATE_SEARCH_INSTANT_RATE_DATA, UPDATE_SEARCH_INSTANT_RATE_DATE, UPDATE_VALUE_BLANK } from "../../store/InstantRate/actionType";

const customerName = [
  { value: "apex_export", label: 'Apex Export Pvt Ltd' },
  { value: "balaji_enterprice", label: 'Balaji Enterprice' },
  { value: "house_tea_exports", label: 'House of Tea Exports' },
  { value: "raj_fruits", label: 'Raj Fruits Exports' },
]

const SearchForm = ({ activeTab, searchQuoteHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [dropId, setDropId] = useState(false);
  const [subDropId, setSubDropId] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [containerData, setContainerData] = useState({ containerArray: [] })
  const [calculateVal, setCalculateVal] = useState({});
  const [classHazardous, setClassHazardous] = useState(0);
  const [unitValue, setUnitValue] = useState({
    _standard1: 0,
    _standard2: 0,
    _high_cube1: 0,
    _high_cube2: 0,
    _refrigerated1: 0,
    _refrigerated2: 0,
  })
  const [open, setOpen] = useState('1');
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const searchForm = useSelector((state) => state?.instantRate?.searchForm);  

  const [shipmentDetails, setShipmentDetails] = useState([
    {
      no_unit: '',
      weight: '',
      weight_unit: 'KG',
      dimensions_l: '',
      dimensions_w: '',
      dimensions_h: '',
      dimensions_unit: '',
    }
  ])

  const toggle = (id) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  const handleChangeHandler = (item, name, blank, blank_name) => {
    if (blank) {
      dispatch({ type: UPDATE_VALUE_BLANK, payload: blank_name })
    }
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { item, name } });
  }

  // swap ---------------
  const swapHandler = () => {
    dispatch({ type: UPDATE_INSTANT_RATE_SWAP })
  }

  const handleDateChnage = (arr, value, target) => {
    let arrItem = arr
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATE, payload: { arrItem } })
  }

  // container handle 
  const handleContainerChangeHandler = (item, name) => {
    let newArray = [...containerData?.containerArray];
    if (containerData?.containerArray?.some((obj) => obj?.id === item.id)) {
      let index = newArray.findIndex((obj) => obj.id === item.id);
      newArray[index] = item
    } else {
      newArray.push(item);
    }
    let updatedArray = [...newArray];
    setContainerData(prev => ({ ...prev, containerArray: updatedArray }));
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { name: "container_type", item: { ...searchForm?.container_type, ...containerData, containerArray: updatedArray } } })
  }
  const countPlusHandler = (e, id, item, name) => {
    e.stopPropagation();
    let count = Number(unitValue[id]);
    let newObj;
    let newReduxObj;
    if (count >= 0) {
      newObj = {
        ...unitValue,
        [id]: count + 1
      }
      setUnitValue(newObj);
      newReduxObj = {
        ...item,
        unit: newObj[id]
      }
      handleContainerChangeHandler(newReduxObj, name);
    }
  }
  const countMinusHandler = (e, id, item, name) => {
    e.stopPropagation();
    let count = Number(unitValue[id]);
    let newObj;
    let newReduxObj;
    if (count >= 1) {
      newObj = {
        ...unitValue,
        [id]: count - 1
      }
      setUnitValue(newObj);
      newReduxObj = {
        ...item,
        unit: newObj[id]
      }
      handleContainerChangeHandler(newReduxObj, name);
    }
  }
  const containerConfirmHandler = () => {
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { name: "container_type", item: { ...searchForm?.container_type, ...containerData } } });
    setIsOpen(false);
  }

  // shipment handle 
  const AddLoadHandler = () => {
    setShipmentDetails(s => {
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
  const shipmentDetailsValHandler = (val, name, index) => {
    const list = [...shipmentDetails];
    if (name === 'weight_unit') {
      list[index].dimensions_unit = ''
    }
    list[index][name] = val;
    setShipmentDetails(list);
  }

  const confirmHandler = () => {
    let lval = Number(shipmentDetails[0].dimensions_l);
    let wval = Number(shipmentDetails[0].dimensions_w);
    let hval = Number(shipmentDetails[0].dimensions_h);
    if (shipmentDetails[0].weight_unit === 'KG') {
      if (shipmentDetails[0].dimensions_unit === 'CM') {
        let amount = (lval * wval * hval) / 100000
        // let cbmAmount= amount / 6000
        setCalculateVal({ amount: amount, mesure: 'cbm' });
      } else {
        let amount = (lval * wval * hval)
        setCalculateVal({ amount: amount, mesure: 'cbm' });
      }
    } else {
      let lvalFeet = lval / 12  //convert inches into feet
      let wvalFeet = wval / 12  //convert inches into feet
      let hvalFeet = hval / 12  //convert inches into feet
      let cftAmount = (lvalFeet * wvalFeet * hvalFeet)
      setCalculateVal({ amount: cftAmount, mesure: 'cft' });
    }
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { name: 'shipment_details', item: shipmentDetails } });
    setIsOpen(false);
  }

  const removeInputFields = (index) => {
    const rows = [...shipmentDetails];
    rows.splice(index, 1);
    setShipmentDetails(rows);
    dispatch({type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { name: 'shipment_details', item: rows } })

    console.log(rows, "rows--------------------");
  }

  console.log(searchForm, "<---searchform");

  // ------------ custom dropdown -------------------
  const toggleDropdown = (id) => {
    setIsOpen(!isOpen);
    setDropId(id);
  };
  const toggleSubDropdown = (id) => {
    setIsSubOpen(!isSubOpen);
    setSubDropId(id);
  };
  useOutsideClick(dropdownRef, setIsOpen);
  // ------------ custom dropdown ------------------- 

  return (
    <>
      <div className="create_sales_search_forms">
        {/* Port From && To */}
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 mt-2">
            <div className="d-flex flex-column">
              <div className="d-flex position-relative w-100 quotation_select_port_wrap">
                <div className={`quotation_from_wrap`} >
                  <div className={`common_dropdwon_btn_wrap`}>
                    <div id="more_menu" className={`location_wrap d-flex justify-content-center align-items-center`} >
                      <div className="icon me-3 d-flex align-items-center justify-content-center">
                        <img className="location_img" src={location_filled} alt="Location" />
                      </div>

                      <div className="con">
                        <label className="form-label">From</label>
                        <Select
                          value={searchForm?.location_from?.address}
                          name="address"
                          onChange={(opt) => {
                            handleChangeHandler({ ...searchForm?.location_from, address: opt }, "location_from");
                          }}
                          options={optionPortList}
                          isOptionDisabled={(option) => option.value === searchForm?.location_to?.address?.value}
                          placeholder="Select Location"
                          menuPlacement="auto"
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* swap button */}
                <button type="button" className="swap_btn_wrap" onClick={swapHandler}>
                  <img src={swap_arrow} alt="Swap Arrow" />
                </button>

                {/* quotation_to_wrap */}
                <div className={`quotation_to_wrap`} >
                  <div className="common_dropdwon_btn_wrap">
                    <div id="more_menu" className={`location_wrap d-flex justify-content-center align-items-center`} >
                      <div className="icon me-3 d-flex align-items-center justify-content-center">
                        <img className="location_img" src={location_filled} alt="Location" />
                      </div>
                      <div className="con">
                        <label className="form-label">To</label>
                        <Select
                          value={searchForm?.location_to?.address}
                          name="address"
                          onChange={(opt) => {
                            handleChangeHandler({ ...searchForm?.location_from, address: opt }, "location_to");
                          }}
                          options={optionPortList}
                          placeholder="Select Location"
                          isOptionDisabled={(option) => option.value === searchForm?.location_from?.address?.value}
                          classNamePrefix="select2-selection form-select"
                          menuPlacement="auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* container details */}
          {activeTab == "FCL" &&
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 mt-2">
              <div className="common_dropdwon_btn_wrap">
                <div id="more_menu" className={`prof_wrap d-flex justify-content-between`} onClick={() => { toggleDropdown(11); }} >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img src={cube_filled} alt="Avatar" />
                  </div>
                  <div className="con">
                    <label className="form-label">Container Type</label>
                    <span className={`value ${searchForm?.container_type?.length !== 0 ? "value_focus" : ""}`} >
                      Container Details
                    </span>
                  </div>
                  <i className="mdi mdi-chevron-down" />
                </div>
                {isOpen && dropId === 11 ? (
                  <div className="searchform container_combine_drop_wrap common_dropdown_wrap container_drop_wrap" ref={dropdownRef} >
                    {/* select unit   */}
                    <label className="form-label">Container Type</label>
                    <div className="inner mb-2">
                      <UncontrolledDropdown>
                        <DropdownToggle className="shadow-none prof_wrap1 w-100 d-flex justify-space-between" tag="div">
                          <div className="con">
                            <span className={`value ${searchForm?.container_type.length !== 0 ? "value_focus" : ""}`} >
                              {searchForm?.container_type?.containerArray !== "" &&
                                searchForm?.container_type?.containerArray !== undefined
                                ? searchForm?.container_type?.containerArray?.map((item, index) => (
                                  <span key={item.id}>
                                    {unitValue[item.id] !== 0
                                      ? `${item.name}, unit: "${unitValue[item.id]
                                      }",`
                                      : null}{" "}
                                    &nbsp;
                                  </span>
                                ))
                                : "Select Container Type"}
                            </span>
                          </div>
                          <i className="mdi mdi-chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end quantity_drop_wrap">
                          {(searchForm?.cargo_type?.name === "Refrigerated" ? optionContainerTypeRefrigerated :
                            searchForm?.cargo_type?.name === "Hazardous" ? optionContainerType :
                              optionContainerTypeWithoutRefri || "").map(({ id, value, name }, index) => (
                                <DropdownItem key={index} className={`${searchForm?.container_type?.containerArray?.value === value ? "active" : ""}`} tag="div">
                                  <div className="custom-option">
                                    <p>{name}</p>
                                    <div className="quantity_wrap">
                                      <button
                                        className="minus"
                                        onClick={(e) => {
                                          countMinusHandler(e, id, { id, value, name }, 'container_type');
                                        }}
                                      >
                                        <i className="fas fa-minus"></i>{" "}
                                      </button>
                                      <input
                                        type="number"
                                        name={`${id}_unit`}
                                        id={`${id}_unit`}
                                        value={unitValue[id]}
                                        onChange={(e) => {
                                          handleQuantity(e, id);
                                        }}
                                      />
                                      <button
                                        className="plus"
                                        onClick={(e) => {
                                          countPlusHandler(e, id, { id, value, name }, 'container_type');
                                        }}
                                      >
                                        <i className=" fas fa-plus"></i>{" "}
                                      </button>
                                    </div>
                                  </div>
                                </DropdownItem>
                              ))}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    {/* select unit   */}

                    {/* select weight  */}
                    <div className="inner_field_wrap">
                      <label className="form-label">Weight</label>
                      <div className="prof_wrap number_field_wrap d-flex mb-2">
                        <div className="con d-flex align-items-center w-100">
                          <div className="left_field">
                            <input type="number" value={searchForm?.container_type?.cargo_weight?.value || ''} name="cargo_weight" id="cargo_weight" placeholder='Enter amount' onChange={(e) => { handleChangeHandler({ ...searchForm?.container_type, cargo_weight: { ...searchForm?.container_type?.cargo_weight, value: e.target.value } }, 'container_type') }} />
                          </div>
                          <div className="common_dropdwon_btn_wrap bottom_drop_field">
                            <div
                              id='more_menu'
                              className={`d-flex align-items-center ${isSubOpen && subDropId === 8 ? 'openmenu' : ''}`}
                              onClick={() => { toggleSubDropdown(8) }}
                            >
                              <span>{searchForm?.container_type?.cargo_weight?.weight} </span>
                              <i className="mdi mdi-chevron-down" />
                            </div>
                            {isSubOpen && subDropId === 8 ?
                              <ul className="common_dropdown_wrap quantity_drop_wrap">
                                {(cargoWeightUnitOption || '')?.map((item, index) => (
                                  <li key={index} className={`${searchForm?.container_type?.cargo_weight?.weight === item?.value ? 'active' : ''}`} onClick={() => { handleChangeHandler({ ...searchForm?.container_type, cargo_weight: { ...searchForm?.container_type?.cargo_weight, weight: item?.value } }, 'container_type'); setIsSubOpen(false); }}>
                                    {item?.name}
                                  </li>
                                ))}
                              </ul> : null
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* select weight  */}

                    <div className="d-flex justify-content-center mt-3">
                      <button type="button" className="btn btn-primary" onClick={containerConfirmHandler} > Confirm </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          }

          {/* Shipment Details */}
          {["LCL", "Air", "Land"].includes(activeTab) &&
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 mt-2">
            <div className="common_dropdwon_btn_wrap container_combine_drop_wrap">
              <div id="more_menu" className={`prof_wrap d-flex`} onClick={() => { toggleDropdown(11); }} >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img src={cube_filled} alt="Avatar" />
                </div>
                <div className="con">
                  <label className="form-label">Shipment Details</label>
                  <span className={`value ${searchForm?.shipment_details?.length !== 0 ? "value_focus" : ""}`} >
                    {searchForm?.shipment_details && searchForm?.shipment_details?.length !== 0 ? (
                      <>
                        {searchForm?.shipment_details[0]?.no_unit} Units |{" "}
                        {calculateVal ? `${calculateVal?.amount?.toFixed(4)} ${calculateVal?.mesure} |` : ""}
                        {Number(searchForm?.shipment_details[0]?.no_unit) *
                          Number(searchForm?.shipment_details[0]?.weight)}{" "}
                        {searchForm?.shipment_details[0]?.weight_unit}
                      </>
                    ) : (
                      "Select Container Type"
                    )}
                  </span>
                </div>
                <i className="mdi mdi-chevron-down" />
              </div>
              {isOpen && dropId === 11 ? (
                <div
                  className="searchform common_dropdown_wrap container_drop_wrap"
                  ref={dropdownRef}
                >
                  {shipmentDetails.length !== 0 && (
                    <Accordion flush open={open} toggle={toggle}>
                      {(shipmentDetails || "")?.map((item, index) => (
                        <AccordionItem key={index}>
                          <AccordionHeader targetId={`${index + 1}`}>
                            Load {index + 1}
                            <span className="p-0 ms-auto" onClick={() => { removeInputFields(index); }} >
                              <img src={delete_icon} alt="Delete" />
                            </span>
                          </AccordionHeader>
                          <AccordionBody accordionId={`${index + 1}`}>
                            <div className="field_wrap">
                              <div className="input_field">
                                <label htmlFor={`no_unit_${index}`} className="form-label" > No. Of Units </label>
                                <input
                                  type="number"
                                  value={shipmentDetails[index].no_unit || ""}
                                  className="form-control"
                                  id={`no_unit_${index}`}
                                  onChange={(e) => {
                                    shipmentDetailsValHandler(e.target.value, "no_unit", index);
                                  }}
                                />
                              </div>
                              <div className="input_field field_dropdown">
                                <label htmlFor={`weight_${index}`} className="form-label" > weight </label>
                                <input
                                  type="number"
                                  value={shipmentDetails[index].weight || ""}
                                  className="form-control"
                                  id={`weight_${index}`}
                                  onChange={(e) => {
                                    shipmentDetailsValHandler(e.target.value, "weight", index);
                                  }}
                                />
                                <UncontrolledDropdown>
                                  <DropdownToggle className="btn btn-link" tag="a" >
                                    {shipmentDetails[index].weight_unit}
                                    <i className="mdi mdi-chevron-down" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    {(weightUnitOption || "").map((item) => (
                                      <DropdownItem
                                        key={item?.value}
                                        onClick={() => {
                                          shipmentDetailsValHandler(item?.name, "weight_unit", index);
                                        }}
                                      >
                                        {item?.name}
                                      </DropdownItem>
                                    ))}
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </div>
                            <div className="dimention_field mt-3">
                              <p className="form-label">
                                Dimensions (L×W×H per unit)
                              </p>
                              <div className="input_field_wrap d-flex">
                                <div className="input_field dimention_l">
                                  <input
                                    type="number"
                                    value={shipmentDetails[index].dimensions_l || ""}
                                    className="form-control"
                                    id={`dimensions_l_${index}`}
                                    onChange={(e) => {
                                      shipmentDetailsValHandler(e.target.value, "dimensions_l", index);
                                    }}
                                  />
                                </div>
                                <div className="input_field dimention_w">
                                  <input
                                    type="number"
                                    value={shipmentDetails[index].dimensions_w || ""}
                                    className="form-control"
                                    id={`dimensions_w_${index}`}
                                    onChange={(e) => {
                                      shipmentDetailsValHandler(e.target.value, "dimensions_w", index);
                                    }}
                                  />
                                </div>
                                <div className="input_field dimention_h">
                                  <input
                                    type="number"
                                    value={shipmentDetails[index].dimensions_h || ""}
                                    className="form-control"
                                    id={`dimensions_h_${index}`}
                                    onChange={(e) => {
                                      shipmentDetailsValHandler(e.target.value, "dimensions_h", index);
                                    }}
                                  />
                                </div>
                                <div className="input_field">
                                  <UncontrolledDropdown>
                                    <DropdownToggle className="btn btn-link dimention_drop d-flex justify-content-between" tag="a" >
                                      {shipmentDetails[index].dimensions_unit}
                                      <i className="mdi mdi-chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem
                                        className={`${shipmentDetails[index].weight_unit === "KG" ? "disabled" : ""}`}
                                        onClick={() => {
                                          shipmentDetailsValHandler("IN", "dimensions_unit", index);
                                        }}
                                      > IN </DropdownItem>
                                      <DropdownItem
                                        className={`${shipmentDetails[index].weight_unit === "Lbs" ? "disabled" : ""}`}
                                        onClick={() => {
                                          shipmentDetailsValHandler("CM", "dimensions_unit", index);
                                        }}
                                      > CM </DropdownItem>
                                      <DropdownItem
                                        className={`${shipmentDetails[index].weight_unit === "Lbs" ? "disabled" : ""}`}
                                        onClick={() => {
                                          shipmentDetailsValHandler("MM", "dimensions_unit", index);
                                        }}
                                      > MM </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                              </div>
                            </div>
                          </AccordionBody>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                  <div className="btn_wrap d-flex justify-content-end">
                    <button type="button" className="btn border_btn" onClick={AddLoadHandler} > Add Another Load </button>
                    <button type="button" className="btn btn-primary" onClick={confirmHandler} > Confirm </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>}

          {/* Cargo Ready Date */}
          <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
            <div className="prof_wrap calendar_field_wrap d-flex">
              <div className="icon d-flex align-items-center justify-content-center">
                <img src={calendar_filled} alt="Avatar" />
              </div>
              <div className="con">
                <label className="form-label">Cargo Ready Date</label>
                <Flatpickr
                  value={searchForm?.cargo_date}
                  className="form-control d-block"
                  placeholder="Select Date"
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                  }}
                  onChange={handleDateChnage}
                />
              </div>
            </div>
          </div>


          {/* Customer Name */}
          <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
            <div className="common_dropdwon_btn_wrap bottom_drop_field incoterm_field_wrap">
              <div
                id="more_menu"
                className={`prof_wrap d-flex justify-content-between ${isOpen && dropId === 6 ? "openmenu" : ""}`}
                onClick={() => { toggleDropdown(6); }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img src={cube_filled} alt="Avatar" />
                </div>
                <div className="con">
                  <label className="form-label">Customer Name</label>
                  <Select
                    value={customerName ? customerName.find((obj) => obj.value === searchForm?.customerName) : ""}
                    name="customerName"
                    onChange={(opt) => {
                      handleChangeHandler(opt.value, "customerName");
                    }}
                    options={customerName}
                    placeholder="Select Customer"
                    classNamePrefix="select2-selection form-select"
                    menuPlacement="auto"
                  />
                </div>
                <i className="mdi mdi-chevron-down" />
              </div>
            </div>
          </div>

          {/* Advanced Search */}
          {advanceSearch && (
            <>
              {/* cargo type */}
              <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                <div className="common_dropdwon_btn_wrap bottom_drop_field">
                  <div id='more_menu' className={`prof_wrap d-flex ${isOpen && dropId === 7 ? 'openmenu' : ''}`} onClick={() => { toggleDropdown(7) }} >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <img src={cube_filled} alt="Avatar" />
                    </div>
                    <div className="con">
                      <label className="form-label">Cargo Type</label>
                      <span className={`value ${searchForm?.cargo_type?.name ? 'value_focus' : ''}`}>
                        {(searchForm?.cargo_type?.name || 'Select Cargo Type')}
                        {searchForm?.cargo_type?.value === 'hazardous' && classHazardous !== 0 ? (
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
                          className={`${searchForm?.cargo_type?.value === value ? 'active' : ''}`}
                          onClick={() => { handleChangeHandler({ value, name }, 'cargo_type', true, 'container_type'); if (value !== 'hazardous') { setIsOpen(false); setClassHazardous(0) } }}>
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

              {/* Incoterm */}
              <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                <div className="common_dropdwon_btn_wrap bottom_drop_field incoterm_field_wrap">
                  <div
                    id="more_menu"
                    className={`prof_wrap d-flex justify-content-between ${isOpen && dropId === 6 ? "openmenu" : ""}`}
                    onClick={() => { toggleDropdown(6); }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <img src={cube_filled} alt="Avatar" />
                    </div>
                    <div className="con">
                      <label className="form-label">Incoterm</label>
                      {/* <Input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."
                        onChange={(e) => {handleChangeHandler(e.target.value, "incoterm");}}
                        />
                      <datalist id="datalistOptions">
                        {optionIncoterm ? optionIncoterm?.map((item,index) => (                          
                          <option value={item?.label} key={index} />
                        )) : <option value="No Option" />}                         
                      </datalist> */}

                      <Select
                        value={optionIncoterm ? optionIncoterm.find((obj) => obj.value === searchForm?.incoterm) : ""}
                        name="address"
                        onChange={(opt) => {
                          handleChangeHandler(opt.value, "incoterm");
                        }}
                        options={optionIncoterm}
                        placeholder="Select Incoterm"
                        classNamePrefix="select2-selection form-select"
                        menuPlacement="auto"
                      />
                    </div>
                    <i className="mdi mdi-chevron-down" />
                  </div>
                </div>
              </div>

              {/* Cargo Value */}
              <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                <div className="prof_wrap number_field_wrap d-flex ">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img src={cube_filled} alt="Avatar" />
                  </div>
                  <div className="con d-flex align-items-center justify-content-between w-100">
                    <div className="left_field">
                      <label htmlFor="cargo_value" className="form-label"> Cargo Value </label>
                      <input
                        type="number"
                        value={searchForm?.cargo_value?.value || ""}
                        name="cargo_value"
                        id="cargo_value"
                        placeholder="Enter amount"
                        onChange={(e) => {
                          handleChangeHandler({ ...searchForm?.cargo_value, value: e.target.value }, "cargo_value");
                        }}
                      />
                    </div>
                    <div className="common_dropdwon_btn_wrap bottom_drop_field">
                      <div
                        id="more_menu"
                        className={`d-flex align-items-center ${isOpen && dropId === 8 ? "openmenu" : ""}`}
                        onClick={() => {
                          toggleDropdown(8);
                        }}
                      >
                        <span>{searchForm?.cargo_value?.currency?.code} </span>
                        <i className="mdi mdi-chevron-down" />
                      </div>
                      {isOpen && dropId === 8 ? (
                        <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef} >
                          {(optionCurrency || "")?.map((item, index) => (
                            <li
                              key={index}
                              className={`${searchForm?.cargo_value?.currency?.value === item?.value ? "active" : ""}`}
                              onClick={() => {
                                handleChangeHandler({ ...searchForm?.cargo_value, currency: item }, "cargo_value");
                                setIsOpen(false);
                              }}
                            >
                              <span>{item?.code}</span>
                              {item?.name}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="col-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3 mt-2 align-self-center">
            <button className="btn p-0 me-3 border-0" onClick={() => { setAdvanceSearch(!advanceSearch) }}><img src={filter_img} alt="filter" width={'20px'} height={'20px'} /></button>
            <button type="button" className='btn btn-primary mt-0 w-25' onClick={() => { searchQuoteHandler(); }}
              disabled={!(!isAnyValueEmpty(searchForm))}>Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchForm;