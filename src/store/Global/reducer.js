import { GET_CURRENCY_DETAIL_SUCCESS, GET_VENDOR_DETAILS_SUCCESS } from "./actiontype";

const INIT_STATE = {
    vendor_data: [],
    currency_data: [],
}

const globalReducer = (state = INIT_STATE, action) => {
    switch (action.type){
        case GET_VENDOR_DETAILS_SUCCESS: 
            return {
                ...state,
                vendor_data: action.payload
            }
        case GET_CURRENCY_DETAIL_SUCCESS:
            return {
                ...state,
                currency_data: action.payload.content?.map((item) => {
                    return {
                        label: item?.currencyName,
                        value: item?.currencyName,
                        currencyCode: item?.currencyCode,
                        id: item?.id,
                        version: item?.version
                    }
                })
            }


        default:
            return state;
    }
}

export default globalReducer;