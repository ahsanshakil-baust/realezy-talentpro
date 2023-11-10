import { DashboardLayout } from '@/components'
import MyProperty from '@/components/dashboard/MyProperty'
import { ReactElement } from 'react'

const MyProperties = () => {
  return (
    <div>
      <MyProperty />
    </div>
  )
}

MyProperties.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default MyProperties
