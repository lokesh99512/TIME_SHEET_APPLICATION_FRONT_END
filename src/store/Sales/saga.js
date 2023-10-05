import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { GET_QUOTATION_DATA } from "./actiontype";
import { getSalesQuotTableData } from "../../helpers/fakebackend_helper";
import { getSalesQuotationDataFail, getSalesQuotationDataSuccess } from "./actions";

function* fetchSalesQuotationData(){
    try {
        const response = yield call(getSalesQuotTableData);
        yield put(getSalesQuotationDataSuccess(response));
    } catch (error) {
        yield put(getSalesQuotationDataFail(error));
    }
}

export function* watchGetSalesData (){
    yield takeEvery(GET_QUOTATION_DATA, fetchSalesQuotationData);
}

function* salesSaga () {
    yield all([fork(watchGetSalesData)]);
}

export default salesSaga;