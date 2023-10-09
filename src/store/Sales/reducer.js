import { GET_QUOTATION_DATA_FAIL, GET_QUOTATION_DATA_SUCCESS } from "./actiontype"


const INIT_STATE = {
    quotation_data: [],
    quotation_error: {}
}

const sales = (state=INIT_STATE,action) => {
    switch (action.type){
        case GET_QUOTATION_DATA_SUCCESS:
            return{ ...state, quotation_data: action.payload }

        case GET_QUOTATION_DATA_FAIL:
            return {...state,quotation_error: action.payload}

        default:
            return state;
    }
}

export default sales