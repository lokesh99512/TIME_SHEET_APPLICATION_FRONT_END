const revenuesum = [
    { id: "first1", content: "First task",title: 'Month Revenue',revenue: '$1,250,000',rate: '11',rate_type:'up', tooltip_content: '' },
    { id: "sec2", content: "Second task",title: 'Revenue from sales',revenue: '$250,000',rate: '7',rate_type:'up', tooltip_content: '' },
    { id: "third3", content: "Third task",title: 'Revenue from commission',revenue: '$100,000',rate: '6',rate_type:'up', tooltip_content: '' },
];
const shipment = [
    { id: "deliver", content: "First task",title: 'Delivered',revenue: '135',rate: '11',rate_type:'up',tooltip_content: '' },
    { id: "transit", content: "Second task",title: 'In Transit',revenue: '100',rate: '7',rate_type:'up',tooltip_content: '' },
    { id: "stuck", content: "Third task",title: 'Stuck',revenue: '54',rate: '6',rate_type:'up',tooltip_content: 'stuck' },
];

const ratecoverage = [
    { id: "activePorts", content: "First task",title: 'Active Ports',revenue: '23',rate: '4',rate_type:'up', tooltip_content: '' },
    { id: "rate", content: "Second task",title: 'Rate Density',revenue: '659',rate: '10',rate_type:'up', tooltip_content: 'Rate Density' },
    { id: "coverratio", content: "Third task",title: 'Conversion Ratio',revenue: '54',rate: '6',rate_type:'up', tooltip_content: '' },
];

const test = [
  {
    id: 'test1',
    name: `Revenue Summary`,
    items: revenuesum
  },
  {
    id: 'test2',
    name: `Shipments <b>(289)</b>`,
    items: shipment
  },
  {
    id: 'test3',
    name: `Rate Coverage`,
    items: ratecoverage
  }
]

export const taskStatus = {
    revenueSum: test
};