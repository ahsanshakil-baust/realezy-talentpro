import { FormControl, FormControlLabel, FormLabel, RadioGroup, Switch } from '@mui/material'
import React, { useState } from 'react'

const MultiSelect = ({
  name,
  label,
  labelId,
  isdisable,
  options,
  defaultValue,
  onChangeEv,
  className,
  ...otherProps
}: any) => {
  // const handleChange = onChangeEv ? onChangeEv : undefined

  // const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // console.log('options...', options[0])
  // console.log('options...1', options[1])
  // console.log('options...1', options[1])

  // const handleOptionClick = (option: string) => {
  //   if (selectedOptions.includes(option)) {
  //     setSelectedOptions(selectedOptions.filter(item => item !== option))
  //   } else {
  //     setSelectedOptions([...selectedOptions, option])
  //   }
  // }

  return (
    <FormControl className={`custom-multi ${className}`}>
      {label && <FormLabel id={labelId}>{label}</FormLabel>}
      <RadioGroup defaultValue={defaultValue} name={name} {...otherProps}>
        {options[0]?.map((option: any, index: number) => {
          return (
            <FormControlLabel
              key={index}
              control={
                <Switch
                  // readOnly={true}
                  disabled={isdisable}
                  defaultChecked={options[1]?.includes(option.value)}
                  // checked={options[1]?.includes(option.value)}
                  onChange={(e: any) => onChangeEv(e.target.value)}
                />
              }
              {...option}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default MultiSelect
