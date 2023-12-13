import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row
} from "reactstrap";
import { optionCalculationType, optionCargoType, optionCarrierName, optionContainerType, optionMovementType } from "../../../../common/data/procurement";
import ModalAddTerm from "../Modal/ModalAddTerm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postPortLocalChargesData } from "../../../../store/Procurement/actions";

const terminalName = [];
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
// const calculationType = [
//   { label: "Flat", value: "Flat" },
//   { label: "Slab", value: "Slab" },
//   { label: "Percentage", value: "Percentage" },
// ];
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
  const surchargeCategory_data = useSelector((state) => state?.globalReducer?.surchargeCategory_data);
  const oceanPort_data = useSelector((state) => state?.globalReducer?.oceanPort_data);
  const vendor_data = useSelector((state) => state?.globalReducer?.vendor_data);
  const surchargeCode_data = useSelector((state) => state?.globalReducer?.surchargeCode_data);
  const UOM_data = useSelector((state) => state?.globalReducer?.UOM_data);
  const currency_data = useSelector((state) => state?.globalReducer?.currency_data);
  const [optionVendorName, setOptionVendorName] = useState([]);
  const [addTermsModal, setAddTermsModal] = useState({ isOpen: false, id: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let vendorlist = vendor_data?.content?.map((item) => {
      return { label: item?.name, value: item?.name, version: item?.version, id: item?.id }
    })
    setOptionVendorName(vendorlist);
  }, [vendor_data]);

  const onCloseClick = () => {
    setAddTermsModal((prev) => ({ ...prev, isOpen: false, id: "" }));
  };

  const setTermHandler = (obj) => {
    formik.setFieldValue(`mainBox[${addTermsModal.id}].addTerms`, obj);
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (value) => {
      console.log(value, "main value ");
      let data = {
        "id": null,
        "surchargeCategory": {
          "id": value?.chargeCategory?.id || 1,
          "version": value?.chargeCategory?.version || 1
        },
        "oceanPort": {
          "id": value?.portName?.id || 1,
          "version": value?.portName?.version || 1
        },
        "oceanPortTerminal": {
          "id": 1,
          "version": 0
        },
        "movementType": value?.movementType?.value || "IMPORT",
        "tenantCarrier": {
          "id": 1,
          "version": 7
        },
        "tenantVendor": {
          "id": value?.vendorName?.id || 1,
          "version": value?.vendorName?.version || 7
        },
        "validFrom": value?.validityFrom || null,
        "validTo": value?.validityTo || null,
        "status": "ACTIVE",
        "tenantVendorFCLSurchargeCategoryTerminals": [
          {
            "id": null,
            "oceanPortTerminal": {
              "id": 1,
              "version": 0,
              "status": "ACTIVE"
            }
          }
        ],        
        "tenantVendorFCLSurchargeDetails": value?.mainBox?.map((item) => {
          return {
            "id": null,
            "status": "ACTIVE",
            "surchargeCode": {
              "id": item?.chargeCode?.id || 1,
              "version": item?.chargeCode?.version || 4
            },
            "unitOfMeasurement": {
              "id": item?.chargeBasis?.id || 1,
              "version": item?.chargeBasis?.version || 2
            },
            "paymentTerm": item?.addTerms?.paymentTerm || "PREPAID",
            "standard": item?.addTerms?.isStandard === 'incidental' ? false : true,
            "calculationType": item?.calculationType || "FLAT",
            "minimumValue": item?.minValue || 0,
            "applicableTax": item?.tax || 0,
            "tenantVendorFCLSurchargeValues": item?.subBox?.map((subItem) => {
              return {
                "id": null,
                "status": "ACTIVE",
                "cargoType": {
                  "id": subItem?.cargoType?.id || 1,
                  "version": subItem?.cargoType?.version || 0
                },
                "oceanContainer": {
                  "id": subItem?.containerType?.id || 1,
                  "version": subItem?.containerType?.version || 0
                },
                "currency": {
                  "id": item?.currency?.id || 2,
                  "version": item?.currency?.version || 0
                },
                "fromSlab": subItem?.fromSlab || null,
                "toSlab": subItem?.toSlab || null,
                "value": subItem?.rate || 0
              }
            }),
            "tenantVendorFCLSurchargeDetailIncoterms": item?.addTerms?.incoTerm?.map((incoterm) => {
              return {
                "id": null,
                "status": "ACTIVE",
                "incoterm": {
                  "id": incoterm?.id || 1,
                  "version": incoterm?.version || 0
                }
              }
            }),
            "tenantVendorFCLSurchargeDetailCommodities": item?.addTerms?.commodity?.map((commodity) => {
              return {
                "id": null,
                "status": "ACTIVE",
                "commodity": {
                  "id": commodity?.id || 1,
                  "version": commodity?.version || 0
                }
              }
            })
          }
        })
      }
      
      dispatch(postPortLocalChargesData(data));
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
                          value={formik.values.chargeCategory || ""}
                          onChange={(e) => {
                            formik.setFieldValue(`chargeCategory`, e);
                          }}
                          name="chargeCategory"
                          options={surchargeCategory_data}
                          placeholder={"Select Charge Category"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Port Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Port Name</label>
                        <Select
                          name="portName"
                          value={formik.values.portName || ""}
                          onChange={(e) => {
                            formik.setFieldValue(`portName`, e);
                          }}
                          options={oceanPort_data}
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
                          value={formik.values.movementType || ""}
                          onChange={(e) => {
                            formik.setFieldValue(`movementType`, e);
                          }}
                          options={optionMovementType}
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
                          value={formik.values.vendorName || ""}
                          onChange={(e) => {
                            formik.setFieldValue(`vendorName`, e);
                          }}
                          options={optionVendorName}
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
                                              value={formik.values.mainBox[index].chargeCode || ""}
                                              onChange={(e) => {
                                                if (e.label == "Add New") {
                                                  navigate("/freight/ocean/upload/PortLocalCharges/add-new")
                                                }
                                                formik.setFieldValue(`mainBox[${index}].chargeCode`, e);
                                              }}
                                              options={[...surchargeCode_data, { label: "Add New", value: "Add New" }]}
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
                                              value={formik.values.mainBox[index].chargeBasis || ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].chargeBasis`, e);
                                              }}
                                              options={UOM_data}
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
                                              value={optionCalculationType ? optionCalculationType.find((option) => option.value === formik.values.mainBox[index].calculationType) : ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].calculationType`, e.value);
                                              }}
                                              options={optionCalculationType}
                                              classNamePrefix="select2-selection form-select"
                                            />
                                          </div>
                                        </div>

                                        {/* Slab Basis */}
                                        {/* {formik.values.mainBox[index]
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
                                          )} */}

                                        {/* Currency */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label">
                                              Currency
                                            </label>
                                            <Select
                                              name={`mainBox[${index}].currency`}
                                              value={formik.values.mainBox[index].currency || ""}
                                              onChange={(e) => {
                                                formik.setFieldValue(`mainBox[${index}].currency`, e);
                                              }}
                                              options={currency_data}
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
                                              value={formik.values.mainBox[index].minValue}
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
                                                                {(formik.values.mainBox[index].calculationType === "FLAT" || formik.values.mainBox[index].calculationType === "PERCENTAGE") && (
                                                                  <div className="col-md-3 mb-2">
                                                                    <label className="form-label"> Cargo Type </label>
                                                                    <Select
                                                                      name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                                                      value={formik.values.mainBox[index].subBox[subIndex].cargoType || ""}
                                                                      onChange={(e) => {
                                                                        formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].cargoType`, e);
                                                                      }}
                                                                      options={optionCargoType}
                                                                      classNamePrefix="select2-selection form-select"
                                                                    />
                                                                  </div>
                                                                )}

                                                                {/* Container Type */}
                                                                <div className="col-md-3 mb-2">
                                                                  <label className="form-label"> Container Type </label>
                                                                  <Select
                                                                    name={`mainBox[${index}].subBox[${subIndex}].containerType`}
                                                                    value={formik.values.mainBox[index].subBox[subIndex].containerType || ""}
                                                                    onChange={(e) => {
                                                                      formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].containerType`, e);
                                                                    }}
                                                                    options={optionContainerType}
                                                                    classNamePrefix="select2-selection form-select"
                                                                  />
                                                                </div>
                                                                {/* </div> */}

                                                                {/* From Slab */}
                                                                {formik.values.mainBox[index].calculationType === "SLAB" && (
                                                                  <div className="col-md-2 mb-2">
                                                                    <label className="form-label"> From Slab </label>
                                                                    <Input
                                                                      type="text"
                                                                      name={`mainBox[${index}].subBox[${subIndex}].fromSlab`}
                                                                      value={formik.values.mainBox[index].subBox[subIndex].fromSlab || ''}
                                                                      onChange={
                                                                        formik.handleChange
                                                                      }
                                                                    />
                                                                  </div>
                                                                )}

                                                                {/* To Slab */}
                                                                {formik.values.mainBox[index].calculationType === "SLAB" && (
                                                                  <div className="col-md-2 mb-2">
                                                                    <label className="form-label"> To Slab </label>
                                                                    <Input
                                                                      type="text"
                                                                      name={`mainBox[${index}].subBox[${subIndex}].toSlab`}
                                                                      value={formik.values.mainBox[index].subBox[subIndex].toSlab || ''}
                                                                      onChange={
                                                                        formik.handleChange
                                                                      }
                                                                    />
                                                                  </div>
                                                                )}

                                                                {/* Rate */}
                                                                <div className="col-md-2 mb-2">
                                                                  <label className="form-label"> Rate </label>
                                                                  <Input
                                                                    type="text"
                                                                    name={`mainBox[${index}].subBox[${subIndex}].rate`}
                                                                    value={formik.values.mainBox[index].subBox[subIndex].rate || ''}
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
                                  <i className="bx bx-plus align-middle me-1"></i> Add
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
                          <button className=" btn btn-primary" onClick={formik.handleSubmit} > Save </button>
                        </div>
                        <div className="mt-3 mx-3 d-flex justify-content-end">
                          <button
                            className=" btn btn-primary"
                            onClick={() => { navigate(-1); }}
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
