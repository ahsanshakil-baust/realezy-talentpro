// import { useRouter } from 'next/router'
// import lander from '@/lib/homefaq/faqLandlord.json'
// import tener from '@/lib/homefaq/faqTenant.json'
import { useState, useRef } from 'react'

import { Tabs, Button, TabsRef } from 'flowbite-react'
// import ProdSliderContent from '../home/HomePage/ProdSliderContent/ProdSliderContent'
// import AccordionWithExpandIcons from '../accordion/Accordion'
// import Link from 'next/link'
// import AccordionFaqPage from '../accordion/AccordionFaqPage'

const BenefitsPage = () => {
  // Object.values(lander.data[5].content).map(val => console.log(val.rooms))
  const [activeTab, setActiveTab] = useState<number>(0)
  const tabsRef = useRef<TabsRef>(null)

  return (
    <>
      <section className=" w-full flex justify-center 2xl:pt-[40px] md:pt-[3.75rem] pt-[2.75rem] 2xl:pb-[80px] md:pb-[80px] pb-[4rem] z-20  ">
        <div className=" w-[90%] md:w-full relative">
          <div className=" absolute right-0">
            <div className="w-full  flex justify-end  ">
              <Button.Group className=" gap-4 md:gap-6">
                <button
                  color=""
                  className={
                    activeTab
                      ? ' bg-transparent cursor-pointer text-[#034EA1] border border-[#034EA1] 2xl:text-[20px] md:text-[20px] text-[20px] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal w-[158px] h-[58px] rounded-[10px] capitalize'
                      : ' bg-[#034ea1] cursor-pointer text-[#FFFFFF] border border-[#034EA1] 2xl:text-[20px] md:text-[20px] text-[20px] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal w-[158px] h-[58px] rounded-[10px] capitalize'
                  }
                  onClick={() => tabsRef.current?.setActiveTab(0)}>
                  Landlord
                </button>
                <button
                  color=""
                  className={
                    activeTab
                      ? ' bg-[#00ADEE] cursor-pointer  text-[#FFFFFF] border border-[#00ADEE] 2xl:text-[20px] md:text-[20px] text-[20px] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal  w-[158px] h-[58px] rounded-[10px] capitalize'
                      : ' bg-transparent cursor-pointer  text-[#00ADEE] border border-[#00ADEE] 2xl:text-[20px] md:text-[20px] text-[20px] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal w-[158px] h-[58px] rounded-[10px] capitalize'
                  }
                  onClick={() => tabsRef.current?.setActiveTab(1)}>
                  Tenant
                </button>
              </Button.Group>
            </div>
          </div>

          <div className="w-full  ">
            <div className="prod-tab-content">
              <Tabs.Group
                aria-label="hm-product-tab"
                style="default"
                ref={tabsRef}
                onActiveTabChange={tab => setActiveTab(tab)}
                className="w-full !p-0 accordion-tab-group ">
                <Tabs.Item active title="" className=" !p-0">
                  <div className="w-full">
                    <div className=" w-full flex flex-col z-10 ">
                      <div className=" flex items-center">
                        <img
                          alt="no-image"
                          src="/aboutUs/hexagon-icon-lc.svg"
                          className="2xl:w-[2.125rem] w-[1.7rem] 2xl:h-[1.875rem] h-[1.5rem]"
                        />
                        <p className=" 2xl:ml-4 md:ml-[0.8rem] ml-[0.7rem] text-[#034EA1] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.4rem]/[1.9rem] 2xl:tracking-[0.06rem] md:tracking-[0.048rem] tracking-[0.038rem]    font-roboto font-bold capitalize text-left">
                          Benefits to Landlord
                        </p>
                      </div>

                      <section className="relative  bg-inherit pt-[2.5rem] md:pt-[3.2rem] 2xl:pt-[3.2rem]  ">
                        <div className="container">
                          <div
                            className="wow fadeInUp"
                            data-wow-delay=".2s"
                            style={{ animationDelay: '0.2s', visibility: 'visible' }}>
                            <div className=" flex flex-wrap">
                              <div className="w-full px-0 mt-3">
                                <section className="relative z-20 overflow-hidden bg-inherit ">
                                  <div className="container">
                                    <div className=" flex flex-wrap">
                                      <div className="w-full px-0 lg:w-full">
                                        <div className="m-0 text-justify">
                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" /> Free property listing
                                          </h3>
                                          <p
                                            className="wow fadeInUp ml-[34px] mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Take photos of your rental property, and upload it to our platform
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  No gatekeepers
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Communicate directly with prospective tenants
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Screened tenants
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Prospective tenants are authenticated using pay slips for locals and
                                            proof of employment for foreigners; as well as video identify proof. They
                                            are also assessed for credit worthiness using our SMART eligibility tool and
                                            CBS reports (for locals).
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  E-Tenancy agreement
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Vetted by lawyers. You will also be able to input additional clauses that
                                            you and prospective tenant have agreed upon
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Landlord protection
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-3 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            The first-of-its-kind insurance plan for landlords in Singapore - rental
                                            protection plus household insurance plan. Broadly, it covers:
                                          </p>

                                          <div className="mb-6">
                                            <ul className="w-full ml-[34px] rounded-lg mt-0 mb-5 text-body-color">
                                              <li className="mb-[0px]">
                                                <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
                                                  <div className=" w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
                                                  <h4 className="wow fadeInUp mb-0 text-[#000000] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                                                    rental income loss;
                                                  </h4>
                                                </a>
                                              </li>
                                              <li className="mb-[0px]">
                                                <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
                                                  <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
                                                  <h4 className="wow fadeInUp mb-0 text-[#000000] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                                                    damage to household content due to fire, malicious damage and so on;
                                                    reinstatement of interior fixtures & fittings;
                                                  </h4>
                                                </a>
                                              </li>
                                              <li className="mb-[0px]">
                                                <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
                                                  <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
                                                  <h4 className="wow fadeInUp mb-0 text-[#000000] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                                                    legal cost and expenses, eviction & clean-up
                                                  </h4>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Landlord Support
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-3 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Our Managed Services include :
                                          </p>

                                          <div className="mb-6">
                                            <ul className="w-full ml-[34px] rounded-lg mt-0 mb-0 text-body-color">
                                              <li className="mb-[0px]">
                                                <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
                                                  <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
                                                  <h4 className="wow fadeInUp mb-0 text-[#000000] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                                                    connecting landlords with trustworthy vendors to fulfil tenant’s
                                                    requests for maintenance or repairs;
                                                  </h4>
                                                </a>
                                              </li>
                                              <li className="mb-[0px]">
                                                <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
                                                  <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
                                                  <h4 className="wow fadeInUp mb-0 text-[#000000] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                                                    communicating with tenants on those needs
                                                  </h4>
                                                </a>
                                              </li>
                                              <li className="mb-[0px]">
                                                <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
                                                  <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
                                                  <h4 className="wow fadeInUp mb-0 text-[#000000] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
                                                    rent payment notification & reminders, including late payment
                                                    interest calculation & disbursement
                                                  </h4>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Insurance claims
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Assistance in filing paperwork and making claims
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Eviction support
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Assistance with and enforcement of eviction; and working with the Singapore
                                            Police Force, if necessary
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Lease renewal or extension
                                          </h3>

                                          <p
                                            className="wow fadeInUp ml-[34px] mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Notification and reminders to prepare you for the next plan of action
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="" className=" ">
                  <div className="w-full ">
                    <div className=" w-full flex flex-col z-10  ">
                      <div className=" flex items-center">
                        <img
                          alt="no-image"
                          src="/aboutUs/hexagon-icon-tc.svg"
                          className="2xl:w-[2.125rem] w-[1.7rem] 2xl:h-[1.875rem] h-[1.5rem]"
                        />
                        <p className=" 2xl:ml-4 md:ml-[0.8rem] ml-[0.7rem] text-[#00ADEE] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.4rem]/[1.9rem] 2xl:tracking-[0.06rem] md:tracking-[0.048rem] tracking-[0.038rem]    font-roboto font-bold capitalize text-left">
                          Benefits to Tenant
                        </p>
                      </div>

                      <section className="relative  bg-inherit pt-[2.5rem] md:pt-[3.2rem] 2xl:pt-[3.2rem]  ">
                        <div className="container">
                          <div
                            className="wow fadeInUp"
                            data-wow-delay=".2s"
                            style={{ animationDelay: '0.2s', visibility: 'visible' }}>
                            <div className=" flex flex-wrap">
                              <div className="w-full mt-3">
                                <section className="relative z-20 overflow-hidden bg-inherit ">
                                  <div className="container">
                                    <div className=" flex flex-wrap">
                                      <div className="w-full px-0 lg:w-full">
                                        <div className="m-0 text-justify">
                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Deposit-free rental
                                          </h3>
                                          <p
                                            className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            No security is collected, freeing you from hefty cash commitment
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Verified landlords
                                          </h3>

                                          <p
                                            className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            All listings are posted by property owners who have been authenticated and
                                            verified.
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  No gatekeepers
                                          </h3>

                                          <p
                                            className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Communicate directly with potential landlords
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  e-Tenancy Agreement
                                          </h3>

                                          <p
                                            className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Vetted by lawyers. You will also be able to input additional clauses that
                                            you and potential landlord have agreed upon
                                          </p>

                                          <h3
                                            className="wow fadeInUp flex mb-3 font-bold font-roboto text-[#000000] text-base/[1.25rem] md:text-[1.1rem]/[1.35rem] 2xl:text-[1.375rem]/[1.6875rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            <img alt="no-image" src="/download/tick-icon.svg" className="w-[20px] mt-[1px] mr-3" />  Tenant Support
                                          </h3>

                                          <p
                                            className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
                                            data-wow-delay=".1s"
                                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                                            Our Managed Services ensure that you’ll have our Customer Support Officers
                                            to turn to for maintenance & repairs requests as well as rent payment
                                            notifications & reminders.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
        </div>
      </section>

      {/**product slider with tab**/}
    </>
  )
}

export default BenefitsPage

// <div className=" w-full xs:hidden flex flex-col  justify-center items-center pt-4 md:pt-8 xl:pt-12 pb-8 md:pb-12 xl:pb-16 ">
//   <div className="w-full flex items-center justify-between mb-3 lg:mb-5 xl:mb-6 2xl:mb-8">
//     {/* <h1
//       className="!w-full !text-[#034EA1] font-roboto font-bold 2xl:text-[2.85rem]/[3.25rem] md:text-[2.28rem]/[2.6rem] text-[1.5rem]/[1.9rem] 2xl:tracking-[0.05rem] md:tracking-[0.04rem] tracking-[0.03rem] "
//       style={{ lineHeight: '45px' }}>
//       Benefits to Landlord & Tenant
//     </h1> */}
//     <div className=" flex items-center">
//       <img alt="no-image" src="/aboutUs/hexagon-icon-tc.svg" />
//       <p className=" 2xl:ml-4 md:ml-[0.8rem] ml-[0.7rem] text-[#00ADEE] 2xl:text-[3rem]/[3.625rem] md:text-[2.4rem]/[2.9rem] text-[1.4rem]/[1.9rem] 2xl:tracking-[0.06rem] md:tracking-[0.048rem] tracking-[0.038rem] font-roboto font-bold text-left">
//         Benefits to Landlord and Tenant
//       </p>
//     </div>{' '}
//     <br />
//     <div className=" lg:flex w-[30%] controls items-center justify-end   gap-2  ">
//       <Button.Group className=" gap-4 md:gap-6 xl:gap-8 ">
//         <button
//           color=""
//           className={
//             activeTab
//               ? ' bg-[#FFFFFF] text-[#00ADEE] border-2 border-solid border-[#00ADEE] text-base lg:text-xl tracking-[0.48px] font-medium  px-4 sm:px-6 py-2 md:px-10 md:py-2 xl:px-10 xl:py-2 rounded-[10px]'
//               : ' bg-[#034ea1] text-white text-base lg:text-xl tracking-[0.48px] font-medium  px-4 sm:px-6 py-2 md:px-10 md:py-2 xl:px-10 xl:py-2 rounded-[10px]'
//           }
//           onClick={() => tabsRef.current?.setActiveTab(0)}>
//           Landlord
//         </button>
//         <button
//           color=""
//           className={
//             activeTab
//               ? ' bg-[#034ea1] text-white text-base lg:text-xl tracking-[0.48px] font-medium  px-4 sm:px-6 py-2 md:px-10 md:py-2 xl:px-10 xl:py-2 rounded-[10px]'
//               : ' bg-[#FFFFFF] text-[#00ADEE] border-2 border-solid border-[#00ADEE] text-base lg:text-xl tracking-[0.48px] font-medium  px-4 sm:px-6 py-2 md:px-10 md:py-2 xl:px-10 xl:py-2 rounded-[10px]'
//           }
//           onClick={() => tabsRef.current?.setActiveTab(1)}>
//           Tenant
//         </button>
//       </Button.Group>
//     </div>
//   </div>
//   <div className=" w-full flex flex-col justify-center items-center mt-2 md:mt-4 xl:mt-8  ">
//     <div className="w-full ">
//       <div className="prod-tab-content">
//         <Tabs.Group
//           aria-label="hm-product-tab"
//           style="default"
//           ref={tabsRef}
//           onActiveTabChange={tab => setActiveTab(tab)}
//           className="w-full p-0 accordion-tab-group">
//           <Tabs.Item active title="">
//             <section className="relative overflow-hidden bg-inherit pt-[0px] md:pt-[0px] lg:pt-[0px]  ">
//               <div className="container">
//                 <div
//                   className="wow fadeInUp"
//                   data-wow-delay=".2s"
//                   style={{ animationDelay: '0.2s', visibility: 'visible' }}>
//                   <div className=" flex flex-wrap">
//                     <div className="w-full px-4 mt-3">
//                       <section className="relative z-20 overflow-hidden bg-inherit ">
//                         <div className="container">
//                           <div className=" flex flex-wrap">
//                             <div className="w-full px-0 lg:w-full">
//                               <div className="m-0 text-justify">
//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   1. Free property listing
//                                 </h3>
//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Take photos of your rental property, and upload it to our platform
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   2. No gatekeepers
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Communicate directly with prospective tenants
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   3. Screened tenants
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Prospective tenants are authenticated using pay slips for locals and proof of
//                                   employment for foreigners; as well as video identify proof. They are also
//                                   assessed for credit worthiness using our SMART eligibility tool and CBS reports
//                                   (for locals).
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   4. E-Tenancy agreement
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Vetted by lawyers. You will also be able to input additional clauses that you
//                                   and prospective tenant have agreed upon
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   5. Landlord protection
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   The first-of-its-kind insurance plan for landlords in Singapore - rental
//                                   protection plus household insurance plan. Broadly, it covers:
//                                 </p>

//                                 <div>
//                                   <ul className="w-full rounded-lg mt-0 mb-8 text-body-color">
//                                     <li className="mb-[2px]">
//                                       <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
//                                         <div className=" w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
//                                         <h4 className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
//                                           rental income loss;
//                                         </h4>
//                                       </a>
//                                     </li>
//                                     <li className="mb-[2px]">
//                                       <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
//                                         <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
//                                         <h4 className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
//                                           damage to household content due to fire, malicious damage and so on;
//                                           reinstatement of interior fixtures & fittings;
//                                         </h4>
//                                       </a>
//                                     </li>
//                                     <li className="mb-[2px]">
//                                       <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
//                                         <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
//                                         <h4 className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
//                                           legal cost and expenses, eviction & clean-up
//                                         </h4>
//                                       </a>
//                                     </li>
//                                   </ul>
//                                 </div>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   6. Landlord Support
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Our Managed Services include :
//                                 </p>

//                                 <div>
//                                   <ul className="w-full rounded-lg mt-0 mb-8 text-body-color">
//                                     <li className="mb-[2px]">
//                                       <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
//                                         <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
//                                         <h4 className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
//                                           connecting landlords with trustworthy vendors to fulfil tenant’s
//                                           requests for maintenance or repairs;
//                                         </h4>
//                                       </a>
//                                     </li>
//                                     <li className="mb-[2px]">
//                                       <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
//                                         <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
//                                         <h4 className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
//                                           communicating with tenants on those needs
//                                         </h4>
//                                       </a>
//                                     </li>
//                                     <li className="mb-[2px]">
//                                       <a href="" className="w-full flex gap-2 py-0 pointer-events-none">
//                                         <div className="w-4 h-4 rounded-full border-[3px] border-[#909090] mt-2"></div>
//                                         <h4 className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]">
//                                           rent payment notification & reminders, including late payment interest
//                                           calculation & disbursement
//                                         </h4>
//                                       </a>
//                                     </li>
//                                   </ul>
//                                 </div>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   7. Insurance claims
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Assistance in filing paperwork and making claims
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   8. Eviction support
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Assistance with and enforcement of eviction; and working with the Singapore
//                                   Police Force, if necessary
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   9. Lease renewal or extension
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Notification and reminders to prepare you for the next plan of action
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </Tabs.Item>
//           <Tabs.Item title="">
//             <section className="relative overflow-hidden bg-inherit pt-[0px] md:pt-[0px] lg:pt-[0px]  ">
//               <div className="container">
//                 <div
//                   className="wow fadeInUp"
//                   data-wow-delay=".2s"
//                   style={{ animationDelay: '0.2s', visibility: 'visible' }}>
//                   <div className=" flex flex-wrap">
//                     <div className="w-full px-4 mt-3">
//                       <section className="relative z-20 overflow-hidden bg-inherit ">
//                         <div className="container">
//                           <div className=" flex flex-wrap">
//                             <div className="w-full px-0 lg:w-full">
//                               <div className="m-0 text-justify">
//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   1. Deposit-free rental
//                                 </h3>
//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   No security is collected, freeing you from hefty cash commitment
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   2. Verified landlords
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   All listings are posted by property owners who have been authenticated and
//                                   verified.
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   3. No gatekeepers
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Communicate directly with potential landlords
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   4. e-Tenancy Agreement
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Vetted by lawyers. You will also be able to input additional clauses that you
//                                   and potential landlord have agreed upon
//                                 </p>

//                                 <h3
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   5. Tenant Support
//                                 </h3>

//                                 <p
//                                   className="wow fadeInUp mb-6 text-[#202020] font-normal font-segoe 2xl:text-[1.25rem]/[1.875rem] md:text-[1.1rem]/[1.6rem] text-[0.8rem]/[1.3rem]"
//                                   data-wow-delay=".1s"
//                                   style={{ animationDelay: '0.1s', visibility: 'visible' }}>
//                                   Our Managed Services ensure that you’ll have our Customer Support Officers to
//                                   turn to for maintenance & repairs requests as well as rent payment notifications
//                                   & reminders.
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </section>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </Tabs.Item>
//         </Tabs.Group>
//       </div>
//     </div>
//   </div>

// </div>
