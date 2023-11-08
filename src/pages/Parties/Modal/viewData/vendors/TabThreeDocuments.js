import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const TabThreeDocuments = () => {
  const viewData = [
    {
      documentType:"Pan card",
      uploadDocument: '',
    },
    {
      documentType:"Pan Card",
      uploadDocument: '',
    },
  ]
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
          {/* Documents */}
          <AccordionItem className="freigth_details_wrap">
            <AccordionHeader targetId={"1"}>
              <h3 className="sub_modal_title">Documents</h3>
            </AccordionHeader>
            <AccordionBody accordionId={"1"}>

              {viewData?.map((viewData,key)=>{
                return(
                    <div key={key} className="view_data_wrap d-flex align-items-start">
                <div className="left_freight_details">
                  
                  <div className="details">
                    <span className="title">Document Type:</span>
                    <span className="data">{viewData?.documentType || "-"}</span>
                  </div>
                  <div className="details">
                    <span className="title">Uploaded Document:</span>
                    <span className="data">{viewData?.uploadDocument || "-"}</span>
                  </div>
                </div>
              </div>
                )
              })}
            </AccordionBody>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
};

export default TabThreeDocuments;
