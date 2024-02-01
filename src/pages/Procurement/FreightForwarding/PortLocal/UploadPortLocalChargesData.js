import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";

import { optionCalculationType, optionMovementType } from "../../../../common/data/procurement";
import { isAnyValueEmpty, isAnyValueEmptyInArray } from "../../../../components/Common/CommonLogic";
import { GET_CARGO_TYPE_DATA, GET_CONTAINER_DATA } from "../../../../store/Global/actiontype";
import { postPortLocalChargesData } from "../../../../store/Procurement/actions";
import ModalAddTerm from "../Modal/ModalAddTerm";

const terminalName = [];

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
      calculationType: "FLAT",
      // slabBasis: "",
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
  const {
    surchargeCategory_data, oceanPort_data, vendor_data, surchargeCode_data, UOM_data, currency_data, cargoType_data, container_data,
  } = useSelector(state => state?.globalReducer);
  const [optionVendorName, setOptionVendorName] = useState([]);
  const [optionCarrierName, setOptionCarrierName] = useState([]);
  const [addTermsModal, setAddTermsModal] = useState({ isOpen: false, id: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let generalContainerOpt = container_data?.filter((item) => item.value !== "20RF" && item.value !== "40RF");
  let refrigeContainerOpt = container_data?.filter((item) => item.value === "20RF" || item.value === "40RF");

  useEffect(() => {
    let vendorlist = vendor_data?.content?.map((item) => {
      return { label: item?.name, value: item?.name, version: item?.version, id: item?.id, type: item?.vendorType }
    });
    let carrierList = vendorlist?.filter((item) => item?.type === "CARRIER");
    let vendorNewList = vendorlist?.filter((item) => item?.type !== "CARRIER");
    setOptionVendorName(vendorNewList);
    setOptionCarrierName(carrierList);
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
      // console.log(value, "main value ");

      let surchargeValuesArray = value?.mainBox?.map((item) => {
        let newData = item?.subBox?.map((subItem, subIndex) => {
          const mapContainerData = (containerOption) => containerOption?.map((sub, index) => {
            return {
              ...(subItem?.cargoType && {
                "cargoType": {
                  "id": subItem?.cargoType?.id || '',
                  "version": subItem?.cargoType?.version || 0
                }
              }),
              ...(subItem?.containerType && {
                "oceanContainer": {
                  "id": sub?.id || '',
                  "version": sub?.version || 0
                }
              }),
              ...(item?.currency && {
                "currency": {
                  "id": item?.currency?.id || '',
                  "version": item?.currency?.version || 0
                }
              }),
              ...(subItem?.fromSlab && { "fromSlab": subItem?.fromSlab || 0 }),
              ...(subItem?.toSlab && { "toSlab": subItem?.toSlab || 0 }),
              ...(subItem?.rate && { "value": subItem?.rate || 0 })
            }
          })

          if (subItem?.containerType?.value === 'all') {
            if (subItem?.cargoType?.value === "GENERAL") {
              return mapContainerData(generalContainerOpt);
            } else if (subItem?.cargoType?.value === "REFRIGERATED") {
              return mapContainerData(refrigeContainerOpt);
            } else {
              return mapContainerData(container_data);
            }
          } else {
            let obj = {
              ...(subItem?.cargoType && {
                "cargoType": {
                  "id": subItem?.cargoType?.id || '',
                  "version": subItem?.cargoType?.version || 0
                }
              }),
              ...(subItem?.containerType && {
                "oceanContainer": {
                  "id": subItem?.containerType?.id || '',
                  "version": subItem?.containerType?.version || 0
                }
              }),
              ...(item?.currency && {
                "currency": {
                  "id": item?.currency?.id || '',
                  "version": item?.currency?.version || 0
                }
              }),
              ...(subItem?.fromSlab && { "fromSlab": subItem?.fromSlab || 0 }),
              ...(subItem?.toSlab && { "toSlab": subItem?.toSlab || 0 }),
              ...(subItem?.rate && { "value": subItem?.rate || 0 })
            }
            return obj
          }
        });
        return newData
      });

      let spreadSurArray = surchargeValuesArray?.map((item) => {
        return item.flat(Infinity)
      });

      let data = {
        ...(value?.chargeCategory && {
          "surchargeCategory": {
            "id": value?.chargeCategory?.id || 0,
            "version": value?.chargeCategory?.version || 0
          }
        }),
        ...(value?.portName && {
          "oceanPort": {
            "id": value?.portName?.id || 0,
            "version": value?.portName?.version || 0
          }
        }),
        ...(value?.terminalName && {
          "oceanPortTerminal": {
            "id": 1,
            "version": 0
          },
        }),
        ...(value?.movementType && { "movementType": value?.movementType?.value || "IMPORT" }),
        ...(value?.carrierName && {
          "tenantCarrier": {
            "id": value?.carrierName?.id || '',
            "version": value?.carrierName?.version || 0
          },
        }),
        ...(value?.vendorName && {
          "tenantVendor": {
            "id": value?.vendorName?.id || '',
            "version": value?.vendorName?.version || 0
          },
        }),
        ...(value?.validityFrom && { "validFrom": value?.validityFrom || 0 }),
        ...(value?.validityTo && { "validTo": value?.validityTo || 0 }),
        // "tenantVendorFCLSurchargeCategoryTerminals": [],
        "tenantVendorFCLSurchargeDetails": value?.mainBox?.map((item, mainindex) => {
          return {
            ...(item?.chargeCode && {
              "surchargeCode": {
                "id": item?.chargeCode?.id || '',
                "version": item?.chargeCode?.version || 0
              }
            }),
            ...(item?.chargeBasis && {
              "unitOfMeasurement": {
                "id": item?.chargeBasis?.id || '',
                "version": item?.chargeBasis?.version || 0
              }
            }),
            ...(item?.addTerms?.paymentTerm && { "paymentTerm": item?.addTerms?.paymentTerm || "PREPAID" }),
            ...(item?.addTerms?.isStandard && { "standard": item?.addTerms?.isStandard === 'incidental' ? false : true }),
            ...(item?.calculationType && { "calculationType": item?.calculationType || "FLAT" }),
            ...(item?.minValue && { "minimumValue": item?.minValue || 0 }),
            ...(item?.tax && { "applicableTax": item?.tax || 0 }),

            "tenantVendorFCLSurchargeValues": spreadSurArray?.[mainindex],

            ...(item?.addTerms?.incoTerm?.length !== 0 && {
              "tenantVendorFCLSurchargeDetailIncoterms": item?.addTerms?.incoTerm?.map((incoterm, index) => {
                return {
                  "incoterm": {
                    "id": incoterm?.value,
                    "version": incoterm?.version
                  }
                }
              })
            }),
            ...(item?.addTerms?.commodity?.length !== 0 && {
              "tenantVendorFCLSurchargeDetailCommodities": item?.addTerms?.commodity?.map((commodity, index) => {
                return {
                  "commodity": {
                    "id": commodity?.id || (index + 1),
                    "version": commodity?.version || 0
                  }
                }
              })
            })
          }
        })
      }

      dispatch(postPortLocalChargesData(data));
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch({ type: GET_CARGO_TYPE_DATA });
    dispatch({ type: GET_CONTAINER_DATA });
  }, [dispatch])

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
                        <label className="form-label">Charge Category<span className='required_star'>*</span></label>
                        <Select
                          value={formik.values.chargeCategory || ""}
                          onChange={(e) => {
                            formik.setFieldValue(`chargeCategory`, e);
                          }}
                          name="chargeCategory"
                          options={surchargeCategory_data?.filter((option) => (option?.value !== "DESTINATION TRANSPORTATION" && option?.value !== "ORIGIN TRANSPORTATION" && option?.value !== "OCEAN SURCHARGE")) || []}
                          placeholder={"Select Charge Category"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Port Name */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <label className="form-label">Port Name<span className='required_star'>*</span></label>
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
                        <label className="form-label">Movement Type<span className='required_star'>*</span></label>
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
                        <label className="form-label">Carrier Name<span className='required_star'>*</span></label>
                        <Select
                          name="carrierName"
                          value={formik.values.carrierName || ""}
                          onChange={(e) => {
                            formik.setFieldValue(`carrierName`, e);
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
                        <label className="form-label">Validity From<span className='required_star'>*</span></label>
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
                        <label className="form-label">Validity To<span className='required_star'>*</span></label>
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
                        {(arrayHelpers, i) => {
                          return (
                            <React.Fragment key={i}>
                              {formik.values.mainBox.length > 0 &&
                                formik.values.mainBox.map((item, index) => (
                                  <Card key={index} className={`sub_field_wrap ${isAnyValueEmpty(formik.values, ['terminalName', 'vendorName']) ? 'disabled' : ''}`}>
                                    <CardBody>
                                      <div className="row mb-3" key={index}>
                                        {/* Charge Code */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Surcharge Code<span className='required_star'>*</span></label>
                                            <Select
                                              name={`mainBox[${index}].chargeCode`}
                                              value={formik.values.mainBox[index].chargeCode || ""}
                                              onChange={(e) => {
                                                if (e.label == "Add New") {
                                                  navigate("/freight/ocean/upload/fcl-pl/add-new", { state: { id: 'fcl-pl' } })
                                                }
                                                formik.setFieldValue(`mainBox[${index}].chargeCode`, e);
                                              }}
                                              options={[
                                                ...(surchargeCode_data?.filter((item) => {
                                                  if (formik.values.chargeCategory?.value === "LOCAL SURCHARGE" || formik.values.chargeCategory?.value === "PORT SURCHARGE") {
                                                    return item?.value === "SEAL" || item?.value === "THC" || item?.surchargeCategory === formik.values.chargeCategory?.value;
                                                  } else {
                                                    return item?.surchargeCategory === formik.values.chargeCategory?.value;
                                                  }
                                                })),
                                                { label: "Add New", value: "Add New" }
                                              ]}
                                              classNamePrefix="select2-selection form-select"
                                            />
                                          </div>
                                        </div>

                                        {/* Charge Basis */}
                                        <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-2">
                                          <div className="mb-3">
                                            <label className="form-label"> Surcharge Basis<span className='required_star'>*</span></label>
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
                                            <label className="form-label"> Calculation Type<span className='required_star'>*</span></label>
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
                                            <label className="form-label"> Currency<span className='required_star'>*</span></label>
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
                                            <label className="form-label"> Min Value </label>
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
                                            <label className="form-label"> Tax </label>
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
                                          {(arrayHelpersTwo, i) => {
                                            return (
                                              <Card key={i}>
                                                <CardBody>
                                                  {item.subBox.length > 0 && item.subBox.map((subItem, subIndex) => {
                                                    return (
                                                      <React.Fragment key={subIndex}>
                                                        {formik.values.mainBox[index].calculationType && (
                                                          <div className="row mb-3">
                                                            {/* Cargo Type */}
                                                            {(formik.values.mainBox[index].calculationType === "FLAT" || formik.values.mainBox[index].calculationType === "PERCENTAGE") && (
                                                              <div className="col-md-3 mb-2">
                                                                <label className="form-label"> Cargo Type<span className='required_star'>*</span></label>
                                                                <Select
                                                                  name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                                                  value={formik.values.mainBox[index].subBox[subIndex].cargoType || ""}
                                                                  onChange={(e) => {
                                                                    formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].cargoType`, e);
                                                                  }}
                                                                  options={[...cargoType_data]}
                                                                  classNamePrefix="select2-selection form-select"
                                                                />
                                                              </div>
                                                            )}
                                                            {/* Container Type */}
                                                            <div className="col-md-3 mb-2">
                                                              <label className="form-label"> Container Type<span className='required_star'>*</span></label>
                                                              <Select
                                                                name={`mainBox[${index}].subBox[${subIndex}].containerType`}
                                                                value={formik.values.mainBox[index].subBox[subIndex].containerType || ""}
                                                                onChange={(e) => {
                                                                  formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].containerType`, e);
                                                                }}
                                                                options={subItem?.cargoType?.value === "GENERAL" ? [...generalContainerOpt, { label: "ALL", value: "all" }] : subItem?.cargoType?.value === "REFRIGERATED" ? [...refrigeContainerOpt, { label: "ALL", value: "all" }] : [...container_data, { label: "ALL", value: "all" }]}
                                                                classNamePrefix="select2-selection form-select"
                                                              />
                                                            </div>

                                                            {/* From Slab */}
                                                            {formik.values.mainBox[index].calculationType === "SLAB" && (
                                                              <div className="col-md-2 mb-2">
                                                                <label className="form-label"> From Slab<span className='required_star'>*</span></label>
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
                                                                <label className="form-label"> To Slab<span className='required_star'>*</span></label>
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
                                                              <label className="form-label"> Rate<span className='required_star'>*</span></label>
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
                                                      </React.Fragment>
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
                                      calculationType: "FLAT",
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
                                  disabled={isAnyValueEmpty(formik.values, ['terminalName', 'vendorName'])}
                                >
                                  <i className="bx bx-plus align-middle me-1"></i> Add
                                </button>
                              </div>
                            </React.Fragment>
                          );
                        }}
                      </FieldArray>
                    </FormikProvider>

                    <ModalAddTerm
                      modal={addTermsModal}
                      onCloseClick={onCloseClick}
                      setTermHandler={setTermHandler}
                    />     
                    {/* {console.log(isAnyValueEmptyInArray(formik.values.mainBox, ['addTerms', 'minValue', 'subBox']), "port")}
                    {console.log(isAnyValueEmptyInArray(formik.values.mainBox[0].subBox, ['fromSlab','toSlab']), "port")}                */}
                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mt-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={isAnyValueEmpty(formik.values, ['terminalName', 'vendorName'])}> Save </button>
                          {/* <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={!(!isAnyValueEmpty(formik.values.mainBox, ['minValue','addTerms']) && !isAnyValueEmptyInArray(formik.values.mainBox[0].subBox))}> Save </button> */}
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
