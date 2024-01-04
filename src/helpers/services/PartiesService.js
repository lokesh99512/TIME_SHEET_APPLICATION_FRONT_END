import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";

// Customer
export const getCustomerDataSer = () => get(url.GET_PARTIES_CUSTOMERS_URL);
export const postCustomerCompanySer = (formData) => postFormData(url.PARTIES_CUSTOMERS_BASIC_DETAILS, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const postCustomerContactSer = (data) => postFormData(url.UPLOAD_CUSTOMER_CONTACT_URL, data);
export const postCustomerDocSer = (formData) => postFormData(url.UPLOAD_CUSTOMER_DOCUMENT_URL, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// Vendor
export const postVenderCompanySer = (formData) => postFormData(url.UPLOAD_VENDOR_DETAIL_URL, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const postVendorContactSer = (data) => postFormData(url.UPLOAD_VENDOR_CONTACT_URL, data);
export const postVenderDocumentSer = (formData) => postFormData(url.UPLOAD_VENDOR_DOCUMENT_URL, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});