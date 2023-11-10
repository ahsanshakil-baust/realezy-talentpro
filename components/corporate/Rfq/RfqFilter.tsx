import { CorporateLayout, Icon } from '@/components'
import CustomButtonGroup from '@/components/dashboard/HomePreference/Components/ButtonGroup'
import RangeSlider from '@/components/dashboard/HomePreference/Components/Slider'
import styles from '@/components/dashboard/HomePreference/styles.module.css'
import { BATH_ROOM, BED_ROOM, NUMBER_OF_OCCUPIERS, RENTAL_BUDGET_MARKS, SIZE_MARKS } from '@/constants'
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import Image from 'next/image'
import Ten10Icon from 'public/corporate-icon/10TenIcon.svg'
import FilterIcon from 'public/corporate-icon/Glyph.svg'
import GroupIcon from 'public/corporate-icon/groups.svg'
import SubtructionIcon from 'public/corporate-icon/Subtraction2.svg'
import ChatIcon from 'public/corporate-icon/ChatIcon.svg'
import CurrencyIcon from 'public/corporate-icon/CurrencyIcon.svg'
import MarkerIcon from 'public/corporate-icon/marker.svg'
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'
import { hideLoader, showLoader, showModal, useGetRfqFilterQuery } from '@/store'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const RfqFilter = () => {
    const dispatch = useDispatch<StoreThunkDispatch>()
    const [bedRoomValue, setBedRoomValue] = useState('')
    const [bathRoomValue, setBathRoomValue] = useState('')
    const [numberOfOccupaiers, setNumberOfOccupaiers] = useState('')
    const [size, setSize] = useState<number[]>([100, 2000])
    const [rentalBudget, setRentalBudget] = useState<number[]>([500, 10000])
    const { data: session }: any = useSession()
    const [filterParams, setFilterParams] = useState({
        // area_id: '',
        bedroom: '',
        min_floor_size: size[0],
        max_floor_size: size[1],
        // search: '',
        // district_id: '',
        // rental_type: '',
        // property_type: '',
        // rental_period: '',
        bathroom: '',
        no_of_occupiers: '',
        // duration: '',
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

  const handleRfqFilterData = () => {}

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
      value: 200,
      label: '$500',
    },
    {
      value: 10000,
      label: '$10000',
    },
  ]

  const { data: rfqList, isLoading: rfqLoading }: any = useGetRfqFilterQuery(filterParams)
  console.log('rfqLoading', rfqLoading, rfqList)
  if (rfqLoading) {
    dispatch(showLoader('Featching Data...'))
  } else {
    dispatch(hideLoader())
  }

  return (
    <div>
      {/* REQUEST FOR QUOTATION SECTION */}
      <Box className="!flex !items-center !gap-3.5 !px-8 !py-2.5 !bg-blue-100">
        <div className="w-1/2">
          <p className="text-2xl font-medium mb-4">Request for Quotation</p>
          <div className="flex gap-2">
            <p className="text-xl text-primary font-medium mb-5">
              RFQ Limit : {rfqList?.max_rfq_limit ? rfqList?.max_rfq_limit : '3/10'}
            </p>
            <Chip label="Free" size="small" className="!bg-primary !text-white !leading-none" />
          </div>
        </div>
        <div className="w-1/2 flex gap-5">
          {/* RENTAL TYPE */}
          <FormControl fullWidth className="!bg-[#F8FBFF] !rounded-[10px] !border !border-solid !border-[#D4E8FF] ">
            <InputLabel id="demo-simple-select-label">Rental Type</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={null} label="Rental Type">
              <MenuItem value={'Any'}>Any</MenuItem>
              <MenuItem value={'Whole Unit'}>Whole Unit</MenuItem>
              <MenuItem value={'Room'}>Room</MenuItem>
            </Select>
          </FormControl>

          {/* PROPERTY TYPE */}
          <FormControl fullWidth className="!bg-[#F8FBFF] !rounded-[10px] !border !border-solid !border-[#D4E8FF] ">
            <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={null} label="Property Type">
              <MenuItem value={'Any'}>Any</MenuItem>
              <MenuItem value={'Landed'}>Landed</MenuItem>
              <MenuItem value={'Condo'}>Condo</MenuItem>
              <MenuItem value={'HDB'}>HDB</MenuItem>
            </Select>
          </FormControl>

          {/* DISTRICT */}
          <FormControl fullWidth className="!bg-[#F8FBFF] !rounded-[10px] !border !border-solid !border-[#D4E8FF] ">
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={null} label="District">
              <MenuItem value={10}>Any</MenuItem>
              <MenuItem value={20}>D1</MenuItem>
              <MenuItem value={30}>D2</MenuItem>
              <MenuItem value={40}>D3</MenuItem>
              <MenuItem value={50}>D4</MenuItem>
              <MenuItem value={60}>D5</MenuItem>
              <MenuItem value={70}>D6</MenuItem>
              <MenuItem value={80}>D7</MenuItem>
              <MenuItem value={90}>D8</MenuItem>
              <MenuItem value={100}>D9</MenuItem>
              <MenuItem value={110}>D10</MenuItem>
              <MenuItem value={120}>D11</MenuItem>
              <MenuItem value={130}>D12</MenuItem>
              <MenuItem value={140}>D13</MenuItem>
              <MenuItem value={150}>D14</MenuItem>
              <MenuItem value={160}>D15</MenuItem>
              <MenuItem value={170}>D16</MenuItem>
              <MenuItem value={180}>D17</MenuItem>
              <MenuItem value={190}>D18</MenuItem>
              <MenuItem value={200}>D19</MenuItem>
              <MenuItem value={210}>D20</MenuItem>
              <MenuItem value={220}>D21</MenuItem>
              <MenuItem value={230}>D22</MenuItem>
              <MenuItem value={240}>D23</MenuItem>
              <MenuItem value={250}>D24</MenuItem>
              <MenuItem value={260}>D25</MenuItem>
              <MenuItem value={270}>D26</MenuItem>
              <MenuItem value={280}>D27</MenuItem>
              <MenuItem value={290}>D28</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>

      {/* FILTER AND RFQ LIST SECTION */}
      <div className="flex w-full h-full">
        {/* FILTER SECTION */}
        <div className="w-[30%] !shadow-[0px_6px_6px_#034EA11A] bg-[#F8FBFF]  ">
          <div className=" !shadow-[0px_2px_6px_#034EA11A] !rounded-t-[10px]">
            <Box className="!flex !items-center !gap-3 !px-8 !py-5 ">
              <Image src={FilterIcon} alt="filter-icon" />
              <p className="font-roboto font-normal text-[1.25rem]/[1.5rem]">Filters</p>
              {/* <Chip
                label="5"
                // size="small"
                className="bg-secondary text-white leading-none rounded-full w-7 h-7 flex items-center justify-center text-center "
              /> */}
              <div className="bg-secondary text-sm text-white leading-none rounded-full w-7 h-7 flex items-center justify-center text-center ">
                5
              </div>
            </Box>
          </div>
          <div className="grid gap-5 px-8 py-5 text-sm !shadow-[0px_6px_6px_#034EA11A]   ">
            <FormControl>
              <Typography className="!text-textValueColor !font-medium  !mb-3">Bed Room</Typography>
              <CustomButtonGroup
                buttonLabels={BED_ROOM}
                defaultSelect={bedRoomValue}
                padding="12px 14px"
                onClick={handleBedRoomOnClick}
              />
            </FormControl>

            <FormControl>
              <Typography className="!text-textValueColor !font-medium !mb-3">Bath Room</Typography>
              <CustomButtonGroup
                buttonLabels={BATH_ROOM}
                defaultSelect={bathRoomValue}
                padding="12px 14px"
                onClick={handleBathRoomOnClick}
              />
            </FormControl>

            <FormControl>
              <Typography className="!text-textValueColor !font-medium  !mb-3">Number of Occupiers</Typography>
              <CustomButtonGroup
                buttonLabels={NUMBER_OF_OCCUPIERS}
                defaultSelect={numberOfOccupaiers}
                padding="12px 14px"
                onClick={handleNumberofOccupiersOnClick}
              />
            </FormControl>

            <FormControl>
              <Typography className="!text-textValueColor !font-medium !mb-3">Size (sqft)</Typography>
              <RangeSlider marks={sizeMarks} defaultValue={size} unit={['sqft']} onChange={handleSizeChange} />
            </FormControl>

            <FormControl>
              <Typography className="!text-textValueColor !font-medium !mb-3">Rental Budget</Typography>
              <RangeSlider
                marks={rentalBudgetMarks}
                defaultValue={rentalBudget}
                unit={['$', 'start']}
                onChange={handleRentalBudgetChange}
              />
            </FormControl>
            <Button
              onClick={handleRfqFilterData}
              variant="contained"
              className=" !py-4 !bg-[#00ADEE] !text-[22px]/[27px]">
              Search
            </Button>
          </div>
        </div>
        <div className="w-[70%] h-[calc(100vh-216px)] pl-12  py-5 !overflow-auto bg-[#F1F7FF]">
          <div className="flex justify-between">
            <div className="">
              <p>
                Showing
                <br /> <span className="text-secondary">0-10 of 152</span> RFQs found
              </p>
            </div>
            <div className="flex gap-4">
              <Button color="gray" variant="outlined" className="!mt-4">
                New Upload
              </Button>
              <Button color="gray" variant="outlined" className="!mt-4">
                Last 3 Day
              </Button>
              <Button color="gray" variant="outlined" className="!mt-4">
                Last 7 Day
              </Button>
            </div>
            <div className="">
              {/* PROPERTY TYPE */}
              <FormControl fullWidth className="!w-52 !h-[52px] !bg-[#F8FBFF] ">
                <InputLabel id="demo-simple-select-label">Relevance</InputLabel>
                <Select
                  className="!py-15 "
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={null}
                  label="Relevance">
                  <MenuItem value={10}>Relevance</MenuItem>
                  <MenuItem value={20}>Newest</MenuItem>
                  <MenuItem value={30}>Lowest Price</MenuItem>
                  <MenuItem value={40}>Highest Price</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid gap-3 pr-12  py-5">
            {rfqList &&
              rfqList.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex h-[212px] bg-antiFlashWhite rounded-[10px] border-2 border-solid border-[#D4E8FF] shadow-[0px_2px_20px_#034EA100] relative">
                  <div
                    className={` ${
                      item?.ramaining_status === 'NEW UPLOAD' ? 'bg-gamboge' : 'bg-[#E21B1B]'
                    } absolute top-0 -left-1 z-10   h-[43px] w-1.5 rounded-e-lg`}></div>
                  <div
                    className={` ${
                      item?.ramaining_status === 'NEW UPLOAD' ? 'bg-gamboge' : 'bg-[#E21B1B]'
                    } absolute top-0 -left-1 z-10 shadow-[-2px_3px_2px_#00000029] text-white px-3 py-2 h-10 rounded-e-lg`}>
                    {item?.ramaining_status}
                  </div>
                  <div className=" relative">
                    <div className="absolute top-[35%] left-[42%]">
                      <Image src="/corporate-icon/Play.svg" width={69} height={69} alt="play" />
                    </div>
                    <video className="rounded-[10px] min-w-[380px] max-w-[380px] h-full object-cover">
                      <source src={item?.customer?.video_url} type="video/mp4" />
                      Your browser does not support HTML video.
                    </video>
                  </div>
                  <div className="py-4 pl-4 pr-7 w-full ">
                    <div className="flex items-center mb-4">
                      <img src={item?.customer?.profile_pic} alt="" className="w-10 h-10 rounded-full mr-3" />
                      <p className="text-davysGrey text-lg font-medium">{item?.customer?.name}</p>
                      <p className="text-earthYellow underline ml-auto px-2">{item?.rental_type}</p>
                      <p className="text-royalPurple underline pl-1">{item?.property_type}</p>
                    </div>
                    <div className="flex gap-3 mb-5">
                      <div className="flex gap-2 border-dashed border border-blueGray rounded-lg px-4 py-2">
                        <img src="/corporate-icon/bed.svg" className=" !w-6 !h-5" />
                        <p className="text-blueGray text-[16px]/[19px]">{item?.bedroom}</p>
                      </div>
                      <div className="flex gap-2 border-dashed border border-blueGray rounded-lg px-4 py-2">
                        <img src="/corporate-icon/bath.svg" className="!text-blueGray !w-6 !h-5" />
                        <p className="text-blueGray text-[16px]/[19px]">{item?.bathroom}</p>
                      </div>
                      <div className="flex gap-2 border-dashed border border-blueGray rounded-lg px-4 py-2">
                        <img src="/corporate-icon/area.svg" className="!text-blueGray !w-6 !h-5" />
                        <p className="text-blueGray text-[16px]/[19px]">{item?.floor_range}</p>
                      </div>
                    </div>
                    {/* <div className="flex"> */}
                    <div className="flex flex-wrap items-center gap-4 grow">
                      <div className="flex items-center">
                        <Image src={CurrencyIcon}></Image>
                        <p className="text-[#505050] text-[16px]/[19px] ml-2">{item?.budget_range}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-battleshipGrayLight rounded"></div>
                        <p className="text-[#505050] text-[16px]/[19px] ml-2">{item?.district?.short_code}</p>
                      </div>
                      <div className="flex items-center">
                        <Image src={MarkerIcon}></Image>
                        <p className="text-[#505050] text-[16px]/[19px] ml-2">{item?.areas}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full mt-3">
                      <div className="flex items-center">
                        <Image src={SubtructionIcon}></Image>
                        <p className="text-[#505050] text-[16px]/[19px] ml-2">
                          {item?.start_date} - <span className="text-dangerRed">{item?.end_date}</span>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Image src="/corporate-icon/landtenant.svg" width={18} height={20} alt="filter-icon" />
                        <p className="text-blueGray text-[16px]/[19px] ml-2">{item?.max_rfq}</p>
                      </div>
                      <div className="flex items-end">
                        <Link href={`/corporate/rfq/rfqdetails/${item?.id}`}>
                          {/* <Button color="secondary" variant="outlined" className=" flex gap-2 items-center">
                            <Image src={ChatIcon}></Image>
                            Chat
                          </Button> */}
                          <Button color="secondary" variant="outlined" className=" !flex !gap-2 !items-center">
                            {/* <Image src={ChatIcon}></Image> */}
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RfqFilter
