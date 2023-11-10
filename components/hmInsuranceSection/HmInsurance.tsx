import React from 'react'

const HmInsurance = () => {
  return (
    <section className="flex flex-col items-center  gap-y-5  bg-[#FCFDFF]  ">
      {/* ====== Contact Form Section Start */}
      <section className="py-[15px] sm:py-[25px]  md:py-[30px] lg:py-[35px] xl:py-[48px] 2xl:py-[50px] w-full flex items-center justify-center relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 overflow-hidden bg-transparent ">
        <div className="w-[90%] md:w-full m-auto">
          {/*------Insurance section start--------------*/}
          <div className=" flex flex-wrap">
            <div className="w-full ">
              <div className=" max-w-[620px] mb-[2rem] md:mb-[2.6rem] 2xl:mb-[3.25rem]">
                <h3 className="hidden text-[#00ADEE] text-[16px] lg:text-[20px] xl:text-[22.5px] 2xl:text-[30px] tracking-[0.6px] text-left font-normal capitalize font-roboto">
                  Our Insurance
                </h3>
                <h1 className=" font-roboto font-bold text-[#00ADEE] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.6rem]/[2rem]">
                  Why Choose RealEzy?
                </h1>
              </div>
            </div>
          </div>
          <div className=" grid 2xl:grid-cols-4 md:grid-cols-4 grid-cols-1 2xl:gap-9 md:gap-[1.8rem] gap-[1.4rem]">
            <div className="w-full h-full ">
              <div
                className="wow fadeInUp group flex flex-col items-center 2xl:pt-9 md:pt-[1.8rem] pt-[1.5rem] mb-0 bg-[#FFFFFF] rounded-xl   shadow-[0px_2px_20px_#034EA124]  h-[14rem] md:h-[16.8rem] 2xl:h-[21rem] px-4 md:px-[1.3rem] 2xl:px-[1.625rem] "
                data-wow-delay=".1s">
                <div className="relative z-10 2xl:mb-6 md:mb-5 mb-4 flex 2xl:w-[6.375rem] md:w-[5.1rem] w-[4.5rem] 2xl:h-[6.375rem]  md:h-[5.1rem] h-[4.5rem] items-center justify-center rounded-full bg-[#DDF2FE66] mx-auto ">
                  <img src="/insurance/dollertc.svg" alt="image" className="mx-auto  w-[54px] h-[54px]" />
                </div>
                <h4 className="2xl:mb-4 md:mb-[0.8rem] mb-[0.6rem] font-semibold font-roboto text-[#1F2937] 2xl:text-[1.375rem]/[2rem] md:text-[1.1rem]/[1.4rem] text-[0.9rem]/[1rem] text-center">
                  REALEZY Landlords
                </h4>

                <p className="font-segoe text-center text-[#999999] font-normal 2xl:text-[1.125rem]/[1.625rem] md:[1rem]/[1.3rem] text-[0.8rem]/[1rem]">
                  are subscribed to the <br /> Allianz Rental Protect plan instead <br /> of paying intermediary fees{' '}
                </p>
              </div>
            </div>
            <div className="w-full h-full ">
              <div
                className="wow fadeInUp group flex flex-col items-center 2xl:pt-9 md:pt-[1.8rem] pt-[1.5rem] mb-0 bg-[#FFFFFF] rounded-xl   shadow-[0px_2px_20px_#034EA124]  h-[14rem] md:h-[16.8rem] 2xl:h-[21rem] px-4 md:px-[1.3rem] 2xl:px-[1.625rem] "
                data-wow-delay=".2s">
                <div className="relative z-10 2xl:mb-6 md:mb-5 mb-4 flex 2xl:w-[6.375rem] md:w-[5.1rem] w-[4.5rem] 2xl:h-[6.375rem]  md:h-[5.1rem] h-[4.5rem] items-center justify-center rounded-full bg-[#DDF2FE66] mx-auto ">
                  <img src="/insurance/shieldtc.svg" alt="image" className="mx-auto  w-[54px] h-[54px]" />
                </div>
                <h4 className="2xl:mb-4 md:mb-[0.8rem] mb-[0.6rem] font-semibold font-roboto text-[#1F2937] 2xl:text-[1.375rem]/[2rem] md:text-[1.1rem]/[1.4rem] text-[0.9rem]/[1rem] text-center">
                  Allianz Rental Protect
                </h4>
                {/*
            <p class="mb-3 text-body-color text-sm"
            >
              Lorem Ipsum is simply dummy text of teh printing and typesetting industry.
            </p>
            */}
                <p className="font-segoe text-center text-[#999999] font-normal 2xl:text-[1.125rem]/[1.625rem] md:[1rem]/[1.3rem] text-[0.8rem]/[1rem]">
                  is a household and rental <br /> protection plan that covers rental <br /> income loss, household
                  content <br /> damage and legal fees
                </p>
              </div>
            </div>
            <div className="w-full h-full ">
              <div
                className="wow fadeInUp group flex flex-col items-center 2xl:pt-9 md:pt-[1.8rem] pt-[1.5rem] mb-0 bg-[#FFFFFF] rounded-xl   shadow-[0px_2px_20px_#034EA124]  h-[14rem] md:h-[16.8rem] 2xl:h-[21rem] px-4 md:px-[1.3rem] 2xl:px-[1.625rem] "
                data-wow-delay=".15s">
                <div className="relative z-10 2xl:mb-6 md:mb-5 mb-4 flex 2xl:w-[6.375rem] md:w-[5.1rem] w-[4.5rem] 2xl:h-[6.375rem]  md:h-[5.1rem] h-[4.5rem] items-center justify-center rounded-full bg-[#DDF2FE66] mx-auto ">
                  <img src="/insurance/union.svg" alt="image" className="mx-auto  w-[54px] h-[54px]" />
                </div>
                <h4 className="2xl:mb-4 md:mb-[0.8rem] mb-[0.6rem] font-semibold font-roboto text-[#1F2937] 2xl:text-[1.375rem]/[2rem] md:text-[1.1rem]/[1.4rem] text-[0.9rem]/[1rem] text-center">
                  Tenants Enjoy
                </h4>
                <p className="font-segoe flex text-center text-[#999999] font-normal 2xl:text-[1.125rem]/[1.625rem] md:[1rem]/[1.3rem] text-[0.8rem]/[1rem]">
                  deposit-free rent upon <br /> successfully completing the <br /> REALEZY credit scoring{' '}
                </p>
              </div>
            </div>
            <div className="w-full h-full ">
              <div
                className="wow fadeInUp group flex flex-col items-center 2xl:pt-9 md:pt-[1.8rem] pt-[1.5rem] mb-0 bg-[#FFFFFF] rounded-xl   shadow-[0px_2px_20px_#034EA124]  h-[14rem] md:h-[16.8rem] 2xl:h-[21rem] px-4 md:px-[1.3rem] 2xl:px-[1.625rem] "
                data-wow-delay=".25s">
                <div className="relative z-10 2xl:mb-6 md:mb-5 mb-4 flex 2xl:w-[6.375rem] md:w-[5.1rem] w-[4.5rem] 2xl:h-[6.375rem]  md:h-[5.1rem] h-[4.5rem] items-center justify-center rounded-full bg-[#DDF2FE66] mx-auto">
                  <img src="/insurance/union.svg" alt="image" className="mx-auto  w-[54px] h-[54px]" />
                </div>
                <h4 className="2xl:mb-4 md:mb-[0.8rem] mb-[0.6rem] font-semibold font-roboto text-[#1F2937] 2xl:text-[1.375rem]/[2rem] md:text-[1.1rem]/[1.4rem] text-[0.9rem]/[1rem] text-center">
                  Landlords &amp; Tenants
                </h4>

                <p className="font-segoe text-center text-[#999999] font-normal 2xl:text-[1.125rem]/[1.625rem] md:[1rem]/[1.3rem] text-[0.8rem]/[1rem]">
                  communicate directly and <br /> transact securely and legally on <br /> our platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default HmInsurance
