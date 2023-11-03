import React, { useState } from "react";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalResetPassword = ({ viewData, modal, onCloseClick, modalType }) => {
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  return (
    <>
      <Modal
        isOpen={modal}
        toggle={onCloseClick}
        className="table_view_modal"
        // style={{ maxWidth: "1345px" }}
      >
        <ModalHeader tag="h4">
          Reset Password
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>

        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="charge_details">
              {/* <div className="view_data_wrap"> */}
              {/* //// */}
              <div className="row mt-4 mb-2">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  {/* <div className="row"> */}
                  <label className="form-label">Enter Password</label>
                  {/* <div className="col-9"> */}
                  <Input
                    type="password"
                    name="password"
                    id="Epassword1"
                    //   value={}
                    //   onChange={}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                  {/* </div> */}
                  {/* </div> */}
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
                  {/* <div className="row"> */}
                  <label className="form-label">Re-Enter Password</label>
                  {/* <div className="col-9"> */}
                  <Input
                    type="password"
                    name="password2"
                    id="Epassword2"
                    //   value={}
                    //   onChange={}
                    className="form-control"
                    placeholder="Re-Enter Password"
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

export default ModalResetPassword;
