import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HelpSupport = () => {
  return (
    <section className="pt-[15px] sm:pt-[25px]  md:pt-[30px] lg:pt-[35px] xl:pt-[48px] 2xl:pt-[50px] pb-[25px] sm:pb-[35px]  md:pb-[40px] lg:pb-[55px] xl:pb-[68px] 2xl:pb-[80px]  w-full flex items-center justify-center relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 overflow-hidden bg-[#F8FAFC] ">
      <div className="w-[90%] md:w-full m-auto">
        <div className=" w-full flex flex-col  justify-center ">
          <h2 className=" font-bold text-[#00ADEE] text-xl lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] text-left font-roboto  tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px] ">
            Help & Support
          </h2>
          <p className="text-[#505050] font-normal text-base lg:text-[18px] xl:text-[20px] 2xl:text-[24px] 2xl:leading-[36px] text-left font-roboto  tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px] mt-2">
            We answer some questions you may have about our platform and service.
          </p>
          <div className=" mt-[52px] flex flex-col w-full gap-1">
            <div className=" w-full  flex gap-2">
              <div className="w-[15%] flex justify-start  ">
                <div className="flex flex-col items-center   ">
                  <img
                    className="mt-8"
                    src="/helpsupport/Landlord Icon.svg"
                    width={156}
                    height={190}
                    alt="Landlord Icon"
                  />
                  <p className="text-[#034EA1] font-semibold font-roboto 2xl:text-[1.75rem]/[2.125rem] text-[1.4rem]/[1.7rem] mt-3.5">
                    Landlord
                  </p>
                </div>
              </div>
              <div className="flex-grow ">
                <div className=" flex  h-[358px]">
                  <div className=" flex items-start">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/l1.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-end 2xl:-ml-14 -ml-[4.2rem] ">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/l2.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-start 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/l3.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-end 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/l4.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-start 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/l5.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full  flex gap-2">
              <div className="w-[15%] flex justify-start  ">
                <div className="flex flex-col items-center   ">
                  <img className="mt-8" src="/helpsupport/Tenant Icon.svg" width={156} height={190} alt="Tenant Icon" />
                  <p className="text-[#00ADEE] font-semibold font-roboto 2xl:text-[1.75rem]/[2.125rem] text-[1.4rem]/[1.7rem] mt-3.5">
                    Tenant
                  </p>
                </div>
              </div>
              <div className="flex-grow   ">
                <div className=" flex  h-[358px]">
                  <div className=" flex items-start">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/t1.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-end 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/t2.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-start 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/t3.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-end 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/t4.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-start 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/t5.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-end 2xl:-ml-14 -ml-[4.2rem]">
                    <Link href="/faq">
                      <div className="cursor-pointer 2xl:w-[17.0625rem] md:w-[13.65rem] w-[11.65rem] 2xl:h-[14.4375rem] md:h-[11.55rem] h-[9.55rem]">
                        <img src="/helpsupport/t6.png" alt="Group 2" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpSupport
