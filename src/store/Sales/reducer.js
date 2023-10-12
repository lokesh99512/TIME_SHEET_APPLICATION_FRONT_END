import { GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS, UPDATE_CONTAINERTYPE_CONFIRM, UPDATE_CONTAINER_CHANGE, UPDATE_SEARCH_QUOTATION_CURRENCY, UPDATE_SEARCH_QUOTATION_DATA, UPDATE_SEARCH_QUOTATION_DATE, UPDATE_SEARCH_QUOTATION_LOCATION, UPDATE_SEARCH_QUOTATION_LOCATION_FROM, UPDATE_SEARCH_QUOTATION_LOCATION_TO, UPDATE_SEARCH_QUOTATION_SWAP, UPDATE_VALUE_BLANK } from "./actiontype"


const INIT_STATE = {
    quotation_data: [],
    quotation_error: {},
    createFields: {
        // customer_name: '',
        shipping_by: '',
        service_type: '',
        container_type: '',
        incoterm: '',
        cargo_type: '',
        cargo_value: {currency: {name: 'Rupee', value: 'rupee', code: '₹'}},
        cargo_date: '',
        location_from: '',
        location_to: '',
    },
    quotation_result_data: [],
    quotation_result_error: [],
}

const sales = (state=INIT_STATE,action) => {
    switch (action.type){
        case GET_QUOTATION_DATA_SUCCESS:
            return{ ...state, quotation_data: action.payload }

        case GET_QUOTATION_DATA_FAIL:
            return {...state,quotation_error: action.payload}

        case GET_QUOTATION_RESULT_SUCCESS:
            return{ ...state, quotation_result_data: action.payload }

        case GET_QUOTATION_RESULT_FAIL:
            return {...state,quotation_result_error: action.payload}

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
            return state= newObj
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
            let newArry = {
                ...state,
                createFields: {
                    ...state.createFields,
                    container_type: action.payload,
                }
            }
            return state = newArry
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

        default:
            return state;
    }
}

export default sales