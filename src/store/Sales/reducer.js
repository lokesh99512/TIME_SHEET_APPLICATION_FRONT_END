import { CONFIRM_PREVIEW_DATA, GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS, QUOTATION_RESULT_SELECTED, QUOTATION_RESULT_SELECTED_BLANK, QUOTATION_RESULT_UPDATE, SEARCH_QUOTATION_BLANK, UPDATE_CONTAINERTYPE_CONFIRM, UPDATE_CONTAINER_CHANGE, UPDATE_QUOTATION_RESULT_DETAILS, UPDATE_QUOTATION_RESULT_DETAILS_CHEAPER, UPDATE_QUOTATION_RESULT_DETAILS_FASTER, UPDATE_SEARCH_QUOTATION_CURRENCY, UPDATE_SEARCH_QUOTATION_DATA, UPDATE_SEARCH_QUOTATION_DATE, UPDATE_SEARCH_QUOTATION_LOCATION, UPDATE_SEARCH_QUOTATION_LOCATION_FROM, UPDATE_SEARCH_QUOTATION_LOCATION_TO, UPDATE_SEARCH_QUOTATION_SWAP, UPDATE_VALUE_BLANK } from "./actiontype"


const INIT_STATE = {
    quotation_data: [],
    quotation_error: {},
    createFields: {
        // customer_name: '',
        shipping_by: '',
        // service_type: '',
        container_type: '',
        // incoterm: '',
        cargo_type: '',
        cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
        cargo_date: '',
        location_from: '',
        location_to: '',
    },
    quotation_result_data: [],
    quotation_result_prefData: [],
    quotation_result_cheapData: [],
    quotation_result_fasterData: [],
    quotation_result_error: [],
    quote_selected_data: [],
}

const sales = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_QUOTATION_DATA_SUCCESS:
            return { ...state, quotation_data: action.payload }

        case GET_QUOTATION_DATA_FAIL:
            return { ...state, quotation_error: action.payload }

        case GET_QUOTATION_RESULT_SUCCESS:
            return {
                ...state,
                quotation_result_data: action.payload
            };

        case GET_QUOTATION_RESULT_FAIL:
            return { ...state, quotation_result_error: action.payload }

        case UPDATE_SEARCH_QUOTATION_DATA:
            const { item, name } = action.payload
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    [name]: item
                }
            }
        case UPDATE_SEARCH_QUOTATION_CURRENCY:
            const { currency_item, currency_name } = action.payload
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    cargo_value: {
                        ...state.createFields.cargo_value,
                        [currency_name]: currency_item
                    }
                }
            }
        case UPDATE_SEARCH_QUOTATION_LOCATION_FROM:
            const { location_item, location_name } = action.payload
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    location_from: {
                        ...state.createFields.location_from,
                        [location_name]: location_item
                    }
                }
            }
        case UPDATE_SEARCH_QUOTATION_LOCATION_TO:
            const { location_item2, location_name2 } = action.payload
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    location_to: {
                        ...state.createFields.location_to,
                        [location_name2]: location_item2
                    }
                }
            }
        case UPDATE_SEARCH_QUOTATION_DATE:
            const { arrItem } = action.payload
            let newObj = {
                ...state,
                createFields: {
                    ...state.createFields,
                    cargo_date: [...arrItem],
                }
            }
            return state = newObj
        case UPDATE_SEARCH_QUOTATION_SWAP:
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    location_to: state.createFields.location_from,
                    location_from: state.createFields.location_to
                }
            }
        case UPDATE_CONTAINERTYPE_CONFIRM:
            return state = {
                ...state,
                createFields: {
                    ...state.createFields,
                    container_type: action.payload,
                }
            }
        case UPDATE_CONTAINER_CHANGE:
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    container_type: action.payload
                }
            }
        case UPDATE_VALUE_BLANK:
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    [action.payload]: ''
                }
            }

        case UPDATE_QUOTATION_RESULT_DETAILS:
            return {
                ...state,
                quotation_result_data: state.quotation_result_data.map((item, index) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            [action.payload.name]: action.payload.value,
                        };
                    }
                    return item;
                }),
            }

        case QUOTATION_RESULT_SELECTED:
            return {
                ...state,
                quote_selected_data: action.payload
            }

        case SEARCH_QUOTATION_BLANK:
            return {
                ...state,
                createFields: {
                    shipping_by: '',
                    cargo_type: '',
                    container_type: '',
                    cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
                    cargo_date: '',
                    location_from: '',
                    location_to: '',
                },
            }

        case QUOTATION_RESULT_UPDATE:
            const newArray = [...state.quote_selected_data];
            const existingIndex = newArray.findIndex(obj => obj.id === action.payload.id);
            const updatedItem = {
                ...newArray[existingIndex],
                [action.payload.charge_name]: newArray[existingIndex][action.payload.charge_name].map((item, index) => {
                    if (index === action.payload.index) {
                        if(action.payload.name === 'markup_val'){
                            return {
                                ...item,
                                [action.payload.name]: action.payload.value,
                                'margin_value': action.payload.marginVal,
                                total_sale_cost: action.payload.sales_cost
                            };
                        } else {
                            return {
                                ...item,
                                [action.payload.name]: action.payload.value
                            };
                        }                        
                    }
                    return item;
                })
            };
            newArray[existingIndex] = updatedItem;

            return {
                ...state,
                quote_selected_data: newArray
            };

        case CONFIRM_PREVIEW_DATA: 
            return {
                ...state,
                quote_selected_data: action.payload
            }
        case QUOTATION_RESULT_SELECTED_BLANK: 
            return {
                ...state,
                quote_selected_data: []
            }

        default:
            return state;
    }
}

export default sales