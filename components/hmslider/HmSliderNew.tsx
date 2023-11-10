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

const HmSliderNew = () => {
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
    autoplaySpeed: 3000,
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
    <div className="w-full h-full z-0 ">
      <section className=" bg-[#FCFDFF] relative flex flex-col items-center mt-[85px]">
        <div className="absolute z-10 left-0 top-0">
          <img
            src="/download/hexagon_approved.png"
            alt="image"
            className="2xl:w-[48.4375rem] w-[38.75rem] 2xl:h-[40.125rem] h-[32.1rem]"
          />
        </div>
        <div className="bg-transparent z-0 md:z-40 2xl:pl-[140px] xl:pl-[105px] lg:pl-[93.33px] md:pl-[74.67px] 2xl:pr-[66px] xl:pr-[49.5px] lg:pr-[44.005px] md:pr-[35.244px] w-full h-full flex flex-col items-center  pt-[0px] md:pt-[0px] lg:pt-[0px] bg-0">
          <div className="w-full m-auto ">
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <div className=" w-full flex flex-wrap items-start justify-start">
                {/* hero start */}
                <div className="w-full z-20 2xl:h-[41.125rem] h-[32.9rem] relative 2xl:mt-[1.625rem] mt-[1.3rem]  flex ">
                  <div className=" w-full h-full flex flex-col justify-between 2xl:pt-[7rem] pt-[5.6rem] 2xl:pb-[2.825rem] pb-[2.3rem] z-10">
                    <div>
                      <Slider {...topSliderSettings} className=" hmslider-slick">
                        {/* Slider 1 */}
                        <div className=" pb-8">
                          <h1 className=" font-roboto font-bold text-[#034EA1] 2xl:text-[4rem]/[5rem] text-[3.2rem]/[4rem] capitalize 2xl:tracking-[2.4px] tracking-[1.92px]">
                            IT'S ABOUT TIME
                          </h1>
                          <h2 className=" 2xl:mt-[1.5rem] mt-[1.2rem] font-roboto font-normal text-[#505050] 2xl:text-[2rem]/[2.875rem] text-[1.6rem]/[2.3rem] 2xl:tracking-[0.64px] tracking-[0.512px]">
                            Join Singapore’s only self-service, peer-to-peer, <br />
                            residential rental platform.
                          </h2>
                        </div>

                        {/* Slider 2 */}
                        <div>
                          <h1 className=" font-roboto font-bold text-[#034EA1] 2xl:text-[4rem]/[5rem] text-[3.2rem]/[4rem] capitalize 2xl:tracking-[2.4px] tracking-[1.92px]">
                            IT'S ABOUT TIME
                          </h1>
                          <h2 className=" 2xl:mt-[1.5rem] mt-[1.2rem] font-roboto font-normal text-[#505050] 2xl:text-[2rem]/[2.875rem] text-[1.6rem]/[2.3rem] 2xl:tracking-[0.64px] tracking-[0.512px]">
                            landlords enjoyed peace of mind with our <br />
                            household and rental protection insurance plan.
                          </h2>
                        </div>

                        {/* Slider 3 */}
                        <div>
                          <h1 className=" font-roboto font-bold text-[#034EA1] 2xl:text-[4rem]/[5rem] text-[3.2rem]/[4rem] capitalize 2xl:tracking-[2.4px] tracking-[1.92px] ">
                            IT'S ABOUT TIME
                          </h1>
                          <h2 className=" 2xl:mt-[1.5rem] mt-[1.2rem] font-roboto font-normal text-[#505050] 2xl:text-[2rem]/[2.875rem] text-[1.6rem]/[2.3rem] 2xl:tracking-[0.64px] tracking-[0.512px]">
                            tenants benefitted from our *Deposit-Free Scheme. <br />
                            <i className="font-roboto font-normal text-[#505050] 2xl:text-[2rem]/[2.875rem] text-[1.6rem]/[2.3rem] 2xl:tracking-[0.64px] tracking-[0.512px]">
                              *eligibility requirements apply
                            </i>
                          </h2>
                        </div>

                        {/* Slider 4 */}
                        <div>
                          <h1 className=" font-roboto font-bold text-[#034EA1] 2xl:text-[3.75rem]/[4.875rem] text-[3rem]/[3.9rem] capitalize 2xl:tracking-[2.4px] tracking-[1.92px]">
                            IT'S ABOUT TIME
                          </h1>
                          <h1 className="  mt-1 font-roboto font-bold text-[#034EA1] 2xl:text-[3.75rem]/[4.875rem] text-[3rem]/[3.9rem] capitalize 2xl:tracking-[2.4px] tracking-[1.92px]">
                            YOU CALLED THE SHOTS
                          </h1>
                          <h2 className="2xl:mt-[2.375rem] mt-[2rem] capitalize font-roboto font-bold text-[#00ADEE] 2xl:text-[3rem]/[3.5rem] text-[2.4rem]/[3rem] 2xl:tracking-[0.64px] tracking-[0.512px]">
                            Rent Smart. Rent Ezy. {/* Tenants enjoy the Zero Deposit Scheme by pre-qualification */}
                          </h2>
                        </div>
                      </Slider>
                    </div>
                    <div
                      className="wow fadeInUp"
                      data-wow-delay=".2s"
                      style={{ visibility: 'visible', animationDelay: '0.2s' }}>
                      <p className=" font-roboto font-medium text-[#505050] 2xl:text-[1.625rem]/[1.9375rem] text-[1.3rem]/[1.55rem] 2xl:mb-4 mb-[0.8rem]">
                        In partnership with:
                      </p>
                      <div className="flex  w-full 2xl:gap-[3.625rem] gap-[2.9rem]">
                        <img
                          className="   2xl:w-[17.25rem] w-[13.8rem]  h-auto   "
                          src="/download/partnership/allianz.png"
                          alt="no-image"
                        />

                        <img
                          className="   2xl:w-[11.0625rem] w-[8.85rem] h-auto"
                          src="/download/partnership/aardvark.png"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 z-0 ">
                    <div className=" w-full flex justify-end">
                      <img
                        src="download/heroimage.svg"
                        alt="image"
                        className="2xl:w-[61.25rem] xl:w-[49rem] w-[38rem]  2xl:h-[41.125rem] h-[32.9rem] "
                      />
                    </div>
                  </div>
                </div>
                {/* hero end */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex 2xl:pl-[140px] xl:pl-[105px] lg:pl-[93.33px] md:pl-[74.67px] 2xl:pr-[230px] xl:pr-[172.5px] lg:pr-[153.525px] md:pr-[122.82px]  pt-2.5 pb-[51px] z-20 overflow-hidden ">
          <FilterDiv />
        </div>
        {session?.user?.id && (
          <div onMouseLeave={handleMouseLeave}>
            {/* <Link href={'/conversation?isAdmin=true'}> */}
            <div
              onMouseOver={handleMouseOver}
              id="csoChatMsgBtm"
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
            {/* </Link> */}
          </div>
          // </Link>
        )}
      </section>
      {/* partnership start */}
      <section className=" bg-gradient-to-r from-[#F8FAFD] from-0% to-[#FFFFFF] to-100% 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center py-[1.625rem] ">
        <div className="w-full flex items-center justify-center">
          <p className=" font-roboto font-semibold text-[#505050] 2xl:text-[1.75rem]/[2.625rem] text-[1.4rem]/[2.1rem] 2xl:tracking-[0.56px] tracking-[0.448px]">
            In partnership with
          </p>
          <div className="flex 2xl:ml-[3rem] ml-[2.4rem] 2xl:gap-[3.625rem] gap-[2.9rem]">
            <img
              className="   2xl:w-[17.25rem] w-[13.8rem]  h-auto   "
              src="/download/partnership/allianz.png"
              alt="no-image"
            />

            <img className="   2xl:w-[11.0625rem] w-[8.85rem]  h-auto   " src="/download/partnership/aardvark.png" />
          </div>
        </div>
      </section>
      {/* Partnership end */}
    </div>
  )
}

export default HmSliderNew
