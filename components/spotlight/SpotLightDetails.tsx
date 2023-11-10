import React from 'react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'
import { Button } from '@mui/material'

const SpotlightDetails = () => {
  // const [activeTab, setActiveTab] = useState<number>(0)
  // const tabsRef = useRef<TabsRef>(null)

  return (
    <>
      <section className=" w-full mt-[85px] flex flex-col  z-20 bg-[#E4F0FE] ">
        <div className=" w-full 2xl:h-[15.625rem] md:h-[12.5rem] h-[10rem] flex relative  items-center justify-center  bg-[url('/download/spotlight-bg.png')] bg-no-repeat bg-center bg-cover">
          <p className="font-roboto font-bold 2xl:text-[6.75rem]/[8.125rem] md:text-[5.4rem]/[6.5rem] text-[3.4rem]/[4.5rem]   2xl:tracking-[2.16px] md:tracking-[1.728rem] text-center uppercase text-[#FFFFFF] opacity-25">
            Spotlight
          </p>
          <p className=" absolute mx-auto font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.5rem]/[2rem] 2xl:tracking-[0.8px] md:tracking-[0.64rem] text-center uppercase text-[#FFFFFF]">
            In The Spotlight
          </p>
        </div>
        <div className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] 2xl:pt-[3.875rem] md:pt-[3.1rem] pt-[2.1rem] 2xl:pb-[3.75rem] md:pb-[3rem] pb-[2rem] w-full flex justify-center overflow-auto">
          <div className="w-[90%] md:w-full ">
            <div className=" w-full flex justify-between gap-1 mb-6">
              <p className="font-roboto font-normal text-[#505050] 2xl:text-17 text-17 ">
                <b>Written by:</b> Staff Writer in Business Singapore
              </p>
              <p className="font-roboto font-normal text-[#505050] 2xl:text-17 text-15 ">
                <b>Date: </b> August 14, 2023
              </p>
            </div>
            <div className=" w-full flex flex-col items-center gap-8">
              <p className="font-roboto font-bold text-[#000000] 2xl:text-[4.375rem]/[5rem] text-[3.5rem]/[4rem] text-left w-full ">
                RealEzy introduces Groundbreaking Peer-2-Peer tech platform, revolutionizing residential rentals
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                SINGAPORE: In an unprecedented move in the property rental market, Singapore-based startup RealEzy Pte
                Ltd has unveiled a Peer-2-Peer (P2P) tech platform to directly link tenants with landlords for renting
                out rooms and entire units.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                The innovative platform eliminates the need for security deposits from tenants and bypasses property
                agents, making rental transactions smoother and more cost-effective.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                Originating in 2021, RealEzy has established itself as a holistic digital solution, facilitating an
                array of services from finding and verifying potential renters and landlords to the actual signing of
                tenancy agreements, all in a secure online environment.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                The unique selling point of RealEzy lies in its innovative approach towards rentals. By forgoing the
                traditional security deposits, tenants can achieve savings of up to 80%.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                Likewise, landlords, in the absence of agency commissions, can save up to 50% on costs, supplemented by
                a specially tailored insurance plan from Allianz.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                Moreover, RealEzy’s Managed Services is set to play an instrumental role in assisting both parties
                during tenancy, especially concerning household maintenance issues, albeit for a nominal service fee.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                Since its soft launch in May, the platform has registered over 400 verified users.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                Anthony Chai, CEO and Founder, emphasizes the rigorous verification processes undertaken to ensure
                authenticity and trust. Landlords’ property ownership credentials are verified before listing, while
                tenants undergo thorough background checks
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                RealEzy’s inception is attributed to Anthony Chai, a former Singapore Air Force pilot and seasoned
                entrepreneur, alongside co-founders Tan Bien Kiat, ex-Chairman of Nasdaq-listed Pacific Internet, and
                Yeow Kwang Fei, a business magnate.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                The trio, with their wealth of experience and entrepreneurial prowess, aim to change the dynamics of the
                rental market.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                “We’re not your typical startup founders. We’ve pooled our expertise and vast networks to create
                RealEzy, complemented by a talented team of managers and operators who share our vision,” remarked Chai.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                Developed entirely in-house, RealEzy’s tech platform exemplifies a seamless user experience
                characterized by intuitiveness and adaptability.
              </p>
              <p className="font-roboto font-normal text-[#202020] 2xl:text-22 text-17 text-left w-full ">
                Available on both the Google Playstore and Apple store, the platform is poised to set new standards in
                tech-driven property rentals.
              </p>
              <Link
                href={
                  'https://gutzy.asia/2023/08/14/realezy-introduces-groundbreaking-peer-2-peer-tech-platform-revolutionizing-residential-rentals/ '
                }>
                <a target="_blank">
                  <Button
                    variant="contained"
                    className="!bg-[#00ADEE] !px-10 !py-4 !cursor-pointer !rounded-[10px] !text-white !font-roboto !font-normal !text-[1.375rem]/[1.6875rem] !capitalize
">
                    Read From Source
                  </Button>
                </a>
              </Link>
              <p className="font-roboto font-normal text-[#505050] 2xl:text-22 text-17 text-left w-full ">
                <b>Tags:</b> Gutzy Asia; RealEzy; P2P tech platform; Anthony Chai
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SpotlightDetails
