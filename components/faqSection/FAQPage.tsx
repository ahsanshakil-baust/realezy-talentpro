// import { useRouter } from 'next/router'
import lander from '@/lib/homefaq/faqLandlord.json'
import tener from '@/lib/homefaq/faqTenant.json'
import { useState, useRef } from 'react'

import { Tabs, Button, TabsRef } from 'flowbite-react'
// import ProdSliderContent from '../home/HomePage/ProdSliderContent/ProdSliderContent'
// import AccordionWithExpandIcons from '../accordion/Accordion'
// import Link from 'next/link'
import AccordionFaqPage from '../accordion/AccordionFaqPage'
import { useRouter } from 'next/router'

const FAQPage = () => {
  // Object.values(lander.data[5].content).map(val => console.log(val.rooms))
  const router = useRouter()

  const { param } = router.query
  const value = parseInt(param as string)

  const [activeTab, setActiveTab] = useState<number>(value || 0)
  // const tabsRef = useRef<TabsRef>(value||null)
  const tabsRef = useRef<TabsRef>(null)

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
  const landlordItems = lander.data
  const tenantItems = tener.data

  return (
    <>
      <div className=" w-full flex flex-col  justify-center items-center pt-4 md:pt-8 xl:pt-12 pb-8 md:pb-12 xl:pb-16 ">
        <h3 className="text-[#034EA1] text-xl sm:text-2xl xl:text-3xl font-semibold capitalize font-roboto ">
          Help & Support
        </h3>
        {/* <div className="w-full flex items-center justify-center mb-8">
              <h1 className="  text-[#034EA1] text-3xl lg:text-4xl font-bold capitalize font-roboto ">
                Need Help? Check out our FAQs
              </h1>
            </div> */}
        <div className=" w-full flex flex-col justify-center items-center mt-2 md:mt-4 xl:mt-8  ">
          <div className="w-full mb-6 md:mb-8 xl:mb-12  flex flex-col justify-center items-center ">
            <Button.Group className=" gap-4 md:gap-6 xl:gap-8 ">
              <button
                color=""
                className={
                  activeTab
                    ? ' bg-[#FFFFFF] cursor-pointer text-[#034EA1] border border-solid border-[#034EA1] text-base lg:text-xl tracking-[0.48px] font-medium px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4  rounded-[10px] uppercase'
                    : ' bg-[#034ea1] cursor-pointer text-white text-base lg:text-xl tracking-[0.48px] font-medium px-4 sm:px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4 rounded-[10px] uppercase'
                }
                onClick={() => tabsRef.current?.setActiveTab(0)}>
                Landlord
              </button>
              <button
                color=""
                className={
                  activeTab
                    ? ' bg-[#00ADEE] cursor-pointer text-white text-base lg:text-xl tracking-[0.48px] font-medium px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4  rounded-[10px] uppercase'
                    : ' bg-[#FFFFFF] cursor-pointer text-[#00ADEE] border border-solid border-[#00ADEE] text-base lg:text-xl tracking-[0.48px] font-medium px-6 py-3 md:px-10 md:py-3 xl:px-14 xl:py-4  rounded-[10px] uppercase'
                }
                onClick={() => tabsRef.current?.setActiveTab(1)}>
                Tenant
              </button>
            </Button.Group>

            <img
              src="download/undraw_house_searching.svg"
              alt="undraw"
              className="hidden w-[460px] h-[360px] xl:h-[296px]  2xl:w-[520px] "
            />
          </div>
          <div className="w-full ">
            <div className="prod-tab-content">
              <Tabs.Group
                aria-label="hm-product-tab"
                style="default"
                ref={tabsRef}
                onActiveTabChange={tab => setActiveTab(tab)}
                className="w-full p-0 accordion-tab-group">
                <Tabs.Item title="" active={activeTab === 0}>
                  <AccordionFaqPage item={landlordItems} />
                </Tabs.Item>
                <Tabs.Item title="" active={activeTab === 1}>
                  {/* <ProdSliderContent cards={cards} className="m-0" /> */}
                  <AccordionFaqPage item={tenantItems} />
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
        </div>

        {/* <button className=" xl:px-6 xl:py-3 px-6 py-3 mt-6 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px] uppercase text-[18px] lg:text-[24px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] ">
          Explore More
        </button> */}
      </div>

      {/**product slider with tab**/}
    </>
  )
}

export default FAQPage
