import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const TabTwoContacts = ({viewData2}) => {
  // console.log(viewData2,"viewData2");
 
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
          {/* Contacts */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={"1"}>
              <h3 className="sub_modal_title">Contacts</h3>
            </AccordionHeader>
            <AccordionBody accordionId={"1"}>

              {/* {viewData?.map((viewData,key)=>{
                return( */}
                    <div className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  <div className="details">
                    <span className="title">Contact Name:</span>
                    <span className="data">
                      {viewData2?.title + " " + viewData2?.contactName || "-"}
                    </span>
                  </div>
                  <div className="details">
                    <span className="title">Phone Number:</span>
                    <span className="data">
                      {viewData2?.opCode + " " + viewData2?.contactNo || "-"}
                    </span>
                  </div>
                  <div className="details">
                    <span className="title">Email Id:</span>
                    <span className="data">{viewData2?.email || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Department:</span>
                    <span className="data">{viewData2?.department || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Designation:</span>
                    <span className="data">{viewData2?.designation || "-"}</span>
                  </div>
                </div>
              </div>
                {/* )
              })} */}
            </AccordionBody>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
};

export default TabTwoContacts;
