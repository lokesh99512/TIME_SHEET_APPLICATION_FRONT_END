import React from 'react'
import TopBreadcrumbs from './TopBreadcrumbs'
import { lclBreadcrumb, lclRateData } from '../../../../common/data/procurement'
import CommonFilterComp from './CommonFilterComp'
import TableReact from './TableReact'

export default function LclOceanFreight() {
    return (
        <>
            {/* breadcrumbs && rate */}
            <TopBreadcrumbs breadcrumbs={lclBreadcrumb} data={lclRateData} />

            {/* filter */}
            <CommonFilterComp />

            {/* React Table */}
            <TableReact />
        </>
    )
}
