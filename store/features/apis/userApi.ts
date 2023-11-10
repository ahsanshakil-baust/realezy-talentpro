// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '@/store/config'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUserProfileDetails: builder.query({
      query: (userId: number | string) => `profile/detail/${userId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Users'],
    }),
    
    updateUserProfile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `profile/update/${userId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    //GET THREAD INFO FOR USER
    getThreadInfo: builder.query({
      query: (threadId: number | string) => `chat/getThreadInfo/${threadId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Users'],
    }),

    //GET THREAD INFO FOR USER
    // getMakeOfferEligibilityCheck: builder.query({
    //   query: ({ userId, amount }) => `/make-offer-eligibility-check/${userId}/${amount}`,
    //   transformResponse: (response: { data: any }) => response.data,
    //   transformErrorResponse: response => response,
    //   providesTags: ['Users'],
    // }),
    getMakeOfferEligibilityCheck: builder.mutation({
      query: ({ userId, amount }) => ({
        url: `/make-offer-eligibility-check/${userId}/${amount}`,
        method: 'GET',
        // body: data,
      }),
    }),


    //GET USER NOTIFICATIONS
    getUserNotifications: builder.query({
      query: ({userId, pageNumber}) => `Notification/detail/${userId}/${Number(pageNumber)}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Users'],
    }),

    //DELETE NOTIFICATION
    deleteUserNotification: builder.mutation({
      query: ({ notification_id }) => ({
        url: `Notification/delete/${notification_id}`,
        method: 'DELETE',
        // body: data,
      }),
    }),

     //DELETE NOTIFICATION
     updateUserNotification: builder.mutation({
      query: ({ notification_id }) => ({
        url: `Notification/update`,
        method: 'PUT',
        body: { notification_id },
      }),
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserProfileDetailsQuery,
  useUpdateUserProfileMutation,
  useGetThreadInfoQuery,
  // useGetMakeOfferEligibilityCheckQuery,
  useGetMakeOfferEligibilityCheckMutation,
  useGetUserNotificationsQuery,
  useDeleteUserNotificationMutation,
  useUpdateUserNotificationMutation
} = userApi
