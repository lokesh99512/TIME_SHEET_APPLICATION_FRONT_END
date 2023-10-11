import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import CreateQuoteTop from './CreateQuoteTop';
import { useSelector } from 'react-redux';
import { isAnyValueEmpty } from '../../../../components/Common/CommonLogic';
import { useDispatch } from 'react-redux';
import { getSalesQuotationResultData } from '../../../../store/Sales/actions';
import SearchResultComp from './SearchResultComp';

export default function CreateQuotation() {
    const [searchResult, setSearchResult] = useState(false);
    const searchData = useSelector((state) => state?.sales?.createFields);    
    const navigate = useNavigate();
    const dispatch = useDispatch();    

    const searchQuoteHandler = () => {
        setSearchResult(true);
        dispatch(getSalesQuotationResultData());
    }
    return (
        <>
            <div className="page-content sales_page_content">
                <Container fluid>
                    <div className="main_freight_wrapper main_sales_wrapper create_sales_wrapper">
                        <div className='create_quote_top_back d-flex align-items-center'>
                            <div className="back_wrap d-flex align-items-center">
                                <button type="button" className='btn me-3' onClick={() => { navigate(-1) }}> <i className='fas fa-chevron-left'></i> </button>
                                <p>Find the most affordable Freight Quote.</p>
                            </div>
                            <button type="button" className='btn btn-primary ms-auto' onClick={searchQuoteHandler} disabled={isAnyValueEmpty(searchData)}>Search</button>
                        </div>

                        {/* Create Quote Search fields */}
                        <CreateQuoteTop />

                        {/* Search Result */}
                        {/* {searchResult && (
                            <SearchResultComp />
                        )} */}
                    </div>
                </Container>
            </div>
        </>
    )
}
