import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const FilterCardLoader = () => {
  const { pathname } = useRouter()

  return (
    <div
      className={`rounded-[10px]  ${
        pathname === '/filter' ? 'h-auto mb-0' : 'h-[470px] mb-5'
      } md:px-4 md:py-3 shadow-md flex flex-col md:flex-row  md:border-2 border-solid border-[#FFFFFF]  bg-white`}>
      <Skeleton variant="rectangular" height="264px" className="flex w-full md:w-[40%] rounded-[10px]" />
      <div className=" md:py-[10px] p-4 md:pl-7 flex flex-col flex-grow justify-between w-full md:w-[60%]">
        <div className="mb-5 flex justify-between w-full items-center gap-2">
          <Skeleton width="70%" />
          <Skeleton width="30%" />
        </div>
        <div className="mb-5 flex justify-between w-full items-center gap-2">
          <Skeleton width="30%" />
          <Skeleton width="70%" />
        </div>
        <div className="mb-5 flex justify-between w-full items-center gap-2">
          <Skeleton width="70%" />
          <Skeleton width="30%" />
        </div>
        <div className="flex gap-4 h-[54px]">
          <Skeleton width="50%" height="100%" className="!scale-0" />
          <Skeleton width="50%" height="100%" className="!scale-0" />
        </div>
      </div>
    </div>
  )
}

export default FilterCardLoader
