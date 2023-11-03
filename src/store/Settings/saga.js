
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects"
import { GET_COMPANYDETAILS_DATA, GET_USERS_TABLE_DATA } from "./actiontype"
import { getUsersDataSuccess, getUsersDataFail, getCompanyDetailsDataFail, getCompanyDetailsDataSuccess } from "./actions"
import { getCompanyDetails, getSettingsUsers } from "../../helpers/fakebackend_helper"

function* getUsersData(){
    try {
        const response = yield call(getSettingsUsers)
        // console.log(response,"<---surcharge response");
        yield put(getUsersDataSuccess(response))
    } catch (error) {
        yield put(getUsersDataFail(error))
    }
}

function* getCompanyDetailsData(){
    try {
        const response = yield call(getCompanyDetails)
        // console.log(response,"<---surcharge response");
        yield put(getCompanyDetailsDataSuccess(response))
    } catch (error) {
        yield put(getCompanyDetailsDataFail(error))
    }
}



export function* watchGetSettingsUsersData(){
    // console.log("here");
    yield takeLatest(GET_USERS_TABLE_DATA, getUsersData)
    yield takeLatest(GET_COMPANYDETAILS_DATA, getCompanyDetailsData)
}

function* settingsSaga() {
    yield all([fork(watchGetSettingsUsersData)]);
}

export default settingsSaga;