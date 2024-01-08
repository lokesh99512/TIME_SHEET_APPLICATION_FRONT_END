// actions.js

import { GET_ALL_INCOTERM, GET_ALL_INCOTERM_SUCCESS, GET_INSTANT_RATE_LOCATION, GET_INSTANT_RATE_LOCATION_FAILURE, GET_INSTANT_RATE_LOCATION_SUCCESS, POST_INSTANT_SEARCH_DATA_TYPE } from "./actionType";

  
  export const getInstantRateLocation = () => ({
    type: GET_INSTANT_RATE_LOCATION,
  });
  
  export const getInstantRateLocationSuccess = (data) => ({
    type: GET_INSTANT_RATE_LOCATION_SUCCESS,
    payload: data,
  });
  
  export const getInstantRateLocationFailure = (error) => ({
    type: GET_INSTANT_RATE_LOCATION_FAILURE,
    payload: error,
  });

  export const getAllIncoTerms = () => ({
    type: GET_ALL_INCOTERM,
  });
  
  export const getAllIncoTermsSuccess = (data) => ({
    type: GET_ALL_INCOTERM_SUCCESS,
    payload: data,
  });

  export const postInstantSearchAction = (data) => ({
    type: POST_INSTANT_SEARCH_DATA_TYPE,
    payload: { data }
  })
  