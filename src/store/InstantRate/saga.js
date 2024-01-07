// saga.js
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getAllIncoTerms, getInstantRateLocation } from "../../helpers/services/GlobalService";
import {
  GET_INSTANT_RATE_LOCATION,
  GET_INSTANT_RATE_LOCATION_SUCCESS,
  GET_INSTANT_RATE_LOCATION_FAILURE,
  GET_ALL_INCOTERM_SUCCESS,
  GET_ALL_INCOTERM,
} from "./actionType"

function* fetchInstantRateLocation() {
  try {
    const response = yield call(getInstantRateLocation);
    console.log(response, "response instant rate location===============");
    yield put({ type: GET_INSTANT_RATE_LOCATION_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, "location error-----------");
    yield put({ type: GET_INSTANT_RATE_LOCATION_FAILURE, payload: error.message });
  }
}

function* fetchAllIncoterm() {
try {
  const response = yield call(getAllIncoTerms);
  console.log(response, "INCOTERM instant rate location===============");
  yield put({ type: GET_ALL_INCOTERM_SUCCESS, payload: response });
} catch (error) {
  console.log(error, "location error-----------");
}
}

function* watchGetInstantRate() {
  yield takeEvery(GET_INSTANT_RATE_LOCATION, fetchInstantRateLocation);
  yield takeEvery(GET_ALL_INCOTERM , fetchAllIncoterm)
}

function* instantRateSaga() {
  yield all([fork(watchGetInstantRate)]);
}

export default instantRateSaga;
