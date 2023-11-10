import { DashboardLayout } from '@/components'
import HomePreference from '@/components/dashboard/HomePreference'
import { ReactElement } from 'react'

const HomePreferences = () => {
  return (
    <div>
      <HomePreference />
    </div>
  )
}

HomePreferences.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default HomePreferences
