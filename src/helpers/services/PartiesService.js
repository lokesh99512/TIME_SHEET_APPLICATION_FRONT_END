import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";



export const postVenderUpload = data => {
   
    return postFormData(url.Upload_Vender_Data, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}




// --------------------------------------- Darshita

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