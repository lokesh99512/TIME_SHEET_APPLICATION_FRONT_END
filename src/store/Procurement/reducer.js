import { BLANK_CARRIER_DATA, FILTER_FCL_DATA, FILTER_PORTLOCALCHARGES_DATA, GET_CONSOLE_TABLE_DATA_FAIL, GET_CONSOLE_TABLE_DATA_SUCCESS, GET_FCL_TABLE_DATA_FAIL, GET_FCL_TABLE_DATA_SUCCESS, GET_INLAND_TABLE_DATA_FAIL, GET_INLAND_TABLE_DATA_SUCCESS, GET_LCL_TABLE_DATA_FAIL, GET_LCL_TABLE_DATA_SUCCESS, GET_PORTLOCALCHARGES_TABLE_DATA_FAIL, GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS, GET_WAYBILL_TABLE_DATA_FAIL, GET_WAYBILL_TABLE_DATA_SUCCESS, UPDATE_AIRCONSOLE_SWITCH, UPDATE_AIRWAYBILL_SWITCH, UPDATE_CARRIER_DATA, UPDATE_FCL_SWITCH, UPDATE_FCL_TABLE_DATA, UPDATE_INLAND_SWITCH, UPDATE_LCL_SWITCH } from "./actiontype";

const INIT_STATE = {
    fcl_data: [],
    lclData: [],
    portLocalChargesData: [],
    waybillData: [],
    consoleData: [],
    inlandData: [],
    error: {},
    lclError: {},
    waybillError: {},
    consoleError: {},
    inlandError: {},
    carrierDetails: {
        rate_type: '',
        rate_source: '',
        vendor_type: '',
        vendor_name: '',
        carrier_name: '',
        validity_application: '',
        validity_from: '',
        validity_to: ''
    }
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
        case FILTER_FCL_DATA:
            return{
                ...state,
                fcl_data: action.payload,
            }
        // lcl
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
        // port local charges
        case GET_PORTLOCALCHARGES_TABLE_DATA_SUCCESS:
            return{
                ...state,
                portLocalChargesData: action.payload,
            }
        case GET_PORTLOCALCHARGES_TABLE_DATA_FAIL:
            return{
                ...state,
                portLocalChargesData: action.payload,
            }  
        case FILTER_PORTLOCALCHARGES_DATA:
            return{
                ...state,
                portLocalChargesData: action.payload,
            }  


        case GET_WAYBILL_TABLE_DATA_SUCCESS: 
            return{
                ...state,
                waybillData: action.payload
            }
        case GET_WAYBILL_TABLE_DATA_FAIL: 
            return{
                ...state,
                waybillError: action.payload
            }
        case GET_CONSOLE_TABLE_DATA_SUCCESS:
            return{
                ...state,
                consoleData: action.payload
            }

        case GET_CONSOLE_TABLE_DATA_FAIL:
            return{
                ...state,
                consoleError: action.payload
            }
        case GET_INLAND_TABLE_DATA_SUCCESS:
            return{
                ...state,
                inlandData: action.payload
            }

        case GET_INLAND_TABLE_DATA_FAIL:
            return{
                ...state,
                inlandError: action.payload
            }
        case UPDATE_CARRIER_DATA:
            return{
                ...state,                
                carrierDetails: {
                    ...state.carrierDetails,
                    [action.payload.name]: action.payload.data
                }
            }    
        case BLANK_CARRIER_DATA:
            return{
                ...state,                
                carrierDetails: {
                    rate_type: '',
                    rate_source: '',
                    vendor_type: '',
                    vendor_name: '',
                    carrier_name: '',
                    validity_application: '',
                    validity_from: '',
                    validity_to: ''
                }
            }    
        case UPDATE_FCL_SWITCH:
            const { fcl_id, fcl_is_active } = action.payload;
            const updatedFCLItems = state.fcl_data.map(item =>
                item.id === fcl_id ? { ...item, is_active: !fcl_is_active } : item
            );
            return {...state, fcl_data: updatedFCLItems};
        
        case UPDATE_LCL_SWITCH:
            const { lcl_id, lcl_is_active } = action.payload;
            const updatedLCLItems = state.lclData.map(item =>
                item.id === lcl_id ? { ...item, is_active: !lcl_is_active } : item
            );
            return {...state, lclData: updatedLCLItems};

        case UPDATE_AIRWAYBILL_SWITCH:
            const { id, is_active } = action.payload;
            const updatedItems = state.waybillData.map(item =>
                item.id === id ? { ...item, is_active: !is_active } : item
            );
            return { ...state, waybillData: updatedItems };

        case UPDATE_AIRCONSOLE_SWITCH:
            const { console_id, console_is_active } = action.payload;
            const updatedConsoleItems = state.consoleData.map(item =>
                item.id === console_id ? { ...item, is_active: !console_is_active } : item
            );
            return { ...state, consoleData: updatedConsoleItems };

        case UPDATE_INLAND_SWITCH:
            const { inland_id,inland_is_active } = action.payload;
            const updatedInlandItems = state.inlandData.map(item =>
                item.id === inland_id ? { ...item, is_active: !inland_is_active } : item
            );
            return { ...state, inlandData: updatedInlandItems };

        default:
            return state;
    }
}

export default procurement;