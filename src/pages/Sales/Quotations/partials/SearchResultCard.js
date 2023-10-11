import React, { useState } from 'react'
import CheckboxCommon from '../../../Common/CheckboxCommon'
import { useSelector } from 'react-redux';
import { cube_filled } from '../../../../assets/images';

const SearchResultCard = ({data}) => {
    const [resultCheck,setResultCheck] = useState({});
    const createFields = useSelector((state) => state?.sales?.createFields);
    return (
        <div>
            <div className="result_tab_content_wrap">
                {(data || '').map((item) => (
                    <div className="search_result_card_check_wrap" key={item.id}>
                        <CheckboxCommon label={''} id={`result_card_${item}`} name={`result_card_${item}`} className={'mb-3'} array={resultCheck} setArray={setResultCheck} />
                        <div className="search_result_card">
                            <div className="search_result_card_header">
                                <div className="card_img">
                                    <span><img src={item?.logo} alt="Logo" /></span>
                                    <span className="title">{item?.name}</span>
                                </div>
                                <div className="middle_content">
                                    <span className="duration">Duration <b>{item.duration} days</b></span>
                                    <div className="from_to_wrap">
                                        <span className="from_loc">{item.location_from}</span>
                                        <span className="icon"><img src={createFields?.shipping_by?.img || cube_filled} alt="Shipping" /></span>
                                        <span className="to_loc">{item.location_to}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResultCard
