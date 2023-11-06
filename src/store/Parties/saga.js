
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects"
import { GET_COMPANYDETAILS_DATA, GET_CUSTOMERS_TABLE_DATA, GET_USERS_TABLE_DATA, GET_VENDORS_TABLE_DATA } from "./actiontype"
import { getUsersDataSuccess, getUsersDataFail, getCompanyDetailsDataFail, getCompanyDetailsDataSuccess, getCustomersDataSuccess, getCustomersDataFail, getVendorsDataFail, getVendorsDataSuccess } from "./actions"
import { getCompanyDetails, getPartiesCustomers, getPartiesVendors } from "../../helpers/fakebackend_helper"

function* getCustomersData(){
    try {
        const response = yield call(getPartiesCustomers)
        // console.log(response,"<---surcharge response");
        yield put(getCustomersDataSuccess(response))
    } catch (error) {
        yield put(getCustomersDataFail(error))
    }
}

function* getVendorsData(){
    try {
        const response = yield call(getPartiesVendors)
        // console.log(response,"<---surcharge response");
        yield put(getVendorsDataSuccess(response))
    } catch (error) {
        yield put(getVendorsDataFail(error))
    }
}



export function* watchGetPartiesCustomersData(){
    // console.log("here");
    yield takeLatest(GET_CUSTOMERS_TABLE_DATA, getCustomersData)
    yield takeLatest(GET_VENDORS_TABLE_DATA, getVendorsData)
}

function* partiesSaga() {
    yield all([fork(watchGetPartiesCustomersData)]);
}

export default partiesSaga;