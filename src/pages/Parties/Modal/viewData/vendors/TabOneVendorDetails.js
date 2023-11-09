import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import doc from "../../../../../assets/images/bg-1.jpg"

const TabOneVendorDetails = ({viewData1}) => {
  // console.log(viewData1,"viewData1");
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
                    <span className="data">{viewData1?.VendorName || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Logo:</span>
                    <img src={doc} alt={viewData?.uploadDocument} width={150} height={120} />
                  </div>
                  <div className="details">
                    <span className="title">Address:</span>
                    <span className="data">{viewData1?.address || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">City:</span>
                    <span className="data">{viewData1?.city || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">State:</span>
                    <span className="data">{viewData1?.state || "-"}</span>
                  </div>

                  <div className="details">
                    <span className="title">Country:</span>
                    <span className="data">{viewData1?.country || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Zipcode:</span>
                    <span className="data">{viewData1?.zipcode || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Website:</span>
                    <span className="data">{viewData1?.website || "-"}</span>
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
                      {viewData1?.title + " " + viewData1?.contactName || "-"}
                    </span>
                  </div>
                  <div className="details">
                    <span className="title">Phone Number:</span>
                    <span className="data">
                      {viewData1?.opCode + " " + viewData1?.contactNo || "-"}
                    </span>
                  </div>
                  <div className="details">
                    <span className="title">Email Id:</span>
                    <span className="data">{viewData1?.email || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Department:</span>
                    <span className="data">{viewData1?.department || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Designation:</span>
                    <span className="data">{viewData1?.designation || "-"}</span>
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
                    <span className="data">{viewData1?.vendorType || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Service Type:</span>
                    <span className="data">{viewData1?.serviceType || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">CIN Number:</span>
                    <span className="data">{viewData1?.CINnumber || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">GST Number:</span>
                    <span className="data">{viewData1?.GSTnumber || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">PAN Number:</span>
                    <span className="data">{viewData1?.PANnumber || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Entity Type:</span>
                    <span className="data">{viewData1?.entityType || "-"}</span>
                  </div>

                  <div className="details">
                    <span className="title">Industry Type:</span>
                    <span className="data">
                      {viewData1?.industryType || "-"}
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

export default TabOneVendorDetails;
