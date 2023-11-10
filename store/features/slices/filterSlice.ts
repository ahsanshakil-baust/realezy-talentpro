import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  "bathroom": "Any",
  "bedroom" : "Any",
  "district": "",
  "filterSort": "created_at",
  "furnishing": "Any",
  "hdb": "any",
  "page_number": 1,
  "per_page": 10,
  "price_end": 10000,
  "price_start": 100,
  "sub_category": "Any",
  "rental_type": "",
  "unit_area": "any",
  "value": ""
}
/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    updatePropertyType: (state, action: PayloadAction<string>) => {
      state.sub_category = action.payload
    },
    updateRentalType: (state, action: PayloadAction<string>) => {
      state.rental_type = action.payload
    },
    updateDistrict: (state, action: PayloadAction<string>) => {
      state.district = action.payload
    },
    updatePriceStart: (state, action: PayloadAction<number>) => {
      state.price_start = action.payload
    },
    updatePriceEnd: (state, action: PayloadAction<number>) => {
      state.price_end = action.payload
    },
    updateBathroom: (state, action: PayloadAction<string>) => {
      state.bathroom = action.payload
    },
    updateBedroom: (state, action: PayloadAction<string>) => {
      state.bedroom = action.payload
    },
    updateFurnishing: (state, action: PayloadAction<string>) => {
      state.furnishing = action.payload
    },
    updateFilterSort: (state, action: PayloadAction<string>) => {
      state.filterSort = action.payload
    },
    updateUnitArea: (state, action: PayloadAction<string>) => {
      state.unit_area = action.payload
    },
    updateHdb: (state, action: PayloadAction<string>) => {
      state.hdb = action.payload
    },
    updatePerPage: (state, action: PayloadAction<number>) => {
      state.per_page = action.payload
    },
    updatePageNumber: (state, action: PayloadAction<number>) => {
      state.page_number = action.payload
    },
    updateMrt: (state, action: PayloadAction<string>) => {
      console.log("Need to implement")
    }
  },
})

// Exports all actions
export const { updateSearchText, updatePropertyType, updateRentalType, updateDistrict, updateBathroom, updateBedroom, updateFilterSort, updateFurnishing, updateHdb, updateMrt, updatePageNumber, updatePerPage, updatePriceEnd, updatePriceStart, updateUnitArea } = filterSlice.actions

export default filterSlice.reducer

// // Action Creators
// // type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

// export const toggleSweetAlert = () => sweetAlertToggled()

// export const showSweetAlert = (props: any) => sweetAlertShowed(props)

// export const hideSweetAlert = () => sweetAlertHided()
