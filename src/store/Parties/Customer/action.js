import { GET_PARTIES_CUSTOMER_DETAILS_TYPE, UPLOAD_CUSTOMER_COMPANYDATA_TYPE, UPLOAD_CUSTOMER_CONTACT_TYPE, UPLOAD_CUSTOMER_DOCUMENT_TYPE } from "./actiontype";

export const getAllPartiesCustomerData = (data) => {
    console.log(data, "data getAllPartiesData");
    return {
        type: GET_PARTIES_CUSTOMER_DETAILS_TYPE,
        payload: data,
    };
};

// get basic company details
export const postCustomerDetailsAction = (data) => {
    console.log(data, "---->>getAllCustomerDetailsData");
    return {
        type: UPLOAD_CUSTOMER_COMPANYDATA_TYPE,
        payload: { data },
    };
};

export const postCustomerContactAction = (data) => ({
    type: UPLOAD_CUSTOMER_CONTACT_TYPE,
    payload: { data }
})
export const postCustomerDocumentAction = (data) => ({
    type: UPLOAD_CUSTOMER_DOCUMENT_TYPE,
    payload: { data }
})