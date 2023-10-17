import { UPDATE_QUOTE_MODAL_CHARGES } from "./actiontype";

const INIT_STATE = {
    quotation_modal_charge: [],
}
const quotation = (state=INIT_STATE,action) => {
    switch (action.type) {
        case UPDATE_QUOTE_MODAL_CHARGES:
            return state
    
        default:
            return state
    }
    
}

export default quotation;