// import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { demoData } from '@/util/data'
// import { useSelector } from 'react-redux'
// import { useGetUserProfileDetailsQuery } from '@/store'
// import { useSession } from 'next-auth/react'

// export const OccupiersForm = ({ index, register, errors }: any) => {
//   const { data: session }: any = useSession()
//   const sender = session?.user?.id
//   const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData
//   const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
//   const { data: userInfo } = useGetUserProfileDetailsQuery(sender)

//   return (
//     <div className=" border p-8 flex flex-col gap-3">
//       <TextField
//         {...register(`nric_fin.${index}`, {
//           required: true,
//         })}
//         required
//         id="outlined-required"
//         label="NRIC/FIN"
//         name={`nric_fin[${index}]`}
//         defaultValue={payload?.tenantLandlordProgressInfo?.tenantInfo?.user_id_number}
//       />
//       {errors?.nric_fin?.type === 'required' && <p className="text-danger"> This field is required</p>}
//       <TextField
//         {...register(`full_name.${index}`, {
//           required: true,
//         })}
//         name={`full_name[${index}]`}
//         required
//         id="outlined-required"
//         label="Full Name"
//         defaultValue={payload?.tenantLandlordProgressInfo?.tenantInfo?.name}
//       />
//       {errors?.full_name?.type === 'required' && <p className="text-danger"> This field is required</p>}
//       <input
//         {...register(`birth_date.${index}`)}
//         name={`birth_date[${index}]`}
//         type="date"
//         defaultValue={payload?.tenantLandlordProgressInfo?.tenantInfo?.dateBirth}
//         className=" w-full border border-blue-200 p-3"
//       />
//       {errors?.commencement_date?.type === 'required' && <p className="text-danger"> This field is required</p>}
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Sex</InputLabel>
//         <Select
//           required
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           defaultValue={payload?.tenantLandlordProgressInfo?.tenantInfo?.gender}
//           {...register(`gender.${index}`, {
//             required: true,
//           })}
//           name={`gender[${index}]`}
//           label="Sex"
//           // onChange={handleChange}
//         >
//           <MenuItem value={'Male'}>Male</MenuItem>
//           <MenuItem value={'Female'}>Female</MenuItem>
//           <MenuItem value={'Others'}>Others</MenuItem>
//         </Select>
//       </FormControl>
//       {errors?.sex?.type === 'required' && <p className="text-danger"> This field is required</p>}
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Citizenship</InputLabel>
//         <Select
//           required
//           defaultValue={payload?.tenantLandlordProgressInfo?.tenantInfo?.citizen}
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           {...register(`citizenship.${index}`, {
//             required: true,
//           })}
//           name={`citizenship[${index}]`}
//           label="Citizenship">
//           <MenuItem value={'Singapore Citizen'}>Singapore Citizen</MenuItem>
//           <MenuItem value={'Singapore PR'}>Singapore PR</MenuItem>
//           <MenuItem value={'Others'}>Others</MenuItem>
//         </Select>
//       </FormControl>
//       {errors?.citizenship?.type === 'required' && <p className="text-danger"> This field is required</p>}

//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
//         <Select
//           MenuProps={{ disableScrollLock: true }}
//           required
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           {...register(`select_nationality.${index}`, {
//             required: true,
//           })}
//           name={`select_nationality[${index}]`}
//           label="Select Nationality"
//           // onChange={handleChange}
//         >
//           {Object.entries(nationalityList).map(([index, item]: any) => {
//             return (
//               <MenuItem key={item.value} value={item.value}>
//                 {item.label}
//               </MenuItem>
//             )
//           })}
//           {/* <MenuItem value={'personal'}>Personal</MenuItem>
//           <MenuItem value={'organization'}>Organization</MenuItem> */}
//         </Select>
//       </FormControl>
//       {errors?.select_nationality?.type === 'required' && <p className="text-danger"> This field is required</p>}

//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Select Race</InputLabel>
//         <Select
//           MenuProps={{ disableScrollLock: true }}
//           required
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           {...register(`select_race.${index}`, {
//             required: true,
//           })}
//           name={`select_race[${index}]`}
//           label="Select Race"
//           // onChange={handleChange}
//         >
//           {Object.entries(raceList).map(([index, item]: any) => {
//             return (
//               <MenuItem key={item.value} value={item.value}>
//                 {item.label}
//               </MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl>
//       {errors?.select_race?.type === 'required' && <p className="text-danger"> This field is required</p>}

//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Pass Type</InputLabel>
//         <Select
//           required
//           MenuProps={{ disableScrollLock: true }}
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           {...register(`pass_type.${index}`, {
//             required: true,
//           })}
//           name={`pass_type[${index}]`}
//           label="Pass Type"
//           // onChange={handleChange}
//         >
//           {Object.entries(idTypeListSin).map(([index, item]: any) => {
//             return (
//               <MenuItem key={item.value} value={item.value}>
//                 {item.label}
//               </MenuItem>
//             )
//           })}

//           {/* <MenuItem value={'Dependent Pass'}>Dependent Pass</MenuItem>
//           <MenuItem value={'Employment Pass'}>Employment Pass</MenuItem>
//           <MenuItem value={'Long term Visit Pass'}>Long Term Visit Pass</MenuItem>
//           <MenuItem value={'S Pass'}>S Pass</MenuItem>
//           <MenuItem value={'Student Pass'}>Student Pass</MenuItem>
//           <MenuItem value={'Work Permit'}>Work Permit</MenuItem>
//           <MenuItem value={'Not Applicable'}>Not Applicable</MenuItem>
//           <MenuItem value={'Others'}>Others</MenuItem> */}
//         </Select>
//       </FormControl>
//       {errors?.pass_type?.type === 'required' && <p className="text-danger"> This field is required</p>}
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Sector</InputLabel>
//         <Select
//           required
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           {...register(`sector.${index}`, {
//             required: true,
//           })}
//           name={`sector[${index}]`}
//           label="Sector"
//           // onChange={handleChange}
//         >
//           {Object.entries(sector).map(([index, item]: any) => {
//             return (
//               <MenuItem key={item.value} value={item.value}>
//                 {item.label}
//               </MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl>
//       {errors?.sector?.type === 'required' && <p className="text-danger"> This field is required</p>}
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Relation to Main Tenant</InputLabel>
//         <Select
//           required
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           {...register(`relation_to_main_tenant.${index}`, {
//             required: true,
//           })}
//           name={`relation_to_main_tenant[${index}]`}
//           label="Relation to Main Tenant"
//           // onChange={handleChange}
//         >
//           {Object.entries(relationShipList).map(([index, item]: any) => {
//             return (
//               <MenuItem key={item.value} value={item.value}>
//                 {item.label}
//               </MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl>
//       {errors?.relation_to_main_tenant?.type === 'required' && <p className="text-danger"> This field is required</p>}
//     </div>
//   )
// }

import { MenuItem, TextField } from '@mui/material' // FormControl, InputLabel, MenuItem, Select,
const {
    nricTypeList,
    // occup,
} = demoData
import React from 'react'
import { demoData } from '@/util/data'
import { Select } from '@mui/material'
// import { useSelector } from 'react-redux'
// import { useSession } from 'next-auth/react'

export const OccupiersForm = ({ disabled, item, index, register, errors }: any) => {
    // const { data: session }: any = useSession()
    // const sender = session?.user?.id
    const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData
    // const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
    // const { data: userInfo } = useGetUserProfileDetailsQuery(sender)

    return (
        <div className=" mt-9 grid grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-9 gap-y-7 ">
            <div className='flex'>
                <TextField
                    sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& > fieldset': {
                                border: '1px solid #D1D1D1',
                                // borderRadius: '10px',
                            },
                            '&.Mui-focused': {
                                '& > fieldset': {
                                    borderColor: '#00ADEE',
                                },
                            },
                        },
                        '& .MuiFormLabel-root': {
                            '&.Mui-focused': {
                                color: '#00ADEE',
                            },
                        },
                        '& .MuiOutlinedInput-root:hover': {
                            '& > fieldset': {
                                border: '1px solid #00ADEE',
                            },
                        },
                        '&:hover .MuiInputLabel-root': {
                            color: '#00ADEE',
                        },
                    }}
                    // fullWidth
                    disabled={disabled}
                    id={`occupierList-${index}-nric_fin`}
                    select
                    label="NRIC/FIN Type"
                    defaultValue={item?.nric_type}
                    SelectProps={{
                        native: true,
                    }}
                    {...register(`occupierList.${index}.nric_type`, {
                        required: true,
                    })}>
                    {nricTypeList.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                {/* <Select
        // className="personal-info-idType"
        {...register(`occupierList.${index}.nric_type`)}
        label="Prefix Letter"
        // onChange={e => (setIdType(e.target.value), trigger('id_type'))}
        defaultValue="">
        {nricTypeList.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select> */}
                <TextField
                    sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& > fieldset': {
                                border: '1px solid #D1D1D1',
                                // borderRadius: '10px',
                            },
                            '&.Mui-focused': {
                                '& > fieldset': {
                                    borderColor: '#00ADEE',
                                },
                            },
                        },
                        '& .MuiFormLabel-root': {
                            '&.Mui-focused': {
                                color: '#00ADEE',
                            },
                        },
                        '& .MuiOutlinedInput-root:hover': {
                            '& > fieldset': {
                                border: '1px solid #00ADEE',
                            },
                        },
                        '&:hover .MuiInputLabel-root': {
                            color: '#00ADEE',
                        },
                    }}
                    // fullWidth
                    disabled={disabled}
                    {...register(`occupierList.${index}.nric_fin`, {
                        required: true,
                    })}
                    id={`occupierList-${index}-nric_fin`}
                    label="NRIC/FIN Number"
                    defaultValue={item?.nric_fin}
                />
                {errors?.nric_fin?.type === 'required' && <p className="text-danger"> This field is required</p>}
            </div>
            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                {...register(`occupierList.${index}.full_name`, {
                    required: true,
                })}
                id={`occupierList-${index}-full_name`}
                label="Name of occuoier"
                defaultValue={item?.full_name}
            />
            {errors?.full_name?.type === 'required' && <p className="text-danger"> This field is required</p>}
            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                label="Birth Date"
                InputLabelProps={{
                    shrink: true,
                }}
                {...register(`occupierList.${index}.birth_date`)}
                type="date"
                id={`occupierList-${index}-birth_date`}
                defaultValue={item?.birth_date}
            />
            {errors?.commencement_date?.type === 'required' && <p className="text-danger"> This field is required</p>}
            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                id={`occupierList-${index}-gender`}
                select
                label="Gender"
                defaultValue={item?.gender}
                SelectProps={{
                    native: true,
                }}
                {...register(`occupierList.${index}.gender`, {
                    required: true,
                })}>
                <option key={'Male'} value={'Male'}>
                    Male
                </option>
                <option key={'Female'} value={'Female'}>
                    Female
                </option>
                <option key={'Others'} value={'Others'}>
                    Others
                </option>
            </TextField>
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-gender`}
          defaultValue={item?.gender}
          {...register(`occupierList.${index}.gender`, {
            required: true,
          })}
          label="Sex"
          // onChange={handleChange}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Others'}>Others</MenuItem>
        </Select>
      </FormControl> */}
            {errors?.sex?.type === 'required' && <p className="text-danger"> This field is required</p>}
            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                select
                defaultValue={item?.citizen}
                labelId="demo-simple-select-label"
                id={`occupierList-${index}-citizen`}
                {...register(`occupierList.${index}.citizen`, {
                    required: true,
                })}
                label="Select Citizenship"
                SelectProps={{
                    native: true,
                }}>
                <option key={'Local'} value={'Local'}>
                    Local
                </option>
                <option key={'PR'} value={'PR'}>
                    PR
                </option>
                <option key={'Foreigner (Returning)'} value={'Foreigner (Returning)'}>
                    Foreigner (Returning)
                </option>
                <option key={'Foreigner (1st Timer)'} value={'Foreigner (1st Timer)'}>
                    Foreigner (1st Timer)
                </option>
            </TextField>
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Citizenship</InputLabel>
        <Select
          defaultValue={item?.citizen}
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-citizen`}
          {...register(`occupierList.${index}.citizen`, {
            required: true,
          })}
          label="Citizenship">
          <MenuItem value={'Singapore Citizen'}>Singapore Citizen</MenuItem>
          <MenuItem value={'Singapore PR'}>Singapore PR</MenuItem>
          <MenuItem value={'Others'}>Others</MenuItem>
        </Select>
      </FormControl> */}
            {errors?.citizenship?.type === 'required' && <p className="text-danger"> This field is required</p>}
            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                select
                labelId="demo-simple-select-label"
                id={`occupierList-${index}-nationality`}
                {...register(`occupierList.${index}.nationality`, {
                    required: true,
                })}
                defaultValue={item?.nationality}
                label="Select Nationality"
                SelectProps={{
                    native: true,
                }}>
                {Object.entries(nationalityList).map(([_, itemVal]: any) => {
                    return (
                        <option key={itemVal.value} value={itemVal.value}>
                            {itemVal.label}
                        </option>
                    )
                })}
            </TextField>
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }}
          required
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-nationality`}
          {...register(`occupierList.${index}.nationality`, {
            required: true,
          })}
          defaultValue={item?.nationality}
          label="Select Nationality"
          // onChange={handleChange}
        >
          {Object.entries(nationalityList).map(([index, itemVal]: any) => {
            return (
              <MenuItem key={itemVal.value} value={itemVal.value}>
                {itemVal.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl> */}
            {errors?.select_nationality?.type === 'required' && <p className="text-danger"> This field is required</p>}

            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                select
                labelId="demo-simple-select-label"
                id={`occupierList-${index}-race`}
                {...register(`occupierList.${index}.race`, {
                    required: true,
                })}
                defaultValue={item?.race}
                label="Select Race"
                SelectProps={{
                    native: true,
                }}>
                {Object.entries(raceList).map(([_, itemVal]: any) => {
                    return (
                        <option key={itemVal.value} value={itemVal.value}>
                            {itemVal.label}
                        </option>
                    )
                })}
            </TextField>
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Race</InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }}
          required
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-race`}
          {...register(`occupierList.${index}.race`, {
            required: true,
          })}
          defaultValue={item?.race}
          label="Select Race"
          // onChange={handleChange}
        >
          {Object.entries(raceList).map(([index, itemVal]: any) => {
            return (
              <MenuItem key={itemVal.value} value={itemVal.value}>
                {itemVal.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl> */}
            {errors?.select_race?.type === 'required' && <p className="text-danger"> This field is required</p>}

            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                select
                labelId="demo-simple-select-label"
                id={`occupierList-${index}-pass_type`}
                {...register(`occupierList.${index}.pass_type`, {
                    required: true,
                })}
                defaultValue={item?.pass_type}
                label="Pass Type"
                SelectProps={{
                    native: true,
                }}>
                {Object.entries(idTypeListSin).map(([_, itemVal]: any) => {
                    return (
                        <option key={itemVal.value} value={itemVal.value}>
                            {itemVal.label}
                        </option>
                    )
                })}
            </TextField>
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pass Type</InputLabel>
        <Select
          required
          MenuProps={{ disableScrollLock: true }}
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-pass_type`}
          {...register(`occupierList.${index}.pass_type`, {
            required: true,
          })}
          defaultValue={item?.pass_type}
          label="Pass Type"
          // onChange={handleChange}
        >
          {Object.entries(idTypeListSin).map(([index, itemVal]: any) => {
            return (
              <MenuItem key={itemVal.value} value={itemVal.value}>
                {itemVal.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl> */}
            {errors?.pass_type?.type === 'required' && <p className="text-danger"> This field is required</p>}
            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                select
                labelId="demo-simple-select-label"
                id={`occupierList-${index}-sector`}
                {...register(`occupierList.${index}.sector`, {
                    required: true,
                })}
                defaultValue={item?.sector}
                label="Select Sector"
                SelectProps={{
                    native: true,
                }}>
                {Object.entries(sector).map(([_, itemVal]: any) => {
                    return (
                        <option key={itemVal.value} value={itemVal.value}>
                            {itemVal.label}
                        </option>
                    )
                })}
            </TextField>
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sector</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-sector`}
          {...register(`occupierList.${index}.sector`, {
            required: true,
          })}
          defaultValue={item?.sector}
          label="Sector"
          // onChange={handleChange}
        >
          {Object.entries(sector).map(([index, itemVal]: any) => {
            return (
              <MenuItem key={itemVal.value} value={itemVal.value}>
                {itemVal.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl> */}
            {errors?.sector?.type === 'required' && <p className="text-danger"> This field is required</p>}
            <TextField
                sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                            '& > fieldset': {
                                borderColor: '#00ADEE',
                            },
                        },
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: '#00ADEE',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            border: '1px solid #00ADEE',
                        },
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                    },
                }}
                fullWidth
                disabled={disabled}
                select
                labelId="demo-simple-select-label"
                id={`occupierList-${index}-relation`}
                {...register(`occupierList.${index}.relation`, {
                    required: true,
                })}
                label="Relation to Main Tenant"
                defaultValue={item?.relation}
                SelectProps={{
                    native: true,
                }}>
                {Object.entries(relationShipList).map(([_, itemVal]: any) => {
                    return (
                        <option key={itemVal.value} value={itemVal.value}>
                            {itemVal.label}
                        </option>
                    )
                })}
            </TextField>
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Relation to Main Tenant</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-relation`}
          {...register(`occupierList.${index}.relation`, {
            required: true,
          })}
          label="Relation to Main Tenant"
          defaultValue={item?.relation}
          // onChange={handleChange}
        >
          {Object.entries(relationShipList).map(([index, item]: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl> */}
            {errors?.relation_to_main_tenant?.type === 'required' && <p className="text-danger"> This field is required</p>}
        </div>
    )
}
