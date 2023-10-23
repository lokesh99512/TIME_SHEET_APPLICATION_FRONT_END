import React from 'react'
import { Modal } from 'reactstrap'
import { edit_icon, sitelogo } from '../../../../assets/images';
import { useSelector } from 'react-redux';

export default function PreviewQuotationModal({ previewModal, previewModalHand,setPreviewModal,QuoteModalHandler }) {
    const quoteData = useSelector((state) => state.sales.quote_selected_data);
    const mainChargeObj = useSelector((state) => state?.quotation?.mainChargeObj);
    const preferData = quoteData?.find(obj => obj.quote_type === 'preffered');
    const cheaperData = quoteData?.find(obj => obj.quote_type === 'cheaper');
    const fasterData = quoteData?.find(obj => obj.quote_type === 'faster');
    // console.log(quoteData,"quoteData------");
    
    return (
        <>
            <Modal size="md" isOpen={previewModal} toggle={() => { previewModalHand(); }} className='preview_modal_wrap'>
                <div className="modal-header">
                    <button type="button" onClick={() => {setPreviewModal(false);}}><i className='bx bx-plus me-2'></i> Close</button>
                    <button type="button"><img src={edit_icon} alt="Edit" className='me-2' onClick={() => {setPreviewModal(false);QuoteModalHandler();}} /> Edit</button>
                    <button type="button"><i className='bx bx-check-circle me-2'></i> Confirm</button>
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
                        {preferData !== undefined &&
                            <div className="preview_table_wrap">
                                <table>
                                    <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges <span className="tag preffered">{preferData.quote_type}</span></p></caption>
                                    <thead>
                                        <tr>
                                            <th>Charge Name</th>
                                            <th>UoM</th>
                                            <th>Quantity</th>
                                            <th>Tax</th>
                                            <th>Total Sale Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* pickup */}
                                        {preferData?.pickup_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Pickup</td>
                                        </tr>}
                                        {preferData?.pickup_quote_charge?.map((data,index) => (
                                            <tr key={`pickup_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}   
                                        {mainChargeObj?.find(obj => obj.id === preferData.id)?.pickup_quote_charge?.map((data,index) => (
                                            <tr key={`pickupnew_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}   

                                        {/* Port of Origin(shekou)  */}
                                        {preferData?.originport_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Port of Origin(shekou)</td>
                                        </tr>}
                                        {preferData?.originport_quote_charge?.map((data,index) => (
                                            <tr key={`origin_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}     
                                        {/* Ocean Freight(FIFO)  */}
                                        {preferData?.ocean_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Ocean Freight(FIFO)</td>
                                        </tr>}
                                        {preferData?.ocean_quote_charge?.map((data,index) => (
                                            <tr key={`ocean_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}     

                                        {/* Port of Discharge(Winningpeg)  */}
                                        <tr>
                                            <td colSpan={5} className='title_row'>Port of Discharge(Winningpeg)</td>
                                        </tr>
                                        <tr>
                                            <td>Port of discharge</td>
                                            <td>20GP</td>
                                            <td>2</td>
                                            <td>18</td>
                                            <td>2200</td>
                                        </tr>
                                        
                                        {/* Delivery  */}
                                        <tr>
                                            <td colSpan={5} className='title_row'>Delivery</td>
                                        </tr>
                                        <tr>
                                            <td>Delivery</td>
                                            <td>20GP</td>
                                            <td>2</td>
                                            <td>18</td>
                                            <td>2200</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}><p>Sub Total: <span>₹12,333.00</span></p></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}><p>Total: <span className='text-primary'><b>₹12,333.00</b></span></p></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        }
                        {cheaperData !== undefined &&
                            <div className="preview_table_wrap" key={cheaperData.id}>
                                <table>
                                    <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges <span className="tag cheaper">{cheaperData.quote_type}</span></p></caption>
                                    <thead>
                                        <tr>
                                            <th>Charge Name</th>
                                            <th>UoM</th>
                                            <th>Quantity</th>
                                            <th>Tax</th>
                                            <th>Total Sale Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* pickup */}
                                        {cheaperData?.pickup_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Pickup</td>
                                        </tr>}
                                        {cheaperData?.pickup_quote_charge?.map((data,index) => (
                                            <tr key={`pickup_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}   

                                        {/* Port of Origin(shekou)  */}
                                        {cheaperData?.originport_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Port of Origin(shekou)</td>
                                        </tr>}
                                        {cheaperData?.originport_quote_charge?.map((data,index) => (
                                            <tr key={`origin_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}     
                                        {/* Ocean Freight(FIFO)  */}
                                        {cheaperData?.ocean_quote_charge?.length !== 0 &&  <tr>
                                            <td colSpan={5} className='title_row'>Ocean Freight(FIFO)</td>
                                        </tr>}
                                        {cheaperData?.ocean_quote_charge?.map((data,index) => (
                                            <tr key={`ocean_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}     

                                        {/* Port of Discharge(Winningpeg)  */}
                                        <tr>
                                            <td colSpan={5} className='title_row'>Port of Discharge(Winningpeg)</td>
                                        </tr>
                                        <tr>
                                            <td>Port of discharge</td>
                                            <td>20GP</td>
                                            <td>2</td>
                                            <td>18</td>
                                            <td>2200</td>
                                        </tr>

                                        {/* Delivery  */}
                                        <tr>
                                            <td colSpan={5} className='title_row'>Delivery</td>
                                        </tr>
                                        <tr>
                                            <td>Delivery</td>
                                            <td>20GP</td>
                                            <td>2</td>
                                            <td>18</td>
                                            <td>2200</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}><p>Sub Total: <span>₹12,333.00</span></p></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}><p>Total: <span className='text-primary'><b>₹12,333.00</b></span></p></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        }

                        {/* faster  */}
                        {fasterData !== undefined &&
                            <div className="preview_table_wrap" key={fasterData.id}>
                                <table>
                                    <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges <span className="tag faster">{fasterData.quote_type}</span></p></caption>
                                    <thead>
                                        <tr>
                                            <th>Charge Name</th>
                                            <th>UoM</th>
                                            <th>Quantity</th>
                                            <th>Tax</th>
                                            <th>Total Sale Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* pickup */}
                                        {fasterData?.pickup_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Pickup</td>
                                        </tr>}
                                        {fasterData?.pickup_quote_charge?.map((data,index) => (
                                            <tr key={`pickup_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}   

                                        {/* Port of Origin(shekou)  */}
                                        {fasterData?.originport_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Port of Origin(shekou)</td>
                                        </tr>}
                                        {fasterData?.originport_quote_charge?.map((data,index) => (
                                            <tr key={`origin_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}     
                                        {/* Ocean Freight(FIFO)  */}
                                        {fasterData?.ocean_quote_charge?.length !== 0 && <tr>
                                            <td colSpan={5} className='title_row'>Ocean Freight(FIFO)</td>
                                        </tr>}
                                        {fasterData?.ocean_quote_charge?.map((data,index) => (
                                            <tr key={`ocean_${index}`}>
                                                <td>{data?.charges_name}</td>
                                                <td>{data?.uom}</td>
                                                <td>{data?.quantity}</td>
                                                <td>{data?.tax}</td>
                                                <td>{data?.total_sale_cost}</td>
                                            </tr>
                                        ))}     

                                        {/* Port of Discharge(Winningpeg)  */}
                                        <tr>
                                            <td colSpan={5} className='title_row'>Port of Discharge(Winningpeg)</td>
                                        </tr>
                                        <tr>
                                            <td>Port of discharge</td>
                                            <td>20GP</td>
                                            <td>2</td>
                                            <td>18</td>
                                            <td>2200</td>
                                        </tr>

                                        {/* Delivery  */}
                                        <tr>
                                            <td colSpan={5} className='title_row'>Delivery</td>
                                        </tr>
                                        <tr>
                                            <td>Delivery</td>
                                            <td>20GP</td>
                                            <td>2</td>
                                            <td>18</td>
                                            <td>2200</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}><p>Sub Total: <span>₹12,333.00</span></p></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}><p>Total: <span className='text-primary'><b>₹12,333.00</b></span></p></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}
