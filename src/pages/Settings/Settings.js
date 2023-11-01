import React, { useState } from "react";
import { Card, CardBody, Container, Input, Row } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import ModalAddGST from "./Modal/ModalAddGST";
import SimpleBar from "simplebar-react";
import { useFormik } from "formik";

const placeOfSupply = [
  { label: "Jammu & Kashmir", value: "JK" ,Code:1 },
  { label: "Himachal Pradesh", value: "HP" ,Code:2 },
  { label: "Punjab", value: "PB" ,Code:3 },
  { label: "Chandigarh", value: "CH" ,Code:4 },
  { label: "Uttarakhand", value: "UT" ,Code:5 },
  { label: "Haryana", value: "HR" ,Code:6 },
  { label: "Delhi", value: "DL" ,Code:7 },
  { label: "Rajasthan", value: "RJ" ,Code:8 },
  { label: "Uttar Prades", value: "UP" ,Code:9 },
  { label: "Bihar", value: "BH" ,Code:10 },
  { label: "Sikkim", value: "SK" ,Code:11 },
  { label: "Arunachal Pradesh", value: "AR" ,Code:12 },
  { label: "Nagaland", value: "NL" ,Code:13 },
  { label: "Manipur", value: "MN" ,Code:14 },
  { label: "Mizoram", value: "MI" ,Code:15 },
  { label: "Tripura", value: "TR" ,Code:16 },
  { label: "Meghalaya", value: "ME" ,Code:17 },
  { label: "Assam", value: "AS" ,Code:18 },
  { label: "West Bengal", value: "WB" ,Code:19 },
  { label: "Jharkhand", value: "JH" ,Code:20 },
  { label: "Odisha", value: "OR" ,Code:21 },
  { label: "Chattisgarh", value: "CT" ,Code:22 },
  { label: "Madhya Pradesh", value: "MP" ,Code:23 },
  { label: "Gujarat", value: "GJ" ,Code:24 },
  { label: "Daman & Diu", value: "DD" ,Code:25 },
  { label: "Dadra & Nagar Haveli", value: "DN" ,Code:26 },
  { label: "Maharashtra", value: "MH" ,Code:27 },
  { label: "Andhra Pradesh", value: "AP" ,Code:28 },
  { label: "Karnataka", value: "KA" ,Code:29 },
  { label: "Goa", value: "GA" ,Code:30 },
  { label: "Lakshadweep", value: "LD" ,Code:31 },
  { label: "Kerala", value: "KL" ,Code:32 },
  { label: "Tamil Nadu", value: "TN" ,Code:33 },
  { label: "Puducherry", value: "PY" ,Code:34 },
  { label: "Andaman & Nicobar Island", value: "AN" ,Code:35 },
  { label: "Telangana", value: "TL" ,Code:36 },
  { label: "Hyderabad GST Commissionerate", value: "AD" ,Code:37 },
  { label: "Kurnool GST Commissionerate", value: "LA" ,Code:38 },
];

const initialValue ={
  gstNumber:"",
  placeOfSupply:"",
}


const Settings = () => {
  const [gstModal, setGstModal] = useState(false);
  const [viewGst, setViewGst] = useState(false);
  const [active, setActive] = useState("comapanyDetails");

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (value) => {
      console.log(value, "value");
    },
  });

  const onCloseClick = () => {
    setGstModal(false);
  };
  return (
    <>
      <div className="page-content settings_wrapper">
        <Container fluid>
          <Row>
            <div className="col-12 col-md-2">
              <Card className="h-100">
                <SimpleBar style={{ maxHeight: "100%" }}>
                  <div id="sidebar-menu" className="settings_sidebar">
                    <ul className="metismenu list-unstyled" id="side-menu">
                      <li>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M1.91075 7.88266C2.28004 6.74053 2.88839 5.69213 3.69109 4.80364C3.82683 4.65339 4.03978 4.59984 4.23044 4.66802L6.14873 5.35392C6.6688 5.53977 7.24107 5.26883 7.42692 4.74875C7.4452 4.69762 7.45927 4.64507 7.469 4.59173L7.83446 2.58573C7.8708 2.38627 8.02398 2.2285 8.22227 2.1863C8.80246 2.0628 9.39734 2 10 2C10.6023 2 11.1968 2.06273 11.7767 2.18607C11.9749 2.22824 12.1281 2.38591 12.1645 2.58529L12.531 4.59165C12.6301 5.13497 13.1509 5.4951 13.6942 5.39601C13.7476 5.38627 13.8002 5.37219 13.8512 5.35395L15.7696 4.66802C15.9602 4.59984 16.1732 4.65339 16.3089 4.80364C17.1116 5.69213 17.72 6.74053 18.0893 7.88266C18.1516 8.07534 18.0915 8.28658 17.9371 8.41764L16.3823 9.73773C15.9613 10.0952 15.9098 10.7263 16.2673 11.1473C16.3024 11.1887 16.3409 11.2271 16.3823 11.2623L17.9371 12.5824C18.0915 12.7134 18.1516 12.9247 18.0893 13.1173C17.72 14.2595 17.1116 15.3079 16.3089 16.1964C16.1732 16.3466 15.9602 16.4002 15.7696 16.332L13.8513 15.6461C13.3312 15.4602 12.759 15.7312 12.5731 16.2512C12.5548 16.3024 12.5408 16.3549 12.531 16.4085L12.1645 18.4147C12.1281 18.6141 11.9749 18.7718 11.7767 18.8139C11.1968 18.9373 10.6023 19 10 19C9.39734 19 8.80246 18.9372 8.22227 18.8137C8.02398 18.7715 7.8708 18.6137 7.83446 18.4143L7.46902 16.4084C7.36993 15.865 6.84916 15.5049 6.30583 15.604C6.25241 15.6137 6.19987 15.6278 6.14881 15.6461L4.23044 16.332C4.03978 16.4002 3.82683 16.3466 3.69109 16.1964C2.88839 15.3079 2.28004 14.2595 1.91075 13.1173C1.84845 12.9247 1.90852 12.7134 2.06289 12.5824L3.61773 11.2623C4.03872 10.9048 4.09021 10.2737 3.73274 9.85274C3.69759 9.81135 3.65913 9.77288 3.61775 9.73775L2.06289 8.41764C1.90852 8.28658 1.84845 8.07534 1.91075 7.88266ZM8.00001 10.5C8.00001 11.6046 8.89544 12.5 10 12.5C11.1046 12.5 12 11.6046 12 10.5C12 9.39543 11.1046 8.5 10 8.5C8.89544 8.5 8.00001 9.39543 8.00001 10.5Z" fill="#6264A0" />
                </svg> */}
                        <span>
                          <a
                            href="#comapanyDetails"
                            onClick={() => setActive("comapanyDetails")}
                            className={
                              active === "comapanyDetails" ? "active" : ""
                            }
                          >
                            Company Details
                          </a>
                        </span>
                      </li>
                      <li>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M1.91075 7.88266C2.28004 6.74053 2.88839 5.69213 3.69109 4.80364C3.82683 4.65339 4.03978 4.59984 4.23044 4.66802L6.14873 5.35392C6.6688 5.53977 7.24107 5.26883 7.42692 4.74875C7.4452 4.69762 7.45927 4.64507 7.469 4.59173L7.83446 2.58573C7.8708 2.38627 8.02398 2.2285 8.22227 2.1863C8.80246 2.0628 9.39734 2 10 2C10.6023 2 11.1968 2.06273 11.7767 2.18607C11.9749 2.22824 12.1281 2.38591 12.1645 2.58529L12.531 4.59165C12.6301 5.13497 13.1509 5.4951 13.6942 5.39601C13.7476 5.38627 13.8002 5.37219 13.8512 5.35395L15.7696 4.66802C15.9602 4.59984 16.1732 4.65339 16.3089 4.80364C17.1116 5.69213 17.72 6.74053 18.0893 7.88266C18.1516 8.07534 18.0915 8.28658 17.9371 8.41764L16.3823 9.73773C15.9613 10.0952 15.9098 10.7263 16.2673 11.1473C16.3024 11.1887 16.3409 11.2271 16.3823 11.2623L17.9371 12.5824C18.0915 12.7134 18.1516 12.9247 18.0893 13.1173C17.72 14.2595 17.1116 15.3079 16.3089 16.1964C16.1732 16.3466 15.9602 16.4002 15.7696 16.332L13.8513 15.6461C13.3312 15.4602 12.759 15.7312 12.5731 16.2512C12.5548 16.3024 12.5408 16.3549 12.531 16.4085L12.1645 18.4147C12.1281 18.6141 11.9749 18.7718 11.7767 18.8139C11.1968 18.9373 10.6023 19 10 19C9.39734 19 8.80246 18.9372 8.22227 18.8137C8.02398 18.7715 7.8708 18.6137 7.83446 18.4143L7.46902 16.4084C7.36993 15.865 6.84916 15.5049 6.30583 15.604C6.25241 15.6137 6.19987 15.6278 6.14881 15.6461L4.23044 16.332C4.03978 16.4002 3.82683 16.3466 3.69109 16.1964C2.88839 15.3079 2.28004 14.2595 1.91075 13.1173C1.84845 12.9247 1.90852 12.7134 2.06289 12.5824L3.61773 11.2623C4.03872 10.9048 4.09021 10.2737 3.73274 9.85274C3.69759 9.81135 3.65913 9.77288 3.61775 9.73775L2.06289 8.41764C1.90852 8.28658 1.84845 8.07534 1.91075 7.88266ZM8.00001 10.5C8.00001 11.6046 8.89544 12.5 10 12.5C11.1046 12.5 12 11.6046 12 10.5C12 9.39543 11.1046 8.5 10 8.5C8.89544 8.5 8.00001 9.39543 8.00001 10.5Z" fill="#6264A0" />
                </svg> */}
                        <span>
                          <a
                            href="#taxDetails"
                            onClick={() => setActive("taxDetails")}
                            className={active === "taxDetails" ? "active" : ""}
                          >
                            Tax Details
                          </a>
                        </span>
                      </li>
                      <li>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M1.91075 7.88266C2.28004 6.74053 2.88839 5.69213 3.69109 4.80364C3.82683 4.65339 4.03978 4.59984 4.23044 4.66802L6.14873 5.35392C6.6688 5.53977 7.24107 5.26883 7.42692 4.74875C7.4452 4.69762 7.45927 4.64507 7.469 4.59173L7.83446 2.58573C7.8708 2.38627 8.02398 2.2285 8.22227 2.1863C8.80246 2.0628 9.39734 2 10 2C10.6023 2 11.1968 2.06273 11.7767 2.18607C11.9749 2.22824 12.1281 2.38591 12.1645 2.58529L12.531 4.59165C12.6301 5.13497 13.1509 5.4951 13.6942 5.39601C13.7476 5.38627 13.8002 5.37219 13.8512 5.35395L15.7696 4.66802C15.9602 4.59984 16.1732 4.65339 16.3089 4.80364C17.1116 5.69213 17.72 6.74053 18.0893 7.88266C18.1516 8.07534 18.0915 8.28658 17.9371 8.41764L16.3823 9.73773C15.9613 10.0952 15.9098 10.7263 16.2673 11.1473C16.3024 11.1887 16.3409 11.2271 16.3823 11.2623L17.9371 12.5824C18.0915 12.7134 18.1516 12.9247 18.0893 13.1173C17.72 14.2595 17.1116 15.3079 16.3089 16.1964C16.1732 16.3466 15.9602 16.4002 15.7696 16.332L13.8513 15.6461C13.3312 15.4602 12.759 15.7312 12.5731 16.2512C12.5548 16.3024 12.5408 16.3549 12.531 16.4085L12.1645 18.4147C12.1281 18.6141 11.9749 18.7718 11.7767 18.8139C11.1968 18.9373 10.6023 19 10 19C9.39734 19 8.80246 18.9372 8.22227 18.8137C8.02398 18.7715 7.8708 18.6137 7.83446 18.4143L7.46902 16.4084C7.36993 15.865 6.84916 15.5049 6.30583 15.604C6.25241 15.6137 6.19987 15.6278 6.14881 15.6461L4.23044 16.332C4.03978 16.4002 3.82683 16.3466 3.69109 16.1964C2.88839 15.3079 2.28004 14.2595 1.91075 13.1173C1.84845 12.9247 1.90852 12.7134 2.06289 12.5824L3.61773 11.2623C4.03872 10.9048 4.09021 10.2737 3.73274 9.85274C3.69759 9.81135 3.65913 9.77288 3.61775 9.73775L2.06289 8.41764C1.90852 8.28658 1.84845 8.07534 1.91075 7.88266ZM8.00001 10.5C8.00001 11.6046 8.89544 12.5 10 12.5C11.1046 12.5 12 11.6046 12 10.5C12 9.39543 11.1046 8.5 10 8.5C8.89544 8.5 8.00001 9.39543 8.00001 10.5Z" fill="#6264A0" />
                </svg> */}
                        <span>
                          <a
                            href="#bussinessType"
                            onClick={() => setActive("bussinessType")}
                            className={
                              active === "bussinessType" ? "active" : ""
                            }
                          >
                            Bussiness Type
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </SimpleBar>
              </Card>
            </div>

            {/* ------------------- */}
            <div className="col-12 col-md-10">
              <Card className="">
                <PerfectScrollbar className="p-4" style={{ height: "900px" }}>
                  {/* Comapany details  */}
                  <Card id="comapanyDetails" className="mb-4">
                    <CardBody>
                      <div>
                        <h5>Company Details</h5>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 col-md-5 mb-4">
                          <label className="form-label">Image</label>
                          <Input
                            type="file"
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-7 mb-4">
                          <label className="form-label">Company Name</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Contact Number</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Email id</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mb-4">
                          <label className="form-label">Company Address</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">City</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">State</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Zipcode</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Country</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary">Edit</button>
                          </div>
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary">Save</button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Tax Details  */}
                  <Card id="taxDetails" className="my-4">
                    <CardBody>
                      <div>
                        <h5>Tax Details</h5>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Pan Number</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">CIN Number</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mb-4">
                          <label className="form-label">Transporter ID</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">GST Number</label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                        {console.log(formik.values,"<--- Check val")}

                        <div className="col-10 col-md-5 mb-4">
                          <label className="form-label">Place of Supply</label>
                          <Select
                            value={placeOfSupply ? placeOfSupply.find((option) => option.value === formik.values.placeOfSupply) : ""}
                              name="placeOfSupply"
                              options={placeOfSupply}
                              placeholder={"Select Place of Supply"}
                              onChange={(e) => {
                                formik.setFieldValue(`placeOfSupply`, e.value);
                              }}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                        <div className="col-2 col-md-1">
                          <button
                            className="btn btn-primary mt-4"
                            onClick={() => setGstModal(true)}
                          >
                            <i className="bx bx-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div className="row mt-4 mb-2">
                        <div className="col-12 col-md-6 mb-4">
                          10 More GST available{" "}
                          <span
                            onClick={(prev) => {
                              setViewGst(true);
                            }}
                          >
                            View
                          </span>
                        </div>
                      </div>

                      {/* ----------- more GST --------------- */}
                      {viewGst && (
                        <div className="row">
                          <div className="col-12 col-md-6 mb-4">
                            <label className="form-label">GST Number</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-10 col-md-5 mb-4">
                            <label className="form-label">
                              Place of Supply
                            </label>
                            <Select
                              //   value={}
                              //   name=""
                              //   options={}
                              //   placeholder={""}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                          <div className="col-2 col-md-1">
                            <button
                              className="btn border mt-4"
                              // onClick={() => setGstModal(true)}
                            >
                              <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                            </button>
                          </div>
                        </div>
                      )}

                      {viewGst && (
                        <div className="row">
                          <div className="col-12 col-md-6 mb-4">
                            <label className="form-label">GST Number</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-10 col-md-5 mb-4">
                            <label className="form-label">
                              Place of Supply
                            </label>
                            <Select
                              //   value={}
                              //   name=""
                              //   options={}
                              //   placeholder={""}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                          <div className="col-2 col-md-1">
                            <button
                              className="btn border mt-4"
                              // onClick={() => setGstModal(true)}
                            >
                              <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                            </button>
                          </div>
                        </div>
                      )}

                      {viewGst && (
                        <div className="row">
                          <div className="col-12 col-md-6 mb-4">
                            <label className="form-label">GST Number</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-10 col-md-5 mb-4">
                            <label className="form-label">
                              Place of Supply
                            </label>
                            <Select
                              //   value={}
                              //   name=""
                              //   options={}
                              //   placeholder={""}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                          <div className="col-2 col-md-1">
                            <button
                              className="btn border mt-4"
                              // onClick={() => setGstModal(true)}
                            >
                              <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ----------- more GST --------------- */}

                      <div className="row">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary">Edit</button>
                          </div>
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary">Save</button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Bussiness Type */}
                  <Card id="bussinessType" className="my-4 mb-auto">
                    <CardBody>
                      <div>
                        <h5>Bussiness Type</h5>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Industry Type</label>
                          <Select
                            //   value={}
                            //   name=""
                            //   options={}
                            //   placeholder={""}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Entity Type</label>
                          <Select
                            //   value={}
                            //   name=""
                            //   options={}
                            //   placeholder={""}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary">Edit</button>
                          </div>
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary">Save</button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </PerfectScrollbar>
              </Card>
            </div>
          </Row>
          <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} />
        </Container>
      </div>
    </>
  );
};

export default Settings;
