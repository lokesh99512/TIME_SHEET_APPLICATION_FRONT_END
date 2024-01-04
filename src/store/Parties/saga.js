import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  CompanyCityDetails,
  CompanyCountryDetails,
  CompanyPincodeDetails,
  CompanyStateDetails,
  getAllPartiesCustomerEmployeeDeatils,
  getPartiesAllTable
} from "../../helpers/services/AuthService";
import {
  GET_PARTIES_COMPANY_CITY_DATA,
  GET_PARTIES_COMPANY_CITY_DATA_SUCCESS,
  GET_PARTIES_COMPANY_COUNTRY_DATA,
  GET_PARTIES_COMPANY_COUNTRY_DATA_SUCCESS,
  GET_PARTIES_COMPANY_PINCODE_DATA,
  GET_PARTIES_COMPANY_PINCODE_DATA_SUCCESS,
  GET_PARTIES_COMPANY_STATE_DATA,
  GET_PARTIES_COMPANY_STATE_DATA_SUCCESS,
  GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS,
  GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS_SUCCESS,
  GET_PARTIES_TABLE,
  GET_PARTIES_TABLE_SUCCESS
} from "./actiontype";

function* getCompanyCityDetails() {
  try {
    // console.log("payload getCompanyCityDetails", payload)
    const response = yield call(CompanyCityDetails);
    // console.log(response, "--respnse")
    yield put({
      type: GET_PARTIES_COMPANY_CITY_DATA_SUCCESS,
      payload: response,
    });
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
    yield put({
      type: GET_PARTIES_COMPANY_STATE_DATA_SUCCESS,
      payload: response,
    });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga state api error");
  }
}
function* getCompanyCountryDetails({ payload: { cityId } }) {
  try {
    // console.log("payload getCompanyCityDetails", payload)
    const response = yield call(() => CompanyCountryDetails({ cityId }));
    // console.log(response, "--respnse")
    yield put({
      type: GET_PARTIES_COMPANY_COUNTRY_DATA_SUCCESS,
      payload: response,
    });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga state api error");
  }
}

function* getCompanyPincodeDetails({ payload: { cityId } }) {
  try {
    // console.log("payload getCompanyPincodeDetails", payload)
    const response = yield call(() => CompanyPincodeDetails({ cityId }));
    console.log(response, "--getCompanyPincodeDetails ---respnse");
    yield put({
      type: GET_PARTIES_COMPANY_PINCODE_DATA_SUCCESS,
      payload: response,
    });
  } catch (error) {
    // showErrorToast(error?.message);
    console.log(error, "saga state api error");
  }
}

function* getAllPartiesTable() {
  try {
    const response = yield call(getPartiesAllTable);
    console.log(response, "reponse into getAllPartiesCompanySettings");
    yield put({ type: GET_PARTIES_TABLE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "saga getAllCompanySettings api error");
  }
}

// all customers employee list
function* getAllPartiesEmployeeDetails() {
  try {
    const response = yield call(getAllPartiesCustomerEmployeeDeatils);
    console.log(response, "reponse into getAllPartiesCompanySettings");
    yield put({
      type: GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error, "saga getAllCompanySettings api error");
  }
}


export function* watchGetPartiesCustomersData() {
  yield takeLatest(GET_PARTIES_COMPANY_CITY_DATA, getCompanyCityDetails);
  yield takeLatest(GET_PARTIES_COMPANY_STATE_DATA, getCompanyStateDetails);
  yield takeLatest(GET_PARTIES_COMPANY_COUNTRY_DATA, getCompanyCountryDetails);
  yield takeLatest(GET_PARTIES_COMPANY_PINCODE_DATA, getCompanyPincodeDetails);
  yield takeLatest(GET_PARTIES_TABLE, getAllPartiesTable);
  yield takeLatest(GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS, getAllPartiesEmployeeDetails);
}

function* partiesSaga() {
  yield all([fork(watchGetPartiesCustomersData)]);
}

export default partiesSaga;
