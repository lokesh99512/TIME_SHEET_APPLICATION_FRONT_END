import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Row
} from "reactstrap";
import { getCustomersCityData, getCustomersCountryData, getCustomersPincodeData, getCustomersStateData } from "../../store/Parties/actions";
import { getAllTenantLocationType, postTenantLocation } from "../../store/Settings/actions";
import AddTenantLocationType from "./Modal/AddTenentType";

export default function AddTanentLocation() {
    const [tenentType, setAddTenentType] = useState(false);
    const [locationType, setLocationType] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { parties_city_details, parties_all_details, parties_state_details, parties_country_details, parties_pincode_details } = useSelector((state) => state?.parties);
    const { tenant_all_location_type_data } = useSelector((state) => state.settings);

    useEffect(() => {
        if (parties_state_details && parties_state_details?.content?.length > 0) {
            addLocationFormik.setFieldValue("state", parties_state_details?.content[0]?.stateName)
        }
        if (parties_country_details && parties_country_details?.content?.length > 0) {
            addLocationFormik.setFieldValue("country", parties_country_details?.content[0]?.countryName)
        }
    }, [parties_state_details, parties_country_details, parties_pincode_details, parties_city_details, parties_all_details]);
    useEffect(() => {
        dispatch(getAllTenantLocationType())
        dispatch(getCustomersCityData())
    }, []);

    const addLocationFormik = useFormik({
        initialValues: {
            name: "",
            tenantLocationType: "",
            address: "",
            state: "",
            contactName: "",
            contactNo: "",
            city: "",
            zipcode: "",
            country: "",
            email: "",
        },
        onSubmit: (values) => {
            console.log(values, "values");
            let countryVal = parties_country_details?.content?.filter((con) => con?.countryName === values?.country) || [];
            let cityVal = parties_city_details?.content?.filter((city) => city?.cityName === values?.city) || [];
            let stateVal = parties_state_details?.content?.filter((state) => state?.stateName === values?.state) || [];
            let pincodeVal = parties_pincode_details?.content?.filter((pin) => pin?.pin === values?.zipcode) || [];
            console.log(parties_state_details);
            let locationtypeVal = tenant_all_location_type_data?.content?.filter((type) => type?.typeName === values?.tenantLocationType?.label);
            console.log(tenant_all_location_type_data.content);
            const tenantLocation = {
                "name": values.name || "",
                "address": values.address || null,
                "zipcode": values.zipcode || null,
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
                ...(locationtypeVal?.length !== 0 && {
                    "tenantLocationType": {
                        id: locationtypeVal[0]?.id,
                        version: locationtypeVal[0]?.version
                    },
                }),
                "contactNo": values.contactNo || null,
                "email": values.email || null,
                "contactName": values.contactName || null,
            }
            console.log(tenantLocation);
            dispatch(postTenantLocation(tenantLocation));
            addLocationFormik.resetForm();
        },
    })
    useEffect(() => {
        const newLocationType = tenant_all_location_type_data?.content?.map(locationtype => ({
            value: locationtype.id,
            label: locationtype.typeName,
            id: locationtype.id,
        })) || [];

        const addNewItem = {
            value: 'add_new',
            label: 'Add New',
        };
        console.log(tenant_all_location_type_data);

        setLocationType([...newLocationType, addNewItem]);
    }, [tenant_all_location_type_data]);
    const onCloseClick = () => {
        dispatch(getAllTenantLocationType()); 
        setAddTenentType(false);
    };

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper surcharges_add_form_wrap">
                        <button type="button" className="btn border mb-3" onClick={() => { navigate(-1); }} > Back </button>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Location Name*</label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="name"
                                                            value={addLocationFormik?.values?.name}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("name", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            id="Surcharge_Code"
                                                            placeholder="Enter Location Name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Location Type*</label>

                                                    <div className="">
                                                        <Select
                                                            value={addLocationFormik?.values?.tenantLocationType}
                                                            name="tenantLocationType"
                                                            onChange={(opt) => {
                                                                if (opt.label == "Add New") {
                                                                    setAddTenentType(true)
                                                                } else {
                                                                    addLocationFormik.setFieldValue("tenantLocationType", opt);
                                                                }
                                                            }}
                                                            options={locationType}
                                                            placeholder={"Select location type"}
                                                            classNamePrefix="select2-selection form-select"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Comapany Address</label>

                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="address"
                                                            value={addLocationFormik?.values?.address}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("address", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="mb-3">
                                                    <label className="form-label">City*</label>
                                                    <Input
                                                        type="text"
                                                        name="city"
                                                        list='cityList'
                                                        value={addLocationFormik.values.city}
                                                        onChange={(e) => {
                                                            addLocationFormik.handleChange(e);
                                                            addLocationFormik.setFieldValue('state', '');
                                                            addLocationFormik.setFieldValue('country', '');
                                                            addLocationFormik.setFieldValue('zipcode', '');
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

                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Country*</label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="country"
                                                            value={addLocationFormik.values.country}
                                                            onChange={addLocationFormik.handleChange}
                                                            className="form-control"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">State</label>

                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="state"
                                                            value={addLocationFormik?.values?.state}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("state", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter state"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Zipcode</label>

                                                    <div className="">
                                                        <Input
                                                            type="number"
                                                            name="zipcode"
                                                            value={addLocationFormik?.values?.zipcode}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("zipcode", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter zipcode"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Contact Name</label>

                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="contactName"
                                                            value={addLocationFormik?.values?.contactName}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("contactName", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter contactName"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Contact No</label>
                                                    <div className="">
                                                        <Input
                                                            type="number"
                                                            name="contactNo"
                                                            value={addLocationFormik?.values?.contactNo}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("contactNo", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter contactNo"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-4">
                                                <div className="row">
                                                    <label className="form-label">Contact Email</label>
                                                    <div className="">
                                                        <Input
                                                            type="text"
                                                            name="email"
                                                            value={addLocationFormik?.values?.email}
                                                            onChange={(e) => {
                                                                addLocationFormik.setFieldValue("email", e.target.value);
                                                            }}
                                                            className="form-control"
                                                            placeholder="Enter email"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="d-flex justify-content-center">
                                                <div className="mb-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" onClick={() => addLocationFormik.handleSubmit()}>Save</button>
                                                </div>
                                                <div className="mb-3 mx-3 d-flex justify-content-end">
                                                    <button className=" btn btn-primary" onClick={() => addLocationFormik.resetForm()}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        {/* <ModalAddNewCategory
              modal={categoryModal}
              onCloseClick={onCloseClick}
            /> */}
                        <AddTenantLocationType modal={tenentType} onCloseClick={onCloseClick} />
                    </div>
                </Container>
            </div>
        </>
    );
}
