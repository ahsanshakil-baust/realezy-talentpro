import { DashboardLayout } from '@/components'
import { ReactElement } from 'react'

const Dashboard = () => {
  return <h2>Dashboard</h2>
}

Dashboard.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Dashboard
