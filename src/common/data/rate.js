// ---------------------- breadcrumbs --------------------------------------
const fclSurchargeBreadcrumb = [
    {
        label: 'Rate Management',
        link: '/#',
        active: false
    },
    {
        label: 'Surcharge Mater',
        link: '/#',
        active: false
    },
    // {
    //     label: 'Ocean Freight',
    //     link: '/#',
    //     active: false
    // },
    {
        label: 'FCL Surcharge master',
        link: '/#',
        active: true
    },
]

// ---------------------- breadcrumbs --------------------------------------


// --------------------- rate ----------------------------------------------
const fclSurchargeRateData = [
    {
        id: 1,
        title: 'Total Active Ports',
        rate: '12',
        compare_rate: '12',
        rate_type: 'down'
    },
    {
        id: 2,
        title: 'Rate Density',
        rate: '31',
        compare_rate: '24',
        rate_type: 'up'
    },
    {
        id: 3,
        title: 'Avg Conversion',
        rate: '13',
        compare_rate: '12',
        rate_type: 'down'
    },
]
// --------------------- rate ----------------------------------------------



const fclSurchargeTableData = [
    {
        id: 1,
        charge_code:"OTHC",
        charge_desc:"Original Terminal Handling Charge",
        charge_category:"PORT CHARGE",
        charge_alias_code:"THL",
    },
    {
        id: 2,
        charge_code:"DTHC",
        charge_desc:"Original Terminal Handling Charge",
        charge_category:"PORT CHARGE",
        charge_alias_code:"THD",
    },
]

// --------------------------upload from option----------------------
const optionVendorName = [
    { label: "Vendor Name1", value: "vendorname1" },
    { label: "Vendor Name2", value: "vendorname2" },
]
const optionCarrierName = [
    { label: "Carrier Name1", value: "carriername1" },
    { label: "Carrier Name2", value: "carriername2" },
]
const optionMultiDestination = [
    { value: 'selectAll', label: 'Select All' },
    { label: "Mumbai", value: "mumbai" },
    { label: "Dhaka", value: "dhaka" },
    { label: "Channai", value: "channai" }
]

const status = [
    { label: "Active", value: "Active" },
    { label: "In-Active", value: "In-Active" },
]
const surcharge_code = [
    { label: "OBS", value: "OBS" },
    { label: "OTHC", value: "OTHC" },
    { label: "MFR", value: "MFR" },
    { label: "FSR", value: "FSR" },
]
const surcharge_desc = [
    { label: "One Bunker CHarge", value: "One Bunker CHarge" },
]
const surcharge_category = [
    { label: "Freight Charge", value: "Freight Charge" },
]
const alias_code = [
    { label: "FSC", value: "FSC" },
]




export {
    fclSurchargeBreadcrumb,fclSurchargeRateData,fclSurchargeTableData,optionVendorName,optionCarrierName,optionMultiDestination,status,surcharge_code,surcharge_desc,surcharge_category,alias_code
};

