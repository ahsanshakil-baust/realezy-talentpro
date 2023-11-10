import { openingChatMessage } from '@/const'
import { outputTime } from '@/util'
import React, { useState } from 'react'
import ChatActionButton from '../chatActionButton/ChatActionButton'

const Receiver = ({ data, isTenant, ctx, handleRedbookOpen }: any) => {
  const [seen, SetSeen] = useState(true)
  const date: any = new Date(parseInt(data?.time))
  return (
    <>
    {ctx?.isAction ? (
      <>
      <ChatActionButton side={'reciever'} ctx={ctx} data={data} seen={seen} />
      </>
    ) : (
    <div className="w-[75%] ">
      <div className={`relative flex flex-col gap-2 max-w-max shadow-[1px_2px_6px_#0000001A] pl-5 pr-4 rounded-t-[10px] rounded-r-[10px] ${ data?.msg !== openingChatMessage ? "bg-[#FFFFFF]" : "bg-[#F1F7FF]"} text-gray-700 `}>
        <span className={`${isTenant ? 'text-[#00ADEE]' : 'text-[#034EA1]'} pt-4 text-lg font-medium font-roboto`}>
          {data?.username}
        </span>
        <span className=" w-full flex flex-col ">
          <span className="  flex flex-col gap-1 overflow-hidden">
            <p className=" w-full text-base min-w-[150px] text-left font-normal text-[#202020] font-roboto break-words">
              {data?.msg === openingChatMessage ? <div>
                <p>Thank you for choosing RealEzy!</p>
                <p>Click <span onClick={handleRedbookOpen} className='cursor-pointer text-red-600 font-bold'>Red Book</span>, Following is a quick summary of RealEzy's DIY process which we will walk you through for clearer understanding. If you need any help along the way, simply chat with us here, or WhatsApp us at <span className='font-bold'>88595303</span>. Our team is available to assist you between 11am to 9pm Singapore time (GMT+8). Happy DIY on RealEzy app.</p>
                <p>It's really easy with RealEzy!</p>
              </div> : <p  className='font-roboto' dangerouslySetInnerHTML={{ __html: data?.msg.trim()?.replace(/\n/g, "<br/>")}}></p>}
            </p>
            {data?.img && <img src={data?.img} className=" max-w-full max-h-[350px]" alt='no-need' />}
          </span>
          <p className=" pb-2 text-right text-sm font-roboto font-[300] text-[#A1A1A1] whitespace-nowrap">
            {outputTime(date, "hh:mm A")}
          </p>
        </span>
      </div>
    </div>
    )}
    </>
  )
}

export default Receiver
