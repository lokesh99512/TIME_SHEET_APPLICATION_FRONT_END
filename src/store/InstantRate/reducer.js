import { GET_INSTANT_RATE_LOCATION_FAILURE, GET_INSTANT_RATE_LOCATION_SUCCESS, ADD_OBJECT_INSTANT_SEARCH, REMOVE_OBJECT_INSTANT_SEARCH, UPDATE_INSTANT_RATE_SWAP, UPDATE_SEARCH_INSTANT_RATE_DATA, UPDATE_SEARCH_INSTANT_RATE_DATE, UPDATE_VALUE_BLANK, GET_ALL_INCOTERM, GET_ALL_INCOTERM_SUCCESS, GET_INSTANT_SEARCH_RESULT_TYPE, UPDATE_QUOTATION_RESULT_DETAILS, CONFIRM_PREVIEW_DATA, QUOTATION_RESULT_UPDATE, QUOTATION_RESULT_SELECTED_BLANK, QUOTATION_RESULT_SELECTED, POST_INSTANT_SEARCH_LOADER } from "./actionType"


const INIT_STATE = {
    searchForm: {
        // customer_name: '',
        // service_type: '',
        // shipping_by: '',
        // cargo_weight: { weight: "MT",value: ''},
        cargo_type: { value: "GENERAL",label: "GENERAL", id: 1, version: 0 },
        cargo_value: { currency: { label: 'INR', value: 'rupee',currencyCode: "INR", id: 2, version: 0 }, value: '' },
        // incoterm: '',
        customerName: '',
        container_type: { cargo_weight: { weight: {value: "MT",label: "MT", id: 7, version: 2}, value: '' } },
        // shipment_details: "",
        cargo_date: '',
        location_from: '',
        location_to: '',
    },
    instantRateLocation: [],
    incoterm: [],
    instantSearchResult: [],
    instantSearchResultCopy: [],
    quote_selected_data: [],
    result_loader: false,
    error: null,
};


const instantRate = (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPDATE_INSTANT_RATE_SWAP:
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    location_to: state.searchForm.location_from,
                    location_from: state.searchForm.location_to
                }
            }

        case ADD_OBJECT_INSTANT_SEARCH:
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    [action.payload]: ''
                }
            }
        case REMOVE_OBJECT_INSTANT_SEARCH:
            const objectCopy = { ...state.searchForm };
            delete objectCopy[action.payload];
            return {
                ...state,
                searchForm: {
                    ...objectCopy
                }
            }

        case UPDATE_VALUE_BLANK:
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    [action.payload]: ''
                }
            }

        case UPDATE_SEARCH_INSTANT_RATE_DATA:
            const { item, name } = action.payload
            return {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    [name]: item
                }
            }

        case UPDATE_SEARCH_INSTANT_RATE_DATE:
            const { arrItem } = action.payload
            let newObj = {
                ...state,
                searchForm: {
                    ...state.searchForm,
                    cargo_date: [...arrItem],
                }
            }
            return state = newObj
        case GET_INSTANT_RATE_LOCATION_SUCCESS:
            return {
                ...state,
                instantRateLocation: action.payload,
                error: null,
            };
        case GET_INSTANT_RATE_LOCATION_FAILURE:
            return {
                ...state,
                instantRateLocation: [],
                error: action.payload,
            };
        case GET_ALL_INCOTERM_SUCCESS:
            let existingObj = action.payload.content?.find((obj) => obj.name === "EX WORKS")
            return {
                ...state,
                incoterm: action.payload.content.map((item) => {
                    return {
                        value: item.id,
                        label: item.name,
                        version: item.version
                    }
                }),
                error: null,
                searchForm: {
                    ...state.searchForm,
                    incoterm: {
                        value: existingObj?.id,
                        label: existingObj?.name,
                        version: existingObj?.version
                    }
                }
            };
        
        // ------------------ search Result
        case GET_INSTANT_SEARCH_RESULT_TYPE:
            return {
                ...state,
                instantSearchResult: action.payload,
                instantSearchResultCopy: action.payload.map((item) => {
                    return {
                        ...item,
                        tariffDetails: item.tariffDetails.map((item) => {
                            return {
                                ...item,
                                selected: true
                            }
                        })
                    }
                }),
            }
        case UPDATE_QUOTATION_RESULT_DETAILS:
            return {
                ...state,
                instantSearchResultCopy: state.instantSearchResultCopy.map((item, index) => {
                    if (item.carrierId === action.payload.id) {
                        return {
                            ...item,
                            tariffDetails: item.tariffDetails.map((item, index) => {
                                if (index === action.payload.index) {
                                    return {
                                        ...item,
                                        selected: action.payload.value
                                    };
                                }
                                return item;
                            })
                        };
                    }
                    return item;
                }),
            }
        case QUOTATION_RESULT_SELECTED:
            return {
                ...state,
                quote_selected_data: action.payload
            }

        case QUOTATION_RESULT_UPDATE:
            const newArray = [...state.quote_selected_data];
            const existingIndex = newArray.findIndex(obj => obj.carrierId === action.payload.id);
            let updatedItem = {
                ...newArray[existingIndex],
                tariffDetails: newArray[existingIndex].tariffDetails.map((item, innerIndex) => {
                  if (innerIndex === action.payload.index) {
                    return {
                      ...item,
                      tariffBreakDowns: item.tariffBreakDowns.map((subItem, subInnerIndex) => {
                        if (subInnerIndex === action.payload.subindex) {
                          if (action.payload.name === 'markup_val') {
                            return {
                              ...subItem,
                              margin_value: action.payload.marginVal,
                              total_sale_cost: action.payload.sales_cost,
                              [action.payload.name]: action.payload.value,
                            };
                          } else {
                            return {
                              ...subItem,
                              [action.payload.name]: action.payload.value
                            };
                          }
                        }
                        return subItem;
                      })
                    };
                  }
                  return item;
                })
              };
            newArray[existingIndex] = updatedItem;

            return {
                ...state,
                quote_selected_data: newArray
            };
    
        case CONFIRM_PREVIEW_DATA:
            return {
                ...state,
                quote_selected_data: action.payload
            } 

        case QUOTATION_RESULT_SELECTED_BLANK:
            return { ...state, quote_selected_data: [] }
        case POST_INSTANT_SEARCH_LOADER:
            return { ...state, result_loader: action.payload }

        default:
            return state;
    }
}

export default instantRate