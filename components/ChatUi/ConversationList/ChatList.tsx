import NoImageProperty from '@/public/NoImageProperty.jpg'
import { setSelectedThread } from '@/store/chatProgress'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { is } from 'immer/dist/internal'
import { useState, useEffect } from 'react'
import { getUnreadUserWiseConversationCounting } from '../../../util/ChatMessage/chatCounter';
import { outputTime } from '@/util'



const ChatList = ({ data, isTenant, isAdminPanel }: any) => {
  const dispatch = useDispatch()
  const date: any = new Date(data?.time)
  // const formattedDate: any = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
  const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)
  // const { data: session }: any = useSession()

  // console.log("selected THread", selectedThread)
  let image = ""
  let userName = ""
  let propertyName = ""
  let lastMessage = ""
  let previewImage = ""
  let lastMsgTime = ""
  let threadId = ""
  if(!isAdminPanel){
    image = data?.conversationImage
    userName = data?.ConversationName
    propertyName = data?.propertyName
    lastMessage = data?.lastMessage
    previewImage = data?.propertyImage
    lastMsgTime = outputTime(date, "DD MMM, YY")
    threadId = data?.id
  }
  return (
    isAdminPanel ? <div>
    <div
      className={`flex !bg-[#3D81CC] hover:!bg-[#034EA1] items-center  w-full pl-5 pr-[18px] pt-4 pb-3 text-sm delay-150  cursor-pointer rounded-[10px] focus:outline-none`}>
      <div className="w-full h-auto">
        <div className="flex w-full relative h-auto gap-4 ">
          <div className=" min-w-[70px] max-h-[84px] flex relative">
            <img
              className="object-cover w-[70px] h-[70px] rounded-full"
              src='/chat/chatHelpSupport.svg'
              alt="user"
            />
          </div>
          <div className=" min-w-[170px] max-w-[240px] flex flex-col justify-center  gap-1 relative">
            <span
              className={`text-base w-[93%] truncate relative xl:text-lg font-bold capitalize font-roboto text-[#ffffff]`}>
              {data.csaName[0]}
            </span>
            {data.lastMessage && (
              <p
                className={`truncate max-w-full font-roboto  text-[#ffffff] font-[300] text-base`}>
                {data.lastMessage}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* <span className="block ml-2 text-sm text-gray-600">bye</span> */}
    </div>
  </div>  : <div>
      <div
        onClick={() => {
          // handleChatSeen();
          dispatch(setSelectedThread(JSON.stringify(data)))
        }
        }
        className={`flex ${selectedThread?.id === threadId
          ? isTenant
            ? '!bg-[#48C1F0] hover:!bg-[#00ADEE] '
            : '!bg-[#3D81CC] hover:!bg-[#034EA1]'
          : ''
          } items-center  w-full pl-5 pr-[18px] pt-4 pb-3 text-sm delay-150  cursor-pointer rounded-[10px] hover:bg-[#C3EBFA] focus:outline-none`}>
        <div className="w-full h-auto">
          <div className="flex w-full relative h-auto gap-2 justify-between">


            {/* <div className=" absolute right-[85px] top-0 z-10">
              {msgCounting > 0 && selectedThread?.id !== threadId && (
                <span className="px-2 py-1 text-sm font-roboto font-normal text-[#FFFFFF] rounded-full bg-[#00ADEE]">
                  {msgCounting}
                </span>
              )}
            </div> */}

            <div className=" min-w-[70px] max-h-[84px] flex relative">
              <img
                className="object-cover w-[70px] h-[70px] rounded-full"
                src={image ? image : '/public/no_profile.jpg'}
                alt="user"
              />
              <span className="absolute w-3 h-3 bg-[#00BC0C] rounded-full left-[55px]  bottom-5"></span>
            </div>
            <div className=" w-[170px] xl:max-w-[190px] flex flex-col  gap-1 relative">
              <span
                className={`  ${selectedThread?.id === threadId ? 'text-[#FFFFFF] ' : ''
                  } text-base w-[93%] truncate relative xl:text-lg font-bold capitalize font-roboto text-[#202020]`}>
                {userName}
              </span>
              <span className=" w-full flex items-start">
                {/* <img src="/chat/house.svg" alt="property-home" /> */}
                <svg
                  className={`${selectedThread?.id === threadId ? 'fill-[#F1F7FF] ' : 'fill-[#505050]'} h-5 w-5 mt-0.5`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  viewBox="0 0 16 15">
                  <path
                    id="Path_20118"
                    data-name="Path 20118"
                    d="M29.751,13.2V8.062a.717.717,0,0,0,.912-1.1l-.912-.816V2.558a2.262,2.262,0,0,0-4.485-.43l-.781-.7a2.37,2.37,0,0,0-3.165,0L15.146,6.956a.718.718,0,0,0,.909,1.107v5.143A2.062,2.062,0,0,0,18.1,15.283H27.71A2.061,2.061,0,0,0,29.751,13.2Zm-2.3-11.528a.848.848,0,0,1,.867.882V4.867l-1.675-1.5,0-.807A.848.848,0,0,1,27.455,1.676Zm-3.3,12.159H21.779V12.148A1.116,1.116,0,0,1,23.1,11.076a1.065,1.065,0,0,1,1.054,1.072Zm1.425,0V12.148a2.616,2.616,0,0,0-5.229,0v1.687H18.1a.624.624,0,0,1-.617-.628V6.8l4.783-4.274a.962.962,0,0,1,1.284,0L28.327,6.8v6.41a.627.627,0,0,1-.62.625H25.579Z"
                    transform="translate(-14.909 -0.283)"
                  // fill="#505050"
                  />
                </svg>

                <span
                  className={` ${selectedThread?.id === threadId ? 'text-[#F1F7FF] ' : ''
                    } ml-2 break-words max-w-full font-roboto  text-[#505050] font-normal text-sm  xl:text-base`}>
                  {propertyName}
                </span>
              </span>
              {lastMessage ? (
                <p
                  className={`  ${selectedThread?.id === threadId ? 'text-[#E4F0FE] ' : ''
                    } truncate max-w-full font-roboto  text-[#A1A1A1] font-[300] text-base`}>
                  {lastMessage}
                </p>
              ) : (
                <span></span>
              )}
            </div>

            <div className=" min-w-[78px] h-auto flex flex-col gap-[10px] items-end">
              <img
                className="w-[78px] h-[54px] rounded-[10px] overflow-hidden "
                src={previewImage ? previewImage : NoImageProperty.src}
                alt="preview"
              />
              <span
                className={` ${selectedThread?.id === threadId ? 'text-[#FFFFFF] ' : ''
                  }block  text-xs font-roboto font-normal text-[#A1A1A1]`}>
                {lastMsgTime}
              </span>
            </div>
          </div>
        </div>
        {/* <span className="block ml-2 text-sm text-gray-600">bye</span> */}
      </div>
    </div>
  )
}

export default ChatList
