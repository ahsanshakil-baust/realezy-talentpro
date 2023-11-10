import { useForm } from 'react-hook-form'
import { TextField, Select, MenuItem } from '@mui/material'

export default function MyForm() {
  const { register, handleSubmit, watch } = useForm()
  const selectedOption = watch('selectedOption')

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select {...register('selectedOption')} label="Select an option" defaultValue="">
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
      </Select>
      {selectedOption === 'option1' && (
        <TextField {...register('option1Field')} label="Option 1 Field" defaultValue="" />
      )}
      {selectedOption === 'option2' && (
        <TextField {...register('option2Field')} label="Option 2 Field" defaultValue="" />
      )}
      <button type="submit">Submit</button>
    </form>
  )
}
