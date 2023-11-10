import { DashboardLayout } from '@/components'
import Fees from '@/components/dashboard/Fees/Fees'
import { ReactElement } from 'react'

const Feees = () => {
  return (
    <div>
      <Fees />
    </div>
  )
}

Feees.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Feees
