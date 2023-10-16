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
  chargeCategory:"",
  portName:"",
  terminalName:"",
  movementType:"",
  carrierName:"",
  vendorName:"",
  validityFrom:"",
  validityTo:"",

  mainBox:[
    {
      chargeCode:"",
      chargeBasis:"",
      calculationType:"",
      slabBasis:"",
      currency:"",
      minValue:"",
      addTerms:false,
      subBox:[
        {
          cargoType:"",
          containerType:"",
          fromSlab:"",
          toSlab:"",
          rate:"",
        }
      ]
    }
  ],
}

export default function UploadPortLocalChargesData() {
  const navigate = useNavigate();

 const formik = useFormik({
  initialValues:initialValue,
  onSubmit:(value)=>{
    console.log(value,"value");
  }
 })

 const removeMainboxHandler = ()=>{}

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
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Charge Category
                            </Label>
                            <div className="col-9">
                              <Select
                                value={formik.values.chargeCategory}
                                onChange={formik.handleChange}
                                name="chargeCategory"
                                // options={surchargeCategory}
                                placeholder={"Select Charge Category"}
                                classNamePrefix="select2-selection form-select"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Port Name */}
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Port Name
                            </Label>
                            <div className="col-9">
                              <Select
                                // value={addDetails.surchargeAliasCode}
                                name="portName"
                                value={formik.values.portName}
                                onChange={formik.handleChange}
                                // onChange={(opt) => {
                                //   handleSelectGroup("surchargeAliasCode", opt);
                                // }}
                                // options={surchargeAliasCode}
                                placeholder={"Select Port Name"}
                                classNamePrefix="select2-selection form-select"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Terminal Name */}
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Terminal Name
                            </Label>
                            <div className="col-9">
                              <Select
                                // value={addDetails.surchargeAliasDesc}
                                name="terminalName"
                                value={formik.values.terminalName}
                                onChange={formik.handleChange}
                                // onChange={(opt) => {
                                //   handleSelectGroup("surchargeAliasDesc", opt);
                                // }}
                                // options={surchargeAliasDesc}
                                placeholder={"Select Terminal Name"}
                                classNamePrefix="select2-selection form-select"
                              />
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="row">

                        {/* Movement Type */}
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Movement Type
                            </Label>
                            <div className="col-9">
                              <Select
                                // value={addDetails.surchargeCategory}
                                name="movementType"
                                value={formik.values.movementType}
                                onChange={formik.handleChange}
                                // onChange={(opt) => {
                                //   handleSelectGroup("surchargeCategory", opt);
                                // }}
                                // options={surchargeCategory}
                                placeholder={"Select Movement Type"}
                                classNamePrefix="select2-selection form-select"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Carrier Name */}
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Carrier Name
                            </Label>
                            <div className="col-9">
                              <Select
                                // value={addDetails.surchargeAliasCode}
                                name="carrierName"
                                value={formik.values.carrierName}
                                onChange={formik.handleChange}
                                // onChange={(opt) => {
                                //   handleSelectGroup("surchargeAliasCode", opt);
                                // }}
                                // options={surchargeAliasCode}
                                placeholder={"Select Carrier Name"}
                                classNamePrefix="select2-selection form-select"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Vendor Name */}
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Vendor Name
                            </Label>
                            <div className="col-9">
                              <Select
                                // value={addDetails.surchargeAliasDesc}
                                name="vendorName"
                                value={formik.values.vendorName}
                                onChange={formik.handleChange}
                                // onChange={(opt) => {
                                //   handleSelectGroup("surchargeAliasDesc", opt);
                                // }}
                                // options={surchargeAliasDesc}
                                placeholder={"Select Vendor Name"}
                                classNamePrefix="select2-selection form-select"
                              />
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="row">

                        {/* Validity From */}
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Validity From
                            </Label>
                            <div className="col-9">
                              <input
                                type="date"
                                name="validityFrom"
                                id="validity_from"
                                value={formik.values.validityFrom}
                                onChange={formik.handleChange}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Validity To */}
                        <div className="col-4 mb-4">
                          <div className="row">
                            <Label
                              htmlFor="horizontal-firstname-input"
                              className="col-sm-3 col-form-label"
                            >
                              Validity To
                            </Label>
                            <div className="col-9">
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
                        </div>
                    </div>

                    <div className="p-4"></div>

                    {/* Field Array started------------------------------------------------- */}

                    <FormikProvider value={formik}>
                    <FieldArray name="mainBox">
                      {(arrayHelpers)=>{
                        return(<>
                        {formik.values.mainBox.length > 0 &&
                      formik.values.mainBox.map((item,index)=>{
                        return(<>
                        <hr/>
                        <div className="d-flex" key={index}>

                            {/* Charge Code */}
                              <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">Charge Code</label>
                                  <Select
                                    name={`mainBox[${index}].chargeCode`}
                                    value={chargeCode ? chargeCode.find(option => option.value === formik.values.mainBox[index].chargeCode) : ''}
                                    onChange={e=>{formik.setFieldValue(`mainBox[${index}].chargeCode`,e.value)}}
                                    options={chargeCode}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>

                              {/* Charge Basis */}
                              <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">Charge Basis</label>
                                  <Select
                                    name={`mainBox[${index}].chargeBasis`}
                                    value={chargeBasis ? chargeBasis.find(option => option.value === formik.values.mainBox[index].chargeBasis) : ''}
                                    onChange={e=>{formik.setFieldValue(`mainBox[${index}].chargeBasis`,e.value)}}
                                    options={chargeBasis}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>

                              {/* Calculation Type */}
                              <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">Calculation Type</label>
                                  <Select
                                    name={`mainBox[${index}].calculationType`}
                                    value={calculationType ? calculationType.find(option => option.value === formik.values.mainBox[index].calculationType) : ''}
                                    onChange={e=>{formik.setFieldValue(`mainBox[${index}].calculationType`,e.value)}}
                                    options={calculationType}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>

                              {/* Slab Basis */}
                              {/* {console.log(formik.values.mainBox[index].calculationType,"<-------val<<")} */}
                              {/* {console.log(formik.values,"<-------val<<")} */}
                              {formik.values.mainBox[index].calculationType === "Slab" &&
                              <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">Slab Basis</label>
                                  <Select
                                    name={`mainBox[${index}].slabBasis`}
                                    value={slabBasis ? slabBasis.find(option => option.value === formik.values.mainBox[index].slabBasis) : ''}
                                    onChange={e=>{formik.setFieldValue(`mainBox[${index}].slabBasis`,e.value)}}
                                    options={slabBasis}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>}

                              {/* Currency */}
                              <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">Currency</label>
                                  <Select
                                    name={`mainBox[${index}].currency`}
                                    value={slabBasis ? slabBasis.find(option => option.value === formik.values.mainBox[index].currency) : ''}
                                    onChange={e=>{formik.setFieldValue(`mainBox[${index}].currency`,e.value)}}
                                    options={currency}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>

                              {/* Min Value */}
                              <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">Min Value</label>
                                  <Input
                                  type="text"
                                    name={`mainBox[${index}].minValue`}
                                    value={formik.values.mainBox[index].minValue}
                                    onChange={formik.handleChange}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>

                              {/* checkbox */}
                              <div className="d-flex w-100 mx-1 align-items-center justify-content-center">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="formCheck1"
                                      name={`mainBox[${index}].addTerms`}
                                      onChange={e=>{formik.setFieldValue(`mainBox[${index}].addTerms`,e.target.checked)}}
                                      // checked={formik.values.mainBox[index].addTerms}
                                    />
                                    <label className="form-check-label" htmlFor="formCheck1">
                                    Add Terms
                                    </label>
                                </div>
                              </div>

                              {/* add remove */}
                              <div>
                                <div>
                                  <button onClick={()=>{
                                    arrayHelpers.push({
                                      chargeCode:"",
                                      chargeBasis:"",
                                      calculationType:"",
                                      slabBasis:"",
                                      currency:"",
                                      minValue:"",
                                      addTerms:false,
                                      subBox:[
                                        {
                                          cargoType:"",
                                          containerType:"",
                                          fromSlab:"",
                                          toSlab:"",
                                          rate:null
                                        }
                                      ]
                                    })
                                  }}>Add</button>
                                </div>
                                <div>
                                  {formik.values.mainBox.length > 1 && <button onClick={()=>{
                                    arrayHelpers.remove(index)
                                  }}>Remove</button>}
                                </div>
                              </div>

                        </div>

                        {/* SUB Field Array started------------------------------------------------- */}
                        <FieldArray name={`mainBox[${index}].subBox`}>
                          {(arrayHelpersTwo)=>{
                            return(<>
                            {item.subBox.length > 0 &&
                            item.subBox.map((subItem,subIndex)=>{
                              return(<>

{/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                              {formik.values.mainBox[index].calculationType && <div className="d-flex">
                            {/* Cargo Type */}
                                {(formik.values.mainBox[index].calculationType === "Flat" || formik.values.mainBox[index].calculationType === "Percentage") && 
                                <div className="w-100 mx-1">
                                  <div className="mb-3">
                                    <label className="form-label">Cargo Type</label>
                                    <Select
                                      name={`mainBox[${index}].subBox[${subIndex}].cargoType`}
                                      value={cargoType ? cargoType.find(option => option.value === formik.values.mainBox[index].subBox[subIndex].cargoType):""}
                                      onChange={e=>{formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].cargoType`, e.value)}}
                                      options={cargoType}
                                      classNamePrefix="select2-selection form-select"
                                    />
                                  </div>
                                </div>}
                            
                            {/* Container Type */}
                                <div className="w-100 mx-1">
                                  <div className="mb-3">
                                    <label className="form-label">Container Type</label>
                                    <Select
                                      name={`mainBox[${index}].subBox[${subIndex}].containerType`}
                                      value={containerType ? containerType.find(option => option.value === formik.values.mainBox[index].subBox[subIndex].containerType):""}
                                      onChange={e=>{formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].containerType`, e.value)}}
                                      
                                      options={containerType}
                                      classNamePrefix="select2-selection form-select"
                                    />
                                  </div>
                                </div>

                            {/* From Slab */}
                                {formik.values.mainBox[index].calculationType === "Slab" &&
                                 <div className="w-100 mx-1">
                                  <div className="mb-3">
                                    <label className="form-label">From Slab</label>
                                    <Select
                                      name={`mainBox[${index}].subBox[${subIndex}].fromSlab`}
                                      value={fromSlab ? fromSlab.find(option => option.value === formik.values.mainBox[index].subBox[subIndex].fromSlab):""}
                                      onChange={e=>{formik.setFieldValue(`mainBox[${index}].subBox[${subIndex}].fromSlab`, e.value)}}
                                      
                                      options={fromSlab}
                                      classNamePrefix="select2-selection form-select"
                                    />
                                  </div>
                                </div>}

                              {/* To Slab */}
                              {formik.values.mainBox[index].calculationType === "Slab" &&
                               <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">To Slab</label>
                                  <Input
                                  type="text"
                                    name={`mainBox[${index}].subBox[${subIndex}].toSlab`}
                                    value={formik.values.mainBox[index].subBox[subIndex].toSlab}
                                    onChange={formik.handleChange}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>}

                              {/* Rate */}
                              <div className="w-100 mx-1">
                                <div className="mb-3">
                                  <label className="form-label">Rate</label>
                                  <Input
                                  type="text"
                                    name={`mainBox[${index}].subBox[${subIndex}].rate`}
                                    value={formik.values.mainBox[index].subBox[subIndex].rate}
                                    onChange={formik.handleChange}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                              </div>

                              {/* Add remove  */}
                              <div>
                                <div>
                                  <button onClick={()=>{
                                    arrayHelpersTwo.push({
                                      cargoType:"",
                                      containerType:"",
                                      fromSlab:"",
                                      toSlab:"",
                                      rate:"",
                                    })
                                  }}>Add</button>
                                </div>
                                <div>
                              <button onClick={()=>{
                                    arrayHelpersTwo.remove(subIndex)
                                  }}>Remove</button>
                                </div>
                              </div>

                          </div>}

    {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

                              </>)
                            })}
                            </>)
                          }}
                          
                          </FieldArray>
                        {/* SUB Field Array ended------------------------------------------------- */}
                        </>
                        )
                      })}
                        </>)
                      }}
                    
                    </FieldArray>
                    </FormikProvider>

                    

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
