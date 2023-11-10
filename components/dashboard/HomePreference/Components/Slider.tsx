import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import styles from '../styles.module.css'

import { SliderStyles } from '../Styles'
import { Typography } from '@mui/material'

// function valuetext(value: number) {
//   return `${value}°C`
// }

type markesobject = {
  label?: string
  value?: number
}

type ButtonProps = {
  marks?: markesobject[]
  defaultValue?: any
  unit?: any
  onChange?: any
  preventChange?: any
  disabled?: any
}

/**
  @param 
 */

/**
 * 
 * @param ARRAY OF MARKS 
 * {EXAMPLE: [
    {
      value: NUMBER ,
      label: 'STRING',
    },
    {
      value: NUMBER ,
      label: 'STRING',
    },
  ]
} 
 * @returns 
 */
export default function RangeSlider({ marks, defaultValue, unit, onChange, disabled, preventChange }: ButtonProps) {
  const [value, setValue] = useState<number[] | undefined>(
    marks ? [marks[0]?.value ?? 10, marks[marks?.length - 1]?.value ?? 100] : undefined
  )

  useEffect(() => {
    // setValue(prev => (defaultValue ? defaultValue : [...prev]))
    setValue(defaultValue)
  }, [defaultValue])

  console.log('defaultValue', defaultValue)

  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue)
    setValue(newValue as number[])
  }

  return (
    <Box
      // className=" flex flex-col"
      className={styles.sliderContainer}>
      <Slider
        sx={SliderStyles}
        //   getAriaLabel={() => ''}
        value={value}
        disabled={disabled}
        onChange={preventChange ? () => {} : handleChange}
        // valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        // marks={marks}
        min={marks ? marks[0]?.value : 0}
        max={marks ? marks[marks?.length - 1]?.value : 0}
      />
      <Box
        sx={{
          width: '91%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: '1px',
          p: 0,
        }}>
        <Typography className="flex">
          <span className={`${!unit?.[1] && 'pr-1'}`}>{value && value?.[0]}</span>
          <span className={`${unit?.[1] && 'order-first'}`}>{unit?.[0]}</span>
        </Typography>
        <Typography className="flex">
          <span className={`${!unit?.[1] && 'pr-1'}`}>{value && value?.[1]}</span>
          <span className={`${unit?.[1] && 'order-first'}`}>{unit?.[0]}</span>
        </Typography>
      </Box>
    </Box>
  )
}
