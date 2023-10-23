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
import ModalAddTerm from "./Modal/ModalAddTerm";

const chargeCategory = [
  { label: "Port Charges", value: "Port Charges" },
  { label: "Other Charges", value: "Other Charges" },
];

const portName = [
  { label: "Surat Port", value: "Surat Port" },
  { label: "Hajira", value: "Hajira" },
];

const terminalName = [
  { label: "Surat", value: "Surat" },
  { label: "Porbandar", value: "Porbandar" },
];

const movementType = [
  { label: "Import", value: "Import" },
  { label: "Export", value: "Export" },
];

const carrierName = [
  { label: "OOCL", value: "OOCL" },
  { label: "ABC", value: "ABC" },
];

const vendorName = [
  { label: "Vendor A", value: "Vendor A" },
  { label: "Vendor B", value: "Vendor B" },
];

const chargeCode = [
  { label: "THC", value: "THC" },
  { label: "DOC", value: "DOC" },
];
const chargeBasis = [
  { label: "Per Container", value: "Per Container" },
  { label: "Per Bill", value: "Per Bill" },
];
const calculationType = [
  { label: "Flat", value: "Flat" },
  { label: "Slab", value: "Slab" },
  { label: "Percentage", value: "Percentage" },
];
const slabBasis = [
  { label: "Container Count", value: "Container Count" },
  { label: "Bill Count", value: "Bill Count" },
];
const currency = [
  { label: "INR", value: "INR" },
  { label: "USD", value: "USD" },
];
const cargoType = [
  { label: "General", value: "General" },
  { label: "Refer", value: "Refer" },
  { label: "Haz", value: "Haz" },
];
const containerType = [
  { label: "20 GP", value: "20 GP" },
  { label: "40 GP", value: "40 GP" },
  { label: "40 RF", value: "40 RF" },
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
  // console.log(addTermsModal, "mdl");

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
                        {/* <div className="row"> */}
                        {/* <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Charge Category
                            </Label> */}
                        <label className="form-label">Charge Category</label>
                        {/* <div className="col-9"> */}
                        <Select
                          value={
                            chargeCategory
                              ? chargeCategory.find(
                                  (option) =>
                                    option.value ===
                                    formik.values.chargeCategory
                                )
                              : ""
                          }
                          onChange={(e) => {
                            formik.setFieldValue(`chargeCategory`, e.value);
                          }}
                          name="chargeCategory"
                          options={chargeCategory}
                          placeholder={"Select Charge Category"}
                          classNamePrefix="select2-selection form-select"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>

                      {/* Port Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        {/* <div className="row"> */}
                        <label className="form-label">Port Name</label>
                        {/* <div className="col-9"> */}
                        <Select
                          name="portName"
                          value={
                            portName
                              ? portName.find(
                                  (option) =>
                                    option.value === formik.values.portName
                                )
                              : ""
                          }
                          onChange={(e) => {
                            formik.setFieldValue(`portName`, e.value);
                          }}
                          options={portName}
                          placeholder={"Select Port Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>

                      {/* Terminal Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        {/* <div className="row"> */}
                        <label className="form-label">Terminal Name</label>
                        {/* <div className="col-9"> */}
                        <Select
                          // value={addDetails.surchargeAliasDesc}
                          name="terminalName"
                          value={
                            terminalName
                              ? terminalName.find(
                                  (option) =>
                                    option.value === formik.values.terminalName
                                )
                              : ""
                          }
                          onChange={(e) => {
                            formik.setFieldValue(`terminalName`, e.value);
                          }}
                          options={terminalName}
                          placeholder={"Select Terminal Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                      {/* </div> */}

                      {/* <div className="row"> */}
                      {/* Movement Type */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        {/* <div className="row"> */}
                        <label className="form-label">Movement Type</label>
                        {/* <div className="col-9"> */}
                        <Select
                          name="movementType"
                          value={
                            movementType
                              ? movementType.find(
                                  (option) =>
                                    option.value === formik.values.movementType
                                )
                              : ""
                          }
                          onChange={(e) => {
                            formik.setFieldValue(`movementType`, e.value);
                          }}
                          options={movementType}
                          placeholder={"Select Movement Type"}
                          classNamePrefix="select2-selection form-select"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>

                      {/* Carrier Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        {/* <div className="row"> */}
                        <label className="form-label">Carrier Name</label>
                        {/* <div className="col-9"> */}
                        <Select
                          name="carrierName"
                          value={
                            carrierName
                              ? carrierName.find(
                                  (option) =>
                                    option.value === formik.values.carrierName
                                )
                              : ""
                          }
                          onChange={(e) => {
                            formik.setFieldValue(`carrierName`, e.value);
                          }}
                          options={carrierName}
                          placeholder={"Select Carrier Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>

                      {/* Vendor Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        {/* <div className="row"> */}
                        <label className="form-label">Vendor Name</label>
                        {/* <div className="col-9"> */}
                        <Select
                          // value={addDetails.surchargeAliasDesc}
                          name="vendorName"
                          value={
                            vendorName
                              ? vendorName.find(
                                  (option) =>
                                    option.value === formik.values.vendorName
                                )
                              : ""
                          }
                          onChange={(e) => {
                            formik.setFieldValue(`vendorName`, e.value);
                          }}
                          options={vendorName}
                          placeholder={"Select Vendor Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                      {/* </div> */}

                      {/* <div className="row"> */}
                      {/* Validity From */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        {/* <div className="row"> */}
                        <label className="form-label">Validity From</label>
                        {/* <div className="col-9"> */}
                        <input
                          type="date"
                          name="validityFrom"
                          id="validity_from"
                          value={formik.values.validityFrom}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>

                      {/* Validity To */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        {/* <div className="row"> */}
                        <label className="form-label">Validity To</label>
                        {/* <div className="col-9"> */}
                        <input
                          type="date"
                          name="validityTo"
                          id="validity_to"
                          value={formik.values.validityTo}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                    </div>

                    <hr />
                    <div className="p-4"></div>

                    {/* Field Array started------------------------------------------------- */}

                    <FormikProvider value={formik}>
                      <FieldArray name="mainBox">
                        {(arrayHelpers) => {
                          return (
                            <>
                              {formik.values.mainBox.length > 0 &&
                                formik.values.mainBox.map((item, index) => {
                                  return (
                                    <>
                                      {/* <hr /> */}
                                      <Card>
                                        <CardBody>
                                          <div className="row mb-3" key={index}>
                                            {/* Charge Code */}
                                            <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                              <div className="mb-3">
                                                <label className="form-label">
                                                  Charge Code
                                                </label>
                                                <Select
                                                  name={`mainBox[${index}].chargeCode`}
                                                  value={
                                                    chargeCode
                                                      ? chargeCode.find(
                                                          (option) =>
                                                            option.value ===
                                                            formik.values
                                                              .mainBox[index]
                                                              .chargeCode
                                                        )
                                                      : ""
                                                  }
                                                  onChange={(e) => {
                                                    formik.setFieldValue(
                                                      `mainBox[${index}].chargeCode`,
                                                      e.value
                                                    );
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
                                                  Charge Basis
                                                </label>
                                                <Select
                                                  name={`mainBox[${index}].chargeBasis`}
                                                  value={
                                                    chargeBasis
                                                      ? chargeBasis.find(
                                                          (option) =>
                                                            option.value ===
                                                            formik.values
                                                              .mainBox[index]
                                                              .chargeBasis
                                                        )
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
                                                  value={
                                                    calculationType
                                                      ? calculationType.find(
                                                          (option) =>
                                                            option.value ===
                                                            formik.values
                                                              .mainBox[index]
                                                              .calculationType
                                                        )
                                                      : ""
                                                  }
                                                  onChange={(e) => {
                                                    formik.setFieldValue(
                                                      `mainBox[${index}].calculationType`,
                                                      e.value
                                                    );
                                                  }}
                                                  options={calculationType}
                                                  classNamePrefix="select2-selection form-select"
                                                />
                                              </div>
                                            </div>

                                            {/* Slab Basis */}
                                            {/* {console.log(formik.values.mainBox[index].calculationType,"<-------val<<")} */}
                                            {/* {console.log(formik.values,"<-------val<<")} */}
                                            {formik.values.mainBox[index]
                                              .calculationType === "Slab" && (
                                              <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                                <div className="mb-3">
                                                  <label className="form-label">
                                                    Slab Basis
                                                  </label>
                                                  <Select
                                                    name={`mainBox[${index}].slabBasis`}
                                                    value={
                                                      slabBasis
                                                        ? slabBasis.find(
                                                            (option) =>
                                                              option.value ===
                                                              formik.values
                                                                .mainBox[index]
                                                                .slabBasis
                                                          )
                                                        : ""
                                                    }
                                                    onChange={(e) => {
                                                      formik.setFieldValue(
                                                        `mainBox[${index}].slabBasis`,
                                                        e.value
                                                      );
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
                                                  value={
                                                    slabBasis
                                                      ? slabBasis.find(
                                                          (option) =>
                                                            option.value ===
                                                            formik.values
                                                              .mainBox[index]
                                                              .currency
                                                        )
                                                      : ""
                                                  }
                                                  onChange={(e) => {
                                                    formik.setFieldValue(
                                                      `mainBox[${index}].currency`,
                                                      e.value
                                                    );
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
                                                  value={
                                                    formik.values.mainBox[index]
                                                      .minValue
                                                  }
                                                  onChange={formik.handleChange}
                                                  classNamePrefix="select2-selection form-select"
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
                                                {/* <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="formCheck1"
                                              name={`mainBox[${index}].addTerms`}
                                              // onChange={e=>{formik.setFieldValue(`mainBox[${index}].addTerms`,e.target.checked)}}
                                              onChange={(e) => {
                                                setAddTermsModal({
                                                  isOpen: e.target.checked,
                                                  id: index,
                                                });
                                              }}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="formCheck1"
                                            >
                                              Add Terms
                                            </label> */}
                                              </div>
                                              <div>
                                                {formik.values.mainBox.length >
                                                  1 && (
                                                  <button
                                                    className="btn m-1 border"
                                                    onClick={() => {
                                                      arrayHelpers.remove(
                                                        index
                                                      );
                                                    }}
                                                  >
                                                    <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                  </button>
                                                )}
                                              </div>
                                            </div>

                                            {/* add remove */}
                                            {/* <div className="d-flex align-items-center">
                                          
                                        </div> */}
                                          </div>

                                          {/* SUB Field Array started------------------------------------------------- */}
                                          {!(
                                            formik.values.mainBox[index]
                                              .calculationType === ""
                                          ) && (
                                            <FieldArray
                                              name={`mainBox[${index}].subBox`}
                                            >
                                              {(arrayHelpersTwo) => {
                                                return (
                                                  <>
                                                    <Card>
                                                      <CardBody>
                                                        {item.subBox.length >
                                                          0 &&
                                                          item.subBox.map(
                                                            (
                                                              subItem,
                                                              subIndex
                                                            ) => {
                                                              return (
                                                                <>
                                                                  {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                                                  {formik.values
                                                                    .mainBox[
                                                                    index
                                                                  ]
                                                                    .calculationType && (
                                                                    <div className="row mb-3">
                                                                      {/* Cargo Type */}
                                                                      {(formik
                                                                        .values
                                                                        .mainBox[
                                                                        index
                                                                      ]
                                                                        .calculationType ===
                                                                        "Flat" ||
                                                                        formik
                                                                          .values
                                                                          .mainBox[
                                                                          index
                                                                        ]
                                                                          .calculationType ===
                                                                          "Percentage") && (
                                                                        // <div className="w-100 mx-1">
                                                                        <div className="col-md-3 mb-2">
                                                                          <label className="form-label">
                                                                            Cargo
                                                                            Type
                                                                          </label>
                                                                          <Select
                                                                            name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                                                            value={
                                                                              cargoType
                                                                                ? cargoType.find(
                                                                                    (
                                                                                      option
                                                                                    ) =>
                                                                                      option.value ===
                                                                                      formik
                                                                                        .values
                                                                                        .mainBox[
                                                                                        index
                                                                                      ]
                                                                                        .subBox[
                                                                                        subIndex
                                                                                      ]
                                                                                        .cargoType
                                                                                  )
                                                                                : ""
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              formik.setFieldValue(
                                                                                `mainBox[${index}].subBox[${subIndex}].cargoType`,
                                                                                e.value
                                                                              );
                                                                            }}
                                                                            options={
                                                                              cargoType
                                                                            }
                                                                            classNamePrefix="select2-selection form-select"
                                                                          />
                                                                        </div>
                                                                        // </div>
                                                                      )}

                                                                      {/* Container Type */}
                                                                      {/* <div className="w-100 mx-1"> */}
                                                                      <div className="col-md-3 mb-2">
                                                                        <label className="form-label">
                                                                          Container
                                                                          Type
                                                                        </label>
                                                                        <Select
                                                                          name={`mainBox[${index}].subBox[${subIndex}].containerType`}
                                                                          value={
                                                                            containerType
                                                                              ? containerType.find(
                                                                                  (
                                                                                    option
                                                                                  ) =>
                                                                                    option.value ===
                                                                                    formik
                                                                                      .values
                                                                                      .mainBox[
                                                                                      index
                                                                                    ]
                                                                                      .subBox[
                                                                                      subIndex
                                                                                    ]
                                                                                      .containerType
                                                                                )
                                                                              : ""
                                                                          }
                                                                          onChange={(
                                                                            e
                                                                          ) => {
                                                                            formik.setFieldValue(
                                                                              `mainBox[${index}].subBox[${subIndex}].containerType`,
                                                                              e.value
                                                                            );
                                                                          }}
                                                                          options={
                                                                            containerType
                                                                          }
                                                                          classNamePrefix="select2-selection form-select"
                                                                        />
                                                                      </div>
                                                                      {/* </div> */}

                                                                      {/* From Slab */}
                                                                      {formik
                                                                        .values
                                                                        .mainBox[
                                                                        index
                                                                      ]
                                                                        .calculationType ===
                                                                        "Slab" && (
                                                                        // <div className="w-100 mx-1">
                                                                        <div className="col-md-2 mb-2">
                                                                          <label className="form-label">
                                                                            From
                                                                            Slab
                                                                          </label>
                                                                          <Select
                                                                            name={`mainBox[${index}].subBox[${subIndex}].fromSlab`}
                                                                            value={
                                                                              fromSlab
                                                                                ? fromSlab.find(
                                                                                    (
                                                                                      option
                                                                                    ) =>
                                                                                      option.value ===
                                                                                      formik
                                                                                        .values
                                                                                        .mainBox[
                                                                                        index
                                                                                      ]
                                                                                        .subBox[
                                                                                        subIndex
                                                                                      ]
                                                                                        .fromSlab
                                                                                  )
                                                                                : ""
                                                                            }
                                                                            onChange={(
                                                                              e
                                                                            ) => {
                                                                              formik.setFieldValue(
                                                                                `mainBox[${index}].subBox[${subIndex}].fromSlab`,
                                                                                e.value
                                                                              );
                                                                            }}
                                                                            options={
                                                                              fromSlab
                                                                            }
                                                                            classNamePrefix="select2-selection form-select"
                                                                          />
                                                                        </div>
                                                                        // </div>
                                                                      )}

                                                                      {/* To Slab */}
                                                                      {formik
                                                                        .values
                                                                        .mainBox[
                                                                        index
                                                                      ]
                                                                        .calculationType ===
                                                                        "Slab" && (
                                                                        // <div className="w-100 mx-1">
                                                                        <div className="col-md-2 mb-2">
                                                                          <label className="form-label">
                                                                            To
                                                                            Slab
                                                                          </label>
                                                                          <Input
                                                                            type="text"
                                                                            name={`mainBox[${index}].subBox[${subIndex}].toSlab`}
                                                                            value={
                                                                              formik
                                                                                .values
                                                                                .mainBox[
                                                                                index
                                                                              ]
                                                                                .subBox[
                                                                                subIndex
                                                                              ]
                                                                                .toSlab
                                                                            }
                                                                            onChange={
                                                                              formik.handleChange
                                                                            }
                                                                            classNamePrefix="select2-selection form-select"
                                                                          />
                                                                        </div>
                                                                        // </div>
                                                                      )}

                                                                      {/* Rate */}
                                                                      {/* <div className="w-100 mx-1"> */}
                                                                      <div className="col-md-2 mb-2">
                                                                        <label className="form-label">
                                                                          Rate
                                                                        </label>
                                                                        <Input
                                                                          type="text"
                                                                          name={`mainBox[${index}].subBox[${subIndex}].rate`}
                                                                          value={
                                                                            formik
                                                                              .values
                                                                              .mainBox[
                                                                              index
                                                                            ]
                                                                              .subBox[
                                                                              subIndex
                                                                            ]
                                                                              .rate
                                                                          }
                                                                          onChange={
                                                                            formik.handleChange
                                                                          }
                                                                          classNamePrefix="select2-selection form-select"
                                                                        />
                                                                      </div>
                                                                      {/* </div> */}

                                                                      {/* Add remove  */}
                                                                      <div className="col-md-3 mt-2 d-flex justify-content-end align-items-center">
                                                                        {/* <div>
                                                                          <button
                                                                            className="btn btn-primary me-2"
                                                                            onClick={() => {
                                                                              arrayHelpersTwo.push(
                                                                                {
                                                                                  cargoType:
                                                                                    "",
                                                                                  containerType:
                                                                                    "",
                                                                                  fromSlab:
                                                                                    "",
                                                                                  toSlab:
                                                                                    "",
                                                                                  rate: "",
                                                                                }
                                                                              );
                                                                            }}
                                                                          >
                                                                            <i className="bx bx-plus"></i>
                                                                          </button>
                                                                        </div> */}

                                                                        <div>
                                                                          {formik
                                                                            .values
                                                                            .mainBox[
                                                                            index
                                                                          ]
                                                                            .subBox
                                                                            .length >
                                                                            1 && (
                                                                            <button
                                                                              className="btn border"
                                                                              onClick={() => {
                                                                                arrayHelpersTwo.remove(
                                                                                  subIndex
                                                                                );
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
                                    </>
                                  );
                                })}
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
