// Need to use the React-specific entry point to import createApi
import baseQuery from '@/store/config'
import { handelPeriod, propertyDetailsHandler } from '@/util'
import { createApi } from '@reduxjs/toolkit/query/react'
import moment from 'moment'

// Define a service using a base URL and expected endpoints
export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery,
  tagTypes: ['LandlordDocuments', 'TenantDocuments'],
  endpoints: builder => ({
    // All Doc Landlord : https://dev-api.real-ezy.com/index.phpagreement/landlordAgreementList/440
    getLandlordDocuments: builder.query({
      query: (userId: number | string) => `agreement/landlordAgreementList/${userId}`,
      transformResponse: (response: { data: any }) => {
        const { data: agreements } = response
        return agreements?.map((agreement: any) => {
          let { product_details, offerData, start_date } = agreement
          let { tenancy_period } = offerData
          product_details = propertyDetailsHandler(product_details)
          let { subcategory, rental_type } = product_details

          return {
            ...agreement,
            product_details,
            subcategory,
            rental_type,
            period: handelPeriod(tenancy_period),
            start_date: moment(start_date).format('DD-MMM-YYYY'),
          }
        })
      },
      transformErrorResponse: response => response,
      providesTags: ['LandlordDocuments'],
    }),
    // All Doc Tenant: https://dev-api.real-ezy.com/index.phpagreement/tenantAgreementList/441
    getTenantDocuments: builder.query({
      query: (userId: number | string) => `agreement/tenantAgreementList/${userId}`,
      transformResponse: (response: { data: any }) => {
        const { data: agreements } = response
        return agreements?.map((agreement: any) => {
          let { product_details, offerData, start_date } = agreement
          let { tenancy_period } = offerData
          product_details = propertyDetailsHandler(product_details)
          let { subcategory, rental_type } = product_details

          return {
            ...agreement,
            product_details,
            subcategory,
            rental_type,
            period: handelPeriod(tenancy_period),
            start_date: moment(start_date).format('DD-MMM-YYYY'),
          }
        })
      },
      transformErrorResponse: response => response,
      providesTags: ['TenantDocuments'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLandlordDocumentsQuery, useGetTenantDocumentsQuery } = documentApi
