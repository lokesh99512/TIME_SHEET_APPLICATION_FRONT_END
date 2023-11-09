import React from 'react'
import { convertToINR } from '../../../../components/Common/CommonLogic';

export default function PreviewCommonTable({data,newData}) {
    const Subtotal = (data?.pickup_quote_charge !== undefined && data?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0)) + (data?.originport_quote_charge !== undefined && data?.originport_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0)) + (data?.ocean_quote_charge !== undefined && data?.ocean_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0)) + (data?.port_discharge_charges !== undefined && data?.port_discharge_charges.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0)) + (newData?.pickup_quote_charge !== undefined && newData?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0)) + (newData?.originport_quote_charge !== undefined && newData?.originport_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0)) + (newData?.ocean_quote_charge !== undefined && newData?.ocean_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0)) + (newData?.port_discharge_charges !== undefined && newData?.port_discharge_charges.reduce((total, charge) => total + convertToINR(Number(charge?.total_sale_cost || 0), charge.currency), 0));
    

    const subtotalCount = () => {
        let buyValue = (data?.pickup_quote_charge !== undefined && data?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0)) + (data?.originport_quote_charge !== undefined && data?.originport_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0)) + (data?.ocean_quote_charge !== undefined && data?.ocean_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0)) + (data?.port_discharge_charges !== undefined && data?.port_discharge_charges.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0)) + (newData?.pickup_quote_charge !== undefined && newData?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0)) + (newData?.originport_quote_charge !== undefined && newData?.originport_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0)) + (newData?.ocean_quote_charge !== undefined && newData?.ocean_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0)) + (newData?.port_discharge_charges !== undefined && newData?.port_discharge_charges.reduce((total, charge) => total + convertToINR(Number(charge?.buy_cost || 0), charge.currency), 0));        

        let marginValue = (data?.pickup_quote_charge !== undefined && data?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0)) + (data?.originport_quote_charge !== undefined && data?.originport_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0)) + (data?.ocean_quote_charge !== undefined && data?.ocean_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0)) + (data?.port_discharge_charges !== undefined && data?.port_discharge_charges.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0)) + (newData?.pickup_quote_charge !== undefined && newData?.pickup_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0)) + (newData?.originport_quote_charge !== undefined && newData?.originport_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0)) + (newData?.ocean_quote_charge !== undefined && newData?.ocean_quote_charge.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0)) + (newData?.port_discharge_charges !== undefined && newData?.port_discharge_charges.reduce((total, charge) => total + convertToINR(Number(charge?.margin_value || 0), charge.currency), 0));
        return buyValue + marginValue;
    }
    return (
        <>
            {data !== undefined &&
                <div className="preview_table_wrap">
                    <table>
                        <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges <span className={`tag preffered ${data.quote_type.toLowerCase() === 'preffered' ? 'preffered' : data.quote_type.toLowerCase() === 'cheaper' ? 'cheaper' : data.quote_type.toLowerCase() === 'faster' ? 'faster' : ''}`}>{data.quote_type}</span></p></caption>
                        <thead>
                            <tr>
                                <th>Charge Name</th>
                                <th>UoM</th>
                                <th>Container Type</th>
                                <th>Quantity</th>
                                <th>Tax</th>
                                <th>Total Sale Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* pickup */}
                            {(data?.pickup_quote_charge?.length !== 0 || (data?.truck || data?.rail)) && <tr>
                                <td colSpan={6} className='title_row'>Pickup</td>
                            </tr>}
                            {data?.truck || data?.rail && (
                                <tr>
                                    <td>{data?.truck ? 'truck' : 'rail'}</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{'₹'} {data?.truck ? data?.truck_charge : data?.rail_charge}</td>
                                </tr>
                            )}
                            {data?.pickup_quote_charge?.map((data,index) => (
                                <tr key={`pickup_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))}   
                            {newData?.pickup_quote_charge?.map((data,index) => (
                                <tr key={`pickupnew_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))}   

                            {/* Port of Origin(shekou)  */}
                            {data?.originport_quote_charge?.length !== 0 && <tr>
                                <td colSpan={6} className='title_row'>Port of Origin</td>
                            </tr>}
                            {data?.originport_quote_charge?.map((data,index) => (
                                <tr key={`origin_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))}     
                            {newData?.originport_quote_charge?.map((data,index) => (
                                <tr key={`pickupnew_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))} 

                            {/* Ocean Freight(FIFO)  */}
                            <tr>
                                <td colSpan={6} className='title_row'>Ocean Freight</td>
                            </tr>
                            {data?.ocean_freight_charge && (
                                <tr>
                                    <td>Ocean</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{data?.ocean_freight_charge_currency || '₹'} {data?.ocean_freight_charge || 0}</td>
                                </tr>
                            )}
                            {data?.ocean_quote_charge?.map((data,index) => (
                                <tr key={`ocean_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))}  
                            {newData?.ocean_quote_charge?.map((data,index) => (
                                <tr key={`pickupnew_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))}    

                            {/* Port of Discharge(Winningpeg)  */}
                            {data?.port_discharge_charges?.length !== 0 && <tr>
                                <td colSpan={6} className='title_row'>Port of Discharge</td>
                            </tr>}
                            {data?.port_discharge_charges?.map((data,index) => (
                                <tr key={`ocean_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))}  
                            {newData?.port_discharge_charges?.map((data,index) => (
                                <tr key={`pickupnew_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>-</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.currency || '₹'} {data?.total_sale_cost}</td>
                                </tr>
                            ))} 
                            
                            {/* Delivery  */}
                            <tr>
                                <td colSpan={6} className='title_row'>Delivery</td>
                            </tr>
                            {data?.delivery_charge && (
                                <tr>
                                    <td>Delivery</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{`-`}</td>
                                    <td>{data?.delivery_currency || '₹'} {data?.delivery_charge || 0}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={6}><p>Sub Total: <span>₹{subtotalCount()}</span></p></td>
                            </tr>
                            <tr>
                                <td colSpan={6}><p>Total: <span className='text-primary'><b>₹{Subtotal}</b></span></p></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
        </>
    )
}
