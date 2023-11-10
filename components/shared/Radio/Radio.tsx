import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const RadioButton = ({
  rentalReq,
  name,
  label,
  labelId,
  options,
  defaultValue,
  onChangeEv,
  className,
  ...otherProps
}: any) => {
  return (
    <FormControl fullWidth className={`custom-radio  ${className}`}>
      {label && <FormLabel id={labelId}>{label}</FormLabel>}
      <RadioGroup
        onChange={(e: any) => {
          onChangeEv({ label: e.target.value, value: e.target.value })
        }}
        defaultValue={defaultValue}
        name={name}
        {...otherProps}>
        {options.map((option: any, index: number) => (
          <FormControlLabel
            style={{ border: rentalReq ? '1px solid red' : '' }}
            key={index}
            control={<Radio />}
            {...option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioButton
