import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
// import { useForm } from 'react-hook-form'
import { demoData } from '@/util/data'
import { useSelector } from 'react-redux'
import { useGetUserProfileDetailsQuery } from '@/store'
import { useSession } from 'next-auth/react'

export const OccupiersFormU = ({ data, index, register, errors }: any) => {
  const { data: session }: any = useSession()
  const sender = session?.user?.id
  const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  // const { data: userInfo } = useGetUserProfileDetailsQuery(sender)

  return (
    <div className=" border p-8 flex flex-col gap-3">
      <TextField
        {...register(`nric_fin.${index}`, {
          required: true,
        })}
        required
        id="outlined-required"
        label="NRIC/FIN"
        name={`nric_fin[${index}]`}
        defaultValue={data?.idNumber || payload?.tenantLandlordProgressInfo?.tenantInfo?.user_id_number}
      />
      {errors?.nric_fin?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <TextField
        {...register(`full_name.${index}`, {
          required: true,
        })}
        name={`full_name[${index}]`}
        required
        id="outlined-required"
        label="Full Name"
        defaultValue={data?.name || payload?.tenantLandlordProgressInfo?.tenantInfo?.name}
      />
      {errors?.full_name?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <input
        {...register(`birth_date.${index}`)}
        name={`birth_date[${index}]`}
        type="date"
        defaultValue={data?.dateOfBirth || payload?.tenantLandlordProgressInfo?.tenantInfo?.dateBirth}
        className=" w-full border border-blue-200 p-3"
      />
      {errors?.commencement_date?.type === 'required' && <p className="text-danger"> This field is required</p>}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={data?.gender || payload?.tenantLandlordProgressInfo?.tenantInfo?.gender}
          {...register(`gender.${index}`, {
            required: true,
          })}
          name={`gender[${index}]`}
          label="Sex"
        // onChange={handleChange}
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
          defaultValue={data?.citizenShip || payload?.tenantLandlordProgressInfo?.tenantInfo?.citizen}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register(`citizenship.${index}`, {
            required: true,
          })}
          name={`citizenship[${index}]`}
          label="Citizenship">
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
          {...register(`select_nationality.${index}`, {
            required: true,
          })}
          name={`select_nationality[${index}]`}
          label="Select Nationality"
          // onChange={handleChange}
          defaultValue={data?.nationality || payload?.tenantLandlordProgressInfo?.tenantInfo?.nationality}
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
          {...register(`select_race.${index}`, {
            required: true,
          })}
          name={`select_race[${index}]`}
          label="Select Race"
          // onChange={handleChange}
          defaultValue={data?.race}
        >
          {Object.entries(raceList).map(([_, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
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
          {...register(`pass_type.${index}`, {
            required: true,
          })}
          name={`pass_type[${index}]`}
          label="Pass Type"
          // onChange={handleChange}
          defaultValue={data?.pass_type || payload?.tenantLandlordProgressInfo?.tenantInfo?.pass_type}
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
          {...register(`sector.${index}`, {
            required: true,
          })}
          name={`sector[${index}]`}
          label="Sector"
          // onChange={handleChange}
          defaultValue={data?.occupation || payload?.tenantLandlordProgressInfo?.tenantInfo?.sector}
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
          {...register(`relation_to_main_tenant.${index}`, {
            required: true,
          })}
          name={`relation_to_main_tenant[${index}]`}
          label="Relation to Main Tenant"
          // onChange={handleChange}
          defaultValue={data?.relationship || payload?.tenantLandlordProgressInfo?.tenantInfo?.relationship}
        >
          {Object.entries(relationShipList).map(([_, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {errors?.relation_to_main_tenant?.type === 'required' && <p className="text-danger"> This field is required</p>}
    </div>
  )
}
