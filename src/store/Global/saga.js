import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_CURRENCY_DETAIL, GET_CURRENCY_DETAIL_SUCCESS, GET_OCEAEN_PORT_DATA, GET_OCEAEN_PORT_DATA_SUCCEESS, GET_SURCHARGE_CATEGORY_DATA, GET_SURCHARGE_CATEGORY_DATA_SUCCESS, GET_SURCHARGE_CODE_DATA, GET_SURCHARGE_CODE_DATA_SUCCESS, GET_UOM_DATA, GET_UOM_DATA_SUCCESS, GET_VENDOR_DETAILS, GET_VENDOR_DETAILS_SUCCESS } from "./actiontype";
import { getCurrencyData, getOceanPortData, getSurchargeCategoryData, getSurchargeCodeData, getUomData, getVendorData } from "../../helpers/services/GlobalService";

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
function* fetchUOMData(){
    try{
        const response = yield call(getUomData);
        // console.log(response,"response UOM ===============");
        yield put({type: GET_UOM_DATA_SUCCESS, payload: response});
    } catch(error){
        console.log(error,"currency error-----------");
    }
}
function* fetchSurchageCodeData(){
    try{
        const response = yield call(getSurchargeCodeData);
        // console.log(response,"response surcharge ===============");
        yield put({type: GET_SURCHARGE_CODE_DATA_SUCCESS, payload: response});
    } catch(error){
        console.log(error,"currency error-----------");
    }
}
function* fetchSurchageCategoryData(){
    try{
        const response = yield call(getSurchargeCategoryData);
        console.log(response,"response surcharge category===============");
        yield put({type: GET_SURCHARGE_CATEGORY_DATA_SUCCESS, payload: response});
    } catch(error){
        console.log(error,"currency error-----------");
    }
}
function* fetchOceanPortData(){
    try{
        const response = yield call(getOceanPortData);
        console.log(response,"response ocean port===============");
        yield put({type: GET_OCEAEN_PORT_DATA_SUCCEESS, payload: response});
    } catch(error){
        console.log(error,"currency error-----------");
    }
}

function* watchGetglobalData(){
    yield takeEvery(GET_VENDOR_DETAILS, fetchVendorData);
    yield takeEvery(GET_CURRENCY_DETAIL, fetchCurrencyData);
    yield takeEvery(GET_UOM_DATA, fetchUOMData);
    yield takeEvery(GET_SURCHARGE_CODE_DATA, fetchSurchageCodeData);
    yield takeEvery(GET_SURCHARGE_CATEGORY_DATA, fetchSurchageCategoryData);
    yield takeEvery(GET_OCEAEN_PORT_DATA, fetchOceanPortData);
}

function* globalSaga() {
    yield all([fork(watchGetglobalData)]);
}

export default globalSaga;