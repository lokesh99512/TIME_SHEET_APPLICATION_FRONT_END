import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select';
import Flatpickr from "react-flatpickr";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { calendar_filled, cube_filled, location_filled, swap_arrow } from '../../assets/images';

const optionPortList = [
    {value: 'INMAA', label:'INMAA'},
    {value: 'INKTP', label:'INKTP'},
    {value: 'BDDAC', label:'BDDAC'},
    {value: 'IDSUB', label:'IDSUB'},
    {value: 'BLRICD', label:'BLR ICD'},
    {value: 'DHAKAICD', label:'DHAKA ICD'},
    {value: 'JAKARTAICD', label:'JAKARTA ICD'},
]

const optionIncoterm = [
    {value: "CPT", label: 'Carraige Paid To(CPT)'},
    {value: "CFR", label: 'Cost & Freight(CFR)'},
    {value: "CIF", label: 'Cost Insurance and Freight(CIF)'},
    {value: "CIP", label: 'Carraige and Insurance Paid To(CIP)'},
    {value: "DAP", label: 'Delivery at Place(DAP)'},
    {value: "DAT", label: 'Delivery At Terminal(DAT)'},
    {value: "DDU", label: 'Delivery Duty Unpaid(DDU)'},
    {value: "DPU", label: 'Delivered At Place Unploaded(DPU)'},
    {value: "EXW", label: 'EX Works(EXW)'},
]

const SearchForm = () => {
    // const [searchView, setSearchView] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [searchResult, setSearchResult] = useState(false);
    const [unitValue, setUnitValue] = useState({
        _standard1: 0,
        _standard2: 0,
        _high_cube1: 0,
        _high_cube2: 0,
        _refrigerated1: 0,
        _refrigerated2: 0,
    })

    const createFields = useSelector((state) => state?.sales?.createFields);
    const resultData = useSelector((state) => state?.sales?.quotation_result_data);


    const swapHandler = () => {}
    const handleDateChnage = () => {}
  return (
    <>
      <div className="create_sales_search_forms">

        {/* Port From && To */}
        <div className="quotation_select_port_wrap d-flex my-3">
          <div
            className={`quotation_from_wrap ${
              isOpen && dropId === 9 ? "openmenu" : ""
            }`}
          >
            <div className={`common_dropdwon_btn_wrap`}>
              <div
                id="more_menu"
                className={`location_wrap d-flex`}
                // onClick={() => { toggleDropdown(9) }}
              >
                <div className="icon me-3 d-flex align-items-center justify-content-center">
                  <img src={location_filled} alt="Location" />
                </div>
                <div className="con">
                  <label className="form-label">From</label>
                  {/* <span className={`value ${createFields?.location_from?.address ? 'value_focus' : ''}`}>
                        {(createFields?.location_from?.address !== undefined && createFields?.location_from?.address) ? (
                            <>
                                <img src={createFields?.location_from?.country?.flag} alt="Flag" />
                                {createFields?.location_from?.address?.label}
                            </>
                        ) : 'Select Location'}
                    </span> */}
                  <Select
                    value={createFields?.location_from?.address}
                    name="address"
                    onChange={(opt) => {
                      // locationChangeHandler(opt, 'address', 'from')
                      handleChangeHandler(
                        { ...createFields?.location_from, address: opt },
                        "location_from"
                      );
                    }}
                    options={optionPortList}
                    isOptionDisabled={(option) =>
                      option.value === createFields?.location_to?.address?.value
                    }
                    placeholder="Select Location"
                    menuPlacement="auto"
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="button" className="swap_btn_wrap" onClick={swapHandler}>
            <img src={swap_arrow} alt="Swap Arrow" />
          </button>
          <div
            className={`quotation_to_wrap ${
              isOpen && dropId === 10 ? "openmenu" : ""
            }`}
          >
            <div className="common_dropdwon_btn_wrap">
              <div
                id="more_menu"
                className={`location_wrap d-flex`}
                // onClick={() => { toggleDropdown(10) }}
              >
                <div className="icon me-3 d-flex align-items-center justify-content-center">
                  <img src={location_filled} alt="Location" />
                </div>
                <div className="con">
                  <label className="form-label">To</label>

                  <Select
                    value={createFields?.location_to?.address}
                    name="address"
                    onChange={(opt) => {
                      handleChangeHandler(
                        { ...createFields?.location_from, address: opt },
                        "location_to"
                      );
                    }}
                    options={optionPortList}
                    placeholder="Select Location"
                    isOptionDisabled={(option) =>
                      option.value ===
                      createFields?.location_from?.address?.value
                    }
                    classNamePrefix="select2-selection form-select"
                    menuPlacement="auto"
                    // defaultMenuIsOpen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Port From && To */}

        {/* {searchView && ( */}
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
                    dateFormat: "Y-m-d",
                  }}
                  onChange={handleDateChnage}
                />
              </div>
            </div>
          </div>
          {/* {createFields?.shipping_by?.value !== 'air' && (
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
                                    <li key={index} className={`${createFields?.transport_by?.value === value ? 'active' : ''}`} onClick={() => { handleChangeHandler({ value, name }, 'transport_by', true, 'container_type'); setIsOpen(false); setcontainerArray([]); }}>
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
        )} */}
          <div className="col-lg-4">
            <div className="common_dropdwon_btn_wrap bottom_drop_field mb-3">
              <div
                id="more_menu"
                className={`prof_wrap d-flex ${
                  isOpen && dropId === 7 ? "openmenu" : ""
                }`}
                onClick={() => {
                  toggleDropdown(7);
                }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={createFields?.shipping_by?.img || cube_filled}
                    alt="Avatar"
                  />
                </div>
                <div className="con">
                  <label className="form-label">Cargo Type</label>
                  <span
                    className={`value ${
                      createFields?.cargo_type?.name ? "value_focus" : ""
                    }`}
                  >
                    {createFields?.cargo_type?.name || "Select Cargo Type"}
                    {createFields?.cargo_type?.value === "hazardous" &&
                    classHazardous !== 0 ? (
                      <>, class: {classHazardous}</>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <i className="mdi mdi-chevron-down" />
              </div>
              {isOpen && dropId === 7 ? (
                <ul
                  className="common_dropdown_wrap quantity_drop_wrap"
                  ref={dropdownRef}
                >
                  {(optionCargoType || "").map(({ value, name }, index) => (
                    <li
                      key={index}
                      className={`${
                        createFields?.cargo_type?.value === value
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        handleChangeHandler(
                          { value, name },
                          "cargo_type",
                          true,
                          "container_type"
                        );
                        value !== "hazardous" ? setIsOpen(false) : null;
                        setcontainerArray([]);
                      }}
                    >
                      <div className="custom-option">
                        <p>{name}</p>
                        {value === "hazardous" && (
                          <div className="d-flex ms-auto">
                            <p className="me-2">class:</p>
                            <div className="quantity_wrap">
                              <button
                                className="minus"
                                onClick={() => {
                                  setClassHazardous((prev) =>
                                    prev >= 1 ? prev - 1 : 0
                                  );
                                }}
                              >
                                {" "}
                                <i className="fas fa-minus"></i>{" "}
                              </button>
                              <input
                                type="number"
                                name={`${value}_class`}
                                id={`${value}_class`}
                                value={classHazardous}
                                onChange={(e) => {
                                  setClassHazardous(e.target.value);
                                }}
                              />
                              <button
                                className="plus"
                                onClick={() => {
                                  setClassHazardous((prev) =>
                                    prev <= 8 ? prev + 1 : prev
                                  );
                                }}
                              >
                                {" "}
                                <i className=" fas fa-plus"></i>{" "}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          {createFields?.shipping_by?.value !== "air" &&
            (createFields?.transport_by?.value === "fcl" ||
              createFields?.transport_by?.value === "ftl") && (
              <div className="col-lg-4">
                <div className="common_dropdwon_btn_wrap mb-3 bottom_drop_field">
                  <div
                    id="more_menu"
                    className={`prof_wrap d-flex ${
                      isOpen && dropId === 5 ? "openmenu" : ""
                    }`}
                    onClick={() => {
                      toggleDropdown(5);
                    }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <img
                        src={createFields?.shipping_by?.img || cube_filled}
                        alt="Avatar"
                      />
                    </div>
                    <div className="con">
                      <label className="form-label">Container Type</label>
                      <span
                        className={`value ${
                          createFields?.container_type.length !== 0
                            ? "value_focus"
                            : ""
                        }`}
                      >
                        {createFields?.container_type !== "" &&
                        createFields?.container_type !== undefined
                          ? createFields?.container_type?.map((item, index) => (
                              <span key={item.id}>
                                {unitValue[item.id] !== 0
                                  ? `${item.name}, unit: "${
                                      unitValue[item.id]
                                    }",`
                                  : null}{" "}
                                &nbsp;
                              </span>
                            ))
                          : "Select Container Type"}
                      </span>
                    </div>
                    <i className="mdi mdi-chevron-down" />
                  </div>
                  {isOpen && dropId === 5 ? (
                    <ul
                      className="common_dropdown_wrap quantity_drop_wrap"
                      ref={dropdownRef}
                    >
                      {(createFields?.cargo_type?.value === "refrigerated"
                        ? optionContainerTypeRefrigerated
                        : createFields?.cargo_type?.value === "hazardous"
                        ? optionContainerType
                        : optionContainerTypeWithoutRefri || ""
                      ).map(({ id, value, name }, index) => (
                        <li
                          key={index}
                          className={`${
                            createFields?.container_type?.value === value
                              ? "active"
                              : ""
                          }`}
                        >
                          <div className="custom-option">
                            <p>{name}</p>
                            <div className="quantity_wrap">
                              <button
                                className="minus"
                                onClick={(e) => {
                                  countMinusHandler(e, id);
                                  handleContainerChangeHandler(
                                    { id, value, name },
                                    "container_type"
                                  );
                                }}
                              >
                                {" "}
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
                                  countPlusHandler(e, id);
                                  handleContainerChangeHandler(
                                    { id, value, name },
                                    "container_type"
                                  );
                                }}
                              >
                                {" "}
                                <i className=" fas fa-plus"></i>{" "}
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            )}

          {(createFields?.transport_by?.value === "lcl" ||
            createFields?.shipping_by?.value === "air" ||
            createFields?.transport_by?.value === "ltl") && (
            <div className="col-lg-4">
              <div className="common_dropdwon_btn_wrap bottom_drop_field mb-3">
                <div
                  id="more_menu"
                  className={`prof_wrap d-flex ${
                    isOpen && dropId === 11 ? "openmenu" : ""
                  }`}
                  onClick={() => {
                    toggleDropdown(11);
                  }}
                >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img
                      src={createFields?.shipping_by?.img || cube_filled}
                      alt="Avatar"
                    />
                  </div>
                  <div className="con">
                    <label className="form-label">Shipment Details</label>
                    <span
                      className={`value ${
                        createFields?.container_type?.length !== 0
                          ? "value_focus"
                          : ""
                      }`}
                    >
                      {createFields?.container_type?.length !== 0 ? (
                        <>
                          {createFields?.container_type[0].no_unit} Units |{" "}
                          {calculateVal
                            ? `${calculateVal?.amount?.toFixed(4)} ${
                                calculateVal?.mesure
                              } |`
                            : ""}{" "}
                          {Number(createFields?.container_type[0].no_unit) *
                            Number(createFields?.container_type[0].weight)}{" "}
                          {createFields?.container_type[0].weight_unit}
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
                    className="common_dropdown_wrap container_drop_wrap"
                    ref={dropdownRef}
                  >
                    {containerType.length !== 0 && (
                      <Accordion flush open={open} toggle={toggle}>
                        {(containerType || "")?.map((item, index) => (
                          <AccordionItem key={index}>
                            <AccordionHeader targetId={`${index + 1}`}>
                              Load {index + 1}
                              <span
                                className="p-0 ms-auto"
                                onClick={() => {
                                  removeInputFields(index);
                                }}
                              >
                                <img src={delete_icon} alt="Delete" />
                              </span>
                            </AccordionHeader>
                            <AccordionBody accordionId={`${index + 1}`}>
                              <div className="field_wrap">
                                <div className="input_field">
                                  <label
                                    htmlFor={`no_unit_${index}`}
                                    className="form-label"
                                  >
                                    No. Of Units
                                  </label>
                                  <input
                                    type="number"
                                    value={containerType[index].no_unit || ""}
                                    className="form-control"
                                    id={`no_unit_${index}`}
                                    onChange={(e) => {
                                      contanerTypeValHandler(
                                        e.target.value,
                                        "no_unit",
                                        index
                                      );
                                    }}
                                  />
                                </div>
                                <div className="input_field field_dropdown">
                                  <label
                                    htmlFor={`weight_${index}`}
                                    className="form-label"
                                  >
                                    weight
                                  </label>
                                  <input
                                    type="number"
                                    value={containerType[index].weight || ""}
                                    className="form-control"
                                    id={`weight_${index}`}
                                    onChange={(e) => {
                                      contanerTypeValHandler(
                                        e.target.value,
                                        "weight",
                                        index
                                      );
                                    }}
                                  />
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn btn-link"
                                      tag="a"
                                    >
                                      {containerType[index].weight_unit}
                                      <i className="mdi mdi-chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      {(weightUnitOption || "").map((item) => (
                                        <DropdownItem
                                          key={item?.value}
                                          onClick={() => {
                                            contanerTypeValHandler(
                                              item?.name,
                                              "weight_unit",
                                              index
                                            );
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
                                      value={
                                        containerType[index].dimensions_l || ""
                                      }
                                      className="form-control"
                                      id={`dimensions_l_${index}`}
                                      onChange={(e) => {
                                        contanerTypeValHandler(
                                          e.target.value,
                                          "dimensions_l",
                                          index
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="input_field dimention_w">
                                    <input
                                      type="number"
                                      value={
                                        containerType[index].dimensions_w || ""
                                      }
                                      className="form-control"
                                      id={`dimensions_w_${index}`}
                                      onChange={(e) => {
                                        contanerTypeValHandler(
                                          e.target.value,
                                          "dimensions_w",
                                          index
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="input_field dimention_h">
                                    <input
                                      type="number"
                                      value={
                                        containerType[index].dimensions_h || ""
                                      }
                                      className="form-control"
                                      id={`dimensions_h_${index}`}
                                      onChange={(e) => {
                                        contanerTypeValHandler(
                                          e.target.value,
                                          "dimensions_h",
                                          index
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="input_field">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        className="btn btn-link dimention_drop d-flex justify-content-between"
                                        tag="a"
                                      >
                                        {containerType[index].dimensions_unit}
                                        <i className="mdi mdi-chevron-down" />
                                      </DropdownToggle>
                                      <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem
                                          className={`${
                                            containerType[index].weight_unit ===
                                            "KG"
                                              ? "disabled"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            contanerTypeValHandler(
                                              "IN",
                                              "dimensions_unit",
                                              index
                                            );
                                          }}
                                        >
                                          IN
                                        </DropdownItem>
                                        <DropdownItem
                                          className={`${
                                            containerType[index].weight_unit ===
                                            "pound"
                                              ? "disabled"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            contanerTypeValHandler(
                                              "CM",
                                              "dimensions_unit",
                                              index
                                            );
                                          }}
                                        >
                                          CM
                                        </DropdownItem>
                                        <DropdownItem
                                          className={`${
                                            containerType[index].weight_unit ===
                                            "pound"
                                              ? "disabled"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            contanerTypeValHandler(
                                              "MM",
                                              "dimensions_unit",
                                              index
                                            );
                                          }}
                                        >
                                          MM
                                        </DropdownItem>
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
                      <button
                        type="button"
                        className="btn border_btn"
                        onClick={AddLoadHandler}
                      >
                        Add Another Load
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={confirmHandler}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
          {createFields?.transport_by?.value === "fcl" && (
            <div className="col-lg-4">
              <div className="prof_wrap number_field_wrap d-flex mb-3">
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={createFields?.shipping_by?.img || cube_filled}
                    alt="Avatar"
                  />
                </div>
                <div className="con d-flex align-items-center">
                  <div className="left_field">
                    <label htmlFor="cargo_value" className="form-label">
                      Cargo Weight
                    </label>
                    <input
                      type="number"
                      value={createFields?.cargo_weight?.value || ""}
                      name="cargo_weight"
                      id="cargo_weight"
                      placeholder="Enter amount"
                      onChange={(e) => {
                        handleChangeHandler(
                          {
                            ...createFields?.cargo_weight,
                            value: e.target.value,
                          },
                          "cargo_weight"
                        );
                      }}
                    />
                  </div>
                  <div className="common_dropdwon_btn_wrap bottom_drop_field">
                    <div
                      id="more_menu"
                      className={`d-flex align-items-center ${
                        isOpen && dropId === 8 ? "openmenu" : ""
                      }`}
                      onClick={() => {
                        toggleDropdown(12);
                      }}
                    >
                      <span>{createFields?.cargo_weight?.weight} </span>
                      <i className="mdi mdi-chevron-down" />
                    </div>
                    {isOpen && dropId === 12 ? (
                      <ul
                        className="common_dropdown_wrap quantity_drop_wrap"
                        ref={dropdownRef}
                      >
                        {(cargoWeightUnitOption || "")?.map((item, index) => (
                          <li
                            key={index}
                            className={`${
                              createFields?.cargo_weight?.weight === item?.value
                                ? "active"
                                : ""
                            }`}
                            onClick={() => {
                              handleChangeHandler(
                                {
                                  ...createFields?.cargo_weight,
                                  weight: item?.value,
                                },
                                "cargo_weight"
                              );
                              setIsOpen(false);
                            }}
                          >
                            {item?.name}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="col-lg-4">
            <div className="common_dropdwon_btn_wrap mb-3 bottom_drop_field incoterm_field_wrap">
              <div
                id="more_menu"
                className={`prof_wrap d-flex ${
                  isOpen && dropId === 6 ? "openmenu" : ""
                }`}
                onClick={() => {
                  toggleDropdown(6);
                }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src={createFields?.shipping_by?.img || cube_filled}
                    alt="Avatar"
                  />
                </div>
                <div className="con">
                  <label className="form-label">Incoterm</label>
                  <Select
                    value={
                      optionIncoterm
                        ? optionIncoterm.find(
                            (obj) => obj.value === createFields?.incoterm
                          )
                        : ""
                    }
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
          <div className="col-lg-4">
            <div className="prof_wrap number_field_wrap d-flex mb-3">
              <div className="icon d-flex align-items-center justify-content-center">
                <img
                  src={createFields?.shipping_by?.img || cube_filled}
                  alt="Avatar"
                />
              </div>
              <div className="con d-flex align-items-center">
                <div className="left_field">
                  <label htmlFor="cargo_value" className="form-label">
                    Cargo Value
                  </label>
                  <input
                    type="number"
                    value={createFields?.cargo_value?.value || ""}
                    name="cargo_value"
                    id="cargo_value"
                    placeholder="Enter amount"
                    onChange={(e) => {
                      handleChangeHandler(
                        { ...createFields?.cargo_value, value: e.target.value },
                        "cargo_value"
                      );
                    }}
                  />
                </div>
                <div className="common_dropdwon_btn_wrap bottom_drop_field">
                  <div
                    id="more_menu"
                    className={`d-flex align-items-center ${
                      isOpen && dropId === 8 ? "openmenu" : ""
                    }`}
                    onClick={() => {
                      toggleDropdown(8);
                    }}
                  >
                    <span>{createFields?.cargo_value?.currency?.code} </span>
                    <i className="mdi mdi-chevron-down" />
                  </div>
                  {isOpen && dropId === 8 ? (
                    <ul
                      className="common_dropdown_wrap quantity_drop_wrap"
                      ref={dropdownRef}
                    >
                      {(optionCurrency || "")?.map((item, index) => (
                        <li
                          key={index}
                          className={`${
                            createFields?.cargo_value?.currency?.value ===
                            item?.value
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            handleChangeHandler(
                              { ...createFields?.cargo_value, currency: item },
                              "cargo_value"
                            );
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
          <div className="col-lg-4">
            {searchResult ? (
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => {
                  searchQuoteHandler();
                }}
              >
                Update Search
              </button>
            ) : null}
          </div>
        </div>
        {/* )}                 */}

        {/* {searchResult ? <button className='btn d-table ms-auto p-0 search_view_btn' onClick={() => { setSearchView(!searchView) }}>{!searchView ? 'Expand' : 'Less'} Search View </button> : null} */}
      </div>
    </>
  );
};

export default SearchForm;
