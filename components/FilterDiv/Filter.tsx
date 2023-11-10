// import Image from 'next/image'
import { Button as CustomButton } from '../buttons/otherButtons/Button'
// import InputBox from '../inputBox/InputBox'

import SelectComponent from '../select/Select'
import {
  Autocomplete,
  // Button,
  // ClickAwayListener,
  // Fade,
  FormControl,
  FormControlLabel,
  // Grid,
  Icon,
  IconButton,
  InputAdornment,
  OutlinedInput,
  // IconButton,
  // InputAdornment,
  // List,
  // ListItem,
  // MenuList,
  // OutlinedInput,
  // Paper,
  // Popper,
  Radio,
  RadioGroup,
  TextField,
  // Typography,
} from '@mui/material'
// import { FiSearch } from 'react-icons/fi'
// import { MdFilterList, MdFilterListOff } from 'react-icons/md'
import { useState } from 'react'
// import { BsChevronDown } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  hideLoader,
  showLoader,
  updatePropertyType,
  updateRentalType,
  updateSearchText,
  useGetAutosuggestionQuery,
} from '@/store'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import useTypeWriterEffect from '@/hooks/useTypeWriterEffect'

export interface IFilter {}

const FilterDiv: React.FC<any> = () => {
  //useGetAutosuggestionQuery
  // const { data: suggesion } = useGetAutosuggestionQuery({})
  const [textnow] = useTypeWriterEffect({
    actual_text: 'Search by district, area or property name',
    speed: 100,
  })

  const router = useRouter()
  const dispatch = useDispatch()
  // const [applyFilter, setApplyFilter] = useState(false)
  const [searchText, setSearchText] = useState('')
  // console.log("🚀 ~ file: Filter.tsx:58 ~ searchText:", searchText)
  const [propertyType, setProperType] = useState('Any')
  const [rentalType, setRentalType] = useState('Whole Unit')

  //useGetAutosuggestionQuery
  dispatch(showLoader('Please wait...'))
  const { data: suggesion, isLoading } = useGetAutosuggestionQuery({})
  dispatch(hideLoader())

  const handleSubmit = () => {
    dispatch(updateSearchText(searchText))
    dispatch(updateRentalType(rentalType))
    dispatch(updatePropertyType(propertyType))
    console.log('propertyType..1', propertyType)
    router.push('/filter')
  }

  return (
    <div className="w-full md:h-[100px] lg:h-[120px] 2xl:h-[140px] rounded-[10px] shadow-[0px_10px_30px_#034EA129] backdrop-blur-[20px] bg-[#FFFFFFE6] flex flex-col items-center md:flex-row gap-7 p-4 md:p-[50px] z-30">
      <div className=" w-full md:w-[45%]">
        <Autocomplete
          sx={{
            '& .MuiInputBase-root': {
              paddingLeft: '32px',
              display: 'flex',
              alignItems: 'center',
            },
          }}
          disablePortal
          id="outlined-search-input"
          options={suggesion}
          // sx={{ width: 300 }}
          onChange={(event, value: any) => setSearchText(value?.label)}
          renderInput={params => (
            <TextField
              className="!bg-[#FFFFFF] !flex  !gap-4  sm:!gap-7 !w-full !h-[47.5px]  md:!h-[56px]  2xl:!h-[70px] !border-2 !border-solid !border-[#034EA133] !rounded-[10px] !capitalize"
              sx={{
                '& .MuiInputBase-root': {
                  // padding: '0px',
                  height: '100%',
                  '& fieldset': {
                    border: 'transparent',
                  },
                },
              }}
              // sx={{
              //   '& .MuiOutlinedInput-root': {
              //     '& fieldset': {
              //       border: '2px solid #034EA133',
              //     },
              //   },
              // }}
              // className="!text-base md:!text-xs xl:!text-base !py-3 2xl:!py-5  !w-full !h-[47.5px]  md:!h-[47.5px] lg:!h-[47px]  xl:!h-[58px]  2xl:!h-[70px] !border-[1px] !border-solid !border-[#034EA133] !rounded-[10px] !capitalize"
              // onChange={event => dispatch(updateSearchText(event.target.value))}
              // onChange={event => setSearchText(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && handleSubmit()}
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <img src="\chat\Magnifying_Glass.svg" alt="search-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <></>
                  // <InputAdornment position="end">
                  //   <IconButton edge="end">
                  //     <MdFilterList />
                  //   </IconButton>
                  // </InputAdornment>
                ),
              }}
              // startAdornment={
              //   <InputAdornment position="end">
              //     <IconButton edge="start">
              //       <FiSearch className="!w-[30px] !h-[30px] md:!w-[16px] md:!h-[16px] xl:!w-[30px] xl:!h-[30px]" />
              //     </IconButton>
              //   </InputAdornment>
              // }
              placeholder={textnow}

              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton edge="start">
              //         <FiSearch className="!w-[30px] !h-[30px] md:!w-[16px] md:!h-[16px] xl:!w-[30px] xl:!h-[30px]" />
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
            />
            //     <OutlinedInput
            //     {...params}
            //     className="!bg-[#FFFFFF] !flex  !gap-4  sm:!gap-7 !w-full !h-[47.5px]  md:!h-[56px]  2xl:!h-[70px] !border-2 !border-solid !border-[#034EA133] !rounded-[10px] !capitalize"
            //   // onChange={event => dispatch(updateSearchText(event.target.value))}
            //   // defaultValue={searchtext}
            //   // onChange={event => setSearchtext(event.target.value)}
            //   // onKeyDown={event => event.key === 'Enter' && dispatch(updateSearchText(searchtext)) && handleApplyFilter()}
            //   onKeyDown={event => event.key === 'Enter' && handleSubmit()}
            //   id="outlined-search-input"
            // startAdornment={
            //   <InputAdornment position="start">
            //     <IconButton edge="start">
            //       <FiSearch />
            //     </IconButton>
            //   </InputAdornment>
            // }
            //   placeholder="Search by district, area or property name"
            // />
          )}
        />
      </div>
      <div className=" w-full md:w-[40%] flex justify-between md:justify-around gap-4 md:gap-7">
        <SelectComponent title={'Rental Type'}>
          <FormControl component="fieldset" className="w-[100%] lg:w-[300px] xl:[300px]">
            <RadioGroup
              defaultValue={rentalType}
              onChange={event => setRentalType(event.target.value)}
              className=" !pt-3 !px-6 lg:!pt-[16px] !inline-block lg:!inline-block"
              aria-label="options"
              name="options">
              {['Whole unit', 'Room only'].map((typo: string) => (
                <FormControlLabel
                  key={typo}
                  style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
                  value={typo}
                  control={
                    <Radio
                      icon={
                        <Icon className=" !w-[18px] !h-[18px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                      }
                      checkedIcon={
                        <Icon className=" !w-[18px] !h-[18px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                      }
                    />
                  }
                  label={typo}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </SelectComponent>
        <SelectComponent title={'Property Type'}>
          <FormControl component="fieldset" className="!w-[100%] lg:!w-[300px] xl:!w-[300px]">
            <RadioGroup
              defaultValue={propertyType}
              onChange={event => setProperType(event.target.value)}
              className=" !pt-3 !px-6 lg:!pt-[16px] !inline-block lg:!inline-block"
              aria-label="options"
              name="options">
              {['Any', 'Condo', 'Landed', 'HDB'].map((typo: string) => (
                <FormControlLabel
                  key={typo}
                  style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
                  value={typo}
                  control={
                    <Radio
                      icon={
                        <Icon className=" !w-[18px] !h-[18px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                      }
                      checkedIcon={
                        <Icon className=" !w-[18px] !h-[18px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                      }
                    />
                  }
                  label={typo}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </SelectComponent>
      </div>
      <div className=" inline-flex justify-center md:justify-end  w-full md:w-[15%]">
        <CustomButton onClickEv={handleSubmit} />
      </div>
    </div>
  )
}

export default FilterDiv
