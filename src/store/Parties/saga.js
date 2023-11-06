
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects"
import { GET_COMPANYDETAILS_DATA, GET_CUSTOMERS_TABLE_DATA, GET_USERS_TABLE_DATA } from "./actiontype"
import { getUsersDataSuccess, getUsersDataFail, getCompanyDetailsDataFail, getCompanyDetailsDataSuccess, getCustomersDataSuccess, getCustomersDataFail } from "./actions"
import { getCompanyDetails, getPartiesCustomers } from "../../helpers/fakebackend_helper"

function* getCustomersData(){
    try {
        const response = yield call(getPartiesCustomers)
        // console.log(response,"<---surcharge response");
        yield put(getCustomersDataSuccess(response))
    } catch (error) {
        yield put(getCustomersDataFail(error))
    }
}

// function* getCompanyDetailsData(){
//     try {
//         const response = yield call(getCompanyDetails)
//         // console.log(response,"<---surcharge response");
//         yield put(getCompanyDetailsDataSuccess(response))
//     } catch (error) {
//         yield put(getCompanyDetailsDataFail(error))
//     }
// }



export function* watchGetPartiesCustomersData(){
    // console.log("here");
    yield takeLatest(GET_CUSTOMERS_TABLE_DATA, getCustomersData)
    // yield takeLatest(GET_COMPANYDETAILS_DATA, getCompanyDetailsData)
}

function* partiesSaga() {
    yield all([fork(watchGetPartiesCustomersData)]);
}

export default partiesSaga;