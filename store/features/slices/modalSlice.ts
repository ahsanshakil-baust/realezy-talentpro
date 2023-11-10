import { Modal, StoreDispatch, StoreGetState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type ModalType = {
  list: Modal[]
}

const initialState : ModalType = {
  list: []
};

// modal data structure
// id? --> index of the modal (Auto)
// open
// children
// className

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    modalCreated: (modals, action: PayloadAction<Modal>) => {
      modals.list.push(action.payload)
    },
    modalOpened: (modals, action: PayloadAction<string>) => {
      modals.list = modals.list.map((modal: Modal)=>{
        if(modal.name === action.payload){
          return {...modal, open: true}
        }
        return modal
      })
    },
    modalClosed: (modals, action: PayloadAction<string>) => {
      // find modal by id
      modals.list = modals.list.filter((modal: Modal) => modal.name !== action.payload)
    },
  },
})

// Exports all actions
export const { modalCreated, modalOpened, modalClosed } = modalSlice.actions

export default modalSlice.reducer


export const createModal = (modal: Modal) => modalCreated(modal)


/**
 * @param name: string
 * @param headingEnabled?: boolean
 * @param children?: <></>
 * @param open?: boolean
 * @param className?: string
 * @param headingLeft?: any
 * @param headingRight?: any
 * @param size?: "small"|"medium"|"large"
 * @returns 
 */
export const showModal = (modal: Modal) => (dispatch: StoreDispatch, getState: StoreGetState) => {
  const modals = getState().entities.modals.list
  const modalSelected = modals.find((m: any) => m.name === modal.name)
  if(!modalSelected){
    return dispatch(createModal(modal))
  }
  return dispatch(modalOpened(modal.name))
}

export const hideModal = (name: string) => modalClosed(name)

