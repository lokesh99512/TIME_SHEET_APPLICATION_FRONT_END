import React, { useState } from 'react'
import CheckboxCommon from '../../../Common/CheckboxCommon'
import { useSelector } from 'react-redux';
import { cube_filled, truck_outline } from '../../../../assets/images';
import { AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap';

const SearchResultCard = ({data}) => {
    const [resultCheck,setResultCheck] = useState({});
    // const [resultCheck,setResultCheck] = useState({});
    const createFields = useSelector((state) => state?.sales?.createFields);
    console.log(resultCheck,"resultCheck-------")
    return (
        <div>
            <div className="result_tab_content_wrap">
                {(data || '').map((item,index) => (
                    <div className="search_result_card_check_wrap d-flex align-items-center" key={item.id}>
                        <CheckboxCommon label={''} id={`result_card_${index}`} name={`result_card_${index}`} className={'me-3'} array={resultCheck} setArray={setResultCheck} />
                        <div className="search_result_card">
                            <div className="search_result_card_header d-flex align-items-center">
                                <div className="card_img">
                                    <span className='d-flex align-items-center justify-content-center img mx-auto'><img src={item?.logo} alt="Logo" /></span>
                                    <span className="title d-block text-center mt-2">{item?.name}</span>
                                </div>
                                <div className="middle_content">
                                    <span className="duration text-center d-block">Duration <b>{item.duration} days</b></span>
                                    <div className="from_to_wrap mt-2 mb-3 d-flex justify-content-between">
                                        <span className="from_loc">{item.location_from}</span>
                                        <span className="icon d-flex align-items-center justify-content-center"><img src={createFields?.shipping_by?.img || cube_filled} alt="Shipping" /></span>
                                        <span className="to_loc">{item.location_to}</span>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4 text-left"><span>Valid: <b>01 Jan 2023</b></span></div>
                                        <div className="col-lg-4 text-center"><span>Id: <b>1234567890</b></span></div>
                                        <div className="col-lg-4 text-right"><span>CO2: <b>7213.27 kg CO2</b></span></div>
                                    </div>
                                </div>
                                <div className="total_wrap">
                                    <p className="total_price text-center"><b>$12,333</b></p>
                                    <div className="btn_wrap d-flex">
                                        <button type='button' className='btn text-primary'>View Detail</button>
                                        <button type='button' className='btn btn-primary'>Quote Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="search_result_accordion_details">
                                {/* <UncontrolledAccordion>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`pickup_${index}`}>
                                                <div className="left_lable">
                                                    <CheckboxCommon label={''} id={`pickup_${index}`} name={`pickup_${index}`} className={'me-3'} array={resultCheck} setArray={setResultCheck} />
                                                    <img src={truck_outline} alt="Truck" />
                                                </div>
                                                <div className="right_con">
                                                    <span>CO2: <b>7213.27 kg CO2</b></span>
                                                    <span className='text-primary'>$207</span>
                                                </div>
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`pickup_${index}`}>
                                                test
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`origin_port_${index}`}>
                                                Port of origin(Shekou)
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`origin_port_${index}`}>
                                                Port of origin(Shekou)
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`ocean_freight_${index}`}>
                                               Ocean Freight(FIFO)
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`ocean_freight_${index}`}>
                                               Ocean Freight(FIFO)
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`pickport_discharge_${index}`}>
                                               PickPort of discharge(Winnipeg)
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`pickport_discharge_${index}`}>
                                               PickPort of discharge(Winnipeg)
                                            </AccordionBody>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionHeader targetId={`delivery_charge_${index}`}>
                                                Delivery
                                            </AccordionHeader>
                                            <AccordionBody accordionId={`delivery_charge_${index}`}>
                                                Delivery
                                            </AccordionBody>
                                        </AccordionItem>
                                </UncontrolledAccordion> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResultCard
