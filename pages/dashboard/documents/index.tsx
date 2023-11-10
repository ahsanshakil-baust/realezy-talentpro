import { DashboardLayout } from '@/components'
import Document from '@/components/dashboard/Document'
import { ReactElement } from 'react'

const Documents = () => {
  return (
    <div>
      <Document/>
    </div>
  )
}

Documents.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Documents
