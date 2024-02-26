import { Card, CardBody, Container, Input } from "reactstrap";
import { addRoleBreadcrumb } from "../../../common/data/parties";
import React, { useEffect, useMemo, useState } from "react";
import TopBreadcrumbs from "../Surcharge/TopBreadcrumbs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { RoleName } from "./RolesCol";
import ModuleTable from "./ModuleTable";

import { cloud_upload_icon, download_icon, find_book_icon, folder_plus_icon, web_search_icon, read_book_icon, task_minus_icon, writing_icon } from "../../../assets/images";


const AddRole = () => {
    const navigate = useNavigate();
    const { roleData } = useSelector((state) => state.globalReducer);
    const viewPopupHandler = (data) => {
        console.log("popup");
    };
    const columns = useMemo(() => ([
        {
            Header: "Modules",
            accessor: "label",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <RoleName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                );
            },
        },
        {
            Header: "Sub Modules",
            accessor: "modules",
            filterable: true,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <RoleName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
                );
            },
        },
        {
            Header: <img src={read_book_icon} alt="Upload" title="Read" height={20} className="p-0" />,
            accessor: "demo",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
        {
            Header: <img src={writing_icon} alt="Upload" title="Write" height={20} className="p-0" />,
            accessor: "write",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
        {
            Header: <img src={folder_plus_icon} alt="Upload" title="Add New" height={20} className="p-0" />,
            accessor: "bookmark",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
        {
            Header: <img src={task_minus_icon} alt="Upload" title="data" height={20} className="p-0" />,
            accessor: "minus",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
        {
            Header: <img src={find_book_icon} alt="Upload" title="Search" height={20} className="p-0" />,
            accessor: "edit",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
        {
            Header: <img src={cloud_upload_icon} alt="Upload" title="Upload" height={20} className="p-0" />,
            accessor: "Upload",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
        {
            Header: <img src={download_icon} alt="Upload" title="Download" height={20} className="p-0" />,
            accessor: "1",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
        {
            Header: <img src={web_search_icon} alt="Upload" title="Right" height={20} className="p-0" />,
            accessor: "web",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" checked id="chk19" />
                );
            },
        },
    ]), [roleData]);

    return (
        <>
            <div className="page-content settings_users_wrapper">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <TopBreadcrumbs breadcrumbs={addRoleBreadcrumb} />
                        <button type="button" className="btn border mb-3" onClick={() => { navigate(-1); }} > Back </button>
                    </div>
                </Container>
                <div className="mb-1 mt-2">
                    <h5>Add Role</h5>
                </div>
                <Card >
                    <CardBody>
                        <div className='row'>
                            <div className="col-12 col-md-4">
                                <div className="mb-2">
                                    <label className="form-label">Role Code</label>
                                    <Input
                                        type="number"
                                        // name={`freight_rate[${index}].margin`}
                                        // onChange={fclFreightRateFormik.handleChange}
                                        className="form-control"
                                        placeholder="Role Code"
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="mb-2">
                                    <label className="form-label">Role Name</label>
                                    <Select
                                        placeholder="Role Name"
                                        // onChange={(e) => {
                                        //     fclFreightRateFormik.setFieldValue(`freight_rate[${index}].margin_type`, e);
                                        // }}
                                        options={roleData || []}
                                        classNamePrefix="select2-selection form-select"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className="row">
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" type="submit"> Save </button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" type="button" >Cancel</button>
                        </div>
                    </div>
                </div>


                <ModuleTable
                    columns={columns}
                    data={[]}
                    isFilterable={true}
                    isGlobalFilter={true}
                    isAddInvoiceList={true}
                    customPageSize={10}
                    component={"Roles"}
                />
            </div>

        </>
    )
}

export default AddRole;