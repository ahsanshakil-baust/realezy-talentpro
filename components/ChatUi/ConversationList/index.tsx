import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import { useConversationList, usePrivateChatCollection } from '@/util/ChatProgress/useConversationList'
import { useSession } from 'next-auth/react'
import { MdMoreVert } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Paper, Popover, Popper } from '@mui/material'

import { styled } from '@mui/system'
import ChatLoader from '@/components/loader/ChatLoader'
import { useRouter } from 'next/router'

// Custom CSS styles for the arrow
const ArrowWrapper = styled('div')`
  position: relative;
`

const Arrow = styled('span')`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px;
  border-color: transparent transparent #e1e1e1 transparent;
  top: -16px;
  left: calc(50% - 8px);
`

const ConversationList = ({ isTenant, isAdminPanel, setIsAdminPanel, setPrivateThreadId }: any) => {
  const { data: session }: any = useSession()
  const { threadList: newThread } = useSelector((state: any) => state.entities.threadList)
  const [isLoading, setIsLoading] = useState(true)
  const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)

  const [threadsList, length]: any = useConversationList(session?.user?.id, selectedThread?.id)
  console.log('🚀 ~ file: index.tsx:34 ~ ConversationList ~ threadsList:', threadsList)
  const [privateThreadList]: any = usePrivateChatCollection(session?.user?.id)
  setPrivateThreadId(privateThreadList[0])
  // console.log("🚀 ~ file: index.tsx:35 ~ ConversationList ~ privateThreadList:", privateThreadList)
  const allThreads = [...threadsList, ...newThread]
  allThreads.sort((a: any, b: any) => b.time - a.time)
  console.log('🚀 ~ file: index.tsx:42 ~ ConversationList ~ allThreads:', allThreads)

  useEffect(() => {
    if (length > 0) {
      setIsLoading(false)
    }
  }, [length])

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const [anchorEl1, setAnchorEl1] = React.useState(null)

  const handleMouseOver = (event: any) => {
    setAnchorEl1(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setAnchorEl1(null)
  }

  const open1 = Boolean(anchorEl1)
  const id1 = open1 ? 'arrow-popper' : undefined

  const { pathname } = useRouter()

  return (
    <aside className="z-0 w-full h-full pl-[42px] ">
      <div className="relative w-full flex flex-col mt-[40px] mb-[20px] h-[134px] ">
        <div className=" w-full flex justify-between pr-[12.75px] mb-[30px] ">
          <div className=" w-full flex gap-4 items-center">
            <img
              src={'/download/Chat N.svg'}
              className=" w-[36px] h-[36px] md:w-[40px] md:h-[40px] xl:w-[52px] xl:h-[52px]"
              alt="no-image"
            />
            <h1 className=" text-[28px] leading-6 font-medium font-roboto text-[#00ADEE]  ">Chat</h1>
          </div>
          <div className=" w-full flex gap-0.5 relative items-center justify-end">
            <div onMouseLeave={handleMouseLeave} onClick={() => setIsAdminPanel((prev: any) => !prev)}>
              <img
                onMouseOver={handleMouseOver}
                src={'/chat/chatHelpSupport.svg'}
                className=" w-[36px] h-[36px] md:w-[40px] md:h-[40px] xl:w-[52px] xl:h-[52px]"
                alt="no-image"
              />
              <Popper id={id1} open={open1} anchorEl={anchorEl1} placement="bottom" disablePortal={true}>
                <Paper elevation={3}>
                  <ArrowWrapper>
                    <Arrow />
                  </ArrowWrapper>
                  <div className=" w-[180px] bg-[#E1E1E1] mt-3 h-auto p-3 flex flex-col gap-1.5 items-center justify-center">
                    <h2 className="font-roboto font-medium text-[#111] text-sm">Customer Support</h2>
                    <p className="font-roboto font-normal text-[#A1A1A1] text-xs ">Do you need any help?</p>
                    <p className="font-roboot font-normal text-[#A1A1A1] text-xs underline">
                      Tap here to Chat with us!
                    </p>
                  </div>
                </Paper>
              </Popper>
            </div>

            <div>
              <Button onClick={handleClick} className="!z-10 !p-0 ">
                <MdMoreVert className=" w-[42px] h-[42px]" />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}>
                <div className=" w-[230px]  z-10 flex flex-col p-6 gap-6 bg-[#F8FBFF] shadow-[0px_6px_10px_#034EA129] rounded-[10px]  ">
                  <div className="flex items-center gap-3">
                    <img src="/chat/cancelAgreement.svg" className="w-5 h-5 bg-transparent" alt="no-image" />
                    <p className="text-lg font-normal font-roboto text-[#000000] capitalize">Cancel Agreement</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/chat/inventory-list.svg" className="w-5 h-5 bg-transparent" alt="no-image" />
                    <p className="text-lg font-normal font-roboto text-[#000000] capitalize">Inventory List</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/chat/condition-report.svg" className="w-5 h-5 bg-transparent" alt="no-image" />
                    <p className="text-lg font-normal font-roboto text-[#000000] capitalize">Condition Report</p>
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </div>
        <div className="pr-9">
          <span className="absolute left-0 bottom-3 flex items-center pl-[30px] ">
            <img src="/chat/Magnifying_Glass.svg" alt="no-image" />
          </span>
          <input
            type="search"
            className="block w-full py-4 pl-[68.5px] placeholder:text-[#A1A1A1]  bg-[#FFFFFF] border-2 border-solid border-[#F1F7FF] text-[#A1A1A1] rounded font-roboto font-normal text-base  "
            name="search"
            placeholder="Search name or property name"
            required
          />
        </div>
      </div>
      {isAdminPanel ? (
        <ul
          className={` ${
            pathname === '/conversation' ? 'h-[calc(100vh-294px)]' : 'h-[calc(100vh-390px)]'
          } w-full  pr-[22.5px] overflow-y-auto  `}>
          {/* <h2 className="my-2 mb-1 ml-2 text-lg text-gray-600">Chats</h2> */}
          <li>
            {/* {privateThreadList.map((thread: any, index: number) => {
            return <ChatList isTenant={isTenant} key={index} data={thread} />
          })} */}
            {!isLoading ? (
              privateThreadList.length > 0 ? (
                privateThreadList.map((thread: any, index: number) => {
                  return <ChatList isTenant={isTenant} key={index} data={thread} isAdminPanel={isAdminPanel} />
                })
              ) : (
                <p className=" font-roboto font-medium text-xl text-center text-[#505050] mt-1">
                  No previous chat found!
                </p>
              )
            ) : (
              Array.from(new Array(6)).map((_, item) => <ChatLoader key={item} />)
            )}
          </li>
        </ul>
      ) : (
        <ul
          className={` ${
            pathname === '/conversation' ? 'h-[calc(100vh-294px)]' : 'h-[calc(100vh-390px)]'
          } w-full  pr-[22.5px] overflow-y-auto  `}>
          {/* <h2 className="my-2 mb-1 ml-2 text-lg text-gray-600">Chats</h2> */}
          <li>
            {/* {newThread.map((thread: any, index: number) => {
            return <ChatList isTenant={isTenant} key={index} data={thread} />
          })} */}
            {!isLoading ? (
              allThreads.length > 0 ? (
                allThreads.map((thread: any, index: number) => {
                  return <ChatList isTenant={isTenant} key={index} data={thread} selectedThread={selectedThread} />
                })
              ) : (
                <p className=" font-roboto font-medium text-xl text-center text-[#505050] mt-1">
                  No previous chat found!
                </p>
              )
            ) : (
              Array.from(new Array(6)).map((_, item) => <ChatLoader key={item} />)
            )}
          </li>
        </ul>
      )}
    </aside>
  )
}

export default ConversationList
