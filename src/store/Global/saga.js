import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_CURRENCY_DETAIL, GET_CURRENCY_DETAIL_SUCCESS, GET_VENDOR_DETAILS, GET_VENDOR_DETAILS_SUCCESS } from "./actiontype";
import { getCurrencyData, getVendorData } from "../../helpers/services/GlobalService";

function* fetchVendorData(){
    try{
        const response = yield call(getVendorData);
        // console.log(response,"response");
        yield put({type: GET_VENDOR_DETAILS_SUCCESS, payload: response});
    } catch (error) {
        console.log(error,"vendor error-----------");
    }
}

function* fetchCurrencyData(){
    try{
        const response = yield call(getCurrencyData);
        // console.log(response,"response ===============");
        yield put({type: GET_CURRENCY_DETAIL_SUCCESS, payload: response});
    } catch(error){
        console.log(error,"currency error-----------");
    }
}

function* watchGetglobalData(){
    yield takeEvery(GET_VENDOR_DETAILS, fetchVendorData);
    yield takeEvery(GET_CURRENCY_DETAIL, fetchCurrencyData);
}

function* globalSaga() {
    yield all([fork(watchGetglobalData)]);
}

export default globalSaga;