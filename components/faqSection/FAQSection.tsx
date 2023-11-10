// import { useRouter } from 'next/router'
// import lander from '@/lib/homefaq/faqLandlord.json'
// import tener from '@/lib/homefaq/faqTenant.json'
import { useState, useRef, useEffect } from 'react'
import { Tabs, Button, TabsRef } from 'flowbite-react'
// import ProdSliderContent from '../home/HomePage/ProdSliderContent/ProdSliderContent'
// import AccordionWithExpandIcons from '../accordion/Accordion'
import Link from 'next/link'
import HMFAQlistLL from './HMFAQlistLL'
import HMFAQlistTT from './HMFAQlistTT'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'

const FAQSection = () => {
  // Object.values(lander.data[5].content).map(val => console.log(val.rooms))
  const [activeTab, setActiveTab] = useState<number>(0)
  const tabsRef = useRef<TabsRef>(null)

  const router = useRouter()

  const handleLLTab = () => {
    setActiveTab(0)
    router.push(`/faq?param=0`)
  }
  const handleTTTab = () => {
    setActiveTab(1)
    router.push(`/faq?param=1`)
  }

  // const cards = [
  //   {
  //     images: [
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
  //     ],
  //     address: 'Marcy Ave,Brooklyn, 12456',
  //     property: 'Awesome Family Home',
  //     price: '$10.00/mo',
  //     district: 'D8-BISHAN',
  //     type: ' Whole Unit',
  //     furnished: 'Partially Furnished',
  //     amenities: ['6', '3'],
  //     squareFeet: '1250Sq Ft',
  //     distance: '8 mins(480m) to',
  //     mrtStation: '8 Farrer Park MRT',
  //     label: 'condo',
  //   },
  //   {
  //     images: [
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
  //     ],
  //     address: 'Marcy Ave,Brooklyn, 12456',
  //     property: 'Awesome Family Home',
  //     price: '$10.00/mo',
  //     district: 'D8-BISHAN',
  //     type: ' Whole Unit',
  //     furnished: 'Partially Furnished',
  //     amenities: ['6', '3'],
  //     squareFeet: '1250Sq Ft',
  //     distance: '8 mins(480m) to',
  //     mrtStation: '8 Farrer Park MRT',
  //     label: 'condo',
  //   },
  //   {
  //     images: [
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
  //     ],
  //     address: 'Marcy Ave,Brooklyn, 12456',
  //     property: 'Awesome Family Home',
  //     price: '$10.00/mo',
  //     district: 'D8-BISHAN',
  //     type: ' Whole Unit',
  //     furnished: 'Partially Furnished',
  //     amenities: ['6', '3'],
  //     squareFeet: '1250Sq Ft',
  //     distance: '8 mins(480m) to',
  //     mrtStation: '8 Farrer Park MRT',
  //     label: 'condo',
  //   },
  //   {
  //     images: [
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
  //     ],
  //     address: 'Marcy Ave,Brooklyn, 12456',
  //     property: 'Awesome Family Home',
  //     price: '$10.00/mo',
  //     district: 'D8-BISHAN',
  //     type: ' Whole Unit',
  //     furnished: 'Partially Furnished',
  //     amenities: ['6', '3'],
  //     squareFeet: '1250Sq Ft',
  //     distance: '8 mins(480m) to',
  //     mrtStation: '8 Farrer Park MRT',
  //     label: 'condo',
  //   },
  // ]
  // const landlordItems = [
  //   {
  //     title: 'IS IT LEGAL TO RENT OUT A HDB?',
  //     content:
  //       'Only Singaporean Citizens Can Rent Out Their Whole Flat As Long As They Have Fulfilled The 5-Year Minimum Occupation Period (MOP).',
  //   },
  //   { title: 'WHAT IS THE MINIMUM RENTAL PERIOD IN SINGAPORE?', content: 'This is the content for item 2' },
  //   { title: 'WHAT IS THE MINIMUM RENTAL PERIOD IN SINGAPORE?', content: 'This is the content for item 3' },
  //   { title: 'WHAT IS THE MINIMUM RENTAL PERIOD IN SINGAPORE?', content: 'This is the content for item 4' },
  // ]
  // const landlordItems = lander.data
  // const tenantItems = tener.data

  return (
    <>
      <section className="pt-[15px] sm:pt-[25px]  md:pt-[30px] lg:pt-[35px] xl:pt-[48px] 2xl:pt-[50px] pb-[25px] sm:pb-[35px]  md:pb-[40px] lg:pb-[55px] xl:pb-[68px] 2xl:pb-[80px]  w-full flex items-center justify-center relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 overflow-hidden bg-[#FCFDFF] ">
        <div className="w-[90%] md:w-full m-auto">
          <div className=" w-full flex flex-col  justify-center ">
            <h3 className="hidden text-[#00ADEE] text-[16px] lg:text-[20px] xl:text-[22.5px] 2xl:text-[30px] tracking-[0.6px] text-left font-normal capitalize font-roboto">
              Help & Support
            </h3>
            <div className="w-full flex flex-col  mb-[2.4rem] md:mb-[3rem] 2xl:mb-[3.75rem]">
              <h1 className=" 2xl:mb-4 md:mb-[0.8rem] mb-[0.6rem] font-roboto font-bold text-[#00ADEE] 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] text-[1.6rem]/[2rem]">
                Help & Support
              </h1>
              <p className="text-[#505050] font-normal font-roboto 2xl:text-[1.5rem]/[1.875rem] md:text-[1.2rem]/[1.5rem] text-[0.9rem]/[1.2rem]">
                We answer some questions you may have about our platform and service.
              </p>

              <Link passHref href="/faq">
                <div className=" hidden lg:flex w-[60%] controls items-center justify-end   gap-2  ">
                  <p className="hidden text-[#505050] font-normal text-base lg:text-[18px] xl:text-[20px] 2xl:text-[24px] 2xl:leading-[36px] text-left font-roboto tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px] mt-2">
                    We answer some questions you may have about our platform and service.
                  </p>
                  {/* <button className=" hidden xl:px-6 xl:py-3 px-6 py-3 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px]  text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer ">
                    Explore More
                  </button> */}
                </div>
              </Link>
            </div>
            <div className=" w-full flex flex-col md:flex-row  ">
              <div className="w-full mb-6 lg:mb-0 md:w-[40%] flex flex-col  md:mr-6">
                {/* <Button.Group className=" gap-4 md:gap-6 xl:gap-8 lg:mb-4">
                  <button
                    color=""
                    className={
                      activeTab
                        ? ' bg-[#FFFFFF] text-[#00ADEE] border-2 border-solid border-[#00ADEE] text-base lg:text-xl tracking-[0.48px] font-medium px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4  rounded-[10px] uppercase'
                        : ' bg-[#034ea1] text-white text-base lg:text-xl tracking-[0.48px] font-medium px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4 rounded-[10px] uppercase'
                    }
                    onClick={() => tabsRef.current?.setActiveTab(0)}>
                    Landlord
                  </button>
                  <button
                    color=""
                    className={
                      activeTab
                        ? ' bg-[#034ea1] text-white text-base lg:text-xl tracking-[0.48px] font-medium px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4  rounded-[10px] uppercase'
                        : ' bg-[#FFFFFF] text-[#00ADEE] border-2 border-solid border-[#00ADEE] text-base lg:text-xl tracking-[0.48px] font-medium px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4  rounded-[10px] uppercase'
                    }
                    onClick={() => tabsRef.current?.setActiveTab(1)}>
                    Tenant
                  </button>
                </Button.Group> */}
                <Button.Group className=" gap-4 md:gap-6">
                  {/* <Link passHref href={`/faq?param=${activeTab}`}> */}
                  <button
                    onClick={handleLLTab}
                    color=""
                    className="hover:text-[#034ea1] hover:bg-transparent bg-[#034ea1] cursor-pointer text-[#FFFFFF] border border-[#034EA1] 2xl:text-[20px] md:text-[20px] text-[20px] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal w-[158px] h-[58px] rounded-[10px] capitalize">
                    Landlord
                  </button>
                  {/* </Link> */}
                  {/* <Link passHref href={`/faq?param=${activeTab}`}> */}
                  <button
                    onClick={handleTTTab}
                    color=""
                    className="hover:text-[#ffffff] hover:bg-[#00ADEE] bg-transparent cursor-pointer  text-[#00ADEE] border border-[#00ADEE] 2xl:text-[20px] md:text-[20px] text-[20px] 2xl:tracking-[0.03rem] md:tracking-[0.024rem] tracking-[0.014rem] font-normal w-[158px] h-[58px] rounded-[10px] capitalize">
                    Tenant
                  </button>
                  {/* </Link> */}
                </Button.Group>

                {/* <img
                  src="download/undraw_house_searching.svg"
                  alt="undraw"
                  className="hidden md:block w-[460px] h-[360px] xl:h-[296px]  2xl:w-[520px] "
                /> */}
              </div>
              <div className="w-full md:w-[60%] ">
                <img
                  src="download/undraw_house_searching.svg"
                  alt="undraw"
                  className="md:block w-full h-auto -mt-[60px] "
                />
                {/* <div className="prod-tab-content">
                  <Tabs.Group
                    aria-label="hm-product-tab"
                    style="default"
                    ref={tabsRef}
                    onActiveTabChange={tab => setActiveTab(tab)}
                    className="w-full p-0 accordion-tab-group">
                    <Tabs.Item active title="">                      
                      <HMFAQlistLL />
                       
                    </Tabs.Item>
                    <Tabs.Item title="">
                      <HMFAQlistTT />
                    </Tabs.Item>
                  </Tabs.Group> 
                </div>*/}
              </div>
            </div>

            {/* <button className=" px-8 py-4 mt-6 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px] uppercase text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] ">
          Explore More
        </button> */}
            <Link passHref href="/faq">
              <div className=" hidden w-[100%] controls items-center justify-center   gap-2 ">
                <button className=" xl:px-6 xl:py-3 px-6 py-3 mt-6 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px] text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] ">
                  Explore More
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/**product slider with tab**/}
    </>
  )
}

export default FAQSection
