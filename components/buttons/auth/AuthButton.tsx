import { useState } from 'react' // useContext,
// import AuthContext from '../../../state/auth/AuthContext'
//import styles from './AuthButton.module.css'
// import { Button as MuiButton } from '@mui/material'
import { ButtonProps as MuiButtonProps } from '@mui/material'
// import { Icon } from '@/components'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import FinLogin from '@/components/Login/FinLogin'
export interface IAuthButton extends MuiButtonProps { }

import LogoutIcon from '@mui/icons-material/Logout'

import { useEffect, useRef } from 'react'
import {
  Button,
  // Checkbox,
  // ClickAwayListener,
  // Divider,
  Fade,
  // FormControl,
  // FormControlLabel,
  Icon,
  List,
  MenuList,
  Paper,
  Popper,
  // RadioGroup,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import { BsChevronDown } from 'react-icons/bs'
import { useGetUserProfileDetailsQuery } from '@/store'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  rotate: {
    transition: 'transform 0.5s ease-in-out',
    color: '#505050',
  },
  rotate180: {
    transform: 'rotate(-180deg)',
    color: '#00ADEE',
  },
}))

const AuthButton: React.FC<IAuthButton> = ({ className, ...buttonProps }) => {
  const { data: session, status }: any = useSession()

  const { data: userProfileDetails } = useGetUserProfileDetailsQuery(session?.user?.id)
  const [authPopUp, setAuthPopUp] = useState(false)

  // const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setAuthPopUp(true)
  }

  // const handleClose = () => {
  //   setAuthPopUp(false)
  // }

  const anchorRef = useRef<HTMLButtonElement>(null)

  const [open2, setOpen2] = useState(false)
  const classes = useStyles()

  const handleToggle2 = () => {
    setOpen2(true)
  }

  const handleClose2 = (event: Event | React.SyntheticEvent) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //   return
    // }

    setOpen2(false)
  }

  function handleListKeyDown2(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen2(false)
    } else if (event.key === 'Escape') {
      setOpen2(false)
    }
  }

  const prevOpen = useRef(open2)
  useEffect(() => {
    if (prevOpen.current === true && open2 === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open2
  }, [open2])


  const router = useRouter()
  const handleUserProfile = () => {
    if (session?.user?.isCorporate === 'yes') {
      router.push('/corporate/dashboard')
    } else {
      router.push('/dashboard/personal-info')
    }
  }


  if (status === 'authenticated') {
    return (
      <>
        <ul className="" id="userProfileMenuTop">
          <li onMouseLeave={handleClose2}>
            <Button
              variant="text"
              disableFocusRipple
              disableRipple
              disableTouchRipple
              style={{ padding: '0px' }}
              ref={anchorRef}
              id="composition-button"
              aria-controls={open2 ? 'composition-menu' : undefined}
              aria-expanded={open2 ? 'true' : undefined}
              aria-haspopup="true"
              onMouseOver={handleToggle2}
              // onMouseLeave={handleClose2}
              disableElevation
              className={
                open2
                  ? '   !rounded-[10px] !capitalize hover:!bg-inherit  '
                  : '   !rounded-[10px] !capitalize hover:!bg-inherit  '
              }
              endIcon={
                <Icon className={`${classes.rotate} ${open2 ? classes.rotate180 : ''} `}>
                  <BsChevronDown />
                </Icon>
              }>
              <Typography
                ref={anchorRef}
                onMouseOver={handleToggle2}

              // fontWeight="normal"
              // sx={{ color: '#A1A1A1', fontSize: '18px' }}
              // className={
              //   open2
              //     ? ' text-[#00ADEE] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize'
              //     : ' text-[#505050] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize'
              // }
              >
                <img
                  alt="no-image"
                  // src={userProfileDetails?.profile_pic ? userProfileDetails.profile_pic : '/no_profile.jpg'}
                  src={session ? session?.user?.userInfo?.profile_pic : '/no_profile.jpg'}
                  className="!w-8 !h-8 md:!w-[40px] md:!h-[40px] xl:!w-[52px] xl:!h-[52px]  !object-cover !rounded-full"
                />
              </Typography>
            </Button>
            <Popper
              className="!z-[12000]   "
              open={open2}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom"
              transition
              disablePortal>
              {({ TransitionProps }: any) => (
                <Fade
                  {...TransitionProps}
                  className=" !mt-[28px] md:!mt-[22px] xl:!mt-[18px]"
                  style={{
                    transformOrigin: 'top',
                    background: '#FFFFFFCC',
                    borderRadius: '0px 0px 10px 10px',
                    // backdropFilter: 'blur(80px) !important',
                  }}
                  timeout={500}>
                  <Paper>
                    {/* <ClickAwayListener onClickAway={handleClose2}> */}
                    <MenuList
                      autoFocusItem={open2}
                      id="composition-menu"
                      className=" !bg-transparent !rounded-[0px_0px_10px_10px] property-dropdown "
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown2}
                      sx={{
                        borderRadius: 0,
                        // marginTop: '30px',
                        // height: '715px',
                        maxWidth: '998px',
                        // width: '60%',
                        boxShadow: '0px 15px 30px #00000033',
                      }}>
                      <List className=" !px-8 md:!px-9 xl:!px-11 !py-3 md:!py-4 lg:!py-5 xl:!py-6">
                        <div className=" !grid !grid-cols-1 !gap-5 ">
                          {/* <Link href="/">
                            <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                              <img src="/download/HDB.svg" />
                              <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                By MRT Stations
                              </p>
                            </div>
                          </Link> */}
                          <div onClick={handleUserProfile}>
                            <div className=" !w-full !flex !gap-2 !cursor-pointer">
                              <img
                                alt="no-image"
                                // src={userProfileDetails?.profile_pic ? userProfileDetails.profile_pic : '/no_profile.jpg'}
                                src={session ? session?.user?.userInfo?.profile_pic : '/no_profile.jpg'}
                                className="!w-[52px] !h-[52px]  !object-cover !rounded-full"
                              />
                              <span>
                                {/* <p>{userProfileDetails?.name}</p>
                                <p className=" lowercase">{userProfileDetails?.email}</p> */}
                                <p>{session ? session?.user?.userInfo?.name : ''}</p>
                                <p className=" lowercase">{session ? session?.user?.userInfo?.email : ''}</p>
                              </span>
                            </div>
                          </div>
                          <hr className="!text-[#E1E1E1]" />
                          <div className=" !w-full !py-2 !cursor-pointer" onClick={() => signOut({ callbackUrl: '/' })}>
                            <button
                              // className={`${className}  shadow-[0px_2px_6px_#0000000D] backdrop-blur-[10px] px-[10px] lg:px-5 xl:px-9  text-sm lg:text-lg xl:text-xl bg-[#00ADEE] font-normal font-roboto capitalize rounded-[10px] text-[#FFFFFF]`}>
                              className={`${className} !cursor-pointer !bg-transparent !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize !text-[#034EA1]`}>
                              <LogoutIcon className=" mr-2" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </List>
                    </MenuList>
                    {/* </ClickAwayListener> */}
                  </Paper>
                </Fade>
              )}
            </Popper>
          </li>
        </ul>
      </>
    )
  }
  return (
    <>
      <button
        className={`${className} !outline-none focus:outline-none h-[50px] !cursor-pointer  !shadow-[0px_2px_6px_#0000000D] !backdrop-blur-[10px] !px-[10px] lg:!px-5 xl:!px-9  !text-sm lg:!text-lg xl:!text-xl !bg-[#00ADEE] !font-normal !font-roboto !capitalize !rounded-[10px] !text-[#FFFFFF]`}
        onClick={handleOpen}>
        Sign In
      </button>
      <FinLogin authPopUp={authPopUp} setAuthPopUp={setAuthPopUp} />
      {/* <Link href="/login">Sign In</Link> */}
      {/* {authPopUp && <FinLogin />} */}
    </>
  )
}

export default AuthButton
