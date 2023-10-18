import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { GET_QUOTATION_DATA, GET_QUOTATION_RESULT_DATA, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS } from "./actiontype";
import { getExchangeRate, getSalesQuotTableData, getSearchResultData } from "../../helpers/fakebackend_helper";
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

function* fetchCurrencyExchangeData(){
    try {
        const response = yield call(getExchangeRate);
        yield put({type: GET_CURRENCY_EXCHANGE_RATE_SUCCESS, payload: response})
    } catch (error) {
        console.log(error,"error")
    }
}

export function* watchGetSalesData (){
    yield takeEvery(GET_QUOTATION_DATA, fetchSalesQuotationData);
    yield takeEvery(GET_QUOTATION_RESULT_DATA, fetchResultData);
    yield takeEvery(GET_CURRENCY_EXCHANGE_RATE, fetchCurrencyExchangeData);
}

function* salesSaga () {
    yield all([fork(watchGetSalesData)]);
}

export default salesSaga;