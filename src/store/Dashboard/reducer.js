import { customSort } from "../../components/Common/CommonLogic";
import {
    GET_MARKET_OVERVIEW,
    GET_MARKET_OVERVIEW_SUCCESS,
    GET_MARKET_OVERVIEW_FAIL,
    GET_WALLENT_BALANCE_SUCCESS,
    GET_WALLENT_BALANCE_FAIL,
    GET_WALLENT_BALANCE,
    GET_Invested_Overview,
    GET_Invested_Overview_SUCCESS,
    GET_Invested_Overview_FAIL, } from "./actiontype"

const INIT_STATE = {
    Marketoverview: [],
    error: {},
    WallentBalanceData: [],
    InvestedData: [],
}

const dashboard = (state = INIT_STATE, action) => {
    switch (action.type) {
        // case SORT_TABLE_DATA:
        //     const { tableName, sortField, sortOrder } = action.payload;
        //     // Perform sorting for the specified table
        //     const sortedData = customSort(state[tableName], sortField, sortOrder);
        //     return {
        //         ...state,
        //         [tableName]: sortedData,
        //     };

        // case UPDATE_TABLE_DATA:
        //     const { updateTableName, updateSortedData } = action.payload;
        //     return {
        //         ...state,
        //         [updateTableName]: updateSortedData,
        //     };

        case GET_MARKET_OVERVIEW_SUCCESS:
            return {
                ...state,
                Marketoverview: action.payload,
            }

        case GET_MARKET_OVERVIEW_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case GET_WALLENT_BALANCE_SUCCESS:
            return {
                ...state,
                WallentBalanceData: action.payload,
            }

        case GET_MARKET_OVERVIEW_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case GET_Invested_Overview_SUCCESS:
            return {
                ...state,
                InvestedData: action.payload,
            }

        case GET_Invested_Overview_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        default:
            return state
    }
}

export default dashboard
