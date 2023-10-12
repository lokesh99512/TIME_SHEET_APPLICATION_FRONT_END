import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//invoices
import invoices from "./invoices/reducer"

//contacts
import contacts from "./contacts/reducer"

//dashboard
import dashboard from "./Dashboard/reducer"

// -Procurement
import procurement from "./Procurement/reducer"

// rate
import rate from "./RateManagement/reducer"

// Sales
import sales from "./Sales/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  invoices,
  contacts,
  dashboard,
  procurement,
  sales,
  rate
})

export default rootReducer
