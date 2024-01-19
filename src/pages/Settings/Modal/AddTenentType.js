import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { postTenantLocationType } from "../../../store/Settings/actions";

const AddTenantLocationType = ({ modal, onCloseClick }) => {
    const [open, setOpen] = useState("");
    const dispatch = useDispatch()

    const AddTenentTypeFormik = useFormik({
        initialValues: {
            description: "",
            typeName: ""
        },
        onSubmit: (values) => {
            console.log(values);
            dispatch(postTenantLocationType(values))
            AddTenentTypeFormik.resetForm();
        }
    })


    return (
        <>
            <Modal
                isOpen={modal}
                toggle={onCloseClick}
                className="table_view_modal"
            >
                <ModalHeader tag="h4">
                    Add Tenant Location Type
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>

                <ModalBody>
                    <div className="table_view_data_wrap">
                        <div className="charge_details">
                            <div className="row mt-4 mb-2">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                                    <label className="form-label">Enter Type Name</label>
                                    <Input
                                        type="text"
                                        name="typeName"
                                        id="typeName"
                                        value={AddTenentTypeFormik?.values?.typeName}
                                        onChange={(e) => {
                                            AddTenentTypeFormik.setFieldValue("typeName", e.target.value);
                                        }}
                                        className="form-control"
                                        placeholder="Type Name"
                                    />
                                </div>

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                                    <label className="form-label">Description</label>
                                    <Input
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={AddTenentTypeFormik?.values?.description}
                                        onChange={(e) => {
                                            AddTenentTypeFormik.setFieldValue("description", e.target.value);
                                        }}
                                        className="form-control"
                                        placeholder="Description"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="d-flex justify-content-center">
                                    <div className="mb-3 mx-3 d-flex justify-content-end">
                                        <button
                                            type="submit"
                                            onClick={AddTenentTypeFormik.handleSubmit}
                                            className=" btn btn-primary"
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <div className="mb-3 mx-3 d-flex justify-content-end">
                                        <button className=" btn btn-primary" onClick={onCloseClick}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default AddTenantLocationType;
