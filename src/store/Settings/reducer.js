import {
  GET_USERS_TABLE_DATA_SUCCESS,
  // UPDATE_SURCHARGE_FCL_TABLE_DATA,
  GET_USERS_TABLE_DATA_FAIL,
  UPDATE_USER_SWITCH,
  GET_COMPANYDETAILS_DATA_SUCCESS,
  GET_COMPANYDETAILS_DATA_FAIL,
} from "./actiontype";

const INIT_STATE = {
  settings_users_data: [],
  settings_companydetails_data: [],
};

const settings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_TABLE_DATA_SUCCESS:
      // console.log(action,"action");
      return {
        ...state,
        settings_users_data: action.payload,
      };

    // case UPDATE_SURCHARGE_FCL_TABLE_DATA:
    //   return {
    //     ...state,
    //     fcl_data: action.payload,
    //   };

    case GET_USERS_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_USER_SWITCH:
      const { user_id, user_is_active } = action.payload;
      const updatedUserItems = state.settings_users_data.map((item) =>
        item.id === user_id ? { ...item, is_active: !user_is_active } : item
      );
      return { ...state, settings_users_data: updatedUserItems };


    case GET_COMPANYDETAILS_DATA_SUCCESS:
      return {
        ...state,
        settings_companydetails_data: action.payload,
      };

      case GET_COMPANYDETAILS_DATA_FAIL:
        return {
          ...state,
          error: action.payload,
        }; 

    default:
      return state;
  }
};

export default settings;
