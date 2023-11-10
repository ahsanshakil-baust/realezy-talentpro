import { Skeleton } from '@mui/material'
import React from 'react'

const DetailPageLoader = () => {
  return (
    // <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col w-full h-full p-0 ml-0">
    //   <Skeleton variant="rectangular" width="100%" height="264px" className="flex" />
    //   <div className="pt-5 pb-7 px-7">
    //     <div className="mb-5 flex justify-between w-full items-center gap-2">
    //       <Skeleton width="70%" />
    //       <Skeleton width="30%" />
    //     </div>
    //     <div className="mb-5 flex justify-between w-full items-center gap-2">
    //       <Skeleton width="30%" />
    //       <Skeleton width="70%" />
    //     </div>
    //     <div className="mb-5 flex justify-between w-full items-center gap-2">
    //       <Skeleton width="70%" />
    //       <Skeleton width="30%" />
    //     </div>
    //     <div className="flex gap-2 h-[54px]">
    //       <Skeleton width="50%" height="100%" className="scale-0" />
    //       <Skeleton width="50%" height="100%" className="scale-0" />
    //     </div>
    //   </div>
    // </div>
    <>
      <section className=" bg-[#F1F7FF] mt-[85px] ">
        <Skeleton variant="rectangular" width="100%" height="505px" className="!flex" />
      </section>

      <section className=" 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5 pb-3 bg-[#F7FAFF] ">
        <div className="w-[90%] md:w-full m-auto ">
          <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />
          <Skeleton variant="rectangular" width="100%" height="264px" className="!flex" />
          <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />

          <Skeleton variant="rectangular" width="100%" height="264px" className="!flex" />
          <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />

          <Skeleton variant="rectangular" width="100%" height="264px" className="!flex" />
          <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />

          <Skeleton variant="rectangular" width="100%" height="264px" className="!flex" />
          <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />

          <Skeleton variant="rectangular" width="100%" height="264px" className="!flex" />

          <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />

          {/* <DetailPageCard /> */}
          <Skeleton variant="rectangular" width="100%" height="264px" className="!flex" />
        </div>
      </section>
    </>
  )
}

export default DetailPageLoader
