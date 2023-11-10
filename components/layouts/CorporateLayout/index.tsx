import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles'
import React, { ReactNode, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
// ICON
import Wrapper from '@/components/corporate/wrapper/Wrapper'
import PrimaryModalLayout from '@/components/layouts/primary/PrimaryModalLayout'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import ActivitylogIcon from 'public/corporate-icon/activitylog.svg'
import AnalyticsIcon from 'public/corporate-icon/analytics.svg'
import AngleBracketIcon from 'public/corporate-icon/angleBracket.svg'
import DashboardIcon from 'public/corporate-icon/dashboard.svg'
import DashboardActiveIcon from 'public/corporate-icon/dashbordactive.svg'
import GroupsIcon from 'public/corporate-icon/groups.svg'
import GroupsActiveIcon from 'public/corporate-icon/groupsactive.svg'
import Logo from 'public/corporate-icon/logo.jpg'
import LogoShrink from 'public/corporate-icon/logoShrink.png'
import LogoutIcon from 'public/corporate-icon/logout.svg'
import MessageIcon from 'public/corporate-icon/message.svg'
import MessageActiveIcon from 'public/corporate-icon/messageactive.svg'
import PaymentIcon from 'public/corporate-icon/payment.svg'
import PropertiesIcon from 'public/corporate-icon/properties.svg'
import PropertiesActiveIcon from 'public/corporate-icon/propertiesactive.svg'
import RealEstate from 'public/corporate-icon/real-este-logo.jpg'
import SupportIcon from 'public/corporate-icon/support.svg'
import TenIcon from 'public/corporate-icon/10ten.svg'
import TenActiveIcon from 'public/corporate-icon/tenactive.svg'
import NotificationIcon from 'public/download/Notification.svg'
import ImagePro from 'public/image_p.jpeg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import path from 'path'
import GlobalLoader from '../GlobalLoader'
import { ToastContainer } from 'react-toastify'

const drawerWidth = 300

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 4px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

type Props = {
  children: ReactNode
  headerIcon: any
  headerTitle: any
}

const CorporateLayout = ({ children, headerIcon, headerTitle }: Props) => {
  const { data: session }: any = useSession()
  console.log("🚀 ~ file: index.tsx:127 ~ CorporateLayout ~ session:", session)
  console.log("🚀 ~ file: index.tsx:127 ~ CorporateLayout ~ session:", session?.user?.userInfo?.profile_pic)

  const [titleName, setTitleName] = useState('')
  const [subAccount, setSubAccount] = useState(false)
  const [allProperties, setAllProperties] = useState(false)

  useEffect(() => {
    setSubAccount(true)
    setTitleName('Sub Account')
  }, [])

  const handleSidebarMenu = (type: any, typeName: any) => {
    if (type === 'sub-account') {
      setTitleName(typeName)
      setSubAccount(true)
      setAllProperties(false)
    } else if (type === 'all-properties') {
      setTitleName(typeName)
      setSubAccount(false)
      setAllProperties(true)
    }
  }

  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    {
      pathname === '/corporate/message' ? setOpen(false) : setOpen(true)
    }
    // setOpen(false)
  }

  const corporateMenuList = [
    {
      name: 'Dashboard',
      path: '/corporate/dashboard',
      activeIcon: DashboardActiveIcon,
      icon: DashboardIcon,
    },
    {
      name: 'Sub Account',
      path: '/corporate/user',
      activeIcon: GroupsActiveIcon,
      icon: GroupsIcon,
    },
    {
      name: 'All Properties',
      path: '/corporate/property',
      activeIcon: PropertiesActiveIcon,
      icon: PropertiesIcon,
    },
    {
      name: 'Payment Info',
      path: '/corporate/paymentinfo',
      activeIcon: PaymentIcon,
      icon: PaymentIcon,
    },
    {
      name: 'Messages',
      path: '/corporate/message',
      activeIcon: MessageActiveIcon,
      icon: MessageIcon,
    },
    {
      name: 'Ten/10',
      path: '/corporate/rfq',
      activeIcon: TenActiveIcon,
      icon: TenIcon,
    },
    {
      name: 'Analytics',
      path: '/corporate/analytics',
      activeIcon: AnalyticsIcon,
      icon: AnalyticsIcon,
    },
    {
      name: 'Activity Log',
      path: '/corporate/activitylog',
      activeIcon: ActivitylogIcon,
      icon: ActivitylogIcon,
    },
  ]

  const corporateMenuListShrink = [
    {
      // name: 'Dashboard',
      path: '/corporate/dashboard',
      activeIcon: DashboardActiveIcon,
      icon: DashboardIcon,
    },
    {
      // name: 'Sub Account',
      path: '/corporate/user',
      activeIcon: GroupsActiveIcon,
      icon: GroupsIcon,
    },
    {
      // name: 'All Properties',
      path: '/corporate/property',
      activeIcon: PropertiesActiveIcon,
      icon: PropertiesIcon,
    },
    {
      // name: 'Payment Info',
      path: '/corporate/paymentinfo',
      activeIcon: PaymentIcon,
      icon: PaymentIcon,
    },
    {
      // name: 'Messages',
      path: '/corporate/message',
      activeIcon: MessageActiveIcon,
      icon: MessageIcon,
    },
    {
      // name: 'Ten/10',
      path: '/corporate/rfq',
      activeIcon: TenActiveIcon,
      icon: TenIcon,
    },
    {
      // name: 'Analytics',
      path: '/corporate/analytics',
      activeIcon: AnalyticsIcon,
      icon: AnalyticsIcon,
    },
    {
      // name: 'Activity Log',
      path: '/corporate/activitylog',
      activeIcon: ActivitylogIcon,
      icon: ActivitylogIcon,
    },
  ]

  const { pathname } = useRouter()

  return (
    <>
      <GlobalLoader />
      <PrimaryModalLayout />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box className="flex relative z-0">
        <CssBaseline />
        <Drawer
          className={` ${pathname === '/corporate/message' ? 'absolute left-0 top-0 z-50' : ''}`}
          variant="permanent"
          open={open}
          onMouseOver={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}>
          <Divider />
          {open ? (
            <Box sx={{ width: '158px', height: '56px', ml: '54px', mt: '26px', mb: '35px' }}>
              <Image src={Logo} />
            </Box>
          ) : (
            <Box sx={{ width: '52px', height: '56px', mx: 'auto', mt: '26px', mb: '35px' }}>
              <Image src={LogoShrink} />
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'space-between' : 'center',
              backgroundColor: '#F1F7FF',
              padding: open ? '9px 0 9px 24px' : '9px 0 9px 0',
              mb: '16px',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '45px',
                  height: '45px',
                  border: '1px solid #D4E8FF',
                  borderRadius: '50%',
                  padding: '8px',
                  backgroundColor: '#fff',
                }}>
                <Image src={RealEstate} />
              </Box>
              {open && (
                <Typography paragraph sx={{ marginBottom: '0', pl: '15px' }}>
                  Company Name
                </Typography>
              )}
            </Box>
            {open && (
              <Box sx={{ transform: 'rotate(-90deg)', mr: '10px' }}>
                <Image src={AngleBracketIcon} />
              </Box>
            )}
          </Box>
          {open ? (
            <List sx={{ mx: '35px' }}>
              {corporateMenuList.map((text, index) => (
                // <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 56,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}>
                      <Image src={corporateMenuList[index].icon} />
                    </ListItemIcon>
                    <Link href={corporateMenuList[index].path} passHref>
                      {corporateMenuList[index].name}
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <List sx={{ mx: 'auto' }}>
              {corporateMenuListShrink.map((text, index) => (
                // <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 56,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}>
                      {/* <Link href={corporateMenuListShrink[index].path} passHref> */}
                      <Image src={corporateMenuListShrink[index].icon} />
                      {/* </Link> */}
                    </ListItemIcon>
                    {/* <Link href={corporateMenuListShrink[index].path} passHref>
                      {corporateMenuList[index].name}
                    </Link> */}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
          <Divider sx={{ marginTop: '56px' }} />
          <List sx={{ mx: open ? '35px' : 'auto', maxWidth: '72px' }}>
            {['Help & Support', 'Logout'].map((text, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 56,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}>
                    {index === 0 && <Image src={SupportIcon} />}
                    {index === 1 && <Image onClick={() => signOut({ callbackUrl: '/' })} src={LogoutIcon} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: '#F1F7FF', height: '100vh', overflow: 'hidden' }}
          className={` ${pathname === '/corporate/message' && '!ml-[56px]'} `}>
          {/* <DrawerHeader /> */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '48px' }}>
            <Box sx={{ display: 'flex', flex: 10, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box className="!flex !items-center !gap-3.5">
                <Image src={headerIcon} alt="ten10-icon" />
                <p className="!text-primary !font-medium !text-3xl">{headerTitle}</p>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
                <Box sx={{ width: '440px', position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search"
                    className=" py-3 pl-12 border border-[#D7E7FF] bg-[#F8FBFF] w-full rounded-xl placeholder:text-base placeholder:text-[#999999]"
                  />
                  <SearchIcon sx={{ position: 'absolute', left: '15px', top: '10px', color: '#999999' }} />
                </Box>
                <Image src={NotificationIcon} alt="notification-icon" />
                <p className="w-[2px] h-10 bg-[#D4E8FF]"></p>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 2, alignItems: 'center', justifyContent: 'end', gap: '10px' }}>
              <Box>
                <Typography sx={{ fontSize: '16px' }} variant="h6">
                  {session?.user?.userInfo?.name}
                </Typography>
                <Typography sx={{ mb: '0' }}>Super Admin</Typography>
              </Box>
              <Box sx={{ width: '48px', height: '48px' }}>
                <Image
                  className="!rounded-xl w-[100px] h-[100px]"
                  src={session?.user?.userInfo?.profile_pic ? session?.user?.userInfo?.profile_pic : ImagePro}
                  // src={'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/dev/64c4db8636dee.png'}
                  alt="image-pro"
                /> 
                {/* <img className='object-cover rounded-md' width={'100'} height={'100'} src={session?.user?.userInfo?.profile_pic ? session?.user?.userInfo?.profile_pic : ImagePro} alt="" /> */}
              </Box>
            </Box>
          </Box>

          <Wrapper className="!overflow-hidden !p-0 mt-6 ">{children}</Wrapper>
        </Box>
      </Box>
    </>
  )
}

export { CorporateLayout }
