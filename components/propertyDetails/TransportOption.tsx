import { Grid } from '@mui/material'

import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
// import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Icon } from '../shared'
import Image from 'next/image'
import Train from '@/public/Icon/train.svg'
import TrainBlue from '@/public/Icon/train.png'
import Bus from '@/public/Icon/BusStation.svg'
import MRT from '@/public/Icon/MRT.svg'
import MRTInactive from '@/public/Icon/train-inactive.svg'
import TrainActive from '@/public/Icon/TrainActive.svg'
import BusActive from '@/public/Icon/BusActive.svg'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
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
      {value === index && <Box sx={{ paddingTop: '40px' }}>{children}</Box>}
    </div>
  )
}

function TransportOption() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className="hidden">
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ backgroundColor: '#ffffff', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>
          <div className="md:!px-9 !mt-7">
            <h2 className="!text-lg sm:!text-xl md:!text-2xl xl:!text-3xl !text-[#202020] !font-roboto !font-bold !mb-[6px] md:!mb-2 xl:!mb-[10px]">
              Location & Near By
            </h2>
            <p className="!text-sm md:!text-base xl:!text-lg !text-[#202020] !font-roboto !font-normal ">
              See nearby Bus & MRT station with travel time and distance.
            </p>
          </div>
          <div style={{ width: '100%' }} className=" !py-4 md:!py-9 md:!px-9">
            <Grid container>
              <Grid item xs={12} sm={10} md={8}>
                <div style={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                      icon={<Image src={value === 0 ? Train : MRTInactive} alt="" />}
                      label="MRT"
                      style={{ gap: '10px' }}
                    />
                    <Tab
                      icon={<Image src={value === 1 ? TrainActive : MRT} alt="" />}
                      label="Train"
                      style={{ gap: '10px' }}
                    />
                    <Tab
                      icon={<Image src={value === 2 ? BusActive : Bus} alt="" />}
                      label="Bus"
                      style={{ gap: '10px' }}
                    />
                  </Tabs>
                </div>
              </Grid>
            </Grid>

            <TabPanel value={value} index={0}>
              <div className=" !rounded-lg !border !border-b-1 !border-detailsCard">
                {[1, 2, 3, 4].map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="!text-[#7B6363] !gap-2 !font-medium !flex !items-center !justify-between !shadow !p-3 md:p-4 [&:not(:last-child)]:border-b-1 border-b-detailsCard first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md">
                      <div className="!flex !items-center !gap-2">
                        <Image src={TrainBlue} alt="" className="w-7 h-7 md:w-8 md:h-8 xl:w-10 xl:h-10 " />
                        <p className="text-[#7B6363] md:gap-2 font-medium text-xs sm:text-sm md:text-base xl:text-xl">
                          <span className="bg-[#7B6363] text-white font-thin px-0.5 sm:px-1 lg:px-[6px] py-[1px] sm:py-[2px] lg:py-[3px] text-xs sm:text-sm lg:text-lg">
                            NE
                          </span>{' '}
                          8 Farrer Park MRT
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5 md:w-[32px] md:h-[32px] text-[#6495CC]" name="walk" />
                        <div className="">
                          <p className="text-[#6495CC] text-xs sm:text-sm md:text-base xl:text-xl gap-2 font-medium flex items-center">
                            8 mins{' '}
                          </p>
                          <p className="text-[#6495CC] text-xs sm:text-sm md:text-base xl:text-xl gap-2 font-medium flex items-center">
                            480 m{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <div className=" !rounded-lg !border !border-b-1 !border-detailsCard">
                {[1, 2, 3, 4].map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="text-primary gap-2 font-medium flex items-center justify-between shadow p-2 md:p-7 [&:not(:last-child)]:border-b-1 border-b-detailsCard first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md">
                      <div className="flex items-center gap-2">
                        <Image src={TrainBlue} alt="" />
                        <p className="text-mrtStation md:gap-2 font-medium text-[10px] md:text-base">
                          <span className="bg-mrtStation text-white font-thin px-1 text-[10px]">NE</span> 8 Farrer Park
                          MRT
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5 md:w-[32px] md:h-[32px]" name="walk" />
                        <div className="text-[10px] md:text-base">
                          <p className="text-primary gap-2 font-medium flex items-center">8 mins </p>
                          <p className="text-primary gap-2 font-medium flex items-center">480 m </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className=" !rounded-lg !border !border-b-1 !border-detailsCard">
                {[1, 2, 3, 4].map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="text-primary gap-2 font-medium flex items-center justify-between shadow p-2 md:p-7 [&:not(:last-child)]:border-b-1 border-b-detailsCard first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md">
                      <div className="flex items-center gap-2">
                        <Image src={TrainBlue} alt="" />
                        <p className="text-mrtStation md:gap-2 font-medium text-[10px] md:text-base">
                          <span className="bg-mrtStation text-white font-thin px-1 text-[10px]">NE</span> 8 Farrer Park
                          MRT
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5 md:w-[32px] md:h-[32px] text-[#6495CC]" name="walk" />
                        <div className="text-[10px] md:text-base">
                          <p className="text-[#6495CC] gap-2 font-medium flex items-center">8 mins </p>
                          <p className="text-[#6495CC] gap-2 font-medium flex items-center">480 m </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabPanel>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.26601777838!2d90.40310325!3d23.798446300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1679981966980!5m2!1sen!2sbd"
            width="100%"
            height="560px"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </Grid>
      </Grid>
    </div>
  )
}

export default TransportOption
