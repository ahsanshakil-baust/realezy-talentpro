// import * as React from 'react'
// import Box from '@mui/material/Box'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select, { SelectChangeEvent } from '@mui/material/Select'

// export interface ISelect {
//   label: string
//   value: string
// }

// const SelectComponent: React.FC<any> = ({ label, containerClass, option }) => {
//   const [selectedVal, setSelectedVal] = React.useState('')
//   const [options,setOptions]  = React.useState<ISelect[]>(option)

//   const handleChange = (event: SelectChangeEvent) => {
//     setSelectedVal(event.target.value as string)

//   }
//   return (
//     <Box
//       className={containerClass?.join(' ')}
//       //sx={{ Width: '256px' }}
//     >
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
//         <Select
//           className={containerClass?.join(' ')}
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={selectedVal}
//           label={label}
//           onChange={handleChange}>
//           {options?.map(option => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

// export default SelectComponent

import * as React from 'react'
// import Box from '@mui/material/Box'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select, { SelectChangeEvent } from '@mui/material/Select'
// import options from './options.json'
import {
  Button,
  ClickAwayListener,
  // Divider,
  Fade,
  // FormControlLabel,
  Grid,
  Icon,
  // List,
  // ListItem,
  MenuList,
  Paper,
  Popper,
  // RadioGroup,
  Typography,
} from '@mui/material'
// import { Button } from 'flowbite-react'
import { BsChevronDown } from 'react-icons/bs'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

export interface ISelect {
  label: string
  value: string
}

const useStyles = makeStyles(() => ({
  rotate: {
    transition: 'transform 0.5s ease-in-out',
  },
  rotate180: {
    transform: 'rotate(-180deg)',
  },
}))

const SelectComponent: React.FC<any> = ({ title, children }) => {
  // const [selectedVal, setSelectedVal] = React.useState('')
  //const [options,setOptions]  = React.useState<ISelect[]>(option)

  // const handleChange = (event: SelectChangeEvent) => {
  //   setSelectedVal(event.target.value as string)
  // }
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  const { pathname } = useRouter()

  return (
    <Grid sx={{ paddingLeft: '0px', width: '100vw' }}>
      <Button
        variant="text"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(prev => !prev)}
        disableElevation
        // className=' flex py-3 2xl:py-5 gap-4  sm:gap-7 w-full h-[70px]  md:h-[47.5px] lg:h-[47px] ] xl:h-[58px]  2xl:h-[70px] border-[1px] border-[#034EA133] border-solid rounded-[10px] '
        className={
          open
            ? ' !bg-[#FFFFFF] !flex !justify-between !px-[30px] !py-3 2xl:!py-5 !gap-4  sm:!gap-7 !w-full !h-[47.5px]   md:!h-[56px]  2xl:!h-[70px] !border-2 !border-solid !border-[#00ADEE] !rounded-[10px] !capitalize'
            : ' !bg-[#FFFFFF] !flex !justify-between !px-[30px] !py-3 2xl:!py-5 !gap-4  sm:!gap-7 !w-full !h-[47.5px]   md:!h-[56px]  2xl:!h-[70px] !border-2 !border-solid !border-[#034EA133] !rounded-[10px] !capitalize'
        }
        endIcon={
          <Icon className={`${classes.rotate} ${open ? classes.rotate180 : ''} !text-[#505050]`}>
            <BsChevronDown className="w-[15px] md:w-auto" />
          </Icon>
        }>
        <Typography
          fontWeight="normal"
          // sx={{ color: '#A1A1A1', fontSize: '18px' }}
          className={` ${
            pathname == '/' ? 'text-[#A1A1A1]' : ' !text-[#505050]'
          } "!text-sm  sm:!text-base md:!text-sm xl:!text-base 2xl:!text-lg !font-segoe !font-normal !capitalize]" `}>
          {title}
        </Typography>
      </Button>
      {/* <Popper
          className='z-30'
          open={false}
          // anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin: "top"
              }}
              timeout={500}
            >
              <Paper>

              </Paper>
            </Fade>
          )}
        </Popper> */}
      <Popper
        className="!z-30 "
        open={open}
        anchorEl={anchorRef.current}
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
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={() => console.log('key down')}
                  sx={{
                    borderRadius: 0,
                    marginTop: '30px',
                    // height: '715px',
                    maxWidth: '998px',
                    // width: '60%',
                    boxShadow: '0px 15px 30px #00000033',
                  }}>
                  {/* <List sx={{ px: '44px', py: '24px' }}>
                        <ListItem>
                          Hello
                        </ListItem>
                        <ListItem>
                          Hello
                        </ListItem>
                        <ListItem>
                          Hello
                        </ListItem>
                      </List> */}
                  {children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Grid>
  )
}

export default SelectComponent
