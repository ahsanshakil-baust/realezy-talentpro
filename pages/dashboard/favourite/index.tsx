import { DashboardLayout } from '@/components'
import Favourite from '@/components/dashboard/Favourite'
import { ReactElement } from 'react'

const Favourites = () => {
  return (
    <div>
      <Favourite/>
    </div>
  )
}

Favourites.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default Favourites
