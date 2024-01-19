import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";


export const postAirUploadService = (data) => post(url.Post_Air_destination_Data, data,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })

export const uploadAirRateData = ({formData, id}) => 
postFormData(url.Upload_Air_rate_data_ + id, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});


export const getAirMWBData = () => get(url.GET_AIR_MWB_DATA);


export const getAirFreightData = (id) => get(url.GET_AIR_MWB_DATA + id);


export const postAirConsoleUploadService = (data) => post(url.Post_Air_destination_Data_Console, data,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })

export const uploadConsoleAirRateData = ({formData, id}) => 
postFormData(url.Upload_Air_rate_data_Console_ + id, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});


export const fetcAirConsoleTableData = () => get(url.GET_AIR_MWB_DATA_Console);

export const fetcAirFreighConsoletData = (id) => get(url.GET_AIR_MWB_DATA_Console + id);