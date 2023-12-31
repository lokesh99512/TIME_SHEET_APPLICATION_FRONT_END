import React from "react";
import {
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Row,
} from "reactstrap";
import FileUpload from "../FileUpload";
import { useDispatch } from "react-redux";
import {
  getCompanyCountryData,
  getCompanyPincodeData,
  getCompanyStateData,
} from "../../../store/Settings/actions";
import {
  country_list,
  industryType,
  state_list,
} from "../../../common/data/settings";
import { useSelector } from "react-redux";

const CompanyDetailsForm = ({ companyDetailsFormik }) => {
  const dispatch = useDispatch();
  const {
    settings_companydetails_data,
    settings_companyCity_data,
    settings_company_settings_all_data,
    settings_companyState_data,
    settings_companyCountry_data,
    settings_companyPincode_data,
  } = useSelector((state) => state?.settings);
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

  const handleCityChange = (e) => {
    companyDetailsFormik.handleChange(e);
    const cityData = settings_companyCity_data?.content?.find(
      (city) => city.cityName === e.target.value
    );
    if (cityData) {
      // Update the state and country fields in the form
      companyDetailsFormik.setFieldValue(
        "state",
        cityData.state?.stateName || ""
      );
      companyDetailsFormik.setFieldValue(
        "country",
        cityData.state?.country?.countryName || ""
      );

      // Dispatch actions to get pincode data if needed
      dispatch(getCompanyStateData({ cityId: cityData.id }));
      dispatch(getCompanyCountryData({ cityId: cityData.id }));
      dispatch(getCompanyPincodeData({ cityId: cityData.id }));
    }
  };
  return (
    <>
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
                value={companyDetailsFormik?.values?.contactNumber || ""}
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
                value={companyDetailsFormik?.values?.email || ""}
                onChange={companyDetailsFormik.handleChange}
                onBlur={companyDetailsFormik.handleBlur}
                className="form-control"
                invalid={
                  companyDetailsFormik.touched.email &&
                  companyDetailsFormik.errors.email
                    ? true
                    : false
                }
                placeholder=""
              />
              {companyDetailsFormik.touched.email &&
              companyDetailsFormik.errors.email ? (
                <FormFeedback type="invalid">
                  {companyDetailsFormik.errors.email}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-4">
              <label className="form-label">Company Address</label>
              <Input
                type="text"
                name="companyAddress"
                value={companyDetailsFormik?.values?.companyAddress || ""}
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
                value={companyDetailsFormik?.values?.city || ""}
                onChange={handleCityChange}
                className="form-control"
                placeholder=""
              />
              <datalist id="cityList">
                {settings_companyCity_data &&
                  settings_companyCity_data?.content?.map((item, i) => (
                    <option key={i} value={item.cityName} />
                  ))}
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
                {state_list &&
                  state_list.map((item, i) => <option key={i} value={item} />)}
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
                value={companyDetailsFormik?.values?.zipcode || ""}
                onChange={companyDetailsFormik.handleChange}
                className="form-control"
                placeholder=""
              />
              <datalist id="zipcodeList">
                {settings_companyPincode_data &&
                  settings_companyPincode_data?.content?.map((item, i) => (
                    <option key={i} value={item.pin} />
                  ))}
              </datalist>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <label className="form-label">Country</label>
              <Input
                type="text"
                name="country"
                list="countryList"
                value={companyDetailsFormik?.values?.country || ""}
                onChange={companyDetailsFormik.handleChange}
                className="form-control"
                placeholder=""
              />
              <datalist id="countryList">
                {country_list &&
                  country_list.map((item, i) => (
                    <option key={i} value={item} />
                  ))}
              </datalist>
            </div>
          </div>

          <div className="row">
            <div className="d-flex justify-content-center">
              <div className="mb-3 mx-3 d-flex justify-content-end">
                <button
                  onClick={companyDetailsFormik.handleSubmit}
                  type="submit"
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
    </>
  );
};

export default CompanyDetailsForm;
