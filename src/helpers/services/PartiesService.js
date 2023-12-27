import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";



export const postVenderUpload = ({formData}) => postFormData(url.Upload_Vender_Data, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});