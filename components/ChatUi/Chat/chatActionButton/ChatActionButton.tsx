import { Icon } from '@/components/shared'
import StepIcons from '@/components/shared/StepIcons'
import ChatCalendarSvg from '@/components/shared/Svg/ChatCalendarSvg'
import { outputTime } from '@/util'
import { Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'
// import { useSelector } from 'react-redux'

const ChatActionButton = ({ side, data, ctx, seen }: any) => {
  // console.log(`🚀 ~ file: ChatActionButton.tsx:4 ~ ChatActionButton ~ mess:`, ctx, mess)
  // const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  // const roleType = payload?.roletype

  /* if (
    mess.chatType == 'appointment' &&
    mess.schedulePurpose == 'house_viewing' &&
    (tenantProgress?.viewingScheduleConfirmed?.status == "Request Sent Awaiting Landlord's Response" ||
      tenantProgress?.viewingScheduleConfirmed?.status == 'Tenant Changed Schedule')
  ) {
  } */
  const date: any = new Date(parseInt(data?.time))
  return (
    ctx?.isVisi && <div className={side === 'sender' ? "  w-[75%] flex flex-col items-end  " : "w-[75%] flex flex-col items-start"}>
    <div className={`relative max-w-full text-gray-700 ${side === 'sender' ? 'bg-[#DDF2FE]' : "bg-[#FFFFFF]"} pl-5 pr-4 rounded-t-[10px] rounded-l-[10px] shadow-[-1px_2px_4px_#0000001A]`}>
    <span className=" w-full  flex flex-col ">
      <span className=" flex flex-col gap-1 overflow-hidden">
        <span className='flex gap-2'>
          {/* <ChatCalendarSvg
            className={`text-[#034EA1] w-14 h-14 pt-5 path-fill-current `}
          /> */}
          <StepIcons className={'text-[#034EA1] w-14 h-14 pt-5 path-fill-current '} index={ctx?.index} />
          <p className="w-full min-w-[150px] pt-4 h-auto text-base text-[#000000] font-normal text-left font-roboto break-words " dangerouslySetInnerHTML={{ __html: ctx?.msg?.trim()?.replace(/\n/g, "<br/>")}}>
          </p>
        </span>
        {/* <span>
          {ctx?.statnow?.buttons &&
            Object.entries(ctx?.statnow?.buttons).map(([k, v]: any) => {
              const isTenant = ctx.isTenant
              return (
                v[0] && (
                  <Button
                    className={` ${
                      isTenant ? '!text-[#00ADEE]' : '!text-[#034EA1]'
                    } !text-sm !py-2 !px-3 !flex !items-center `}
                    key={k}
                    onClick={v[1]}
                    variant="outlined"
                    size="small">
                    {k == 'Create' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="plusSquare" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Details' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="details" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Update' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="edit" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Accept' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="accept" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Cancel' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="cancel" className="w-[18px] h-[18px]" />
                      </span>
                    )}

                    {k == 'Reject' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="reject" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Pay' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="payment" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Send' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="send" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Sign' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="sign" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Upload' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="upload" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Request' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="request" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Reschedule' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="edit" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Viewing Completed' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="eyeCheck" className="w-[18px] h-[18px]" />
                      </span>
                    )}
                    {k == 'Viewing Not Completed' && (
                      <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                        <Icon name="eyeOff" className="w-[18px] h-[18px]" />
                      </span>
                    )}

                    {k}
                  </Button>
                )
              )
            })}
        </span> */}
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
    // <div className="w-[75%]">
    //   <div className="relative flex flex-col gap-2 max-w-max shadow-[1px_2px_6px_#0000001A] pl-5 pr-4  bg-[#FFFFFF] text-gray-700 ">
    //     <span className=" w-full flex flex-col ">
    //       <span className="  flex flex-col gap-1 overflow-hidden">
    //         <p className=" w-full text-base min-w-[150px] text-left font-normal text-[#202020] font-roboto break-words">
    //           {ctx?.msg ? ctx?.msg : ctx?.statnow?.title}
    //           {ctx?.subtitle && <p className="font-semibold">{ctx?.subtitle}</p>}
    //         </p>
    //         {/* {data?.img && <img src={data?.img} className=" max-w-full max-h-[350px]" />} */}
    //       </span>
    //       {ctx?.statnow?.buttons &&
    //         Object.entries(ctx?.statnow?.buttons).map(([k, v]: any) => {
    //           const isTenant = ctx.isTenant
    //           return (
    //             v[0] && (
    //               <Button
    //                 className={` ${
    //                   isTenant ? '!text-[#00ADEE]' : '!text-[#034EA1]'
    //                 } !text-sm !py-2 !px-3 !flex !items-center `}
    //                 key={k}
    //                 onClick={v[1]}
    //                 variant="outlined"
    //                 size="small">
    //                 {k == 'Create' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="plusSquare" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Details' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="details" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Update' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="edit" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Accept' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="accept" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Cancel' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="cancel" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}

    //                 {k == 'Reject' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="reject" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Pay' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="payment" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Send' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="send" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Sign' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="sign" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Upload' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="upload" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Request' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="request" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Reschedule' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="edit" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Viewing Completed' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="eyeCheck" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}
    //                 {k == 'Viewing Not Completed' && (
    //                   <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
    //                     <Icon name="eyeOff" className="w-[18px] h-[18px]" />
    //                   </span>
    //                 )}

    //                 {k}
    //               </Button>
    //             )
    //           )
    //         })}
    //     </span>
    //   </div>
    // </div>
  )
}

export default ChatActionButton
