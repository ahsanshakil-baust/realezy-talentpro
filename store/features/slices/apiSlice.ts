import { createAction } from '@reduxjs/toolkit'

type ApiCallBeganPayload = {
  service: any
  data?: any
  onStart?: string
  onSuccess?: string
  onError?: string
}

export const apiCallBegan = createAction<ApiCallBeganPayload>('api/callBegan')
export const apiCallSuccess = createAction('api/callSuccess')
export const apiCallFailed = createAction('api/callFailed')
