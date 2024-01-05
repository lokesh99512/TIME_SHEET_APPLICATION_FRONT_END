import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
    Card,
    CardBody,
    Container,
    Input,
    Row
} from "reactstrap";
import SimpleBar from "simplebar-react";
import {
    entityType,
    industryType,
    placeOfSupply
} from "../../common/data/settings";
import { isAnyValueEmpty } from "../../components/Common/CommonLogic";
import {
    getAllCompanyDetailData,
    getBusinessData,
    getCompanyCityData,
    getCompanyDetailsData,
    getTaxDetailsData,
    postSettingsCompanyDetailsAction
} from "../../store/Settings/actions";
import ModalAddGST from "./Modal/ModalAddGST";
import CompanyDetailsForm from "./partials/CompanyDetailsForm";
import { comapanySchema } from "./schema";
import SettingsTaxDetails from "./partials/SettingsTaxDetails";
import { GET_STATE_ALL_TYPE } from "../../store/Global/actiontype";

const Settings = () => {
    const [gstModal, setGstModal] = useState(false);
    const [modalAlldata, setModalAllData] = useState([]);
    const [active, setActive] = useState("comapanyDetails");
    const stateAllData = useSelector((state) => state?.globalReducer?.stateAllData);
    const dispatch = useDispatch();

    const {
        settings_companydetails_data,
        settings_companyCity_data,
        settings_company_settings_all_data,
        settings_companyState_data,
        settings_companyCountry_data,
        settings_companyPincode_data,
    } = useSelector((state) => state?.settings);

    useEffect(() => {
        dispatch(getCompanyCityData());
        dispatch(getAllCompanyDetailData());
        dispatch({ type: GET_STATE_ALL_TYPE });
    }, []);

    useEffect(() => {
        if (settings_company_settings_all_data && settings_company_settings_all_data?.imageData !== undefined) {
            let imageData = settings_company_settings_all_data?.imageData;
            // const base64Image = window.btoa(String.fromCharCode.apply(null, new Uint8Array(imageData)));
            // const url = window.URL.createObjectURL(new Blob([imageData]));
            const blob = new Blob([imageData], { type: 'image/jpeg' });
            const objectURL = URL.createObjectURL(blob);
            // Create a data URL
            // const dataURL = 'data:image/jpeg;base64,' + base64Image;
            // console.log(imageData, "imgUrbase64Imagel")
            companyDetailsFormik.setFieldValue("image", objectURL);
            URL.revokeObjectURL(objectURL);
        }
    }, [settings_company_settings_all_data,]);

    const companyDetailsFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: "",
            companyName: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.name || "",
            contactNumber: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.contactNumber || "",
            email: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.email || "",
            companyAddress: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.address || "",
            city: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.city?.cityName || "",
            state: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.state?.stateName || "",
            zipcode: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.pinCode?.pin || "",
            country: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.country?.countryName || "",
        },
        validationSchema: comapanySchema,

        onSubmit: async ({ image, ...value }) => {
            const pincodeData = settings_companyPincode_data?.content?.find((pinCodeEntry) => pinCodeEntry.pin === value.zipcode) || [];
            const cityData = settings_companyCity_data?.content?.find((city) => city.cityName === value.city) || [];
            const stateData = settings_companyState_data?.content?.find((state) => state.stateName === value.state) || [];
            const countryData = settings_companyCountry_data?.content?.find((con) => con.countryName === value.country) || [];
            const projectUATRequestDTO = {
                name: value.companyName || "",
                address: value.companyAddress || null,
                ...(pincodeData?.length !== 0 && {
                    pinCode: {
                        version: pincodeData.version,
                        id: pincodeData.id,
                    },
                }),
                ...(cityData?.length !== 0 && {
                    city: {
                        version: cityData.version,
                        id: cityData.id,
                    },
                }),
                ...(stateData?.length !== 0 && {
                    state: {
                        version: stateData.version,
                        id: stateData.id,
                    },
                }),
                ...(countryData?.length !== 0 && {
                    country: {
                        version: countryData.version,
                        id: countryData.id,
                    },
                }),
                logo: "",
                logoPath: image?.path || '',
                contactName: value.companyName || null,
                contactNumber: value.contactNumber || null,
                email: value.email || null,
            };

            console.log("finaly Company  payload:-", image, projectUATRequestDTO);
            const formData = new FormData();
            formData.append("file", image);
            const jsonBlob = new Blob([JSON.stringify(projectUATRequestDTO)], {
                type: "application/json",
            });
            formData.append("tenant", jsonBlob);
            dispatch(postSettingsCompanyDetailsAction(formData));
        },
    });
    const cstDetailsHandler = (data) => {
        setModalAllData((prev) => [...prev, data]);
    };

    const taxDetailsFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            pan: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.pan || "",
            cin: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.cin || "",
            transporterId: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.transporterId || "",
            no: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.tenantGSTS[0]?.no || "",
            placeOfService: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.tenantGSTS[0]?.placeOfService || "",
            moreGstNumbers: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.tenantGSTS?.slice(1).map((item) => ({
                no: item?.no,
                placeOfService: item?.placeOfService,
                address: item?.address,
                city: item?.city,
                state: item?.state,
                country: item?.country,
                pinCode: item?.pinCode,
            })) || [],
        },
        onSubmit: (values) => {      
            let singleVal = values?.no !== "" && values?.placeOfService !== "" && [{ no: values?.no, placeOfService: values?.placeOfService }] || [];     
            let mergeArray = [...values?.moreGstNumbers, ...modalAlldata, ...singleVal];

            const payload = {
                id: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.id || null,
                version: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.version || null,
                cin: values.cin || null,
                pan: values.pan || null,
                transporterId: values.transporterId || null,
                tenantGSTS: mergeArray?.length !== 0 && mergeArray || [],
            };

            console.log(payload,"payload");

            dispatch(getTaxDetailsData(payload));
        },
    });

    console.log(taxDetailsFormik.values,"taxDetailsFormik");

    const bussinessTypeFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            industryType: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.industryType || null,
            entityType: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.entityType || null,
        },
        onSubmit: (value) => {
            const projectUATRequestDTO = {
                id: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.id || null,
                version: settings_company_settings_all_data?.content !== undefined && settings_company_settings_all_data?.content[0]?.version || null,
                entityType: value.entityType || null,
                industryType: value.industryType || null,
            };

            dispatch(getBusinessData(projectUATRequestDTO));
        },
    });

    const onCloseClick = () => {
        setGstModal(false);
    };
    return (
        <>
            <div className="page-content settings_wrapper">
                <Container fluid>
                    <Row>
                        <div className="col-12 col-md-2">
                            <Card className="h-100">
                                <SimpleBar style={{ maxHeight: "100%" }}>
                                    <div id="sidebar-menu" className="settings_sidebar">
                                        <ul className="metismenu list-unstyled" id="side-menu">
                                            <li>
                                                <span>
                                                    <a
                                                        href="#comapanyDetails"
                                                        onClick={() => {
                                                            setActive("comapanyDetails");
                                                            // scrollToSection("comapanyDetails")
                                                        }}
                                                        className={
                                                            active === "comapanyDetails" ? "active" : ""
                                                        }
                                                    >
                                                        Company Details
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <a
                                                        href="#taxDetails"
                                                        onClick={() => {
                                                            setActive("taxDetails");
                                                            // scrollToSection("taxDetails")
                                                        }}
                                                        className={active === "taxDetails" ? "active" : ""}
                                                    >

                                                        Tax Details
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <a
                                                        href="#bussinessType"
                                                        onClick={() => {
                                                            setActive("bussinessType");
                                                            // scrollToSection("bussinessType")
                                                        }}
                                                        className={
                                                            active === "bussinessType" ? "active" : ""
                                                        }
                                                    >
                                                        Bussiness Type
                                                    </a>
                                                </span>
                                            </li>

                                            {/* ------disabled options--------- */}
                                            <li>
                                                <span className="opacity-50">
                                                    <a>Security</a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="opacity-50">
                                                    <a>Branding</a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="opacity-50">
                                                    <a>Invoice Themes</a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="opacity-50">
                                                    <a>Delete Account</a>
                                                </span>
                                            </li>
                                            {/* ------disabled options--------- */}
                                        </ul>
                                    </div>
                                </SimpleBar>
                            </Card>
                        </div>

                        {/* ------------------- */}
                        <div className="col-12 col-md-10">
                            <Card className="">
                                <PerfectScrollbar className="p-4" style={{ height: "802px" }}>
                                    {/* Comapany details  */}
                                    <CompanyDetailsForm companyDetailsFormik={companyDetailsFormik} />

                                    {/* Tax Details  */}
                                    <SettingsTaxDetails taxDetailsFormik={taxDetailsFormik} setGstModal={setGstModal} />

                                    {/* Bussiness Type */}
                                    <Card id="bussinessType" className="my-4 mb-auto">
                                        <CardBody>
                                            <div>
                                                <h5>Bussiness Type</h5>
                                            </div>

                                            <div className="row mt-4">
                                                <div className="col-12 col-md-6 mb-4">
                                                    <label className="form-label">Industry Type</label>
                                                    <Select
                                                        value={
                                                            industryType
                                                                ? industryType.find(
                                                                    (option) =>
                                                                        option.value ===
                                                                        bussinessTypeFormik?.values?.industryType
                                                                )
                                                                : ""
                                                        }
                                                        name="industryType"
                                                        onChange={(e) => {
                                                            bussinessTypeFormik.setFieldValue(
                                                                `industryType`,
                                                                e.value
                                                            );
                                                        }}
                                                        options={industryType}
                                                        placeholder={"Enter Industry Type"}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-4">
                                                    <label className="form-label">Entity Type</label>
                                                    <Select
                                                        value={
                                                            entityType
                                                                ? entityType.find(
                                                                    (option) =>
                                                                        option.value ===
                                                                        bussinessTypeFormik?.values?.entityType
                                                                )
                                                                : ""
                                                        }
                                                        name="entityType"
                                                        onChange={(e) => {
                                                            bussinessTypeFormik.setFieldValue(
                                                                `entityType`,
                                                                e.value
                                                            );
                                                        }}
                                                        options={entityType}
                                                        placeholder={"Enter Entity Type"}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="d-flex justify-content-center">
                                                    <div className="mb-3 mx-3 d-flex justify-content-end">
                                                        <button
                                                            onClick={bussinessTypeFormik.handleSubmit}
                                                            className=" btn btn-primary"
                                                            disabled={isAnyValueEmpty(
                                                                bussinessTypeFormik.values
                                                            )}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                    <div className="mb-3 mx-3 d-flex justify-content-end">
                                                        <button
                                                            onClick={() => bussinessTypeFormik.resetForm()}
                                                            className=" btn btn-primary"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <div style={{ height: "525px" }}></div>
                                </PerfectScrollbar>
                            </Card>
                        </div>
                    </Row>
                    <ModalAddGST
                        modal={gstModal}
                        onSubmitHandler={cstDetailsHandler}
                        onCloseClick={onCloseClick}
                    />
                </Container>
            </div>
        </>
    );
};

export default Settings;
