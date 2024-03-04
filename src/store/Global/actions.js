import { DELETE_PERMISSIONS_TYPE, POST_SURCHARGE_ALISE_DATA, POST_SURCHARGE_CATEGORY_DATA, POST_SURCHARGE_CODE_DATA, SAVE_PERMISSIONS_TYPE } from "./actiontype"
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
export const savePermissions = (roleId, moduleId, actionName) => ({
    type: SAVE_PERMISSIONS_TYPE,
    payload: { roleId, moduleId, actionName }
});

export const deletePermissions = (roleId, moduleId, actionName) => ({
    type: DELETE_PERMISSIONS_TYPE,
    payload: { roleId, moduleId, actionName }
});
