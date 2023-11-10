import {
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
  InputLabel,
} from '@mui/material'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import CustomButtonGroup from './Components/ButtonGroup'
import RangeSlider from './Components/Slider'
import styles from './styles.module.css'

import { customFormStyle } from '@/util/customFormStyle'
import Landed from './images/Landed.png'
import Condo from './images/Condo.png'
import HDB from './images/HDB.png'
import ExCondo from './images/Group 36781.png'
import Mixed from './images/Group 36782.png'
import Edit from './images/edit.png'
import Subtraction from './images/Subtraction.png'

import { StoreThunkDispatch } from '@/types'
import ProfileCompletionAlert from './Components/ProfileCompletionAlert'

import { showModal, useGetDistrictWiseAreaQuery } from '@/store'

import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@/types'
import { isTenant } from '@/util'

const DetailsOfHomePreference = ({ homePreference, isProfileComplete, forceTrigger }: any) => {
  const { type } = useSelector((state: StoreState) => state.entities.user)
  const { data: session }: any = useSession()

  const [rentalTypeValue, setRentalTypeValue] = useState('')
  const [bedRoomValue, setBedRoomValue] = useState('')
  const [bathRoomValue, setBathRoomValue] = useState('')
  const [numberOfOccupaiers, setNumberOfOccupaiers] = useState('')
  const [rentalPeriodValue, setRentalPeriodValue] = useState('')
  const [propertyTypeValue, setPropertyTypeValue] = useState('')
  const [size, setSize] = useState<number[]>()
  const [rentalBudget, setRentalBudget] = useState<number[]>()
  const [district, setDistrict] = useState('')
  const [areaTitle, setAreaTitle] = useState<{ id: string; title: string }[]>([])
  const [districtTitle, setDistrictTitle] = useState<{ label: string; value: string }[]>([])
  const [areaName, setAreaName] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  // const [duration, setDuration] = useState<number>(0)
  // const [availableFrom, setAvailableFrom] = useState<any>()
  const [profileCompletionAlart, setProfileCompletionAlart] = useState<boolean>()
  let districtTitleArray: any[] = []
  // let areaTitle: any[] = []
  //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~==========
  const { data: districtWiseArea, isLoading } = useGetDistrictWiseAreaQuery({})
  //!$$$$$$$$$$$$$$$$$$$$
  let areaArray: any[] = districtWiseArea?.filter((item: any) => item.id == district)[0]?.area
  if (districtWiseArea) {
    districtTitleArray = districtWiseArea?.map((item: any, intex: any) => ({ label: item.title, value: item.id }))
  }

  useEffect(() => {
    setDistrictTitle(districtTitleArray)
  }, [district])
  //!$$$$$$$$$$$$$$$$$$$$
  //Resetting Area on District Change

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

  //!$$$$$$$$$$$$$$$$$$

  useEffect(() => {
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
    // setAvailableFrom(homePreference ? moment(homePreference?.start_date) : '')
    // setDuration(homePreference ? homePreference?.duration : null)
    setAreaTitle(areaArray)

    setStartDate(homePreference ? homePreference?.start_date : '')
    setEndDate(homePreference ? homePreference?.end_date : '')
  }, [homePreference, areaArray])

  useEffect(() => {
    setAreaName(homePreference && homePreference?.areas?.map((item: any) => item.id))
    setDistrict(homePreference ? homePreference?.district?.id : '')
  }, [])

  //!$$$$$$$$$$$$$$$$$$

  /*
  To show the warning on consecutive Click on Edit Button when profile is incomplete depending on the value of forceTrigger.
  */
  useEffect(() => {
    if (isProfileComplete === true) {
      setProfileCompletionAlart(false)
    } else if (isProfileComplete === false) {
      setProfileCompletionAlart(true)
    }
  }, [forceTrigger, isProfileComplete])

  const profileCompletionAlert = () => {
    dispatch(
      showModal({
        name: 'Profile Completion Alert',
        headingEnabled: false,
        open: true,
        children: <ProfileCompletionAlert setProfileCompletionAlart={setProfileCompletionAlart} />,
      })
    )
  }
  if (profileCompletionAlart && isTenant(type)) {
    profileCompletionAlert()
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

  return (
    <>
      {/* HomePreference */}
      <form>
        <div className="md:flex  gap-3 md:gap-4 xl:gap-5 ">
          <div className="w-full  bg-[#F1F7FF] py-4 md:py-6 xl:py-8 px-4 md:px-7 xl:px-11 border border-solid border-[#D4E8FF] rounded-[10px] ">
            <div className="w-full md:w-9/12 bg-[#F8FBFF] pt-3 md:pt-5 xl:pt-7 px-4 md:px-7 xl:px-11 md:pb-24 border border-solid border-[#D4E8FF] rounded-[10px] ">
              <h3
                className=" fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                data-wow-delay=".1s"
                style={{ animationDelay: '0.1s' }}>
                Details of Home Preference
              </h3>
              {!homePreference && (
                <div className=" pb-6 -mt-4">
                  <p className=" text-22 pb-3">You have not setup any Home Preference.</p>
                  <p className=" text-xl">Simply tap on your preference and let us find your preferred dream house.</p>
                </div>
              )}

              <div className="flex gap-10">
                <div className=" w-[42%] flex flex-col gap-4">
                  <FormControl
                  // className={` fullWidth !text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5`}
                  >
                    <Typography id="" className={styles.fieldHeading}>
                      Rental Type
                    </Typography>
                    <CustomButtonGroup
                      disabled={true}
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
                      disabled={true}
                      buttonLabels={bedRoom}
                      defaultSelect={bedRoomValue}
                      padding="15px 18px"
                      onClick={handleBedRoomOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Bath Room</Typography>
                    <CustomButtonGroup
                      disabled={true}
                      buttonLabels={bathRoom}
                      defaultSelect={bathRoomValue}
                      padding="15px 18px"
                      onClick={handleBathRoomOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Number of Occupiers</Typography>
                    <CustomButtonGroup
                      disabled={true}
                      buttonLabels={numberOfOccupiers}
                      defaultSelect={numberOfOccupaiers}
                      padding="15px 18px"
                      onClick={handleNumberofOccupiersOnClick}
                    />
                  </FormControl>

                  <FormControl>
                    <Typography className={styles.fieldHeading}>Rental Period</Typography>
                    <CustomButtonGroup
                      disabled={true}
                      buttonLabels={rentalPeriod}
                      defaultSelect={rentalPeriodValue}
                      padding="15px 18px"
                      onClick={handleRentalPeriodOnClick}
                    />
                  </FormControl>
                  {startDate && endDate && (
                    <div className="flex flex-col gap-0">
                      <Typography className={styles.fieldHeading}>Publish Duration</Typography>

                      <div className="flex flex-row gap-1">
                        <Image src={Subtraction} alt="" height={24} width={24} />
                        &nbsp;
                        <span>{startDate}</span>-
                        <span className="text-[#E21B1B]">
                          {/* {moment().add(duration, 'month').endOf('month').format('DD MMMM YYYY')} */}
                          {endDate}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className=" w-[45.5%] flex flex-col gap-4">
                  <FormControl>
                    <Typography className={styles.fieldHeading}>Property Type</Typography>
                    <CustomButtonGroup
                      disabled={true}
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
                    <RangeSlider
                      marks={sizeMarks}
                      defaultValue={size}
                      unit={['sqft']}
                      disabled={!homePreference?.min_floor_size}
                      preventChange={size}
                      onChange={handleSizeChange}
                    />
                  </FormControl>
                  <FormControl>
                    <Typography className={styles.fieldHeading}>Rental Budget</Typography>
                    <RangeSlider
                      marks={rentalBudgetMarks}
                      defaultValue={rentalBudget}
                      unit={['$', 'start']}
                      disabled={!homePreference?.min_budget}
                      preventChange={rentalBudget}
                      onChange={handleRentalBudgetChange}
                    />
                  </FormControl>

                  <div className=" w-full flex gap-4">
                    <FormControl variant="outlined" sx={{ ...customFormStyle?.sx_text_field, width: '40%' }}>
                      <Autocomplete
                        disabled={true}
                        id="district"
                        options={districtTitle}
                        getOptionLabel={option => option && option?.label}
                        value={district && districtTitle?.find((option: any) => option.value == district)}
                        renderInput={params => <TextField {...params} label="District*" />}
                        PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                        sx={{
                          ...customFormStyle.sx_text_field,
                        }}
                      />
                    </FormControl>
                    <FormControl variant="outlined" sx={{ ...customFormStyle?.sx_text_field, width: '60%' }}>
                      <InputLabel disabled={true} id="demo-multiple-checkbox-label">
                        Area*
                      </InputLabel>
                      <Select
                        disabled={true}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={areaName}
                        // onChange={handleChange}
                        input={<OutlinedInput label="Area*" />}
                        renderValue={selected =>
                          areaTitle
                            ?.filter(item => selected.includes(item.id))
                            ?.map(item => item.title)
                            ?.join(', ')
                        }>
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

export default DetailsOfHomePreference
