import React from "react";
import { edit_icon } from "../../assets/images";
import {reset_icon} from "../../assets/images";

// -------------------------Setting - Users-------------------------

export const UserName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const FirstName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const LastName = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const Role = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const LastActive = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
}
export const ResetPassword = ({cellProps,viewPopupHandler}) => {
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{<img src={reset_icon} alt="Reset" />}</span>;
}
// export const Status = ({cellProps,viewPopupHandler}) => {
//     return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{cellProps.value ? cellProps.value : '-'}</span>;
// }
export const Edit = ({cellProps,viewPopupHandler}) => {
    return <p onClick={() => {viewPopupHandler(cellProps.row.original);}}>{<img src={edit_icon} alt="Edit" />}</p>;
    // return <p onClick={() => console.log("test")}>{<img src={edit_icon} alt="Edit" />}</p>;
}
