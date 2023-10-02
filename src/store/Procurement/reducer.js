import { GET_FCL_TABLE_DATA, GET_FCL_TABLE_DATA_FAIL, GET_FCL_TABLE_DATA_SUCCESS, GET_LCL_TABLE_DATA_FAIL, GET_LCL_TABLE_DATA_SUCCESS, UPDATE_FCL_TABLE_DATA } from "./actiontype";

const INIT_STATE = {
    fcl_data: [],
    lclData: [],
    error: {},
    lclError: {},
}
const procurement = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_FCL_TABLE_DATA_SUCCESS:
            return{
                ...state,
                fcl_data: action.payload,
            }
        case GET_FCL_TABLE_DATA_FAIL:
            return{
                ...state,
                error: action.payload,
            }
    
        case UPDATE_FCL_TABLE_DATA:
            return{
                ...state,
                fcl_data: action.payload,
            }
    
        case GET_LCL_TABLE_DATA_SUCCESS:
            return{
                ...state,
                lclData: action.payload,
            }
        case GET_LCL_TABLE_DATA_FAIL:
            return{
                ...state,
                lclError: action.payload,
            }    
        default:
            return state;
    }
}

export default procurement;