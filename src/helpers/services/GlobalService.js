import * as url from "../url_helper"
import { get, getWithOutAuth, post } from "../api_helper";

export const getVendorData = () => get(url.Get_Vendor_Data);
export const getCurrencyData = () => get(url.Get_Currency_Data);
export const getUomData = () => get(`${url.Get_Uom_Data}`);
export const getUomWeightData = () => get(url.Get_Uom_Data + '?weightParameterOnly=true');
export const getOceanPortData = () => get(url.Get_Ocean_Port_Data);
export const getCargoTypeData = () => get(url.Get_Cargo_Type_Data);
export const getContainerData = () => get(url.Get_Container_Data);
export const getStateAllSer = () => get(url.Get_State_ALL_URL);
export const getRoleAllSer = () => get(url.GET_ROLE_URL);

// surcharge
export const getSurchargeCodeData = () => get(url.Get_surcharge_code_Data);
export const getSurchargeCategoryData = () => get(url.Get_surcharge_category_Data);
export const getSurchargeAliceSer = () => get(url.Get_Surcharge_Alice_Data);
export const postSurchargeCodeSer = (data) => post(url.Post_Surcharge_Data, data);
export const postSurchargeCateSer = (data) => post(url.POST_SURCHARGE_CATE_URL, data);
export const postSurchargeAliseSer = (data) => post(url.POST_SURCHARGE_ALISE_URL, data);

// Image Download
export const GetFileSer = (base64Encoded) => getWithOutAuth(url.Get_File_URL + base64Encoded);


// instant rate search droup downs
export const getInstantRateLocation = () => get(url.GET_INSTANT_RATE_LOCATION);
export const getAirLocation = () => get(url.GET_AIR_LOCATION_URL);
export const getAllIncoTerms = () => get (url.GET_ALL_INCOTERM)

// tenant location
export const getAllTenantLocation = () => get (url.GET_ALL_TANANT_LOCATION);
export const postTenantLocation = (data) => post(url.POST_TANANT_LOCATION, data);

// tenant location type
export const getAllTenantLocationType = () => get (url.GET_ALL_TANANT_LOCATION_TYPE);
export const postTenantLocationType= (data) => post (url.POST_TANANT_LOCATION_TYPE, data);

export const getUploadStatus = () => get(url.Get_Upload_Status);
