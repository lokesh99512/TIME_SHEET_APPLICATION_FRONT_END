import * as url from "../url_helper"
import { get } from "../api_helper";

export const getVendorData = () => get(url.Get_Vendor_Data);
export const getCurrencyData = () => get(url.Get_Currency_Data);