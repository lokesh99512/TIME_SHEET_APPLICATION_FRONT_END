import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, FormFeedback, Input, Row } from "reactstrap";
import * as Yup from "yup";
import { isAnyValueEmpty } from "../../../components/Common/CommonLogic";
import { optionBillableType, optionStatus } from "../../../common/data/procurement";
import { postAirlineChargesData } from "../../../store/Procurement/actions";

const terminalName = [];
export default function UploadTask() {

    const { airLineChargesDataById } = useSelector(state => state.procurement)
    const [addTermsModal, setAddTermsModal] = useState({ isOpen: false, id: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const { settings_users_data } = useSelector((state) => state.settings);

    const onCloseClick = () => {
        setAddTermsModal((prev) => ({ ...prev, isOpen: false, id: "" }));
    };

    const setTermHandler = (obj) => {
        formik.setFieldValue(`mainBox[${addTermsModal.id}].addTerms`, obj);
    };
    useEffect(() => {
        // dispatch({ type: GET_CARGO_TYPE_DATA });
        // dispatch({ type: GET_CONTAINER_DATA });
        // dispatch({ type: GET_UOM_DATA });
        // dispatch({ type: GET_AIR_LOCATION_TYPE });
        // dispatch({ type: GET_COMMODITY_DATA });
        // if (!!navigateState?.state?.id)
        //     dispatch(getAirPortLocalChargesById(navigateState?.state?.id))
    }, [])

    const userInfo = Array.isArray(settings_users_data.content)
        ? settings_users_data.content.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id.toString(),
            id: user.id,
            version: user.version,
        }))
        : [];

    const formik = useFormik({
        initialValues: {
            taskName: "",
            description: "",
            category: "",
            taskUsers: [],
            mainBox: [{
                subTaskName: "",
                description: "",
                subTaskUsers: [],
            }],
        },
        onSubmit: (value) => {
            let data = {
                ...(airLineChargesDataById && airLineChargesDataById?.id && {
                    id: airLineChargesDataById?.id || "",
                    version: airLineChargesDataById?.version || 0
                }),
                description: value.description,
                name: value.projectName,
                taskUsers: value.taskUsers.map((item, index) => {
                    return {
                        maUser: { id: item.id }
                    }
                }),
                project: { id: navigateState?.state?.id },
                "subTasks": value?.mainBox?.map((item, mainindex) => {
                    return {
                        ...(airLineChargesDataById && airLineChargesDataById?.id && item?.id && {
                            id: item.id || "",
                            version: item.version || 0
                        }),
                        description: value.description,
                        name: value.projectName,
                        subTaskUsers: value.subTaskUsers?.map((item, index) => {
                            return {
                                maUser: { id: item.id }
                            }
                        }),
                    }
                })
            }
            console.log(data);
            dispatch(postAirlineChargesData(data));
            // formik.resetForm();
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
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Task Name<span className='required_star'>*</span></label>
                                                <Input
                                                    type="text"
                                                    name="taskName"
                                                    placeholder={"Enter task name"}
                                                    value={formik.values.taskName || ''}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="form-label">Category<span className='required_star'>*</span></label>
                                                <Select
                                                    name="category"
                                                    value={formik?.values?.category}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(`category`, e);
                                                    }}
                                                    isMulti
                                                    options={userInfo}
                                                    placeholder={"Select Users"}
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
                                            <label className="form-label">Task Users<span className='required_star'>*</span></label>
                                            <Select
                                                name="taskUsers"
                                                value={formik?.values?.taskUsers}
                                                onChange={(e) => {
                                                    formik.setFieldValue(`taskUsers`, e);
                                                }}
                                                isMulti
                                                options={userInfo}
                                                placeholder={"Select Users"}
                                                classNamePrefix="select2-selection form-select"
                                            />
                                        </div>

                                        <hr />

                                        {/* Field Array started------------------------------------------------- */}
                                        <FormikProvider value={formik}>
                                            <FieldArray name="mainBox">
                                                {(arrayHelpers, i) => {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <Card key={i} className={`sub_field_wrap`}>
                                                                <CardBody>
                                                                    {formik.values.mainBox && formik.values.mainBox.length > 0 &&
                                                                        formik.values.mainBox.map((item, index) => (
                                                                            <div className="row" key={index}>
                                                                                {/* Charge Code */}
                                                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label">Sub Task Name</label>
                                                                                    <Input
                                                                                        type="text"
                                                                                        name={`mainBox[${index}].subTaskName"`}
                                                                                        placeholder={"Enter Sub Task Name"}
                                                                                        value={formik.values.mainBox[index].subTaskName || ''}
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`mainBox[${index}].subTaskName`, e.values);
                                                                                        }}
                                                                                    />
                                                                                </div>

                                                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label">Description</label>
                                                                                    <Input
                                                                                        type="text"
                                                                                        name={`mainBox[${index}].description"`}
                                                                                        placeholder={"Enter description"}
                                                                                        value={formik.values.mainBox[index].description || ''}
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`mainBox[${index}].description`, e.value);
                                                                                        }}
                                                                                    />
                                                                                </div>

                                                                                <div className="col-lg-5 col-md-4 col-sm-6 col-12 mb-2">
                                                                                    <label className="form-label"> Sub Task Users<span className='required_star'>*</span></label>
                                                                                    <Select
                                                                                        name={`mainBox[${index}].subTaskUsers`}
                                                                                        value={formik.values.mainBox[index].subTaskUsers}
                                                                                        onChange={(e) => {
                                                                                            formik.setFieldValue(`mainBox[${index}].subTaskUsers`, e);
                                                                                        }}
                                                                                        options={userInfo}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                        onBlur={formik.handleBlur}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-1 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-between">
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
                                                                        )
                                                                        )}
                                                                </CardBody>
                                                            </Card>

                                                            <div>
                                                                <button
                                                                    className="btn btn-primary m-1"
                                                                    onClick={() => {
                                                                        arrayHelpers.push({
                                                                            taskName: "",
                                                                            description: "",
                                                                            taskUsers: [],
                                                                            mainBox: [{
                                                                                subTaskName: "",
                                                                                description: "",
                                                                                subTaskUsers: [],
                                                                            }],
                                                                        });
                                                                    }}
                                                                // disabled={isAnyValueEmpty(formik.values, ['taskName', 'taskUsers'])}
                                                                >
                                                                    <i className="bx bx-plus align-middle me-1"></i> Add
                                                                </button>
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                }}
                                            </FieldArray>
                                        </FormikProvider>
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
                </Container >
            </div >
        </>
    );
}
