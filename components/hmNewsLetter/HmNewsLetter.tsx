import { Button } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const HmNewsLetter = () => {
  const [mail, setMail] = useState('')
  const [name, setName] = useState('')
  const handleNewsLetter = (e: any) => {
    e.preventDefault()
    toast.success('NewsLetter Subscribed Successfully')
    setMail('')
    setName('')
  }
  return (
    <section className=" py-[15px] sm:py-[25px]  md:py-[30px] lg:py-[35px] xl:py-[48px] 2xl:py-[50px] relative w-full flex items-center h-[160px] md:h-[139px] lg:h-[173px] xl:h-[195px] 2xl:h-[260px] bg-gradient-to-l from-[#9BC3EF] to-[#00adee] from-0% to-100% ">
      <div className=" w-full flex justify-between">
        <img
          src="download/Group 11049.svg"
          alt="no-image"
          className=" w-[111px] h-[90px] md:w-[89px] md:h-[90px] lg:w-[111.5px] lg:h-[111.5px] xl:w-[125px] xl:h-[125px] 2xl:w-[167px] 2xl:h-[167px]  ml-[13px] md:ml-[28px] lg:ml-[35px] xl:ml-[39px] 2xl:ml-[52px] "
        />
        <img
          src="download/Group 11065.svg"
          alt="no-image"
          className=" w-[111px] h-[90px] md:w-[89px] md:h-[90px] lg:w-[111.5px] lg:h-[111.5px] xl:w-[125px] xl:h-[125px] 2xl:w-[167px] 2xl:h-[167px]  mr-[13px] md:mr-[28px] lg:mr-[35px] xl:mr-[39px] 2xl:mr-[52px] "
        />
      </div>

      <div className="  2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] px-0.5 absolute w-full flex justify-center items-center  z-20  ">
        <div className=" w-full flex flex-col gap-3 md:gap-0 ">
          <div className=" w-full flex flex-col gap-1 items-center justify-center md:items-start  md:justify-start">
            <h3 className="  font-roboto text-xl sm:text-2xl md:text-[1.3rem]/[1.6rem] 2xl:text-[1.625rem]/[2rem] text-left text-[#FFFFFF] font-normal tracking-[0.52px] capitalize ">
              Stay in touch
            </h3>
            <h1 className="block md:hidden justify-center w-full font-roboto text-xs sm:text-sm  text-center text-[#FFFFFF] font-bold  capitalize">
              Leave us your name and email address to receive latest new and updates from us.{' '}
            </h1>
          </div>

          <div className=" mt-1.5 w-full flex items-center justify-center md:justify-between ">
            <h1 className="hidden md:block justify-center w-full font-roboto text-base md:text-[1.2rem]/[2rem] xl:text-[1.4rem]/[2.2rem] 2xl:text-[1.75rem]/[2.75rem] text-left text-[#FFFFFF] font-bold tracking-[0.56px]">
              Leave us your name and email address to <br /> receive latest new and updates from us.{' '}
            </h1>
            <form onSubmit={handleNewsLetter}>
              <div className=" w-full gap-5 flex justify-center md:justify-end items-center  ">
                <input
                  type="text"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  required
                  id="default-search"
                  className="w-full md:w-[12.8rem] xl:w-[14.8rem] 2xl:w-[18.5rem] h-[42px] sm:h-[52px] md:h-[3.5rem] 2xl:h-[4.375rem] block rounded-[10px] shadow-[8px_6px_40px_#034EA14D] font-roboto font-extralight text-xs sm:text-base md:text-[1rem]/[1.25rem] 2xl:text-[1.25rem]/[1.5rem] px-2 sm:px-4 md:px-[1.8rem] 2xl:px-9 placeholder-[#999999] tracking-[0.2px] bg-[#F1F7FF] "
                  placeholder="Enter your name..."
                />
                <input
                  type="email"
                  value={mail}
                  onChange={(e: any) => setMail(e.target.value)}
                  required
                  id="default-search"
                  className=" w-full md:w-[20.9rem] xl:w-[22.9rem]  2xl:w-[28.625rem] h-[42px] sm:h-[52px] md:h-[3.5rem] 2xl:h-[4.375rem] block rounded-[10px] shadow-[8px_6px_40px_#034EA14D] font-roboto font-extralight  text-xs sm:text-base md:text-[1rem]/[1.25rem] 2xl:text-[1.25rem]/[1.5rem] px-2 sm:px-4 md:px-[1.8rem] 2xl:px-9 placeholder-[#999999]  tracking-[0.2px] bg-[#F1F7FF]  "
                  placeholder="Enter your email..."
                />
                <Button
                  variant="contained"
                  type="submit"
                  className="  !rounded-[10px] !text-base md:!text-[1rem]/[1.1rem] xl:!text-[1.1rem]/[1.3rem] 2xl:!text-[1.375rem]/[1.625rem] !font-roboto !text-center !text-[#FFFFFF] !tracking-[0.44px] !capitalize !h-[42px] sm:!h-[52px] md:!h-[3.5rem] 2xl:!h-[4.375rem] !px-[3.25rem] !bg-[#00adee] ">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HmNewsLetter
