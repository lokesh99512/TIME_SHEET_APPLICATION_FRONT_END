import { GET_CUSTOMERS_TABLE_DATA, GET_CUSTOMERS_TABLE_DATA_FAIL, GET_CUSTOMERS_TABLE_DATA_SUCCESS, UPDATE_CUSTOMER_SWITCH } from "./actiontype"

// --------------------------- User Master


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

// -------------------------------- company details

// export const getCompanyDetailsData = (data) => {
//     return {
//     type: GET_COMPANYDETAILS_DATA,
//     payload: data,
// }
// }

// export const getCompanyDetailsDataSuccess = (data) => ({
//     type: GET_COMPANYDETAILS_DATA_SUCCESS,
//     payload: data,
// })

// export const getCompanyDetailsDataFail = (error) => ({
//     type: GET_COMPANYDETAILS_DATA_FAIL,
//     payload: error,
// })