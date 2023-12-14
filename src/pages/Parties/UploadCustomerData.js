import classnames from 'classnames';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { Card, CardBody, Col, Container, Input, Modal, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import { delete_icon } from '../../assets/images';
import { optionMultiDestination, optionSurchargesName } from '../../common/data/procurement';
import { isAnyValueEmpty, isAnyValueEmptyInArray } from '../../components/Common/CommonLogic';
import { BLANK_CARRIER_DATA } from '../../store/Procurement/actiontype';
import FileUpload from './FileUpload';
import ModalAddGST from './Modal/ModalAddGST';
import ModalAddNewCustomerType from "./Modal/ModalAddNewCustomerType";
import ModalAddNewDepartment from './Modal/ModalAddNewDepartment';
import ModalAddNewDesignation from "./Modal/ModalAddNewDesignation";
import ModalAddNewEntityType from "./Modal/ModalAddNewEntityType";
import ModalAddNewIndustryType from "./Modal/ModalAddNewIndustryType";
import ModalAddNewKeyAccountManager from './Modal/ModalAddNewKeyAccountManager';
import ModalAddNewSalesEmployee from './Modal/ModalAddNewSalesEmployee';
import { optionCustcustomerType, optionCustdepartment, optionCustdesignation, optionCustentityType, optionCustindustryType, optionCustkeyAccountManager, optionCustopCode, optionCustsalesEmployee, optionCusttitle } from '../../common/data/settings';
import { useSelector } from 'react-redux';
import { getAllCustomerDetailsData, getAllPartiesData, getAllUserDetails, getCustomersCityData, getCustomersCountryData, getCustomersPincodeData, getCustomersStateData } from '../../store/Parties/actions';
import { getCompanyCountryData } from '../../store/Settings/actions';

export default function UploadCustomerData() {
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [progressValue, setProgressValue] = useState(14);
    const [selectedFiles, setselectedFiles] = useState([]);
    const [gstModal, setGstModal] = useState(false);
    const [departmentModal, setDepartmentModal] = useState(false);
    const [designationModal, setDesignationModal] = useState(false);
    const [salesEmployeeModal, setSalesEmployeeModal] = useState(false);
    const [keyAccountManagerModal, setKeyAccountManagerModal] = useState(false);
    const [entityTypeModal, setEntityTypeModal] = useState(false);
    const [industryTypeModal, setIndustryTypeModal] = useState(false);
    const [customerTypeModal, setCustomerTypeModal] = useState(false);
    const [modalAlldata,setModalAllData]= useState([])
    const navigate = useNavigate();
    const [surcharges, setSurcharges] = useState([]);
    const dispatch = useDispatch();
    const { tabName } = useParams();

    const openSaveConfirmModal = () => {
        console.log(companyDetailsFormik.values, "companyDetailsFormik.values");
        console.log(contactsFormik?.values?.contacts, "contactsFormik?.values?.contacts");
        console.log(documentsFormik?.values?.document, "documentsFormik?.values?.document");
        setOpenSaveModal(!openSaveModal);
    }

    const finalSaveButton = () => {
        setSurcharges([]);
        setActiveTabProgress(1);
        setProgressValue(14);
        setselectedFiles([]);
        dispatch({ type: BLANK_CARRIER_DATA });
        setOpenSaveModal(false);
    }

    const toggleTabProgress = (tab) => {
        if (activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 3) {
                setActiveTabProgress(tab)

                if (tab === 1) { setProgressValue(14) }
                if (tab === 2) { setProgressValue(28) }
                if (tab === 3) { setProgressValue(42); }
                if (tab === 4) { setProgressValue(56); }
                if (tab === 5) { setProgressValue(70); }
                if (tab === 6) { setProgressValue(85); }
                if (tab === 7) { setProgressValue(100); }
            }
        }
        if (tab === 4) {
            openSaveConfirmModal();
        }
    }

    // function handleAcceptedFiles(files) {
    //     if (files && files.length) {
    //         var file = files[0];
    //         var fileName = file.name;
    //         if (isExcelFile(fileName)) {
    //             setfileError("");
    //             files.map((file) =>
    //                 Object.assign(file, {
    //                     preview: URL.createObjectURL(file),
    //                     formattedSize: formatBytes(file.size),
    //                 })
    //             );
    //             setselectedFiles(files);
    //         } else {
    //             setfileError("The file type is not supported. Upload an Excel file.");
    //             setselectedFiles();
    //         }
    //     } else {
    //         setfileError("File is required");
    //     }
    // }

    // ----------forimik ----------

    const companyDetailsFormik = useFormik({
        initialValues: {
            companyName: "",
            image: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zipcode: "",
            website: "",

            title: "",
            contactName: "",
            opCode: "",
            phoneNumber: "",
            email: "",
            department: "",
            designation: "",
            salesEmployee: "",
            keyAccountManager: "",

            CINnumber: "",
            GSTnumber: "",
            PANnumber: "",
            entityType: "",
            industryType: "",
            customerType: "",
        },
        onSubmit: async ({ image, ...values }) => {
            console.log(image, "---->image")
            console.log(values, "---companyDetailsFormik--->values");

            let formData = new FormData();

            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });


            // const projectUATRequestDTO = {
            //     "version": 9,
            //     "modifiedBy": 2,
            //     "createdBy": 2,
            //     "name": values.companyName,
            //     "logo": null,
            //     "logoPath": values.image,
            //     "address": values.address,
            //     "pinCode": {
            //         "createdDate": null,
            //         "modifiedDate": null,
            //         "version": 0,
            //         "modifiedBy": null,
            //         "createdBy": null,
            //         "id": 1,
            //         "pin": values.zipcode
            //     },
            //     "city": {
            //         "createdDate": null,
            //         "modifiedDate": null,
            //         "version": 0,
            //         "modifiedBy": null,
            //         "createdBy": null,
            //         "id": 1,
            //         "cityName": values.city
            //     },
            //     "state": {
            //         "createdDate": null,
            //         "modifiedDate": "2023-11-26T06:19:28",
            //         "version": 4,
            //         "modifiedBy": 2,
            //         "createdBy": null,
            //         "id": 1,
            //         "stateName": values.state
            //     },
            //     "country": {
            //         "createdDate": "2023-09-15T14:32:27",
            //         "modifiedDate": "2023-09-15T14:32:27",
            //         "version": 0,
            //         "modifiedBy": 1,
            //         "createdBy": 1,
            //         "id": 2,
            //         "countryName": values.country
            //     },
            //     "website": values.website,
            //     "contactName": values.contactName,
            //     "contactNo": values.phoneNumber,
            //     "contactEmail": values.email,
            //     "department": values.department,
            //     "designation": values.designation,
            //     "salesUser": {
            //         ...parties_all_employee_details?.content[0],
            //         "firstName": values.salesEmployee
            //     },
            //     "accountManager": {
            //         ...parties_all_employee_details?.content[0],
            //         "firstName": values.keyAccountManager
            //     },
            //     "serviceType": "AIR",
            //     "cin": values.CINnumber,
            //     "gst": values.GSTnumber,
            //     "pan": values.PANnumber,
            //     "entityType": values.entityType,
            //     "industryType": values.industryType,
            //     "type": values.customerType,
            //     "status": "ACTIVE",
            //     "addresses": [],
            //     "contacts": [],
            //     "documents": [],
            //     "tenant": {
            //         "createdDate": null,
            //         "modifiedDate": "2023-12-13T09:15:50",
            //         "version": 122,
            //         "modifiedBy": 2,
            //         "createdBy": null,
            //         "id": 1,
            //         "entityType": values.entityType,
            //         "industryType": values.industryType,
            //         "name": values.companyName,
            //         "address": values.address,
            //         "pinCode": {
            //             "createdDate": null,
            //             "modifiedDate": null,
            //             "version": 0,
            //             "modifiedBy": null,
            //             "createdBy": null,
            //             "id": 1,
            //             "pin": values.zipcode
            //         },
            //         "city": {
            //             "createdDate": null,
            //             "modifiedDate": null,
            //             "version": 0,
            //             "modifiedBy": null,
            //             "createdBy": null,
            //             "id": 1,
            //             "cityName": values.city
            //         },
            //         "state": {
            //             "createdDate": null,
            //             "modifiedDate": "2023-11-26T06:19:28",
            //             "version": 4,
            //             "modifiedBy": 2,
            //             "createdBy": null,
            //             "id": 1,
            //             "stateName": values.state
            //         },
            //         "country": {
            //             "createdDate": "2023-09-17T16:25:41",
            //             "modifiedDate": "2023-09-17T16:25:41",
            //             "version": 0,
            //             "modifiedBy": 1,
            //             "createdBy": 1,
            //             "id": 5,
            //             "countryName": values.country
            //         },
            //         "contactName": values.contactName,
            //         "contactNumber": values.phoneNumber,
            //         "email": values.email,
            //         "cin": values.CINnumber,
            //         "pan": values.PANnumber,
            //         "transporterId": null,
            //         "logo": null,
            //         "logoPath": values.image,
            //         "status": "ACTIVE",
            //         "subscriptionType": null,
            //         "tenantGSTS": [
            //             {
            //                 "version": 6,
            //                 "id": 1,
            //                 "no": values.GSTnumber,
            //                 "address": values.address,
            //                 "pinCode": {
            //                     "createdDate": null,
            //                     "modifiedDate": null,
            //                     "version": 0,
            //                     "modifiedBy": null,
            //                     "createdBy": null,
            //                     "id": 1,
            //                     "pin": values.zipcode
            //                 },
            //                 "city": {
            //                     "createdDate": null,
            //                     "modifiedDate": null,
            //                     "version": 0,
            //                     "modifiedBy": null,
            //                     "createdBy": null,
            //                     "id": 1,
            //                     "cityName": values.city
            //                 },
            //                 "state": {
            //                     "createdDate": null,
            //                     "modifiedDate": "2023-11-26T06:19:28",
            //                     "version": 4,
            //                     "modifiedBy": 2,
            //                     "createdBy": null,
            //                     "id": 1,
            //                     "stateName": values.state
            //                 },
            //                 "country": {
            //                     "createdDate": "2023-09-15T14:32:27",
            //                     "modifiedDate": "2023-09-15T14:32:27",
            //                     "version": 0,
            //                     "modifiedBy": 1,
            //                     "createdBy": 1,
            //                     "id": 2,
            //                     "countryName": values.country
            //                 },
            //                 "placeOfService": "Kolkata2",
            //                 "status": "ACTIVE"
            //             },
            //         ]
            //     }
            // }

            const projectUATRequestDTO = {
                "createdDate": "2023-12-14T05:59:19",
                "modifiedDate": "2023-12-14T05:59:19",
                "version": 9,
                "modifiedBy": 2,
                "createdBy": 2,
                "name": values.companyName,
                "logo": null,
                "logoPath": "/tmp/tariff-tales/Group 1000004097.png",
                "address": values.address,
                "pinCode": {
                    "createdDate": null,
                    "modifiedDate": null,
                    "version": 0,
                    "modifiedBy": null,
                    "createdBy": null,
                    "id": 1,
                    "pin": values.zipcode,
                    "city": {
                        "createdDate": null,
                        "modifiedDate": "2023-12-12T17:18:17",
                        "version": 2,
                        "modifiedBy": 2,
                        "createdBy": null,
                        "id": 1,
                        "cityName": values.city,
                        "state": {
                            "createdDate": null,
                            "modifiedDate": "2023-12-13T03:37:41",
                            "version": 6,
                            "modifiedBy": 1,
                            "createdBy": null,
                            "id": 1,
                            "stateName": values.state,
                            "country": {
                                "createdDate": "2023-09-15T14:32:27",
                                "modifiedDate": "2023-09-15T14:32:27",
                                "version": 0,
                                "modifiedBy": 1,
                                "createdBy": 1,
                                "id": 2,
                                "countryName": values.country
                            }
                        },
                        "country": {
                            "createdDate": "2023-09-15T14:32:27",
                            "modifiedDate": "2023-09-15T14:32:27",
                            "version": 0,
                            "modifiedBy": 1,
                            "createdBy": 1,
                            "id": 2,
                            "countryName": values.country
                        }
                    },
                    "state": {
                        "createdDate": null,
                        "modifiedDate": "2023-12-13T03:37:41",
                        "version": 6,
                        "modifiedBy": 1,
                        "createdBy": null,
                        "id": 1,
                        "stateName": values.state,
                        "country": {
                            "createdDate": "2023-09-15T14:32:27",
                            "modifiedDate": "2023-09-15T14:32:27",
                            "version": 0,
                            "modifiedBy": 1,
                            "createdBy": 1,
                            "id": 2,
                            "countryName": values.country
                        }
                    },
                    "country": {
                        "createdDate": "2023-09-15T14:32:27",
                        "modifiedDate": "2023-09-15T14:32:27",
                        "version": 0,
                        "modifiedBy": 1,
                        "createdBy": 1,
                        "id": 2,
                        "countryName": values.country
                    }
                },
                "city": {
                    "createdDate": null,
                    "modifiedDate": "2023-12-12T17:18:17",
                    "version": 2,
                    "modifiedBy": 2,
                    "createdBy": null,
                    "id": 1,
                    "cityName": values.city,
                    "state": {
                        "createdDate": null,
                        "modifiedDate": "2023-12-13T03:37:41",
                        "version": 6,
                        "modifiedBy": 1,
                        "createdBy": null,
                        "id": 1,
                        "stateName": values.state,
                        "country": {
                            "createdDate": "2023-09-15T14:32:27",
                            "modifiedDate": "2023-09-15T14:32:27",
                            "version": 0,
                            "modifiedBy": 1,
                            "createdBy": 1,
                            "id": 2,
                            "countryName": values.country
                        }
                    },
                    "country": {
                        "createdDate": "2023-09-15T14:32:27",
                        "modifiedDate": "2023-09-15T14:32:27",
                        "version": 0,
                        "modifiedBy": 1,
                        "createdBy": 1,
                        "id": 2,
                        "countryName": values.country
                    }
                },
                "state": {
                    "createdDate": null,
                    "modifiedDate": "2023-12-13T03:37:41",
                    "version": 6,
                    "modifiedBy": 1,
                    "createdBy": null,
                    "id": 1,
                    "stateName": values.state,
                    "country": {
                        "createdDate": "2023-09-15T14:32:27",
                        "modifiedDate": "2023-09-15T14:32:27",
                        "version": 0,
                        "modifiedBy": 1,
                        "createdBy": 1,
                        "id": 2,
                        "countryName": values.country
                    }
                },
                "country": {
                    "createdDate": "2023-09-15T14:32:27",
                    "modifiedDate": "2023-09-15T14:32:27",
                    "version": 0,
                    "modifiedBy": 1,
                    "createdBy": 1,
                    "id": 2,
                    "countryName": values.country
                },
                "website": values.website,
                "contactName": values.contactName,
                "contactNo": values.phoneNumber,
                "contactEmail": values.email,
                "department": values.department,
                "designation": values.designation,
                "salesUser": {
                    ...parties_all_employee_details?.content[0],
                    "firstName": values?.salesEmployee
                },
                "accountManager": {
                    ...parties_all_employee_details?.content[0],
                    "firstName": values?.keyAccountManager
                },
                "serviceType": "AIR",
                "cin":values.CINnumber,
                "gst": values.GSTnumber,
                "pan": values.PANnumber,
                "entityType": values.entityType,
                "industryType": values.industryType,
                "type": values.customerType,
                "status": "ACTIVE",
                "addresses": [],
                "contacts": [],
                "documents": [],
                "tenant": {
                    "createdDate": null,
                    "modifiedDate": "2023-12-14T04:43:32",
                    "version": 47,
                    "modifiedBy": 2,
                    "createdBy": null,
                    "id": 1,
                    "entityType": values.entityType,
                    "industryType": values.industryType,
                    "name": values.companyName,
                    "address": values.address,
                    "pinCode": {
                        "createdDate": null,
                        "modifiedDate": null,
                        "version": 0,
                        "modifiedBy": null,
                        "createdBy": null,
                        "id": 1,
                        "pin": values.zipcode,
                        "city": {
                            "createdDate": null,
                            "modifiedDate": "2023-12-12T17:18:17",
                            "version": 2,
                            "modifiedBy": 2,
                            "createdBy": null,
                            "id": 1,
                            "cityName": values.city,
                            "state": {
                                "createdDate": null,
                                "modifiedDate": "2023-12-13T03:37:41",
                                "version": 6,
                                "modifiedBy": 1,
                                "createdBy": null,
                                "id": 1,
                                "stateName": values.state,
                                "country": {
                                    "createdDate": "2023-09-15T14:32:27",
                                    "modifiedDate": "2023-09-15T14:32:27",
                                    "version": 0,
                                    "modifiedBy": 1,
                                    "createdBy": 1,
                                    "id": 2,
                                    "countryName":values.country
                                }
                            },
                            "country": {
                                "createdDate": "2023-09-15T14:32:27",
                                "modifiedDate": "2023-09-15T14:32:27",
                                "version": 0,
                                "modifiedBy": 1,
                                "createdBy": 1,
                                "id": 2,
                                "countryName": values.country
                            }
                        },
                        "state": {
                            "createdDate": null,
                            "modifiedDate": "2023-12-13T03:37:41",
                            "version": 6,
                            "modifiedBy": 1,
                            "createdBy": null,
                            "id": 1,
                            "stateName": values.state,
                            "country": {
                                "createdDate": "2023-09-15T14:32:27",
                                "modifiedDate": "2023-09-15T14:32:27",
                                "version": 0,
                                "modifiedBy": 1,
                                "createdBy": 1,
                                "id": 2,
                                "countryName": values.country
                            }
                        },
                        "country": {
                            "createdDate": "2023-09-15T14:32:27",
                            "modifiedDate": "2023-09-15T14:32:27",
                            "version": 0,
                            "modifiedBy": 1,
                            "createdBy": 1,
                            "id": 2,
                            "countryName": values.country
                        }
                    },
                    "city": {
                        "createdDate": null,
                        "modifiedDate": "2023-12-12T17:18:17",
                        "version": 2,
                        "modifiedBy": 2,
                        "createdBy": null,
                        "id": 1,
                        "cityName":values.city,
                        "state": {
                            "createdDate": null,
                            "modifiedDate": "2023-12-13T03:37:41",
                            "version": 6,
                            "modifiedBy": 1,
                            "createdBy": null,
                            "id": 1,
                            "stateName":values.state,
                            "country": {
                                "createdDate": "2023-09-15T14:32:27",
                                "modifiedDate": "2023-09-15T14:32:27",
                                "version": 0,
                                "modifiedBy": 1,
                                "createdBy": 1,
                                "id": 2,
                                "countryName": values.country
                            }
                        },
                        "country": {
                            "createdDate": "2023-09-15T14:32:27",
                            "modifiedDate": "2023-09-15T14:32:27",
                            "version": 0,
                            "modifiedBy": 1,
                            "createdBy": 1,
                            "id": 2,
                            "countryName": values.country
                        }
                    },
                    "state": {
                        "createdDate": null,
                        "modifiedDate": "2023-12-13T03:37:41",
                        "version": 6,
                        "modifiedBy": 1,
                        "createdBy": null,
                        "id": 1,
                        "stateName": values.state,
                        "country": {
                            "createdDate": "2023-09-15T14:32:27",
                            "modifiedDate": "2023-09-15T14:32:27",
                            "version": 0,
                            "modifiedBy": 1,
                            "createdBy": 1,
                            "id": 2,
                            "countryName": values.country
                        }
                    },
                    "country": {
                        "createdDate": "2023-09-17T16:25:41",
                        "modifiedDate": "2023-12-13T03:18:04",
                        "version": 1,
                        "modifiedBy": 1,
                        "createdBy": 1,
                        "id": 5,
                        "countryName": values.country
                    },
                    "contactName": values.contactName,
                    "contactNumber": values.phoneNumber,
                    "email":values.email,
                    "cin": values.CINnumber,
                    "pan": values.PANnumber,
                    "transporterId": null,
                    "logo": null,
                    "logoPath": "/tmp/tariff-tales/Reliance_Jio_Logo.svg.png",
                    "status": "ACTIVE",
                    "subscriptionType": null,
                    "tenantGSTS": [
                        {
                        "createdDate": "2023-11-26T16:18:21",
                        "modifiedDate": "2023-11-26T16:21:30",
                        "version": 1,
                        "modifiedBy": 2,
                        "createdBy": 2,
                        "id": 1,
                        "no": values.GSTnumber,
                        "address": values.address,
                        "pinCode": {
                            "createdDate": null,
                            "modifiedDate": null,
                            "version": 0,
                            "modifiedBy": null,
                            "createdBy": null,
                            "id": 1,
                            "pin": values.zipcode,
                            "city": {
                                "createdDate": null,
                                "modifiedDate": "2023-12-12T17:18:17",
                                "version": 2,
                                "modifiedBy": 2,
                                "createdBy": null,
                                "id": 1,
                                "cityName": values.city,
                                "state": {
                                    "createdDate": null,
                                    "modifiedDate": "2023-12-13T03:37:41",
                                    "version": 6,
                                    "modifiedBy": 1,
                                    "createdBy": null,
                                    "id": 1,
                                    "stateName":  values.state,
                                    "country": {
                                        "createdDate": "2023-09-15T14:32:27",
                                        "modifiedDate": "2023-09-15T14:32:27",
                                        "version": 0,
                                        "modifiedBy": 1,
                                        "createdBy": 1,
                                        "id": 2,
                                        "countryName": values.country
                                    }
                                },
                                "country": {
                                    "createdDate": "2023-09-15T14:32:27",
                                    "modifiedDate": "2023-09-15T14:32:27",
                                    "version": 0,
                                    "modifiedBy": 1,
                                    "createdBy": 1,
                                    "id": 2,
                                    "countryName": values.country
                                }
                            },
                            "state": {
                                "createdDate": null,
                                "modifiedDate": "2023-12-13T03:37:41",
                                "version": 6,
                                "modifiedBy": 1,
                                "createdBy": null,
                                "id": 1,
                                "stateName":  values.state,
                                "country": {
                                    "createdDate": "2023-09-15T14:32:27",
                                    "modifiedDate": "2023-09-15T14:32:27",
                                    "version": 0,
                                    "modifiedBy": 1,
                                    "createdBy": 1,
                                    "id": 2,
                                    "countryName":values.country
                                }
                            },
                            "country": {
                                "createdDate": "2023-09-15T14:32:27",
                                "modifiedDate": "2023-09-15T14:32:27",
                                "version": 0,
                                "modifiedBy": 1,
                                "createdBy": 1,
                                "id": 2,
                                "countryName": values.country
                            }
                        },
                        "city": {
                            "createdDate": null,
                            "modifiedDate": "2023-12-12T17:18:17",
                            "version": 2,
                            "modifiedBy": 2,
                            "createdBy": null,
                            "id": 1,
                            "cityName":values.city,
                            "state": {
                                "createdDate": null,
                                "modifiedDate": "2023-12-13T03:37:41",
                                "version": 6,
                                "modifiedBy": 1,
                                "createdBy": null,
                                "id": 1,
                                "stateName": values.state,
                                "country": {
                                    "createdDate": "2023-09-15T14:32:27",
                                    "modifiedDate": "2023-09-15T14:32:27",
                                    "version": 0,
                                    "modifiedBy": 1,
                                    "createdBy": 1,
                                    "id": 2,
                                    "countryName": values.country
                                }
                            },
                            "country": {
                                "createdDate": "2023-09-15T14:32:27",
                                "modifiedDate": "2023-09-15T14:32:27",
                                "version": 0,
                                "modifiedBy": 1,
                                "createdBy": 1,
                                "id": 2,
                                "countryName": values.country
                            }
                        },
                        "state": {
                            "createdDate": null,
                            "modifiedDate": "2023-12-13T03:37:41",
                            "version": 6,
                            "modifiedBy": 1,
                            "createdBy": null,
                            "id": 1,
                            "stateName": values.state,
                            "country": {
                                "createdDate": "2023-09-15T14:32:27",
                                "modifiedDate": "2023-09-15T14:32:27",
                                "version": 0,
                                "modifiedBy": 1,
                                "createdBy": 1,
                                "id": 2,
                                "countryName":values.country
                            }
                        },
                        "country": {
                            "createdDate": "2023-09-15T14:32:27",
                            "modifiedDate": "2023-09-15T14:32:27",
                            "version": 0,
                            "modifiedBy": 1,
                            "createdBy": 1,
                            "id": 2,
                            "countryName": values.country
                        },
                        "placeOfService": "Kolkata2",
                        "status": "ACTIVE"
                    }, 
                   
                ]
                }
            }


            console.log(projectUATRequestDTO, "--projectUATRequestDTO");
            // formData.append('tenant', image);
            formData.append('file', image);
            formData.append('tenantCustomer', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));
            dispatch(getAllCustomerDetailsData(formData));
        },
    })
    const contactsFormik = useFormik({
        initialValues: {
            contacts: [
                {
                    title: "",
                    name: '',
                    opCode: "",
                    phoneNumber: '',
                    emailId: '',
                    department: '',
                    designation: '',
                },
            ],
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
    const documentsFormik = useFormik({
        initialValues: {
            document: [
                {
                    documentType: "",
                    uploadDocument: '',
                }
            ],
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
    // ------------- dynamic field ------------------------
    const addHandler = () => {
        setSurcharges(s => {
            return [
                ...s,
                {
                    surcharges_name: '',
                    destination: [],
                    payment_type: 'prepaid',
                    gp1: '',
                    gp2: '',
                    hq1: '',
                    hq2: '',
                    rf1: '',
                    rf2: ''
                }
            ]
        })
    }

    const { parties_city_details, parties_all_details, parties_all_employee_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector(
        (state) => state?.parties
    );
    // console.log(settings_companyPincode_data, "-------settings_companyPincode_data");

    // console.log(getCompanyCityData(), "=======>>getCompanyCityData")
    // console.log(settings_company_settings_all_data, "=======>>settings_company_settings_all_data")
    // console.log(parties_all_details, "=======>>parties_all_details")
    console.log(parties_all_employee_details, "=======>>parties_all_employee_details")


    useEffect(() => {
        dispatch(getCustomersCityData())
        dispatch(getAllUserDetails())
        // dispatch(getAllPartiesData())
        // dispatch(getAllCustomerDetailsData())
    }, [])

    // all employee option value for customer

    const optionOfEmployee = parties_all_employee_details?.content || [];

    console.log(optionOfEmployee, "optionOfEmployee");

    const salesEmployeeOptions = optionOfEmployee?.map((item) => ({
        value: item?.firstName,
        label: item?.firstName,
    }));

    const accountManagerOptions = optionOfEmployee?.map((item) => {
        return {
            value: item?.firstName,
            label: item?.firstName
        }
    })

    useEffect(() => {
        if (parties_state_details && parties_state_details?.content?.length > 0) {
            companyDetailsFormik.setFieldValue("state", parties_state_details?.content[0]?.stateName)
        }
        if (parties_country_details && parties_country_details?.content?.length > 0) {
            companyDetailsFormik.setFieldValue("country", parties_country_details?.content[0]?.countryName)
        }
        // if(parties_pincode_details && parties_pincode_details?.content?.length > 0){
        //   companyDetailsFormik.setFieldValue("zipcode", parties_pincode_details?.content?.map((item)=>item?.pin))
        // }
        if (parties_all_details && parties_all_details?.content?.length > 0) {
            // companyDetailsFormik.setValues({
            //     companyName: parties_all_details && parties_all_details?.content[0]?.name,
            //     address: parties_all_details && parties_all_details?.content[0]?.address,
            //     city: parties_all_details && parties_all_details?.content[0]?.city?.cityName,
            //     state: parties_all_details && parties_all_details?.content[0]?.state?.stateName,
            //     country: parties_all_details && parties_all_details?.content[0]?.country?.countryName,
            //     zipcode: parties_all_details && parties_all_details?.content[0]?.pinCode?.pin,
            //     website: parties_all_details && parties_all_details?.content[0]?.website,
            //     contactName: parties_all_details && parties_all_details?.content[0]?.contactName,
            //     phoneNumber: parties_all_details && parties_all_details?.content[0]?.contactNo,
            //     email: parties_all_details && parties_all_details?.content[0]?.contactEmail,
            //     department: parties_all_details && parties_all_details?.content[0]?.department,
            //     designation: parties_all_details && parties_all_details?.content[0]?.designation,
            //     CINnumber: parties_all_details && parties_all_details?.content[0]?.cin,
            //     GSTnumber: parties_all_details && parties_all_details?.content[0]?.gst,
            //     PANnumber: parties_all_details && parties_all_details?.content[0]?.pan,
            //     entityType: parties_all_details && parties_all_details?.content[0]?.entityType,
            //     industryType: parties_all_details && parties_all_details?.content[0]?.industryType,
            //     customerType: parties_all_details && parties_all_details?.content[0]?.type,
            //     salesEmployee: (parties_all_details && parties_all_details?.content[0]?.salesUser?.firstName) + " " + (parties_all_details && parties_all_details?.content[0]?.salesUser?.lastName),
            //     // logo : parties_all_details && parties_all_details?.content[0]?.logo
            // })
            // contactsFormik.setValues({
            //     "contacts[0].name": parties_all_details && parties_all_details?.content[0]?.contacts[0]?.contactName
            // })
            // contactsFormik.setFieldValue("contacts[0].name", parties_all_details && parties_all_details?.content[0]?.contacts[0]?.contactName)
            // contactsFormik.setFieldValue("contacts[0].phoneNumber", parties_all_details && parties_all_details?.content[0]?.contacts[0]?.contactNo)
            // contactsFormik.setFieldValue("contacts[0].emailId", parties_all_details && parties_all_details?.content[0]?.contacts[0]?.contactEmail)
            // contactsFormik.setFieldValue("contacts[0].department", parties_all_details && parties_all_details?.content[0]?.contacts[0]?.department)
            // contactsFormik.setFieldValue("contacts[0].designation", parties_all_details && parties_all_details?.content[0]?.contacts[0]?.designation)
        }
    }, [parties_state_details, parties_country_details, parties_pincode_details, parties_all_details])

    const removeInputFields = (index) => {
        const rows = [...surcharges];
        rows.splice(index, 1);
        setSurcharges(rows);
    }

    // const handleChange = (e, name, index) => {
    //     const list = [...surcharges];
    //     list[index][name] = e.target.value;
    //     setSurcharges(list);
    // }

    // const handleSelectGroup = useCallback((name, opt) => {
    //     dispatch(updateCarrierData(name, opt));
    //     if (carrierData?.vendor_type?.value === 'agent') {
    //         setRemoveValue('carrier_name');
    //     } else {
    //         setRemoveValue('vendor_name');
    //     }
    // }, [carrierData]);

    const handleSelectGroup2 = useCallback((opt, name, index) => {
        const list = [...surcharges];
        list[index][name] = opt;
        setSurcharges(list);
    }, [surcharges]);

    const handleMultiSelectChange = useCallback((selected, name, options, index) => {
        // Check if "Select All" is selected
        const list = [...surcharges];
        if (selected.some(option => option.value === 'selectAll')) {
            list[index][name] = options.filter(option => option.value !== 'selectAll');
            setSurcharges(list);
            return;
        }
        list[index][name] = selected;
        setSurcharges(list);
    }, [surcharges]);

    const onCloseClick = () => {
        setGstModal(false);
        setDepartmentModal(false)
        setDesignationModal(false)
        setSalesEmployeeModal(false)
        setKeyAccountManagerModal(false)
        setEntityTypeModal(false)
        setIndustryTypeModal(false)
        setCustomerTypeModal(false)
    };

    const onUploadChange = (file) => {
        console.log(file.name, "file")
        companyDetailsFormik.setFieldValue("image", file)
    };

    const gstDetailsHandler = (data) => {
        setModalAllData((prev) => ([...prev, data]))
      }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button type="button" className='btn border mb-3' onClick={() => { navigate(-1) }}>Back</button>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <div id="progrss-wizard" className="twitter-bs-wizard upload_freight_wrap">
                                            <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 1 })} onClick={() => { toggleTabProgress(1); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="CompanyDetails">
                                                            <i className="bx bx-list-ul"></i>
                                                            <UncontrolledTooltip placement="top" target="CompanyDetails">
                                                                Company Details
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 2 })} onClick={() => { toggleTabProgress(2); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Contacts">
                                                            <i className="bx bx-food-menu"></i>
                                                            <UncontrolledTooltip placement="top" target="Contacts">
                                                                Contacts
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 3 })} onClick={() => { toggleTabProgress(3); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Documents">
                                                            <i className="bx bx-book-bookmark"></i>
                                                            <UncontrolledTooltip placement="top" target="Documents">
                                                                Documents
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 4 }, "disabled")} onClick={() => { toggleTabProgress(4); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Rates">
                                                            <i className="bx bx-dollar-circle"></i>
                                                            <UncontrolledTooltip placement="top" target="Rates">
                                                                Rates
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 5 }, "disabled")} onClick={() => { toggleTabProgress(5); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Discounts">
                                                            <i className="bx bx-purchase-tag-alt"></i>
                                                            <UncontrolledTooltip placement="top" target="Discounts">
                                                                Discounts
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 6 }, "disabled")} onClick={() => { toggleTabProgress(6); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="InvoiceSettings">
                                                            <i className="bx bx-cog"></i>
                                                            <UncontrolledTooltip placement="top" target="InvoiceSettings">
                                                                Invoice Settings
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 7 }, "disabled")} onClick={() => { toggleTabProgress(7); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Communications">
                                                            <i className="bx bx-chat"></i>
                                                            <UncontrolledTooltip placement="top" target="Communications">
                                                                Communications
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </ul>

                                            <div id="bar" className="mt-4">
                                                <Progress color="primary" striped animated value={progressValue} />
                                            </div>
                                            <TabContent activeTab={activeTabProgress} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <div className="text-center mb-4">
                                                        <h5>Company Details</h5>
                                                    </div>
                                                    <Card>
                                                        <CardBody>
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Company name</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="companyName"
                                                                                value={companyDetailsFormik.values.companyName}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Logo</label>
                                                                            <FileUpload
                                                                                iconName="img"
                                                                                onUpload={onUploadChange}
                                                                                src={companyDetailsFormik?.values?.image}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Address</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="address"
                                                                                value={companyDetailsFormik.values.address}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">City</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="city"
                                                                                list='cityList'
                                                                                value={companyDetailsFormik.values.city}
                                                                                // onChange={companyDetailsFormik.handleChange}
                                                                                onChange={(e) => {
                                                                                    companyDetailsFormik.handleChange(e);
                                                                                    const cityData = parties_city_details?.content?.find((city) => city.cityName === e.target.value)
                                                                                    if (cityData) {
                                                                                        dispatch(getCustomersStateData({ cityId: cityData.id }));
                                                                                        dispatch(getCustomersCountryData({ cityId: cityData.id }));
                                                                                        dispatch(getCustomersPincodeData({ cityId: cityData.id }));
                                                                                    }
                                                                                }
                                                                                }
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                            <datalist id="cityList">
                                                                                {parties_city_details && parties_city_details?.content?.map((item, i) => <option key={i} value={item.cityName} />)}
                                                                            </datalist>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">State</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="state"
                                                                                value={companyDetailsFormik.values.state}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Country</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="country"
                                                                                value={companyDetailsFormik.values.country}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Zipcode</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="zipcode"
                                                                                list='pincodeList'
                                                                                value={companyDetailsFormik.values.zipcode}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                            <datalist id="pincodeList">
                                                                                {parties_pincode_details && parties_pincode_details?.content?.map((item, i) => <option key={i} value={item.pin} />)}
                                                                            </datalist>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Website</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="website"
                                                                                value={companyDetailsFormik.values.website}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </CardBody>
                                                    </Card>
                                                    {/* Primary Contact Details */}
                                                    <div className="text-center mb-4">
                                                        <h5>Primary Contact Details</h5>
                                                    </div>
                                                    <Card>
                                                        <CardBody>
                                                            <form>
                                                                <div className='row'>
                                                                    <div className="col">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Contact Name</label>
                                                                            <div className='row'>
                                                                                <div className='col-4 col-md-2'>
                                                                                    <Select
                                                                                        name='title'
                                                                                        value={
                                                                                            optionCusttitle
                                                                                                ? optionCusttitle.find(
                                                                                                    (option) =>
                                                                                                        option.value ===
                                                                                                        companyDetailsFormik?.values?.title
                                                                                                )
                                                                                                : ""
                                                                                        }
                                                                                        onChange={(e) => {
                                                                                            companyDetailsFormik.setFieldValue(
                                                                                                `title`,
                                                                                                e.value
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Mr"
                                                                                        options={optionCusttitle}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                    />
                                                                                </div>
                                                                                <div className='col-6'>
                                                                                    <Input
                                                                                        type="text"
                                                                                        name="contactName"
                                                                                        value={companyDetailsFormik.values.contactName}
                                                                                        onChange={companyDetailsFormik.handleChange}
                                                                                        className="form-control"
                                                                                        placeholder=""
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Phone Number</label>
                                                                            <div className='row'>
                                                                                <div className='col-4 col-md-3'>
                                                                                    <Select
                                                                                        name='opCode'
                                                                                        value={
                                                                                            optionCustopCode
                                                                                                ? optionCustopCode.find(
                                                                                                    (option) =>
                                                                                                        option.value ===
                                                                                                        companyDetailsFormik?.values?.opCode
                                                                                                )
                                                                                                : ""
                                                                                        }
                                                                                        onChange={(e) => {
                                                                                            companyDetailsFormik.setFieldValue(
                                                                                                `opCode`,
                                                                                                e.value
                                                                                            );
                                                                                        }}
                                                                                        placeholder="+91"
                                                                                        options={optionCustopCode}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                    />
                                                                                </div>
                                                                                <div className='col-8 col-md-9'>
                                                                                    <Input
                                                                                        type="text"
                                                                                        name="phoneNumber"
                                                                                        // value={companyDetailsFormik.values.phoneNumber}
                                                                                        // onChange={companyDetailsFormik.handleChange}
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
                                                                            name="email"
                                                                            value={companyDetailsFormik.values.email}
                                                                            onChange={companyDetailsFormik.handleChange}
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
                                                                                name='department'
                                                                                value={
                                                                                    optionCustdepartment
                                                                                        ? optionCustdepartment.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.department
                                                                                        )
                                                                                        : ""
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setDepartmentModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `department`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                options={optionCustdepartment}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Designation</label>
                                                                            <Select
                                                                                name='designation'
                                                                                value={
                                                                                    optionCustdesignation
                                                                                        ? optionCustdesignation.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.designation
                                                                                        )
                                                                                        : ""
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setDesignationModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `designation`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                options={optionCustdesignation}
                                                                                // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Sales Employee</label>
                                                                            <Select
                                                                                name='salesEmployee'
                                                                                value={
                                                                                    optionCustsalesEmployee
                                                                                        ? optionCustsalesEmployee.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.salesEmployee
                                                                                        )
                                                                                        : ""
                                                                                    // companyDetailsFormik?.values?.salesEmployee
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setSalesEmployeeModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `salesEmployee`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                options={salesEmployeeOptions}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                                                            />
                                                                            {/* <Input
                                                                                name='salesEmployee'
                                                                                value={
                                                                                    companyDetailsFormik?.values?.salesEmployee
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setSalesEmployeeModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `salesEmployee`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            /> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Key Account Manager</label>
                                                                            <Select
                                                                                name='keyAccountManager'
                                                                                value={
                                                                                    optionCustkeyAccountManager
                                                                                        ? optionCustkeyAccountManager.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.keyAccountManager
                                                                                        )
                                                                                        : ""
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setKeyAccountManagerModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `keyAccountManager`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                options={accountManagerOptions}
                                                                                // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </CardBody>
                                                    </Card>

                                                    {/* Company identification */}
                                                    <div className="text-center mb-4">
                                                        <h5>Company identification</h5>
                                                    </div>
                                                    <Card>
                                                        <CardBody>
                                                            <>
                                                                <div className="row">
                                                                    <div className="col-12 col-md-8">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">CIN Number</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="CINnumber"
                                                                                value={companyDetailsFormik.values.CINnumber}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-10 col-md-5">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">GST Number</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="GSTnumber"
                                                                                value={companyDetailsFormik.values.GSTnumber}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2 col-md-1">
                                                                        <button
                                                                            className="btn btn-primary mt-4"
                                                                            onClick={() => setGstModal(true)}
                                                                        >
                                                                            <i className="bx bx-plus"></i>
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">PAN Number</label>
                                                                            <Input
                                                                                type="text"
                                                                                name="PANnumber"
                                                                                value={companyDetailsFormik.values.PANnumber}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Entity Type</label>
                                                                            <Select
                                                                                name='entityType'
                                                                                value={
                                                                                    optionCustentityType
                                                                                        ? optionCustentityType.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.entityType
                                                                                        )
                                                                                        : ""
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setEntityTypeModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `entityType`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                options={optionCustentityType}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Industry Type</label>
                                                                            <Select
                                                                                name='industryType'
                                                                                value={
                                                                                    optionCustindustryType
                                                                                        ? optionCustindustryType.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.industryType
                                                                                        )
                                                                                        : ""
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setIndustryTypeModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `industryType`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                options={optionCustindustryType}
                                                                                // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Customer Type</label>
                                                                            <Select
                                                                                name='customerType'
                                                                                value={
                                                                                    optionCustcustomerType
                                                                                        ? optionCustcustomerType.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.customerType
                                                                                        )
                                                                                        : ""
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (e.label == "Add New") {
                                                                                        setCustomerTypeModal(true)
                                                                                    }
                                                                                    companyDetailsFormik.setFieldValue(
                                                                                        `customerType`,
                                                                                        e.value
                                                                                    );
                                                                                }}
                                                                                options={optionCustcustomerType}
                                                                                placeholder="Customer"
                                                                                // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        </CardBody>
                                                    </Card>
                                                    {/* onSubmitHandler={gstDetailsHandler} */}
                                                    <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} />
                                                    <ModalAddNewDepartment modal={departmentModal} onCloseClick={onCloseClick} />
                                                    <ModalAddNewDesignation modal={designationModal} onCloseClick={onCloseClick} />
                                                    <ModalAddNewSalesEmployee modal={salesEmployeeModal} onCloseClick={onCloseClick} />
                                                    <ModalAddNewKeyAccountManager modal={keyAccountManagerModal} onCloseClick={onCloseClick} />
                                                    <ModalAddNewCustomerType modal={customerTypeModal} onCloseClick={onCloseClick} />
                                                    <ModalAddNewEntityType modal={entityTypeModal} onCloseClick={onCloseClick} />
                                                    <ModalAddNewIndustryType modal={industryTypeModal} onCloseClick={onCloseClick} />
                                                </TabPane>
                                                <TabPane tabId={2}>
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
                                                                                    <div className='row'>
                                                                                        <div className="col-10 col-md-11">
                                                                                            <div className="mb-3">
                                                                                                <label className="form-label">Contact Name</label>
                                                                                                <div className='row'>
                                                                                                    <div className='col-4 col-md-2'>
                                                                                                        <Select
                                                                                                            name={`contacts[${index}].title`}
                                                                                                            value={
                                                                                                                optionCusttitle ? optionCusttitle.find((option) => option.value === contactsFormik?.values?.contacts[index].title) : ""
                                                                                                            }
                                                                                                            onChange={(e) => {
                                                                                                                contactsFormik.setFieldValue(`contacts[${index}].title`, e.value);
                                                                                                            }}
                                                                                                            options={optionCusttitle}
                                                                                                            placeholder="Mr"
                                                                                                            classNamePrefix="select2-selection form-select"
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className='col-8 col-md-6'>
                                                                                                        <Input
                                                                                                            type="text"
                                                                                                            name={`contacts[${index}].name`}
                                                                                                            value={contactsFormik.values.contacts[index].name}
                                                                                                            onChange={contactsFormik.handleChange}
                                                                                                            className="form-control"
                                                                                                            placeholder=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='col-2 col-md-1'>
                                                                                            {contactsFormik.values.contacts.length >
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

                                                                                    <div className='row'>
                                                                                        <div className="col-12 col-md-6">
                                                                                            <div className="mb-3">
                                                                                                <label className="form-label">Phone Number</label>
                                                                                                <div className='row'>
                                                                                                    <div className='col-4 col-md-3'>
                                                                                                        <Select
                                                                                                            // value={carrierData.rate_type}
                                                                                                            name={`contacts[${index}].opCode`}
                                                                                                            value={
                                                                                                                optionCustopCode
                                                                                                                    ? optionCustopCode.find(
                                                                                                                        (option) =>
                                                                                                                            option.value ===
                                                                                                                            contactsFormik?.values?.contacts[index].opCode
                                                                                                                    )
                                                                                                                    : ""
                                                                                                            }
                                                                                                            onChange={(e) => {
                                                                                                                contactsFormik.setFieldValue(
                                                                                                                    `contacts[${index}].opCode`,
                                                                                                                    e.value
                                                                                                                );
                                                                                                            }}
                                                                                                            options={optionCustopCode}
                                                                                                            placeholder="+91"
                                                                                                            classNamePrefix="select2-selection form-select"
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className='col-8 col-md-9'>
                                                                                                        <Input
                                                                                                            type="text"
                                                                                                            name={`contacts[${index}].phoneNumber`}
                                                                                                            value={contactsFormik.values.contacts[index].phoneNumber}
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
                                                                                                value={contactsFormik.values.contacts[index].emailId}
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
                                                                                                        optionCustdepartment
                                                                                                            ? optionCustdepartment.find(
                                                                                                                (option) =>
                                                                                                                    option.value ===
                                                                                                                    contactsFormik?.values?.contacts[index].department
                                                                                                            )
                                                                                                            : ""
                                                                                                    }
                                                                                                    onChange={(e) => {
                                                                                                        contactsFormik.setFieldValue(
                                                                                                            `contacts[${index}].department`,
                                                                                                            e.value
                                                                                                        );
                                                                                                    }}
                                                                                                    options={optionCustdepartment}
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
                                                                                                        optionCustdesignation
                                                                                                            ? optionCustdesignation.find(
                                                                                                                (option) =>
                                                                                                                    option.value ===
                                                                                                                    contactsFormik?.values?.contacts[index].designation
                                                                                                            )
                                                                                                            : ""
                                                                                                    }
                                                                                                    onChange={(e) => {
                                                                                                        contactsFormik.setFieldValue(
                                                                                                            `contacts[${index}].designation`,
                                                                                                            e.value
                                                                                                        );
                                                                                                    }}
                                                                                                    options={optionCustdesignation}
                                                                                                    // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                                                                                    classNamePrefix="select2-selection form-select"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </CardBody>
                                                                            </Card>
                                                                        ))}
                                                                        <button type="button" className='btn btn-primary'
                                                                            onClick={() => arrayHelpers.push({
                                                                                title: "",
                                                                                name: '',
                                                                                opCode: "",
                                                                                phoneNumber: '',
                                                                                emailId: '',
                                                                                department: '',
                                                                                designation: '',
                                                                            })}>
                                                                            Add
                                                                        </button>
                                                                    </>
                                                                )}

                                                            </FieldArray>
                                                        </FormikProvider>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={3}>
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
                                                                                    {/* <form> */}
                                                                                    <div className='row'>
                                                                                        <div className="col-12 col-md-6">
                                                                                            <div className="mb-3">
                                                                                                <label className="form-label">Document Type</label>
                                                                                                <Input
                                                                                                    type="text"
                                                                                                    name={`document[${index}].documentType`}
                                                                                                    value={documentsFormik.values.document[index].documentType}
                                                                                                    onChange={documentsFormik.handleChange}
                                                                                                    className="form-control"
                                                                                                    placeholder=""
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-5">
                                                                                            <div className="mb-3">
                                                                                                <label className="form-label">Upload Documents</label>
                                                                                                <Input
                                                                                                    type="file"
                                                                                                    name={`document[${index}].uploadDocument`}
                                                                                                    //   value={}
                                                                                                    onChange={documentsFormik.handleChange}
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

                                                                                    {/* </form> */}
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
                                                </TabPane>
                                                <TabPane tabId={4}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Rates</h5>
                                                        </div>
                                                        <form>
                                                            {surcharges?.map((item, index) => (
                                                                <div key={index} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Select Surcharge Name</label>
                                                                                <Select
                                                                                    value={optionSurchargesName ? optionSurchargesName.find(obj => obj.value === item.surcharges_name) : ''}
                                                                                    name='surcharges_name'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt.value, 'surcharges_name', index);
                                                                                    }}
                                                                                    options={optionSurchargesName}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='destination' className="form-label">Surcharge Applicable on destination</label>
                                                                                <Select
                                                                                    value={item.destination}
                                                                                    name='destination'
                                                                                    isMulti
                                                                                    options={optionMultiDestination}
                                                                                    onChange={(opt) => { handleMultiSelectChange(opt, 'destination', optionMultiDestination, index) }}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    <div className="btn_wrap">
                                                                        {(surcharges.length !== 0) ? <button type='button' onClick={() => { removeInputFields(index) }} className="btn border p-0"><img src={delete_icon} alt="Delete" /></button> : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler(); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={5}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Discounts</h5>
                                                        </div>
                                                        <form>
                                                            {surcharges?.map((item, index) => (
                                                                <div key={index} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Select Surcharge Name</label>
                                                                                <Select
                                                                                    value={optionSurchargesName ? optionSurchargesName.find(obj => obj.value === item.surcharges_name) : ''}
                                                                                    name='surcharges_name'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt.value, 'surcharges_name', index);
                                                                                    }}
                                                                                    options={optionSurchargesName}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='destination' className="form-label">Surcharge Applicable on destination</label>
                                                                                <Select
                                                                                    value={item.destination}
                                                                                    name='destination'
                                                                                    isMulti
                                                                                    options={optionMultiDestination}
                                                                                    onChange={(opt) => { handleMultiSelectChange(opt, 'destination', optionMultiDestination, index) }}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    <div className="btn_wrap">
                                                                        {(surcharges.length !== 0) ? <button type='button' onClick={() => { removeInputFields(index) }} className="btn border p-0"><img src={delete_icon} alt="Delete" /></button> : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler(); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={6}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Invoice Settings</h5>
                                                        </div>
                                                        <form>
                                                            {surcharges?.map((item, index) => (
                                                                <div key={index} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Select Surcharge Name</label>
                                                                                <Select
                                                                                    value={optionSurchargesName ? optionSurchargesName.find(obj => obj.value === item.surcharges_name) : ''}
                                                                                    name='surcharges_name'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt.value, 'surcharges_name', index);
                                                                                    }}
                                                                                    options={optionSurchargesName}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='destination' className="form-label">Surcharge Applicable on destination</label>
                                                                                <Select
                                                                                    value={item.destination}
                                                                                    name='destination'
                                                                                    isMulti
                                                                                    options={optionMultiDestination}
                                                                                    onChange={(opt) => { handleMultiSelectChange(opt, 'destination', optionMultiDestination, index) }}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    <div className="btn_wrap">
                                                                        {(surcharges.length !== 0) ? <button type='button' onClick={() => { removeInputFields(index) }} className="btn border p-0"><img src={delete_icon} alt="Delete" /></button> : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler(); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={7}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Communications</h5>
                                                        </div>
                                                        <form>
                                                            {surcharges?.map((item, index) => (
                                                                <div key={index} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Select Surcharge Name</label>
                                                                                <Select
                                                                                    value={optionSurchargesName ? optionSurchargesName.find(obj => obj.value === item.surcharges_name) : ''}
                                                                                    name='surcharges_name'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt.value, 'surcharges_name', index);
                                                                                    }}
                                                                                    options={optionSurchargesName}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='destination' className="form-label">Surcharge Applicable on destination</label>
                                                                                <Select
                                                                                    value={item.destination}
                                                                                    name='destination'
                                                                                    isMulti
                                                                                    options={optionMultiDestination}
                                                                                    onChange={(opt) => { handleMultiSelectChange(opt, 'destination', optionMultiDestination, index) }}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    <div className="btn_wrap">
                                                                        {(surcharges.length !== 0) ? <button type='button' onClick={() => { removeInputFields(index) }} className="btn border p-0"><img src={delete_icon} alt="Delete" /></button> : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler(); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </TabPane>
                                            </TabContent>

                                            <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-between">
                                                <li className={`previous ${activeTabProgress === 1 ? "disabled" : ""}`}>
                                                    <Link
                                                        to="#"
                                                        className={`d-flex align-items-center ${activeTabProgress === 1 ? "btn btn-primary disabled" : "btn btn-primary"}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress - 1);
                                                        }}
                                                    >
                                                        <i className="bx bx-chevron-left me-1"></i> Previous
                                                    </Link>
                                                </li>

                                                {/* <li className={`${activeTabProgress === 1 ? isAnyValueEmpty(companyDetailsFormik.values) ? "disabled" : "" : activeTabProgress === 2 ? isAnyValueEmptyInArray(contactsFormik?.values?.contacts) ? "disabled" : ""
                                                    : activeTabProgress === 3 ? isAnyValueEmptyInArray(documentsFormik?.values?.document) ? "disabled" : ""
                                                        : ""}`}>
                                                    <Link
                                                        to="#"
                                                        className={`btn btn-primary d-flex align-items-center ${activeTabProgress === 1 ? isAnyValueEmpty(companyDetailsFormik?.values) ? "disabled" : "" :
                                                            activeTabProgress === 2 ? isAnyValueEmptyInArray(contactsFormik?.values?.contacts) ? "disabled" : ""
                                                                : activeTabProgress === 3 ? isAnyValueEmptyInArray(documentsFormik?.values?.document) ? "disabled" : ""
                                                                    : ""}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress + 1);
                                                        }}
                                                    >
                                                        {activeTabProgress === 3 ? 'Save' : (
                                                            <>
                                                                Next
                                                                <i className="bx bx-chevron-right ms-1"></i>
                                                            </>
                                                        )}
                                                    </Link>
                                                </li> */}
                                                <li>
                                                    <Link>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary d-flex align-items-center"
                                                            onClick={companyDetailsFormik.handleSubmit}
                                                        >
                                                            Save
                                                            <i className="bx bx-chevron-right ms-1"></i>
                                                        </button>
                                                    </Link>
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
                className='confirm_modal_wrap'
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
                    <h4 className='text-center'>Are you sure?</h4>
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
                    <button type="button" onClick={() => { finalSaveButton(); }} className="btn btn-primary ">
                        Save changes
                    </button>
                </div>
            </Modal>


        </>
    )
}