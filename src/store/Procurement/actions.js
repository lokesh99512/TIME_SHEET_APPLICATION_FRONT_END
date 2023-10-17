import { GET_CONSOLE_TABLE_DATA, GET_CONSOLE_TABLE_DATA_FAIL, GET_CONSOLE_TABLE_DATA_SUCCESS, GET_FCL_TABLE_DATA, GET_FCL_TABLE_DATA_FAIL, GET_FCL_TABLE_DATA_SUCCESS, GET_INLAND_TABLE_DATA, GET_INLAND_TABLE_DATA_FAIL, GET_INLAND_TABLE_DATA_SUCCESS, GET_LCL_TABLE_DATA, GET_LCL_TABLE_DATA_FAIL, GET_LCL_TABLE_DATA_SUCCESS, GET_PORTLOCALCHARGES_TABLE_DATA, GET_PORTLOCALCHARGES_TABLE_DATA_FAIL, GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS, GET_WAYBILL_TABLE_DATA, GET_WAYBILL_TABLE_DATA_FAIL, GET_WAYBILL_TABLE_DATA_SUCCESS, UPDATE_AIRCONSOLE_SWITCH, UPDATE_AIRWAYBILL_SWITCH, UPDATE_CARRIER_DATA, UPDATE_FCL_SWITCH, UPDATE_FCL_TABLE_DATA, UPDATE_INLAND_SWITCH, UPDATE_LCL_SWITCH } from "./actiontype";

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

// oceanFreight/lcl
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
export const updatefclSwitchData = (fcl_id, fcl_is_active) => ({
    type: UPDATE_FCL_SWITCH,
    payload: {
        fcl_id,
        fcl_is_active
    }
})
// oceanFreight/port local charges
export const getPortLocalChargesData = (data) => ({
    type: GET_PORTLOCALCHARGES_TABLE_DATA,
    payload: data,
})

export const getPortLocalChargesDataSuccess = (data) => ({
    type: GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getPortLocalChargesDataFail = (error) => ({
    type: GET_PORTLOCALCHARGES_TABLE_DATA_FAIL,
    payload: error,
})

//---------------

export const updateCarrierData = (name,data) => ({
    type: UPDATE_CARRIER_DATA,
    payload: {
        name,data
    }
})
export const updatelclSwitchData = (lcl_id, lcl_is_active) => ({
    type: UPDATE_LCL_SWITCH,
    payload: {
        lcl_id,
        lcl_is_active
    }
})

export const getAirwaybillData = (data) => ({
    type: GET_WAYBILL_TABLE_DATA,
    payload: data
})
export const getAirwaybillDataSuccess = (data) => ({
    type: GET_WAYBILL_TABLE_DATA_SUCCESS,
    payload: data
})
export const getAirwaybillDataFail = (error) => ({
    type: GET_WAYBILL_TABLE_DATA_FAIL,
    payload: error
})
export const updateAirwaybillSwitchData = (id, is_active) => ({
    type: UPDATE_AIRWAYBILL_SWITCH,
    payload: {
        id,
        is_active
    }
})

export const getAirConsoleData = (data) => ({
    type: GET_CONSOLE_TABLE_DATA,
    payload: data
})
export const getAirConsoleDataSuccess = (data) => ({
    type: GET_CONSOLE_TABLE_DATA_SUCCESS,
    payload: data
})
export const getAirConsoleDataFail = (error) => ({
    type: GET_CONSOLE_TABLE_DATA_FAIL,
    payload: error
})
export const updateAirConsoleSwitchData = (console_id,console_is_active) => ({
    type: UPDATE_AIRCONSOLE_SWITCH,
    payload: {
        console_id,console_is_active
    }
})

export const getInLandData = (data) => ({
    type: GET_INLAND_TABLE_DATA,
    payload: data
})
export const getInLandDataSuccess = (data) => ({
    type: GET_INLAND_TABLE_DATA_SUCCESS,
    payload: data
})
export const getInLandDataFail = (error) => ({
    type: GET_INLAND_TABLE_DATA_FAIL,
    payload: error
})
export const updateInLandSwitchData = (inland_id,inland_is_active) => ({
    type: UPDATE_INLAND_SWITCH,
    payload: {
        inland_id,inland_is_active
    }
})