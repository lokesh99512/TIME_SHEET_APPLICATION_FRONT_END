import { GET_INSTANT_RATE_LOCATION_FAILURE, GET_INSTANT_RATE_LOCATION_SUCCESS, ADD_OBJECT_INSTANT_SEARCH, REMOVE_OBJECT_INSTANT_SEARCH, UPDATE_INSTANT_RATE_SWAP, UPDATE_SEARCH_INSTANT_RATE_DATA, UPDATE_SEARCH_INSTANT_RATE_DATE, UPDATE_VALUE_BLANK, GET_ALL_INCOTERM, GET_ALL_INCOTERM_SUCCESS, GET_INSTANT_SEARCH_RESULT_TYPE } from "./actionType"


const INIT_STATE = {
    searchForm: {
        // customer_name: '',
        // service_type: '',
        // shipping_by: '',
        // cargo_weight: { weight: "MT",value: ''},
        cargo_type: { value: "GENERAL",label: "GENERAL", id: 1, version: 0 },
        cargo_value: { currency: { name: 'Rupee', value: 'rupee', code: '₹' }, value: '' },
        // incoterm: '',
        customerName: '',
        container_type: { cargo_weight: { weight: {value: "MT",label: "MT", id: 7, version: 2}, value: '' } },
        // shipment_details: "",
        cargo_date: '',
        location_from: '',
        location_to: '',
    },
    instantRateLocation: [],
    incoterm: [],
    instantSearchResult: [],
    error: null,
};


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

        case ADD_OBJECT_INSTANT_SEARCH:
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    [action.payload]: ''
                }
            }
        case REMOVE_OBJECT_INSTANT_SEARCH:
            const objectCopy = { ...state.searchForm };
            delete objectCopy[action.payload];
            return {
                ...state,
                searchForm: {
                    ...objectCopy
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

        case UPDATE_SEARCH_INSTANT_RATE_DATE:
            const { arrItem } = action.payload
            let newObj = {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    cargo_date: [...arrItem],
                }
            }
            return state = newObj
        case GET_INSTANT_RATE_LOCATION_SUCCESS:
            return {
                ...state,
                instantRateLocation: action.payload,
                error: null,
            };
        case GET_INSTANT_RATE_LOCATION_FAILURE:
            return {
                ...state,
                instantRateLocation: [],
                error: action.payload,
            };
        case GET_ALL_INCOTERM_SUCCESS:
            return {
                ...state,
                incoterm: action.payload,
                error: null,
            };
        
        // ------------------ search Result
        case GET_INSTANT_SEARCH_RESULT_TYPE:
            return {
                ...state,
                instantSearchResult: action.payload
            }
        
        default:
            return state;
    }
}

export default instantRate