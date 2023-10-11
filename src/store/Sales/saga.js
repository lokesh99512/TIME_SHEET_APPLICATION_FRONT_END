import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { GET_QUOTATION_DATA, GET_QUOTATION_RESULT_DATA, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS } from "./actiontype";
import { getSalesQuotTableData, getSearchResultData } from "../../helpers/fakebackend_helper";
import { getSalesQuotationDataFail, getSalesQuotationDataSuccess } from "./actions";

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
        yield put({type: GET_QUOTATION_RESULT_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_QUOTATION_RESULT_FAIL, payload: error})
    }
}

export function* watchGetSalesData (){
    yield takeEvery(GET_QUOTATION_DATA, fetchSalesQuotationData);
    yield takeEvery(GET_QUOTATION_RESULT_DATA, fetchResultData);
}

function* salesSaga () {
    yield all([fork(watchGetSalesData)]);
}

export default salesSaga;