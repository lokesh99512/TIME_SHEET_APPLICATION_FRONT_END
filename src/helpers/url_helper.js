//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"
export const ADD_INVOICE = "/add/invoice"
export const DELETE_INVOICE = "/delete/invoice"
export const UPDATE_INVOICE = "/update/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//CONTACTS
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data"
export const GET_YEARLY_DATA = "/yearly-data"
export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"

export const GET_PRODUCT_COMMENTS = "/comments-product"

export const ON_LIKNE_COMMENT = "/comments-product-action"

export const ON_ADD_REPLY = "/comments-product-add-reply"

export const ON_ADD_COMMENT = "/comments-product-add-comment"

export const GET_MARKET_OVERVIEW = "GET_MARKET_OVERVIEW"
export const GET_MARKET_OVERVIEW_SUCCESS = "GET_MARKET_OVERVIEW_SUCCESS"
export const GET_MARKET_OVERVIEW_FAIL = "GET_MARKET_OVERVIEW_FAIL"

export const GET_WALLENT_BALANCE = "GET_WALLENT_BALANCE"

export const GET_WALLENT_BALANCE_ALL_DATA = "GET_MARKET_ALL_DATA"

export const GET_Invested_Overview = "GET_Invested_Overview"

// --------------------- procurement --------------------------------
export const GET_FCL = "/get-fcl"
export const GET_LCL = "/get-lcl"
export const GET_PORTLOCALCHARGES = "/get-portlocalcharges"
export const GET_WAYBILL = "/get-waybill"
export const GET_CONSOLE = "/get-console"
export const GET_INLAND = "/get-inland"

// --------------------- Rate Management --------------------------------
export const GET_FCL_SURCHARGE = "/get-fcl-surcharge"

// --------------------- Settings --------------------------------
export const GET_SETTINGS_USERS = "/get-settings-users"
export const GET_SETTINGS_COMPANYDETAILS = "/get-settings-companydetails"

// --------------------- Parties --------------------------------
export const GET_PARTIES_CUSTOMERS = "/get-parties-customers"
export const GET_PARTIES_VENDORS = "/get-parties-vendors"



// -------------------- Sales --------------------------------------------
export const GET_QUOTATION = "get-quotation"
export const GET_QUOTATION_SEARCH_RESULT = "get-quotation-result"
export const GET_QUOTATION_SEARCH_RESULT1 = "get-quotation-result1"
export const GET_QUOTATION_SEARCH_RESULT2 = "get-quotation-result2"
export const GET_QUOTATION_SEARCH_RESULT3 = "get-quotation-result3"
export const GET_quote_exchange_rate = "get-exchangerate"

export const GET_INQUIRY_TABLE = "GET_INQUIRY_TABLE"



// -------------------- original Url Helper
export const LOGIN_API = "/api/v1/user/sign-in"
export const COMPANY_BASIC_DETAILS = "/api/v1/tenant/update-basic-details"
export const COMPANY_USER_DETAILS = "/api/v1/user/"
export const COMPANY_USER_ADD_DETAILS = "/api/v1/user/"
// export const COMPANY_CITY_DETAILS = "/api/v1/pin-code/"
export const COMPANY_CITY_DETAILS = "/api/v1/city/"
export const COMPANY_STATE_DETAILS = "/api/v1/state/"
export const COMPANY_COUNTRY_DETAILS = "/api/v1/country/"
export const COMPANY_PINCODE_DETAILS = "/api/v1/pin-code/"
export const COMPANY_TAX_DETAILS = "/api/v1/tenant/update-tax-details"
export const COMPANY_BUSINESS_DETAILS = "/api/v1/tenant/update-business-details"


// get api in settings of Companysettings
export const COMPANY_GET_ALL_DETAILS = "/api/v1/tenant/" 


// tenant customers 
export const PARTIES_CUSTOMERS_BASIC_DETAILS = "/api/v1/tenant/customer/update-basic-details"



// get all parties customer details
export const GET_ALL_PARTIES_CUSTOMERS = "/api/v1/tenant/customer/"


// get all table in parties
export const GET_ALL_PARTIES_TABLE = "/api/v1/tenant/customer"

// All table vendor listing
export const GET_ALL_PARTIES_VENDOR_TABLE = "/api/v1/tenant/vendor/"

// Parties into Basic companyDetails 
// export const PARTIES_VENDOR_BASIC_DETAILS = "/api/v1/tenant/vendor/update-basic-details"

// get all table in surcharge fcl 
export const GET_ALL_SETTINGS_SURCHARGE_FCL = "/api/v1/surcharge-code/"

// get all table in surcharge fcl only alias code 
export const GET_ALL_SETTINGS_SURCHARGE_FCL_ALIAS_CODE = "/api/v1/surcharge-alias/"

// get to particular id to target
export const GET_SURCHARGE_DATA_ID = "/api/v1/surcharge-code/"

// post api call save data
export const GET_SURCHARGE_ADD_DATA = "/api/v1/surcharge-code/"

// surcharge Category data
export const GET_SURCHARGE_CATEGORY = "/api/v1/surcharge-category/"

// customers details of key manager and sales employee
export const GET_PARTIES_CUSTOMERS_EMPLOYEE_DETAILS = "/api/v1/user/" 