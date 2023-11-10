// Need to use the React-specific entry point to import createApi
 import baseQuery from '@/store/config'
import { UserType } from '@/types'
import {
  addQueryParams,
  getUserTypeNumber,
  handelAmount,
  handelAmountWithText,
  handelPeriod,
  propertyDetailsHandler,
} from '@/util'
import { createApi } from '@reduxjs/toolkit/query/react'
import moment from 'moment'

type AllTransactionPayload = {
  userId: number | string
  type: string
}

type AllStatementPayloadParams = {
  year?: string
  month?: string
  status?: string
  last6m?: string
  thisYear?: string
}

type AllStatementPayload = {
  landlordId: number | string
  propertyId: number | string
  prams?: AllStatementPayloadParams
}

type StatementDetailsPayload = {
  statementId: number | string
  userType: UserType
}

// Define a service using a base URL and expected endpoints
export const propertyApi:any = createApi({
  reducerPath: 'propertyDetailsApi',
  baseQuery,
  tagTypes: ['Property', 'AllTransaction', 'AllTenantTransaction', 'AllLandlordTransaction', 'StatementDetails'],
  endpoints: builder => ({
    getPropertyDetails: builder.query({
      query: (propertyId: number | string) => `product/detail/${propertyId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Property'],
    }),
    getMyAddedProperty: builder.query({
      query: (userId: number | string) => `product/myAddedProduct/${userId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Property'],
    }),
    getMyPropertyList: builder.query({
      query: (userId: number | string) => `product/myAddedProduct/${userId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Property'],
    }),
    //FILTER API
    filter: builder.mutation({
      query: data => ({
        url: 'product/filterWeb',
        method: 'POST',
        body: data,
      }),
    }),
    //CREATE API
    createProperty: builder.mutation({
      query: data => ({
        url: 'product/create',
        method: 'POST',
        body: data,
      }),
    }),

    //Delete API
    deleteProperty: builder.mutation({
      query: (productId) => ({
        url: `product/deleteProduct/${productId}`,
        method: 'POST',
      }),
    }),

    // product/getMyPaymentHistory/105
    getAllTransaction: builder.query({
      query: ({ userId, type }: AllTransactionPayload) => `agreement/getAllStatements/${userId}/${type}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['AllTransaction'],
    }),

    getTenantTransactionList: builder.query({
      query: (userId: number | string) => `product/requestedBookingForProduct/${userId}`,
      transformResponse: (response: { data: any }) =>
        response?.data?.map((item: any, index: number) => {
          const details = propertyDetailsHandler(item.product_details)
          const { subcategory, rental_type } = details
          const { period, booking_start_date } = item

          return {
            ...item,
            product_details: item.product_details,
            details,
            subcategory,
            rental_type,
            period: handelPeriod(period),
            booking_start_date: moment(booking_start_date).format('DD-MMM-YYYY'),
            id: index,
          }
        }),
      transformErrorResponse: response => response,
      providesTags: ['AllTenantTransaction'],
    }),
    getLandlordTransactionList: builder.query({
      query: (userId: number | string) => `product/getmyproductbooking/${userId}`,
      transformResponse: (response: { data: any }) =>
        response?.data?.map((item: any, index: number) => {
          const { period, start_date } = item
          const details = propertyDetailsHandler(item.details)
          const { subcategory, rental_type } = details
          return {
            ...item,
            details,
            subcategory,
            rental_type,
            period: handelPeriod(period),
            start_date: moment(start_date).format('DD-MMM-YYYY'),
            id: index,
          }
        }),
      transformErrorResponse: response => response,
      providesTags: ['AllLandlordTransaction'],
    }),
    getAllStatement: builder.query({
      query: ({ landlordId, propertyId, prams = {} }: AllStatementPayload) =>
        addQueryParams(`agreement/myRentalPropertyStatement/${landlordId}/${propertyId}`, prams),
      transformResponse: (response: { data: any }) =>
        response?.data?.map((item: any) => {
          let { statement_id, payment_date, payable_amount } = item
          const month = moment(payment_date).format('MMMM')
          const year = moment(payment_date).format('YYYY')
          payable_amount = handelAmount(payable_amount)
          payment_date = moment(payment_date).format('DD-MMM-YYYY')
          return { ...item, id: statement_id, month, year, payable_amount, payment_date }
        }),
      transformErrorResponse: response => response,
      providesTags: ['AllLandlordTransaction'],
    }),
    // get statement details
    // View receipt TT & LL: /agreement/rentalPropertyStatementReceipt/${statementld}/${num}
    getStatementDetails: builder.query({
      query: ({ statementId, userType }: StatementDetailsPayload) =>
        `agreement/rentalPropertyStatementReceipt/${statementId}/${getUserTypeNumber(userType)}`,
      transformResponse: (response: { data: any }) => {
        const { data } = response
        let { monthly_rental, sub_total, total_amount } = data
        let total_amount_text = handelAmountWithText(total_amount)
        monthly_rental = handelAmount(monthly_rental)
        sub_total = handelAmount(sub_total)
        total_amount = handelAmount(total_amount)

        return {
          ...data,
          total_amount_text,
          monthly_rental,
          sub_total,
          total_amount,
        }
      },
      transformErrorResponse: response => response,
      providesTags: ['StatementDetails'],
    }),
    updateProperty: builder.mutation({
      query: ({ productId, data }) => ({
        url: `product/update/${productId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    //getAutosuggestion
    getAutosuggestion: builder.query({
      query: () => `product/getAutosuggestion`,
      transformResponse: (response: { data: any }) => response.data.map((item: any) => ({ ...item, label: item.term })),
      transformErrorResponse: response => response,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPropertyDetailsQuery,
  useFilterMutation,
  useCreatePropertyMutation,
  useGetMyAddedPropertyQuery,
  useGetMyPropertyListQuery,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
  useGetAllTransactionQuery,
  useGetTenantTransactionListQuery,
  useGetLandlordTransactionListQuery,
  useGetAllStatementQuery,
  useGetStatementDetailsQuery,
  useGetAutosuggestionQuery,
} = propertyApi
