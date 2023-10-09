import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import CreateQuoteTop from './CreateQuoteTop';

export default function CreateQuotation() {
    const navigate = useNavigate();
    
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
                            <button type="button" className='btn btn-primary ms-auto'>Search</button>
                        </div>

                        {/* Create Quote Search fields */}
                        <CreateQuoteTop />
                    </div>
                </Container>
            </div>
        </>
    )
}
