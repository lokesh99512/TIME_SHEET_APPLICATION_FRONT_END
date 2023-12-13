import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";
import { getAirConsoleTableData, getAirwaybillTableData, getInlandTableData, getLCLTableData, getPortLocalChargesTableData } from "../../helpers/fakebackend_helper";
import { getFCLDestinationData, getFCLFreightViewData, getFCLSurchargeViewData, getFCLTableData, postFclFreightUploadSer, postFclPLUploadSer, postFclSurchargeUploadSer, postFclUploadSer } from "../../helpers/services/FCLService";
import { getAirConsoleDataFail, getAirConsoleDataSuccess, getAirwaybillDataFail, getAirwaybillDataSuccess, getFclDataFail, getFclDataSuccess, getInLandDataFail, getInLandDataSuccess, getLclDataFail, getLclDataSuccess, getPortLocalChargesDataFail, getPortLocalChargesDataSuccess } from "./actions";
import { GET_CONSOLE_TABLE_DATA, GET_FCL_CHARGE_ID, GET_FCL_DESTINATION_DATA, GET_FCL_DESTINATION_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_DATA, GET_FCL_FREIGHT_VIEW_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_LOADER, GET_FCL_LOADER, GET_FCL_SURCHARGE_VIEW_DATA, GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, GET_FCL_SURCHARGE_VIEW_LOADER, GET_FCL_TABLE_DATA, GET_INLAND_TABLE_DATA, GET_LCL_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA, GET_WAYBILL_TABLE_DATA, UPLOAD_FCL_CARRIER_DATA, UPLOAD_FCL_FREIGHT, UPLOAD_FCL_PORTLOCALCHARGES, UPLOAD_FCL_SURCHARGE } from "./actiontype";

function* fetchFclData() {
    yield put({type: GET_FCL_LOADER, payload: true});
    try {
        const response = yield call(getFCLTableData); 
        yield put({type: GET_FCL_LOADER, payload: false});
        yield put(getFclDataSuccess(response))
    } catch (error) {
        yield put({type: GET_FCL_LOADER, payload: false});
        yield put(getFclDataFail(error))
    }
}
function* fetchFclFreightViewData({ payload }) {
    yield put({type: GET_FCL_FREIGHT_VIEW_LOADER, payload: true});
    try {
        const response = yield call(getFCLFreightViewData, payload);
        yield put({type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false});
        yield put({type: GET_FCL_FREIGHT_VIEW_DATA_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_FCL_FREIGHT_VIEW_LOADER, payload: false});
        console.log("error", error);
    }
}
function* fetchFclSurchargeViewData({ payload }) {
    yield put({type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: true});
    try {
        const response = yield call(getFCLSurchargeViewData, payload);
        yield put({type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: false});
        yield put({type: GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_FCL_SURCHARGE_VIEW_LOADER, payload: false});
        console.log("error", error);
    }
}
function* fetchFclDestinationData({ payload }) {
    try {
        const response = yield call(getFCLDestinationData, payload);
        console.log(response, "response destination data");
        yield put({type: GET_FCL_DESTINATION_DATA_SUCCESS, payload: response})
    } catch (error) {
        console.log("error", error);
    }
}
function* postFclUploadSaga({ payload: { dataObj } }) {
    try {
        const response = yield call(postFclUploadSer, dataObj);        
        yield put({type: GET_FCL_CHARGE_ID, payload: response?.id});
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.message);
    }
}
function* postFclFreightUploadSaga({ payload: { formData, id } }) {
    try {
        const response = yield call(postFclFreightUploadSer, {formData, id});
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}
function* postFclSurchargeUploadSaga({ payload: { data, id } }) {
    try {
        const response = yield call(postFclSurchargeUploadSer, {data, id});
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}

// ------------------ FCL Port & Local Charges ------------------
function* postPLChargesData({payload: { dataObj }}) {
    console.log(dataObj, "dataObj");
    try {
        const response = yield call(postFclPLUploadSer, dataObj);        
        console.log(response, "response port local");
        // yield put({type: GET_FCL_CHARGE_ID, payload: response?.id});
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error port local");
        showErrorToast(error?.message);
    }
}

function* fetchLclData() {
    try {
        const response = yield call(getLCLTableData);
        yield put(getLclDataSuccess(response));
    } catch (error) {
        yield put(getLclDataFail(error));
    }
}

function* fetchPLChargesData() {
    try {
        const response = yield call(getPortLocalChargesTableData);
        yield put(getPortLocalChargesDataSuccess(response));
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
    }
}

function* fetchWaybillData() {
    try {
        const response = yield call(getAirwaybillTableData);
        yield put(getAirwaybillDataSuccess(response));
    } catch (error) {
        yield put(getAirwaybillDataFail(error));
    }
}

function* fetchAirConsoleData() {
    try {
        const response = yield call(getAirConsoleTableData);
        yield put(getAirConsoleDataSuccess(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}

function* fetchInLandData() {
    try {
        const response = yield call(getInlandTableData);
        yield put(getInLandDataSuccess(response));
    } catch (error) {
        yield put(getInLandDataFail(error));
    }
}

export function* watchGetProcureData() {
    yield takeEvery(GET_FCL_TABLE_DATA, fetchFclData);
    yield takeEvery(GET_FCL_FREIGHT_VIEW_DATA, fetchFclFreightViewData);
    yield takeEvery(GET_FCL_SURCHARGE_VIEW_DATA, fetchFclSurchargeViewData);
    yield takeEvery(GET_FCL_DESTINATION_DATA, fetchFclDestinationData);
    yield takeEvery(UPLOAD_FCL_CARRIER_DATA, postFclUploadSaga);
    yield takeEvery(UPLOAD_FCL_FREIGHT, postFclFreightUploadSaga);
    yield takeEvery(UPLOAD_FCL_SURCHARGE, postFclSurchargeUploadSaga);

    yield takeEvery(UPLOAD_FCL_PORTLOCALCHARGES, postPLChargesData);
    yield takeEvery(GET_PORTLOCALCHARGES_TABLE_DATA, fetchPLChargesData);

    yield takeEvery(GET_LCL_TABLE_DATA, fetchLclData)
    yield takeEvery(GET_WAYBILL_TABLE_DATA, fetchWaybillData);
    yield takeEvery(GET_CONSOLE_TABLE_DATA, fetchAirConsoleData);
    yield takeEvery(GET_INLAND_TABLE_DATA, fetchInLandData)
}

function* procurementSaga() {
    yield all([fork(watchGetProcureData)]);
}

export default procurementSaga;