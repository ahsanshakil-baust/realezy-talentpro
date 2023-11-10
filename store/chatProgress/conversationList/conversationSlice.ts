import { createSlice, current } from '@reduxjs/toolkit'

const initialState : any = {
  threadList: []
}

export const conversationSlice = createSlice({
  name: 'threadList',
  initialState,
  reducers: {
    setUserChatThreadList: (state, action) => {
      const currentState = current(state).threadList
      action.payload.forEach((element: any) => {
        state.threadList.push(element)
      })
      // state.threadList = action.payload
    },
    addUserChatThreadList: (state, action) => {
      const currentState = current(state).threadList
      const res = currentState.find((element: any) => element.id === action.payload.id)
      if(!res) state.threadList.push(action.payload)
    },
    removeUserChatThreadList: (state, action) => {
      const currentState = current(state).threadList
      const res = currentState.filter((element: any) => element.id !== action.payload.id)
      state.threadList = res
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserChatThreadList, addUserChatThreadList, removeUserChatThreadList } = conversationSlice.actions

export default conversationSlice.reducer
