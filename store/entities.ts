import { combineReducers } from '@reduxjs/toolkit'
import {
  sweetAlertSlice,
  filterSlice,
  modalSlice,
  userSlice,
  documentSlice,
  wishlistSlice,
  loaderSlice,
  sliderSlice,
} from './features'
import { conversationSlice, threadSlice, progressSlice } from './chatProgress'

export default combineReducers({
  [sweetAlertSlice.name]: sweetAlertSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [conversationSlice.name]: conversationSlice.reducer,
  [threadSlice.name]: threadSlice.reducer,
  [documentSlice.name]: documentSlice.reducer,
  [wishlistSlice.name]: wishlistSlice.reducer,
  [progressSlice.name]: progressSlice.reducer,
  [loaderSlice.name]: loaderSlice.reducer,
  [sliderSlice.name]: sliderSlice.reducer,
})
