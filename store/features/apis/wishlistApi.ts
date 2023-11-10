// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '@/store/config'

// Define a service using a base URL and expected endpoints
export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery,
  tagTypes: ['Wishlist'],
  endpoints: builder => ({
    getUserWishList: builder.query({
      query: (userId: number | string) => `WishList/detail/${userId}/1`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Wishlist'],
    }),
    createWishList: builder.mutation({
      // user_id: 120
      // product_id: 87
      // status: 1
      query: (data) => ({
        url: `WishList/create`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteWishList: builder.mutation({
      // user_id: 120
      // product_id: 87
      // status: 0
      query: (data) => ({
        url: `WishList/delete`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserWishListQuery, useCreateWishListMutation, useDeleteWishListMutation } = wishlistApi
