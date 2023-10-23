import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Collapse,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import SimpleBar from "simplebar-react";

const ModalSurchargeValue = ({ viewData, modal, onCloseClick, modalType }) => {
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  console.log(viewData, "viewData");
  return (
    <>
      <Modal
        isOpen={modal}
        toggle={onCloseClick}
        className="table_view_modal"
        style={{ maxWidth: "1345px" }}
      >
        <ModalHeader tag="h4">
          Surcharge value
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <SimpleBar>
            <div
              className="table_view_data_wrap"
              style={{ minWidth: "992px", overflow: "auto" }}
            >
              <div className="view_details_wrap">
                <div className="top_details">
                  {/* <div className="d-flex justify-content-around"> */}
                  <div className="row mx-4">
                    <div className="col">
                      <div className="details">
                        <span className="title">Charge Code</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="details">
                        <span className="title">Charge Basis</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="details">
                        <span className="title">Calculation Type</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="details">
                        <span className="title">Slab Basis</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="details">
                        <span className="title">Currency</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="details">
                        <span className="title">Min Value</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="details">
                        <span className="title">Is Standard</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* -------------- */}
                <div className="row view_data_wrap">
                  {viewData?.surchargeValue?.map((item, index) => {
                    console.log(item, "item");
                    return (
                      <>
                        <Accordion
                          flush
                          open={open}
                          toggle={toggle}
                          className="main_accordion common_accordion_wrap"
                        >
                          <AccordionItem key={item.id}>
                            <AccordionHeader targetId={`main_${index}`}>
                              {/* <div className="row"> */}
                              <div className="col">
                                <div className="">
                                  {/* <span className="title">Charge Code</span> */}
                                  <span className="">
                                    {item?.chargeCode || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="">
                                  {/* <span className="title">Charge Basis</span> */}
                                  <span className="">
                                    {item?.chargeBasis || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="">
                                  {/* <span className="title">
                                            Calculation Type
                                          </span> */}
                                  <span className="">
                                    {item?.calculationType || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="">
                                  {/* <span className="title">Slab Basis</span> */}
                                  <span className="">
                                    {item?.slabBasis || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="">
                                  {/* <span className="title">Currency</span> */}
                                  <span className="">
                                    {item?.currency || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="">
                                  {/* <span className="title">Min Value</span> */}
                                  <span className="">
                                    {item?.minValue || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="">
                                  {/* <span className="title">Is Standard</span> */}
                                  <span className="">
                                    {item?.addTerms.isStandard || "-"}
                                  </span>
                                </div>
                              </div>
                              {/* </div> */}
                            </AccordionHeader>
                            {/* <hr className="mt-0 mx-4" /> */}
                            <AccordionBody
                              style={{ fontSize: "13px" }}
                              accordionId={`main_${index}`}
                            >
                              {/* <div className="table_view_data_wrap"> */}
                              {/* <div className="view_details_wrap"> */}
                              {/* <div className="top_details"> */}
                              {/* <div className="d-flex justify-content-around"> */}
                              {/* <hr className="mt-0"/> */}

                              <Card style={{ borderRadius: "12px" }}>
                                <CardBody>
                                  <div
                                    style={{ fontWeight: "500" }}
                                    className="row text-center"
                                  >
                                    <div className="col-3">
                                      <div className="py-2">
                                        <span className="">Cargo Type</span>
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      <div className="py-2">
                                        <span className="">Container Type</span>
                                      </div>
                                    </div>
                                    <div className="col-2">
                                      <div className="py-2">
                                        <span className="">From Slab</span>
                                      </div>
                                    </div>
                                    <div className="col-2">
                                      <div className="py-2">
                                        <span className="">To Slab</span>
                                      </div>
                                    </div>
                                    <div className="col-2">
                                      <div className="py-2">
                                        <span className="">Rate</span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                  {item.subBox.map((sub) => {
                                    return (
                                      <>
                                        {/* <div className="view_data_wrap d-flex justify-content-around"> */}
                                        {/* <div className="view_data_wrap row"> */}
                                        <div className="row text-center">
                                          <div className="col-3 mb-2">
                                            <div className="p-2">
                                              <span className="">
                                                {sub?.cargoType || "-"}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-3 mb-2">
                                            <div className="p-2">
                                              <span className="">
                                                {sub?.containerType || "-"}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-2">
                                            <div className="p-2">
                                              <span className="">
                                                {sub?.fromSlab || "-"}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-2">
                                            <div className="p-2">
                                              <span className="">
                                                {sub?.toSlab || "-"}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-2">
                                            <div className="p-2">
                                              <span className="">
                                                {sub?.rate || "-"}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </CardBody>
                              </Card>
                              {/* ------------------------------------------- */}

                              {/* ------------------------------------------- */}
                              {/* </div> */}
                              {/* </div> */}
                              {/* ---------------- */}
                              {/* <hr /> */}
                              {/* <div className="table_view_data_wrap"> */}
                              {/* <div className="bg-white p-4"> */}
                              {/* <div className="top_details"> */}
                              <Card style={{ borderRadius: "12px" }}>
                                <CardBody>
                                  <div
                                    style={{ fontWeight: "500" }}
                                    className="row text-center"
                                  >
                                    <div className="col-3">
                                      <div className="py-2">
                                        <span className="">Payment Term</span>
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      <div className="py-2">
                                        <span className="">Incoterms</span>
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      <div className="py-2">
                                        <span className="">
                                          Applicable Commodity
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      <div className="py-2">
                                        <span className="">
                                          Applicable Service Type
                                        </span>
                                      </div>
                                    </div>
                                    {/* </div> */}
                                  </div>
                                  {/* <div className="view_data_wrap"> */}
                                  <div className="row text-center">
                                    <div className="col-3">
                                      <div className="p-2">
                                        <span className="">
                                          {item.addTerms.paymentTerm || "-"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      {item.addTerms.incoTerm.map(
                                        (val, key) => (
                                          <div key={key} className="p-2 mb-2">
                                            <span key={key} className="">
                                              {val || "-"}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div className="col-3">
                                      {item.addTerms.commodity.map(
                                        (val, key) => (
                                          <div key={key} className="p-2 mb-2">
                                            <span key={key} className="data">
                                              {val || "-"}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div className="col-3">
                                      {item.addTerms.serviceType.map(
                                        (val, key) => (
                                          <div key={key} className="p-2 mb-2">
                                            <span key={key} className="data">
                                              {val || "-"}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                              {/* </div> */}

                              {/* </div> */}
                              {/* </div> */}
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </SimpleBar>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalSurchargeValue;
