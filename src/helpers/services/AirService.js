import { get, post, postFormData, put } from "../api_helper";
import * as url from "../url_helper";


export const postAirUploadService = (data) => post(url.Post_Air_destination_Data, data,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    })

export const uploadAirRateData = ({formData}) => 
postFormData(url.Upload_Air_rate_data_ , formData, {
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

export const uploadConsoleAirRateData = ({formData}) => 
postFormData(url.Upload_Air_rate_data_Console_ , formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});


export const fetcAirConsoleTableData = () => get(url.GET_AIR_MWB_DATA_Console);

export const fetcAirFreighConsoletData = (id) => get(url.GET_AIR_MWB_DATA_Console + id);

//Air local Changes
export const getAirPortLocalChargesTableData = () => get(url.GET_AIR_PORT_LOCAL_CHARGES_ALL);
export const postAirPortLocalUploadSer = (dataObj) => postFormData(url.Upload_Air_Port_Local_Data, dataObj);