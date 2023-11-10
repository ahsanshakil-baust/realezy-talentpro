import { useSession } from 'next-auth/react'
// import ProgressStep from './ProgressStep'
import { useDispatch, useSelector } from 'react-redux'
import { useGetThreadInfoQuery, useTenantLandlordProgressInfoMutation } from '@/store'
import { useLandlordProgressList, useTenantProgressList } from '@/util/ChatProgress'
// import { Button } from '@mui/material'
import { setProgress } from '@/store/chatProgress'
// import ProgressStatusBar from './ProgressStatusBar'
import Progress from './Progress'
import { useEffect } from 'react'
import RedBook from '../Chat/redBook/RedBook'

export const ChatProgress = ({ isTenant, redBook }: any) => {
  //CURRENT LOGIN USER SESSION INFO
  const [
    getTenantLandlordProgressInfo,
    { data: tenantLandlordProgressInfo },
  ] = useTenantLandlordProgressInfoMutation()
  const dispatch = useDispatch()
  const { data: session }: any = useSession()
  let getProgress: any = () => {}

  //SELECTED THREAD INFO
  const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)

  //GET REAL USER TYPE FROM BASED ON THREAD ID
  const { data: threadInfo } = useGetThreadInfoQuery(selectedThread?.id)

  useEffect(() => {
    if (threadInfo)
      getTenantLandlordProgressInfo({
        property_id: threadInfo?.property_id,
        landlord_id: threadInfo?.receiver_id,
        tenant_id: threadInfo?.sender_id,
      })
  }, [threadInfo, getTenantLandlordProgressInfo])

  //GET PROGRESS INFO
  let params: any = ''
  let roletype: any = ''

  if (threadInfo?.sender_id == session?.user?.id) {
    // progress = useTenantProgressList(`${threadInfo?.property_id}-${threadInfo?.sender_id}`)
    roletype = 'tenant'
    params = `${threadInfo?.property_id}-${threadInfo?.sender_id}`
    getProgress = useTenantProgressList
  } else {
    // progress = useLandlordProgressList(`${threadInfo?.receiver_id}-${threadInfo?.property_id}-${threadInfo?.sender_id}`)
    roletype = 'landlord'
    params = `${threadInfo?.receiver_id}-${threadInfo?.property_id}-${threadInfo?.sender_id}`
    getProgress = useLandlordProgressList
  }
  const progress: any = getProgress(params)
  const payload = {
    ...progress,
    threadInfo,
    roletype,
    session,
    tenantLandlordProgressInfo: tenantLandlordProgressInfo?.data,
  }

  const metaData = {
    tenant_name: tenantLandlordProgressInfo?.data?.tenantInfo?.name,
    landlord_name: tenantLandlordProgressInfo?.data?.landlordInfo?.name,
    tenant_id: threadInfo?.sender_id,
    landlord_id: threadInfo?.receiver_id,
    property_id: threadInfo?.property_id,
  }
  //PREPARE PROGRESS DATA
  // const progressData = {
  //   ...progress,
  //   threadInfo: threadInfo,
  // }
  // if(progress) progress.threadInfo = threadInfo
  dispatch(setProgress(payload))
  // console.log('--------->', payload)

  return (
    <>
      <div className=" w-full h-auto flex flex-row gap-0 pl-[36px] pr-8 py-[38px]  ">
        {/* <ProgressStatusBar /> */}
        {redBook && (
          <div
            className={
              redBook
                ? 'absolute z-20 right-[42px] top-[190px] w-[390px] xl:max-w-[410px] h-[calc(100vh-190px)] overflow-y-auto bg-[#FFFFFF]  ease-in-out duration-500  '
                : ' absolute -right-[100%] top-[190px] z-20 w-[390px] xl:max-w-[410px] h-[calc(100vh-190px)] overflow-y-auto bg-[#FFFFFF] ease-in-out  duration-500 '
            }>
            <div className=" p-4 flex flex-col ">
              <RedBook roletype={roletype} metaData={metaData} />
            </div>
          </div>
        )}
        <Progress isTenant={isTenant} />
        {/* <ProgressStepper/> */}
      </div>
    </>
  )
}
