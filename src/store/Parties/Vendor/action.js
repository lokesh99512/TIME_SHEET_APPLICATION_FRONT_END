import { GET_VENDOR_LIST_TYPE, UPLOAD_VENDOR_CONTACT_TYPE, UPLOAD_VENDOR_DETAILS_TYPE, UPLOAD_VENDOR_DOCUMENT_TYPE } from "./actiontype";

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
export const postVendorContactAction = (data) => ({
    type: UPLOAD_VENDOR_CONTACT_TYPE,
    payload: { data },
});
export const postVendorDocumentAction = (data) => ({
    type: UPLOAD_VENDOR_DOCUMENT_TYPE,
    payload: { data },
});
