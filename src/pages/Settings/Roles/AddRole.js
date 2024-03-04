import { Card, CardBody, Container, FormFeedback, Input } from "reactstrap";
import { addRoleBreadcrumb } from "../../../common/data/parties";
import React, { useEffect, useMemo, useState } from "react";
import TopBreadcrumbs from "../Surcharge/TopBreadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { RoleName } from "./RolesCol";
import ModuleTable from "./ModuleTable";
import * as Yup from "yup";
import { cloud_upload_icon, download_icon, find_book_icon, folder_plus_icon, web_search_icon, read_book_icon, task_minus_icon, writing_icon } from "../../../assets/images";
import { useDispatch } from "react-redux";
import { DropdownItem, FormGroup } from "reactstrap";
import { useFormik } from "formik";
import { DELETE_PERMISSIONS_TYPE, SAVE_PERMISSIONS_TYPE } from "../../../store/Global/actiontype";
import { deletePermissions, savePermissions } from "../../../store/Global/actions";

const AddRole = () => {
    const navigate = useNavigate();
    const { roleData, moduleData, module_loader } = useSelector((state) => state.globalReducer);
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const viewPopupHandler = (data) => {
        console.log("popup");
    };

    const switchHandler = (data) => {

    }

    const handleChange = (event, rowData, actionName) => {
        if (event)
            dispatch(savePermissions(rowData.roleId, rowData.id, actionName));
        else
            dispatch(deletePermissions(rowData.roleId, rowData.id, actionName));
    };


    const roleFormik = useFormik({
        initialValues: {
            roleCode: navigateState?.state?.data?.id,
            roleName: navigateState?.state?.data?.value || "",
        },
        validationSchema: Yup.object({
            roleCode: Yup.string().required("Please enter role code"),
            roleName: Yup.string().required("Please select role name"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    })
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
            Header: <img src={read_book_icon} alt="Upload" title="READ" height={20} className="p-0" />,
            accessor: "demo",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input
                        type="checkbox"
                        className="custom-checkbox"
                        defaultChecked={cellProps.row.original?.actionNames?.includes("READ") || false}
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "READ")}
                    />

                );
            },
        },
        {
            Header: <img src={folder_plus_icon} alt="Upload" title="ADD" height={20} className="p-0" />,
            accessor: "ADD",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" className="custom-checkbox"
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "ADD")}
                        defaultChecked={cellProps.row.original?.actionNames?.includes("ADD") || false} id="chk19" />
                );
            },
        },
        {
            Header: <img src={writing_icon} alt="Upload" title="EDIT" height={20} className="p-0" />,
            accessor: "EDIT",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" className="custom-checkbox"
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "EDIT")}
                        defaultChecked={cellProps.row.original?.actionNames?.includes("EDIT") || false} id="chk19" />
                );
            },
        },
        {
            Header: <img src={task_minus_icon} alt="Upload" title="DELETE" height={20} className="p-0" />,
            accessor: "DELETE",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" className="custom-checkbox"
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "DELETE")}
                        defaultChecked={cellProps.row.original?.actionNames?.includes("DELETE") || false} id="chk19" />
                );
            },
        },
        {
            Header: <img src={find_book_icon} alt="Upload" title="SEARCH" height={20} className="p-0" />,
            accessor: "SEARCH",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" className="custom-checkbox"
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "SEARCH")}
                        defaultChecked={cellProps.row.original?.actionNames?.includes("SEARCH") || false} id="chk19" />
                );
            },
        },
        {
            Header: <img src={cloud_upload_icon} alt="Upload" title="UPLOAD" height={20} className="p-0" />,
            accessor: "UPLOAD",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" className="custom-checkbox"
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "UPLOAD")}
                        defaultChecked={cellProps.row.original?.actionNames?.includes("UPLOAD") || false} id="chk19" />
                );
            },
        },
        {
            Header: <img src={download_icon} alt="Upload" title="DOWNLOAD" height={20} className="p-0" />,
            accessor: "DOWNLOAD",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input type="checkbox" className="custom-checkbox"
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "DOWNLOAD")}
                        defaultChecked={cellProps.row.original?.actionNames?.includes("DOWNLOAD") || false} id="chk19" />
                );
            },
        },
        {
            Header: <img src={web_search_icon} alt="Upload" title="APPROVE" height={20} className="p-0" />,
            accessor: "APPROVE",
            filterable: true,
            width: 2,
            disableFilters: true,
            Cell: (cellProps) => {
                return (
                    <Input
                        type="checkbox"
                        className="custom-checkbox"
                        onChange={(e) => handleChange(e.target.checked, cellProps.row.original, "APPROVE")}
                        defaultChecked={cellProps.row.original?.actionNames?.includes("APPROVE") || false}
                        id="chk19"
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
                    <DropdownItem onClick={(e) => e.stopPropagation()}>
                        <div className="switch_wrap">
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={cellProps.row.original?.status == "ACTIVE" || false}
                                    onClick={() => {
                                        switchHandler(cellProps.row.original);
                                    }}
                                    readOnly
                                />
                            </FormGroup>
                        </div>
                    </DropdownItem>
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
                                        name="roleCode"
                                        value={roleFormik.values.roleCode}
                                        onChange={roleFormik.handleChange}
                                        onBlur={roleFormik.handleBlur}
                                        className="form-control"
                                        placeholder="Role Code"
                                        invalid={roleFormik.touched.roleCode && roleFormik.errors.roleCode ? true : false}
                                    />
                                    {roleFormik.touched.roleCode && roleFormik.errors.roleCode ? (
                                        <FormFeedback>{roleFormik.errors.roleCode}</FormFeedback>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="mb-2">
                                    <label className="form-label">Role Name</label>
                                    <Select
                                        placeholder="Role Name"
                                        name="roleName"
                                        value={
                                            roleData
                                                ? roleData.find(
                                                    (option) =>
                                                        option.value ===
                                                        roleFormik?.values?.roleName
                                                )
                                                : ""
                                        }
                                        onChange={(e) => {
                                            roleFormik.setFieldValue(`roleName`, e.value);
                                        }}
                                        onBlur={roleFormik.handleBlur}
                                        options={roleData || []}
                                        classNamePrefix="select2-selection form-select"
                                        invalid={roleFormik.touched.roleName && roleFormik.errors.roleName ? true : false}
                                    />
                                    {roleFormik.touched.roleName && roleFormik.errors.roleName ? (
                                        <FormFeedback>{roleFormik.errors.roleName}</FormFeedback>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className="row">
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" onClick={roleFormik.handleSubmit} type="submit"> Save </button>
                        </div>
                        <div className="mb-3 mx-3 d-flex justify-content-end">
                            <button className=" btn btn-primary" onClick={roleFormik.resetForm} type="button" >Cancel</button>
                        </div>
                    </div>
                </div>
                <ModuleTable
                    columns={columns}
                    data={navigateState?.state?.data?.moduleData || []}
                    isFilterable={true}
                    isGlobalFilter={true}
                    isAddInvoiceList={true}
                    customPageSize={10}
                    component={"Modules"}
                    loader={module_loader || false}
                />
            </div>

        </>
    )
}

export default AddRole;