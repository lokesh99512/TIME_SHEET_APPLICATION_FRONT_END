import * as url from "../url_helper"
import { get, post } from "../api_helper";

export const getVendorData = () => get(url.Get_Vendor_Data);
export const getCurrencyData = () => get(url.Get_Currency_Data);
export const getUomData = () => get(url.Get_Uom_Data);
export const getOceanPortData = () => get(url.Get_Ocean_Port_Data);
export const getCargoTypeData = () => get(url.Get_Cargo_Type_Data);
export const getContainerData = () => get(url.Get_Container_Data);

// surcharge
export const getSurchargeCodeData = () => get(url.Get_surcharge_code_Data);
export const getSurchargeCategoryData = () => get(url.Get_surcharge_category_Data);
export const getSurchargeAliceSer = () => get(url.Get_Surcharge_Alice_Data);
export const postSurchargeCodeSer = (data) => post(url.Post_Surcharge_Data, data);