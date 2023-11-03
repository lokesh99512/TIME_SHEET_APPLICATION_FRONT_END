import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import SimpleBar from "simplebar-react";

const ModalCustomerValue = ({ viewData, modal, onCloseClick, modalType }) => {
  const [open, setOpen] = useState("");

//   console.log(viewData, "<---viewData");

  const item = [];

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
        style={{ maxWidth: "1345px" }}
      >
        <ModalHeader tag="h4">
          Customer value
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <SimpleBar>
            <div
              className="table_view_data_wrap port_local_view_wrap"
              style={{ minWidth: "1000px", overflow: "auto" }}
            >
              <div className="view_details_wrap">
                {/* -------------- */}
                <Card style={{ borderRadius: "12px" }}>
                  <CardHeader>
                    <div
                      style={{ fontWeight: "500" }}
                      className="row text-center"
                    >
                      <div className="col">
                        <span className="">Customer Details</span>
                      </div>
                      <div className="col">
                        <span className="">Contacts</span>
                      </div>
                      <div className="col">
                        <span className="">Documents</span>
                      </div>
                      <div className="col">
                        <span className="">Rates</span>
                      </div>
                      <div className="col">
                        <span className="">Discounts</span>
                      </div>
                      <div className="col">
                        <span className="">Invoice Settings</span>
                      </div>
                      <div className="col">
                        <span className="">Invoices</span>
                      </div>
                      <div className="col">
                        <span className="">Communications</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="row text-center">
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">
                            {viewData?.customerDetails || "-"}
                          </span>
                        </div>
                      </div>
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">{viewData?.contacts || "-"}</span>
                        </div>
                      </div>
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">{viewData?.documents || "-"}</span>
                        </div>
                      </div>
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">{viewData?.rates || "-"}</span>
                        </div>
                      </div>
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">{viewData?.discounts || "-"}</span>
                        </div>
                      </div>
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">
                            {viewData?.invoiceSettings || "-"}
                          </span>
                        </div>
                      </div>
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">{viewData?.invoices || "-"}</span>
                        </div>
                      </div>
                      <div className="col mb-2">
                        <div className="p-2">
                          <span className="">
                            {viewData?.communications || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </SimpleBar>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalCustomerValue;
