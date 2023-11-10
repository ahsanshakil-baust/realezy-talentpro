import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, FormControl } from '@mui/material'
import { ButtonStyles } from '../Styles'

import Landed from './images/Landed.png'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type ButtonLabel = {
  label: string
  value: string
  icon?: any
}

type ButtonProps = {
  buttonGroupName?: string
  buttonLabels: ButtonLabel[]
  disabled?: any
  onClick?: (e: any) => any
  defaultSelect?: string
  labelFontSize?: string
  gap?: string
  padding?: string
  customWidth?: string
  flexGrow?: number
  justifyContent?: string
}

/**
  @param buttonGroupName: string
  @param buttonLabels: string[]
  @param disabled: boolean
  @param defaultSelect: string
  @param onClick: function
  @param labelFontSize: string
  @param gap?: string
  @param padding?: string
  @param customWidth?: string
  @param flexGrow?: number
  @param justifyContent?: string
  @returns ButtonGroup
 */
function MyButtonGroup({
  buttonGroupName,
  buttonLabels,
  onClick,
  disabled,
  defaultSelect,
  labelFontSize = '0.8rem',
  gap = '0.5rem',
  padding = '0px 0px',
  justifyContent = '',
  customWidth = 'fit-content',
  flexGrow = 0,
}: ButtonProps) {
  const [selectedButton, setSelectedButton] = useState('')

  console.log('onClick', onClick)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useForm()

  useEffect(() => {
    setSelectedButton(defaultSelect ? defaultSelect : '')
  }, [defaultSelect])

  return (
    <div>
      <ButtonGroup
        variant="contained"
        color="primary"
        disabled={disabled}
        // {...field}  when using inside Controller
        sx={{ ...ButtonStyles.buttonGroup, gap: gap, justifyContent: justifyContent }}>
        {buttonLabels
          ? buttonLabels.map((option: any, index: any) => (
              <Button
                sx={{
                  ...ButtonStyles.button,
                  padding: padding,
                  width: option?.width ? option?.width : customWidth,
                  flexGrow: flexGrow,
                  // flexShrink: 1,
                  fontSize: labelFontSize,
                }}
                key={index}
                onClick={() => {
                  onClick && onClick(option.value)
                  setSelectedButton(option.value)
                }}
                variant={selectedButton === option.value ? 'contained' : 'outlined'}
                // value={option.value}
              >
                {option.icon && (
                  <div style={{ paddingRight: '1rem' }}>
                    <Image
                      src={option.icon}
                      alt=""
                      // className={`${selectedButton === option.value ? 'text-white' : 'text-red-500'}`}
                      height={24}
                      width={24}
                    />
                  </div>
                )}
                {option.label}
              </Button>
            ))
          : null}
      </ButtonGroup>

      <ErrorMessage
        errors={errors}
        name={buttonGroupName ? buttonGroupName : ''}
        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
      />
    </div>
  )
}

export default MyButtonGroup
