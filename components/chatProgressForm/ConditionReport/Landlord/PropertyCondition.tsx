import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
// import ConditionFileUpload from './ConditionFileUpload'
import {
  Button,
  FormControl,
  FormControlLabel,
  // FormLabel,
  Grid,
  // InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material'
import { TextInput } from 'flowbite-react'

// interface Props {
//   conditionArea: string
// }

function PropertyCondition({stepName}: any) {
  const { register, control } = useForm({}) // , handleSubmit, reset, trigger, setError
  const { fields, append, remove } = useFieldArray({ control, name: stepName })

  return (
    <>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            {/* <input {...register(`test.${index}.firstName`)} />
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            /> */}

            <FormControl fullWidth>
              <Grid container spacing={0.5}>
                <Grid item xs={3}>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" {...register(`${stepName}.${index}.move` as const)}>
                    <FormControlLabel value="Move In" control={<Radio />} label="Move In" />
                    <FormControlLabel value="Move Out" control={<Radio />} label="Move Out" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={3}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Condition For"
                    {...register(`${stepName}.${index}.image_name` as const)}>
                    <MenuItem value="">Select Condition For</MenuItem>
                    <MenuItem value="Living area">Living area</MenuItem>
                    <MenuItem value="Dining area">Dining area</MenuItem>
                    <MenuItem value="Master bedroom">Master bedroom</MenuItem>
                    <MenuItem value="bedroom #02">bedroom #02</MenuItem>
                    <MenuItem value="bedroom #03">bedroom #03</MenuItem>
                    <MenuItem value="Attached bathroom">Attached bathroom</MenuItem>
                    <MenuItem value="Common toilet">Common toilet</MenuItem>
                    <MenuItem value="Kitchen">Kitchen</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Condition For"
                    {...register(`${stepName}.${index}.condition` as const)}>
                    <MenuItem value="">Select Condition</MenuItem>
                    <MenuItem value="no defect">no defect</MenuItem>
                    <MenuItem value="brand new">brand new</MenuItem>
                    <MenuItem value="pristine">pristine</MenuItem>
                    <MenuItem value="stains">stains</MenuItem>
                    <MenuItem value="burns">burns</MenuItem>
                    <MenuItem value="holes">holes</MenuItem>
                    <MenuItem value="snags">snags</MenuItem>
                    <MenuItem value="worn">worn</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={2}>
                  <TextInput type="file" id="" {...register(`${stepName}.${index}.file` as const)} />
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" color="error" onClick={() => remove(index)}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </li>
        ))}
      </ul>

      <Button variant="contained" onClick={() => append({
        move: '',
        image_name: '',
        condition: '',
        file: '',
      })}>
        Add More
      </Button>
    </>
  )
}

export default PropertyCondition
