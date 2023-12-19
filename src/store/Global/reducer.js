import { GET_CURRENCY_DETAIL_SUCCESS, GET_OCEAEN_PORT_DATA_SUCCEESS, GET_SURCHARGE_CATEGORY_DATA_SUCCESS, GET_SURCHARGE_CODE_DATA_SUCCESS, GET_UOM_DATA_SUCCESS, GET_VENDOR_DETAILS_SUCCESS } from "./actiontype";

const INIT_STATE = {
    vendor_data: [],
    currency_data: [],
    UOM_data: [],
    surchargeCode_data: [],
    surchargeCategory_data: [],
    oceanPort_data: [],
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
        case GET_UOM_DATA_SUCCESS:
            return {
                ...state,
                UOM_data: action.payload.content?.map((item) => {
                    return {
                        label: item?.code.split('_').join(' '),
                        value: item?.code,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version
                    }
                })
            }
        case GET_SURCHARGE_CODE_DATA_SUCCESS:
            return {
                ...state,
                surchargeCode_data: action.payload.content?.map((item) => {
                    return {
                        label: item?.code,
                        value: item?.code,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version
                    }
                })
            }
        case GET_SURCHARGE_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                surchargeCategory_data: action.payload.content?.map((item) => {
                    return {
                        label: item?.name,
                        value: item?.name,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version
                    }
                })
            }
        case GET_OCEAEN_PORT_DATA_SUCCEESS:
            return {
                ...state,
                oceanPort_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.code} - ${item?.address}`,
                        value: `${item?.code}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                    }
                })
            }

        default:
            return state;
    }
}

export default globalReducer;