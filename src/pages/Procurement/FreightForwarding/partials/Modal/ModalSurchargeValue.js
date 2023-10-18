import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalSurchargeValue = ({ viewData, modal, onCloseClick, modalType }) => {
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
                <div className="row">
                  <div className="col-lg-2">
                    <div className="details">
                      <span className="title">Charge Code</span>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="details">
                      <span className="title">Charge Basis</span>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="details">
                      <span className="title">Calculation Type</span>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="details">
                      <span className="title">Slab Basis</span>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="details">
                      <span className="title">Currency</span>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="details">
                      <span className="title">Min Value</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* -------------- */}
              <div className="row view_data_wrap">
                {viewData?.surchargeValue?.map((item) => {
                  //   console.log(item, "<--item");
                  return (
                    <>
                      {Object.entries(item).map((e, i) => {
                        // console.log(e, "e");
                        return (
                          <>
                            {e[0] == "addTerms" || e[0] == "subBox" ? (
                              ""
                            ) : (
                              <div className="col-lg-2">
                                <div key={e[i]} className="details">
                                  <span className="data">{e[1] || "-"}</span>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </div>
              {/* ******** */}
              {/* <div className="row view_data_wrap">
                                    <div className="col-lg-2">
                                        <div className="details">
                                            <span className="data">{viewData?.chargeCode || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="details">
                                            <span className="data">{viewData?.chargeBasis || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="details">
                                            <span className="data">{viewData?.calculationType || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="details">
                                            <span className="data">{viewData?.slabBasis || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="details">
                                            <span className="data">{viewData?.currency || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="details">
                                            <span className="data">{viewData?.minValue || '-'}</span>
                                        </div>
                                    </div>
                                </div> */}
              {/* -------------- */}

              {/* <div className="view_data_wrap d-flex flex-wrap">
                                <div className="details">
                                    <span className="title">Valid From:</span>
                                    <span className="data">{viewData?.valid_from || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Valid To:</span>
                                    <span className="data">{viewData?.valid_till || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Created By:</span>
                                    <span className="data">{viewData?.created_by || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Created On:</span>
                                    <span className="data">{viewData?.created_on || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Rate Type:</span>
                                    <span className="data">{viewData?.rate_type || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Rate Source:</span>
                                    <span className="data">{viewData?.rate_source || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Updated By:</span>
                                    <span className="data">{viewData?.last_update_by || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Updated On:</span>
                                    <span className="data">{viewData?.last_update || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Detention Free Org:</span>
                                    <span className="data">{viewData?.detention_free || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Detention Free Dest:</span>
                                    <span className="data">{viewData?.detention_free || '-'}</span>
                                </div>
                            </div> */}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalSurchargeValue;
