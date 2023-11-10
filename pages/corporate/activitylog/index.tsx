import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/activitylog.svg'
const headerTitle = 'Activity Log'

function ActivityLog() {
    return (
        <div>ActivityLog</div>
    )
}

ActivityLog.getLayout = (page: ReactElement) => (<CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle} >{page}</CorporateLayout>)

export default ActivityLog