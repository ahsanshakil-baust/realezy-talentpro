import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { demoData } from '@/util/data'

export const OccupiersFormView = () => {
  const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData

  const {
    // handleSubmit,
    register,

    formState: { errors },
  } = useForm()
  return (
    <div className=" border p-8 flex flex-col gap-3">
      <TextField
        {...register('nric_fin', {
          required: true,
        })}
        required
        id="outlined-required"
        label="NRIC/FIN"
        defaultValue=""
        InputProps={{
          readOnly: true,
        }}
      />
      {errors?.nric_fin?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <TextField
        {...register('full_name', {
          required: true,
        })}
        required
        id="outlined-required"
        label="Full Name"
        defaultValue=""
        InputProps={{
          readOnly: true,
        }}
      />
      {errors?.full_name?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <input readOnly
        {...register('birth_date')}
        type="date"
        className=" w-full border border-blue-200 p-3"
        {...register('commencement_date')}
      />
      {errors?.commencement_date?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('sex', {
            required: true,
          })}
          label="Sex"
          // onChange={handleChange}
          readOnly 
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Others'}>Others</MenuItem>
        </Select>
      </FormControl>
      {errors?.sex?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Citizenship</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('citizenship', {
            required: true,
          })}
          label="Citizenship"
          readOnly
          >
          <MenuItem value={'Singapore Citizen'}>Singapore Citizen</MenuItem>
          <MenuItem value={'Singapore PR'}>Singapore PR</MenuItem>
          <MenuItem value={'Others'}>Others</MenuItem>
        </Select>
      </FormControl>
      {errors?.citizenship?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }}
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('select_nationality', {
            required: true,
          })}
          label="Select Nationality"
          // onChange={handleChange}
          readOnly
        >
          {Object.entries(nationalityList).map(([_, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
          {/* <MenuItem value={'personal'}>Personal</MenuItem>
          <MenuItem value={'organization'}>Organization</MenuItem> */}
        </Select>
      </FormControl>
      {errors?.select_nationality?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Race</InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }}
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('select_race', {
            required: true,
          })}
          label="Select Race"
          readOnly
          // onChange={handleChange}
        >
          {Object.entries(raceList).map(([_, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}

          {/* <MenuItem value={'personal'}>Personal</MenuItem>
          <MenuItem value={'organization'}>Organization</MenuItem> */}
        </Select>
      </FormControl>
      {errors?.select_race?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pass Type</InputLabel>
        <Select
          required
          MenuProps={{ disableScrollLock: true }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('pass_type', {
            required: true,
          })}
          label="Pass Type"
          readOnly
          // onChange={handleChange}
        >
          {Object.entries(idTypeListSin).map(([_, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}

          {/* <MenuItem value={'Dependent Pass'}>Dependent Pass</MenuItem>
          <MenuItem value={'Employment Pass'}>Employment Pass</MenuItem>
          <MenuItem value={'Long term Visit Pass'}>Long Term Visit Pass</MenuItem>
          <MenuItem value={'S Pass'}>S Pass</MenuItem>
          <MenuItem value={'Student Pass'}>Student Pass</MenuItem>
          <MenuItem value={'Work Permit'}>Work Permit</MenuItem>
          <MenuItem value={'Not Applicable'}>Not Applicable</MenuItem>
          <MenuItem value={'Others'}>Others</MenuItem> */}
        </Select>
      </FormControl>
      {errors?.pass_type?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sector</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('sector', {
            required: true,
          })}
          label="Sector"
          readOnly
          // onChange={handleChange}
        >
          {Object.entries(sector).map(([_, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {errors?.sector?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Relation to Main Tenant</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('relation_to_main_tenant', {
            required: true,
          })}
          label="Relation to Main Tenant"
          readOnly
          // onChange={handleChange}
        >
          {Object.entries(relationShipList).map(([_, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>{' '}
      {errors?.relation_to_main_tenant?.type === 'required' && <p className="text-danger"> This field is required</p>}
    </div>
  )
}
