import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCustomersData, updateCustomerSwitchData } from '../../store/Parties/actions';
import { useSelector } from 'react-redux';
import TableVenders from './TableVenders';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap';
import { CityV, ConatctNoV, CreatedOnV, EmailIdV, LastTransactionV, ServiceType, VendorCode, VendorName, VendorType } from './PartiesCol';
import { edit_icon } from '../../assets/images';

const Vendors = () => {
  const [modal, setModal] = useState(false);
  const [viewData, setViewData] = useState(false);
const dispatch = useDispatch();

const partiesCustomersData = useSelector(
  (state) => state.parties.parties_customers_data
);

//   console.log(partiesCustomersData,"<---data");

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
      Header: "Vendor Code",
      accessor: "VendorCode",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <VendorCode
            cellProps={cellProps}
            viewPopupHandler={viewPopupHandler}
          />
        );
      },
    },
    {
      Header: "Vendor Name",
      accessor: "vendorName",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <VendorName
            cellProps={cellProps}
            viewPopupHandler={viewPopupHandler}
          />
        );
      },
    },
    {
      Header: "Vendor Type",
      accessor: "vendorType",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <VendorType
            cellProps={cellProps}
            viewPopupHandler={viewPopupHandler}
          />
        );
      },
    },
    {
      Header: "Service Type",
      accessor: "serviceType",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <ServiceType
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
          <ConatctNoV
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
          <EmailIdV
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
          <CityV cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    // {
    //   Header: "Country",
    //   accessor: "country",
    //   filterable: true,
    //   disableFilters: true,
    //   Cell: (cellProps) => {
    //     return (
    //       <LastTransactionV
    //         cellProps={cellProps}
    //         viewPopupHandler={viewPopupHandler}
    //       />
    //     );
    //   },
    // },
    {
      Header: "Last Transaction",
      accessor: "lastTransaction",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <LastTransactionV
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
          <CreatedOnV
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
            <TableVenders
              columns={columns}
              data={partiesCustomersData}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              //   toggleRightCanvas={toggleRightCanvas}
              component={"Customers"}
            />

            {/* modal */}
            {/* <ModalCustomerValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'customer'} /> */}
          </div>
        </Container>
      </div>
    </>
  )
}

export default Vendors