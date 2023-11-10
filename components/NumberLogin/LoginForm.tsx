// import Link from 'next/link'
import React, { useState } from 'react'
// import { Icon } from '../shared'
// import { Button } from '@mui/material'
// import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
// import SubmitOtp from './SubmitNumberLogin'

const LoginForm = () => {
  // const router = useRouter()
  const { register, handleSubmit } = useForm()

  const handleMobileLogin = (_: any) => {
    // console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleMobileLogin)}>
        <div className="flex flex-col items-center space-y-4 max-w-md mx-auto shadow-md p-5 rounded-md">
          <input
            required
            id="text"
            type="text"
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Full Name"
            {...register('name')}
          />
          <input
            required
            id="email"
            type="email"
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Write Your Email"
            {...register('email')}
          />
          <button
            type="submit"
            className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
