import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
// import { demoData } from '@/util/data'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  // useCreateAgreementMutation,
  useCreateAgreementPrepareQuery,
  useUpdateAgreementMutation,
} from '@/store'
// import { ChatCreate, fireStoreSaveDocument, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
// import { PROPERTIES_AGREEMENTS } from '@/const'
import moment from 'moment'
import { SEND_AGREEMENT_DETAILS } from '@/store/chatProgress/progress/constant'

//ADD REQUIRED CONSTANT
// const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData

//AGREEMENT CREATE FUNCTIONAL COMPOMENT
const UpdateAgreement = () => {
  //SET INITIAL STATE
  const [isSelected, setIsSelected] = React.useState(false)
  const [propertyData, setPropertyData] = useState<Record<string, any>>({})
  const [property, setProperty] = useState<any[]>([])
  const [tenant, setTenant] = useState<any>([])
  const { data: session }: any = useSession()
  // const [switchOn, setSwitchOn] = useState(false)
  const [renew, setRenew] = useState(false)
  const [renewYear, setRenewYear] = useState('')
  const [renewOption, setRenewOption] = useState('')
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)

  //PREPARE VERIABLE FOR NEXT USE
  const userId = session?.user?.id
  // const roleType = payload?.roletype
  // const receiver =
  //   session?.user?.id === payload?.threadInfo?.sender_id
  //     ? payload?.threadInfo?.receiver_id
  //     : payload?.threadInfo?.sender_id

  // const propertyId = payload?.threadInfo?.property_id
  // const threadId = payload?.threadInfo?.id
  // const tenantId = payload?.threadInfo?.sender_id
  // const landlordId = payload?.threadInfo?.receiver_id
  // const rentOfferId = payload?.rentOffer?.id
  // const rentOfferAmount = payload?.rentOffer?.offer_amount
  const agreementId = payload?.tenancyAgreement?.id
  const commencementDate = payload?.rentOffer?.commencement_date
  const createAgreementDate = moment(commencementDate, 'YYYY-MM-DD')
  const nextYearOfAgreement = moment(createAgreementDate).startOf('month').add(1, 'year')
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  //GET AGREEMENT PREPARED DATA USING SELECTED PROPERTY
  const preparedData = useCreateAgreementPrepareQuery(userId)

  //CREATE AGREEMENT MUTATION
  const [updateAgreement] = useUpdateAgreementMutation() // , { isLoading, isError }

  //ON CHANGE PROPERTY HANDLER
  const oncChangePropertyHandler = (e: any) => {
    const index = e.target.selectedIndex
    const childNode = e.target.childNodes[index]
    const id = childNode.getAttribute('id')

    const propertyData = preparedData?.data?.find((item: any) => item.property_id == id)
    setPropertyData(propertyData)
    setTenant(propertyData?.tenant_name)
    setIsSelected(true)
  }

  //ON CHANGE RENEW OPTION HANDLER
  const onChangeRenewOptionHandler = (e: any) => {
    if (e.target.value == 'applicable') {
      setRenew(true)
      setRenewOption('applicable')
    } else {
      setRenew(false)
      setRenewYear('')
      setRenewOption('not applicable')
    }
  }

  const selectRenewYear = (e: any) => {
    setRenewYear(e.target.value)
  }

  useEffect(() => {
    const property: any = []
    preparedData?.data?.forEach((item: any) => {
      property.push({
        label: item.property_name,
        value: item.property_id,
      })
    })

    setProperty(
      property?.filter(
        (item: any, index: any, self: any) => index === self.findIndex((item: any) => item.value === item.value)
      )
    )
  }, [preparedData])

  const dispatch = useDispatch()
  //HANDLE FORM SUBMIT FOR AGREEMENT
  const agreementUpdateHandler = async (data: any) => {
    //PREPARE AGREEMENT CREATE PAYLOAD
    const formData = {
      agreement_status: 'pending',
      renew_option: renewOption,
      renew_year: renewYear,
    }

    store.dispatch(hideModal('SEND_AGREEMENT_UPDATE'))
    store.dispatch(hideModal(SEND_AGREEMENT_DETAILS))

    dispatch(showLoader('Updating Agreement'))

    //CALL AGREEMENT CREATE MUTATION
    const { data: response }: any = await updateAgreement({ agreementId: agreementId, data: formData })
    dispatch(hideLoader())
  }

  return (
    <div className=" w-full max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto gap-4 flex">
      <div className="  w-[60%] h-full   flex flex-col gap-3">
        <form onSubmit={handleSubmit(agreementUpdateHandler)} className=" w-full  ">
          <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="w-full h-full flex flex-col">
              <h1 className=" font-bold font-roboto text-[1.25rem]/[1.5rem] text-[#202020] mb-6">Agreement Info</h1>
              <div className="w-full grid grid-cols-2 gap-4 justify-between">
                {/* PROPERTY SELECT OPTION */}
                <div className=" grid-cols-1">
                  <select
                    className="w-full border border-1 py-4 rounded-md text-lg"
                    onChange={oncChangePropertyHandler}>
                    <option value="">Property Name</option>
                    {property.map(item => {
                      return (
                        <>
                          <option className="p-5 text-[20px] " id={item.value} value={item.label}>
                            {item.label}
                          </option>
                        </>
                      )
                    })}
                  </select>
                </div>

                {/* TENANT NAME */}
                <div className=" grid-cols-1">
                  {/* <p>Tenant</p> */}
                  {/* <input className="" type="text" value={tenant} readOnly /> */}
                  <TextField
                    label="Tenant"
                    className="!w-full"
                    id="outlined-basic"
                    variant="outlined"
                    value={tenant}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              </div>
              {/* <label htmlFor="end">Option to Renew</label> */}
              <div className=" grid grid-cols-2 mt-6 ">
                <FormControl className=" !col-span-1">
                  <InputLabel id="demo-simple-select-label">Leasing Period</InputLabel>
                  <Select
                    IconComponent={ExpandMoreIcon} // Change the icon by providing the desired icon component
                    //   required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={''}
                    // {...register('leasingPeriod')}
                    label="Leasing Period"
                    onChange={onChangeRenewOptionHandler}>
                    <MenuItem value="applicable">Applicable</MenuItem>
                    <MenuItem value="not_applicable">Not Applicable</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                {renew && (
                  <div className="mb-2">
                    <Button
                      value="1"
                      onClick={selectRenewYear}
                      style={{
                        background: renewYear == '1' ? '#00adee' : '#ddd',
                        padding: '10px 15px',
                        width: '50%',
                        display: 'inline-block',
                        marginRight: '10px',
                        color: '#000',
                      }}>
                      1
                    </Button>
                    <Button
                      value="2"
                      onClick={selectRenewYear}
                      style={{
                        background: renewYear == '2' ? '#00adee' : '#ddd',
                        padding: '10px 15px',
                        width: '50%',
                        display: 'inline-block',
                        color: '#000',
                      }}>
                      2
                    </Button>
                  </div>
                )}
              </div>

              <div className=" mt-6 w-full flex flex-col">
                <h1 className=" font-bold font-roboto text-[1.25rem]/[1.5rem] text-[#202020] mb-2">Agreement Date</h1>

                <div className="w-full grid grid-cols-2  ">
                  <div className="flex flex-col gap-2 py-4">
                    {/* <label htmlFor="start">Agreement Start Date:</label> */}
                    {/* <input
                  defaultValue={moment(createAgreementDate).format('YYYY-MM-DD')}
                  min={moment().format('YYYY-MM-DD')}
                  className="w-100 p-1 rounded border"
                  type="date"
                  readOnly={true}
                  {...register('start')}
                /> */}
                    <TextField
                      fullWidth
                      label="Agreement Start Date"
                      id="date"
                      type="date"
                      defaultValue={moment(createAgreementDate).format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      className="!w-100 !p-1 !rounded border"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register('start')}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    {/* <label htmlFor="end">Agreement End Date:</label> */}
                    {/* <input
                  defaultValue={moment(nextYearOfAgreement).format('YYYY-MM-DD')}
                  min={moment().format('YYYY-MM-DD')}
                  className="w-100 p-1 rounded border"
                  type="date"
                  readOnly={true}
                  {...register('end')}
                />*/}
                    <TextField
                      fullWidth
                      label="Agreement End Date"
                      id="date"
                      type="date"
                      defaultValue={moment(nextYearOfAgreement).format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      className="!w-100 !p-1 !rounded border"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register('end')}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    {/* <label htmlFor="Advance Payment Date">Advance Payment Date:</label> */}
                    {/* <input
                  defaultValue={moment().format('YYYY-MM-DD')}
                  min={moment().format('YYYY-MM-DD')}
                  className="w-100 p-1 rounded border"
                  type="date"
                  readOnly={true}
                  {...register('advance_payment_date')}
                /> */}
                    <TextField
                      label="Advance Payment Date"
                      id="date"
                      type="date"
                      defaultValue={moment().format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      className="!w-100 !p-1 !rounded border"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register('advance_payment_date')}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-4">
                    {/* <label htmlFor="First Payment Date">First Payment Date:</label> */}
                    {/* <input
                  defaultValue={moment().format('YYYY-MM-DD')}
                  min={moment().format('YYYY-MM-DD')}
                  className="w-100 p-1 rounded border"
                  type="date"
                  readOnly={true}
                  {...register('first_payment_date')}
                /> */}
                    <TextField
                      label="First Payment Date"
                      id="date"
                      type="date"
                      defaultValue={moment().format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      className="!w-100 !p-1 !rounded border"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register('first_payment_date')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {renew && (
              <div className="  !flex !w-full !justify-start ">
                <Button
                  type="submit"
                  variant="contained"
                  className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]">
                  Update
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
      {isSelected ? (
        <>
          <div className=" border-l border-solid border-[#D4E8FF] ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]" />
          <div className="w-[40%] h-full flex-grow flex flex-col ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem] ">
            <h1 className=" font-bold font-roboto text-[1.25rem]/[1.5rem] text-[#202020] mb-6">Preview</h1>

            <h1 className=" font-roboto font-medium text-[1.125rem]/[1.375rem] text-[#000000]">Property Info</h1>
            <div className=" w-full flex flex-col p-4 bg-[#F8FBFF] shadow-md rounded-[10px] mt-2 mb-5">
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">Name:</p>
                <p className="font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.property_name}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">type:</p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.property_type}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">
                  Ammount:
                </p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.property_rent_amount}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">
                  Location:
                </p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.property_location}
                </p>
              </div>
            </div>
            <h1 className=" font-roboto font-medium text-xl text-[#034EA1]">Landlord Info</h1>
            <div className=" w-full flex flex-col p-4 bg-[#F8FBFF] shadow-md rounded-[10px] mt-2 mb-5">
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-base text-[#101010] mb-3 text-left">Name:</p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.landlord_name}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">Email:</p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.landlord_email}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">Phone:</p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.landlord_phone}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">
                  Adrress:
                </p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.landlord_address}
                </p>
              </div>
            </div>
            <h1 className=" font-roboto font-medium text-xl text-[#00ADEE]">Tenant Info</h1>
            <div className=" w-full flex flex-col p-4 bg-[#F8FBFF] shadow-md rounded-[10px] mt-2 mb-5">
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-base text-[#101010] mb-3 text-left">Name:</p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.tenant_name}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">Email:</p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.tenant_email}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">Phone:</p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.tenant_phone}
                </p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-[300] text-[1rem]/[1.1875rem] text-[#202020] mb-3 text-left">
                  Adrress:
                </p>
                <p className=" font-roboto font-normal text-[1rem]/[1.1875rem] text-[#202020] text-right">
                  {propertyData?.tenant_address}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default UpdateAgreement
