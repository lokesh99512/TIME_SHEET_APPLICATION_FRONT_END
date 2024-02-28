import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAsyncDebounce, useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { DefaultColumnFilter, Filter } from '../../../../../components/Common/filters';
import TableCommonSkeleton from '../../../../Skeleton/TableCommonSkeleton';
import ReactPaginate from 'react-paginate';
import { Row, Table } from 'reactstrap';
import { filter_icon, upload_icon } from '../../../../../assets/images';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className="search_form">
            <form>
                <div className="position-relative">
                    <input
                        type="search"
                        onChange={e => {
                            e.preventDefault();
                            setValue(e.target.value);
                            onChange(e.target.value);
                            return false;
                        }}
                        className="form-control"
                        placeholder="Search"
                        value={value || ""}
                    />
                    <button className="btn" type="button">
                        <i className="bx bx-search-alt-2 align-middle"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

const TableCompareRate = ({ columns, data, isGlobalFilter, customPageSize, toggleRightCanvas, component, loader }) => {
    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize, state, preGlobalFilteredRows, setGlobalFilter, state: { pageIndex, pageSize }, } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: customPageSize },
    },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,);
    const navidate = useNavigate();

    return (
        <>
            <div className="freight_filter_wrap d-flex align-items-center">
                <p className="label flex-grow-1 m-0"></p>

                <div className="right_actions_wrap flex-shrink-0 d-flex align-items-center">
                    {isGlobalFilter && (
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    )}
                </div>
            </div>
            <div className="table_pagination_wrap air_table_wrap">
                <div className="table-responsive table_wrap">
                    <Table hover {...getTableProps()}>
                        <thead className="table-light table-nowrap">
                            {headerGroups.map(headerGroup => (
                                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (                                        
                                        <th {...column.getHeaderProps()} key={column.id} className={`${column?.Header?.includes('test') ? 'hide' : ''}`}>
                                            <span className='d-flex align-items-center justify-content-center' {...column.getSortByToggleProps()}>
                                                {column.render("Header")}
                                                {!column?.Header?.includes('test') && (
                                                    <i className='fas fa-sort'></i>
                                                )}
                                            </span>
                                            <Filter column={column} />
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <Fragment key={row.getRowProps().key}>
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td key={cell.id} {...cell.getCellProps()} style={{ backgroundColor: cell?.row?.original?.is_active === false ? "#D3D3D3" : "" }}>
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </Fragment>
                                );
                            })}
                            {page?.length === 0 && (
                                <>
                                    {loader ? (
                                        <TableCommonSkeleton tdCount={headerGroups[0].headers.length} />
                                    ) :
                                        <tr>
                                            <td colSpan={18}>
                                                <div className='no_table_data_found'>
                                                    <p>No Data Found.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </>
                            )}
                        </tbody>
                    </Table>
                </div>
                <Row className="align-items-center g-3 text-center text-sm-start pagination_wrap">
                    <div className="col-sm">
                        <div className='pagination_left_text'>Showing<span className="fw-normal ms-1">{page.length}</span> of <span className="fw-normal">{data.length}</span> entries
                        </div>
                    </div>
                    <div className="col-sm-auto">
                        <div className='react_pagination_wrap'>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next"
                                onPageChange={(item) => { gotoPage(item.selected) }}
                                pageRangeDisplayed={3}
                                pageCount={pageOptions.length}
                                previousLabel="previous"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default TableCompareRate
