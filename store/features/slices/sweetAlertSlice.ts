// import { StoreDispatch, StoreGetState } from "@/types"
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { SweetAlert2Props } from 'react-sweetalert2'

export interface SweetAlertState {
  swalProps: any
}
/**
 * Default state object with initial values.
 */
const swalProps: SweetAlert2Props = {}
const initialState: SweetAlertState = { swalProps } as const

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const sweetAlertSlice = createSlice({
  name: 'sweetAlert',
  initialState,
  reducers: {
    sweetAlertToggled: (sweetAlert: Draft<typeof initialState>) => {
      sweetAlert.swalProps.show = !sweetAlert.swalProps.show
    },
    sweetAlertShowed: (sweetAlert: Draft<typeof initialState>, action: PayloadAction<any>) => {
      sweetAlert.swalProps = action.payload
      sweetAlert.swalProps.show = true
    },
    sweetAlertHided: (sweetAlert: Draft<typeof initialState>) => {
      sweetAlert.swalProps = {}
    },
  },
})

// Exports all actions
export const { sweetAlertToggled, sweetAlertShowed, sweetAlertHided } = sweetAlertSlice.actions

export default sweetAlertSlice.reducer

// Action Creators
// type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

export const toggleSweetAlert = () => sweetAlertToggled()

export const showSweetAlert = (props: any) => sweetAlertShowed(props)

export const hideSweetAlert = () => sweetAlertHided()
