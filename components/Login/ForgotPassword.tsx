import { hideLoader, hideModal, showLoader, showModal, useCheckEmailMutation, useSendOtpMutation } from '@/store'
import { authLogo, logo, randomNUmberGenerator } from '@/util/helper'
import { Button, TextField } from '@mui/material' // Box Modal
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import VerifyUser from '../SignUp/verifyUser'
// import SubmitForgotPassword from './SubmitForgotPassword'
import { StoreThunkDispatch } from '@/types'
import ForgateSendOTP from './ForgateSendOTP'
import Image from 'next/image'
import logoXl from '@/public/Logo@2x.png'
import { muiSxStyle } from '@/util/muistylesheet'


const ForgotPassword = ({ forgotPassword, setForgotPassword, loading, setLoading, setAuthPopUp }: any) => {
  const [isFocused, setIsFocused] = useState('')
  // console.log(`🚀 ~ file: ForgotPassword.tsx:16 ~ ForgotPassword ~ isFocused:`, isFocused.length)
  const [emailCheck, setEmailCheck] = useState({ msg: '', sts: 0 })
  const [emailInfo, setEmailInfo] = useState({})

  const [selectedOption, setSelectedOption] = useState('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const dispatch = useDispatch<StoreThunkDispatch>()

  const {
    register,
    handleSubmit,
    // setValue,
    // control,
    formState: { errors },
    watch,
  } = useForm()

  // let email = watch('email')

  // EMAIL API
  const [checkEmail] = useCheckEmailMutation() // , { isError: emailError, isLoading: emailLoading, data: emailCheckData }
  const [sendOtp] = useSendOtpMutation() // , { isError, isLoading, data }

  const handleForGatePassword = async (data: any) => {
    dispatch(hideModal('Forgot Password'))
    dispatch(showLoader('Sending Otp'))

    const otp = randomNUmberGenerator()

    const respons: any = await sendOtp({
      emailto: data.email,
      text: `Your otp is ${otp}`,
      subject: 'Welcome to RealEzy',
    })
    if (respons?.data?.status === 200) {
      toast.success(respons?.data?.message)
      dispatch(hideLoader())
    }

    dispatch(
      showModal({
        name: 'Send OTP',
        open: true,
        children: <ForgateSendOTP storeOtp={otp} emailInfo={emailInfo} />,
      })
    )
  }

  const handlerResponsCheckEmail = async (event: any) => {
    const data = event.target.value
    setIsFocused(data)

    if (data.toLowerCase().includes('@')) {
      const responsCheckEmail: any = await checkEmail({
        email: data,
      })

      const { message, status, data: emailCheckInfo } = responsCheckEmail?.data || {}
      setEmailCheck({ msg: message, sts: status })
      setEmailInfo(emailCheckInfo)
    }
  }

  const handlerResponsCheckPhone = async (event: any) => {
    const data = event.target.value
    setIsFocused(data)
    if (data) {
      console.log("phone: ", data)
      // const responsCheckEmail: any = await checkEmail({
      //   email: data,
      // })

      // const { message, status, data: emailCheckInfo } = responsCheckEmail?.data || {}
      // setEmailCheck({ msg: message, sts: status })
      // setEmailInfo(emailCheckInfo)
    }
  }

  // return <h2>Forgot password</h2>

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleForGatePassword)}
        className=" w-full h-auto  flex flex-col  rounded-[20px] bg-[#F8FBFF]  ">
        <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px] lg:px-[55px] xl:px-[65px] 2xl:px-[75px] pb-1 md:pb-[7.5px] lg:pb-[9.5px] xl:pb-[10.5px] 2xl:pb-[14px] ">
          <Image
            width={239}
            height={82}
            src={logoXl}
            // className="w-[288.09px] mb-3"
            // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
            alt=""
          />
          <h1 className='mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl xl:text-2xl text-[#272727]'>Forgot Password</h1>
          <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-5 text-center  sm:text-left font-roboto font-normal text-[14px] lg:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
            Enter your Email ID or Phone Number
          </p>
          <div className='pb-4'>
            <label>
              <input
                type="radio"
                value="email"
                checked={selectedOption === 'email'}
                onChange={handleOptionChange}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                value="phone"
                checked={selectedOption === 'phone'}
                onChange={handleOptionChange}
              />
              Phone
            </label>
          </div>
          {selectedOption === 'email' && (
            <div className="mt-3">
              <TextField
                type="email"
                id="outlined-basic"
                label="Enter your email"
                variant="outlined"
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                onChange={handlerResponsCheckEmail}
                sx={{
                  width: { sm: 250, md: 350 },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F1F7FF',
                    transition: 'ease-in',
                    // height: '40px',
                    '& > fieldset': {
                      // border: '2px solid #E4F0FE',
                      border: '2px solid #E4F0FE',
                      borderRadius: '10px',
                    },
                    '&.Mui-focused': {
                      '& > fieldset': {
                        borderColor: isFocused.length >= 1 ? '' : errors.email ? '#ec1919' : '#00ADEE',
                      },
                    },
                  },

                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      border: '2px solid #00ADEE',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isFocused.length >= 1 ? '#00ADEE' : '#000',
                    '&.Mui-focused': {
                      color: isFocused.length >= 1 ? '' : errors.email ? '#ec1919' : '#00ADEE',
                    },
                  },
                }}
              />
              <div className="mt-2">
                {isFocused.length >= 1 ? '' : errors.email && <span className="text-red-500">Email is required</span>}
                {emailCheck.sts === 200 && <span className="text-red-500">{emailCheck.msg}</span>}
              </div>
            </div>
          )}
          {selectedOption === 'phone' && (
            <div className="w-full !mb-[9px] md:!mb-[13px]  2xl:!mb-4">
              <div className="!flex custom-sign-inputs !w-full  custom-number-border ">
                <select
                  style={{
                    width: '200px',
                    padding: '5px',
                    border: '2px solid #E4F0FE',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    color: '#333',
                    fontSize: '12px',
                  }}
                  {...register('countryCode')}
                  className="border border-[#E4F0FE] bg-[#F8FBFF] w-[110px] rounded-lg focus-visible:border-0 focus-visible:outline-0">
                  <option
                    selected
                    value="+65"
                    className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                    +65
                  </option>
                  <option
                    value="+60"
                    className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                    +60
                  </option>
                  <option
                    value="+63"
                    className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                    +63
                  </option>
                  <option
                    value="+880"
                    className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                    +880
                  </option>
                </select>
                <TextField
                  {...register('phoneNumber')}
                  label="Phone number *"
                  variant="outlined"
                  sx={muiSxStyle(errors, 'username')}
                  className=" !rounded-[10px] !w-[100%]  !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                  onChange={handlerResponsCheckPhone}
                />

              </div>

              {/* <ErrorMessage
              errors={errors}
              name="phoneNumber"
              render={({ message }) => <p className="text-red-500">{message}</p>}
            /> */}
            </div>
          )}
          <div className=" mb-3 md:mb-4 xl:mb-6  2xl:mb-7 w-full flex flex-col md:flex-row items-center md:items-start justify-center">
            <div className=" mb-2 md:mb-0">
              <Button
                disabled={emailCheck.sts === 200 && true}
                type="submit"
                variant="contained"
                className={`${emailCheck.sts === 200 ? 'grayscale' : '!bg-[#00ADEE]'
                  } !text-white mt-3 !text-base sm:!text-lg lg:!text-xl !font-normal !font-roboto !capitalize !px-6 sm:!px-6 lg:!px-6 xl:!px-6 2xl:!px-6  !rounded-[10px]`}>
                Send OTP
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
