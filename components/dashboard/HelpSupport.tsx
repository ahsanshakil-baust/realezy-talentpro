import { StoreState } from '@/types'
import { isTenant } from '@/util'
// import { type } from 'os'
import React from 'react'
import { useSelector } from 'react-redux'
// import HelpnSupportIcon from '@/public/Help&Support_icon.svg'
// import edit from '@/public/edit.svg'
// import Image from 'next/image'
// import { Button } from '@mui/material'
import classNames from 'classnames'

const HelpnSupport = () => {
  const { type } = useSelector((state: StoreState) => state.entities.user)

  return (
    <>
      <div className="p-5 md:p-9">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <svg
              className={` w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10  ${
                isTenant(type) ? 'fill-[#00ADEE] ' : 'fill-[#034EA1]'
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
            <h2
              className={classNames(
                ' text-[20px] leading-4 md:text-[24px] md:leading-5 xl:text-[28px] xl:leading-6 font-medium font-roboto  ',
                isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
              )}>
              {' '}
              Help & Support
            </h2>{' '}
          </div>
          <div>
            <button
              className={classNames(
                ' px-2 md:px-3 xl:px-5 py-2 md:py-3 xl:py-4 rounded-[10px]  text-[#FFFFFF] capitalize font-roboto font-normal text-base lg:text-lg xl:text-xl flex items-center gap-2',
                isTenant(type) ? 'bg-[#00ADEE]' : 'bg-[#034EA1]'
              )}>
              {/* <Image src={edit} width={'15%'} height={'15%'} />  */}
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25.999" viewBox="0 0 26 25.999">
                <g id="edit" transform="translate(0 -0.001)">
                  <path
                    id="Path_21131"
                    data-name="Path 21131"
                    d="M20.992,12.839a1.1,1.1,0,0,0-1.1,1.1v8.839a1.106,1.106,0,0,1-1.1,1.1H3.315a1.106,1.106,0,0,1-1.1-1.1V7.315a1.106,1.106,0,0,1,1.1-1.1h8.839a1.1,1.1,0,0,0,0-2.21H3.315A3.319,3.319,0,0,0,0,7.315V22.782A3.319,3.319,0,0,0,3.315,26.1H18.782A3.319,3.319,0,0,0,22.1,22.782V13.944A1.1,1.1,0,0,0,20.992,12.839Z"
                    transform="translate(0 -0.097)"
                    fill="#fff"
                  />
                  <path
                    id="Path_21132"
                    data-name="Path 21132"
                    d="M9.633,13.471a.659.659,0,0,0-.178.332l-.92,4.6a.65.65,0,0,0,.639.778.615.615,0,0,0,.128-.013l4.6-.92a.647.647,0,0,0,.333-.178L24.527,7.776l-4.6-4.6Z"
                    transform="translate(-2.184 0.481)"
                    fill="#fff"
                  />
                  <path
                    id="Path_21133"
                    data-name="Path 21133"
                    d="M24.749.952a3.255,3.255,0,0,0-4.6,0l-1.8,1.8,4.6,4.6,1.8-1.8a3.252,3.252,0,0,0,0-4.6Z"
                    transform="translate(0.299)"
                    fill="#fff"
                  />
                </g>
              </svg>
              Update
            </button>
          </div>
        </div>

        {/* Help&Support */}
        <div className="md:flex  gap-3 md:gap-4 xl:gap-5 ">
          <div className="w-full  bg-[#F1F7FF] py-4 md:py-6 xl:py-8 px-4 md:px-7 xl:px-11 border border-solid border-[#D4E8FF] rounded-[10px] ">
            <div className="w-full md:w-2/3 bg-[#F1F7FF] py-3 md:py-5 xl:py-7 px-4 md:px-7 xl:px-11  border border-solid border-[#D4E8FF] rounded-[10px] ">
              {/* <div>
                <div>
                  <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
                    Terms Of Use Details
                  </h2>
                  <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                    You have not set up any Terms Of Use method yet.
                  </p>
                  <p className="text-[#A1A1A1] mb-4 md:mb-5 xl:mb-7 font-normal font-roboto text-sm sm:text-base xl:text-lg">
                    Tell us how you want to receive your funds. It may take up to some days to activate your Terms Of
                    Use method.
                  </p>
                </div>

                <div className="w-full flex justify-between gap-2">
                  <div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                        Terms Of Use Method
                      </p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Bank Transfer
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Account Name</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Clarissa Tan Hossain
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                        Account Number
                      </p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        EX: A/C 968544788411
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Branch</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Anson Road
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-[22px] md:mb-[32px] xl:mb-[50px]">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Swift Code</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: 123 654
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-[18px] md:mb-[22px] xl:mb-[30px]">
                      <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
                        Bank Statement
                      </h2>
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                        You have not add any bank statement yet.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Bank Name</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Standard Chartered Singapore
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Account Type</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Personal Account
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Bank Code</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        EX: 9685
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Branch Code</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: 123456
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              <h3
                className="wow  fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                data-wow-delay=".1s"
                style={{ animationDelay: '0.1s' }}>
                General
              </h3>

              <p
                className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                data-wow-delay=".1s"
                style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                {' '}
                Please carefully read all of these terms and conditions ("Terms"). You and Real Ezy Pte Ltd ("Company,"
                "Real Ezy," "we," or "us") are bound by these Terms, which also govern your use of www.Real-Ezy.com,
                Real Ezy App and Real Ezy Web App (collectively, the " Real Ezy Platforms" including all material and
                features thereof). You accept the terms and conditions set out in this document and all other terms that
                are referenced herein by accessing or using the Real Ezy Platforms. Do not use the Real Ezy Platforms if
                you do not agree to these Terms. Real Ezy shall not be liable for any damages resulting from your use of
                any information or content on the Real Ezy Platforms. You are solely responsible for ensuring that any
                information, goods, or services obtained from the Real Ezy Platforms satisfy your individual needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpnSupport
