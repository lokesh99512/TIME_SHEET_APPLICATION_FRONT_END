import { get } from "../api_helper";
import * as url from "../url_helper";

export const getFCLTableData = () => get(url.Get_FCL_Data);