import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { Card, CardBody, Input } from 'reactstrap';
import { optionQuoteContactCode, optionQuoteContacttitle } from '../../../../common/data/sales';
import { useSelector } from 'react-redux';

const companyDetails = {
    id: 1,
    customerName: "Apex Export Pvt Ltd",
    address: "12, Golden plazza",
    city: "Banglore",
    state: "Kolkata",
    country: "India",
    zipcode: "123456",
    title: "Mr",
    contactName: "Ajay",
    opCode: "+91",
    phoneNumber: "9800012345",
    email: "a@gmail.com",
}

const CompanyForm = () => {
    const searchData = useSelector((state) => state?.instantRate?.searchForm);
    const {settings_company_settings_all_data} = useSelector((state) => state?.settings);
    const [companyDetailsInitial, setCompanyDetailsInitial] = useState(companyDetails);

    useEffect(() => {
        setCompanyDetailsInitial(companyDetails)
    }, [])

    const companyDetailsFormik = useFormik({
        initialValues: {
            customerName: "Apex Export Pvt Ltd",
            address: "12, Golden plazza",
            city: "Banglore",
            state: "Kolkata",
            country: "India",
            zipcode: "123456",
            title: "Mr",
            contactName: "Ajay",
            opCode: "+91",
            phoneNumber: "9800012345",
            email: "a@gmail.com",
        }
    })
    console.log(searchData,"searchData");
    return (
        <>
            <div className="customer_form_details">
                <Card>
                    <CardBody>
                        <form>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    {/* {console.log(companyDetailsFormik?.values,"testing")} */}
                                    <div className="mb-3">
                                        <label className="form-label">Company name</label>
                                        <Input
                                            type="text"
                                            name="companyName"
                                            value={companyDetailsFormik?.values?.customerName}
                                            onChange={companyDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
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
                            </div>
                            <div className='row'>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Contact Name</label>
                                        <div className='row'>
                                            <div className='col-4 col-md-2'>
                                                <Select
                                                    name='title'
                                                    value={
                                                        optionQuoteContacttitle ? optionQuoteContacttitle.find((option) => option.value === companyDetailsFormik?.values?.title) : ""
                                                    }
                                                    onChange={(e) => {
                                                        companyDetailsFormik.setFieldValue(`title`, e.value);
                                                    }}
                                                    placeholder="Mr"
                                                    options={optionQuoteContacttitle}
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
                                                    value={optionQuoteContactCode ? optionQuoteContactCode.find((option) => option.value === companyDetailsFormik?.values?.opCode) : ""}
                                                    onChange={(e) => {
                                                        companyDetailsFormik.setFieldValue(`opCode`, e.value);
                                                    }}
                                                    placeholder="+91"
                                                    options={optionQuoteContactCode}
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
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default CompanyForm;
