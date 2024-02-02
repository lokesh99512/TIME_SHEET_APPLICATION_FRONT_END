import { get, post } from "../api_helper";
import * as url from "../url_helper"


export const postInstantRateSer = (data) => post(url.POST_INSTANT_RATE_URL, data);
export const filterInstantRateSer = (data) => get(url.FILTER_INSTANT_RATE_URL + data);