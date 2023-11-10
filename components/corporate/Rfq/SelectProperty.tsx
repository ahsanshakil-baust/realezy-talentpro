import React, { useState } from 'react'
import CustomButtonGroup from '@/components/dashboard/HomePreference/Components/ButtonGroup'
import { Chip, FormControl, InputLabel } from '@mui/material'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import Image from 'next/image'
import { BATH_ROOM, BED_ROOM, NUMBER_OF_OCCUPIERS, RENTAL_BUDGET_MARKS, SIZE_MARKS } from '@/constants'
import RangeSlider from '@/components/dashboard/HomePreference/Components/Slider'
import FilterIcon from 'public/corporate-icon/Glyph.svg'
import { Button } from '@mui/material'
import HomeCustomCard from '@/components/cards/Property/HomeCardSlide'
import { useGetRfqPropertyListQuery } from '@/store'
import { useSession } from 'next-auth/react'
import PropertyCard from './PropertyCard'

function SelectProperty({ rfqDetails }: any) {
  const { data: session }: any = useSession()
  const [bedRoomValue, setBedRoomValue] = useState('')
  const [bathRoomValue, setBathRoomValue] = useState('')
  const [numberOfOccupaiers, setNumberOfOccupaiers] = useState('')
  const [size, setSize] = useState<number[]>([100, 2000])
  const [rentalBudget, setRentalBudget] = useState<number[]>([200, 10000])

  const [filterParams, setFilterParams] = useState({
    bedroom: '',
    bathroom: '',
    min_floor_size: size[0],
    max_floor_size: size[1],
    no_of_occupiers: '',
    min_budget: rentalBudget[0],
    max_budget: rentalBudget[1],
    user_id: session?.user?.id,
  })

  const handleBedRoomOnClick = (value: any) => {
    setBedRoomValue(value)
    const updatedFilterParams = {
      ...filterParams,
      bedroom: value,
    }
    setFilterParams(updatedFilterParams)
  }

  const handleBathRoomOnClick = (value: any) => {
    setBathRoomValue(value)
    const updatedFilterParams = {
      ...filterParams,
      bathroom: value,
    }
    setFilterParams(updatedFilterParams)
  }

  const handleNumberofOccupiersOnClick = (value: any) => {
    setNumberOfOccupaiers(value)
    const updatedFilterParams = {
      ...filterParams,
      no_of_occupiers: value,
    }
    setFilterParams(updatedFilterParams)
  }

  const handleSizeChange = (value: number[]) => {
    setSize(value as number[])
    const updatedFilterParams = {
      ...filterParams,
      min_floor_size: value[0],
      max_floor_size: value[1],
    }
    setFilterParams(updatedFilterParams)
  }
  const handleRentalBudgetChange = (value: number[]) => {
    setRentalBudget(value as number[])
    const updatedFilterParams = {
      ...filterParams,
      min_budget: value[0],
      max_budget: value[1],
    }
    setFilterParams(updatedFilterParams)
  }

  const { data: rfqPropertyList, isLoading: rfqLoading }: any = useGetRfqPropertyListQuery(filterParams)
  console.log('🚀 ~ file: SelectProperty.tsx:186 ~ SelectProperty ~ rfqPropertyList:', rfqPropertyList)

  return (
    <div className="px-12 py-4">
      <div className="flex">
        {/* FILTER SECTION */}
        <div className="w-[30%] ">
          <div className="shadow-[0px_2px_6px_#034EA11A] rounded-t-[10px]">
            <Box className="flex items-center gap-3.5 px-8 py-5 shadow-sm">
              <Image src={FilterIcon} alt="filter-icon" />
              <p>Filter</p>
              <Chip label="5" size="small" className="bg-secondary text-white leading-none" />
            </Box>
          </div>
          <div className="grid gap-5 px-8 py-5 text-sm shadow-[0px_6px_6px_#034EA11A]">
            <FormControl>
              <Typography className="text-textValueColor font-medium mb-3">Bed Room</Typography>
              <CustomButtonGroup
                buttonLabels={BED_ROOM}
                defaultSelect={bedRoomValue}
                padding="15px 18px"
                onClick={handleBedRoomOnClick}
              />
            </FormControl>

            <FormControl>
              <Typography className="text-textValueColor font-medium mb-3">Bath Room</Typography>
              <CustomButtonGroup
                buttonLabels={BATH_ROOM}
                defaultSelect={bathRoomValue}
                padding="15px 18px"
                onClick={handleBathRoomOnClick}
              />
            </FormControl>

            <FormControl>
              <Typography className="text-textValueColor font-medium mb-3">Number of Occupiers</Typography>
              <CustomButtonGroup
                buttonLabels={NUMBER_OF_OCCUPIERS}
                defaultSelect={numberOfOccupaiers}
                padding="15px 18px"
                onClick={handleNumberofOccupiersOnClick}
              />
            </FormControl>

            <FormControl>
              <Typography className="text-textValueColor font-medium mb-3">Size (sqft)</Typography>
              <RangeSlider marks={SIZE_MARKS} defaultValue={size} onChange={handleSizeChange} />
            </FormControl>
            <FormControl>
              <Typography className="text-textValueColor font-medium mb-3">Rental Budget</Typography>
              <RangeSlider
                marks={RENTAL_BUDGET_MARKS}
                defaultValue={rentalBudget}
                onChange={handleRentalBudgetChange}
              />
            </FormControl>
            <Button color="secondary" variant="contained" className="mt-4">
              Search
            </Button>
          </div>
        </div>
        <div className="w-[70%] flex flex-wrap gap-8 px-10">
          {rfqPropertyList?.map((card: any, index: number) => (
            <div className="w-[380px]" key={index}>
              <PropertyCard card={card} rfqDetails={rfqDetails} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectProperty
