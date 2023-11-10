import { useChatList, usePrivateChatList } from '@/util/ChatProgress'
// import { Button, TabsRef } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { Icon } from '../shared'
import Chat from './Chat'
import { ChatProgress } from './ChatProgress'
import ConversationList from './ConversationList'
// import Header from '../navigation/header/Header'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import ChatCalendarSvg from '../shared/Svg/ChatCalendarSvg'
import QuestionSvg from '../shared/Svg/QuestionSvg'
import { useGetThreadInfoQuery } from '@/store'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ChatUi = () => {
  const router = useRouter()
  console.log('🚀 ~ file: index.tsx:20 ~ router:', router)
  const [isAdminPanel, setIsAdminPanel] = useState(router.query.isAdmin === 'true' ? true : false)
  const [privateThreadId, setPrivateThreadId]: any = useState({})
  console.log('🚀 ~ file: index.tsx:20 ~ privateThreadId:', privateThreadId)
  useEffect(() => {
    setIsAdminPanel(router.query.isAdmin === 'true' ? true : false)
  }, [router.query.isAdmin])
  const { data: session }: any = useSession()
  const { selectedThread }: any = useSelector((state: any) => state.entities.threadSlice)
  const { data: threadInfo } = useGetThreadInfoQuery(selectedThread?.id)
  const isTenant = threadInfo?.sender_id === session?.user?.id
  console.log('🚀 ~ file: index.tsx:21 ~ isTenant:', isTenant)
  // console.log(`🚀 ~ file: index.tsx:23 ~ ChatProgress ~ abcd:`, selectedThread?.senderId, session?.user?.id)
  // const {progress} = useSelector((state: any) => state.entities.userProgress)
  // const isLandlord = progress?.roleType === 'landlord'
  // const {progress} = useSelector((state:any) => state.entities.userProgress);
  const [chat]: any = useChatList(selectedThread?.id) // unseen also
  const [privateChat]: any = usePrivateChatList(privateThreadId?.threadId)
  // console.log("🚀 ~ file: index.tsx:30 ~ privateChat:", privateChat)
  // console.log('🚀 ~ file: index.tsx:30 ~ chat:', chat)
  // const tabsRef = useRef<TabsRef>(null)
  const [redBook, setRedbook] = useState(false)
  const handleRedbookOpen = () => {
    setRedbook(!redBook)
  }

  const { pathname } = useRouter()
  return (
    <>
      <div className=" ">
        {/* <Header /> */}
        <div
          className={` ${
            pathname === '/conversation'
              ? 'mt-[85px] z-10 bg-[#F1F7ff] w-full h-[calc(100vh-85px)]  flex justify-between'
              : 'z-10 bg-[#F1F7ff] w-full h-[calc(100vh-195px)] items-center  flex justify-between'
          } `}>
          {/* coversationList */}
          <div
            className={` ${
              pathname === '/conversation' ? 'min-w-[28rem] max-w-[30rem]' : 'min-w-[28%]'
            } mr-2 h-full shadow-[4px_0px_6px_#034EA114] bg-[#FFFFFF] z-30 overflow-hidden  `}>
            <ConversationList
              isTenant={isTenant}
              isAdminPanel={isAdminPanel}
              setIsAdminPanel={setIsAdminPanel}
              setPrivateThreadId={setPrivateThreadId}
            />
          </div>
          {/* chat */}
          {isAdminPanel ? (
            <>
              <div className={'flex-grow'}>
                <div className="w-full h-full flex flex-col ">
                  <div className=" w-full min-h-[90px] rounded-b-[10px] flex items-center justify-between pl-[30px] pr-[36px] bg-[#f8fbff] shadow-[0px_3px_6px_#034EA114]">
                    <div className="relative flex items-center  gap-2">
                      <img
                        className="object-cover w-[60px] h-[60px] rounded-full "
                        src={'/chat/chatHelpSupport.svg'}
                        alt="username"
                      />
                      <div className=" ml-5 flex flex-col">
                        <p className={`  font-bold font-roboto text-2xl text-[#034EA1]`}>
                          {privateThreadId?.csaName && privateThreadId?.csaName[0]}
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-7 ">
                      <button className=" bg-transparent p-0 cursor-pointer">
                        <ChatCalendarSvg
                          className={` ${isTenant ? 'text-[#00ADEE]' : 'text-[#034EA1]'} w-9 h-9 path-fill-current `}
                        />
                      </button>
                      <button className=" bg-transparent p-0 cursor-pointer">
                        <QuestionSvg
                          className={` ${isTenant ? 'text-[#00ADEE]' : 'text-[#034EA1]'} w-9 h-9 path-fill-current`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-full  ">
                    <Chat
                      data={privateChat}
                      selectedThread={privateThreadId}
                      isAdminPanel={isAdminPanel}
                      isTenant={isTenant}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : selectedThread.id ? (
            <>
              <div className={` ${pathname === '/conversation' ? 'w-[63rem]' : 'min-w-[46.5%]'} mr-2 h-full  `}>
                <div className="w-full h-full flex flex-col ">
                  <div className=" w-full min-h-[90px] rounded-b-[10px] flex items-center justify-between pl-[30px] pr-[36px] bg-[#f8fbff] shadow-[0px_3px_6px_#034EA114]">
                    <div className="relative flex items-center  gap-2">
                      <img
                        className="object-cover w-[60px] h-[60px] rounded-full "
                        src={selectedThread?.conversationImage ? selectedThread?.conversationImage : '/no_profile.jpg'}
                        alt="username"
                      />
                      <div className=" ml-5 flex flex-col">
                        <p
                          className={`  font-bold font-roboto text-2xl ${
                            isTenant ? 'text-[#034EA1]' : 'text-[#00ADEE]'
                          }`}>
                          {selectedThread?.ConversationName}
                        </p>

                        {/* <Link
                          passHref
                          href={`/view-profile/${isTenant ? selectedThread?.receiverId : selectedThread?.senderId}`}>
                          <span
                            className={` cursor-pointer ${
                              isTenant ? 'text-[#034EA1]' : 'text-[#00ADEE]'
                            } max-w-max text-base font-roboto font-normal underline capitalize" `}>
                            View Profile
                          </span>
                        </Link> */}
                      </div>
                      <span className="absolute w-[14px] h-[14px] bg-[#00BC0C] border-2 border-white rounded-full left-[44px] bottom-1"></span>
                    </div>
                    <div className=" flex gap-7 ">
                      <button className=" bg-transparent p-0 cursor-pointer">
                        <ChatCalendarSvg
                          className={` ${isTenant ? 'text-[#00ADEE]' : 'text-[#034EA1]'} w-9 h-9 path-fill-current `}
                        />
                      </button>
                      <button className=" bg-transparent p-0 cursor-pointer">
                        <QuestionSvg
                          className={` ${isTenant ? 'text-[#00ADEE]' : 'text-[#034EA1]'} w-9 h-9 path-fill-current`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-full  ">
                    <Chat
                      data={chat}
                      selectedThread={selectedThread}
                      isTenant={isTenant}
                      handleRedbookOpen={handleRedbookOpen}
                    />
                  </div>
                </div>
              </div>

              {/* progress */}

              {
                <div
                  className={` ${
                    pathname === '/conversation' ? 'min-w-[432px] xl:max-w-[452px]' : 'min-w-[27%]'
                  } h-full hidden  sm:block`}>
                  <div className="w-full h-full flex flex-col pr-[42px] bg-[#FFFFFF] ">
                    <div className=" w-full min-h-[90px] rounded-b-[10px] flex items-center justify-between pl-[36px] pr-[36px] bg-[#f8fbff] shadow-[0px_3px_6px_#034EA114]">
                      <div className="relative flex items-center gap-2">
                        {/* <img src="/chat/chatProgress/buildings.svg" className="w-9 h-9" /> */}
                        <svg
                          className={` ${isTenant ? 'fill-[#00ADEE]' : 'fill-[#034EA1]'} w-9 h-9 `}
                          id="buildings"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40">
                          <path
                            id="Path_21312"
                            data-name="Path 21312"
                            d="M17,14.72V10.93a4.14,4.14,0,0,1,2.108-3.719A3.638,3.638,0,1,1,23.636,7.2a4.425,4.425,0,0,1,.819.635,4.365,4.365,0,0,1,1.278,3.093V14.72a8,8,0,1,0-8.731,0Zm0,0"
                            transform="translate(10.629 -0.008)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21313"
                            data-name="Path 21313"
                            d="M16.111,7.233V11.77a7.9,7.9,0,0,0,5.821,0V7.233a2.922,2.922,0,0,0-.852-2.065,2.977,2.977,0,0,0-3.812-.257,2.879,2.879,0,0,0-1.157,2.321Zm0,0"
                            transform="translate(12.974 3.505)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21314"
                            data-name="Path 21314"
                            d="M20.869,3.373A2.183,2.183,0,1,1,18.687,1.19,2.183,2.183,0,0,1,20.869,3.373Zm0,0"
                            transform="translate(13.309 1.001)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21315"
                            data-name="Path 21315"
                            d="M14.594,5.119,14.61.026l-1.455,0-.01,2.845a.728.728,0,0,1-1.189.56L8.042.2l-8,5.966L0,18.173l3.638.012.016-5.093a2.187,2.187,0,0,1,2.19-2.176l4.366.015a2.183,2.183,0,0,1,2.175,2.19l-.016,5.093,3.638.012L16.045,6.3l-1.051-.53a.727.727,0,0,1-.4-.655Zm0,0"
                            transform="translate(0 0.003)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21316"
                            data-name="Path 21316"
                            d="M8.585,7.425A.728.728,0,0,0,7.857,6.7L3.492,6.683a.728.728,0,0,0-.728.728L2.748,12.5l5.821.019Zm0,0"
                            transform="translate(2.345 5.422)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21317"
                            data-name="Path 21317"
                            d="M8.019,13.36a8,8,0,1,0,8,8A8,8,0,0,0,8.019,13.36Zm0,7.276a2.9,2.9,0,0,1,.728,5.717v1.559H7.292V26.353a2.91,2.91,0,0,1-2.183-2.807H6.564a1.455,1.455,0,1,0,1.455-1.455,2.9,2.9,0,0,1-.728-5.718V14.815H8.747v1.558a2.91,2.91,0,0,1,2.183,2.807H9.475a1.455,1.455,0,1,0-1.455,1.455Zm0,0"
                            transform="translate(0.013 10.633)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21318"
                            data-name="Path 21318"
                            d="M13.363,18.283V30.289h1.455V19.374a.728.728,0,0,1,.291-.582l5.821-4.366a.728.728,0,0,1,.873,0l5.821,4.366a.729.729,0,0,1,.291.582V30.289H29.37V18.283l-8-6Zm0,0"
                            transform="translate(10.629 9.711)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21319"
                            data-name="Path 21319"
                            d="M16.5,18.071h4.366v7.276H16.5Zm0,0"
                            transform="translate(13.309 14.653)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21320"
                            data-name="Path 21320"
                            d="M14.933,18.063v10.55h1.455v-8a.728.728,0,0,1,.728-.728h5.821a.728.728,0,0,1,.728.728v8H25.12V18.063l-5.093-3.82Zm0,0"
                            transform="translate(11.969 11.387)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21321"
                            data-name="Path 21321"
                            d="M9.476,19.06a8.556,8.556,0,0,1-.5,1.375,16.759,16.759,0,0,0,6.68.175V19.125a15.5,15.5,0,0,1-6.178-.065Zm0,0"
                            transform="translate(7.28 15.497)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21322"
                            data-name="Path 21322"
                            d="M20.489,16.276a16.738,16.738,0,0,0-.051-7.305,9.148,9.148,0,0,1-1.375.5,15.879,15.879,0,0,1,.349,3.267,14.265,14.265,0,0,1-.226,2.561Zm0,0"
                            transform="translate(15.494 7.267)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21323"
                            data-name="Path 21323"
                            d="M1.979,11.34a16.778,16.778,0,0,0,.429,3.769,8.606,8.606,0,0,1,1.375-.5,15.876,15.876,0,0,1-.349-3.267c0-.248.007-.488.015-.728H1.993c-.007.24-.015.48-.015.728Zm0,0"
                            transform="translate(1.689 8.633)"
                            // fill="#00adee"
                          />
                          <path
                            id="Path_21324"
                            data-name="Path 21324"
                            d="M9.045,2.374V3.866a15.572,15.572,0,0,1,6.9-.087,9.137,9.137,0,0,1,.5-1.375,16.855,16.855,0,0,0-7.407-.029Zm0,0"
                            transform="translate(7.33 1.672)"
                            // fill="#00adee"
                          />
                        </svg>
                        <p
                          className={` ml-4 font-medium font-roboto ${
                            isTenant ? 'text-[#00ADEE]' : 'text-[#034EA1]'
                          } capitalize text-2xl`}>
                          Progress{' '}
                        </p>
                      </div>
                      <div className=" flex  ">
                        <button onClick={handleRedbookOpen} className=" bg-transparent p-0 cursor-pointer">
                          <img
                            src="/chat/chatProgress/information.svg"
                            className="w-9 h-9 text-[#FFFFFF]"
                            alt="no-image"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-[calc(100vh-190px)] overflow-auto  ">
                      <ChatProgress isTenant={isTenant} redBook={redBook} />
                    </div>
                  </div>
                </div>
              }
            </>
          ) : (
            <div className="w-full  h-full flex flex-col items-center justify-center ">
              <Image
                src="/logo.png"
                alt="Logo"
                width="300px"
                height="70px"
                // className="header-logo !w-[160px] sm:!w-[180px] !h-[45px] "
              />
              <p className="mt-2 font-bold font-roboto 2xl:text-[2rem]/[2.375rem] md:text-[1.6rem]/text-[1.88rem] text-[1.2rem]/[1.48rem] 2xl:tracking-[0.04rem] tracking-[0.032rem] text-[#C1D8F2]">
                RealEzy Chat for Web
              </p>
              <p className="text-2xl font-light font-roboto text-[#C1D8F2] mt-2">
                Select a conversation to start chatting
              </p>
            </div>
          )}
        </div>

        <div>
          {/* <div className="hidden sm:col-span-3 sm:block">
          <div className="w-full h-full flex flex-col ">
            <div className=" w-full h-full  flex justify-between p-4 bg-[#00ADEE]">
              <div className="relative flex items-center gap-2">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={selectedThread?.conversationImage ? selectedThread?.conversationImage : '/public/no_profile.jpg'}
                  alt="username"
                />
                <span className="block ml-2 font-bold text-[#FFFFFF]">{selectedThread?.ConversationName}</span>
                <span className="absolute w-3 h-3 bg-green-500 border border-white rounded-full left-8 bottom-1"></span>
              </div>
              <div className=" flex gap-4 ">
                <button className=" bg-transparent p-0 cursor-pointer">
                  <Icon name="schedule" className="w-7 h-7 text-[#FFFFFF]" />
                </button>
                <button className=" bg-transparent p-0 cursor-pointer">
                  <Icon name="question" className="w-7 h-7 text-[#FFFFFF]" />
                </button>
              </div>
            </div>

            <div className="w-full h-full">
              <Button.Group className=" !w-full ">
                <button
                  color=""
                  className={
                    activeTab
                      ? ' w-1/2 flex gap-3 items-center justify-center bg-[#FFFFFF] text-[#c1c1c1] text-center  text-base lg:text-xl tracking-[0.48px] font-medium px-6  md:px-10  xl:px-14 py-4   '
                      : ' w-1/2 flex gap-3 items-center justify-center bg-[#60d1fa] text-[#FFFFFF] text-center text-base lg:text-xl tracking-[0.48px] font-medium px-6  md:px-10  xl:px-14 py-4   '
                  }
                  onClick={() => tabsRef.current?.setActiveTab(0)}>
                  <svg
                    className={
                      activeTab
                        ? 'w-6 h-6 text-center  stroke-[#c1c1c1] fill-transparent'
                        : 'w-6 h-6 text-center stroke-white fill-transparent'
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <g id="Group_11160" data-name="Group 11160" transform="translate(-1592.937 -851.862)">
                      <path
                        id="Icon"
                        d="M1470,864.667a2.445,2.445,0,0,1-2.445,2.444h-14.666L1448,872V852.445a2.444,2.444,0,0,1,2.444-2.444h17.111a2.444,2.444,0,0,1,2.445,2.444Z"
                        transform="translate(145.937 2.862)"
                        // fill="none"
                        // stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <line
                        id="Line_314"
                        data-name="Line 314"
                        x2="5.993"
                        transform="translate(1599.421 859.409)"
                        // fill="none"
                        // stroke="#fff"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                      />
                      <line
                        id="Line_315"
                        data-name="Line 315"
                        x2="11.129"
                        transform="translate(1599.384 863.862)"
                        // fill="none"
                        // stroke="#fff"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                  Chat
                </button>
                <button
                  color=""
                  className={
                    activeTab
                      ? 'w-1/2 gap-3 flex items-center justify-center bg-[#60d1fa] text-white text-center text-base lg:text-xl tracking-[0.48px] font-medium px-6  md:px-10  xl:px-14 py-4   uppercase'
                      : 'w-1/2 gap-3 flex items-center justify-center bg-[#FFFFFF] text-[#c1c1c1]  text-center text-base lg:text-xl tracking-[0.48px] font-medium px-6 md:px-10 xl:px-14 py-4   uppercase'
                  }
                  onClick={() => tabsRef.current?.setActiveTab(1)}>
                  <svg
                    className={activeTab ? 'w-6 h-6 text-center fill-[#FFFFFF]' : 'w-6 h-6 text-center fill-[#c1c1c1]'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22">
                    <g id="buildings" transform="translate(0 -0.008)">
                      <path
                        id="Path_21312"
                        data-name="Path 21312"
                        d="M15.326,7.946V5.9a2.234,2.234,0,0,1,1.137-2.007,1.963,1.963,0,1,1,2.442,0,2.387,2.387,0,0,1,.442.342,2.355,2.355,0,0,1,.69,1.669V7.946a4.318,4.318,0,1,0-4.711,0Zm0,0"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21313"
                        data-name="Path 21313"
                        d="M16.111,5.9V8.349a4.261,4.261,0,0,0,3.141,0V5.9a1.576,1.576,0,0,0-.46-1.114,1.606,1.606,0,0,0-2.057-.139A1.554,1.554,0,0,0,16.111,5.9Zm0,0"
                        transform="translate(0 0.003)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21314"
                        data-name="Path 21314"
                        d="M18.859,2.368A1.178,1.178,0,1,1,17.681,1.19,1.178,1.178,0,0,1,18.859,2.368Zm0,0"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21315"
                        data-name="Path 21315"
                        d="M7.874,2.772,7.883.024,7.1.021,7.093,1.556a.393.393,0,0,1-.642.3L4.339.118.021,3.337,0,9.815l1.963.006.009-2.748A1.18,1.18,0,0,1,3.153,5.9l2.355.008A1.178,1.178,0,0,1,6.682,7.088L6.674,9.836l1.963.006.02-6.431L8.09,3.125a.392.392,0,0,1-.215-.354Zm0,0"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21316"
                        data-name="Path 21316"
                        d="M5.9,7.084A.393.393,0,0,0,5.5,6.691L3.149,6.683a.393.393,0,0,0-.393.393L2.748,9.824l3.141.01Zm0,0"
                        transform="translate(0 0.004)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21317"
                        data-name="Path 21317"
                        d="M4.334,13.36a4.318,4.318,0,1,0,4.318,4.318A4.318,4.318,0,0,0,4.334,13.36Zm0,3.926a1.567,1.567,0,0,1,.393,3.085v.841H3.941V20.37a1.57,1.57,0,0,1-1.178-1.515h.785a.785.785,0,1,0,.785-.785,1.567,1.567,0,0,1-.393-3.085v-.841h.785v.841A1.57,1.57,0,0,1,5.9,16.5H5.119a.785.785,0,1,0-.785.785Zm0,0"
                        transform="translate(0 0.011)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21318"
                        data-name="Path 21318"
                        d="M13.363,15.519V22h.785V16.108a.393.393,0,0,1,.157-.314l3.141-2.355a.393.393,0,0,1,.471,0l3.141,2.355a.393.393,0,0,1,.157.314V22H22V15.519L17.681,12.28Zm0,0"
                        transform="translate(0 0.011)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21319"
                        data-name="Path 21319"
                        d="M16.5,18.071h2.355V22H16.5Zm0,0"
                        transform="translate(0 0.011)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21320"
                        data-name="Path 21320"
                        d="M14.933,16.3V22h.785V17.678a.393.393,0,0,1,.393-.393h3.141a.393.393,0,0,1,.393.393V22h.785V16.3l-2.748-2.061Zm0,0"
                        transform="translate(0 0.011)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21321"
                        data-name="Path 21321"
                        d="M9.245,19.06a4.616,4.616,0,0,1-.271.742,9.042,9.042,0,0,0,3.6.094v-.8a8.365,8.365,0,0,1-3.333-.035Zm0,0"
                        transform="translate(0 0.011)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21322"
                        data-name="Path 21322"
                        d="M19.833,12.912a9.031,9.031,0,0,0-.027-3.941,4.936,4.936,0,0,1-.742.271A8.567,8.567,0,0,1,19.252,11a7.7,7.7,0,0,1-.122,1.382Zm0,0"
                        transform="translate(0 0.006)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21323"
                        data-name="Path 21323"
                        d="M1.979,11a9.053,9.053,0,0,0,.232,2.033,4.643,4.643,0,0,1,.742-.271A8.565,8.565,0,0,1,2.764,11c0-.134,0-.263.008-.393H1.986c0,.129-.008.259-.008.393Zm0,0"
                        transform="translate(0 0.006)"
                        // fill="#c1c1c1"
                      />
                      <path
                        id="Path_21324"
                        data-name="Path 21324"
                        d="M9.045,2.191V3a8.4,8.4,0,0,1,3.725-.047,4.929,4.929,0,0,1,.271-.742,9.094,9.094,0,0,0-4-.016Zm0,0"
                        // fill="#c1c1c1"
                      />
                    </g>
                  </svg>
                  Progress
                </button>
              </Button.Group>
            </div>
            <div className="w-full h-full  ">
              <div className=" flex row-auto prod-tab-content">
                {/* <Tabs.Group
            aria-label="hm-product-tab"
            style="default"
            ref={tabsRef}
            onActiveTabChange={tab => setActiveTab(tab)}
            className="!w-full !p-0 accordion-tab-group">
            <Tabs.Item active title=""> */}
          {/* <Chat data={chat} selectedThread={selectedThread} /> */}
          {/* </Tabs.Item> */}
          {/* <Tabs.Item title=""> */}
          {/* <ChatProgress /> */}
          {/* </Tabs.Item>
          </Tabs.Group> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  )
}

export default ChatUi
