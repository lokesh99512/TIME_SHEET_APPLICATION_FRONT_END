import React, { useRef } from 'react'
import { profImg } from '../../../assets/images'
import { Table } from 'reactstrap'
// //Import Scrollbar
import SimpleBar from "simplebar-react"

const CommonTable = ({ column, data, type }) => {
    const ref = useRef();
    return (
        <>            
            <div className="table_wrap">
                <SimpleBar style={{ maxWidth: "100%" }} ref={ref}>
                    <Table className="table mb-0">
                        <thead className="table-light">
                            <tr>
                                {column?.map((item, index) => (
                                    <th key={index}><span className='d-flex align-items-center'>{item.label} <i className='fas fa-sort'></i></span></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                <tr key={item?.id}>
                                    {type === 'salesPerformance' ? (
                                        <td>
                                            <div className="prof_wrap">
                                                <div className="img">
                                                    <img src={profImg} alt="Profile" />
                                                </div>
                                                <span>{item?.employee}</span>
                                            </div>
                                        </td>
                                    ) : (
                                        <td>{item?.port}</td>
                                    )}
                                    <td>{item?.total_equiry}</td>
                                    <td>{item?.ratio}%</td>
                                    <td><span className="green_text">{item?.trend}%</span></td>
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
