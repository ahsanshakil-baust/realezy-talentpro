import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'
// import { Button } from '@mui/material'
// import Header from '@/components/navigation/header/Header'
// import { Icon } from '@/components/shared'
import switchIcon from '@/public/Icon/switchIcon.svg'
import switchIconTenant from '@/public/Icon/switch_Icon.svg'
// import document from '@/public/documents.svg'
// import fees from '@/public/fees.svg'
// import payment from '@/public/payment.svg'
// import property from '@/public/property.svg'
// import homeprefer from '@/public/search-homepage.svg'
// import support from '@/public/support.svg'
// import favorite from '@/public/tenant-favorite.svg'
// import terms from '@/public/terms.svg'
// import transaction from '@/public/transaction.svg'
// import personal from '@/public/user_dashboard.svg'
import { Button, Tabs, TabsRef } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { switchUserTypeLandlord, switchUserTypeTenant, useGetUserProfileDetailsQuery } from '@/store'
import { StoreState } from '@/types'
import { isTenant } from '@/util'
import classNames from 'classnames'
// import { log } from 'console'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayoutStyle from './DashboardLayoutStyle'
import GlobalLayout from '../GlobalLayout/GlobalLayout'

const DashboardLayoutContent: FC = ({ children }) => {
  const dispatch = useDispatch()
  const { type } = useSelector((state: StoreState) => state.entities.user)
  const [activeTab, setActiveTab] = useState<number>(0)
  const tabsRef = useRef<TabsRef>(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session }: any = useSession()
  const user_type = session?.user?.userInfo?.user_type?.toLowerCase()

  useEffect(() => {
    if (user_type) {
      if (isTenant(user_type)) {
        tabsRef.current?.setActiveTab(0)
        dispatch(switchUserTypeTenant())
      } else {
        tabsRef.current?.setActiveTab(1)
        dispatch(switchUserTypeLandlord())
      }
    }
  }, [user_type, dispatch])

  const handleMenuOpen = () => {
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const router = useRouter()
  const { pathname } = router
  console.log('pathname', pathname)

  const handelSwitch = (activeTab: number) => {
    if (
      pathname !== '/dashboard/personal-info' &&
      pathname !== '/dashboard/fees' &&
      pathname !== '/dashboard/documents' &&
      pathname !== '/dashboard/transaction'
    ) {
      router.push('personal-info')
    }
    if (activeTab === 0) {
      tabsRef.current?.setActiveTab(1)
      dispatch(switchUserTypeLandlord())
      return
    }

    tabsRef.current?.setActiveTab(0)
    dispatch(switchUserTypeTenant())
  }

  // session?.user?.userInfo?.user_type

  // const [isSVGTab, setIsSVGTab] = useState(false)

  // const handleSVGTab = () => {
  //   setIsSVGTab(!isSVGTab)
  // }

  const { data: userProfileDetails } = useGetUserProfileDetailsQuery(session?.user?.id)

  return (
    <div className="min-h-screen overflow-hidden item-center">
      <DashboardLayoutStyle />
      {/* <Header /> */}
      <div className="flex flex-col md:flex-row  h-[calc(100vh-85px)]  mt-[85px]">
        <aside className="bg-[#EBF4FE] text-white w-full h-auto md:h-screen md:w-[18rem] 2xl:w-[20rem] flex flex-col shadow-[2px_0px_6px_#0000000D]">
          <div className="flex  ">
            <div className=" w-full flex justify-between flex-row md:flex-col  2xl:pl-[3.5rem] 2xl:pr-[2rem] md:pl-[2.8rem] md:pr-[1.6rem] px-5  ">
              <div className="flex justify-start gap-2 mt-2 md:mt-4 lg:mt-5 xl:mt-7 2xl:mt-10 mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-7">
                <div className="flex justify-end items-center md:hidden">
                  <div>
                    <AiOutlineMenu
                      onClick={handleMenuOpen}
                      className={classNames(' text-3xl ', isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]')}
                    />
                    <div
                      className={
                        menuOpen
                          ? 'fixed z-40  left-0 top-[85px] w-[16.875rem] h-full border-r border-r-[#eaeaea] bg-white ease-in-out duration-300'
                          : 'fixed z-40 left-[-100%] top-[85px] w-[16.875rem] h-full ease-in-out duration-500'
                      }>
                      <div className=" w-[90%] mx-auto flex justify-between items-center mt-3 mb-4">
                        <div>
                          <span className="text-[#A1A1A1] text-xs md:text-sm xl:text-base font-normal font-roboto ">
                            Welcome Back!
                          </span>
                          <h3 className="text-[#000000] font-roboto font-medium text-base md:text-lg xl:text-xl">
                            {userProfileDetails?.name ? userProfileDetails?.name : ''}
                          </h3>
                        </div>

                        <AiOutlineClose
                          onClick={handleMenuClose}
                          className={classNames(' text-3xl ', isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]')}
                        />
                      </div>
                      {isTenant(type) ? (
                        <div className=" h-auto mx-auto flex w-[90%] flex-col gap-4 ">
                          <Link href="/dashboard/personal-info">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/personal-info'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              }text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={personal} className="  " />         */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`   ${
                                  pathname === '/dashboard/personal-info' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                width="26"
                                height="26"
                                viewBox="0 0 26 26">
                                <path
                                  id="user_4_"
                                  data-name="user (4)"
                                  d="M8.825,2.5A29.274,29.274,0,0,1,15,2a29.273,29.273,0,0,1,6.175.5,8.277,8.277,0,0,1,4.207,2.113A8.277,8.277,0,0,1,27.5,8.825,29.276,29.276,0,0,1,28,15a29.275,29.275,0,0,1-.5,6.175,8.277,8.277,0,0,1-2.114,4.207A8.277,8.277,0,0,1,21.175,27.5,29.275,29.275,0,0,1,15,28a29.276,29.276,0,0,1-6.175-.5,8.277,8.277,0,0,1-4.207-2.114A8.277,8.277,0,0,1,2.5,21.175,29.273,29.273,0,0,1,2,15a29.274,29.274,0,0,1,.5-6.175A8.277,8.277,0,0,1,4.618,4.618,8.277,8.277,0,0,1,8.825,2.5ZM15,7.2a5.2,5.2,0,1,0,5.2,5.2A5.2,5.2,0,0,0,15,7.2Zm8.291,14.682a1.607,1.607,0,0,1-.443,2.209,6.951,6.951,0,0,1-2.237.866A26.839,26.839,0,0,1,15,25.4a26.837,26.837,0,0,1-5.611-.442,7.01,7.01,0,0,1-2.2-.842,1.606,1.606,0,0,1-.448-2.227,5.383,5.383,0,0,1,2.291-2.034A13.979,13.979,0,0,1,15,18.9a14.318,14.318,0,0,1,5.955.916A5.3,5.3,0,0,1,23.291,21.882Z"
                                  transform="translate(-2 -2)"
                                  // fill="#fff"
                                  fillRule="evenodd"
                                />
                              </svg>
                              Personal Info
                            </a>
                          </Link>
                          <Link href="/dashboard/fees">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/fees'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={fees} className="" /> */}
                              <svg
                                className={`   ${pathname === '/dashboard/fees' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="26"
                                viewBox="0 0 22 26">
                                <g id="bill_1_" data-name="bill (1)" transform="translate(-53 -49)">
                                  <g id="SOLID" transform="translate(53 49)">
                                    <path
                                      id="Path_23545"
                                      data-name="Path 23545"
                                      d="M75,50.907a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,72.8,49H55.2A2.069,2.069,0,0,0,53,50.907V71.88a1.9,1.9,0,0,0,1.216,1.706l2.8,1.213a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0L65.016,74.8a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0l1.727.749a2.5,2.5,0,0,0,2.141-.084A1.866,1.866,0,0,0,75,72.574ZM58,69.8H70a.876.876,0,1,0,0-1.733H58A.876.876,0,1,0,58,69.8Zm0-3.467H70A.876.876,0,1,0,70,64.6H58a.876.876,0,1,0,0,1.733Zm5-12.126a2.364,2.364,0,0,0-1.356.55A1.791,1.791,0,0,0,61,56.107v.52a1.791,1.791,0,0,0,.644,1.349,2.388,2.388,0,0,0,1.556.558h1.6a.213.213,0,0,1,.141.051.16.16,0,0,1,.059.122v.52a.16.16,0,0,1-.059.122.213.213,0,0,1-.141.051H62a.876.876,0,1,0,0,1.733h1V62a1.01,1.01,0,0,0,2,0v-.874a2.364,2.364,0,0,0,1.356-.55A1.791,1.791,0,0,0,67,59.227v-.52a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,64.8,56.8H63.2a.213.213,0,0,1-.141-.051A.16.16,0,0,1,63,56.627v-.52a.16.16,0,0,1,.059-.122.213.213,0,0,1,.141-.051H66A.876.876,0,1,0,66,54.2H65v-.867a1.01,1.01,0,0,0-2,0Z"
                                      transform="translate(-53 -49)"
                                      // fill="#505050"
                                      fillRule="evenodd"
                                    />
                                  </g>
                                </g>
                              </svg>
                              Fees
                            </a>
                          </Link>
                          <Link href="/dashboard/home-preference">
                            <a
                              className={`dashboard-side-options ${
                                pathname === '/dashboard/home-preference'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm sm:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } `}>
                              {/* <Image src={homeprefer} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/home-preference' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="24"
                                viewBox="0 0 26 24">
                                <g id="search-homepage" transform="translate(-0.001 -14.8)">
                                  <g id="Group_35053" data-name="Group 35053" transform="translate(0.001 14.8)">
                                    <path
                                      id="Path_23718"
                                      data-name="Path 23718"
                                      d="M23.911,29.2H22.325v6.57l-4.476-4.429a5.477,5.477,0,0,0-.867-6.64,5.623,5.623,0,0,0-7.867,0,5.457,5.457,0,0,0,0,7.819,5.624,5.624,0,0,0,6.711.858l5.231,5.176a2.543,2.543,0,0,1-1.044.251H6.049A2.33,2.33,0,0,1,3.7,36.478V29.23H2.151A2.131,2.131,0,0,1,.742,25.478l9.382-9.465a4.047,4.047,0,0,1,5.779,0l2.129,2.141V16.3a1.485,1.485,0,0,1,1.516-1.465h1.262A1.455,1.455,0,0,1,22.29,16.3v6.214l2.96,3A2.081,2.081,0,0,1,23.911,29.2ZM11.067,26.7a2.639,2.639,0,0,0,0,3.752,2.7,2.7,0,0,0,3.792,0,2.639,2.639,0,0,0,0-3.752,2.675,2.675,0,0,0-3.792,0Z"
                                      transform="translate(-0.001 -14.8)"
                                      // fill="#505050"
                                    />
                                  </g>
                                </g>
                              </svg>
                              Home Preference
                            </a>
                          </Link>
                          <Link href="/dashboard/documents">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/documents'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={document} className=" " /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`   ${
                                  pathname === '/dashboard/documents' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                width="22"
                                height="26"
                                viewBox="0 0 22 26">
                                <g id="Group_34838" data-name="Group 34838" transform="translate(-3.75 -1.5)">
                                  <path
                                    id="Path_23528"
                                    data-name="Path 23528"
                                    d="M6.25,1.5a2.416,2.416,0,0,0-2.5,2.321V25.179A2.417,2.417,0,0,0,6.25,27.5h17a2.417,2.417,0,0,0,2.5-2.321v-9.75a4.831,4.831,0,0,0-5-4.643h-2.5a2.416,2.416,0,0,1-2.5-2.321V6.143a4.831,4.831,0,0,0-5-4.643Zm2.5,16.714a.966.966,0,0,1,1-.929h10a.931.931,0,1,1,0,1.857h-10A.966.966,0,0,1,8.75,18.214ZM9.75,21a.931.931,0,1,0,0,1.857h5a.931.931,0,1,0,0-1.857Z"
                                    transform="translate(0)"
                                    // fill="#505050"
                                    fillRule="evenodd"
                                  />
                                  <path
                                    id="Path_23529"
                                    data-name="Path 23529"
                                    d="M12.971,1.816a6.794,6.794,0,0,1,1.857,4.643V8.995a.527.527,0,0,0,.545.507H18.1a7.933,7.933,0,0,1,4.987,1.729A13.732,13.732,0,0,0,12.971,1.816Z"
                                    transform="translate(2.667 -0.293)"
                                    // fill="#505050"
                                  />
                                </g>
                              </svg>
                              All Documents
                            </a>
                          </Link>
                          <Link href="/dashboard/favourite">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/favourite'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={payment} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/favourite' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="24"
                                viewBox="0 0 26 24">
                                <g id="Layer_12" transform="translate(-2 -3.375)">
                                  <path
                                    id="Path_23573"
                                    data-name="Path 23573"
                                    d="M22.824,27.821c-2.868-.915-6.613-3.672-6.186-7.045a3.477,3.477,0,0,1,6.186-2.055,3.477,3.477,0,0,1,6.186,2.055C29.435,24.15,25.692,26.9,22.824,27.821Z"
                                    transform="translate(-1.043 -0.446)"
                                    // fill="#505050"
                                  />
                                  <path
                                    id="Path_23574"
                                    data-name="Path 23574"
                                    d="M13.936,19.947a5.072,5.072,0,0,1,7.845-4.089,5.173,5.173,0,0,1,2.785-.826,4.811,4.811,0,0,1,1.7.317V13.01A3.712,3.712,0,0,0,24.7,9.977L16.152,4.017a3.5,3.5,0,0,0-4.039,0L3.569,9.977A3.7,3.7,0,0,0,2,13.01V23.7a3.632,3.632,0,0,0,3.584,3.679H18.017C15.466,25.611,13.568,22.922,13.936,19.947Z"
                                    // fill="#505050"
                                  />
                                </g>
                              </svg>
                              Favourite
                            </a>
                          </Link>
                          <Link href="/dashboard/transaction">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/transaction'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={transaction} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/transaction' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25">
                                <g id="Layer_2" data-name="Layer 2" transform="translate(-1.251 -1.25)">
                                  <path
                                    id="Union_8"
                                    data-name="Union 8"
                                    d="M-155.692-1513.75h-.116a5.292,5.292,0,0,1-2.686-.72,3.058,3.058,0,0,0-1.665-.49l-.1,0-.094,0a3.042,3.042,0,0,0-1.672.49l-.374.2a2.49,2.49,0,0,1-1.07.241,2.464,2.464,0,0,1-1.161-.287,2.024,2.024,0,0,1-1.11-1.743v-8.724h-3.49a1.519,1.519,0,0,1-1.517-1.517v-9.107a3.342,3.342,0,0,1,3.339-3.339h14.244a7.817,7.817,0,0,1,5.241,1.959,6.337,6.337,0,0,1,2.176,4.72v10a5.991,5.991,0,0,0-5-2.684,6.007,6.007,0,0,0-6,6,6.029,6.029,0,0,0,2.436,4.828,5.24,5.24,0,0,1-1.336.173Zm-7.677-10.651a.924.924,0,0,0,.967.871h5.7a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871h-5.7A.924.924,0,0,0-163.369-1524.4Zm-4.515-12.442a1.5,1.5,0,0,0-1.044,1.433v8.8h3.036v-8.8a1.519,1.519,0,0,0-1.518-1.517h-.027A1.185,1.185,0,0,0-167.884-1536.844Zm4.515,8.537a.924.924,0,0,0,.967.871h12.343a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1528.306Zm0-4.077a.925.925,0,0,0,.967.872h12.343a.925.925,0,0,0,.967-.872.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1532.383Zm7.81,13.633a4.8,4.8,0,0,1,4.9-4.668,4.8,4.8,0,0,1,4.9,4.668,4.8,4.8,0,0,1-4.9,4.668A4.8,4.8,0,0,1-155.559-1518.75Zm3.326,2.188a.722.722,0,0,0,.739.7h.108a.727.727,0,0,0,.731.606.723.723,0,0,0,.74-.7v-.03a1.73,1.73,0,0,0,1.127-1.6,1.667,1.667,0,0,0-.355-1.032,2.236,2.236,0,0,0-.834-.6l-.727-.346c-.169-.08-.338-.149-.338-.355a.324.324,0,0,1,.33-.318h.9a.722.722,0,0,0,.739-.7.722.722,0,0,0-.739-.7h-.107a.728.728,0,0,0-.732-.606.722.722,0,0,0-.739.7v.03a1.729,1.729,0,0,0-1.128,1.6,1.67,1.67,0,0,0,.814,1.439,2.924,2.924,0,0,0,.5.253c.254.116.5.24.756.359a.317.317,0,0,1-.149.6h-.9A.722.722,0,0,0-152.232-1516.562Zm5.769,2.011a6.3,6.3,0,0,0,.428-.487,2.079,2.079,0,0,1-.427.488Z"
                                    transform="translate(172 1540)"
                                    // fill="#505050"
                                  />
                                </g>
                              </svg>
                              All Transaction
                            </a>
                          </Link>

                          <div className="border border-[#D4E8FF] mx-4 md:mx-6 xl:mx-8"></div>
                          {/* <div className="sideBar-menu flex flex-col mt-4 md:mt-6 lg:mt-7 xl:mt-9 2xl:mt-10  mb-2 md:mb-3 lg:mb-4 xl:mb-6 2xl:mb-7 px-[20px] md:px-[26px] lg:px-[30px] xl:px-[38px] 2xl:px-[2.625rem] text-black"> */}
                          <Link href="/dashboard/terms-of-use">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/terms-of-use'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={terms} className="" /> */}
                              <svg
                                id="e"
                                className={`   ${
                                  pathname === '/dashboard/terms-of-use' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26">
                                <path
                                  id="Path_23546"
                                  data-name="Path 23546"
                                  d="M14.226,20.823a6.6,6.6,0,0,1,10.555-5.279c.063-.92.1-1.949.1-3.1a39.679,39.679,0,0,0-.506-6.579A6.956,6.956,0,0,0,19.022.506,39.615,39.615,0,0,0,12.442,0a39.686,39.686,0,0,0-6.58.506A6.956,6.956,0,0,0,.506,5.863,39.735,39.735,0,0,0,0,12.442a39.742,39.742,0,0,0,.506,6.58,6.956,6.956,0,0,0,5.357,5.357,39.738,39.738,0,0,0,6.58.506c1.152,0,2.181-.041,3.1-.1a6.548,6.548,0,0,1-1.318-3.958ZM6.295,6.013h12.3a1.44,1.44,0,0,1,0,2.88H6.295a1.44,1.44,0,0,1,0-2.88Zm0,8.894a1.44,1.44,0,0,1,0-2.88h7.218a1.44,1.44,0,0,1,0,2.88Z"
                                  // fill="#505050"
                                />
                                <path
                                  id="Path_23547"
                                  data-name="Path 23547"
                                  d="M313.341,308.16a5.181,5.181,0,1,0,5.181,5.181A5.181,5.181,0,0,0,313.341,308.16Zm.966,7.752a.966.966,0,1,1-1.932,0v-2.548a.966.966,0,0,1,1.932,0Zm-.04-4.616a.545.545,0,0,1-.42.42,3.143,3.143,0,0,1-.516.04,3.091,3.091,0,0,1-.516-.04.545.545,0,0,1-.42-.42,3.14,3.14,0,0,1-.04-.516,3.091,3.091,0,0,1,.04-.516.545.545,0,0,1,.42-.42,3.14,3.14,0,0,1,.516-.04,3.091,3.091,0,0,1,.516.04.545.545,0,0,1,.42.42,3.14,3.14,0,0,1,.04.516A3.091,3.091,0,0,1,314.267,311.3Z"
                                  transform="translate(-292.522 -292.522)"
                                  // fill="#505050"
                                />
                              </svg>
                              Terms of Use
                            </a>
                          </Link>
                          <Link href="/dashboard/help-support">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/help-support'
                                  ? 'bg-[#00ADEE] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={support} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/help-support' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="26"
                                viewBox="0 0 24 26">
                                <g id="XMLID_2_" transform="translate(-25.274)">
                                  <g id="Group_34850" data-name="Group 34850" transform="translate(25.274)">
                                    <g id="Group_34849" data-name="Group 34849" transform="translate(0)">
                                      <path
                                        id="Path_23548"
                                        data-name="Path 23548"
                                        d="M44.885,281.27a5.932,5.932,0,0,1-4.747,2.338H37.4a2.182,2.182,0,0,1-2.054-1.39,7.082,7.082,0,0,1-1.1-.421,7.428,7.428,0,0,1-2.063-1.474,8.579,8.579,0,0,0-6.908,8.3v.531a1.347,1.347,0,0,0,1.37,1.323H47.9a1.347,1.347,0,0,0,1.37-1.323v-.531A8.45,8.45,0,0,0,44.885,281.27Z"
                                        transform="translate(-25.274 -264.481)"
                                        // fill="#505050"
                                      />
                                      <path
                                        id="Path_23549"
                                        data-name="Path 23549"
                                        d="M93.194,13.15a1.6,1.6,0,0,0,1.39-.78l.022.055.006.016a6.022,6.022,0,0,0,3.491,3.49,2.247,2.247,0,0,1,1.88-.987h2.78a1.62,1.62,0,0,0,.762-.194,3.033,3.033,0,0,0,.9-.985,7.448,7.448,0,0,0,.7-1.4,1.54,1.54,0,0,0,.439.48V13.5a2.729,2.729,0,0,1-2.794,2.653h-2.78a.905.905,0,1,0,0,1.808h2.78a4.589,4.589,0,0,0,4.7-4.461v-.647a1.48,1.48,0,0,0,.634-1.205V7.873a1.482,1.482,0,0,0-.658-1.222,7.65,7.65,0,0,0-15.169,0,1.482,1.482,0,0,0-.658,1.222v3.77A1.549,1.549,0,0,0,93.194,13.15ZM99.851,1.808a5.61,5.61,0,0,1,5.677,4.881,1.53,1.53,0,0,0-.446.523A5.512,5.512,0,0,0,94.623,7.2l0,.009a1.529,1.529,0,0,0-.446-.523A5.611,5.611,0,0,1,99.851,1.808Z"
                                        transform="translate(-87.851)"
                                        // fill="#505050"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                              Help & Support
                            </a>
                          </Link>
                        </div>
                      ) : (
                        <div className=" h-auto mx-auto flex w-[90%] flex-col gap-4 ">
                          <Link href="/dashboard/personal-info">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/personal-info'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              }text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={personal} className="  " /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`   ${
                                  pathname === '/dashboard/personal-info' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                width="26"
                                height="26"
                                viewBox="0 0 26 26">
                                <path
                                  id="user_4_"
                                  data-name="user (4)"
                                  d="M8.825,2.5A29.274,29.274,0,0,1,15,2a29.273,29.273,0,0,1,6.175.5,8.277,8.277,0,0,1,4.207,2.113A8.277,8.277,0,0,1,27.5,8.825,29.276,29.276,0,0,1,28,15a29.275,29.275,0,0,1-.5,6.175,8.277,8.277,0,0,1-2.114,4.207A8.277,8.277,0,0,1,21.175,27.5,29.275,29.275,0,0,1,15,28a29.276,29.276,0,0,1-6.175-.5,8.277,8.277,0,0,1-4.207-2.114A8.277,8.277,0,0,1,2.5,21.175,29.273,29.273,0,0,1,2,15a29.274,29.274,0,0,1,.5-6.175A8.277,8.277,0,0,1,4.618,4.618,8.277,8.277,0,0,1,8.825,2.5ZM15,7.2a5.2,5.2,0,1,0,5.2,5.2A5.2,5.2,0,0,0,15,7.2Zm8.291,14.682a1.607,1.607,0,0,1-.443,2.209,6.951,6.951,0,0,1-2.237.866A26.839,26.839,0,0,1,15,25.4a26.837,26.837,0,0,1-5.611-.442,7.01,7.01,0,0,1-2.2-.842,1.606,1.606,0,0,1-.448-2.227,5.383,5.383,0,0,1,2.291-2.034A13.979,13.979,0,0,1,15,18.9a14.318,14.318,0,0,1,5.955.916A5.3,5.3,0,0,1,23.291,21.882Z"
                                  transform="translate(-2 -2)"
                                  // fill="#fff"
                                  fillRule="evenodd"
                                />
                              </svg>
                              Personal Info
                            </a>
                          </Link>
                          <Link href="/dashboard/documents">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/documents'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={document} className=" " /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`   ${
                                  pathname === '/dashboard/documents' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                width="22"
                                height="26"
                                viewBox="0 0 22 26">
                                <g id="Group_34838" data-name="Group 34838" transform="translate(-3.75 -1.5)">
                                  <path
                                    id="Path_23528"
                                    data-name="Path 23528"
                                    d="M6.25,1.5a2.416,2.416,0,0,0-2.5,2.321V25.179A2.417,2.417,0,0,0,6.25,27.5h17a2.417,2.417,0,0,0,2.5-2.321v-9.75a4.831,4.831,0,0,0-5-4.643h-2.5a2.416,2.416,0,0,1-2.5-2.321V6.143a4.831,4.831,0,0,0-5-4.643Zm2.5,16.714a.966.966,0,0,1,1-.929h10a.931.931,0,1,1,0,1.857h-10A.966.966,0,0,1,8.75,18.214ZM9.75,21a.931.931,0,1,0,0,1.857h5a.931.931,0,1,0,0-1.857Z"
                                    transform="translate(0)"
                                    // fill="#505050"
                                    fillRule="evenodd"
                                  />
                                  <path
                                    id="Path_23529"
                                    data-name="Path 23529"
                                    d="M12.971,1.816a6.794,6.794,0,0,1,1.857,4.643V8.995a.527.527,0,0,0,.545.507H18.1a7.933,7.933,0,0,1,4.987,1.729A13.732,13.732,0,0,0,12.971,1.816Z"
                                    transform="translate(2.667 -0.293)"
                                    // fill="#505050"
                                  />
                                </g>
                              </svg>
                              All Documents
                            </a>
                          </Link>
                          <Link href="/dashboard/payments">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/payments'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={payment} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/payments' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="22"
                                viewBox="0 0 26 22">
                                <path
                                  id="Path_23530"
                                  data-name="Path 23530"
                                  d="M0,5.667A3.477,3.477,0,0,1,3.25,2h19.5A3.477,3.477,0,0,1,26,5.667V20.333A3.477,3.477,0,0,1,22.75,24H3.25A3.477,3.477,0,0,1,0,20.333ZM4.063,7.5a.869.869,0,0,0-.812.917V10.25a.869.869,0,0,0,.813.917h3.25a.869.869,0,0,0,.813-.917V8.417A.869.869,0,0,0,7.313,7.5Zm0,5.5a.923.923,0,0,0,0,1.833h8.125a.923.923,0,0,0,0-1.833Zm0,3.667a.923.923,0,0,0,0,1.833H5.688a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Z"
                                  transform="translate(0 -2)"
                                  // fill="#505050"
                                />
                              </svg>
                              Payment Info
                            </a>
                          </Link>
                          <Link href="/dashboard/transaction">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/transaction'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={transaction} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/transaction' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25">
                                <g id="Layer_2" data-name="Layer 2" transform="translate(-1.251 -1.25)">
                                  <path
                                    id="Union_8"
                                    data-name="Union 8"
                                    d="M-155.692-1513.75h-.116a5.292,5.292,0,0,1-2.686-.72,3.058,3.058,0,0,0-1.665-.49l-.1,0-.094,0a3.042,3.042,0,0,0-1.672.49l-.374.2a2.49,2.49,0,0,1-1.07.241,2.464,2.464,0,0,1-1.161-.287,2.024,2.024,0,0,1-1.11-1.743v-8.724h-3.49a1.519,1.519,0,0,1-1.517-1.517v-9.107a3.342,3.342,0,0,1,3.339-3.339h14.244a7.817,7.817,0,0,1,5.241,1.959,6.337,6.337,0,0,1,2.176,4.72v10a5.991,5.991,0,0,0-5-2.684,6.007,6.007,0,0,0-6,6,6.029,6.029,0,0,0,2.436,4.828,5.24,5.24,0,0,1-1.336.173Zm-7.677-10.651a.924.924,0,0,0,.967.871h5.7a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871h-5.7A.924.924,0,0,0-163.369-1524.4Zm-4.515-12.442a1.5,1.5,0,0,0-1.044,1.433v8.8h3.036v-8.8a1.519,1.519,0,0,0-1.518-1.517h-.027A1.185,1.185,0,0,0-167.884-1536.844Zm4.515,8.537a.924.924,0,0,0,.967.871h12.343a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1528.306Zm0-4.077a.925.925,0,0,0,.967.872h12.343a.925.925,0,0,0,.967-.872.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1532.383Zm7.81,13.633a4.8,4.8,0,0,1,4.9-4.668,4.8,4.8,0,0,1,4.9,4.668,4.8,4.8,0,0,1-4.9,4.668A4.8,4.8,0,0,1-155.559-1518.75Zm3.326,2.188a.722.722,0,0,0,.739.7h.108a.727.727,0,0,0,.731.606.723.723,0,0,0,.74-.7v-.03a1.73,1.73,0,0,0,1.127-1.6,1.667,1.667,0,0,0-.355-1.032,2.236,2.236,0,0,0-.834-.6l-.727-.346c-.169-.08-.338-.149-.338-.355a.324.324,0,0,1,.33-.318h.9a.722.722,0,0,0,.739-.7.722.722,0,0,0-.739-.7h-.107a.728.728,0,0,0-.732-.606.722.722,0,0,0-.739.7v.03a1.729,1.729,0,0,0-1.128,1.6,1.67,1.67,0,0,0,.814,1.439,2.924,2.924,0,0,0,.5.253c.254.116.5.24.756.359a.317.317,0,0,1-.149.6h-.9A.722.722,0,0,0-152.232-1516.562Zm5.769,2.011a6.3,6.3,0,0,0,.428-.487,2.079,2.079,0,0,1-.427.488Z"
                                    transform="translate(172 1540)"
                                    // fill="#505050"
                                  />
                                </g>
                              </svg>
                              All Transaction
                            </a>
                          </Link>
                          <Link href="/dashboard/my-properties">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/my-properties'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={property} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/my-properties' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26">
                                <g id="Icon" transform="translate(-1.25 -1.25)">
                                  <path
                                    id="Path_23538"
                                    data-name="Path 23538"
                                    d="M26.343,21.25H2.157a.907.907,0,1,0,0,1.814H26.343a.907.907,0,0,0,0-1.814Z"
                                    transform="translate(0 4.186)"
                                    // fill="#505050"
                                    fillRule="evenodd"
                                  />
                                  <path
                                    id="Path_23539"
                                    data-name="Path 23539"
                                    d="M7.18,27.25a.907.907,0,0,1-.907-.907v-9.07a.907.907,0,0,1,.907-.907h6.047a.907.907,0,0,1,.907.907v9.07a.907.907,0,0,1-.907.907H16.25a.907.907,0,0,0,.907-.907V2.157a.907.907,0,0,0-.907-.907H4.157a.907.907,0,0,0-.907.907V26.343a.907.907,0,0,0,.907.907Zm5.14-9.07v7.256H8.087V18.18ZM8.692,13.645V12.436a.907.907,0,1,0-1.814,0v1.209a.907.907,0,1,0,1.814,0Zm4.837,0V12.436a.907.907,0,1,0-1.814,0v1.209a.907.907,0,0,0,1.814,0Zm0-6.047V6.39a.907.907,0,1,0-1.814,0V7.6a.907.907,0,1,0,1.814,0Zm-4.837,0V6.39a.907.907,0,1,0-1.814,0V7.6a.907.907,0,1,0,1.814,0Z"
                                    transform="translate(0.419)"
                                    // fill="#505050"
                                    fillRule="evenodd"
                                  />
                                  <path
                                    id="Path_23540"
                                    data-name="Path 23540"
                                    d="M15.785,5.25h5.14a.907.907,0,0,1,.907.907V25.506a.907.907,0,0,1-.907.907H15.582a2.108,2.108,0,0,0,.2-.907ZM17.6,16.436v1.209a.907.907,0,1,0,1.814,0V16.436a.907.907,0,0,0-1.814,0ZM19.413,11.6V10.39a.907.907,0,0,0-1.814,0V11.6a.907.907,0,1,0,1.814,0Z"
                                    transform="translate(3 0.837)"
                                    // fill="#505050"
                                    fillRule="evenodd"
                                  />
                                </g>
                              </svg>
                              My Properties
                            </a>
                          </Link>
                          <Link href="/dashboard/fees">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/fees'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={fees} className="" /> */}
                              <svg
                                className={`   ${pathname === '/dashboard/fees' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="26"
                                viewBox="0 0 22 26">
                                <g id="bill_1_" data-name="bill (1)" transform="translate(-53 -49)">
                                  <g id="SOLID" transform="translate(53 49)">
                                    <path
                                      id="Path_23545"
                                      data-name="Path 23545"
                                      d="M75,50.907a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,72.8,49H55.2A2.069,2.069,0,0,0,53,50.907V71.88a1.9,1.9,0,0,0,1.216,1.706l2.8,1.213a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0L65.016,74.8a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0l1.727.749a2.5,2.5,0,0,0,2.141-.084A1.866,1.866,0,0,0,75,72.574ZM58,69.8H70a.876.876,0,1,0,0-1.733H58A.876.876,0,1,0,58,69.8Zm0-3.467H70A.876.876,0,1,0,70,64.6H58a.876.876,0,1,0,0,1.733Zm5-12.126a2.364,2.364,0,0,0-1.356.55A1.791,1.791,0,0,0,61,56.107v.52a1.791,1.791,0,0,0,.644,1.349,2.388,2.388,0,0,0,1.556.558h1.6a.213.213,0,0,1,.141.051.16.16,0,0,1,.059.122v.52a.16.16,0,0,1-.059.122.213.213,0,0,1-.141.051H62a.876.876,0,1,0,0,1.733h1V62a1.01,1.01,0,0,0,2,0v-.874a2.364,2.364,0,0,0,1.356-.55A1.791,1.791,0,0,0,67,59.227v-.52a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,64.8,56.8H63.2a.213.213,0,0,1-.141-.051A.16.16,0,0,1,63,56.627v-.52a.16.16,0,0,1,.059-.122.213.213,0,0,1,.141-.051H66A.876.876,0,1,0,66,54.2H65v-.867a1.01,1.01,0,0,0-2,0Z"
                                      transform="translate(-53 -49)"
                                      // fill="#505050"
                                      fillRule="evenodd"
                                    />
                                  </g>
                                </g>
                              </svg>
                              Fees
                            </a>
                          </Link>

                          <div className="border border-[#D4E8FF] mx-4 md:mx-6 xl:mx-8"></div>
                          {/* <div className="sideBar-menu flex flex-col mt-4 md:mt-6 lg:mt-7 xl:mt-9 2xl:mt-10  mb-2 md:mb-3 lg:mb-4 xl:mb-6 2xl:mb-7 px-[20px] md:px-[26px] lg:px-[30px] xl:px-[38px] 2xl:px-[2.625rem] text-black"> */}
                          <Link href="/dashboard/terms-of-use">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/terms-of-use'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={terms} className="" /> */}
                              <svg
                                id="e"
                                className={`   ${
                                  pathname === '/dashboard/terms-of-use' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26">
                                <path
                                  id="Path_23546"
                                  data-name="Path 23546"
                                  d="M14.226,20.823a6.6,6.6,0,0,1,10.555-5.279c.063-.92.1-1.949.1-3.1a39.679,39.679,0,0,0-.506-6.579A6.956,6.956,0,0,0,19.022.506,39.615,39.615,0,0,0,12.442,0a39.686,39.686,0,0,0-6.58.506A6.956,6.956,0,0,0,.506,5.863,39.735,39.735,0,0,0,0,12.442a39.742,39.742,0,0,0,.506,6.58,6.956,6.956,0,0,0,5.357,5.357,39.738,39.738,0,0,0,6.58.506c1.152,0,2.181-.041,3.1-.1a6.548,6.548,0,0,1-1.318-3.958ZM6.295,6.013h12.3a1.44,1.44,0,0,1,0,2.88H6.295a1.44,1.44,0,0,1,0-2.88Zm0,8.894a1.44,1.44,0,0,1,0-2.88h7.218a1.44,1.44,0,0,1,0,2.88Z"
                                  // fill="#505050"
                                />
                                <path
                                  id="Path_23547"
                                  data-name="Path 23547"
                                  d="M313.341,308.16a5.181,5.181,0,1,0,5.181,5.181A5.181,5.181,0,0,0,313.341,308.16Zm.966,7.752a.966.966,0,1,1-1.932,0v-2.548a.966.966,0,0,1,1.932,0Zm-.04-4.616a.545.545,0,0,1-.42.42,3.143,3.143,0,0,1-.516.04,3.091,3.091,0,0,1-.516-.04.545.545,0,0,1-.42-.42,3.14,3.14,0,0,1-.04-.516,3.091,3.091,0,0,1,.04-.516.545.545,0,0,1,.42-.42,3.14,3.14,0,0,1,.516-.04,3.091,3.091,0,0,1,.516.04.545.545,0,0,1,.42.42,3.14,3.14,0,0,1,.04.516A3.091,3.091,0,0,1,314.267,311.3Z"
                                  transform="translate(-292.522 -292.522)"
                                  // fill="#505050"
                                />
                              </svg>
                              Terms of Use
                            </a>
                          </Link>
                          <Link href="/dashboard/help-support">
                            <a
                              className={`flex items-center pl-[1rem] md:pl-[1.375rem] xl:pl-[1.625rem] gap-2 md:gap-3 xl:gap-4 py-2 md:py-2 xl:py-3 2xl:py-4 ${
                                pathname === '/dashboard/help-support'
                                  ? 'bg-[#034EA1] text-[#FFFFFF] rounded-[10px] text-sm md:text-base xl:text-lg font-normal font-roboto '
                                  : ''
                              } text-[#505050] text-sm md:text-base xl:text-lg font-normal font-roboto rounded-[10px]`}>
                              {/* <Image src={support} className="" /> */}
                              <svg
                                className={`   ${
                                  pathname === '/dashboard/help-support' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="26"
                                viewBox="0 0 24 26">
                                <g id="XMLID_2_" transform="translate(-25.274)">
                                  <g id="Group_34850" data-name="Group 34850" transform="translate(25.274)">
                                    <g id="Group_34849" data-name="Group 34849" transform="translate(0)">
                                      <path
                                        id="Path_23548"
                                        data-name="Path 23548"
                                        d="M44.885,281.27a5.932,5.932,0,0,1-4.747,2.338H37.4a2.182,2.182,0,0,1-2.054-1.39,7.082,7.082,0,0,1-1.1-.421,7.428,7.428,0,0,1-2.063-1.474,8.579,8.579,0,0,0-6.908,8.3v.531a1.347,1.347,0,0,0,1.37,1.323H47.9a1.347,1.347,0,0,0,1.37-1.323v-.531A8.45,8.45,0,0,0,44.885,281.27Z"
                                        transform="translate(-25.274 -264.481)"
                                        // fill="#505050"
                                      />
                                      <path
                                        id="Path_23549"
                                        data-name="Path 23549"
                                        d="M93.194,13.15a1.6,1.6,0,0,0,1.39-.78l.022.055.006.016a6.022,6.022,0,0,0,3.491,3.49,2.247,2.247,0,0,1,1.88-.987h2.78a1.62,1.62,0,0,0,.762-.194,3.033,3.033,0,0,0,.9-.985,7.448,7.448,0,0,0,.7-1.4,1.54,1.54,0,0,0,.439.48V13.5a2.729,2.729,0,0,1-2.794,2.653h-2.78a.905.905,0,1,0,0,1.808h2.78a4.589,4.589,0,0,0,4.7-4.461v-.647a1.48,1.48,0,0,0,.634-1.205V7.873a1.482,1.482,0,0,0-.658-1.222,7.65,7.65,0,0,0-15.169,0,1.482,1.482,0,0,0-.658,1.222v3.77A1.549,1.549,0,0,0,93.194,13.15ZM99.851,1.808a5.61,5.61,0,0,1,5.677,4.881,1.53,1.53,0,0,0-.446.523A5.512,5.512,0,0,0,94.623,7.2l0,.009a1.529,1.529,0,0,0-.446-.523A5.611,5.611,0,0,1,99.851,1.808Z"
                                        transform="translate(-87.851)"
                                        // fill="#505050"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                              Help & Support
                            </a>
                          </Link>
                        </div>
                      )}
                      {/* </div> */}
                    </div>
                  </div>
                </div>

                <div className=" w-full hidden sm:flex justify-between items-end">
                  <div>
                    <span className="text-[#A1A1A1] text-xs md:text-sm 2xl:text-base font-normal font-roboto ">
                      Welcome Back!
                    </span>
                    <h3 className="text-[#000000] font-roboto font-medium text-base md:text-17 2xl:text-22  ">
                      {' '}
                      {userProfileDetails?.name ? userProfileDetails?.name : ''}
                    </h3>
                  </div>
                  {isTenant(type) ? (
                    <span className="block sm:hidden">
                      <Image src={switchIconTenant} alt="" />{' '}
                    </span>
                  ) : (
                    <span className="block sm:hidden">
                      {' '}
                      <Image src={switchIcon} alt="" />{' '}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center   justify-center md:justify-start mb-0.5  md:mb-4 xl:mb-5 2xl:mb-6">
                {isTenant(type) ? (
                  <span className="md:block hidden mr-[6px] md:mr-2 2xl:mr-[10px]">
                    <Image src={switchIconTenant} alt="" />{' '}
                  </span>
                ) : (
                  <span className=" md:block hidden mr-[6px] md:mr-2 2xl:mr-[10px]">
                    {' '}
                    <Image src={switchIcon} alt="" />{' '}
                  </span>
                )}
                <div className="border border-solid rounded-[25px] border-[#D4E8FF] bg-[#F1F7FF]">
                  <Button.Group>
                    <button
                      className={
                        activeTab
                          ? 'py-[0.6rem] md:py-[0.7rem] 2xl:py-[0.875rem] px-3 sm:px-4 md:px-4 2xl:px-[1.25rem] bg-[#F1F7FF] text-[#A1A1A1] text-[0.5625rem] md:text-[0.68rem] 2xl:text-xs/[0.875rem]  uppercase font-normal font-roboto  rounded-[25px] cursor-pointer'
                          : 'py-[0.6rem] md:py-[0.7rem] 2xl:py-[0.875rem] px-3 sm:px-4 md:px-4 2xl:px-[1.25rem] bg-[#00ADEE] bg-clip-padding bg-no-repeat shadow-[-3px_0px_6px_#00000026] text-[#FFFFFF]  text-[0.5625rem] md:text-[0.68rem] 2xl:text-xs/[0.875rem]  uppercase font-normal font-roboto  rounded-[25px] cursor-pointer'
                      }
                      onClick={() => handelSwitch(activeTab)}>
                      Tenant
                    </button>
                    <button
                      className={
                        activeTab
                          ? 'py-[0.6rem] md:py-[0.7rem] 2xl:py-[0.875rem] px-3 sm:px-4 md:px-4 2xl:px-[1.25rem] bg-[#034EA1] bg-clip-padding bg-no-repeat shadow-[-3px_0px_6px_#00000026] text-[#FFFFFF]  text-[0.5625rem] md:text-[0.68rem] 2xl:text-xs/[0.875rem]  uppercase font-normal font-roboto  rounded-[25px] cursor-pointer'
                          : 'py-[0.6rem] md:py-[0.7rem] 2xl:py-[0.875rem] px-3 sm:px-4 md:px-4 2xl:px-[1.25rem] bg-[#F1F7FF] text-[#A1A1A1]  text-[0.5625rem] md:text-[0.68rem] 2xl:text-xs/[0.875rem]  uppercase font-normal font-roboto  rounded-[25px] cursor-pointer'
                      }
                      onClick={() => handelSwitch(activeTab)}>
                      Landlord
                    </button>
                  </Button.Group>
                </div>
              </div>
            </div>
          </div>

          {isTenant(type) ? (
            <div className="bg-[#F8FBFF] hidden md:flex flex-col w-full h-screen rounded-t-[20px] grow ">
              <div className="flex flex-col mt-4 xl:mt-5 mb-[2.5rem] md:mb-[2.9rem] 2xl:mb-[3.625rem] 2xl:pl-[3.5rem] 2xl:pr-[1.75rem] md:pl-[2.8rem] md:pr-[1.4rem] pl-9 pr-5 text-black">
                <Link href="/dashboard/personal-info">
                  <a
                    id="TtProfileInfoTab"
                    className={` dashboard-side-options
                    ${pathname === '/dashboard/personal-info' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'}`}>
                    {/* <Image src={personal} className="  " />  */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`   ${pathname === '/dashboard/personal-info' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      width="26"
                      height="26"
                      viewBox="0 0 26 26">
                      <path
                        id="user_4_"
                        data-name="user (4)"
                        d="M8.825,2.5A29.274,29.274,0,0,1,15,2a29.273,29.273,0,0,1,6.175.5,8.277,8.277,0,0,1,4.207,2.113A8.277,8.277,0,0,1,27.5,8.825,29.276,29.276,0,0,1,28,15a29.275,29.275,0,0,1-.5,6.175,8.277,8.277,0,0,1-2.114,4.207A8.277,8.277,0,0,1,21.175,27.5,29.275,29.275,0,0,1,15,28a29.276,29.276,0,0,1-6.175-.5,8.277,8.277,0,0,1-4.207-2.114A8.277,8.277,0,0,1,2.5,21.175,29.273,29.273,0,0,1,2,15a29.274,29.274,0,0,1,.5-6.175A8.277,8.277,0,0,1,4.618,4.618,8.277,8.277,0,0,1,8.825,2.5ZM15,7.2a5.2,5.2,0,1,0,5.2,5.2A5.2,5.2,0,0,0,15,7.2Zm8.291,14.682a1.607,1.607,0,0,1-.443,2.209,6.951,6.951,0,0,1-2.237.866A26.839,26.839,0,0,1,15,25.4a26.837,26.837,0,0,1-5.611-.442,7.01,7.01,0,0,1-2.2-.842,1.606,1.606,0,0,1-.448-2.227,5.383,5.383,0,0,1,2.291-2.034A13.979,13.979,0,0,1,15,18.9a14.318,14.318,0,0,1,5.955.916A5.3,5.3,0,0,1,23.291,21.882Z"
                        transform="translate(-2 -2)"
                        // fill="#fff"
                        fillRule="evenodd"
                      />
                    </svg>
                    Personal Info
                  </a>
                </Link>

                <Link href="/dashboard/fees">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/fees' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={fees} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/fees' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="26"
                      viewBox="0 0 22 26">
                      <g id="bill_1_" data-name="bill (1)" transform="translate(-53 -49)">
                        <g id="SOLID" transform="translate(53 49)">
                          <path
                            id="Path_23545"
                            data-name="Path 23545"
                            d="M75,50.907a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,72.8,49H55.2A2.069,2.069,0,0,0,53,50.907V71.88a1.9,1.9,0,0,0,1.216,1.706l2.8,1.213a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0L65.016,74.8a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0l1.727.749a2.5,2.5,0,0,0,2.141-.084A1.866,1.866,0,0,0,75,72.574ZM58,69.8H70a.876.876,0,1,0,0-1.733H58A.876.876,0,1,0,58,69.8Zm0-3.467H70A.876.876,0,1,0,70,64.6H58a.876.876,0,1,0,0,1.733Zm5-12.126a2.364,2.364,0,0,0-1.356.55A1.791,1.791,0,0,0,61,56.107v.52a1.791,1.791,0,0,0,.644,1.349,2.388,2.388,0,0,0,1.556.558h1.6a.213.213,0,0,1,.141.051.16.16,0,0,1,.059.122v.52a.16.16,0,0,1-.059.122.213.213,0,0,1-.141.051H62a.876.876,0,1,0,0,1.733h1V62a1.01,1.01,0,0,0,2,0v-.874a2.364,2.364,0,0,0,1.356-.55A1.791,1.791,0,0,0,67,59.227v-.52a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,64.8,56.8H63.2a.213.213,0,0,1-.141-.051A.16.16,0,0,1,63,56.627v-.52a.16.16,0,0,1,.059-.122.213.213,0,0,1,.141-.051H66A.876.876,0,1,0,66,54.2H65v-.867a1.01,1.01,0,0,0-2,0Z"
                            transform="translate(-53 -49)"
                            // fill="#505050"
                            fillRule="evenodd"
                          />
                        </g>
                      </g>
                    </svg>
                    Fees
                  </a>
                </Link>
                <Link href="/dashboard/home-preference">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/home-preference' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={homeprefer} className="" /> */}
                    <svg
                      className={`   ${
                        pathname === '/dashboard/home-preference' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="24"
                      viewBox="0 0 26 24">
                      <g id="search-homepage" transform="translate(-0.001 -14.8)">
                        <g id="Group_35053" data-name="Group 35053" transform="translate(0.001 14.8)">
                          <path
                            id="Path_23718"
                            data-name="Path 23718"
                            d="M23.911,29.2H22.325v6.57l-4.476-4.429a5.477,5.477,0,0,0-.867-6.64,5.623,5.623,0,0,0-7.867,0,5.457,5.457,0,0,0,0,7.819,5.624,5.624,0,0,0,6.711.858l5.231,5.176a2.543,2.543,0,0,1-1.044.251H6.049A2.33,2.33,0,0,1,3.7,36.478V29.23H2.151A2.131,2.131,0,0,1,.742,25.478l9.382-9.465a4.047,4.047,0,0,1,5.779,0l2.129,2.141V16.3a1.485,1.485,0,0,1,1.516-1.465h1.262A1.455,1.455,0,0,1,22.29,16.3v6.214l2.96,3A2.081,2.081,0,0,1,23.911,29.2ZM11.067,26.7a2.639,2.639,0,0,0,0,3.752,2.7,2.7,0,0,0,3.792,0,2.639,2.639,0,0,0,0-3.752,2.675,2.675,0,0,0-3.792,0Z"
                            transform="translate(-0.001 -14.8)"
                            // fill="#505050"
                          />
                        </g>
                      </g>
                    </svg>
                    Home Preference
                  </a>
                </Link>

                <Link href="/dashboard/favourite">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/favourite' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={favorite} className=" " /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/favourite' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="24"
                      viewBox="0 0 26 24">
                      <g id="Layer_12" transform="translate(-2 -3.375)">
                        <path
                          id="Path_23573"
                          data-name="Path 23573"
                          d="M22.824,27.821c-2.868-.915-6.613-3.672-6.186-7.045a3.477,3.477,0,0,1,6.186-2.055,3.477,3.477,0,0,1,6.186,2.055C29.435,24.15,25.692,26.9,22.824,27.821Z"
                          transform="translate(-1.043 -0.446)"
                          // fill="#505050"
                        />
                        <path
                          id="Path_23574"
                          data-name="Path 23574"
                          d="M13.936,19.947a5.072,5.072,0,0,1,7.845-4.089,5.173,5.173,0,0,1,2.785-.826,4.811,4.811,0,0,1,1.7.317V13.01A3.712,3.712,0,0,0,24.7,9.977L16.152,4.017a3.5,3.5,0,0,0-4.039,0L3.569,9.977A3.7,3.7,0,0,0,2,13.01V23.7a3.632,3.632,0,0,0,3.584,3.679H18.017C15.466,25.611,13.568,22.922,13.936,19.947Z"
                          // fill="#505050"
                        />
                      </g>
                    </svg>
                    Favourite
                  </a>
                </Link>
                <Link href="/dashboard/documents">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/documents' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={document} className=" " /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`   ${pathname === '/dashboard/documents' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      width="22"
                      height="26"
                      viewBox="0 0 22 26">
                      <g id="Group_34838" data-name="Group 34838" transform="translate(-3.75 -1.5)">
                        <path
                          id="Path_23528"
                          data-name="Path 23528"
                          d="M6.25,1.5a2.416,2.416,0,0,0-2.5,2.321V25.179A2.417,2.417,0,0,0,6.25,27.5h17a2.417,2.417,0,0,0,2.5-2.321v-9.75a4.831,4.831,0,0,0-5-4.643h-2.5a2.416,2.416,0,0,1-2.5-2.321V6.143a4.831,4.831,0,0,0-5-4.643Zm2.5,16.714a.966.966,0,0,1,1-.929h10a.931.931,0,1,1,0,1.857h-10A.966.966,0,0,1,8.75,18.214ZM9.75,21a.931.931,0,1,0,0,1.857h5a.931.931,0,1,0,0-1.857Z"
                          transform="translate(0)"
                          // fill="#505050"
                          fillRule="evenodd"
                        />
                        <path
                          id="Path_23529"
                          data-name="Path 23529"
                          d="M12.971,1.816a6.794,6.794,0,0,1,1.857,4.643V8.995a.527.527,0,0,0,.545.507H18.1a7.933,7.933,0,0,1,4.987,1.729A13.732,13.732,0,0,0,12.971,1.816Z"
                          transform="translate(2.667 -0.293)"
                          // fill="#505050"
                        />
                      </g>
                    </svg>
                    All Documents
                  </a>
                </Link>
                <Link href="/dashboard/transaction">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/transaction' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={transaction} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/transaction' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25">
                      <g id="Layer_2" data-name="Layer 2" transform="translate(-1.251 -1.25)">
                        <path
                          id="Union_8"
                          data-name="Union 8"
                          d="M-155.692-1513.75h-.116a5.292,5.292,0,0,1-2.686-.72,3.058,3.058,0,0,0-1.665-.49l-.1,0-.094,0a3.042,3.042,0,0,0-1.672.49l-.374.2a2.49,2.49,0,0,1-1.07.241,2.464,2.464,0,0,1-1.161-.287,2.024,2.024,0,0,1-1.11-1.743v-8.724h-3.49a1.519,1.519,0,0,1-1.517-1.517v-9.107a3.342,3.342,0,0,1,3.339-3.339h14.244a7.817,7.817,0,0,1,5.241,1.959,6.337,6.337,0,0,1,2.176,4.72v10a5.991,5.991,0,0,0-5-2.684,6.007,6.007,0,0,0-6,6,6.029,6.029,0,0,0,2.436,4.828,5.24,5.24,0,0,1-1.336.173Zm-7.677-10.651a.924.924,0,0,0,.967.871h5.7a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871h-5.7A.924.924,0,0,0-163.369-1524.4Zm-4.515-12.442a1.5,1.5,0,0,0-1.044,1.433v8.8h3.036v-8.8a1.519,1.519,0,0,0-1.518-1.517h-.027A1.185,1.185,0,0,0-167.884-1536.844Zm4.515,8.537a.924.924,0,0,0,.967.871h12.343a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1528.306Zm0-4.077a.925.925,0,0,0,.967.872h12.343a.925.925,0,0,0,.967-.872.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1532.383Zm7.81,13.633a4.8,4.8,0,0,1,4.9-4.668,4.8,4.8,0,0,1,4.9,4.668,4.8,4.8,0,0,1-4.9,4.668A4.8,4.8,0,0,1-155.559-1518.75Zm3.326,2.188a.722.722,0,0,0,.739.7h.108a.727.727,0,0,0,.731.606.723.723,0,0,0,.74-.7v-.03a1.73,1.73,0,0,0,1.127-1.6,1.667,1.667,0,0,0-.355-1.032,2.236,2.236,0,0,0-.834-.6l-.727-.346c-.169-.08-.338-.149-.338-.355a.324.324,0,0,1,.33-.318h.9a.722.722,0,0,0,.739-.7.722.722,0,0,0-.739-.7h-.107a.728.728,0,0,0-.732-.606.722.722,0,0,0-.739.7v.03a1.729,1.729,0,0,0-1.128,1.6,1.67,1.67,0,0,0,.814,1.439,2.924,2.924,0,0,0,.5.253c.254.116.5.24.756.359a.317.317,0,0,1-.149.6h-.9A.722.722,0,0,0-152.232-1516.562Zm5.769,2.011a6.3,6.3,0,0,0,.428-.487,2.079,2.079,0,0,1-.427.488Z"
                          transform="translate(172 1540)"
                          // fill="#505050"
                        />
                      </g>
                    </svg>
                    All Transaction
                  </a>
                </Link>
              </div>
              <div className="border border-[#D4E8FF] mx-4 md:mx-6 xl:mx-8"></div>
              <div className="sideBar-menu flex flex-col mt-4 md:mt-[1.4rem] 2xl:mt-[1.75rem]  mb-2 lg:mb-3 xl:mb-4 2xl:mb-7 2xl:px-[3.5rem] xl:px-[2.625rem] lg:px-[2.33375rem] md:px-[1.866875rem] px-8 sm:px-5 text-black">
                <Link href="/dashboard/terms-of-use">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/terms-of-use' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={terms} className="" /> */}
                    <svg
                      id="e"
                      className={`   ${pathname === '/dashboard/terms-of-use' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26">
                      <path
                        id="Path_23546"
                        data-name="Path 23546"
                        d="M14.226,20.823a6.6,6.6,0,0,1,10.555-5.279c.063-.92.1-1.949.1-3.1a39.679,39.679,0,0,0-.506-6.579A6.956,6.956,0,0,0,19.022.506,39.615,39.615,0,0,0,12.442,0a39.686,39.686,0,0,0-6.58.506A6.956,6.956,0,0,0,.506,5.863,39.735,39.735,0,0,0,0,12.442a39.742,39.742,0,0,0,.506,6.58,6.956,6.956,0,0,0,5.357,5.357,39.738,39.738,0,0,0,6.58.506c1.152,0,2.181-.041,3.1-.1a6.548,6.548,0,0,1-1.318-3.958ZM6.295,6.013h12.3a1.44,1.44,0,0,1,0,2.88H6.295a1.44,1.44,0,0,1,0-2.88Zm0,8.894a1.44,1.44,0,0,1,0-2.88h7.218a1.44,1.44,0,0,1,0,2.88Z"
                        // fill="#505050"
                      />
                      <path
                        id="Path_23547"
                        data-name="Path 23547"
                        d="M313.341,308.16a5.181,5.181,0,1,0,5.181,5.181A5.181,5.181,0,0,0,313.341,308.16Zm.966,7.752a.966.966,0,1,1-1.932,0v-2.548a.966.966,0,0,1,1.932,0Zm-.04-4.616a.545.545,0,0,1-.42.42,3.143,3.143,0,0,1-.516.04,3.091,3.091,0,0,1-.516-.04.545.545,0,0,1-.42-.42,3.14,3.14,0,0,1-.04-.516,3.091,3.091,0,0,1,.04-.516.545.545,0,0,1,.42-.42,3.14,3.14,0,0,1,.516-.04,3.091,3.091,0,0,1,.516.04.545.545,0,0,1,.42.42,3.14,3.14,0,0,1,.04.516A3.091,3.091,0,0,1,314.267,311.3Z"
                        transform="translate(-292.522 -292.522)"
                        // fill="#505050"
                      />
                    </svg>
                    Terms of Use
                  </a>
                </Link>
                <Link href="/dashboard/help-support">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/help-support' ? 'bg-[#00ADEE] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={support} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/help-support' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="26"
                      viewBox="0 0 24 26">
                      <g id="XMLID_2_" transform="translate(-25.274)">
                        <g id="Group_34850" data-name="Group 34850" transform="translate(25.274)">
                          <g id="Group_34849" data-name="Group 34849" transform="translate(0)">
                            <path
                              id="Path_23548"
                              data-name="Path 23548"
                              d="M44.885,281.27a5.932,5.932,0,0,1-4.747,2.338H37.4a2.182,2.182,0,0,1-2.054-1.39,7.082,7.082,0,0,1-1.1-.421,7.428,7.428,0,0,1-2.063-1.474,8.579,8.579,0,0,0-6.908,8.3v.531a1.347,1.347,0,0,0,1.37,1.323H47.9a1.347,1.347,0,0,0,1.37-1.323v-.531A8.45,8.45,0,0,0,44.885,281.27Z"
                              transform="translate(-25.274 -264.481)"
                              // fill="#505050"
                            />
                            <path
                              id="Path_23549"
                              data-name="Path 23549"
                              d="M93.194,13.15a1.6,1.6,0,0,0,1.39-.78l.022.055.006.016a6.022,6.022,0,0,0,3.491,3.49,2.247,2.247,0,0,1,1.88-.987h2.78a1.62,1.62,0,0,0,.762-.194,3.033,3.033,0,0,0,.9-.985,7.448,7.448,0,0,0,.7-1.4,1.54,1.54,0,0,0,.439.48V13.5a2.729,2.729,0,0,1-2.794,2.653h-2.78a.905.905,0,1,0,0,1.808h2.78a4.589,4.589,0,0,0,4.7-4.461v-.647a1.48,1.48,0,0,0,.634-1.205V7.873a1.482,1.482,0,0,0-.658-1.222,7.65,7.65,0,0,0-15.169,0,1.482,1.482,0,0,0-.658,1.222v3.77A1.549,1.549,0,0,0,93.194,13.15ZM99.851,1.808a5.61,5.61,0,0,1,5.677,4.881,1.53,1.53,0,0,0-.446.523A5.512,5.512,0,0,0,94.623,7.2l0,.009a1.529,1.529,0,0,0-.446-.523A5.611,5.611,0,0,1,99.851,1.808Z"
                              transform="translate(-87.851)"
                              // fill="#505050"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    Help & Support
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-[#F8FBFF] hidden md:flex flex-col w-full rounded-t-[20px] grow ">
              <div className="flex flex-col mt-4 xl:mt-5 mb-[2.5rem] md:mb-[2.9rem] 2xl:mb-[3.625rem] 2xl:pl-[3.5rem] 2xl:pr-[1.75rem] md:pl-[2.8rem] md:pr-[1.4rem] pl-9 pr-5 text-black">
                <Link href="/dashboard/personal-info">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/personal-info' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    }`}>
                    {/* <Image src={personal} className="  " />  */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`   ${pathname === '/dashboard/personal-info' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      width="26"
                      height="26"
                      viewBox="0 0 26 26">
                      <path
                        id="user_4_"
                        data-name="user (4)"
                        d="M8.825,2.5A29.274,29.274,0,0,1,15,2a29.273,29.273,0,0,1,6.175.5,8.277,8.277,0,0,1,4.207,2.113A8.277,8.277,0,0,1,27.5,8.825,29.276,29.276,0,0,1,28,15a29.275,29.275,0,0,1-.5,6.175,8.277,8.277,0,0,1-2.114,4.207A8.277,8.277,0,0,1,21.175,27.5,29.275,29.275,0,0,1,15,28a29.276,29.276,0,0,1-6.175-.5,8.277,8.277,0,0,1-4.207-2.114A8.277,8.277,0,0,1,2.5,21.175,29.273,29.273,0,0,1,2,15a29.274,29.274,0,0,1,.5-6.175A8.277,8.277,0,0,1,4.618,4.618,8.277,8.277,0,0,1,8.825,2.5ZM15,7.2a5.2,5.2,0,1,0,5.2,5.2A5.2,5.2,0,0,0,15,7.2Zm8.291,14.682a1.607,1.607,0,0,1-.443,2.209,6.951,6.951,0,0,1-2.237.866A26.839,26.839,0,0,1,15,25.4a26.837,26.837,0,0,1-5.611-.442,7.01,7.01,0,0,1-2.2-.842,1.606,1.606,0,0,1-.448-2.227,5.383,5.383,0,0,1,2.291-2.034A13.979,13.979,0,0,1,15,18.9a14.318,14.318,0,0,1,5.955.916A5.3,5.3,0,0,1,23.291,21.882Z"
                        transform="translate(-2 -2)"
                        // fill="#fff"
                        fillRule="evenodd"
                      />
                    </svg>
                    Personal Info
                  </a>
                </Link>
                <Link href="/dashboard/fees">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/fees' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={fees} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/fees' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="26"
                      viewBox="0 0 22 26">
                      <g id="bill_1_" data-name="bill (1)" transform="translate(-53 -49)">
                        <g id="SOLID" transform="translate(53 49)">
                          <path
                            id="Path_23545"
                            data-name="Path 23545"
                            d="M75,50.907a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,72.8,49H55.2A2.069,2.069,0,0,0,53,50.907V71.88a1.9,1.9,0,0,0,1.216,1.706l2.8,1.213a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0L65.016,74.8a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0l1.727.749a2.5,2.5,0,0,0,2.141-.084A1.866,1.866,0,0,0,75,72.574ZM58,69.8H70a.876.876,0,1,0,0-1.733H58A.876.876,0,1,0,58,69.8Zm0-3.467H70A.876.876,0,1,0,70,64.6H58a.876.876,0,1,0,0,1.733Zm5-12.126a2.364,2.364,0,0,0-1.356.55A1.791,1.791,0,0,0,61,56.107v.52a1.791,1.791,0,0,0,.644,1.349,2.388,2.388,0,0,0,1.556.558h1.6a.213.213,0,0,1,.141.051.16.16,0,0,1,.059.122v.52a.16.16,0,0,1-.059.122.213.213,0,0,1-.141.051H62a.876.876,0,1,0,0,1.733h1V62a1.01,1.01,0,0,0,2,0v-.874a2.364,2.364,0,0,0,1.356-.55A1.791,1.791,0,0,0,67,59.227v-.52a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,64.8,56.8H63.2a.213.213,0,0,1-.141-.051A.16.16,0,0,1,63,56.627v-.52a.16.16,0,0,1,.059-.122.213.213,0,0,1,.141-.051H66A.876.876,0,1,0,66,54.2H65v-.867a1.01,1.01,0,0,0-2,0Z"
                            transform="translate(-53 -49)"
                            // fill="#505050"
                            fillRule="evenodd"
                          />
                        </g>
                      </g>
                    </svg>
                    Fees
                  </a>
                </Link>
                <Link href="/dashboard/documents">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/documents' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={document} className=" " /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`   ${pathname === '/dashboard/documents' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      width="22"
                      height="26"
                      viewBox="0 0 22 26">
                      <g id="Group_34838" data-name="Group 34838" transform="translate(-3.75 -1.5)">
                        <path
                          id="Path_23528"
                          data-name="Path 23528"
                          d="M6.25,1.5a2.416,2.416,0,0,0-2.5,2.321V25.179A2.417,2.417,0,0,0,6.25,27.5h17a2.417,2.417,0,0,0,2.5-2.321v-9.75a4.831,4.831,0,0,0-5-4.643h-2.5a2.416,2.416,0,0,1-2.5-2.321V6.143a4.831,4.831,0,0,0-5-4.643Zm2.5,16.714a.966.966,0,0,1,1-.929h10a.931.931,0,1,1,0,1.857h-10A.966.966,0,0,1,8.75,18.214ZM9.75,21a.931.931,0,1,0,0,1.857h5a.931.931,0,1,0,0-1.857Z"
                          transform="translate(0)"
                          // fill="#505050"
                          fillRule="evenodd"
                        />
                        <path
                          id="Path_23529"
                          data-name="Path 23529"
                          d="M12.971,1.816a6.794,6.794,0,0,1,1.857,4.643V8.995a.527.527,0,0,0,.545.507H18.1a7.933,7.933,0,0,1,4.987,1.729A13.732,13.732,0,0,0,12.971,1.816Z"
                          transform="translate(2.667 -0.293)"
                          // fill="#505050"
                        />
                      </g>
                    </svg>
                    All Documents
                  </a>
                </Link>
                <Link href="/dashboard/transaction">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/transaction' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={transaction} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/transaction' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25">
                      <g id="Layer_2" data-name="Layer 2" transform="translate(-1.251 -1.25)">
                        <path
                          id="Union_8"
                          data-name="Union 8"
                          d="M-155.692-1513.75h-.116a5.292,5.292,0,0,1-2.686-.72,3.058,3.058,0,0,0-1.665-.49l-.1,0-.094,0a3.042,3.042,0,0,0-1.672.49l-.374.2a2.49,2.49,0,0,1-1.07.241,2.464,2.464,0,0,1-1.161-.287,2.024,2.024,0,0,1-1.11-1.743v-8.724h-3.49a1.519,1.519,0,0,1-1.517-1.517v-9.107a3.342,3.342,0,0,1,3.339-3.339h14.244a7.817,7.817,0,0,1,5.241,1.959,6.337,6.337,0,0,1,2.176,4.72v10a5.991,5.991,0,0,0-5-2.684,6.007,6.007,0,0,0-6,6,6.029,6.029,0,0,0,2.436,4.828,5.24,5.24,0,0,1-1.336.173Zm-7.677-10.651a.924.924,0,0,0,.967.871h5.7a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871h-5.7A.924.924,0,0,0-163.369-1524.4Zm-4.515-12.442a1.5,1.5,0,0,0-1.044,1.433v8.8h3.036v-8.8a1.519,1.519,0,0,0-1.518-1.517h-.027A1.185,1.185,0,0,0-167.884-1536.844Zm4.515,8.537a.924.924,0,0,0,.967.871h12.343a.924.924,0,0,0,.967-.871.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1528.306Zm0-4.077a.925.925,0,0,0,.967.872h12.343a.925.925,0,0,0,.967-.872.924.924,0,0,0-.967-.871H-162.4A.924.924,0,0,0-163.369-1532.383Zm7.81,13.633a4.8,4.8,0,0,1,4.9-4.668,4.8,4.8,0,0,1,4.9,4.668,4.8,4.8,0,0,1-4.9,4.668A4.8,4.8,0,0,1-155.559-1518.75Zm3.326,2.188a.722.722,0,0,0,.739.7h.108a.727.727,0,0,0,.731.606.723.723,0,0,0,.74-.7v-.03a1.73,1.73,0,0,0,1.127-1.6,1.667,1.667,0,0,0-.355-1.032,2.236,2.236,0,0,0-.834-.6l-.727-.346c-.169-.08-.338-.149-.338-.355a.324.324,0,0,1,.33-.318h.9a.722.722,0,0,0,.739-.7.722.722,0,0,0-.739-.7h-.107a.728.728,0,0,0-.732-.606.722.722,0,0,0-.739.7v.03a1.729,1.729,0,0,0-1.128,1.6,1.67,1.67,0,0,0,.814,1.439,2.924,2.924,0,0,0,.5.253c.254.116.5.24.756.359a.317.317,0,0,1-.149.6h-.9A.722.722,0,0,0-152.232-1516.562Zm5.769,2.011a6.3,6.3,0,0,0,.428-.487,2.079,2.079,0,0,1-.427.488Z"
                          transform="translate(172 1540)"
                          // fill="#505050"
                        />
                      </g>
                    </svg>
                    All Transaction
                  </a>
                </Link>
                <Link href="/dashboard/payments">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/payments' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={payment} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/payments' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="22"
                      viewBox="0 0 26 22">
                      <path
                        id="Path_23530"
                        data-name="Path 23530"
                        d="M0,5.667A3.477,3.477,0,0,1,3.25,2h19.5A3.477,3.477,0,0,1,26,5.667V20.333A3.477,3.477,0,0,1,22.75,24H3.25A3.477,3.477,0,0,1,0,20.333ZM4.063,7.5a.869.869,0,0,0-.812.917V10.25a.869.869,0,0,0,.813.917h3.25a.869.869,0,0,0,.813-.917V8.417A.869.869,0,0,0,7.313,7.5Zm0,5.5a.923.923,0,0,0,0,1.833h8.125a.923.923,0,0,0,0-1.833Zm0,3.667a.923.923,0,0,0,0,1.833H5.688a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Z"
                        transform="translate(0 -2)"
                        // fill="#505050"
                      />
                    </svg>
                    Payment Info
                  </a>
                </Link>

                <Link href="/dashboard/my-properties">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/my-properties' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={property} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/my-properties' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26">
                      <g id="Icon" transform="translate(-1.25 -1.25)">
                        <path
                          id="Path_23538"
                          data-name="Path 23538"
                          d="M26.343,21.25H2.157a.907.907,0,1,0,0,1.814H26.343a.907.907,0,0,0,0-1.814Z"
                          transform="translate(0 4.186)"
                          // fill="#505050"
                          fillRule="evenodd"
                        />
                        <path
                          id="Path_23539"
                          data-name="Path 23539"
                          d="M7.18,27.25a.907.907,0,0,1-.907-.907v-9.07a.907.907,0,0,1,.907-.907h6.047a.907.907,0,0,1,.907.907v9.07a.907.907,0,0,1-.907.907H16.25a.907.907,0,0,0,.907-.907V2.157a.907.907,0,0,0-.907-.907H4.157a.907.907,0,0,0-.907.907V26.343a.907.907,0,0,0,.907.907Zm5.14-9.07v7.256H8.087V18.18ZM8.692,13.645V12.436a.907.907,0,1,0-1.814,0v1.209a.907.907,0,1,0,1.814,0Zm4.837,0V12.436a.907.907,0,1,0-1.814,0v1.209a.907.907,0,0,0,1.814,0Zm0-6.047V6.39a.907.907,0,1,0-1.814,0V7.6a.907.907,0,1,0,1.814,0Zm-4.837,0V6.39a.907.907,0,1,0-1.814,0V7.6a.907.907,0,1,0,1.814,0Z"
                          transform="translate(0.419)"
                          // fill="#505050"
                          fillRule="evenodd"
                        />
                        <path
                          id="Path_23540"
                          data-name="Path 23540"
                          d="M15.785,5.25h5.14a.907.907,0,0,1,.907.907V25.506a.907.907,0,0,1-.907.907H15.582a2.108,2.108,0,0,0,.2-.907ZM17.6,16.436v1.209a.907.907,0,1,0,1.814,0V16.436a.907.907,0,0,0-1.814,0ZM19.413,11.6V10.39a.907.907,0,0,0-1.814,0V11.6a.907.907,0,1,0,1.814,0Z"
                          transform="translate(3 0.837)"
                          // fill="#505050"
                          fillRule="evenodd"
                        />
                      </g>
                    </svg>
                    My Properties
                  </a>
                </Link>
              </div>
              <div className="border border-[#D4E8FF] mx-4 md:mx-6 xl:mx-8"></div>
              <div className="sideBar-menu flex flex-col mt-4 md:mt-[1.4rem] 2xl:mt-[1.75rem]   mb-2 lg:mb-3 xl:mb-4 2xl:mb-7 2xl:px-[3.5rem] xl:px-[2.625rem] lg:px-[2.33375rem] md:px-[1.866875rem] px-8 sm:px-5 text-black">
                <Link href="/dashboard/terms-of-use">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/terms-of-use' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={terms} className="" /> */}
                    <svg
                      id="e"
                      className={`   ${pathname === '/dashboard/terms-of-use' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26">
                      <path
                        id="Path_23546"
                        data-name="Path 23546"
                        d="M14.226,20.823a6.6,6.6,0,0,1,10.555-5.279c.063-.92.1-1.949.1-3.1a39.679,39.679,0,0,0-.506-6.579A6.956,6.956,0,0,0,19.022.506,39.615,39.615,0,0,0,12.442,0a39.686,39.686,0,0,0-6.58.506A6.956,6.956,0,0,0,.506,5.863,39.735,39.735,0,0,0,0,12.442a39.742,39.742,0,0,0,.506,6.58,6.956,6.956,0,0,0,5.357,5.357,39.738,39.738,0,0,0,6.58.506c1.152,0,2.181-.041,3.1-.1a6.548,6.548,0,0,1-1.318-3.958ZM6.295,6.013h12.3a1.44,1.44,0,0,1,0,2.88H6.295a1.44,1.44,0,0,1,0-2.88Zm0,8.894a1.44,1.44,0,0,1,0-2.88h7.218a1.44,1.44,0,0,1,0,2.88Z"
                        // fill="#505050"
                      />
                      <path
                        id="Path_23547"
                        data-name="Path 23547"
                        d="M313.341,308.16a5.181,5.181,0,1,0,5.181,5.181A5.181,5.181,0,0,0,313.341,308.16Zm.966,7.752a.966.966,0,1,1-1.932,0v-2.548a.966.966,0,0,1,1.932,0Zm-.04-4.616a.545.545,0,0,1-.42.42,3.143,3.143,0,0,1-.516.04,3.091,3.091,0,0,1-.516-.04.545.545,0,0,1-.42-.42,3.14,3.14,0,0,1-.04-.516,3.091,3.091,0,0,1,.04-.516.545.545,0,0,1,.42-.42,3.14,3.14,0,0,1,.516-.04,3.091,3.091,0,0,1,.516.04.545.545,0,0,1,.42.42,3.14,3.14,0,0,1,.04.516A3.091,3.091,0,0,1,314.267,311.3Z"
                        transform="translate(-292.522 -292.522)"
                        // fill="#505050"
                      />
                    </svg>
                    Terms of Use
                  </a>
                </Link>
                <Link href="/dashboard/help-support">
                  <a
                    className={`dashboard-side-options ${
                      pathname === '/dashboard/help-support' ? 'bg-[#034EA1] text-[#FFFFFF] ' : 'text-[#505050]'
                    } `}>
                    {/* <Image src={support} className="" /> */}
                    <svg
                      className={`   ${pathname === '/dashboard/help-support' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="26"
                      viewBox="0 0 24 26">
                      <g id="XMLID_2_" transform="translate(-25.274)">
                        <g id="Group_34850" data-name="Group 34850" transform="translate(25.274)">
                          <g id="Group_34849" data-name="Group 34849" transform="translate(0)">
                            <path
                              id="Path_23548"
                              data-name="Path 23548"
                              d="M44.885,281.27a5.932,5.932,0,0,1-4.747,2.338H37.4a2.182,2.182,0,0,1-2.054-1.39,7.082,7.082,0,0,1-1.1-.421,7.428,7.428,0,0,1-2.063-1.474,8.579,8.579,0,0,0-6.908,8.3v.531a1.347,1.347,0,0,0,1.37,1.323H47.9a1.347,1.347,0,0,0,1.37-1.323v-.531A8.45,8.45,0,0,0,44.885,281.27Z"
                              transform="translate(-25.274 -264.481)"
                              // fill="#505050"
                            />
                            <path
                              id="Path_23549"
                              data-name="Path 23549"
                              d="M93.194,13.15a1.6,1.6,0,0,0,1.39-.78l.022.055.006.016a6.022,6.022,0,0,0,3.491,3.49,2.247,2.247,0,0,1,1.88-.987h2.78a1.62,1.62,0,0,0,.762-.194,3.033,3.033,0,0,0,.9-.985,7.448,7.448,0,0,0,.7-1.4,1.54,1.54,0,0,0,.439.48V13.5a2.729,2.729,0,0,1-2.794,2.653h-2.78a.905.905,0,1,0,0,1.808h2.78a4.589,4.589,0,0,0,4.7-4.461v-.647a1.48,1.48,0,0,0,.634-1.205V7.873a1.482,1.482,0,0,0-.658-1.222,7.65,7.65,0,0,0-15.169,0,1.482,1.482,0,0,0-.658,1.222v3.77A1.549,1.549,0,0,0,93.194,13.15ZM99.851,1.808a5.61,5.61,0,0,1,5.677,4.881,1.53,1.53,0,0,0-.446.523A5.512,5.512,0,0,0,94.623,7.2l0,.009a1.529,1.529,0,0,0-.446-.523A5.611,5.611,0,0,1,99.851,1.808Z"
                              transform="translate(-87.851)"
                              // fill="#505050"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    Help & Support
                  </a>
                </Link>
              </div>
            </div>
          )}
        </aside>
        <div className="flex flex-col w-full overflow-y-auto   md:w-[calc(100vw-260px)] xl:w-[calc(100vw-320px)]  ">
          <div className="prod-tab-content">
            <Tabs.Group
              aria-label="hm-product-tab"
              style="default"
              ref={tabsRef}
              onActiveTabChange={tab => setActiveTab(tab)}
              className="w-full accordion-tab-group">
              <Tabs.Item active title="">
                <main className=" grow ">{children} </main>
              </Tabs.Item>
              <Tabs.Item title="">
                <main className="grow ">{children}</main>
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      </div>
    </div>
  )
}

const DashboardLayout: FC = props => (
  <GlobalLayout>
    <DashboardLayoutContent {...props} />
  </GlobalLayout>
)

export default DashboardLayout
