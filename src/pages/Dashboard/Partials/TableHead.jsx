import React from 'react'

const TableHead = () => {
    return (
        <>
            <thead className="table-light">
                <tr>
                    {column.map((item, index) => (
                        <th key={index}><span className='d-flex align-items-center'>{item.label} <i className='fas fa-sort'></i></span></th>
                    ))}
                </tr>
            </thead>
        </>
    )
}

export default TableHead