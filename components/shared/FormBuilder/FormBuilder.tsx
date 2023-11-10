import {
  Box,
  // Button,
  // Checkbox,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  Grid,
  // Input,
  // MenuItem,
  // Radio,
  // RadioGroup,
  // Select,
  // TextField,
} from '@mui/material'
// import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form' // Controller
// import { Icon } from '../Icon'
import FormField from './FormField'
import { Field } from '@/types'

type FormBuilderProps = {
  onSubmit: (_: any) => void
  fields: Field[]
  spacing?: number
}

// type ButtonType = {
//   type: string
// }


const FormBuilder = ({ onSubmit, fields, spacing = 2 }: FormBuilderProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const renderField = (field: Field) => {
    if (field.condition) {
      const { conditionRender, field: conditionField } = field.condition
      const shouldRender = conditionRender(watch(conditionField))

      return shouldRender ? (
        <FormField control={control} {...field} key={field.name} error={errors[field.name]} />
      ) : null
    }

    return <FormField control={control} {...field} key={field.name} error={errors[field.name]} />
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={spacing}>
        {fields.map((field:Field) => (!field.condition || watch(field.condition.field) ? renderField(field) : null))}
      </Grid>
    </Box>
  )
}
export default FormBuilder
