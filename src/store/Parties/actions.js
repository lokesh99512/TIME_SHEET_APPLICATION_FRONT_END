import {
  GET_CUSTOMERS_TABLE_DATA,
  GET_CUSTOMERS_TABLE_DATA_FAIL,
  GET_CUSTOMERS_TABLE_DATA_SUCCESS,
  GET_PARTIES_ALL_DETAILS,
  GET_PARTIES_COMPANY_CITY_DATA,
  GET_PARTIES_COMPANY_COUNTRY_DATA,
  GET_PARTIES_COMPANY_PINCODE_DATA,
  GET_PARTIES_COMPANY_STATE_DATA,
  GET_PARTIES_CUSTOMERS_DETAILS,
  GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS,
  GET_PARTIES_SURCHARGE_TABLE,
  GET_PARTIES_TABLE,
  GET_PARTIES_VENDOR_TABLE,
  GET_VENDORS_TABLE_DATA,
  GET_VENDORS_TABLE_DATA_FAIL,
  GET_VENDORS_TABLE_DATA_SUCCESS,
  GET_VENDOR_LIST_TYPE,
  UPDATE_CUSTOMER_SWITCH,
  UPDATE_VENDOR_SWITCH,
  UPLOAD_VENDOR_DATA,
  UPLOAD_VENDOR_DETAILS_TYPE,
} from "./actiontype";

// --------------------------- Customers

export const getCustomersData = (data) => {
  return {
    type: GET_CUSTOMERS_TABLE_DATA,
    payload: data,
  };
};

export const getCustomersDataSuccess = (data) => ({
  type: GET_CUSTOMERS_TABLE_DATA_SUCCESS,
  payload: data,
});

export const getCustomersDataFail = (error) => ({
  type: GET_CUSTOMERS_TABLE_DATA_FAIL,
  payload: error,
});

export const updateCustomerSwitchData = (user_id, user_is_active) => ({
  type: UPDATE_CUSTOMER_SWITCH,
  payload: {
    user_id,
    user_is_active,
  },
});

export const updateVendorSwitchData = (user_id, user_is_active) => ({
  type: UPDATE_VENDOR_SWITCH,
  payload: {
    user_id,
    user_is_active,
  },
});

// city get api
export const getCustomersCityData = (data) => {
  return {
    type: GET_PARTIES_COMPANY_CITY_DATA,
    payload: data,
  };
};

export const getCustomersStateData = (data) => {
  return {
    type: GET_PARTIES_COMPANY_STATE_DATA,
    payload: data,
  };
};

export const getCustomersCountryData = (data) => {
  return {
    type: GET_PARTIES_COMPANY_COUNTRY_DATA,
    payload: data,
  };
};

export const getCustomersPincodeData = (data) => {
  return {
    type: GET_PARTIES_COMPANY_PINCODE_DATA,
    payload: data,
  };
};
export const getAllTableParties = (data) => {
  return {
    type: GET_PARTIES_TABLE,
    payload: data,
  };
};

export const getAllUserDetails = (data) => {
  return {
    type: GET_PARTIES_CUSTOMER_EMPLOYEE_DETAILS,
    payload: data,
  };
};
