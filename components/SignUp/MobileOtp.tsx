import React, { useState, useRef, useEffect } from 'react'
import { logo } from '@/util/helper'

const MobileOtp = () => {
  const [actValue, setActValue] = useState(' '.repeat(6))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const onChangeHandler = (e: any, index: number) => {
    if (e.target.value.length == 1) {
      setActValue((prev: any) => {
        return prev.substring(0, index) + e.target.value[0] + prev.substring(index + 1)
      })
      setActiveOtpIndex(index + 1)
    }
  }
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === 'Backspace') {
      setActiveOtpIndex(index - 1)
      setActValue((prev: any) => {
        return prev.substring(0, index) + ' ' + prev.substring(index + 1)
      })
    }
  }
  useEffect(() => {
    inputRef?.current?.focus()
  }, [activeOtpIndex])

  return (
    <div>
      {/* <div className="  flex w-[100%] justify-end items-end px-2 pt-3 -mb-4 md:px-3 md:pt-4 md:-mb-6  2xl:px-4 2xl:pt-6 2xl:-mb-8  ">
        <span className="z-20 cursor-pointer bg-[#ccdef6] 2xl:p-4 md:p-2 rounded-full 2xl:mr-6  2xl:mt-5  inline-block">
          <img src="./close.svg" alt="" className=" " />
        </span>
      </div> */}

      <div className="z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px]  2xl:px-[75px] pb-1 md:pb-[7.5px] 2xl:pb-[14px] ">
        <img alt='no-image' src={logo} className=" w-[70px] md:w-[130px]  2xl:w-[180px] h-[30px] md:h-10 2xl:h-[50px]" />
        <h2 className=" mb-1 lg:mb-2 mt-1 text-center capitalize font-roboto font-medium text-lg md:text-xl 2xl:text-2xl text-[#00ADEE] ">
          Login With Mobile
        </h2>
        <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
          It's really easy with RealEzy
        </p>
        <div className="flex justify-between w-full mb-4">
          <span className="font-semibold text-[14px]">Enter code</span>
          <button className="bg-transparent text-[#00ADEE] text-[12px] cursor-pointer">Resend</button>
        </div>
        <form>
          <div className="flex justify-center items-center space-x-2 gap-6 mb-6">
            {actValue.split('').map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <input
                    ref={index === activeOtpIndex ? inputRef : null}
                    type="number"
                    className="w-12 h-12 border-2 rounded-[5px] bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-[#00ADEE] focus:border-[#00ADEE] focus:text-[#00ADEE] text-[#00ADEE] transition"
                    onChange={(e: any) => onChangeHandler(e, index)}
                    value={actValue[index]}
                    onKeyDown={(e: any) => {
                      handleKeyDown(e, index)
                    }}
                  />
                </React.Fragment>
              )
            })}
          </div>
          <div className="w-full flex justify-center">
            <p className="text-[#A1A1A1] text-base mb-6">We send 6-digits verification code to +8801601484955</p>
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="bg-[#00ADEE] px-8 py-3 rounded-[10px] border border-[#00ADEE] text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MobileOtp
