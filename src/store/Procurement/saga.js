import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAirConsoleTableData, getAirwaybillTableData, getFCLTableData, getInlandTableData, getLCLTableData, getPortLocalChargesTableData } from "../../helpers/fakebackend_helper";
import { getAirConsoleDataFail, getAirConsoleDataSuccess, getAirwaybillDataFail, getAirwaybillDataSuccess, getFclDataFail, getFclDataSuccess, getInLandDataFail, getInLandDataSuccess, getLclDataFail, getLclDataSuccess, getPortLocalChargesDataFail, getPortLocalChargesDataSuccess } from "./actions";
import { GET_CONSOLE_TABLE_DATA, GET_FCL_TABLE_DATA, GET_INLAND_TABLE_DATA, GET_LCL_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA, GET_WAYBILL_TABLE_DATA } from "./actiontype";

function* fetchFclData(){
    try {
        const response = yield call(getFCLTableData)
        yield put(getFclDataSuccess(response))
    } catch (error) {
        yield put(getFclDataFail(error))
    }
}

function* fetchLclData(){
    try {
        const response = yield call(getLCLTableData);
        yield put(getLclDataSuccess(response));
    } catch (error) {
        yield put(getLclDataFail(error));
    }
}

function* fetchPLChargesData(){
    try {
        console.log("here");
        const response = yield call(getPortLocalChargesTableData);
        console.log(response,"res");
        yield put(getPortLocalChargesDataSuccess(response));
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
    }
}

function* fetchWaybillData(){
    try {
        const response = yield call(getAirwaybillTableData);
        yield put(getAirwaybillDataSuccess(response));
    } catch (error) {
        yield put(getAirwaybillDataFail(error));
    }
}

function* fetchAirConsoleData(){
    try {
        const response = yield call(getAirConsoleTableData);
        yield put(getAirConsoleDataSuccess(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}

function* fetchInLandData(){
    try {
        const response = yield call(getInlandTableData);
        yield put(getInLandDataSuccess(response));
    } catch (error) {
        yield put(getInLandDataFail(error));
    }
}

export function* watchGetProcureData(){
    yield takeEvery(GET_FCL_TABLE_DATA, fetchFclData)
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