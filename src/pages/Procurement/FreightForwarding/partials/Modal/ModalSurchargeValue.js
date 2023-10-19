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
      <Modal isOpen={modal} toggle={onCloseClick} className="table_view_modal">
        <ModalHeader tag="h4">
          Surcharge value
          <span className="close" onClick={onCloseClick}></span>
        </ModalHeader>
        <ModalBody>
          <div className="table_view_data_wrap">
            <div className="view_details_wrap">
              <div className="top_details">
                <div className="d-flex justify-content-around">
                  <div className="">
                    <div className="details">
                      <span className="title">Charge Code</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="details">
                      <span className="title">Charge Basis</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="details">
                      <span className="title">Calculation Type</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="details">
                      <span className="title">Slab Basis</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="details">
                      <span className="title">Currency</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="details">
                      <span className="title">Min Value</span>
                    </div>
                  </div>
                  <div className="">
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
                        className="main_accordion"
                      >
                        <AccordionItem key={item.id}>
                          <AccordionHeader targetId={`main_${index}`}>
                            {/* <div className="d-flex justify-content-evenly"> */}
                              <div className="head_value">
                                <div className="details">
                                  {/* <span className="title">Charge Code</span> */}
                                  <span className="data">
                                    {item?.chargeCode || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="head_value">
                                <div className="details">
                                  {/* <span className="title">Charge Basis</span> */}
                                  <span className="data">
                                    {item?.chargeBasis || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="head_value">
                                <div className="details">
                                  {/* <span className="title">
                                    Calculation Type
                                  </span> */}
                                  <span className="data">
                                    {item?.calculationType || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="head_value">
                                <div className="details">
                                  {/* <span className="title">Slab Basis</span> */}
                                  <span className="data">
                                    {item?.slabBasis || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="head_value">
                                <div className="details">
                                  {/* <span className="title">Currency</span> */}
                                  <span className="data">
                                    {item?.currency || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="head_value">
                                <div className="details">
                                  {/* <span className="title">Min Value</span> */}
                                  <span className="data">
                                    {item?.minValue || "-"}
                                  </span>
                                </div>
                              </div>
                              <div className="head_value">
                                <div className="details">
                                  {/* <span className="title">Is Standard</span> */}
                                  <span className="data">
                                    {item?.addTerms.isStandard || "-"}
                                  </span>
                                </div>
                              </div>
                            {/* </div> */}
                          </AccordionHeader>
                          <AccordionBody accordionId={`main_${index}`}>
                            <div className="table_view_data_wrap">
                              <div className="view_details_wrap">
                                <div className="top_details">
                                  <div className="d-flex justify-content-around">
                                    <div className="">
                                      <div className="details">
                                        <span className="title">
                                          Cargo Type
                                        </span>
                                      </div>
                                    </div>
                                    <div className="">
                                      <div className="details">
                                        <span className="title">
                                          Container Type
                                        </span>
                                      </div>
                                    </div>
                                    <div className="">
                                      <div className="details">
                                        <span className="title">From Slab</span>
                                      </div>
                                    </div>
                                    <div className="">
                                      <div className="details">
                                        <span className="title">To Slab</span>
                                      </div>
                                    </div>
                                    <div className="">
                                      <div className="details">
                                        <span className="title">Rate</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {item.subBox.map((sub) => {
                                  return (
                                    <>
                                      <div className="view_data_wrap d-flex justify-content-around">
                                        <div className="">
                                          <div className="details">
                                            <span className="data">
                                              {sub?.cargoType || "-"}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="details">
                                            <span className="data">
                                              {sub?.containerType || "-"}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="details">
                                            <span className="data">
                                              {sub?.fromSlab || "-"}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="details">
                                            <span className="data">
                                              {sub?.toSlab || "-"}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="details">
                                            <span className="data">
                                              {sub?.rate || "-"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                                {/* ------------------------------------------- */}

                                {/* ------------------------------------------- */}
                              </div>
                            </div>
                            <div className="table_view_data_wrap">
                              <div className="bg-white p-4">
                                <div className="top_details">
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <div className="details">
                                        <span className="title">
                                          Payment Term
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <div className="details">
                                        <span className="title">Incoterms</span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <div className="details">
                                        <span className="title">
                                          Applicable Commodity
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <div className="details">
                                        <span className="title">
                                          Applicable Service Type
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="view_data_wrap">
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <div className="details">
                                        <span className="data">
                                          {item.addTerms.paymentTerm || "-"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <div className="details">
                                        {item.addTerms.incoTerm.map(
                                          (val, key) => (
                                            <span key={key} className="data">
                                              {val || "-"}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <div className="details">
                                        {item.addTerms.commodity.map(
                                          (val, key) => (
                                            <span key={key} className="data">
                                              {val || "-"}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-lg-3">
                                      <div className="details">
                                        {item.addTerms.serviceType.map(
                                          (val, key) => (
                                            <span key={key} className="data">
                                              {val || "-"}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionBody>
                        </AccordionItem>
                      </Accordion>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalSurchargeValue;
