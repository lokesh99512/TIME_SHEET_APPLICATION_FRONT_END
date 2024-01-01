import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import doc from "../../../../../assets/images/bg-1.jpg"

const TabThreeDocuments = ({ viewData }) => {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  console.log(viewData, "viewData3");
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

              {viewData?.documents?.map((viewData, index) => {
                return (
                  <div className="view_data_wrap d-flex align-items-start" key={index}>
                    <div className="left_freight_details">

                      <div className="details">
                        <span className="title">Document Type:</span>
                        <span className="data">{viewData?.documentType || "-"}</span>
                      </div>
                      <div className="details">
                        <span className="title">Uploaded Document:</span>
                        <span className="data">{viewData?.documentPath || "-"}</span>
                        {/* <img src={doc} alt={viewData?.uploadDocument} width={150} height={120} /> */}
                      </div>
                    </div>
                  </div>
                )
              })}
              {viewData?.documents?.length === 0 && <b>No Data Found !</b>}
            </AccordionBody>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
};

export default TabThreeDocuments;
