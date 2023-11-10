import { CorporateLayout } from '@/components'
import React, { ReactElement } from 'react'
import headerIcon from 'public/corporate-icon/properties.svg'
import PropertyList from '@/components/corporate/Property/PropertyList'
const headerTitle = 'Property'

function Property() {
  return (
    <div>
      <PropertyList />
    </div>
  )
}

Property.getLayout = (page: ReactElement) => (
  <CorporateLayout headerIcon={headerIcon} headerTitle={headerTitle}>
    {page}
  </CorporateLayout>
)

export default Property
