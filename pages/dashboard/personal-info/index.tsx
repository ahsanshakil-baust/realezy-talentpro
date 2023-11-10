import { DashboardLayout } from '@/components'
import Personal from '@/components/dashboard/Personal'
import { ReactElement } from 'react'

const PersonalInfo = () => {

  return (
    <div>
      <Personal />
    </div>
  )
}

PersonalInfo.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default PersonalInfo
