import React, { useRef, useState } from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";
import SimpleBar from "simplebar-react";

const ModalFclInlandCharge = ({ viewData, modal, onCloseClick }) => {
    const ref = useRef();
    const ref2 = useRef();
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
                    <div className="table_view_data_wrap">
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
                                        <SimpleBar style={{ maxWidth: '100%' }} ref={ref2}>
                                        <table style={{ minWidth: '800px' }}>
                                            <thead>
                                                <tr>
                                                    <th>Origin</th>
                                                    <th>Destination</th>
                                                    <th>Charge Basis</th>
                                                    <th>Currency</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{viewData?.origin || ''}</td>
                                                    <td>{viewData?.destination || ''}</td>
                                                    <td>{viewData?.charge_basis || ''}</td>
                                                    <td>{viewData?.currency || ''}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </SimpleBar>
                                        <span className="mt-3 d-block"></span>
                                        <SimpleBar style={{ maxHeight: "400px", maxWidth: '100%' }} ref={ref}>
                                        {viewData?.freight_charge !== undefined && 
                                            <table style={{ minWidth: '800px' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Container Type</th>
                                                        <th>Cargo Type</th>
                                                        <th>Cargo Wt Min (MT)</th>
                                                        <th>Cargo Wt Max (MT)</th>
                                                        <th>Rate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {viewData?.freight_charge?.map((item,index) => (
                                                        <tr key={index}>
                                                            <td>{item?.container_type || ''}</td>
                                                            <td>{item?.cargo_type || ''}</td>
                                                            <td>{item?.cargo_wt_min || ''}</td>
                                                            <td>{item?.cargo_wt_max || ''}</td>
                                                            <td>{item?.rate || ''}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        }
                                        </SimpleBar>
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='charge_details'>
                                <AccordionHeader targetId={`charge_detail_${viewData?.charge_id}`}>
                                    <h3 className="sub_modal_title">SurCharge Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`charge_detail_${viewData?.charge_id}`}>
                                    {viewData?.surcharges !== undefined && viewData?.surcharges?.map((item,index) => (
                                        <div className="view_data_wrap" key={index}>
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
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalFclInlandCharge;
