// import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// type InitialState = string[]

// const initialState = [] as InitialState

// const auth = createSlice({
//   name: 'sliderLists',
//   initialState,
//   reducers: {
//     setListArray: (state, action: PayloadAction<InitialState>) => {
//       return action.payload
//     },
//   },
// })

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SliderState {
  sliderList: string[]
}

const initialState: SliderState = {
  sliderList: [],
}

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSliderList: (state, action: PayloadAction<string[]>) => {
      state.sliderList = [...action.payload]
    },
  },
})

// Exports all actions
export const { setSliderList } = sliderSlice.actions

export default sliderSlice.reducer

// Action Creators
// type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void
