// import { useState } from 'react'
import FilterDiv from '../FilterDiv/Filter'
// import { useRouter} from 'next/router'
import Link from 'next/link'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSession } from 'next-auth/react'
// import { useGetUserNotificationsQuery } from '@/store'
import { Paper, Popper } from '@mui/material'

import { styled } from '@mui/system'
import { useState } from 'react'
import { IoConstructOutline } from 'react-icons/io5'
import Image from 'next/image'

// Custom CSS styles for the arrow
const ArrowWrapper = styled('div')`
  position: relative;
`

const Arrow = styled('span')`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px;
  border-color: transparent transparent #e1e1e1 transparent;
  top: 0px;
  transform: rotate(180deg);
  left: calc(65% - 8px);
`

const HmSlider = () => {
  // const router = useRouter()
  const { data: session }: any = useSession()
  const topSliderSettings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    // lazyLoad: true,    speed: 500,
    fade: true,
    speed: 900,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  // const { data: userNotifications } = useGetUserNotificationsQuery(
  //   { userId: session?.user?.id || 0, pageNumber: 1 },
  //   { skip: !session?.user?.id }
  // )

  //customer support

  const [anchorEl1, setAnchorEl1] = useState(null)

  const handleMouseOver = (event: any) => {
    setAnchorEl1(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setAnchorEl1(null)
  }

  const open1 = Boolean(anchorEl1)
  const id1 = open1 ? 'arrow-popper' : undefined

  return (
    <div className="bg-gradient-to-b from-[#EEF5F9] from-0% to-[#FFF7FF] to-100%">
      <section className=" bg-test relative flex flex-col items-center mt-[85px] pb-[80px]">
        <div className=" bg-transparent hidden w-full md:flex justify-between items-center md:h-[550px] lg:h-[550px] xl:h-[550px] 2xl:h-[650px] z-20 overflow-hidden  ">
          <h1
            className=" hidden md:-mt-8 lg:-mt-[100px] xl:-mt-[100px] 2xl:-mt-[100px] text-4xl sm:text-[44px] md:text-[60px] xl:text-[84px] 2xl:text-[94px] 2xl:leading-[247px] text-[#034ea10f] font-bold opacity-6 -ml-20 lg:-ml-16  xl:-ml-[105px] "
            style={{ rotate: '-90deg' }}>
            RealEzy
          </h1>

          <div className="hidden  -mr-[98px] md:-mr-[88px] lg:-mr-[108px] xl:-mr-[118px] 2xl:-mr-[129px] xl:-mt-[104px] 2xl:-mt-[104px]">
            <img
              src="download/group-house.png"
              alt="image"
              className=" w-[240px] h-[300px] md:w-[270px] md:h-[310px] lg:w-[320px] lg:h-[400px] xl:w-[370px] xl:h-[460px] 2xl:w-[451px] 2xl:h-[520px] overflow-auto mx-auto  "
            />
          </div>
        </div>
        <div className="absolute left-0 top-0">
          <Image src="/download/hexagon_approved.png" alt="image" width={775} height={642} />
        </div>
        <section className="bg-transparent z-0 md:z-40 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] w-full h-full  absolute flex flex-col items-center  pt-[0px] md:pt-[0px] lg:pt-[0px] bg-0">
          <div className="w-[100%] md:w-full m-auto ">
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <div className=" flex flex-wrap items-start justify-start">
                <div className="w-full mt-0">
                  <div className="targetDiv">
                    {/* slide start */}
                    <div className="w-full">
                      <Slider {...topSliderSettings} className=" hmslider-slick">
                        {/* slide 1 */}
                        <div>
                          <div className="flex flex-col-reverse items-center justify-center md:justify-between  overflow-hidden border-0 md:flex-row bg-transparent">
                            <div className="hidden md:inline-block w-[90%]  md:-mr-[170px] lg:-mr-[220px] xl:-mr-[260px] 2xl:-mr-[295px] -mt-6 sm:-mt-16 md:-mt-[50px] lg:-mt-[50px] xl:-mt-[50px] 2xl:-mt-[55px] md:max-w-[485px] lg:max-w-[685px] z-30 py-1 md:py-3 xl:py-5 px-0 sm:px-0  xl:p-[0px] sm:text-left">
                              <h4 className="mt-0  mb-2 md:mb-4 xl:mb-6 text-[26px] md:text-[29.37px] lg:text-[36.71px] xl:text-[47px] 2xl:text-[47px] font-bold text-[#034EA1] tracking-[0.78px] md:tracking-[1.24px] xl:tracking-[1.65px] leading-9 sm:leading-[40px] md:leading-[44px]  xl:leading-[70px] 2xl:leading-[70px] text-left">
                                IT’S ABOUT TIME
                              </h4>
                              <h2 className=" font-segoe text-left mb-7 md:mb-5 lg:mb-7 xl:mb-8 2xl:mb-14 text-[12px] md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px]  xl:tracking-[1.23px] 2xl:tracking-[1.65px]  leading-[22px]  md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-normal text-[#505050]">
                                Join Singapore’s only self-service, peer-to-peer, <br />
                                Residential rental platform.
                              </h2>
                              <div
                                className="wow fadeInUp"
                                data-wow-delay=".2s"
                                style={{ visibility: 'visible', animationDelay: '0.2s' }}>
                                <p className=" font-segoe text-left text-[12px] mb-2 md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px] xl:tracking-[1.23px] 2xl:tracking-[1.65px] leading-[22px] md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-semibold text-[#505050]">
                                  In partnership with:
                                </p>
                                <div className="inline-block w-full">
                                  <a
                                    className="mr-[0px] lg:-ml-[15px] pointer-events-none inline-flex items-center justify-center w-[220px] p:[10px] h-[62px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/allianz-bk-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{}}
                                  />
                                  <a
                                    className="hidden mr-[20px] pointer-events-none items-center justify-center p-[0px] py-5 -ml-1 w-[100px] h-[45px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/lch-logo-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '62%' }}
                                  />
                                  <a
                                    className="mt-2 lg:mt-0 mr-[10px] pointer-events-none inline-flex items-center justify-center p-[0px] py-2 w-[160px] h-[60px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/aardvark-logo.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '78%' }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" inline-block items-end justify-end bg-transparent mx-auto -ml-0 -mr-0 -mt-0 md:-mr-0 md:-mt-0 lg:-mt-[15px]">
                              <img
                                src="download/hero-image.png"
                                alt="image"
                                className=" w-full lg:w-[85%]  float-right"
                                // className=" w-full h-[300px] md:w-full md:h-[496px] lg:w-[784px] lg:h-[595px] xl:w-[950px] xl:h-[680px] 2xl:w-[1175px] 2xl:h-[741px]  "
                              />
                            </div>
                          </div>
                        </div>
                        {/* slide 2*/}
                        <div>
                          <div className="flex flex-col-reverse items-center justify-center md:justify-between  overflow-hidden border-0 md:flex-row bg-transparent">
                            <div className="hidden md:inline-block w-[90%]  md:-mr-[170px] lg:-mr-[220px] xl:-mr-[260px] 2xl:-mr-[295px] -mt-6 sm:-mt-16 md:-mt-[50px] lg:-mt-[50px] xl:-mt-[50px] 2xl:-mt-[55px] md:max-w-[485px] lg:max-w-[685px] z-30 py-1 md:py-3 xl:py-5 px-0 sm:px-0  xl:p-[0px] sm:text-left">
                              <h4 className="mt-0  mb-2 md:mb-4 xl:mb-6 text-[26px] md:text-[29.37px] lg:text-[36.71px] xl:text-[47px] 2xl:text-[47px] font-bold text-[#034EA1] tracking-[0.78px] md:tracking-[1.24px] xl:tracking-[1.65px] leading-9 sm:leading-[40px] md:leading-[44px]  xl:leading-[70px] 2xl:leading-[70px] text-left">
                                IT’S ABOUT TIME
                              </h4>
                              <h2 className=" font-segoe text-left mb-7 md:mb-5 lg:mb-7 xl:mb-8 2xl:mb-14 text-[12px] md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px]  xl:tracking-[1.23px] 2xl:tracking-[1.65px]  leading-[22px]  md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-normal text-[#505050]">
                                Landlords enjoyed peace of mind with our <br />
                                household and rental protection insurance plan
                              </h2>
                              {/* <button
                                onClick={() => router.push('./add-property')}
                                // href="/add-property"
                                className=" cursor-pointer gap-3 tracking-wide inline-flex items-center justify-center rounded-lg bg-[#034EA1] hover:bg-[#00adee] py-[14px] lg:py-[13.85px]  xl:py-[15px] 2xl:py-5 px-8  md:px-5  text-base md:text-xs lg:text-base xl:text-lg 2xl:text-2xl font-normal text-white transition duration-300 ease-in-out hover:shadow-lg">
                                <img
                                  src="/download/house-icon.png"
                                  alt="image"
                                  className=" w-[24px] h-[22px] md:w-[18.69px] md:h-[17px]  lg:w-[23.36px] lg:h-[21.36px] xl:w-[25.25px] xl:h-[24px] 2xl:w-[35px] 2xl:h-[32px] md:mx-0 mx-auto "
                                />
                                Add Property
                              </button> */}
                              <div
                                className="wow fadeInUp"
                                data-wow-delay=".2s"
                                style={{ visibility: 'visible', animationDelay: '0.2s' }}>
                                <p className=" font-segoe text-left text-[12px] mb-2 md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px] xl:tracking-[1.23px] 2xl:tracking-[1.65px] leading-[22px] md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-semibold text-[#505050]">
                                  In partnership with:
                                </p>
                                <div className="inline-block w-full">
                                  <a
                                    className="mr-[0px] lg:-ml-[15px] pointer-events-none inline-flex items-center justify-center w-[220px] p:[10px] h-[62px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/allianz-bk-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{}}
                                  />
                                  <a
                                    className="hidden mr-[20px] pointer-events-none items-center justify-center p-[0px] py-5 -ml-1 w-[100px] h-[45px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/lch-logo-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '62%' }}
                                  />
                                  <a
                                    className="mt-2 lg:mt-0 mr-[10px] pointer-events-none inline-flex items-center justify-center p-[0px] py-2 w-[160px] h-[60px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/aardvark-logo.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '78%' }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" inline-block items-end justify-end bg-transparent mx-auto -ml-0 -mr-0 -mt-0 md:-mr-0 md:-mt-0 lg:-mt-[15px]">
                              <img
                                src="download/hero-image.png"
                                alt="image"
                                className=" w-full lg:w-[85%] float-right"
                                // className=" w-full h-[300px] md:w-full md:h-[496px] lg:w-[784px] lg:h-[595px] xl:w-[950px] xl:h-[680px] 2xl:w-[1175px] 2xl:h-[741px]  "
                              />
                            </div>
                          </div>
                        </div>
                        {/* slide 3 */}
                        <div>
                          <div className="flex flex-col-reverse items-center justify-center md:justify-between  overflow-hidden border-0 md:flex-row bg-transparent">
                            <div className="hidden md:inline-block w-[90%]  md:-mr-[170px] lg:-mr-[220px] xl:-mr-[260px] 2xl:-mr-[295px] -mt-6 sm:-mt-16 md:-mt-[50px] lg:-mt-[50px] xl:-mt-[50px] 2xl:-mt-[55px] md:max-w-[485px] lg:max-w-[685px] z-30 py-1 md:py-3 xl:py-5 px-0 sm:px-0  xl:p-[0px] sm:text-left">
                              <h4 className="mt-0  mb-2 md:mb-4 xl:mb-6 text-[26px] md:text-[29.37px] lg:text-[36.71px] xl:text-[47px] 2xl:text-[47px] font-bold text-[#034EA1] tracking-[0.78px] md:tracking-[1.24px] xl:tracking-[1.65px] leading-9 sm:leading-[40px] md:leading-[44px]  xl:leading-[70px] 2xl:leading-[70px] text-left">
                                IT’S ABOUT TIME
                              </h4>
                              <h2 className=" font-segoe text-left mb-7 md:mb-5 lg:mb-7 xl:mb-8 2xl:mb-14 text-[12px] md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px]  xl:tracking-[1.23px] 2xl:tracking-[1.65px]  leading-[22px]  md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-normal text-[#505050]">
                                Tenants benefitted from our *Deposit-Free Scheme. <br />
                                *eligibility requirements apply
                              </h2>
                              {/* <button
                                onClick={() => router.push('./add-property')}
                                // href="/add-property"
                                className=" cursor-pointer gap-3 tracking-wide inline-flex items-center justify-center rounded-lg bg-[#034EA1] hover:bg-[#00adee] py-[14px] lg:py-[13.85px]  xl:py-[15px] 2xl:py-5 px-8  md:px-5  text-base md:text-xs lg:text-base xl:text-lg 2xl:text-2xl font-normal text-white transition duration-300 ease-in-out hover:shadow-lg">
                                <img
                                  src="/download/house-icon.png"
                                  alt="image"
                                  className=" w-[24px] h-[22px] md:w-[18.69px] md:h-[17px]  lg:w-[23.36px] lg:h-[21.36px] xl:w-[25.25px] xl:h-[24px] 2xl:w-[35px] 2xl:h-[32px] md:mx-0 mx-auto "
                                />
                                Add Property
                              </button> */}
                              <div
                                className="wow fadeInUp"
                                data-wow-delay=".2s"
                                style={{ visibility: 'visible', animationDelay: '0.2s' }}>
                                <p className=" font-segoe text-left text-[12px] mb-2 md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px] xl:tracking-[1.23px] 2xl:tracking-[1.65px] leading-[22px] md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-semibold text-[#505050]">
                                  In partnership with:
                                </p>
                                <div className="inline-block w-full">
                                  <a
                                    className="mr-[0px] lg:-ml-[15px] pointer-events-none inline-flex items-center justify-center w-[220px] p:[10px] h-[62px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/allianz-bk-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{}}
                                  />
                                  <a
                                    className="hidden mr-[20px] pointer-events-none items-center justify-center p-[0px] py-5 -ml-1 w-[100px] h-[45px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/lch-logo-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '62%' }}
                                  />
                                  <a
                                    className="mt-2 lg:mt-0 mr-[10px] pointer-events-none inline-flex items-center justify-center p-[0px] py-2 w-[160px] h-[60px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/aardvark-logo.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '78%' }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" inline-block items-end justify-end bg-transparent mx-auto -ml-0 -mr-0 -mt-0 md:-mr-0 md:-mt-0 lg:-mt-[15px]">
                              <img
                                src="download/hero-image.png"
                                alt="image"
                                className=" w-full lg:w-[85%] float-right"
                                // className=" w-full h-[300px] md:w-full md:h-[496px] lg:w-[784px] lg:h-[595px] xl:w-[950px] xl:h-[680px] 2xl:w-[1175px] 2xl:h-[741px]  "
                              />
                            </div>
                          </div>
                        </div>
                        {/* slide 4 */}
                        <div>
                          <div className="flex flex-col-reverse items-center justify-center md:justify-between  overflow-hidden border-0 md:flex-row bg-transparent">
                            <div className="hidden md:inline-block w-[90%]  md:-mr-[170px] lg:-mr-[220px] xl:-mr-[260px] 2xl:-mr-[295px] -mt-6 sm:-mt-16 md:-mt-[50px] lg:-mt-[50px] xl:-mt-[50px] 2xl:-mt-[55px] md:max-w-[485px] lg:max-w-[685px] z-30 py-1 md:py-3 xl:py-5 px-0 sm:px-0  xl:p-[0px] sm:text-left">
                              <h4 className="mt-0  mb-2 md:mb-4 xl:mb-6 text-[26px] md:text-[29.37px] lg:text-[36.71px] xl:text-[47px] 2xl:text-[47px] font-bold text-[#034EA1] tracking-[0.78px] md:tracking-[1.24px] xl:tracking-[1.65px] leading-9 sm:leading-[40px] md:leading-[44px]  xl:leading-[70px] 2xl:leading-[70px] text-left">
                                IT’S ABOUT TIME <br /> YOU CALLED THE SHOTS
                              </h4>
                              <h4 className="mt-0  mb-2 md:mb-4 xl:mb-6 text-[26px] md:text-[29.37px] lg:text-[35px] xl:text-[35px] 2xl:text-[35px] font-bold text-[#00ADEE] tracking-[0.78px] md:tracking-[1.24px] xl:tracking-[1.65px] leading-9 sm:leading-[40px] md:leading-[44px]  xl:leading-[70px] 2xl:leading-[70px] text-left">
                                RENT SMART. RENT EZY
                              </h4>
                              <h2 className=" hidden font-segoe text-left mb-7 md:mb-5 lg:mb-7 xl:mb-8 2xl:mb-8 text-[12px] md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px]  xl:tracking-[1.23px] 2xl:tracking-[1.65px]  leading-[22px]  md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-normal text-[#505050]">
                                RENT SMART. RENT EZY. {/* Tenants enjoy the Zero Deposit Scheme by pre-qualification */}
                              </h2>
                              {/* <button
                                onClick={() => router.push('./add-property')}
                                // href="/add-property"
                                className=" cursor-pointer gap-3 tracking-wide inline-flex items-center justify-center rounded-lg bg-[#034EA1] hover:bg-[#00adee] py-[14px] lg:py-[13.85px]  xl:py-[15px] 2xl:py-5 px-8  md:px-5  text-base md:text-xs lg:text-base xl:text-lg 2xl:text-2xl font-normal text-white transition duration-300 ease-in-out hover:shadow-lg">
                                <img
                                  src="/download/house-icon.png"
                                  alt="image"
                                  className=" w-[24px] h-[22px] md:w-[18.69px] md:h-[17px]  lg:w-[23.36px] lg:h-[21.36px] xl:w-[25.25px] xl:h-[24px] 2xl:w-[35px] 2xl:h-[32px] md:mx-0 mx-auto "
                                />
                                Add Property
                              </button> */}
                              <div
                                className="wow fadeInUp"
                                data-wow-delay=".2s"
                                style={{ visibility: 'visible', animationDelay: '0.2s' }}>
                                <p className=" font-segoe text-left text-[12px] mb-2 md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px] xl:tracking-[1.23px] 2xl:tracking-[1.65px] leading-[22px] md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-semibold text-[#505050]">
                                  In partnership with:
                                </p>
                                <div className="inline-block w-full">
                                  <a
                                    className="mr-[0px] lg:-ml-[15px] pointer-events-none inline-flex items-center justify-center w-[220px] p:[10px] h-[62px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/allianz-bk-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{}}
                                  />
                                  <a
                                    className="hidden mr-[20px] pointer-events-none items-center justify-center p-[0px] py-5 -ml-1 w-[100px] h-[45px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/lch-logo-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '62%' }}
                                  />
                                  <a
                                    className="mt-2 lg:mt-0 mr-[10px] pointer-events-none inline-flex items-center justify-center p-[0px] py-2 w-[160px] h-[60px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/aardvark-logo.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    style={{ backgroundSize: '78%' }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" inline-block items-end justify-end bg-transparent mx-auto -ml-0 -mr-0 -mt-0 md:-mr-0 md:-mt-0 lg:-mt-[15px]">
                              <img
                                src="download/hero-image.png"
                                alt="image"
                                className=" w-full lg:w-[85%] float-right"
                              />
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                    {/* end */}
                    <div className=" xs:absolute md:relative xs:top-0 md:top-auto xs:left-[5.5%] md:xs:left-auto w-[90%] mx-auto md:w-[97.5%] md:h-[100px] lg:h-[120px] 2xl:h-[140px] mt-9 md:-mt-[30px] md:mr-[20px] lg:-mt-[30px] lg:mr-[28px] xl:-mt-[30px] xl:mr-[35px] 2xl:mr-[44px] 2xl:-mt-[30px]  z-20  rounded-[10px] shadow-[0px_10px_30px_rgba(3,78,161,0.16)] ">
                      <FilterDiv />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="w-[100%] md:w-full m-auto ">
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <div className=" flex flex-wrap items-start justify-start">
                <div className="w-full mt-0">
                  <div className="targetDiv">
                    <div className="flex flex-col-reverse items-center justify-center md:justify-between  overflow-hidden border-0 md:flex-row bg-transparent">
                      <div className="hidden md:inline-block w-[90%]  md:-mr-[170px] lg:-mr-[220px] xl:-mr-[260px] 2xl:-mr-[295px] -mt-6 sm:-mt-16 md:-mt-[80px] lg:-mt-[95px] xl:-mt-[105px] 2xl:-mt-[160px] md:max-w-[485px] lg:max-w-[685px] z-30 py-1 md:py-3 xl:py-5 px-0 sm:px-0  xl:p-[0px] sm:text-left">
                        <h4 className="mt-0  mb-2 md:mb-4 xl:mb-6 text-[26px] md:text-[29.37px] lg:text-[36.71px] xl:text-[47px] 2xl:text-[47px] font-bold text-[#034EA1] tracking-[0.78px] md:tracking-[1.24px] xl:tracking-[1.65px] leading-9 sm:leading-[40px] md:leading-[44px]  xl:leading-[70px] 2xl:leading-[70px] text-left">
                          IT’S ABOUT TIME YOU CALLED THE SHOTS
                        </h4>
                        <h2 className=" font-segoe text-left mb-7 md:mb-5 lg:mb-7 xl:mb-8 2xl:mb-14 text-[12px] md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px]  xl:tracking-[1.23px] 2xl:tracking-[1.65px]  leading-[22px]  md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-normal text-[#034EA1]">
                          Take back control of your rental matters
                        </h2>
                        <button
                          onClick={() => router.push('./add-property')}
                          // href="/add-property"
                          className=" cursor-pointer gap-3 tracking-wide inline-flex items-center justify-center rounded-lg bg-[#034EA1] hover:bg-[#00adee] py-[14px] lg:py-[13.85px]  xl:py-[15px] 2xl:py-5 px-8  md:px-5  text-base md:text-xs lg:text-base xl:text-lg 2xl:text-2xl font-normal text-white transition duration-300 ease-in-out hover:shadow-lg">
                          <img
                            src="/download/house-icon.png"
                            alt="image"
                            className=" w-[24px] h-[22px] md:w-[18.69px] md:h-[17px]  lg:w-[23.36px] lg:h-[21.36px] xl:w-[25.25px] xl:h-[24px] 2xl:w-[35px] 2xl:h-[32px] md:mx-0 mx-auto "
                          />
                          Add Property
                        </button>
                      </div>
                      <div className=" inline-block items-end justify-end bg-transparent mx-auto -ml-0 -mr-0 -mt-0 md:-mr-0 md:-mt-0">
                        <img
                          src="download/House.png"
                          alt="image"
                          className=" w-full h-[300px] md:w-full md:h-[496px] lg:w-[784px] lg:h-[595px] xl:w-[950px] xl:h-[680px] 2xl:w-[1175px] 2xl:h-[741px]  "
                        />
                      </div>
                    </div>
                    <div className=" xs:absolute md:relative xs:top-0 md:top-auto xs:left-[5.5%] md:xs:left-auto w-[90%] mx-auto md:w-[97.5%] md:h-[100px] lg:h-[120px] 2xl:h-[140px] mt-9 md:-mt-[60px] md:mr-[20px] lg:-mt-[73px] lg:mr-[28px] xl:-mt-[83px] xl:mr-[35px] 2xl:mr-[44px] 2xl:-mt-[90px]  z-20  rounded-[10px] shadow-[0px_10px_30px_rgba(3,78,161,0.16)] ">
                      <FilterDiv />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </section>
        <div className="hidden absolute md:bottom-0 md:left-1 lg:bottom-20 lg:left-2 xl:bottom-20 xl:left-2 2xl:bottom-10 2xl:left-2">
          <img
            src="/download/Mask Group 10.png"
            alt="no-image"
            className=" hidden md:block md:w-[180px] md:h-[200px]  lg:w-[210px] lg:h-[230px] xl:w-[260px] xl:h-[280px]  2xl:w-[343px] 2xl:h-[361px]"
          />
        </div>
        {session?.user?.id && (
          // <Link passHref href="/conversation">
          <div onMouseLeave={handleMouseLeave}>
            <Link href={'/conversation?isAdmin=true'}>
            <div
              onMouseOver={handleMouseOver}
              id="csoChatMsgBtmnk"
              className=" cursor-pointer mt-2 fixed flex items-center justify-center bg-[#00ADEE] z-40 rounded-full w-[70px] h-[70px] top-[810px] right-[25px]"
              style={{ top: '86%' }}>
              <img src="/download/customer-support.svg" className=" w-[40px] h-[40px] " alt="no-image" />
              <Popper
                id={id1}
                open={open1}
                anchorEl={anchorEl1}
                placement="top"
                sx={{ marginBottom: '8.5rem' }}
                disablePortal={true}
                // className=" mb-[400px]"
              >
                <Paper elevation={3}>
                  <div className=" w-[180px] bg-[#E1E1E1] rounded-[10px] mt-3 h-auto p-3 flex flex-col gap-1.5 items-center justify-center">
                    <h2 className="font-roboto font-medium text-[#111] text-base underline">Customer Support</h2>
                    <IoConstructOutline className=" w-6 h-6" />
                    <p className="font-roboto font-medium text-[#101010] text-base text-center ">
                      Private Chat is Under Constraction!
                    </p>
                  </div>
                  <ArrowWrapper>
                    <Arrow />
                  </ArrowWrapper>
                </Paper>
              </Popper>
            </div>
            </Link>
          </div>
          // </Link>
        )}
      </section>
      {/* partnership start */}
      <section className=" 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5  pt-[300px] md:pt-0 pb-[30px] lg:-mt-[0px] ">
        <div className="m-auto">
          <div className="wow fadeInUp" data-wow-delay=".2s" style={{ visibility: 'visible', animationDelay: '0.2s' }}>
            <div className="flex flex-wrap">
              <div className="w-full px-0 mt-5">
                <p className="hidden max-w-2xl mb-[15px] mt-[20px] font-light text-[#777777] md:text-md lg:text-md dark:text-white">
                  In partnership with:
                </p>
                <div className="mr-auto place-self-center lg:inline-flex w-full inline-flex">
                  <p className="max-w-2xl mt-[10px] mr-[30px] font-segoe text-left text-[12px] mb-2 md:text-[14px] lg:text-[17.35px] xl:text-[23.5px] 2xl:text-[26px] tracking-[0.24px] md:tracking-[0.88px] lg:tracking-[1.10px] xl:tracking-[1.23px] 2xl:tracking-[1.65px] leading-[22px] md:leading-[22.5px] lg:leading-[28px] xl:leading-[31.5px] 2xl:leading-[42px] font-semibold text-[#505050]">
                    In partnership with:
                  </p>
                  <a
                    className="mr-[0px] lg:-ml-[15px] pointer-events-none inline-flex items-center justify-center w-[220px] p:[10px] h-[62px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/allianz-bk-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    style={{}}
                  />
                  <a
                    className="hidden mr-[20px] pointer-events-none items-center justify-center p-[0px] py-5 -ml-1 w-[100px] h-[45px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/lch-logo-new.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    style={{ backgroundSize: '62%' }}
                  />
                  <a
                    className="mt-2 lg:mt-0 mr-[10px] pointer-events-none inline-flex items-center justify-center p-[0px] py-2 w-[160px] h-[60px] bg-no-repeat bg-transparent bg-center text-base font-medium text-center text-white border-0 border-white rounded-lg bg-[url('/download/aardvark-logo.png')] bg-contain focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    style={{ backgroundSize: '78%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Partnership end */}
    </div>
  )
}

export default HmSlider
