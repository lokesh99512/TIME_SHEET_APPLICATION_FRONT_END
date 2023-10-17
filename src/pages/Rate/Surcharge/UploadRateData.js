import classnames from "classnames";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import ModalAddNewCategory from "./Modal/ModalAddNewCategory";
import ModalAddNewAlias from "./Modal/ModalAddNewAlias";

const surchargeCategory = [
  { label: "ActivesurchargeCategory", value: "ActivesurchargeCategory" },
  { label: "surchargeCategory test", value: "surchargeCategory test" },
  { label: "Add New", value: "Add New" },
];
const surchargeAliasCode = [
    { label: "surchargeAliasCodeABC", value: "surchargeAliasCodeABC" },
    { label: "AliasCode test", value: "AliasCode test" },
    { label: "Add New", value: "Add New" },
];
const surchargeAliasDesc = [
  { label: "Active", value: "Active" },
  { label: "In-Active", value: "In-Active" },
];

export default function UploadRateData() {
    const [categoryModal, setCategoryModal] = useState(false);
    const [aliasModal, setAliasModal] = useState(false);
  const navigate = useNavigate();

  const inputArr = {
    surchargeCode:"",
    surchargeDesc:"",
    surchargeCategory:"",
    surchargeAliasCode:"",
    surchargeAliasDesc:"",
  };
  const [addDetails, setAddDetails] = useState(inputArr);

  console.log(addDetails,"addDetails");

  const onCloseClick = () => {
    setCategoryModal(false);
    setAliasModal(false);
}

  const handleSelectGroup = useCallback(
    (name, opt) => {
        console.log(opt,"opt");
        if (name === "surchargeCategory" && opt.value === "Add New") {
            setCategoryModal(true)
        } else if(name === "surchargeAliasCode" && opt.value === "Add New"){
          setAliasModal(true)
        }
      setAddDetails(prev=>({...prev,[name]: opt}));
    },
    [addDetails]
  );
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="main_freight_wrapper">
            <button
              type="button"
              className="btn border mb-3"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="row">
                      <div className="col-4 mb-4">
                        <div className="row">
                          <Label
                            htmlFor="Surcharge_Code"
                            className="col-sm-3 col-form-label"
                          >
                            Surcharge Code
                          </Label>
                          <div className="col-9">
                            <Input
                              type="text"
                              name="surchargeCode"
                              value={addDetails.surchargeCode}
                              onChange={(e)=>{handleSelectGroup("surchargeCode", e.target.value);}}
                              className="form-control"
                              id="Surcharge_Code"
                              placeholder="Enter Surcharge Code"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-4 mb-4">
                        <div className="row">
                          <Label
                            htmlFor="Surcharge_Desc"
                            className="col-sm-3 col-form-label"
                          >
                            Surcharge Desc
                          </Label>
                          <div className="col-9">
                            <Input
                              type="text"
                              name="surchargeDesc"
                              value={addDetails.surchargeDesc}
                              onChange={(e)=>{handleSelectGroup("surchargeDesc", e.target.value);}}
                              className="form-control"
                              id="Surcharge_Desc"
                              placeholder="Enter Surcharge Desc"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 mb-4">
                        <div className="row">
                          <Label
                            htmlFor="horizontal-firstname-input"
                            className="col-sm-3 col-form-label"
                          >
                            Surcharge Category
                          </Label>
                          <div className="col-9">
                            <Select
                              value={addDetails.surchargeCategory}
                              name="surchargeCategory"
                              onChange={(opt) => {
                                handleSelectGroup("surchargeCategory", opt);
                              }}
                              options={surchargeCategory}
                              placeholder={"Select Surcharge Category"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-4 mb-4">
                        <div className="row">
                          <Label
                            htmlFor="horizontal-firstname-input"
                            className="col-sm-3 col-form-label"
                          >
                            Surcharge Alias Code
                          </Label>
                          <div className="col-9">
                            <Select
                              value={addDetails.surchargeAliasCode}
                              name="surchargeAliasCode"
                              onChange={(opt) => {
                                handleSelectGroup("surchargeAliasCode", opt);
                              }}
                              options={surchargeAliasCode}
                              placeholder={"Select Surcharge Alias Code"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-4 mb-4">
                        <div className="row">
                          <Label
                            htmlFor="horizontal-firstname-input"
                            className="col-sm-3 col-form-label"
                          >
                            Surcharge Alias Desc
                          </Label>
                          <div className="col-9">
                            <Select
                              value={addDetails.surchargeAliasDesc}
                              name="surchargeAliasDesc"
                              onChange={(opt) => {
                                handleSelectGroup("surchargeAliasDesc", opt);
                              }}
                              options={surchargeAliasDesc}
                              placeholder={"Select Status"}
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="d-flex justify-content-center">

                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary">Save</button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                          <button className=" btn btn-primary">Cancel</button>
                        </div>

                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <ModalAddNewCategory modal={categoryModal} onCloseClick={onCloseClick} />
            <ModalAddNewAlias modal={aliasModal} onCloseClick={onCloseClick} />
          </div>
        </Container>
      </div>
    </>
  );
}
