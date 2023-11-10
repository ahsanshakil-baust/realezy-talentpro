import React from 'react'

const HmDownloadSection = () => {
  return (
    <div className="px-4  w-full mb-0 py-[8px]  md:py-[12px] lg:py-[16px] xl:py-[22px] 2xl:py-[30px] ">
      <div className="-mx-4">
        <section className="bg-gradient-to-r from-[#000000] to-[#034EA1] from-0% to-100% px-[40px] py-[80px] md:py-[80px] md:px-[57px] lg:px-[71px] xl:px-[79.5px] 2xl:px-[106px] rounded-[30px] text-center md:text-left ">
          <div className="absolute z-10">
            <div
              className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] 2xl:w-[150px] 2xl:h-[150px] opacity-80 bg-[#005BBF] rounded-full ml-7 mt-0 md:-ml-[32px] md:-mt-[0px] lg:-ml-[42px] lg:-mt-[30px] xl:-ml-[52px] xl:-mt-[20px] 2xl:-ml-[62px] 2xl:-mt-[25px]"
              style={{ filter: 'blur(40px)' }}></div>
            <div
              className=" w-[80px] h-[80px] md:w-[110px] md:h-[110px] 2xl:w-[150px] 2xl:h-[150px] opacity-80 bg-[#005BBF]  rounded-full ml-[140px] mt-28 md:ml-[120px] lg:ml-[140px] xl:ml-[180px] 2xl:ml-[220px] md:mt-[40px] lg:mt-[60px] xl:mt-[70px]  2xl:mt-[80px]"
              style={{ filter: 'blur(40px)' }}></div>
          </div>
          <div className="relative w-full flex  items-center ">
            <div className="z-20 w-full grid mx-auto md:gap-8 lg:gap-0 md:grid-cols-12 -mt-[35px] -mb-[45px]">
              <div className=" my-auto place-items-start col-span-12 md:col-span-7">
                <h1 className="max-w-full font-bold font-roboto text-[#FFFFFF] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.5rem]/[1.8rem] uppercase 2xl:mb-4 md:mb-[0.8rem] mb-[0.6rem]">
                  IT'S ABOUT TIME.
                </h1>
                <h2 className="max-w-full font-medium font-roboto text-[#FFFFFF] 2xl:text-[2.25rem]/[2.75rem] md:text-[1.8rem]/[2.2rem] text-[1.2rem]/[1.6rem] 2xl:mb-[2rem] md:mb-[1.6rem] mb-[1rem]">
                  Get more out of the app.
                </h2>
                <p className="max-w-full 2xl:mb-[3rem] md:mb-[2.4rem] mb-[1.8rem] font-normal font-segoe text-[#FFFFFF] 2xl:text-[1.5rem]/[2rem] md:text-[1.2rem]/[1.6rem] text-[0.9rem]/[1rem]  ">
                  Save your searches, track enquiries, see floorplans and much more.
                </p>
                <p className="max-w-full 2xl:mb-[0.875rem] md:mb-[0.68rem] mb-[0.55rem] font-semibold font-segoe text-[#FFFFFF] 2xl:text-[1.625rem]/[2.25rem] md:text-[1.3rem]/[1.8rem] text-[1rem]/[1.4rem]  ">
                  Available on iOS and Android.
                </p>

                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.realezy.app"
                  rel='noreferrer'
                  className="inline-flex items-center  justify-center  mr-3 w-[10rem] md:w-[13rem] 2xl:w-[16.25rem] 2xl:h-[4.75rem] md:h-[3.8rem] h-[3.2rem] bg-no-repeat bg-contain bg-center">
                  <img src="download/Google_Play_Store.svg" alt="no-image" />{' '}
                </a>
                <a
                  target="_blank"
                  rel='noreferrer'
                  href="https://apps.apple.com/app/realezy/id1637788357"
                  className="inline-flex items-center  justify-center  mr-3 w-[10rem] md:w-[13rem] 2xl:w-[16.25rem] 2xl:h-[4.75rem] md:h-[3.8rem] h-[3.2rem] bg-no-repeat bg-contain bg-center">
                  <img src="download/App_Store_(iOS).svg" alt="no-image" />
                </a>
              </div>
              <div className="my-auto flex justify-center md:justify-end col-span-12 md:mt-0 md:col-span-5 pt-0 overflow-hidden relative  ">
                <div className="absolute 2xl:left-44 md:left-[8.8rem] left-[14rem] 2xl:top-16 md:top-[3.2rem] top-[2.6rem] ">
                  <div
                    className=" w-[16rem] h-[8rem] md:w-[17rem] md:h-[12rem] 2xl:w-[21.25rem] 2xl:h-[15rem] opacity-80 bg-[#005BBF] rounded-full"
                    style={{ filter: 'blur(20px)' }}
                  />
                </div>
                <img
                  className=" z-10 2xl:-mr-20 md:-[-4rem] -mr-[3rem] 2xl:h-[25.125rem] md:h-[18.813rem] h-full "
                  src="/download/downloadsection.png"
                  alt="mockup"
                />
                {/* <p className="max-w-2xl mb-[0px] font-light text-center text-white lg:mb-[0px] md:text-md lg:text-md dark:text-white capitalize">
                  Scan The QR Code To <br />
                  Download The App Now!
                  </p> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HmDownloadSection
