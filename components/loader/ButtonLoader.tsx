import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const ButtonLoader = ({ title }: any) => {
  return (
    <div className="flex z-[150000] items-center justify-center fixed w-full h-screen top-0">
      <div className=" w-[25%] bg-white rounded-[20px] flex flex-col items-center justify-center gap-2.5 shadow-lg py-8">
        <span className=" font-roboto font-medium text-lg">{title}</span>
        <Image
          src="/logo.png"
          alt="Logo"
          width="140px"
          height="40px"
          className=" !w-[140px] sm:!w-[160px] !h-[40px] "
        />
        <CircularProgress />
        <span className=" font-roboto font-bold text-lg">Please wait!</span>
      </div>
    </div>
  )
}

export default ButtonLoader
