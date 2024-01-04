import { FieldArray, FormikProvider } from "formik";
import React from "react";
import Select from "react-select";
import {
  Card,
  CardBody,
  Input
} from "reactstrap";
import { optionCustomerDocumentType } from "../../../../common/data/parties";
const DocumentDetailsForm = ({ documentsFormik }) => {

  const documentUploadHandler = (e, name) => {
    documentsFormik.setFieldValue(name, e.target.files[0]);
  }
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
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Document Type</label>
                            <Select
                              name={`document[${index}].documentType`}
                              value={documentsFormik?.values?.document[index]?.documentType || ''}
                              onChange={(e) => {
                                documentsFormik.setFieldValue(`document[${index}].documentType`, e);
                              }}
                              placeholder="Select Document Type"
                              options={optionCustomerDocumentType}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-5">
                          <div className="mb-3">
                            <label className="form-label"> Upload Documents </label>
                            <Input
                              type="file"
                              name={`document[${index}].uploadDocument`}
                              onChange={(e) => { documentUploadHandler(e, `document[${index}].uploadDocument`) }}
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-1 text-end">
                          {documentsFormik.values.document.length > 1 && (
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
