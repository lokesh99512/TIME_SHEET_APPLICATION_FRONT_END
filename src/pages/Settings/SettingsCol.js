import React from "react";
import { edit_icon } from "../../assets/images";
import {reset_icon} from "../../assets/images";

// -------------------------Setting - Users-------------------------

const calculateTimeDifference = (lastLoggedIn) => {
    const lastLoggedInDate = new Date(lastLoggedIn);
    const timeDifferenceMillis = new Date() - lastLoggedInDate;
    const timeDifferenceHours = timeDifferenceMillis / (1000 * 60 * 60);
    const formattedTimeDifference = timeDifferenceHours.toFixed(1);
    return `${formattedTimeDifference} hours`;
  };
  

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
    const {value} = cellProps;
    const lastActiveTime =  value ? calculateTimeDifference(value) : '-';
    return <span onClick={() => {viewPopupHandler(cellProps.row.original);}}>{lastActiveTime}</span>;
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
