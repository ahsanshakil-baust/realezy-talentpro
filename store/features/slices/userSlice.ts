// import { StoreDispatch, StoreGetState } from "@/types"
import { LOCAL_STORAGE_USER_KEY } from '@/constants'
import { UserType } from '@/types'
import { isBrowser } from '@/util'
import { createSlice, Draft } from '@reduxjs/toolkit'

export interface UserState {
  type: UserType
}

/**
 * Default state object with initial values.
 */
const userStr = isBrowser() ? localStorage.getItem(LOCAL_STORAGE_USER_KEY) : null
const user = isBrowser() ? (userStr && userStr !== 'undefined' ? JSON.parse(userStr) : {}) : {}

// const initialState: UserState = { type: 'tenant', ...user } as const
const initialState: UserState = { type: 'tenant' } as const

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userTypeToggled: (user: Draft<typeof initialState>) => {
      user.type = user.type === 'tenant' ? 'landlord' : 'tenant'
    },
    userTypeLandlord: (user: Draft<typeof initialState>) => {
      user.type = 'landlord'
    },
    userTypeTenant: (user: Draft<typeof initialState>) => {
      user.type = 'tenant'
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      action => action.type.startsWith('user/'),
      user => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
      }
    )
  },
})

// Exports all actions
export const { userTypeToggled, userTypeLandlord, userTypeTenant } = userSlice.actions

export default userSlice.reducer

// Action Creators
// type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

export const toggleUserType = () => userTypeToggled()

export const switchUserTypeLandlord = () => userTypeLandlord()

export const switchUserTypeTenant = () => userTypeTenant()
