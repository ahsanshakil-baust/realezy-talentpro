import React from 'react'

// import ChatSidebar from '@/components/ChatUi/ConversationList'
// import ChatSection from '@/components/ChatUi/Chat'
// import Header from '@/components/navigation/header/Header'
import ChatUi from '@/components/ChatUi'
import { NextPageWithLayout } from '../page'
import GlobalLayout from '@/components/layouts/GlobalLayout/GlobalLayout'

const Conversation: NextPageWithLayout = () => {
  return (
    <>
      {/* <section className=" mt-[85px] z-10 bg-[#F1F7ff] w-full h-[calc(100vh-85px)]  ">
        <div className=" w-full h-full  overflow-x-hidden ">
          <div className="w-[90%] md:w-full h-full "> */}
      {/* <div className="w-full h-full  border border-gray-300 rounded grid grid-cols-12  "> */}
      <ChatUi />
      {/* </div> */}
      {/* </div>
        </div>
      </section> */}
    </>
  )
}

Conversation.getLayout = page => <GlobalLayout>{page}</GlobalLayout>

export default Conversation

// Conversation.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
