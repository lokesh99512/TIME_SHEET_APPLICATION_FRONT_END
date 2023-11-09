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
import TableCustomers from "./TableCustomers";
import {
  Edit,
  FirstName,
  LastActive,
  LastName,
  ResetPassword,
  Role,
  UserName,
} from "../Settings/SettingsCol";
import { useSelector } from "react-redux";
import { edit_icon } from "../../assets/images";
import {
  City,
  ConatctNo,
  ContactName,
  Country,
  CreatedOn,
  CustomerCode,
  CustomerName,
  CustomerType,
  EmailId,
  LastTransaction,
} from "./PartiesCol";
import { useDispatch } from "react-redux";
import { getCustomersData, updateCustomerSwitchData } from "../../store/Parties/actions";
import ModalCustomerValue from "./Modal/ModalCustomerValue";

const Customers = () => {
    const [modal, setModal] = useState(false);
    const [viewData, setViewData] = useState(false);
  const dispatch = useDispatch();

  const partiesCustomersData = useSelector(
    (state) => state.parties.parties_customers_data
  );

  console.log(partiesCustomersData,"<---datas");

  const viewPopupHandler = (data) => {
    setModal(true);
    setViewData(data);
  };

  const onCloseClick = () => {
    setModal(false);
}

  const switchHandler = (data) => {
    dispatch(updateCustomerSwitchData(data.id,data.is_active));
}

  useEffect(() => {
    dispatch(getCustomersData());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Customer Code",
        accessor: "customerCode",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CustomerCode
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
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
        Header: "Customer Type",
        accessor: "customerType",
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
        Header: "Contact Name",
        accessor: "contactName",
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
        Header: "Contact No",
        accessor: "contactNo",
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
        Header: "Email Id",
        accessor: "email",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <EmailId
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "City",
        accessor: "city",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <City cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
          );
        },
      },
      {
        Header: "Country",
        accessor: "country",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <Country
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Last Transaction (in Days)",
        accessor: "lastTransaction",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <LastTransaction
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Created On",
        accessor: "createdOn",
        filterable: true,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <CreatedOn
              cellProps={cellProps}
              viewPopupHandler={viewPopupHandler}
            />
          );
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn btn-link text-muted py-1 font-size-16 shadow-none"
                tag="a"
              >
                <i className="bx bx-dots-vertical-rounded"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={(e) => {
                    console.log(e, "e");
                  }}
                >
                  Edit <img src={edit_icon} alt="Edit" />
                </DropdownItem>
                {/* <DropdownItem onClick={(e) => {e.stopPropagation(); viewPopupHandler(cellProps.row.original)}}>View <img src={eye_icon} alt="Eye" /></DropdownItem> */}
                <DropdownItem onClick={(e) => e.stopPropagation()}>
                  Activate
                  <div className="switch_wrap">
                    <FormGroup switch>
                      <Input
                        type="switch"
                        checked={cellProps.row.original?.is_active || false}
                        onClick={() => {
                          switchHandler(cellProps.row.original);
                        }}
                        readOnly
                      />
                    </FormGroup>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <div className="page-content settings_users_wrapper">
        <Container fluid>
          <div className="main_freight_wrapper">
            {/* breadcrumbs && rate */}
            {/* <TopBreadcrumbs breadcrumbs={fclBreadcrumb} data={fclRateData} /> */}

            {/* React Table */}
            <TableCustomers
              columns={columns}
              data={partiesCustomersData}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              //   toggleRightCanvas={toggleRightCanvas}
              component={"Customers"}
            />

            {/* modal */}
            <ModalCustomerValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'customer'} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Customers;
