import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";
import { getAirConsoleTableData, getAirwaybillTableData, getLCLTableData } from "../../helpers/fakebackend_helper";
import { getFCLDestinationData, getFCLFreightViewData, getFCLInlandFreightSer, getFCLInlandSurchargeSer, getFCLInlandTableData, getFCLSurchargeViewData, getFCLTableData, getPortLocalChargesTableData, postFclFreightUploadSer, postFclInlandFreightUploadSer, postFclInlandSurchargeUploadSer, postFclInlandUploadSer, postFclPLUploadSer, postFclSurchargeUploadSer, postFclUploadSer } from "../../helpers/services/FCLService";
import { getAirConsoleDataSuccessById, getAirwaybillDataByIdResponse,getAirConsoleDataFail, getAirConsoleDataSuccess, getAirwaybillDataFail, getAirwaybillDataSuccess, getFclDataFail, getFclDataSuccess, getInLandDataFail, getInLandDataSuccess, getLclDataFail, getLclDataSuccess, getPortLocalChargesDataFail, getPortLocalChargesDataSuccess } from "./actions";
import {POST_CARRIER_DATA_CONSOLE , GET_CONSOLE_TABLE_DATA_BY_ID,GET_UPLOAD_STATUS_SUCCESS,GET_UPLOAD_STATUS,GET_WAYBILL_TABLE_DATA_BY_ID, POST_CARRIER_DATA,FCL_FREIGHT_FAILD_DATA_TYPE, FCL_FREIGHT_FAILD_POPUP_TYPE, GET_CONSOLE_TABLE_DATA, GET_FCL_CHARGE_ID, GET_FCL_DESTINATION_DATA, GET_FCL_DESTINATION_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_DATA, GET_FCL_FREIGHT_VIEW_DATA_SUCCESS, GET_FCL_FREIGHT_VIEW_LOADER, GET_FCL_INLAND_CHARGE_ID, GET_FCL_INLAND_FREIGHT_ACTION, GET_FCL_INLAND_FREIGHT_ACTION_SUCCESS, GET_FCL_INLAND_FREIGHT_LOADER, GET_FCL_INLAND_LOADER, GET_FCL_INLAND_SURCHARGE_ACTION, GET_FCL_INLAND_SURCHARGE_ACTION_SUCCESS, GET_FCL_INLAND_SURCHARGE_LOADER, GET_FCL_INLAND_TABLE_DATA, GET_FCL_LOADER, GET_FCL_SURCHARGE_VIEW_DATA, GET_FCL_SURCHARGE_VIEW_DATA_SUCCESS, GET_FCL_SURCHARGE_VIEW_LOADER, GET_FCL_TABLE_DATA, GET_LCL_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA, GET_WAYBILL_TABLE_DATA, UPDATE_FCL_ACTIVE_TAB, UPDATE_INLAND_ACTIVE_TAB, UPLOAD_FCL_CARRIER_DATA, UPLOAD_FCL_FREIGHT, UPLOAD_FCL_INLAND_CARRIER_DATA, UPLOAD_FCL_INLAND_FREIGHT_DATA, UPLOAD_FCL_INLAND_SURCHARGE_DATA, UPLOAD_FCL_PORTLOCALCHARGES, UPLOAD_FCL_SURCHARGE } from "./actiontype";
import { GetFileSer } from "../../helpers/services/GlobalService";
import { Get_File_URL } from "../../helpers/url_helper";


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
        showSuccessToast("Update Successfully");
        yield put({type: GET_FCL_CHARGE_ID, payload: response?.id});
        yield put({type: UPDATE_FCL_ACTIVE_TAB, payload: {tab: 2}});
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}

function* postAirUploadSaga({ payload: { dataObj } }) {
    try {
        console.log("postAirUploadSaga");
        console.log(dataObj);
        const response = yield call(postAirUploadService, dataObj.newData.carrierData);     
        let formData = dataObj.newData.formData;
        let id = response.id;
        const fileUpload = yield call(uploadAirRateData,{formData,id});    
        showSuccessToast("Update Successfully");
        // yield put({type: GET_FCL_CHARGE_ID, payload: response?.id});
        // yield put({type: UPDATE_FCL_ACTIVE_TAB, payload: {tab: 2}});
    } catch (error) {
        showErrorToast(error?.message);
    }
}


function* postAirConsoleUploadSaga({ payload: { dataObj } }) {
    try {
        console.log("postAirConsoleUploadSaga");
        console.log(dataObj);
        const response = yield call(postAirConsoleUploadService, dataObj.newData.consoleCarrierDetails);     
        let formData = dataObj.newData.formData;
        let id = response.id;
        const fileUpload = yield call(uploadConsoleAirRateData,{formData,id});    
        showSuccessToast("Update Successfully");
        // yield put({type: GET_FCL_CHARGE_ID, payload: response?.id});
        // yield put({type: UPDATE_FCL_ACTIVE_TAB, payload: {tab: 2}});
    } catch (error) {
        showErrorToast(error?.message);
    }
}


function* postFclFreightUploadSaga({ payload: { formData, id } }) {
    console.log(formData.get("file"), "formData");
    try {
        const response = yield call(postFclFreightUploadSer, {formData, id});
        showSuccessToast("Update Successfully");
        const destRes = yield call(getFCLDestinationData, id);
        console.log(response, "response surcharge");
        yield put({type: GET_FCL_DESTINATION_DATA_SUCCESS, payload: destRes});
        yield put({type: UPDATE_FCL_ACTIVE_TAB, payload: {tab: 3}});
    } catch (error) {
        // console.log(error, "error");
        if(error?.response?.status === 400){
            const downloadFile = error?.response?.data?.filePath;
            var rest = downloadFile.substring(0, downloadFile.lastIndexOf("/") + 1);
            var last = downloadFile.substring(downloadFile.lastIndexOf("/") + 1, downloadFile.length);
            const base64Encoded = window.btoa(last);
            // const base64Encoded = Buffer.from(imageData, 'binary').toString('base64');
            if(downloadFile !== undefined && downloadFile !== ''){
                const resImageData = yield call(GetFileSer, base64Encoded);
                console.log(resImageData,"resImageData");
    
                yield put({type: FCL_FREIGHT_FAILD_DATA_TYPE, payload: {data: error?.response?.data,url: `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`, file: resImageData, filename: last}});
            }
            yield put({type: FCL_FREIGHT_FAILD_POPUP_TYPE, payload: true});
        }
        showErrorToast(error?.response?.data?.description);
    }
}
function* postFclSurchargeUploadSaga({ payload: { data, id } }) {
    try {
        const response = yield call(postFclSurchargeUploadSer, {data, id});
        console.log(response, "response surcharge");
        showSuccessToast("Update Successfully");
        yield put({type: UPDATE_FCL_ACTIVE_TAB, payload: {tab: 1}});
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
    }
}

// ------------------ FCL Port & Local Charges ------------------
function* fetchPLChargesData() {
    yield put({type: GET_FCL_PLCHARGES_LOADER, payload: true});
    try {
        const response = yield call(getPortLocalChargesTableData);
        console.log("response", response)
        yield put(getPortLocalChargesDataSuccess(response));
        yield put({type: GET_FCL_PLCHARGES_LOADER, payload: false});
    } catch (error) {
        yield put(getPortLocalChargesDataFail(error));
        yield put({type: GET_FCL_PLCHARGES_LOADER, payload: false});
    }
}
function* postPLChargesData({payload: { dataObj }}) {
    try {
        const response = yield call(postFclPLUploadSer, dataObj);        
        console.log(response, "response port local");
        // yield put({type: GET_FCL_CHARGE_ID, payload: response?.id});
        showSuccessToast("Update Successfully");
    } catch (error) {
        showErrorToast(error?.response?.data?.message);
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
        yield put({type: UPDATE_INLAND_ACTIVE_TAB, payload: {tab: 2}});
        showSuccessToast("Update Successfully");
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.response?.data?.message);
    }
}
function* postFCLInLandFreightSaga({ payload: { formData, id } }) {
    try {
        const response = yield call(postFclInlandFreightUploadSer, {formData, id});
        console.log(response, "response inland");
        showSuccessToast("Update Successfully");
        yield put({type: UPDATE_INLAND_ACTIVE_TAB, payload: {tab: 3}});
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
        yield put({type: UPDATE_INLAND_ACTIVE_TAB, payload: {tab: 1}});
    } catch (error) {
        console.log(error, "error");
        showErrorToast(error?.response?.data?.message);
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
        const response = yield call(getAirMWBData);
        yield put(getAirwaybillDataSuccess(response));
    } catch (error) {
        yield put(getAirwaybillDataFail(error));
    }
}

function* fetchAirConsoleData() {
    try {
        const response = yield call(fetcAirConsoleTableData);
        yield put(getAirConsoleDataSuccess(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}



function* fetchAirConsoleDataById({ payload: { id } }) {
    try {
        const response = yield call(fetcAirFreighConsoletData, id);
        yield put(getAirConsoleDataSuccessById(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}

function* fetchAirFreightData({ payload: { id } }) {
    try {
        const response = yield call(getAirFreightData, id);
        yield put(getAirwaybillDataByIdResponse(response));
    } catch (error) {
        yield put(getAirConsoleDataFail(error));
    }
}

function* fetchUploadStatusData() {
    try {
        const response = yield call(getUploadStatus);
        console.log(response, "response destination data");
        yield put({type: GET_UPLOAD_STATUS_SUCCESS, payload: response})
    } catch (error) {
        console.log("error", error);
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
    yield takeEvery(GET_CONSOLE_TABLE_DATA_BY_ID, fetchAirConsoleDataById);

    yield takeEvery(GET_WAYBILL_TABLE_DATA_BY_ID,fetchAirFreightData )

    yield takeEvery(POST_CARRIER_DATA, postAirUploadSaga);

    yield takeEvery(GET_UPLOAD_STATUS, fetchUploadStatusData);

    yield takeEvery(POST_CARRIER_DATA_CONSOLE, postAirConsoleUploadSaga);
}

function* procurementSaga() {
    yield all([fork(watchGetProcureData)]);
}

export default procurementSaga;