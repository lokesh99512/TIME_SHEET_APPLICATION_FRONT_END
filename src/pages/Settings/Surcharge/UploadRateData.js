import React, { useCallback, useEffect, useState } from "react";
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
import ModalAddNewAlias from "./Modal/ModalAddNewAlias";
import ModalAddNewCategory from "./Modal/ModalAddNewCategory";
import { useDispatch } from "react-redux";
import { getAllAddSurchargeData, getAllCompanyDetailData, getAllSurchargeCategoryData, getAllTableSurchargeAlias, getTaxDetailsData } from "../../../store/Settings/actions";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

const surchargeCategory = [
  { label: "OCEAN SURCHARGE", value: "freight_surcharge" },
  { label: "PORT SURCHARGE", value: "port_surcharge" },
  { label: "LOCAL SURCHARGE", value: "local_surcharge" },
  { label: "ORIGIN TRANSPORTATION", value: "origin_transportation" },
  { label: "DESTINATION TRANSPORTATION", value: "destination_transportation" },
  { label: "ANCILLARY CHARGES", value: "ancillary_charges" },
  { label: "VAS CHARGES", value: "vas_charges" },
  { label: "CUSTOMS", value: "custom" },
  // { label: "Add New", value: "Add New" },
];
const surchargeAliasCode = [
  { label: "OTHC", value: "OTHC" },
  { label: "DTHC", value: "DTHC" },
  { label: "FSC", value: "FSC" },
  { label: "OBS", value: "OBS" },
  { label: "EIS", value: "EIS" },
  { label: "WRC", value: "WRC" },
  { label: "OCR", value: "OCR" },
  { label: "ADDON", value: "ADDON" },
  { label: "LSF", value: "LSF" },
  { label: "ARD", value: "ARD" },
  { label: "DOC", value: "DOC" },
  { label: "BL FEE", value: "bl_fee" },
  { label: "CERTIFICATE FEE", value: "certificate_fee" },
  { label: "EMPTY CONTAINER LIFT FEE", value: "empty_container_lift_fee" },
  { label: "Add New", value: "Add New" },
];
const surchargeAliasDesc = [
  { label: "Original Terminal Handling Charge	", value: "OTHC" },
  { label: "Original Terminal Handling Charge", value: "DTHC" },
  { label: "One Bunker Surchage", value: "OBS" },
  { label: "Equipment Imbalance Surcharge", value: "EIS" },
  { label: "War Risk Surcharge", value: "WRC" },
  { label: "Origin Receiving Charges", value: "OCR" },
  { label: "Additional Charge	", value: "ADDON" },
  { label: "Low Sulphur Surcharge	", value: "LSF" },
  { label: "Import Haulage Charge	", value: "ARD" },
  { label: "Documentation Fee", value: "DOC" },
];

export default function UploadRateData() {
  const [categoryModal, setCategoryModal] = useState(false);
  const [aliasModal, setAliasModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customOptSurchargeCategory = [
    ...surchargeCategory,
    { label: "Add New", value: "Add New" },
  ];

  const initialValue = {
    surchargeCode: "",
    surchargeDesc: "",
    surchargeCategory: "",
    surchargeAliasCode: "",
    surchargeAliasDesc: "",
  };
  const [addDetails, setAddDetails] = useState([]);

  // console.log(addDetails, "addDetails");

  const { settings_add_surcharge_data, settings_company_settings_all_data, settings_all_category_data, settings_surcharges_alias_table_data } = useSelector((state) => state.settings);

  // console.log(settings_surcharges_alias_table_data, "----settings_surcharges_alias_table_data");
  // console.log(settings_all_category_data, "----settings_all_category_data");
  // console.log(settings_company_settings_all_data, "--->>settings_company_settings_all_data")
  console.log(settings_surcharges_alias_table_data, "---settings_surcharges_alias_table_data")

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values) => {
      console.log(values, "<---values");
      const payload = {
        code: values.surchargeCode,
        description: values.surchargeDesc,
        // category: values.surchargeCategory,
        surchargeAlias: {
          ...settings_surcharges_alias_table_data?.content[0],
           "name": values.surchargeAliasCode,
          "description": values.surchargeAliasDesc,
          // "tenant" : settings_company_settings_all_data?.content[0]
        },
        surchargeCategory :{
          ...settings_all_category_data?.content[0],
          "name": values.surchargeCategory,
          "description": values.surchargeCategory
        }
        // aliasCode : values.surchargeAliasCode,
        // aliasDescription : values.surchargeAliasDesc
      }
      dispatch(getAllAddSurchargeData(payload))
    }
  })

  useEffect(() => {
    dispatch(getAllTableSurchargeAlias())
    dispatch(getAllSurchargeCategoryData())
    // dispatch(getTaxDetailsData())
    dispatch(getAllCompanyDetailData())
  }, [])

  const onCloseClick = () => {
    setCategoryModal(false);
    setAliasModal(false);
  };

  const handleSelectGroup = useCallback(
    (name, opt) => {
      // console.log(opt, "opt");
      if (name === "surchargeCategory" && opt.value === "Add New") {
        setCategoryModal(true);
      } else if (name === "surchargeAliasCode" && opt.value === "Add New") {
        setAliasModal(true);
      }
      setAddDetails((prev) => ({ ...prev, [name]: opt }));
    },
    [addDetails]
  );


  // useEffect(() => {/
  // dispatch(getAllAddSurchargeData())
  // }, [])

  const optionOfSurcharge = settings_surcharges_alias_table_data?.content || [];

  const surchargeAliasCodeOptions = optionOfSurcharge?.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));

  const surchargeAliasDescOptions = optionOfSurcharge?.map((item) => {
    return {
      value: item?.description,
      label: item?.description
    }
  })

  const optionOfSurchargeCategory = settings_all_category_data?.content || [];

  const surchargeCategoryOptions = optionOfSurchargeCategory?.map((item) => ({
    value: item?.name,
    label: item?.name,
  }))

  console.log(surchargeAliasCodeOptions, "->>>>>surchargeAliasCodeOptions");
  console.log(surchargeAliasDescOptions, "->>>>>surchargeAliasDescOptions");
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
                          <label className="form-label">Surcharge Code</label>
                          <div className="">
                            <Input
                              type="text"
                              name="surchargeCode"
                              // value={addDetails.surchargeCode}
                              value={formik.values.surchargeCode}
                              // onChange={(e) => {
                              //   handleSelectGroup("surchargeCode", e.target.value);
                              // }}
                              onChange={formik.handleChange}
                              className="form-control"
                              id="Surcharge_Code"
                              placeholder="Enter Surcharge Code"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Surcharge Desc</label>

                          <div className="">
                            <Input
                              type="text"
                              name="surchargeDesc"
                              // value={addDetails.surchargeDesc}
                              value={formik.values.surchargeDesc}
                              // onChange={(e) => {
                              //   handleSelectGroup("surchargeDesc", e.target.value);
                              // }}
                              onChange={formik.handleChange}
                              className="form-control"
                              id="Surcharge_Desc"
                              placeholder="Enter Surcharge Desc"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Category
                          </label>
                          <div className="">
                            {/* <Select
                              // value={addDetails.surchargeCategory}
                              value={formik.values.surchargeCategory}
                              name="surchargeCategory"
                              // onChange={(opt) => {
                              //   handleSelectGroup("surchargeCategory", opt);
                              // }}
                              onChange={formik.handleChange}
                              options={customOptSurchargeCategory}
                              placeholder={"Select Surcharge Category"}
                              classNamePrefix="select2-selection form-select"
                            // defaultMenuIsOpen
                            /> */}
                            <Select
                              value={
                                surchargeCategory
                                  ? surchargeCategory.find(
                                    (option) =>
                                      option.value ===
                                      formik?.values?.surchargeCategory
                                  )
                                  : ""
                                // modalAlldata?.placeOfService
                              }
                              name="surchargeCategory"
                              options={surchargeCategoryOptions}
                              placeholder={"Select Surcharge Category"}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  `surchargeCategory`,
                                  e.value
                                );
                              }}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Alias Code
                          </label>
                          <div className="">
                            {/* <Select
                              // value={addDetails.surchargeAliasCode}
                              value={formik.values.surchargeAliasCode}
                              name="surchargeAliasCode"
                              // onChange={(opt) => {
                              //   handleSelectGroup("surchargeAliasCode", opt);
                              // }}
                              onChange={formik.handleChange}
                              options={surchargeAliasCode}
                              placeholder={"Select Surcharge Alias Code"}
                              classNamePrefix="select2-selection form-select"
                            /> */}
                            <Select
                              value={
                                surchargeAliasCode
                                  ? surchargeAliasCode.find(
                                    (option) =>
                                      option.value ===
                                      formik?.values?.surchargeAliasCode
                                  )
                                  : ""
                                // modalAlldata?.placeOfService
                              }
                              name="surchargeAliasCode"
                              options={surchargeAliasCodeOptions}
                              placeholder={"Select Surcharge Alias Code"}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  `surchargeAliasCode`,
                                  e.value
                                );
                              }}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Alias Desc
                          </label>
                          <div className="">
                            {/* <Select
                              // value={surchargeAliasDesc ? surchargeAliasDesc.find(obj => obj.value === addDetails.surchargeAliasCode.value) : ''}
                              value={formik.values.surchargeAliasDesc}
                              name="surchargeAliasDesc"
                              // onChange={(opt) => {
                              //   handleSelectGroup("surchargeAliasDesc", opt);
                              // }}
                              onChange={formik.handleChange}
                              options={surchargeAliasDesc}
                              classNamePrefix="select2-selection form-select"
                              isDisabled
                            /> */}

                            <Select
                              value={
                                surchargeAliasDesc
                                  ? surchargeAliasDesc.find(
                                    (option) =>
                                      option.value ===
                                      formik?.values?.surchargeAliasDesc
                                  )
                                  : ""
                                // modalAlldata?.placeOfService
                              }
                              name="surchargeAliasDesc"
                              options={surchargeAliasDescOptions}
                              placeholder={"Select Surcharge Alias Code"}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  `surchargeAliasDesc`,
                                  e.value
                                );
                              }}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary" onClick={formik.handleSubmit}>Save</button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <ModalAddNewCategory
              modal={categoryModal}
              onCloseClick={onCloseClick}
            />
            <ModalAddNewAlias modal={aliasModal} onCloseClick={onCloseClick} />
          </div>
        </Container>
      </div>
    </>
  );
}
