import React from 'react'

const DefaultReceiver = () => {
  return (
    <div>
      <div className="relative flex flex-col gap-1 max-w-max px-4 py-3 rounded-[10px] bg-[#FFFFFF] text-gray-700 shadow">
        <span className="text-[#00ADEE] font-semibold font-roboto">Jon Don</span>
        <span className=" w-full gap-3 flex justify-between items-end">
          <span className=" flex flex-col gap-1">
            <p className="text-base font-roboto break-normal">Lorem, ipsum dolor click <span className=' font-bold text-red-500'>Red Book</span> sit amet consectetur adipisicing elit. Officiis nulla nihil deleniti nesciunt nam iusto deserunt quia, tenetur dicta veniam, molestias itaque tempore ratione aliquam dolorum suscipit. Eos, eaque harum.</p>

          </span>
          <p className=" -mb-1 text-xs whitespace-nowrap"> 11:14 AM</p>
        </span>
      </div>
    </div>
  )
}

export default DefaultReceiver
