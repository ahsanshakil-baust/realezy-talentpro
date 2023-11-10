import { DashboardLayout } from '@/components'
import HelpSupport from '@/components/dashboard/HelpSupport'
import { ReactElement } from 'react'

const HelpAndSupports = () => {
  return (
    <div>
      <HelpSupport/>
    </div>
  )
}

HelpAndSupports.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default HelpAndSupports
