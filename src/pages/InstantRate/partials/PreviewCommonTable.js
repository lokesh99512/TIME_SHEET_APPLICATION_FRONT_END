import React from 'react'
import { convertToINR } from '../../../components/Common/CommonLogic';
import { cube_filled, oocl_logo, zim_logo } from '../../../assets/images';

export default function PreviewCommonTable({ data, newData, tab }) {
    const subtotalCount = () => {
        let buyValue = (data?.tariffDetails?.reduce((outeracc, outerCurrent) => {
            let sum = 0;
            if (outerCurrent?.selected) {
                sum = outerCurrent?.tariffBreakDowns?.reduce((inneracc, innerCurrent) => {
                    return inneracc + convertToINR(Number(innerCurrent?.amount || 0), innerCurrent?.currencyCode);
                }, 0);
            }
            return outeracc + sum;
        }, 0))
        let marginValue = (data?.tariffDetails?.reduce((outeracc, outerCurrent) => {
            let sum = 0;
            if (outerCurrent?.selected) {
                sum = outerCurrent?.tariffBreakDowns?.reduce((inneracc, innerCurrent) => {
                    return inneracc + convertToINR(innerCurrent?.margin_value ? Number(innerCurrent.margin_value) : 0, innerCurrent?.currencyCode);
                }, 0);
            }
            return outeracc + sum;
        }, 0))

        let newSubTotal = newData?.tariffDetails !== undefined ? newData?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                let totalAmt = Number(currentInner.unitPerPrice || 0) * Number(currentInner.unit || 1);
                return accInner + convertToINR(Number(totalAmt), currentInner.currencyCode);
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;
        let totalNewMarginSum = newData?.tariffDetails !== undefined ? newData?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                return accInner + (convertToINR(currentInner?.margin_value ? Number(currentInner.margin_value) : 0, currentInner.currencyCode) || 0);
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;

        // console.log(buyValue, marginValue, newSubTotal, totalNewMarginSum, "buyValue");

        return buyValue + marginValue + newSubTotal + totalNewMarginSum;
    }

    const totalCount = (subTotal) => {
        let totalTax = data?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = 0;
            if (currentOuter?.selected) {
                innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                    return accInner + (currentInner?.taxDetail !== undefined && (convertToINR(Number(currentInner?.taxDetail?.value || 0), currentInner.currencyCode || 'INR') || 0));
                }, 0);
            }
            return accOuter + innerSum;
        }, 0);

        let totalNewTax = newData?.tariffDetails !== undefined ? newData?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.tariffBreakDowns?.reduce((accInner, currentInner) => {
                return accInner + (currentInner?.taxDetail !== undefined && (convertToINR(Number(currentInner?.taxDetail?.value || 0), currentInner.currencyCode) || 0));
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;

        // console.log(totalTax, totalNewTax, subTotal, "Total preview");

        return subTotal + totalTax + totalNewTax;
    }

    return (
        <>
            {data !== undefined &&
                <div className="preview_table_wrap">
                    {console.log(data,"data")}
                    <div className='preview_carrier_data d-flex align-items-center'>
                        {/* <img src={data?.carrierLogo ? data?.carrierLogo : cube_filled} alt="Logo" 
                            onError={(e) => { e.target.src = data?.carrierName?.toLowerCase() === 'oocl' ? oocl_logo : data?.carrierName?.toLowerCase() === 'zim' ? zim_logo : cube_filled }} /> */}
                        <p>carrier: <b>{data?.carrierName}</b></p>
                    </div>
                    <table>
                        <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges </p></caption>
                        {/* <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges <span className={`tag preffered ${data.quote_type.toLowerCase() === 'preffered' ? 'preffered' : data.quote_type.toLowerCase() === 'cheaper' ? 'cheaper' : data.quote_type.toLowerCase() === 'faster' ? 'faster' : ''}`}>{data.quote_type}</span></p></caption> */}
                        <thead>
                            <tr>
                                <th>Charge Name</th>
                                <th>Charge Basis</th>
                                <th>Curreny</th>
                                <th>Quantity</th>
                                {/* <th>Tax</th> */}
                                <th>Total Sale Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.tariffDetails?.map((inner, index) => {
                                if (inner?.selected) {
                                    return (
                                        <>

                                            <tr key={`header_${data.id}_${index}`}>
                                                <td colSpan={6} className='title_row'>{inner?.header?.split("_").join(" ") || '-'}</td>
                                            </tr>
                                            {inner?.tariffBreakDowns?.length !== 0 && inner?.tariffBreakDowns?.map((sub, index) => (
                                                <tr key={`tariff_${data.id}_${index}`}>
                                                    <td>{sub?.component || '-'}</td>
                                                    <td>{sub?.uomCode?.split('_').join(" ") || '-'}</td>
                                                    <td>{sub?.currencyCode || 'INR'}</td>
                                                    <td>{sub?.unit || 0}</td>
                                                    {/* <td>{sub?.taxDetail?.taxPercentage || 0}</td> */}
                                                    <td>{sub?.total_sale_cost || (Number(sub?.amount || 0) + Number(sub?.taxDetail?.value || 0))}</td>
                                                </tr>
                                            ))}

                                            {newData?.tariffDetails !== undefined && newData?.tariffDetails?.find(obj => obj?.header === inner?.header)?.tariffBreakDowns?.map((newSub, newindex) => (
                                                <tr key={`new_${data.id}_${index}`}>
                                                    <td>{newSub?.component?.value || '-'}</td>
                                                    <td>{newSub?.uomCode?.label || '-'}</td>
                                                    <td>{newSub?.currencyCode || 'INR'}</td>
                                                    <td>{newSub?.unit || 0}</td>
                                                    {/* <td>{newSub?.taxDetail?.taxPercentage || 0}</td> */}
                                                    <td>{newSub?.total_sale_cost || 0}</td>
                                                </tr>
                                            ))}

                                            {(inner?.tariffBreakDowns?.length === 0 && newData?.tariffDetails?.find(obj => obj?.header === inner?.header) === undefined) && <tr><td colSpan={6}>No data found</td></tr>}
                                        </>
                                    )
                                }
                            })}
                        </tbody>
                        <tfoot>
                            {/* <tr>
                                <td colSpan={6}><p>Sub Total: <span>₹{subtotalCount()}</span></p></td>
                            </tr> */}
                            <tr>
                                <td colSpan={6}><p>Total: <span className='text-primary'><b>₹{subtotalCount()}</b></span></p></td>
                                {/* <td colSpan={6}><p>Total: <span className='text-primary'><b>₹{totalCount(subtotalCount())}</b></span></p></td> */}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
        </>
    )
}
