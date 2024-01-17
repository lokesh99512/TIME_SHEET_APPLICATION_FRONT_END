import { useFormik } from "formik";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  FormFeedback,
} from "reactstrap";
import ModalAddNewAlias from "./Modal/ModalAddNewAlias";
import { useUploadRateData } from "./hook/useUploadRateData";
import ModalAddNewCategory from "./Modal/ModalAddNewCategory";
import {
  getAllCompanyDetailData,
  getAllSurchargeCategoryData,
  getAllTableSurchargeAlias,
} from "../../../store/Settings/actions";


export default function UploadRateData() {
  const [categoryModal, setCategoryModal] = useState(false);
  const [aliasModal, setAliasModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { initialValue, uploadRateDataSchema, handleSubmit } =
    useUploadRateData();

  const [surchargeCategory, setSurchargeCategoryList] = useState([]);

  const [surchargeAliasCode, setSurchargeAliasCode] = useState([]);

  const { settings_all_category_data, settings_surcharges_alias_table_data } =
    useSelector((state) => state.settings);

  useEffect(() => {
    if (Array.isArray(settings_all_category_data)) {
      const transformedData = settings_all_category_data.map((category) => ({
        label: category.name,
        value: category.description,
      }));

      setSurchargeCategoryList([...transformedData]);
    }

    if (Array.isArray(settings_surcharges_alias_table_data)) {
      const transformedAliasData = settings_surcharges_alias_table_data.map(
        (alias) => ({
          value: alias.name,
          label: alias.name,
        })
      );

      setSurchargeAliasCode(transformedAliasData);
    }
  }, [settings_all_category_data, settings_surcharges_alias_table_data]);

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: uploadRateDataSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(getAllTableSurchargeAlias());
    dispatch(getAllSurchargeCategoryData());
    dispatch(getAllCompanyDetailData());
  }, []);

  const onCloseClick = () => {
    setCategoryModal(false);
    setAliasModal(false);
  };

  const optionOfSurcharge = settings_surcharges_alias_table_data?.content || [];

  const surchargeAliasCodeOptions = optionOfSurcharge?.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));

  const surchargeAliasDescOptions = optionOfSurcharge?.map((item) => {
    return {
      value: item?.description,
      label: item?.description,
    };
  });

  const optionOfSurchargeCategory = settings_all_category_data?.content || [];

  const surchargeCategoryOptions = optionOfSurchargeCategory?.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));

  const [surchargeAliasDescw, setSurchargeAliasDescw] = useState("");
  const handleSurchargeAliasDesc = (valuesSubDec) => {
    const targetAliasName = valuesSubDec;
    const foundAliasEntry = settings_surcharges_alias_table_data.content.find(
      (entry) => entry.name === targetAliasName
    );
    setSurchargeAliasDescw(foundAliasEntry.description || {});
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="main_freight_wrapper surcharges_add_form_wrap">
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
                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">Surcharge Code</label>
                          <div className="">
                            <Input
                              type="text"
                              name="surchargeCode"
                              value={formik.values.surchargeCode}
                              onChange={formik.handleChange}
                              className="form-control"
                              id="Surcharge_Code"
                              placeholder="Enter Surcharge Code"
                              invalid={formik.touched.surchargeCode && formik.errors.surchargeCode ? true : false}
                            />
                            <FormFeedback> {formik.errors.surchargeCode} </FormFeedback>
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
                              value={formik.values.surchargeDesc}
                              onChange={formik.handleChange}
                              className="form-control"
                              id="Surcharge_Desc"
                              placeholder="Enter Surcharge Desc"
                              invalid={formik.touched.surchargeDesc && formik.errors.surchargeDesc ? true : false}
                            />
                            <FormFeedback> {formik.errors.surchargeDesc} </FormFeedback>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label"> Surcharge Category </label>
                          <div className="">
                            <Select
                              value={surchargeCategory ? surchargeCategory.find((option) => option.value === formik?.values?.surchargeCategory) : ""}
                              name="surchargeCategory"
                              options={[...surchargeCategoryOptions, { label: "Add New", value: "Add New" }]}
                              placeholder={"Select Surcharge Category"}
                              onChange={(e) => {
                                if (e.label === 'Add New') {
                                  setCategoryModal(true);
                                }
                                formik.setFieldValue(`surchargeCategory`, e.value);
                              }}
                              classNamePrefix="select2-selection form-select"
                              invalid={formik.touched.surchargeCategory && formik.errors.surchargeCategory ? true : false}
                            />
                            <FormFeedback> {formik.errors.surchargeCategory} </FormFeedback>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Alias Code
                          </label>
                          <div className="">
                            <Select
                              value={surchargeAliasCode ? surchargeAliasCode.find((option) => option.value === formik?.values?.surchargeAliasCode) : ""}
                              name="surchargeAliasCode"
                              options={[...surchargeAliasCodeOptions, { label: "Add New", value: "Add New" }]}
                              placeholder={"Select Surcharge Alias Code"}
                              onChange={(e) => {
                                formik.setFieldValue(`surchargeAliasCode`, e.value);
                                if (e.label === 'Add New') {
                                  setAliasModal(true);
                                }
                                handleSurchargeAliasDesc(e.value);
                              }}
                              classNamePrefix="select2-selection form-select"
                              invalid={formik.touched.surchargeCategory && formik.errors.surchargeCategory ? true : false}
                            />
                            <FormFeedback>
                              {formik.errors.surchargeCategory}
                            </FormFeedback>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 mb-4">
                        <div className="row">
                          <label className="form-label">
                            Surcharge Alias Desc
                          </label>
                          <div className="">
                            <Select
                              value={{
                                label: surchargeAliasDescw,
                                value: surchargeAliasDescw,
                              }}
                              name="surchargeAliasDesc"
                              options={surchargeAliasDescOptions}
                              placeholder={"Select Surcharge Alias Code"}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  `surchargeAliasDesc`,
                                  e.value
                                );
                              }}
                              isDisabled={true}
                              classNamePrefix="select2-selection form-select"
                              invalid={
                                formik.touched.surchargeAliasDesc &&
                                  formik.errors.surchargeAliasDesc
                                  ? true
                                  : false
                              }
                            />
                            <FormFeedback>
                              {formik.errors.surchargeAliasDesc}
                            </FormFeedback>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button
                            type="submit"
                            className=" btn btn-primary"
                            onClick={formik.handleSubmit}
                          >
                            Save
                          </button>
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
