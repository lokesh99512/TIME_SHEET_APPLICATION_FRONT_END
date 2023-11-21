import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";
import { placeOfSupply } from "../../../common/data/settings";

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
  companyAddress: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  gstNumber: "",
  placeOfSupply: "",
};

const stateConverter = (num) => {
  // console.log(num, "number");
  return placeOfSupply.find((place) => +place.Code === +num)?.value;
};

const ModalAddGST = ({ modal, onCloseClick }) => {
  const formik = useFormik({
    initialValues: addGstInitialValue,
    onSubmit: (value) => {
      console.log(value, "value");
      formik.resetForm();
    },
  });

  const gstNumberHandler = (e) => {
    formik.handleChange(e);
    formik.setFieldValue(
      "placeOfSupply",
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
                    name="companyAddress"
                    value={formik.values.companyAddress}
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
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter City"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">State</label>
                  <Input
                    type="text"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter State"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Zipcode</label>
                  <Input
                    type="text"
                    name="zipcode"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Zipcode"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Country</label>
                  <Input
                    type="text"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Country"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">GST Number</label>
                  <Input
                    type="text"
                    name="gstNumber"
                    value={formik.values.gstNumber}
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
                              option.value === formik.values.placeOfSupply
                          )
                        : ""
                    }
                    name="placeOfSupply"
                    options={placeOfSupply}
                    placeholder={"Select Place of Supply"}
                    onChange={(e) => {
                      formik.setFieldValue(`placeOfSupply`, e.value);
                    }}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button
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
