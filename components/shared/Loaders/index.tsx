import { logo } from '@/public'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const InsideLoader = () => {
  return (
    <div className="flex flex-col items-center">
      <div className='my-2'>
      <Image
        src={logo}
        alt="Logo"
        width="140px"
        height="40px"
        className=" !w-[140px] sm:!w-[160px] !h-[40px] "
      />
      </div>
      <CircularProgress />
      <span className=" font-roboto font-bold text-lg">Please wait!</span>
  </div>
  )
}

export default InsideLoader