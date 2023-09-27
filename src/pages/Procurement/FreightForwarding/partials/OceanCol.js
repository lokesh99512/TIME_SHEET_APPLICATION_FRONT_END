
const ChargeId = (cell) => {
    return cell.value ? cell.value : '-';
}
const CarrierName = (cell) => {
    return cell.value ? cell.value : '-';
}
const VendorName = (cell) => {
    return cell.value ? cell.value : '-';
}
const OrgPort = (cell) => {
    return cell.value ? cell.value : '-';
}
const DestPort = (cell) => {
    return cell.value ? cell.value : '-';
}
const ViaPort = (cell) => {
    return cell.value ? cell.value : '-';
}
const ValidFrom = (cell) => {
    return cell.value ? cell.value : '-';
}
const ValidTill = (cell) => {
    return cell.value ? cell.value : '-';
}
const TransitTime = (cell) => {
    return cell.value ? cell.value : '-';
}
const CargoType = (cell) => {
    return cell.value ? cell.value : '-';
}

export {
    ChargeId,CarrierName,VendorName,OrgPort,DestPort,ViaPort,ValidFrom,ValidTill,TransitTime,CargoType
}