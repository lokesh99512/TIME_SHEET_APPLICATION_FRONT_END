import { POST_SURCHARGE_CODE_DATA } from "./actiontype"
export const postSurchargeCodeAction = (data) => {
    return {
        type: POST_SURCHARGE_CODE_DATA,
        payload: { data }
    }
}