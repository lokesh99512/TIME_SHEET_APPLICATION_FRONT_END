import { UPLOAD_CUSTOMER_CONTACT_TYPE } from "./actiontype";

export const postCustomerContactAction = (data) => ({
    type: UPLOAD_CUSTOMER_CONTACT_TYPE,
    payload: { data }
})