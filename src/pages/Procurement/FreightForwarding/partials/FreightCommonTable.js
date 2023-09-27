import React, { useRef, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown } from 'reactstrap';
import SimpleBar from "simplebar-react"

export default function FreightCommonTable({column, data, type,handleSorting}) {
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
            <div className="table_wrap mt-3">
                <SimpleBar style={{ maxWidth: "100%" }} ref={ref}>
                    <Table className="table mb-0">
                        <thead className="table-light">
                            <tr>
                                {column?.map(({ label, accessor,sortable }) => (
                                    <th key={accessor} onClick={sortable ? () => handleSortingChange(accessor,type) : null}><span className='d-flex align-items-center'>{label} <i className='fas fa-sort'></i></span></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                <tr key={item?.id}>
                                    <td>{item?.charge_id || '-'}</td>
                                    <td>{item?.carrier_name || '-'}</td>
                                    <td>{item?.vendor_name || '-'}</td>
                                    <td>{item?.org_port || '-'}</td>
                                    <td>{item?.dest_port || '-'}</td>
                                    <td>{item?.via_port || '-'}</td>
                                    <td>{item?.valid_form || '-'}</td>
                                    <td>{item?.valid_till || '-'}</td>
                                    <td>{item?.transit_time || '-'}</td>
                                    <td>{item?.cargo_type || '-'}</td>
                                    <td>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="btn btn-link text-muted py-1 font-size-16 shadow-none" tag="a">
                                                <i className='bx bx-dots-vertical-rounded'></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <DropdownItem>Edit</DropdownItem>
                                                <DropdownItem>Print</DropdownItem>
                                                <DropdownItem>Delete</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </SimpleBar>
            </div>
        </>
    )
}
