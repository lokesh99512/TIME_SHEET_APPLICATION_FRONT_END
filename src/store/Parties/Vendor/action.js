import { GET_VENDOR_LIST_TYPE, UPLOAD_VENDOR_DETAILS_TYPE } from "./actiontype";

export const getVendorListAction = (data) => {
    console.log(data, "data getAllTableVendor");
    return {
        type: GET_VENDOR_LIST_TYPE,
        payload: data,
    };
};

export const postVendorDetailsAction = (formData) => ({
    type: UPLOAD_VENDOR_DETAILS_TYPE,
    payload: { formData },
});
