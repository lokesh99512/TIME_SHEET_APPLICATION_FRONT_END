import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { useFormik } from "formik";
import { optionIsStandard, optionPaymentType, optionServiceType } from "../../../../common/data/procurement";

const incoTerm = [
  { label: "Carraige Paid To", value: "Carraige Paid To" },
  { label: "COST & FREIGHT", value: "COST & FREIGHT" },
  { label: "Cost Insurance and Freight", value: "Cost Insurance and Freight" },
  {
    label: "Carraige and Insurance Paid To",
    value: "Carraige and Insurance Paid To",
  },
  { label: "Delivery at Place", value: "Delivery at Place" },
  { label: "DELIVERY AT TERMINAL", value: "DELIVERY AT TERMINAL" },
  { label: "DELIVERY DUTY UNPAID", value: "DELIVERY DUTY UNPAID" },
  {
    label: "Delivered At place Unloaded",
    value: "Delivered At place Unloaded",
  },
  { label: "EX WORKS", value: "EX WORKS" },
  { label: "FREE ALONGSIDE SHIP", value: "FREE ALONGSIDE SHIP" },
  { label: "FREE CARRIAGE", value: "FREE CARRIAGE" },
  { label: "FREE ON BOARD", value: "FREE ON BOARD" },
];
const isStandard = [
  { label: "Standard Charge", value: "standard_charge" },
  { label: "Incidental", value: "incidental" },
];
const commodity = [
  { label: "General", value: "General" },
  { label: "Electronics", value: "Electronics" },
  { label: "Perishable", value: "Perishable" },
  { label: "Fruits", value: "Fruits" },
  { label: "Pulses", value: "Pulses" },
];
const serviceType = [
  { label: "Door To Door", value: "Door To Door" },
  { label: "Door To Port", value: "Door To Port" },
  { label: "Port To Door", value: "Port To Door" },
  { label: "Port To Port", value: "Port To Port" },
];

const initialValue = {
  paymentTerm: "",
  incoTerm: [],
  isStandard: "",
  commodity: [],
  serviceType: [],
};

const ModalAddTerm = ({ modal, onCloseClick, setTermHandler }) => {
  const changeHandler = (name, value) => {
    const selectedValues = value.map((option) => option.value);
    formik.setFieldValue(name, selectedValues);
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (value, { resetForm }) => {
      console.log(value, "value");
      setTermHandler(value);
      onCloseClick();
      resetForm();
    },
  });
  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        toggle={onCloseClick}
        className="table_view_modal"
      >
        <ModalHeader tag="h4">
          Add Terms
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              <div className="row mt-4 mb-2">
                {/* Payment Term */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Payment Term</label>
                  <Select
                    name="paymentTerm"
                    value={optionPaymentType ? optionPaymentType.find((option) => option.value === formik.values.paymentTerm) : ""}
                    onChange={(e) => {
                      formik.setFieldValue(`paymentTerm`, e.value);
                    }}
                    options={optionPaymentType}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Inco Term */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Inco Term</label>
                  <Select
                    name="incoTerm"
                    isMulti
                    value={incoTerm ? incoTerm.find((option) => option.value === formik.values.incoTerm) : ""}
                    onChange={(e) => {
                      changeHandler(`incoTerm`, e);
                    }}
                    options={incoTerm}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Is Standard */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Is Standard</label>
                  <Select
                    name="isStandard"
                    value={ optionIsStandard ? optionIsStandard.find( (option) => option.value === formik.values.isStandard ) : "" }
                    onChange={(e) => {
                      formik.setFieldValue(`isStandard`, e.value);
                    }}
                    options={optionIsStandard}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Commodity */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Commodity</label>
                  <Select
                    name="commodity"
                    isMulti
                    value={ commodity ? commodity.find( (option) => option.value === formik.values.commodity ) : "" }
                    onChange={(e) => {
                      changeHandler(`commodity`, e);
                    }}
                    options={commodity}
                    classNamePrefix="select2-selection form-select"
                  />
                </div>

                {/* Service Type */}
                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Service Type</label>
                  <Select
                    name="serviceType"
                    isMulti
                    value={
                      optionServiceType
                        ? optionServiceType.find(
                          (option) =>
                            option.value === formik.values.serviceType
                        )
                        : ""
                    }
                    onChange={(e) => {
                      changeHandler(`serviceType`, e);
                    }}
                    options={optionServiceType}
                    classNamePrefix="select2-selection form-select"
                  />
                </div> */}
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary" onClick={formik.handleSubmit} > Save </button>
                  </div>
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button
                      className=" btn btn-primary"
                      onClick={() => {
                        onCloseClick();
                        formik.resetForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalAddTerm;
