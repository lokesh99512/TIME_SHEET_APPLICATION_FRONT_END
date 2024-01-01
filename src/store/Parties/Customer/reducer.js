import { GET_CUSTOMERS_ID, GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS } from "./actiontype";

const INIT_STATE = {
    customer_data: [],
    customer_id: {},
};
const customer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PARTIES_CUSTOMER_DETAILS_TYPE_SUCCESS:
            return {
                ...state,
                customer_data: action.payload,
            };
        case GET_CUSTOMERS_ID:
            return {
                ...state,
                customer_id: action.payload,
            };

        default:
            return state;
    }
}

export default customer;