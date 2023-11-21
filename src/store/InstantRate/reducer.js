import { UPDATE_INSTANT_RATE_SWAP, UPDATE_SEARCH_INSTANT_RATE_DATA, UPDATE_VALUE_BLANK } from "./actionType"


const INIT_STATE = {
    searchForm: {
        // customer_name: '',
        // service_type: '',
        // shipping_by: '',
        // cargo_weight: { weight: "MT",value: ''},
        // cargo_type: '',
        cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
        incoterm: '',
        customerName:'',
        container_type: '',
        cargo_date: '',
        location_from: '',
        location_to: '',
    },
}

const instantRate = (state = INIT_STATE, action) => {
    switch (action.type) {
        
        

        case UPDATE_INSTANT_RATE_SWAP:
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    location_to: state.searchForm.location_from,
                    location_from: state.searchForm.location_to
                }
            }

            case UPDATE_VALUE_BLANK:
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    [action.payload]: ''
                }
            }

            case UPDATE_SEARCH_INSTANT_RATE_DATA:
            const { item, name } = action.payload
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    [name]: item
                }
            }

        default:
            return state;
    }
}

export default instantRate