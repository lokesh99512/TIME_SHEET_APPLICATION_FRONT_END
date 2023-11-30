import classnames from 'classnames';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { Card, CardBody, Col, Container, Input, Modal, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import { delete_icon } from '../../assets/images';
import { optionMultiDestination, optionSurchargesName } from '../../common/data/procurement';
import { formatBytes, isAnyValueEmpty, isAnyValueEmptyInArray, isAnyValueEmptyInObjOfArr, isExcelFile } from '../../components/Common/CommonLogic';
import { updateCarrierData } from '../../store/Procurement/actions';
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


const title = [
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
]

const opCode = [
    { label: "+91", value: "+91" },
]

const department = [
    { label: "Accounts", value: "Accounts" },
    { label: "Sales", value: "Sales" },
    { label: "Finance", value: "Finance" },
    { label: "Management", value: "Management" },
    { label: "Primary", value: "Primary" },
    { label: "Add New", value: "Add New" },
]

const designation = [
    { label: "Executive", value: "Executive" },
    { label: "Asst. Manager", value: "Asst. Manager" },
    { label: "Manager", value: "Manager" },
    { label: "Sr. Manager", value: "Sr. Manager" },
    { label: "AVP", value: "AVP" },
    { label: "VP", value: "VP" },
    { label: "President", value: "President" },
    { label: "Director", value: "Director" },
    { label: "CEO", value: "CEO" },
    { label: "COO", value: "COO" },
    { label: "MD", value: "MD" },
    { label: "Sales", value: "Sales" },
    { label: "Finance", value: "Finance" },
    { label: "Management", value: "Management" },
    { label: "Primary", value: "Primary" },
    { label: "Add New", value: "Add New" },
]

const entityType = [
    { label: "Proprietorship", value: "Proprietorship" },
    { label: "Single Director", value: "Single Director" },
    { label: "LLP", value: "LLP" },
    { label: "Private Limited", value: "Private Limited" },
    { label: "Public Limited", value: "Public Limited" },
    { label: "Add New", value: "Add New" },
]

const industryType = [
    { label: "Supply Chain", value: "Supply Chain" },
    { label: "Software services", value: "Software services" },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Transportation", value: "Transportation" },
    { label: "Add New", value: "Add New" },
]

const customerType = [
    { label: "Customer", value: "Customer" },
    { label: "Agent", value: "Agent" },
    { label: "Franchisee", value: "Franchisee" },
    { label: "Add New", value: "Add New" },
]

const salesEmployee = [
    { label: "Ajay", value: "Ajay" },
    { label: "Hitesh", value: "Hitesh" },
    { label: "Mahendra", value: "Mahendra" },
    { label: "Mahes", value: "Mahes" },
    { label: "Add New", value: "Add New" },
]

const keyAccountManager = [
    { label: "Ajay", value: "Ajay" },
    { label: "Hitesh", value: "Hitesh" },
    { label: "Mahendra", value: "Mahendra" },
    { label: "Mahes", value: "Mahes" },
    { label: "Add New", value: "Add New" },
]

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
    const navigate = useNavigate();
    const [surcharges, setSurcharges] = useState([]);
    const [fileError, setfileError] = useState('');
    const [removeValue, setRemoveValue] = useState('');
    const carrierData = useSelector((state) => state?.procurement?.carrierDetails);
    const dispatch = useDispatch();
    const { tabName } = useParams();

    const openSaveConfirmModal = () => {
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
            if (tab >= 1 && tab <= 7) {
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
        if (tab === 8) {
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
            logo: "",
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
        }
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
        companyDetailsFormik.setFieldValue("logo", file)
    };


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
                                                    <NavLink className={classnames({ active: activeTabProgress === 4 })} onClick={() => { toggleTabProgress(4); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="Rates">
                                                            <i className="bx bx-dollar-circle"></i>
                                                            <UncontrolledTooltip placement="top" target="Rates">
                                                                Rates
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 5 })} onClick={() => { toggleTabProgress(5); }} >
                                                        <div className="step-icon opacity-25" data-bs-toggle="tooltip" id="Discounts">
                                                            <i className="bx bx-purchase-tag-alt"></i>
                                                            <UncontrolledTooltip placement="top" target="Discounts">
                                                                Discounts
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 6 })} onClick={() => { toggleTabProgress(6); }} >
                                                        <div className="step-icon opacity-25" data-bs-toggle="tooltip" id="InvoiceSettings">
                                                            <i className="bx bx-cog"></i>
                                                            <UncontrolledTooltip placement="top" target="InvoiceSettings">
                                                                Invoice Settings
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 7 })} onClick={() => { toggleTabProgress(7); }} >
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
                                                                                value={companyDetailsFormik.values.city}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
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
                                                                                value={companyDetailsFormik.values.zipcode}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                            />
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
                                                                                            title
                                                                                                ? title.find(
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
                                                                                        options={title}
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
                                                                                            opCode
                                                                                                ? opCode.find(
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
                                                                                        options={opCode}
                                                                                        classNamePrefix="select2-selection form-select"
                                                                                    />
                                                                                </div>
                                                                                <div className='col-8 col-md-9'>
                                                                                    <Input
                                                                                        type="text"
                                                                                        name="phoneNumber"
                                                                                        value={companyDetailsFormik.values.phoneNumber}
                                                                                        onChange={companyDetailsFormik.handleChange}
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
                                                                                    department
                                                                                        ? department.find(
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
                                                                                name='designation'
                                                                                value={
                                                                                    designation
                                                                                        ? designation.find(
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
                                                                                options={designation}
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
                                                                                    salesEmployee
                                                                                        ? salesEmployee.find(
                                                                                            (option) =>
                                                                                                option.value ===
                                                                                                companyDetailsFormik?.values?.salesEmployee
                                                                                        )
                                                                                        : ""
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
                                                                                options={salesEmployee}
                                                                                classNamePrefix="select2-selection form-select"
                                                                            // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-6">
                                                                        <div className="mb-3">
                                                                            <label className="form-label">Key Account Manager</label>
                                                                            <Select
                                                                                name='keyAccountManager'
                                                                                value={
                                                                                    keyAccountManager
                                                                                        ? keyAccountManager.find(
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
                                                                                options={keyAccountManager}
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
                                                                                    entityType
                                                                                        ? entityType.find(
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
                                                                                options={entityType}
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
                                                                                    industryType
                                                                                        ? industryType.find(
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
                                                                                options={industryType}
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
                                                                                    customerType
                                                                                        ? customerType.find(
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
                                                                                options={customerType}
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
                                                                                                                    title
                                                                                                                        ? title.find(
                                                                                                                            (option) =>
                                                                                                                                option.value ===
                                                                                                                                contactsFormik?.values?.contacts[index].title
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
                                                                                                                    opCode
                                                                                                                        ? opCode.find(
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
                                                                                                                options={opCode}
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
                                                                                                            department
                                                                                                                ? department.find(
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

                                            {console.log(contactsFormik.values,"<--------contactsFormik")}

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

                                                <li className={`${activeTabProgress === 1 ? isAnyValueEmpty(companyDetailsFormik.values) ? "disabled" : "" : activeTabProgress === 2 ? isAnyValueEmptyInArray(contactsFormik?.values?.contacts) ? "disabled" : "" : ""}`}>
                                                    <Link
                                                        to="#"
                                                        className={`btn btn-primary d-flex align-items-center ${activeTabProgress === 1 ? isAnyValueEmpty(companyDetailsFormik.values) ? "disabled" : "" : activeTabProgress === 2 ? isAnyValueEmpty(contactsFormik.values) ? "disabled" : "" : ""}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress + 1);
                                                        }}
                                                    >
                                                        {activeTabProgress === 7 ? 'Save' : (
                                                            <>
                                                                Next
                                                                <i className="bx bx-chevron-right ms-1"></i>
                                                            </>
                                                        )}
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