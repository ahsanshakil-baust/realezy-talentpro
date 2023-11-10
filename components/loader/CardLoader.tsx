import { Skeleton } from '@mui/material'
import React from 'react'

const CardLoader = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col w-full h-full p-0 ml-0">
      <Skeleton variant="rectangular" width="100%" height="264px" className="!flex !rounded-[10px]" />
      <div className="pt-5 pb-7 px-7">
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
      {/* 
      <div className="pt-5 pb-7 px-7 flex flex-col h-full justify-between">
        <div className="mb-5 flex justify-between w-full items-center gap-2">
          <Skeleton width="70%" />

          <Skeleton width="30%" />
        </div>
        <div className="mb-5 flex justify-between w-full items-center gap-2">
          <Skeleton width="70%" />

          <Skeleton width="30%" />
        </div>
      </div> */}
      {/* <div className="flex justify-between mb-2">
          <p className="text-secondary flex gap-2">
            <span className="text-battleshipGray">
              {' '}
              <Skeleton width="50%" />
            </span>
            <span>
              <Skeleton width="50%" />
            </span>
          </p>
          <h2 className="w-1/3 text-md truncate font-bold text-xl text-secondary text-right">
            {' '}
            <Skeleton />
          </h2>
        </div> */}

      {/* <h2 className="w-full truncate font-medium font-roboto tracking-wide text-xl text-textValueColor mb-4">
          <Skeleton width="50%" />
        </h2> */}

      {/* <div className="grid lg:grid-cols-2 gap-5">
          <Skeleton width="50%" />

          <Skeleton width="50%" />
        </div> */}
    </div>
  )
}

export default CardLoader
