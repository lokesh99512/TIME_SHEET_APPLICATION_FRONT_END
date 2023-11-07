import { GET_CUSTOMERS_TABLE_DATA, GET_CUSTOMERS_TABLE_DATA_FAIL, GET_CUSTOMERS_TABLE_DATA_SUCCESS, GET_VENDORS_TABLE_DATA, GET_VENDORS_TABLE_DATA_FAIL, GET_VENDORS_TABLE_DATA_SUCCESS, UPDATE_CUSTOMER_SWITCH, UPDATE_VENDOR_SWITCH } from "./actiontype"

// --------------------------- Customers


export const getCustomersData = (data) => {
    return {
    type: GET_CUSTOMERS_TABLE_DATA,
    payload: data,
}
}

export const getCustomersDataSuccess = (data) => ({
    type: GET_CUSTOMERS_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getCustomersDataFail = (error) => ({
    type: GET_CUSTOMERS_TABLE_DATA_FAIL,
    payload: error,
})

export const updateCustomerSwitchData = (user_id, user_is_active) => ({
    type: UPDATE_CUSTOMER_SWITCH,
    payload: {
        user_id,
        user_is_active
    }
})

// -------------------------------- vendor

export const getVendorsData = (data) => {
    return {
    type: GET_VENDORS_TABLE_DATA,
    payload: data,
}
}

export const getVendorsDataSuccess = (data) => ({
    type: GET_VENDORS_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getVendorsDataFail = (error) => ({
    type: GET_VENDORS_TABLE_DATA_FAIL,
    payload: error,
})

export const updateVendorSwitchData = (user_id, user_is_active) => ({
    type: UPDATE_VENDOR_SWITCH,
    payload: {
        user_id,
        user_is_active
    }
})

