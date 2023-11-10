// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '@/store/config'

// Define a service using a base URL and expected endpoints
export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery,
  tagTypes: ['Chats'],
  endpoints: builder => ({
    tenantLandlordProgressInfo: builder.mutation({
      query: data => ({
        url: `chat/getProgressInfo`,
        method: 'POST',
        body: data,
      }),
    }),

    getAppointmentDetails: builder.query({
      query: (appointmentId: number | string) => `appointment-details/${appointmentId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),
    //GET THREAD INFO FOR USER
    getAppointmentList: builder.query({
      query: () => `appointment-list`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),
    createAppointment: builder.mutation({
      query: data => ({
        url: `appointment-create`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAppointment: builder.mutation({
      query: ({ appointmentId, data }) => ({
        url: `appointment-update/${appointmentId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    toggleAppointment: builder.mutation({
      query: ({ appointmentId, data }) => ({
        url: `appointment-accept-cancel/${appointmentId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createPayment: builder.mutation({
      query: data => ({
        url: `Payment/newPayment`,
        method: 'POST',
        body: data,
      }),
    }),
    hdbApproval: builder.mutation({
      query: data => ({
        url: `product/savePropertyHdbDocument`,
        method: 'POST',
        body: data,
      }),
    }),
    getHdbDetails: builder.query({
      query: (propertyId: number | string) => `product/getHdbPropertyDocument/${propertyId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),

    createInsurance: builder.mutation({
      query: data => ({
        url: `product/saveServiceChargeDocument`,
        method: 'POST',
        body: data,
      }),
    }),
    createMakeOffer: builder.mutation({
      query: data => ({
        url: `/make-offer-create`,
        method: 'POST',
        body: data,
      }),
    }),

    //RENTAL OFFER ACCEPT
    rentalOfferAccept: builder.mutation({
      query: ({ rentalId, data }) => ({
        url: `make-offer-accept/${rentalId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    //RENTAL OFFER REJECTED
    rentalOfferReject: builder.mutation({
      query: ({ rentalId, data }) => ({
        url: `make-offer-reject/${rentalId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    //RENTAL OFFER UPDATE
    rentalOfferUpdate: builder.mutation({
      query: ({ rentalId, data }) => ({
        url: `make-offer-update/${rentalId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    //RENTAL OFFER DETAILS
    rentalOfferDetails: builder.query({
      query: ({ propertyId, userId }) => `/make-offer-details/${propertyId}/${userId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),

    createInventory: builder.mutation({
      query: data => ({
        url: `/inventory`,
        method: 'POST',
        body: data,
      }),
    }),
    inventoryDetails: builder.query({
      query: (propertyId: number | string) => `/inventoryList/${propertyId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),
    conditionDetails: builder.query({
      query: (propertyId: number | string) => `/property-condition-report-list/${propertyId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),

    createConditionReport: builder.mutation({
      query: data => ({
        url: `/property-condition-report-save`,
        method: 'POST',
        body: data,
      }),
    }),
    createAgreementPrepare: builder.query({
      query: (userId: number | string) => `agreement/agreementCreate/${userId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),

    createAgreement: builder.mutation({
      // formdata
      query: data => ({
        url: `agreement/create`,
        method: 'POST',
        body: data,
      }),
    }),

    updateAgreement: builder.mutation({
      query: ({ agreementId, data }) => ({
        url: `agreement/agreementUpdate/${agreementId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteAgreement: builder.mutation({
      // agreementId
      query: data => ({
        url: `agreement/delete/`,
        method: 'POST',
        body: data,
      }),
    }),
    /* detailsAgreement: builder.mutation({
      // agreementId
      query: ({agreementId, data}) => ({
        url: `agreement/detail/${agreementId}`,
        method: 'POST',
        body: data,
      }),
    }), */
    getDetailsAgreement: builder.query({
      query: (agreementId: number | string) => `agreement/detail/${agreementId}`,
      transformResponse: (response: { data: any }) => response.data,
      transformErrorResponse: response => response,
      providesTags: ['Chats'],
    }),

    //GET THREAD INFO FOR USER CHAT PROGRESS
    getThread: builder.mutation({
      query: data => ({
        url: `chat/getThread`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateAppointmentMutation,
  useGetAppointmentDetailsQuery,
  useGetAppointmentListQuery,
  useToggleAppointmentMutation,
  useUpdateAppointmentMutation,
  useGetThreadMutation,
  useHdbApprovalMutation,
  useGetHdbDetailsQuery,
  useCreateInsuranceMutation,
  useCreatePaymentMutation,
  useTenantLandlordProgressInfoMutation,
  useCreateMakeOfferMutation,
  useCreateInventoryMutation,
  useInventoryDetailsQuery,
  useCreateConditionReportMutation,
  useConditionDetailsQuery,
  useCreateAgreementMutation,
  useUpdateAgreementMutation,
  useDeleteAgreementMutation,
  // useDetailsAgreementMutation,
  useCreateAgreementPrepareQuery,
  useRentalOfferAcceptMutation,
  useRentalOfferRejectMutation,
  useRentalOfferUpdateMutation,
  useRentalOfferDetailsQuery,
  useGetDetailsAgreementQuery
} = chatApi

// //UPDATE SCHEDULE
// export async function scheduleCancel(formData) {
//   const { data } = await API.put(
//     `appointment-accept-cancel/${formData.id}`,
//     formData
//   )
//   return data
// }
