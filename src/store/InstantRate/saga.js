// saga.js
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getAllIncoTerms, getInstantRateLocation } from "../../helpers/services/GlobalService";
import {
  GET_INSTANT_RATE_LOCATION,
  GET_INSTANT_RATE_LOCATION_SUCCESS,
  GET_INSTANT_RATE_LOCATION_FAILURE,
  GET_ALL_INCOTERM_SUCCESS,
  GET_ALL_INCOTERM,
  POST_INSTANT_SEARCH_DATA_TYPE,
  GET_INSTANT_SEARCH_RESULT_TYPE,
} from "./actionType"
import { showErrorToast, showSuccessToast } from "../../components/Common/CustomToast";
import { postInstantRateSer } from "../../helpers/services/InstantRateService";

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
  try {
    const response = yield call(postInstantRateSer, data);
    console.log(response, "instant===============");   
    yield put({ type: GET_INSTANT_SEARCH_RESULT_TYPE, payload: response });
    showSuccessToast("Update SuccessFully");
  } catch (error) {
    console.log(error, "location error-----------");
    showErrorToast(error?.response?.data?.message);
  }
}

function* watchGetInstantRate() {
  yield takeEvery(GET_INSTANT_RATE_LOCATION, fetchInstantRateLocation);
  yield takeEvery(GET_ALL_INCOTERM, fetchAllIncoterm)
  yield takeEvery(POST_INSTANT_SEARCH_DATA_TYPE, postInstantSearchSaga);
}

function* instantRateSaga() {
  yield all([fork(watchGetInstantRate)]);
}

export default instantRateSaga;
