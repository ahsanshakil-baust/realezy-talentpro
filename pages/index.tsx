import { PrimaryLayout } from '../components'
import HomePage from '../components/home/HomePage/HomePage'
import {
  showModal,
  useGetDistrictListQuery,
  useGetFindPropertyQuery,
  useGetPropertyByRentTypeQuery,
} from '@/store'
import { useDispatch } from 'react-redux'
import { NextPageWithLayout } from './page'
import { StoreThunkDispatch } from '@/types'
import { useSession } from 'next-auth/react'
import UserSelectType from '@/components/UserTypeSelect/UserSelectType'

const Home: NextPageWithLayout = () => {
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: propertyByRentType } = useGetPropertyByRentTypeQuery('condo')
  const { data: findProperty } = useGetFindPropertyQuery({})
  const data = {
    districtList,
    propertyByRentType,
    findProperty,
  }

  const dispatch = useDispatch<StoreThunkDispatch>()
  const { data: session }: any = useSession()

  return (
    <>

      {session?.user?.userInfo?.user_type == '' ? (
        (() => {
          dispatch(
            showModal({
              open: true,
              name: 'select_user_type',
              children: (
                <div>
                  <UserSelectType />
                </div>
              ),
              className: '',
            })
          )
          return <HomePage data={data} />
        })()
      ) : (
        <HomePage data={data} />
      )}

    </>

  )
}

Home.getLayout = (page: any) => <PrimaryLayout>{page}</PrimaryLayout>

export default Home
