import axios from "axios";
import * as url from "../url_helper"
import { get, post } from "../api_helper";

export async function LoginAPI(dataObj) {
    return axios({
        method: 'POST',
        url: url.LOGIN_API,
        headers: {
            ...dataObj,
        }
    }).then(response => response)
}

// export async function CompanyBasicDetailsAPI(dataObj) {
//     return axios({
//             method: 'POST',
//             url: url.COMPANY_BASIC_DETAILS,                
//            data : data
//         }).then(response => response)
// }

export const CompanyBasicDetailsAPI = data => {
   
    return post(url.COMPANY_BASIC_DETAILS, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const CompanyUsersDetails = () => get(url.COMPANY_USER_DETAILS)
export const CompanyUserAddDetails = data => {
    return post((url.COMPANY_USER_ADD_DETAILS), data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// export const CompanyCityDetails = data =>{
//     console.log("CompanyPinCodeBasicDetails",data);
//     return post(url.COMPANY_BASIC_PIN_CODE_DETAILS, data, {
// })}

export const CompanyCityDetails = () => get(url.COMPANY_CITY_DETAILS)
export const CompanyStateDetails = ({ cityId }) => get(`${url.COMPANY_STATE_DETAILS}?cityId=${cityId}`)
export const CompanyCountryDetails = ({ cityId }) => get(`${url.COMPANY_COUNTRY_DETAILS}?cityId=${cityId}`)
export const CompanyPincodeDetails = ({ cityId }) => get(`${url.COMPANY_PINCODE_DETAILS}?cityId=${cityId}`)


// all taxes
export const CompanyTaxDetails = data => {
    return post((url.COMPANY_TAX_DETAILS), data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
export const CompanyBusinessDetails = data => {
    return post((url.COMPANY_BUSINESS_DETAILS), data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
}


// GET ALL company settings
export const CompanyAllDetails = () => get(url.COMPANY_GET_ALL_DETAILS)

export const getPartiesAllTable = () => {
    return get((url.GET_ALL_PARTIES_TABLE), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

export const getPartiesAllVendorTable = () => {
    return get(url.GET_ALL_PARTIES_VENDOR_TABLE, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

// get all parties into surcharge table data
export const getPartiesSurchargeTable = () => {
    return get(url.GET_ALL_SETTINGS_SURCHARGE_FCL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

// get all parties into surcharge table data only surcharge code
export const getPartiesSurchargeTableAliasCode = () => {
    return get(url.GET_ALL_SETTINGS_SURCHARGE_FCL_ALIAS_CODE, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

// POST ADD data in surcharge table
export const getAddSurchargeData = data => {
    return post(url.GET_SURCHARGE_ADD_DATA, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// get surcharge category
export const getAllSurchargeCategory = () => {
    return get(url.GET_SURCHARGE_CATEGORY, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}

// customers employeee data
export const getAllPartiesCustomerEmployeeDeatils = () => {
    return get(url.GET_PARTIES_CUSTOMERS_EMPLOYEE_DETAILS, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}


