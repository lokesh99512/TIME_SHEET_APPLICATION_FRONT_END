import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { GET_VENDOR_DETAILS_ID, GET_VENDOR_LIST_SUCCESS, GET_VENDOR_LIST_TYPE, UPLOAD_VENDOR_CONTACT_TYPE, UPLOAD_VENDOR_DETAILS_TYPE, UPLOAD_VENDOR_DOCUMENT_TYPE, VENDOR_LOADER_TYPE, VENDOR_TAB_ACTIVE_TYPE } from "./actiontype";
import { getPartiesAllVendorTable } from "../../../helpers/services/AuthService";
import { postVenderCompanySer, postVenderDocumentSer, postVenderUpload, postVendorContactSer } from "../../../helpers/services/PartiesService";
import { showErrorToast, showSuccessToast } from "../../../components/Common/CustomToast";
import { UPLOAD_VENDOR_DOCUMENT_URL } from "../../../helpers/url_helper";


function* fetchVendorListSaga() {
    yield put({ type: VENDOR_LOADER_TYPE, payload: true });
    try {
        const response = yield call(getPartiesAllVendorTable);
        console.log(response, "reponse into getAllPartiesCompanySettings");
        yield put({ type: GET_VENDOR_LIST_SUCCESS, payload: response });
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
    } catch (error) {
        yield put({ type: VENDOR_LOADER_TYPE, payload: false });
        console.log(error, "saga getAllCompanySettings api error");
    }
}
function* postVenderDataSaga({ payload: { formData } }) {

    try {
        const response = yield call(postVenderCompanySer, formData);
        console.log(response, "response vender data");
        yield put({ type: GET_VENDOR_DETAILS_ID, payload: { id: response?.id, version: response?.version } });
        yield put({type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 2, details: 'success',contact: 'pending', document: 'pending' }});
        showSuccessToast("Add Vender Successfully");
    } catch (error) {
        yield put({type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 1, details: 'error', contact: 'pending', document: 'pending' }});
        console.log(error, "saga add vender api error");
        showErrorToast(error?.message);
    }
}

function* postVenderContactSaga({ payload: { data } }) {
    console.log(data, "data saga vendor")
    try {
        const response = yield call(postVendorContactSer, data);
        console.log(response,"response vendor contact details")
        yield put({type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 3, details: 'success', contact: 'success', document: 'pending' }});
        showSuccessToast("Update Contacts Successfully");
    } catch (error) {
        console.log(error, "error");
        yield put({type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 2, details: 'success', contact: 'error', document: 'pending' }});
        showErrorToast(error?.message);
    }
}
function* postVenderDocumentSaga({ payload: { data } }) {
    console.log(data, "data saga Vendor document")
    try {
        const results = yield all(
            data?.documents?.map((formData) => call(postVenderDocumentSer, formData))
        );
        console.log(results, "results Vendor document");
        yield put({type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 1, details: 'success', contact: 'success', document: 'success' }});
        showSuccessToast("Update Document Successfully");
    } catch (error) {
        console.log(error, "error");
        yield put({type: VENDOR_TAB_ACTIVE_TYPE, payload: { tab: 3, details: 'success', contact: 'success', document: 'error' }});
        showErrorToast(error?.message);
    }
}

function* watchPartiesVendorSaga() {
    yield takeLatest(GET_VENDOR_LIST_TYPE, fetchVendorListSaga);
    yield takeLatest(UPLOAD_VENDOR_DETAILS_TYPE, postVenderDataSaga);
    yield takeLatest(UPLOAD_VENDOR_CONTACT_TYPE, postVenderContactSaga);
    yield takeLatest(UPLOAD_VENDOR_DOCUMENT_TYPE, postVenderDocumentSaga);
}

function* partiesVendorSaga() {
    yield all([fork(watchPartiesVendorSaga)]);
}

export default partiesVendorSaga;