import {
  Button,
  FormControl,
  Typography,
  Autocomplete,
  TextField,
  Paper,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import CustomButtonGroup from './Components/ButtonGroup'
import RangeSlider from './Components/Slider'
import styles from './styles.module.css'
import { ButtonStyles } from './Styles'
import { customFormStyle } from '@/util/customFormStyle'
import Landed from './images/Landed.png'
import Condo from './images/Condo.png'
import HDB from './images/HDB.png'
import ExCondo from './images/Group 36781.png'
import Mixed from './images/Group 36782.png'
import Edit from './images/edit.png'

import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'
import PublishSchedule from './Components/PublishSchedule'

import {
  hideLoader,
  hideModal,
  showLoader,
  showModal,
  useCreateHomePreferenceMutation,
  useGetDistrictWiseAreaQuery,
  useUpdateHomePreferenceMutation,
} from '@/store'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { toast } from 'react-toastify'

// Define custom CSS styles
// const useStyles = makeStyles(theme => ({
//   customRadio: {
//     '& .MuiSvgIcon-root': {
//       width: '24px', // Adjust the width to your desired size
//       height: '24px', // Adjust the height to your desired size
//     },
//   },
// }))
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const CreateHomePreference = ({ isEditEnabled, homePreference, refetchHomePreference }: any) => {
  const [rentalTypeValue, setRentalTypeValue] = useState('')
  const [bedRoomValue, setBedRoomValue] = useState('')
  const [bathRoomValue, setBathRoomValue] = useState('')
  const [numberOfOccupaiers, setNumberOfOccupaiers] = useState('')
  const [rentalPeriodValue, setRentalPeriodValue] = useState('')
  const [propertyTypeValue, setPropertyTypeValue] = useState('')
  const [size, setSize] = useState<number[]>()
  const [rentalBudget, setRentalBudget] = useState<number[]>()
  const [duration, setDuration] = useState<number>()
  const [availableFrom, setAvailableFrom] = useState<any>()

  const [district, setDistrict] = useState('')
  const [districtTitle, setDistrictTitle] = useState<{ label: string; value: string }[]>([])
  const [areaName, setAreaName] = useState<string[]>([])
  const [areaTitle, setAreaTitle] = useState<{ id: string; title: string }[]>([])
  let districtTitleArray: any[] = []
  // let areaTitle: any[] = []

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    // control,
    formState: { errors },
    trigger,
  } = useForm()

  const { data: session, update }: any = useSession()
  const { data: districtWiseArea } = useGetDistrictWiseAreaQuery({})

  const [createHomePreference] = useCreateHomePreferenceMutation()
  const [updateHomePreference] = useUpdateHomePreferenceMutation()

  const handleCreateHomePreference = async (payLoad: any) => {
    let response
    if (homePreference?.id) {
      response = await updateHomePreference({ hPID: homePreference?.id, data: payLoad })
    } else {
      response = await createHomePreference(payLoad)
    }
    if (response.data.status == 200) {
      toast.success(response.data.massege)
    } else {
      toast.error(response.data.massege)
    }

    try {
      await refetchHomePreference()
    } catch (error) {
      // console.log('error', error)
    }
    isEditEnabled(false)
    dispatch(hideLoader())
  }

  const rentalType = [
    { label: 'Whole Unit', value: 'Whole Unit' },
    { label: 'Room', value: 'Room' },
  ]
  const bedRoom = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5+', value: '5+', width: '3rem' },
    { label: 'Studio', value: 'Studio' },
  ]

  const bathRoom = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5+', value: '5+', width: '3rem' },
  ]
  const numberOfOccupiers = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
  ]
  const rentalPeriod = [
    { label: '1 Year', value: '1' },
    { label: '2 Year', value: '2' },
  ]
  const propertyType = [
    { label: 'Landed', value: 'Landed', icon: Landed },
    { label: 'Condo', value: 'Condo', icon: Condo },
    { label: 'HDB', value: 'HDB', icon: HDB },
    // { label: 'Executive Condo', value: 'Executive Condo', icon: ExCondo },
    // {
    //   label: (
    //     <>
    //       Mixed <sub>(with Residential Use)</sub>
    //     </>
    //   ) as unknown as string,
    //   value: 'Mixed (with Residential Use)',
    //   icon: Mixed,
    // },
  ]

  const sizeMarks = [
    {
      value: 100,
      label: '100 sqft',
    },
    {
      value: 2000,
      label: '2000 sqft',
    },
  ]

  const rentalBudgetMarks = [
    {
      value: 500,
      label: '$500',
    },
    {
      value: 10000,
      label: '$10000',
    },
  ]
  const dispatch = useDispatch<StoreThunkDispatch>()

  // !working.................

  let areaArray: any[] = districtWiseArea?.filter((item: any) => item.id == district)[0]?.area
  districtTitleArray = districtWiseArea?.map((item: any, intex: any) => ({ label: item.title, value: item.id }))
  useEffect(() => {
    setDistrictTitle(districtTitleArray)
    setValue(
      'district',
      districtTitle?.find((option: any) => option.value === district)
    )
    trigger('district')
    setValue('area', areaName)
  }, [district])
  // !working.................

  useEffect(() => {
    if (!rentalTypeValue) {
      setRentalTypeValue(homePreference ? homePreference?.rental_type : null)
      setPropertyTypeValue(homePreference ? homePreference?.property_type : null)
      setBedRoomValue(homePreference ? homePreference?.bedroom : null)
      setBathRoomValue(homePreference ? homePreference?.bathroom : null)
      setNumberOfOccupaiers(homePreference ? homePreference?.no_of_occupiers : null)
      setRentalPeriodValue(homePreference ? homePreference?.rental_period : null)
      setSize(
        homePreference
          ? [parseFloat(homePreference?.min_floor_size), parseFloat(homePreference?.max_floor_size)]
          : [parseFloat(sizeMarks[0].value.toString()), parseFloat(sizeMarks[1].value.toString())]
      )
      setRentalBudget(
        homePreference
          ? [parseFloat(homePreference?.min_budget), parseFloat(homePreference?.max_budget)]
          : [parseFloat(rentalBudgetMarks[0].value.toString()), parseFloat(rentalBudgetMarks[1].value.toString())]
      )
    }
    setAvailableFrom(homePreference ? moment(homePreference?.start_date) : '')
    setDuration(homePreference ? homePreference?.duration : null)
    setAreaTitle(areaArray)
  }, [homePreference, areaArray])

  useEffect(() => {
    setAreaName(homePreference && homePreference?.areas?.map((item: any) => item.id))
    setDistrict(homePreference ? homePreference?.district?.id : '')
  }, [])

  const publishSchedule = () => {
    dispatch(
      showModal({
        name: 'Publish Schedule',
        open: true,
        children: (
          <PublishSchedule
            onSubmit={homePreferenceFormSubmiteHandler}
            setAvailableFrom={setAvailableFrom}
            availableFromDate={availableFrom ? availableFrom : moment()}
            setDuration={setDuration}
            durationValue={duration}
          />
        ),
      })
    )
  }

  const updateDistrict = (e: any, selectedObject: any) => {
    setValue('district', selectedObject?.value)
    setDistrict(selectedObject?.value)
    let areaArray = districtWiseArea?.filter((item: any) => selectedObject?.value == item.id)[0]?.area
    setAreaName(() => []) //Resetting Area on District Change
    setAreaTitle(areaArray)
  }

  const handleAreaChange = (event: SelectChangeEvent<typeof areaName>) => {
    const {
      target: { value },
    } = event
    setValue('area', value)
    setAreaName(typeof value === 'string' ? value.split(',') : value)
  }

  const handleRentalTypeOnClick = (value: any) => {
    setRentalTypeValue(value)
  }
  const handleBedRoomOnClick = (value: any) => {
    setBedRoomValue(value)
  }
  const handleBathRoomOnClick = (value: any) => {
    setBathRoomValue(value)
  }
  const handleNumberofOccupiersOnClick = (value: any) => {
    setNumberOfOccupaiers(value)
  }
  const handleRentalPeriodOnClick = (value: any) => {
    setRentalPeriodValue(value)
  }
  const handlePropertyTypeOnClick = (value: any) => {
    setPropertyTypeValue(value)
  }
  const handleSizeChange = (value: number[]) => {
    setSize(value as number[])
  }
  const handleRentalBudgetChange = (value: number[]) => {
    setRentalBudget(value as number[])
  }

  const homePreferenceFormSubmiteHandler = (formData: any) => {
    const payLoad = {
      user_id: session?.user?.id,
      district_id: district,
      area_id: areaName,
      rental_type: rentalTypeValue,
      property_type: propertyTypeValue,
      rental_period: rentalPeriodValue,
      bedroom: bedRoomValue,
      bathroom: bathRoomValue,
      no_of_occupiers: numberOfOccupaiers,
      min_floor_size: size ? size[0] : '',
      max_floor_size: size ? size[1] : '',
      min_budget: rentalBudget ? rentalBudget[0] : '',
      max_budget: rentalBudget ? rentalBudget[1] : '',
      start_date: `${moment(formData.availableFrom).format('DD-MM-YYYY')}`,
      duration: parseInt(formData.duration),
    }
    dispatch(showLoader('Updating Data...'))
    dispatch(hideModal('Publish Schedule'))
    handleCreateHomePreference(payLoad)
  }

  const handleReset = () => {}
  // let RentalValue = watch('district')
  let isPublishEnabled: boolean = false
  if (
    district &&
    areaName?.length != 0 &&
    rentalTypeValue &&
    bedRoomValue &&
    bathRoomValue &&
    numberOfOccupaiers &&
    rentalPeriodValue &&
    propertyTypeValue &&
    size &&
    rentalBudget
  ) {
    isPublishEnabled = true
  }
  return (
    <>
      {/* HomePreference */}

      <form onSubmit={handleSubmit(publishSchedule)}>
        <div className="md:flex  gap-3 md:gap-4 xl:gap-5 ">
          <div className="w-full  bg-[#F1F7FF] py-4 md:py-6 xl:py-8 px-4 md:px-7 xl:px-11 border border-solid border-[#D4E8FF] rounded-[10px] ">
            <div className="w-full md:w-9/12 bg-[#F8FBFF] pt-3 md:pt-5 xl:pt-7 px-4 md:px-7 xl:px-11 md:pb-24  border border-solid border-[#D4E8FF] rounded-[10px] ">
              <h3
                className="wow  fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                data-wow-delay=".1s"
                style={{ animationDelay: '0.1s' }}>
                Edit Home Preference
              </h3>

              <div className="flex gap-10">
                <div className=" w-[42%] flex flex-col gap-4">
                  <FormControl>
                    <Typography id="" className={styles.fieldHeading}>
                      Rental Type
                    </Typography>
                    <CustomButtonGroup
                      // buttonGroupName="rental_type"
                      buttonLabels={rentalType}
                      defaultSelect={rentalTypeValue}
                      padding="15px 18px"
                      customWidth="7.5rem"
                      onClick={handleRentalTypeOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Bed Room</Typography>
                    <CustomButtonGroup
                      buttonLabels={bedRoom}
                      defaultSelect={bedRoomValue}
                      padding="15px 18px"
                      onClick={handleBedRoomOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Bath Room</Typography>
                    <CustomButtonGroup
                      buttonLabels={bathRoom}
                      defaultSelect={bathRoomValue}
                      padding="15px 18px"
                      onClick={handleBathRoomOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Number of Occupiers</Typography>
                    <CustomButtonGroup
                      buttonLabels={numberOfOccupiers}
                      defaultSelect={numberOfOccupaiers}
                      padding="15px 18px"
                      onClick={handleNumberofOccupiersOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Rental Period</Typography>
                    <CustomButtonGroup
                      buttonLabels={rentalPeriod}
                      defaultSelect={rentalPeriodValue}
                      padding="15px 18px"
                      onClick={handleRentalPeriodOnClick}
                    />
                  </FormControl>

                  <div className="flex gap-5 mt-12">
                    <Button
                      disabled={!isPublishEnabled}
                      type="submit"
                      variant="contained"
                      sx={{ ...ButtonStyles.publishButton }}>
                      {/*onClick={publishSchedule} */}
                      Publish
                    </Button>
                    <Button type="button" variant="outlined" sx={ButtonStyles.resetButton} onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                </div>

                <div className=" w-[45.5%] flex flex-col gap-4">
                  <FormControl>
                    <Typography className={styles.fieldHeading}>Property Type</Typography>
                    <CustomButtonGroup
                      buttonLabels={propertyType}
                      defaultSelect={propertyTypeValue}
                      gap="1rem"
                      padding="11px 18px"
                      flexGrow={1}
                      justifyContent="space-between"
                      onClick={handlePropertyTypeOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Size (sqft)</Typography>
                    <RangeSlider marks={sizeMarks} defaultValue={size} unit={['sqft']} onChange={handleSizeChange} />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Rental Budget</Typography>
                    <RangeSlider
                      marks={rentalBudgetMarks}
                      defaultValue={rentalBudget}
                      unit={['$', 'start']}
                      onChange={handleRentalBudgetChange}
                    />
                  </FormControl>

                  <div className=" w-full flex gap-4">
                    <FormControl variant="outlined" sx={{ ...customFormStyle?.sx_text_field, width: '40%' }}>
                      <Autocomplete
                        {...register('district', { required: true })}
                        id="district"
                        options={districtTitle}
                        // getOptionLabel={option => option.label}
                        value={district && districtTitle?.find((option: any) => option.value === district)}
                        renderInput={params => <TextField {...params} label="District*" />}
                        PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                        sx={{
                          ...customFormStyle.sx_text_field,
                        }}
                        onChange={updateDistrict}
                      />
                    </FormControl>

                    <FormControl variant="outlined" sx={{ ...customFormStyle?.sx_text_field, width: '60%' }}>
                      <InputLabel id="demo-multiple-checkbox-label">Area*</InputLabel>
                      <Select
                        {...register('area', { required: true })}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={areaName}
                        onChange={handleAreaChange}
                        input={<OutlinedInput label="Area*" />}
                        renderValue={selected =>
                          areaTitle
                            ?.filter(item => selected.includes(item.id))
                            ?.map(item => item.title)
                            ?.join(', ')
                        }
                        MenuProps={MenuProps}>
                        {areaTitle?.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            <Checkbox
                              sx={{
                                '& .MuiSvgIcon-root': {
                                  color: '#00ADEE', // Change the color here
                                },
                              }}
                              checked={areaName?.indexOf(item.id) > -1}
                            />
                            <ListItemText primary={item.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateHomePreference
