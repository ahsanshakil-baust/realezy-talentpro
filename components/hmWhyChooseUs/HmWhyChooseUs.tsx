import React from 'react'

const HmWhyChooseUs = () => {
  return (
    <section className=" w-full flex flex-col  z-20 bg-[#E4F0FE] ">
      <div className=" w-full h-auto relative  bg-[url('/aboutUs/newchooseus.png')] bg-no-repeat bg-center bg-cover">
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
            <div className="flex flex-col md:flex-row  ">
              <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-full bg-[#EEA840CC] flex items-center justify-center p-2 md:p-0 rounded-t-[10px] rounded-bl-[0px] md:rounded-l-[10px] md:rounded-tr-[0px] ">
                <img
                  src="/home/control-convenience-icon.svg"
                  className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  alt="no-image"
                />
              </div>
              <div className=" w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-[7.5rem]  md:h-full  opacity-50 rounded-b-[10px] md:rounded-r-[10px] md:rounded-l-[0px]  " />
                <p className=" text-[#FFFFFF] text-center md:text-left 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.05rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                  Control & Convenience
                </p>
                <p className=" text-[#000000] z-10  2xl:text-[1.125rem]/[1.625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[0.875rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                  Self service and round the clock accessibility, all in your own time and at your fingertips. Physical
                  meeting between landlord and tenant not compulsory.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row  ">
              <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-full bg-[#798B42] flex items-center justify-center p-2 md:p-0 rounded-t-[10px] rounded-bl-[0px] md:rounded-l-[10px] md:rounded-tr-[0px]">
                <img
                  src="/home/protection-icon.svg"
                  className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  alt="no-image"
                />
              </div>
              <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-[7.5rem]  md:h-full  opacity-50 rounded-b-[10px] md:rounded-r-[10px] md:rounded-l-[0px] " />
                <p className=" text-[#FFFFFF] text-center md:text-left 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.05rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                  Protection
                </p>
                <p className=" text-[#000000] z-10 2xl:text-[1.125rem]/[1.625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[0.875rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                  Comprehensive insurance protection covers landlords for rental income loss, repairs and legal fees.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row  ">
              <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-full bg-[#793F90] flex items-center justify-center p-2 md:p-0 rounded-t-[10px] rounded-bl-[0px] md:rounded-l-[10px] md:rounded-tr-[0px]">
                <img
                  src="/home/uncompleted-icon.svg"
                  className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  alt="no-image"
                />
              </div>
              <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-[7.5rem]  md:h-full  opacity-50 rounded-b-[10px] md:rounded-r-[10px] md:rounded-l-[0px] " />
                <p className=" text-[#FFFFFF] text-center md:text-left 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.05rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                  Uncomplicated
                </p>
                <p className=" text-[#000000] z-10 2xl:text-[1.125rem]/[1.625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[0.875rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                  No registration and listing fees; intermediary fees and security deposits are negated.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row col-start-1 relative md:left-[50%] left-[50%]">
              <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-full bg-[#00ADEE] flex items-center justify-center p-2 md:p-0 rounded-t-[10px] rounded-bl-[0px] md:rounded-l-[10px] md:rounded-tr-[0px]">
                <img
                  src="/home/trustworthy-icon.svg"
                  className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  alt="no-image"
                />
              </div>
              <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-[7.5rem]  md:h-full  opacity-50 rounded-b-[10px] md:rounded-r-[10px] md:rounded-l-[0px] " />
                <p className=" text-[#FFFFFF] text-center md:text-left 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.05rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                  Trustworthy
                </p>
                <p className=" text-[#000000] z-10 2xl:text-[1.125rem]/[1.625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[0.875rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                  Landlords must produce proof of property ownership prior to listing the property, and tenants are
                  authenticated & assessed for credit worthiness before transacting.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row col-start-3 relative md:right-[50%] right-[50%]">
              <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-full bg-[#234E70] flex items-center justify-center p-2 md:p-0 rounded-t-[10px] rounded-bl-[0px] md:rounded-l-[10px] md:rounded-tr-[0px]">
                <img
                  src="/home/assurance-icon.svg"
                  className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  alt="no-image"
                />
              </div>
              <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-[7.5rem]  md:h-full  opacity-50 rounded-b-[10px] md:rounded-r-[10px] md:rounded-l-[0px] " />
                <p className=" text-[#FFFFFF] text-center md:text-left 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.05rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                  Assurance
                </p>
                <p className=" text-[#000000] z-10 2xl:text-[1.125rem]/[1.625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[0.875rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                  Transact securely and legally. Customer support before & during the rental process; & concierge
                  service during rental period.
                </p>
              </div>
            </div>
            {/*               
              <div className="flex ">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-full bg-[#DC286E] flex items-center justify-center p-2 md:p-0 rounded-t-[10px] rounded-bl-[0px] md:rounded-l-[10px] md:rounded-tr-[0px]">
                  <img
                    src="/aboutUs/discover-icons/img6.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-[7.5rem]  md:h-full  opacity-50 rounded-b-[10px] md:rounded-r-[10px] md:rounded-l-[0px] " />
                  <p className=" text-[#FFFFFF] text-center md:text-left 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.05rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Qualification
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.125rem]/[1.625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[0.875rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Renters Are Authenticated And Assessed For Credit Worthiness Before Becoming Tenants
                  </p>
                </div>
              </div>
              <div className="flex col-start-2">
                <div className=" 2xl:w-[6.25rem] md:w-[5rem] w-full bg-[#EEA840] flex items-center justify-center p-2 md:p-0 rounded-t-[10px] rounded-bl-[0px] md:rounded-l-[10px] md:rounded-tr-[0px]">
                  <img
                    src="/aboutUs/discover-icons/img6.svg"
                    className="2xl:w-[3.125rem] md:w-[2.5rem] w-[1.5rem]  2xl:h-[3.75rem] md:h-[3rem] h-[2rem]"
                  />
                </div>
                <div className="w-full 2xl:px-7 md:px-[1.4rem] px-4 2xl:pt-[1.875rem] md:pt-[1.5rem] pt-[1.125rem] 2xl:pb-[1.375rem] md:pb-[1.1rem] pb-[0.75rem] relative  flex flex-col 2xl:gap-[1.125rem] md:gap-[0.9rem] gap-[0.6rem]  ">
                  <div className="bg-[#D4E8FF] blur-[3px] z-0 absolute top-0 left-0 w-full h-[7.5rem]  md:h-full  opacity-50 rounded-b-[10px] md:rounded-r-[10px] md:rounded-l-[0px] " />
                  <p className=" text-[#FFFFFF] text-center md:text-left 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.05rem] z-10  2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-roboto font-medium">
                    Peace Of Mind
                  </p>
                  <p className=" text-[#000000] z-10 2xl:text-[1.125rem]/[1.625rem] md:text-[1rem]/[1.25rem] text-[0.75rem]/[0.875rem] 2xl:tracking-[0.02125rem] md:tracking-[0.017rem] tracking-[0.01rem] font-roboto font-normal">
                    Support Before & During The Rental Process, & Concierge Service During Rental Period
                  </p>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </section>

    // <section className="  flex w-full items-center justify-center   bg-[url('/download/why-choose-us.png')] py-10 md:py-14  xl:py-20 bg-no-repeat bg-center bg-cover  ">
    //   <div className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] w-full ">
    //     <div className="w-[90%] md:w-full m-auto  ">
    //       <h3 className=" mb-2 lg:mb-3 font-segoe text-sm md:text-base lg:text-xl xl:text-[22.5px] 2xl:text-3xl text-left text-[#FFFFFF] font-normal tracking-[0.2x] lg:tracking-[0.4x] 2xl:tracking-[0.6px] capitalize ">
    //         IT’S ABOUT TIME
    //       </h3>
    //       <h1 className=" font-roboto text-base md:text-xl lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] text-left text-[#FFFFFF] font-bold tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px] ">
    //         You embarked on the RealEzy journey
    //       </h1>

    //       <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[14px]  md:mt-[30px] lg:mt-[37px] xl:mt-12 2xl:mt-[64px] gap-5 md:gap-7 lg:gap-9 2xl:gap-12 ">
    //         <div className="w-full flex gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 ">
    //           <div className=" ">
    //             <div className=" w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px] xl:w-[67.5px] xl:h-[67.5px] 2xl:w-[90px] 2xl:h-[90px] bg-white rounded-full flex items-center justify-center  ">
    //               <img
    //                 src="download/control.png "
    //                 className=" w-full "
    //               />
    //             </div>
    //           </div>

    //           <div className="   flex flex-col gap-1 md:gap-2 lg:gap-3 2xl:gap-4">
    //             <h1 className="font-roboto text-sm sm:text-base xl:text-lg 2xl:text-2xl text-left text-[#FFFFFF] font-medium tracking-[0.5px] capitalize">
    //               Control & Convenience
    //             </h1>

    //             <p className="font-roboto text-xs sm:text-sm 2xl:text-base text-left text-[#F1F7FF] font-normal tracking-[0.08px] md:tracking-[0.12px] xl:tracking-[0.16px]">
    //               Self service and round the clock accessibility, all in your own time and at your fingertips. Physical meeting between landlord and tenant not compulsory.
    //             </p>
    //           </div>
    //         </div>
    //         <div className="w-full flex gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 ">
    //           <div className=" ">
    //             <div className=" w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px] xl:w-[67.5px] xl:h-[67.5px] 2xl:w-[90px] 2xl:h-[90px] bg-white rounded-full flex items-center justify-center  ">
    //               <img
    //                 src="download/convenience.png"
    //                 className=" w-full "
    //               />
    //             </div>
    //           </div>

    //           <div className="  flex flex-col gap-1 md:gap-2 lg:gap-3 2xl:gap-4">
    //             <h1 className="font-roboto text-sm sm:text-base xl:text-lg 2xl:text-2xl text-left text-[#FFFFFF] font-medium tracking-[0.5px] capitalize">
    //               Protection
    //             </h1>

    //             <p className="font-roboto text-xs sm:text-sm 2xl:text-base text-left text-[#F1F7FF] font-normal tracking-[0.08px] md:tracking-[0.12px] xl:tracking-[0.16px] ">
    //               Comprehensive insurance protection covers landlords for rental income loss, repairs and legal fees.
    //             </p>
    //           </div>
    //         </div>
    //         <div className="w-full flex gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 ">
    //           <div className=" ">
    //             <div className=" w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px] xl:w-[67.5px] xl:h-[67.5px] 2xl:w-[90px] 2xl:h-[90px] bg-white rounded-full flex items-center justify-center  ">
    //               <img
    //                 src="download/assurance.png "
    //                 className=" w-full "
    //               />
    //             </div>
    //           </div>

    //           <div className="   flex flex-col gap-1 md:gap-2 lg:gap-3 2xl:gap-4">
    //             <h1 className="font-roboto text-sm sm:text-base xl:text-lg 2xl:text-2xl text-left text-[#FFFFFF] font-medium tracking-[0.5px] capitalize">
    //               Uncomplicated
    //             </h1>

    //             <p className="font-roboto text-xs sm:text-sm 2xl:text-base text-left text-[#F1F7FF] font-normal tracking-[0.08px] md:tracking-[0.12px] xl:tracking-[0.16px]">
    //               No registration and listing fees; intermediary fees and security deposits are negated.
    //             </p>
    //           </div>
    //         </div>
    //         <div className="w-full flex gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 ">
    //           <div className=" ">
    //             <div className=" w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px] xl:w-[67.5px] xl:h-[67.5px] 2xl:w-[90px] 2xl:h-[90px] bg-white rounded-full flex items-center justify-center  ">
    //               <img
    //                 src="download/uncomplicated.png"
    //                 className=" w-full "
    //               />
    //             </div>
    //           </div>

    //           <div className="  flex flex-col gap-1 md:gap-2 lg:gap-3 2xl:gap-4">
    //             <h1 className="font-roboto text-sm sm:text-base xl:text-lg 2xl:text-2xl text-left text-[#FFFFFF] font-medium tracking-[0.5px] capitalize">
    //               Trustworthy
    //             </h1>

    //             <p className="font-roboto text-xs sm:text-sm 2xl:text-base text-left text-[#F1F7FF] font-normal tracking-[0.08px] md:tracking-[0.12px] xl:tracking-[0.16px]">
    //               Landlords must produce proof of property ownership prior to listing the property, and tenants are authenticated & assessed for credit worthiness before transacting.
    //             </p>
    //           </div>
    //         </div>
    //         <div className="w-full flex gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 ">
    //           <div className=" ">
    //             <div className=" w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px] xl:w-[67.5px] xl:h-[67.5px] 2xl:w-[90px] 2xl:h-[90px] bg-white rounded-full flex items-center justify-center  ">
    //               <img
    //                 src="download/Verification.png"
    //                 className=" w-full "
    //               />
    //             </div>
    //           </div>

    //           <div className=" flex flex-col gap-1 md:gap-2 lg:gap-3 2xl:gap-4">
    //             <h1 className="font-roboto text-sm sm:text-base xl:text-lg 2xl:text-2xl text-left text-[#FFFFFF] font-medium tracking-[0.5px] capitalize">
    //               Assurance
    //             </h1>

    //             <p className="font-roboto text-xs sm:text-sm 2xl:text-base text-left text-[#F1F7FF] font-normal tracking-[0.08px] md:tracking-[0.12px] xl:tracking-[0.16px]">
    //               Transact securely and legally. Customer support before & during the rental process; & concierge service during rental period.
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export default HmWhyChooseUs
