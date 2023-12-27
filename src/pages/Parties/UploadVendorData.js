import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Modal,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
// import fileData from "../../assets/extra/upload_Formats.xlsx";
import { delete_icon } from "../../assets/images";
import {
  optcurrency,
  optionCarrierName,
  optionMultiDestination,
  optionPaymentType,
  optionRateSource,
  optionRateType,
  optionSurchargesName,
  optionValidityApp,
  optionVendorName,
  optionVendorType,
} from "../../common/data/procurement";
import {
  formatBytes,
  isAnyValueEmpty,
  isExcelFile,
} from "../../components/Common/CommonLogic";
import { updateCarrierData } from "../../store/Procurement/actions";
import { BLANK_CARRIER_DATA } from "../../store/Procurement/actiontype";
import ModalAddGST from "./Modal/ModalAddGST";
import { FieldArray, FormikProvider, useFormik } from "formik";
import FileUpload from "./FileUpload";
import ModalAddNewDepartment from "./Modal/ModalAddNewDepartment";
import ModalAddNewDesignation from "./Modal/ModalAddNewDesignation";
import ModalAddNewEntityType from "./Modal/ModalAddNewEntityType";
import ModalAddNewIndustryType from "./Modal/ModalAddNewIndustryType";
import ModalAddNewVendorType from "./Modal/ModalAddNewVendorType";
import ModalAddNewServiceType from "./Modal/ModalAddNewServiceType";
import {
  department,
  designation,
  entityType,
  industryType,
  serviceTypeOptions,
  vendorTypeOptions,
} from "./constants/venderEnumList";
import {
  getAllCompanyDetailData,
  getCompanyCityData,
  getCompanyCountryData,
  getCompanyDetailsData,
  getCompanyPincodeData,
  getCompanyStateData,
} from "../../store/Settings/actions";

import VenderDetails from "./vender-details-form/VenderDetails";
import ContactDetailsForm from "./contact-details-form/ContactDetailsForm";
import DocumentDetailsForm from "./document-details-form/DocumentDetailsForm";


import { postVendorData } from "../../store/Parties/actions";

export default function UploadVendorData() {
  const [activeTabProgress, setActiveTabProgress] = useState(1);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [progressValue, setProgressValue] = useState(25);
  const [selectedFiles, setselectedFiles] = useState([]);

  const navigate = useNavigate();
  const [surcharges, setSurcharges] = useState([]);
  const [fileError, setfileError] = useState("");
  const [removeValue, setRemoveValue] = useState("");
  const carrierData = useSelector(
    (state) => state?.procurement?.carrierDetails
  );
  const [tenantInfo, setTenantInfo] = useState(null);
  const {
    settings_companydetails_data,
    settings_companyCity_data,
    settings_company_settings_all_data,
    settings_companyState_data,
    settings_companyCountry_data,
    settings_companyPincode_data,
  } = useSelector((state) => state?.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyCityData());
    dispatch(getAllCompanyDetailData());
  }, []);
  const { tabName } = useParams();

  useEffect(() => {
    if (
      settings_company_settings_all_data &&
      settings_company_settings_all_data.content
    ) {
      setTenantInfo(settings_company_settings_all_data.content);
    }
  }, [settings_company_settings_all_data]);

  const openSaveConfirmModal = () => {
    setOpenSaveModal(!openSaveModal);
  };

  const finalSaveButton = () => {
    setSurcharges([]);
    setActiveTabProgress(1);
    setProgressValue(25);
    setselectedFiles([]);
    dispatch({ type: BLANK_CARRIER_DATA });
    setOpenSaveModal(false);
  };

  const toggleTabProgress = (tab) => {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 4) {
        setActiveTabProgress(tab);

        if (tab === 1) {
          setProgressValue(25);
        }
        if (tab === 2) {
          setProgressValue(50);
        }
        if (tab === 3) {
          setProgressValue(75);
        }
        if (tab === 4) {
          setProgressValue(100);
        }
      }
    }
    if (tab === 5) {
      openSaveConfirmModal();
    }
  };

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
  
  const companyDetailsFormik = useFormik({
    initialValues: {
      image:"",
      companyName: "",
      logo: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      website: "",
      contactName: "",
      phoneNumber: "",
      email: "",
      department: "",
      designation: "",
      venderType: [],
      serviceType: [],
      CINnumber: "",
      GSTnumber: "",
      PANnumber: "",
      entityType: "",
      industryType: "",
    },
    onSubmit: async ({ image, ...value }) => {
      try {
        const targetPinCode = value.zipcode;
        console.log("i am image :=", image);

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
              address: value.address,
              contactName: value.contactName,
              contactEmail: value.email,
              contactNo: value.phoneNumber,
              department: value.department,

              designation: value.designation,
              vendorType: value.venderType,
              serviceType: value.serviceType,
              cin: value.CINnumber,
              gst: value.GSTnumber,
              pan: value.PANnumber,
              entityType: value.entityType,
              industryType: value.industryType,

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
              tenant: [...tenantInfo],
            };

            console.log("finaly vender payload:-", projectUATRequestDTO);
            const formData = new FormData();
            formData.append("file", image);
            const jsonBlob = new Blob([JSON.stringify(projectUATRequestDTO)], {
              type: "application/json",
            });
            formData.append("tenant", jsonBlob);
             dispatch(postVendorData(formData));
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
      companyDetailsFormik.setFieldValue(
        "city",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.city?.cityName
      );
      companyDetailsFormik.setFieldValue(
        "state",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.state?.stateName
      );
      companyDetailsFormik.setFieldValue(
        "country",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.country?.countryName
      );
      companyDetailsFormik.setFieldValue(
        "zipcode",
        settings_company_settings_all_data &&
          settings_company_settings_all_data?.content[0]?.pinCode?.pin
      );
    }
  }, [
    settings_companyState_data,
    settings_companydetails_data,
    settings_companyCountry_data,
    settings_companyPincode_data,
    settings_company_settings_all_data,
  ]);

  const contactsFormik = useFormik({
    initialValues: {
      contacts: [
        {
          title: "",
          name: "",
          phoneNumber: "",
          emailId: "",
          department: "",
          designation: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log("contact page", values);
    },
  });
  const documentsFormik = useFormik({
    initialValues: {
      document: [
        {
          documentType: "",
          uploadDocument: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log("document submit", values);
    },
  });
  // ------------- dynamic field ------------------------
  const addHandler = () => {
    setSurcharges((s) => {
      return [
        ...s,
        {
          surcharges_name: "",
          destination: [],
          payment_type: "prepaid",
          gp1: "",
          gp2: "",
          hq1: "",
          hq2: "",
          rf1: "",
          rf2: "",
        },
      ];
    });
  };

  const removeInputFields = (index) => {
    const rows = [...surcharges];
    rows.splice(index, 1);
    setSurcharges(rows);
  };

  const handleChange = (e, name, index) => {
    const list = [...surcharges];
    list[index][name] = e.target.value;
    setSurcharges(list);
  };

  const handleSelectGroup = useCallback(
    (name, opt) => {
      dispatch(updateCarrierData(name, opt));
      if (carrierData?.vendor_type?.value === "agent") {
        setRemoveValue("carrier_name");
      } else {
        setRemoveValue("vendor_name");
      }
    },
    [carrierData]
  );

  const handleSelectGroup2 = useCallback(
    (opt, name, index) => {
      const list = [...surcharges];
      list[index][name] = opt;
      setSurcharges(list);
    },
    [surcharges]
  );

  const handleMultiSelectChange = useCallback(
    (selected, name, options, index) => {
      // Check if "Select All" is selected
      const list = [...surcharges];
      if (selected.some((option) => option.value === "selectAll")) {
        list[index][name] = options.filter(
          (option) => option.value !== "selectAll"
        );
        setSurcharges(list);
        return;
      }
      list[index][name] = selected;
      setSurcharges(list);
    },
    [surcharges]
  );

  const onUploadChange = (file) => {
    // console.log(file.name,"file")
    // setSelectedFiles(file);
    companyDetailsFormik.setFieldValue("logo", file);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="main_freight_wrapper">
            <button
              type="button"
              className="btn border mb-3"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div
                      id="progrss-wizard"
                      className="twitter-bs-wizard upload_freight_wrap"
                    >
                      <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTabProgress === 1,
                            })}
                            onClick={() => {
                              toggleTabProgress(1);
                            }}
                          >
                            <div
                              className="step-icon"
                              data-bs-toggle="tooltip"
                              id="CompanyDetails"
                            >
                              <i className="bx bx-list-ul"></i>
                              <UncontrolledTooltip
                                placement="top"
                                target="CompanyDetails"
                              >
                                Company Details
                              </UncontrolledTooltip>
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTabProgress === 2,
                            })}
                            onClick={() => {
                              toggleTabProgress(2);
                            }}
                          >
                            <div
                              className="step-icon"
                              data-bs-toggle="tooltip"
                              id="Contacts"
                            >
                              <i className="bx bx-food-menu"></i>
                              <UncontrolledTooltip
                                placement="top"
                                target="Contacts"
                              >
                                Contacts
                              </UncontrolledTooltip>
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTabProgress === 3,
                            })}
                            onClick={() => {
                              toggleTabProgress(3);
                            }}
                          >
                            <div
                              className="step-icon"
                              data-bs-toggle="tooltip"
                              id="Documents"
                            >
                              <i className="bx bx-book-bookmark"></i>
                              <UncontrolledTooltip
                                placement="top"
                                target="Documents"
                              >
                                Documents
                              </UncontrolledTooltip>
                            </div>
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTabProgress === 4,
                            })}
                            onClick={() => {
                              toggleTabProgress(4);
                            }}
                          >
                            <div
                              className="step-icon"
                              data-bs-toggle="tooltip"
                              id="Communications"
                            >
                              <i className="bx bx-chat"></i>
                              <UncontrolledTooltip
                                placement="top"
                                target="Communications"
                              >
                                Communications
                              </UncontrolledTooltip>
                            </div>
                          </NavLink>
                        </NavItem>
                      </ul>

                      <div id="bar" className="mt-4">
                        <Progress
                          color="primary"
                          striped
                          animated
                          value={progressValue}
                        />
                      </div>
                      <TabContent
                        activeTab={activeTabProgress}
                        className="twitter-bs-wizard-tab-content"
                      >
                        <TabPane tabId={1}>
                          <VenderDetails
                            companyDetailsFormik={companyDetailsFormik}
                          />
                        </TabPane>
                        <TabPane tabId={2}>
                          <ContactDetailsForm contactsFormik={contactsFormik} />
                        </TabPane>
                        <TabPane tabId={3}>
                          <DocumentDetailsForm
                            documentsFormik={documentsFormik}
                          />
                        </TabPane>

                        <TabPane tabId={4}>
                          <div>
                            <div className="text-center mb-4">
                              <h5>Communications</h5>
                            </div>
                            <form>
                              {surcharges?.map((item, index) => (
                                <div
                                  key={index}
                                  className="upload_surcharges_row"
                                >
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="surcharges_name"
                                          className="form-label"
                                        >
                                          Select Surcharge Name
                                        </label>
                                        <Select
                                          value={
                                            optionSurchargesName
                                              ? optionSurchargesName.find(
                                                  (obj) =>
                                                    obj.value ===
                                                    item.surcharges_name
                                                )
                                              : ""
                                          }
                                          name="surcharges_name"
                                          onChange={(opt) => {
                                            handleSelectGroup2(
                                              opt.value,
                                              "surcharges_name",
                                              index
                                            );
                                          }}
                                          options={optionSurchargesName}
                                          classNamePrefix="select2-selection form-select"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="destination"
                                          className="form-label"
                                        >
                                          Surcharge Applicable on destination
                                        </label>
                                        <Select
                                          value={item.destination}
                                          name="destination"
                                          isMulti
                                          options={optionMultiDestination}
                                          onChange={(opt) => {
                                            handleMultiSelectChange(
                                              opt,
                                              "destination",
                                              optionMultiDestination,
                                              index
                                            );
                                          }}
                                          className="basic-multi-select"
                                          classNamePrefix="select2-selection form-select"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="btn_wrap">
                                    {surcharges.length !== 0 ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          removeInputFields(index);
                                        }}
                                        className="btn border p-0"
                                      >
                                        <img src={delete_icon} alt="Delete" />
                                      </button>
                                    ) : null}
                                  </div>
                                </div>
                              ))}
                              <div className="add_btn_box d-flex align-items-center justify-content-center">
                                <div className="add_btn_wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary add_btn d-flex align-items-center"
                                    onClick={() => {
                                      addHandler();
                                    }}
                                  >
                                    {" "}
                                    <i className="bx bx-plus me-2"></i> Add
                                    Charges
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </TabPane>
                      </TabContent>
                      <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-between">
                        <li
                          className={`previous ${
                            activeTabProgress === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className={`d-flex align-items-center ${
                              activeTabProgress === 1
                                ? "btn btn-primary disabled"
                                : "btn btn-primary"
                            }`}
                            onClick={() => {
                              toggleTabProgress(activeTabProgress - 1);
                            }}
                          >
                            <i className="bx bx-chevron-left me-1"></i> Previous
                          </button>
                        </li>

                        <li
                          className={`${
                            activeTabProgress === 1
                              ? isAnyValueEmpty(companyDetailsFormik?.values)
                                ? "disabled"
                                : ""
                              : activeTabProgress === 2
                              ? isAnyValueEmpty(contactsFormik?.values)
                                ? "disabled"
                                : ""
                              : ""
                          }`}
                        >
                          <button
                            type="submit"
                            className={`btn btn-primary d-flex align-items-center ${
                              activeTabProgress === 0
                                ? isAnyValueEmpty(companyDetailsFormik?.values)
                                  ? "disabled"
                                  : ""
                                : activeTabProgress === 2
                                ? isAnyValueEmpty(contactsFormik?.values)
                                  ? "disabled"
                                  : ""
                                : ""
                            }`}
                            onClick={() => {
                              console.log(
                                "Hey ANK i am onclick :-",
                                activeTabProgress
                              );
                              if (activeTabProgress === 1) {
                                companyDetailsFormik.submitForm();
                              } else if (activeTabProgress === 2) {
                                contactsFormik.submitForm();
                              } else if (activeTabProgress === 3) {
                                documentsFormik.submitForm();
                              }
                              toggleTabProgress(activeTabProgress + 1);
                            }}
                          >
                            {activeTabProgress === 3 ? (
                              "Save"
                            ) : (
                              <>
                                Next
                                <i className="bx bx-chevron-right ms-1"></i>
                              </>
                            )}
                          </button>
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
        className="confirm_modal_wrap"
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
          <h4 className="text-center">Are you sure?</h4>
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
          <button
            type="button"
            onClick={() => {
              finalSaveButton();
            }}
            className="btn btn-primary "
          >
            Save changes
          </button>
        </div>
      </Modal>
    </>
  );
}
