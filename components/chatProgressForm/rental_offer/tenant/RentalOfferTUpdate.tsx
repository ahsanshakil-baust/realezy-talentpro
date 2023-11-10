import React, { useEffect, useState } from 'react'
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

// import { demoData } from '@/util/data'
import { AiOutlineClose } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import store, { hideModal, useCreateMakeOfferMutation, useRentalOfferDetailsQuery } from '@/store'
import { MAKE_RENTAL_PROPOSAL_UPDATE } from '@/store/chatProgress/progress/constant'
import { OccupiersFormU } from './OccupiersFormU'

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

const RentalOfferTUpdate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { data: session }: any = useSession()
  // const sender = session?.user?.id
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)

  let { data: rentalDetails } = useRentalOfferDetailsQuery({
    propertyId: payload?.threadInfo?.property_id,
    userId: payload?.threadInfo?.sender_id,
  })
  const [renderCount, setRenderCount] = useState(0)
  useEffect(() => {
    if (rentalDetails !== undefined) {
      if (renderCount < 3) {
        setRenderCount(renderCount + 1)
      }
    }
  }, [rentalDetails, renderCount])


  const [tabValue, setTabValue] = useState(0)
  const [tabs, setTabs] = useState([{ label: 'Occupier 1' }])

  const userId = session?.user?.id
  // const roleType = payload?.roletype
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  const propertyId = payload?.threadInfo?.property_id
  const threadId = payload?.threadInfo?.id
  const tenantId = payload?.threadInfo?.sender_id
  const landlordId = payload?.threadInfo?.receiver_id
  // const rentOfferId = payload?.rentOffer?.id
  // const rentOfferAmount = payload?.rentOffer?.offer_amount

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
  const [createMakeOffer] = useCreateMakeOfferMutation()
  // const { getValues } = useForm()

  const handleRentalOfferSubmit = async (data: any) => {
    //GET & CHECK USER INPUT
    // const occupier_name =
    //   data.occupier_name?.length > 0 ? data.occupier_name.unshift(data.occupier_name0) : [data.occupier_name0]
    // const race = data.race?.length > 0 ? data.race.unshift(data.race0) : [data.race0]
    // const gender = data.gender?.length > 0 ? data.gender.unshift(data.gender0) : [data.gender0]
    // const nric_fin = data.nric_fin?.length > 0 ? data.nric_fin.unshift(data.nric_fin0) : [data.nric_fin0]
    // const pass_type = data.pass_type?.length > 0 ? data.pass_type.unshift(data.pass_type0) : [data.pass_type0]
    // const sector = data.sector?.length > 0 ? data.sector.unshift(data.sector0) : [data.sector0]
    // const citizenship = data.citizenship?.length > 0 ? data.citizenship.unshift(data.citizenship0) : [data.citizenship0]
    // const birth_date = data.birth_date?.length > 0 ? data.birth_date.unshift(data.birth_date0) : [data.birth_date0]
    // const select_nationality =
    //   data.select_nationality?.length > 0
    //     ? data.select_nationality.unshift(data.select_nationality0)
    //     : [data.select_nationality0]
    // const relation_to_main_tenant =
    //   data.relation_to_main_tenant?.length > 0
    //     ? data.relation_to_main_tenant.unshift(data.relation_to_main_tenant0)
    //     : [data.relation_to_main_tenant0]

    //PREPARE FORM PAYLOD
    const occupierData: any = []
    data.full_name
      ? data.full_name?.forEach((item: any, index: any) => {
        occupierData.push({
          name: data.full_name[index],
          race: data.select_race[index],
          gender: data.gender[index + 1],
          idNumber: data.nric_fin[index + 1],
          pass_type: data.pass_type[index + 1],
          occupation: data.sector[index + 1],
          citizenShip: data.citizenship[index + 1],
          dateOfBirth: data.birth_date[index + 1],
          nationality: data.select_nationality[index + 1],
          tenant_type: data.tenant_typ,
          relationship: data.relation_to_main_tenant[index + 1],
        })
      })
      : occupierData.push({
        name: data.full_name0,
        race: data.select_race0,
        gender: data.gender0,
        idNumber: data.nric_fin0,
        pass_type: data.pass_type0,
        occupation: data.sector0,
        citizenShip: data.citizenship0,
        dateOfBirth: data.birth_date0,
        nationality: data.select_nationality0,
        tenant_type: data.tenant_type0,
        relationship: data.relation_to_main_tenant0,
      })

    const formData = {
      property_id: propertyId,
      tenant_id: tenantId,
      landlord_id: landlordId,
      offer_amount: data?.offer_amount,
      tenancy_period: parseInt(data?.leasing_period),
      commencement_date: data?.commencement_date,
      renew_option: 'yes',
      renew_year: data?.leasing_period,
      additional_requirements: data?.additional_request,
      updated_by: userId,
      occupiers_list: JSON.stringify(occupierData),
    }

    //CREATE RENTAL OFFER
    const { data: response }: any = await createMakeOffer(formData)

    const updatedData = {
      id: response?.data.offer_id,
      accepted: false,
      offer_amount: data?.offer_amount,
      progress_status: false,
      inviter_id: userId,
      tenancy_period: response?.data?.tenancy_period,
      commencement_date: response?.data?.commencement_date,
      additional_request: response?.data?.additional_requirements,
      status: 'created',
      creator: payload?.tenantLandlordProgressInfo?.tenantInfo?.id,
    }

    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'rentOffer',
      updatedData
    )
    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'rentOffer',
      updatedData
    )

    ChatCreate('Rental Proposal Created', 'RZY', payload?.threadInfo?.property_id, receiver, threadId, 'RZYADMIN', '')

    store.dispatch(hideModal(MAKE_RENTAL_PROPOSAL_UPDATE))
  }

  const [lease, setLease] = useState('0')
  useEffect(() => {
    setLease(rentalDetails?.makeOfferInfo?.renew_year)
  }, [rentalDetails?.makeOfferInfo?.renew_year])

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleRentalOfferSubmit)}
        className=" w-full max-h-[690px] overflow-auto  flex flex-row p-6 gap-6">
        <div className="w-full flex flex-col gap-3">
          <FormControl className=" !w-full">
            <FormLabel id="demo-row-radio-buttons-group-label">Leasing Period</FormLabel>
            <RadioGroup
              className="!w-full !flex !flex-row !justify-between "
              defaultValue={lease}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group">
              <FormControlLabel
                {...register('leasing_period')}
                className="!w-[40%] !border !border-[#909090]"
                checked={rentalDetails?.makeOfferInfo?.renew_year === '1'}
                value="1"
                control={<Radio />}
                label="1 Year"
              />
              <FormControlLabel
                {...register('leasing_period')}
                className="!w-[40%] !border !border-[#909090]"
                checked={rentalDetails?.makeOfferInfo?.renew_year === '2'}
                value="2"
                control={<Radio />}
                label="2 Year"
              />
            </RadioGroup>
          </FormControl>
          {/* date */}

          <input
            type="date"
            value={rentalDetails?.makeOfferInfo?.commencement_date}
            className=" w-full border border-blue-200 p-3"
            {...register('commencement_date')}></input>
          {/* offer ammount*/}
          <TextField
            label="offer Amount"
            fullWidth
            id="outlined-start-adornment"
            defaultValue={Math.round(payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_amount)}
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
            defaultValue={rentalDetails?.makeOfferInfo?.additional_requirements}
            // placeholder='Additional Request'
            placeholder="Additional Request"
          />
          {/* tenant type */}
          <FormControl defaultValue={rentalDetails?.makeOfferInfo?.occupiers_list[0].tenant_type} fullWidth>
            <InputLabel id="demo-simple-select-label">Tenant Type</InputLabel>
            <Select
              defaultValue={rentalDetails?.makeOfferInfo?.occupiers_list[0]?.tenant_type}
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
        </div>
        {/* occupiers */}
        <div className=" w-full flex flex-col ">
          <div className=" w-full flex justify-between items-center">
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
            <OccupiersFormU
              data={rentalDetails?.makeOfferInfo?.occupiers_list[0]}
              index={0}
              errors={errors}
              register={register}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <div>
              <Button onClick={handleRemoveTab} className=" !capitalize">
                <AiOutlineClose />
              </Button>
              <OccupiersFormU
                data={rentalDetails?.makeOfferInfo?.occupiers_list[1]}
                index={1}
                errors={errors}
                register={register}
              />
            </div>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Button onClick={handleRemoveTab} className=" !capitalize">
              <AiOutlineClose />
            </Button>

            <OccupiersFormU
              data={rentalDetails?.makeOfferInfo?.occupiers_list[2]}
              index={2}
              errors={errors}
              register={register}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Button onClick={handleRemoveTab} className=" !capitalize">
              <AiOutlineClose />
            </Button>

            <OccupiersFormU
              data={rentalDetails?.makeOfferInfo?.occupiers_list[3]}
              index={4}
              errors={errors}
              register={register}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Button onClick={handleRemoveTab} className=" !capitalize">
              <AiOutlineClose />
            </Button>

            <OccupiersFormU
              data={rentalDetails?.makeOfferInfo?.occupiers_list[4]}
              index={4}
              errors={errors}
              register={register}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={5}>
            <Button onClick={handleRemoveTab} className=" !capitalize">
              <AiOutlineClose />
            </Button>

            <OccupiersFormU
              data={rentalDetails?.makeOfferInfo?.occupiers_list[5]}
              index={5}
              errors={errors}
              register={register}
            />
          </TabPanel>

          <div className="  !flex !w-full !justify-end ">
            <Button
              type="submit"
              variant="contained"
              className="!bg-[#00ADEE] !text-white !font-normal !font-roboto !rounded-lg !my-3 !capitalize">
              Complete Profile
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RentalOfferTUpdate
