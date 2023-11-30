import * as Yup from "yup"

export const email = Yup.string().required('Please enter an email address').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Please enter a valid email address' )
export const password = Yup.string().required('Please enter a password');