import { Skeleton } from '@mui/material'
import React from 'react'

const ChatLoader = () => {
  return (
    <>
      <div>
        <div
          className={`flex items-center w-full pl-5 pr-[18px] pt-4 pb-3 text-sm delay-150  cursor-pointer rounded-[10px] hover:bg-[#C3EBFA] focus:outline-none`}>
          <div className="w-full h-auto">
            <div className="flex w-full h-auto gap-2 justify-between">
              <div className=" min-w-[70px] max-h-[84px] flex relative">
                <Skeleton variant="circular" width={70} height={70} />
                {/* <img
                  className="object-cover w-[70px] h-[70px] rounded-full"
                  src={image ? image : '/public/no_profile.jpg'}
                  alt="user"
                /> */}
                {/* <span className="absolute w-3 h-3 bg-[#00BC0C] rounded-full left-[55px]  bottom-5"></span> */}
              </div>
              <div className=" w-[170px] xl:max-w-[190px] flex flex-col  gap-1 relative">
                <span className={`   text-base relative xl:text-lg font-bold capitalize font-roboto text-[#202020]`}>
                  {/* {userName} */}
                  <Skeleton variant="text" width={100} />
                </span>
                <span className=" w-full flex items-center">
                  {/* <img src="/chat/house.svg" alt="property-home" /> */}

                  <span
                    className={` ml-2 break-words max-w-full font-roboto  text-[#505050] font-normal text-sm  xl:text-base`}>
                    {/* {propertyName} */}
                    <Skeleton variant="text" width={100} />
                  </span>
                </span>

                <p className={`   truncate max-w-full font-roboto  text-[#A1A1A1] font-[300] text-base`}>
                  {/* {lastMessage} */}
                  <Skeleton variant="text" width={100} />
                </p>
              </div>

              <div className=" min-w-[78px] h-auto flex flex-col gap-[10px] items-end">
                {/* <img
                  className="w-[78px] h-[54px] rounded-[10px] overflow-hidden "
                  src={previewImage ? previewImage : NoImageProperty.src}
                  alt="preview"
                /> */}
                <Skeleton variant="rectangular" width={78} height={54} />
                <span className={` block  text-xs font-roboto font-normal text-[#A1A1A1]`}>
                  {/* {lastMsgTime} */}
                  <Skeleton variant="text" width={100} />
                </span>
              </div>
            </div>
          </div>
          {/* <span className="block ml-2 text-sm text-gray-600">bye</span> */}
        </div>
      </div>
    </>
  )
}

export default ChatLoader
