import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl } from '@mui/material' // , FormControlLabel, Radio, RadioGroup, TextField

const ProfileCompleteAlertT = () => {
  // const [selectedValue, setSelectedValue] = React.useState('')

  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const profileAlert = (data: any) => {
    // console.log('data clickedddddd!!!!!!!!!!!!!!!!!!!!!!', data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(profileAlert)} className="w-[40%] shadow-md ">
        <FormControl component="fieldset">
          <div className=" !flex !flex-col !p-8 !w-full ">
            <h1 className=" font-bold font-roboto text-xl mb-6">Profile Completion Alert!</h1>
            <p className=" font-normal font-roboto text-base mb-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci sunt dolor dolorem provident fuga sed
              quo unde eveniet explicabo, cumque, ipsum beatae hic minima voluptatem ducimus iste ratione error
              alias?Lorem ipsum dolor sit amet consectetur adipisicing elit. Est expedita enim perspiciatis tenetur
              illo! Error quis ipsam impedit nihil fuga enim, distinctio eligendi libero excepturi veniam natus tenetur
              dolorum pariatur.
            </p>
            <div className=" flex">
              <p className="w-[10rem] font-normal font-roboto text-base mb-4 text-red-500">Salary (All ...</p>
              <p>:</p>
            </div>
            <div className=" flex">
              <p className="w-[10rem] font-normal font-roboto text-base mb-4 text-red-500">Outstanding Loans </p>
              <p>:</p>
            </div>
            <div className=" flex">
              <p className="w-[10rem] font-normal font-roboto text-base mb-4 text-red-500">Gender</p>
              <p>:</p>
            </div>
            <div className=" flex">
              <p className="w-[10rem] font-normal font-roboto text-base mb-4 text-red-500">Local/Foreigner</p>
              <p>:</p>
            </div>
            <div className=" flex">
              <p className="w-[10rem] font-normal font-roboto text-base mb-4 text-red-500">Marital Status</p>
              <p>:</p>
            </div>
            <div className=" flex">
              <p className="w-[10rem] font-normal font-roboto text-base mb-4 text-red-500">Education Level</p>
              <p>:</p>
            </div>
            <div className=" flex">
              <p className="w-[10rem] font-normal font-roboto text-base  text-red-500">Age Ratio</p>
              <p>:</p>
            </div>
          </div>
          <div className=" !px-4 !flex !w-full !justify-end !gap-2">
            <Button
              variant="contained"
              className="!bg-[#00ADEE] !text-white !font-normal !font-roboto !rounded-lg !mt-8 !mb-8 !capitalize">
              Later
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="!bg-[#00ADEE] !text-white !font-normal !font-roboto !rounded-lg !mt-8 !mb-8 !capitalize">
              Complete Profile
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  )
}

export default ProfileCompleteAlertT
