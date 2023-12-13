import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";

export const getFCLTableData = () => get(url.Get_FCL_Data);
export const postFclUploadSer = (data) => post(url.Get_FCL_Data, data);
export const postFclFreightUploadSer = ({formData, id}) => postFormData(url.Upload_FCL_freight_Data + id, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const postFclSurchargeUploadSer = ({data, id}) => postFormData(url.Upload_FCL_surcharge_Data + id, data);
export const getFCLFreightViewData = (id) => get(url.Get_FCL_View_Freight_Data + id);
export const getFCLSurchargeViewData = (id) => get(url.Get_FCL_View_Surcharge_Data + id);
export const getFCLDestinationData = (id) => get(`${url.Get_FCL_destination_Data}${id}/D`);


// FCL Port & Local Charges
export const postFclPLUploadSer = (dataObj) => postFormData(url.Upload_FCL_PL_Data, dataObj);

