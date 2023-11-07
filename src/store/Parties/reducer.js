import { GET_CUSTOMERS_TABLE_DATA_FAIL, GET_CUSTOMERS_TABLE_DATA_SUCCESS, GET_VENDORS_TABLE_DATA_FAIL, GET_VENDORS_TABLE_DATA_SUCCESS, UPDATE_CUSTOMER_SWITCH, UPDATE_VENDOR_SWITCH } from "./actiontype";


const INIT_STATE = {
  parties_customers_data: [],
  parties_vendors_data: [],
};

const parties = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_TABLE_DATA_SUCCESS:
      // console.log(action,"action");
      return {
        ...state,
        parties_customers_data: action.payload,
      };

    case GET_CUSTOMERS_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CUSTOMER_SWITCH:
      const { user_id, user_is_active } = action.payload;
      const updatedCustomerItems = state.parties_customers_data.map((item) =>
        item.id === user_id ? { ...item, is_active: !user_is_active } : item
      );
      return { ...state, parties_customers_data: updatedCustomerItems };

      // ---------------------
      case GET_VENDORS_TABLE_DATA_SUCCESS:
      // console.log(action,"action");
      return {
        ...state,
        parties_vendors_data: action.payload,
      };

    case GET_VENDORS_TABLE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_VENDOR_SWITCH:
      const { user_id:id, user_is_active:active } = action.payload;
      const updatedVendorItems = state.parties_vendors_data.map((item) =>
        item.id === id ? { ...item, is_active: !active } : item
      );
      return { ...state, parties_vendors_data: updatedVendorItems };
      // ---------------------


    default:
      return state;
  }
};

export default parties;
