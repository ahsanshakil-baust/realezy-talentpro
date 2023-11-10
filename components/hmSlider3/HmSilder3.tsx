// import { useRouter } from 'next/router'
// import { useState, useRef } from 'react'

// import { Tabs, Button, TabsRef } from 'flowbite-react'
// import { ClassNames } from '@emotion/react'

import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
// import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Hm4SliderContent from '../home/HomePage/hm4SliderContent/Hm4SliderContent'
// import { useGetPropertyByRentTypeQuery } from '@/store'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setSliderList } from '@/store'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  className: string
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TypeList = [' ', 'condo', 'hdb', 'landed', 'whole unit', 'room']
const HmSlider3 = () => {
  const refDiv: any = React.useRef()
  const [list, setList]: any = React.useState([])
  const [scroll, setScroll] = React.useState(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const scrollEvent = () => {
      if (refDiv.current?.getBoundingClientRect().top <= 680 && refDiv.current?.getBoundingClientRect().top >= 0) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [])

  const listArr = useSelector((state: any) => state.entities.slider.sliderList)
  React.useEffect(() => {
    if (scroll) {
      const listArray = refDiv.current?.querySelectorAll('.slick-active')
      const lists: string[] = []
      listArray?.forEach((el: any) => {
        lists.push(el.querySelector('h2')?.textContent)
      })

      dispatch(setSliderList([...lists]))
    }
  }, [scroll, dispatch])
  console.log(listArr)

  const [subCategory, setSubCategory] = React.useState('condo')
  const [value, setValue] = React.useState(0)
  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (newValue === 1) {
      setSubCategory('condo')
    } else if (newValue === 2) {
      setSubCategory('hdb')
    } else if (newValue === 3) {
      setSubCategory('landed')
    } else {
      setSubCategory('all')
    }
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
  //     id: '1',
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
  //     id: '2',
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
  //     id: '3',
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
  //     id: '4',
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
  //     id: '4',
  //   },
  // ]

  return (
    <>
      <div className=" py-[15px] sm:py-[25px] md:py-[25px] lg:py-[25px] xl:py-[25px] 2xl:py-[25px] w-full flex flex-col items-center justify-center ">
        <div className="w-full">
          {/* <div className="tabs-btn float-right">
            <Button.Group>
              <Button color=""  className=  {activeTab? ' bg-transparent border-b-2 border-b-[#FFFFFF] font-medium  !text-2xl !rounded-none' : ' bg-transparent font-medium border-b-2 border-b-[#00adee] text-[#00adee] !text-2xl !rounded-none' }  onClick={() => tabsRef.current?.setActiveTab(0)}>
                Condo
              </Button>
              <Button color=""  className=  {activeTab?' bg-transparent font-medium border-b-2 border-b-[#00adee] text-[#00adee] !text-2xl !rounded-none' :  ' bg-transparent border-b-2 border-b-[#FFFFFF] font-medium  !text-2xl !rounded-none'  } onClick={() => tabsRef.current?.setActiveTab(1)}>
                HDB
              </Button>
              <Button color=""  className=  ' bg-transparent font-medium ' onClick={() => tabsRef.current?.setActiveTab(2)}>
                Landed
              </Button>
              <Button color="" className=  ' bg-transparent font-medium '  onClick={() => tabsRef.current?.setActiveTab(3)}>
                Whole Unit
              </Button>
              <Button color="" className= ' bg-transparent font-medium 'onClick={() => tabsRef.current?.setActiveTab(4)}>
                Room
              </Button>
            </Button.Group>
          </div>
          <div className="">
            <Tabs.Group
              aria-label="hm-product-tab"
              style="default"
              ref={tabsRef}
              onActiveTabChange={tab => setActiveTab(tab)}
              className="w-full "
            >
              <Tabs.Item active title="">
                <ProdSliderContent cards={cards} />
              </Tabs.Item>
              <Tabs.Item title="">
                <ProdSliderContent cards={cards} />
              </Tabs.Item>
              <Tabs.Item title="">
                <ProdSliderContent cards={cards} />
              </Tabs.Item>
              <Tabs.Item title="">
                <ProdSliderContent cards={cards} />
              </Tabs.Item>
              <Tabs.Item title="">
                <ProdSliderContent cards={cards} />
              </Tabs.Item>
            </Tabs.Group>
          </div> */}

          <Box ref={refDiv} id="listing__slider" sx={{ width: '100%' }} className=" !flex !flex-col !items-start">
            <h3 className="hidden text-[#00ADEE] text-[16px] lg:text-[20px] xl:text-[22.5px] 2xl:text-[30px] tracking-[0.6px] text-left font-normal capitalize font-roboto">
              Property Type
            </h3>
            <div className="w-full flex items-center justify-between mb-3 md:mb-5 2xl:mb-6">
              <h1 className="!w-full lg:!w-[50%] !text-[#00ADEE] text-xl lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] text-left font-roboto font-bold tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px]">
                Listings
              </h1>
              <Box sx={{}} className=" !w-full lg:!w-auto !flex !justify-start lg:!justify-end  ">
                <Tabs className="hmslider3-tab" value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab className=" !text-lg !md:text-lg text-[#00ADEE]" label="All" {...a11yProps(0)} /> {/*  ALL*/}
                  <Tab className=" !text-lg !md:text-lg text-[#00ADEE]" label="Condo" {...a11yProps(1)} />
                  <Tab className=" !text-lg !md:text-lg text-[#00ADEE]" label="HDB" {...a11yProps(2)} />
                  <Tab className=" !text-lg !md:text-lg text-[#00ADEE]" label="Landed" {...a11yProps(3)} />
                  {/* <Tab className=' !text-base !md:text-lg' label="Whole Unit" {...a11yProps(3)} />
                  <Tab className=' !text-base !md:text-lg' label="Room" {...a11yProps(4)} /> */}
                </Tabs>
              </Box>
            </div>

            <TabPanel value={value} index={0} className="!w-full">
              <Hm4SliderContent finding={TypeList[value]} />
            </TabPanel>
            <TabPanel value={value} index={1} className="!w-full ">
              <Hm4SliderContent finding={TypeList[value]} />
            </TabPanel>
            <TabPanel value={value} index={2} className="!w-full">
              <Hm4SliderContent finding={TypeList[value]} />
            </TabPanel>
            <TabPanel value={value} index={3} className="!w-full">
              <Hm4SliderContent finding={TypeList[value]} />
            </TabPanel>
            <TabPanel value={value} index={4} className="!w-full">
              <Hm4SliderContent finding={TypeList[value]} />
            </TabPanel>
          </Box>
        </div>
        {/* <Link passHref href="/filter">
          <button className=" mt-[30px] md:mt-[40px] xl:mt-[50px] xl:px-6 xl:py-3 px-6 py-3 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px]  text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer ">
            Explore More
          </button>
        </Link> */}
      </div>

      {/**product slider with tab**/}
    </>
  )
}

export default HmSlider3
