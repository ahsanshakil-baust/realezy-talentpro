// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import  {baseAdminQuery} from '@/store/config'

// Define a service using a base URL and expected endpoints
export const homePreferenceApi:any = createApi({
  reducerPath: 'homePreferenceApi',
  baseQuery:baseAdminQuery,
  tagTypes: ['HomePreference'],
  endpoints: builder => ({
    getHomePreferenceDetails: builder.query({
      query: (userId: number | string) => `api/v2/get-home-preference/${userId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['HomePreference'],
    }),

      //CREATE API
      createHomePreference: builder.mutation({
        query: tip => ({
          url: 'api/v2/home-preferences',
          method: 'POST',
          body: tip,
        }),
      }),

    updateHomePreference: builder.mutation({
      query: ({ hPID, data }) => ({
        url: `api/v2/home-preferences/${hPID}`,
        method: 'PUT',
        body: data,
      }),
    }),


    getDistrictWiseArea: builder.query({
      query: () => `/api/v2/district-wise-area`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['HomePreference'],
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetHomePreferenceDetailsQuery,
    useCreateHomePreferenceMutation,
    useUpdateHomePreferenceMutation,
    useGetDistrictWiseAreaQuery,
} = homePreferenceApi
