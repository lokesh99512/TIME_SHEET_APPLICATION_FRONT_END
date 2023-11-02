
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects"
import { GET_USERS_TABLE_DATA } from "./actiontype"
import { getUsersDataSuccess, getUsersDataFail } from "./actions"
import { getSettingsUsers } from "../../helpers/fakebackend_helper"

function* getUsersData(){
    try {
        const response = yield call(getSettingsUsers)
        // console.log(response,"<---surcharge response");
        yield put(getUsersDataSuccess(response))
    } catch (error) {
        yield put(getUsersDataFail(error))
    }
}



export function* watchGetSettingsUsersData(){
    // console.log("here");
    yield takeLatest(GET_USERS_TABLE_DATA, getUsersData)
}

function* settingsSaga() {
    yield all([fork(watchGetSettingsUsersData)]);
}

export default settingsSaga;