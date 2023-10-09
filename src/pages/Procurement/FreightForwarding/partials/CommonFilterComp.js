import React from 'react'
import { filter_icon, upload_icon } from '../../../../assets/images'

// export function GlobalFilter({
//     preGlobalFilteredRows,
//     globalFilter,
//     setGlobalFilter,
//   }) {
//     const count = preGlobalFilteredRows.length;
//     const [value, setValue] = React.useState(globalFilter);
//     const onChange = useAsyncDebounce(value => {
//       setGlobalFilter(value || undefined);
//     }, 200);
  
//     return (
//       <Col sm={4}>
//         <div className="search-box me-2 mb-2 d-inline-block">
//           <div className="position-relative">
//             <label htmlFor="search-bar-0" className="search-label">
//               <span id="search-bar-0-label" className="sr-only">
//                 Search this table
//               </span>
//               <input
//                 onChange={e => {
//                   setValue(e.target.value);
//                   onChange(e.target.value);
//                 }}
//                 id="search-bar-0"
//                 type="text"
//                 className="form-control"
//                 placeholder={`${count} records...`}
//                 value={value || ""}
//               />
//             </label>
//             <i className="bx bx-search-alt search-icon"></i>
//           </div>
//         </div>
//       </Col>
//     );
//   }

const CommonFilterComp = () => {
    return (
        <>
            <div className="freight_filter_wrap d-flex align-items-center">
                <p className="label flex-grow-1 m-0">Filters :</p>

                <div className="right_actions_wrap flex-shrink-0 d-flex align-items-center">
                    <div className="search_form">
                        <form>
                            <div className="position-relative">
                                <input 
                                    type="search"
                                    className="form-control" 
                                    placeholder="Search" 
                                />
                                <button className="btn" type="button">
                                    <i className="bx bx-search-alt-2 align-middle"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="filter_wrap">
                        <button className='bg-transparent'><img src={filter_icon} alt="filter" /></button>
                    </div>
                    <div className="upload_wrap">
                        <button className='bg-transparent'>
                            <img src={upload_icon} alt="Upload" />Upload file
                        </button>
                    </div>
                    <div className="add_btn">
                        <button className='border-0'>
                            <i className='bx bx-plus align-middle'></i> Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommonFilterComp
