import Image from 'next/image'
import Link from 'next/link'
import AuthButton from '../../buttons/auth/AuthButton'
import { useEffect, useRef, useState } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import newlogoheader from '@/public/logo.png'

//NOTIFICATION
import { getUnreadConversation } from '../../../util/ChatMessage/chatCounter'

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

const useStyles = makeStyles(() => ({
  rotate: {
    transition: 'transform 0.5s ease-in-out ',
    color: '#505050',
    marginTop: '4px',
    fontSize: '16px',
  },
  rotate180: {
    transform: 'rotate(-180deg)',
    color: '#00ADEE',
    marginTop: '4px',
    fontSize: '16px',
  },
}))
import React from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useRouter } from 'next/router'
import PrimaryModalLayout from '@/components/layouts/primary/PrimaryModalLayout'
import { useSession } from 'next-auth/react'
import { showModal, useGetUserNotificationsQuery } from '@/store'
import { logo } from '@/util/helper'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['stateOfTour'])
  const { data: session }: any = useSession()
  const [msg, setMsg] = useState(true)
  // const [notification, setNotification] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open2, setOpen2] = useState(false)
  const classes = useStyles()

  const userId = session?.user?.id
  const { data: userNotifications, error } = useGetUserNotificationsQuery(
    { userId: userId ?? 0, pageNumber: 1 },
    { skip: !session?.user?.id }
  )

  const notification = userNotifications && userNotifications?.length > 0

  useEffect(() => {
    let unsubscribe1: () => void | undefined

    const setupUnsubscribe = async () => {
      try {
        unsubscribe1 = await getUnreadConversation(userId, count => {
          setMsg(count > 0)
        })
      } catch (error) {
        // Handle any error that might occur while setting up the subscription
        console.error('Error setting up subscription:', error)
      }
    }

    setupUnsubscribe()

    return () => {
      if (unsubscribe1) {
        unsubscribe1() // Unsubscribe the real-time listener when the component unmounts
      }
    }
  }, [userId])

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

  /// burger-find-property
  const anchorRef3 = useRef<HTMLButtonElement>(null)

  const [open3, setOpen3] = useState(false)

  const handleToggle3 = () => {
    setOpen3(true)
  }

  const handleClose3 = (event: Event | React.SyntheticEvent) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //   return
    // }

    setOpen3(false)
  }

  function handleListKeyDown3(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen3(false)
    } else if (event.key === 'Escape') {
      setOpen3(false)
    }
  }

  const prevOpen3 = useRef(open3)
  useEffect(() => {
    if (prevOpen3.current === true && open3 === false) {
      anchorRef3.current!.focus()
    }

    prevOpen3.current = open3
  }, [open3])

  ///

  // const [menu, setMenu] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setMenuOpen(true)
  }
  const handleMenuClose = () => {
    setMenuOpen(false)
  }
  // console.log(menuOpen)

  const { pathname } = useRouter()

  useEffect(() => {
    if (session && cookies?.stateOfTour !== 'done') {
      if (pathname == '/') {
        // setTimeout(() => {
        //   console.log("Loaded")
        // }, 1000);
        const driverObj = driver({
          showProgress: true,

          steps: [
            {
              element: '#csoChatMsgBtm',
              popover: {
                title: 'CSO',
                description: 'Tap this button to reach out to our friendly customer support officer.',
                side: 'top',
                align: 'end',
                onNextClick: async () => {
                  await router.push('/')
                  driverObj.moveNext()
                },
                onPrevClick: async () => {
                  setCookie('stateOfTour', 'done', { path: '/' })
                  driverObj.destroy()
                },
                showButtons: ["previous", "next"],
                prevBtnText: "Skip",
                disableButtons: []
              },
            },
            {
              element: '#chatMsgIconTop',
              popover: {
                title: 'Chat',
                description: ' Manage your chats with Tenants and Landlords from here ',
                side: 'left',
                align: 'start',
              },
            },
            {
              element: '#userProfileMenuTop',
              popover: {
                title: ' Profile',
                description: 'Manage your profile, documents & transactions from here.',
                side: 'bottom',
                align: 'end',
                onNextClick: async () => {
                  await router.push('/dashboard/personal-info')
                  driverObj.moveNext()
                },
              },
            },
            {
              element: '#TtProfileInfoTab',
              popover: {
                title: ' Profile',
                description: 'Update your profile from here.',
                side: 'left',
                align: 'start',
              },
            },
            {
              element: '#ttIntroVideo',
              popover: {
                title: ' Intro Video',
                description:
                  ' <p> Please note that your self introduction video MUST include: <br/>  1. Your full name <br/> 2.Nationality <br/> 3. Occupation & name of employer <br/> 4. Who will be staying in the the rental property with you, or alone  <br/>  5. Your desired property type and number of bedrooms  <br/> 6. Lease duration (how many years’ rental)  <br/> 7. Other information that will be important for landlord’s consideration. Eg, you have pets </p>  ',
                side: 'left',
                align: 'start',
              },
            },

            {
              element: '#retrieveMyinfoSingpass',
              popover: {
                title: 'Singpass',
                description: 'Complete your profile with Singpass.',
                side: 'right',
                align: 'end',
              },
            },

            {
              element: '#ttEditProfile',
              popover: {
                title: 'Edit Profile',
                description: 'Complete your profile to edit your profile.',
                side: 'bottom',
                align: 'end',
                onNextClick: async () => {
                  setCookie('stateOfTour', 'done', { path: '/' })
                  router.push('/dashboard/personal-info')
                  driverObj.destroy()
                },
              },
            },
          ],
          onDestroyStarted: () => {
            if (!driverObj.hasNextStep() || confirm("Are you sure you want to exit from tour?")) {
              setCookie('stateOfTour', 'done', { path: '/' })
              driverObj.destroy();
            }
          },
        })

        driverObj.drive()
      } else {
        console.debug('goto login')
      }

      // if(pathname == '/dashboard/personal-info'){
      //   const driverObj = driver({
      //     showProgress: true,
      //     steps: [
      //       {
      //         element: '#TtProfileInfoTab',
      //         popover: {
      //           title: ' Profile',
      //           description: 'Update your profile from here.',
      //           side: 'left',
      //           align: 'start',
      //         },
      //       },
      //       {
      //         element: '#ttIntroVideo',
      //         popover: {
      //           title: ' Intro Video',
      //           description: 'Upload your intro video.',
      //           side: 'left',
      //           align: 'start',
      //         },
      //       },

      //       {
      //         element: '#retrieveMyinfoSingpass',
      //         popover: {
      //           title: 'Singpass',
      //           description: 'Complete your profile with Singpass.',
      //           side: 'right',
      //           align: 'end',
      //         },
      //       },
      //       {
      //         element: '#ttEditProfile',
      //         popover: {
      //           title: 'Profile',
      //           description: 'Update your profile from here',
      //           side: 'right',
      //           align: 'end',
      //         },
      //       },
      //       {
      //         element: '#viewRentalRange',
      //         popover: {
      //           title: 'Credit Score',
      //           description: 'View max rental range based on your credit score.',
      //           side: 'right',
      //           align: 'end',
      //         },
      //       },
      //       {
      //         element: '#findPropertyMenuTop',
      //         popover: {
      //           title: ' Property',
      //           description: 'Find your expected property.',
      //           side: 'bottom',
      //           align: 'end',
      //           onNextClick: async () => {

      //             router.push('/filter?sub_category=hdb')
      //           },
      //         },
      //       },

      //       ],
      //     })

      //     driverObj.drive()
      // }

      // if(pathname == '/filter'){
      //   const driverObj = driver({
      //     showProgress: true,
      //     steps: [
      //       {
      //         element: '#searchPropertyImg',
      //         popover: {
      //           title: ' Property',
      //           description: 'Click the property if you wish to speak with the Landlord, you may click the picture of the property.',
      //           side: 'bottom',
      //           align: 'end',
      //         },
      //       },
      //       {
      //         element: '#searchPropertyName',
      //         popover: {
      //           title: ' Property',
      //           description: 'Click the property if you wish to speak with the Landlord, you may click the name of the property or chat button',
      //           side: 'left',
      //           align: 'start',
      //         },
      //       },
      //       {
      //         element: '#searchPropertyChat',
      //         popover: {
      //           title: ' Chat',
      //           description: 'Click the property if you wish to speak with the Landlord, you may click the chat button.',
      //           side: 'right',
      //           align: 'start',
      //           onNextClick: async () => {
      //             setCookie('stateOfTour', 'done', {path: '/'})
      //             router.push('/')
      //             driverObj.destroy()
      //           },
      //         },
      //       },
      //       ],

      //     })

      //     driverObj.drive()
      // }
    }
  }, [session, cookies?.stateOfTour, pathname, router, setCookie])
  const dispatch = useDispatch<StoreThunkDispatch>()

  const handleAddPropertyButton = () => {
    // if((session?.user?.userInfo?.document_url?.nric_front !== "" && session?.user?.userInfo?.document_url?.nric_back !== "") || (session?.user?.userInfo?.document_url?.pass_id_front !== "" && session?.user?.userInfo?.document_url?.pass_id_back !== "")){
      router.push('/add-property-v3')
    // }
    // else{
    //   dispatch(showModal({
    //     name: 'NRIC or Passport Required',
    //     open: true,
    //     children: <>
    //       Need to complete your profile
    //     </>
    //   }))
    // }
  }

  return (
    <header
      {...headerProps}
      className={` ${
        pathname === '/dashboard/personal-info' ||
        pathname === '/dashboard/documents' ||
        pathname === '/dashboard/payments' ||
        pathname === '/dashboard/transaction' ||
        pathname === '/dashboard/my-properties' ||
        pathname === '/dashboard/fees' ||
        pathname === '/dashboard/terms-of-use' ||
        pathname === '/dashboard/help-support' ||
        pathname === '/dashboard/home-preference' ||
        pathname === '/dashboard/favorite' ||
        pathname === '/conversation' ||
        pathname === '/dashboard/notification' ||
        pathname === '/view-profile'
          ? '2xl:px-[56px] xl:px-[42px] lg:px-[37.34px] md:px-[29.87px] !bg-[#FFFFFF] sticky top-0 left-0 z-30 flex w-full h-[85px] items-center'
          : '2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] !bg-[#FFFFFF] sticky top-0 left-0 z-30 flex w-full h-[85px] items-center'
      }`}>
      <div className=" w-[90%] md:w-full m-auto">
        <div className="relative  flex items-center justify-between ">
          <div className="w-auto max-w-full  md:pr-[22px] lg:pr-[50px] xl:pr-[74px]">
            <Link href="/">
              <a className="navbar-logo -mt-1 flex items-center w-full ">
                {/* <img src={'/logo.png'} alt="Logo" width="180px" height="45px" className="header-logo " /> */}
                {/* <Image src={logo} alt="Logo" width="180px" height="45px" className="w-[40%]" /> */}
                {/* <img src={logo} className="w-[145px]" alt="" /> */}
                <Image
                  width={145}
                  height={48}
                  src={newlogoheader}
                  // className="w-[288.09px] mb-3"
                  // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
                  alt="User profile picture"
                />
              </a>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between gap-2 ">
            <div className="w-auto">
              {/* <button
                id="navbarToggler"
                className="absolute right-1 top-[27px] block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 md:hidden">
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white" />
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white" />
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white" />
              </button> */}
              {/* <nav
                id="navbarCollapse" */}
              <div className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg md:static md:block md:w-full md:max-w-full md:bg-transparent md:py-0  md:shadow-none ">
                <ul className="hidden md:flex md:gap-2 lg:gap-7 xl:gap-9">
                  <li className="targetMenu group relative hidden">
                    <Link href="/">
                      <a
                        className={` ${
                          pathname === '/'
                            ? ' bg-transparent hover:bg-transparent hover:bg-gradient-to-b from-white from-0% to-[#E4F0FE] to-100% pb-[28px] border-b-[3px] text-[#00ADEE] border-b-[#00ADEE]'
                            : 'border-none text-[#505050]'
                        }  py-2 px-1 hover:text-[#00ADEE] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize`}>
                        Home
                      </a>
                    </Link>
                  </li>

                  {/* <li className="group relative"> */}
                  {/* <Link href="/">
                      <a className="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary md:mr-0 md:ml-7 md:inline-flex md:py-6 md:px-0 md:text-dark md:group-hover:text-primary lg:ml-8">
                        Find Property
                      </a>
                    </Link> */}
                  {/* Find Property */}
                  <li onMouseLeave={handleClose2} id="findPropertyMenuTop">
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
                        // fontWeight="normal"
                        // sx={{ color: '#A1A1A1', fontSize: '18px' }}
                        className={
                          open2
                            ? ' !text-[#00ADEE] !text-base md:!text-base xl:!text-lg 2xl:!text-xl !font-segoe !font-normal !capitalize'
                            : ' !text-[#505050] !text-base md:!text-base xl:!text-lg 2xl:!text-xl !font-segoe !font-normal !capitalize'
                        }>
                        Find Property
                      </Typography>
                    </Button>
                    <Popper
                      className="!z-30   "
                      open={open2}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom"
                      transition
                      disablePortal>
                      {({ TransitionProps }: any) => (
                        <Fade
                          {...TransitionProps}
                          className=" !mt-[29.5px]"
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
                              <List className=" !px-8 !py-[16px] md:!px-9 md:!py-[18px] lg:!py-[22px] xl:!px-11 xl:!py-[27px]">
                                <div className=" grid grid-cols-1 gap-4 md:gap-5 2xl:gap-7 ">
                                  <Link passHref href={{ pathname: '/filter', query: { sub_category: 'HDB' } }}>
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img alt="no-image" src="/download/HDB.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By HDB
                                      </p>
                                    </div>
                                  </Link>
                                  {/* <Link href="/filter">
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img src="/download/HDB.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By Whole Unit
                                      </p>
                                    </div>
                                  </Link> */}
                                  <Link passHref href={{ pathname: '/filter', query: { sub_category: 'Condo' } }}>
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img alt="no-image" src="/download/by-condos.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By Condos
                                      </p>
                                    </div>
                                  </Link>
                                  {/* <Link href="/filter">
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img src="/download/HDB.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By Room
                                      </p>
                                    </div>
                                  </Link> */}
                                  <Link passHref href={{ pathname: '/filter', query: { sub_category: 'Landed' } }}>
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img alt="no-image" src="/download/by-landed.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By Landed
                                      </p>
                                    </div>
                                  </Link>
                                  {/* <Link href="/filter">
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img src="/download/by-district.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By District
                                      </p>
                                    </div>
                                  </Link> */}
                                  {/*
                                  <Link href="/filter">
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img src="/download/HDB.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By Area
                                      </p>
                                    </div>
                                  </Link>
                                  <Link href="/filter">
                                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                      <img src="/download/HDB.svg" />
                                      <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                        By MRT Stations
                                      </p>
                                    </div>
                                  </Link> */}
                                </div>
                              </List>
                            </MenuList>
                            {/* </ClickAwayListener> */}
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </li>

                  <li className="group relative ">
                    <Link href="/benefits">
                      <a
                        className={` ${
                          pathname === '/benefits'
                            ? ' bg-transparent hover:bg-gradient-to-b from-white from-0% to-[#E4F0FE] to-100% pb-[28px] border-b-[3px] text-[#00ADEE] border-b-[#00ADEE]'
                            : 'border-none text-[#505050]'
                        }  py-2 px-1 hover:text-[#00ADEE] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize`}>
                        Benefits
                      </a>
                    </Link>
                  </li>

                  <li className="group relative ">
                    <Link href="/faq">
                      <a
                        className={` ${
                          pathname === '/faq'
                            ? ' bg-transparent hover:bg-gradient-to-b from-white from-0% to-[#E4F0FE] to-100% pb-[28px] border-b-[3px] text-[#00ADEE] border-b-[#00ADEE]'
                            : 'border-none text-[#505050]'
                        }  py-2 px-1 hover:text-[#00ADEE] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize`}>
                        FAQ
                      </a>
                    </Link>
                  </li>

                  <li id="about" className="group relative">
                    <Link href="/about-us">
                      <a
                        className={` ${
                          pathname === '/about-us'
                            ? ' bg-transparent hover:bg-gradient-to-b from-white from-0% to-[#E4F0FE] to-100% pb-[28px] border-b-[3px] text-[#00ADEE] border-b-[#00ADEE]'
                            : 'border-none text-[#505050]'
                        }  py-2 px-1 hover:text-[#00ADEE] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize`}>
                        About Us
                      </a>
                    </Link>
                  </li>
                  {/* </li> */}
                  <li className="group relative hidden">
                    <Link href="/deal">
                      <a
                        className={` ${
                          pathname === '/deal'
                            ? ' bg-transparent hover:bg-gradient-to-b from-white from-0% to-[#E4F0FE] to-100% pb-[28px] border-b-[3px] text-[#00ADEE] border-b-[#00ADEE]'
                            : 'border-none text-[#505050]'
                        }  py-2 px-1 hover:text-[#00ADEE] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize`}>
                        Deal
                      </a>
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link href="/spotlight">
                      <a
                        className={` ${
                          pathname === '/spotlight'
                            ? ' bg-transparent hover:bg-gradient-to-b from-white from-0% to-[#E4F0FE] to-100% pb-[28px] border-b-[3px] text-[#00ADEE] border-b-[#00ADEE]'
                            : 'border-none text-[#505050]'
                        }  py-2 px-1 hover:text-[#00ADEE] text-base md:text-base xl:text-lg 2xl:text-xl font-segoe font-normal capitalize `}>
                        Spotlight
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* </nav> */}
            </div>
            <div className="justify-end w-auto md:flex flex ">
              {session?.user?.id && (
                <>
                  {/* <Link passHref href="/add-property-v3"> */}
                    <div
                      onClick={handleAddPropertyButton}
                      id="addProperty"
                      className="mr-2 sm:mr-3 md:mr-4 xl:mr-5 cursor-pointer hidden md:flex items-center gap-2 md:gap-1 lg:gap-2  px-[11px] md:px-[8px] lg:px-[18px] xl:px-[22px] py-[11px] md:py-[8px] lg:py-[11px] xl:py-[13px] bg-[#E4F0FE] rounded-[26px]">
                      <img
                        alt="no-image"
                        src={'/download/navHome.svg'}
                        className=" w-7 h-6 md:w-6 md:h-5 lg:w-7 lg:h-6"
                      />
                      <p className=" hidden md:block text-base md:text-sm lg:text-base xl:text-lg font-roboto font-normal text-[#034EA1] capitalize ">
                        Add Property
                      </p>
                    </div>
                  {/* </Link> */}
                  {/* <Link passHref href="/add-property-v3"> */}
                    <div onClick={handleAddPropertyButton} className="flex md:hidden mr-2 sm:mr-3 md:mr-4 xl:mr-5  items-center justify-center cursor-pointer">
                      <img alt="no-image" src={'/download/ADD Property Icon (2).svg'} className="w-8 h-8 " />
                    </div>
                  {/* </Link> */}

                  <Link passHref href="/conversation">
                    <div
                      className={
                        pathname === '/conversation'
                          ? 'hidden'
                          : 'mr-2 sm:mr-3 md:mr-4 xl:mr-5  flex items-center justify-center cursor-pointer'
                      }>
                      {msg ? (
                        <img
                          alt="no-image"
                          id="chatMsgIconTop"
                          src={'/download/Chat.svg'}
                          className=" w-8 h-8 md:w-[40px] md:h-[40px] xl:w-[52px] xl:h-[52px]"
                        />
                      ) : (
                        <img
                          alt="no-image"
                          src={'/download/Chat N.svg'}
                          className=" w-8 h-8 md:w-[40px] md:h-[40px] xl:w-[52px] xl:h-[52px]"
                          id="chatMsgIconTop"
                        />
                      )}
                    </div>
                  </Link>
                </>
              )}

              <div
                id="notification"
                className="relative mr-2 sm:mr-3 md:mr-4 xl:mr-5  flex items-center justify-center cursor-pointer ">
                {notification ? (
                  <Link href="/dashboard/notification">
                    <img
                      src={'/download/Notification.svg'}
                      className=" w-8 h-8 md:w-[40px] md:h-[40px] xl:w-[52px] xl:h-[52px]"
                    />
                  </Link>
                ) : (
                  <Link href="/dashboard/notification">
                    <>
                    <img
                      onClick={()=>{
                        const audio = new Audio('/ding.mp3')
                        audio.play()
                      }}
                      src={'/download/Notification N.svg'}
                      className=" w-[36px] h-[36px] md:w-[40px] md:h-[40px] xl:w-[52px] xl:h-[52px]"
                    />
                    <div className='h-[18px] w-[18px] rounded-full bg-primary absolute top-1 left-10'>
                      <p className='text-white flex items-center justify-center text-[10px] font-bold leading-4'>1</p>
                    </div>
                  </>
                  </Link>
                )}
              </div>
              <div className=" mr-2 sm:mr-3 md:mr-4 xl:mr-5  border-l-2 border-solid border-[#E1E1E1] " />

              <AuthButton className="" />

              <div className="ml-2 sm:ml-3 md:ml-4 flex items-center md:hidden">
                <div>
                  <AiOutlineMenu
                    onClick={handleMenuOpen}
                    className={menuOpen ? ' !hidden' : '!text-[2rem] !text-[#034EA1]'}
                  />

                  <div
                    className={
                      menuOpen
                        ? 'fixed z-[70]  left-0 top-0 w-full  h-screen  bg-black/20 '
                        : 'fixed z-[70]  top-0 left-[-100%] bg-inherit w-full  h-screen'
                    }>
                    <div className="w-full h-screen flex justify-end bg-transparent">
                      <AiOutlineClose
                        onClick={handleMenuClose}
                        className="!text-3xl !text-transparent !w-full !h-screen  "
                      />
                    </div>
                    <div
                      className={
                        menuOpen
                          ? ' z-[80] fixed left-0 top-0 w-[270px] bg-[#EBF4FE] h-screen ease-in-out duration-200'
                          : ' z-[80] fixed top-0 left-[-100%] w-[270px] h-screen ease-in-out duration-200 '
                      }>
                      <div className="w-auto pt-7 pb-4 px-4 bg-[#EBF4FE] ">
                        <Link href="/">
                          <a>
                            <Image
                              width={145}
                              height={48}
                              src={newlogoheader}
                              // className="w-[288.09px] mb-3"
                              // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
                              alt="User profile picture"
                            />
                          </a>
                        </Link>
                      </div>
                      <ul className=" w-full h-screen p-4 bg-[#F8FBFF] rounded-t-[20px]">
                        <li
                          className={` hidden text-[#505050]  text-lg font-segoe font-normal capitalize p-4 cursor-pointer hover:text-[#00ADEE] `}>
                          <Link href="/">
                            <a className={` ${pathname === '/' ? 'border-b-2 border-b-[#034EA1]' : 'border-none'}`}>
                              Home
                            </a>
                          </Link>
                        </li>
                        <li onMouseLeave={handleClose3}>
                          <Button
                            variant="text"
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            style={{ padding: '0px' }}
                            ref={anchorRef3}
                            id="composition-button"
                            aria-controls={open3 ? 'composition-menu' : undefined}
                            aria-expanded={open3 ? 'true' : undefined}
                            aria-haspopup="true"
                            onMouseOver={handleToggle3}
                            // onMouseLeave={handleClose2}
                            disableElevation
                            className={
                              open3
                                ? '   !rounded-[10px] !capitalize hover:!bg-inherit  '
                                : '   !rounded-[10px] !capitalize hover:!bg-inherit  '
                            }
                            endIcon={
                              <Icon className={`${classes.rotate} ${open2 ? classes.rotate180 : ''} `}>
                                <BsChevronDown />
                              </Icon>
                            }>
                            <Typography
                              // fontWeight="normal"
                              // sx={{ color: '#A1A1A1', fontSize: '18px' }}
                              className={
                                open3
                                  ? ' !p-4 !text-[#00ADEE] !text-lg  !font-segoe !font-normal !capitalize'
                                  : ' !p-4 !text-[#505050] !text-lg  !font-segoe !font-normal !capitalize'
                              }>
                              Find Property
                            </Typography>
                          </Button>
                          <Popper
                            className="!z-30   "
                            open={open3}
                            anchorEl={anchorRef3.current}
                            role={undefined}
                            placement="bottom"
                            transition
                            disablePortal>
                            {({ TransitionProps }: any) => (
                              <Fade
                                {...TransitionProps}
                                className=" "
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
                                    autoFocusItem={open3}
                                    id="composition-menu"
                                    className=" !bg-transparent !rounded-[0px_0px_10px_10px] property-dropdown "
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown3}
                                    sx={{
                                      borderRadius: 0,
                                      // marginTop: '30px',
                                      // height: '715px',
                                      // maxWidth: '998px',
                                      // width: '60%',
                                      boxShadow: '0px 15px 30px #00000033',
                                    }}>
                                    <List className=" !px-4 !py-[16px] md:!px-9 md:!py-[18px] lg:!py-[22px] xl:!px-11 xl:!py-[27px]">
                                      <div className=" grid grid-cols-1 gap-4 md:gap-5 2xl:gap-7 ">
                                        <Link passHref href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img alt="no-image" src="/download/HDB.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By HDB
                                            </p>
                                          </div>
                                        </Link>
                                        {/* <Link href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img src="/download/HDB.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By Whole Unit
                                            </p>
                                          </div>
                                        </Link> */}
                                        <Link passHref href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img alt="no-image" src="/download/by-condos.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By Condos
                                            </p>
                                          </div>
                                        </Link>
                                        {/* <Link href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img src="/download/HDB.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By Room
                                            </p>
                                          </div>
                                        </Link> */}
                                        <Link passHref href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img alt="no-image" src="/download/by-landed.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By Landed
                                            </p>
                                          </div>
                                        </Link>
                                        <Link passHref href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img alt="no-image" src="/download/by-district.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By District
                                            </p>
                                          </div>
                                        </Link>
                                        {/* <Link href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img src="/download/HDB.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By Area
                                            </p>
                                          </div>
                                        </Link>
                                        <Link href="/filter">
                                          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 cursor-pointer">
                                            <img src="/download/HDB.svg" />
                                            <p className=" font-normal font-roboto text-[#202020] text-base md:text-lg xl:text-xl capitalize ">
                                              By MRT Stations
                                            </p>
                                          </div>
                                        </Link> */}
                                      </div>
                                    </List>
                                  </MenuList>
                                  {/* </ClickAwayListener> */}
                                </Paper>
                              </Fade>
                            )}
                          </Popper>
                        </li>

                        {/* Find Property */}

                        {/* </li> */}
                        <li className=" hidden text-[#505050] text-lg  font-segoe font-normal capitalize p-4 cursor-pointer hover:text-[#00ADEE]">
                          <Link href="/deal">
                            <a className={` ${pathname === '/deal' ? 'border-b-2 border-b-[#034EA1]' : 'border-none'}`}>
                              Deal
                            </a>
                          </Link>
                        </li>
                        <li className="  text-[#505050] text-lg  font-segoe font-normal capitalize p-4 cursor-pointer hover:text-[#00ADEE]">
                          <Link href="/benefits">
                            <a className={` ${pathname === '/deal' ? 'border-b-2 border-b-[#034EA1]' : 'border-none'}`}>
                              Benefits
                            </a>
                          </Link>
                        </li>
                        <li className="  text-[#505050] text-lg  font-segoe font-normal capitalize p-4 cursor-pointer hover:text-[#00ADEE]">
                          <Link href="/faq">
                            <a className={` ${pathname === '/deal' ? 'border-b-2 border-b-[#034EA1]' : 'border-none'}`}>
                              FAQ
                            </a>
                          </Link>
                        </li>
                        <li
                          className={` text-[#505050] text-lg  font-segoe font-normal capitalize p-4 cursor-pointer hover:text-[#00ADEE] `}>
                          <Link href="/about-us">
                            <a
                              className={` ${
                                pathname === '/about-us' ? 'border-b-2 border-b-[#034EA1]' : 'border-none'
                              }`}>
                              About Us
                            </a>
                          </Link>
                        </li>
                        <li className="  text-[#505050] text-lg  font-segoe font-normal capitalize p-4 cursor-pointer hover:text-[#00ADEE] ">
                          <Link href="/spotlight">
                            <a
                              className={` ${
                                pathname === '/spotlight' ? 'border-b-2 border-b-[#034EA1]' : 'border-none'
                              }`}>
                              Spotlight
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrimaryModalLayout />
    </header>
  )
}

export default Header
