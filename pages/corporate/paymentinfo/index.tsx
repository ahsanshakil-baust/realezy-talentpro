import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/payment.svg'
const headerTitle = 'Payment Info'

function PaymentInfo() {
    return (
        <div>PaymentInfo</div>
    )
}

PaymentInfo.getLayout = (page: ReactElement) => (<CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle} >{page}</CorporateLayout>)

export default PaymentInfo