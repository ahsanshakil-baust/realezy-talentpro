// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '@/store/config'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    loginActual: builder.mutation({
      query: data => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: data => ({
        url: 'auth/loginWeb',
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: data => ({
        url: 'auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    sendOtp: builder.mutation({
      query: data => ({
        url: 'auth/send_email_to_user',
        method: 'POST',
        body: data,
      }),
    }),
    sendMobileOtp: builder.mutation({
      query: data => ({
        url: '/auth/send_mobile_otp',
        method: 'POST',
        body: data,
      }),
    }),
    checkEmail: builder.mutation({
      query: data => ({
        url: 'auth/check-email-or-phone',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: 'home/changePassword',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginActualMutation,
  useLoginMutation,
  useSignupMutation,
  useSendOtpMutation,
  useCheckEmailMutation,
  useSendMobileOtpMutation,
  useChangePasswordMutation,
} = authApi
