import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> { }

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  return (
    <footer
      {...footerProps}
      className={`wow 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] fadeInUp relative z-10 bg-gradient-to-b from-[#034EA1] to-[#021E3D] from-0% to-100% pt-20 lg:pt-[60px] ${className}`}
      data-wow-delay=".15s">
      <div className="w-[90%] md:w-full m-auto">
        {/* old */}
        <div className="-mx-4 flex xs:hidden flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-4/12">
            <div className="mb-5 w-full">
              <Link href="/">
                <a className="mb-6 inline-block max-w-[140px] ">
                  <img
                    src="formlogo/Logo-w.svg"
                    alt="white-Logo"
                    // width="280px"
                    // height="68px"
                    // priority
                    className="max-w-full w-[140px] md:w-[140px]"
                  />
                </a>
              </Link>
              <p className="mb-7 text-base text-[#f3f4fe]">
                Real Ezy Pte Ltd is a service innovator, riding on digital advancements to reshape and set a new
                standard for Singapore’s real estate transactions. The service fills the gap in the market during a time
                when P2P business models are thriving and the economics of renting is ready for higher levels of
                efficiency and empowerment.
              </p>
              <div className="-mx-3 flex items-center">
                <Link href="https://www.facebook.com/MyRealEzy?mibextid=D4KYlr">
                  <a className="px-2 text-[#dddddd] hover:text-white">
                    <Image
                      src="/download/facebook-icon.png"
                      alt="img"
                      width="40px"
                      height="40px"
                      priority
                      className="w-10 h-10 rounded-0"
                    />
                  </a>
                </Link>
                {/* <Link href="/">
                  <a className="px-2 text-[#dddddd] hover:text-white">
                    <Image
                      src="/download/instagram.png"
                      alt="img"
                      width="40px"
                      height="40px"
                      priority
                      className="w-10 h-10 rounded-0"
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a className="px-2 text-[#dddddd] hover:text-white">
                    <Image
                      src="/download/twitter-icon.png"
                      alt="img"
                      width="40px"
                      height="40px"
                      priority
                      className="w-10 h-10 rounded-0"
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a className="px-2 text-[#dddddd] hover:text-white">
                    <Image
                      src="/download/linkedin-icon.png"
                      alt="img"
                      width="40px"
                      height="40px"
                      priority
                      className="w-10 h-10 rounded-0"
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a className="px-2 text-[#dddddd] hover:text-white">
                    <Image
                      src="/download/youtube-icon.png"
                      alt="img"
                      width="40px"
                      height="40px"
                      priority
                      className="w-10 h-10 rounded-0"
                    />
                  </a>
                </Link> */}
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-5 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">Company</h4>
              <ul>
                <li className="targetFoot">
                  <Link href="/about-us">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      About Us
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/benefits">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Benefits
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Help & Support
                    </a>
                  </Link>
                </li>

                {/* <li>
                  <Link href="/">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Careers
                    </a>
                  </Link>
                </li> */}

                <li>
                  <Link href="/privacy-policy">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Privacy Policy
                    </a>
                  </Link>
                </li>

                {/* <li>
                  <Link href="/terms-of-service">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Terms of Service
                    </a>
                  </Link>
                </li> */}
              </ul>
              {/*
              <div className="mr-auto place-self-center ">
                <p className="max-w-2xl mb-[15px] mt-[20px] font-light text-white md:text-md lg:text-md dark:text-white capitalize italic">
                  In partnership with
                </p>
                <Link href="/">
                  <a className="pointer-events-none inline-flex items-center justify-center p-[0px] py-0 -ml-1 mr-0 w-[145px] h-[40px] bg-no-repeat bg-[#ffffff] bg-[86%] bg-center text-base font-medium text-center  text-white border-0 border-white rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"><img src="download/al" /></a>
                </Link>
              </div> */}
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-5 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">Property for Rent</h4>
              <ul>
                <li className="targetFoot">
                  <Link href="/filter?sub_category=hdb">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">HDB</a>
                  </Link>
                </li>
                <li>
                  <Link href="/filter?sub_category=condo">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Condos
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/filter?sub_category=landed">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Landed
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/filter">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Whole Unit
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/filter">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      Room
                    </a>
                  </Link>
                </li>

                {/* <li>
                  <Link href="/">
                    <a className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-[#00ADEE]">
                      By MRT Station
                    </a>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-4/12">
            <div className="mb-5 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">Get In Touch With Us</h4>
              <ul className="max-w-md">
                <li className="pb-2 sm:pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/download/pin-icon.png"
                        alt="img"
                        width="15px"
                        height="20px"
                        priority
                        className="w-6 h-6 rounded-0"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md text-white dark:text-white">
                        Suite 22-03A International Plaza, 10 Anson Road,
                        <br />
                        Singapore 079903.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-2 sm:py-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/download/white-email-icon.png"
                        alt="img"
                        width="20px"
                        height="14px"
                        priority
                        className="w-5 h-3 rounded-0"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md text-white truncate dark:text-white">
                        <Link href="mailto:support@real-ezy.com">
                          <a>support@real-ezy.com</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </li>
                {/* <li className="py-2 sm:py-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/download/white-call-icon.png"
                        alt="img"
                        width="20px"
                        height="20px"
                        priority
                        className="w-5 h-5 rounded-0"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md text-white truncate dark:text-white">
                        <Link href="https://api.whatsapp.com/send?phone=88595303">
                          <a style={{ pointerEvents: 'none' }}>88595303</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </li> */}
              </ul>
              <div className="mr-auto place-self-center">
                <p className="max-w-2xl mb-[15px] mt-[20px] font-light text-white md:text-md lg:text-md dark:text-white ">
                  Available on iOS and Android.
                </p>
                <Link href="https://play.google.com/store/apps/details?id=com.realezy.app">
                  <a className="cursor-pointer inline-flex items-center justify-center p-[0px] py-0 -ml-1 mr-0 w-[150px] h-[45px] bg-no-repeat bg-contain bg-center text-base font-medium text-center  text-white border-0 border-white rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    <img alt="no-image" src="download/Google_Play_Store.svg" />
                  </a>
                </Link>
                <Link href="https://apps.apple.com/app/realezy/id1637788357">
                  <a className="cursor-pointer inline-flex items-center justify-center p-[0px] py-0 mr-0 w-[150px] h-[45px] ml-4 bg-no-repeat bg-contain bg-center text-base font-medium text-center  text-white border-0 border-white rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    <img alt="no-image" src="download/App_Store_(iOS).svg" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* old */}

        <div className=" w-full grid grid-cols-4 ">
          <div className="col-span-1">
            <div className="w-full flex flex-col gap-3.5">
              <Link href="/">
                <img
                  src="/download/footerlogo.png"
                  alt="white-Logo"
                  // width="280px"
                  // height="68px"
                  // priority
                  className="2xl:w-[12.6875rem] w-[10.15rem] 2xl:h-[4.25rem] h-[3.4rem] "
                />
              </Link>
              <div className="flex flex-col gap-1">
                <h1 className="font-segoe font-semibold text-[#FFFFFF] 2xl:text-[1.75rem]/[2.25rem] text-[1.4rem]/[1.8rem] tracking-[0.56px] capitalize">
                  Real Ezy Pte Ltd
                </h1>
                <p className=" font-segoe font-normal text-[#E9F2FC] 2xl:text-lg/[1.5rem] text-base/[1.2rem]">
                  UEN: 202126955R
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <h1 className="font-roboto font-medium text-[#E9F2FC] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                  Registered address
                </h1>
                <p className=" font-roboto font-[300] tracking-[0.17px] text-[#E9F2FC] 2xl:text-[1.0625rem]/[1.625rem] text-base/[1.125rem]">
                  22-03A International Plaza, <br /> 10 Anson Road, Singapore 079903
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-roboto font-medium text-[#FFFFFF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.4px]">
                  Available on iOS and Android
                </h1>
                <div className="flex gap-[1.125rem]">
                  <Link href="https://play.google.com/store/apps/details?id=com.realezy.app">
                    <img
                      alt="Google_Play_Store"
                      src="download/Google_Play_Store.svg"
                      className=" cursor-pointer 2xl:w-[10.5rem] w-auto 2xl:h-[3rem] h-[2.4rem]"
                    />
                  </Link>
                  <Link href="https://apps.apple.com/app/realezy/id1637788357">
                    <img
                      alt="App_Store"
                      src="download/App_Store_(iOS).svg"
                      className="cursor-pointer 2xl:w-[10.5rem] w-auto 2xl:h-[3rem] h-[2.4rem]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="flex flex-col mt-8">
              <h1 className="font-roboto font-bold text-[#FFFFFF] 2xl:text-[1.5625rem]/[1.5rem] text-xl/[1.25rem] tracking-[0.4px] capitalize">
                General Enquiries
              </h1>
              <Link href="mailto:support@real-ezy.com">
                <div className="flex cursor-pointer items-center mt-[2.75rem] gap-[1.125rem]">
                  <Image
                    src="/download/white-email-icon.png"
                    alt="img"
                    width="25px"
                    height="18px"
                    priority
                  // className="w-6 h-4"
                  />
                  <p className=" font-normal font-roboto  text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    support@real-ezy.com
                  </p>
                </div>
              </Link>

              <div className=" flex  mt-8 gap-7 items-center">
                <Link href="https://www.facebook.com/MyRealEzy?mibextid=D4KYlr">
                  <a target="_blank">
                    <Image
                      src="/download/facebook-icon.png"
                      alt="img"
                      width="40px"
                      height="40px"
                      priority
                      className="cursor-pointer"
                    />
                  </a>
                </Link>
                <Link href="https://instagram.com/myrealezy?igshid=NTc4MTIwNjQ2YQ==">
                  <a target="_blank">
                    <Image
                      src="/download/instagram.png"
                      alt="img"
                      width="40px"
                      height="40px"
                      priority
                      className="cursor-pointer"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="flex flex-col mt-8 ">
              <h1 className="font-roboto font-bold text-[#FFFFFF] 2xl:text-[1.5625rem]/[1.5rem] text-xl/[1.25rem] tracking-[0.4px] capitalize">
                Site Map
              </h1>
              <div className="flex flex-col mt-[2.75rem] gap-[1.125rem]">
                <Link href="/about-us">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    About Us
                  </p>
                </Link>
                <Link href="/benefits">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    Benefits
                  </p>
                </Link>
                <Link href="/faq">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    Help & Support
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="flex flex-col mt-8 ">
              <h1 className="font-roboto font-bold text-[#FFFFFF] 2xl:text-[1.5625rem]/[1.5rem] text-xl/[1.25rem] tracking-[0.4px] capitalize">
                Categories
              </h1>
              <div className="flex flex-col mt-[2.75rem] gap-[1.125rem]">
                <Link href="/filter">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    HDB
                  </p>
                </Link>
                <Link href="/filter">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    Condos
                  </p>
                </Link>
                <Link href="/filter">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    Landed
                  </p>
                </Link>
                <Link href="/filter">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    Whole Unit
                  </p>
                </Link>
                <Link href="/filter">
                  <p className=" font-normal font-roboto cursor-pointer text-[#F1F7FF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                    Room
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-t-[#FFFFFF] border-opacity-40 py-4 lg:mt-[40px]">
        <div className="w-[90%] md:w-full m-auto">
          <div className="">
            <div className="">
              <div className="flex justify-between  ">
                <p className="font-roboto font-[300] text-[#FFFFFF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                  © Copyright Real Ezy Pte Ltd 2023
                </p>
                <div className="flex gap-7">
                  <Link href="/terms-of-use">
                    <p className="font-roboto font-[300] cursor-pointer text-[#FFFFFF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                      Terms of Use
                    </p>
                  </Link>
                  <Link href="/privacy-policy">
                    <p className="font-roboto font-[300] cursor-pointer text-[#FFFFFF] 2xl:text-[1.25rem]/[1.5rem] text-base/[1.2rem] tracking-[0.2px]">
                      Privacy Policy
                    </p>
                  </Link>
                </div>
              </div>
              <div className="my-1 items-center justify-center md:justify-center hidden">
                <div className="-mx-3">
                  <Link href="/">
                    <a className="px-3 text-base text-[#f3f4fe] hover:text-[#00ADEE]">Privacy policy</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2 hidden">
              <div className="my-1 items-center justify-end md:justify-end hidden">
                <div className="-mx-3">
                  <Link href="/">
                    <a className="px-3 text-base text-[#f3f4fe] hover:text-[#00ADEE]">Privacy policy</a>
                  </Link>
                </div>
              </div>
              <div className="my-1 justify-center md:justify-center hidden">
                <p className="text-base text-[#f3f4fe]">© Copyright Real Ezy Pte Ltd 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
