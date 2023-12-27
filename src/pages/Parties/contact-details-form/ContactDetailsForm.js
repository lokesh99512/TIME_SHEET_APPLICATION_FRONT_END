import React from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Modal,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import {
  department,
  designation,
} from "../constants/venderEnumList";
const opCode = [{ label: "+91", value: "+91" }];

const phone = [{ label: "+91", value: "+91" }];


const title = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];

const ContactDetailsForm = ({ contactsFormik }) => {
  return (
    <>
      <div className="text-center mb-4">
        <h5>Contacts</h5>
      </div>
      <div>
        <FormikProvider value={contactsFormik}>
          <FieldArray name="contacts" validateOnChange={false}>
            {(arrayHelpers) => (
              <>
                {contactsFormik?.values?.contacts?.map((contact, index) => (
                  <Card key={index}>
                    <CardBody>
                      <div className="row">
                        <div className="col-10 col-md-11">
                          <div className="mb-3">
                            <label className="form-label">Contact Name</label>
                            <div className="row">
                              <div className="col-4 col-md-2">
                                <Select
                                  name={`contacts[${index}].title`}
                                  value={
                                    title
                                      ? title.find(
                                          (option) =>
                                            option.value ===
                                            contactsFormik?.values?.contacts[
                                              index
                                            ].title
                                        )
                                      : ""
                                  }
                                  onChange={(e) => {
                                    contactsFormik.setFieldValue(
                                      `contacts[${index}].title`,
                                      e.value
                                    );
                                  }}
                                  options={title}
                                  placeholder="Mr"
                                  classNamePrefix="select2-selection form-select"
                                />
                              </div>
                              <div className="col-8 col-md-6">
                                <Input
                                  type="text"
                                  name={`contacts[${index}].name`}
                                  value={
                                    contactsFormik.values.contacts[index].name
                                  }
                                  onChange={contactsFormik.handleChange}
                                  className="form-control"
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-1">
                          {contactsFormik.values.contacts.length > 1 && (
                            <button
                              className="btn m-1 border"
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            >
                              <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <div className="row">
                              <div className="col-4 col-md-3">
                                <Select
                                  name={`contacts[${index}].opCode`}
                                  value={
                                    opCode
                                      ? opCode.find(
                                          (option) =>
                                            option.value ===
                                            contactsFormik?.values?.contacts[
                                              index
                                            ].opCode
                                        )
                                      : ""
                                  }
                                  onChange={(e) => {
                                    contactsFormik.setFieldValue(
                                      `contacts[${index}].opCode`,
                                      e.value
                                    );
                                  }}
                                  options={phone}
                                  placeholder="+91"
                                  classNamePrefix="select2-selection form-select"
                                />
                              </div>
                              <div className="col-8 col-md-9">
                                <Input
                                  type="text"
                                  name={`contacts[${index}].phoneNumber`}
                                  value={
                                    contactsFormik.values.contacts[index]
                                      .phoneNumber
                                  }
                                  onChange={contactsFormik.handleChange}
                                  className="form-control"
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="">
                            <label className="form-label">Email Id</label>
                          </div>
                          <Input
                            type="text"
                            name={`contacts[${index}].emailId`}
                            value={
                              contactsFormik.values.contacts[index].emailId
                            }
                            onChange={contactsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Department</label>
                            <Select
                              name={`contacts[${index}].department`}
                              value={
                                department
                                  ? department.find(
                                      (option) =>
                                        option.value ===
                                        contactsFormik?.values?.contacts[index]
                                          .department
                                    )
                                  : ""
                              }
                              onChange={(e) => {
                                contactsFormik.setFieldValue(
                                  `contacts[${index}].department`,
                                  e.value
                                );
                              }}
                              options={department}
                              classNamePrefix="select2-selection form-select"
                              // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Designation</label>
                            <Select
                              name={`contacts[${index}].designation`}
                              value={
                                designation
                                  ? designation.find(
                                      (option) =>
                                        option.value ===
                                        contactsFormik?.values?.contacts[index]
                                          .designation
                                    )
                                  : ""
                              }
                              onChange={(e) => {
                                contactsFormik.setFieldValue(
                                  `contacts[${index}].designation`,
                                  e.value
                                );
                              }}
                              options={designation}
                              // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    arrayHelpers.push({
                      title: "",
                      name: "",
                      opCode: "",
                      phoneNumber: "",
                      emailId: "",
                      department: "",
                      designation: "",
                    })
                  }
                >
                  Add
                </button>
              </>
            )}
          </FieldArray>
        </FormikProvider>
      </div>
    </>
  );
};

export default ContactDetailsForm;
