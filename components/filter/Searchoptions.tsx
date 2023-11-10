import { demoData } from '@/util/data'

const { rental_Type, MRT, districtName } = demoData

import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Divider,
  Fade,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  List,
  MenuList,
  OutlinedInput,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList, MdFilterListOff } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import {
  updateBathroom,
  updateBedroom,
  updateDistrict,
  updateFurnishing,
  updateMrt,
  updatePriceEnd,
  updatePriceStart,
  updatePropertyType,
  updateRentalType,
  updateSearchText,
  updatePageNumber,
} from '@/store'
import useTypeWriterEffect from '@/hooks/useTypeWriterEffect'

const useStyles = makeStyles(() => ({
  rotate: {
    transition: 'transform 0.5s ease-in-out',
  },
  rotate180: {
    transform: 'rotate(-180deg)',
  },
}))

const Searchoptions = ({ handleApplyFilter, filter }: any) => {
  const [textnow] = useTypeWriterEffect({
    actual_text: 'Search by district, area or property name',
    speed: 100,
  })
  //!====================

  /**
   *
   * @param hasValue
   * @returns Total Count
   */
  const filtersCount = (hasValue: boolean) => {
    // let count = 0
    if (hasValue) {
      return 1
    }
    return 0
  }

  //!====================
  // console.log("filter value ", filter)
  const dispatch = useDispatch()
  // const handleFilterChange = (event) => {
  //   const { name, value } = event.target;
  //   dispatch(updateFilter({ [name]: value }));
  // };
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const anchorRef2 = useRef<HTMLButtonElement>(null)
  const anchorRef3 = useRef<HTMLButtonElement>(null)
  const anchorRef4 = useRef<HTMLButtonElement>(null)
  const [bathroom, setBathroom] = useState(filter.bathroom ? filter.bathroom : 'Any')
  const [bedroom, setBedroom] = useState(filter.bedroom ? filter.bedroom : 'Any')
  const [propertyType, setPropertyType] = useState('Any')
  const [rentalType, setRentalType] = useState(filter.rental_type ? filter.rental_type : 'Whole Unit')
  const [floorMin, setFloorMin] = useState('')
  const [floorMax, setFloorMax] = useState('')
  const [priceMin, setPriceMin] = useState(filter.price_start ? filter.price_start : 100)
  const [priceMax, setPriceMax] = useState(filter.price_end ? filter.price_end : 10000)
  const [searchtext, setSearchtext] = useState(filter.value ? filter.value : '')
  // const [district, setDistrict] = useState(filter.district !== '' ? [filter.district] : ['All of Singapore'])
  const [district, setDistrict] = useState(
    filter.district !== '' ? [filter.district] : districtName.map(item => item.value)
  )
  const [mrt, setMrt] = useState(filter.mrt !== '' ? [filter.mrt] : [''])
  const [furnishing, setFurnishing] = useState(filter.furnishing ? filter.furnishing : 'Any')

  // const [relevance, setRelevance] = useState('')

  /*
    Setting Property Type Using Query Value
  */
  useEffect(() => {
    dispatch(updatePropertyType(propertyType ? propertyType : ''))
  }, [propertyType, dispatch])

  /*
    Updating Selected Property Type on Click
  */
  useEffect(() => {
    setPropertyType(filter.sub_category ? filter.sub_category : 'Any')
  }, [filter])

  const handleAllChangeFilter = () => {
    dispatch(updateFurnishing(furnishing))
    dispatch(updateBathroom(bathroom))
    dispatch(updateBedroom(bedroom))
    // dispatch(updatePropertyType(propertyType))
    dispatch(updatePriceStart(priceMin))
    dispatch(updatePriceEnd(priceMax))
    dispatch(updatePageNumber(1))
  }

  const handleResetApplyFilter = () => {
    dispatch(updateFurnishing('Any'))
    dispatch(updateBathroom('Any'))
    dispatch(updateBedroom('Any'))
    dispatch(updatePropertyType('Any'))
    dispatch(updatePriceStart(100))
    dispatch(updatePriceEnd(100000))
    setFurnishing('Any')
    setBathroom('Any')
    setBedroom('Any')
    setPropertyType('Any')
    setPriceMin('')
    setPriceMax('')
    setFloorMin('')
    setFloorMax('')
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
  }
  const handleToggle2 = () => {
    setOpen2(prevOpen => !prevOpen)
    setOpen(false)
    setOpen3(false)
    setOpen4(false)
  }
  const handleToggle3 = () => {
    setOpen3(prevOpen => !prevOpen)
    setOpen2(false)
    setOpen(false)
    setOpen4(false)
  }
  const handleToggle4 = () => {
    setOpen4(prevOpen => !prevOpen)
    setOpen2(false)
    setOpen3(false)
    setOpen(false)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }
  const handleClose2 = (event: Event | React.SyntheticEvent) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen2(false)
  }
  const handleClose3 = (event: Event | React.SyntheticEvent) => {
    if (anchorRef3.current && anchorRef3.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen3(false)
  }
  const handleClose4 = (event: Event | React.SyntheticEvent) => {
    if (anchorRef4.current && anchorRef4.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen4(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  function handleListKeyDown2(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen2(false)
    } else if (event.key === 'Escape') {
      setOpen2(false)
    }
  }

  function handleListKeyDown3(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen3(false)
    } else if (event.key === 'Escape') {
      setOpen3(false)
    }
  }

  function handleListKeyDown4(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen4(false)
    } else if (event.key === 'Escape') {
      setOpen4(false)
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  const [applyFilter, setApplyFilter] = useState(false)

  const handleShowApplyFilter = () => setApplyFilter(show => !show)
  // const handleOpenDistrict = () => setOpenDistrict(show => !show)
  // const handleOpenMrtStation = () => setOpenMrtStation(show => !show)

  const handleMouseDownEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleChangeDistrict = (option: string) => {
    if (district.includes(option)) {
      if (option !== 'All of Singapore') {
        setDistrict(district.filter(item => item !== option))
      } else {
        setDistrict([])
      }
    } else {
      if (option == 'All of Singapore') {
        setDistrict(districtName.map(item => item.value))
      } else {
        setDistrict([...district, option])
      }
    }
  }

  const handleChangeMrt = (option: string) => {
    if (mrt.includes(option)) {
      setMrt(mrt.filter(item => item !== option))
    } else {
      setMrt([...mrt, option])
    }
  }

  // console.log("District List", district)
  return (
    <div className=" w-full  flex flex-col items-start justify-center space-x-0 space-y-3 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0 ">
      <div className=" w-full h-[60px] md:w-[55%] ">
        <OutlinedInput
          className="!bg-[#FFFFFF] !w-full !h-full !text-lg md:!text-base xl:!text-lg !border-[1px] !border-solid !border-[#034EA133] !text-[#A1A1A1] !rounded-[10px] !opacity-100 "
          // onChange={event => dispatch(updateSearchText(event.target.value))}
          defaultValue={searchtext}
          onChange={event => setSearchtext(event.target.value)}
          onKeyDown={event => event.key === 'Enter' && dispatch(updateSearchText(searchtext)) && handleApplyFilter()}
          id="outlined-search-input"
          startAdornment={
            <InputAdornment position="start">
              <IconButton edge="start">
                <FiSearch />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleShowApplyFilter} onMouseDown={handleMouseDownEvent} edge="end">
                {applyFilter ? <MdFilterListOff /> : <MdFilterList />}
              </IconButton>
            </InputAdornment>
          }
          placeholder={textnow}
        />
      </div>

      <div className="  w-full md:w-[45%] h-[60px] flex flex-row gap-1 sm:gap-2 xl:gap-3 items-start justify-between">
        <Button
          variant="text"
          ref={anchorRef2}
          id="composition-button"
          aria-controls={open2 ? 'composition-menu' : undefined}
          aria-expanded={open2 ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle2}
          disableElevation
          className={
            open2
              ? ' !bg-[#FFFFFF] xs:!w-[140px] sm:!w-[220px] md:!w-[120px] lg:!w-[140px] xl:!w-[184px] 2xl:!w-[232px] !h-full !border-2 !border-solid !border-[#00ADEE] !rounded-[10px] !capitalize'
              : ' !bg-[#FFFFFF] xs:!w-[140px] sm:!w-[220px] md:!w-[120px] lg:!w-[140px] xl:!w-[184px] 2xl:!w-[232px] !h-full !border-2 !border-solid !border-[#034EA133] !rounded-[10px] !capitalize'
          }
          endIcon={
            <Icon className={`${classes.rotate} ${open2 ? classes.rotate180 : ''} !text-[#505050]`}>
              <BsChevronDown />
            </Icon>
          }>
          <Typography
            fontWeight="normal"
            // sx={{ color: '#A1A1A1', fontSize: '18px' }}
            className=" !text-[#505050] !ext-sm  sm:!text-base md:!text-sm xl:!text-base 2xl:!text-lg !font-segoe !font-normal !capitalize]">
            Rental Type
          </Typography>
        </Button>
        <Popper
          className="!z-30 !w-[200px] !h-[240px] "
          open={open2}
          anchorEl={anchorRef2.current}
          role={undefined}
          placement="bottom"
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin: 'top',
              }}
              timeout={500}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose2}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown2}
                    className=" !mt-4 !w-full !flex !p-4 lg:!h-auto  !shadow-[0_15_30_#00000033] ">
                    <List className="!w-full">
                      {/* sx={{ px: '44px', py: '24px' }}*/}
                      {/* <Divider sx={{ paddingTop: '22px' }} /> */}
                      <FormControl className={`custom-radio-filter !w-full !mb-8 !mt-7`}>
                        {/*className={`custom-radio-filter !w-full`} */}
                        <RadioGroup onChange={(e: any) => setRentalType(e.target.value)} defaultValue={rentalType}>
                          {rental_Type.map((option: any, index: number) => (
                            <FormControlLabel key={index} control={<Radio />} {...option} />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <div
                          style={{
                            // height: '40px',
                            // padding: '12px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '20px',
                            color: '#034EA1',
                            opacity: '100%',
                          }}>
                          Rental Type
                        </div> */}
                        <div>
                          {/* <span style={{ paddingRight: '22px' }}>
                            <Button variant="text" sx={{ textTransform: 'none', fontSize: '18px' }}>
                              Reset
                            </Button>
                          </span> */}
                          <Button
                            variant="text"
                            onClick={() => dispatch(updateRentalType(rentalType)) && handleApplyFilter()}
                            sx={{
                              width: '140px',
                              height: '40px',
                              background: '#00ADEE 0% 0% no-repeat padding-box',
                              borderRadius: '10px',
                              opacity: '1',
                              fontSize: '18px',
                              textTransform: 'none',
                              color: '#FFFFFF',
                              '&:hover': { backgroundColor: '#00ADEE' },
                            }}>
                            Apply
                          </Button>
                        </div>
                      </div>
                    </List>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Button
          variant="text"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open3 ? 'composition-menu' : undefined}
          aria-expanded={open3 ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle3}
          disableElevation
          // onClick={handleOpenDistrict}
          // sx={{
          //   height: '60px',
          //   width: '170px',
          //   border: `2px solid ${openDistrict ? '#00ADEE' : '#034EA1'}`,
          //   borderRadius: '10px',
          //   textTransform: 'none',
          // }}
          className={
            open3
              ? ' !bg-[#FFFFFF] xs:!w-[140px] sm:!w-[220px] md:!w-[120px] lg:!w-[140px] xl:!w-[184px] 2xl:!w-[232px] !h-full !border-2 !border-solid !border-[#00ADEE] !rounded-[10px] !capitalize'
              : ' !bg-[#FFFFFF] xs:!w-[140px] sm:!w-[220px] md:!w-[120px] lg:!w-[140px] xl:!w-[184px] 2xl:!w-[232px] !h-full !border-2 !border-solid !border-[#034EA133] !rounded-[10px] !capitalize'
          }
          endIcon={
            <Icon className={`${classes.rotate} ${open3 ? classes.rotate180 : ''} !text-[#505050]`}>
              <BsChevronDown />
            </Icon>
          }>
          <Typography
            fontWeight="normal"
            // sx={{ color: '#A1A1A1', fontSize: '18px' }}>
            className=" !text-[#505050] !text-sm  sm:!text-base md:!text-sm xl:!text-base 2xl:!text-lg !font-segoe !font-normal !capitalize]">
            Districts
          </Typography>
        </Button>
        <Popper
          className="!z-30 !w-auto"
          open={open3}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin: 'top',
              }}
              timeout={500}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose3}>
                  <MenuList
                    autoFocusItem={open3}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown3}
                    sx={{
                      borderRadius: 0,
                      marginTop: '30px',
                      // height: '715px',
                      // maxWidth: '998px',
                      // width: '60%',
                      boxShadow: '0px 15px 30px #00000033',
                    }}>
                    <List sx={{ px: '44px', py: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                          style={{
                            // height: '40px',
                            // padding: '12px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '20px',
                            color: '#034EA1',
                            opacity: '100%',
                          }}>
                          Districts
                        </div>
                        <div>
                          <span style={{ paddingRight: '22px' }}>
                            <Button
                              onClick={() => {
                                setOpen3(false)
                                setTimeout(() => {
                                  setOpen3(true)
                                }, 1000)
                                // setDistrict(['All of Singapore'])
                                setDistrict(districtName.map(item => item.value))
                              }}
                              variant="text"
                              sx={{ textTransform: 'none', fontSize: '18px' }}>
                              Reset
                            </Button>
                          </span>
                          <Button
                            variant="text"
                            onClick={() => dispatch(updateDistrict(district[0])) && handleApplyFilter()}
                            sx={{
                              width: '100px',
                              height: '40px',
                              background: '#00ADEE 0% 0% no-repeat padding-box',
                              borderRadius: '10px',
                              opacity: '1',
                              fontSize: '18px',
                              textTransform: 'none',
                              color: '#FFFFFF',
                              '&:hover': { backgroundColor: '#00ADEE' },
                            }}>
                            Apply
                          </Button>
                        </div>
                      </div>
                      <Divider sx={{ paddingTop: '22px' }} />
                      <FormControl className=" !w-full" sx={{ paddingTop: '30px' }} component="fieldset">
                        <FormGroup onChange={(e: any) => handleChangeDistrict(e.target.value)} aria-label="options">
                          <div
                            // style={{ display: 'flex', justifyContent: 'space-between' }}
                            className=" !h-auto !w-full">
                            <div className="!w-full !grid !grid-cols-2 !gap-x-5">
                              {districtName.map((entr: any, _: number) => (
                                <FormControlLabel
                                  key={entr.label}
                                  style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                  value={entr.value}
                                  control={
                                    <Checkbox
                                      checked={district.includes(entr.value)}
                                      icon={
                                        <Icon
                                          sx={{
                                            width: '25px',
                                            height: '25px',
                                            border: '1px solid #C2C2C2',
                                            borderRadius: '5px',
                                            opacity: '1',
                                          }}></Icon>
                                      }
                                      checkedIcon={
                                        <Icon
                                          sx={{
                                            width: '25px',
                                            height: '25px',
                                            border: '1px solid #C2C2C2',
                                            background: '#00ADEE 0% 0% no-repeat padding-box',
                                            borderRadius: '5px',
                                            opacity: '1',
                                          }}></Icon>
                                      }
                                    />
                                  }
                                  label={entr.label}
                                />
                              ))}
                            </div>
                            {/* <div>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((_: any, index: number) => (
                                <FormControlLabel
                                  key={index}
                                  style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                  value="option1"
                                  control={
                                    <Checkbox
                                      icon={
                                        <Icon
                                          sx={{
                                            width: '25px',
                                            height: '25px',
                                            border: '1px solid #C2C2C2',
                                            borderRadius: '5px',
                                            opacity: '1',
                                          }}></Icon>
                                      }
                                      checkedIcon={
                                        <Icon
                                          sx={{
                                            width: '25px',
                                            height: '25px',
                                            border: '1px solid #C2C2C2',
                                            background: '#00ADEE 0% 0% no-repeat padding-box',
                                            borderRadius: '5px',
                                            opacity: '1',
                                          }}></Icon>
                                      }
                                    />
                                  }
                                  label="Any"
                                />
                              ))}
                            </div> */}
                          </div>
                        </FormGroup>
                      </FormControl>
                    </List>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>

        <Button
          variant="text"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open4 ? 'composition-menu' : undefined}
          aria-expanded={open4 ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle4}
          disableElevation
          className={
            open4
              ? ' !hidden !bg-[#FFFFFF] xs:!w-[140px] sm:!w-[220px] md:!w-[120px] lg:!w-[140px] xl:!w-[184px] 2xl:!w-[232px] !h-full !border-2 !border-solid !border-[#00ADEE] !rounded-[10px] !capitalize'
              : ' !hidden !bg-[#FFFFFF] xs:!w-[140px] sm:!w-[220px] md:!w-[120px] lg:!w-[140px] xl:!w-[184px] 2xl:!w-[232px] !h-full !border-2 !border-solid !border-[#034EA133] !rounded-[10px] !capitalize'
          }
          endIcon={
            <Icon className={`${classes.rotate} ${open4 ? classes.rotate180 : ''} !text-[#505050]`}>
              <BsChevronDown />
            </Icon>
          }>
          <Typography
            fontWeight="normal"
            className=" !text-[#505050] !text-sm  sm:!text-base md:!text-sm xl:!text-base 2xl:!text-lg !font-segoe !font-normal !capitalize]">
            MRT Station
          </Typography>
        </Button>
        <Popper
          className="!z-30 !w-full"
          open={open4}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin: 'top',
              }}
              timeout={500}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose4}>
                  <MenuList
                    autoFocusItem={open4}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown4}
                    sx={{
                      borderRadius: 0,
                      marginTop: '30px',
                      boxShadow: '0px 15px 30px #00000033',
                    }}>
                    <List sx={{ px: '44px', py: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '20px',
                            color: '#034EA1',
                            opacity: '100%',
                          }}>
                          MRT Station
                        </div>
                        <div>
                          <span style={{ paddingRight: '22px' }}>
                            <Button
                              onClick={() => {
                                setOpen4(false)
                                setTimeout(() => {
                                  setOpen4(true)
                                }, 1000)
                                setMrt([])
                              }}
                              variant="text"
                              sx={{ textTransform: 'none', fontSize: '18px' }}>
                              Reset
                            </Button>
                          </span>
                          <Button
                            onClick={() => dispatch(updateMrt(mrt[0])) && handleApplyFilter()}
                            variant="text"
                            sx={{
                              width: '100px',
                              height: '40px',
                              background: '#00ADEE 0% 0% no-repeat padding-box',
                              borderRadius: '10px',
                              opacity: '1',
                              fontSize: '18px',
                              textTransform: 'none',
                              color: '#FFFFFF',
                              '&:hover': { backgroundColor: '#00ADEE' },
                            }}>
                            Apply
                          </Button>
                        </div>
                      </div>
                      <Divider sx={{ paddingTop: '22px' }} />
                      <FormControl className=" !w-full" sx={{ paddingTop: '30px' }} component="fieldset">
                        <FormGroup onChange={(e: any) => handleChangeMrt(e.target.value)} aria-label="options">
                          <div
                            // style={{ display: 'flex', justifyContent: 'space-between' }}
                            className=" !h-auto !w-full">
                            <div className="!w-full !grid !grid-cols-8 !gap-x-8">
                              {MRT.map((entr: any, _: number) => (
                                <FormControlLabel
                                  key={entr.label}
                                  style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                  value={entr.value}
                                  control={
                                    <Checkbox
                                      defaultChecked={mrt.includes(entr.value)}
                                      icon={
                                        <Icon
                                          sx={{
                                            width: '25px',
                                            height: '25px',
                                            border: '1px solid #C2C2C2',
                                            borderRadius: '5px',
                                            opacity: '1',
                                          }}></Icon>
                                      }
                                      checkedIcon={
                                        <Icon
                                          sx={{
                                            width: '25px',
                                            height: '25px',
                                            border: '1px solid #C2C2C2',
                                            background: '#00ADEE 0% 0% no-repeat padding-box',
                                            borderRadius: '5px',
                                            opacity: '1',
                                          }}></Icon>
                                      }
                                    />
                                  }
                                  label={entr.label}
                                />
                              ))}
                            </div>
                          </div>
                        </FormGroup>
                      </FormControl>
                    </List>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
        {/* </Grid> */}
        {/* <Grid sx={{ paddingLeft: '0px' }}> */}
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          disableElevation
          variant="text"
          // sx={{
          //   height: '60px',
          //   width: '170px',
          //   border: '2px solid #034EA1',
          //   borderRadius: '10px',
          //   textTransform: 'none',
          // }}
          className=" !bg-[#FFFFFF] xs:!w-[140px] sm:!w-[220px] md:!w-[120px] lg:!w-[140px] xl:!w-[184px] 2xl:!w-[232px] !h-full !border-2 !border-solid !border-[#034EA133] !rounded-[10px] !capitalize"
          startIcon={
            <svg
              id="Glyph"
              xmlns="http://www.w3.org/2000/svg"
              className=" !hidden sm:!block sm:!w-[19px] md:!w-[17px] lg:!w-[19px] xl:!w-[24px] sm:!h-[17.78px] md:!h-[15.78px] lg:!h-[17.78px] 2xl:!h-[21.78px]"
              viewBox="0 0 25 22.78">
              <path
                id="Path_21222"
                data-name="Path 21222"
                d="M19.545,6.144a3.409,3.409,0,1,1,3.409,3.417A3.413,3.413,0,0,1,19.545,6.144ZM2.5,7.283H16.136a1.139,1.139,0,0,0,0-2.278H2.5a1.139,1.139,0,0,0,0,2.278ZM9.318,10.7a3.41,3.41,0,0,0-3.2,2.278H2.5a1.139,1.139,0,0,0,0,2.278H6.114a3.41,3.41,0,1,0,3.2-4.556Zm15.909,2.278H16.136a1.139,1.139,0,0,0,0,2.278h9.091a1.139,1.139,0,0,0,0-2.278ZM11.591,20.951H2.5a1.139,1.139,0,0,0,0,2.278h9.091a1.139,1.139,0,0,0,0-2.278Zm13.636,0H21.614a3.416,3.416,0,1,0,0,2.278h3.614a1.139,1.139,0,0,0,0-2.278Z"
                transform="translate(-1.364 -2.727)"
                fill="#a1a1a1"
              />
            </svg>
          }
          endIcon={
            <Box
              className=" !w-[25px] !h-[25px] sm:!w-[23px] sm:!h-[23px]  md:!w-[20px] md:!h-[20px] xl:!w-[26px] xl:!h-[26px] !bg-[#505050] !bg-no-repeat !bg-clip-padding !rounded-full !text-center !flex !justify-center !items-center !text-[#FFFFFF] !text-xs sm:!text-base md:!text-xs lg:!text-sm xl:!text-base "
            // sx={{
            //   height: '25px',
            //   width: '25px',
            //   background: '#A1A1A1 0% 0% no-repeat padding-box',
            //   borderRadius: '50%',
            //   justifyContent: 'center',
            //   textAlign:'center',
            //   display: 'flex',
            //   alignItems: 'center',
            //   color: '#FFFFFF',
            //   fontSize: '16px',
            // }}
            >
              <p className=" !font-roboto !text-[#FFFFFF] !text-center !text-xs sm:!text-sm md:!text-xs lg:!text-sm xl:!text-base">
                {/* Filters count */}
                {filtersCount(furnishing != 'Any') +
                  filtersCount(bedroom != 'Any') +
                  filtersCount(bathroom != 'Any') +
                  filtersCount(propertyType != 'Any') +
                  // filtersCount(floorMin!='Any' || floorMax != 'Any') +
                  filtersCount(priceMin != '' || priceMax != '')}
              </p>
            </Box>
          }>
          <Typography
            fontWeight="normal"
            // sx={{ color: '#A1A1A1', fontSize: '18px' }}>
            className=" !text-[#505050] !text-sm  sm:!text-base md:!text-sm xl:!text-base 2xl:!text-lg !font-segoe !font-normal !capitalize">
            Filters
          </Typography>
        </Button>
        <Popper
          className="!z-30 !w-full md:!w-auto"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin: 'top',
              }}
              timeout={500}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    // sx={{
                    //   borderRadius: 0,
                    //   marginTop: '30px',
                    //   maxWidth: '1550px',
                    //   // minHeight: '610px',
                    //   boxShadow: '0px 15px 30px #00000033',
                    // }}
                    className=" !mt-4 !w-full md:!max-w-[700px] lg:!max-w-[1550px] !max-h-[780px] !overflow-y-auto !lg:h-auto  !shadow-[0_15_30_#00000033] ">
                    <List sx={{ px: '44px', py: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className=" !text-sm sm:!text-base md:!text-lg !text-[#034EA1] ">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <svg
                              id="Glyph"
                              xmlns="http://www.w3.org/2000/svg"
                              // width="35"
                              // height="35"
                              viewBox="0 -4 35 35"
                              className=" !w-[30px] !h-[30px] md:!w-[35px] md:!h-[35px]">
                              <path
                                id="Path_21222"
                                data-name="Path 21222"
                                d="M19.545,6.144a3.409,3.409,0,1,1,3.409,3.417A3.413,3.413,0,0,1,19.545,6.144ZM2.5,7.283H16.136a1.139,1.139,0,0,0,0-2.278H2.5a1.139,1.139,0,0,0,0,2.278ZM9.318,10.7a3.41,3.41,0,0,0-3.2,2.278H2.5a1.139,1.139,0,0,0,0,2.278H6.114a3.41,3.41,0,1,0,3.2-4.556Zm15.909,2.278H16.136a1.139,1.139,0,0,0,0,2.278h9.091a1.139,1.139,0,0,0,0-2.278ZM11.591,20.951H2.5a1.139,1.139,0,0,0,0,2.278h9.091a1.139,1.139,0,0,0,0-2.278Zm13.636,0H21.614a3.416,3.416,0,1,0,0,2.278h3.614a1.139,1.139,0,0,0,0-2.278Z"
                                transform="translate(-1.364 -2.727)"
                                fill="#034EA1"
                              />
                            </svg>
                            Filters
                          </div>
                        </div>
                        <div className=" !flex !items-center">
                          <span className=" !pr-0 sm:!pr-3 md:!pr-[22px]">
                            <Button
                              onClick={() => {
                                handleResetApplyFilter()
                                setOpen(false)
                                setTimeout(() => {
                                  setOpen(true)
                                }, 1000)
                              }}
                              variant="text"
                              sx={{ textTransform: 'none' }}
                              className=" !w-[90px] sm:!w-[125px] md:!w-[135px] !h-8 md:!h-10 !text-sm sm:!text-base md:!text-lg ">
                              Reset Filter
                            </Button>
                          </span>
                          <Button
                            onClick={() => {
                              handleAllChangeFilter()
                              handleApplyFilter()
                              setOpen(false)
                            }}
                            variant="text"
                            className=" !w-[90px] sm:!w-[125px] md:!w-[135px] !h-8 md:!h-10 !text-sm sm:!text-base  md:!text-lg "
                            sx={{
                              // width: '135px',
                              // height: '40px',
                              background: '#00ADEE 0% 0% no-repeat padding-box',
                              borderRadius: '10px',
                              opacity: '1',
                              // fontSize: '18px',
                              textTransform: 'none',
                              color: '#FFFFFF',
                              '&:hover': {
                                backgroundColor: '#00ADEE',
                              },
                            }}>
                            Apply Filter
                          </Button>
                        </div>
                      </div>
                      <Divider sx={{ paddingTop: '22px' }} />
                      {/* <Grid container> */}
                      <div className=" !container !flex !flex-col lg:!flex-row  ">
                        <Grid
                          item
                          // sx={{ width: '530px' }}
                          className=" !w-auto">
                          {/* <Grid container> */}
                          <div className=" !w-full !flex !flex-col ">
                            <div className=" !w-full !flex !flex-col lg:!flex-row">
                              <Grid
                                item
                                // sx={{ paddingTop: '30px', height: '240px', width: '200px' }}
                                className=" !pt-6 lg:!pt-[30px] !w-full lg:!w-[140px] xl:!w-[180px] 2xl:!w-[200px] !h-auto lg:!h-[160px] xl:!h-[180px] 2xl:!h-[240px]">
                                <FormControl component="fieldset">
                                  <p className=" !text-base 2xl:!text-lg !text-[#034EA1]">Furnishing</p>
                                  <RadioGroup
                                    row
                                    defaultValue={furnishing}
                                    onChange={event => {
                                      setFurnishing(event.target.value.split(' ')[0])
                                    }}
                                    sx={{ paddingTop: '16px' }}
                                    // className=' inline-block pt-3 lg:pt-4'
                                    aria-label="options"
                                    name="options">
                                    {['Any', 'Fully Furnished', 'Unfurnished', 'Partially Furnished'].map(
                                      (condition: string, index: number) => (
                                        <FormControlLabel
                                          key={index}
                                          // style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                          className=" !w-auto lg:!w-[66%] 2xl:!w-[100%] !text-sm lg:!text-base 2xl:!text-lg !text-[#034EA1] "
                                          value={condition.split(' ')[0]}
                                          control={
                                            <Radio
                                              icon={
                                                <Icon
                                                  // sx={{
                                                  //   width: '25px',
                                                  //   height: '25px',
                                                  //   border: '1px solid #C2C2C2',
                                                  //   borderRadius: '5px',
                                                  //   opacity: '1',
                                                  // }}
                                                  className=" !w-4 2xl:!w-5 !h-4 2xl:!h-5 !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]"></Icon>
                                              }
                                              checkedIcon={
                                                <Icon
                                                  // sx={{
                                                  //   width: '25px',
                                                  //   height: '25px',
                                                  //   border: '1px solid #C2C2C2',
                                                  //   background: '#00ADEE 0% 0% no-repeat padding-box',
                                                  //   borderRadius: '5px',
                                                  //   opacity: '1',
                                                  // }}
                                                  className="  !w-4 2xl:!w-5 !h-4 2xl:!h-5 !border-[1px] !border-solid !border-[#C2C2C2] !bg-[#00ADEE] !bg-no-repeat !rounded-[5px]"></Icon>
                                              }
                                            />
                                          }
                                          label={condition}
                                        />
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                // style={{ paddingTop: '30px', height: '240px', width: '330px' }}
                                className=" !pt-6 lg:!pt-[30px] !w-[260px] xl:!w-[330px] !h-[130px] lg:!h-[160px] xl:!h-[180px] 2xl:!h-[240px] ">
                                <Grid item>
                                  <FormControl component="fieldset">
                                    <p className=" !text-base 2xl:!text-lg !text-[#034EA1]">Floor Area (Sqft)</p>
                                    <Grid item sx={{ marginTop: '20px' }}>
                                      <OutlinedInput
                                        defaultValue={floorMin}
                                        onChange={event => setFloorMin(event.target.value)}
                                        id="outlined-search-input"
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton onMouseDown={handleMouseDownEvent} edge="end">
                                              {/* <Icon className={`${classes.rotate} ${false ? classes.rotate180 : ''}`}> */}
                                              <Icon className={`${classes.rotate} !flex !items-center !justify-center`}>
                                                <BsChevronDown className=" w-3 h-3 lg:!w-4 lg:!h-4 xl:!w-5 xl:!h-5" />
                                              </Icon>
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        placeholder="Min"
                                        // sx={{
                                        //   height: '40px',
                                        //   width: '150px',
                                        //   border: '1px solid #034EA1',
                                        //   borderRadius: '5px',
                                        //   opacity: 1,
                                        //   fontSize: '18px',
                                        //   color: '#A1A1A1',
                                        //   marginRight: '8px',
                                        // }}
                                        className=" !w-[100px] lg:!w-[110px] xl:!w-[140px] 2xl:!w-[150px] !h-[30px] xl:!h-[40px] !border-[1px] !border-solid !border-[#034EA133] !rounded-[5px] !text-lg !text-[#A1A1A1] !mr-2"
                                      />
                                      <span>-</span>
                                      <OutlinedInput
                                        defaultValue={floorMax}
                                        onChange={event => setFloorMax(event.target.value)}
                                        id="outlined-search-input"
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton onMouseDown={handleMouseDownEvent} edge="end">
                                              <Icon className={`${classes.rotate} !flex !items-center !justify-center`}>
                                                <BsChevronDown className=" !w-3 !h-3 lg:!w-4 lg:!h-4 xl:!w-5 xl:!h-5" />
                                              </Icon>
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        placeholder="Max"
                                        // sx={{
                                        //   height: '40px',
                                        //   width: '150px',
                                        //   border: '1px solid #034EA1',
                                        //   borderRadius: '5px',
                                        //   opacity: 1,
                                        //   fontSize: '18px',
                                        //   color: '#A1A1A1',
                                        //   marginLeft: '8px',
                                        // }}
                                        className=" !w-[100px] lg:!w-[110px] xl:!w-[140px] 2xl:!w-[150px] !h-[30px] xl:!h-[40px] !border-[1px] !border-solid !border-[#034EA133] !rounded-[5px] !text-lg !text-[#A1A1A1] !ml-2"
                                      />
                                    </Grid>
                                  </FormControl>
                                </Grid>
                                <Grid item sx={{ marginTop: '20px' }}>
                                  <FormControl component="fieldset">
                                    <p className=" md:!text-base 2xl:!text-lg !text-[#034EA1]">
                                      Price Range ( $100 - $100000 )
                                    </p>
                                    <Grid item sx={{ marginTop: '20px' }}>
                                      <OutlinedInput
                                        type="number"
                                        defaultValue={priceMin}
                                        onChange={event => {
                                          setPriceMin(event.target.value)
                                        }}
                                        id="outlined-search-input"
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton onMouseDown={handleMouseDownEvent} edge="end">
                                              <Icon
                                                className={`${classes.rotate} ${applyFilter ? classes.rotate180 : ''
                                                  } !flex !items-center !justify-center`}>
                                                <BsChevronDown className=" !w-3 !h-3 lg:!w-4 lg:!h-4 xl:!w-5 xl:!h-5" />
                                              </Icon>
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        placeholder="Min"
                                        // sx={{
                                        //   height: '40px',
                                        //   width: '150px',
                                        //   border: '1px solid #034EA1',
                                        //   borderRadius: '5px',
                                        //   opacity: 1,
                                        //   fontSize: '18px',
                                        //   color: '#A1A1A1',
                                        //   marginRight: '8px',
                                        // }}
                                        className=" !w-[100px] lg:!w-[110px] xl:!w-[140px] 2xl:!w-[150px] !h-[30px] xl:!h-[40px] !border-[1px] !border-solid !border-[#034EA133] !rounded-[5px] !text-lg !text-[#A1A1A1] !mr-2"
                                      />
                                      <span>-</span>
                                      <OutlinedInput
                                        type="number"
                                        defaultValue={priceMax}
                                        onChange={event => {
                                          setPriceMax(event.target.value)
                                        }}
                                        id="outlined-search-input"
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton onMouseDown={handleMouseDownEvent} edge="end">
                                              <Icon
                                                className={`${classes.rotate} ${applyFilter ? classes.rotate180 : ''
                                                  } !flex !items-center !justify-center`}>
                                                <BsChevronDown className=" !w-3 !h-3 lg:!w-4 lg:!h-4 xl:!w-5 xl:!h-5" />
                                              </Icon>
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        placeholder="Max"
                                        // sx={{
                                        //   height: '40px',
                                        //   width: '150px',
                                        //   border: '1px solid #034EA1',
                                        //   borderRadius: '5px',
                                        //   opacity: 1,
                                        //   fontSize: '18px',
                                        //   color: '#A1A1A1',
                                        //   marginLeft: '8px',
                                        // }}
                                        className=" !w-[100px] lg:!w-[110px] xl:!w-[140px] 2xl:!w-[150px] !h-[30px] xl:!h-[40px] !border-[1px] !border-solid !border-[#034EA133] !rounded-[5px] !text-lg !text-[#A1A1A1] !ml-2"
                                      />
                                    </Grid>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                            <Grid container>
                              <Grid
                                //  sx={{ width: '474px', paddingTop: '30px' }}
                                className=" !w-[380px] lg:!w-[420px]  xl:!w-[470px] 2xl:!w-[530px] !pt-24 lg:!pt-24 xl:!pt-20 2xl:!pt-8">
                                <Grid item>
                                  <p className=" !text-base 2xl:!text-lg !text-[#034EA1]">Bedroom</p>
                                  <Grid
                                    sx={{ marginTop: '20px' }}
                                    className=" !gap-[8px] xl:!gap-[12px] 2xl:!gap-[15px]"
                                    container>
                                    <Grid item>
                                      <Button
                                        onClick={() => setBedroom('Any')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          backgroundColor: bedroom === 'Any' ? '#00ADEE' : '#FFFFFF',
                                          color: bedroom === 'Any' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className=" !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        Any
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBedroom('Studio')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          backgroundColor: bedroom === 'Studio' ? '#00ADEE' : '#FFFFFF',
                                          color: bedroom === 'Studio' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className=" !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        Studio
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBedroom('1')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth:"40px",
                                          backgroundColor: bedroom === '1' ? '#00ADEE' : '#FFFFFF',
                                          color: bedroom === '1' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        1
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBedroom('2')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth:"40px",
                                          backgroundColor: bedroom === '2' ? '#00ADEE' : '#FFFFFF',
                                          color: bedroom === '2' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        2
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBedroom('3')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth:"40px",
                                          backgroundColor: bedroom === '3' ? '#00ADEE' : '#FFFFFF',
                                          color: bedroom === '3' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        3
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBedroom('4')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth:"40px",
                                          backgroundColor: bedroom === '4' ? '#00ADEE' : '#FFFFFF',
                                          color: bedroom === '4' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        4
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBedroom('5+')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth: '40px',
                                          backgroundColor: bedroom === '5+' ? '#00ADEE' : '#FFFFFF',
                                          color: bedroom === '5+' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        5+
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item sx={{ marginTop: '25px' }}>
                                  <p className=" !text-base 2xl:!text-lg !text-[#034EA1]">Bathroom</p>
                                  <Grid
                                    sx={{ marginTop: '20px' }}
                                    className=" !gap-[8px] xl:!gap-[12px] 2xl:!gap-[15px]"
                                    container>
                                    <Grid item>
                                      <Button
                                        onClick={() => setBathroom('Any')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          backgroundColor: bathroom === 'Any' ? '#00ADEE' : '#FFFFFF',
                                          color: bathroom === 'Any' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className=" !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        Any
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBathroom('1')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth: '40px',
                                          backgroundColor: bathroom === '1' ? '#00ADEE' : '#FFFFFF',
                                          color: bathroom === '1' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        1
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBathroom('2')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth: '40px',
                                          backgroundColor: bathroom === '2' ? '#00ADEE' : '#FFFFFF',
                                          color: bathroom === '2' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        2
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBathroom('3')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth: '40px',
                                          backgroundColor: bathroom === '3' ? '#00ADEE' : '#FFFFFF',
                                          color: bathroom === '3' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        3
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBathroom('4')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth: '40px',
                                          backgroundColor: bathroom === '4' ? '#00ADEE' : '#FFFFFF',
                                          color: bathroom === '4' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        4
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBathroom('5')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth: '40px',
                                          backgroundColor: bathroom === '5' ? '#00ADEE' : '#FFFFFF',
                                          color: bathroom === '5' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        5
                                      </Button>
                                    </Grid>
                                    <Grid item sx={{ paddingLeft: '0px' }}>
                                      <Button
                                        onClick={() => setBathroom('6')}
                                        sx={{
                                          textTransform: 'none',
                                          // border: '1px solid #C2C2C2',
                                          // borderRadius: '5px',
                                          // minWidth: '40px',
                                          backgroundColor: bathroom === '6' ? '#00ADEE' : '#FFFFFF',
                                          color: bathroom === '6' ? '#FFFFFFB3' : '#414141B3',
                                        }}
                                        className="!min-w-[40px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[5px]">
                                        6
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            {/* <Grid item sx={{ paddingTop: '30px', paddingLeft: '34px', height: '240px' }}>
                              <FormControl component="fieldset">
                                <p style={{ fontSize: '18px', color: '#034EA1' }}>Property Type</p>
                                <RadioGroup
                                  defaultValue="Any"
                                  onChange={event => setPropertyType(event.target.value)}
                                  sx={{ paddingTop: '16px' }}
                                  aria-label="options"
                                  name="options">
                                  {['Any', 'Condo', 'Landed', 'HDB'].map((typo: string) => (
                                    <FormControlLabel
                                      key={typo}
                                      style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                      value={typo}
                                      control={
                                        <Radio
                                          icon={
                                            <Icon
                                              sx={{
                                                width: '25px',
                                                height: '25px',
                                                border: '1px solid #C2C2C2',
                                                borderRadius: '50%',
                                                opacity: '1',
                                              }}></Icon>
                                          }
                                          checkedIcon={
                                            <Icon
                                              sx={{
                                                width: '25px',
                                                height: '25px',
                                                border: '1px solid #C2C2C2',
                                                background: '#00ADEE 0% 0% no-repeat padding-box',
                                                borderRadius: '50%',
                                                opacity: '1',
                                              }}></Icon>
                                          }
                                        />
                                      }
                                      label={typo}
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </Grid> */}
                          </div>
                          {/* </Grid> */}
                        </Grid>

                        <Grid
                          item
                          // sx={{ paddingTop: '30px', marginLeft: '60px', height: '100%' }}
                          className=" !pt-6 lg:!pt-[30px] !ml-0 lg:!ml-[10px] 2xl:!ml-[20px] !h-auto">
                          <FormControl component="fieldset">
                            <p style={{ fontSize: '18px', color: '#034EA1' }}>Property Type</p>
                            <RadioGroup
                              // defaultValue={filter.sub_category}
                              value={propertyType}
                              onChange={event => {
                                dispatch(updatePropertyType(event.target.value))
                                // setPropertyType(event.target.value)
                              }}
                              // sx={{ paddingTop: '16px' }}
                              className=" !pt-3 lg:!pt-[16px] !inline-block lg:!flex"
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
                                        <Icon
                                          // sx={{
                                          //   width: '25px',
                                          //   height: '25px',
                                          //   border: '1px solid #C2C2C2',
                                          //   borderRadius: '50%',
                                          //   opacity: '1',
                                          // }}
                                          className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                                      }
                                      checkedIcon={
                                        <Icon
                                          // sx={{
                                          //   width: '25px',
                                          //   height: '25px',
                                          //   border: '1px solid #C2C2C2',
                                          //   background: '#00ADEE 0% 0% no-repeat padding-box',
                                          //   borderRadius: '50%',
                                          //   opacity: '1',
                                          // }}
                                          className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                                      }
                                    />
                                  }
                                  label={typo}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        {/* <Collapse
                          orientation="horizontal"
                          in={propertyType === 'HDB' || propertyType === 'Condo' || propertyType === 'Landed'}
                          timeout={500}
                          className="">
                          <div
                            //item
                            // sx={{ paddingLeft: '30px', width: '230px', height: '454px' }}
                            className=" w-full lg:w-[180px]  h-auto pl-0 lg:pl-[30px]">
                            <Grid sx={{ paddingTop: '30px' }} className="!w-[100%]">
                              <p style={{ paddingBottom: '18px', fontSize: '18px', color: '#034EA1' }}>
                                Unit Type ({propertyType})
                              </p>
                              <Box
                                sx={{
                                  // width: '386px',
                                  // height: '400px',
                                  // overflow: 'auto',
                                  scrollbarWidth: 'thin',
                                  '&::-webkit-scrollbar': {
                                    width: '0.4em',
                                    height: '0em',
                                  },
                                  '&::-webkit-scrollbar-track': {
                                    background: '#f1f1f1',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#C2C2C2',
                                  },
                                  '&::-webkit-scrollbar-thumb:hover': {
                                    background: '#00ADEE',
                                  },
                                }}
                                className=" w-auto h-[400px] overflow-auto">
                                <FormControl className="pl-2 " component="fieldset">
                                  <RadioGroup
                                    onChange={event => console.log(event.target.value)}
                                    aria-label="options"
                                    name="options">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                                      (value: number, index: number) => (
                                        <FormControlLabel
                                          key={value + index}
                                          style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                          value={value + index}
                                          control={
                                            <Radio
                                              icon={
                                                <Icon
                                                  // sx={{
                                                  //   width: '25px',
                                                  //   height: '25px',
                                                  //   border: '1px solid #C2C2C2',
                                                  //   borderRadius: '5px',
                                                  //   opacity: '1',
                                                  // }}
                                                  className=" w-[25px] h-[25px] border-[1px] border-solid border-[#C2C2C2] rounded-md opacity-100"></Icon>
                                              }
                                              checkedIcon={
                                                <Icon
                                                  // sx={{
                                                  //   width: '25px',
                                                  //   height: '25px',
                                                  //   border: '1px solid #C2C2C2',
                                                  //   background: '#00ADEE 0% 0% no-repeat padding-box',
                                                  //   borderRadius: '5px',
                                                  //   opacity: '1',
                                                  // }}
                                                  className=" w-[25px] h-[25px] bg-[#00ADEE] bg-no-repeat border-[1px] border-solid border-[#C2C2C2] rounded-md opacity-100"></Icon>
                                              }
                                            />
                                          }
                                          label="1 Room/Studio"
                                        />
                                      )
                                    )}
                                  </RadioGroup>
                                  <RadioGroup
                                    onChange={event => console.log(event.target.value)}
                                    aria-label="options"
                                    name="options">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                                      (value: number, index: number) => (
                                        <FormControlLabel
                                          key={value + index}
                                          style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                          value={value + index}
                                          control={
                                            <Radio
                                              icon={
                                                <Icon
                                                  // sx={{
                                                  //   width: '25px',
                                                  //   height: '25px',
                                                  //   border: '1px solid #C2C2C2',
                                                  //   borderRadius: '5px',
                                                  //   opacity: '1',
                                                  // }}
                                                  className=" w-[25px] h-[25px] border-[1px] border-solid border-[#C2C2C2] rounded-md opacity-100"></Icon>
                                              }
                                              checkedIcon={
                                                <Icon
                                                  // sx={{
                                                  //   width: '25px',
                                                  //   height: '25px',
                                                  //   border: '1px solid #C2C2C2',
                                                  //   background: '#00ADEE 0% 0% no-repeat padding-box',
                                                  //   borderRadius: '5px',
                                                  //   opacity: '1',
                                                  // }}
                                                  className=" w-[25px] h-[25px] bg-[#00ADEE] bg-no-repeat border-[1px] border-solid border-[#C2C2C2] rounded-md opacity-100"></Icon>
                                              }
                                            />
                                          }
                                          label="2A"
                                        />
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                              </Box>
                            </Grid>
                          </div>
                        </Collapse> */}
                        <Collapse
                          orientation="horizontal"
                          in={propertyType === 'HDB' || propertyType === 'Condo' || propertyType === 'Landed'}
                          timeout={500}>
                          <div className=" !w-full lg:!w-[280px]  !h-auto !pl-0 lg:!pl-[30px]">
                            <Grid sx={{ paddingTop: '30px' }} className="!w-[100%]">
                              <p style={{ paddingBottom: '18px', fontSize: '18px', color: '#034EA1' }}>
                                Unit Type ({propertyType})
                              </p>
                              <Box
                                sx={{
                                  // width: '200px',
                                  // height: '400px',
                                  // overflow: 'auto',
                                  scrollbarWidth: 'thin',
                                  '&::-webkit-scrollbar': {
                                    width: '0.4em',
                                    height: '0em',
                                  },
                                  '&::-webkit-scrollbar-track': {
                                    background: '#f1f1f1',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#C2C2C2',
                                  },
                                  '&::-webkit-scrollbar-thumb:hover': {
                                    background: '#00ADEE',
                                  },
                                }}
                                className=" !w-auto !h-[400px] !overflow-auto">
                                <FormControl sx={{ paddingLeft: '8px' }} component="fieldset">
                                  <div className=" !flex !justify-between">
                                    <RadioGroup
                                      onChange={event => console.log(event.target.value)}
                                      aria-label="options"
                                      name="options">
                                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div>
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                                            (value: number, index: number) => (
                                              <FormControlLabel
                                                key={value + index}
                                                style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                                value={value + index}
                                                control={
                                                  <Radio
                                                    icon={
                                                      <Icon
                                                        // sx={{
                                                        //   width: '25px',
                                                        //   height: '25px',
                                                        //   border: '1px solid #C2C2C2',
                                                        //   borderRadius: '5px',
                                                        //   opacity: '1',
                                                        // }}
                                                        className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-md !opacity-100"></Icon>
                                                    }
                                                    checkedIcon={
                                                      <Icon
                                                        // sx={{
                                                        //   width: '25px',
                                                        //   height: '25px',
                                                        //   border: '1px solid #C2C2C2',
                                                        //   background: '#00ADEE 0% 0% no-repeat padding-box',
                                                        //   borderRadius: '5px',
                                                        //   opacity: '1',
                                                        // }}
                                                        className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-md opacity-100"></Icon>
                                                    }
                                                  />
                                                }
                                                label="1 Room/Studio"
                                              />
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </RadioGroup>
                                    <RadioGroup
                                      onChange={event => console.log(event.target.value)}
                                      aria-label="options"
                                      name="options">
                                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div>
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                                            (value: number, index: number) => (
                                              <FormControlLabel
                                                key={value + index}
                                                style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                                value={value + index}
                                                control={
                                                  <Radio
                                                    icon={
                                                      <Icon
                                                        // sx={{
                                                        //   width: '25px',
                                                        //   height: '25px',
                                                        //   border: '1px solid #C2C2C2',
                                                        //   borderRadius: '5px',
                                                        //   opacity: '1',
                                                        // }}
                                                        className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-md !opacity-100"></Icon>
                                                    }
                                                    checkedIcon={
                                                      <Icon
                                                        // sx={{
                                                        //   width: '25px',
                                                        //   height: '25px',
                                                        //   border: '1px solid #C2C2C2',
                                                        //   background: '#00ADEE 0% 0% no-repeat padding-box',
                                                        //   borderRadius: '5px',
                                                        //   opacity: '1',
                                                        // }}
                                                        className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-md !opacity-100"></Icon>
                                                    }
                                                  />
                                                }
                                                label="2A"
                                              />
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                </FormControl>
                              </Box>
                            </Grid>
                          </div>
                        </Collapse>
                        <Collapse orientation="horizontal" in={propertyType === 'HDB'} timeout={500}>
                          <div
                            //item
                            // sx={{ paddingLeft: '30px', width: '230px', height: '454px' }}
                            className=" !w-full lg:!w-[190px]  !h-auto !pl-0 lg:!pl-[30px]">
                            <Grid sx={{ paddingTop: '30px' }} className="!w-[100%]">
                              <p style={{ paddingBottom: '18px', fontSize: '18px', color: '#034EA1' }}>HDB Estate</p>
                              <Box
                                sx={{
                                  // width: '200px',
                                  // height: '400px',
                                  // overflow: 'auto',
                                  scrollbarWidth: 'thin',
                                  '&::-webkit-scrollbar': {
                                    width: '0.4em',
                                    height: '0em',
                                  },
                                  '&::-webkit-scrollbar-track': {
                                    background: '#f1f1f1',
                                  },
                                  '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#C2C2C2',
                                  },
                                  '&::-webkit-scrollbar-thumb:hover': {
                                    background: '#00ADEE',
                                  },
                                }}
                                className=" !w-auto !h-[400px] !overflow-auto">
                                <FormControl sx={{ paddingLeft: '8px' }} component="fieldset">
                                  <RadioGroup
                                    onChange={event => console.log(event.target.value)}
                                    aria-label="options"
                                    name="options">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                      <div>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                                          (value: number, index: number) => (
                                            <FormControlLabel
                                              key={value + index}
                                              style={{ width: '100%', color: '#00ADEE', fontSize: '18px' }}
                                              value={`${value} ${index}`}
                                              control={
                                                <Radio
                                                  icon={
                                                    <Icon
                                                      // sx={{
                                                      //   width: '25px',
                                                      //   height: '25px',
                                                      //   border: '1px solid #C2C2C2',
                                                      //   borderRadius: '5px',
                                                      //   opacity: '1',
                                                      // }}
                                                      className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-md !opacity-100"></Icon>
                                                  }
                                                  checkedIcon={
                                                    <Icon
                                                      // sx={{
                                                      //   width: '25px',
                                                      //   height: '25px',
                                                      //   border: '1px solid #C2C2C2',
                                                      //   background: '#00ADEE 0% 0% no-repeat padding-box',
                                                      //   borderRadius: '5px',
                                                      //   opacity: '1',
                                                      // }}
                                                      className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-md !opacity-100"></Icon>
                                                  }
                                                />
                                              }
                                              label="1 Room/Studio"
                                            />
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                              </Box>
                            </Grid>
                          </div>
                        </Collapse>
                      </div>
                      {/* </Grid> */}
                    </List>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
        {/* </Grid> */}
      </div>

      {/* </Grid> */}
    </div>
  )
}
export default Searchoptions
