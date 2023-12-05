
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects"
import { GET_COMPANYDETAILS_DATA, GET_FCL_SURCHARGE_TABLE_DATA, GET_USERS_TABLE_DATA } from "./actiontype"
import { getUsersDataSuccess, getUsersDataFail, getCompanyDetailsDataFail, getCompanyDetailsDataSuccess, getFclSurchargeDataSuccess, getFclSurchargeDataFail } from "./actions"
import { getCompanyDetails, getFCLSurcharge, getSettingsUsers } from "../../helpers/fakebackend_helper"

function* getUsersData(){
    try {
        const response = yield call(getSettingsUsers)
        yield put(getUsersDataSuccess(response))
    } catch (error) {
        yield put(getUsersDataFail(error))
    }
}

function* getCompanyDetailsData(){
    try {
        const response = yield call(getCompanyDetails)
        yield put(getCompanyDetailsDataSuccess(response))
    } catch (error) {
        yield put(getCompanyDetailsDataFail(error))
    }
}

// ocean surcharge data 
function* getFclSurchargeData(){
    try {
        const response = yield call(getFCLSurcharge)
        yield put(getFclSurchargeDataSuccess(response))
    } catch (error) {
        yield put(getFclSurchargeDataFail(error))
    }
}



export function* watchGetSettingsUsersData(){
    yield takeLatest(GET_USERS_TABLE_DATA, getUsersData)
    yield takeLatest(GET_COMPANYDETAILS_DATA, getCompanyDetailsData)
    yield takeLatest(GET_FCL_SURCHARGE_TABLE_DATA, getFclSurchargeData)
}

function* settingsSaga() {
    yield all([fork(watchGetSettingsUsersData)]);
}

export default settingsSaga;