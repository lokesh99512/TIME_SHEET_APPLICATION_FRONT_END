import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'reactstrap'
import { edit_icon, sitelogo } from '../../../assets/images';
import { useSelector } from 'react-redux';
import PreviewCommonTable from './PreviewCommonTable';
import { useDispatch } from 'react-redux';
import { BLANK_MODAL_CHARGE } from '../../../store/Sales/Quotation/actiontype';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CONFIRM_PREVIEW_DATA, QUOTATION_RESULT_SELECTED_BLANK } from '../../../store/InstantRate/actionType';
import { formatDate } from '../../../components/Common/CommonLogic';

export default function PreviewQuotationModal({ previewModal, previewModalHand, setPreviewModal, QuoteModalHandler }) {
    const ref = useRef();
    const quoteData = useSelector((state) => state.instantRate.quote_selected_data);
    const mainChargeObj = useSelector((state) => state?.quotation?.mainChargeObj);
    const preferData = quoteData?.filter(obj => obj.quote_type === 'preffered');
    const cheaperData = quoteData?.filter(obj => obj.quote_type === 'cheaper');
    const fasterData = quoteData?.filter(obj => obj.quote_type === 'faster');
    const {searchForm, $instantActiveTab} = useSelector((state) => state?.instantRate);
    const {tenant_info} = useSelector((state) => state?.settings);
    const dispatch = useDispatch();
    const confirmHandler = () => {
        // const mergedArray = [...quoteData];
        // let newArry = [...mainChargeObj];
        // newArry.forEach(newItem => {
        //     const existingIndex = mergedArray.findIndex(oldItem => oldItem.id === newItem.id);
        //     if (existingIndex !== -1) {

        //         let updateCharge1 = [...mergedArray[existingIndex].pickup_quote_charge, ...newItem?.pickup_quote_charge || '']
        //         let updateCharge2 = [...mergedArray[existingIndex].originport_quote_charge, ...newItem?.originport_quote_charge || '']
        //         let updateCharge3 = [...mergedArray[existingIndex].ocean_quote_charge, ...newItem?.ocean_quote_charge || '']

        //         mergedArray[existingIndex] = {
        //             ...mergedArray[existingIndex],
        //             pickup_quote_charge: updateCharge1,
        //             originport_quote_charge: updateCharge2,
        //             ocean_quote_charge: updateCharge3,
        //         };
        //     }
        // });

        // dispatch({ type: CONFIRM_PREVIEW_DATA, payload: mergedArray });
        // dispatch({ type: BLANK_MODAL_CHARGE, payload: {} });
        // dispatch({ type: QUOTATION_RESULT_SELECTED_BLANK, payload: {} });

        setPreviewModal(false);
        // console.log(mergedArray, "mergedArray");
    }

    const handleDownloadPDF = () => {        
        const componentToCapture = document.getElementById('component-to-capture');
    
        // Use html2canvas to capture the element as an image
        html2canvas(componentToCapture).then((canvas) => {
          // Create a new jsPDF instance
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Add the captured image as a page in the PDF
            // pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 25, 0, 160, 297);
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

            // Save or open the PDF
            pdf.save('component.pdf');
        });
        confirmHandler();
      };
    return (
        <>
            <Modal size="md" isOpen={previewModal} toggle={() => { previewModalHand(); }} className='preview_modal_wrap'>
                <div className="modal-header">
                    <button type="button" onClick={() => { setPreviewModal(false); }}><i className='bx bx-plus me-2'></i> Close</button>
                    <button type="button" onClick={() => { setPreviewModal(false); QuoteModalHandler(); }}><img src={edit_icon} alt="Edit" className='me-2' /> Edit</button>
                    <button type="button" onClick={() => { handleDownloadPDF();}}><i className='bx bx-check-circle me-2'></i> Confirm</button>
                </div>
                <div id="component-to-capture" className="modal-body">
                    <div className="common_bg_wrap preview_top_details ">
                        <div className="preview_top_details d-flex justify-content-between align-items-center mb-3 mt-4">
                            <div className="left_details">
                                <p className='mb-2'><b className='me-1'>Issue Date:</b> {formatDate(new Date())}</p>
                                <p><b className='me-1'>Quotation:</b> #Q12345678</p>
                            </div>
                            <div className="right_logo">
                                <img src={tenant_info?.logo || sitelogo} alt="logo" onError={e => {e.target.src = sitelogo}} />
                            </div>
                        </div>
                        <div className="preview_creation_details">
                            <div className="full_wrap white_box">
                                <div className="top_creation_details">
                                    <p className="title">Customer Details:</p>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Company Name</span>
                                                <p>{tenant_info?.name || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Primary Contact</span>
                                                <p>{tenant_info?.contactName || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Email Address</span>
                                                <p>{tenant_info?.email || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="details mt-3">
                                                <span>Address</span>
                                                <p>{tenant_info?.address || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="top_creation_details">
                                    <p className="title">Quotation Details:</p>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Name/Company</span>
                                                <p>{tenant_info?.name || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Primary Contact</span>
                                                <p>{tenant_info?.contactName || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="details">
                                                <span>Email Address</span>
                                                <p>{tenant_info?.contactEmail || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="half_wrap mt-1">
                                <div className="half_box white_box">
                                    <p className="title">Origin:</p>
                                    {/* <div className="details">
                                        <span>Pickup</span>
                                        <p>-</p>
                                    </div> */}
                                    <div className="details">
                                        <span>Port</span>
                                        <p>{searchForm?.location_from?.label || '-'}</p>
                                    </div>
                                </div>
                                <div className="half_box white_box">
                                    <p className="title">Destination:</p>
                                    <div className="details">
                                        <span>Port</span>
                                        <p>{searchForm?.location_to?.label || '-'}</p>
                                    </div>
                                    {/* <div className="details">
                                        <span>Drop</span>
                                        <p>-</p>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
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
                                        <td>-</td>
                                        <td>{$instantActiveTab?.sub === "dom_air" ? searchForm?.shipment_details?.weight || 0 : searchForm?.container_type?.cargo_weight?.value || 0} {$instantActiveTab?.sub === "dom_air" ? searchForm?.shipment_details?.weight_unit : searchForm?.container_type?.cargo_weight?.weight?.value || ''}</td>
                                        <td>{$instantActiveTab?.sub === "dom_air" ? searchForm?.shipment_details?.v_weight || 0 : 0}</td>
                                        {/* <td>100xBox(s)(40x40x40 CM)</td>
                                        <td>12,000 KG</td>
                                        <td>6.4</td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <PreviewCommonTable  />
                        {quoteData?.length !== 0 ? quoteData?.map((data) => (<PreviewCommonTable data={data} key={data.quote_id} newData={mainChargeObj.find(obj => obj.id === data.quote_id) || []} />)) : null}
                        {/* {preferData?.length !== 0 ? preferData?.map((data) => (<PreviewCommonTable data={data} key={data.id} newData={mainChargeObj.find(obj => obj.id === data.id)} />)) : null}
                        <span style={{pageBreakAfter: 'always'}}></span>
                        {cheaperData?.length !== 0 ? cheaperData?.map((data) => (<PreviewCommonTable data={data} key={data.id} newData={mainChargeObj.find(obj => obj.id === data.id)} />)) : null}
                        <span style={{pageBreakAfter: 'always'}}></span>
                        {fasterData?.length !== 0 ? fasterData?.map((data) => (<PreviewCommonTable data={data} key={data.id} newData={mainChargeObj.find(obj => obj.id === data.id)} />)) : null} */}

                    </div>
                </div>
            </Modal>
        </>
    )
}
