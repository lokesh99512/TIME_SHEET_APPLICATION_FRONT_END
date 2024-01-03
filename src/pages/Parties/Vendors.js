import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllTableVendor, getCustomersData, getVendorsData, updateCustomerSwitchData, updateVendorSwitchData } from '../../store/Parties/actions';
import { useSelector } from 'react-redux';
import TableVenders from './TableVenders';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap';
import { City, CityV, CommonReplaceValue, CommonValue, ConatctName, ConatctNo, ConatctNoV, CreatedOn, CreatedOnV, EmailId, EmailIdV, LastTransactionV, ServiceType, VendorCode, VendorName, VendorType } from './PartiesCol';
import { edit_icon } from '../../assets/images';
import ModalVendorValue from './Modal/ModalVendorValue';
import { getVendorListAction } from '../../store/Parties/Vendor/action';

const Vendors = () => {
  const [modal, setModal] = useState(false);
  const [viewData, setViewData] = useState(false);
  const dispatch = useDispatch();

  const { vendor_loader, vendors_data } = useSelector(
    (state) => state?.vendor
  );

  const viewPopupHandler = (data) => {
    setModal(true);
    setViewData(data);
  };

  const onCloseClick = () => {
    setModal(false);
  }

  // const switchHandler = (data) => {
  //   dispatch(updateVendorSwitchData(data.id, data.is_active));
  // }

  useEffect(() => {
    dispatch(getVendorListAction());
  }, []);

  const columns = useMemo(() => [
    {
      Header: "Vendor Name",
      accessor: "name",
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonReplaceValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "City",
      accessor: 'city.cityName',
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CommonValue cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
        );
      },
    },
    {
      Header: "Created On",
      accessor: 'createdDate',
      filterable: true,
      disableFilters: true,
      Cell: (cellProps) => {
        return (
          <CreatedOn cellProps={cellProps} viewPopupHandler={viewPopupHandler} />
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
              data={vendors_data?.content || []}
              isGlobalFilter={true}
              isAddInvoiceList={true}
              customPageSize={10}
              //   toggleRightCanvas={toggleRightCanvas}
              component={"Customers"}
              loader={vendor_loader}
            />

            {/* modal */}
            <ModalVendorValue modal={modal} onCloseClick={onCloseClick} viewData={viewData} modalType={'vendor'} />
          </div>
        </Container>
      </div>
    </>
  )
}

export default Vendors
