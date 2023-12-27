import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Card,
  CardBody,
  Input,
 
} from "reactstrap";
import ModalAddNewDepartment from "../Modal/ModalAddNewDepartment";
import ModalAddNewDesignation from "../Modal/ModalAddNewDesignation";
import ModalAddNewEntityType from "../Modal/ModalAddNewEntityType";
import ModalAddNewIndustryType from "../Modal/ModalAddNewIndustryType";
import ModalAddNewVendorType from "../Modal/ModalAddNewVendorType";
import ModalAddNewServiceType from "../Modal/ModalAddNewServiceType";
import FileUpload from "../FileUpload";
import {
  department,
  designation,
  entityType,
  industryType,
  serviceTypeOptions,
  vendorTypeOptions,
} from "../constants/venderEnumList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllCompanyDetailData,
  getAllSurchargeCategoryData,
  getAllTableSurchargeAlias,
  getCompanyCountryData,
  getCompanyPincodeData,
  getCompanyStateData,
} from "../../../store/Settings/actions";

const gen = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];
const title = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];
const phone = [{ label: "+91", value: "+91" }];
const opCode = [{ label: "+91", value: "+91" }];

const VenderDetails = ({ companyDetailsFormik }) => {
  const [departmentModal, setDepartmentModal] = useState(false);
  const [designationModal, setDesignationModal] = useState(false);
  const [entityTypeModal, setEntityTypeModal] = useState(false);
  const [industryTypeModal, setIndustryTypeModal] = useState(false);
  const [vendorTypeModal, setVendorTypeModal] = useState(false);
  const [serviceTypeModal, setServiceTypeModal] = useState(false);
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
    dispatch(getAllTableSurchargeAlias());
    dispatch(getAllSurchargeCategoryData());
    dispatch(getAllCompanyDetailData());
  }, []);
  
  const onUploadChange = (file) => {
   
    if (file) {
      const reader = new FileReader();

     

    
      reader.readAsDataURL(file);
    }
    
    companyDetailsFormik.setFieldValue("image", file);
  };

  const onCloseClick = () => {
    setDesignationModal(false);
    setDepartmentModal(false);
    setIndustryTypeModal(false);
    setEntityTypeModal(false);
    setVendorTypeModal(false);
    setServiceTypeModal(false);
  };
  return (
    <>
      <div className="text-center mb-4">
        <h5>Vender Details</h5>
      </div>

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
                 
                  <FileUpload
                    iconName="img"
                    name="image"
                    onUpload={onUploadChange}
                    src={companyDetailsFormik.values.image}
                  />
                </div>
              </div>
            </div>

            <div className="row">
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
                  {/* <Input
                                        type="text"
                                        name="city"
                                        value={companyDetailsFormik.values.city}
                                        onChange={
                                          companyDetailsFormik.handleChange
                                        }
                                        className="form-control"
                                        placeholder=""
                                      /> */}

                  <Input
                    type="text"
                    name="city"
                    invalid={
                      companyDetailsFormik.touched.city &&
                      companyDetailsFormik.errors.city
                        ? true
                        : false
                    }
                    value={companyDetailsFormik?.values?.city || ""}
                    onChange={(e) => {
                      companyDetailsFormik.handleChange(e);
                      const cityData = settings_companyCity_data?.content?.find(
                        (city) => city.cityName === e.target.value
                      );
                      if (cityData) {
                        dispatch(
                          getCompanyStateData({
                            cityId: cityData.id,
                          })
                        );
                        dispatch(
                          getCompanyCountryData({
                            cityId: cityData.id,
                          })
                        );
                        dispatch(
                          getCompanyPincodeData({
                            cityId: cityData.id,
                          })
                        );
                      }
                    }}
                    className="form-control"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">State</label>
                  {/* <Input
                                        type="text"
                                        name="state"
                                        value={
                                          companyDetailsFormik.values.state
                                        }
                                        onChange={
                                          companyDetailsFormik.handleChange
                                        }
                                        className="form-control"
                                        placeholder=""
                                      /> */}

                  <Input
                    type="text"
                    name="state"
                    list="stateList"
                    value={companyDetailsFormik?.values?.state || ""}
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
                  {/* <Input
                                        type="text"
                                        name="zipcode"
                                        value={
                                          companyDetailsFormik.values.zipcode
                                        }
                                        onChange={
                                          companyDetailsFormik.handleChange
                                        }
                                        className="form-control"
                                        placeholder=""
                                      /> */}
                  <Input
                    type="text"
                    name="zipcode"
                    list="zipcodeList"
                    value={companyDetailsFormik?.values?.zipcode || ""}
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
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Contact Name</label>
                  <div className="row">
                    <div className="col-4 col-md-2">
                      <Select
                        name="title"
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
                          companyDetailsFormik.setFieldValue(`title`, e.value);
                        }}
                        placeholder="Mr"
                        options={title}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-6">
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

            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <Select
                        name="opCode"
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
                          companyDetailsFormik.setFieldValue(`opCode`, e.value);
                        }}
                        placeholder="+91"
                        options={opCode}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-8 col-md-9">
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
                    name="department"
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
                      if (e.label == "Add New") {
                        setDepartmentModal(true);
                      }
                      companyDetailsFormik.setFieldValue(`department`, e.value);
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
                    name="designation"
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
                      if (e.label == "Add New") {
                        setDesignationModal(true);
                      }
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
            </div>

            {/* <div className="row">
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Sales Employee</label>
                                                                    <Select
                                                                        // value={carrierData.vendor_name}
                                                                        // name='vendor_name'
                                                                        // onChange={(opt) => {
                                                                        //     handleSelectGroup('vendor_name', opt)
                                                                        // }}
                                                                        options={department}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Key Account Manager</label>
                                                                    <Select
                                                                        // value={carrierData.carrier_name}
                                                                        // name='carrier_name'
                                                                        // onChange={(opt) => {
                                                                        //     handleSelectGroup('carrier_name', opt)
                                                                        // }}
                                                                        options={designation}
                                                                        // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div> */}
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
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Vender Type</label>
                  {/* <Select
                                        name="vendorType"
                                        isMulti
                                        value={
                                          vendorType
                                            ? vendorType.find(
                                                (option) =>
                                                  option.value ===
                                                  companyDetailsFormik?.values
                                                    ?.vendorType
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (e.label == "Add New") {
                                            setVendorTypeModal(true);
                                          }
                                          companyDetailsFormik.setFieldValue(
                                            `vendorType`,
                                            e.value
                                          );
                                        }}
                                        options={vendorType}
                                        classNamePrefix="select2-selection form-select"
                                        // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                      /> */}

                  <Select
                    value={vendorTypeOptions.filter((option) =>
                      companyDetailsFormik.values.venderType.includes(
                        option.value
                      )
                    )}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      companyDetailsFormik.setFieldValue(
                        "venderType",
                        selectedValues
                      );
                    }}
                    name="venderType"
                    id="venderType"
                    options={vendorTypeOptions}
                    isMulti
                    placeholder="Select Vendor"
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Service Type</label>
                  {/* <Select
                                        name="serviceType"
                                        isMulti
                                        value={
                                          serviceType
                                            ? serviceType.find(
                                                (option) =>
                                                  option.value ===
                                                  companyDetailsFormik?.values
                                                    ?.serviceType
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (e.label == "Add New") {
                                            setServiceTypeModal(true);
                                          }
                                          companyDetailsFormik.setFieldValue(
                                            `serviceType`,
                                            e.value
                                          );
                                        }}
                                        options={serviceType}
                                        // isDisabled={carrierData?.vendor_type?.value === 'agent'}
                                        classNamePrefix="select2-selection form-select"
                                      /> */}
                  <Select
                    value={serviceTypeOptions.filter((option) =>
                      companyDetailsFormik.values.serviceType.includes(
                        option.value
                      )
                    )}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      companyDetailsFormik.setFieldValue(
                        "serviceType",
                        selectedValues
                      );
                    }}
                    name="serviceType"
                    id="serviceType"
                    options={serviceTypeOptions}
                    isMulti
                    placeholder="Select service type"
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
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
              <div className="col-12 col-md-6">
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
              {/* <div className="col-1">
                                                                <button
                                                                    className="btn btn-primary mt-4"
                                                                    onClick={() => setGstModal(true)}
                                                                >
                                                                    <i className="bx bx-plus"></i>
                                                                </button>
                                                                </div> */}
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
                    name="entityType"
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
                      if (e.label == "Add New") {
                        setEntityTypeModal(true);
                      }
                      companyDetailsFormik.setFieldValue(`entityType`, e.value);
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
                    name="industryType"
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
                      if (e.label == "Add New") {
                        setIndustryTypeModal(true);
                      }
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
      {/* <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} /> */}
      <ModalAddNewDepartment
        modal={departmentModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewDesignation
        modal={designationModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewEntityType
        modal={entityTypeModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewIndustryType
        modal={industryTypeModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewVendorType
        modal={vendorTypeModal}
        onCloseClick={onCloseClick}
      />
      <ModalAddNewServiceType
        modal={serviceTypeModal}
        onCloseClick={onCloseClick}
      />
    </>
  );
};

export default VenderDetails;
