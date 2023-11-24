import { UPDATE_CONTAINER_CHANGE, UPDATE_CONTAINER_TYPE_CONFIRM, UPDATE_INSTANT_RATE_SWAP, UPDATE_SEARCH_INSTANT_RATE_DATA, UPDATE_SEARCH_INSTANT_RATE_DATE, UPDATE_SHIPMENT_DETAILS_CONFIRM, UPDATE_VALUE_BLANK } from "./actionType"


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
        container_type: {cargo_weight: { weight: "MT",value: ''}},
        shipment_details:"",
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
            console.log(item,name,"avcb");
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

            case UPDATE_SHIPMENT_DETAILS_CONFIRM:
                return state = {
                    ...state,
                    searchForm: {
                        ...state.searchForm,
                        shipment_details: action.payload,
                    }
                }
            case UPDATE_CONTAINER_TYPE_CONFIRM:
                return state = {
                    ...state,
                    searchForm: {
                        ...state.searchForm,
                        container_type: action.payload,
                    }
                }

            case UPDATE_CONTAINER_CHANGE:
                // console.log(action.payload,"pyld")
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    container_type: action.payload
                }
            }

        default:
            return state;
    }
}

export default instantRate