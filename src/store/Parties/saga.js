
import { all, call, fork, put, takeLatest } from "redux-saga/effects"
import { getPartiesCustomers, getPartiesVendors } from "../../helpers/fakebackend_helper"
import { getCustomersDataFail, getCustomersDataSuccess, getVendorsDataFail, getVendorsDataSuccess } from "./actions"
import { GET_CUSTOMERS_TABLE_DATA, GET_VENDORS_TABLE_DATA } from "./actiontype"

function* getCustomersData(){
    try {
        const response = yield call(getPartiesCustomers)
        yield put(getCustomersDataSuccess(response))
    } catch (error) {
        yield put(getCustomersDataFail(error))
    }
}

function* getVendorsData(){
    try {
        const response = yield call(getPartiesVendors)
        yield put(getVendorsDataSuccess(response))
    } catch (error) {
        yield put(getVendorsDataFail(error))
    }
}



export function* watchGetPartiesCustomersData(){
    yield takeLatest(GET_CUSTOMERS_TABLE_DATA, getCustomersData)
    yield takeLatest(GET_VENDORS_TABLE_DATA, getVendorsData)
}

function* partiesSaga() {
    yield all([fork(watchGetPartiesCustomersData)]);
}

export default partiesSaga;