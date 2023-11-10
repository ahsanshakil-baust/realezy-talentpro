// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAdminQuery } from '@/store/config'

// Define a service using a base URL and expected endpoints
export const corporateApi: any = createApi({
    reducerPath: 'corporateApi',
    baseQuery: baseAdminQuery,
    tagTypes: ['Corporate'],
    endpoints: builder => ({

        /**
         * @description Get Corporate RFQ List
         * @param multiple params
         * @returns RFQ List object
         */
        getRfqFilter: builder.query({
            query: (params:
                {
                    area_id?: string,
                    bedroom?: number,
                    min_floor_size?: number,
                    max_floor_size?: number,
                    search?: string,
                    district_id?: number,
                    rental_type?: string,
                    property_type?: string,
                    rental_period?: number,
                    bathroom?: number,
                    no_of_occupiers?: number,
                    duration?: number,
                    min_budget?: number,
                    max_budget?: number,
                    user_id?: number
                }) => {
                const queryParams = new URLSearchParams();
                if (params.area_id) queryParams.append('area_id', String(params.area_id));
                if (params.bedroom) queryParams.append('bedroom', String(params.bedroom));
                if (params.min_floor_size) queryParams.append('min_floor_size', String(params.min_floor_size));
                if (params.max_floor_size) queryParams.append('max_floor_size', String(params.max_floor_size));
                if (params.search) queryParams.append('search', String(params.search));
                if (params.district_id) queryParams.append('district_id', String(params.district_id));
                if (params.rental_type) queryParams.append('rental_type', String(params.rental_type));
                if (params.property_type) queryParams.append('property_type', String(params.property_type));
                if (params.rental_period) queryParams.append('rental_period', String(params.rental_period));
                if (params.bathroom) queryParams.append('bathroom', String(params.bathroom));
                if (params.no_of_occupiers) queryParams.append('no_of_occupiers', String(params.no_of_occupiers));
                if (params.duration) queryParams.append('duration', String(params.duration));
                if (params.min_budget) queryParams.append('min_budget', String(params.min_budget));
                if (params.max_budget) queryParams.append('max_budget', String(params.max_budget));
                if (params.user_id) queryParams.append('user_id', String(params.user_id));

                return `api/v2/corporate/rfq/filter?${queryParams.toString()}`;
            },
            transformResponse: (response: { data: any }) => response.data,
            transformErrorResponse: response => response,
            providesTags: ['Corporate'],
        }),

        /**
         * @description Get Corporate RFQ Details
         * @param homePreferenceId
         * @returns RFQ Details object
         */
        getRfqDetails: builder.query({
            query: (homePreferenceId: number | string) => `api/v2/corporate/rfq/rfq-details/${homePreferenceId}`,
            transformResponse: (response: { data: any }) => response.data,
            transformErrorResponse: response => response,
            providesTags: ['Corporate'],
        }),

        /**
         * @description Get Corporate RFQ Property List
         * @param userId
         * @returns RFQ Property List object
         */
        getRfqPropertyList: builder.query({
            query: (
                params: {
                    user_id: number | string,
                    bedroom?: number,
                    bathroom?: number,
                    floor_min_size?: number,
                    floor_max_size?: number,
                    rental_min_price?: number,
                    rental_max_price?: number,
                }) => {
                const { user_id, bedroom, bathroom, floor_min_size, floor_max_size, rental_min_price, rental_max_price } = params;
                let queryString = `api/v2/corporate/rfq/property-list/${user_id}`;

                if (bedroom) {
                    queryString += `?bedroom=${bedroom}`;
                }

                if (bathroom) {
                    queryString += `&bathroom=${bathroom}`;
                }

                if (floor_min_size) {
                    queryString += `&floor_min_size=${floor_min_size}`;
                }

                if (floor_max_size) {
                    queryString += `&floor_max_size=${floor_max_size}`;
                }

                if (rental_min_price) {
                    queryString += `&rental_min_price=${rental_min_price}`;
                }

                if (rental_max_price) {
                    queryString += `&rental_max_price=${rental_max_price}`;
                }

                return queryString;
            },
            transformResponse: (response: { data: any }) => response.data,
            transformErrorResponse: response => response,
            providesTags: ['Corporate'],
        }),

        /**
         * @description Corporate RFQ Property Create
         * @param propertyId
         * @returns RFQ Property Created object
         */
        createRfqChatThread: builder.mutation({
            query: (data) => ({
                url: 'api/v2/corporate/rfq/chat-thraed-create',
                method: 'POST',
                body: data,
            }),
        }),

        /**
         * @description Get Corporate User List 
         * @param parentId
         * @returns Corporate user list object
         */
        // ============
        getCorporateUserList: builder.query({
            query: (parentId: number | string) => `api/v2/corporate/user/${parentId}`,
            transformResponse: (response) => response,
            transformErrorResponse: response => response,
            providesTags: ['Corporate'],
        }),

        /**
         * @description Get Corporate User Details
         * @param userId
         * @returns Corporate user details object
         */
        getCorporateUserDetails: builder.query({
            query: ({ userId, parentId }: any) => `api/v2/corporate/user/${userId}/${parentId}`,
            transformResponse: (response: { data: any }) => response.data,
            transformErrorResponse: response => response,
            providesTags: ['Corporate'],
        }),

        /**
         * @description Create Corporate User
         * @param user
         * @returns Corporate user created object
         */
        createCorporateUser: builder.mutation({
            query: data => ({
                url: 'api/v2/corporate/user',
                method: 'POST',
                body: data,
            }),
        }),

        /**
         * @description Update Corporate User
         * @param user
         * @returns Corporate user updated object
         */
        updateCorporateUser: builder.mutation({
            query: ({ userId, data }) => ({
                url: `api/v2/corporate/user/${userId}`,
                method: 'PUT',
                body: data,
            }),
        }),

        /**
         * @description Delete Corporate User
         * @param userId
         * @returns Corporate user deleted object
         */
        deleteCorporateUser: builder.mutation({
            query: ({ userId, parentId }: any) => ({
                url: `api/v2/corporate/user/${userId}/${parentId}`,
                method: 'DELETE',
            }),
        }),

        /**
         * @description Update Corporate User Status
         * @param parentId
         * @returns Corporate updated object
         */
        updateCorporateUserStatus: builder.mutation({
            query: ({ userId, data }) => ({
                url: `corporate/active-or-inactive/${userId}`,
                method: 'PUT',
                body: data,
            }),
        }),

        /**
         * @description Get Corporate Property List 
         * @param parentId
         * @returns Corporate user list object
         */
        getCorporatePropertyList: builder.query({
            query: (parentId: number | string) => `api/v2/corporate/property/${parentId}`,
            transformResponse: (response: { data: any }) => response.data,
            transformErrorResponse: response => response,
            providesTags: ['Corporate'],
        }),

        /**
         * @description Get Corporate Property Details
         * @param productId
         * @returns Corporate user details object
         */
        getCorporatePropertyDetails: builder.query({
            query: (productId: any) => `api/v2/corporate/property/${productId}`,
            transformResponse: (response: { data: any }) => response.data,
            transformErrorResponse: response => response,
            providesTags: ['Corporate'],
        }),

        /**
         * @description Create Corporate Property
         * @param data
         * @returns Corporate user created object
         */
        createCorporateProperty: builder.mutation({
            query: data => ({
                url: 'api/v2/corporate/property',
                method: 'POST',
                body: data,
            }),
        }),

        /**
         * @description Update Corporate Property
         * @param data
         * @returns Corporate user updated object
         */
        updateCorporateProperty: builder.mutation({
            query: ({ productId, data }) => ({
                url: `corporate/property/${productId}`,
                method: 'PUT',
                body: data,
            }),
        }),

        /**
         * @description Delete Corporate Property
         * @param productId
         * @returns Corporate user deleted object
         */
        deleteCorporateProperty: builder.mutation({
            query: productId => ({
                url: `corporate/property/${productId}`,
                method: 'DELETE',
            }),
        }),

        /**
         * @description Update Corporate Property Status
         * @param productId
         * @returns Corporate updated object
         */
        updateCorporatePropertyStatus: builder.mutation({
            query: ({ productId, data }) => ({
                url: `corporate/property/status-publish/${productId}`,
                method: 'PUT',
                body: data,
            }),
        }),

        /**
         * @description Store Corporate Bulk Property 
         * @param parentId
         * @returns Corporate property list object
         */
        storeCorporateBulkProperty: builder.mutation({
            query: data => ({
                url: 'api/v2/corporate/import-bulk-store',
                method: 'POST',
                body: data,
            }),
        }),

        /**
         * @description Assign Corporate Property 
         * @param parentId
         * @returns Corporate property list object
         */
        assignCorporateProperty: builder.mutation({
            query: data => ({
                url: 'api/v2/corporate/assign-property',
                method: 'POST',
                body: data,
            }),
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetRfqFilterQuery,
    useGetRfqDetailsQuery,
    useGetRfqPropertyListQuery,
    useCreateRfqChatThreadMutation,
    useGetCorporateUserListQuery,
    useGetCorporateUserDetailsQuery,
    useCreateCorporateUserMutation,
    useDeleteCorporateUserMutation,
    useUpdateCorporateUserStatusMutation,
    useGetCorporatePropertyListQuery,
    useGetCorporatePropertyDetailsQuery,
    useCreateCorporatePropertyMutation,
    useUpdateCorporatePropertyMutation,
    useDeleteCorporatePropertyMutation,
    useUpdateCorporatePropertyStatusMutation,
    useStoreCorporateBulkPropertyMutation,
    useAssignCorporatePropertyMutation,
    useUpdateCorporateUserMutation
} = corporateApi
