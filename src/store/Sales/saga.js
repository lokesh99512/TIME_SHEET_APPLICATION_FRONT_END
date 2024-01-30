import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getExchangeRate, getSalesInquiryTableData, getSalesQuotTableData } from "../../helpers/fakebackend_helper";
import { GET_CURRENCY_EXCHANGE_RATE, GET_CURRENCY_EXCHANGE_RATE_SUCCESS } from "./Quotation/actiontype";
import { getSalesQuotationDataFail, getSalesQuotationDataSuccess } from "./actions";
import { GET_INQUIRY_DATA, GET_INQUIRY_DATA_FAIL, GET_INQUIRY_DATA_SUCCESS, GET_QUOTATION_DATA } from "./actiontype";

function* fetchSalesQuotationData(){
    try {
        const response = yield call(getSalesQuotTableData);
        yield put(getSalesQuotationDataSuccess(response));
    } catch (error) {
        yield put(getSalesQuotationDataFail(error));
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
    yield takeEvery(GET_CURRENCY_EXCHANGE_RATE, fetchCurrencyExchangeData);
    yield takeEvery(GET_INQUIRY_DATA, fetchSalesInquiryData);
}

function* salesSaga () {
    yield all([fork(watchGetSalesData)]);
}

export default salesSaga;