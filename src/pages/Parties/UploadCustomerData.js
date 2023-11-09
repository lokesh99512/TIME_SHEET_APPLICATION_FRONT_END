import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { Card, CardBody, Col, Container, Form, Input, Modal, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import fileData from '../../assets/extra/upload_Formats.xlsx';
import { delete_icon } from '../../assets/images';
import { optcurrency, optionCarrierName, optionMultiDestination, optionPaymentType, optionRateSource, optionRateType, optionSurchargesName, optionValidityApp, optionVendorName, optionVendorType } from '../../common/data/procurement';
import { formatBytes, isAnyValueEmpty, isExcelFile } from '../../components/Common/CommonLogic';
import { updateCarrierData } from '../../store/Procurement/actions';
import { BLANK_CARRIER_DATA } from '../../store/Procurement/actiontype';
import ModalAddGST from './Modal/ModalAddGST';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import FileUpload from './FileUpload';

const gen = [
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
]
const title = [
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
]
const phone = [
    { label: "+91", value: "+91" },
]
const opCode = [
    { label: "+91", value: "+91" },
]
const department = [
    { label: "test", value: "test" },
]
const designation = [
    { label: "test", value: "test" },
]
const entityType = [
    { label: "test", value: "test" },
]
const industryType = [
    { label: "test", value: "test" },
]
const salesEmployee = [
    { label: "test", value: "test" },
]
const keyAccountManager = [
    { label: "test", value: "test" },
]

export default function UploadCustomerData() {
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [progressValue, setProgressValue] = useState(14);
    const [selectedFiles, setselectedFiles] = useState([]);
    const [gstModal, setGstModal] = useState(false);
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
        dispatch({type: BLANK_CARRIER_DATA});
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
            // console.log(carrierData, "carrierData step1");
            // console.log(selectedFiles, "selectedFiles step2");
            // console.log(surcharges, "surcharges step3");
            openSaveConfirmModal();
        }
    }

    function handleAcceptedFiles(files) {
        if (files && files.length) {
            var file = files[0];
            var fileName = file.name;
            if (isExcelFile(fileName)) {
                setfileError("");
                files.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        formattedSize: formatBytes(file.size),
                    })
                );
                setselectedFiles(files);
            } else {
                setfileError("The file type is not supported. Upload an Excel file.");
                setselectedFiles();
            }
        } else {
            setfileError("File is required");
        }
    }

    // ----------forimik ----------
    const companyDetailsFormik = useFormik({
        initialValues: {
            companyName:"",
            logo:"",
            address:"",
            city:"",
            state:"",
            country:"",
            zipcode:"",
            website:"",

            title:"",
            contactName:"",
            opCode:"",
            phoneNumber:"",
            email:"",
            department:"",
            designation:"",
            salesEmployee:"",
            keyAccountManager:"",

            CINnumber:"",
            GSTnumber:"",
            PANnumber:"",
            entityType:"",
            industryType:""
        }
    })
    const contactsFormik = useFormik({
        initialValues: {
          contacts: [
            {
              title:"",
              name: '',
              opCode:"",
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
              documentType:"",
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

    const handleChange = (e, name, index) => {
        const list = [...surcharges];
        list[index][name] = e.target.value;
        setSurcharges(list);
    }

    const handleSelectGroup = useCallback((name, opt) => {
        dispatch(updateCarrierData(name, opt));
        if (carrierData?.vendor_type?.value === 'agent') {
            setRemoveValue('carrier_name');
        } else {
            setRemoveValue('vendor_name');
        }
    }, [carrierData]);

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
      };

      const onUploadChange = (file) => {
        console.log("enter");
        // console.log(file.name,"file")
        // setSelectedFiles(file);
        // const formData = new FormData();
        // formData.append('file', file)
        // setFieldValue("image",formData)
        // console.log(formData,"<---formData");
        // console.log(formData,"<---formData");
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
                                            {/* {console.log(contactsFormik?.values?.contacts,"<<<<<<<<")} */}
                                            <TabContent activeTab={activeTabProgress} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <div className="text-center mb-4">
                                                        <h5>Company Details</h5>
                                                    </div>
                                                    {console.log(companyDetailsFormik.values,"<----tab-1")}
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
                                                                            {/* <Input
                                                                                type="file"
                                                                                name="logo"
                                                                                  value={companyDetailsFormik.values.logo}
                                                                                onChange={companyDetailsFormik.handleChange}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                                /> */}
                                                                                <FileUpload
                                                                                    iconName="img"
                                                                                    onUpload={onUploadChange}
                                                                                    // src={companyDetailsFormik.values.image}
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
                                                                    <div className="mb-3">
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
                                                        </div>
                                                    </>
                                                    </CardBody>
                                                    </Card>
                                                    <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} />


                                                </TabPane>
                                                <TabPane tabId={2}>
                                                <div className="text-center mb-4">
                                                        <h5>Contacts</h5>
                                                    </div>
                                                    <div>
                                                    {console.log(contactsFormik.values,"<----tab-2")}
                                                    <FormikProvider value={contactsFormik}>
                                                    <FieldArray name="contacts" validateOnChange={false}>
                                                        {(arrayHelpers)=>(
                                                            <>
                                                            {contactsFormik?.values?.contacts?.map((contact, index) =>(
                                                                <>
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
                                                                    <div className="mb-3">
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
                                                                
                                                                </>
                                                            ))}
                                                            <button type="button" className='btn btn-primary'
                                                                 onClick={() => arrayHelpers.push({
                                                                    title:"",
                                                                    name: '',
                                                                    opCode:"",
                                                                    phoneNumber: '',
                                                                    emailId: '',
                                                                    department: '',
                                                                    designation: '',
                                                                        })}>
                                                                    Add
                                                                </button>
                                                                {/* {console.log(contactsFormik.values.contacts,"contacts")} */}
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
                                                    {/* <Card>
                                                        <CardBody>
                                                        <form>
                                                        <div className='row'>
                                                            <div className="col-6">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Document Type</label>
                                                                            <Input
                                                                                type="text"
                                                                                // name=""
                                                                                //   value={}
                                                                                //   onChange={}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                                />
                                                                    </div>
                                                                </div>
                                                            <div className="col-6">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Upload Documents</label>
                                                                            <Input
                                                                                type="file"
                                                                                // name=""
                                                                                //   value={}
                                                                                //   onChange={}
                                                                                className="form-control"
                                                                                placeholder=""
                                                                                />
                                                                    </div>
                                                                </div>
                                                        </div>

                                                    </form>
                                                    </CardBody>
                                                    </Card> */}
                                                            {console.log(documentsFormik.values,"<----tab-3")}
                                                    <FormikProvider value={documentsFormik}>
                                                    <FieldArray name="document" validateOnChange={false}>
                                                        {(arrayHelpers)=>(
                                                            <>
                                                            {/* {console.log(push,"push method")} */}
                                                            
                                                            {documentsFormik?.values?.document?.map((document, index) =>(
                                                                <>
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
                                                                
                                                                </>
                                                            ))}
                                                            <button type="button" className='btn btn-primary'
                                                                 onClick={() => arrayHelpers.push({
                                                                            documentType:"",
                                                                            uploadDocument: '',
                                                                        })}>
                                                                    Add
                                                                </button>
                                                                {/* {console.log(contactsFormik.values.contacts,"contacts")} */}
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

                                                <li className={`${activeTabProgress === 1 ? isAnyValueEmpty(carrierData, removeValue) ? "disabled" : "" : activeTabProgress === 2 ? selectedFiles?.length === 0 ? "disabled" : "" : ""}`}>
                                                    <Link
                                                        to="#"
                                                        className={`btn btn-primary d-flex align-items-center ${activeTabProgress === 1 ? !(carrierData?.carrier_name !== '' && carrierData?.validity_from !== '' && carrierData?.validity_to !== '') ? "disabled" : "" : activeTabProgress === 2 ? selectedFiles?.length === 0 ? "disabled" : "" : ""}`}
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