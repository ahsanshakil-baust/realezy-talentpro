import React from 'react'
import { useState, useRef } from 'react'
import { Tabs, Button, TabsRef } from 'flowbite-react'
import Image from 'next/image'

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const tabsRef = useRef<TabsRef>(null)

  return (
    <>
      <section className=" w-full mt-[85px] flex flex-col  z-20 bg-[#E4F0FE] ">
        <div className=" w-full 2xl:h-[15.625rem] md:h-[12.5rem] h-[10rem] flex relative  items-center justify-center  bg-[url('/aboutUs/about-us-1.png')] bg-no-repeat bg-center bg-cover">
          <p className="font-roboto font-bold 2xl:text-[6.75rem]/[8.125rem] md:text-[5.4rem]/[6.5rem] text-[3.4rem]/[4.5rem]   2xl:tracking-[2.16px] md:tracking-[1.728rem] text-center uppercase text-[#FFFFFF] opacity-25">
            WHO WE ARE
          </p>
          <p className=" absolute mx-auto font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.5rem]/[2rem] 2xl:tracking-[0.8px] md:tracking-[0.64rem] text-center uppercase text-[#FFFFFF]">
            About us
          </p>
        </div>
        <div className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] 2xl:pt-[3.875rem] md:pt-[3.1rem] pt-[2.1rem] 2xl:pb-[3.75rem] md:pb-[3rem] pb-[2rem] w-full h-full flex justify-center items-center">
          <div className="w-[90%] md:w-full ">
            <div className=" w-full flex flex-col md:flex-row">
              <div className=" mb-4 md:mb-0 w-full md:w-[35%] lg:w-[20.60%] flex flex-col justify-center ">
                <p className="w-full uppercase 2xl:mb-3.5 md:mb-[0.7rem] mb-[0.2rem] text-center md:text-right   2xl:text-[3.525rem]/[3.875rem] md:text-[2.82rem]/[3.1rem] text-[2rem]/[2.3rem] 2xl:tracking-[2.2px] md:tracking-[1.56px] tracking-[0.56px]  text-[#6495CC] font-roboto font-bold ">
                  About
                </p>
                <p className="w-full uppercase text-center md:text-right 2xl:text-[3.525rem]/[3.875rem] md:text-[2.82rem]/[3.1rem] text-[2rem]/[2.3rem] 2xl:tracking-[2.2px] md:tracking-[1.56px] tracking-[0.56px]  text-[#6495CC] font-roboto font-bold ">
                  Real Ezy
                </p>
              </div>
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

      <section className=" w-full  flex justify-center  relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px]  z-20 bg-[#F1F7FF] ">
        <div className="w-[90%] md:w-full ">
          <div className=" w-full flex gap-x-6 justify-between ">
            <div className=" w-[45%] flex flex-col  justify-center   ">
              <div className=" flex items-center">
                <img
                  alt="no-image"
                  src="/aboutUs/hexagon-icon-tc.svg"
                  className="2xl:w-[2.125rem] w-[1.7rem] 2xl:h-[1.875rem] h-[1.5rem]"
                />
                <p className=" 2xl:ml-4 md:ml-[0.8rem] ml-[0.7rem] text-[#00ADEE] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.4rem]/[1.9rem] 2xl:tracking-[0.06rem] md:tracking-[0.048rem] tracking-[0.038rem]    font-roboto font-bold capitalize text-left">
                  Our Values
                </p>
              </div>{' '}
              <br />
              <p className=" text-[#505050] 2xl:text-[1.375rem]/[2.125rem] md:text-[1.1rem]/[1.7rem] text-[1rem]/[1.5rem]  font-segoe font-normal   text-justify ">
                We will set in motion our belief in making real and meaningful changes to the rental marketplace, to
                amplify our value propositions to landlords and tenants, particularly in the areas of convenient
                self-service, protection and a deposit-free environment.
              </p>
              <h1 className=" 2xl:mt-[2rem] md:mt-[1.6rem] mt-[1rem] text-[#505050] 2xl:text-[1.5rem]/[2.125rem] md:text-[1.25rem]/[1.7rem] text-[1rem]/[1.5rem] 2xl:tracking-[0.015rem] md:tracking-[0.012rem] tracking-[0.002rem] font-roboto font-semibold">
                These will be supported by our commitment to:{' '}
              </h1>
              <div className=" flex w-full 2xl:mt-[1.5rem] md:mt-[1.2rem] mt-[0.9rem] ">
                {/* <div className="2xl:border-l-[0.625rem] md:boder-l-[0.5rem] boder-l-[0.4rem] 2xl:h-[10.25rem] md:h-[8.2rem] h-[7.2rem] border-solid border-[#999999] rounded-full 2xl:mr-8 md:mr-[1.6rem] mr-[0.6rem]" /> */}

                <div className="flex flex-col gap-y-2">
                  <div className=" w-full flex gap-4 items-center ">
                    <div className=" w-4 h-4 rounded-full border-[3px] border-[#999999]" />
                    <p className=" lowercase text-[#202020] 2xl:text-[1.375rem]/[2.125rem] md:text-[1.1rem]/[1.7rem] text-[1rem]/[1.5rem] 2xl:tracking-[0.015rem] md:tracking-[0.012rem] tracking-[0.002rem] font-roboto font-normal  ">
                      Embrace and drive.
                    </p>
                  </div>
                  <div className=" w-full flex gap-4 items-center ">
                    <div className=" w-4 h-4 rounded-full border-[3px] border-[#999999]" />
                    <p className=" lowercase  text-[#202020] 2xl:text-[1.375rem]/[2.125rem] md:text-[1.1rem]/[1.7rem] text-[1rem]/[1.5rem] 2xl:tracking-[0.015rem] md:tracking-[0.012rem] tracking-[0.002rem] font-roboto font-normal  ">
                      Be sincere and act with integrity and honesty.
                    </p>
                  </div>
                  <div className=" w-full flex gap-4 items-center ">
                    <div className=" w-4 h-4 rounded-full border-[3px] border-[#999999]" />
                    <p className="  lowercase text-[#202020] 2xl:text-[1.375rem]/[2.125rem] md:text-[1.1rem]/[1.7rem] text-[1rem]/[1.5rem] 2xl:tracking-[0.015rem] md:tracking-[0.012rem] tracking-[0.002rem] font-roboto font-normal  ">
                      Relationships matter. Be respectful.
                    </p>
                  </div>
                  <div className=" w-full flex gap-4 items-center ">
                    <div className=" w-4 h-4 rounded-full border-[3px] border-[#999999]" />
                    <p className="  lowercase text-[#202020] 2xl:text-[1.375rem]/[2.125rem] md:text-[1.1rem]/[1.7rem] text-[1rem]/[1.5rem] 2xl:tracking-[0.015rem] md:tracking-[0.012rem] tracking-[0.002rem] font-roboto font-normal  ">
                      Embody openness, fairness, diversity & belonging.
                    </p>
                  </div>
                  <div className=" w-full flex gap-4 items-center ">
                    <div className=" w-4 h-4 rounded-full border-[3px] border-[#999999]" />
                    <p className="  lowercase text-[#202020] 2xl:text-[1.375rem]/[2.125rem] md:text-[1.1rem]/[1.7rem] text-[1rem]/[1.5rem] 2xl:tracking-[0.015rem] md:tracking-[0.012rem] tracking-[0.002rem] font-roboto font-normal  ">
                      Act responsibly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[55%] flex  justify-end  ">
              <img
                alt="no-image"
                src="/aboutUs/about-us-2.png"
                className=" 2xl:w-[54.8125rem] md:w-[43.85rem] w-[35.5rem] 2xl:h-[48rem] md:h-[38.4rem] h-[24rem]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className=" w-full flex flex-col  z-20 bg-[#E4F0FE] ">
        {/* <div className=" w-full h-auto relative  bg-[url('/aboutUs/about-us-3.png')] bg-no-repeat bg-center bg-cover">
          <div className=" w-full 2xl:px-[5.75rem] md:px-[4.6rem] px-[3.6rem] 2xl:pt-[4.0625rem] md:pt-[3.25rem] pt-[2.25rem] 2xl:pb-[5.875rem] md:pb-[4.7rem] pb-[3.7rem] ">
            <div className=" w-full flex flex-col justify-center gap-3 ">
              <p className="font-roboto font-normal 2xl:text-[1.875rem]/[2.3125rem] md:text-[1.5rem]/[1.85rem] text-[1rem]/[1.35rem]  2xl:tracking-[0.0375rem] md:tracking-[0.03rem] tracking-[0.02rem] text-center uppercase text-[#FFFFFF]">
                It's About Time
              </p>
              <p className=" font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.5rem]/[1.9rem] 2xl:tracking-[0.05rem] md:tracking-[0.04rem] tracking-[0.03rem] text-center uppercase text-[#FFFFFF]">
                You Discovered The REALEZY App
              </p>
            </div>
            <div className=" w-full 2xl:mt-[4.875rem] md:mt-[3.9rem] mt-[3rem] grid 2xl:grid-cols-3 md:grid-cols-3 grid-cols-2 2xl:gap-x-7 md:gap-x-[1.4rem] gap-4 2xl:gap-y-9 md:gap-y-[1.8rem] gap-y-5 ">
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#EEA840CC] flex items-center justify-center rounded-l-[10px]">
                  <img
                    alt='no-image'
                    src="/aboutUs/discover-icons/img1.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className=" w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Control
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Self Service And Accessibility Round The Clock, In Your Own Time
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#798B42] flex items-center justify-center rounded-l-[10px]">
                  <img
                    alt='no-image'
                    src="/aboutUs/discover-icons/img2.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Convenience
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Physical Meeting Between Landlord And Tenant Not Essential
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#234E70] flex items-center justify-center rounded-l-[10px]">
                  <img
                    alt='no-image'
                    src="/aboutUs/discover-icons/img3.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Assurance
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Comprehensive Insurance Protection Covers Landlords For Rental Income Loss, Repairs And Legal Fees
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#793F90] flex items-center justify-center rounded-l-[10px]">
                  <img
                    alt='no-image'
                    src="/aboutUs/discover-icons/img4.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Uncomplicated
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Free Of Registration And Listing Fees, As Well As Intermediary Fees And Deposit{' '}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#00ADEE] flex items-center justify-center rounded-l-[10px]">
                  <img
                    alt='no-image'
                    src="/aboutUs/discover-icons/img5.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Verification
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Landlords Must Produce Proof Of Ownership Of Property Prior To Listing The Property{' '}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#DC286E] flex items-center justify-center rounded-l-[10px]">
                  <img
                    alt='no-image'
                    src="/aboutUs/discover-icons/img6.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Qualification
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Renters Are Authenticated And Assessed For Credit Worthiness Before Becoming Tenants
                  </p>
                </div>
              </div>
              <div className="flex col-start-2">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#EEA840] flex items-center justify-center rounded-l-[10px]">
                  <img
                    alt='no-image'
                    src="/aboutUs/discover-icons/img6.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Peace Of Mind
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Support Before & During The Rental Process, & Concierge Service During Rental Period
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className=" w-full h-auto relative  bg-[url('/aboutUs/about-us-3.png')] bg-no-repeat bg-center bg-cover">
          <div className=" w-full 2xl:px-[5.75rem] md:px-[4.6rem] px-[3.6rem] 2xl:pt-[4.0625rem] md:pt-[3.25rem] pt-[2.25rem] 2xl:pb-[5.875rem] md:pb-[4.7rem] pb-[3.7rem] ">
            <div className=" w-full flex flex-col justify-center gap-3 ">
              <p className="font-roboto font-normal 2xl:text-[1.875rem]/[2.3125rem] md:text-[1.5rem]/[1.85rem] text-[1rem]/[1.35rem]  2xl:tracking-[0.0375rem] md:tracking-[0.03rem] tracking-[0.02rem] text-center uppercase text-[#FFFFFF]">
                It's About Time
              </p>
              <p className=" font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.5rem]/[1.9rem] 2xl:tracking-[0.05rem] md:tracking-[0.04rem] tracking-[0.03rem] text-center text-[#FFFFFF]">
                You embarked on the RealEzy journey
              </p>
            </div>
            <div className=" w-full 2xl:mt-[4.875rem] md:mt-[3.9rem] mt-[3rem] grid 2xl:grid-cols-3 md:grid-cols-3 grid-cols-3 2xl:gap-x-7 md:gap-x-[1.4rem] gap-4 2xl:gap-y-9 md:gap-y-[1.8rem] gap-y-5 ">
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#EEA840CC] flex items-center justify-center rounded-l-[10px]">
                  <img
                    src="/home/control-convenience-icon.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className=" w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Control & Convenience
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Self service and round the clock accessibility, all in your own time and at your fingertips.
                    Physical meeting between landlord and tenant not compulsory.
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#798B42] flex items-center justify-center rounded-l-[10px]">
                  <img
                    src="/home/protection-icon.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Protection
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Comprehensive insurance protection covers landlords for rental income loss, repairs and legal fees.
                  </p>
                </div>
              </div>

              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#793F90] flex items-center justify-center rounded-l-[10px]">
                  <img
                    src="/home/uncompleted-icon.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Uncomplicated
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    No registration and listing fees; intermediary fees and security deposits are negated.
                  </p>
                </div>
              </div>
              <div className="flex col-start-1 relative md:left-[50%] left-[50%]">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#00ADEE] flex items-center justify-center rounded-l-[10px]">
                  <img
                    src="/home/trustworthy-icon.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Trustworthy
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Landlords must produce proof of property ownership prior to listing the property, and tenants are
                    authenticated & assessed for credit worthiness before transacting.
                  </p>
                </div>
              </div>
              <div className="flex col-start-3 relative md:right-[50%] right-[50%]">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-[4rem] bg-[#234E70] flex items-center justify-center rounded-l-[10px]">
                  <img
                    src="/home/assurance-icon.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-full  opacity-50 rounded-r-[10px] " />
                  <p className=" text-[#FFFFFF] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[0.8rem]/[0.95rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Assurance
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.0625rem]/[1.625rem] md:text-[0.85rem]/[1.3rem] text-[0.35rem]/[0.8rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Transact securely and legally. Customer support before & during the rental process; & concierge
                    service during rental period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" w-full  xs:hidden flex justify-center  2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] 2xl:pt-[4.6875rem] md:pt-[3.75rem] pt-[2.75rem] 2xl:pb-[6.25rem] md:pb-[5rem] pb-[4rem] z-20 bg-gradient-to-l from-[#F8FDFF] from-100% to-[#E4F0FF] to-0% ">
        <div className=" w-[90%] md:w-full relative">
          <div className=" absolute right-0">
            <div className="w-full  flex justify-end  ">
              <Button.Group className="  ">
                <button
                  color=""
                  className={
                    activeTab
                      ? ' bg-[#EBF4FE] cursor-pointer text-[#034EA1] border-2 border-solid border-[#EBF4FE]  2xl:text-2xl/[2xl] md:text-[1.2rem]/[1.2rem] text-[0.9rem]/[0.9rem] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal 2xl:px-10 md:px-8 px-6 2xl:py-4 md:py-[0.8rem] py-[0.6rem]  rounded-l-[10px] 2xl:-mr-2 md:-mr-[0.4rem] -mr-[0.3rem] capitalize'
                      : ' bg-[#034ea1] cursor-pointer text-[#FFFFFF] 2xl:text-2xl/[2xl] md:text-[1.2rem]/[1.2rem] text-[0.9rem]/[0.9rem] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal 2xl:px-10 md:px-8 px-6 2xl:py-4 md:py-[0.8rem] py-[0.6rem]  rounded-[10px] capitalize z-10'
                  }
                  onClick={() => tabsRef.current?.setActiveTab(0)}>
                  Landlord
                </button>
                <button
                  color=""
                  className={
                    activeTab
                      ? ' bg-[#00ADEE] cursor-pointer  text-[#FFFFFF] 2xl:text-2xl/[2xl] md:text-[1.2rem]/[1.2rem] text-[.9rem]/[0.9rem] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal 2xl:px-10 md:px-8 px-6 2xl:py-4 md:py-[0.8rem] py-[0.6rem]  rounded-[10px] capitalize'
                      : ' bg-[#EBF4FE] cursor-pointer  text-[#00ADEE] border-2 border-solid border-[#EBF4FE] 2xl:text-2xl/[2xl] md:text-[1.2rem]/[1.2rem] text-[0.9rem]/[0.9rem] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal 2xl:px-10 md:px-8 px-6 2xl:py-4 md:py-[0.8rem] py-[0.6rem]  rounded-r-[10px] 2xl:-ml-2 md:-ml-[0.4rem] -ml-[0.3rem] z-0 capitalize'
                  }
                  onClick={() => tabsRef.current?.setActiveTab(1)}>
                  Tenant
                </button>
              </Button.Group>
            </div>
          </div>

          <div className="w-full  ">
            <div className="prod-tab-content">
              <Tabs.Group
                aria-label="hm-product-tab"
                style="default"
                ref={tabsRef}
                onActiveTabChange={tab => setActiveTab(tab)}
                className="w-full !p-0 accordion-tab-group ">
                <Tabs.Item active title="" className=" !p-0">
                  <div className="w-full grid grid-cols-2  ">
                    <div className=" w-full flex flex-col z-10 ">
                      <div className=" flex items-center">
                        <img alt="no-image" src="/aboutUs/hexagon-icon-lc.svg" />
                        <p className=" 2xl:ml-4 md:ml-[0.8rem] ml-[0.6rem] text-[#034ea1] 2xl:text-[3rem]/[3.625rem] md:text-[2.4rem]/[2.9rem] 2xl:tracking-[0.06rem] md:tracking-[0.048rem] tracking-[0.036rem] font-roboto font-bold capitalize text-left">
                          Getting Started
                        </p>
                      </div>
                      <p className=" 2xl:mt-3 md:mt-[0.6rem] mt-[0.4rem] capitalize text-[#999999] font-normal font-roboto 2xl:text-[1.375rem]/[2rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                        Here's A Step-By-Step Guide On Using The App To Successfully List Your Property And Getting It
                        Rented.
                      </p>

                      <div className=" 2xl:mt-8 md:mt-[1.6rem] mt-[1.2rem]">
                        <div className="flex flex-col">
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-1.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#798B42] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Download Realezy App And Register.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-2.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="   text-[#793F90] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              List Your Property For Free.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img src="/aboutUs/tab-icons/step-3.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="   text-[#DC286E] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Review And Chat With Interested Tenants.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-4.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#234E70] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Confirm Viewing Schedule.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img src="/aboutUs/tab-icons/step-5.svg" className="slide-up-anime-l" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#F67E3B] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Discuss Rental Terms.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-6.svg" className="slide-up-anime-l" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#798B42] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Accept Booking Offer.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-7.svg" className="slide-up-anime-l" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#DC286E] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Pay Insurance Premium And Service Fee.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-8.svg" className="slide-up-anime-l" />
                              <hr className=" 2xl:h-8 md:h-[1.6rem] h-[1.2rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className=" 2xl:-mt-8 md:-mt-[1.6rem] -mt-[1.2rem] text-[#793F90] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Prepare, Send And Sign E-Tenancy Agreement, <br /> Inventory List & Condition Report.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-9.svg" className="slide-up-anime-l" />
                              {/* <hr className=" h-4 border-l-[3px] border-solid border-[#034EA1]" /> */}
                            </div>
                            <p className=" -mt-0 text-[#F67E3B] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Handover Keys To Tenant.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="  2xl:mt-[4.75rem] md:mt-[3.8rem] mt-[3rem] z-0">
                      <img
                        alt="no-image"
                        src="/aboutUs/about-us-phone-landlord.png"
                        className="2xl:min-w-[68.1875rem] md:min-w-[54.55rem] min-w-[48rem]  2xl:-ml-[8.375rem] md:-ml-[6.7rem] -ml-[5.5rem] bg-transparent 2xl:h-[47.75rem] md:h-[42.75rem] h-[37.75rem] slide-anime "
                      />
                    </div>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="" className=" ">
                  <div className="w-full grid grid-cols-2  ">
                    <div className=" w-full flex flex-col z-10  ">
                      <div className=" flex items-center">
                        <img alt="no-image" src="/aboutUs/hexagon-icon-tc.svg" />
                        <p className=" 2xl:ml-4 md:ml-[0.8rem] ml-[0.6rem] text-[#00ADEE] 2xl:text-[3rem]/[3.625rem] md:text-[2.4rem]/[2.9rem] 2xl:tracking-[0.06rem] md:tracking-[0.048rem] tracking-[0.036rem] font-roboto font-bold capitalize text-left">
                          How To Start
                        </p>
                      </div>
                      <p className=" 2xl:mt-3 md:mt-[0.6rem] mt-[0.4rem] capitalize text-[#999999] font-normal font-roboto 2xl:text-[1.375rem]/[2rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                        Here's A Step-By-Step Guide On Using The App To Successfully List Your Property And Getting It
                        Rented.
                      </p>

                      <div className=" 2xl:mt-8 md:mt-[1.6rem] mt-[1.2rem]">
                        <div className="flex flex-col">
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-1.svg" className="slide-up-anime-t" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#798B42] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Download Realezy App And Register.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-t-2.svg" className="slide-up-anime-t" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className=" anime-text  text-[#793F90] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              View And Select Your Desired Listed Property.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-3.svg" className="slide-up-anime-t" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className=" anime-text text-[#DC286E] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Connect With Landlord And Start A Chat.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-4.svg" className=" slide-up-anime-t" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#234E70] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Schedule A Viewing.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className="  flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-5.svg" className=" slide-up-anime-t" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#F67E3B] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Discuss Rental Terms.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-6.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#798B42] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Confirm Interest & Pay "Reservation Fee".
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-t-7.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#DC286E] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Proceed With Realezy "No Deposit Eligibility Check".
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-8.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#793F90] -mt-3 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Prepare, Sign And Send Documents.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-t-9.svg" />
                              <hr className=" 2xl:h-3 md:h-[0.6rem] h-[0.5rem] border-l-[3px] border-solid border-[#034EA1]" />
                            </div>
                            <p className="  text-[#234E70] 2xl:-mt-3 md:-mt-[0.6rem] -mt-[0.5rem] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Pay First Month Advance Rental And Stamp Duty.
                            </p>
                          </div>
                          {/*  */}
                          <div className="flex items-center 2xl:gap-x-6 md:gap-x-[1.2rem] gap-x-[0.9rem]">
                            <div className=" flex flex-col items-center">
                              <img alt="no-image" src="/aboutUs/tab-icons/step-9.svg" />
                              {/* <hr className=" h-4 border-l-[3px] border-solid border-[#034EA1]" /> */}
                            </div>
                            <p className=" -mt-0 text-[#F67E3B] 2xl:text-[1.25rem]/[1.5625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[1rem] font-roboto font-normal 2xl:tracking-[0.025rem] md:tracking-[0.02rem] tracking-[0.0175rem]  capitalize anime-text-l">
                              Collect Your Key And Enjoy Your Stay.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" 2xl:mt-[4.75rem] md:mt-[3.8rem] mt-[3rem] z-0">
                      <img
                        alt="no-image"
                        src="/aboutUs/about-us-phone-tenant.png"
                        className="2xl:min-w-[68.1875rem] md:min-w-[54.55rem] min-w-[48rem]  2xl:-ml-[8.375rem] md:-ml-[6.7rem] -ml-[5.5rem] bg-transparent 2xl:h-[47.75rem] md:h-[42.75rem] h-[37.75rem] slide-anime "
                      />
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
        </div>
      </section>

      <section className=" w-full   flex justify-center  2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] 2xl:pt-[4.6875rem] md:pt-[3.75rem] pt-[2.75rem] 2xl:pb-[6.25rem] md:pb-[5rem] pb-[4rem] z-20 bg-[#f1f7ff] ">
        <div className=" w-[90%] md:w-full relative">
          <div className=" flex items-center 2xl:mb-14 mb-11">
            <img
              alt="no-image"
              src="/aboutUs/hexagon-icon-tc.svg"
              className="2xl:w-[2.125rem] w-[1.7rem] 2xl:h-[1.875rem] h-[1.5rem]"
            />
            <p className=" 2xl:ml-4 md:ml-[0.8rem] ml-[0.7rem] text-[#00ADEE] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.4rem]/[1.9rem] 2xl:tracking-[0.06rem] md:tracking-[0.048rem] tracking-[0.038rem]    font-roboto font-bold capitalize text-left">
              Landlord & Tenant Journeys
            </p>
          </div>
          <Image src="/aboutUs/roadmap-tt-ll.png" alt="no-image" width="1640" height="694" />
        </div>
      </section>
    </>
  )
}

export default AboutUs
