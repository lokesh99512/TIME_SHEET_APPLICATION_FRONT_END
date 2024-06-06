import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, FormFeedback, Input, Row } from "reactstrap";
import * as Yup from "yup";
import { isAnyValueEmpty } from "../../../components/Common/CommonLogic";
import { optionBillableType, optionStatus } from "../../../common/data/procurement";
import { postAirPortLocalChargesData } from "../../../store/Procurement/actions";
export default function UploadProjectData() {
    const { airportLocalChargesDataById } = useSelector(state => state.procurement)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const { settings_users_data } = useSelector((state) => state.settings);


    const userInfo = Array.isArray(settings_users_data.content)
        ? settings_users_data.content.map((user) => ({
            label: `${user.email}`,
            value: user.id.toString(),
            id: user.id
        }))
        : [];

    const formik = useFormik({
        initialValues: {
            projectName: "",
            description: "",
            billableType: "",
            status: "",
            projectUsers: []
        },

        onSubmit: (value) => {
            let data = {
                description:value.description,
                name: value.projectName,
                projectUsers:value.projectUsers.map((item, index)=>{
                    return{
                        maUser:{id:item.id}
                    }
                }),
                ...(value?.billableType && { "billableType": value?.billableType?.value || "BILLABLE" }),
                ...(value?.status && { "status": value?.status?.value || "ACTIVE" }),
            }
            console.log(data);
            dispatch(postAirPortLocalChargesData(data));
            formik.resetForm();
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
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-lg-4">
                                                <label className="form-label">Project Name<span className='required_star'>*</span></label>
                                                <Input
                                                    type="text"
                                                    name="projectName"
                                                    placeholder={"Enter Project name"}
                                                    value={formik.values.projectName || ''}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            {/* Port Name */}
                                            <div className="col-md-6 col-lg-4">
                                                <label className="form-label">Billable Type<span className='required_star'>*</span></label>
                                                <Select
                                                    name="billableType"
                                                    value={formik?.values?.billableType || { label: "BILLABLE", value: "BILLABLE" }}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`billableType`, e);
                                                    }}
                                                    options={optionBillableType}
                                                    placeholder={"Select Port Name"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>

                                            {/* Carrier Name */}
                                            <div className="col-md-6 col-lg-4">
                                                <label className="form-label">Status<span className='required_star'>*</span></label>
                                                <Select
                                                    name="status"
                                                    value={formik.values.status || { label: "ACTIVE", value: "ACTIVE" }}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`status`, e);
                                                    }}
                                                    options={optionStatus}
                                                    placeholder={"Select Status"}
                                                    classNamePrefix="select2-selection form-select"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <Input
                                                type="text"
                                                name="description"
                                                placeholder={"Enter description name"}
                                                value={formik.values.description || ''}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Project Users<span className='required_star'>*</span></label>
                                            <Select
                                                name="projectUsers"
                                                value={formik?.values?.projectUsers}
                                                onChange={(e) => {
                                                    formik.setFieldValue(`projectUsers`, e);
                                                }}
                                                isMulti
                                                options={userInfo}
                                                placeholder={"Select Users"}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="d-flex justify-content-center">
                                                <div className="mt-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" onClick={formik.handleSubmit} disabled={isAnyValueEmpty(formik.values, ['projectName', 'projectUsers', 'status','billableType'])}> Save </button>
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
                </Container >
            </div >
        </>
    );
}
