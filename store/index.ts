import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import {
  authApi,
  chatApi,
  documentApi,
  fileUploadApi,
  homeApi,
  myPropertyApi,
  propertyApi,
  userApi,
  wishlistApi,
  homePreferenceApi,
  corporateApi,
} from './features'
import { api, toast } from './middleware'
import reducer from './reducer'

const store: any = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(homeApi.middleware)
      .concat(fileUploadApi.middleware)
      .concat(authApi.middleware)
      .concat(chatApi.middleware)
      .concat(propertyApi.middleware)
      .concat(userApi.middleware)
      .concat(myPropertyApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(documentApi.middleware)
      .concat(homePreferenceApi.middleware)
      .concat(corporateApi.middleware)
      .concat(toast)
      .concat(api),
})

setupListeners(store.dispatch)

export type StoreGetState = typeof store.getState

export type StoreDispatch = typeof store.dispatch

export default store

export * from './features'
