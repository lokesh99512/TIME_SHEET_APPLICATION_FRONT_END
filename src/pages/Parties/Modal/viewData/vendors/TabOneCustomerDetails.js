import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const TabOneCustomerDetails = () => {
  const viewData = {
    companyName: "ABC software",
    logo: "logo",
    address: "123, test area, india",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    zipcode: "567890",
    website: "www.test.in",

    title: "Mr",
    contactName: "Thanos",
    opCode: "+91",
    phoneNumber: "1234567890",
    email: "thanos@gmail.com",
    department: "test",
    designation: "test",

    vendorType:"Carrier",
    serviceType:"Ocean",
    CINnumber: "12345",
    GSTnumber: "24ABCD1234",
    PANnumber: "PAN66AB",
    entityType: "test",
    industryType: "test",

    customerCode: "123908AB",
    customerName: "Apex Export Pvt Ltd",
    customerType: "Agent",
    contactName: "Ajay",
    contactNo: "+91 9800012345",
    email: "a@gmail.com",
    city: "Banglore",
    country: "India",
    lastTransaction: "4",
    createdOn: "Oct 17, 2023",
    is_active: true,
  };
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  return (
    <div>
      <div className="table_view_data_wrap">
        <Accordion flush open={open} toggle={toggle} className="main_accordion">
          {/* Company Details */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={"1"}>
              <h3 className="sub_modal_title">Company Details</h3>
            </AccordionHeader>
            <AccordionBody accordionId={"1"}>
              <div className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  <div className="details">
                    <span className="title">Company Name:</span>
                    <span className="data">{viewData?.companyName || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Address:</span>
                    <span className="data">{viewData?.address || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">City:</span>
                    <span className="data">{viewData?.city || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">State:</span>
                    <span className="data">{viewData?.state || "-"}</span>
                  </div>

                  <div className="details">
                    <span className="title">Country:</span>
                    <span className="data">{viewData?.country || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Zipcode:</span>
                    <span className="data">{viewData?.zipcode || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Website:</span>
                    <span className="data">{viewData?.website || "-"}</span>
                  </div>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>

          {/* Primary Contact Details */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={"2"}>
              <h3 className="sub_modal_title">Primary Contact Details</h3>
            </AccordionHeader>
            <AccordionBody accordionId={"2"}>
              <div className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  <div className="details">
                    <span className="title">Contact Name:</span>
                    <span className="data">
                      {viewData?.title + " " + viewData?.contactName || "-"}
                    </span>
                  </div>
                  <div className="details">
                    <span className="title">Phone Number:</span>
                    <span className="data">
                      {viewData?.opCode + " " + viewData?.phoneNumber || "-"}
                    </span>
                  </div>
                  <div className="details">
                    <span className="title">Email Id:</span>
                    <span className="data">{viewData?.email || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Department:</span>
                    <span className="data">{viewData?.department || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Designation:</span>
                    <span className="data">{viewData?.designation || "-"}</span>
                  </div>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>

          {/* Company identification */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={"3"}>
              <h3 className="sub_modal_title">Company identification</h3>
            </AccordionHeader>
            <AccordionBody accordionId={"3"}>
              <div className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  <div className="details">
                    <span className="title">Vendor Type:</span>
                    <span className="data">{viewData?.vendorType || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Service Type:</span>
                    <span className="data">{viewData?.serviceType || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">CIN Number:</span>
                    <span className="data">{viewData?.CINnumber || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">GST Number:</span>
                    <span className="data">{viewData?.GSTnumber || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">PAN Number:</span>
                    <span className="data">{viewData?.PANnumber || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Entity Type:</span>
                    <span className="data">{viewData?.entityType || "-"}</span>
                  </div>

                  <div className="details">
                    <span className="title">Industry Type:</span>
                    <span className="data">
                      {viewData?.industryType || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TabOneCustomerDetails;
