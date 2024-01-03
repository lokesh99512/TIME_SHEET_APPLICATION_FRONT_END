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
const DocumentDetailsForm = ({ documentsFormik }) => {
  return (
    <>
      <div className="text-center mb-4">
        <h5>Documents</h5>
      </div>
      <div>
        <FormikProvider value={documentsFormik}>
          <FieldArray name="document" validateOnChange={false}>
            {(arrayHelpers) => (
              <>
                {documentsFormik?.values?.document?.map((_, index) => (
                  <Card key={index}>
                    <CardBody>
                      {/* <form> */}
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Document Type</label>
                            <Input
                              type="text"
                              name={`document[${index}].documentType`}
                              value={
                                documentsFormik.values.document[index]
                                  .documentType
                              }
                              onChange={documentsFormik.handleChange}
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-5">
                          <div className="mb-3">
                            <label className="form-label">
                              Upload Documents
                            </label>
                            <Input
                              type="file"
                              name={`document[${index}].uploadDocument`}
                              //   value={}
                              onChange={documentsFormik.handleChange}
                              // onChange={(e)=>{}}
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-1 text-end">
                          {documentsFormik.values.document.length > 1 && (
                            <button
                              className="btn m-1 border"
                              // onClick={() => { arrayHelpers.remove(index); }}
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            >
                              <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* </form> */}
                    </CardBody>
                  </Card>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    arrayHelpers.push({
                      documentType: "",
                      uploadDocument: "",
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

export default DocumentDetailsForm;
