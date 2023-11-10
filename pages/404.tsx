import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <section className=" w-full h-screen overflow-auto flex  items-center  py-10 flex-col  z-20 bg-gradient-to-b from-[#F4F8FF] from-0% to-[#F1F5FF] to-100% ">
      <div className="z-0 ">
        <Image src="/download/not-found.png" width={1012} height={594} />
      </div>
      <div className="flex flex-col items-center m-auto -mt-7 z-20 ">
        <h1 className="text-[#00ADEE] 2xl:mb-4 md:mb-3 mb-2 font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.6rem]/[2rem] capitalize">
          Page Not Found
        </h1>
        <p className="text-[#999999] 2xl:mb-10 md:mb-8 mb-5 2xl:text-[1.625rem]/[1.875rem] md:text-[1.3rem]/[1.5rem] text-[1rem]/[1.25rem] font-normal font-roboto">
          Sorry, we could not find the page you are looking for.{' '}
        </p>
        <Link href="/">
          <button className="bg-[#00ADEE] cursor-pointer text-[#FFFFFF] 2xl:text-[1.625rem]/[1.875rem] md:text-[1.3rem]/[1.5rem] text-[1rem]/[1.25rem] font-roboto font-medium  2xl:py-5 py-4 2xl:px-10 px-8  rounded-[10px]">
            Go to Home Page
          </button>
        </Link>
      </div>
    </section>
  )
}

export default NotFound
