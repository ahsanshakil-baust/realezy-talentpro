import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Modal, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import VerifyUser from './verifyUser'
import { authLogo, logo, randomNUmberGenerator } from '@/util/helper'
import { hideLoader, showLoader, useCheckEmailMutation, useSendMobileOtpMutation, useSendOtpMutation } from '@/store'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { muiSxStyle } from '@/util/muistylesheet'
import Image from 'next/image'
import logoXl from '@/public/Logo@2x.png'
import { yupResolver } from '@hookform/resolvers/yup'
import emailregistrationformvalidationSchema from '../shared/FormValidation/EmailRegistrationFormValidationSchema'
import { ErrorMessage } from '@hookform/error-message'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const FinSignUp = ({ signUpPopUp, setSignUpPopUp, setAuthPopUp, mobileLoginPopUp }: any) => {
  const [loading, setLoading] = React.useState(false)

  const [sendOtp] = useSendOtpMutation() // , { isError, isLoading, data }
  const [sendMobileOtp] = useSendMobileOtpMutation() // , { isError: mobileIsError, isLoading: mobileLoading, data: mobileData }
  const [checkEmail] = useCheckEmailMutation() // , { isError: emailError, isLoading: emailLoading, data: emailCheckData }
  const [log, setLog] = useState('login')
  const [regisdata, setRegisData] = useState({})
  const [signUpErrorFocused, setSignUpErrorFocused] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    passConfirm: '',
    countryCode: '',
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(emailregistrationformvalidationSchema('')),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [emailCheck, setEmailCheck] = useState({ msg: '', sts: 0 })
  const [numberCheck, setNumberCheck] = useState({ msg: '', sts: 0 })
  //const [phoneNumber, setPhoneNumber] = useState('')
  //const [countryCode, setCountryCode] = useState('')
  const [userNameSlice, setUserNameSlice] = useState('')

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleClose = () => {
    setSignUpPopUp(false)
  }

  const dispatch = useDispatch()

  // FORM STATE
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('65')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')

  const signUpHandler = async (data: any) => {
    setLoading(true)
    dispatch(showLoader('Creating Account'))

    const responsCheckEmail: any = await checkEmail({
      email: data.email,
    })

    const { message, status } = responsCheckEmail?.data || {}

    if (status === 200) {
      const otp = randomNUmberGenerator()
      const newUserData = {
        name: data.username,
        email: data.email,
        password: data.password,
        code: otp,
        countryCode: data.countryCode,
        mobile: data.phoneNumber,
      }
      const respons: any = await sendOtp({
        emailto: data.email,
        text: `Your otp is ${otp}`,
        subject: 'Welcome to RealEzy',
      })
      if (respons?.data?.status === 200) {
        toast.success(respons?.data?.message)
        setLoading(false)
        dispatch(hideLoader())
      }

      setRegisData(newUserData)
      setLog('verify')
      setSignUpPopUp(false)
    } else {
      toast.error(message)
      setLoading(false)
      dispatch(hideLoader())
      setSignUpPopUp(false)
    }
  }

  const [loginType, setLoginType] = useState('')

  const mobileSignUpHandler = async (login: any) => {
    if (!(phoneNumber.length >= 1)) {
      return false
    }
    setLoading(true)
    dispatch(showLoader('Creating Account'))

    try {
      const responseOtpMobile: any = await sendMobileOtp({
        recipient_number: '+' + countryCode + phoneNumber,
      })

      const newUserData = {
        name: '',
        email: '',
        password: '',
        code: responseOtpMobile?.data?.data?.otp,
        countryCode: countryCode,
        mobile: phoneNumber,
      }

      if (responseOtpMobile?.data?.status === 200) {
        toast.success(responseOtpMobile?.message)
        setLoading(false)
        dispatch(hideLoader())
      } else {
        dispatch(hideLoader())
      }

      setRegisData(newUserData)
      setLoginType(login)
      setLog('verify')
      setSignUpPopUp(false)
    } catch (e) {
      toast.error('error')
      setLoading(false)
      dispatch(hideLoader())
      setSignUpPopUp(false)
    }
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={signUpPopUp}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" !w-full  !h-[calc(100vh-85px)] !flex !items-center !justify-center ">
        <div className=" !w-[340px] sm:!w-[400px]  md:!w-[500px]   2xl:!w-[620px]  !mt-[190px] !outline-none focus:!outline-none  ">
          {!loading &&
            (!mobileLoginPopUp ? (
              <form
                noValidate
                onSubmit={handleSubmit(signUpHandler)}
                action="POST"
                className=" !w-full !flex !flex-col !items-center !justify-center !rounded-[20px] !bg-[#F8FBFF] ">
                <div className="  flex w-[100%] justify-end items-end px-2 pt-3 -mb-4 md:px-3 md:pt-4 md:-mb-6  2xl:px-4 2xl:pt-6 2xl:-mb-8  ">
                  <span
                    className="z-20 cursor-pointer bg-[#ccdef6] 2xl:p-4 md:p-2 rounded-full 2xl:mr-6  2xl:mt-5  inline-block"
                    onClick={handleClose}>
                    <img src="./close.svg" alt="" className=" " />
                  </span>
                </div>

                <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px]  2xl:px-[75px] pb-1 md:pb-[7.5px] 2xl:pb-[14px] ">
                  <Image width={239} height={82} src={logoXl} alt="" />
                  <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl 2xl:text-2xl text-[#00ADEE] ">
                    Create Your Account
                  </h2>
                  <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
                    Register to your account - find your perfect house.
                  </p>

                  {/* <div className="w-full !mb-[9px] md:!mb-[13px]  2xl:!mb-4">
                    <Controller
                      control={control}
                      name="username"
                      rules={{ required: true }}
                      render={({ field, formState: { errors } }: any) => (
                        <TextField
                          // fullWidth
                          // error={errors.username}
                          {...field}
                          type="text"
                          value={userNameSlice}
                          id="outlined-basic"
                          label="Name"
                          required
                          sx={muiSxStyle(errors, 'username')}
                          variant="outlined"
                          onChange={e => handleRequired(field.name, e.target.value)}
                          className="custom-sign-inputs input-variant !w-[100%] !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                        />
                      )}
                    />
                    {userNameSlice.length > 0
                      ? ''
                      : errors.username && <span className="text-red-600 mt-1">Name is required</span>}
                  </div> */}

                  {/* NAME  INPUT*/}
                  <div className="w-full !mb-[9px] md:!mb-[13px]  2xl:!mb-4">
                    <TextField
                      type="text"
                      id="outlined-basic"
                      label="Enter your name *"
                      sx={muiSxStyle(errors, 'username')}
                      variant="outlined"
                      {...register('username')}
                      className="custom-sign-inputs input-variant !w-[100%] !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                    />
                    <ErrorMessage
                      errors={errors}
                      name="username"
                      render={({ message }) => <p className="text-red-600 mt-1">{message}</p>}
                    />
                  </div>

                  {/* EMAIL INPUT*/}
                  <div className="w-full !mb-[9px] md:!mb-[13px]  2xl:!mb-4">
                    <TextField
                      type="text"
                      id="outlined-basic"
                      label="Enter your email *"
                      sx={muiSxStyle(errors, 'username')}
                      variant="outlined"
                      {...register('email')}
                      className="custom-sign-inputs input-variant !w-[100%] !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => <p className="text-red-600 mt-1">{message}</p>}
                    />
                  </div>

                  {/* <div className="w-full !mb-[9px] md:!mb-[13px] 2xl:!mb-4">
                    <TextField
                      className=" custom-sign-inputs input-variant !rounded-[10px] !w-[100%] !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                      required
                      type="email"
                      id="outlined-basic"
                      label="Enter your email"
                      variant="outlined"
                      {...register('email', {
                        onChange: errorHandle,
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      name="email"
                      // onChange={errorHandle}
                      // error={errors.email?.type === 'required' ? true : false}
                      onBlur={handleOnBlurExistingEmail}
                      sx={{
                        width: { sm: 250, md: 350 },
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F1F7FF',
                          '& > fieldset': {
                            // border: '2px solid #E4F0FE',
                            border: '2px solid ',
                            borderColor:
                              signUpErrorFocused.email.length >= 1 ? '#E4F0FE' : errors.email ? '#ed3030' : '#E4F0FE',
                            borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor:
                                signUpErrorFocused.email.length >= 1 ? '#00ADEE' : errors.email ? '#ed3030' : '#00ADEE',
                            },
                          },
                        },

                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '2px solid ',
                            borderColor:
                              signUpErrorFocused.email.length >= 1 ? '#00ADEE' : errors.email ? '#ed3030' : '#00ADEE',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: signUpErrorFocused.email.length >= 1 ? '#000' : errors.email ? '#ed3030' : '#000',
                          '&.Mui-focused': {
                            color:
                              signUpErrorFocused.email.length >= 1 ? '#00ADEE' : errors.email ? '#ed3030' : '#00ADEE',
                          },
                        },
                      }}
                    />
                    {errors.email && <span className="text-red-500">Email is required</span>}
                    {emailCheck.sts === 201 && <span className="text-red-500">{emailCheck.msg}</span>}
                  </div> */}

                  {/* PHONE NUMBER */}
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
                        // id="outlined-basic"
                        {...register('phoneNumber')}
                        label="Phone number *"
                        variant="outlined"
                        sx={muiSxStyle(errors, 'username')}
                        className=" !rounded-[10px] !w-[100%]  !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                        // sx={{
                        //   width: { sm: 250, md: 350 },
                        //   '& .MuiOutlinedInput-root': {
                        //     backgroundColor: '#F1F7FF',

                        //     '& > fieldset': {
                        //       // border: '2px solid #E4F0FE',
                        //       border: '2px solid ',
                        //       borderColor:
                        //         signUpErrorFocused.phoneNumber.length >= 1
                        //           ? '#E4F0FE'
                        //           : errors.phoneNumber
                        //           ? '#ed3030'
                        //           : '#E4F0FE',
                        //       borderRadius: '10px',
                        //     },
                        //     '&.Mui-focused': {
                        //       '& > fieldset': {
                        //         borderColor:
                        //           signUpErrorFocused.phoneNumber.length >= 1
                        //             ? '#00ADEE'
                        //             : errors.phoneNumber
                        //             ? '#ed3030'
                        //             : '#00ADEE',
                        //       },
                        //     },
                        //   },

                        //   '& .MuiOutlinedInput-root:hover': {
                        //     '& > fieldset': {
                        //       border: '2px solid #00ADEE',
                        //       borderRadius: '10px',
                        //     },
                        //   },
                        //   '& .MuiInputLabel-root': {
                        //     color:
                        //       signUpErrorFocused.phoneNumber.length >= 1
                        //         ? '#000'
                        //         : errors.phoneNumber
                        //         ? '#ed3030'
                        //         : '#000',

                        //     '&.Mui-focused': {
                        //       color:
                        //         signUpErrorFocused.phoneNumber.length >= 1
                        //           ? '#00ADEE'
                        //           : errors.phoneNumber
                        //           ? '#ed3030'
                        //           : '#00ADEE',
                        //     },
                        //   },
                        // }}
                      />
                    </div>

                    <ErrorMessage
                      errors={errors}
                      name="phoneNumber"
                      render={({ message }) => <p className="text-red-500">{message}</p>}
                    />

                    {/* {numberCheck.sts === 201 && <span className="text-red-500 mt-1">{numberCheck.msg}</span>} */}
                    {/* <span className="text-red-500 mt-1">
                      {errors.phoneNumber && <span>Phone Number is required</span>}
                    </span> */}
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="w-full !mb-[9px] md:!mb-[13px]  2xl:!mb-4">
                    <TextField
                      type={showPassword ? 'text' : 'password'}
                      id="outlined-basic"
                      label="Enter your password *"
                      sx={muiSxStyle(errors, 'username')}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <span className="!cursor-pointer" onClick={handleTogglePassword}>
                            {showPassword ? (
                              <Visibility className=" !text-[#00ADEE]" />
                            ) : (
                              <VisibilityOff className=" !text-gray-400" />
                            )}
                          </span>
                        ),
                      }}
                      {...register('password')}
                      className="custom-sign-inputs input-variant !w-[100%] !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => <p className="text-red-500">{message}</p>}
                    />

                    {/* <TextField
                      className={classNames(
                        'custom-password',
                        '!bg-[#F1F7FF] custom-sign-inputs input-variant !rounded-[10px] !w-[100%] !mb-[9px] md:!mb-[13px]  2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 '
                      )}
                      // fullWidth
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      label="Password *"
                      {...register('password')}
                      sx={{
                        width: { sm: 250, md: 350 },
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F1F7FF',
                          '& > fieldset': {
                            // border: '2px solid #E4F0FE',
                            border: '2px solid',
                            borderColor:
                              signUpErrorFocused.password.length >= 1
                                ? '#E4F0FE'
                                : errors.password
                                ? '#ce1717'
                                : '#E4F0FE',
                            borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor:
                                signUpErrorFocused.password.length >= 1
                                  ? '#00ADEE'
                                  : errors.password
                                  ? '#ed3030'
                                  : '#00ADEE',
                            },
                          },
                        },

                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '2px solid #00ADEE',
                          },
                        },

                      }}
                      // onChange={errorHandle}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <span className="!cursor-pointer" onClick={handleTogglePassword}>
                            {showPassword ? (
                              <Visibility className=" !text-[#00ADEE]" />
                            ) : (
                              <VisibilityOff className=" !text-gray-400" />
                            )}
                          </span>
                        ),
                      }}
                    /> */}
                    {/* <span className="text-red-500 mt-1">
                      {errors.password && <span>Password is required</span>}
                    </span> */}
                  </div>

                  <div className="w-full !mb-[9px] md:!mb-[13px]  2xl:!mb-4">
                    <TextField
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="outlined-basic"
                      label="Confirm Password *"
                      sx={muiSxStyle(errors, 'username')}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <span className="!cursor-pointer" onClick={handleToggleConfirmPassword}>
                            {showConfirmPassword ? (
                              <Visibility className=" !text-[#00ADEE]" />
                            ) : (
                              <VisibilityOff className=" !text-gray-400" />
                            )}
                          </span>
                        ),
                      }}
                      {...register('passConfirm')}
                      className="custom-sign-inputs input-variant !w-[100%] !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                    />
                    <ErrorMessage
                      errors={errors}
                      name="passConfirm"
                      render={({ message }) => <p className="text-red-500">{message}</p>}
                    />
                    {/* <TextField
                      required
                      className={classNames(
                        'custom-password',
                        '!bg-[#F1F7FF] custom-sign-inputs input-variant !rounded-[10px] !w-[100%] !mb-[9px] md:!mb-[13px] 2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 '
                      )}
                      //fullWidth
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      label="Confirm Password"
                      {...register('passConfirm', {
                        onChange: errorHandle,
                        required: true,
                        validate: validatePassword, // Custom validation rule
                      })}
                      sx={{
                        width: { sm: 250, md: 350 },
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F1F7FF',
                          '& > fieldset': {
                            // border: '2px solid #E4F0FE',
                            border: '2px solid',
                            borderColor:
                              signUpErrorFocused.passConfirm.length >= 1
                                ? '#E4F0FE'
                                : errors.passConfirm
                                ? '#ce1717'
                                : '#E4F0FE',
                            borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor:
                                signUpErrorFocused.passConfirm.length >= 1
                                  ? '#00ADEE'
                                  : errors.passConfirm
                                  ? '#ce1717'
                                  : '#00ADEE',
                            },
                          },
                        },

                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '2px solid #00ADEE',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color:
                            signUpErrorFocused.passConfirm.length >= 1
                              ? '#000'
                              : errors.passConfirm
                              ? '#ce1717'
                              : '#000',
                          '&.Mui-focused': {
                            color:
                              signUpErrorFocused.passConfirm.length >= 1
                                ? '#00ADEE'
                                : errors.passConfirm
                                ? '#ce1717'
                                : '#00ADEE',
                          },
                        },
                      }}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <span className="!cursor-pointer" onClick={handleToggleConfirmPassword}>
                            {showConfirmPassword ? (
                              <Visibility className=" !text-[#00ADEE]" />
                            ) : (
                              <VisibilityOff className=" !text-gray-400" />
                            )}
                          </span>
                        ),
                      }}
                    /> */}
                    {/* <span>
                      {errors.passConfirm && <span className="text-red-600 mt-1">Confirm Password is required</span>}
                    </span> */}
                    {/* <p>
                      {watch('password') === watch('passConfirm') && watch('password') && watch('passConfirm') && (
                        <span className="text-green-500">Passwords match!</span>
                      )}
                    </p> */}
                  </div>

                  <div>
                    {loading ? (
                      <Button
                        variant="contained"
                        className="!bg-[#00ADEE] !text-white 2xl:!text-[18px] md:!text-base lg:!text-[22px] tracking-[0.44px] font-normal font-roboto capitalize px-8 sm:!px-12  2xl:!px-20 md:!py-10 py-2 rounded-[10px]">
                        Loading...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        className=" !bg-[#00ADEE] !text-white !text-base sm:!text-lg lg:!text-xl !font-normal !font-roboto !capitalize !px-8 sm:!px-10 md:!px-10  2xl:!px-16 2xl:!py-3 md:!py-1 !rounded-[10px]">
                        Create Account
                      </Button>
                    )}
                  </div>
                  <div className=" flex justify-start-start !mt-[8px] lg:!mt-[10px] 2xl:!mt-[14px] !mb-[6px] sm:!mb-[10px] md:!mb-[12px] 2xl:!mb-[16px]  !text-[13px] sm:!text-[15px] lg:!text-[16px] !tracking-[0.96px] !font-normal !font-roboto !text-[#034EA1] !capitalize ">
                    <p>
                      Already have an account? &nbsp;
                      <span
                        onClick={() => {
                          setAuthPopUp(true), setSignUpPopUp(false)
                        }}
                        className="!bg-transparent hover:!bg-transparent !cursor-pointer !text-base sm:!text-lg lg:!text-xl !text-[#034EA1] !font-medium !font-roboto !capitalize !text-left md:!text-right">
                        Login
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            ) : (
              <div className=" !w-full !flex !flex-col !items-center !justify-center !rounded-[20px] !bg-[#F8FBFF] ">
                {/* <div className="  flex w-[100%] justify-end items-end px-2 pt-3 -mb-4 md:px-3 md:pt-4 md:-mb-6  2xl:pt-6 2xl:-mb-8  ">
                  <span className="z-20" onClick={handleClose}>
                    <AiOutlineClose className=" !w-[25px] !h-[25px] sm:!w-[30px] sm:!h-[30px] " />
                  </span>
                </div> */}
                {/* <div className="  flex w-[100%] justify-end items-end px-2 pt-3 -mb-4 md:px-3 md:pt-4 md:-mb-6  2xl:px-4 2xl:pt-6 2xl:-mb-8  ">
                  
                </div> */}

                <div className="z-10 w-[100%] flex flex-col items-center px-8 py-4 md:px-[45px]  2xl:px-[75px]  md:pb-[7.5px] 2xl:pb-[14px] ">
                  <div className="w-full flex justify-end">
                    <div
                      className="w-11 h-11 bg-[#D4E8FF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={handleClose}>
                      <ClearOutlinedIcon style={{ color: '#034EA1', fontSize: '30px' }} />
                    </div>
                  </div>
                  <Image
                    width={239}
                    height={82}
                    src={logoXl}
                    // className="w-[288.09px] mb-3"
                    // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
                    alt=""
                  />

                  <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl 2xl:text-2xl text-[#00ADEE] ">
                    Login With Mobile
                  </h2>
                  <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
                    It's really easy with RealEzy
                  </p>

                  <div className="!flex custom-sign-inputs !w-full !mb-[9px] md:!mb-[13px]  2xl:!mb-6  ">
                    {/* <PhoneInput
                      placeholder=""
                      country={'sg'}
                      onlyCountries={['bd', 'my', 'sg', 'ph']}
                      onChange={(value: any, country: any) => setCountryCode(country.dialCode)}
                      // onBlur={handleOnBlurExistingEmail}
                      inputStyle={{ width: '90px' }}
                    /> */}
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
                      onChange={e => setCountryCode(e.target.value)}
                      // onChange={errorHandle}
                      className=" cursor-pointer border border-[#E4F0FE] bg-[#F8FBFF] w-[110px] rounded-lg focus-visible:border-0 focus-visible:outline-0">
                      <option
                        value="+65"
                        selected
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
                      type="text"
                      required
                      id="outlined-basic"
                      onChange={(e: any) => setPhoneNumber(e.target.value)}
                      // onBlur={handleExistingNumber}
                      label="Phone number"
                      variant="outlined"
                      className="!bg-[#F1F7FF] input-variant !rounded-[10px] !w-[100%]  !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                      /* InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                        style: {
                          borderRadius: '0 10px 10px 0',
                          border: '2px solid #E4F0FE',
                          width: '100%',
                        },
                      }} */
                      sx={{
                        width: { sm: 250, md: 350 },
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F1F7FF',

                          '& > fieldset': {
                            // border: '2px solid #E4F0FE',
                            border: '2px solid ',
                            borderColor: '#E4F0FE',
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
                            borderRadius: '10px',
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
                  </div>
                  {numberCheck.sts === 201 ? (
                    <p className="text-red-500">{numberCheck.msg}</p>
                  ) : (
                    <p className="text-green-500">{numberCheck.msg}</p>
                  )}
                  {/* <p className="text-red-500">{errors.phone && <span>{errors.phone.message}</span>}</p> */}

                  <div>
                    {loading ? (
                      <Button
                        variant="contained"
                        className=" !bg-[#00ADEE] !text-white !text-base sm:!text-lg lg:!text-xl !font-normal !font-roboto !capitalize !px-8 sm:!px-10 md:!px-12  2xl:!px-16 !py-3 !rounded-[10px]">
                        Loading...
                      </Button>
                    ) : (
                      <Button
                        onClick={() => mobileSignUpHandler('mobile')}
                        variant="contained"
                        className=" !bg-[#00ADEE] !text-white !text-base sm:!text-lg lg:!text-xl !font-normal !font-roboto !capitalize !px-8 sm:!px-10 md:!px-12  2xl:!px-16 !py-3 !rounded-[10px]">
                        Send Otp
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Modal>

      {log === 'verify' && (
        <VerifyUser loginType={loginType} setLog={setLog} regisdata={regisdata} setRegisData={setRegisData} />
      )}
    </div>
  )
}

export default FinSignUp
