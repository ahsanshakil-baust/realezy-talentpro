// Need to use the React-specific entry point to import createApi
import config from '@/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import baseQuery from '@/store/config'

export const fileUploadApi = createApi({
  reducerPath: 'fileUploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  tagTypes: ['FileUploadApi'],
  endpoints: builder => ({
    multiFileUpload: builder.mutation({
      query: data => ({
        url: 'upload/indexV2',
        method: 'POST',
        body: data,
        prepareHeaders: (headers: any) => {
          headers.set('Content-Type', `multipart/form-data; boundary=${data.getBoundary()}`)
          return headers
        },
      }),
    }),
  }),
})

export const { useMultiFileUploadMutation } = fileUploadApi
