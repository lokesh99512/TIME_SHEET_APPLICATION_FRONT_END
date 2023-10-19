import { GET_CURRENCY_EXCHANGE_RATE_SUCCESS, UPDATE_QUOTE_MODAL_CHARGES } from "./actiontype";

const INIT_STATE = {
    quotation_modal_charge: [],
    currency_ExchangeRate: []
}
const quotation = (state=INIT_STATE,action) => {
    switch (action.type) {
        case UPDATE_QUOTE_MODAL_CHARGES:
            return state
        case GET_CURRENCY_EXCHANGE_RATE_SUCCESS:
            return {
                ...state,
                currency_ExchangeRate: action.payload
            }
        default:
            return state
    }
    
}

export default quotation;