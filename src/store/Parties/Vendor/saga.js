import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { GET_VENDOR_DETAILS_ID, GET_VENDOR_LIST_SUCCESS, GET_VENDOR_LIST_TYPE, UPLOAD_VENDOR_DETAILS_TYPE, VENDOR_LOADER_TYPE } from "./actiontype";
import { getPartiesAllVendorTable } from "../../../helpers/services/AuthService";
import { postVenderCompanySer, postVenderUpload } from "../../../helpers/services/PartiesService";
import { showErrorToast, showSuccessToast } from "../../../components/Common/CustomToast";


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
        yield put({ type: GET_VENDOR_DETAILS_ID, payload: { id: response?.content?.id, version: response?.content?.version } });
        showSuccessToast("Add Vender Successfully");
    } catch (error) {
        console.log(error, "saga add vender api error");
        showErrorToast(error?.message);
    }
}

function* watchPartiesVendorSaga() {
    yield takeLatest(GET_VENDOR_LIST_TYPE, fetchVendorListSaga);
    yield takeLatest(UPLOAD_VENDOR_DETAILS_TYPE, postVenderDataSaga);
}

function* partiesVendorSaga() {
    yield all([fork(watchPartiesVendorSaga)]);
}

export default partiesVendorSaga;