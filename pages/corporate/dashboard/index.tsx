import { CorporateLayout, Icon } from '@/components'
import React, { ReactElement, useState } from 'react'
import headerIcon from 'public/corporate-icon/dashboard.svg'
const headerTitle = 'Dashboard'
function Dashboard() {
    return (
        <div>Dashboard</div>
    )
}

Dashboard.getLayout = (page: ReactElement) => (<CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle} >{page}</CorporateLayout>)

export default Dashboard