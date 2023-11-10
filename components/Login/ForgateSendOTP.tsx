// import { Button } from '@mui/material'
// import { TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
// import { useForm } from 'react-hook-form'
import SubmitForgotPassword from './SubmitForgotPassword'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'
import { hideLoader, hideModal, showLoader, showModal } from '@/store'
import { toast } from 'react-toastify'
import { logo } from '@/util/helper'
import Image from 'next/image'
import logoXl from '@/public/Logo@2x.png'

const ForgateSendOTP = ({ storeOtp, emailInfo }: any) => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  // const [isFocused, setIsFocused] = useState(false)

  // const [charCount, setCharCount] = useState(0)
  // const [otpData, setOtpData] = useState(0)

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   control,
  //   formState: { errors },
  // } = useForm()

  const [actValue, setActValue] = useState(' '.repeat(6))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const onChangeHandler = (e: any, index: number) => {
    if (e.target.value.length == 1) {
      setActValue((prev: any) => {
        return prev.substring(0, index) + e.target.value[0] + prev.substring(index + 1)
      })
      setActiveOtpIndex(index + 1)
    }
  }
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === 'Backspace') {
      setActiveOtpIndex(index - 1)
      setActValue((prev: any) => {
        return prev.substring(0, index) + ' ' + prev.substring(index + 1)
      })
    }
  }
  useEffect(() => {
    inputRef?.current?.focus()
  }, [activeOtpIndex])

  const handlerSendOtp = async (e: any) => {
    e.preventDefault()
    dispatch(showLoader('Sending Otp'))
    if (parseInt(actValue) === parseInt(storeOtp)) {
      dispatch(
        showModal({
          name: 'Submit Forgot Password',
          open: true,
          children: <SubmitForgotPassword emailInfo={emailInfo} />,
        })
      )
      dispatch(hideModal('Send OTP'))
    } else {
      toast.error('Otp Not Matched')
    }
    dispatch(hideLoader())
  }

  return (
    <form onSubmit={handlerSendOtp} className=" w-full h-auto  flex flex-col  rounded-[20px] bg-[#F8FBFF]  ">
      <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px]  2xl:px-[75px] pb-1 md:pb-[7.5px] 2xl:pb-[14px] ">
        <Image
          width={239}
          height={82}
          src={logoXl}
          // className="w-[288.09px] mb-3"
          // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
          alt=""
        />
        <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl 2xl:text-2xl text-[#00ADEE] ">
          {/* {regisdata?.loginType == 'mobile' ? 'Login With Mobile' : 'Login With Email'} */}
          Enter Verification Code
        </h2>
        <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
          It's really easy with RealEzy
        </p>
        <div className="flex justify-between w-full mb-4">
          <span className="font-semibold text-[14px]">Enter code</span>
          <button className="bg-transparent text-[#00ADEE] text-[12px] cursor-pointer">Resend</button>
        </div>
        <div className="flex justify-center items-center space-x-2 gap-6 mb-6">
          {actValue.split('').map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOtpIndex ? inputRef : null}
                  type="number"
                  className="w-12 h-12 border-2 rounded-[5px] bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-[#00ADEE] focus:border-[#00ADEE] focus:text-[#00ADEE] text-[#00ADEE] transition"
                  onChange={(e: any) => onChangeHandler(e, index)}
                  value={actValue[index]}
                  onKeyDown={(e: any) => {
                    handleKeyDown(e, index)
                  }}
                />
              </React.Fragment>
            )
          })}
        </div>
        <div>
          {/* <span className="text-green-500">{otpSuccess}</span>
                <span className="text-red-500">{otpErrorSuccess}</span> */}
        </div>
        <div className="w-full text-center">
          <p className="text-[#A1A1A1] text-base mb-6">We send 6-digits verification code to {emailInfo?.email}</p>
          {/* <p className="text-[#A1A1A1] text-base mb-6">
                  {regisdata?.loginType == 'mobile'
                    ? 'We send 6-digits verification code to ' + regisdata?.countryCode + regisdata?.mobile
                    : 'We send 6-digits verification code to ' + regisdata?.email}
                </p> */}
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="cursor-pointer bg-[#00ADEE] px-8 py-3 rounded-[10px] border border-[#00ADEE] text-white">
            Submit
          </button>
        </div>
      </div>

      {/* <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px] lg:px-[55px] xl:px-[65px] 2xl:px-[75px] pb-1 md:pb-[7.5px] lg:pb-[9.5px] xl:pb-[10.5px] 2xl:pb-[14px] ">
        <img
          src={logo}
          className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
        />
        <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl xl:text-2xl text-[#00ADEE] ">
          Enter Verification Code
        </h2>
        <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] lg:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
          It's really easy with RealEzy
        </p>
        <div className="!form-group">
          <TextField
            className={
              isFocused
                ? '!bg-[#F1F7FF] custom-sign-inputs !w-[100%] !shadow-[0px_4px_10px_#034EA11F] !mb-[9px] md:!mb-[13px] lg:!mb-[16px] xl:!mb-[18px] 2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 !rounded-[10px] '
                : '!bg-[#F1F7FF] custom-sign-inputs !w-[100%] !mb-[9px] md:!mb-[13px] lg:!mb-[16px] xl:!mb-[18px] 2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 !rounded-[10px] '
            }
            type="text"
            id="outlined-basic"
            label="Enter your OTP"
            variant="outlined"
            {...register('code', {
              onChange: e => setCharCount(e.target.value.length),
            })}
            InputProps={{
              style: {
                borderRadius: '10px',
                border: '2px solid #E4F0FE',
              },
            }}
          />
        </div>
        <div className=" mb-3 md:mb-4 xl:mb-6  2xl:mb-7 w-full flex flex-col md:flex-row items-center md:items-start justify-center">
          <div className=" mb-2 md:mb-0">
            <Button
              style={{
                marginTop: '2px',
              }}
              variant="contained"
              type="submit"
              disabled={charCount !== 4}>
              Submit OTP
            </Button>
          </div>
        </div>
      </div> */}
    </form>
  )
}

export default ForgateSendOTP

/*




<form onSubmit={handleSubmit(handlerSendOtp)} className="!signup-form" method="post">
      <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px]  2xl:px-[75px] pb-1 md:pb-[7.5px] 2xl:pb-[14px] ">
        <img
          src={logo}
          className=" w-[70px] md:w-[130px]  2xl:w-[180px] h-[30px] md:h-10 2xl:h-[50px]"
        />
        <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl 2xl:text-2xl text-[#00ADEE] ">
          Welcome To Realezy
        </h2>
        <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
          It's really easy with RealEzy
        </p>
        <div className="flex justify-between w-full mb-4">
          <span className="font-semibold text-[14px]">Enter code</span>
          <button className="bg-transparent text-[#00ADEE] text-[12px] cursor-pointer">Resend</button>
        </div>
        <div className="flex justify-center items-center space-x-2 gap-6 mb-6">
          {actValue.split('').map((_, index: any) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOtpIndex ? inputRef : null}
                  type="number"
                  className="w-12 h-12 border-2 rounded-[5px] bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-[#00ADEE] focus:border-[#00ADEE] focus:text-[#00ADEE] text-[#00ADEE] transition"
                  onChange={(e: any) => onChangeHandler(e, index)}
                  value={actValue[index]}
                  onKeyDown={(e: any) => {
                    handleKeyDown(e, index)
                  }}
                />
              </React.Fragment>
            )
          })}
        </div>
        <div>
          <span className="text-green-500">{otpSuccess}</span>
          <span className="text-red-500">{otpErrorSuccess}</span>
        </div>
        <div className="w-full">
          <p className="text-[#A1A1A1] text-base mb-6">We send 6-digits verification code to +8801601484955</p>
          <p className="text-[#A1A1A1] text-base mb-6">We send 6-digits verification code to {emailInfo}</p>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="cursor-pointer bg-[#00ADEE] px-8 py-3 rounded-[10px] border border-[#00ADEE] text-white">
            Submit
          </button>
        </div>
      </div>
    </form>




*/
