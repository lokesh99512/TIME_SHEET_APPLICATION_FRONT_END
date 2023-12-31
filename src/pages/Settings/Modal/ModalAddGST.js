import React, { useEffect } from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";
import { placeOfSupply } from "../../../common/data/settings";
import { useDispatch } from "react-redux";
import { getBusinessData, getCompanyCountryData, getCompanyDetailsData, getCompanyPincodeData, getCompanyStateData, getTaxDetailsData } from "../../../store/Settings/actions";
import { useSelector } from "react-redux";

// const placeOfSupply = [
//   { label: "Jammu & Kashmir", value: "JK", Code: 1 },
//   { label: "Himachal Pradesh", value: "HP", Code: 2 },
//   { label: "Punjab", value: "PB", Code: 3 },
//   { label: "Chandigarh", value: "CH", Code: 4 },
//   { label: "Uttarakhand", value: "UT", Code: 5 },
//   { label: "Haryana", value: "HR", Code: 6 },
//   { label: "Delhi", value: "DL", Code: 7 },
//   { label: "Rajasthan", value: "RJ", Code: 8 },
//   { label: "Uttar Prades", value: "UP", Code: 9 },
//   { label: "Bihar", value: "BH", Code: 10 },
//   { label: "Sikkim", value: "SK", Code: 11 },
//   { label: "Arunachal Pradesh", value: "AR", Code: 12 },
//   { label: "Nagaland", value: "NL", Code: 13 },
//   { label: "Manipur", value: "MN", Code: 14 },
//   { label: "Mizoram", value: "MI", Code: 15 },
//   { label: "Tripura", value: "TR", Code: 16 },
//   { label: "Meghalaya", value: "ME", Code: 17 },
//   { label: "Assam", value: "AS", Code: 18 },
//   { label: "West Bengal", value: "WB", Code: 19 },
//   { label: "Jharkhand", value: "JH", Code: 20 },
//   { label: "Odisha", value: "OR", Code: 21 },
//   { label: "Chattisgarh", value: "CT", Code: 22 },
//   { label: "Madhya Pradesh", value: "MP", Code: 23 },
//   { label: "Gujarat", value: "GJ", Code: 24 },
//   { label: "Daman & Diu", value: "DD", Code: 25 },
//   { label: "Dadra & Nagar Haveli", value: "DN", Code: 26 },
//   { label: "Maharashtra", value: "MH", Code: 27 },
//   { label: "Andhra Pradesh", value: "AP", Code: 28 },
//   { label: "Karnataka", value: "KA", Code: 29 },
//   { label: "Goa", value: "GA", Code: 30 },
//   { label: "Lakshadweep", value: "LD", Code: 31 },
//   { label: "Kerala", value: "KL", Code: 32 },
//   { label: "Tamil Nadu", value: "TN", Code: 33 },
//   { label: "Puducherry", value: "PY", Code: 34 },
//   { label: "Andaman & Nicobar Island", value: "AN", Code: 35 },
//   { label: "Telangana", value: "TL", Code: 36 },
//   { label: "Hyderabad GST Commissionerate", value: "AD", Code: 37 },
//   { label: "Kurnool GST Commissionerate", value: "LA", Code: 38 },
// ];

const addGstInitialValue = {
  address: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  no: "",
  placeOfService: "",
};


const stateConverter = (num) => {
  // console.log(num, "number");
  return placeOfSupply.find((place) => +place.Code === +num)?.value;
};


const ModalAddGST = ({ modal, onSubmitHandler, onCloseClick }) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: addGstInitialValue,
    onSubmit: (value) => {
      console.log(value, "value");
      const payload = {
        ...value,
        id:2,
        pinCode: {
          "version": 0,
          "id": 1,
          pin: value.zipcode
        },
        city: {
          "version": 0,
          "id": 1,
          cityName: value.city
        },
        state: {
          "version": 4,
          "id": 1,
          stateName: value.state
        },
        country: {
          "version": 0,
          "id": 5,
          countryName: value.country
        },
        status: "ACTIVE"
      }
      onSubmitHandler(payload);
      // dispatch(getTaxDetailsData(value));
      formik.resetForm();
    },
  });

  // selector

  const { settings_companyCity_data, settings_companyState_data, settings_companyCountry_data, settings_companyPincode_data } = useSelector(
    (state) => state.settings
  );

  useEffect(() => {
    if (settings_companyState_data && settings_companyState_data?.content?.length > 0) {
      formik.setFieldValue("state", settings_companyState_data?.content[0]?.stateName)
    }
    if (settings_companyCountry_data && settings_companyCountry_data?.content?.length > 0) {
      formik.setFieldValue("country", settings_companyCountry_data?.content[0]?.countryName)
    }
    // if(settings_companyPincode_data){
    //   companyDetailsFormik.setFieldValue("zipcode", settings_companyPincode_data?.content?.map((item)=>item?.pin))
    // }
  }, [settings_companyState_data, settings_companyCountry_data, settings_companyPincode_data])


  const gstNumberHandler = (e) => {
    formik.handleChange(e);
    formik.setFieldValue(
      "placeOfService",
      stateConverter(e.target.value.substring(0, 2))
    );
  };

  return (
    <>
      <Modal isOpen={modal} toggle={onCloseClick} className="table_view_modal">
        <ModalHeader tag="h4">
          Add GST
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              {/* //// */}
              <div className="row mt-4 mb-2">
                <div className="col-12 mb-4">
                  <label className="form-label">Comapany Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Comapany Address"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">City</label>
                  <Input
                    type="text"
                    name="city"
                    list="cityList"
                    value={formik.values.city}
                    onChange={(e) => {
                      // formik.handleChange
                      formik.handleChange(e);
                      const cityData = settings_companyCity_data?.content?.find((city) => city.cityName === e.target.value)
                      if (cityData) {
                        dispatch(getCompanyStateData({ cityId: cityData.id }));
                        dispatch(getCompanyCountryData({ cityId: cityData.id }));
                        dispatch(getCompanyPincodeData({ cityId: cityData.id }));
                      }
                    }
                    }
                    className="form-control"
                    placeholder="Enter City"
                  />
                  <datalist id="cityList">
                    {settings_companyCity_data && settings_companyCity_data?.content?.map((item, i) => <option key={i} value={item.cityName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">State</label>
                  <Input
                    type="text"
                    name="state"
                    list="stateList"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter State"
                  />
                  <datalist id="stateList">
                    {settings_companyState_data && settings_companyState_data?.content?.map((item, i) => <option key={i} value={item.stateName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Zipcode</label>
                  <Input
                    type="text"
                    name="zipcode"
                    list="zipcodeList"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Zipcode"
                  />
                  <datalist id="zipcodeList">
                    {settings_companyPincode_data && settings_companyPincode_data?.content?.map((item, i) => <option key={i} value={item.pin} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Country</label>
                  <Input
                    type="text"
                    name="country"
                    list="countryList"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Country"
                  />
                  <datalist id="countryList">
                    {settings_companyCountry_data && settings_companyCountry_data?.content?.map((item, i) => <option key={i} value={item.countryName} />)}
                  </datalist>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">GST Number</label>
                  <Input
                    type="text"
                    name="no"
                    value={formik.values.no}
                    onChange={gstNumberHandler}
                    className="form-control"
                    placeholder="Enter GST Number"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Place of Supply</label>
                  <Select
                    value={
                      placeOfSupply
                        ? placeOfSupply.find(
                          (option) =>
                            option.value === formik.values.placeOfService
                        )
                        : ""
                    }
                    name="placeOfService"
                    options={placeOfSupply}
                    placeholder={"Select Place of Supply"}
                    onChange={(e) => {
                      formik.setFieldValue(`placeOfService`, e.value);
                    }}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      onClick={formik.handleSubmit}
                      className=" btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary" onClick={onCloseClick}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              {/* //// */}
              {/* </div> */}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalAddGST;
