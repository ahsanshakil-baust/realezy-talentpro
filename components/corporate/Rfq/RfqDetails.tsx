import { CorporateLayout } from '@/components'
import { Box, Tabs, Typography } from '@mui/material'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import RFQDetailsIcon from 'public/corporate-icon/RFQDetails.svg'
import BedIcon from 'public/corporate-icon/bed.svg'
import BathIcon from 'public/corporate-icon/bath.svg'
import AreaIcon from 'public/corporate-icon/Area.svg'
import ConnectIcon from 'public/corporate-icon/connect.svg'
import MessageIcon from 'public/corporate-icon/message.svg'
import DollorIcon from 'public/corporate-icon/dollor.svg'
import Subtraction from 'public/corporate-icon/Subtraction2.svg'
import chat from 'public/corporate-icon/chat.svg'
import marker from 'public/corporate-icon/marker.svg'
import { Tab } from '@mui/material'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'
import { showModal, useGetRfqDetailsQuery } from '@/store'
import SelectProperty from './SelectProperty'
import Link from 'next/link'
import { CircularProgress } from '@mui/material'
import TenantProfile from './TenantProfile'
import RfqInformation from './RfqInformation'

/* const TenantProfile = ()=>{
    return()
} */

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

const RfqDetails = ({ rfqid }: any) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const dispatch = useDispatch<StoreThunkDispatch>()
  const { data: rfqDetails, isLoading: rfqLoading }: any = useGetRfqDetailsQuery(rfqid)

  const handleChatButton = () => {
    dispatch(
      showModal({
        open: true,
        name: 'Select Property',
        size: 'large',
        children: <SelectProperty rfqDetails={rfqDetails} />,
      })
    )
  }

  return (
    <div className="bg-[#F1F7FF]">
      <div className="bg-primary py-5">
        <div className="pl-4">
          <p className="text-[#202020] text-2xl">RFQ Details</p>
          <p className="text-[#00ADEE] text-lg">
            RFQ Limit: 08/10 <span className="bg-[#034EA1] text-white rounded-xl px-3 py-2">Free</span>{' '}
          </p>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            '& .Mui-selected': {
              color: '#00ADEE',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#00ADEE',
            },
          }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="RFQ Information" />
            <Tab label="Tenant Profile" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <RfqInformation rfqLoading={rfqLoading} rfqDetails={rfqDetails} handleChatButton={handleChatButton} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TenantProfile userInfo={rfqDetails?.customer} />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default RfqDetails
