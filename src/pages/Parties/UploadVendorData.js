import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Container, Modal, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
// import fileData from "../../assets/extra/upload_Formats.xlsx";
import { useFormik } from "formik";
import { delete_icon } from "../../assets/images";
import { optionMultiDestination, optionSurchargesName } from "../../common/data/procurement";
import { isAnyValueEmpty } from "../../components/Common/CommonLogic";
import { postVendorContactAction, postVendorDetailsAction, postVendorDocumentAction } from "../../store/Parties/Vendor/action";
import { getCustomersCityData } from "../../store/Parties/actions";
import { BLANK_CARRIER_DATA } from "../../store/Procurement/actiontype";
import { getAllCompanyDetailData } from "../../store/Settings/actions";
import ContactDetailsForm from "./partials/vendor/ContactDetailsForm";
import DocumentDetailsForm from "./partials/vendor/DocumentDetailsForm";
import VenderDetails from "./partials/vendor/VenderDetails";

export default function UploadVendorData() {
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [progressValue, setProgressValue] = useState(25);

    const navigate = useNavigate();
    const [surcharges, setSurcharges] = useState([]);
    const { vendor_id, vendor_active_Tab } = useSelector((state) => state?.vendor);
    const { parties_city_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector(
        (state) => state?.parties
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCustomersCityData());
        dispatch(getAllCompanyDetailData());
    }, []);

    console.log(vendor_active_Tab,"vendor_active_Tab");

    useEffect(() => {
        setActiveTabProgress(vendor_active_Tab.tab)
        if (vendor_active_Tab.tab === 1) { setProgressValue(33) }
        if (vendor_active_Tab.tab === 2) { setProgressValue(66) }
        if (vendor_active_Tab.tab === 3) { setProgressValue(100); }
    }, [vendor_active_Tab]);

    const openSaveConfirmModal = () => {
        setOpenSaveModal(!openSaveModal);
    };

    const finalSaveButton = () => {
        setSurcharges([]);
        setActiveTabProgress(1);
        setProgressValue(25);
        dispatch({ type: BLANK_CARRIER_DATA });
        setOpenSaveModal(false);
    };

    const toggleTabProgress = (tab) => {
        if (activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 4) {
                setActiveTabProgress(tab);

                if (tab === 1) {
                    setProgressValue(25);
                }
                if (tab === 2) {
                    setProgressValue(50);
                }
                if (tab === 3) {
                    setProgressValue(75);
                }
                if (tab === 4) {
                    setProgressValue(100);
                }
            }
        }
        if (tab === 5) {
            openSaveConfirmModal();
        }
    };

    const companyDetailsFormik = useFormik({
        initialValues: {
            image: "",
            companyName: "",
            logo: "",
            address: "",
            city: null,
            state: null,
            country: null,
            zipcode: null,
            website: "",
            contactName: "",
            phoneNumber: "",
            email: "",
            department: "",
            designation: "",
            venderType: "",
            serviceType: "",
            CINnumber: "",
            GSTnumber: "",
            PANnumber: "",
            entityType: "",
            industryType: "",
        },
        onSubmit: async ({ image, ...value }) => {
            // console.log("Vendor Details", value);

            let countryVal = parties_country_details?.content?.filter((con) => con?.countryName === value?.country) || [];
            let cityVal = parties_city_details?.content?.filter((city) => city?.cityName === value?.city) || [];
            let stateVal = parties_state_details?.content?.filter((state) => state?.stateName === value?.state) || [];
            let pincodeVal = parties_pincode_details?.content?.filter((pin) => pin?.pin === value?.zipcode) || [];

            const projectUATRequestDTO = {
                name: value.companyName || "",
                logo: null,
                logoPath: image?.path || "",
                address: value.address || null,
                ...(pincodeVal?.length !== 0 && {
                    "pinCode": {
                        id: pincodeVal[0]?.id,
                        version: pincodeVal[0]?.version
                    },
                }),
                ...(cityVal?.length !== 0 && {
                    "city": {
                        id: cityVal[0]?.id,
                        version: cityVal[0]?.version
                    },
                }),
                ...(stateVal?.length !== 0 && {
                    "state": {
                        id: stateVal[0]?.id,
                        version: stateVal[0]?.version
                    },
                }),
                ...(countryVal?.length !== 0 && {
                    "country": {
                        id: countryVal[0]?.id,
                        version: countryVal[0]?.version
                    },
                }),
                website: value?.website || null,
                contactName: value?.contactName || null,
                contactNo: value?.phoneNumber || null,
                contactEmail: value?.email || null,
                department: value?.department || null,
                designation: value?.designation || null,
                vendorType: value?.venderType || null,
                serviceType: value?.serviceType || null,
                cin: value?.CINnumber || null,
                gst: value?.GSTnumber || null,
                pan: value?.PANnumber || null,
                entityType: value?.entityType || null,
                industryType: value?.industryType || null,
                addresses: [],
                contacts: [],
                documents: [],
            };

            console.log(projectUATRequestDTO, "projectUATRequestDTO");

            const formData = new FormData();

            formData.append('file', image);
            formData.append('tenantVendor', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));

            dispatch(postVendorDetailsAction(formData));
        },
    });
    const contactsFormik = useFormik({
        initialValues: {
            contacts: [
                {
                    title: "",
                    contactName: "",
                    contactNo: "",
                    contactEmail: "",
                    department: "",
                    designation: "",
                    opCode: ""
                },
            ],
        },
        onSubmit: (values) => {
            // console.log("contact page", values);
            let data = {
                "id": 85,
                "version": 0,
                contacts: values?.contacts?.map((val) => {
                    return {
                        "contactName": `${val?.title || ''} ${val?.contactName || ''}`,
                        "contactNo": val?.contactNo || '',
                        "contactEmail": val?.contactEmail || '',
                        "department": val?.department || '',
                        "designation": val?.designation || '',
                    }
                })
            }

            console.log(data, "vendor contact");
            dispatch(postVendorContactAction(data));
        },
    });
    const documentsFormik = useFormik({
        initialValues: {
            document: [
                {
                    documentType: "",
                    uploadDocument: "",
                },
            ],
        },
        onSubmit: (values) => {
            console.log("document submit", values);
            let data = values?.document?.map((val) => {
                return {
                    docfile: val?.uploadDocument || '',
                    docdata: {
                        "id": vendor_id?.id || '',
                        "version": vendor_id?.version || '',
                        "documents": [
                            {
                                "documentType": val?.documentType?.value || '',
                                "document": null,
                                "documentPath": val?.uploadDocument?.name || '',
                            }
                        ]
                    }
                }
            });

            const formDataArray = data?.map((document) => {
                const formData = new FormData();
                formData.append('file', document.docfile); // Adjust the field name as needed
                formData.append('tenantVendor', new Blob([JSON.stringify(document.docdata)], { type: "application/json" })); // Include other fields as needed
                return formData;
            });

            dispatch(postVendorDocumentAction({ documents: formDataArray }));
            // documentsFormik.resetForm();
        },
    });

    // ------------- dynamic field ------------------------
    const addHandler = () => {
        setSurcharges((s) => {
            return [
                ...s,
                {
                    surcharges_name: "",
                    destination: [],
                    payment_type: "prepaid",
                    gp1: "",
                    gp2: "",
                    hq1: "",
                    hq2: "",
                    rf1: "",
                    rf2: "",
                },
            ];
        });
    };
    const removeInputFields = (index) => {
        const rows = [...surcharges];
        rows.splice(index, 1);
        setSurcharges(rows);
    };

    const handleChange = (e, name, index) => {
        const list = [...surcharges];
        list[index][name] = e.target.value;
        setSurcharges(list);
    };

    const handleSelectGroup2 = useCallback(
        (opt, name, index) => {
            const list = [...surcharges];
            list[index][name] = opt;
            setSurcharges(list);
        },
        [surcharges]
    );

    const handleMultiSelectChange = useCallback(
        (selected, name, options, index) => {
            // Check if "Select All" is selected
            const list = [...surcharges];
            if (selected.some((option) => option.value === "selectAll")) {
                list[index][name] = options.filter(
                    (option) => option.value !== "selectAll"
                );
                setSurcharges(list);
                return;
            }
            list[index][name] = selected;
            setSurcharges(list);
        },
        [surcharges]
    );

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
                                        <div
                                            id="progrss-wizard"
                                            className="twitter-bs-wizard upload_freight_wrap"
                                        >
                                            {/* tabs */}
                                            <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 1, })} onClick={() => { toggleTabProgress(1); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="CompanyDetails" >
                                                            <i className="bx bx-list-ul"></i>
                                                            <UncontrolledTooltip placement="top" target="CompanyDetails" >
                                                                Company Details
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 2, })} onClick={() => { toggleTabProgress(2); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Contacts" >
                                                            <i className="bx bx-food-menu"></i>
                                                            <UncontrolledTooltip placement="top" target="Contacts" >
                                                                Contacts
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 3, })} onClick={() => { toggleTabProgress(3); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Documents" >
                                                            <i className="bx bx-book-bookmark"></i>
                                                            <UncontrolledTooltip placement="top" target="Documents" >
                                                                Documents
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>

                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTabProgress === 4, })}
                                                        onClick={() => { toggleTabProgress(4); }}
                                                    >
                                                        <div
                                                            className="step-icon"
                                                            data-bs-toggle="tooltip"
                                                            id="Communications"
                                                        >
                                                            <i className="bx bx-chat"></i>
                                                            <UncontrolledTooltip
                                                                placement="top"
                                                                target="Communications"
                                                            >
                                                                Communications
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </ul>

                                            {/* Progress Bar */}
                                            <div id="bar" className="mt-4">
                                                <Progress color="primary" striped animated value={progressValue} />
                                            </div>

                                            {/* Content */}
                                            <TabContent
                                                activeTab={activeTabProgress}
                                                className="twitter-bs-wizard-tab-content"
                                            >
                                                <TabPane tabId={1}>
                                                    {/* Vendor Details */}
                                                    <VenderDetails companyDetailsFormik={companyDetailsFormik} />
                                                </TabPane>
                                                <TabPane tabId={2}>
                                                    {/* Vendor Contacts Details */}
                                                    <ContactDetailsForm contactsFormik={contactsFormik} />
                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    {/* Vendor Document Details */}
                                                    <DocumentDetailsForm documentsFormik={documentsFormik} />
                                                </TabPane>

                                                <TabPane tabId={4}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Communications</h5>
                                                        </div>
                                                        <form>
                                                            {surcharges?.map((item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="upload_surcharges_row"
                                                                >
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="surcharges_name"
                                                                                    className="form-label"
                                                                                >
                                                                                    Select Surcharge Name
                                                                                </label>
                                                                                <Select
                                                                                    value={
                                                                                        optionSurchargesName
                                                                                            ? optionSurchargesName.find(
                                                                                                (obj) =>
                                                                                                    obj.value ===
                                                                                                    item.surcharges_name
                                                                                            )
                                                                                            : ""
                                                                                    }
                                                                                    name="surcharges_name"
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(
                                                                                            opt.value,
                                                                                            "surcharges_name",
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                    options={optionSurchargesName}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="destination"
                                                                                    className="form-label"
                                                                                >
                                                                                    Surcharge Applicable on destination
                                                                                </label>
                                                                                <Select
                                                                                    value={item.destination}
                                                                                    name="destination"
                                                                                    isMulti
                                                                                    options={optionMultiDestination}
                                                                                    onChange={(opt) => {
                                                                                        handleMultiSelectChange(
                                                                                            opt,
                                                                                            "destination",
                                                                                            optionMultiDestination,
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="btn_wrap">
                                                                        {surcharges.length !== 0 ? (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    removeInputFields(index);
                                                                                }}
                                                                                className="btn border p-0"
                                                                            >
                                                                                <img src={delete_icon} alt="Delete" />
                                                                            </button>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary add_btn d-flex align-items-center"
                                                                        onClick={() => {
                                                                            addHandler();
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        <i className="bx bx-plus me-2"></i> Add
                                                                        Charges
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                            <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-between">
                                                <li
                                                    className={`previous ${activeTabProgress === 1 ? "disabled" : ""
                                                        }`}
                                                >
                                                    <button
                                                        className={`d-flex align-items-center ${activeTabProgress === 1 ? "btn btn-primary disabled" : "btn btn-primary"}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress - 1);
                                                        }}
                                                    >
                                                        <i className="bx bx-chevron-left me-1"></i> Previous
                                                    </button>
                                                </li>

                                                <li
                                                    className={`${activeTabProgress === 1 ? isAnyValueEmpty(companyDetailsFormik?.values) ? "disabled" : "" : activeTabProgress === 2 ? isAnyValueEmpty(contactsFormik?.values) ? "disabled" : "" : ""}`}
                                                >
                                                    <button
                                                        type="submit"
                                                        className={`btn btn-primary d-flex align-items-center ${activeTabProgress === 0
                                                            ? isAnyValueEmpty(companyDetailsFormik?.values) ? "disabled" : ""
                                                            : activeTabProgress === 2 ? isAnyValueEmpty(contactsFormik?.values) ? "disabled" : "" : ""
                                                            }`}
                                                        onClick={() => {
                                                            if (activeTabProgress === 1) {
                                                                companyDetailsFormik.submitForm();
                                                            } else if (activeTabProgress === 2) {
                                                                contactsFormik.submitForm();
                                                            } else if (activeTabProgress === 3) {
                                                                documentsFormik.submitForm();
                                                            }
                                                        }}
                                                    >
                                                        {activeTabProgress === 3 ? ("Save") : (
                                                            <>
                                                                Next
                                                                <i className="bx bx-chevron-right ms-1"></i>
                                                            </>
                                                        )}
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            {/* modal */}
            <Modal
                isOpen={openSaveModal}
                toggle={() => {
                    openSaveConfirmModal();
                }}
                className="confirm_modal_wrap"
            >
                <div className="modal-header">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenSaveModal(false);
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body pb-5">
                    <h4 className="text-center">Are you sure?</h4>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={() => {
                            openSaveConfirmModal();
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            finalSaveButton();
                        }}
                        className="btn btn-primary "
                    >
                        Save changes
                    </button>
                </div>
            </Modal>
        </>
    );
}
