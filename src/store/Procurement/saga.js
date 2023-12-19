import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";
import { getAirConsoleTableData, getAirwaybillTableData, getLCLTableData } from "../../helpers/fakebackend_helper";
import { getFCLDestinationData, getFCLFreightViewData, getFCLInlandFreightSer, getFCLInlandSurchargeSer, getFCLInlandTableData, getFCLSurchargeViewData, getFCLTableData, getPortLocalChargesTableData, postFclFreightUploadSer, postFclInlandFreightUploadSer, postFclInlandSurchargeUploadSer, postFclInlandUploadSer, postFclPLUploadSer, postFclSurchargeUploadSer, postFclUploadSer } from "../../helpers/services/FCLService";
import { getAirConsoleDataFail, getAirConsoleDataSuccess, getAirwaybillDataFail, getAirwaybillDataSuccess, getFclDataFail, getFclDataSuccess, getInLandDataFail, getInLandDataSuccess, getLclDataFail, getLclDataSuccess, getPortLocalChargesDataFail, getPortLocalChargesDataSuccess } from "./actions";
import { GET_CONSOLE_TABLE_DATA, GET_FCL_CHARGE_ID, GET_FCL_DESTINATION_DATA, GET_FCL_DESTINATION_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_DATA, GET_FCL_FREIGHT_VIEW_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_LOADER, GET_FCL_INLAND_CHARGE_ID, GET_FCL_INLAND_FREIGHT_ACTION, GET_FCL_INLAND_FREIGHT_ACTION_SUCCESS, GET_FCL_INLAND_FREIGHT_LOADER, GET_FCL_INLAND_LOADER, GET_FCL_INLAND_SURCHARGE_ACTION, GET_FCL_INLAND_SURCHARGE_ACTION_SUCCESS, GET_FCL_INLAND_SURCHARGE_LOADER, GET_FCL_INLAND_TABLE_DATA, GET_FCL_LOADER, GET_FCL_SURCHARGE_VIEW_DATA, GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, GET_FCL_SURCHARGE_VIEW_LOADER, GET_FCL_TABLE_DATA, GET_LCL_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA, GET_WAYBILL_TABLE_DATA, UPLOAD_FCL_CARRIER_DATA, UPLOAD_FCL_FREIGHT, UPLOAD_FCL_INLAND_CARRIER_DATA, UPLOAD_FCL_INLAND_FREIGHT_DATA, UPLOAD_FCL_INLAND_SURCHARGE_DATA, UPLOAD_FCL_PORTLOCALCHARGES, UPLOAD_FCL_SURCHARGE } from "./actiontype";

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
function* fetchPLChargesData() {
    try {
        const response = yield call(getPortLocalChargesTableData);
        console.log("response", response)
        yield put(getPortLocalChargesDataSuccess(response));
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
    }
}
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

// FCL Inland charges
function* fetchFCLInLandData() {
    yield put ({type: GET_FCL_INLAND_LOADER, payload: true});
    try {
        const response = yield call(getFCLInlandTableData);
        yield put ({type: GET_FCL_INLAND_LOADER, payload: false});
        yield put(getInLandDataSuccess(response));
    } catch (error) {
        yield put ({type: GET_FCL_INLAND_LOADER, payload: false});
        yield put(getInLandDataFail(error));
    }
}
function* fetchFCLInLandFreightSaga({ payload: { id } }) {
    yield put ({type: GET_FCL_INLAND_FREIGHT_LOADER, payload: true});
    try {
        const response = yield call(getFCLInlandFreightSer, id);
        yield put ({type: GET_FCL_INLAND_FREIGHT_LOADER, payload: false});
        yield put({type: GET_FCL_INLAND_FREIGHT_ACTION_SUCCESS, payload: response});
    } catch (error) {
        console.log("error freight", error);
        yield put ({type: GET_FCL_INLAND_FREIGHT_LOADER, payload: false});
    }
}
function* fetchFCLInLandSurchargeSaga({ payload: { id } }) {
    yield put ({type: GET_FCL_INLAND_SURCHARGE_LOADER, payload: true});
    try {
        const response = yield call(getFCLInlandSurchargeSer, id);
        yield put ({type: GET_FCL_INLAND_SURCHARGE_LOADER, payload: false});
        yield put({type: GET_FCL_INLAND_SURCHARGE_ACTION_SUCCESS, payload: response});
    } catch (error) {
        console.log("error surcharge", error);
        yield put ({type: GET_FCL_INLAND_SURCHARGE_LOADER, payload: false});
    }
}
function* postFCLInLandSaga({ payload: { dataObj } }) {
    try {
        const response = yield call(postFclInlandUploadSer, dataObj);
        console.log(response, "response inland");
        yield put({type: GET_FCL_INLAND_CHARGE_ID, payload: {id:response?.id, version: response?.version}});
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}
function* postFCLInLandFreightSaga({ payload: { formData, id } }) {
    try {
        const response = yield call(postFclInlandFreightUploadSer, {formData, id});
        console.log(response, "response inland");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.message);
    }
}
function* postFCLInLandSurchargeSaga({ payload: { data } }) {
    try {
        const response = yield call(postFclInlandSurchargeUploadSer, data);
        console.log(response, "response inland");
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
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

    yield takeEvery(GET_FCL_INLAND_TABLE_DATA, fetchFCLInLandData);
    yield takeEvery(GET_FCL_INLAND_FREIGHT_ACTION, fetchFCLInLandFreightSaga);
    yield takeEvery(GET_FCL_INLAND_SURCHARGE_ACTION, fetchFCLInLandSurchargeSaga);
    yield takeEvery(UPLOAD_FCL_INLAND_CARRIER_DATA, postFCLInLandSaga);
    yield takeEvery(UPLOAD_FCL_INLAND_FREIGHT_DATA, postFCLInLandFreightSaga);
    yield takeEvery(UPLOAD_FCL_INLAND_SURCHARGE_DATA, postFCLInLandSurchargeSaga);


    yield takeEvery(GET_LCL_TABLE_DATA, fetchLclData)
    yield takeEvery(GET_WAYBILL_TABLE_DATA, fetchWaybillData);
    yield takeEvery(GET_CONSOLE_TABLE_DATA, fetchAirConsoleData);
}

function* procurementSaga() {
    yield all([fork(watchGetProcureData)]);
}

export default procurementSaga;