import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import TableUsers from "./TableUsers";
import {
  Edit,
  FirstName,
  LastActive,
  LastName,
  ResetPassword,
  Role,
  Status,
  UserName,
} from "./SettingsCol";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsersData, updateUserSwitchData } from "../../store/Settings/actions";
import { edit_icon } from "../../assets/images";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [isRight, setIsRight] = useState(false);
  const dispatch = useDispatch();
  const navidate = useNavigate()

  const settingsUsersData = useSelector(
    (state) => state.settings.settings_users_data
  );

  const toggleRightCanvas = () => {
    setIsRight(!isRight);
  };

  const viewPopupHandler = (data) => {
    console.log("popup");
  };
  const editHandler = (data) => {
    navidate(`/settings/users/editUser`, {
      state: {
        data,
      },
    });
    // console.log("edit clicked");
  };

  const switchHandler = (data) => {
    dispatch(updateUserSwitchData(data.id,data.is_active));
}

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const columns = useMemo(() => ([
    {
      Header: "User Name",
      accessor: "user_name",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <UserName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "First Name",
      accessor: "first_name",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <FirstName
            cellProps={cellProps}
            viewPopupHandler={viewPopupHandler}
          />
        );
      },
    },
    {
      Header: "Last Name",
      accessor: "last_name",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <LastName cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Role",
      accessor: "role",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <Role cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Last Active",
      accessor: "last_active",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <LastActive
            cellProps={cellProps}
            viewPopupHandler={viewPopupHandler}
          />
        );
      },
    },
    {
      Header: "Reset Password",
      accessor: "reset_password",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <ResetPassword
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
        // return <Status cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        return (
        //   <DropdownItem onClick={(e) => e.stopPropagation()}>
        //     <div className="switch_wrap">
        //       <FormGroup switch>
        //         <Input
        //           type="switch"
        //           checked={cellProps.row.original?.is_active || false}
        //           onClick={() => {
        //             switchHandler(cellProps.row.original);
        //           }}
        //           readOnly
        //         />
        //       </FormGroup>
        //     </div>
        //   </DropdownItem>
        <div
                      className="form-check form-switch form-switch-md mb-3"
                      dir="ltr"
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizemd"
                      />
                    </div>
        );
      },
    },
    {
      Header: "Edit",
      accessor: "edit",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return <Edit cellProps={cellProps} viewPopupHandler={editHandler} />
        // return <Edit />
        // console.log(cellProps);
        // return (<button onClick={()=>console.log("hello")}><img src={edit_icon} alt="Edit" /></button>);
      },
    },
  ]),[]);

  return (
    <>
      <div className="page-content settings_users_wrapper">
        <Container fluid>
          <div className="main_freight_wrapper">
            {/* breadcrumbs && rate */}
            {/* <TopBreadcrumbs breadcrumbs={fclBreadcrumb} data={fclRateData} /> */}

            {/* React Table */}
            <TableUsers
              columns={columns}
              data={settingsUsersData}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
            //   toggleRightCanvas={toggleRightCanvas}
              component={"Users"}
            />

            {/* modal */}
            {/* <ModalSurchargeValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'PortLocalCharges'} /> */}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Users;
