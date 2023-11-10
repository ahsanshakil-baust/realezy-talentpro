import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/10TenIcon.svg'
import RfqDetails from '@/components/corporate/Rfq/RfqDetails'
import { useRouter } from 'next/router'
const headerTitle = 'RFQ Details'
const borderNone = 'border-none'

function Rfq() {
    const router = useRouter();
    const { rfqid } = router.query;
    return (
        <div>
            <RfqDetails rfqid={rfqid} />
        </div>
    )
}
Rfq.getLayout = (page: ReactElement) => (<CorporateLayout  headerIcon={headerIcon} headerTitle={headerTitle} >{page}</CorporateLayout>)

export default Rfq