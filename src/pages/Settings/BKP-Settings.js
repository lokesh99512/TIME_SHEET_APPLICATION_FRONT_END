import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Card, CardBody, Container, FormFeedback, Input, Row } from "reactstrap";
import SimpleBar from "simplebar-react";
import { country_list, entityType, industryType, placeOfSupply, state_list } from "../../common/data/settings";
import { isAnyValueEmpty } from "../../components/Common/CommonLogic";
import { getAllCompanyDetailData, getBusinessData, getCompanyCityData, getCompanyCountryData, getCompanyDetailsData, getCompanyPincodeData, getCompanyStateData, getTaxDetailsData } from "../../store/Settings/actions";
import FileUpload from "./FileUpload";
import ModalAddGST from "./Modal/ModalAddGST";

const companyDetailsInitialValue = {
  image: "",
  companyName: "",
  contactNumber: "",
  email: "",
  companyAddress: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
};

const taxDetailsInitialValue = {
  pan: "",
  cin: "",
  transporterId: "",
  no: "",
  placeOfService: "",
  // moreGstNumbers: {
  //   gstNo: "",
  //   placeOfSupply: "",
  // },
};

const bussinessTypeInitialValue = {
  industryType: "",
  entityType: "",
};

const stateConverter = (num) => {
  return placeOfSupply.find((place) => +place.Code === +num)?.value;
};

const Settings = () => {
  const [gstModal, setGstModal] = useState(false);
  const [modalAlldata, setModalAllData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [viewGst, setViewGst] = useState(false);
  const [active, setActive] = useState("comapanyDetails");
  const [companyDetailsInitial, setCompanyDetailsInitial] = useState(
    companyDetailsInitialValue
  );
  const [taxDetailsInitial, setTaxDetailsInitial] = useState(
    taxDetailsInitialValue
  );
  const [bussinessTypeInitial, setBussinessTypeInitial] = useState(
    bussinessTypeInitialValue
  );
  const dispatch = useDispatch();

  const { settings_companydetails_data, settings_companyCity_data, settings_company_settings_all_data, settings_companyState_data, settings_companyCountry_data, settings_companyPincode_data } = useSelector(
    (state) => state?.settings
  );

  // console.log(settings_companydetails_data, "=======>>settings_company_settings_all_data")

  useEffect(() => {
    dispatch(getCompanyCityData())
    dispatch(getAllCompanyDetailData())
    // dispatch(getCompanyDetailsData())
    // dispatch(getCompanyDetailsData())
  }, [])

  useEffect(() => {
    if (settings_companyState_data && settings_companyState_data?.content?.length > 0) {
      companyDetailsFormik.setFieldValue("state", settings_companyState_data?.content[0]?.stateName)
    }
    if (settings_companyCountry_data && settings_companyCountry_data?.content?.length > 0) {
      companyDetailsFormik.setFieldValue("country", settings_companyCountry_data?.content[0]?.countryName)
    }
    if (settings_company_settings_all_data && settings_company_settings_all_data?.content?.length > 0) {
      // const url = window.URL.createObjectURL(new Blob([settings_company_settings_all_data?.content[0]?.logoPath]));
      companyDetailsFormik.setFieldValue("image", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.logoPath)
      companyDetailsFormik.setFieldValue("companyName", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.name)
      companyDetailsFormik.setFieldValue("contactNumber", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.contactNumber)
      companyDetailsFormik.setFieldValue("email", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.email)
      companyDetailsFormik.setFieldValue("companyAddress", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.address)
      companyDetailsFormik.setFieldValue("city", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.city?.cityName)
      companyDetailsFormik.setFieldValue("state", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.state?.stateName)
      companyDetailsFormik.setFieldValue("country", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.country?.countryName)
      companyDetailsFormik.setFieldValue("zipcode", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.pinCode?.pin)
      taxDetailsFormik.setFieldValue("pan", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.pan)
      taxDetailsFormik.setFieldValue("cin", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.cin)
      taxDetailsFormik.setFieldValue("transporterId", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.transporterId)
      taxDetailsFormik.setFieldValue("no", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.tenantGSTS[0]?.no)
      taxDetailsFormik.setFieldValue("placeOfService", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.tenantGSTS[0]?.placeOfService)
      bussinessTypeFormik.setFieldValue("industryType", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.industryType)
      bussinessTypeFormik.setFieldValue("entityType", settings_company_settings_all_data && settings_company_settings_all_data?.content[0]?.entityType)
    }

    // if(settings_companyPincode_data){
    //   companyDetailsFormik.setFieldValue("zipcode", settings_companyPincode_data?.content?.map((item)=>item?.pin))
    // }
    // console.log(companyDetailsFormik?.values, "companyDetailsFormik");
  }, [settings_companyState_data, settings_companydetails_data, settings_companyCountry_data, settings_companyPincode_data, settings_company_settings_all_data])

  const companyDetailsFormik = useFormik({
    initialValues: companyDetailsInitial,
    enableReinitialize: true,
    // validationSchema: Yup.object({
    //   email: schema.email
    // }),
    onSubmit: async ({ image, ...value }) => {
      console.log(value, "value");
      // console.log(image, "---image")
      let formData = new FormData();

      Object.keys(value).forEach((key) => {
        formData.append(key, value[key]);
      });
      const projectUATRequestDTO = {
        // "version": 44,
        // "entityType": "PUBLIC_LTD",
        // "industryType": "SUPPLY_CHAIN",
        "name": value.companyName,
        "address": value.companyAddress,
        "pinCode": {
          "version": 0,
          "id": 1,
          "pin": value.zipcode
        },
        "city": {
          "version": 0,
          "id": 1,
          "cityName": value.city
        },
        "state": {
          "version": 4,
          "id": 1,
          "stateName": value.state
        },
        "country": {
          "version": 0,
          "id": 5,
          "countryName": value.country
        },
        "logo": null,
        "logoPath": image.preview,
        "contactName": value.companyName,
        "contactNumber": value.contactNumber,
        "email": value.email,
      }

      // console.log(projectUATRequestDTO, "--projectUATRequestDTO");
      formData.append('file', image);
      formData.append('tenant', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));
      dispatch(getCompanyDetailsData(formData));
    },
  });
  const cstDetailsHandler = (data) => {
    setModalAllData((prev) => ([...prev, data]))
  }

  const taxDetailsFormik = useFormik({
    initialValues: taxDetailsInitial,
    enableReinitialize: true,
    onSubmit: (value) => {
      // console.log(value, "taxDetailsFormik value");
      // console.log(modalAlldata,"modalAlldata")
      const payload = {
        ...settings_companydetails_data,
        cin: value.cin,
        pan: value.pan,
        transporterId: value.transporterId,
        tenantGSTS: [
          {
            id: 1,
            no: value.no,
            placeOfService: value.placeOfService,
            address: companyDetailsFormik?.values?.companyAddress,
            pinCode: {
              "version": 0,
              "id": 1,
              "pin": companyDetailsFormik?.values?.zipcode
            },
            city: {
              "version": 0,
              "id": 1,
              "cityName": companyDetailsFormik?.values?.city
            },
            state: {
              "version": 4,
              "id": 1,
              "stateName": companyDetailsFormik?.values?.state
            },
            country: {
              "version": 0,
              "id": 5,
              "countryName": companyDetailsFormik?.values?.country
            },
            status: "ACTIVE"
          },
          ...modalAlldata
        ]
      }
      let data = {
        "createdDate": null,
        "modifiedDate": "2023-11-26T16:05:46",
        "version": 46,
        "modifiedBy": 2,
        "createdBy": null,
        "id": 1,
        "entityType": "PUBLIC_LTD",
        "industryType": "SUPPLY_CHAIN",
        "name": "XYZ",
        "address": "Behala, Kolkata",
        "pinCode": {
          "createdDate": null,
          "modifiedDate": null,
          "version": 0,
          "modifiedBy": null,
          "createdBy": null,
          "id": 1,
          "pin": "700094"
        },
        "city": {
          "createdDate": null,
          "modifiedDate": null,
          "version": 0,
          "modifiedBy": null,
          "createdBy": null,
          "id": 1,
          "cityName": "kolkata"
        },
        "state": {
          "createdDate": null,
          "modifiedDate": "2023-11-26T06:19:28",
          "version": 4,
          "modifiedBy": 2,
          "createdBy": null,
          "id": 1,
          "stateName": "WEST BENGAL"
        },
        "country": {
          "createdDate": "2023-09-15T14:32:27",
          "modifiedDate": "2023-09-15T14:32:27",
          "version": 0,
          "modifiedBy": 1,
          "createdBy": 1,
          "id": 2,
          "countryName": "INDIA"
        },
        "contactName": "Sumit Samaddar",
        "contactNumber": null,
        "email": "babisumit@gmail.com",
        "cin": "4556",
        "pan": "456",
        "transporterId": null,
        "logo": null,
        "logoPath": "/tmp/tariff-tales/Screenshot from 2023-10-19 09-51-46.png",
        "status": "ACTIVE",
        "subscriptionType": null,
        "tenantGSTS": [
          {
            "createdDate": "2023-11-26T16:18:21",
            "modifiedDate": "2023-11-26T16:18:21",
            "version": 0,
            "modifiedBy": 2,
            "createdBy": 2,
            "id": 1,
            "no": "153698745",
            "address": "Kolkata2",
            "pinCode": {
              "createdDate": null,
              "modifiedDate": null,
              "version": 0,
              "modifiedBy": null,
              "createdBy": null,
              "id": 1,
              "pin": "700094"
            },
            "city": {
              "createdDate": null,
              "modifiedDate": null,
              "version": 0,
              "modifiedBy": null,
              "createdBy": null,
              "id": 1,
              "cityName": "kolkata"
            },
            "state": {
              "createdDate": null,
              "modifiedDate": "2023-11-26T06:19:28",
              "version": 4,
              "modifiedBy": 2,
              "createdBy": null,
              "id": 1,
              "stateName": "WEST BENGAL"
            },
            "country": {
              "createdDate": "2023-09-15T14:32:27",
              "modifiedDate": "2023-09-15T14:32:27",
              "version": 0,
              "modifiedBy": 1,
              "createdBy": 1,
              "id": 2,
              "countryName": "INDIA"
            },
            "placeOfService": "Kolkata2",
            "status": "ACTIVE"
          },
          {
            "createdDate": "2023-11-26T16:18:21",
            "modifiedDate": "2023-11-26T16:18:21",
            "version": 0,
            "modifiedBy": 2,
            "createdBy": 2,
            "id": 2,
            "no": "153698745878",
            "address": "Kolkata3",
            "pinCode": {
              "createdDate": null,
              "modifiedDate": null,
              "version": 0,
              "modifiedBy": null,
              "createdBy": null,
              "id": 1,
              "pin": "700094"
            },
            "city": {
              "createdDate": null,
              "modifiedDate": null,
              "version": 0,
              "modifiedBy": null,
              "createdBy": null,
              "id": 1,
              "cityName": "kolkata"
            },
            "state": {
              "createdDate": null,
              "modifiedDate": "2023-11-26T06:19:28",
              "version": 4,
              "modifiedBy": 2,
              "createdBy": null,
              "id": 1,
              "stateName": "WEST BENGAL"
            },
            "country": {
              "createdDate": "2023-09-15T14:32:27",
              "modifiedDate": "2023-09-15T14:32:27",
              "version": 0,
              "modifiedBy": 1,
              "createdBy": 1,
              "id": 2,
              "countryName": "INDIA"
            },
            "placeOfService": "Kolkata3",
            "status": "ACTIVE"
          }
        ]
      }

      console.log(payload,"payload")

      // dispatch(getTaxDetailsData(data));
      // taxDetailsFormik.resetForm();
    },
  });

  const bussinessTypeFormik = useFormik({
    initialValues: bussinessTypeInitial,
    enableReinitialize: true,
    onSubmit: (value) => {
      console.log(value, "---bussinessTypeFormikvalue");

      // const formdata = new FormData();

      // Object.keys(value).forEach((key) => {
      //   formdata.append(key, value[key]);
      // });

      // const projectUATRequestDTO = {
      //   "id": 1,
      //   "version": 81,
      //   "entityType": value.entityType,
      //   "industryType": value.industryType
      // }

      // console.log(projectUATRequestDTO, "--BUSINESSprojectUATRequestDTO");

      // formdata.append('tenant', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));

      dispatch(getBusinessData(value))
      // bussinessTypeFormik.resetForm();
    },
  });

  const onCloseClick = () => {
    setGstModal(false);
  };

  const gstNumberHandler = (e) => {
    taxDetailsFormik.handleChange(e);
    taxDetailsFormik.setFieldValue(
      "placeOfService",
      stateConverter(e.target.value.substring(0, 2))
    );
  };

  const onUploadChange = (file) => {
    console.log(file, "file");
    companyDetailsFormik.setFieldValue("image", file)
  };

  // useEffect(() => {
  //   dispatch(getCompanyDetailsData());
  // }, []);

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
                              setActive("comapanyDetails")
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
                              setActive("taxDetails")
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
                              setActive("bussinessType")
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
                  <Card id="comapanyDetails" className="mb-4">
                    <CardBody>
                      <div>
                        <h5>Company Details</h5>
                      </div>
                      <div className="row mt-4">
                        <div className="col-12 col-md-4 mb-4">
                          <label className="form-label">Image</label>
                          <FileUpload
                            iconName="img"
                            name="image"
                            onUpload={onUploadChange}
                            src={companyDetailsFormik?.values?.image || ""}
                            className="form-control"
                          />
                        </div>

                        <div className="col-12 col-md-8 mb-4">
                          <label className="form-label">Company Name</label>
                          <Input
                            type="text"
                            name="companyName"
                            value={companyDetailsFormik?.values?.companyName}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Contact Number</label>
                          <Input
                            type="text"
                            name="contactNumber"
                            value={companyDetailsFormik?.values?.contactNumber || ''}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Email id</label>
                          <Input
                            type="text"
                            name="email"
                            value={companyDetailsFormik?.values?.email || ''}
                            onChange={companyDetailsFormik.handleChange}
                            onBlur={companyDetailsFormik.handleBlur}
                            className="form-control"
                            invalid={
                              companyDetailsFormik.touched.email && companyDetailsFormik.errors.email ? true : false
                            }
                            placeholder=""
                          />
                          {companyDetailsFormik.touched.email && companyDetailsFormik.errors.email ? (
                            <FormFeedback type="invalid">{companyDetailsFormik.errors.email}</FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mb-4">
                          <label className="form-label">Company Address</label>
                          <Input
                            type="text"
                            name="companyAddress"
                            value={companyDetailsFormik?.values?.companyAddress || ''}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">City</label>
                          <Input
                            type="text"
                            name="city"
                            list="cityList"
                            value={companyDetailsFormik?.values?.city || ''}
                            onChange={(e) => {
                              companyDetailsFormik.handleChange(e);
                              const cityData = settings_companyCity_data?.content?.find((city) => city.cityName === e.target.value)
                              if (cityData) {
                                dispatch(getCompanyStateData({ cityId: cityData.id }));
                                dispatch(getCompanyCountryData({ cityId: cityData.id }));
                                dispatch(getCompanyPincodeData({ cityId: cityData.id }));
                              }
                            }
                            }
                            className="form-control"
                            placeholder=""
                          />
                          <datalist id="cityList">
                            {settings_companyCity_data && settings_companyCity_data?.content?.map((item, i) => <option key={i} value={item.cityName} />)}
                          </datalist>
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">State</label>
                          <Input
                            type="text"
                            name="state"
                            list="stateList"
                            value={companyDetailsFormik?.values?.state || ''}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                          <datalist id="stateList">
                            {state_list && state_list.map((item, i) => <option key={i} value={item} />)}
                          </datalist>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Zipcode</label>
                          <Input
                            type="text"
                            name="zipcode"
                            list="zipcodeList"
                            value={companyDetailsFormik?.values?.zipcode || ''}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                          <datalist id="zipcodeList">
                            {settings_companyPincode_data && settings_companyPincode_data?.content?.map((item, i) => <option key={i} value={item.pin} />)}
                          </datalist>
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Country</label>
                          <Input
                            type="text"
                            name="country"
                            list="countryList"
                            value={companyDetailsFormik?.values?.country || ''}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                          <datalist id="countryList">
                            {country_list && country_list.map((item, i) => <option key={i} value={item} />)}
                          </datalist>
                        </div>
                      </div>

                      <div className="row">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button onClick={companyDetailsFormik.handleSubmit} className=" btn btn-primary" >
                              Save
                            </button>
                          </div>
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button onClick={() => companyDetailsFormik.resetForm()} className=" btn btn-primary">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Tax Details  */}
                  <Card id="taxDetails" className="my-4">
                    <CardBody>
                      <div>
                        <h5>Tax Details</h5>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">Pan Number</label>
                          <Input
                            type="text"
                            name="pan"
                            value={taxDetailsFormik?.values?.pan || ''}
                            onChange={taxDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">CIN Number</label>
                          <Input
                            type="text"
                            name="cin"
                            value={taxDetailsFormik?.values?.cin || ''}
                            onChange={taxDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mb-4">
                          <label className="form-label">Transporter ID</label>
                          <Input
                            type="text"
                            name="transporterId"
                            value={taxDetailsFormik?.values?.transporterId || ''}
                            onChange={taxDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">GST Number</label>
                          <Input
                            type="text"
                            name="no"
                            onChange={gstNumberHandler}
                            value={taxDetailsFormik?.values?.no || ''}
                            // value={modalAlldata?.no|| ''}
                            className="form-control"
                            placeholder="Enter GST Number"
                          />
                        </div>

                        <div className="col-10 col-md-5 mb-4">
                          <label className="form-label">Place of Supply</label>
                          <Select
                            value={
                              placeOfSupply
                                ? placeOfSupply.find(
                                  (option) =>
                                    option.value ===
                                    taxDetailsFormik?.values?.placeOfSupply
                                )
                                : ""
                              // modalAlldata?.placeOfService
                            }
                            name="placeOfService"
                            options={placeOfSupply}
                            placeholder={"Select Place of Supply"}
                            onChange={(e) => {
                              taxDetailsFormik.setFieldValue(
                                `placeOfService`,
                                e.value
                              );
                            }}
                            classNamePrefix="select2-selection form-select"
                          />
                        </div>
                        <div className="col-2 col-md-1">
                          <button
                            className="btn btn-primary mt-4"
                            onClick={() => setGstModal(true)}
                          >
                            <i className="bx bx-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div className="row mt-4 mb-2">
                        <a className="col-12 col-md-6 mb-4 d-flex">
                          <p>
                            {taxDetailsFormik?.values?.moreGstNumbers?.length}{" "}
                            More GST available{" "}
                          </p>
                          <p
                            onClick={() => {
                              setViewGst((prev) => !prev);
                            }}
                          >
                            View {viewGst ? "less" : "More"}
                          </p>
                        </a>
                      </div>
                      {/* ------------ map GST ------ */}
                      {viewGst &&
                        taxDetailsFormik?.values?.moreGstNumbers?.map(
                          (gst, key) => {
                            return (
                              <div className="row" key={key}>
                                <div className="col-12 col-md-6 mb-4">
                                  <label className="form-label">
                                    GST Number
                                  </label>
                                  <Input
                                    type="text"
                                    name="moreGstNumbers.gstNo"
                                    onChange={gstNumberHandler}
                                    value={gst?.gstNo}
                                    className="form-control"
                                    placeholder=""
                                  />
                                </div>

                                <div className="col-10 col-md-5 mb-4">
                                  <label className="form-label">
                                    Place of Supply
                                  </label>
                                  <Select
                                    value={
                                      placeOfSupply
                                        ? placeOfSupply.find(
                                          (option) =>
                                            option.value ===
                                            gst?.placeOfSupply
                                        )
                                        : ""
                                    }
                                    name="moreGstNumbers.placeOfSupply"
                                    options={placeOfSupply}
                                    onChange={(e) => {
                                      taxDetailsFormik.setFieldValue(
                                        `placeOfSupply`,
                                        e.value
                                      );
                                    }}
                                    placeholder={"Select Place of Supply"}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                                <div className="col-2 col-md-1">
                                  <button className="btn border mt-4" >
                                    <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                  </button>
                                </div>
                              </div>
                            );
                          }
                        )}

                      {/* ----------- more GST --------------- */}

                      <div className="row">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button
                              onClick={taxDetailsFormik.handleSubmit}
                              className=" btn btn-primary"
                            // disabled={isAnyValueEmpty(taxDetailsFormik.values)}
                            >
                              Save
                            </button>
                          </div>
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button
                              onClick={() => taxDetailsFormik.resetForm()}
                              className=" btn btn-primary"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

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
                              disabled={isAnyValueEmpty(bussinessTypeFormik.values)}
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
          <ModalAddGST modal={gstModal} onSubmitHandler={cstDetailsHandler} onCloseClick={onCloseClick} />
        </Container>
      </div>
    </>
  );
};

export default Settings;
