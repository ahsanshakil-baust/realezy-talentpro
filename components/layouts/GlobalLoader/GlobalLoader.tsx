import { StoreState } from '@/types'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import logo from '@/public/logo.png'

const GlobalLoader = () => {
  const { title, show } = useSelector((state: StoreState) => state.entities.loader)

  if (!show) return null

  return (
    <div className="flex z-[150000000] items-center justify-center fixed w-full h-screen top-0">
      <div className=" w-[25%] bg-white rounded-[20px] flex flex-col items-center justify-center gap-2.5 shadow-lg py-8">
        <span className=" font-roboto font-medium text-lg">{title}</span>
        <Image src={logo} alt="Logo" width="140px" height="40px" className=" !w-[140px] sm:!w-[160px] !h-[40px] " />
        <CircularProgress />
        <span className=" font-roboto font-bold text-lg">Please wait!</span>
      </div>
    </div>
  )
}

export default GlobalLoader
