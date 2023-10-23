import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import CreateQuoteTop from './CreateQuoteTop';
import { useSelector } from 'react-redux';
import { isAnyValueEmpty } from '../../../../components/Common/CommonLogic';
import { useDispatch } from 'react-redux';
import { getSalesQuotationResultData } from '../../../../store/Sales/actions';
import SearchResultComp from './SearchResultComp';
import QuotationModalComp from './QuotationModalComp';
import { SEARCH_QUOTATION_BLANK } from '../../../../store/Sales/actiontype';
import PreviewQuotationModal from './PreviewQuotationModal';

export default function CreateQuotation() {
    const [searchResult, setSearchResult] = useState(false);
    const [searchView, setSearchView] = useState(true);
    const [quoteModal, setQuoteModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const searchData = useSelector((state) => state?.sales?.createFields);    
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const quote_Selected = useSelector((state) => state.sales.quote_selected_data);

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    function QuoteModalHandler() {
        setQuoteModal(!quoteModal);
        removeBodyCss();
    }

    const previewModalHand = () => {
        setPreviewModal(!previewModal);
    }

    const searchQuoteHandler = () => {
        if(searchResult){
            QuoteModalHandler();
        } else {
            if(!isAnyValueEmpty(searchData)){
                setSearchResult(true);
                setSearchView(false);
                dispatch(getSalesQuotationResultData());
            }
        }
    }
    const backHandler = () => {
        if(searchResult){
            setSearchView(true);
            setSearchResult(false);
        } else {
            navigate(-1);
            dispatch({type: SEARCH_QUOTATION_BLANK});
        }
    }
    return (
        <>
            <div className="page-content sales_page_content">
                <Container fluid>
                    <div className="main_freight_wrapper main_sales_wrapper create_sales_wrapper">
                        <div className='create_quote_top_back d-flex align-items-center mb-3'>
                            <div className="back_wrap d-flex align-items-center">
                                <button type="button" className='btn me-3' onClick={() => { backHandler();}}> <i className='fas fa-chevron-left'></i> </button>
                                <p>Find the most affordable Freight Quote.</p>
                            </div>
                            {searchResult ? <button type="button" className='btn btn-primary ms-auto' onClick={searchQuoteHandler} 
                             disabled={quote_Selected?.length === 0}>Quote Now</button> : 
                            <button type="button" className='btn btn-primary ms-auto' onClick={searchQuoteHandler} 
                            disabled={!(!isAnyValueEmpty(searchData))}>Search</button>}
                        </div>

                        {/* Create Quote Search fields */}
                        <CreateQuoteTop searchView={searchView} setSearchView={setSearchView} searchResult={searchResult} />

                        {/* Search Result */}
                        {searchResult && (
                            <SearchResultComp QuoteModalHandler={QuoteModalHandler} />
                        )}
                    </div>
                </Container>
            </div>
            {/* Quotation Modal */}
            <QuotationModalComp quoteModal={quoteModal} setQuoteModal={setQuoteModal} QuoteModalHandler={QuoteModalHandler} setPreviewModal={setPreviewModal} />

            {/* Preview Quotation Modal */}
            <PreviewQuotationModal previewModal={previewModal} previewModalHand={previewModalHand} setPreviewModal={setPreviewModal} QuoteModalHandler={QuoteModalHandler} />
        </>
    )
}
