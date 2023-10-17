import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select"
import { useFormik } from "formik";

const paymentTerm = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];
const incoTerm = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];
const isStandard = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];
const commodity = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];
const serviceType = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];

const initialValue = {
  paymentTerm:"",
  incoTerm:"",
  isStandard:"",
  commodity:"",
  serviceType:"",
}

const ModalAddTerm = ({ modal, onCloseClick, setTermHandler }) => {
  const formik = useFormik({
    initialValues:initialValue,
    onSubmit:async(value,{resetForm})=>{
      console.log(value,"value");
      setTermHandler(value)
      onCloseClick();
      resetForm()
    }
   })
  return (
    <>
      <Modal isOpen={modal.isOpen} toggle={onCloseClick} className="table_view_modal">
        <ModalHeader tag="h4">
          Add New
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              {/* <div className="view_data_wrap"> */}
                {/* //// */}
                <div className="row mt-4 mb-2">

                  {/* Payment Term */}
                  <div className="col-6 mb-4">
                    <div className="row">
                      <Label
                        htmlFor="Surcharge_Code"
                        className="col-sm-3 col-form-label"
                      >
                        Payment Term
                      </Label>
                      <div className="col-9">
                      <Select
                        name="paymentTerm"
                        value={paymentTerm ? paymentTerm.find(option => option.value === formik.values.paymentTerm) : ''}
                        onChange={e=>{formik.setFieldValue(`paymentTerm`,e.value)}}
                        options={paymentTerm}
                        classNamePrefix="select2-selection form-select"
                      />
                      </div>
                    </div>
                  </div>

                  {/* Inco Term */}
                  <div className="col-6 mb-4">
                    <div className="row">
                      <Label
                        htmlFor="Surcharge_Desc"
                        className="col-sm-3 col-form-label"
                      >
                        Inco Term
                      </Label>
                      <div className="col-9">
                      <Select
                        name="incoTerm"
                        value={incoTerm ? incoTerm.find(option => option.value === formik.values.incoTerm) : ''}
                        onChange={e=>{formik.setFieldValue(`incoTerm`,e.value)}}
                        options={incoTerm}
                        classNamePrefix="select2-selection form-select"
                      />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4 mb-2">
                  {/* Is Standard */}
                  <div className="col-6 mb-4">
                    <div className="row">
                      <Label
                        htmlFor="Surcharge_Code"
                        className="col-sm-3 col-form-label"
                      >
                        Is Standard
                      </Label>
                      <div className="col-9">
                      <Select
                        name="isStandard"
                        value={isStandard ? isStandard.find(option => option.value === formik.values.isStandard) : ''}
                        onChange={e=>{formik.setFieldValue(`isStandard`,e.value)}}
                        options={isStandard}
                        classNamePrefix="select2-selection form-select"
                      />
                      </div>
                    </div>
                  </div>

                  {/* Commodity */}
                  <div className="col-6 mb-4">
                    <div className="row">
                      <Label
                        htmlFor="Surcharge_Desc"
                        className="col-sm-3 col-form-label"
                      >
                        Commodity
                      </Label>
                      <div className="col-9">
                      <Select
                        name="commodity"
                        value={commodity ? commodity.find(option => option.value === formik.values.commodity) : ''}
                        onChange={e=>{formik.setFieldValue(`commodity`,e.value)}}
                        options={commodity}
                        classNamePrefix="select2-selection form-select"
                      />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4 mb-2">
                {/* Service Type */}
                  <div className="col-6 mb-4">
                    <div className="row">
                      <Label
                        htmlFor="Surcharge_Code"
                        className="col-sm-3 col-form-label"
                      >
                        Service Type
                      </Label>
                      <div className="col-9">
                      <Select
                        name="serviceType"
                        value={serviceType ? serviceType.find(option => option.value === formik.values.serviceType) : ''}
                        onChange={e=>{formik.setFieldValue(`serviceType`,e.value)}}
                        options={serviceType}
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
                          <button className=" btn btn-primary" onClick={()=>{onCloseClick(); formik.resetForm()}}>Cancel</button>
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

export default ModalAddTerm;
