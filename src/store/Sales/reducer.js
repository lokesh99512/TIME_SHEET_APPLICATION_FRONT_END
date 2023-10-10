import { GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS, UPDATE_SEARCH_QUOTATION_CURRENCY, UPDATE_SEARCH_QUOTATION_DATA, UPDATE_SEARCH_QUOTATION_DATE, UPDATE_SEARCH_QUOTATION_LOCATION, UPDATE_SEARCH_QUOTATION_LOCATION_FROM, UPDATE_SEARCH_QUOTATION_LOCATION_TO, UPDATE_SEARCH_QUOTATION_SWAP } from "./actiontype"


const INIT_STATE = {
    quotation_data: [],
    quotation_error: {},
    createFields: {
        customer_name: {},
        shipping_by: {},
        service_type: {},
        transport_by: {},
        container_type: {},
        incoterm: {},
        cargo_type: {},
        cargo_value: {currency: {name: 'Rupee', value: 'rupee', code: '₹'}},
        cargo_date: {},
        location_from: {port_type: {},country: '',address: ''},
        location_to: {port_type: {},country: '',address: ''},
    }
}

const sales = (state=INIT_STATE,action) => {
    switch (action.type){
        case GET_QUOTATION_DATA_SUCCESS:
            return{ ...state, quotation_data: action.payload }

        case GET_QUOTATION_DATA_FAIL:
            return {...state,quotation_error: action.payload}

        case UPDATE_SEARCH_QUOTATION_DATA:
            const { item, name } = action.payload
            console.log(name,"name")
            console.log(item,"item")
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
            const { arr } = action.payload
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    cargo_date: arr,
                }
            }
        case UPDATE_SEARCH_QUOTATION_SWAP:
            return {
                ...state,
                createFields: {
                    ...state.createFields,
                    location_to: state.createFields.location_from,
                    location_from: state.createFields.location_to
                }
            }

        default:
            return state;
    }
}

export default sales