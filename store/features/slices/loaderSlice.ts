// import { StoreDispatch, StoreGetState } from "@/types"
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

export interface loaderState {
  show: boolean
  title: string
}
/**
 * Default state object with initial values.
 */

const initialState: loaderState = {
  show: false,
  title: '',
} as const

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    loaderToggled: (loader: Draft<typeof initialState>) => {
      loader.show = !loader.show
    },
    loaderShowed: (loader: Draft<typeof initialState>, action: PayloadAction<any>) => {
      loader.title = action.payload
      loader.show = true
    },
    loaderHided: (loader: Draft<typeof initialState>) => {
      // loader.title = ''
      loader.show = false
    },
  },
})

// Exports all actions
export const { loaderToggled, loaderShowed, loaderHided } = loaderSlice.actions

export default loaderSlice.reducer

// Action Creators
// type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

export const toggleLoader = () => loaderToggled()

export const showLoader = (title: string) => loaderShowed(title)

export const hideLoader = () => loaderHided()
