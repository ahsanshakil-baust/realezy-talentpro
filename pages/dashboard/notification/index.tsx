import { DashboardLayout } from '@/components'
import Notification from '@/components/dashboard/Notification'
import { ReactElement } from 'react'
import { useSession } from 'next-auth/react'

const Notifications = () => {
  const { data: session }: any = useSession()

  const userId = session?.user?.id as string
  return (
    <div className="container">

          <Notification userId={userId}/>

    </div>
  )
}

Notifications.getLayout = (page: ReactElement) => <DashboardLayout >{page}</DashboardLayout>

export default Notifications
