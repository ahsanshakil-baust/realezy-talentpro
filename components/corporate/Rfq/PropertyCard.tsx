import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { hideLoader, hideModal, showLoader, useCreateRfqChatThreadMutation, useTenantLandlordProgressInfoMutation } from '@/store'
import { useSession } from 'next-auth/react'
import { route } from 'next/dist/server/router'
import {
    // ChatCreate,
    conversationCreate,
    landlordProgressCreate,
    tenantProgressCreate,
} from '@/util/ChatProgress'
import { useDispatch } from 'react-redux'
import { addUserChatThreadList, setSelectedThread } from '@/store/chatProgress'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import EmblaCarousel from '@/components/cards/EmblaCarousel/EmblaCarousel'
import Image from 'next/image'

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

export default function PropertyCard({ card, rfqDetails }: any) {
  const router = useRouter()
  const { data: session }: any = useSession()
  const dispatch = useDispatch()

  const [createRfqThread, { error: createRfqThreadError }] = useCreateRfqChatThreadMutation()
  const [getTenantLandlordInfo] = useTenantLandlordProgressInfoMutation()

  const handleChat = async (propertyId: any) => {
    const payload = {
      sender_id: rfqDetails?.customer?.id,
      receiver_id: session?.user?.id,
      property_id: propertyId,
      home_preference_id: rfqDetails?.id,
    }
    // console.log("🚀 ~ file: PropertyCard.tsx:44 ~ handleChat ~ payload:", payload)

    const response = await createRfqThread(payload)
    console.log('🚀 ~ file: PropertyCard.tsx:44 ~ handleChat ~ response:', response)

    const { data: info }: any = await getTenantLandlordInfo({
      property_id: propertyId,
      landlord_id: session?.user?.id,
      tenant_id: rfqDetails?.customer?.id,
    })
    console.log('🚀 ~ file: PropertyCard.tsx:55 ~ handleChat ~ info:', info)

    //CONVERSATION: IF NEW THEN
    //CREATE NEW CONVERSATION IN FIRESTORE
    // if (!response?.data?.data?.is_new) {
    //     const userId = session?.user?.id
    //     const threadInfo = response?.data?.data
    //     dispatch(
    //         setSelectedThread(
    //             JSON.stringify({
    //                 ConversationName:
    //                     userId == threadInfo.receiver_id
    //                         ? threadInfo.sender_info.sender_name
    //                         : threadInfo.receiver_info.receiver_name,
    //                 conversationImage:
    //                     userId == threadInfo.receiver_id
    //                         ? threadInfo.sender_info.sender_image
    //                         : threadInfo.receiver_info.receiver_image,
    //                 date: threadInfo.created_at,
    //                 id: threadInfo.id,
    //                 inChat: false,
    //                 isNew: true,
    //                 isOnline: true,
    //                 lastMessage: '',
    //                 propertyId: threadInfo.property_info.property_id,
    //                 propertyImage: threadInfo.property_info.property_image,
    //                 propertyName: threadInfo.property_info.property_name,
    //                 read: false,
    //                 receiverId: threadInfo.receiver_id,
    //                 receiverImage: threadInfo.receiver_info.receiver_image,
    //                 receiverName: threadInfo.receiver_info.receiver_name,
    //                 senderId: threadInfo.sender_id,
    //                 senderImage: threadInfo.sender_info.sender_image,
    //                 senderName: threadInfo.sender_info.sender_name,
    //                 time: parseInt(getTimestamp()),
    //             })
    //         )
    //     )
    //     dispatch(hideLoader())

    //     router.push('/corporate/message')
    //     return false
    // }

    // dispatch(showLoader('Loading...'))

    // const resp = await conversationCreateLandlord(session?.user?.id, response.data?.data.id, response?.data?.data)
    // tenantProgressCreate(propertyId.toString() + '-' + rfqDetails?.customer?.id, info.data)
    // landlordProgressCreate((session?.user?.id + '-' + propertyId + '-' + rfqDetails?.customer?.id).toString(), info.data)

        // if (resp?.lastMessage === "") {
        //     dispatch(addUserChatThreadList({ ...resp, isNew: true }))
        //     dispatch(setSelectedThread(JSON.stringify({ ...resp, isNew: true })))
        // }
        // else dispatch(setSelectedThread(JSON.stringify(resp)))
        // dispatch(hideLoader())
        if (response?.data?.status === 200 && info?.status === 1001) {
            //CONVERSATION: IF NEW THEN
            //CREATE NEW CONVERSATION IN FIRESTORE
            if (!response?.data?.data?.is_new) {
              // console.log('i am here --------', response)
              const userId = session?.user?.id
              const threadInfo = response?.data?.data
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
              dispatch(hideModal('Select Property'))
              router.push('/corporate/message')
              return false
            }
      
            const resp = await conversationCreate(rfqDetails?.customer?.id, response?.data?.data?.id, response?.data?.data)
            tenantProgressCreate(propertyId.toString() + '-' + response?.data?.data?.sender_id, info.data)
            landlordProgressCreate((session?.user?.id + '-' + propertyId + '-' + response?.data?.data?.sender_id).toString(), info.data)
      
            // if(resp?.lastMessage === "") {
            //   dispatch(addUserChatThreadList({...resp, isNew: true}))
            //   dispatch(setSelectedThread(JSON.stringify({...resp, isNew: true})))
            // }
            // else dispatch(setSelectedThread(JSON.stringify(resp)))
            dispatch(setSelectedThread(JSON.stringify(resp)))
            dispatch(hideLoader())
      
            dispatch(hideModal('Select Property'))
            router.push('/corporate/message')
      
            //CREATE TENANT PROGRESS
      
            // //CREATE LANDLORD PROGRESS
            // ChatCreate(openingChatMessage, "RZY", propertyId, "initial_message", response.data.id, "RZYADMIN", "")
          } else {
            // console.log('============')
            toast.error('Something went wrong')
          }
          

    // router.push('/corporate/message')
  }

  /*
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
    */
  const [cardClicked, setCardClicked] = React.useState(false)
  return (
    <>
      {/* <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="flex gap-1">
            <p>{card?.property_address}</p>
            <p className="font-black">{card?.district}</p>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div className="flex items-center gap-2">
              <img
                className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                src="/download/bed.svg"
              />
              <p className=" truncate">{card?.bedroom} </p>
              <img
                className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                src="/download/bath.svg"
              />
              <p className=" truncate">{card?.bathroom}</p>
              <img
                className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                src="/download/area.svg"
              />
              <p className=" truncate">{card?.floor_size}</p>
              <p> {card?.rental_type}</p>
            </div>
          </Typography>
        </CardContent>
        <CardActions className="flex gap-3">
          <Button size="small">{card?.rental_amount}</Button>
          <Button onClick={() => handleChat(card?.id)} size="small">
            Chat
          </Button>
        </CardActions>
      </Card> */}

      {/*  */}

      <div
        className="relative w-full h-[410px] "
        onClick={() => {
          setCardClicked(!cardClicked)
        }}>
        <div className="absolute top-[18px] left-[18px] flex items-center justify-center px-5 pt-[6.5px] pb-[5px] text-center  rounded z-10 bg-gradient-to-r from-white from-0% to-100% to-[#FFFFFF33] bg-blur">
          <p className="font-bold font-roboto text-[11px] text-[#034EA1] capitalize">{card?.property_type}</p>
        </div>

        {cardClicked && (
          <div className=" z-40 w-full absolute left-0 top-0 bg-[#00000080] h-full rounded-[10px] ">
            <div className="w-full h-full flex items-center justify-center">
              <Button
                onClick={() => handleChat(card?.id)}
                variant="contained"
                className=" !bg-[#00ADEE] !py-4 !px-5 !font-roboto !text-white !rounded-[10px] !text-[22px]/[27px] !z-50">
                Chat with Tenant
              </Button>
            </div>
          </div>
        )}
        <div>
          <div
            className={` bg-white absolute left-0 top-0 rounded-[10px] cursor-pointer shadow-[0px_4px_20px_#034EA100]  hover:shadow-[0px_4px_16px_#034EA13D] flex flex-col  w-full h-full border border-solid border-[#F2F2F2]  p-0 ml-0 `}>
            <div className="relative w-full">
              {/* <ImageSlider images={images} /> */}
              <EmblaCarousel
                bookingStatus={card?.booking_status}
                options={{}}
                slides={typeof card?.property_image == 'string' ? [card?.property_image] : card?.property_image}
              />
            </div>
            <div className="2xl:p-5 md:p-4 p-[0.8rem] flex flex-col h-full justify-between flex-grow">
              <div className="flex">
                <h2
                  className={` ${
                    card?.booking_status == 'reserve' && 'opacity-50'
                  } truncate font-medium font-roboto tracking-[0.2px] text-base/[1.125rem] md:text-[1rem]/[1.25rem] 2xl:text-[1.25rem]/[1.5rem] text-left text-[#202020] `}>
                  {card?.name}
                </h2>
              </div>
              <div className="mt-1.5 md:mt-2 2xl:mt-3.5 w-full flex justify-between gap-4 ">
                <div className=" w-[75%] flex gap-2 items-center">
                  <img
                    src="/download/marker.svg"
                    alt="marker"
                    className={` ${
                      card?.booking_status == 'reserve' && 'opacity-50'
                    } 2xl:w-3.5 w-2.5 2xl:h-[1.125rem] h-4 `}
                  />
                  <p
                    className={` ${
                      card?.booking_status == 'reserve' && 'opacity-50'
                    } truncate font-medium font-roboto tracking-[0.32px] text-[#505050] text-xs sm:text-sm md:text-sm/[1rem] 2xl:text-base/[1.1875rem] `}>
                    {card?.property_address}
                  </p>
                </div>
                <div
                  className={` ${
                    card?.booking_status == 'reserve' && 'opacity-50'
                  }  flex-grow text-xs sm:text-sm md:text-sm/[1rem] 2xl:text-base/[1.1875rem] font-normal font-roboto text-right text-[#7AA1CC] `}>
                  <span className="text-[#7AA1CC] 2xl:w-3.5 w-2.5 2xl:h-3.5 h-2.5 bg-[#7AA1CC] rounded-[5px] inline-block mr-[0.3125rem] "></span>
                  {card?.district}
                </div>
              </div>
              <div className="mt-3 md:mt-4 2xl:mt-5 flex justify-between w-full items-center gap-2">
                <div
                  className={` ${
                    card?.booking_status == 'reserve' && 'opacity-50'
                  } text-common  w-[75%] space-x-1 2xl:space-x-2 font-thin text-base/[1.125rem] 2xl:text-[1.125rem]/[1.375rem] flex items-center justify-start `}>
                  <img
                    className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                    src="/download/bed.svg"
                  />
                  <p className=" truncate">{card?.bedroom}</p>
                  <img
                    className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                    src="/download/bath.svg"
                  />
                  <p className=" truncate">{card?.bathroom}</p>
                  <img
                    className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                    src="/download/area.svg"
                  />
                  <p className=" truncate">{card?.floor_size}</p>
                </div>
                <div
                  className={` ${
                    card?.booking_status == 'reserve' && 'opacity-50'
                  } flex-grow  pl-1  flex gap-2 justify-end  text-[11px] leading-[16px] sm:text-sm md:text-[11px] md:leading-[16px]  xl:text-sm text-[#034EA1]  text-right font-roboto tracking-[0.28px] font-normal  `}>
                  <span className=" truncate ">{card?.rental_type}</span>
                </div>
              </div>

              <div
                className={` ${
                  card?.booking_status == 'reserve' && 'opacity-50'
                } mt-3 md:mt-4 xl:mt-6 flex justify-between items-center `}>
                <div className=" truncate w-[50%] gap-1 2xl:gap-2  flex justify-start">
                  <h2 className="text-md truncate font-medium text-base/[1.25rem] md:text-[1.2rem]/[1.5rem] 2xl:text-[1.5rem]/[1.875rem] text-secondary">
                    ${card?.rental_amount}
                  </h2>
                </div>
                <div className="hidden">
                  <div className="truncate w-[50%] gap-1 2xl:gap-2 flex justify-end">
                    {/* <Link href={`/property-details/${id}`} passHref> */}
                    <button
                      disabled={!session}
                      className="flex gap-2 border border-[#00adee] text-[#00adee] text-xs  md:text-sm  rounded-lg px-1 sm:px-3 md:px-3 lg:px-5 xl:px-6 py-2 bg-white hover:bg-[#00ADEE] hover:text-white cursor-pointer">
                      See details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
