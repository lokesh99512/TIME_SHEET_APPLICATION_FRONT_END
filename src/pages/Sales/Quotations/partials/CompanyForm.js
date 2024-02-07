import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { Card, CardBody, Input } from 'reactstrap';
import { optionQuoteContactCode, optionQuoteContacttitle } from '../../../../common/data/sales';
const CompanyForm = () => {
    const { tenant_info } = useSelector((state) => state?.settings);

    const companyDetailsFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            customerName: tenant_info && tenant_info?.name || '-',
            address: tenant_info && tenant_info?.address || '-',
            city: tenant_info && tenant_info?.city?.cityName || '-',
            state: tenant_info && tenant_info?.state?.stateName || '-',
            country: tenant_info && tenant_info?.country?.countryName || '-',
            zipcode: tenant_info && tenant_info?.pinCode?.pin || '-',
            title: "Mr",
            contactName: tenant_info && tenant_info?.contactName,
            opCode: "+91",
            phoneNumber: tenant_info && tenant_info?.contactNumber || '-',
            email: tenant_info && tenant_info?.email || '-',
        }
    })
    return (
        <>
            <div className="customer_form_details">
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
                                            value={companyDetailsFormik?.values?.customerName}
                                            onChange={companyDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
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
                                            readOnly
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
                                            readOnly
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
                                            readOnly
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
                                            readOnly
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
                                            readOnly
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
                                                    readOnly
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
                                                    readOnly
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
                                            readOnly
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
