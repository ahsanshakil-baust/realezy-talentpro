import { MenuItem, TextField } from '@mui/material'
const { nricTypeList, } = demoData
import React from 'react'
import { demoData } from '@/util/data'
import { customFormStyle } from '@/util/customFormStyle'
import { ErrorMessage } from '@hookform/error-message'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'


/**
 * OCCUPIER TAB FORM
 * @param param disabled, item, index, register, errors
 * @returns OccupiersForm object
 */
export const OccupiersForm = ({ disabled, item, index, register, errors, setValue, trigger }: any) => {
  console.log("🚀 ~ file: OccupiersForm.tsx:17 ~ OccupiersForm ~ item:", item)
  const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData

  const handleBirthDate = (datestr: any) => {
    // console.log("--------->date, ", datestr.format("DD MMMM YYYY"))
    setValue(`occupierList.${index}.birth_date`, datestr.format("YYYY-MM-DD"))
    trigger(`occupierList.${index}.birth_date`)
    item.birth_date = datestr.format("YYYY-MM-DD")
  }

  return (
    <div className=" mt-9 grid grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-9 gap-y-7 ">
      <div className='flex'>
        <div>
          <TextField
            sx={customFormStyle.sx_text_field}
            disabled={disabled}
            id={`occupierList-${index}-nric_fin`}
            select
            label="NRIC/FIN Type"
            defaultValue={item?.nric_type}
            SelectProps={{
              native: true,
            }}
            {...register(`occupierList.${index}.nric_type`)}>
            {nricTypeList.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <ErrorMessage
            errors={errors}
            name={`occupierList.${index}.nric_type`}
            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
          />
        </div>

        <div>
          {/* {console.log('buji', { ...register(`occupierList.${index}.nric_fin`) })} */}
          <TextField
            sx={customFormStyle.sx_text_field}
            disabled={disabled}
            inputProps={{ ...register(`occupierList.${index}.nric_fin`) }}
            id={`occupierList-${index}-nric_fin`}
            label="NRIC/FIN Number"
          />
          <ErrorMessage
            errors={errors}
            name={`occupierList.${index}.nric_fin`}
            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
          />
        </div>
      </div>

      {/* OCCUPIE FULL NAME */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          {...register(`occupierList.${index}.full_name`)}
          id={`occupierList-${index}-full_name`}
          label="Name of occuoier"
          defaultValue={item?.full_name}
        />
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.full_name`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>

      {  /* OCCUPIER BIRTH DATE */}
      <div>
        <DatePicker
          label="Birth Date"
          disabled={disabled}
          {...register(`occupierList.${index}.birth_date`)}
          maxDate={moment.utc((new Date()))}
          defaultValue={item?.birth_date ? moment(item?.birth_date) : moment()}
          format="DD MMMM YYYY"
          onChange={(e: any) => handleBirthDate(e)}
          sx={customFormStyle.sx_text_field}
        />
        {/* <TextField
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
            /> */}
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.birth_date`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>

      {/* OCCUPIER GENDER */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          id={`occupierList-${index}-gender`}
          select
          label="Gender"
          defaultValue={item?.gender}
          SelectProps={{
            native: true,
          }}
          {...register(`occupierList.${index}.gender`)}>
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
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.gender`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>

      {/* OCCUPIER CITIZEN */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          select
          defaultValue={item?.citizen}
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-citizen`}
          {...register(`occupierList.${index}.citizen`)}
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
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.citizen`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>

      {/* OCCUPIER NATIONALITY */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          select
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-nationality`}
          {...register(`occupierList.${index}.nationality`)}
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
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.nationality`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>

      {/* OCCUPIER RACE */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          select
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-race`}
          {...register(`occupierList.${index}.race`)}
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
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.race`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>

      {/* OCCUPIER PASS TYPE */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          select
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-pass_type`}
          {...register(`occupierList.${index}.pass_type`)}
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
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.pass_type`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>

      {/* OCCUPIER SECTOR */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          select
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-sector`}
          {...register(`occupierList.${index}.sector`)}
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
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.sector`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>


      {/* OCCUPIER RELATION */}
      <div>
        <TextField
          sx={customFormStyle.sx_text_field}
          fullWidth
          disabled={disabled}
          select
          labelId="demo-simple-select-label"
          id={`occupierList-${index}-relation`}
          {...register(`occupierList.${index}.relation`)}
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
        <ErrorMessage
          errors={errors}
          name={`occupierList.${index}.relation`}
          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
        />
      </div>


    </div>
  )
}

// import { MenuItem, TextField } from '@mui/material' // FormControl, InputLabel, MenuItem, Select,
// const {
//     nricTypeList,
//     // occup,
// } = demoData
// import React from 'react'
// import { demoData } from '@/util/data'
// import { Select } from '@mui/material'
// import { ErrorMessage } from '@hookform/error-message'
// import moment from 'moment'
// import { DatePicker } from '@mui/x-date-pickers'
// // import { useSelector } from 'react-redux'
// // import { useSession } from 'next-auth/react'

// export const OccupiersForm = ({ disabled, item, index, register, errors }: any) => {
//     // const { data: session }: any = useSession()
//     // const sender = session?.user?.id
//     const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData
//     // const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
//     // const { data: userInfo } = useGetUserProfileDetailsQuery(sender)

//     return (
//         <div className=" mt-9 grid grid-cols-2 2xl:gap-x-8 gap-x-6 2xl:gap-y-9 gap-y-7 ">
//             <div className='flex'>
//                 <div>
//                 <TextField
//                     sx={{
//                         borderRadius: '10px',
//                         '& .MuiOutlinedInput-root': {
//                             '& > fieldset': {
//                                 border: '1px solid #D1D1D1',
//                                 // borderRadius: '10px',
//                             },
//                             '&.Mui-focused': {
//                                 '& > fieldset': {
//                                     borderColor: '#00ADEE',
//                                 },
//                             },
//                         },
//                         '& .MuiFormLabel-root': {
//                             '&.Mui-focused': {
//                                 color: '#00ADEE',
//                             },
//                         },
//                         '& .MuiOutlinedInput-root:hover': {
//                             '& > fieldset': {
//                                 border: '1px solid #00ADEE',
//                             },
//                         },
//                         '&:hover .MuiInputLabel-root': {
//                             color: '#00ADEE',
//                         },
//                     }}
//                     // fullWidth
//                     disabled={disabled}
//                     id={`occupierList-${index}-nric_fin`}
//                     select
//                     label="NRIC/FIN Type"
//                     defaultValue={item?.nric_type}
//                     SelectProps={{
//                         native: true,
//                     }}
//                     {...register(`occupierList.${index}.nric_type`, {
//                         required: true,
//                     })}>
//                     {nricTypeList.map(option => (
//                         <option key={option.value} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </TextField>
//                 <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].nric_type`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//                 </div>
//                 {/* <Select
//         // className="personal-info-idType"
//         {...register(`occupierList.${index}.nric_type`)}
//         label="Prefix Letter"
//         // onChange={e => (setIdType(e.target.value), trigger('id_type'))}
//         defaultValue="">
//         {nricTypeList.map(option => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select> */}
//                 <div>
//                 <TextField
//                     sx={{
//                         borderRadius: '10px',
//                         '& .MuiOutlinedInput-root': {
//                             '& > fieldset': {
//                                 border: '1px solid #D1D1D1',
//                                 // borderRadius: '10px',
//                             },
//                             '&.Mui-focused': {
//                                 '& > fieldset': {
//                                     borderColor: '#00ADEE',
//                                 },
//                             },
//                         },
//                         '& .MuiFormLabel-root': {
//                             '&.Mui-focused': {
//                                 color: '#00ADEE',
//                             },
//                         },
//                         '& .MuiOutlinedInput-root:hover': {
//                             '& > fieldset': {
//                                 border: '1px solid #00ADEE',
//                             },
//                         },
//                         '&:hover .MuiInputLabel-root': {
//                             color: '#00ADEE',
//                         },
//                     }}
//                     // fullWidth
//                     disabled={disabled}
//                     {...register(`occupierList.${index}.nric_fin`, {
//                         required: true,
//                     })}
//                     id={`occupierList-${index}-nric_fin`}
//                     label="NRIC/FIN Number"
//                     defaultValue={item?.nric_fin}
//                 />
//                 <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].nric_fin`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//                 {/* {errors?.nric_fin?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//                 </div>
//             </div>
//             <div>
//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 {...register(`occupierList.${index}.full_name`, {
//                     required: true,
//                 })}
//                 id={`occupierList-${index}-full_name`}
//                 label="Name of occuoier"
//                 defaultValue={item?.full_name}
//             />
//             <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].full_name`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//             />
//             {/* {errors?.full_name?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//             </div>
//             <div>
//             {/* <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 label="Birth Date"
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//                 {...register(`occupierList.${index}.birth_date`)}
//                 type="date"
//                 id={`occupierList-${index}-birth_date`}
//                 defaultValue={item?.birth_date}
//             /> */}
//             <DatePicker
//                     //   className=" 2xl:!w-[16.25rem] !w-[14.25rem]  !bg-[#F1F7FF]   !shadow-[0px_4px_8px_#034EA11A]"
//                       disabled={disabled}
//                       label="Birth Date"
//                       {...register(`occupierList.${index}.birth_date`)}
//                       defaultValue={moment.utc(item?.birth_date)}
//                       minDate={moment.utc(new Date())}
//                       format="DD MMM, YY"
//                       sx={{
//                         width: '100%',
//                         '& .MuiInputBase-root': {
//                           '&.Mui-focused fieldset': {
//                             borderColor: '#00ADEE',
//                           },
//                         },

//                         '& .MuiInputLabel-root': {
//                           '&.Mui-focused': {
//                             color: '#00ADEE',
//                           },
//                         },
//                       }}
//                     />
//             <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].birth_date`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//             {/* {errors?.commencement_date?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//             </div>
//             <div>
//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 id={`occupierList-${index}-gender`}
//                 select
//                 label="Gender"
//                 defaultValue={item?.gender}
//                 SelectProps={{
//                     native: true,
//                 }}
//                 {...register(`occupierList.${index}.gender`, {
//                     required: true,
//                 })}>
//                 <option key={'Male'} value={'Male'}>
//                     Male
//                 </option>
//                 <option key={'Female'} value={'Female'}>
//                     Female
//                 </option>
//                 <option key={'Others'} value={'Others'}>
//                     Others
//                 </option>
//             </TextField>
//             {/* <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Sex</InputLabel>
//         <Select
//           required
//           labelId="demo-simple-select-label"
//           id={`occupierList-${index}-gender`}
//           defaultValue={item?.gender}
//           {...register(`occupierList.${index}.gender`, {
//             required: true,
//           })}
//           label="Sex"
//           // onChange={handleChange}
//         >
//           <MenuItem value={'Male'}>Male</MenuItem>
//           <MenuItem value={'Female'}>Female</MenuItem>
//           <MenuItem value={'Others'}>Others</MenuItem>
//         </Select>
//       </FormControl> */}
//             {/* {errors?.sex?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//             <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].gender`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//             </div>
//             <div>
//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 select
//                 defaultValue={item?.citizen}
//                 labelId="demo-simple-select-label"
//                 id={`occupierList-${index}-citizen`}
//                 {...register(`occupierList.${index}.citizen`, {
//                     required: true,
//                 })}
//                 label="Select Citizenship"
//                 SelectProps={{
//                     native: true,
//                 }}>
//                 <option key={'Local'} value={'Local'}>
//                     Local
//                 </option>
//                 <option key={'PR'} value={'PR'}>
//                     PR
//                 </option>
//                 <option key={'Foreigner (Returning)'} value={'Foreigner (Returning)'}>
//                     Foreigner (Returning)
//                 </option>
//                 <option key={'Foreigner (1st Timer)'} value={'Foreigner (1st Timer)'}>
//                     Foreigner (1st Timer)
//                 </option>
//             </TextField>
//             <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].citizen`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//             </div>
//             {/* <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Citizenship</InputLabel>
//         <Select
//           defaultValue={item?.citizen}
//           labelId="demo-simple-select-label"
//           id={`occupierList-${index}-citizen`}
//           {...register(`occupierList.${index}.citizen`, {
//             required: true,
//           })}
//           label="Citizenship">
//           <MenuItem value={'Singapore Citizen'}>Singapore Citizen</MenuItem>
//           <MenuItem value={'Singapore PR'}>Singapore PR</MenuItem>
//           <MenuItem value={'Others'}>Others</MenuItem>
//         </Select>
//       </FormControl> */}
//             {/* {errors?.citizenship?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//             <div>
//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 select
//                 labelId="demo-simple-select-label"
//                 id={`occupierList-${index}-nationality`}
//                 {...register(`occupierList.${index}.nationality`, {
//                     required: true,
//                 })}
//                 defaultValue={item?.nationality}
//                 label="Select Nationality"
//                 SelectProps={{
//                     native: true,
//                 }}>
//                 {Object.entries(nationalityList).map(([_, itemVal]: any) => {
//                     return (
//                         <option key={itemVal.value} value={itemVal.value}>
//                             {itemVal.label}
//                         </option>
//                     )
//                 })}
//             </TextField>
//             {/* <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
//         <Select
//           MenuProps={{ disableScrollLock: true }}
//           required
//           labelId="demo-simple-select-label"
//           id={`occupierList-${index}-nationality`}
//           {...register(`occupierList.${index}.nationality`, {
//             required: true,
//           })}
//           defaultValue={item?.nationality}
//           label="Select Nationality"
//           // onChange={handleChange}
//         >
//           {Object.entries(nationalityList).map(([index, itemVal]: any) => {
//             return (
//               <MenuItem key={itemVal.value} value={itemVal.value}>
//                 {itemVal.label}
//               </MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl> */}

//             {/* {errors?.select_nationality?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//             <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].nationality`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//             </div>
//             <div>

//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 select
//                 labelId="demo-simple-select-label"
//                 id={`occupierList-${index}-race`}
//                 {...register(`occupierList.${index}.race`, {
//                     required: true,
//                 })}
//                 defaultValue={item?.race}
//                 label="Select Race"
//                 SelectProps={{
//                     native: true,
//                 }}>
//                 {Object.entries(raceList).map(([_, itemVal]: any) => {
//                     return (
//                         <option key={itemVal.value} value={itemVal.value}>
//                             {itemVal.label}
//                         </option>
//                     )
//                 })}
//             </TextField>
//             {/* <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Select Race</InputLabel>
//         <Select
//           MenuProps={{ disableScrollLock: true }}
//           required
//           labelId="demo-simple-select-label"
//           id={`occupierList-${index}-race`}
//           {...register(`occupierList.${index}.race`, {
//             required: true,
//           })}
//           defaultValue={item?.race}
//           label="Select Race"
//           // onChange={handleChange}
//         >
//           {Object.entries(raceList).map(([index, itemVal]: any) => {
//             return (
//               <MenuItem key={itemVal.value} value={itemVal.value}>
//                 {itemVal.label}
//               </MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl> */}
//             {/* {errors?.select_race?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//             <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].race`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//             </div>
//             <div>

//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 select
//                 labelId="demo-simple-select-label"
//                 id={`occupierList-${index}-pass_type`}
//                 {...register(`occupierList.${index}.pass_type`, {
//                     required: true,
//                 })}
//                 defaultValue={item?.pass_type}
//                 label="Pass Type"
//                 SelectProps={{
//                     native: true,
//                 }}>
//                 {Object.entries(idTypeListSin).map(([_, itemVal]: any) => {
//                     return (
//                         <option key={itemVal.value} value={itemVal.value}>
//                             {itemVal.label}
//                         </option>
//                     )
//                 })}
//             </TextField>
//             {/* <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Pass Type</InputLabel>
//         <Select
//           required
//           MenuProps={{ disableScrollLock: true }}
//           labelId="demo-simple-select-label"
//           id={`occupierList-${index}-pass_type`}
//           {...register(`occupierList.${index}.pass_type`, {
//             required: true,
//           })}
//           defaultValue={item?.pass_type}
//           label="Pass Type"
//           // onChange={handleChange}
//         >
//           {Object.entries(idTypeListSin).map(([index, itemVal]: any) => {
//             return (
//               <MenuItem key={itemVal.value} value={itemVal.value}>
//                 {itemVal.label}
//               </MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl> */}
//             {/* {errors?.pass_type?.type === 'required' && <p className="text-danger"> This field is required</p>} */}
//             <ErrorMessage
//                       errors={errors}
//                       name={`occupierList[${index}].pass_type`}
//                       render={({ message }) => <p className="text-danger">{message}</p>}
//                 />
//             </div>
//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 select
//                 labelId="demo-simple-select-label"
//                 id={`occupierList-${index}-sector`}
//                 {...register(`occupierList.${index}.sector`, {
//                     required: true,
//                 })}
//                 defaultValue={item?.sector}
//                 label="Select Sector"
//                 SelectProps={{
//                     native: true,
//                 }}>
//                 {Object.entries(sector).map(([_, itemVal]: any) => {
//                     return (
//                         <option key={itemVal.value} value={itemVal.value}>
//                             {itemVal.label}
//                         </option>
//                     )
//                 })}
//             </TextField>
//             {/* <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Sector</InputLabel>
//         <Select
//           required
//           labelId="demo-simple-select-label"
//           id={`occupierList-${index}-sector`}
//           {...register(`occupierList.${index}.sector`, {
//             required: true,
//           })}
//           defaultValue={item?.sector}
//           label="Sector"
//           // onChange={handleChange}
//         >
//           {Object.entries(sector).map(([index, itemVal]: any) => {
//             return (
//               <MenuItem key={itemVal.value} value={itemVal.value}>
//                 {itemVal.label}
//               </MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl> */}
//             {errors?.sector?.type === 'required' && <p className="text-danger"> This field is required</p>}
//             <TextField
//                 sx={{
//                     borderRadius: '10px',
//                     '& .MuiOutlinedInput-root': {
//                         '& > fieldset': {
//                             border: '1px solid #D1D1D1',
//                             // borderRadius: '10px',
//                         },
//                         '&.Mui-focused': {
//                             '& > fieldset': {
//                                 borderColor: '#00ADEE',
//                             },
//                         },
//                     },
//                     '& .MuiFormLabel-root': {
//                         '&.Mui-focused': {
//                             color: '#00ADEE',
//                         },
//                     },
//                     '& .MuiOutlinedInput-root:hover': {
//                         '& > fieldset': {
//                             border: '1px solid #00ADEE',
//                         },
//                     },
//                     '&:hover .MuiInputLabel-root': {
//                         color: '#00ADEE',
//                     },
//                 }}
//                 fullWidth
//                 disabled={disabled}
//                 select
//                 labelId="demo-simple-select-label"
//                 id={`occupierList-${index}-relation`}
//                 {...register(`occupierList.${index}.relation`, {
//                     required: true,
//                 })}
//                 label="Relation to Main Tenant"
//                 defaultValue={item?.relation}
//                 SelectProps={{
//                     native: true,
//                 }}>
//                 {Object.entries(relationShipList).map(([_, itemVal]: any) => {
//                     return (
//                         <option key={itemVal.value} value={itemVal.value}>
//                             {itemVal.label}
//                         </option>
//                     )
//                 })}
//             </TextField>
//             {/* <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Relation to Main Tenant</InputLabel>
//         <Select
//           required
//           labelId="demo-simple-select-label"
//           id={`occupierList-${index}-relation`}
//           {...register(`occupierList.${index}.relation`, {
//             required: true,
//           })}
//           label="Relation to Main Tenant"
//           defaultValue={item?.relation}
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
//       </FormControl> */}
//             {errors?.relation_to_main_tenant?.type === 'required' && <p className="text-danger"> This field is required</p>}
//         </div>
//     )
// }
