import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, FormFeedback, Input, Row, } from "reactstrap";
import { getUsersData } from "../../store/Settings/actions";
import { locations, rolesInfo } from "./constants/userInfo";
import useAddUser from "./hook/useAddUser";

export default function AddUserData() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { settings_users_data } = useSelector((state) => state.settings);
    const { roleData } = useSelector((state) => state.globalReducer);
    const navigateState = useLocation();
    
    useEffect(() => {
        dispatch(getUsersData());
    }, []);

    const managerInfo = Array.isArray(settings_users_data.content)
        ? settings_users_data.content.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id.toString(),
            id: user.id,
            version: user.version,
        }))
        : [];

    const { initialValues, schema, handleAddUser } = useAddUser(navigateState?.state);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: handleAddUser,
    });

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">

                        {/* back button */}
                        <button type="button" className="btn border mb-3" onClick={() => { navigate(-1); }} > Back </button>

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <div className="row">
                                            {/* First name */}
                                            <div className="col-md-6 col-lg-4 mb-4">
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
                                                        invalid={formik.touched.firstName && formik.errors.firstName ? true : false}
                                                    />
                                                    <FormFeedback> {formik.errors.firstName} </FormFeedback>
                                                </div>
                                            </div>

                                            {/* Last name */}
                                            <div className="col-md-6 col-lg-4 mb-4">
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
                                                        invalid={formik.touched.lastName && formik.errors.lastName ? true : false}
                                                    />
                                                    <FormFeedback> {formik.errors.lastName} </FormFeedback>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="col-md-6 col-lg-4 mb-4">
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
                                                        invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    <FormFeedback>{formik.errors.email}</FormFeedback>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            {/* Select Role */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Select Role</label>
                                                <div className="">
                                                    <Select
                                                        value={roleData.filter((role) => formik.values.roles.includes(role.id))}
                                                        onChange={(selectedOptions) => {
                                                            const selectedValues = selectedOptions.map((option) => option.id);
                                                            formik.setFieldValue("roles", selectedValues);
                                                        }}                                                        
                                                        name="roles"
                                                        id="roles"
                                                        options={roleData}
                                                        isMulti
                                                        placeholder="Select Role"
                                                        classNamePrefix="select2-selection form-select"
                                                        invalid={formik.touched.roles && formik.errors.roles ? true : false}
                                                        autoComplete="off"
                                                    />
                                                    <FormFeedback>{formik.errors.roles}</FormFeedback>
                                                </div>
                                            </div>

                                            {/* Password */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Enter Password</label>
                                                <div className="">
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                        placeholder="Enter Password"                                                        
                                                        invalid={formik.touched.password && formik.errors.password ? true : false}
                                                    />
                                                    <FormFeedback> {formik.errors.password} </FormFeedback>
                                                </div>
                                            </div>

                                            {/* Re-Enter Password */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label"> Re-Enter Password </label>
                                                <div className="">
                                                    <Input
                                                        type="password"
                                                        name="reEnterdPassword"
                                                        // id="password2"
                                                        value={formik.values.reEnterdPassword}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                        placeholder="Re-Enter Password"
                                                        invalid={formik.touched.reEnterdPassword && formik.errors.reEnterdPassword ? true : false}
                                                        autoComplete="off"
                                                    />
                                                    <FormFeedback> {formik.errors.reEnterdPassword} </FormFeedback>
                                                </div>
                                            </div>

                                            {/* Manager */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Manager</label>
                                                <div className="">
                                                    <Select
                                                        name="roleNames"
                                                        id="roleNames"
                                                        value={managerInfo ? managerInfo.find((option) => option.value === formik.values.roleNames) || "" : ""}
                                                        onChange={(e) => { formik.setFieldValue("roleNames", e.value); }}
                                                        options={managerInfo}
                                                        placeholder="Select Employee"
                                                        classNamePrefix="select2-selection form-select"
                                                        invalid={formik.touched.roleNames && formik.errors.roleNames ? true : false}
                                                    />
                                                    <FormFeedback> {formik.errors.roleNames} </FormFeedback>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <label className="form-label">Location</label>
                                                <div className="">
                                                    <Select
                                                        name="location"
                                                        id="location"
                                                        value={locations ? locations.find((option) => option.value === formik.values.location) || "" : ""}
                                                        onChange={(e) => { formik.setFieldValue("location", e.value); }}
                                                        options={locations}
                                                        placeholder={"Select locations"}
                                                        classNamePrefix="select2-selection form-select"
                                                        invalid={formik.touched.location && formik.errors.location ? true : false}
                                                    />
                                                    <FormFeedback> {formik.errors.location} </FormFeedback>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="d-flex justify-content-center">
                                                <div className="mb-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" type="submit" onClick={formik.handleSubmit} > Save </button>
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
