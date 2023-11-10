// import { StoreDispatch, StoreGetState } from "@/types"
import { createSlice, Draft } from '@reduxjs/toolkit'

export interface SideBarState {
  show: boolean
}

/**
 * Default state object with initial values.
 */
const initialState: SideBarState = { show: true } as const

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    sideBarToggled: (auth: Draft<typeof initialState>) => {
      auth.show = !auth.show
    },
    sideBarShowed: (auth: Draft<typeof initialState>) => {
      auth.show = true
    },
    sideBarHided: (auth: Draft<typeof initialState>) => {
      auth.show = false
    },
  },
})

// Exports all actions
export const { sideBarToggled, sideBarShowed, sideBarHided } = sideBarSlice.actions

export default sideBarSlice.reducer

// Action Creators
// type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

export const toggleSideBar = () => sideBarToggled()

export const showSideBar = () => sideBarShowed()

export const hideSideBar = () => sideBarHided()
