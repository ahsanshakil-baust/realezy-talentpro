import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Box, Modal, TextField } from '@mui/material'
import { postRequest } from '@/util/axios'
import { useRouter } from 'next/router'
// import Link from 'next/link'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import logoXl from '@/public/Logo@2x.png'

import {
  hideLoader,
  showLoader,
  // showLoader,
  // showModal,
  useCheckEmailMutation,
  useSendMobileOtpMutation,
  useSendOtpMutation,
  useUpdateUserProfileMutation,
} from '@/store'
import { authLogo, logo, randomNUmberGenerator } from '@/util/helper'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
// import { fabClasses } from '@mui/material'
// import axios from 'axios'
const VerifyUser = ({ setLog, regisdata = {}, setRegisData, loginType }: any) => {
  console.log("🚀 ~ file: verifyUser.tsx:28 ~ VerifyUser ~ loginType:", loginType)
  const { data: session, update }: any = useSession()

  const dispatch = useDispatch()
  // const [sendOtp] = useSendOtpMutation() // , { isError, isLoading, data }
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const { register } = useForm() // , handleSubmit, setValue, control
  // const [charCount, setCharCount] = useState(0)
  const [otpSuccess, setOtpSuccess] = useState('')
  const [otpErrorSuccess, setOtpErrorSuccess] = useState('')

  const [verifyOtpUser, setVerifyOtpUser] = React.useState(true)
  const [mobileSignUpModal, setMobileSignUpModal] = useState(false)
  // const handleOpen = () => setVerifyOtpUser(true)
  // const handleClose = () => setVerifyOtpUser(false)

  const handleClose = () => {
    setVerifyOtpUser(false)
    setMobileSignUpModal(false)
  }

  const [checkEmail] = useCheckEmailMutation() // , { isError: emailError, isLoading: emailLoading, data: emailCheckData }

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




  const newUserData = {
    name: regisdata.name,
    email: regisdata.email,
    password: regisdata.password,
    mobile: regisdata.mobile,
    country_code: regisdata.countryCode,
    device_token: 'weqwewqewqeqwewqe',
    login_type: 'email',
    user_type: '',
  }

  const [localOtp, setLocalOtp] = useState(regisdata.code)

  const otpVerificationHandler = async (e: any) => {
    e.preventDefault()
    console.log("🚀 ~ file: verifyUser.tsx:93 ~ otpVerificationHandler ~ localOtp:", localOtp)
    console.log("🚀 ~ file: verifyUser.tsx:93 ~ otpVerificationHandler ~ actValue:", actValue)
    if (parseInt(actValue) === parseInt(localOtp)) {

      setVerifyOtpUser(false)

      if (loginType === 'mobile') {
        const responsCheckNumber: any = await checkEmail({
          mobile: regisdata.mobile,
        })
        if (responsCheckNumber?.data?.status == 200) {
          setMobileSignUpModal(true)
        } else {
          await signIn('mobileLogin', {
            number: regisdata?.mobile,
            country_code: regisdata.countryCode,
            redirect: false,
          }).then((res: any) => {
            if (res?.status == 200) {
              toast.success('Login Successfully')
              // router.push('/dashboard/personal-info')
              router.push('/')
            } else {
              toast.error('Incorrect OTP')
            }
          })
        }
      } else {
        const response = await postRequest('index.php/auth/signup', JSON.stringify(newUserData))
        if (response?.status === 201) {
          toast.success(response?.message)

          await signIn('emailLogin', {
            email: newUserData?.email,
            password: newUserData?.password,
            redirect: false,
          })
            .then((res: any) => {
              if (res?.status == 200) {
                // router.push('/dashboard/personal-info')
                router.push('/')
              } else {
                toast.error('Incorrect email and password')
              }
            })
            .then((error: any) => {
              console.log('🚀 ~ file: login.js ~ line 16 ~ handleLogin ~ error', error)
            })

          setLoading(false)
        } else if (response?.response?.data?.status === 1006) {
          const errors = Object.values(response?.response?.data?.error)
          errors.map((error: any) => toast.error(error))
          setLoading(false)
        }
      }
    } else {
      toast.error('Invalid otp provided. Try again.')
      return false
      //setLoading(false)
    }
  }

  const [updateUserInfo] = useUpdateUserProfileMutation() // , { isError: userIsError, isLoading: userIsLoading, data: userUpdatedDate }

  const [fulNameForMobile, setFulNameForMobile] = useState('')
  const [emailForMobile, setEmailForMobile] = useState('')
  const [emailMobileStatus, setEmailMobileStatus] = useState(false)

  const signUpVerificationHandler = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const responsCheckEmail: any = await checkEmail({
      email: emailForMobile,
    })

    if (responsCheckEmail?.data?.status == 201) {
      setEmailMobileStatus(true)
    } else {
      setEmailMobileStatus(false)
    }

    if (responsCheckEmail?.data?.status == 201) {
      toast.error('Email already exist')
      return false
    }

    if (loginType === 'mobile') {
      await signIn('mobileLogin', {
        number: regisdata?.mobile,
        country_code: regisdata.countryCode,
        redirect: false,
      })
        .then((res: any) => {
          if (res?.status == 200) {
            toast.success('Login Successfully')

            checkEmail({
              mobile: regisdata.mobile,
            }).then((res: any) => {
              if (res?.data?.status === 201) {
                updateUserInfo({
                  userId: res?.data?.data?.id,
                  data: {
                    name: fulNameForMobile,
                    email: emailForMobile,
                    profile_pic: 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/dev/64c4db8636dee.png',
                  },

                }).then(async (res: any) => {
                  if (res?.data?.status === 200) {
                    // router.push('/dashboard/personal-info')
                    //SESSION UPDATE
                    await update()
                    await router.push('/')
                  }
                })
              } else {
                toast.error(res?.data?.message)
              }
            })
          } else {
            toast.error('Incorrect mobile')
            setLoading(false)
            dispatch(hideLoader())
          }
        })
        .then((error: any) => {
          console.log('🚀 ~ file: login.js ~ line 16 ~ handleLogin ~ error', error)
        })
    }

  }


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  const [emailCheck, setEmailCheck] = useState({ msg: '', sts: 0 })
  const handleOnBlurExistingEmail = async (event: any) => {
    const data = event.target.value
    if (data.toLowerCase().includes('@')) {
      const responsCheckEmail: any = await checkEmail({
        email: data,
      })
      const { message, status } = responsCheckEmail?.data || {}
      setEmailCheck({ msg: message, sts: status })
    }
  }

  //OTP RESENT

  const [sendOtp] = useSendOtpMutation()
  const [sendMobileOtp] = useSendMobileOtpMutation()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(90);

  useEffect(() => {
    if (isButtonDisabled && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); // 1 second
      return () => clearTimeout(timer);
    } else if (isButtonDisabled && countdown === 0) {
      setIsButtonDisabled(false);
    }
  }, [isButtonDisabled, countdown]);

  const resendOtp = async (loginType: any) => {
    setLoading(true)
    setIsButtonDisabled(true);
    setCountdown(90);

    if (loginType === 'mobile') {
      dispatch(showLoader('Resending otp to your phone ' + regisdata.countryCode + regisdata.mobile))

      const response: any = await sendMobileOtp({
        recipient_number: '+' + regisdata.countryCode + regisdata.mobile,
      })

      setLocalOtp(response?.data?.data?.otp)
    } else {
      const otp = randomNUmberGenerator()
      dispatch(showLoader('Resending otp to your email ' + regisdata.email))

      await sendOtp({
        emailto: regisdata.email,
        text: `Your otp is ${otp}`,
        subject: 'Welcome to RealEzy',
      })
      setLocalOtp(otp)

    }


    setLoading(false)
    dispatch(hideLoader())
  }

  const formatTime = (seconds:any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Modal
        open={verifyOtpUser}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={otpVerificationHandler} className="!signup-form" method="post">

            <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px]  2xl:px-[75px] pb-1 md:pb-[7.5px] 2xl:pb-[14px] ">
              <Image
                width={239}
                height={82}
                src={logoXl}
                // className="w-[288.09px] mb-3"
                // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
                alt=""
              />
              <h2 className=" text-2xl font-semibold mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto  text-[#00ADEE] ">
                {loginType == 'mobile' ? 'Phone Number Verification' : 'Account Verification'}
              </h2>
              <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
                For your security, we want to make sure it's really you
              </p>
              <div className="flex justify-between w-full mb-4">
                <span className="font-semibold text-[14px]">Enter code</span>
                <button type='button' disabled={isButtonDisabled}  onClick={() => resendOtp(loginType)} className={`${isButtonDisabled ? 'cursor-not-allowed  text-gray-400 ' :'bg-transparent cursor-pointer'} text-[#00ADEE] text-[12px] font-semibold`}> {isButtonDisabled
                  ? ` (${formatTime(countdown)}) `
                  : ''} Resend</button>
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
                <span className="text-green-500">{otpSuccess}</span>
                <span className="text-red-500">{otpErrorSuccess}</span>
              </div>
              <div className="w-full text-center">
                {/* <p className="text-[#A1A1A1] text-base mb-6">We send 6-digits verification code to +8801601484955</p> */}
                <p className="text-[#A1A1A1] text-base mb-6 w-full">
                  {loginType == 'mobile'
                    ? 'We send 6-digits verification code to ' + regisdata?.countryCode + regisdata?.mobile
                    : 'We send 6-digits verification code to ' + regisdata?.email}
                </p>
              </div>
             {/*  <p>
                {isButtonDisabled
                  ? `You can resend in ${countdown} seconds.`
                  : ''}
              </p> */}
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="cursor-pointer bg-[#00ADEE] px-8 py-3 rounded-[10px] border border-[#00ADEE] text-white">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>

      {/* FOR MOBILE LOGIN */}
      <Modal open={mobileSignUpModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="  flex w-[100%] justify-end items-end px-2 pt-3 -mb-4 md:px-3 md:pt-4 md:-mb-6 xl:pt-5 xl:px-4 xl:-mb-7 2xl:pt-6 2xl:-mb-8  ">
            <span
              className="z-20 cursor-pointer bg-[#ccdef6] 2xl:p-4 md:p-2 p-1 rounded-full 2xl:mr-6 md:mr-4 mr-2 2xl:mt-5 md:mt-3 mt-2 inline-block"
              onClick={handleClose}>
              {/* <AiOutlineClose className=" !w-[25px] !h-[25px] sm:!w-[30px] sm:!h-[30px] text-[#034EA1] bg-[#ccdef6] rounded-full" /> */}
              <img src="./close.svg" alt="" className=" " />
            </span>
          </div>
          <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px] lg:px-[55px] xl:px-[65px]  pb-1 md:pb-[7.5px] lg:pb-[9.5px] xl:pb-[10.5px]">
            <img
              src={authLogo}
              className="w-[239px] mb-3"
              // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
              alt=""
            />
            <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl xl:text-2xl text-[#00ADEE] ">
              Welcome To Realezy
            </h2>
            <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-5 text-center  sm:text-left font-roboto font-normal text-[14px] lg:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
              Login to your account - find your perfect house.
            </p>
          </div>
          <form onSubmit={signUpVerificationHandler} className="!signup-form" method="post">
            <div className="w-full">
              <div className="w-full">
                <TextField
                  fullWidth
                  label="Full Name"
                  id="fullWidth"
                  required
                  {...register('name', { required: true })}
                  onChange={e => setFulNameForMobile(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F1F7FF',
                      '& > fieldset': {
                        // border: '2px solid #E4F0FE',
                        border: '2px solid #E4F0FE',
                        borderRadius: '10px',
                      },
                      '&.Mui-focused': {
                        '& > fieldset': {
                          borderColor: '#00ADEE',
                        },
                      },
                    },

                    '& .MuiOutlinedInput-root:hover': {
                      '& > fieldset': {
                        border: '2px solid #00ADEE',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      '&.Mui-focused': {
                        color: '#00ADEE',
                      },
                    },
                  }}
                />

                <TextField
                  type="email"
                  fullWidth
                  label="Enter Your Email"
                  required
                  id="fullWidth"
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  onChange={e => setEmailForMobile(e.target.value)}
                  onBlur={handleOnBlurExistingEmail}
                  sx={{
                    my: '10px',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F1F7FF',
                      '& > fieldset': {
                        // border: '2px solid #E4F0FE',
                        border: '2px solid #E4F0FE',
                        borderRadius: '10px',
                      },
                      '&.Mui-focused': {
                        '& > fieldset': {
                          borderColor: '#00ADEE',
                        },
                      },
                    },

                    '& .MuiOutlinedInput-root:hover': {
                      '& > fieldset': {
                        border: '2px solid #00ADEE',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      '&.Mui-focused': {
                        color: '#00ADEE',
                      },
                    },
                  }}
                />
                {emailMobileStatus && <span className="text-red-400">Email already exist</span>}
              </div>
              <div>
                <button
                  className="bg-[#034EA1] px-10 py-3 text-base rounded-md tracking-wider text-white cursor-pointer"
                  type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default VerifyUser
