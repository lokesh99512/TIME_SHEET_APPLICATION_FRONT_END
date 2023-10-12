import { GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS ,
    // UPDATE_SURCHARGE_FCL_TABLE_DATA,
    GET_FCL_SURCHARGE_TABLE_DATA_FAIL } from "./actiontype";

const INIT_STATE = {
  fcl_surcharge_data: [],
};

const rate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FCL_SURCHARGE_TABLE_DATA_SUCCESS:
        // console.log(action,"action");
      return {
        ...state,
        fcl_surcharge_data: action.payload,
      };

    // case UPDATE_SURCHARGE_FCL_TABLE_DATA:
    //   return {
    //     ...state,
    //     fcl_data: action.payload,
    //   };

    case GET_FCL_SURCHARGE_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default rate;
