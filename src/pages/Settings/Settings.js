import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Input, Row } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import ModalAddGST from "./Modal/ModalAddGST";
import SimpleBar from "simplebar-react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCompanyDetailsData } from "../../store/Settings/actions";

const industryType = [{ label: "Supply Chain", value: "Supply Chain" }];
const entityType = [
  { label: "Private Limited", value: "Private Limited" },
  { label: "Public Limited", value: "Public Limited" },
  { label: "Single Director", value: "Single Director" },
  { label: "LLP", value: "LLP" },
  { label: "proprietorship", value: "proprietorship" },
];

const placeOfSupply = [
  { label: "Jammu & Kashmir", value: "JK", Code: 1 },
  { label: "Himachal Pradesh", value: "HP", Code: 2 },
  { label: "Punjab", value: "PB", Code: 3 },
  { label: "Chandigarh", value: "CH", Code: 4 },
  { label: "Uttarakhand", value: "UT", Code: 5 },
  { label: "Haryana", value: "HR", Code: 6 },
  { label: "Delhi", value: "DL", Code: 7 },
  { label: "Rajasthan", value: "RJ", Code: 8 },
  { label: "Uttar Prades", value: "UP", Code: 9 },
  { label: "Bihar", value: "BH", Code: 10 },
  { label: "Sikkim", value: "SK", Code: 11 },
  { label: "Arunachal Pradesh", value: "AR", Code: 12 },
  { label: "Nagaland", value: "NL", Code: 13 },
  { label: "Manipur", value: "MN", Code: 14 },
  { label: "Mizoram", value: "MI", Code: 15 },
  { label: "Tripura", value: "TR", Code: 16 },
  { label: "Meghalaya", value: "ME", Code: 17 },
  { label: "Assam", value: "AS", Code: 18 },
  { label: "West Bengal", value: "WB", Code: 19 },
  { label: "Jharkhand", value: "JH", Code: 20 },
  { label: "Odisha", value: "OR", Code: 21 },
  { label: "Chattisgarh", value: "CT", Code: 22 },
  { label: "Madhya Pradesh", value: "MP", Code: 23 },
  { label: "Gujarat", value: "GJ", Code: 24 },
  { label: "Daman & Diu", value: "DD", Code: 25 },
  { label: "Dadra & Nagar Haveli", value: "DN", Code: 26 },
  { label: "Maharashtra", value: "MH", Code: 27 },
  { label: "Andhra Pradesh", value: "AP", Code: 28 },
  { label: "Karnataka", value: "KA", Code: 29 },
  { label: "Goa", value: "GA", Code: 30 },
  { label: "Lakshadweep", value: "LD", Code: 31 },
  { label: "Kerala", value: "KL", Code: 32 },
  { label: "Tamil Nadu", value: "TN", Code: 33 },
  { label: "Puducherry", value: "PY", Code: 34 },
  { label: "Andaman & Nicobar Island", value: "AN", Code: 35 },
  { label: "Telangana", value: "TL", Code: 36 },
  { label: "Hyderabad GST Commissionerate", value: "AD", Code: 37 },
  { label: "Kurnool GST Commissionerate", value: "LA", Code: 38 },
];

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
  panNumber: "",
  cinNumber: "",
  tranceporterId: "",
  gstNumber: "",
  placeOfSupply: "",
  moreGstNumbers: {
    gstNo: "",
    placeOfSupply: "",
  },
};

const bussinessTypeInitialValue = {
  industryType: "",
  entityType: "",
};

const stateConverter = (num) => {
  console.log(num, "number");
  return placeOfSupply.find((place) => +place.Code === +num)?.value;
};

const Settings = () => {
  const [gstModal, setGstModal] = useState(false);
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

  const companyDetailsData = useSelector(
    (state) => state.settings.settings_companydetails_data
  );

  console.log(companyDetailsData[0], "<--full data");
  // console.log(companyDetailsInitial, "<--comppany details");
  // console.log(taxDetailsInitial, "<--tax details");
  // console.log(bussinessTypeInitial, "<--bussiness type");

  useEffect(() => {
    setCompanyDetailsInitial(companyDetailsData[0]);
    setTaxDetailsInitial(companyDetailsData[0]);
    setBussinessTypeInitial(companyDetailsData[0]);
  }, [companyDetailsData]);

  const dispatch = useDispatch();

  const companyDetailsFormik = useFormik({
    initialValues: companyDetailsInitial,
    enableReinitialize: true,
    onSubmit: (value) => {
      console.log(value, "value");
      companyDetailsFormik.resetForm();
    },
  });

  const taxDetailsFormik = useFormik({
    initialValues: taxDetailsInitial,
    enableReinitialize: true,
    onSubmit: (value) => {
      console.log(value, "value");
      taxDetailsFormik.resetForm();
    },
  });
  // console.log(taxDetailsFormik.values.moreGstNumbers.length,"<<<");

  const bussinessTypeFormik = useFormik({
    initialValues: bussinessTypeInitial,
    enableReinitialize: true,
    onSubmit: (value) => {
      console.log(value, "value");
      bussinessTypeFormik.resetForm();
    },
  });

  const onCloseClick = () => {
    setGstModal(false);
  };

  const gstNumberHandler = (e) => {
    taxDetailsFormik.handleChange(e);
    taxDetailsFormik.setFieldValue(
      "placeOfSupply",
      stateConverter(e.target.value.substring(0, 2))
    );
  };

  useEffect(() => {
    dispatch(getCompanyDetailsData());
  }, [dispatch]);

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
                            onClick={() => setActive("comapanyDetails")}
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
                            onClick={() => setActive("taxDetails")}
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
                            onClick={() => setActive("bussinessType")}
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
                <PerfectScrollbar className="p-4" style={{ height: "900px" }}>
                  {/* Comapany details  */}
                  <Card id="comapanyDetails" className="mb-4">
                    <CardBody>
                      <div>
                        <h5>Company Details</h5>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 col-md-5 mb-4">
                          <label className="form-label">Image</label>
                          <Input
                            type="file"
                            name="image"
                            onChange={(e) => {
                              console.log(e, "eee");
                              companyDetailsFormik.setFieldValue(
                                "image",
                                e.currentTarget.files[0]
                              );
                            }}
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-7 mb-4">
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
                            value={companyDetailsFormik.values.contactNumber}
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
                            value={companyDetailsFormik.values.email}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mb-4">
                          <label className="form-label">Company Address</label>
                          <Input
                            type="text"
                            name="companyAddress"
                            value={companyDetailsFormik.values.companyAddress}
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
                            value={companyDetailsFormik.values.city}
                            onChange={companyDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
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

                      <div className="row">
                        <div className="col-12 col-md-6 mb-4">
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

                        <div className="col-12 col-md-6 mb-4">
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

                      <div className="row">
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button
                              onClick={companyDetailsFormik.handleSubmit}
                              className=" btn btn-primary"
                            >
                              Save
                            </button>
                          </div>
                          <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button
                              onClick={() => companyDetailsFormik.resetForm()}
                              className=" btn btn-primary"
                            >
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
                            name="panNumber"
                            value={taxDetailsFormik.values.panNumber}
                            onChange={taxDetailsFormik.handleChange}
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-4">
                          <label className="form-label">CIN Number</label>
                          <Input
                            type="text"
                            name="cinNumber"
                            value={taxDetailsFormik.values.cinNumber}
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
                            name="tranceporterId"
                            value={taxDetailsFormik.values.tranceporterId}
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
                            name="gstNumber"
                            onChange={gstNumberHandler}
                            value={taxDetailsFormik.values.gstNumber}
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
                                      taxDetailsFormik.values.placeOfSupply
                                  )
                                : ""
                            }
                            name="placeOfSupply"
                            options={placeOfSupply}
                            placeholder={"Select Place of Supply"}
                            onChange={(e) => {
                              taxDetailsFormik.setFieldValue(
                                `placeOfSupply`,
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
                            // console.log(gst, "KKKKKKKKKK");
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
                                    // onChange={(e) => {
                                    //   taxDetailsFormik.setFieldValue(
                                    //     `placeOfSupply`,
                                    //     e.value
                                    //   );
                                    // }}
                                    // placeholder={"Select Place of Supply"}
                                    classNamePrefix="select2-selection form-select"
                                  />
                                </div>
                                <div className="col-2 col-md-1">
                                  <button
                                    className="btn border mt-4"
                                    // onClick={() => setGstModal(true)}
                                  >
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
                                      bussinessTypeFormik.values.industryType
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
                                      bussinessTypeFormik.values.entityType
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
                </PerfectScrollbar>
              </Card>
            </div>
          </Row>
          <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} />
        </Container>
      </div>
    </>
  );
};

export default Settings;
