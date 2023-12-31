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
export const postCustomerContactSer = (data) => postFormData(url.UPLOAD_CUSTOMER_CONTACT_URL, data);