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

const ModalSurchargeValue = ({ viewData, modal, onCloseClick, modalType }) => {
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
                    Surcharge value
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <SimpleBar>
                        <div
                            className="table_view_data_wrap port_local_view_wrap"
                            style={{ minWidth: "1000px", overflow: "auto" }}
                        >
                            <div className="view_details_wrap">
                                <div className="top_details">
                                    <div className="row mx-4">
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Charge Code</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Charge Basis</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Calculation Type</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Slab Basis</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Currency</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Min Value</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Tax</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="details">
                                                <span className="title">Is Standard</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -------------- */}
                                <div className="row view_data_wrap">
                                    {viewData?.surchargeValue?.length !== 0 ? viewData?.surchargeValue?.map((item, index) => (
                                        <Accordion
                                            flush
                                            open={open}
                                            toggle={toggle}
                                            className="main_accordion common_accordion_wrap"
                                            key={index}
                                        >
                                            <AccordionItem key={item.id}>
                                                <AccordionHeader targetId={`main_${index}`}>
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.chargeCode || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.chargeBasis || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.calculationType || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.slabBasis || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.currency || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.minValue || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.tax ? `${item?.tax}%` : "-"}
                                                            </span>
                                                        </div>
                                                    </div>                                                    
                                                    <div className="col">
                                                        <div className="">
                                                            <span className="">
                                                                {item?.addTerms.isStandard || "-"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </AccordionHeader>
                                                <AccordionBody
                                                    style={{ fontSize: "13px" }}
                                                    accordionId={`main_${index}`}
                                                >
                                                    <Card style={{ borderRadius: "12px" }}>
                                                        <CardHeader>
                                                            <div style={{ fontWeight: "500" }} className="row text-center" >
                                                                <div className="col-3">
                                                                    <span className="">Cargo Type</span>
                                                                </div>
                                                                <div className="col-3">
                                                                    <span className="">Container Type</span>
                                                                </div>
                                                                <div className="col-2">
                                                                    <span className="">From Slab</span>
                                                                </div>
                                                                <div className="col-2">
                                                                    <span className="">To Slab</span>
                                                                </div>
                                                                <div className="col-2">
                                                                    <span className="">Rate</span>
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                        <CardBody>
                                                            {item.subBox.map((sub, index) => (
                                                                <div className="row text-center" key={`sub_${index}`}>
                                                                    <div className="col-3 mb-2">
                                                                        <div className="p-2">
                                                                            <span className="">
                                                                                {sub?.cargoType || "-"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-3 mb-2">
                                                                        <div className="p-2">
                                                                            <span className="">
                                                                                {sub?.containerType || "-"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2 mb-2">
                                                                        <div className="p-2">
                                                                            <span className="">
                                                                                {sub?.fromSlab || "-"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2 mb-2">
                                                                        <div className="p-2">
                                                                            <span className="">
                                                                                {sub?.toSlab || "-"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-2 mb-2">
                                                                        <div className="p-2">
                                                                            <span className="">
                                                                                {sub?.rate || "-"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </CardBody>
                                                    </Card>
                                                    <Card style={{ borderRadius: "12px" }}>
                                                        <CardHeader>
                                                            <div style={{ fontWeight: "500" }} className="row text-center" >
                                                                <div className="col-3">
                                                                    <span className="">Payment Term</span>
                                                                </div>
                                                                <div className="col-3">
                                                                    <span className="">Incoterms</span>
                                                                </div>
                                                                <div className="col-3">
                                                                    <span className=""> Applicable Commodity </span>
                                                                </div>
                                                                <div className="col-3">
                                                                    <span className=""> Applicable Service Type </span>
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <div className="row text-center">
                                                                <div className="col-3 py-2">
                                                                    <div className="p-2">
                                                                        <span className="">
                                                                            {item.addTerms.paymentTerm || "-"}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3 border-end border-start py-2">
                                                                    {item.addTerms.incoTerm.map(
                                                                        (val, key) => (
                                                                            <div key={key} className="p-2">
                                                                                <span key={key} className="">
                                                                                    {val || "-"}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <div className="col-3 border-end py-2">
                                                                    {item.addTerms.commodity.map(
                                                                        (val, key) => (
                                                                            <div key={key} className="p-2">
                                                                                <span key={key} className="data">
                                                                                    {val || "-"}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <div className="col-3 py-2">
                                                                    {item.addTerms.serviceType.map(
                                                                        (val, key) => (
                                                                            <div key={key} className="p-2 mb-2">
                                                                                <span key={key} className="data">
                                                                                    {val || "-"}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    </Card> 
                                                </AccordionBody>
                                            </AccordionItem>
                                        </Accordion>
                                    )) : (
                                        <div className="modal_no_data_wrap">
                                            <p>There is no charges added!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModalSurchargeValue;
