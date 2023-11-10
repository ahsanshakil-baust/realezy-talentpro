import React from 'react' // , { useState }
import { Icon } from '../shared'
import { toast } from 'react-toastify'
import { hideLoader, showLoader, useGetThreadMutation, useTenantLandlordProgressInfoMutation } from '@/store'
import { useSession } from 'next-auth/react'
import {
  // ChatCreate,
  conversationCreate,
  landlordProgressCreate,
  tenantProgressCreate,
  // useLandlordProgressCreate,
  // useTenantProgressCreate,
} from '@/util/ChatProgress'
// import { openingChatMessage } from '@/const'
import { useDispatch } from 'react-redux'
import { addUserChatThreadList, setSelectedThread } from '@/store/chatProgress'
import { useRouter } from 'next/router'
const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

function ChatButton({ propertyOwner, propertyId, tourId }: any) {
  const router = useRouter()
  const { data: session }: any = useSession()
  const dispatch = useDispatch()
  const [getThread] = useGetThreadMutation() // , { data: threadInfo, status: threadStatus, isError: threadError, isLoading: threadLoading }
  const [
    getTenantLandlordInfo,
    // {
    //   data: tenantLandlordInfo,
    //   status: tenantLandlordStatus,
    //   isError: tenantLandlordError,
    //   isLoading: tenantLandlordLoading,
    // },
  ] = useTenantLandlordProgressInfoMutation()
  const HandleChat = async () => {
    dispatch(showLoader('Loading...'))
    if (!session?.user?.id) {
      toast.error('Login first')
      dispatch(hideLoader())
      return false
    }

    //CREATE CONVERSATION IF NEW
    //PREPARE PAYLOAD
    const formData = {
      sender_id: session?.user?.id, ///will get from session
      receiver_id: propertyOwner,
      property_id: propertyId,
    }

    const { data: response }: any = await getThread(formData)
    // console.log("button response --->", response)

    //CALL PROPERTY LANDLORD TENANT INFO API SERVICE
   

    const { data: info }: any = await getTenantLandlordInfo({
      property_id: propertyId,
      landlord_id: propertyOwner,
      tenant_id: session?.user?.id,
    })
    // console.log("button info --->", info)
    if (response.status === 1001 && info.status === 1001) {
      //CONVERSATION: IF NEW THEN
      //CREATE NEW CONVERSATION IN FIRESTORE
      if (!(response.data.is_new)) {
        // console.log('i am here --------', response)
        const userId = session?.user?.id
        const threadInfo = response.data
        dispatch(
          setSelectedThread(
            JSON.stringify({
              ConversationName:
                userId == threadInfo.receiver_id
                  ? threadInfo.sender_info.sender_name
                  : threadInfo.receiver_info.receiver_name,
              conversationImage:
                userId == threadInfo.receiver_id
                  ? threadInfo.sender_info.sender_image
                  : threadInfo.receiver_info.receiver_image,
              date: threadInfo.created_at,
              id: threadInfo.id,
              inChat: false,
              isNew: false,
              isOnline: true,
              lastMessage: '',
              propertyId: threadInfo.property_info.property_id,
              propertyImage: threadInfo.property_info.property_image,
              propertyName: threadInfo.property_info.property_name,
              read: false,
              receiverId: threadInfo.receiver_id,
              receiverImage: threadInfo.receiver_info.receiver_image,
              receiverName: threadInfo.receiver_info.receiver_name,
              senderId: threadInfo.sender_id,
              senderImage: threadInfo.sender_info.sender_image,
              senderName: threadInfo.sender_info.sender_name,
              time: parseInt(getTimestamp()),
            })
          )
        )
        dispatch(hideLoader())
        router.push('/conversation')
        return false
      }

      const resp = await conversationCreate(session?.user?.id, response.data.id, response.data)
      tenantProgressCreate(propertyId.toString() + '-' + session?.user?.id, info.data)
      landlordProgressCreate((propertyOwner + '-' + propertyId + '-' + session?.user?.id).toString(), info.data)

      // if(resp?.lastMessage === "") {
      //   dispatch(addUserChatThreadList({...resp, isNew: true}))
      //   dispatch(setSelectedThread(JSON.stringify({...resp, isNew: true})))
      // }
      // else dispatch(setSelectedThread(JSON.stringify(resp)))
      dispatch(setSelectedThread(JSON.stringify(resp)))
      dispatch(hideLoader())

      router.push('/conversation')

      //CREATE TENANT PROGRESS

      // //CREATE LANDLORD PROGRESS
      // ChatCreate(openingChatMessage, "RZY", propertyId, "initial_message", response.data.id, "RZYADMIN", "")
    } else {
      // console.log('============')
      toast.error('Something went wrong')
    }
  }
  return propertyOwner === session?.user?.id ? (
    <button
      disabled
      // onClick={HandleChat}
      className="flex items-center cursor-not-allowed  gap-2 md:gap-3 xl:gap-4 text-sm sm:text-base md:text-lg xl:text-xl text-[#034EA1] font-normal font-roboto border-none rounded-[10px] px-3 py-0 sm:px-3 sm:py-2 md:px-6 md:py-[10px] bg-[#D4E8FF]">
      <Icon className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] xl:w-[22px] xl:h-[22px]  " name="chatText" />
      Chat
    </button>
  ) : (
    <button
      id={`${tourId == '0' && 'searchPropertyChat'}`}
      onClick={HandleChat}
      className="flex items-center cursor-pointer  gap-2 md:gap-3 xl:gap-4 text-sm sm:text-base md:text-lg xl:text-xl text-[#034EA1] font-normal font-roboto border-none rounded-[10px] px-3 py-0 sm:px-3 sm:py-2 md:px-6 md:py-[10px] bg-[#D4E8FF]">
      <Icon className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] xl:w-[22px] xl:h-[22px]  " name="chatText" />
      Chat
    </button>
  )
}

export default ChatButton