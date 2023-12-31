import { all, call, fork, takeLatest } from "redux-saga/effects";
import { UPLOAD_CUSTOMER_CONTACT_TYPE } from "./actiontype";
import { showErrorToast, showSuccessToast } from "../../../components/Common/CustomToast";
import { postCustomerContactSer } from "../../../helpers/services/PartiesService";

function* postCustomerContactSaga({ payload: { data } }) {
    console.log(data, "data saga customer")
    try {
        const response = yield call(postCustomerContactSer, data);
        console.log(response, "response customer contact");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}

function* watchPartiesCustomerSaga(){
    yield takeLatest(UPLOAD_CUSTOMER_CONTACT_TYPE, postCustomerContactSaga)
}

function* partiesCustomerSaga(){
    yield all([fork(watchPartiesCustomerSaga)]);
}

export default partiesCustomerSaga;