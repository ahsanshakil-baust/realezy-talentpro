import { StoreGetState } from '@/types'
import entities from './entities'
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

const reducer: StoreGetState = {
  entities,
  [homeApi.reducerPath]: homeApi.reducer,
  [propertyApi.reducerPath]: propertyApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [myPropertyApi.reducerPath]: myPropertyApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [homePreferenceApi.reducerPath]: homePreferenceApi.reducer,
  [corporateApi.reducerPath]: corporateApi.reducer,
}

export default reducer
