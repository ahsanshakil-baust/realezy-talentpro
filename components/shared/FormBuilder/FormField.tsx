import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'

import { Controller } from 'react-hook-form'
import { Icon } from '../Icon'
import { Field } from '@/types'



type FormFieldProps = Field & {
  control: any
}


const FormField = ({
  label,
  type,
  name,
  options,
  placeholder,
  error,
  control,
  className,
  // labelClassName,
  // containerClass,
  // refCallback,
  // children,
  // rows,
  rules,
  defaultValue,
  // onChangeHandler,
  // onChangeCustom,
  xs = 12,
  row = true,
  // variant = 'contained',
  ...otherProps
}: FormFieldProps) => (
  <Grid item xs={xs}>
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      {...otherProps}
      render={({ field }) => {
        if (type === 'select') {
          return (
            <TextField
              {...field}
              select
              label={label}
              fullWidth
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message}
            >
              {options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )
        } else if (type === 'checkbox') {
          return (
            <FormControlLabel
              {...field}
              // onChange={e => field.onChange(e.target.checked ? defaultValue : false)}
              control={<Checkbox color="primary" />}
              label={label}
            />
          )
        } else if (type === 'button') {
          return (
            <Button variant="contained" type="submit">
              <Icon name={name} />
              {label}
            </Button>
          )
        } else if (type === 'heading') {
          return <span className={className?.join(' ')}>{label}</span>
        } else if (type === 'file' || type === 'time' || type === 'date') {
          return (
            <>
              <FormLabel component="legend">{label}</FormLabel>
              <TextField fullWidth id={type} type={type} />
              {/* <Input type={type} /> */}
            </>
          )
        } else if (type === 'radio') {
          return (
            <FormControl>
              <FormLabel component="legend">{label}</FormLabel>
              <RadioGroup row={row} {...field} aria-label={name}>
                {options?.map(option => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio color="primary" />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )
        } else {
          return (
            <TextField
              {...field}
              type={type}
              label={label}
              fullWidth
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message}
              // onChange={() => onChangeHandler(typeof onChangeCustom === 'function' ? onChangeCustom() : [])}
            />
          )
        }
      }}
    />
  </Grid>
)

export default FormField
