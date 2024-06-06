import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  Container,
  Input,
  Row
} from "reactstrap";
import { getAllPartiesCustomerData } from "../../store/Parties/Customer/action";
import { getCustomersCityData, updateCustomerSwitchData } from "../../store/Parties/actions";
import {
  City,
  CommonValue,
  ConatctNo,
  ContactName,
  Country,
  CustomerName,
  CustomerType,
  EmailId
} from "./PartiesCol";
import TopBreadcrumbs from "../Settings/Surcharge/TopBreadcrumbs";
import { customersBreadcrumb } from "../../common/data/parties";
import { Edit } from "../Settings/SettingsCol";
import { useNavigate } from "react-router-dom";
import TableProject from "./TableProject";
import SimpleBar from "simplebar-react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { truck_outline } from "../../assets/images";
import { optionBillableType, optionStatus } from "../../common/data/procurement";
import { postAirPortLocalChargesData } from "../../store/Procurement/actions";


const ProjectsPage = () => {
  const [modal, setModal] = useState(false);
  const [viewData, setViewData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0);
  const { customer_data, customer_loader } = useSelector((state) => state?.customer);
  const [activeProject, setActiveProject] = useState(customer_data.content);
  const { airportLocalChargesDataById } = useSelector(state => state.procurement)
  const { settings_users_data } = useSelector((state) => state.settings);
  const [open, setOpen] = useState('');

  const viewPopupHandler = (data) => {
    setModal(true);
    setViewData(data);
  };

  const userInfo = Array.isArray(settings_users_data.content)
    ? settings_users_data.content.map((user) => ({
      label: user.email,
      value: user.id.toString(),
      id: user.id,
      version: user.version,
    }))
    : [];

  const editHandler = (data) => {
    navigate(`/add/task/`, {
      state: {
        id: data?.id || '',
        data: data
      },
    });
  };

  useEffect(() => {
    if (currentPage !== '' && currentPage !== undefined) {
      let url = `?page=${currentPage}&size=10`;
      dispatch(getAllPartiesCustomerData(url))

    }
  }, [dispatch, currentPage]);

  useEffect(()=>{
    if(!!customer_data.content)
    setActiveProject(customer_data.content[0])
  },[customer_data])


  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      billableType: "",
      status: "",
      projectUsers: []
    },

    onSubmit: (value) => {
      let data = {
        ...(activeProject?.id&&{
          id:activeProject.id
        }),
        description: value.description,
        name: value.projectName,
        projectUsers: value.projectUsers.map((item, index) => {
          return {
            maUser: { id: item.value }
          }
        }),
        ...(value?.billableType && { "billableType": value?.billableType?.value || "BILLABLE" }),
        ...(value?.status && { "status": value?.status?.value || "ACTIVE" }),
      }
      dispatch(postAirPortLocalChargesData(data));
    },
  });

  const toggle = (id) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      projectName: activeProject?.name,
      description: activeProject?.description,
      billableType: { label: activeProject?.billableType, value: activeProject?.billableType },
      status: { label: activeProject?.status, value: activeProject?.status },
      projectUsers: activeProject?.projectUsers?.map((user) => {
        return {
          label: user?.maUser.email,
          value: user?.maUser.id
        }
      })
    })
  }, [activeProject])

  const columns = useMemo(
    () => [

      {
        Header: "Task Name",
        accessor: "name",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CustomerName
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Decription",
        accessor: "description",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CustomerType
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ContactName
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Billable Type",
        accessor: "billableType",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ConatctNo
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },

      {
        Header: "Edit",
        Cell: (cellProps) => {
          return <Edit cellProps={cellProps} viewPopupHandler={editHandler} />
        },
      },
    ],
    [activeProject]
  );

  console.log(activeProject);


  return (
    <>
      <div className="page-content settings_wrapper">
        <Container fluid>
          <Row>
            <div className="col-2">
              <div className="row mb-1">
                <div className="col">
                  <Input
                    type="text"
                    placeholder="Search Projects"
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary" onClick={() => { navigate(`/projects/add-project`); }} >Add </button>
                </div>
              </div>
              <Card className="h-100">
                <SimpleBar style={{ maxHeight: "100%" }}>
                  <div id="sidebar-menu" className="settings_sidebar m-0">
                    <ul className="metismenu list-unstyled" id="side-menu">
                      {customer_data?.content?.map(project => (
                        <li key={project.id}>
                          <span>
                            <a
                              href="#comapanyDetails"
                              onClick={() => { setActiveProject(project) }}
                              className={activeProject?.id === project?.id ? "active" : ""}>
                              {project.name}
                            </a>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SimpleBar>
              </Card>
            </div>

            <div className="col-10 main_freight_wrapper ">
              <Accordion open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId="1"> <div className="left_lable d-flex align-items-center">
                    <img src={truck_outline} alt="Truck" className='me-2' />
                  </div>
                    <div className="right_con d-flex ms-auto">
                      <span className='text-primary'>{activeProject?.name}</span>
                    </div></AccordionHeader>
                  <AccordionBody accordionId="1">

                    <div className="row mb-3">
                      <div className="col-md-6 col-lg-4">
                        <label className="form-label">Project Name<span className='required_star'>*</span></label>
                        <Input
                          type="text"
                          name="projectName"
                          placeholder={"Enter Project name"}
                          value={formik.values.projectName || ''}
                          onChange={formik.handleChange}
                        />
                      </div>
                      {/* Port Name */}
                      <div className="col-md-6 col-lg-4">
                        <label className="form-label">Billable Type<span className='required_star'>*</span></label>
                        <Select
                          name="billableType"
                          value={formik?.values?.billableType || { label: "BILLABLE", value: "BILLABLE" }}
                          onChange={(e) => {
                            formik.setFieldValue(`billableType`, e);
                          }}
                          options={optionBillableType}
                          placeholder={"Select Port Name"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>

                      {/* Carrier Name */}
                      <div className="col-md-6 col-lg-4">
                        <label className="form-label">Status<span className='required_star'>*</span></label>
                        <Select
                          name="status"
                          value={formik.values.status || { label: "ACTIVE", value: "ACTIVE" }}
                          onChange={(e) => {
                            formik.setFieldValue(`status`, e);
                          }}
                          options={optionStatus}
                          placeholder={"Select Status"}
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <Input
                        type="text"
                        name="description"
                        placeholder={"Enter description name"}
                        value={formik.values.description || ''}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <label className="form-label">Project Users<span className='required_star'>*</span></label>
                      <Select
                        name="projectUsers"
                        value={formik?.values?.projectUsers}
                        onChange={(e) => {
                          formik.setFieldValue(`projectUsers`, e);
                        }}
                        isMulti
                        options={userInfo}
                        placeholder={"Select Users"}
                        classNamePrefix="select2-selection form-select"
                      />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <button className=" btn btn-primary" onClick={formik.handleSubmit} > Save </button>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
              <div className="mb-2"></div>
              {/* React Table */}
              <TableProject
                columns={columns}
                data={activeProject?.tasks || []}
                isGlobalFilter={true}
                activeProject={activeProject}
                isAddInvoiceList={true}
                customPageSize={10}
                // toggleRightCanvas={toggleRightCanvas}
                component={"Customers"}
                loader={customer_loader || false}
                setCurrentPage={setCurrentPage}
                totalPages={customer_data?.totalPages || 0}
                totalEntries={customer_data?.totalElements || 0}
              />
              {/* modal */}
              {/* <ModalCustomerValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'customer'} /> */}
            </div>
          </Row>
        </Container>
      </div>

    </>
  );
};

export default ProjectsPage;
