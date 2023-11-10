// import Link from 'next/link'
import React, { useState } from 'react'
// import { Icon } from '../shared'
// import { Button } from '@mui/material'
// import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import SubmitOtp from './SubmitNumberLogin'
// import sendToken from '@/util/twilio/sendToken'
import axios from 'axios'

const Number = () => {
  // const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [showInsertOtp, setInsertOtp] = useState(false)
  const [serviceSid, setServiceSid] = useState('')
  const [otp, setOtp] = useState('')

  const handleMobileLogin = async (data: any) => {
    setOtp(data?.numberOtp)
    const respo = await axios.post('/api/sendOtp', {
      number: data?.numberOtp,
      countryCode: '+88',
    })
    setServiceSid(respo.data)
    // await sendToken(data?.numberOtp)
    setInsertOtp(true)
  }

  return (
    <div>
      {!showInsertOtp ? (
        <form onSubmit={handleSubmit(handleMobileLogin)}>
          <div className="flex flex-col items-center space-y-4 max-w-md mx-auto shadow-md p-5 rounded-md">
            <div className="w-full border border-gray-300 rounded-lg flex items-center">
              <p>+88</p>
              <input
                required
                id="text"
                type="text"
                className="w-full max-w-md  px-4 py-2 outline-none"
                placeholder="Write Your Number here"
                {...register('numberOtp')}
              />
            </div>
            <button
              type="submit"
              className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send Otp
            </button>
          </div>
        </form>
      ) : (
        <SubmitOtp otp={otp} serviceSid={serviceSid} />
      )}
    </div>
  )
}

export default Number
