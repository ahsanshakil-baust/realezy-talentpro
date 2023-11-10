// import { StoreDispatch, StoreGetState } from "@/types"
import { DocumentType } from '@/types'
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

export interface documentState {
  modal: boolean
  type: DocumentType | ''
  nric_front: any
  nric_back: any
  iras_cpf: any
  passport: any
  credit_report: any
  pass_id_front: any
  pass_id_back: any
  sponsor_letter: any
  admission_letter: any
  matriculation_card: any
  salary_slip: any
}

export interface payloadProps {
  type: DocumentType
  file?: any
  url?: string
}

/**
 * Default state object with initial values.
 */

const initialState: documentState = {
  modal: false,
  type: '',
  nric_front: null,
  nric_back: null,
  iras_cpf: null,
  passport: null,
  credit_report: null,
  pass_id_front: null,
  pass_id_back: null,
  sponsor_letter: null,
  admission_letter: null,
  matriculation_card: null,
  salary_slip: null,
} as const

/* 


  nric_front: null,
  nric_back: null,
  iras_cpf: null,
  passport: null,
  credit_report: null,
  pass_id_front: null,
  pass_id_back: null,
  sponsor_letter: null,
  admission_letter: null,
  matriculation_card: null,
  salary_slip: null,


*/

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    documentModalClosed: (document: Draft<typeof initialState>, action: PayloadAction<payloadProps>) => {
      document.type = action.payload.type
      document.modal = false
    },
    documentModalOpened: (document: Draft<typeof initialState>, action: PayloadAction<payloadProps>) => {
      document.type = action.payload.type
      document.modal = true
    },
    documentUploaded: (document: Draft<typeof initialState>, action: PayloadAction<payloadProps>) => {
      document[action.payload.type] = {
        ...document[action.payload.type],
        file: action.payload.file,
      }
    },
    documentDeleted: (document: Draft<typeof initialState>, action: PayloadAction<payloadProps>) => {
      document.type = ''
      document[action.payload.type] = null
    },
    documentUrlUpdated: (document: Draft<typeof initialState>, action: PayloadAction<payloadProps>) => {
      document[action.payload.type] = {
        ...document[action.payload.type],
        url: action.payload.url,
      }
    },
  },
})

// Exports all actions
export const { documentModalClosed, documentModalOpened, documentUploaded, documentDeleted, documentUrlUpdated } =
  documentSlice.actions

export default documentSlice.reducer

// Action Creators
// type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

export const closeDocumentModal = (type: DocumentType) =>
  documentModalClosed({
    type,
  })

export const openDocumentModal = (type: DocumentType) =>
  documentModalOpened({
    type,
  })

export const uploadDocument = (type: DocumentType, file: any) =>
  documentUploaded({
    type,
    file,
  })

export const deleteDocument = (type: DocumentType) =>
  documentDeleted({
    type,
  })

export const updateDocumentUrl = (type: DocumentType, url: string) =>
  documentUrlUpdated({
    type,
    url,
  })
