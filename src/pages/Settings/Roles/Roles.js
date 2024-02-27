import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, DropdownItem, FormGroup, Input } from "reactstrap";
import TopBreadcrumbs from "../Surcharge/TopBreadcrumbs";
import { GET_ROLE_TYPE } from "../../../store/Global/actiontype";
import { RolesBreadcrumb } from "../../../common/data/parties";
import RoleTable from "./RoleTable";
import { Permissions, RoleName, Edit } from "./RolesCol";
import { cloud_upload_icon, download_icon, find_book_icon, folder_plus_icon, web_search_icon, read_book_icon, task_minus_icon, writing_icon } from "../../../assets/images";

const Roles = () => {
  const [resetModal, setResetModal] = useState(false);
  const dispatch = useDispatch();
  const navidate = useNavigate()

  const resetHandler = (data) => {
    setResetModal(true);
  }

  const { roleData, role_loader } = useSelector((state) => state.globalReducer);

  const onCloseClick = () => {
    setResetModal(false);
  }

  const viewPopupHandler = (data) => {
    console.log("popup");
  };
  const editHandler = (data) => {
    navidate(`/settings/addRole`, {
      state: {
        id: data?.id || '',
      },
    });
  };


  const switchHandler = (data) => {
    // dispatch(updateUserSwitchData(data.id, data.is_active));
  }

  useEffect(() => {
    //dispatch(getUsersData()); 
    dispatch({ type: GET_ROLE_TYPE });
  }, [dispatch]);

  console.log(roleData);

  const columns = useMemo(() => ([
    {
      Header: "Role Name",
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
      Header: "Modules",
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
          <Input type="checkbox" className="form-controler" id="chk19" />
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
                  checked={cellProps.row.original?.status === "ACTIVE" || false}
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
    {
      Header: "No.of Users",
      accessor: "totalUsers",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <RoleName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Edit",
      Cell: (cellProps) => {
        return <Edit cellProps={cellProps} viewPopupHandler={editHandler} />
      },
    },
  ]), [roleData]);

  return (
    <>
      <div className="page-content settings_users_wrapper">
        <Container fluid>
          <div className="main_freight_wrapper">
            <TopBreadcrumbs breadcrumbs={RolesBreadcrumb} />
            <RoleTable
              columns={columns}
              data={roleData || []}
              isFilterable={true}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              component={"Roles"}
              loader={role_loader || false}
            />
          </div>
        </Container>
      </div>
    </>
  );

};

export default Roles;
