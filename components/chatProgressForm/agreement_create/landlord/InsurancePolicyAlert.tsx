import React, { useState } from 'react'
import { AiFillBulb } from 'react-icons/ai'
import Checkbox from '@mui/material/Checkbox'
// import { set } from 'react-hook-form'
import { Button } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const InsurancePolicyAlert = () => {
  const [checked, setChecked] = useState(false)

  const handleCheckBox = () => {
    setChecked(!checked)
  }

  return (
    <>
      <div className=" flex flex-col px-[3.25rem] py-4 bg-inherit rounded-b-[20px]">
        <div className=" flex flex-row items-center ">
          <AiFillBulb className=" !text-[#00ADEE]" />
          <p className=" text-[#00ADEE] font-bold text-lg ml-4">Insurance Information</p>
        </div>
        <div className=" flex flex-row items-center ">
          <Checkbox {...label} onClick={handleCheckBox} />
          <p className=" text-[#010101] font-bold text-lg ml-4">I accept insurance policy</p>
        </div>
        <div className=" w-full flex justify-end">
          {checked ? (
            <Button variant="contained" className=" !bg-[#00ADEE] !text-white !mt-5">
              Next
            </Button>
          ) : (
            <Button variant="contained" className=" !bg-[#00ADEE] !text-white !mt-5" disabled>
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default InsurancePolicyAlert
