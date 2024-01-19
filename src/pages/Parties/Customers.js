import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container
} from "reactstrap";
import { getAllPartiesCustomerData } from "../../store/Parties/Customer/action";
import { updateCustomerSwitchData } from "../../store/Parties/actions";
import ModalCustomerValue from "./Modal/ModalCustomerValue";
import {
  City,
  ConatctNo,
  ContactName,
  Country,
  CustomerName,
  CustomerType,
  EmailId
} from "./PartiesCol";
import TableCustomers from "./TableCustomers";
import TopBreadcrumbs from "../Settings/Surcharge/TopBreadcrumbs";
import { customersBreadcrumb } from "../../common/data/parties";

const Customers = () => {
  const [modal, setModal] = useState(false);
  const [viewData, setViewData] = useState(false);
  const dispatch = useDispatch();

  const { customer_data } = useSelector((state) => state?.customer)

  console.log(customer_data, "--customer_data");

  const viewPopupHandler = (data) => {
    setModal(true);
    setViewData(data);
  };

  const onCloseClick = () => {
    setModal(false);
  }

  const switchHandler = (data) => {
    dispatch(updateCustomerSwitchData(data.id, data.is_active));
  }

  useEffect(() => {
    dispatch(getAllPartiesCustomerData())
  }, []);

  const columns = useMemo(
    () => [
      // {
      //   Header: "Customer Code",
      //   accessor: "customerCode",
      //   filterable: true,
      //   disableFilters: true,
      //   Cell: (cellProps) => {
      //     return (
      //       <CustomerCode
      //         cellProps={cellProps}
      //         viewPopupHandler={viewPopupHandler}
      //       />
      //     );
      //   },
      // },
      {
        Header: "Customer Name",
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
        Header: "Customer Type",
        accessor: "type",
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
        accessor: "contactEmail",
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
        accessor: "city.cityName",
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
        accessor: "country.countryName",
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
    ],
    []
  );
  return (
    <>
      <div className="page-content settings_users_wrapper">
        <Container fluid>
          <div className="main_freight_wrapper">
            {/* breadcrumbs */}
            <TopBreadcrumbs breadcrumbs={customersBreadcrumb} />

            {/* React Table */}
            <TableCustomers
              columns={columns}
              data={customer_data?.content || []}
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
