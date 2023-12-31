import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { Card, CardBody, Input } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { optionCustcustomerType, optionCustdepartment, optionCustdesignation, optionCustentityType, optionCustindustryType, optionCustopCode, optionCusttitle } from '../../../../common/data/settings';
import { getAllCustomerDetailsData, getCustomersCountryData, getCustomersPincodeData, getCustomersStateData } from '../../../../store/Parties/actions';
import FileUpload from '../../FileUpload';
import ModalAddGST from '../../Modal/ModalAddGST';
import ModalAddNewCustomerType from '../../Modal/ModalAddNewCustomerType';
import ModalAddNewDepartment from '../../Modal/ModalAddNewDepartment';
import ModalAddNewDesignation from '../../Modal/ModalAddNewDesignation';
import ModalAddNewEntityType from '../../Modal/ModalAddNewEntityType';
import ModalAddNewIndustryType from '../../Modal/ModalAddNewIndustryType';
import ModalAddNewKeyAccountManager from '../../Modal/ModalAddNewKeyAccountManager';
import ModalAddNewSalesEmployee from '../../Modal/ModalAddNewSalesEmployee';


const CustomerCompDetails = ({ toggleTabProgress }) => {
    const [logoFile, setLogoFile] = useState('');
    const [gstModal, setGstModal] = useState(false);
    const [departmentModal, setDepartmentModal] = useState(false);
    const [designationModal, setDesignationModal] = useState(false);
    const [salesEmployeeModal, setSalesEmployeeModal] = useState(false);
    const [keyAccountManagerModal, setKeyAccountManagerModal] = useState(false);
    const [entityTypeModal, setEntityTypeModal] = useState(false);
    const [industryTypeModal, setIndustryTypeModal] = useState(false);
    const [customerTypeModal, setCustomerTypeModal] = useState(false);
    const [modalAlldata, setModalAllData] = useState([]);

    const dispatch = useDispatch();

    const { parties_city_details, parties_all_details, parties_all_employee_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector(
        (state) => state?.parties
    );

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

    const gstDetailsHandler = (data) => {
        setModalAllData((prev) => ([...prev, data]))
    }

    // console.log(parties_pincode_details,"parties_pincode_details");
    // console.log(parties_country_details,"parties_country_details");
    // console.log(parties_state_details,"parties_state_details");
    // console.log(parties_city_details,"parties_state_details");

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
            // console.log("values company details", image);
            // console.log("values company details", values);
            let countryVal = parties_country_details?.content?.filter((con) => con?.countryName === values?.country) || [];
            let cityVal = parties_city_details?.content?.filter((city) => city?.cityName === values?.city) || [];
            // let cityVal = parties_country_details?.content?.filter((city) => city?.countryName === values?.country) || [];
            let stateVal = parties_state_details?.content?.filter((state) => state?.stateName === values?.state) || [];
            let pincodeVal = parties_pincode_details?.content?.filter((pin) => pin?.pin === values?.zipcode) || [];
   
            let formData = new FormData();

            const projectUATRequestDTO = {
                "name": values.companyName || "",
                "logo": null,
                "logoPath": image?.preview || "",
                "address": values.address || null,
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
                // "pinCode": null,
                // "state": null,
                "website": values.website || null,
                "contactName": values.contactName || null,
                "contactNo": values.phoneNumber || null,
                "contactEmail": values.email || null,
                "department": values.department || null,
                "designation": values.designation || null,
                "salesUser": {
                    id: values?.salesEmployee?.id,
                    version: values?.salesEmployee?.version
                },
                "accountManager": {
                    id: values?.keyAccountManager?.id,
                    version: values?.keyAccountManager?.version
                },
                "serviceType": "AIR",
                "cin": values.CINnumber || null,
                "gst": values.GSTnumber || null,
                "pan": values.PANnumber || null,
                "entityType": values.entityType || null,
                "industryType": values.industryType || null,
                "type": values.customerType || null,
                "status": "ACTIVE",
                "addresses": [],
                "contacts": [],
                "documents": [],
            }

            console.log(projectUATRequestDTO, "projectUATRequestDTO");
            formData.append('file', image);
            formData.append('tenantCustomer', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));
            dispatch(getAllCustomerDetailsData(formData));
            toggleTabProgress(2);
            // companyDetailsFormik.resetForm();
        },
    })

    useEffect(() => {
        if (parties_state_details && parties_state_details?.content?.length > 0) {
            companyDetailsFormik.setFieldValue("state", parties_state_details?.content[0]?.stateName)
        }
        if (parties_country_details && parties_country_details?.content?.length > 0) {
            companyDetailsFormik.setFieldValue("country", parties_country_details?.content[0]?.countryName)
        }
    }, [parties_state_details, parties_country_details, parties_pincode_details, parties_all_details]);

    const optionOfEmployee = parties_all_employee_details?.content || [];

    const salesEmployeeOptions = optionOfEmployee?.map((item) => ({
        value: item?.firstName,
        label: item?.firstName,
        id: item?.id,
        version: item?.version
    }));

    const accountManagerOptions = optionOfEmployee?.map((item) => {
        return {
            value: item?.firstName,
            label: item?.firstName,
            id: item?.id,
            version: item?.version
        }
    })

    const onUploadChange = (file) => {
        console.log(file.name, "file")
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // When the file is loaded, set the Data URL in the state
                setLogoFile(e.target.result);
            };

            // Read the file as a Data URL
            reader.readAsDataURL(file);
        }
        companyDetailsFormik.setFieldValue("image", file);
    };

    return (
        <>
            <div className="text-center mb-4">
                <h5>Company Details</h5>
            </div>
            <Card>
                <CardBody>
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
                                        companyDetailsFormik.setFieldValue('state', '');
                                        companyDetailsFormik.setFieldValue('country', '');
                                        companyDetailsFormik.setFieldValue('zipcode', '');
                                        const cityData = parties_city_details?.content?.find((city) => city.cityName === e.target.value);
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
                </CardBody>
            </Card>
            {/* Primary Contact Details */}
            <div className="text-center mb-4">
                <h5>Primary Contact Details</h5>
            </div>
            <Card>
                <CardBody>
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
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Sales Employee</label>
                                <Select
                                    name='salesEmployee'
                                    value={companyDetailsFormik?.values?.salesEmployee || ''}
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setSalesEmployeeModal(true)
                                        }
                                        companyDetailsFormik.setFieldValue(`salesEmployee`, e);
                                    }}
                                    options={salesEmployeeOptions}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Key Account Manager</label>
                                <Select
                                    name='keyAccountManager'
                                    value={companyDetailsFormik?.values?.keyAccountManager || ''}
                                    onChange={(e) => {
                                        if (e.label == "Add New") {
                                            setKeyAccountManagerModal(true)
                                        }
                                        companyDetailsFormik.setFieldValue(`keyAccountManager`, e);
                                    }}
                                    options={accountManagerOptions}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Company identification */}
            <div className="text-center mb-4">
                <h5>Company identification</h5>
            </div>
            <Card>
                <CardBody>
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
                                        companyDetailsFormik.setFieldValue(`industryType`, e.value);
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
                                        companyDetailsFormik.setFieldValue(`customerType`, e.value);
                                    }}
                                    options={optionCustcustomerType}
                                    placeholder="Customer"
                                    // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                    classNamePrefix="select2-selection form-select"
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="d-flex justify-content-end" style={{ margin: "0 0 -62px" }}>
                <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center"
                    onClick={companyDetailsFormik.handleSubmit}
                >
                    Save
                    <i className="bx bx-chevron-right ms-1"></i>
                </button>
            </div>

            {/* onSubmitHandler={gstDetailsHandler} */}
            <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} />
            <ModalAddNewDepartment modal={departmentModal} onCloseClick={onCloseClick} />
            <ModalAddNewDesignation modal={designationModal} onCloseClick={onCloseClick} />
            <ModalAddNewSalesEmployee modal={salesEmployeeModal} onCloseClick={onCloseClick} />
            <ModalAddNewKeyAccountManager modal={keyAccountManagerModal} onCloseClick={onCloseClick} />
            <ModalAddNewCustomerType modal={customerTypeModal} onCloseClick={onCloseClick} />
            <ModalAddNewEntityType modal={entityTypeModal} onCloseClick={onCloseClick} />
            <ModalAddNewIndustryType modal={industryTypeModal} onCloseClick={onCloseClick} />
        </>
    );
}

export default CustomerCompDetails;