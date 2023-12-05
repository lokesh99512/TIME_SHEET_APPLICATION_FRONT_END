import {GET_USERS_TABLE_DATA,GET_USERS_TABLE_DATA_SUCCESS,GET_USERS_TABLE_DATA_FAIL, UPDATE_USER_SWITCH, GET_COMPANYDETAILS_DATA, GET_COMPANYDETAILS_DATA_SUCCESS, GET_COMPANYDETAILS_DATA_FAIL, GET_FCL_SURCHARGE_TABLE_DATA, GET_FCL_SURCHARGE_TABLE_DATA_FAIL, GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS} from "./actiontype"
// --------------------------- User Master

export const getUsersData = (data) => {
    return {
    type: GET_USERS_TABLE_DATA,
    payload: data,
}
}

export const getUsersDataSuccess = (data) => ({
    type: GET_USERS_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getUsersDataFail = (error) => ({
    type: GET_USERS_TABLE_DATA_FAIL,
    payload: error,
})

export const updateUserSwitchData = (user_id, user_is_active) => ({
    type: UPDATE_USER_SWITCH,
    payload: {
        user_id,
        user_is_active
    }
})

// -------------------------------- company details

export const getCompanyDetailsData = (data) => {
    return {
    type: GET_COMPANYDETAILS_DATA,
    payload: data,
}
}

export const getCompanyDetailsDataSuccess = (data) => ({
    type: GET_COMPANYDETAILS_DATA_SUCCESS,
    payload: data,
})

export const getCompanyDetailsDataFail = (error) => ({
    type: GET_COMPANYDETAILS_DATA_FAIL,
    payload: error,
})


// --------------------------------- surcharge fcl table

export const getFclSurchargeData = (data) => {
    return {
    type: GET_FCL_SURCHARGE_TABLE_DATA,
    payload: data,
}
}

export const getFclSurchargeDataSuccess = (data) => ({
    type: GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getFclSurchargeDataFail = (error) => ({
    type: GET_FCL_SURCHARGE_TABLE_DATA_FAIL,
    payload: error,
})