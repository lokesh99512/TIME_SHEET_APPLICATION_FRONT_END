import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_FCL_TABLE_DATA } from "./actiontype";
import { getFCLTableData } from "../../helpers/fakebackend_helper";
import { getFclDataFail, getFclDataSuccess } from "./actions";

function* fetchFclData(){
    try {
        const response = yield call(getFCLTableData)
        yield put(getFclDataSuccess(response))
    } catch (error) {
        yield put(getFclDataFail(error))
    }
}

export function* watchGetProcureData(){
    yield takeEvery(GET_FCL_TABLE_DATA, fetchFclData)
}

function* procurementSaga() {
    yield all([fork(watchGetProcureData)]);
}

export default procurementSaga;