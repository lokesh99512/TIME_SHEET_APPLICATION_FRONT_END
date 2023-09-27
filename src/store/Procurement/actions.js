import { GET_FCL_TABLE_DATA, GET_FCL_TABLE_DATA_FAIL, GET_FCL_TABLE_DATA_SUCCESS, GET_LCL_TABLE_DATA, GET_LCL_TABLE_DATA_FAIL, GET_LCL_TABLE_DATA_SUCCESS, UPDATE_FCL_TABLE_DATA } from "./actiontype";

export const getFclData = (data) => ({
    type: GET_FCL_TABLE_DATA,
    payload: data,
})

export const updateFclData = (data) => ({
    type: UPDATE_FCL_TABLE_DATA,
    payload: data,
})

export const getFclDataSuccess = (data) => ({
    type: GET_FCL_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getFclDataFail = (error) => ({
    type: GET_FCL_TABLE_DATA_FAIL,
    payload: error,
})

export const getLclData = (data) => ({
    type: GET_LCL_TABLE_DATA,
    payload: data,
})

export const getLclDataSuccess = (data) => ({
    type: GET_LCL_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getLclDataFail = (error) => ({
    type: GET_LCL_TABLE_DATA_FAIL,
    payload: error,
})