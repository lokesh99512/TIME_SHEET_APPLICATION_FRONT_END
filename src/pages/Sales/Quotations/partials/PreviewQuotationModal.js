import React from 'react'
import { Modal } from 'reactstrap'
import { edit_icon, sitelogo } from '../../../../assets/images';
import { useSelector } from 'react-redux';
import PreviewCommonTable from './PreviewCommonTable';
import { useDispatch } from 'react-redux';
import { CONFIRM_PREVIEW_DATA, QUOTATION_RESULT_SELECTED_BLANK } from '../../../../store/Sales/actiontype';
import { BLANK_MODAL_CHARGE } from '../../../../store/Sales/Quotation/actiontype';

export default function PreviewQuotationModal({ previewModal, previewModalHand,setPreviewModal,QuoteModalHandler }) {
    const quoteData = useSelector((state) => state.sales.quote_selected_data);
    const mainChargeObj = useSelector((state) => state?.quotation?.mainChargeObj);
    const preferData = quoteData?.find(obj => obj.quote_type === 'preffered');
    const cheaperData = quoteData?.find(obj => obj.quote_type === 'cheaper');
    const fasterData = quoteData?.find(obj => obj.quote_type === 'faster');
    const preferDataNew = mainChargeObj?.find(obj => obj.id === preferData?.id)
    const cheaperDataNew = mainChargeObj?.find(obj => obj.id === cheaperData?.id)
    const fasterDataNew = mainChargeObj?.find(obj => obj.id === fasterData?.id);
    const dispatch = useDispatch();

    const confirmHandler = () => {
        const mergedArray = [...quoteData];
        let newArry = [...mainChargeObj];
        newArry.forEach(newItem => {
            const existingIndex = mergedArray.findIndex(oldItem => oldItem.id === newItem.id);
            if (existingIndex !== -1) {

                let updateCharge1 = [...mergedArray[existingIndex].pickup_quote_charge,...newItem?.pickup_quote_charge || '']
                let updateCharge2 = [...mergedArray[existingIndex].originport_quote_charge,...newItem?.originport_quote_charge || '']
                let updateCharge3 = [...mergedArray[existingIndex].ocean_quote_charge,...newItem?.ocean_quote_charge || '']

                mergedArray[existingIndex] = {
                  ...mergedArray[existingIndex],
                  pickup_quote_charge: updateCharge1,
                  originport_quote_charge: updateCharge2,
                  ocean_quote_charge: updateCharge3,
                };
            } 
        });

        dispatch({type: CONFIRM_PREVIEW_DATA, payload: mergedArray});
        dispatch({type: BLANK_MODAL_CHARGE, payload: {}});
        dispatch({type: QUOTATION_RESULT_SELECTED_BLANK, payload: {}});
        setPreviewModal(false);
        console.log(mergedArray,"mergedArray");
    }

    console.log(quoteData,"quoteData");
    return (
        <>
            <Modal size="md" isOpen={previewModal} toggle={() => { previewModalHand(); }} className='preview_modal_wrap'>
                <div className="modal-header">
                    <button type="button" onClick={() => {setPreviewModal(false);}}><i className='bx bx-plus me-2'></i> Close</button>
                    <button type="button"><img src={edit_icon} alt="Edit" className='me-2' onClick={() => {setPreviewModal(false);QuoteModalHandler();}} /> Edit</button>
                    <button type="button" onClick={() => {confirmHandler()}}><i className='bx bx-check-circle me-2'></i> Confirm</button>
                </div>
                <div className="modal-body">
                    <div className="common_bg_wrap preview_top_details ">
                        <div className="preview_top_details d-flex justify-content-between align-items-center mb-3 mt-4">
                            <div className="left_details">
                                <p className='mb-2'><b className='me-1'>Issue Date:</b> 15 August 2023</p>
                                <p><b className='me-1'>Quotation:</b> #Q12345678</p>
                            </div>
                            <div className="right_logo">
                                <img src={sitelogo} alt="logo" />
                            </div>
                        </div>
                        <div className="preview_creation_details">
                            <div className="full_wrap white_box">
                                <div className="top_creation_details">
                                    <p className="title">Basic Info:</p>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Name/Company</span>
                                                <p>Customer xyz</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Primary Contact</span>
                                                <p>Samara Mcknight</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Email Address</span>
                                                <p>samara.mcknight@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="top_creation_details">
                                    <p className="title">Quotation Details:</p>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Name/Company</span>
                                                <p>Customer xyz</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Primary Contact</span>
                                                <p>Samara Mcknight</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Email Address</span>
                                                <p>samara.mcknight@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="half_wrap mt-1">
                                <div className="half_box white_box">
                                    <p className="title">Origin:</p>
                                    <div className="details">
                                        <span>Pickup</span>
                                        <p>Chennai, Tamil nadu, India</p>
                                    </div>
                                    <div className="details">
                                        <span>Port</span>
                                        <p>Inmaa - Chennai(Ex Madras) - India</p>
                                    </div>
                                </div>
                                <div className="half_box white_box">
                                    <p className="title">Destination:</p>
                                    <div className="details">
                                        <span>Port</span>
                                        <p>USNYC - New york - US</p>
                                    </div>
                                    <div className="details">
                                        <span>Drop</span>
                                        <p>Charleston, SC, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <span className="tag preffered">Preffered</span> */}
                        <div className="preview_table_wrap">
                            <table>
                                <caption><p className='d-flex justify-content-between align-items-center'>Commodities</p></caption>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Package Type</th>
                                        <th>Gross Weight</th>
                                        <th>Volume(CBM)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Commodities</td>
                                        <td>100xBox(s)(40x40x40 CM)</td>
                                        <td>12,000 KG</td>
                                        <td>6.4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <PreviewCommonTable data={preferData} newData={preferDataNew} />
                        <PreviewCommonTable data={cheaperData} newData={cheaperDataNew} />
                        <PreviewCommonTable data={fasterData} newData={fasterDataNew} />
                        
                    </div>
                </div>
            </Modal>
        </>
    )
}
