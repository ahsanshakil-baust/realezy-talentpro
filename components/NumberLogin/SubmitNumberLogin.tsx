// import Link from 'next/link'
import React, { useState } from 'react'
// import { Icon } from '../shared'
// import { Button } from '@mui/material'
// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import LoginForm from './LoginForm'
import axios from 'axios'

const SubmitOtp = ({ otp, serviceSid }: any) => {
  // const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [userInfo, setUserInfo] = useState(false)

  const handleMobileLogin = async (data: any) => {
    // console.log(data?.numberOtp)

    const respo = await axios.post('/api/verifyOtp', {
      serviceSid: serviceSid,
      number: otp,
      countryCode: '+88',
      token: data?.numberOtp,
    })
    if (respo?.data === 'approved') {
      setUserInfo(true)
    } else {
      alert('OTP is not matched. Please provide the actual OTP')
    }
    console.log(respo)
  }

  return (
    <div>
      {!userInfo ? (
        <form onSubmit={handleSubmit(handleMobileLogin)}>
          <div className="flex flex-col items-center space-y-4 max-w-md mx-auto shadow-md p-5 rounded-md">
            <input
              required
              id="text"
              type="text"
              className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Write Your Otp Code here"
              {...register('numberOtp')}
            />
            <button
              type="submit"
              className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit Otp
            </button>
          </div>
        </form>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default SubmitOtp
