import Select from "react-select";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  FormFeedback,
} from "reactstrap";
import { getUsersData } from "../../store/Settings/actions";
import { rolesInfo, locations } from "./constants/userInfo";
import useAddUser from "./hook/useAddUser";

export default function AddUserData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings_users_data } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getUsersData());
  }, []);

  const managerInfo = Array.isArray(settings_users_data.content)
    ? settings_users_data.content.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id.toString(),
        id: user.id,
      }))
    : [];

  const { initialValues, schema, handleAddUser } = useAddUser();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: handleAddUser,
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
                              invalid={
                                formik.touched.firstName &&
                                formik.errors.firstName
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {formik.errors.firstName}
                            </FormFeedback>
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
                              invalid={
                                formik.touched.lastName &&
                                formik.errors.lastName
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {formik.errors.lastName}
                            </FormFeedback>
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
                              autoComplete="off"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              className="form-control"
                              placeholder="Enter Email id"
                              invalid={
                                formik.touched.email && formik.errors.email
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>{formik.errors.email}</FormFeedback>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Select Role</label>
                          <div className="">
                            <Select
                              value={rolesInfo.filter((role) =>
                                formik.values.roles.includes(role.id)
                              )}
                              onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions.map(
                                  (option) => option.id
                                );
                                formik.setFieldValue("roles", selectedValues);
                              }}
                              autoComplete="off"
                              name="roles"
                              id="roles"
                              options={rolesInfo}
                              isMulti
                              placeholder="Select Role"
                              classNamePrefix="select2-selection form-select"
                              invalid={
                                formik.touched.roles && formik.errors.roles
                                  ? true
                                  : false
                              }
                            />

                            <FormFeedback>{formik.errors.roles}</FormFeedback>
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
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              className="form-control"
                              placeholder="Enter Password"
                              autoComplete="off"
                              invalid={
                                formik.touched.password &&
                                formik.errors.password
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {formik.errors.password}
                            </FormFeedback>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Re-Enter Password
                          </label>

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
                              invalid={
                                formik.touched.reEnterdPassword &&
                                formik.errors.reEnterdPassword
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {formik.errors.reEnterdPassword}
                            </FormFeedback>
                          </div>
                        </div>
                      </div>

                      {/* added 2 new fields */}
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Manager</label>
                          <div className="">
                            <Select
                              name="roleNames"
                              id="roleNames"
                              value={
                                managerInfo
                                  ? managerInfo.find(
                                      (option) =>
                                        option.value === formik.values.roleNames
                                    ) ||""
                                  : ""
                              }
                              onChange={(e) => {
                                formik.setFieldValue("roleNames", e.value);
                              }}
                              options={managerInfo}
                              placeholder="Select Employee"
                              classNamePrefix="select2-selection form-select"
                              invalid={
                                formik.touched.roleNames &&
                                formik.errors.roleNames
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {formik.errors.roleNames}
                            </FormFeedback>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Location</label>
                          <div className="">
                            <Select
                              name="location"
                              id="location"
                              value={
                                locations
                                  ? locations.find(
                                      (option) =>
                                        option.value === formik.values.location
                                    ) || ""
                                  : ""
                              }
                              onChange={(e) => {
                                formik.setFieldValue("location", e.value);
                              }}
                              options={locations}
                              placeholder={"Select locations"}
                              classNamePrefix="select2-selection form-select"
                              invalid={
                                formik.touched.location &&
                                formik.errors.location
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {formik.errors.location}
                            </FormFeedback>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button
                            className=" btn btn-primary"
                            type="submit"
                            onClick={formik.handleSubmit}
                          >
                            Save
                          </button>
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
