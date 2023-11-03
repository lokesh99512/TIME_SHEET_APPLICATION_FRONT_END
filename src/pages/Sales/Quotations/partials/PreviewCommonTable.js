import React from 'react'

export default function PreviewCommonTable({data,newData}) {
    const Subtotal = (data?.pickup_quote_charge !== undefined && data?.pickup_quote_charge.reduce((total, charge) => total + Number(charge.total_sale_cost), 0)) + (data?.originport_quote_charge !== undefined && data?.originport_quote_charge.reduce((total, charge) => total + Number(charge.total_sale_cost), 0)) + (data?.ocean_quote_charge !== undefined && data?.ocean_quote_charge.reduce((total, charge) => total + Number(charge.total_sale_cost), 0)) + (newData?.pickup_quote_charge !== undefined && newData?.pickup_quote_charge.reduce((total, charge) => total + Number(charge.total_sale_cost), 0)) + (newData?.originport_quote_charge !== undefined && newData?.originport_quote_charge.reduce((total, charge) => total + Number(charge.total_sale_cost), 0)) + (newData?.ocean_quote_charge !== undefined && newData?.ocean_quote_charge.reduce((total, charge) => total + Number(charge.total_sale_cost), 0));

    const subtotalCount = () => {
        let buyValue = (data?.pickup_quote_charge !== undefined && data?.pickup_quote_charge.reduce((total, charge) => total + Number(charge.buy_cost || 0), 0)) + (data?.originport_quote_charge !== undefined && data?.originport_quote_charge.reduce((total, charge) => total + Number(charge.buy_cost || 0), 0)) + (data?.ocean_quote_charge !== undefined && data?.ocean_quote_charge.reduce((total, charge) => total + Number(charge.buy_cost || 0), 0)) + (newData?.pickup_quote_charge !== undefined && newData?.pickup_quote_charge.reduce((total, charge) => total + Number(charge.buy_cost || 0), 0)) + (newData?.originport_quote_charge !== undefined && newData?.originport_quote_charge.reduce((total, charge) => total + Number(charge.buy_cost || 0), 0)) + (newData?.ocean_quote_charge !== undefined && newData?.ocean_quote_charge.reduce((total, charge) => total + Number(charge.buy_cost || 0), 0));

        let marginValue = (data?.pickup_quote_charge !== undefined && data?.pickup_quote_charge.reduce((total, charge) => total + Number(charge.margin_value || 0), 0)) + (data?.originport_quote_charge !== undefined && data?.originport_quote_charge.reduce((total, charge) => total + Number(charge.margin_value || 0), 0)) + (data?.ocean_quote_charge !== undefined && data?.ocean_quote_charge.reduce((total, charge) => total + Number(charge.margin_value || 0), 0)) + (newData?.pickup_quote_charge !== undefined && newData?.pickup_quote_charge.reduce((total, charge) => total + Number(charge.margin_value || 0), 0)) + (newData?.originport_quote_charge !== undefined && newData?.originport_quote_charge.reduce((total, charge) => total + Number(charge.margin_value || 0), 0)) + (newData?.ocean_quote_charge !== undefined && newData?.ocean_quote_charge.reduce((total, charge) => total + Number(charge.margin_value || 0), 0));
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
                                <th>Quantity</th>
                                <th>Tax</th>
                                <th>Total Sale Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* pickup */}
                            {data?.pickup_quote_charge?.length !== 0 && <tr>
                                <td colSpan={5} className='title_row'>Pickup</td>
                            </tr>}
                            {data?.pickup_quote_charge?.map((data,index) => (
                                <tr key={`pickup_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.total_sale_cost}</td>
                                </tr>
                            ))}   
                            {newData?.pickup_quote_charge?.map((data,index) => (
                                <tr key={`pickupnew_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.total_sale_cost}</td>
                                </tr>
                            ))}   

                            {/* Port of Origin(shekou)  */}
                            {data?.originport_quote_charge?.length !== 0 && <tr>
                                <td colSpan={5} className='title_row'>Port of Origin(shekou)</td>
                            </tr>}
                            {data?.originport_quote_charge?.map((data,index) => (
                                <tr key={`origin_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.total_sale_cost}</td>
                                </tr>
                            ))}     
                            {newData?.originport_quote_charge?.map((data,index) => (
                                <tr key={`pickupnew_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.total_sale_cost}</td>
                                </tr>
                            ))} 

                            {/* Ocean Freight(FIFO)  */}
                            {data?.ocean_quote_charge?.length !== 0 && <tr>
                                <td colSpan={5} className='title_row'>Ocean Freight(FIFO)</td>
                            </tr>}
                            {data?.ocean_quote_charge?.map((data,index) => (
                                <tr key={`ocean_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.total_sale_cost}</td>
                                </tr>
                            ))}  
                            {newData?.ocean_quote_charge?.map((data,index) => (
                                <tr key={`pickupnew_${data.id}_${index}`}>
                                    <td>{data?.charges_name}</td>
                                    <td>{data?.uom}</td>
                                    <td>{data?.quantity}</td>
                                    <td>{data?.tax}</td>
                                    <td>{data?.total_sale_cost}</td>
                                </tr>
                            ))}    

                            {/* Port of Discharge(Winningpeg)  */}
                            {/* <tr>
                                <td colSpan={5} className='title_row'>Port of Discharge(Winningpeg)</td>
                            </tr>
                            <tr>
                                <td>Port of discharge</td>
                                <td>20GP</td>
                                <td>2</td>
                                <td>18</td>
                                <td>2200</td>
                            </tr> */}
                            
                            {/* Delivery  */}
                            {/* <tr>
                                <td colSpan={5} className='title_row'>Delivery</td>
                            </tr>
                            <tr>
                                <td>Delivery</td>
                                <td>20GP</td>
                                <td>2</td>
                                <td>18</td>
                                <td>2200</td>
                            </tr> */}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}><p>Sub Total: <span>₹{subtotalCount()}</span></p></td>
                            </tr>
                            <tr>
                                <td colSpan={5}><p>Total: <span className='text-primary'><b>₹{Subtotal}</b></span></p></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
        </>
    )
}
