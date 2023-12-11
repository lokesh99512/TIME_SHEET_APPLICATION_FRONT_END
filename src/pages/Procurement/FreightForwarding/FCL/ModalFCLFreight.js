import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import SimpleBar from "simplebar-react";
import { formatDate } from '../../../../components/Common/CommonLogic';

const ModalFCLFreight = ({ viewData, modal, onCloseClick, modalType }) => {
    const fcl_freight_view = useSelector((state) => state.procurement.fcl_freight_view);
    const freight_loader = useSelector((state) => state.procurement.fcl_get_freight_view_loader);
    const [open, setOpen] = useState('');
    const ref = useRef();
    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

    return (
        <>
            <Modal isOpen={modal} toggle={onCloseClick} className='table_view_modal'>
                <ModalHeader tag="h4">
                    View Details
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <div className="table_view_data_wrap">
                        <Accordion flush open={open} toggle={toggle} className='main_accordion'>
                            <AccordionItem className='view_details_wrap'>
                                <AccordionHeader targetId={`view_detail_${viewData?.id}`}>
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
                                                    <span className="data">{viewData?.tenantCarrierVendor?.name || '-'}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="details">
                                                    <span className="title">Vendor Name:</span>
                                                    <span className="data">{viewData?.tenantVendor?.name || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionHeader>
                                <AccordionBody accordionId={`view_detail_${viewData?.id}`}>
                                    <div className="view_data_wrap d-flex flex-wrap">
                                        <div className="details">
                                            <span className="title">Valid From:</span>
                                            <span className="data">{viewData?.validFrom || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Valid To:</span>
                                            <span className="data">{viewData?.validTo || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Created By:</span>
                                            <span className="data">{viewData?.createdBy || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Created On:</span>
                                            <span className="data">{formatDate(viewData?.createdDate) || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Rate Type:</span>
                                            <span className="data">{viewData?.rateType || '-'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="title">Rate Source:</span>
                                            <span className="data">{viewData?.rateSource || '-'}</span>
                                        </div>
                                        {/* <div className="details">
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
                                        </div> */}
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='freigth_details_wrap'>
                                <AccordionHeader targetId={`freight_detail_${viewData?.id}`}>
                                    <h3 className="sub_modal_title">Freight Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`freight_detail_${viewData?.id}`}>
                                    <div className="table_view_popup_table">
                                        <SimpleBar style={{ maxHeight: "400px", maxWidth: '100%' }} ref={ref}>
                                            {fcl_freight_view?.content !== undefined &&
                                                <table style={{ minWidth: '800px' }}>
                                                    <thead>
                                                        <tr>
                                                            {/* <th>Container Type</th> */}
                                                            <th>Cargo Type</th>
                                                            <th>Commodity</th>
                                                            <th>Org Port</th>
                                                            <th>Dest Port</th>
                                                            <th>Via Port</th>
                                                            <th>Transit Time</th>
                                                            <th>Currency</th>
                                                            <th>20 GP</th>
                                                            <th>40 GP</th>
                                                            <th>20 RF</th>
                                                            <th>40 RF</th>
                                                            <th>40 HQ</th>
                                                            <th>45 HQ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fcl_freight_view?.content?.map((item, index) => (
                                                            <tr key={index}>
                                                                {/* <td>{item?.oceanContainer?.name || '-'}</td> */}
                                                                <td>{item?.cargoType?.type?.toLowerCase() === 'haz' ? `${item?.cargoType?.type}(${item?.cargoClass || '-'})` : item?.cargoType?.type || '-'}</td>
                                                                <td>{item?.commodity?.name || '-'}</td>
                                                                <td>{item?.originPort?.code || '-'}</td>
                                                                <td>{item?.destinationPort?.code || '-'}</td>
                                                                <td>{item?.viaPort?.code || '-'}</td>
                                                                <td>{item?.transitTime || '-'}</td>
                                                                <td>{item?.currency?.currencyName || '-'}</td>
                                                                <td>{item?.oceanContainer?.name === '20GP' ? item?.freightAmount || '-' : '-'}</td>
                                                                <td>{item?.oceanContainer?.name === '40GP' ? item?.freightAmount || '-' : '-'}</td>
                                                                <td>{item?.oceanContainer?.name === '20RF' ? item?.freightAmount || '-' : '-'}</td>
                                                                <td>{item?.oceanContainer?.name === '40RF' ? item?.freightAmount || '-' : '-'}</td>
                                                                <td>{item?.oceanContainer?.name === '40HQ' ? item?.freightAmount || '-' : '-'}</td>
                                                                <td>{item?.oceanContainer?.name === '45HQ' ? item?.freightAmount || '-' : '-'}</td>
                                                            </tr>
                                                        ))}
                                                        {fcl_freight_view?.content?.length === 0 && (
                                                            <tr>
                                                                {freight_loader ? (
                                                                    <td colSpan={8} className="text-center">
                                                                        <div className='py-5'>
                                                                            <div className="spinner-border text-primary" role="status">
                                                                                <span className="visually-hidden">Loading...</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                ) : (
                                                                    <td colSpan={8} className="text-center">No Record Found</td>
                                                                )}
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            }
                                        </SimpleBar>
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem className='charge_details'>
                                <AccordionHeader targetId={`charge_detail_${viewData?.charge_id}`}>
                                    <h3 className="sub_modal_title">{modalType === 'inland' ? 'SurCharge' : 'Charge'} Details</h3>
                                </AccordionHeader>
                                <AccordionBody accordionId={`charge_detail_${viewData?.charge_id}`}>
                                    {modalType === 'inland' ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <div className="view_data_wrap">
                                            <div className="details">
                                                <span className="title">Charge Name:</span>
                                                <span className="data">{viewData?.charge_name || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Payment Term:</span>
                                                <span className="data">{viewData?.payment_term || '-'}</span>
                                            </div>
                                            <div className="details">
                                                <span className="title">Currency:</span>
                                                <span className="data">{viewData?.charge_currency || '-'}</span>
                                            </div>
                                            {modalType === 'lcl' ? (
                                                <>
                                                    {/* <div className="details">
                                                    <span className="title">Currency</span>
                                                    <span className="data">{viewData?.charge_currency || '-'}</span>
                                                </div> */}
                                                    <div className="details">
                                                        <span className="title">Charge Basis</span>
                                                        <span className="data">{viewData?.charge_basis || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">Min Charge</span>
                                                        <span className="data">{viewData?.charge_mincharge || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">Rate</span>
                                                        <span className="data">{viewData?.charge_rate || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">Ratio</span>
                                                        <span className="data">{viewData?.charge_ratio || '-'}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="details">
                                                        <span className="title">20 GP:</span>
                                                        <span className="data">{viewData?.charge_gp || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">40 GP:</span>
                                                        <span className="data">{viewData?.charge_gp2 || '-'}</span>
                                                    </div>
                                                    <div className="details">
                                                        <span className="title">40 HC:</span>
                                                        <span className="data">{viewData?.charge_hc || '-'}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalFCLFreight
