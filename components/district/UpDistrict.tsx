import { updateDistrict } from '@/store'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

const UpDistrict = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(updateDistrict(searchText))
    router.push('/filter')
  }
  return (
    <div className="mt-16">
      <h1 className="text-center text-4xl text-[#034EA1] font-bold font-roboto mb-10">ALL DISTRICT IN SINGAPORE</h1>

      <div className="w-full">
        <OutlinedInput
          className="!text-base md:!text-xs xl:!text-base !py-3 2xl:!py-5  !w-full !h-[70px]  md:!h-[47.5px] lg:!h-[47px] xl:!h-[58px]  2xl:!h-[70px] !border-[1px] !border-solid !border-[#034EA133] !rounded-[10px] !capitalize"
          // onChange={event => dispatch(updateSearchText(event.target.value))}
          onChange={event => setSearchText(event.target.value)}
          onKeyDown={event => event.key === 'Enter' && handleSubmit()}
          id="outlined-search-input"
          startAdornment={
            <InputAdornment position="end">
              <IconButton edge="start">
                <FiSearch className="!w-[30px] !h-[30px] md:!w-[16px] md:!h-[16px] xl:!w-[30px] xl:!h-[30px]" />
              </IconButton>
            </InputAdornment>
          }
          placeholder="Search by district name"
        />
      </div>
    </div>
  )
}

export default UpDistrict
