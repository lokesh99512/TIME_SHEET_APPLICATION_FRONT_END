import { GET_CARGO_TYPE_DATA_SUCCEESS, GET_CONTAINER_DATA_SUCCEESS, GET_CURRENCY_DETAIL_SUCCESS, GET_OCEAEN_PORT_DATA_SUCCEESS, GET_SURCHARGE_ALICE_DATA_SUCCEESS, GET_SURCHARGE_CATEGORY_DATA_SUCCESS, GET_SURCHARGE_CODE_DATA_SUCCESS, GET_UOM_DATA_SUCCESS, GET_VENDOR_DETAILS_SUCCESS } from "./actiontype";

const INIT_STATE = {
    vendor_data: [],
    currency_data: [],
    UOM_data: [],
    surchargeCode_data: [],
    surchargeCategory_data: [],
    oceanPort_data: [],
    cargoType_data: [],
    container_data: [],
    surchargeAlice_data: [],
    surchargeAlice_descri: [],
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
                        label: `${item?.currencyCode} - ${item?.currencyName}`,
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
                        label: item?.description.split('_').join(' '),
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
                        label: `${item?.code} - ${item?.description}`,
                        value: item?.code,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version,
                        surchargeCategory: item?.surchargeCategory?.name
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
        case GET_CARGO_TYPE_DATA_SUCCEESS:
            return {
                ...state,
                cargoType_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.type}`,
                        value: `${item?.type}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                    }
                })
            }
        case GET_CONTAINER_DATA_SUCCEESS:
            return {
                ...state,
                container_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.name}`,
                        value: `${item?.name}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                        size: `${item?.size}`,
                        unit: `${item?.unit}`,
                    }
                })
            }
        case GET_SURCHARGE_ALICE_DATA_SUCCEESS:
            return {
                ...state,
                surchargeAlice_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.name}`,
                        value: `${item?.name}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                        size: `${item?.size}`,
                        unit: `${item?.unit}`,
                    }
                }),
                surchargeAlice_descri: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.description}`,
                        value: `${item?.name}`,
                    }
                })
            }

        default:
            return state;
    }
}

export default globalReducer;