import { DashboardLayout } from '@/components'
import MyPayment from '@/components/dashboard/MyPayment'
import { ReactElement } from 'react'

const Payments = () => {
  return (
    <div>
      <MyPayment/>
    </div>
  )
}

Payments.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Payments
