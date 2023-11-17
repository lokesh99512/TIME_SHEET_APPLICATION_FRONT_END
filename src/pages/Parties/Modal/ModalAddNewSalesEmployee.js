import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalAddNewSalesEmployee = ({ modal, onCloseClick }) => {
  return (
    <>
      <Modal isOpen={modal} toggle={onCloseClick} className="table_view_modal">
        <ModalHeader tag="h4">
          Add New Sales Employee
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              {/* <div className="view_data_wrap"> */}
              {/* //// */}
              <div className="row mt-4 mb-2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4">
                  {/* <div className="row"> */}
                    <label className="form-label">Sales Employee Name</label>
                    {/* <div className="col-9"> */}
                      <Input
                        type="text"
                        //   name="surchargeCode"
                        //   value={addDetails.surchargeCode}
                        //   onChange={(e) => {
                        //     handleSelectGroup("surchargeCode", e.target.value);
                        //   }}
                        // id="Surcharge_Code"
                        className="form-control"
                        placeholder="Enter Sales Employee Name"
                      />
                    {/* </div> */}
                  {/* </div> */}
                </div>

                
              </div>

              <div className="row">
                <div className="d-flex justify-content-center">
                  <div className="mb-3 mx-3 d-flex justify-content-end">
                    <button className=" btn btn-primary">Save</button>
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

export default ModalAddNewSalesEmployee;
