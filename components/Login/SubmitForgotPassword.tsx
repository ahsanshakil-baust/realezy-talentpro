import { hideLoader, hideModal, showLoader, useChangePasswordMutation } from '@/store'
import { StoreThunkDispatch } from '@/types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
// import { Modal } from '@mui/material'
// import { signOut } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
// import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logo } from '@/util/helper'

const SubmitForgotPassword = ({ emailInfo }: any) => {
  const dispatch = useDispatch<StoreThunkDispatch>()

  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [changePassword] = useChangePasswordMutation() // , { isError, isLoading, data }
  const {
    register,
    handleSubmit,
    // setValue,
    // control,
    watch,
    formState: { errors },
  } = useForm()

  const validatePassword = (value: any) => {
    const password = watch('password') // Get the value of the password field

    // Password must contain at least one lowercase letter,
    // one uppercase letter, one digit, and be at least 8 characters long
    // const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/
    const pattern = /^[a-zA-Z0-9]{6,20}$/

    if (!value.match(pattern)) {
      return 'Password must be at min 6 characters and max 20 characters long'
    }

    if (value !== password) {
      return 'Passwords do not match'
    }

    return true
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const signUpHandler = async (data: any) => {
    dispatch(showLoader('Sending Otp'))
    const response: any = await changePassword({
      user_id: emailInfo?.id,
      new_pass: data.passConfirm,
    })

    if (response?.data?.status === 200) {
      toast.success(response?.data?.message)
      dispatch(hideModal('Submit Forgot Password'))
      dispatch(hideLoader())
    }
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(signUpHandler)}
        action="POST"
        className=" !w-full !flex !flex-col !items-center !justify-center !rounded-[20px] !bg-[#F8FBFF] ">
        <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px] lg:px-[55px] xl:px-[65px] 2xl:px-[75px] pb-1 md:pb-[7.5px] lg:pb-[9.5px] xl:pb-[10.5px] 2xl:pb-[14px] ">
          <img
            alt='no-image'
            src={logo}
            className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
          />
          {/* <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl xl:text-2xl text-[#00ADEE] ">
            Forgot Password
          </h2>
          <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] lg:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
            Register to your account - find your perfect house.{' '}
          </p> */}
          <br />

          <TextField
            required
            className="custom-password !bg-[#F1F7FF] custom-sign-inputs input-variant !rounded-[10px] !w-[100%] !mb-[9px] md:!mb-[13px] lg:!mb-[16px] xl:!mb-[18px] 2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
            // fullWidth
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Password"
            {...register('password', {
              required: 'Password is required',
              validate: validatePassword, // Custom validation rule
            })}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <span className="!cursor-pointer" onClick={handleTogglePassword}>
                  {showPassword ? <Visibility className=" !text-[#00ADEE]" /> : <VisibilityOff />}
                </span>
              ),

              style: {
                borderRadius: '10px',
                border: '2px solid #E4F0FE',
              },
            }}
          />
          <p className="text-red-500">{errors.password && <span>{errors.password.message}</span>}</p>

          <TextField
            required
            className="!bg-[#F1F7FF] custom-sign-inputs input-variant !rounded-[10px] !w-[100%] !mb-[9px] md:!mb-[13px] lg:!mb-[16px] xl:!mb-[18px] 2xl:!mb-6 !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
            //fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            label="Confirm Password"
            {...register('passConfirm', {
              required: 'Confirm Password is required',
              validate: validatePassword, // Custom validation rule
            })}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <span className="!cursor-pointer" onClick={handleToggleConfirmPassword}>
                  {showConfirmPassword ? <Visibility className=" !text-[#00ADEE]" /> : <VisibilityOff />}
                </span>
              ),

              style: {
                borderRadius: '10px',
                border: '2px solid #E4F0FE',
              },
            }}
          />
          <p>{errors.passConfirm && <span className="text-red-600">{errors.passConfirm.message}</span>}</p>
          <p>
            {watch('password') === watch('passConfirm') && watch('password') && watch('passConfirm') && (
              <span className="text-green-500">Passwords match!</span>
            )}
          </p>

          <div>
            {loading ? (
              <Button
                variant="contained"
                className="bg-[#00ADEE] text-white text-[18px] lg:text-[22px] tracking-[0.44px] font-normal font-roboto capitalize px-8 sm:px-12 lg::px-16 xl:px-18 2xl:px-20 py-2 rounded-[10px]">
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                className=" !bg-[#00ADEE] !text-white !text-base sm:!text-lg lg:!text-xl !font-normal !font-roboto !capitalize !px-8 sm:!px-10 lg:!px-12 xl:!px-14 2xl:!px-16 !py-3 !rounded-[10px]">
                Reset Password
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SubmitForgotPassword
