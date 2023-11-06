import React from "react";
import { edit_icon } from "../../assets/images";
import {reset_icon} from "../../assets/images";

// -------------------------Parties - customers-------------------------

export const CustomerCode = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const CustomerName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const CustomerType = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const ContactName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const ConatctNo = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const EmailId = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const City = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const Country = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const LastTransaction = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const CreatedOn = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
// export const Status = ({cellProps,viewPopupHandler}) => {
//     return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
// }
// export const Edit = ({cellProps,viewPopupHandler}) => {
//     return <p onClick={() => {viewPopupHandler(cellProps.row.original);}}>{<img src={edit_icon} alt="Edit" />}</p>;
//     // return <p onClick={() => console.log("test")}>{<img src={edit_icon} alt="Edit" />}</p>;
// }



// -------------------------Parties - Vendors-------------------------

export const VendorCode = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const VendorName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const VendorType = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const ServiceType = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const ConatctNoV = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const EmailIdV = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const CityV = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
// export const CountryV = ({cellProps,viewPopupHandler}) => {
//     return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
// }
export const LastTransactionV = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const CreatedOnV = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
