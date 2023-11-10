import React from 'react'
import { useState, useRef } from 'react'
import { Tabs, Button, TabsRef } from 'flowbite-react'
import Image from 'next/image'

const SpotlightDetails = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const tabsRef = useRef<TabsRef>(null)

  return (
    <>
      <section className=" w-full mt-[85px] flex flex-col  z-20 bg-[#E4F0FE] ">
        <div className=" w-full 2xl:h-[15.625rem] md:h-[12.5rem] h-[10rem] flex relative  items-center justify-center  bg-[url('/aboutUs/about-us-1.png')] bg-no-repeat bg-center bg-cover">
          <p className="font-roboto font-bold 2xl:text-[6.75rem]/[8.125rem] md:text-[5.4rem]/[6.5rem] text-[3.4rem]/[4.5rem]   2xl:tracking-[2.16px] md:tracking-[1.728rem] text-center uppercase text-[#FFFFFF] opacity-25">
            Spotlight details
          </p>
          <p className=" absolute mx-auto font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.5rem]/[2rem] 2xl:tracking-[0.8px] md:tracking-[0.64rem] text-center uppercase text-[#FFFFFF]">
            Spotlight details
          </p>
        </div>
        <div className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] 2xl:pt-[3.875rem] md:pt-[3.1rem] pt-[2.1rem] 2xl:pb-[3.75rem] md:pb-[3rem] pb-[2rem] w-full h-full flex justify-center items-center">
          <div className="w-[90%] md:w-full ">
            <div className=" w-full flex flex-col md:flex-row">
              
              <div className="  2xl:ml-[3rem] md:ml-[2.4rem] ml-[1.6rem] 2xl:mr-[4.0625rem] md:mr-[3.25rem] mr-[2rem]  2xl:border-l-[0.25rem] md:border-l-[0.2rem] border-l-[0.1rem] border-solid border-[#d4e8ff]" />
              <div className=" w-full md:w-[65%] lg:w-[79.40%] h-full flex flex-col gap">
                <p className=" text-[#202020] 2xl:text-[1.5rem]/[2.125rem] md:text-[1.2rem]/[1.7rem] text-[1rem]/[1.5rem]  font-segoe font-normal 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem]  text-justify ">
                  <span className="font-bold">Real Ezy Pte Ltd </span> is a service innovator, riding on digital
                  advancements to reshape and set a new standard for Singapore's real estate transactions.
                </p>{' '}
                <br />
                <p className=" text-[#202020] 2xl:text-[1.5rem]/[2.125rem] md:text-[1.2rem]/[1.7rem] text-[1rem]/[1.5rem]  font-segoe font-normal 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem]  text-justify ">
                  The service fills the gap in the market during a time when P2P business models are thriving and the
                  economics of renting is ready for higher levels of efficiency and empowerment.
                </p>{' '}
                <br />
                <p className=" text-[#202020] 2xl:text-[1.5rem]/[2.125rem] md:text-[1.2rem]/[1.7rem] text-[1rem]/[1.5rem]  font-segoe font-normal 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem]  text-justify ">
                  With the rising number of scams, our self-service platform allows transactions to be carried out
                  securely and legally. Landlords are protected with a rental protection and household insurance plan
                  called Allianz Rental Protect and tenants enjoy the *deposit-free experience. (*eligibility
                  requirements apply)
                </p>{' '}
                <br />
                <p className=" text-[#202020] 2xl:text-[1.5rem]/[2.125rem] md:text-[1.2rem]/[1.7rem] text-[1rem]/[1.5rem]  font-segoe font-normal 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem]  text-justify ">
                  We are on a mission to reduce the anxiety of landlords and tenants by providing a seamless, end-to-end
                  solutions, that are safe, legal and game-changing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

         
    </>
  )
}

export default SpotlightDetails
