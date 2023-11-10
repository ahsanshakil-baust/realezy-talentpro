import Link from 'next/link'
import React, { useState } from 'react'
import { Icon } from '../shared'
import { Button } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Number from '../NumberLogin/Number'

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [showNumberLogin, setShowNumberLogin] = useState(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  // const handleChange = (prop: any) => (event: any) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  // GOOGLE

  async function handleGoogleLogin(e: any) {
    e.preventDefault()
    await signIn('google', {
      callbackUrl: `${window.location.origin}`,
    })
      .then(res => {
        console.log(res)
      })
      .then(error => {
        console.log(error)
      })
  }

  // FACEBOOK

  async function handleFacebookLogin(e: any) {
    e.preventDefault()

    await signIn('facebook', {
      callbackUrl: `${window.location.origin}`,
    })
      .then(res => {
        console.log(res)
      })
      .then(error => {
        console.log(error)
      })
  }

  async function handleLogin(data: any) {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(({ ok, _ }: any) => {
      if (ok) {
        router.push('/')
      }
    })
  }

  const numberLoginHandle = () => {
    setShowNumberLogin(true)
  }

  return (
    <div>
      {!showNumberLogin ? (
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col items-center space-y-4 max-w-md mx-auto shadow-md p-5 rounded-md">
            <input
              required
              id="email"
              type="email"
              className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Email"
              {...register('email')}
            />
            <div className="relative w-full max-w-md">
              <input
                required
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12"
                placeholder="Password"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 bg-white rounded-lg border border-l-0 border-gray-300"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {values.showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.6 17.6a8 8 0 10-11.2-11.2"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="w-full text-right text-secondary underline">
              <Link href="#">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign in
            </button>
            <p>Or Sign in With</p>
            <div className="flex gap-10">
              <button className="bg-transparent cursor-pointer" onClick={handleGoogleLogin}>
                <Icon className="w-8 h-8" name="google" />
              </button>
              <button className="bg-transparent cursor-pointer" onClick={handleFacebookLogin}>
                <Icon className="w-8 h-8" name="facebook" />
              </button>
              <button className="bg-transparent cursor-pointer" onClick={numberLoginHandle}>
                <Icon className="w-8 h-8" name="phone" />
              </button>
            </div>
            <div className="flex gap-5 items-center">
              <Button variant="outlined">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button variant="outlined">Just Browse</Button>
            </div>
          </div>
        </form>
      ) : (
        <Number />
      )}
    </div>
  )
}

export default Login
