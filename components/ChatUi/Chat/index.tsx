import React, { useEffect, useRef, useState } from 'react'

import Receiver from './userType/Receiver'
import Sender from './userType/Sender'
// import RedBook from './redBook/RedBook'
import PlusMenu from './plusmenu/PlusMenu'
import AttachmentMenu from './attachmebtMenu/AttachmentMenu'
import { useSession } from 'next-auth/react'
import {
  ChatCreate,
  privateChatCreate,
  updateConversationNew,
  updateLandlordProgress,
  updatePrivateConversationNew,
  updateTenantProgress,
} from '@/util/ChatProgress'
import { Button } from '@mui/material'
import { openingChatMessage } from '@/const'
// import MinusButtonIcon from '@/components/shared/Svg/PlusButtonIcon'
// import PlusButtonIcon from '@/components/shared/Svg/PlusButtonIcon'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserChatThreadList, setSelectedThread } from '@/store/chatProgress'
import { updateUnreadConversationCounting } from '../../../util/ChatMessage/chatCounter'
import moment from 'moment'
import { getReservationFee } from '@/util'
import { calculateIrasStampDutyAndGST } from '@/store/chatProgress/progress/progressStatusHandler'
import { useRouter } from 'next/router'

const Chat = ({ data, selectedThread, isTenant, isAdminPanel, handleRedbookOpen }: any) => {
  console.log('🚀 ~ file: index.tsx:26 ~ Chat ~ datapppp:', data)
  const { threadList: newThread } = useSelector((state: any) => state.entities.threadList)
  const dispatch = useDispatch()
  const bottomRef: any = useRef(null)

  const { progress: payload, status } = useSelector((state: any) => state.entities.userProgress)
  const [statnow, setStatnow]: any = useState()

  useEffect(() => {
    setStatnow(status)
  }, [status])

  const { data: session }: any = useSession()

  useEffect(() => {
    const updateUnreadCoversation = async () => {
      try {
        await updateUnreadConversationCounting(data, session?.user?.id)
        console.log('Unread conversation counting updated successfully.')
      } catch (error) {
        console.error('Error updating unread conversation counting:', error)
      }
    }

    updateUnreadCoversation()
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight
  }, [data])

  const [tenantDIY, setTenantDIY] = useState(false)
  const handleTenantDIYOpen = () => {
    setTenantDIY(!tenantDIY)
    setAttachmentOpen(false)
    setPluseButtonOpen(false)
  }
  const handleTenantDIYClose = () => {
    // setTenantDIY(false)
    setAttachmentOpen(false)
    setPluseButtonOpen(false)
  }

  const [pluseButtonOpen, setPluseButtonOpen] = useState(false)
  const handlePlusButtonOpen = () => {
    setPluseButtonOpen(!pluseButtonOpen)
    setAttachmentOpen(false)
    // setTenantDIY(false)
  }

  const [attachmentOpen, setAttachmentOpen] = useState(false)
  // const handleAttachmentOpen = () => {
  //   setAttachmentOpen(!attachmentOpen)
  //   setPluseButtonOpen(false)
  //   setTenantDIY(false)
  // }
  const [chatText, setChatText] = useState('')

  const handleKeyboardMessage = (e: any) => {
    if (isAdminPanel) {
      if (e.which === 13 && !e.shiftKey) {
        if (chatText.trim() !== '') {
          privateChatCreate(selectedThread?.adminId, selectedThread?.threadId, session?.user?.id, chatText)
          updatePrivateConversationNew(selectedThread)
          setChatText('')
        }
      }
    } else {
      if (e.which === 13 && !e.shiftKey) {
        e.preventDefault()
        const senderInfo: any = {
          id: selectedThread.senderId,
          image: selectedThread.senderImage,
          name: selectedThread.senderName,
        }
        const recieverInfo: any = {
          id: selectedThread.receiverId,
          image: selectedThread.receiverImage,
          name: selectedThread.receiverName,
        }

        if (chatText.trim() !== '') {
          if (data.length === 0) {
            ChatCreate(
              openingChatMessage,
              'initial_message',
              selectedThread.propertyId,
              selectedThread?.receiverId,
              selectedThread.id,
              'RZYADMIN',
              ''
            )
            dispatch(removeUserChatThreadList(selectedThread))
            dispatch(
              setSelectedThread(
                JSON.stringify({
                  ...selectedThread,
                  isNew: false,
                })
              )
            )
          }
          ChatCreate(
            chatText,
            session?.user?.id,
            selectedThread.propertyId,
            session?.user?.id === selectedThread.senderId ? selectedThread.receiverId : selectedThread.senderId,
            selectedThread.id,
            'general',
            ''
          )
          updateConversationNew(senderInfo, selectedThread.id, recieverInfo, chatText)
          // updateConversation(chatReceiverId, context?.value?.selectedThread, context, chatText)
          updateTenantProgress(`${selectedThread.propertyId}-${selectedThread?.senderId}`, 'contactTenant', '')
          updateLandlordProgress(
            `${selectedThread?.receiverId}-${selectedThread.propertyId}-${selectedThread?.senderId}`,
            'contactTenant',
            ''
          )
          setChatText('')
        }
      }
    }
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const handleSendMessage = () => {
    if (isAdminPanel) {
      if (chatText.trim() !== '') {
        privateChatCreate(selectedThread?.adminId, selectedThread?.threadId, session?.user?.id, chatText)
        updatePrivateConversationNew(selectedThread)
        setChatText('')
        // bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    } else {
      const senderInfo: any = {
        id: selectedThread.senderId,
        image: selectedThread.senderImage,
        name: selectedThread.senderName,
      }
      const recieverInfo: any = {
        id: selectedThread.receiverId,
        image: selectedThread.receiverImage,
        name: selectedThread.receiverName,
      }

      if (chatText.trim() !== '') {
        if (data.length === 0) {
          ChatCreate(
            openingChatMessage,
            'initial_message',
            selectedThread.propertyId,
            selectedThread?.receiverId,
            selectedThread.id,
            'RZYADMIN',
            ''
          )
          dispatch(removeUserChatThreadList(selectedThread))
          dispatch(
            setSelectedThread(
              JSON.stringify({
                ...selectedThread,
                isNew: false,
              })
            )
          )
        }
        ChatCreate(
          chatText,
          session?.user?.id,
          selectedThread.propertyId,
          session?.user?.id === selectedThread.senderId ? selectedThread.receiverId : selectedThread.senderId,
          selectedThread.id,
          'general',
          ''
        )
        updateConversationNew(senderInfo, selectedThread.id, recieverInfo, chatText)
        // updateConversation(chatReceiverId, context?.value?.selectedThread, context, chatText)
        updateTenantProgress(`${selectedThread.propertyId}-${selectedThread?.senderId}`, 'contactTenant', '')
        updateLandlordProgress(
          `${selectedThread?.receiverId}-${selectedThread.propertyId}-${selectedThread?.senderId}`,
          'contactTenant',
          ''
        )
        setChatText('')
      }
    }
    bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const textareaRef: any = useRef(null)

  // useEffect(() => {
  //   // Scroll to the bottom of the textarea when the component mounts
  //   if (textareaRef.current) {
  //     textareaRef.current.scrollTop = textareaRef.current.scrollHeight
  //   }
  // }, [data])

  const isActionableChat = (mess: any) => {
    console.log('🚀 ~ file: index.tsx:224 ~ isActionableChat ~ mess:', mess)
    if (mess?.chatType === 'general') {
      return {
        isAction: false,
      }
    }
    switch (mess?.message) {
      case 'Schedule':
        return {
          isAction: true,
          statnow: statnow?.['Property Viewing Schedule']?.progInfo?.active
            ? statnow['Property Viewing Schedule']
            : statnow['Key Handover Schedule']?.progInfo?.active
            ? statnow['Key Handover Schedule']
            : {
                status: true,
                progInfo: {
                  active: false,
                  completed: true,
                },
                title: statnow['Key Handover Schedule'].progInfo?.completed
                  ? statnow['Key Handover Schedule']?.title
                  : statnow['Property Viewing Schedule']?.title,
                buttons: {},
              },
          isTenant: payload?.roletype === 'tenant',
          msg: (() => {
            if (mess?.schedulePurpose === 'house_viewing') {
              const scheduleTime = moment(
                payload?.viewingScheduleConfirmed?.selected_date +
                  ' ' +
                  payload?.viewingScheduleConfirmed?.selected_time,
                'YYYY-MM-DD HH:mm:ss'
              ).format('[at] h:mm A [on] MMMM D, YYYY')
              if (
                payload?.viewingScheduleConfirmed?.progress_status ||
                payload?.viewingScheduleConfirmed?.status.includes('accept')
              ) {
                return `Completed House Viewing ${scheduleTime}`
              } else {
                const statusOfSchedule = payload?.viewingScheduleConfirmed?.status?.split('_')
                if (statusOfSchedule?.length > 0) {
                  if (statusOfSchedule?.includes('reschedule')) {
                    if (payload?.roletype === statusOfSchedule[0]) {
                      return `You Rescheduled with ${
                        statusOfSchedule[0] === 'tenant' ? 'Landlord' : 'Tenant'
                      } For House Viewing ${scheduleTime}`
                    } else {
                      return `${
                        statusOfSchedule[0] === 'tenant' ? 'Tenant' : 'Landlord'
                      } Rescheduled with you for House Viewing ${scheduleTime}`
                    }
                  } else {
                    if (payload?.roletype === statusOfSchedule[0] && statusOfSchedule[1] == 'create') {
                      return `You Created a Schedule with ${
                        statusOfSchedule[0] === 'tenant' ? 'Landlord' : 'Tenant'
                      } For House Viewing ${scheduleTime}`
                    } else {
                      return `${
                        statusOfSchedule[0] === 'tenant' ? 'Landlord' : 'Tenant'
                      } Created a Schedule with you for House Viewing ${scheduleTime}`
                    }
                  }
                }
              }
            } else {
              const scheduleTime = moment(
                payload?.keyHandover?.selected_date + ' ' + payload?.keyHandover?.selected_time,
                'YYYY-MM-DD HH:mm:ss'
              ).format('[at] h:mm A [on] MMMM D, YYYY')
              if (payload?.keyHandover?.progress_status || payload?.keyHandover?.status.includes('accept')) {
                return `Completed Key Handover ${scheduleTime}`
              } else {
                const statusOfSchedule = payload?.keyHandover?.status?.split('_')
                if (statusOfSchedule?.length > 0) {
                  if (statusOfSchedule?.includes('reschedule')) {
                    if (payload?.roletype === statusOfSchedule[0]) {
                      return `You Rescheduled with ${
                        statusOfSchedule[0] === 'tenant' ? 'Landlord' : 'Tenant'
                      } For Key Handover ${scheduleTime}`
                    } else {
                      return `${
                        statusOfSchedule[0] === 'tenant' ? 'Tenant' : 'Landlord'
                      } Rescheduled with you for Key Handover ${scheduleTime}`
                    }
                  } else {
                    if (payload?.roletype === statusOfSchedule[0] && statusOfSchedule[1] == 'create') {
                      return `You Created a Schedule with ${
                        statusOfSchedule[0] === 'tenant' ? 'Landlord' : 'Tenant'
                      } For Key Handover ${scheduleTime}`
                    } else {
                      return `${
                        statusOfSchedule[0] === 'tenant' ? 'Landlord' : 'Tenant'
                      } Created a Schedule with you for Key Handover ${scheduleTime}`
                    }
                  }
                }
              }
            }
          })(),
          index: 2,
          isVisi: true,
        }

      case 'Please create A Rental Proposal With Your Suitable Price':
        return {
          isAction: true,
          statnow:
            statnow['Make Rental Proposal']?.progInfo?.active &&
            (payload?.rentOffer?.status !== 'tenant_created'
              ? statnow['Make Rental Proposal']
              : {
                  status: true,
                  progInfo: {
                    active: false,
                    completed: true,
                  },
                  title:
                    payload?.roletype === 'tenant'
                      ? 'Please Create A Rental Proposal With Your Suitable Price'
                      : 'You Requested Tenant For Rental Proposal',
                  buttons: {},
                }),
          isTenant: payload?.roletype === 'tenant',
          msg:
            payload?.roletype === 'tenant'
              ? 'Please Create A Rental Proposal With Your Suitable Price'
              : 'You Requested Tenant For Rental Proposal',
          index: 3,
          isVisi: true,
        }
      case 'Rental Proposal Offer':
        return {
          isAction: true,
          statnow: statnow['Make Rental Proposal']?.progInfo?.active && statnow['Make Rental Proposal'],
          isTenant: payload?.roletype === 'tenant',
          msg: `Rental Proposal Offer\n${
            payload?.roletype === 'tenant' ? `Landlord's` : 'Your'
          } Accepted Amount is ${parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}`,
          subtitle: statnow['Make Rental Proposal']?.title,
          index: 3,
          isVisi: true,
        }
      case 'landlord request for pay first month rental':
        return {
          isAction: true,
          statnow: statnow['Pay First Month Rental']?.progInfo?.active && statnow['Pay First Month Rental'],
          isTenant: payload?.roletype === 'tenant',
          msg:
            payload?.roletype === 'tenant'
              ? `Please pay first month rental fee & Stamp Duty $${
                  calculateIrasStampDutyAndGST(payload?.rentOffer?.offer_amount, payload?.rentOffer?.tenancy_period)[3]
                }`
              : 'You Requested Tenant to pay first month rental fee & Stamp Duty',
          index: 4,
          isVisi: true,
        }
      case 'Please upload HDB Approval to proceed':
        return {
          isAction: true,
          statnow: statnow['HDB']?.progInfo?.active && statnow['HDB'],
          isTenant: payload?.roletype === 'tenant',
          msg:
            payload?.roletype === 'tenant'
              ? 'You Request Landlord For Upload HDB Approval Letter/Email'
              : 'Please Upload HDB Approval Letter/Email',
          index: 13,
          isVisi: true,
        }
      case 'There is a request for pay booking fee':
        return {
          isAction: true,
          statnow:
            statnow['Pay Reservation Fee']?.progInfo?.active &&
            (payload?.roletype == 'tenant'
              ? statnow['Pay Reservation Fee']
              : {
                  status: true,
                  progInfo: {
                    active: false,
                    completed: true,
                  },
                  title:
                    payload?.roletype === 'tenant'
                      ? 'Please Create A Rental Proposal With Your Suitable Price'
                      : 'You Requested Tenant For Rental Proposal',
                  buttons: {},
                }),
          isTenant: payload?.roletype === 'tenant',
          msg:
            payload?.roletype == 'tenant'
              ? `Please Pay reservation fee amount ${getReservationFee(payload?.rentOffer?.offer_amount).toLocaleString(
                  'en-US',
                  { style: 'currency', currency: 'USD' }
                )}`
              : 'You Requested Tenant to pay reservation fee',
          subtitle: '',
          index: 4,
          isVisi: true,
        }
      case 'Please Provide the Property Draft Agreement':
        return {
          isAction: true,
          statnow:
            statnow['Send Agreement']?.progInfo?.active &&
            (payload?.roletype === 'landlord'
              ? payload?.tenancyAgreement?.status !== 'draft_created'
                ? payload?.tenancyAgreement?.status !== 'draft_send'
                  ? statnow['Send Agreement']
                  : {
                      status: true,
                      progInfo: {
                        active: false,
                        completed: true,
                      },
                      title: 'Please Provide The Property Draft Agreement',
                      buttons: {},
                    }
                : {
                    status: true,
                    progInfo: {
                      active: false,
                      completed: true,
                    },
                    title: 'Please Provide The Property Draft Agreement',
                    buttons: {},
                  }
              : {
                  status: true,
                  progInfo: {
                    active: false,
                    completed: true,
                  },
                  title: 'You Requested to Landlord for Property Draft Agreement',
                  buttons: {},
                }),
          msg:
            payload?.roletype == 'tenant'
              ? 'You Requested to Landlord for Property Draft Agreement'
              : 'Please Provide The Property Draft Agreement',
          index: 6,
          isVisi: true,
        }

      case 'Landlord Created the property draft Agreement for Tenant':
        return {
          isAction: true,
          statnow: statnow['Send Agreement']?.progInfo?.active && statnow['Send Agreement'],
          msg: 'You Created The Property Draft Agreement For Tenant',
          index: 6,
          isVisi: payload.roletype !== 'tenant',
        }
      case 'Hi, There is a request for add Condition Report':
        return {
          isAction: true,
          statnow: statnow['Condition Report Signing']?.progInfo?.active && statnow['Condition Report Signing'],
          msg:
            payload?.roletype === 'tenant'
              ? 'You Request Landlord For The Property Condition Report'
              : 'Please Provide The Property Condition Report',
          index: 5,
          isVisi: true,
        }
      case 'Landlord Added Condition Report':
        return {
          isAction: true,
          statnow: statnow['Condition Report Signing']?.progInfo?.active && statnow['Condition Report Signing'],
          msg:
            payload?.roletype === 'tenant'
              ? 'Landlord Shared The Property Condition Report With You'
              : 'You Shared The Property Condition Report With Tenant',
          index: 5,
          isVisi: true,
        }
      case 'Hi, There is a request for add inventory list':
        return {
          isAction: true,
          statnow: statnow['Inventory Checklist Signing']?.progInfo?.active && statnow['Inventory Checklist Signing'],
          msg:
            payload?.roletype === 'tenant'
              ? 'You Request Landlord For The Property Inventory List'
              : 'Please Provide The Property Inventory List',
          index: 8,
          isVisi: true,
        }
      default:
        return {
          isAction: false,
        }
    }
  }

  const { pathname } = useRouter()

  return (
    <>
      <div className=" w-full bg-[#F6F9FC] relative h-full flex flex-col justify-between  ">
        {/* <div
          className={
            tenantDIY
              ? 'absolute flex gap-2 left-[850px] top-6 z-30 bg-white ease-in-out duration-500'
              : 'absolute flex gap-2 left-0 top-6 z-20 ease-in-out duration-500'
          }>
          <div
            onClick={handleTenantDIYOpen}
            className="  w-20 p-4 rounded-r-full shadow-[4px_4px_6px_rgba(0,0,0,0.1)]  bg-[#FFFFFF] justify-center flex items-center">
            <img src="/chat/diy.svg" className=" w-8 h-8" />
          </div>
        </div>
        <div
          className={
            tenantDIY
              ? 'absolute z-20 left-0 top-0 w-[850px] h-full overflow-y-auto bg-[#FFFFFF] ease-in-out duration-500 shadow-[4px_0px_6px_rgba(0,0,0,0.1)] '
              : ' absolute -left-[100%] top-0 z-20 w-[850px] h-full overflow-y-auto bg-[#FFFFFF] ease-in-out duration-500 shadow-[4px_0px_6px_rgba(0,0,0,0.1)]'
          }>
          <div className=" p-4 flex flex-col ">
            <RedBook />
          </div>
        </div> */}

        <div
          className={
            pluseButtonOpen
              ? 'absolute rounded-[20px] z-10 left-0 bottom-16 w-full h-[350px] overflow-hidden bg-[#FFFFFF]  duration-500 ease-linear shadow-[0px_10px_30px_rgba(3,78,161,0.20)]  '
              : ' absolute rounded-[20px] left-0 bottom-16  z-0 w-0 h-0 overflow-hidden bg-[#FFFFFF]  duration-500 ease-linear shadow-[0px_10px_30px_rgba(3,78,161,0.20)] '
          }>
          <div className=" p-4 flex flex-col ">
            <PlusMenu />
          </div>
        </div>
        <div
          className={
            attachmentOpen
              ? 'absolute rounded-[20px] z-10 right-3 bottom-16 w-[97%] h-[350px] overflow-y-auto bg-[#034EA1]  duration-500 ease-linear shadow-[0px_10px_30px_rgba(3,78,161,0.20)]  '
              : ' absolute rounded-[20px] right-3 bottom-16  z-0 w-0 h-0 overflow-hidden bg-[#034EA1]  duration-500 ease-linear shadow-[0px_10px_30px_rgba(3,78,161,0.20)] '
          }>
          <div className=" p-4 flex flex-col ">
            <AttachmentMenu />
          </div>
        </div>

        <div
          onClick={handleTenantDIYClose}
          className={` relative w-full ${
            pathname === '/conversation' ? 'h-[calc(100vh-260px)]' : 'h-[calc(100vh-370px)]'
          } overflow-y-auto   py-6 px-6  bg-[url('/chat/chatBackGround.png')] `}
          ref={bottomRef}>
          <ul className="   space-y-3 ">
            {isAdminPanel
              ? data?.map((mess: any, _: number) => {
                  // console.log('message----->', mess)
                  return (
                    <>
                      {mess?.messageFrom !== 'CUSTOMER' ? (
                        <li className="flex justify-start">
                          <Receiver
                            isTenant={isTenant}
                            data={{
                              username: mess?.csaName,
                              msg: mess?.message,
                              img: mess?.media,
                              time: mess?.time,
                              mess: mess,
                            }}
                            ctx={isActionableChat(mess)}
                            handleRedbookOpen={handleRedbookOpen}
                          />
                        </li>
                      ) : (
                        <li className="flex justify-end ">
                          <Sender
                            ctx={isActionableChat(mess)}
                            data={{ msg: mess?.message, img: mess?.media, time: mess?.time, mess: mess }}
                          />
                        </li>
                      )}
                    </>
                  )
                })
              : data?.map((mess: any, _: number) => {
                  // console.log('message----->', mess)
                  return (
                    <>
                      {mess?.receiverId === session?.user?.id ||
                      mess?.message === openingChatMessage ||
                      mess?.chatType === 'RZYADMIN' ? (
                        <li className="flex justify-start">
                          <Receiver
                            isTenant={isTenant}
                            data={{
                              username:
                                mess?.message === openingChatMessage || mess?.chatType === 'RZYADMIN'
                                  ? 'RealEzy'
                                  : selectedThread.ConversationName,
                              msg: mess?.message,
                              img: mess?.media,
                              time: mess?.time,
                              mess: mess,
                            }}
                            ctx={isActionableChat(mess)}
                            handleRedbookOpen={handleRedbookOpen}
                          />
                        </li>
                      ) : (
                        <li className="flex justify-end ">
                          <Sender
                            ctx={isActionableChat(mess)}
                            data={{ msg: mess?.message, img: mess?.media, time: mess?.time, mess: mess }}
                          />
                        </li>
                      )}
                    </>
                  )
                })}
          </ul>
          {/* <li className=" hidden " id="1234" ref={bottomRef}></li> */}
        </div>

        <div className="flex z-30 bg-[#FFFFFF] items-center justify-between w-full h-[70px] px-5 pt-4 pb-3 rounded-t-[10px]">
          <span onClick={handlePlusButtonOpen} className=" pl-1 mr-[20px]">
            {pluseButtonOpen ? (
              <svg
                className={` ${isTenant ? 'fill-[#00ADEE]' : 'fill-[#034EA1]'} w-8 h-8 `}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30">
                <g id="remove" transform="translate(4 4)">
                  <path
                    id="remove-2"
                    data-name="remove"
                    d="M15,0A15,15,0,1,0,30,15,15.017,15.017,0,0,0,15,0Zm6.563,16.25H8.438a1.25,1.25,0,0,1,0-2.5H21.563a1.25,1.25,0,0,1,0,2.5Z"
                    transform="translate(-4 -4)"
                    // fill="#00ADEE"
                  />
                </g>
              </svg>
            ) : (
              // <img src="chat/minusButton.svg" className=" w-[30px] h-[30px]" />
              // <PlusButtonIcon className={` ${isTenant ? 'text-[#00ADEE]' : 'text-[#034EA1]'} w-8 h-8 path-fill-current`}  />
              <svg
                className={` ${isTenant ? 'fill-[#00ADEE]' : 'fill-[#034EA1]'} w-8 h-8 `}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30">
                <g id="Layer_2" data-name="Layer 2" transform="translate(4 4)">
                  <g id="_01.Add" data-name="01.Add" transform="translate(0 0)">
                    <rect
                      id="Rectangle_9111"
                      data-name="Rectangle 9111"
                      width="30"
                      height="30"
                      rx="15"
                      transform="translate(-4 -4)"
                      // fill="#00ADEE"
                    />
                    <path
                      id="_Path_"
                      d="M22.25,14.207a1.429,1.429,0,0,1-1.429,1.429H15.964a.282.282,0,0,0-.284.284v4.861a1.429,1.429,0,0,1-2.859,0V15.92a.282.282,0,0,0-.284-.284H7.679a1.429,1.429,0,1,1,0-2.858h4.857a.282.282,0,0,0,.284-.284V7.639a1.429,1.429,0,0,1,2.859,0v4.855a.282.282,0,0,0,.284.29h4.857a1.429,1.429,0,0,1,1.429,1.423Z"
                      transform="translate(-3.25 -3.211)"
                      fill="#fff"
                      // stroke="#034ea1"
                      strokeWidth="0.5"
                    />
                  </g>
                </g>
              </svg>
            )}
          </span>
          {/* <div className="relative " onClick={handleAttachmentOpen}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24.749" height="24.749" viewBox="0 0 24.749 24.749">
                <g id="attachment" transform="translate(15.556) rotate(45)">
                  <path
                    id="Path_19417"
                    data-name="Path 19417"
                    d="M13,16.116V6.907a.852.852,0,0,0-1.7,0v9.209a4.6,4.6,0,0,1-4.8,4.349,4.6,4.6,0,0,1-4.8-4.349V4.349A2.978,2.978,0,0,1,4.8,1.535,2.978,2.978,0,0,1,7.913,4.349v11A1.352,1.352,0,0,1,6.5,16.628a1.352,1.352,0,0,1-1.413-1.279V5.372A.81.81,0,0,0,4.239,4.6a.81.81,0,0,0-.848.767v9.977A2.978,2.978,0,0,0,6.5,18.163a2.978,2.978,0,0,0,3.109-2.814v-11A4.6,4.6,0,0,0,4.8,0,4.6,4.6,0,0,0,0,4.349V16.116C0,19.36,2.917,22,6.5,22S13,19.36,13,16.116Z"
                    fill="#c1c1c1"
                  />
                </g>
              </svg>
            </span>
          </div> */}

          <div className="relative mr-[20px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24.749 24.749">
              <g id="attachment" transform="translate(15.556) rotate(45)">
                <path
                  id="Path_19417"
                  data-name="Path 19417"
                  d="M13,16.116V6.907a.852.852,0,0,0-1.7,0v9.209a4.6,4.6,0,0,1-4.8,4.349,4.6,4.6,0,0,1-4.8-4.349V4.349A2.978,2.978,0,0,1,4.8,1.535,2.978,2.978,0,0,1,7.913,4.349v11A1.352,1.352,0,0,1,6.5,16.628a1.352,1.352,0,0,1-1.413-1.279V5.372A.81.81,0,0,0,4.239,4.6a.81.81,0,0,0-.848.767v9.977A2.978,2.978,0,0,0,6.5,18.163a2.978,2.978,0,0,0,3.109-2.814v-11A4.6,4.6,0,0,0,4.8,0,4.6,4.6,0,0,0,0,4.349V16.116C0,19.36,2.917,22,6.5,22S13,19.36,13,16.116Z"
                  fill="#c1c1c1"
                />
              </g>
            </svg>
            <input name="Select File" type="file" className=" w-[30px] h-[30px] absolute left-0 top-0 opacity-0" />
          </div>

          <div className="border h-8 border-solid border-[#061624] opacity-[0.5] mr-4" />

          <textarea
            // type="text"
            rows={1}
            placeholder="Type a message"
            value={chatText}
            onChange={(e: any) => setChatText(e.target.value)}
            onKeyDown={handleKeyboardMessage}
            className="font-roboto font-normal  text-xl py-3 px-1 resize-none mr-[20px] focus:bg-[#F1F8ff] rounded-[10px] placeholder:font-roboto block w-full  bg-[#FFFFFF]  outline-none focus:text-gray-700"
            name="message"
            required
            ref={textareaRef}
            // rows={5}
            // style={{ overflowY: 'scroll' }}
          />

          {/* <button className="p-2 rounded-full hover:outline hover:outline-1 hover:outline-red-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#034EA1]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button> */}

          <Button
            onClick={handleSendMessage}
            className={` ${
              isTenant ? (chatText ? '!bg-[#00ADEE]' : '!bg-[#D1D1D1]') : chatText ? '!bg-[#034EA1]' : '!bg-[#D1D1D1]'
            }  !text-[#ffffff] !px-7 !py-3 !rounded-[10px] !text-lg !font-roboto !font-normal !uppercase`}>
            Send
            <img src="/chat/submitMessage.svg" className=" !ml-3 !-mb-2" alt="no-need" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default Chat
