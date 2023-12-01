import classnames from "classnames";
import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useCallback, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import ModalAddTerm from "../Modal/ModalAddTerm";
import { optionCarrierName } from "../../../../common/data/procurement";
import { isAnyValueEmpty } from "../../../../components/Common/CommonLogic";

const chargeCategory = [
  { label: "OCEAN SURCHARGE", value: "freight_surcharge" },
  { label: "PORT SURCHARGE", value: "port_surcharge" },
  { label: "LOCAL SURCHARGE", value: "local_surcharge" },
  { label: "ORIGIN TRANSPORTATION", value: "origin_transportation" },
  { label: "DESTINATION TRANSPORTATION", value: "destination_transportation" },
  { label: "ANCILLARY CHARGES", value: "ancillary_charges" },
  { label: "VAS CHARGES", value: "vas_charges" },
  { label: "CUSTOMS", value: "custom" },
];

const portName = [
  { label: "BDDAC - DHAKA", value: "BDDAC" },
  { label: "INMAA - CHENNAI", value: "INMAA" },
  { label: "INKTP - CHENNAI", value: "INKTP" },
  { label: "CNNGB - NINGBO", value: "CNNGB" },
  { label: "CNSHA - SHANGHAI", value: "CNSHA" },
  { label: "KHPNH - PHNOM PENH", value: "KHPNH" },
  { label: "KHKOS - SIHANOUKVILLE", value: "KHKOS" },
  { label: "HKHKG - HONG KONG", value: "HKHKG" },
  { label: "IDBLW - BELAWAN", value: "IDBLW" },
  { label: "IDJKT - JAKARTA", value: "IDJKT" },
  { label: "IDPLM - PALEMBANG", value: "IDPLM" },
  { label: "IDPNK - PONTIANAK", value: "IDPNK" },
  { label: "IDSRG - SEMARANG", value: "IDSRG" },
  { label: "IDSUB - SURABAYA", value: "IDSUB" },
];

const terminalName = [];

const movementType = [
  { label: "Import", value: "Import" },
  { label: "Export", value: "Export" },
];

const vendorName = [];

const chargeCode = [
  { label: "OTHC", value: "OTHC" },
  { label: "DTHC", value: "DTHC" },
  { label: "OBS", value: "OBS" },
  { label: "EIS", value: "EIS" },
  { label: "WRC", value: "WRC" },
  { label: "OCR", value: "OCR" },
  { label: "ADDON", value: "ADDON" },
  { label: "LSF", value: "LSF" },
  { label: "ARD", value: "ARD" },
  { label: "Add New", value: "Add New" },
];
const chargeBasis = [
  { label: "Per Container", value: "per_container" },
  { label: "Per BL", value: "per_bill" },
  { label: "Per Shipment", value: "per_shipment" },
  { label: "Per TEU", value: "per_teu" },
  { label: "Per Day/Per Container", value: "per_day_container" },
  { label: "Per House BL", value: "per_house" },
  { label: "Per Day", value: "per_day" },
  { label: "Per Ton", value: "per_ton" },
  { label: "Per Ton/Per Container", value: "per_ton_container" },
  { label: "Per CBM", value: "per_cbm" },
];
const calculationType = [
  { label: "Flat", value: "Flat" },
  { label: "Slab", value: "Slab" },
  { label: "Percentage", value: "Percentage" },
];
const slabBasis = [
  { label: "Weight", value: "weight" },
  { label: "Day Count", value: "day_count" },
  { label: "Container Count", value: "container_count" },
  { label: "Distance (KM)", value: "distance_km" },
  { label: "Time (Hr)", value: "time_hr" },
  { label: "Time (Minutes)", value: "time_minutes" },
];
const currency = [
  { label: "INR", value: "INR" },
  { label: "USD", value: "USD" },
  { label: "Rp", value: "Rp" },
  { label: "Yuan", value: "Yuan" },
  { label: "BDT", value: "BDT" },
  { label: "HKD", value: "HKD" },
];
const cargoType = [
  { label: "General", value: "General" },
  { label: "Refer", value: "Refer" },
  { label: "Haz", value: "Haz" },
];
const containerType = [
  { label: "20 GP", value: "20_gp" },
  { label: "40 GP", value: "40_gp" },
  { label: "40 HQ", value: "40_hq" },
  { label: "45 HQ", value: "45_hq" },
  { label: "20 RF", value: "20_rf" },
  { label: "40 RF", value: "40_rf" },
];
const fromSlab = [
  { label: "0", value: "0" },
  { label: "10", value: "10" },
];

const initialValue = {
  chargeCategory: "",
  portName: "",
  terminalName: "",
  movementType: "",
  carrierName: "",
  vendorName: "",
  validityFrom: "",
  validityTo: "",

  mainBox: [
    {
      chargeCode: "",
      chargeBasis: "",
      calculationType: "",
      slabBasis: "",
      currency: "",
      minValue: "",
      tax: "",
      addTerms: {},
      subBox: [
        {
          cargoType: "",
          containerType: "",
          fromSlab: "",
          toSlab: "",
          rate: "",
        },
      ],
    },
  ],
};

export default function UploadPortLocalChargesData() {
  const [addTermsModal, setAddTermsModal] = useState({ isOpen: false, id: "" });
  const navigate = useNavigate();

  const onCloseClick = () => {
    setAddTermsModal((prev) => ({ ...prev, isOpen: false, id: "" }));
  };

  const setTermHandler = (obj) => {
    formik.setFieldValue(`mainBox[${addTermsModal.id}].addTerms`, obj);
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (value) => {
      console.log(value, "value");
    },
  });

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="main_freight_wrapper">
            <button
              type="button"
              className="btn border mb-3"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="row">
                      {/* Charge Category */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Charge Category</label>
                        <Select
                          value={chargeCategory ? chargeCategory.find((option) => option.value === formik.values.chargeCategory) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`chargeCategory`, e.value);
                          }}
                          name="chargeCategory"
                          options={chargeCategory}
                          placeholder={"Select Charge Category"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Port Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Port Name</label>
                        <Select
                          name="portName"
                          value={portName ? portName.find((option) => option.value === formik.values.portName) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`portName`, e.value);
                          }}
                          options={portName}
                          placeholder={"Select Port Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Terminal Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Terminal Name</label>
                        <Select
                          // value={addDetails.surchargeAliasDesc}
                          name="terminalName"
                          value={terminalName ? terminalName.find((option) => option.value === formik.values.terminalName) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`terminalName`, e.value);
                          }}
                          options={terminalName}
                          placeholder={"Select Terminal Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Movement Type */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Movement Type</label>
                        <Select
                          name="movementType"
                          value={movementType ? movementType.find((option) => option.value === formik.values.movementType) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`movementType`, e.value);
                          }}
                          options={movementType}
                          placeholder={"Select Movement Type"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Carrier Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Carrier Name</label>
                        <Select
                          name="carrierName"
                          value={optionCarrierName ? optionCarrierName.find((option) => option.value === formik.values.carrierName) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`carrierName`, e.value);
                          }}
                          options={optionCarrierName}
                          placeholder={"Select Carrier Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Vendor Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Vendor Name</label>
                        <Select
                          name="vendorName"
                          value={vendorName ? vendorName.find((option) => option.value === formik.values.vendorName) : ""}
                          onChange={(e) => {
                            formik.setFieldValue(`vendorName`, e.value);
                          }}
                          options={vendorName}
                          placeholder={"Select Vendor Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Validity From */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Validity From</label>
                        <input
                          type="date"
                          name="validityFrom"
                          id="validity_from"
                          value={formik.values.validityFrom}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>

                      {/* Validity To */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Validity To</label>
                        <input
                          type="date"
                          name="validityTo"
                          id="validity_to"
                          value={formik.values.validityTo}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <hr />
                    <div className="p-3"></div>

                    {/* Field Array started------------------------------------------------- */}
                    <FormikProvider value={formik}>
                      <FieldArray name="mainBox">
                        {(arrayHelpers) => {
                          return (
                            <>
                              {formik.values.mainBox.length > 0 &&
                                formik.values.mainBox.map((item, index) => (
                                  <Card key={index} className={`sub_field_wrap ${!(formik.values.validityFrom !== '' && formik.values.validityTo !== '' && formik.values.carrierName !== '') ? 'disabled' : ''}`}>
                                    <CardBody>
                                      <div className="row mb-3" key={index}>
                                        {/* Charge Code */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Surcharge Code
                                            </label>
                                            <Select
                                              name={`mainBox[${index}].chargeCode`}
                                              value={chargeCode ? chargeCode.find((option) => option.value === formik.values.mainBox[index].chargeCode) : ""}
                                              onChange={(e) => {
                                                if (e.label == "Add New") {
                                                  navigate("/freight/ocean/upload/PortLocalCharges/add-new")
                                              }
                                                formik.setFieldValue(`mainBox[${index}].chargeCode`, e.value);
                                              }}
                                              options={chargeCode}
                                              classNamePrefix="select2-selection form-select"
                                            />
                                          </div>
                                        </div>

                                        {/* Charge Basis */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label">
                                            Surcharge Basis
                                            </label>
                                            <Select
                                              name={`mainBox[${index}].chargeBasis`}
                                              value={
                                                chargeBasis
                                                  ? chargeBasis.find(
                                                    (option) => option.value === formik.values.mainBox[index].chargeBasis)
                                                  : ""
                                              }
                                              onChange={(e) => {
                                                formik.setFieldValue(
                                                  `mainBox[${index}].chargeBasis`,
                                                  e.value
                                                );
                                              }}
                                              options={chargeBasis}
                                              classNamePrefix="select2-selection form-select"
                                            />
                                          </div>
                                        </div>

                                        {/* Calculation Type */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Calculation Type
                                            </label>
                                            <Select
                                              name={`mainBox[${index}].calculationType`}
                                              value={calculationType ? calculationType.find((option) => option.value === formik.values.mainBox[index].calculationType) : ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].calculationType`, e.value);
                                              }}
                                              options={calculationType}
                                              classNamePrefix="select2-selection form-select"
                                            />
                                          </div>
                                        </div>

                                        {/* Slab Basis */}
                                        {formik.values.mainBox[index]
                                          .calculationType === "Slab" && (
                                            <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                              <div className="mb-3">
                                                <label className="form-label">
                                                  Slab Basis
                                                </label>
                                                <Select
                                                  name={`mainBox[${index}].slabBasis`}
                                                  value={slabBasis ? slabBasis.find((option) => option.value === formik.values.mainBox[index].slabBasis) : ""}
                                                  onChange={(e) => {
                                                    formik.setFieldValue(`mainBox[${index}].slabBasis`, e.value);
                                                  }}
                                                  options={slabBasis}
                                                  classNamePrefix="select2-selection form-select"
                                                />
                                              </div>
                                            </div>
                                          )}

                                        {/* Currency */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Currency
                                            </label>
                                            <Select
                                              name={`mainBox[${index}].currency`}
                                              value={slabBasis ? slabBasis.find((option) => option.value === formik.values.mainBox[index].currency) : ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].currency`, e.value);
                                              }}
                                              options={currency}
                                              classNamePrefix="select2-selection form-select"
                                            />
                                          </div>
                                        </div>

                                        {/* Min Value */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Min Value
                                            </label>
                                            <Input
                                              type="text"
                                              name={`mainBox[${index}].minValue`}
                                              placeholder="Enter minvalue"
                                              value={
                                                formik.values.mainBox[index]
                                                  .minValue
                                              }
                                              onChange={formik.handleChange}
                                            />
                                          </div>
                                        </div>

                                        {/* Tax Value */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Tax
                                            </label>
                                            <Input
                                              type="text"
                                              name={`mainBox[${index}].tax`}
                                              placeholder="Enter tax"
                                              value={formik.values.mainBox[index].tax}
                                              onChange={formik.handleChange}
                                            />
                                          </div>
                                        </div>

                                        {/* checkbox */}
                                        <div className="col-lg-12 d-flex align-items-center justify-content-between">
                                          <div className="form-check">
                                            <span
                                              className="fw-bold text-decoration-underline text-primary"
                                              onClick={(e) => {
                                                setAddTermsModal({
                                                  isOpen: true,
                                                  id: index,
                                                });
                                              }}
                                            >
                                              Add Terms
                                            </span>
                                          </div>
                                          <div>
                                            {formik.values.mainBox.length >
                                              1 && (
                                                <button
                                                  className="btn m-1 border"
                                                  onClick={() => { arrayHelpers.remove(index); }}
                                                >
                                                  <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                </button>
                                              )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* SUB Field Array started------------------------------------------------- */}
                                      {!(formik.values.mainBox[index].calculationType === "") && (
                                        <FieldArray name={`mainBox[${index}].subBox`} >
                                          {(arrayHelpersTwo) => {
                                            return (
                                              <>
                                                <Card>
                                                  <CardBody>
                                                    {item.subBox.length >
                                                      0 &&
                                                      item.subBox.map((subItem, subIndex) => {
                                                        return (
                                                          <>
                                                            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                                            {formik.values.mainBox[index].calculationType && (
                                                              <div className="row mb-3">
                                                                {/* Cargo Type */}
                                                                {(formik.values.mainBox[index].calculationType === "Flat" || formik.values.mainBox[index].calculationType === "Percentage") && (
                                                                  <div className="col-md-3 mb-2">
                                                                    <label className="form-label"> Cargo Type </label>
                                                                    <Select
                                                                      name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                                                      value={
                                                                        cargoType
                                                                          ? cargoType.find((option) => option.value === formik.values.mainBox[index].subBox[subIndex].cargoType) : ""
                                                                      }
                                                                      onChange={(e) => {
                                                                        formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].cargoType`, e.value);
                                                                      }}
                                                                      options={
                                                                        cargoType
                                                                      }
                                                                      classNamePrefix="select2-selection form-select"
                                                                    />
                                                                  </div>
                                                                )}

                                                                {/* Container Type */}
                                                                <div className="col-md-3 mb-2">
                                                                  <label className="form-label"> Container Type </label>
                                                                  <Select
                                                                    name={`mainBox[${index}].subBox[${subIndex}].containerType`}
                                                                    value={
                                                                      containerType
                                                                        ? containerType.find((option) => option.value === formik.values.mainBox[index].subBox[subIndex].containerType) : ""
                                                                    }
                                                                    onChange={(e) => {
                                                                      formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].containerType`, e.value);
                                                                    }}
                                                                    options={
                                                                      containerType
                                                                    }
                                                                    classNamePrefix="select2-selection form-select"
                                                                  />
                                                                </div>
                                                                {/* </div> */}

                                                                {/* From Slab */}
                                                                {formik.values.mainBox[index].calculationType === "Slab" && (
                                                                  <div className="col-md-2 mb-2">
                                                                    <label className="form-label"> From Slab </label>
                                                                    <Select
                                                                      name={`mainBox[${index}].subBox[${subIndex}].fromSlab`}
                                                                      value={
                                                                        fromSlab
                                                                          ? fromSlab.find((option) => option.value === formik.values.mainBox[index].subBox[subIndex].fromSlab) : ""
                                                                      }
                                                                      onChange={(e) => {
                                                                        formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].fromSlab`, e.value);
                                                                      }}
                                                                      options={
                                                                        fromSlab
                                                                      }
                                                                      classNamePrefix="select2-selection form-select"
                                                                    />
                                                                  </div>
                                                                )}

                                                                {/* To Slab */}
                                                                {formik.values.mainBox[index].calculationType === "Slab" && (
                                                                  <div className="col-md-2 mb-2">
                                                                    <label className="form-label">
                                                                      To
                                                                      Slab
                                                                    </label>
                                                                    <Input
                                                                      type="text"
                                                                      name={`mainBox[${index}].subBox[${subIndex}].toSlab`}
                                                                      value={formik.values.mainBox[index].subBox[subIndex].toSlab}
                                                                      onChange={
                                                                        formik.handleChange
                                                                      }
                                                                    />
                                                                  </div>
                                                                )}

                                                                {/* Rate */}
                                                                <div className="col-md-2 mb-2">
                                                                  <label className="form-label">
                                                                    Rate
                                                                  </label>
                                                                  <Input
                                                                    type="text"
                                                                    name={`mainBox[${index}].subBox[${subIndex}].rate`}
                                                                    value={formik.values.mainBox[index].subBox[subIndex].rate}
                                                                    onChange={
                                                                      formik.handleChange
                                                                    }
                                                                  />
                                                                </div>

                                                                {/* Add remove  */}
                                                                <div className="col-md-3 mt-2 d-flex justify-content-end align-items-center">
                                                                  <div>
                                                                    {formik.values.mainBox[index].subBox.length > 1 && (
                                                                      <button
                                                                        className="btn border"
                                                                        onClick={() => {
                                                                          arrayHelpersTwo.remove(subIndex);
                                                                        }}
                                                                      >
                                                                        <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                                      </button>
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            )}

                                                            {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
                                                          </>
                                                        );
                                                      }
                                                      )}

                                                    <div>
                                                      <button
                                                        className="btn btn-primary me-2"
                                                        onClick={() => {
                                                          arrayHelpersTwo.push(
                                                            {
                                                              cargoType: "",
                                                              containerType:
                                                                "",
                                                              fromSlab: "",
                                                              toSlab: "",
                                                              rate: "",
                                                            }
                                                          );
                                                        }}
                                                      >
                                                        <i className="bx bx-plus"></i>
                                                      </button>
                                                    </div>
                                                  </CardBody>
                                                </Card>
                                              </>
                                            );
                                          }}
                                        </FieldArray>
                                      )}
                                      {/* SUB Field Array ended------------------------------------------------- */}
                                    </CardBody>
                                  </Card>
                                )
                                )}
                              {/* add button of main box  */}
                              <div>
                                <button
                                  className="btn btn-primary m-1"
                                  onClick={() => {
                                    arrayHelpers.push({
                                      chargeCode: "",
                                      chargeBasis: "",
                                      calculationType: "",
                                      slabBasis: "",
                                      currency: "",
                                      minValue: "",
                                      tax: "",
                                      addTerms: false,
                                      subBox: [
                                        {
                                          cargoType: "",
                                          containerType: "",
                                          fromSlab: "",
                                          toSlab: "",
                                          rate: null,
                                        },
                                      ],
                                    });
                                  }}
                                >
                                  <i className="bx bx-plus align-middle me-1"></i>
                                  Add
                                </button>
                              </div>
                            </>
                          );
                        }}
                      </FieldArray>
                    </FormikProvider>

                    <ModalAddTerm
                      modal={addTermsModal}
                      onCloseClick={onCloseClick}
                      setTermHandler={setTermHandler}
                    />
                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mt-3 mx-3 d-flex justify-content-end">
                          <button
                            className=" btn btn-primary"
                            onClick={formik.handleSubmit}
                          >
                            Save
                          </button>
                        </div>
                        <div className="mt-3 mx-3 d-flex justify-content-end">
                          <button
                            className=" btn btn-primary"
                            onClick={() => {
                              navigate(-1);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
