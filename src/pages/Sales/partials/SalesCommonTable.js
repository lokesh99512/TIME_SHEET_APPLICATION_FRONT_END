import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAsyncDebounce, useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { Row, Table } from 'reactstrap';
import { filter_icon, upload_icon } from '../../../assets/images';
import { DefaultColumnFilter, Filter } from '../../../components/Common/filters';
import { QUOTATION_RESULT_SELECTED_BLANK, SEARCH_QUOTATION_BLANK } from '../../../store/Sales/actiontype';

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    // console.log(count,"count");
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

const SalesCommonTable = ({ columns, data, isGlobalFilter, customPageSize, toggleRightCanvas, component }) => {
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
    const dispatch = useDispatch();
    return (
        <>
            <div className="freight_filter_wrap d-flex align-items-center">
                <p className="label flex-grow-1 m-0">Filters :</p>

                <div className="right_actions_wrap flex-shrink-0 d-flex align-items-center">
                    {isGlobalFilter && (
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    )}
                    <div className="filter_wrap">
                        <button className='bg-transparent' onClick={toggleRightCanvas}><img src={filter_icon} alt="filter" /></button>
                    </div>
                    <div className="upload_wrap">
                        <button className='bg-transparent'>
                            <img src={upload_icon} alt="Upload" />Upload file
                        </button>
                    </div>
                    <div className="add_btn">
                        <button className='border-0' onClick={() => {navidate('/sales/create');dispatch({type: SEARCH_QUOTATION_BLANK});dispatch({type: QUOTATION_RESULT_SELECTED_BLANK});}}>
                            <i className='bx bx-plus align-middle'></i> Create
                        </button>
                    </div>
                </div>
            </div>
            <div className="table_pagination_wrap">
                <div className="table-responsive table_wrap">
                    <Table hover {...getTableProps()} className={'test'}>
                        <thead className="table-light table-nowrap">
                            {headerGroups.map(headerGroup => (
                                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th key={column.id}>
                                            <span className='d-flex align-items-center' {...column.getSortByToggleProps()}>
                                                {column.render("Header")}
                                                <i className='fas fa-sort'></i>
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
                                        <tr>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td key={cell.id} {...cell.getCellProps()}>
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <Row className="align-items-center g-3 text-center text-sm-start pagination_wrap">
                    <div className="col-sm">
                        <div className='pagination_left_text'>Showing<span className="fw-normal ms-1">{page.length}</span> of <span className="fw-normal">{data.length}</span> entries
                        </div>
                    </div>
                    <div className="col-sm-auto">
                        <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                            <li className={!canPreviousPage ? "page-item arrow_wrap previous disabled" : "page-item arrow_wrap previous"}>
                                <Link to="#" className="page-link" onClick={previousPage}><i className='fas fa-chevron-left'></i></Link>
                            </li>
                            {pageOptions.map((item, key) => (
                                <React.Fragment key={key}>
                                    <li className="page-item">
                                        <Link to="#" className={pageIndex === item ? "page-link active" : "page-link"} onClick={() => gotoPage(item)}>{item + 1}</Link>
                                    </li>
                                </React.Fragment>
                            ))}
                            <li className={!canNextPage ? "page-item arrow_wrap next disabled" : "page-item arrow_wrap next"}>
                                <Link to="#" className="page-link" onClick={nextPage}><i className='fas fa-chevron-right'></i></Link>
                            </li>
                        </ul>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default SalesCommonTable
