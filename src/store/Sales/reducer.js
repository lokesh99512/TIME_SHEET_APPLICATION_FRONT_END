import { FILTER_QUOTATION_DATA, GET_INQUIRY_DATA_FAIL, GET_INQUIRY_DATA_SUCCESS, GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS, GET_QUOTATION_RESULT_FAIL, GET_QUOTATION_RESULT_SUCCESS, SEARCH_QUOTATION_BLANK, UPDATE_CONTAINERTYPE_CONFIRM, UPDATE_CONTAINER_CHANGE, UPDATE_SEARCH_QUOTATION_DATA, UPDATE_SEARCH_QUOTATION_DATE, UPDATE_SEARCH_QUOTATION_SWAP, UPDATE_VALUE_BLANK } from "./actiontype"


const INIT_STATE = {
    quotation_data: [],
    quotation_error: {},
    createFields: {
        // customer_name: '',
        // service_type: '',
        // incoterm: '',
        shipping_by: '',
        container_type: '',
        cargo_weight: { weight: "MT",value: ''},
        cargo_type: '',
        cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
        cargo_date: '',
        location_from: '',
        location_to: '',
    },
    quotation_result_data: [],
    quotation_result_error: [],

    inquiry_data: [],
    inquiry_error: [],
}

const sales = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_QUOTATION_DATA_SUCCESS:
            return { ...state, quotation_data: action.payload }
        case FILTER_QUOTATION_DATA:
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

        case SEARCH_QUOTATION_BLANK:
            return {
                ...state,
                createFields: {
                    shipping_by: '',
                    cargo_type: '',
                    cargo_weight: { weight: "MT",value: ''},
                    container_type: '',
                    cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
                    cargo_date: '',
                    location_from: '',
                    location_to: '',
                },
            }               

        // inquiry
        case GET_INQUIRY_DATA_SUCCESS: 
            return { ...state, inquiry_data: action.payload }

        case GET_INQUIRY_DATA_FAIL: 
            return { ...state, inquiry_data: action.payload }              

        default:
            return state;
    }
}

export default sales