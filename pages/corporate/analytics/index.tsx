import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/analytics.svg'
const headerTitle = 'Analytics'

function Analytics() {
    return (
        <div>Analytics</div>
    )
}

Analytics.getLayout = (page: ReactElement) => (<CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle} >{page}</CorporateLayout>)

export default Analytics