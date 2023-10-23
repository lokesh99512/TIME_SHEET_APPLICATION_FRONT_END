import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";

const ModalAddNewAlias = ({ modal, onCloseClick }) => {
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
                    className="form-control"
                    placeholder="Enter Comapany Address"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">State</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Zipcode</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Zipcode"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Country</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Country"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">GST Number</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter GST Number"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  <label className="form-label">Place of Supply</label>
                  <Select
                    //   value={}
                    //   name=""
                    //   options={}
                    //   placeholder={""}
                    classNamePrefix="select2-selection form-select"
                  />
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

export default ModalAddNewAlias;
