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
                                                        {/* <div className="img">
                                                            <img src={profImg} alt="Profile" />
                                                        </div> */}
                                                        <span>{tData}</span>
                                                    </div>
                                                </td>
                                        } else{
                                            return (
                                                <td key={accessor}>
                                                    {accessor === 'trend' ? (
                                                        // <span className="green_text">{tData}%</span>
                                                        <div className="text-nowrap">
                                                        <span className={"badge badge-soft-" + "success" + " text-" + "success"}>
                                                        {tData}%
                                                        </span>
                                                    </div>
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
