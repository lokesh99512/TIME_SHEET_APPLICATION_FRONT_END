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
import { addUsersData } from "../../store/Settings/actions";

const role = [
  { label: "Mode", value: "Mode" },
];
const manager = [
  { label: "manager", value: "manager" },
];
const location = [
  { label: "mumbai", value: "mumbai" },
  { label: "delhi", value: "delhi" },
];

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  roles: [1],
  password: "",
  reEnterdPassword: "",
  roleNames: "",
  location: "",
}


export default function AddUserData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values) => {
      console.log(values, "<---values");
      dispatch(addUsersData(values))
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
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">First Name</label>
                          <div className="">
                            <Input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              className="form-control"
                              placeholder="Enter First Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Last Name</label>

                          <div className="">
                            <Input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={formik.values.lastName}
                              onChange={formik.handleChange}
                              className="form-control"
                              placeholder="Enter Last Name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Email Id</label>

                          <div className="">
                            <Input
                              type="text"
                              name="email"
                              id="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              className="form-control"
                              placeholder="Enter Email id"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Select Role
                          </label>
                          <div className="">
                            {/* <Select
                            value={
                                role
                                  ? role.find(
                                      (option) =>
                                        option.value ===
                                        formik.values.role
                                    )
                                  : ""
                              }
                              onChange={(e) => {
                                formik.setFieldValue("role", e.value);
                              }}
                              name="role"
                              id="role"
                              options={role}
                              placeholder={"Select Role"}
                              classNamePrefix="select2-selection form-select"
                            /> */}
                            <Select
                              value={formik.values.roles.map((selectedRole) =>
                                role.find((option) => option.value === selectedRole)
                              )}
                              onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions.map(
                                  (option) => option.value
                                );
                                formik.setFieldValue("roles", selectedValues);
                              }}
                              name="roles"
                              id="roles"
                              options={role}
                              isMulti
                              placeholder="Select Role"
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Enter Password</label>

                          <div className="">
                            <Input
                              type="password"
                              name="password"
                              // id="password1"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              className="form-control"
                              placeholder="Enter Password"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Re-Enter Password</label>

                          <div className="">
                            <Input
                              type="password"
                              name="reEnterdPassword"
                              // id="password2"
                              value={formik.values.reEnterdPassword}
                              onChange={formik.handleChange}
                              className="form-control"
                              placeholder="Re-Enter Password"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>

                      {/* added 2 new fields */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Manager
                          </label>
                          <div className="">
                            <Select
                              value={
                                manager
                                  ? manager.find(
                                    (option) =>
                                      option.value ===
                                      formik.values.roleNames
                                  )
                                  : ""
                              }
                              onChange={(e) => {
                                formik.setFieldValue("roleNames", e.value);
                              }}
                              name="manager"
                              id="roleNames"
                              options={manager}
                              placeholder={"Select Role"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Location
                          </label>
                          <div className="">
                            <Select
                              value={
                                location
                                  ? location.find(
                                    (option) =>
                                      option.value ===
                                      formik.values.location
                                  )
                                  : ""
                              }
                              onChange={(e) => {
                                formik.setFieldValue("location", e.value);
                              }}
                              name="location"
                              id="location"
                              options={location}
                              placeholder={"Select Role"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" type="button" onClick={formik.handleSubmit}>Save</button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary">Cancel</button>
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
