import {  TextField, Typography } from '@mui/material' // Button,
import Image from 'next/image'
import React from 'react'
import uploadProfile from '@/public/upload_profile.svg'
import { RxCrossCircled } from 'react-icons/rx'

const UploadProfilePhoto = () => {
  return (
    <div className="w-[958px] rounded-lg py-10 px-12 bg-[#F8FBFF]">
      <div className="flex items-center justify-between mb-5">
        <Typography variant="h6">Upload Profile Photo</Typography>
        <span className="!text-red-500 !text-3xl">
          <RxCrossCircled />
        </span>
      </div>
      <div className="border-2 border-dashed border-[#B1D6FF] bg-[#F1F7FF] rounded-md py-10 flex justify-center text-center">
        <div>
          <Image alt='no-image' src={uploadProfile} width={'100%'} height={'100%'} />
          <Typography variant="h6">Drag & Drop Files</Typography>
          <Typography style={{ color: '#A1A1A1', fontSize: '15px', fontWeight: 'normal' }} variant="h6">
            Supported formats : JPEG, PNG, JPG Up to 2MB
          </Typography>
        </div>
      </div>
      <div className="text-center">
        <p className="my-5 font-bold">Or</p>
        <label className="bg-secondary rounded-md px-6 py-4 text-white" htmlFor="modalUpload">
          Select From Computer
        </label>
        <TextField style={{ display: 'none' }} type="file" id="modalUpload" />
      </div>
    </div>
  )
}

export default UploadProfilePhoto
