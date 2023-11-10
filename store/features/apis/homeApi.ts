// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '@/store/config'

// Define a service using a base URL and expected endpoints
export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery,
  tagTypes: ['Home'],
  endpoints: builder => ({
    getHomeAllData: builder.query({
      query: () => 'home',
      transformResponse: (response: { data: any }) => {
        return response.data
      },
      transformErrorResponse: response => response,
      providesTags: ['Home'],
    }),
    getDistrictList: builder.query({
      // query: (val: string | number | null | undefined) => 'home/districtList',
      query: (val: string | number | null | undefined) => 'home/districtList',
      transformResponse: (response: { data: any }) => {
        return response.data
      },
      transformErrorResponse: response => response,
      providesTags: ['Home'],
    }),
    getPropertyByRentType: builder.query({
      query: (districtType: number | string) => `home/propertyByRentType/${districtType}`,
      transformResponse: (response: { data: any }) => {
        return response.data
      },
      transformErrorResponse: response => response,
      providesTags: ['Home'],
    }),
    getFindProperty: builder.query({
      query: () => `home/findProperty`,
      transformResponse: (response: { data: any }) => {
        return response.data
      },
      transformErrorResponse: response => response,
      providesTags: ['Home'],
    }),
    // getFeaturedProperty: builder.query({
    //   query: () => "home",
    //   transformResponse: (response: { data: any }) => {
    //     return response.data.featured_products
    //   },
    //   transformErrorResponse: response => response,
    //   providesTags: ['Home'],
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHomeAllDataQuery,
  useGetDistrictListQuery,
  useGetPropertyByRentTypeQuery,
  useGetFindPropertyQuery,
} = homeApi
