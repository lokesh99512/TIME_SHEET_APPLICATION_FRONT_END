import React from "react";
export const CommonValue = ({ cellProps }) => {
    return <span>{cellProps.value ? cellProps.value : '-'}</span>;
}