import React, { useState } from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";
import SimpleBar from "simplebar-react";

const ModalFclInlandCharge = ({ viewData, modal, onCloseClick }) => {
    const [open, setOpen] = useState("");

    const toggle = (id) => {
        if (open === id) {
            setOpen("");
        } else {
            setOpen(id);
        }
    };
    return (
        <>
            <Modal
                isOpen={modal}
                toggle={onCloseClick}
                className="table_view_modal"
                style={{ maxWidth: "1345px" }}
            >
                <ModalHeader tag="h4">
                    View Details
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <SimpleBar>
                        <div
                            className="table_view_data_wrap"
                            style={{ minWidth: "1000px", overflow: "auto" }}
                        >
                            <Accordion flush open={open} toggle={toggle} className='main_accordion'>
                                <AccordionItem className='view_details_wrap'>
                                    <AccordionHeader targetId={`view_detail_${viewData?.charge_id}`}>
                                        <div className="top_details">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="details">
                                                        <span className="title">Charge ID:</span>
                                                        <span className="data">{viewData?.charge_id || '-'}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="details">
                                                        <span className="title">Carrier Name:</span>
                                                        <span className="data">{viewData?.carrier_name || '-'}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="details">
                                                        <span className="title">Vendor Name:</span>
                                                        <span className="data">{viewData?.vendor_name || '-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={`view_detail_${viewData?.charge_id}`}>
                                        <div className="view_data_wrap d-flex flex-wrap">
                                            <div className="details">
                                                <span className="title">Valid From:</span>
                                                <span className="data">{viewData?.valid_from || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Valid To:</span>
                                                <span className="data">{viewData?.valid_till || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Created By:</span>
                                                <span className="data">{viewData?.created_by || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Created On:</span>
                                                <span className="data">{viewData?.created_on || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Rate Type:</span>
                                                <span className="data">{viewData?.rate_type || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Rate Source:</span>
                                                <span className="data">{viewData?.rate_source || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Updated By:</span>
                                                <span className="data">{viewData?.last_update_by || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Detention Free Org:</span>
                                                <span className="data">{viewData?.org_detention_free || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Detention Free Dest:</span>
                                                <span className="data">{viewData?.dest_detention_free || '-'}</span>
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem className='freigth_details_wrap'>
                                    <AccordionHeader targetId={`freight_detail_${viewData?.charge_id}`}>
                                        <h3 className="sub_modal_title">Freight Details</h3>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={`freight_detail_${viewData?.charge_id}`}>
                                        <div className="table_view_popup_table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Origin</th>
                                                        <th>Destination</th>
                                                        <th>Charge Basis</th>
                                                        <th>Currency</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem className='charge_details'>
                                    <AccordionHeader targetId={`charge_detail_${viewData?.charge_id}`}>
                                        <h3 className="sub_modal_title">SurCharge Details</h3>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={`charge_detail_${viewData?.charge_id}`}>
                                        {viewData?.surcharges !== undefined && viewData?.surcharges?.map((item) => (
                                            <div className="view_data_wrap" key={item?.id}>
                                                <div className="details">
                                                    <span className="title">Surcharge Name:</span>
                                                    <span className="data">{item?.name || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Charge Basis:</span>
                                                    <span className="data">{item?.charge_basis || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Calculation Type:</span>
                                                    <span className="data">{item?.calculation_type || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Rate:</span>
                                                    <span className="data">{item?.rate || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Tax:</span>
                                                    <span className="data">{item?.tax || '-'}</span>
                                                </div>
                                                <div className="details">
                                                    <span className="title">Currency:</span>
                                                    <span className="data">{item?.currency || '-'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    </SimpleBar>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalFclInlandCharge;
