import React from 'react'
import { useState, useRef } from 'react'
import { Tabs, Button, TabsRef } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const Spotlight = () => {
  // const [activeTab, setActiveTab] = useState<number>(0)
  // const tabsRef = useRef<TabsRef>(null)

  return (
    <>
      <section className=" w-full mt-[85px] flex flex-col  z-20 bg-[#E4F0FE] ">
        <div className=" w-full 2xl:h-[15.625rem] md:h-[12.5rem] h-[10rem] flex relative  items-center justify-center  bg-[url('/download/spotlight-bg.png')] bg-no-repeat bg-center bg-cover">
          <p className="hidden font-roboto font-bold 2xl:text-[6.75rem]/[8.125rem] md:text-[5.4rem]/[6.5rem] text-[3.4rem]/[4.5rem]   2xl:tracking-[2.16px] md:tracking-[1.728rem] text-center uppercase text-[#FFFFFF] opacity-25">
            Spotlight
          </p>
          <p className=" absolute mx-auto font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.5rem]/[2rem] 2xl:tracking-[0.8px] md:tracking-[0.64rem] text-center uppercase text-[#FFFFFF]">
            In The Spotlight
          </p>
        </div>
        <div className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] 2xl:pt-[3.875rem] md:pt-[3.1rem] pt-[2.1rem] 2xl:pb-[3.75rem] md:pb-[3rem] pb-[2rem] w-full flex justify-center h-[500px]">
          <div className="w-[90%] md:w-full ">
            <div className=" w-full flex flex-col md:flex-row">
              <div className=" mb-4 md:mb-0 w-full md:w-[35%] lg:w-[20.60%] flex flex-col justify-center ">
                <p className="w-full uppercase 2xl:mb-3.5 md:mb-[0.7rem] mb-[0.2rem] text-center md:text-right  2xl:text-[1.5rem] md:text-[1.5rem] text-[1.5rem] 2xl:tracking-[2.2px] md:tracking-[1.56px] tracking-[0.56px]  text-[#6495CC] font-roboto font-bold ">
                  News
                </p>
                <p className="w-full uppercase text-center md:text-right 2xl:text-[1.5rem] md:text-[1.5rem] text-[1.5rem] 2xl:tracking-[2.2px] md:tracking-[1.56px] tracking-[0.56px]  text-[#6495CC] font-roboto font-bold leading-none">
                  August 14, 2023
                </p>
              </div>
              <div className="  2xl:ml-[3rem] md:ml-[2.4rem] ml-[1.6rem] 2xl:mr-[4.0625rem] md:mr-[3.25rem] mr-[2rem]  2xl:border-l-[0.25rem] md:border-l-[0.2rem] border-l-[0.1rem] border-solid border-[#d4e8ff]" />
              <div className=" w-full relative md:w-[65%] lg:w-[79.40%] h-full flex flex-col gap">
                <Link href="/spotlightDetails">
                  <p className=" cursor-pointer text-[#202020] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.4rem]/[1.9rem] font-segoe font-normal 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem]  text-justify ">
                    <span className="font-bold">Gutzy Asia: </span> RealEzy introduces Groundbreaking Peer-2-Peer tech
                    platform, revolutionizing residential rentals
                  </p>
                </Link>
                <Link href="/spotlightDetails">
                  <BsArrowRight className="cursor-pointer absolute right-0 bottom-0 2xl:w-[2.5rem] md:w-[2rem] h-auto text-[#034EA1]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Spotlight
