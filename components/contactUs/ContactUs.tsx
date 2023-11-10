// import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'
import HmContactUs from '../hmContactUs/HmContactUs'

const ContactUs = () => {
  return (
    <>
      <section id="home" className="relative overflow-hidden bg-inherit pt-[0px] md:pt-[0px] lg:pt-[0px]  ">
        <div className="w-full">
          {/* <div className="wow fadeInUp" data-wow-delay=".2s" style={{ animationDelay: '0.2s', visibility: 'visible' }}>
            <div className=" flex flex-wrap">
              <div className="w-full px-4 mt-3">
                <section className="relative z-20 overflow-hidden bg-inherit ">
                  <div className="container">
                    <div className=" flex flex-wrap">
                      <div className="w-full px-0 lg:w-full">
                        <div className="w-full px-0">
                          <div className="mb-0 max-w-[620px] lg:mb-0">
                            <h2 className="mb-4 text-[25px] font-bold text-[#034EA1] sm:text-[25px] md:text-[35px]">
                              Contact Us
                            </h2>
                          </div>
                        </div>
                        <div className="m-0 text-justify">
                          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-4/12">
                            <div className="mb-5 w-full">
                              <h4 className="mb-9 text-lg font-semibold text-black">Get In Touch With Us</h4>
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
                                        className="w-6 h-6 rounded-0 bg-[#034EA1]"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-md text-black dark:text-black">
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
                                        className="w-5 h-3 rounded-0 bg-[#034EA1]"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-md text-black truncate dark:text-black">
                                        <Link href="mailto:support@real-ezy.com">
                                          <a>support@real-ezy.com</a>
                                        </Link>
                                      </p>
                                    </div>
                                  </div>
                                </li>
                                <li className="py-2 sm:py-2">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                      <Image
                                        src="/download/white-call-icon.png"
                                        alt="img"
                                        width="20px"
                                        height="20px"
                                        priority
                                        className="w-5 h-5 rounded-0 bg-[#034EA1]"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-md text-black truncate dark:text-black">
                                        <Link href="https://api.whatsapp.com/send?phone=88595303">
                                          <a style={{ pointerEvents: 'none' }}>88595303</a>
                                        </Link>
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <div className="mr-auto place-self-center">
                                <p className="max-w-2xl mb-[15px] mt-[20px] font-light text-black md:text-md lg:text-md dark:text-black capitalize">
                                  Available on iOS and Android.
                                </p>
                                <Link href="https://play.google.com/store/apps/details?id=com.realezy.app">
                                  <a className="inline-flex items-center justify-center p-[0px] py-0 -ml-1 mr-0 w-[150px] h-[45px] bg-no-repeat bg-[#034EA1] bg-center text-base font-medium text-center  text-black border-0 border-white rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                    <img src="download/Google_Play_Store.svg" />
                                  </a>
                                </Link>
                                <Link href="https://apps.apple.com/app/realezy/id1637788357">
                                  <a className="inline-flex items-center justify-center p-[0px] py-0 mr-0 w-[150px] h-[45px] ml-4 bg-no-repeat bg-[#034EA1] bg-center text-base font-medium text-center  text-black border-0 border-white rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                    <img src="download/App_Store_(iOS).svg" />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div> */}
          <HmContactUs />
        </div>
      </section>
    </>
  )
}

export default ContactUs
