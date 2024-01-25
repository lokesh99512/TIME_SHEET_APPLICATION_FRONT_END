import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { showErrorToast, showSuccessToast } from "../../../components/Common/CustomToast";
import { getCustomerDataSer, postCustomerCompanySer, postCustomerContactSer, postCustomerDocSer } from "../../../helpers/services/PartiesService";
import { GET_CUSTOMERS_ID, GET_PARTIES_CUSTOMER_DETAILS_TYPE, GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS, UPLOAD_CUSTOMER_COMPANYDATA_TYPE, UPLOAD_CUSTOMER_CONTACT_TYPE, UPLOAD_CUSTOMER_DOCUMENT_TYPE } from "./actiontype";
import axios from "axios";
import { Get_File_URL } from "../../../helpers/url_helper";

function* fetchPartiesCustomerSaga() {
    try {
        const response = yield call(getCustomerDataSer);
        console.log(response, "reponse into getAllPartiesCompanySettings");
        if (response && response.content && response.content) {
            response?.content?.forEach(element => {
                let imageData = element.logoPath;
                const base64Encoded = window.btoa(imageData);
                element.logo =(!!(imageData)? `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`:'');
            });
        }
        yield put({ type: GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS, payload: response });
    } catch (error) {
        console.log(error, "saga getAllCompanySettings api error");
    }
}
function* postCustomerCompanySaga({ payload: { data } }) {
    try {
        console.log("payload getPartiesCustomerAddDetailsData", data);
        const response = yield call(postCustomerCompanySer, data);
        console.log(response, "response of getCompanyDetailsData");
        yield put({ type: GET_CUSTOMERS_ID, payload: { id: response?.id, version: response?.version } });
        showSuccessToast("Customer Details Added Successfully");
    } catch (error) {
        showErrorToast(error?.message);
        console.log(error, "saga login api error");
    }
}
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
function* postCustomerDocumentSaga({ payload: { data } }) {
    console.log(data, "data saga customer document")
    try {
        const results = yield all(
            data?.documents?.map((formData) => call(postCustomerDocSer, formData))
        );
        console.log(results, "results customer document");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}

function* watchPartiesCustomerSaga() {
    yield takeLatest(GET_PARTIES_CUSTOMER_DETAILS_TYPE, fetchPartiesCustomerSaga);
    yield takeLatest(UPLOAD_CUSTOMER_COMPANYDATA_TYPE, postCustomerCompanySaga);
    yield takeLatest(UPLOAD_CUSTOMER_CONTACT_TYPE, postCustomerContactSaga);
    yield takeEvery(UPLOAD_CUSTOMER_DOCUMENT_TYPE, postCustomerDocumentSaga);
}

function* partiesCustomerSaga() {
    yield all([fork(watchPartiesCustomerSaga)]);
}

export default partiesCustomerSaga;