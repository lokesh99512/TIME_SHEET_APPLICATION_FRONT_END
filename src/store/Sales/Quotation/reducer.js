import { ADD_QUOTE_MODAL_CHARGES, BLANK_MODAL_CHARGE, GET_CURRENCY_EXCHANGE_RATE_SUCCESS, REMOVE_QUOTE_MODAL_CHARGES, UPDATE_QUOTE_MODAL_CHARGES } from "./actiontype";

const INIT_STATE = {
    inputObj: {
        component: '',
        uomCode: '',
        unit: 1,
        currencyCode: '',
        unitPerPrice: '',
        markup_type: '',
        markup_val: '',
        taxDetail: {
            taxPercentage: '',
            value: ''
        },
        total_sale_cost: ''
    },
    currency_ExchangeRate: [],
    mainChargeObj: []
}
const quotation = (state = INIT_STATE, action) => {
    switch (action.type) {
        // case ADD_QUOTE_MODAL_CHARGES:
        //     let charge_name = action.payload.name
        //     let id = action.payload.id
        //     let mappCharge = action.payload.charges

        //     const updatedArray = [...state.mainChargeObj];

        //     if (updatedArray.length > 0) {
        //         const existingIndex = updatedArray.findIndex(obj => obj.id === id);

        //         if (existingIndex !== -1) {
        //             const existingObject = updatedArray[existingIndex];
        //             let updatedCharge = existingObject[charge_name];

        //             if (Array.isArray(updatedCharge)) {
        //                 updatedCharge = [...updatedCharge, mappCharge];
        //             } else {
        //                 updatedCharge = [mappCharge];
        //             }

        //             // Update the specific object within the array
        //             updatedArray[existingIndex] = {
        //                 ...existingObject,
        //                 [charge_name]: updatedCharge,
        //             };
        //         } else {
        //             // If no object with the same ID exists, add a new object
        //             const newObj = { id, [charge_name]: [mappCharge] };
        //             updatedArray.push(newObj);
        //         }
        //     } else {
        //         // If the array is empty, add a new object
        //         updatedArray.push({ id, [charge_name]: [mappCharge] });
        //     }
        //     return {
        //         ...state,
        //         mainChargeObj: updatedArray
        //     }

        case ADD_QUOTE_MODAL_CHARGES: 
            let newArray2 = [...state.mainChargeObj];
            if(newArray2.find(item => item.id === action.payload.id)){

                let existingIndex = newArray2.findIndex(obj => obj.id === action.payload.id);
                let subArray = [...newArray2[existingIndex].tariffDetails];

                if(newArray2[existingIndex].tariffDetails.some((obj) => obj.header === action.payload.charge_name)){
                    let index = subArray.findIndex((obj) => obj.header === action.payload.charge_name);
                    subArray[index].tariffBreakDowns.push({...state.inputObj});
                } else {
                    subArray.push({header: action.payload.charge_name, tariffBreakDowns: [{...state.inputObj}]  });
                }
                newArray2[existingIndex].tariffDetails = subArray;
            } else {
                let newObj = {id: action.payload.id, tariffDetails: [{header: action.payload.charge_name, tariffBreakDowns: [{...state.inputObj}]  }] }
                newArray2.push(newObj);
            }     
            return {
                ...state,
                mainChargeObj: newArray2
            }

        case UPDATE_QUOTE_MODAL_CHARGES:
            let newArray = [...state.mainChargeObj];
            let existingIndex = newArray.findIndex(obj => obj.id === action.payload.id);
            const updatedItem = {
                ...newArray[existingIndex],
                tariffDetails: newArray[existingIndex]?.tariffDetails?.map((item, index) => {
                    if (item.header === action.payload.charge_name) {
                        return {
                            ...item,
                            tariffBreakDowns: item.tariffBreakDowns.map((subItem, subindex) => {
                                if (subindex === action.payload.index) {
                                    if(action.payload.name === 'markup_val'){
                                        return {
                                            ...subItem,
                                            [action.payload.name]: action.payload.value,
                                            'margin_value': action.payload.newVal,
                                            total_sale_cost: action.payload.sales_cost
                                        };
                                    } else if (action.payload.name === 'taxPercentage'){
                                        return {
                                            ...subItem,
                                            taxDetail: {
                                                [action.payload.name]: action.payload.value,
                                                value: action.payload.newVal,
                                            },
                                            total_sale_cost: action.payload.sales_cost
                                        };
                                    } else {
                                        return {
                                            ...subItem,
                                            [action.payload.name]: action.payload.value
                                        };
                                    }
                                } else {
                                    return subItem;
                                }
                            })
                        }
                    } else {
                        return item;
                    }
                })
                // tariffDetails: newArray[existingIndex]?.tariffDetails?.find(item => item.header === action.payload.charge_name).tariffBreakDowns?.map((item, subindex) => {
                //     if (subindex === action.payload.index) {
                //         if(action.payload.name === 'markup_val'){
                //             return {
                //                 ...item,
                //                 [action.payload.name]: action.payload.value,
                //                 'margin_value': action.payload.newVal,
                //                 total_sale_cost: action.payload.sales_cost
                //             };
                //         } else if (action.payload.name === 'taxPercentage'){
                //             return {
                //                 ...item,
                //                 taxDetail: {
                //                     [action.payload.name]: action.payload.value,
                //                     value: action.payload.newVal,
                //                 },
                //                 total_sale_cost: action.payload.sales_cost
                //             };
                //         } else {
                //             return {
                //                 ...item,
                //                 [action.payload.name]: action.payload.value
                //             };
                //         }
                //     }
                // })
            }
      
            // const updatedItem = {
            //     ...newArray[existingIndex],
            //     [action.payload.charge_name]: newArray[existingIndex][action.payload.charge_name].map((item, index) => {
            //         if (index === action.payload.index) {
            //             if(action.payload.name === 'markup_val'){
            //                 return {
            //                     ...item,
            //                     [action.payload.name]: action.payload.value,
            //                     'margin_value': action.payload.newVal,
            //                     total_sale_cost: action.payload.sales_cost
            //                 };
            //             } else if (action.payload.name === 'tax'){
            //                 return {
            //                     ...item,
            //                     [action.payload.name]: action.payload.value,
            //                     'tax_amount': action.payload.newVal,
            //                     total_sale_cost: action.payload.sales_cost
            //                 };
            //             } else {
            //                 return {
            //                     ...item,
            //                     [action.payload.name]: action.payload.value
            //                 };
            //             }
            //         }
            //         return item;
            //     })
            // };
            newArray[existingIndex] = updatedItem;

            return {
                ...state,
                mainChargeObj: newArray
            };

        case REMOVE_QUOTE_MODAL_CHARGES:
            const removeArray = [...state.mainChargeObj];
            const removeexistingIndex = removeArray.findIndex(obj => obj.id === action.payload.id);
            const removeupdatedItem = {
                ...removeArray[removeexistingIndex],
                [action.payload.charge_name]: removeArray[removeexistingIndex][action.payload.charge_name].filter((item,index) => index !== action.payload.index)
            };
            removeArray[removeexistingIndex] = removeupdatedItem;

            return {
                ...state,
                mainChargeObj: removeArray
            };

        case GET_CURRENCY_EXCHANGE_RATE_SUCCESS:
            return {
                ...state,
                currency_ExchangeRate: action.payload
            }

        case BLANK_MODAL_CHARGE:
            return {
                ...state,
                mainChargeObj: []
            }            

        default:
            return state
    }

}

export default quotation;