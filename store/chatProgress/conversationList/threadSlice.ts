import { createSlice } from '@reduxjs/toolkit'

const initialState : any = {
  selectedThread : {}
}

export const threadSlice = createSlice({
  name: 'threadSlice',
  initialState,
  reducers: {
    setSelectedThread: (state, action) => {
      state.selectedThread = JSON.parse(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedThread } = threadSlice.actions

export default threadSlice.reducer
