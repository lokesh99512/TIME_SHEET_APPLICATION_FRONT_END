import { POST_SURCHARGE_ALISE_DATA, POST_SURCHARGE_CATEGORY_DATA, POST_SURCHARGE_CODE_DATA } from "./actiontype"
export const postSurchargeCodeAction = (data) => {
    return {
        type: POST_SURCHARGE_CODE_DATA,
        payload: { data }
    }
}

export const postSurchargeCateAction = (data) => ({
    type: POST_SURCHARGE_CATEGORY_DATA,
    payload: { data }
})
export const postSurchargeAliseAction = (data) => ({
    type: POST_SURCHARGE_ALISE_DATA,
    payload: { data }
})