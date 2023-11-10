import { DashboardLayout } from '@/components'
import Transaction from '@/components/dashboard/Transaction'
import { ReactElement } from 'react'

const Transactions = () => {
  return (
    <div className="container">
      <Transaction />
    </div>
  )
}

Transactions.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Transactions
