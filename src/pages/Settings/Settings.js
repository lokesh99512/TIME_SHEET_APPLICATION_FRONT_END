import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Row,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import {
  country_list,
  entityType,
  industryType,
  placeOfSupply,
  state_list,
} from "../../common/data/settings";
import { isAnyValueEmpty } from "../../components/Common/CommonLogic";
import {
  getAllCompanyDetailData,
  getBusinessData,
  getCompanyCityData,
  getCompanyCountryData,
  getCompanyDetailsData,
  getCompanyPincodeData,
  getCompanyStateData,
  getTaxDetailsData,
} from "../../store/Settings/actions";
import FileUpload from "./FileUpload";
import ModalAddGST from "./Modal/ModalAddGST";
import { comapanySchema } from "./schema";
import CompanyDetailsForm from "./company-details-form/CompanyDetailsForm";
const stateConverter = (num) => {
  return placeOfSupply.find((place) => +place.Code === +num)?.value;
};

const Settings = () => {
  const [gstModal, setGstModal] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [modalAlldata, setModalAllData] = useState([]);
  const [tenantGSTSData, setTenantGSTSData] = useState([]);
  const [viewGst, setViewGst] = useState(false);
  const [active, setActive] = useState("comapanyDetails");
  const [logofile, setLogoFile] = useState("");

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
    moreGstNumbers: [
      {
        gstNo: "",
        placeOfService: "",
      },
    ],
  };

  const bussinessTypeInitialValue = {
    industryType: "",
    entityType: "",
  };

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
  }, []);

  useEffect(() => {
    if (
      settings_companyState_data &&
      settings_companyState_data?.content?.length > 0
    ) {
      companyDetailsFormik.setFieldValue(
        "state",
        settings_companyState_data?.content[0]?.stateName
      );
    }
    if (
      settings_companyCountry_data &&
      settings_companyCountry_data?.content?.length > 0
    ) {
      companyDetailsFormik.setFieldValue(
        "country",
        settings_companyCountry_data?.content[0]?.countryName
      );
    }
    if (
      settings_company_settings_all_data &&
      settings_company_settings_all_data?.content?.length > 0
    ) {
      // const url = window.URL.createObjectURL(new Blob([settings_company_settings_all_data?.content[0]?.logoPath]));
      companyDetailsFormik.setFieldValue(
        "image",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.logoPath
      );
      companyDetailsFormik.setFieldValue(
        "companyName",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.name
      );
      companyDetailsFormik.setFieldValue(
        "contactNumber",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.contactNumber
      );
      companyDetailsFormik.setFieldValue(
        "email",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.email
      );
      companyDetailsFormik.setFieldValue(
        "companyAddress",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.address
      );
      // companyDetailsFormik.setFieldValue(
      //   "city",
      //   settings_company_settings_all_data &&
      //     settings_company_settings_all_data?.content[0]?.city?.cityName
      // );
      // companyDetailsFormik.setFieldValue(
      //   "state",
      //   settings_company_settings_all_data &&
      //     settings_company_settings_all_data?.content[0]?.state?.stateName
      // );
      // companyDetailsFormik.setFieldValue(
      //   "country",
      //   settings_company_settings_all_data &&
      //     settings_company_settings_all_data?.content[0]?.country?.countryName
      // );
      // companyDetailsFormik.setFieldValue(
      //   "zipcode",
      //   settings_company_settings_all_data &&
      //     settings_company_settings_all_data?.content[0]?.pinCode?.pin
      // );
      taxDetailsFormik.setFieldValue(
        "pan",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.pan
      );
      taxDetailsFormik.setFieldValue(
        "cin",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.cin
      );
      taxDetailsFormik.setFieldValue(
        "transporterId",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.transporterId
      );
      taxDetailsFormik.setFieldValue(
        "no",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.tenantGSTS[0]?.no
      );
      taxDetailsFormik.setFieldValue(
        "placeOfService",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.tenantGSTS[0]
            ?.placeOfService
      );
      bussinessTypeFormik.setFieldValue(
        "industryType",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.industryType
      );
      bussinessTypeFormik.setFieldValue(
        "entityType",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.entityType
      );

      if (
        settings_company_settings_all_data?.content[0]?.tenantGSTS?.length >= 2
      ) {
        taxDetailsFormik.setFieldValue(
          "moreGstNumbers",
          settings_company_settings_all_data?.content[0]?.tenantGSTS
            ?.slice(0, 1)
            .map((item) => ({
              gstNo: item?.no,
              placeOfService: item?.placeOfService,
            }))
        );
      }
    }

    // if(settings_companyPincode_data){
    //   companyDetailsFormik.setFieldValue("zipcode", settings_companyPincode_data?.content?.map((item)=>item?.pin))
    // }
    // console.log(companyDetailsFormik?.values, "companyDetailsFormik");
  }, [
    settings_companyState_data,
    settings_companydetails_data,
    settings_companyCountry_data,
    settings_companyPincode_data,
    settings_company_settings_all_data,
  ]);
  useEffect(() => {
    if (settings_company_settings_all_data?.content?.length > 0) {
      const tenantGSTSArray =
        settings_company_settings_all_data.content[0]?.tenantGSTS || [];
      setTenantGSTSData(tenantGSTSArray);
    }
  }, [settings_company_settings_all_data]);
  const companyDetailsFormik = useFormik({
    initialValues: companyDetailsInitialValue,
    enableReinitialize: true,
    validationSchema: comapanySchema,

    onSubmit: async ({ image, ...value }) => {
      try {
        const targetPinCode = value.zipcode;

        if (
          settings_companyPincode_data.content &&
          settings_companyPincode_data.content.length > 0
        ) {
          const foundPinCodeEntry = settings_companyPincode_data.content.find(
            (pinCodeEntry) => pinCodeEntry.pin === targetPinCode
          );

          const targetCity = value.city;

          if (
            settings_companyCity_data.content &&
            settings_companyCity_data.content.length > 0
          ) {
            const foundCity = settings_companyCity_data.content.find(
              (city) => city.cityName === targetCity
            );
            console.log(value);
            const projectUATRequestDTO = {
              name: value.companyName,
              address: value.companyAddress,
              pinCode: {
                version: foundPinCodeEntry.version,

                id: foundPinCodeEntry.id,
                pin: foundPinCodeEntry.pin,
              },
              city: {
                version: foundCity.version,

                id: foundCity.id,
                cityName: foundCity.cityName,
              },
              state: {
                version: foundPinCodeEntry.state.version,

                id: foundPinCodeEntry.state.id,
                stateName: value.state,
              },
              country: {
                version: foundPinCodeEntry.country.version,
                id: foundPinCodeEntry.country.id,
                countryName: value.country,
              },
              logo: "",
              logoPath: "",
              contactName: value.companyName,
              contactNumber: value.contactNumber,
              email: value.email,
            };

            console.log("finaly Company  payload:-", projectUATRequestDTO);
            const formData = new FormData();
            formData.append("file", image);
            const jsonBlob = new Blob([JSON.stringify(projectUATRequestDTO)], {
              type: "application/json",
            });
            formData.append("tenant", jsonBlob);
            dispatch(getCompanyDetailsData(formData));
          } else {
            console.error("Error: City data is undefined or empty");
          }
        } else {
          console.error("Error: Pincode data is undefined or empty");
        }
      } catch (error) {
        console.error("Error in Vender:-", error);
      }
    },
  });
  const cstDetailsHandler = (data) => {
    setModalAllData((prev) => [...prev, data]);
  };

  const taxDetailsFormik = useFormik({
    enableReinitialize: true,
    initialValues: taxDetailsInitialValue,
    onSubmit: (values) => {
      // console.log("i am taxt details");

      const targetPinCode = companyDetailsFormik?.values?.zipcode;
      const foundPinCodeEntry = settings_companyPincode_data.content.find(
        (pinCodeEntry) => pinCodeEntry.pin === targetPinCode
      );
      const targetCity = companyDetailsFormik?.values?.city;

      const foundCity = settings_companyCity_data.content.find(
        (city) => city.cityName === targetCity
      );
      setCompanyData((prev) => {
        const payload = {
          // ...settings_companydetails_data,
          cin: values.cin,
          pan: values.pan,
          transporterId: values.transporterId,
          tenantGSTS: [
            {
              no: values.no,
              placeOfService: values.placeOfService,
              address: companyDetailsFormik?.values?.companyAddress,
              pinCode: {
                version: foundPinCodeEntry.version,
                modifiedBy: foundPinCodeEntry.modifiedBy,
                createdBy: foundPinCodeEntry.createdBy,
                id: foundPinCodeEntry.id,
                pin: foundPinCodeEntry.pin,
              },
              city: {
                version: foundCity.version,
                modifiedBy: foundCity.modifiedBy,
                createdBy: foundCity.createdBy,
                id: foundCity.id,
                cityName: foundCity.cityName,
              },
              state: {
                version: foundPinCodeEntry.state.version,
                modifiedBy: foundPinCodeEntry.state.modifiedBy,
                createdBy: foundPinCodeEntry.state.createdBy,
                id: foundPinCodeEntry.state.id,
                stateName: companyDetailsFormik?.values?.stateName,
              },
              country: {
                version: foundPinCodeEntry.country.version,
                modifiedBy: foundPinCodeEntry.country.modifiedBy,
                createdBy: foundPinCodeEntry.country.createdBy,
                id: foundPinCodeEntry.country.id,
                countryName: companyDetailsFormik?.values?.country,
              },
            },
            ...modalAlldata,
          ],
        };

        // console.log("final payload of tax deatils:=", payload);
        dispatch(getTaxDetailsData(payload));
      });
    },
  });

  const bussinessTypeFormik = useFormik({
    initialValues: bussinessTypeInitialValue,
    enableReinitialize: true,
    onSubmit: (value) => {
      const formdata = new FormData();

      const projectUATRequestDTO = {
        entityType: value.entityType,
        industryType: value.industryType,
      };
      console.log("Final-Payload-Bussiness:-", projectUATRequestDTO);
      formdata.append(
        "tenant",
        new Blob([JSON.stringify(projectUATRequestDTO)], {
          type: "application/json",
        })
      );

      dispatch(getBusinessData(value));
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
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setLogoFile(e.target.result);
      };

      reader.readAsDataURL(file);
    }

    companyDetailsFormik.setFieldValue("image", file);
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

                  <CompanyDetailsForm
                    companyDetailsFormik={companyDetailsFormik}
                  />
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
                            value={taxDetailsFormik?.values?.pan || ""}
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
                            value={taxDetailsFormik?.values?.cin || ""}
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
                            value={
                              taxDetailsFormik?.values?.transporterId || ""
                            }
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
                            value={taxDetailsFormik?.values?.no || ""}
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
                          <p>{tenantGSTSData.length} More GST available</p>
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
                        tenantGSTSData.map((gst, key) => {
                          return (
                            <div className="row" key={key}>
                              <div className="col-12 col-md-6 mb-4">
                                <label className="form-label">GST Number</label>
                                <Input
                                  type="text"
                                  name={`moreGstNumbers[${key}].gstNo`}
                                  onChange={gstNumberHandler}
                                  value={gst?.no}
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
                                            option.value === gst?.placeOfSupply
                                        )
                                      : ""
                                  }
                                  name={`moreGstNumbers[${key}].placeOfSupply`}
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
                                <button className="btn border mt-4">
                                  <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                </button>
                              </div>
                            </div>
                          );
                        })}

                      {/* ----------- more GST --------------- */}

                      <div className="row">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button
                              type="submit"
                              onClick={taxDetailsFormik.handleSubmit}
                              className="btn btn-primary"
                              // disabled={isAnyValueEmpty(taxDetailsFormik.values)}
                            >
                              Save
                            </button>
                          </div>
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button
                              onClick={() => taxDetailsFormik.resetForm()}
                              className="btn btn-primary"
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
