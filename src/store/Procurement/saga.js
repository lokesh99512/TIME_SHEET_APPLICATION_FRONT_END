import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAirConsoleTableData, getAirwaybillTableData, getInlandTableData, getLCLTableData, getPortLocalChargesTableData } from "../../helpers/fakebackend_helper";
import { getAirConsoleDataFail, getAirConsoleDataSuccess, getAirwaybillDataFail, getAirwaybillDataSuccess, getFclDataFail, getFclDataSuccess, getInLandDataFail, getInLandDataSuccess, getLclDataFail, getLclDataSuccess, getPortLocalChargesDataFail, getPortLocalChargesDataSuccess } from "./actions";
import { GET_CONSOLE_TABLE_DATA, GET_FCL_TABLE_DATA, GET_INLAND_TABLE_DATA, GET_LCL_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA, GET_WAYBILL_TABLE_DATA, UPLOAD_FCL_CARRIER_DATA, UPLOAD_FCL_FREIGHT, UPLOAD_FCL_SURCHARGE } from "./actiontype";
import { getFCLTableData, postFclFreightUploadSer, postFclSurchargeUploadSer, postFclUploadSer } from "../../helpers/services/FCLService";
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";

function* fetchFclData() {
    try {
        const response = yield call(getFCLTableData)
        yield put(getFclDataSuccess(response))
    } catch (error) {
        yield put(getFclDataFail(error))
    }
}
function* postFclUploadSaga({ payload: { dataObj } }) {
    console.log(dataObj, "dataObj saga............")
    try {
        const response = yield call(postFclUploadSer, dataObj);
        console.log(response, "response");
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.message);
    }
}
function* postFclFreightUploadSaga({ payload: { formData } }) {
    console.log(formData.get('file'),"success")
    try {
        const response = yield call(postFclFreightUploadSer, formData);
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}
function* postFclSurchargeUploadSaga({ payload: { data } }) {
    try {
        const response = yield call(postFclSurchargeUploadSer, data);
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}

function* fetchLclData() {
    try {
        const response = yield call(getLCLTableData);
        yield put(getLclDataSuccess(response));
    } catch (error) {
        yield put(getLclDataFail(error));
    }
}

function* fetchPLChargesData() {
    try {
        const response = yield call(getPortLocalChargesTableData);
        yield put(getPortLocalChargesDataSuccess(response));
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
    }
}

function* fetchWaybillData() {
    try {
        const response = yield call(getAirwaybillTableData);
        yield put(getAirwaybillDataSuccess(response));
    } catch (error) {
        yield put(getAirwaybillDataFail(error));
    }
}

function* fetchAirConsoleData() {
    try {
        const response = yield call(getAirConsoleTableData);
        yield put(getAirConsoleDataSuccess(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}

function* fetchInLandData() {
    try {
        const response = yield call(getInlandTableData);
        yield put(getInLandDataSuccess(response));
    } catch (error) {
        yield put(getInLandDataFail(error));
    }
}

export function* watchGetProcureData() {
    yield takeEvery(GET_FCL_TABLE_DATA, fetchFclData);
    yield takeEvery(UPLOAD_FCL_CARRIER_DATA, postFclUploadSaga);
    yield takeEvery(UPLOAD_FCL_FREIGHT, postFclFreightUploadSaga);
    yield takeEvery(UPLOAD_FCL_SURCHARGE, postFclSurchargeUploadSaga);
    yield takeEvery(GET_LCL_TABLE_DATA, fetchLclData)
    yield takeEvery(GET_PORTLOCALCHARGES_TABLE_DATA, fetchPLChargesData)
    yield takeEvery(GET_WAYBILL_TABLE_DATA, fetchWaybillData);
    yield takeEvery(GET_CONSOLE_TABLE_DATA, fetchAirConsoleData);
    yield takeEvery(GET_INLAND_TABLE_DATA, fetchInLandData)
}

function* procurementSaga() {
    yield all([fork(watchGetProcureData)]);
}

export default procurementSaga;