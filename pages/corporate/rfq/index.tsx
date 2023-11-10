import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/10TenIcon.svg'
import RfqFilter from '@/components/corporate/Rfq/RfqFilter'
const headerTitle = '10/Ten'

function Rfq() {
  return (
    <div>
      <RfqFilter />
    </div>
  )
}
Rfq.getLayout = (page: ReactElement) => (
  <CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle}>
    {page}
  </CorporateLayout>
)

export default Rfq
