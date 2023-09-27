import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_FCL_TABLE_DATA, GET_LCL_TABLE_DATA } from "./actiontype";
import { getFCLTableData, getLCLTableData } from "../../helpers/fakebackend_helper";
import { getFclDataFail, getFclDataSuccess, getLclDataFail, getLclDataSuccess } from "./actions";

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
        console.log(response,"saga object--------------------");
        yield put(getLclDataSuccess(response));
    } catch (error) {
        yield put(getLclDataFail(error));
    }
}

export function* watchGetProcureData(){
    yield takeEvery(GET_FCL_TABLE_DATA, fetchFclData)
    yield takeEvery(GET_LCL_TABLE_DATA, fetchLclData)
}

function* procurementSaga() {
    yield all([fork(watchGetProcureData)]);
}

export default procurementSaga;