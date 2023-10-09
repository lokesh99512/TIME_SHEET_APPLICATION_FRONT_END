import { GET_QUOTATION_DATA, GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS } from "./actiontype";


export const getSalesQuotationData = (data) => ({
    type: GET_QUOTATION_DATA,
    payload: data
})
export const getSalesQuotationDataSuccess = (data) => ({
    type: GET_QUOTATION_DATA_SUCCESS,
    payload: data
})
export const getSalesQuotationDataFail = (error) => ({
    type: GET_QUOTATION_DATA_FAIL,
    payload: error
})