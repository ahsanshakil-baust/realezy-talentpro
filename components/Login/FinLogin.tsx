import Link from 'next/link'
import React, { useState, useEffect, forwardRef } from 'react'
import { Icon } from '../shared'
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  makeStyles,
} from '@mui/material'
import { useRouter } from 'next/router'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import FinSignUp from '../SignUp/FinSignUp'
import { toast } from 'react-toastify'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import ButtonLoader from '../loader/ButtonLoader'
import { useDispatch } from 'react-redux'
import store, { hideLoader, hideModal, showLoader, showModal } from '@/store'
import { FormGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Checkbox } from '@mui/material'
import { FaLastfmSquare } from 'react-icons/fa'
import ForgotPassword from './ForgotPassword'
import { StoreThunkDispatch } from '@/types'
import classNames from 'classnames'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import MobileOtp from '../SignUp/MobileOtp'
import UserSelectType from '../UserTypeSelect/UserSelectType'
import Image from 'next/image'
import { logo } from '@/util/helper'
import { customFormStyle } from '@/util/customFormStyle'
import { useCookies } from 'react-cookie'
import { yupResolver } from '@hookform/resolvers/yup'
import loginformvalidationSchema from '../shared/FormValidation/LoginFormValidationSchema'
import { ErrorMessage } from '@hookform/error-message'

const FinLogin = ({ authPopUp, setAuthPopUp }: any) => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const {
    register,
    handleSubmit,
    setValue,
    // control,
    // watch,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(loginformvalidationSchema('')),
  })

  const [loading, setLoading] = React.useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)

  const router = useRouter()
  const [buttonHide, setButtonHide] = useState(false)
  useEffect(() => {
    const response = async () => {
      const session = await getSession()
      if (!session) {
        router.push('/')
      }
    }
    response()
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const [signUpPopUp, setSignUpPopUp] = useState(false)
  const [mobileLoginPopUp, setMobileLoginPopUp] = useState(false)
  const [termsCondition, setTermsCondition] = useState(false)
  const [remember, setRemember] = useState(false)

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClose = () => {
    setTermsCondition(false)
    setAuthPopUp(false)
  }

  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  //COCKIES SECTION
  const [cookies, setCookie, removeCookie] = useCookies(['userLoginData'])

  async function handleLogin(data: any) {
    setLoading(true)
    dispatch(showLoader('Signing in...'))

    await signIn('emailLogin', {
      email: data.email,
      password: data.password,
      redirect: false,
      // callbackUrl: `${window.location.origin}/dashboard`,
    })
      .then((res: any) => {
        if (res?.status == 200) {
          toast.success('Login Successfully')
          setLoading(false)

          //SET COOKIES
          let remember = data.rememberMe == 'true' ? true : false

          if (remember) {
            setCookie(
              'userLoginData',
              { email: data.email, password: data.password, isChecked: remember },
              { path: '/' }
            )
          } else {
            setCookie('userLoginData', { email: '', password: '', isChecked: false }, { path: '/' })
            removeCookie('userLoginData')
          }

          //REDIRECT TO CORPORATE DASHBOARD
          const response = async () => {
            const session: any = await getSession()
            if (session?.user?.isCorporate === 'yes') {
              router.push('/corporate/dashboard')
            }
          }
          response()

          dispatch(hideLoader())
        } else {
          toast.error('Incorrect email and password')
          setLoading(false)
          dispatch(hideLoader())
        }
      })
      .then((error: any) => {
        console.log('🚀 ~ file: login.js ~ line 16 ~ handleLogin ~ error', error)
      })
  }

  const [defaultMessage, setDefaultMessage] = useState(cookies?.userLoginData?.email)
  const [defaultPassword, setDefaultPassword] = useState(cookies?.userLoginData?.password)

  useEffect(() => {
    setValue('email', defaultMessage)
    setValue('password', defaultPassword)
    setDefaultMessage(cookies?.userLoginData?.email)
    setDefaultPassword(cookies?.userLoginData?.password)
  }, [setValue, cookies?.userLoginData?.isChecked])

  useEffect(() => {
    setDefaultMessage(cookies?.userLoginData?.email)
    setDefaultPassword(cookies?.userLoginData?.password)
    console.log(cookies)
  }, [cookies, authPopUp])

  // const validatePassword = (value: any) => {
  //   const password = watch('password') // Get the value of the password field

  //   // Password must contain at least one lowercase letter,
  //   // one uppercase letter, one digit, and be at least 8 characters long
  //   // const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/
  //   const pattern = /^[a-zA-Z0-9]{6,20}$/

  //   if (!value.match(pattern)) {
  //     return 'Password must be at min 6 characters and max 20 characters long'
  //   }

  //   if (value !== password) {
  //     return 'Passwords do not match'
  //   }

  //   return true
  // }

  const openTermsCondition = () => {
    //OPEN MODAL WITH IFRAME
    store.dispatch(
      showModal({
        open: true,
        name: 'Terms and conditions',
        children: (
          <div className="p-3">
            <iframe src="https://real-ezy.com/terms-and-conditions.html" width="100%" height="400"></iframe>

            <div className="flex justify-center pt-6">
              <Button variant="contained" id="terms_condition" onClick={handleTermsCondition}>
                I Read & Agree
              </Button>
            </div>
          </div>
        ),
        className: '',
      })
    )
  }

  const [mobilePdpaCheck, setMobilePdpaCheck] = useState(false)

  const handleTermsCondition = (e: any) => {
    setTermsCondition(true)
    setMobilePdpaCheck(false)
    dispatch(hideModal('Terms and conditions'))
  }

  //EMAIL REGISTRATION SECTION
  const emailRegistration = () => {
    if (!termsCondition) {
      setMobilePdpaCheck(true)
      toast.error('Please agree terms and condition')
    } else {
      setMobileLoginPopUp(false)
      setSignUpPopUp(true)
      setAuthPopUp(false)
    }
  }

  //MOBILE REGISTRATION SECTION
  const mobileRegistration = () => {
    if (!termsCondition) {
      setMobilePdpaCheck(true)
      toast.error('Please agree terms and condition')
    } else {
      setSignUpPopUp(true)
      setMobileLoginPopUp(true)
      setAuthPopUp(false)
    }
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={authPopUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" !w-full  !h-[calc(100vh-85px)] !flex !items-center !justify-center ">
        <div className=" !w-[340px] sm:!w-[400px]  md:!w-[500px]  lg:!w-[530px] xl:!w-[550px] 2xl:!w-[620px] !mt-44 !outline-none focus:!outline-none scaleUp">
          {!loading && (
            <div className=" w-full h-auto  flex flex-col  rounded-[20px] bg-[#F8FBFF]  ">
              <div className=" w-full  relative 2xl:mt-10 md:mt-8 mt-6 ">
                <span
                  className="absolute z-30 2xl:right-8 md:right-[1.6rem] right-[1.2rem]  cursor-pointer bg-[#D4E8FF] 2xl:p-4 md:p-2 p-1 rounded-full   inline-block"
                  onClick={handleClose}>
                  <img src="./download/close.svg" alt="close" className=" w-[18px] h-[18px] " />
                </span>
              </div>
              <div className="z-10 w-[100%] flex flex-col items-center  px-8 md:px-[45px] lg:px-[55px] xl:px-[65px] 2xl:px-[75px] pb-1 md:pb-[7.5px] lg:pb-[9.5px] xl:pb-[10.5px] 2xl:pb-[14px] ">
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className=" w-full hidden  relative  ">
                    <span
                      className="absolute right-0 z-0 cursor-pointer bg-[#ccdef6] 2xl:p-4 md:p-2 p-1 rounded-full   md:mt-3 mt-2 inline-block"
                      onClick={handleClose}>
                      <img src="./download/close.svg" alt="close" className=" w-[18px] h-[18px] " />
                    </span>
                  </div>

                  <div className="flex justify-center items-center w-full">
                    <img
                      src={logo}
                      className="w-[40%] h-auto"
                      // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
                      alt=""
                    />
                  </div>
                  <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl xl:text-2xl text-[#00ADEE] ">
                    Welcome To RealEzy
                  </h2>
                  <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-5 text-center font-roboto font-normal text-[14px] lg:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
                    Login to your account - find your perfect house.
                  </p>

                  <div>
                    <TextField
                      className={
                        isFocused
                          ? ' custom-sign-inputs !w-[100%] !shadow-[0px_4px_10px_#034EA11F] !mb-[9px] md:!mb-[13px] lg:!mb-[16px] xl:!mb-[18px] 2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 !rounded-[10px] '
                          : ' custom-sign-inputs !w-[100%] !mb-[9px] md:!mb-[13px] lg:!mb-[16px] xl:!mb-[18px] 2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 !rounded-[10px] '
                      }
                      // fullWidth

                      type="email"
                      autoComplete="off"
                      id="outlined-basic"
                      label="Enter your email *"
                      variant="outlined"
                      value={defaultMessage}
                      {...register('email', { onChange: (e: any) => setDefaultMessage(e.target.value) })}
                      sx={customFormStyle.sx_text_field_for_login}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                    />
                  </div>

                  <div>
                    <TextField
                      className={classNames(
                        'custom-password',
                        '!mt-3',
                        isFocused
                          ? ' custom-sign-inputs !w-[100%] !mb-1 md:!mb-2 xl:!mb-3 2xl:!mb-4 !shadow-[0px_4px_10px_#034EA11F] !rounded-[10px]'
                          : ' custom-sign-inputs !w-[100%] !mb-1 md:!mb-2 xl:!mb-3 2xl:!mb-4 !rounded-[10px]'
                      )}
                      // fullWidth

                      type={values.showPassword ? 'text' : 'password'}
                      value={defaultPassword}
                      {...register('password', { onChange: (e: any) => setDefaultPassword(e.target.value) })}
                      // onChange={handleChange('password')}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      id="password"
                      label="Password *"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <span
                            className="!cursor-pointer   "
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}>
                            {values.showPassword ? (
                              <Visibility className=" !text-gray-400" />
                            ) : (
                              <VisibilityOff className=" !text-gray-400" />
                            )}
                          </span>
                        ),
                      }}
                      sx={customFormStyle.sx_text_field_for_login}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                    />
                  </div>

                  <div className="mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3 w-[100%] flex justify-between">
                    <div className="flex justify-center items-center">
                      <Checkbox
                        defaultChecked={cookies?.userLoginData?.isChecked ? true : false}
                        {...register('rememberMe')}
                        id="remember_me"
                        sx={{
                          color: '#D1D1D1',
                          '& .MuiSvgIcon-root': {
                            fontSize: 30,
                          },
                        }}
                      />
                      <label
                        onChange={() => setRemember(true)}
                        htmlFor="remember_me"
                        className="text-lg text-[#aaa4a4] underline">
                        Remember Me
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        setAuthPopUp(false)
                        dispatch(
                          showModal({
                            name: 'Forgot Password',
                            open: true,
                            children: <ForgotPassword />,
                            headingLeft: (
                              <button className="2xl:w-[40px] 2xl:h-[40px] w-[30px] h-[30px] flex justify-center items-center 2xl:px-2 2xl:py-2 rounded-2xl text-[#D0DEEF] bg-[#B1CDEB] cursor-pointer ">
                                <AiOutlineArrowLeft size={26} />
                              </button>
                            ),
                            headingRight: (
                              <span className="2xl:w-[40px] 2xl:h-[40px] md:w-[30px] md:h-[30px] cursor-pointer bg-[#ccdef6] flex justify-center items-center rounded-full ">
                                <img src="./close.svg" alt="" className=" " />
                              </span>
                            ),
                          })
                        )
                      }}
                      type="button"
                      className="bg-transparent cursor-pointer 2xl:text-lg md:text-base text-sm tracking-[0.72px] font-normal font-roboto text-right underline text-[#00ADEE] ">
                      Forgot Password?
                    </button>
                  </div>

                  <div className="flex justify-between gap-5">
                    <button
                      onClick={emailRegistration}
                      type="button"
                      className="border border-primary  text-primary  font-medium tracking-wider rounded-xl bg-transparent 2xl:py-3 md:py-[0.8rem] py-[0.6rem] 2xl:w-[14rem] md:w-[11rem] w-[9rem]  2xl:text-xl md:text-base text-sm cursor-pointer">
                      Registration
                    </button>
                    <button
                      type="submit"
                      className="cursor-pointer rounded-xl bg-[#00ADEE] 2xl:py-3 md:py-[0.8rem] py-[0.6rem] 2xl:w-[14rem] md:w-[11rem] w-[9rem]  2xl:text-xl md:text-base text-sm text-white">
                      Login
                    </button>
                  </div>

                  <div className="2xl:mt-7 2xl:mb-4 md:mt-7 md:mb-3 mt-5 mb-2.5 flex box-border items-center">
                    <p className="w-[13rem] h-[2px] mt-1.5 bg-[#c1c1c173] inline-block"></p>
                    <span className="text-lg inline-block text-center 2xl:mx-4 md:mx-2 mx-2">or</span>
                    <p className="w-[13rem] h-[2px] mt-1.5 bg-[#c1c1c173] inline-block"></p>
                  </div>
                </form>
                <div>
                  <div className="relative">
                    <img
                      src="./whatsappLogin.svg"
                      alt="whatsappLogin"
                      className="absolute 2xl:top-4 md:top-2 2xl:left-14 md:left-10 2xl:w-10 md:w-6 w-4"
                    />
                    <button
                      onClick={mobileRegistration}
                      className="bg-[#6AAF50] 2xl:w-[30rem] md:w-[24rem] w-[20rem] text-white 2xl:text-lg md:text-[14.4px] text-xs  rounded-lg border border-[#E0FBD6] 2xl:py-5 md:py-3 py-1 2xl:mb-5 md:mb-2 mb-1 tracking-wide font-medium cursor-pointer">
                      Login <span className="px-1">/</span> Register With Phone
                    </button>
                  </div>

                  {/*CORPORATE LOGIN */}
                  {/* <div className="relative">
                    <img
                      src="./whatsappblue.svg"
                      alt="whatsappCorporate"
                      className="absolute 2xl:top-4 md:top-2  2xl:left-28 md:left-20 2xl:w-10 md:w-6 w-4"
                    />
                    <button
                      disabled
                      className="bg-[#034EA1] 2xl:w-[30rem] md:w-[24rem] w-[20rem] text-white 2xl:text-lg md:text-[14.4px] text-xs tracking-wide font-medium rounded-lg border border-[#E0FBD6] 2xl:py-5 md:py-3 py-1">
                      Corporate Login
                    </button>
                  </div> */}

                  {/* PDPA SECTION */}
                  <div className="mb-3 text-center mt-2" onClick={openTermsCondition}>
                    <div className="flex justify-center items-center">
                      <Checkbox
                        id="terms_condition"
                        checked={termsCondition}
                        sx={{
                          color: mobilePdpaCheck ? 'red' : '#D1D1D1',
                          '& .MuiSvgIcon-root': {
                            fontSize: 30,
                          },
                        }}
                      />
                      <label
                        style={{ color: mobilePdpaCheck ? 'red' : '#aaa4a4' }}
                        htmlFor="terms_condition"
                        className="text-lg cursor-pointer">
                        I agree to the <code className="text-blue-400 font-bold">Privacy Policy</code>
                      </label>
                    </div>
                    {/* <p className="text-red-500">
                      {errors.termsCondition && <span>{errors.termsCondition.message}</span>}
                    </p> */}
                  </div>
                </div>
                <div className=" hidden mb-3 md:mb-4">
                  <div className="flex items-center py-1 xl:py-2 2xl:py-3 w-[250px] sm:w-[300px]  md:w-[320px] lg:w-[360px] 2xl:w-[485px]">
                    {/* <!-- The left line --> */}
                    <div className="flex-grow h-px bg-[#C1C1C1] "></div>

                    {/* <!-- Your text here --> */}
                    <span className="flex-shrink text-[18px] tracking-[0.36px] text-[#C1C1C1] px-4 md:px-6 lg:px-7 xl:px-8 2xl:px-10 font-normal font-roboto capitalize">
                      Or Login With
                    </span>

                    {/* <!-- The right line --> */}
                    <div className="flex-grow h-px bg-[#C1C1C1]"></div>
                  </div>
                </div>
                <div className="hidden">
                  <div className=" flex justify-between -mt-3 mb-4 xl:mb-[20px] 2xl:mb-[32px] w-[100%]">
                    <div className=" flex flex-col items-center justify-center">
                      <img
                        src="/download/google.svg"
                        className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] lg:w-[55px] lg:h-[55px]"
                      />
                      <p>Google</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <img
                        src="/download/facebook.svg"
                        className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] lg:w-[55px] lg:h-[55px]"
                      />
                      <p>Facebook</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <img
                        src="/download/phone.svg"
                        className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] lg:w-[55px] lg:h-[55px]"
                      />
                      <p>Phone</p>
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <img
                        src="/download/Ios.svg"
                        className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] lg:w-[55px] lg:h-[55px]"
                      />
                      <p>Apple</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <FinSignUp
        setSignUpPopUp={setSignUpPopUp}
        signUpPopUp={signUpPopUp}
        setAuthPopUp={setAuthPopUp}
        mobileLoginPopUp={mobileLoginPopUp}
      />
    </div>
  )
}

export default FinLogin
