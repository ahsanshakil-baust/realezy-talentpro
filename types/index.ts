import { ReactNode } from 'react'
import { Action, AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import { StoreDispatch as StoreDispatchType, StoreGetState as StoreGetStateType } from '@/store'
import { NextPage } from 'next'
import { DOCUMENT_TYPES } from '@/constants'

export type UserType = 'tenant' | 'landlord'

// Redux
export type StoreGetState = StoreGetStateType

export type StoreState = ReturnType<StoreGetStateType>

export type StoreDispatch = StoreDispatchType

export type StoreThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action<string>>

export type StoreThunkDispatch = ThunkDispatch<StoreState, any, AnyAction>

// Documents
export type DocumentType = (typeof DOCUMENT_TYPES)[number]

export type Modal = {
  name: string
  headingEnabled?: boolean
  children?: any
  open?: boolean
  className?: string
  headingLeft?: any
  headingRight?: any
  size?: "small"|"medium"|"large"
}

// import type { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: NextPage) => ReactNode
}

type Option = {
  label: string
  value: string
}

export type Field = {
  label: string
  name: string
  type: string
  placeholder?: string
  defaultValue?: string
  error?: any
  className?: string[]
  labelClassName?: string
  containerClass?: string
  refCallback?: any
  children?: any
  rows?: string
  rules?: any
  xs?: number
  row?: boolean
  variant?: string
  options?: Option[]
  onChangeHandler?: any
  onChangeCustom?: any
  condition?: any
}
