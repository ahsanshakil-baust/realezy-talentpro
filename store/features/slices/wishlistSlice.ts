import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  data: {}
}
/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    updateWishList: (state, action: PayloadAction<any>) => {
      state.data = action.payload
    }
  },
})

// Exports all actions
export const { updateWishList } = wishlistSlice.actions

export default wishlistSlice.reducer

// // Action Creators
// // type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

// export const toggleSweetAlert = () => sweetAlertToggled()

// export const showSweetAlert = (props: any) => sweetAlertShowed(props)

// export const hideSweetAlert = () => sweetAlertHided()
