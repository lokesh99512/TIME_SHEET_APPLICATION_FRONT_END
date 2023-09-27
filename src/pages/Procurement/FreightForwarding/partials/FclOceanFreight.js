import React from 'react'
import { useDispatch } from 'react-redux'
import { filter_icon, upload_icon } from '../../../../assets/images'
import { fclBreadcrumb, fclColumn, fclRateData } from '../../../../common/data/procurement'
import { customSort } from '../../../../components/Common/CommonLogic'
import { updateFclData } from '../../../../store/Procurement/actions'
import FreightCommonTable from './FreightCommonTable'
import TopBreadcrumbs from './TopBreadcrumbs'
import { useSelector } from 'react-redux'
import CommonFilterComp from './CommonFilterComp'

export default function FclOceanFreight() {
    const fclData = useSelector((state) => state.procurement.fcl_data);
    const dispatch = useDispatch();
    const handleSorting = (sortField, sortOrder,type) => {
        const sorted = customSort(fclData, sortField, sortOrder);
        dispatch(updateFclData(sorted));
    };  
    return (
        <>
            {/* breadcrumbs && rate */}
            <TopBreadcrumbs breadcrumbs={fclBreadcrumb} data={fclRateData} />
            
            {/* filter */}
            <CommonFilterComp /> 
            
            {/* Table */}
            <FreightCommonTable column={fclColumn} data={fclData} type={'fcl_ocean'} handleSorting={handleSorting} />
            {/* <BootstrapTable keyField='id' data={ data } columns={ fclColumn }  /> */}
        </>
    )
}


