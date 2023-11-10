import { Middleware } from '@reduxjs/toolkit'
import * as actions from '../features/slices/apiSlice'

export const api: Middleware =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action)

    const { service, data, onStart, onSuccess, onError } = action.payload

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {
      const response = data ? await service(data) : await service()
      if (response.status === 'fail') {
        // General
        dispatch(actions.apiCallFailed(response.message))
        // Specific
        if (onError) dispatch({ type: onError, payload: response.message })
      } else {
        // General
        dispatch(actions.apiCallSuccess(response))
        // Specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response })
      }
    } catch (error: any) {
      // General
      dispatch(actions.apiCallFailed(error.message))
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message })
    }
  }
