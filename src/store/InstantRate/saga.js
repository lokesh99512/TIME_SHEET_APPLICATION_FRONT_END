// saga.js
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getAirLocation, getAllIncoTerms, getInstantRateLocation } from "../../helpers/services/GlobalService";
import {
  GET_INSTANT_RATE_LOCATION,
  GET_INSTANT_RATE_LOCATION_SUCCESS,
  GET_INSTANT_RATE_LOCATION_FAILURE,
  GET_ALL_INCOTERM_SUCCESS,
  GET_ALL_INCOTERM,
  POST_INSTANT_SEARCH_DATA_TYPE,
  GET_INSTANT_SEARCH_RESULT_TYPE,
  POST_INSTANT_SEARCH_LOADER,
  GET_AIR_LOCATION_TYPE,
  GET_AIR_LOCATION_TYPE_SUCCESS,
  GET_INSTANT_SEARCH_RESULT_ID,
  FILTER_INSTANT_SEARCH_DATA_TYPE,
} from "./actionType"
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";
import { filterInstantRateSer, postInstantRateSer } from "../../helpers/services/InstantRateService";

function* fetchInstantRateLocation() {
  try {
    const response = yield call(getInstantRateLocation);
    console.log("response instant rate location===============");
    yield put({ type: GET_INSTANT_RATE_LOCATION_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "location error-----------");
    yield put({ type: GET_INSTANT_RATE_LOCATION_FAILURE, payload: error.message });
  }
}
function* fetchAirLocation() {
  try {
    const response = yield call(getAirLocation);
    console.log("response air location===============");
    yield put({ type: GET_AIR_LOCATION_TYPE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "Air location error-----------");
  }
}

function* fetchAllIncoterm() {
  try {
    const response = yield call(getAllIncoTerms);
    console.log(response, "INCOTERM instant Incoterm===============");
    yield put({ type: GET_ALL_INCOTERM_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "location error-----------");
  }
}
function* postInstantSearchSaga({payload: { data }}) {  
  yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: true });
  try {
    const response = yield call(postInstantRateSer, data);
    console.log(response, "instant===============");   
    yield put({ type: GET_INSTANT_SEARCH_RESULT_TYPE, payload: response});
    yield put({ type: GET_INSTANT_SEARCH_RESULT_ID, payload: response?.id });
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
  } catch (error) {
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
    showErrorToast(error?.response?.data?.message);
  }
}
function* filterInstantSearchSaga({payload: { url }}) {  
  console.log(url,"saga url");
  yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: true });
  try {
    const response = yield call(filterInstantRateSer, url);
    console.log(response, "filter instant===============");   
    yield put({ type: GET_INSTANT_SEARCH_RESULT_TYPE, payload: response});
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
  } catch (error) {
    yield put({ type: POST_INSTANT_SEARCH_LOADER, payload: false });
    showErrorToast(error?.response?.data?.message);
  }
}

function* watchGetInstantRate() {
  yield takeEvery(GET_INSTANT_RATE_LOCATION, fetchInstantRateLocation);
  yield takeEvery(GET_AIR_LOCATION_TYPE, fetchAirLocation);
  yield takeEvery(GET_ALL_INCOTERM, fetchAllIncoterm)
  yield takeEvery(POST_INSTANT_SEARCH_DATA_TYPE, postInstantSearchSaga);
  yield takeEvery(FILTER_INSTANT_SEARCH_DATA_TYPE, filterInstantSearchSaga);
}

function* instantRateSaga() {
  yield all([fork(watchGetInstantRate)]);
}

export default instantRateSaga;
