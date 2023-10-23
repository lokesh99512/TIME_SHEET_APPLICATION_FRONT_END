import React, { useState } from "react";
import { Card, CardBody, CardTitle, Container, Input } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import ModalAddGST from "./Modal/ModalAddGST";

const Settings = () => {
  const [gstModal, setGstModal] = useState(false);

  const onCloseClick = () => {
    setGstModal(false);
  };
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card className="h-100">
            <div className="row">
              <div className="col-2">
                <Card className="m-4">
                  <div>
                    <div className="m-2">
                      <span className="font-size-16">
                        <a href="#comapanyDetails">Company Details</a>
                      </span>
                    </div>
                    <div className="m-2">
                      <span className="font-size-16">
                        <a href="#taxDetails">Tax Details</a>
                      </span>
                    </div>
                    <div className="m-2">
                      <span className="font-size-16">
                        <a href="#bussinessType">Bussiness Type</a>
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* ------------------- */}
              <div className="col-10">
                <Card className="m-4">
                  <PerfectScrollbar className="p-4" style={{ height: "900px" }}>
                    {/* Comapany details  */}
                    <Card id="comapanyDetails" className="mb-4">
                      <CardBody>
                        <div>
                          <h5>Company Details</h5>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-3 mb-4">
                            <label className="form-label">Image</label>
                            <Input
                              type="file"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-7 mb-4">
                            <label className="form-label">Company Name</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-5 mb-4">
                            <label className="form-label">Contact Number</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-5 mb-4">
                            <label className="form-label">Email id</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-10 mb-4">
                            <label className="form-label">
                              Company Address
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-5 mb-4">
                            <label className="form-label">City</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-5 mb-4">
                            <label className="form-label">State</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-5 mb-4">
                            <label className="form-label">Zipcode</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-5 mb-4">
                            <label className="form-label">Country</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Tax Details  */}
                    <Card id="taxDetails" className="my-4">
                      <CardBody>
                        <div>
                          <h5>Tax Details</h5>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-5 mb-4">
                            <label className="form-label">Pan Number</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-5 mb-4">
                            <label className="form-label">CIN Number</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-10 mb-4">
                            <label className="form-label">Transporter ID</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-5 mb-4">
                            <label className="form-label">GST Number</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>

                          <div className="col-5 mb-4">
                            <label className="form-label">
                              Place of Supply
                            </label>
                            <Select
                              //   value={}
                              //   name=""
                              //   options={}
                              //   placeholder={""}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                          <div className="col-2">
                            <button
                              className="btn btn-primary mt-4"
                              onClick={() => setGstModal(true)}
                            >
                              <i className="bx bx-plus"></i>
                            </button>
                          </div>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-5 mb-4">
                            10 More GST available
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Bussiness Type */}
                    <Card id="bussinessType" className="my-4 mb-auto">
                      <CardBody>
                        <div>
                          <h5>Bussiness Type</h5>
                        </div>

                        <div className="row mt-4 mb-2">
                          <div className="col-5 mb-4">
                            <label className="form-label">Industry Type</label>
                            <Select
                              //   value={}
                              //   name=""
                              //   options={}
                              //   placeholder={""}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>

                          <div className="col-5 mb-4">
                            <label className="form-label">Entry Type</label>
                            <Select
                              //   value={}
                              //   name=""
                              //   options={}
                              //   placeholder={""}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </PerfectScrollbar>
                </Card>
              </div>
            </div>
          </Card>
          <ModalAddGST modal={gstModal} onCloseClick={onCloseClick} />
        </Container>
      </div>
    </>
  );
};

export default Settings;
