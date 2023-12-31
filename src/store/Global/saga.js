import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_CARGO_TYPE_DATA, GET_CARGO_TYPE_DATA_SUCCEESS, GET_CONTAINER_DATA, GET_CONTAINER_DATA_SUCCEESS, GET_CURRENCY_DETAIL, GET_CURRENCY_DETAIL_SUCCESS, GET_OCEAEN_PORT_DATA, GET_OCEAEN_PORT_DATA_SUCCEESS, GET_SURCHARGE_ALICE_DATA, GET_SURCHARGE_ALICE_DATA_SUCCEESS, GET_SURCHARGE_CATEGORY_DATA, GET_SURCHARGE_CATEGORY_DATA_SUCCESS, GET_SURCHARGE_CODE_DATA, GET_SURCHARGE_CODE_DATA_SUCCESS, GET_UOM_DATA, GET_UOM_DATA_SUCCESS, GET_VENDOR_DETAILS, GET_VENDOR_DETAILS_SUCCESS, POST_SURCHARGE_CODE_DATA, POST_SURCHARGE_CODE_DATA_SUCCEESS } from "./actiontype";
import { getCargoTypeData, getContainerData, getCurrencyData, getOceanPortData, getSurchargeAliceSer, getSurchargeCategoryData, getSurchargeCodeData, getUomData, getVendorData, postSurchargeCodeSer } from "../../helpers/services/GlobalService";
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";

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
function* fetchCargoTypeData(){
    try{
        const response = yield call(getCargoTypeData);
        console.log(response,"response Cargo type===============");
        yield put({type: GET_CARGO_TYPE_DATA_SUCCEESS, payload: response});
    } catch(error){
        console.log(error,"cargo type error-----------");
    }
}
function* fetchContainerData(){
    try{
        const response = yield call(getContainerData);
        console.log(response,"response Container===============");
        yield put({type: GET_CONTAINER_DATA_SUCCEESS, payload: response});
    } catch(error){
        console.log(error,"Container error-----------");
    }
}
function* fetchSurchargeAliceData(){
    try{
        const response = yield call(getSurchargeAliceSer);
        console.log(response,"response Container===============");
        yield put({type: GET_SURCHARGE_ALICE_DATA_SUCCEESS, payload: response});
    } catch(error){
        console.log(error,"Container error-----------");
    }
}
function* postSurchargeCodeData({payload: { data }}){
    try{
        const response = yield call(postSurchargeCodeSer, data);
        console.log(response,"response postSurchargeCodeData===============");
        showSuccessToast("Surcharge Code Added Successfully");
        const surResponse = yield call(getSurchargeCodeData);
        yield put({type: GET_SURCHARGE_CODE_DATA_SUCCESS, payload: surResponse});
    } catch(error){
        console.log(error,"postSurchargeCodeData error-----------");
        showErrorToast(error?.message);
    }
}

function* watchGetglobalData(){
    yield takeEvery(GET_VENDOR_DETAILS, fetchVendorData);
    yield takeEvery(GET_CURRENCY_DETAIL, fetchCurrencyData);
    yield takeEvery(GET_UOM_DATA, fetchUOMData);
    yield takeEvery(GET_SURCHARGE_CODE_DATA, fetchSurchageCodeData);
    yield takeEvery(GET_SURCHARGE_CATEGORY_DATA, fetchSurchageCategoryData);
    yield takeEvery(GET_OCEAEN_PORT_DATA, fetchOceanPortData);
    yield takeEvery(GET_CARGO_TYPE_DATA, fetchCargoTypeData);
    yield takeEvery(GET_CONTAINER_DATA, fetchContainerData);
    yield takeEvery(GET_SURCHARGE_ALICE_DATA, fetchSurchargeAliceData);
    yield takeEvery(POST_SURCHARGE_CODE_DATA, postSurchargeCodeData);
}

function* globalSaga() {
    yield all([fork(watchGetglobalData)]);
}

export default globalSaga;