import classnames from "classnames";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
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
  { label: "ActivesurchargeCategory", value: "ActivesurchargeCategory" },
  { label: "surchargeCategory test", value: "surchargeCategory test" },
  { label: "Add New", value: "Add New" },
];
const chargeBasis = [
  { label: "surchargeAliasCodeABC", value: "surchargeAliasCodeABC" },
  { label: "AliasCode test", value: "AliasCode test" },
  { label: "Add New", value: "Add New" },
];
const calculationType = [
  { label: "Active", value: "Active" },
  { label: "In-Active", value: "In-Active" },
];

const initialValue = {
  chargeCategory:"",
  portName:"",
  terminalName:"",
  movementType:"",
  CarrierName:"",
  vendorName:"",
  validityFrom:"",
  validityTo:"",

  chargeCode:"",
  chargeBasis:"",
  calculationType:"",
  currency:"",
  slabBasis:"",
  minValue:"",
  addTerms:false,

  cargoType:"",
  containerType:"",
  fromSlab:"",
  toSlab:"",
  rate:0,
}

export default function UploadPortLocalChargesData() {
  const navigate = useNavigate();

 const formik = useFormik({
  initialValues:initialValue,
  onSubmit:(value)=>{
    console.log(value,"value");
  }
 })

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
                              // value={addDetails.surchargeCategory}
                              name="chargeCategory"
                              // onChange={(opt) => {
                              //   handleSelectGroup("surchargeCategory", opt);
                              // }}
                              // options={surchargeCategory}
                              onChange={formik.handleChange}
                              placeholder={"Select Charge Category"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

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
                              name="CarrierName"
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
                              className="form-control"
                              // value={carrierData.validity_from}
                              // onChange={(e) =>
                              //   handleSelectGroup("validity_from", e.target.value)
                              // }
                            />
                          </div>
                        </div>
                      </div>

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
                              className="form-control"
                              // value={carrierData.validity_to}
                              // onChange={(e) =>
                              //   handleSelectGroup("validity_to", e.target.value)
                              // }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4"></div>

                    <div className="row">
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label className="form-label">Charge Code</label>
                          <Select
                            // value={carrierData.rate_type}
                            name="chargeCode"
                            // onChange={(opt) => {
                            //   handleSelectGroup("rate_type", opt);
                            // }}
                            options={chargeCode}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label className="form-label">Charge Basis</label>
                          <Select
                            // value={carrierData.rate_source}
                            name="chargeBasis"
                            // onChange={(opt) => {
                            //   handleSelectGroup("rate_source", opt);
                            // }}
                            options={chargeBasis}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label className="form-label">Calculation Type</label>
                          <Select
                            // value={carrierData.rate_source}
                            name="calculationType"
                            // onChange={(opt) => {
                            //   handleSelectGroup("rate_source", opt);
                            // }}
                            options={calculationType}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label className="form-label">Currency</label>
                          <Select
                            // value={carrierData.rate_source}
                            name="currency"
                            // onChange={(opt) => {
                            //   handleSelectGroup("rate_source", opt);
                            // }}
                            // options={optionRateSource}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label className="form-label">Min Value</label>
                          <Input
                          type="text"
                            // value={carrierData.rate_source}
                            name="minValue"
                            // onChange={(opt) => {
                            //   handleSelectGroup("rate_source", opt);
                            // }}
                            // options={optionRateSource}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex align-items-center justify-content-center">
                      <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                      />
                      <label className="form-check-label" htmlFor="formCheck1">
                        Form Checkbox
                      </label>
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
