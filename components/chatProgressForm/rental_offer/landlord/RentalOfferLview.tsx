import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import { Tabs, Tab } from '@mui/material'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

import { demoData } from '@/util/data'
import { AiOutlineClose } from 'react-icons/ai'
import { OccupiersFormView } from './OccupiersFormView'

// const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  )
}

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   }
// }

const RentalOfferLview = () => {
  const readOnly = true
  // const [selectedValue, setSelectedValue] = React.useState('')

  // const [data, setData] = React.useState([idTypeListSin])

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm()

  // const formData = {
  //   id: 'data?.data?.makeOfferInfo?.offer_id',
  //   property_id: 'context?.value?.threadInfo?.property_id',
  //   tenant_id: 'context?.value?.propertyLandlordTenantInfo?.tenantInfo?.id',
  //   landlord_id: 'context?.value?.propertyLandlordTenantInfo?.landlordInfo?.id',
  //   offer_amount: 'inputData ? inputData.monthly_rental : data?.data?.makeOfferInfo?.offer_amount',
  //   tenancy_period: 'inputData ? inputData?.tenancy_period : data?.data?.makeOfferInfo?.tenancy_period',
  //   commencement_date: 'inputData ? inputData?.commencement : data?.data?.makeOfferInfo?.commencement_date',
  //   additional_requirements: `'inputData' == ''
  //     ? 'inputData?.additional_requirements'
  //     : 'data?.data?.makeOfferInfo?.additional_requirements'`,
  //   occupiers_list: JSON.stringify(
  //     "context.value.currentRoleType == 'isLandlord' ? data?.data?.makeOfferInfo?.occupiers_list : occupierListData"
  //   ),
  //   renew_option: 'inputData.renew_option',
  //   renew_year: 'inputData.renew_year',
  // }

  // const handleChange = (event: any) => {
  //   setSelectedValue(event.target.value)
  // }

  const [tabValue, setTabValue] = useState(0)
  const [tabs, setTabs] = useState([{ label: 'Occupier 1' }])

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue)
  }

  const handleAddTab = () => {
    if (tabs.length < 6) {
      const newTab = { label: `Occupier ${tabs.length + 1}` }
      setTabs([...tabs, newTab])
      setTabValue(tabs.length) // Set the newly added tab as the selected tab
    }
  }
  const handleRemoveTab = () => {
    setTabs(tabs.filter((tab, index) => index !== tabs.length - 1))
    setTabValue(tabs.length - 2) // Set the newly added tab as the selected tab
  }

  const rentalOffer = (data: any) => {
    // console.log('clickedddddd ding ding!!!!!!!!!!!!!!!!!!!!!!', data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(rentalOffer)} className="shadow-md  w-[40%]  flex flex-col p-8 gap-3">
        <FormControl className=" !w-full">
          <FormLabel id="demo-row-radio-buttons-group-label">Leasing Period</FormLabel>
          <RadioGroup
            {...register('leasing_period')}
            className="!w-full !flex !flex-row !justify-between "
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group">
            <FormControlLabel
              className="!w-[40%] !border !border-[#909090]"
              value="1 Year"
              control={<Radio disabled={readOnly} />}
              label="1 Year"
            />
            <FormControlLabel
              className="!w-[40%] !border !border-[#909090]"
              value="2 Years"
              control={<Radio disabled={readOnly} />}
              label="2 Years"
            />
          </RadioGroup>
        </FormControl>
        {/* date */}

        <input
          readOnly
          type="date"
          className=" w-full border border-blue-200 p-3"
          {...register('commencement_date')}></input>
        {/* offer ammount*/}
        <TextField
          label="offer Amount"
          fullWidth
          id="outlined-start-adornment"
          {...register('offer_amount')}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label=""
          {...register('additional_request')}
          multiline
          rows={4}
          placeholder="Additional Request"
          InputProps={{
            readOnly: true,
          }}
        />
        {/* tenant type */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tenant Type</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={''}
            {...register('tenant_type', {
              required: true,
            })}
            label="Tenant Type"
            // onChange={handleChange}
          >
            <MenuItem value={'personal'}>Personal</MenuItem>
            <MenuItem value={'organization'}>Organization</MenuItem>
          </Select>
        </FormControl>
        {errors?.tenant_type?.type === 'required' && <p className="text-danger"> This field is required</p>}

        {/* occupiers */}
        <div className=" w-full flex justify-between my-3">
          <h2>
            Occupiers <span>(Must be 1-6)</span>
          </h2>
          <Button onClick={handleAddTab} className=" !capitalize">
            Add Occuppier
          </Button>
        </div>
        <Tabs value={tabValue} onChange={handleTabChange}>
          {tabs.map((tab, index): any => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <OccupiersFormView />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <div>
            <Button onClick={handleRemoveTab} className=" !capitalize">
              <AiOutlineClose />
            </Button>
            <OccupiersFormView />
          </div>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Button onClick={handleRemoveTab} className=" !capitalize">
            <AiOutlineClose />
          </Button>

          <OccupiersFormView />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Button onClick={handleRemoveTab} className=" !capitalize">
            <AiOutlineClose />
          </Button>

          <OccupiersFormView />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <Button onClick={handleRemoveTab} className=" !capitalize">
            <AiOutlineClose />
          </Button>

          <OccupiersFormView />
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          <Button onClick={handleRemoveTab} className=" !capitalize">
            <AiOutlineClose />
          </Button>

          <OccupiersFormView />
        </TabPanel>
        <div className="  !flex !w-full !justify-end ">
          <Button
            type="submit"
            variant="contained"
            className="!bg-[#00ADEE] !text-white !font-normal !font-roboto !rounded-lg !my-4 !!capitalize">
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RentalOfferLview
