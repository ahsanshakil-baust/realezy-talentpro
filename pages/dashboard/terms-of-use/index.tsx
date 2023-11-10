import { DashboardLayout } from '@/components'
import TermsOfUse from '@/components/dashboard/TermsOfUse'
import { ReactElement } from 'react'

const TermsUses = () => {
  return (
    <div>
      <TermsOfUse />
    </div>
  )
}

TermsUses.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default TermsUses
