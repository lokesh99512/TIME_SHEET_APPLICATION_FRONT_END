import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";

const gen = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];
const addressType = [{ label: "Head Office", value: "Head Office" }];

const phone = [{ label: "+91", value: "+91" }];

const addGstInitialValue = {
  companyAddress: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  gstNumber: "",
  placeOfSupply: "",
};

// const stateConverter = (num) => {
//   // console.log(num, "number");
//   return placeOfSupply.find((place) => +place.Code === +num)?.value;
// };

const ModalAddGST = ({ modal, onCloseClick }) => {
  // const formik = useFormik({
  //   initialValues: addGstInitialValue,
  //   onSubmit: (value) => {
  //     console.log(value, "value");
  //     formik.resetForm();
  //   },
  // });

  // const gstNumberHandler = (e) => {
  //   formik.handleChange(e);
  //   formik.setFieldValue(
  //     "placeOfSupply",
  //     stateConverter(e.target.value.substring(0, 2))
  //   );
  // };

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
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Address</label>
                  <Input
                    type="text"
                    // name="companyAddress"
                    // value={formik.values.companyAddress}
                    // onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Comapany Address"
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">City</label>
                  <Input
                    type="text"
                    // name="companyAddress"
                    // value={formik.values.companyAddress}
                    // onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Comapany City"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">State</label>
                  <Input
                    type="text"
                    // name="state"
                    // value={formik.values.state}
                    // onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter State"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Country</label>
                  <Input
                    type="text"
                    // name="city"
                    // value={formik.values.city}
                    // onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Country"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Zipcode</label>
                  <Input
                    type="text"
                    // name="zipcode"
                    // value={formik.values.zipcode}
                    // onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter Zipcode"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">GST Number</label>
                  <Input
                    type="text"
                    // name="country"
                    // value={formik.values.country}
                    // onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Enter GST Number"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Contact Name</label>
                  <div className="row">
                    <div className="col-3">
                      <Select
                        // value={carrierData.rate_type}
                        // name='rate_type'
                        // onChange={(opt) => {
                        //     handleSelectGroup('rate_type', opt);
                        // }}
                        placeholder="Mr"
                        options={gen}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-9">
                      <Input
                        type="text"
                        // name=""
                        //   value={}
                        //   onChange={}
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="row">
                    <div className="col-3">
                      <Select
                        // value={carrierData.rate_type}
                        // name='rate_type'
                        // onChange={(opt) => {
                        //     handleSelectGroup('rate_type', opt);
                        // }}
                        placeholder="+91"
                        options={phone}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="col-9">
                      <Input
                        type="text"
                        // name=""
                        //   value={}
                        //   onChange={}
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <div className="mb-3">
                    <label className="form-label">Address Type</label>
                    <Select
                      // value={carrierData.vendor_name}
                      // name='vendor_name'
                      // onChange={(opt) => {
                      //     handleSelectGroup('vendor_name', opt)
                      // }}
                      options={addressType}
                      classNamePrefix="select2-selection form-select"
                      // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button
                      // onClick={formik.handleSubmit}
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
