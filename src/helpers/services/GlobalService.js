import * as url from "../url_helper"
import { get } from "../api_helper";

export const getVendorData = () => get(url.Get_Vendor_Data);
export const getCurrencyData = () => get(url.Get_Currency_Data);
export const getUomData = () => get(url.Get_Uom_Data);
export const getOceanPortData = () => get(url.Get_Ocean_Port_Data);

// surcharge
export const getSurchargeCodeData = () => get(url.Get_surcharge_code_Data);
export const getSurchargeCategoryData = () => get(url.Get_surcharge_category_Data);