import axios from "axios";
import * as url from "../url_helper"

export async function LoginAPI(dataObj) {
    return axios({
            method: 'POST',
            url: url.LOGIN_API,                
            headers: {
                ...dataObj,
            }
        }).then(response => response)
}