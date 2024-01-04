import { GET_CUSTOMERS_ID, GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS, GET_VENDOR_DETAILS_ID, GET_VENDOR_LIST_SUCCESS, VENDOR_LOADER_TYPE, VENDOR_TAB_ACTIVE_TYPE } from "./actiontype";

const INIT_STATE = {
    vendors_data: [],
    vendor_loader: false,
    vendor_id: {},
    vendor_active_Tab: {
        tab: 1,
        details: 'pending',
        contact: 'pending',
        document: 'pending',
    },
};
const vendor = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_VENDOR_LIST_SUCCESS:
            return {
                ...state,
                vendors_data: action.payload,
            };
        case VENDOR_LOADER_TYPE:
            return {
                ...state,
                vendor_loader: action.payload,
            };
        case GET_VENDOR_DETAILS_ID:
            return {
                ...state,
                vendor_id: action.payload,
            };
        case VENDOR_TAB_ACTIVE_TYPE:
            return {
                ...state,
                vendor_active_Tab: action.payload,
            };

        default:
            return state;
    }
}

export default vendor;