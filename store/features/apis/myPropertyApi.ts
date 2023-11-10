// Need to use the React-specific entry point to import createApi
import baseQuery from '@/store/config'
import { propertyHandler } from '@/util'
import { createApi } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const myPropertyApi = createApi({
  reducerPath: 'myPropertyApi',
  baseQuery,
  tagTypes: ['MyProperty'],
  endpoints: builder => ({
    getAllProperty: builder.query({
      query: (userId: number | string) => `product/myAddedProduct/${userId}`,
      transformResponse: response => {
        const { data: properties } = response as any
        return properties.map((property: any) => propertyHandler(property))
      },
      transformErrorResponse: response => response,
      providesTags: ['MyProperty'],
    }),
    updateStatusProperty: builder.mutation({
      query: data => ({
        url: `product/updatePropertyStatus/${data?.property_id}/${data?.new_status}`,
        method: 'GET',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPropertyQuery, useUpdateStatusPropertyMutation } = myPropertyApi
