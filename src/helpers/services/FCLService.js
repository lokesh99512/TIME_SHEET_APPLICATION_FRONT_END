import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";

export const getFCLTableData = () => get(url.Get_FCL_Data);
export const postFclUploadSer = (data) => post(url.Get_FCL_Data, data);
export const postFclFreightUploadSer = (formData) => postFormData(url.Upload_FCL_freight_Data, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const postFclSurchargeUploadSer = (data) => put(url.Upload_FCL_surcharge_Data, data);
export const getFCLFreightViewData = (id) => get(url.Get_FCL_View_Freight_Data + id);