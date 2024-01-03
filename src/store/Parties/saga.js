import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/Common/CustomToast";
import {
  getPartiesCustomers,
  getPartiesVendors,
} from "../../helpers/fakebackend_helper";
import {
  CompanyCityDetails,
  CompanyCountryDetails,
  CompanyPincodeDetails,
  CompanyStateDetails,
  getAllPartiesCustomerEmployeeDeatils,
  getPartiesAllTable,
  getPartiesAllVendorTable
} from "../../helpers/services/AuthService";
import { postVenderUpload } from "../../helpers/services/PartiesService";
import {
  getCustomersDataFail,
  getCustomersDataSuccess,
  getVendorsDataFail,
  getVendorsDataSuccess,
} from "./actions";
import {
  GET_CUSTOMERS_TABLE_DATA,
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
  GET_PARTIES_TABLE_SUCCESS,
  GET_PARTIES_VENDOR_TABLE,
  GET_PARTIES_VENDOR_TABLE_SUCCESS,
  GET_VENDORS_TABLE_DATA,
  GET_VENDOR_DETAILS_ID,
  GET_VENDOR_LIST_SUCCESS,
  GET_VENDOR_LIST_TYPE,
  UPLOAD_VENDOR_DATA,
  UPLOAD_VENDOR_DETAILS_TYPE,
  VENDOR_LOADER_TYPE
} from "./actiontype";

function* getCustomersData() {
  try {
    const response = yield call(getPartiesCustomers);
    yield put(getCustomersDataSuccess(response));
  } catch (error) {
    yield put(getCustomersDataFail(error));
  }
}

function* getVendorsData() {
  try {
    const response = yield call(getPartiesVendors);
    yield put(getVendorsDataSuccess(response));
  } catch (error) {
    yield put(getVendorsDataFail(error));
  }
}

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

// function* fetchVendorListSaga() {
//   yield put({ type: VENDOR_LOADER_TYPE, payload: true });
//   try {
//     const response = yield call(getPartiesAllVendorTable);
//     console.log(response, "reponse into getAllPartiesCompanySettings");
//     yield put({ type: GET_VENDOR_LIST_SUCCESS, payload: response });
//     yield put({ type: VENDOR_LOADER_TYPE, payload: false });
//   } catch (error) {
//     yield put({ type: VENDOR_LOADER_TYPE, payload: false });
//     console.log(error, "saga getAllCompanySettings api error");
//   }
// }

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
  yield takeLatest(GET_CUSTOMERS_TABLE_DATA, getCustomersData);
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
