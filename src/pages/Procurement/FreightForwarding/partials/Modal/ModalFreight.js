import React from 'react'
import { Col, Modal, ModalBody, ModalHeader } from 'reactstrap'

const ModalFreight = ({viewData,modal,onCloseClick}) => {
    console.log(viewData,"viewData==")
    return (
        <>
            <Modal isOpen={modal} toggle={onCloseClick} className='table_view_modal'>
                <ModalHeader tag="h4">
                    View Details
                    <span className="close" onClick={onCloseClick}></span>
                </ModalHeader>
                <ModalBody>
                    <div className="table_view_data_wrap">
                        <div className="view_details_wrap">
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
                                    <span className="title">Updated On:</span>
                                    <span className="data">{viewData?.last_update || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Detention Free Org:</span>
                                    <span className="data">{viewData?.detention_free || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Detention Free Dest:</span>
                                    <span className="data">{viewData?.detention_free || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="freigth_details_wrap">
                            <h3 className="sub_modal_title">Freight Details</h3>
                            <div className="view_data_wrap d-flex flex-wrap">
                                <div className="details">
                                    <span className="title">Origin Port:</span>
                                    <span className="data">{viewData?.org_port || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Cargo type:</span>
                                    <span className="data">{viewData?.cargo_type || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Dest Port:</span>
                                    <span className="data">{viewData?.dest_port || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Cargo Class:</span>
                                    <span className="data">{viewData?.cargo_class || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Via Port:</span>
                                    <span className="data">{viewData?.via_port || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Commodity:</span>
                                    <span className="data">{viewData?.commodity || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">20 GP:</span>
                                    <span className="data">{viewData?.fre_gp || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">45 HQ:</span>
                                    <span className="data">{viewData?.fre_hq2 || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 GP:</span>
                                    <span className="data">{viewData?.fre_gp2 || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">20 RF:</span>
                                    <span className="data">{viewData?.fre_rf || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 HQ:</span>
                                    <span className="data">{viewData?.fre_hq || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 RF:</span>
                                    <span className="data">{viewData?.fre_rf2 || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="charge_details">
                            <h3 className="sub_modal_title">Charge Details</h3>
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
                                    <span className="title">20 GP:</span>
                                    <span className="data">{viewData?.fre_gp || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 GP:</span>
                                    <span className="data">{viewData?.fre_gp2 || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 HQ:</span>
                                    <span className="data">{viewData?.fre_hq || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">45 HQ:</span>
                                    <span className="data">{viewData?.fre_hq2 || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">20 RF:</span>
                                    <span className="data">{viewData?.fre_rf || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 RF:</span>
                                    <span className="data">{viewData?.fre_rf2 || '-'}</span>
                                </div>
                            </div>
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
                                    <span className="title">20 GP:</span>
                                    <span className="data">{viewData?.fre_gp || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 GP:</span>
                                    <span className="data">{viewData?.fre_gp2 || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 HQ:</span>
                                    <span className="data">{viewData?.fre_hq || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">45 HQ:</span>
                                    <span className="data">{viewData?.fre_hq2 || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">20 RF:</span>
                                    <span className="data">{viewData?.fre_rf || '-'}</span>
                                </div>
                                <div className="details">
                                    <span className="title">40 RF:</span>
                                    <span className="data">{viewData?.fre_rf2 || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalFreight
