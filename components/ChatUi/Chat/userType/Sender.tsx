import { Icon } from '@/components/shared'
import { outputTime } from '@/util'
import React, { useState } from 'react'
import ChatActionButton from '../chatActionButton/ChatActionButton'
// import ChatActionButton from '../chatActionButton/ChatActionButton'

const Sender = ({ data, ctx }: any) => {
  const [seen, SetSeen] = useState(true)
  const date: any = new Date(parseInt(data?.time))
  // console.log("date data ------->>>", date)
  // const formattedDate: any = (date.getHours() % 12 || 12) + ':' + date.getMinutes()
  return (
    <>
      
        
          
          {ctx?.isAction ? (
            <>
            <ChatActionButton side={'sender'} ctx={ctx} data={data} seen={seen} />
            </>
          ) : (
            <div className="  w-[75%] flex flex-col items-end  ">
            <div className="relative max-w-full text-gray-700 bg-[#DDF2FE] pl-5 pr-4 rounded-t-[10px] rounded-l-[10px] shadow-[-1px_2px_4px_#0000001A]">
            <span className=" w-full  flex flex-col ">
            <span className=" flex flex-col gap-1 overflow-hidden">
              <p className="w-full min-w-[150px] pt-4 h-auto text-base text-[#000000] font-normal text-left font-roboto break-words " dangerouslySetInnerHTML={{ __html: data?.msg?.trim()?.replace(/\n/g, "<br/>") }}>
              </p>
              {data?.img && <img src={data?.img} className=" max-w-full max-h-[350px]" alt='no-need' />}
            </span>
            <span className=" pb-3 flex gap-2 -mb-1 whitespace-nowrap justify-end items-center ">
              <p className="  text-right text-sm font-roboto font-[300] text-[#606060] whitespace-nowrap">
                {/* {formattedDate} am */}
                {outputTime(date, "hh:mm A")}
              </p>
              <Icon name="checkmark" className={`w-5 h-5 ${seen ? 'text-[#034EA1]' : 'text-[#505050]'} `} />
            </span>
          </span>
          </div>
          </div>
          )}

    </>
  )
}

export default Sender
