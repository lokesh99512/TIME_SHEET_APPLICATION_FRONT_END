import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { GET_INQUIRY_DATA, GET_INQUIRY_DATA_FAIL, GET_INQUIRY_DATA_SUCCESS, GET_QUOTATION_DATA, GET_QUOTATION_RESULT_DATA, GET_QUOTATION_RESULT_DATA1, GET_QUOTATION_RESULT_DATA2, GET_QUOTATION_RESULT_DATA3, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS } from "./actiontype";
import { getExchangeRate, getSalesInquiryTableData, getSalesQuotTableData, getSearchResultData, getSearchResultData1, getSearchResultData2, getSearchResultData3 } from "../../helpers/fakebackend_helper";
import { getSalesQuotationDataFail, getSalesQuotationDataSuccess } from "./actions";
import { GET_CURRENCY_EXCHANGE_RATE, GET_CURRENCY_EXCHANGE_RATE_SUCCESS } from "./Quotation/actiontype";

function* fetchSalesQuotationData(){
    try {
        const response = yield call(getSalesQuotTableData);
        yield put(getSalesQuotationDataSuccess(response));
    } catch (error) {
        yield put(getSalesQuotationDataFail(error));
    }
}

function* fetchResultData(){
    try {
        const response = yield call(getSearchResultData);
        // console.log(response,"response");
        yield put({type: GET_QUOTATION_RESULT_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_QUOTATION_RESULT_FAIL, payload: error})
    }
}
function* fetchResultData1(){
    try {
        const response = yield call(getSearchResultData1);
        // console.log(response,"response");
        yield put({type: GET_QUOTATION_RESULT_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_QUOTATION_RESULT_FAIL, payload: error})
    }
}
function* fetchResultData2(){
    try {
        const response = yield call(getSearchResultData2);
        // console.log(response,"response");
        yield put({type: GET_QUOTATION_RESULT_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_QUOTATION_RESULT_FAIL, payload: error})
    }
}
function* fetchResultData3(){
    try {
        const response = yield call(getSearchResultData3);
        // console.log(response,"response");
        yield put({type: GET_QUOTATION_RESULT_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_QUOTATION_RESULT_FAIL, payload: error})
    }
}

function* fetchCurrencyExchangeData(){
    try {
        const response = yield call(getExchangeRate);
        yield put({type: GET_CURRENCY_EXCHANGE_RATE_SUCCESS, payload: response})
    } catch (error) {
        console.log(error,"error")
    }
}

function* fetchSalesInquiryData(){
    try {
        const response = yield call(getSalesInquiryTableData);
        yield put({type: GET_INQUIRY_DATA_SUCCESS, payload: response});
    } catch (error) {
        yield put({type: GET_INQUIRY_DATA_FAIL, payload: error});
    }
}

export function* watchGetSalesData (){
    yield takeEvery(GET_QUOTATION_DATA, fetchSalesQuotationData);
    yield takeEvery(GET_QUOTATION_RESULT_DATA, fetchResultData);
    yield takeEvery(GET_QUOTATION_RESULT_DATA1, fetchResultData1);
    yield takeEvery(GET_QUOTATION_RESULT_DATA2, fetchResultData2);
    yield takeEvery(GET_QUOTATION_RESULT_DATA3, fetchResultData3);
    yield takeEvery(GET_CURRENCY_EXCHANGE_RATE, fetchCurrencyExchangeData);
    yield takeEvery(GET_INQUIRY_DATA, fetchSalesInquiryData);
}

function* salesSaga () {
    yield all([fork(watchGetSalesData)]);
}

export default salesSaga;