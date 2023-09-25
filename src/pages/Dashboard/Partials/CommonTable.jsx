import React, { useRef, useState } from 'react'
import { profImg } from '../../../assets/images'
import { Table } from 'reactstrap'
// //Import Scrollbar
import SimpleBar from "simplebar-react"

const CommonTable = ({ column, data, type,handleSorting }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const ref = useRef();
    const handleSortingChange = (accessor,type) => {
        const sortOrder =
        accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder,type);
    };
    
    return (
        <>            
            <div className="table_wrap">
                <SimpleBar style={{ maxWidth: "100%" }} ref={ref}>
                    <Table className="table mb-0">
                        <thead className="table-light">
                            <tr>
                                {column?.map(({ label, accessor }) => (
                                    <th key={accessor} onClick={() => handleSortingChange(accessor,type)}><span className='d-flex align-items-center'>{label} <i className='fas fa-sort'></i></span></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                // <tr key={item?.id}>
                                //     {type === 'salesPerformance' ? (
                                //         <td>
                                //             <div className="prof_wrap">
                                //                 <div className="img">
                                //                     <img src={profImg} alt="Profile" />
                                //                 </div>
                                //                 <span>{item?.employee}</span>
                                //             </div>
                                //         </td>
                                //     ) : (
                                //         <td>{item?.port}</td>
                                //     )}
                                //     <td>{item?.total_equiry}</td>
                                //     <td>{item?.ratio}%</td>
                                //     <td><span className="green_text">{item?.trend}%</span></td>
                                // </tr>
                                <tr key={item?.id}>
                                    {column.map(({ accessor }) => {
                                        const tData = item[accessor] ? item[accessor] : "__";
                                        if(accessor === 'employee'){
                                            return <td key={accessor}>
                                                    <div className="prof_wrap">
                                                        <div className="img">
                                                            <img src={profImg} alt="Profile" />
                                                        </div>
                                                        <span>{tData}</span>
                                                    </div>
                                                </td>
                                        } else{
                                            return (
                                                <td key={accessor}>
                                                    {accessor === 'trend' ? (
                                                        <span className="green_text">{tData}%</span>
                                                    ) : accessor === 'ratio' ? tData + '%' : tData
                                                    }
                                                </td>
                                            )
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </SimpleBar>
            </div>
        </>
    )
}

export default CommonTable




























































// I regret to inform you that I am writing to tender my resignation from my position as a Frontend Developer at Crawlapps Technologies, effective as of 30th November 2023, in accordance with the terms of my employment contract.

// My time at Crawlapps Technologies has been a rewarding and transformative experience. I am deeply grateful for the learning opportunities, professional growth, and the chance to collaborate with exceptional colleagues during my tenure. However, I believe the time has come for me to explore new horizons and embrace fresh challenges in my career journey.

// Thanks for the best offer, but sorry I can't take it. This past year has been an enriching chapter in my professional life, and I will always look back on it with fondness. I am committed to ensuring a seamless transition during my notice period, and I am open to discussing how best to transfer my responsibilities and projects to a colleague or team member.

// Thank you for the opportunity to contribute to Crawlapps Technologies. I extend my best wishes to the company for its continued success and growth in the future.

// Warm regards,
// [Your Name]


// Resignation from the position of
// Frontend Developer

// I regret to inform you that I am resigning from my position as a Web designer due to some reason for a better future. As per the terms of the bond agreement, my last working day will be 30th September 2023 in my employment contract. I am committed to ensuring a smooth transition of my responsibilities during the notice period.

// Thank you for the best offer, but sorry I am not able to take it. I have learned a lot in these two years in the company. I want to express my gratitude to the entire team and the management for the opportunities and experiences I have gained during my tenure at Crawlapps. I genuinely appreciate the support I have received throughout my time here with this Crawlapps family.

// Thank you for your understanding. I depart with fond memories and wish the company continued success and prosperity in the future.

// Sincerely,