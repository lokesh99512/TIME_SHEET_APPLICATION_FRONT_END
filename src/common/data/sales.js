import React from "react"
import { australia, azerbaijan, cma_logo, india, memoji, pickup_icon, pickup_icon2, pickup_icon3, pickup_icon4, pickup_icon5, pickup_icon6, unitedkingdom, unitedstates } from "../../assets/images"

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

// -------------------------------- table data -----------------------------------
const quotationTableData = [
    {
        id: 'quote_1',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 29th 2023',
        quotation_id: 'BLRFC2923001',
        customer_name: 'Apex Exports Pvt Ltd',
        org_port: 'INMAA',
        dest_port: 'BDDAC',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '',
        quote_status: 'In Progress',
        sales_person: 'Darshita',
        quote_type: 'preffered',
        overall_margin: '9.00',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2460'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
    {
        id: 'quote_2',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 29th 2023',
        quotation_id: 'BLRFC2923002',
        customer_name: 'Balaji Enterprise',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '',
        quote_status: 'In Progress',
        sales_person: 'Darshita',
        quote_type: 'preffered',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2460'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
    {
        id: 'quote_3',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 29th 2023',
        quotation_id: 'BLRFC2923003',
        customer_name: 'House of Tea Exports',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '',
        quote_status: 'In Progress',
        sales_person: 'Vijay',
        quote_type: 'cheaper',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '10',
                tax_amount: '200',
                total_sale_cost: '2400'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '10',
                tax_amount: '200',
                total_sale_cost: '2300'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
    {
        id: 'quote_4',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 25th 2023',
        quotation_id: 'BLRFC2523001',
        customer_name: 'Raj Fruits Exports',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '',
        quote_status: 'Lost',
        sales_person: 'Vijay',
        quote_type: 'cheaper',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '10',
                tax_amount: '200',
                total_sale_cost: '2400'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '10',
                tax_amount: '200',
                total_sale_cost: '2300'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
    {
        id: 'quote_5',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 25th 2023',
        quotation_id: 'BLRFC2923002',
        customer_name: 'Raj Fruits Exports',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '',
        quote_status: 'Won',
        sales_person: 'Vijay',
        quote_type: 'cheaper',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '10',
                tax_amount: '200',
                total_sale_cost: '2400'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '10',
                tax_amount: '200',
                total_sale_cost: '2300'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
    {
        id: 'quote_6',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 25th 2023',
        quotation_id: 'BLRFC2523003',
        customer_name: 'Apex Exports Pvt Ltd',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '',
        quote_status: 'Lost',
        sales_person: 'Sumit',
        quote_type: 'faster',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '20',
                margin_value: '400',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2760'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2460'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
    {
        id: 'quote_7',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 29th 2023',
        quotation_id: 'BLRFC2923004',
        customer_name: 'Apex Exports Pvt Ltd',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '',
        quote_status: 'Won',
        sales_person: 'Sumit',
        quote_type: 'faster',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '20',
                margin_value: '400',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2760'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2460'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
    {
        id: 'quote_8',
        logo: cma_logo,
        name: 'CMA CGM',
        quotation_date: 'Oct 29th 2023',
        quotation_id: 'BLRFC2923005',
        customer_name: 'Balaji Enterprise',
        org_port: 'INMAA',
        dest_port: 'BDDAC',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '',
        quote_status: 'Won',
        sales_person: 'Darshita',
        quote_type: 'preffered',
        pickup: true,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "flat",
                markup_val: '100',
                margin_value: '100',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2460'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                markup_type: "percentage",
                markup_val: '10',
                margin_value: '200',
                tax: '18',
                tax_amount: '360',
                total_sale_cost: '2560'
            }
        ]
    },
]

const searchQuotationResult = [
    {
        id: '1234567890',
        logo: cma_logo,
        name: 'CMA CGM',
        location_from: 'Shenzhen',
        location_to: 'Winnipeg',
        duration: '41',
        valid_from: '01 Jan 2023',
        co_two: '7213.27 kg CO2',
        pickup_co: '7213.27 kg CO2',
        pickup: true,
        pickup_val: 'truck',
        truck: true,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        truck_day: '1',
        truck_km: '4.68',
        truck_charge: '207',
        rail_charge: '0',
        origin_port_co: '18.52 kg CO2',
        origin_pch_charge: '75',
        origin_pcsd_charge: '600',
        origin_sbcio_charge: '600',
        origin_dfo_charge: '70',
        origin_dtc_charge: '40',
        origin_eds_charge: '25',
        origin_ips_charge: '75',
        origin_por_charge: '64',
        origin_sse_charge: '4',
        origin_war_charge: '36',
        origin_othc_charge: '400',
        ocean_freight_co: '7213.27 kg CO2',
        fifo_standard: '5242',
        pickport_discharge_co: '18.52 kg CO2',
        pickport_discharge_charge: '680',
        delivery_co: '12.03 kg CO2',
        delivery_charge: '2473',
        quote_type: 'preffered',
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            }
        ]
    },
    {
        id: '1234567891',
        logo: cma_logo,
        name: 'CMA CGM',
        location_from: 'Shenzhen',
        location_to: 'Winnipeg',
        duration: '41',
        valid_from: '01 Jan 2023',
        co_two: '7213.27 kg CO2',
        pickup_co: '7213.27 kg CO2',
        pickup: true,
        pickup_val: 'truck',
        truck: true,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        truck_day: '1',
        truck_km: '4.68',
        truck_charge: '207',
        rail_charge: '0',
        origin_port_co: '18.52 kg CO2',
        origin_pch_charge: '75',
        origin_pcsd_charge: '600',
        origin_sbcio_charge: '600',
        origin_dfo_charge: '70',
        origin_dtc_charge: '40',
        origin_eds_charge: '25',
        origin_ips_charge: '75',
        origin_por_charge: '64',
        origin_sse_charge: '4',
        origin_war_charge: '36',
        origin_othc_charge: '400',
        ocean_freight_co: '7213.27 kg CO2',
        fifo_standard: '5242',
        pickport_discharge_co: '18.52 kg CO2',
        pickport_discharge_charge: '680',
        delivery_co: '12.03 kg CO2',
        delivery_charge: '2473',
        quote_type: 'cheaper',
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            }
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
            {
                charges_name: 'DFO',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
        ],
        ocean_quote_charge: []
    },
    {
        id: '1234567892',
        logo: cma_logo,
        name: 'CMA CGM',
        location_from: 'Shenzhen',
        location_to: 'Winnipeg',
        duration: '41',
        valid_from: '01 Jan 2023',
        co_two: '7213.27 kg CO2',
        pickup_co: '7213.27 kg CO2',
        pickup: true,
        pickup_val: 'truck',
        truck: true,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        truck_day: '1',
        truck_km: '4.68',
        truck_charge: '207',
        rail_charge: '0',
        origin_port_co: '18.52 kg CO2',
        origin_pch_charge: '75',
        origin_pcsd_charge: '600',
        origin_sbcio_charge: '600',
        origin_dfo_charge: '70',
        origin_dtc_charge: '40',
        origin_eds_charge: '25',
        origin_ips_charge: '75',
        origin_por_charge: '64',
        origin_sse_charge: '4',
        origin_war_charge: '36',
        origin_othc_charge: '400',
        ocean_freight_co: '7213.27 kg CO2',
        fifo_standard: '5242',
        pickport_discharge_co: '18.52 kg CO2',
        pickport_discharge_charge: '680',
        delivery_co: '12.03 kg CO2',
        delivery_charge: '2473',
        quote_type: 'faster',
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
        ],
        ocean_quote_charge: []
    },
    {
        id: '1234567893',
        logo: cma_logo,
        name: 'CMA CGM',
        location_from: 'Shenzhen',
        location_to: 'Winnipeg',
        duration: '41',
        valid_from: '01 Jan 2023',
        co_two: '7213.27 kg CO2',
        pickup_co: '7213.27 kg CO2',
        pickup: true,
        pickup_val: 'truck',
        truck: true,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        truck_day: '1',
        truck_km: '4.68',
        truck_charge: '207',
        rail_charge: '0',
        origin_port_co: '18.52 kg CO2',
        origin_pch_charge: '75',
        origin_pcsd_charge: '600',
        origin_sbcio_charge: '600',
        origin_dfo_charge: '70',
        origin_dtc_charge: '40',
        origin_eds_charge: '25',
        origin_ips_charge: '75',
        origin_por_charge: '64',
        origin_sse_charge: '4',
        origin_war_charge: '36',
        origin_othc_charge: '400',
        ocean_freight_co: '7213.27 kg CO2',
        fifo_standard: '5242',
        pickport_discharge_co: '18.52 kg CO2',
        pickport_discharge_charge: '680',
        delivery_co: '12.03 kg CO2',
        delivery_charge: '2473',
        quote_type: 'faster',
        pickup_quote_charge: [
            {
                charges_name: 'Freight',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
        ],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: '20GP',
                quantity: '2',
                currency: 'USD',
                buy_cost: 2000,
                tax: '10',
                total_sale_cost: '2200'
            },
        ],
        ocean_quote_charge: []
    },
]

// --------------- options ---------------
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
]
const optionLandTransportBy = [
    {value: "ftl", name: 'FTL'},
    {value: "ltl", name: 'LTL'},
]
const optionIncoterm = [
    {value: "CPT", label: 'Carraige Paid To(CPT)'},
    {value: "CFR", label: 'Cost & Freight(CFR)'},
    {value: "CIF", label: 'Cost Insurance and Freight(CIF)'},
    {value: "CIP", label: 'Carraige and Insurance Paid To(CIP)'},
    {value: "DAP", label: 'Delivery at Place(DAP)'},
    {value: "DAT", label: 'Delivery At Terminal(DAT)'},
    {value: "DDU", label: 'Delivery Duty Unpaid(DDU)'},
    {value: "DPU", label: 'Delivered At Place Unploaded(DPU)'},
    {value: "EXW", label: 'EX Works(EXW)'},
]
const optionContainerType = [
    {id: '_standard1',value: "20_standard", name: "20' Standard"},
    {id: '_standard2',value: "40_standard", name: "40' Standard"},
    {id: '_high_cube1',value: "40_high_cube", name: "40' High Cube"},
    {id: '_refrigerated1',value: "40_refrigerated", name: "20' Refrigerated"},
    {id: '_refrigerated2',value: "40_refrigerated", name: "40' Refrigerated"},
    {id: '_high_cube2',value: "45_high_cube", name: "45' High Cube"},
]
const optionContainerTypeRefrigerated = [
    {id: '_refrigerated1',value: "40_refrigerated", name: "20' Refrigerated"},
    {id: '_refrigerated2',value: "40_refrigerated", name: "40' Refrigerated"},
]
const optionContainerTypeWithoutRefri = [
    {id: '_standard1',value: "20_standard", name: "20' Standard"},
    {id: '_standard2',value: "40_standard", name: "40' Standard"},
    {id: '_high_cube1',value: "40_high_cube", name: "40' High Cube"},
    {id: '_high_cube2',value: "45_high_cube", name: "45' High Cube"},
]
const optionCargoType = [
    {value: "hazardous", name: "Hazardous"},
    {value: "general", name: "General"},
    {value: "refrigerated", name: "Refrigerated"},
    {value: "spl_equipment", name: "SPL Equipment"},
]
const optionCurrency = [
    {value: "gbp", name: "Pound", code: '£'},
    {value: "usd", name: "USD", code: '$'},
    {value: "eur", name: "Euro", code: '€'},
    {value: "rupee", name: "Rupee", code: '₹'},
    {value: "jpy", name: "Yen", code: '¥'},
]
const optionlocationType = [
    {value: "port/air", name: "Port/Airport", icon: pickup_icon},
    {value: "ware_house", name: "Warehouse", icon: pickup_icon2},    
    {value: "fulfilment_center", name: "Fulfilment Center", icon: pickup_icon3},
    {value: "business_address", name: "Business Address", icon: pickup_icon4},
    {value: "residential_address", name: "Residential Address", icon: pickup_icon5},
    {value: "last_mile", name: "Last mile delivery warehousing",icon: pickup_icon6 },
]

const countryList = [
    {value: 'AZ', label:'Azerbaijan',phonecode: '994', flag: azerbaijan},
    {value: 'AU', label:'Australia',phonecode: '61', flag: australia},
    {value: 'IN', label:'India',phonecode: '91', flag: india},
    {value: 'US', label:'United States',phonecode: '1', flag: unitedstates},
    {value: 'GB', label:'United Kingdom',phonecode: '44', flag: unitedkingdom}
]
const optionPortList = [
    {value: 'chennai', label:'Chennai Port'},
    {value: 'ennore', label:'Ennore Port'},
    {value: 'inmaa', label:'INMAA'},
    {value: 'usnyc', label:'USNYC'},
]

const weightUnitOption= [
    {value: 'kg', name: 'KG'},
    {value: 'lbs', name: 'Lbs'},
]
const optionPickupCharge = [
    {value: "fuel_charge", label: "Fuel Surcharge"},
    {value: "fuel_charge2", label: "Fuel Surcharge"},
]
const optionMarkupType = [
    {value: "percentage", label: "Percentage"},
    {value: "flat", label: "Flat"},
]
const optionCurrencyCharges = [
    {value: "gbp", label: "Pound", code: '£'},
    {value: "usd", label: "USD", code: '$'},
    {value: "eur", label: "Euro", code: '€'},
    {value: "rupee", label: "Rupee", code: '₹'},
    {value: "jpy", label: "Yen", code: '¥'},
]
const optionOriginQuote = [
    { label: 'INMAA', value: 'INMAA'},
    { label: 'INKTP', value: 'INKTP'},
]
const optionDestQuote = [
    { label: 'BDDAC', value: 'BDDAC'},
    { label: 'IDSUB', value: 'IDSUB'},
]
const optionModeQuote = [
    { label: 'OCEAN', value: 'OCEAN'},
]
const optionStatusQuote = [
    { label: 'In Progress', value: 'progress'},
    { label: 'Lost', value: 'lost'},
    { label: 'Won', value: 'won'},
]
const optionQuoteValueQuote = []

export {
    quotationBreadcrumb,quotationTableData,optionCustomerName,optionServiceType,optionTransportBy,optionContainerType,optionIncoterm,optionCargoType,optionCurrency,
    optionlocationType,countryList,optionPortList,optionLandTransportBy,searchQuotationResult,weightUnitOption,optionContainerTypeWithoutRefri,optionContainerTypeRefrigerated,
    optionPickupCharge,optionMarkupType,optionCurrencyCharges,optionOriginQuote,optionModeQuote,optionDestQuote,optionStatusQuote,optionQuoteValueQuote
}