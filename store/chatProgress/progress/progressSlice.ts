import { createSlice } from '@reduxjs/toolkit'
import tenantFactory from './tenantFactory'

const initialState: any = {
  progress: {},
  status: {},
}

export const progressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      // state.progress = action.payload
      state.progress = action.payload
      state.status = tenantFactory(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProgress } = progressSlice.actions

export default progressSlice.reducer
