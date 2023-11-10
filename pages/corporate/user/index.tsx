import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/groups.svg'
import UserList from '@/components/corporate/User/UserList'
const headerTitle = 'User'

function User() {
    return (
        <div>
            <UserList />
        </div>
    )
}

User.getLayout = (page: ReactElement) => (<CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle} >{page}</CorporateLayout>)
export default User