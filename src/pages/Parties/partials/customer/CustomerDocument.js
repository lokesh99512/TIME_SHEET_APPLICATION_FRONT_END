import { FieldArray, FormikProvider, useFormik } from 'formik';
import React from 'react';
import Select from 'react-select';
import { Card, CardBody, Input } from 'reactstrap';
import { optionCustomerDocumentType } from '../../../../common/data/parties';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postCustomerDocumentAction } from '../../../../store/Parties/Customer/action';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerDocument = () => {
    const { customer_id } = useSelector((state) => state?.customer);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const navigateState = useLocation();
    const documentsFormik = useFormik({
        initialValues: {
            document: [
                {
                    documentType: navigateState?.state?.data?.documents[0]?.documentType|| "",
                    uploadDocument: navigateState?.state?.data?.documents[0]?.documentPath || "",
                }
            ],
        },
        onSubmit: (values) => {
            console.log(values, "values Document---------------");
            // let data = {
            //     "id": customer_id?.id || '',
            //     "version": customer_id?.version || '',
            //     "documents": values?.document?.map((val) => {
            //         return {
            //             "documentType": val?.documentType?.value || '',
            //             "document": null,
            //             "documentPath": val?.uploadDocument?.name || '',
            //         }
            //     })
            // }
            let data = values?.document?.map((val) => {
                return {
                    docfile: val?.uploadDocument || '',
                    docdata: {
                        "id": customer_id?.id || '',
                        "version": customer_id?.version || '',
                        "documents": [
                            {
                                "documentType": val?.documentType?.value || '',
                                "document": null,
                                "documentPath": val?.uploadDocument?.name || '',
                            }
                        ]
                    }
                }
            })

            const formDataArray = data?.map((document) => {
                const formData = new FormData();
                formData.append('file', document.docfile); // Adjust the field name as needed
                formData.append('tenantCustomer', new Blob([JSON.stringify(document.docdata)], { type: "application/json" })); // Include other fields as needed
                return formData;
            });
            
            console.log(formDataArray, "data Document---------------");
            dispatch(postCustomerDocumentAction({documents: formDataArray}));
            documentsFormik.resetForm();
        },
    });

    const documentUploadHandler = (e, name) => {
        documentsFormik.setFieldValue(name, e.target.files[0]);
    }
    const onClickSkip = () => {
        toggleTabProgress(3);
        navigate('/vendors')
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
                                {documentsFormik?.values?.document?.map((document, index) => (
                                    <Card key={index}>
                                        <CardBody>
                                            <div className='row'>
                                                <div className="col-12 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Document Type</label>
                                                        <Select
                                                            name={`document[${index}].documentType`}
                                                                 value={
                                                                    optionCustomerDocumentType
                                                                      ? optionCustomerDocumentType.find(
                                                                        (option) =>
                                                                          option.value ===
                                                                          documentsFormik?.values?.document[index]?.documentType
                                                                      )
                                                                      : ""
                                                                  }
                                                            onChange={(e) => {
                                                                documentsFormik.setFieldValue(`document[${index}].documentType`, e);
                                                            }}
                                                            placeholder="Select Document Type"
                                                            options={optionCustomerDocumentType}
                                                            classNamePrefix="select2-selection form-select"
                                                        />
                                                        {/* <Input
                                                            type="text"
                                                            name={`document[${index}].documentType`}
                                                            value={documentsFormik.values.document[index].documentType}
                                                            onChange={documentsFormik.handleChange}
                                                            className="form-control"
                                                            placeholder=""
                                                        /> */}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-5">
                                                    <div className="mb-3">
                                                        <label className="form-label">Upload Documents</label>
                                                        <Input
                                                            type="file"
                                                            name={`document[${index}].uploadDocument`}
                                                            // value={}
                                                            onChange={(e) => { documentUploadHandler(e, `document[${index}].uploadDocument`) }}
                                                            className="form-control"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-1 text-end'>
                                                    {documentsFormik.values.document.length >
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
                                        </CardBody>
                                    </Card>
                                ))}
                                <button type="button" className='btn btn-primary'
                                    onClick={() => arrayHelpers.push({
                                        documentType: "",
                                        uploadDocument: '',
                                    })}>
                                    Add
                                </button>
                            </>
                        )}

                    </FieldArray>
                </FormikProvider>
            </div>
            <div className="d-flex justify-content-end mt-3" style={{ margin: "0 0 -62px" }}>
            <div className="d-flex align-items-center">
                    <a
                        className="me-3"
                        onClick={onClickSkip}
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        Skip
                    </a>
                <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center"
                    onClick={documentsFormik.handleSubmit}
                >
                    Save
                    <i className="bx bx-chevron-right ms-1"></i>
                </button>
            </div>
            </div>
        </>
    );
}

export default CustomerDocument;
