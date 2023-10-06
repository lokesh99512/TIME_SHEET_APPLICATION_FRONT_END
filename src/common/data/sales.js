import React from "react"
import { memoji } from "../../assets/images"

// --------- breadcrumbs -----------------------------
const quotationBreadcrumb = [
    {
        label: 'Sales',
        link: '/#',
        active: false
    },
    {
        label: 'Quotations',
        link: '/#',
        active: true
    },
]

// --------------------- rate ----------------------------------------------
const quotationRateData = [
    {
        id: 1,
        title: 'Quotation Sent',
        rate: '59',
        compare_rate: '15',
        rate_type: 'down'
    },
    {
        id: 2,
        title: 'Quotation Won',
        rate: '103',
        compare_rate: '16',
        rate_type: 'up'
    },
    {
        id: 3,
        title: 'Quotation Lost',
        rate: '35',
        compare_rate: '17',
        rate_type: 'down'
    },
    {
        id: 4,
        title: 'Quotation In Progress',
        rate: '67',
        compare_rate: '18',
        rate_type: 'up'
    },
]

// -------------------------------- table data -----------------------------------
const quotationTableData = [
    {
        id: 1,
        quotation_date: '123456ADA',
        quotation_id: '123456ADA',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADA',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',
    },
    {
        id: 2,
        quotation_date: '123456ADB',
        quotation_id: '123456ADB',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADB',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
    {
        id: 3,
        quotation_date: '123456ADC',
        quotation_id: '123456ADC',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADC',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',    
    },
    {
        id: 4,
        quotation_date: '123456ADD',
        quotation_id: '123456ADD',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADD',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
    {
        id: 5,
        quotation_date: '123456ADE',
        quotation_id: '123456ADE',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADE',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
    {
        id: 6,
        quotation_date: '123456ADF',
        quotation_id: '123456ADF',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADF',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
    {
        id: 7,
        quotation_date: '123456ADG',
        quotation_id: '123456ADG',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADG',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
    {
        id: 8,
        quotation_date: '123456ADH',
        quotation_id: '123456ADH',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADH',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
    {
        id: 9,
        quotation_date: '123456ADI',
        quotation_id: '123456ADI',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADI',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
    {
        id: 10,
        quotation_date: '123456ADJ',
        quotation_id: '123456ADJ',
        enquiry_date: '12 Jun 2023',
        enquiry_id: '123456ADJ',
        customer_name: 'Adem Marks',
        quote_status: 'In Progress',
        org_airport: 'Dhaka',
        dest_port: 'Mumbai',
        service_code: 'FCL',
        cargo_type: 'General',
        weight_type: '20HQ',        
    },
]

// --------------- options ---------------
// const optionCustomerName = [
//     {value: "1", label: (
//       <div className="custom-option">
//         <img
//           src={memoji}
//           alt="Profile"
//           className="profile-picture"
//         />
//         <div>Jimmy Camacho</div>
//       </div>
//     ), },
//     {value: "2",label: (
//       <div className="custom-option">
//         <img
//           src={memoji}
//           alt="Profile"
//           className="profile-picture"
//         />
//         <div>Hermione Walker</div>
//       </div>
//     ), },
//     {value: "3",label: (
//       <div className="custom-option">
//         <img
//           src={memoji}
//           alt="Profile"
//           className="profile-picture"
//         />
//         <div>Andreas Benjamin</div>
//       </div>
//     ), },
//     {value: "4",label: (
//       <div className="custom-option">
//         <img
//           src={memoji}
//           alt="Profile"
//           className="profile-picture"
//         />
//         <div>Mackenzie Dale</div>
//       </div>
//     ), },
//     {value: "5",label: (
//       <div className="custom-option">
//         <img
//           src={memoji}
//           alt="Profile"
//           className="profile-picture"
//         />
//         <div>Andreas Benjamin</div>
//       </div>
//     ), },
//     {value: "6",label: (
//       <div className="custom-option">
//         <img
//           src={memoji}
//           alt="Profile"
//           className="profile-picture"
//         />
//         <div>Harri Roberson</div>
//       </div>
//     ), }
// ]
const optionCustomerName = [
    {value: "1", name: 'Jimmy Camacho',img: memoji},
    {value: "2", name: 'Hermione Walker',img: memoji},
    {value: "3", name: 'Andreas Benjamin',img: memoji },
    {value: "4", name: 'Mackenzie Dale',img: memoji },
    {value: "5", name: 'Andreas Benjamin',img: memoji },
    {value: "6", name: 'Harri Roberson',img: memoji}
]
const optionServiceType = [
    {value: "door_to_door", name: 'Door to Door'},
    {value: "door_to_port", name: 'Door to Port'},
    {value: "port_to_port", name: 'Port to Port'},
    {value: "port_to_door", name: 'Port to Door'},
]
const optionTransportBy = [
    {value: "fcl", name: 'FCL'},
    {value: "lcl", name: 'LCL'},
    {value: "bulk", name: 'Bulk'},
]
const optionIncoterm = [
    {value: "CPT", name: 'Carraige Paid To(CPT)'},
    {value: "CFR", name: 'Cost & Freight(CFR)'},
    {value: "CIF", name: 'Cost Insurance and Freight(CIF)'},
    {value: "CIP", name: 'Carraige and Insurance Paid To(CIP)'},
    {value: "DAP", name: 'Delivery at Place(DAP)'},
    {value: "DAT", name: 'Delivery At Terminal(DAT)'},
    {value: "DDU", name: 'Delivery Duty Unpaid(DDU)'},
    {value: "DPU", name: 'Delivered At Place Unploaded(DPU)'},
    {value: "EXW", name: 'EX Works(EXW)'},
]
const optionContainerType = [
    {id: '_standard1',value: "20_standard", name: "20' Standard"},
    {id: '_standard2',value: "40_standard", name: "40' Standard"},
    {id: '_high_cube1',value: "40_high_cube", name: "40' High Cube"},
    {id: '_high_cube2',value: "40_refrigerated", name: "20' Refrigerated"},
    {id: '_refrigerated1',value: "40_refrigerated", name: "40' Refrigerated"},
    {id: '_refrigerated2',value: "45_high_cube", name: "45' High Cube"},
]
const optionCargoType = [
    {value: "hazardous", name: "Hazardous"},
    {value: "general", name: "General"},
    {value: "refrigerated", name: "Refrigerated"},
    {value: "spl_equipment", name: "SPL Equipment"},
]

export {
    quotationBreadcrumb,quotationRateData,quotationTableData,optionCustomerName,optionServiceType,optionTransportBy,optionContainerType,optionIncoterm,optionCargoType
}