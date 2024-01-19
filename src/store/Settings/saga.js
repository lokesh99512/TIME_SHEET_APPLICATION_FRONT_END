import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  GET_ALL_COMPANY_SETTINGS,
  GET_ALL_COMPANY_SETTINGS_SUCCESS,
  GET_ALL_SURCHARGE_CATEGORY,
  GET_ALL_SURCHARGE_CATEGORY_SUCCESS,
  GET_ALL_TENANT_LOCATION,
  GET_ALL_TENANT_LOCATION_SUCCESS,
  GET_ALL_TENANT_LOCATION_TYPE,
  GET_ALL_TENANT_LOCATION_TYPE_SUCCESS,
  GET_BUSINESS_DATA,
  GET_BUSINESS_DATA_SUCCESS,
  GET_COMPANYDETAILS_BASIC_DATA,
  GET_COMPANYDETAILS_BASIC_DATA_SUCCESS,
  GET_COMPANYDETAILS_DATA,
  GET_COMPANY_ADD_USERS_DATA,
  GET_COMPANY_ADD_USERS_DATA_SUCCESS,
  GET_COMPANY_CITY_DATA,
  GET_COMPANY_CITY_DATA_SUCCESS,
  GET_COMPANY_COUNTRY_DATA,
  GET_COMPANY_COUNTRY_DATA_SUCCESS,
  GET_COMPANY_PINCODE_DATA,
  GET_COMPANY_PINCODE_DATA_SUCCESS,
  GET_COMPANY_PIN_CODE_DATA_SUCCESS,
  GET_COMPANY_STATE_DATA,
  GET_COMPANY_STATE_DATA_SUCCESS,
  GET_FCL_SURCHARGE_TABLE_DATA,
  GET_PARTIES_CUSTOMERS_DETAILS,
  GET_PARTIES_CUSTOMERS_DETAILS_SUCCESS,
  GET_PARTIES_SURCHARGE_ALIAS_TABLE,
  GET_PARTIES_SURCHARGE_ALIAS_TABLE_SUCCESS,
  GET_PARTIES_SURCHARGE_TABLE,
  GET_PARTIES_SURCHARGE_TABLE_SUCCESS,
  GET_TAXES_DATA,
  GET_TAXES_DATA_SUCCESS,
  GET_USERS_LOADER_TYPE,
  GET_USERS_TABLE_DATA,
  GET_USERS_TABLE_DATA_SUCCESS,
  POST_SETTINGS_SURCHARGE_DATA,
  POST_SETTINGS_SURCHARGE_DATA_SUCCESS,
  POST_TENANT_LOCATION,
  POST_TENANT_LOCATION_SUCCESS,
  POST_TENANT_LOCATION_TYPE,
  POST_TENANT_LOCATION_TYPE_SUCCESS,
} from "./actiontype";
import {
  getUsersDataSuccess,
  getUsersDataFail,
  getCompanyDetailsDataFail,
  getCompanyDetailsDataSuccess,
  getFclSurchargeDataSuccess,
  getFclSurchargeDataFail,
} from "./actions";
import {
  getCompanyDetails,
  getFCLSurcharge,
  getSettingsUsers,
} from "../../helpers/fakebackend_helper";
import { COMPANY_BASIC_DETAILS, Get_File_URL } from "../../helpers/url_helper";
import {
  CompanyAllDetails,
  CompanyBasicDetailsAPI,
  CompanyBusinessDetails,
  CompanyCityDetails,
  CompanyCountryDetails,
  CompanyPinCodeBasicDetails,
  CompanyPincodeDetails,
  CompanyStateDetails,
  CompanyTaxDetails,
  CompanyUserAddDetails,
  CompanyUsersDetails,
  PartiesCustomerDetails,
  getAddSurchargeData,
  getAllSurchargeCategory,
  getPartiesSurchargeTable,
  getPartiesSurchargeTableAliasCode,
} from "../../helpers/services/AuthService";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/Common/CustomToast";
import { GetFileSer, postTenantLocation, getAllTenantLocationType, postTenantLocationType, getAllTenantLocation } from "../../helpers/services/GlobalService";
import axios from "axios";

function* getUsersData() {
  yield put({type: GET_USERS_LOADER_TYPE, payload: true});
  try {
    const response = yield call(CompanyUsersDetails);
    console.log(response, "saga getUsersData call in settings");
    yield put({ type: GET_USERS_TABLE_DATA_SUCCESS, payload: response });
    yield put({type: GET_USERS_LOADER_TYPE, payload: false});
  } catch (error) {
    yield put({type: GET_USERS_LOADER_TYPE, payload: false});
    console.log(error, "saga user api error");
  }
}

// Adduser in settings
function* getCompanyAddUserData({ payload }) {
  try {
    console.log("payload getCompanyAddUserData", payload);
    const response = yield call(CompanyUserAddDetails, payload);
    showSuccessToast("Add User Successfully");
    yield put({ type: GET_COMPANY_ADD_USERS_DATA_SUCCESS, payload: response.data, });
    const userList = yield call(CompanyUsersDetails);
    yield put({ type: GET_USERS_TABLE_DATA_SUCCESS, payload: userList });
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga Add user ");
  }
}

// function* getCompanyDetailsData(){
//     try {
//         const response = yield call(getCompanyDetails)
//         yield put(getCompanyDetailsDataSuccess(response))
//     } catch (error) {
//         yield put(getCompanyDetailsDataFail(error))
//     }
// }

function* getCompanyDetailsData({ payload }) {
  try {
    console.log("payload getCompanyDetailsData", payload);
    const response = yield call(CompanyBasicDetailsAPI, payload);
    console.log(response, "response of getCompanyDetailsData");
    yield put({
      type: GET_COMPANYDETAILS_BASIC_DATA_SUCCESS,
      payload: response,
    });
    showSuccessToast("Update Comapany Info successfully");
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga login api error");
  }
}

function* getCompanyCityDetails() {
  try {
    // console.log("payload getCompanyCityDetails", payload)
    const response = yield call(CompanyCityDetails);
    // console.log(response, "--respnse");
    yield put({ type: GET_COMPANY_CITY_DATA_SUCCESS, payload: response });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga city api error");
  }
}

// state into company
function* getCompanyStateDetails({ payload: { cityId } }) {
  try {
    // console.log("payload getCompanyCityDetails", payload)
    const response = yield call(() => CompanyStateDetails({ cityId }));
    // console.log(response, "--respnse")
    yield put({ type: GET_COMPANY_STATE_DATA_SUCCESS, payload: response });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga state api error");
  }
}
function* getCompanyCountryDetails({ payload: { cityId } }) {
  try {
    const response = yield call(() => CompanyCountryDetails({ cityId }));
    yield put({ type: GET_COMPANY_COUNTRY_DATA_SUCCESS, payload: response });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga state api error");
  }
}

function* getCompanyPincodeDetails({ payload: { cityId } }) {
  try {
    const response = yield call(() => CompanyPincodeDetails({ cityId }));
    yield put({ type: GET_COMPANY_PINCODE_DATA_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga state api error");
  }
}

// All taxes
function* getCompanyTaxDetails({ payload }) {
  try {
    const response = yield call(CompanyTaxDetails, payload);
    showSuccessToast("Update Tax Info successfully");
    yield put({ type: GET_TAXES_DATA_SUCCESS, payload: response });
  } catch (error) {
    showErrorToast(error?.message);
  }
}

// business type api call
function* getCompanyBusinessDeatilsData({ payload }) {
  try {
    const response = yield call(CompanyBusinessDetails, payload);
    showSuccessToast("Update Business Deatils successfully");
    yield put({ type: GET_BUSINESS_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    showErrorToast(error?.message);
  }
}

// get all company settings
function* getAllCompanySettings() {
  try {
    const response = yield call(CompanyAllDetails);
    // logo
    let imageData = response?.content?.[0]?.logoPath;
    
    const base64Encoded = window.btoa(imageData);

    const resImageData = yield call(GetFileSer, base64Encoded);

    if (response && response.content && response.content[0]) {
      response.content[0].logo = `${axios.defaults.baseURL}${Get_File_URL}${base64Encoded}`;
    }

    yield put({ type: GET_ALL_COMPANY_SETTINGS_SUCCESS, payload: { ...response, imageData: resImageData } });
  } catch (error) {
    console.log(error, "saga getAllCompanySettings api error");
  }
}

// parties customer details

// ocean surcharge data
function* getFclSurchargeData() {
  try {
    const response = yield call(getFCLSurcharge);
    yield put(getFclSurchargeDataSuccess(response));
  } catch (error) {
    yield put(getFclSurchargeDataFail(error));
  }
}

// all parties surcharge table api
function* getAllPartiesSurchargeTable() {
  try {
    const response = yield call(getPartiesSurchargeTable);
    console.log(response, "reponse into getAllPartiesCompanySettings");
    yield put({ type: GET_PARTIES_SURCHARGE_TABLE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getAllCompanySettings api error");
  }
}

// all parties surcharge table api
function* getAllPartiesSurchargeAliasTable() {
  try {
    const response = yield call(getPartiesSurchargeTableAliasCode);
    console.log(response, "reponse into getAllPartiesCompanySettings");
    yield put({
      type: GET_PARTIES_SURCHARGE_ALIAS_TABLE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error, "saga getAllCompanySettings api error");
  }
}

// post add surcharge data

function* getAddSurchargeDeatilsData({ payload }) {
  try {
    console.log("payload getAddSurchargeData", payload);
    const response = yield call(getAddSurchargeData, payload);
    showSuccessToast("Add Surcharge Data successfully");
    yield put({ type: POST_SETTINGS_SURCHARGE_DATA_SUCCESS, payload: response, });
    const response2 = yield call(getPartiesSurchargeTable);
    yield put({ type: GET_PARTIES_SURCHARGE_TABLE_SUCCESS, payload: response2 });
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "Surcharge Data saga");
  }
}

// get surcharge category
function* getSurchargeCategory() {
  try {
    const response = yield call(getAllSurchargeCategory);
    console.log(response, "reponse into getSurchargeCategory");
    yield put({ type: GET_ALL_SURCHARGE_CATEGORY_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getSurchargeCategory api error");
  }
}

function* getAllTenantLocations() {
  try {
    const response = yield call(getAllTenantLocation);
    console.log(response, "reponse into getAllTenantLocation");
    yield put({ type: GET_ALL_TENANT_LOCATION_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getAllTenantLocation api error");
  }
}

function* saveTenantLocation({ payload }) {
  try {
    const response = yield call(postTenantLocation, payload);
    console.log(response, "reponse into saveTenantLocation");
    showSuccessToast("Add Tenant Location Data successfully");
    yield put({ type: POST_TENANT_LOCATION_SUCCESS, payload: response });
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga saveTenantLocation api error");
  }
}

function* getAllTenantLocatonTypes() {
  try {
    const response = yield call(getAllTenantLocationType);
    console.log(response, "reponse into getAllTenantLocatonTypes");
    yield put({ type: GET_ALL_TENANT_LOCATION_TYPE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getAllTenantLocatonTypes api error");
  }
}

function* postTenantLocationTypes({ payload }) {
  try {
    const response = yield call(postTenantLocationType, payload);
    console.log(response, "reponse into postTenantLocationTypes");
    showSuccessToast("Add Tenant Location Type Data successfully");
    yield put({ type: POST_TENANT_LOCATION_TYPE_SUCCESS, payload: response });
  } catch (error) {
    showErrorToast(error?.message);
    console.log(error, "saga postTenantLocationTypes api error");
  }
}


export function* watchGetSettingsUsersData() {
  yield takeLatest(GET_USERS_TABLE_DATA, getUsersData);
  yield takeLatest(GET_COMPANY_ADD_USERS_DATA, getCompanyAddUserData);
  yield takeLatest(GET_COMPANYDETAILS_BASIC_DATA, getCompanyDetailsData);
  yield takeLatest(GET_COMPANY_CITY_DATA, getCompanyCityDetails);
  yield takeLatest(GET_COMPANY_STATE_DATA, getCompanyStateDetails);
  yield takeLatest(GET_COMPANY_COUNTRY_DATA, getCompanyCountryDetails);
  yield takeLatest(GET_COMPANY_PINCODE_DATA, getCompanyPincodeDetails);
  yield takeLatest(GET_TAXES_DATA, getCompanyTaxDetails);
  yield takeLatest(GET_BUSINESS_DATA, getCompanyBusinessDeatilsData);
  yield takeLatest(GET_ALL_COMPANY_SETTINGS, getAllCompanySettings);
  yield takeLatest(GET_FCL_SURCHARGE_TABLE_DATA, getFclSurchargeData);
  yield takeLatest(GET_PARTIES_SURCHARGE_TABLE, getAllPartiesSurchargeTable);
  yield takeLatest(
    GET_PARTIES_SURCHARGE_ALIAS_TABLE,
    getAllPartiesSurchargeAliasTable
  );
  yield takeLatest(POST_SETTINGS_SURCHARGE_DATA, getAddSurchargeDeatilsData);
  yield takeLatest(GET_ALL_SURCHARGE_CATEGORY, getSurchargeCategory);
  yield takeLatest(GET_ALL_TENANT_LOCATION, getAllTenantLocations);
  yield takeLatest(POST_TENANT_LOCATION, saveTenantLocation);
  yield takeLatest(GET_ALL_TENANT_LOCATION_TYPE, getAllTenantLocatonTypes);
  yield takeLatest(POST_TENANT_LOCATION_TYPE, postTenantLocationTypes);
}

function* settingsSaga() {
  yield all([fork(watchGetSettingsUsersData)]);
}

export default settingsSaga;
