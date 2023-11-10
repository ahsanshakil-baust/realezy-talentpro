import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { demoData } from '@/util/data'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useCreateAgreementMutation,
  useCreateAgreementPrepareQuery,
} from '@/store'
import { ChatCreate, fireStoreSaveDocument, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { PROPERTIES_AGREEMENTS } from '@/const'
import moment from 'moment'
import { TextField } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'
import { DatePicker } from '@mui/x-date-pickers'

//ADD REQUIRED CONSTANT
// const { idTypeListSin, nationalityList, raceList, sector, relationShipList } = demoData

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

//AGREEMENT CREATE FUNCTIONAL COMPOMENT
const CreateAgreement = ({ optIn }: any) => {
  //SET INITIAL STATE
  const [isSelected, setIsSelected] = React.useState(false)
  const [propertyData, setPropertyData] = useState<Record<string, any>>({})
  const [property, setProperty] = useState<any[]>([])
  const [tenant, setTenant] = useState<any>([])
  const { data: session }: any = useSession()
  const [renew, setRenew] = useState(false)
  const [renewYear, setRenewYear] = useState('')
  const [renewOption, setRenewOption] = useState('')
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)

  //PREPARE VERIABLE FOR NEXT USE
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
  const rentOfferId = payload?.rentOffer?.id
  // const rentOfferAmount = payload?.rentOffer?.offer_amount
  const commencementDate = payload?.rentOffer?.commencement_date
  const createAgreementDate = moment(commencementDate, 'YYYY-MM-DD')
  // const nextYearOfAgreement = moment(createAgreementDate).startOf('month').add(1, 'year')

  const [nextYearOfAgreement, setNextYearOfAgreement] = useState<any>({})
  const handleAgreementStartDateChange = async (data: any) => {
    // moment(data, 'YYYY-MM-DD').add(Number(payload?.rentOffer?.tenancy_period), 'year').format('YYYY-MM-DD')
    setNextYearOfAgreement(moment(data).startOf('month').add(Number(payload?.rentOffer?.tenancy_period), 'year'))
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  //GET AGREEMENT PREPARED DATA USING SELECTED PROPERTY
  const preparedData = useCreateAgreementPrepareQuery(userId)

  //CREATE AGREEMENT MUTATION
  const [createAgreement] = useCreateAgreementMutation() // , { isLoading, isError }

  //ON CHANGE PROPERTY HANDLER
  // const oncChangePropertyHandler = (e: any) => {
  //   const index = e.target.selectedIndex
  //   const childNode = e.target.childNodes[index]
  //   const id = childNode.getAttribute('id')

  //   const propertyData = preparedData?.data?.find((item: any) => item.property_id == id)
  //   setPropertyData(propertyData)
  //   setTenant(propertyData?.tenant_name)
  //   setIsSelected(true)
  // }

  const oncChangePropertyHandler = (e: any) => {
    const propertyData = preparedData?.data?.find((item: any) => item.property_name == e)
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


  // added by oni
  const [startDate, setStartDate] = useState(payload?.rentOffer?.commencement_date ? moment.utc(payload?.rentOffer?.commencement_date) : moment.utc((new Date())))
  const [endDate, setEndDate] = useState(payload?.rentOffer?.commencement_date ? moment.utc(payload?.rentOffer?.commencement_date).add(parseInt(payload?.rentOffer?.tenancy_period), 'years') : moment.utc((new Date())))
  const [advancePayDate, setAdvancePayDate] = useState(moment.utc((new Date())))
  const [firstPayDate, setFirstPayDate] = useState(moment.utc((new Date())))
  // added by oni end

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
  const agreementOffer = async (data: any) => {
    //PREPARE AGREEMENT CREATE PAYLOAD
    const formData = {
      id: rentOfferId,
      property_id: propertyId,
      landlord_id: landlordId,
      tenant_id: tenantId,
      break_clause: 'applicable',
      renew_option: renewOption,
      renew_year: renewYear,
      agreement_status: 'draft',
      advance_payment_date: advancePayDate.format('YYYY-MM-DD'),
      first_payment_date: firstPayDate.format('YYYY-MM-DD'),
      start_date: startDate.format('YYYY-MM-DD'),
      is_agree_service: optIn ? 2 : 1,
    }
    store.dispatch(hideModal('SEND_AGREEMENT_CREATE'))

    dispatch(showLoader('Creating Agreement'))

    //CALL AGREEMENT CREATE MUTATION
    const { data: response }: any = await createAgreement(formData)
    // console.log('🚀 ~ file: CreateAgreement.tsx:141 ~ agreementOffer ~ response:', response)
    // console.log('draft agreement created', response)
    dispatch(hideLoader())

    //PREPARE AGREEMENT FIRESTORE PAYLOAD
    const agreementFirestoreCollection = {
      id: response?.data?.id,
      instruction: '',
      landLord_signed: false,
      progress_status: false,
      status: 'draft_created',
      tenant_signed: false,
      chatId: parseInt(getTimestamp()),
      time: parseInt(getTimestamp()),
    }

    //UPDATE TENANT PROGRESS
    updateTenantProgress(`${propertyId}-${tenantId}`, 'tenancyAgreement', agreementFirestoreCollection)

    //UPDATE LANDLORD PROGRESS
    updateLandlordProgress(`${landlordId}-${propertyId}-${tenantId}`, 'tenancyAgreement', agreementFirestoreCollection)

    //SAVE FIRESTORE MESSAGE
    ChatCreate("Landlord Created the property draft Agreement for Tenant", 'RZY', propertyId, receiver, threadId, "agreement", '')
    fireStoreSaveDocument(PROPERTIES_AGREEMENTS)
  }

  return (
    <div className=" w-full max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto gap-4 flex">
      <div className="  w-[60%] h-full   flex flex-col gap-3">
        <form onSubmit={handleSubmit(agreementOffer)} className=" w-full  ">
          <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="w-full h-full flex flex-col">
              <h1 className=" font-bold font-roboto text-[1.25rem]/[1.5rem] text-[#202020] mb-6">Agreement Info</h1>
              <div className="w-full grid grid-cols-2 gap-4 justify-between">
                {/* PROPERTY SELECT OPTION */}
                <div className=" grid-cols-1">
                  {/* <select
                    className="w-full border border-1 py-4 rounded-md text-lg"
                    {...register('propertyId', { required: 'Property  required' })}
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
                  </select> */}
                  <FormControl
                    sx={{
                      borderRadius: '10px',
                      '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                          border: '1px solid #D1D1D1',
                          // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                          '& > fieldset': {
                            borderColor: '#00ADEE',
                          },
                        },
                      },
                      '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                          color: '#00ADEE',
                        },
                      },
                      '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                          border: '1px solid #00ADEE',
                        },
                      },
                      '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                      },
                    }}
                    className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] ">
                    <InputLabel id="demo-simple-select-label">Property Name</InputLabel>
                    <Select
                      IconComponent={ExpandMoreIcon} // Change the icon by providing the desired icon component
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={propertyData?.property_name}
                      // {...register('property_name')}
                      label="Property Name"
                      onChange={(e): any => {
                        oncChangePropertyHandler(e.target.value)
                      }}>
                      {property.map((item: any, ind: number) => (
                        <MenuItem key={ind} className="!p-5 !text-[1.25rem]/[1.5rem] " id={item.value} value={item.label}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/* TENANT NAME */}
                <div className=" grid-cols-1">
                  {/* <p>Tenant</p> */}
                  {/* <input className="" type="text" value={tenant} readOnly /> */}
                  <TextField
                    sx={{
                      borderRadius: '10px',
                      '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                          border: '1px solid #D1D1D1',
                          // borderRadius: '10px',
                        },
                        '&.Mui-focused': {
                          '& > fieldset': {
                            borderColor: '#00ADEE',
                          },
                        },
                      },
                      '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                          color: '#00ADEE',
                        },
                      },
                      '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                          border: '1px solid #00ADEE',
                        },
                      },
                      '&:hover .MuiInputLabel-root': {
                        color: '#00ADEE',
                      },
                    }}
                    className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                    label="Tenant"
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
                <FormControl
                  sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        border: '1px solid #D1D1D1',
                        // borderRadius: '10px',
                      },
                      '&.Mui-focused': {
                        '& > fieldset': {
                          borderColor: '#00ADEE',
                        },
                      },
                    },
                    '& .MuiFormLabel-root': {
                      '&.Mui-focused': {
                        color: '#00ADEE',
                      },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                      '& > fieldset': {
                        border: '1px solid #00ADEE',
                      },
                    },
                    '&:hover .MuiInputLabel-root': {
                      color: '#00ADEE',
                    },
                  }}
                  className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] ">
                  <InputLabel id="demo-simple-select-label">Leasing Period</InputLabel>
                  <Select
                    IconComponent={ExpandMoreIcon} // Change the icon by providing the desired icon component
                    //   required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={''}
                    {...register('leasingPeriod', { required: 'leasing Period required' })}
                    label="Leasing Period"
                    onChange={onChangeRenewOptionHandler}>
                    <MenuItem value="applicable">Applicable</MenuItem>
                    <MenuItem value="not_applicable">Not Applicable</MenuItem>
                  </Select>
                  <ErrorMessage
                    errors={errors}
                    name="leasingPeriod"
                    render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                  />
                </FormControl>
              </div>
              {renew && (
                <div className="mb-2">
                  <Button
                    value="1"
                    onClick={selectRenewYear}
                    style={{
                      background: renewYear == '1' ? '#00adee' : '#FFFFFF',
                      padding: '10px 15px',
                      width: '50%',
                      display: 'inline-block',
                      marginRight: '10px',
                      color: '#000',
                    }}>
                    1 Year
                  </Button>
                  <Button
                    value="2"
                    onClick={selectRenewYear}
                    style={{
                      background: renewYear == '2' ? '#00adee' : '#FFFFFF',
                      padding: '10px 15px',
                      width: '50%',
                      display: 'inline-block',
                      color: '#000',
                    }}>
                    2 Years
                  </Button>
                </div>
              )}
              <div className=" mt-6 w-full flex flex-col">
                <h1 className=" font-bold font-roboto 2xl:!text-[1.25rem]/[1.5rem] !text-[1rem]/[1.25rem] text-[#202020] mb-2">
                  Agreement Date
                </h1>

                <div className="w-full grid grid-cols-2 gap-4  ">
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
                    <DatePicker
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      label="Agreement Start Date"
                      defaultValue={startDate}
                      minDate={moment.utc((new Date()))}
                      // {...register(`commencement_date`, { required: true })}
                      // defaultValue={payload?.rentOffer?.commencement_date ? moment.utc(payload?.rentOffer?.commencement_date) : moment.utc((new Date()))}
                  
                      // minDate={payload?.rentOffer?.commencement_date ? moment.utc(payload?.rentOffer?.commencement_date) : moment.utc((new Date()))}
                      // disabled={viewMode}
                      //  defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date}
                      // defaultValue={moment.utc(scheduleData?.appointmentInfo?.appointment_selected_date)}
                      format="DD MMM, YY"
                      // value={dateVal}
                      onChange={(e: any) => {setStartDate(e); setEndDate(e.clone().add(((parseInt(payload?.rentOffer?.tenancy_period) * 365)), 'days'))}}
                      sx={{
                        width:'100%',
                          '& .MuiInputBase-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },

                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: '#00ADEE',
                            },
                          },
                        }}
                    />
                    {/* <TextField
                      sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },
                        },
                        '& .MuiFormLabel-root': {
                          '&.Mui-focused': {
                            color: '#00ADEE',
                          },
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '1px solid #00ADEE',
                          },
                        },
                        '&:hover .MuiInputLabel-root': {
                          color: '#00ADEE',
                        },
                      }}
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      fullWidth
                      label="Agreement Start Date"
                      id="date"
                      type="date"
                      defaultValue={moment(createAgreementDate).format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      // className="w-100 p-1 rounded border"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: false,
                      }}
                      {...register('start')}
                      onChange={(e: any) => handleAgreementStartDateChange(e.target.value)}
                    /> */}
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
                /> */}
                    <DatePicker
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      label="Agreement End Date"
                      // {...register(`commencement_date`, { required: true })}
                      value={endDate}
                      // defaultValue={payload?.rentOffer?.commencement_date ? moment.utc(payload?.rentOffer?.commencement_date) : moment.utc((new Date()))}
                  
                      // minDate={payload?.rentOffer?.commencement_date ? moment.utc(payload?.rentOffer?.commencement_date) : moment.utc((new Date()))}
                      // disabled={viewMode}
                      //  defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date}
                      // defaultValue={moment.utc(scheduleData?.appointmentInfo?.appointment_selected_date)}
                      format="DD MMM, YY"
                      readOnly
                      // value={dateVal}
                      // onChange={(e: any) => {setCommDate(moment(e._d).format("YYYY-MM-DD"))}}
                      sx={{
                        width:'100%',
                          '& .MuiInputBase-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },

                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: '#00ADEE',
                            },
                          },
                        }}
                    />
                    {/* <TextField
                      sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },
                        },
                        '& .MuiFormLabel-root': {
                          '&.Mui-focused': {
                            color: '#00ADEE',
                          },
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '1px solid #00ADEE',
                          },
                        },
                        '&:hover .MuiInputLabel-root': {
                          color: '#00ADEE',
                        },
                      }}
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      fullWidth
                      label="Agreement End Date"
                      id="date"
                      type="date"
                      defaultValue={moment(nextYearOfAgreement).format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      // className="w-100 p-1 rounded border"
                      InputLabelProps={{
                        // readOnly: true,
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register('end')}
                    /> */}
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
                    <DatePicker
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      label="Advance Payment Date"
                      readOnly
                      // {...register(`commencement_date`, { required: true })}
                      defaultValue={advancePayDate}
                      // readOnly
                  
                      // minDate={moment.utc((new Date()))}
                      // disabled={viewMode}
                      //  defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date}
                      // defaultValue={moment.utc(scheduleData?.appointmentInfo?.appointment_selected_date)}
                      format="DD MMM, YY"
                      // value={dateVal}
                      onChange={(e: any) => {setAdvancePayDate(e)}}
                      sx={{
                        width:'100%',
                          '& .MuiInputBase-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },

                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: '#00ADEE',
                            },
                          },
                        }}
                    />
                    {/* <TextField
                      sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },
                        },
                        '& .MuiFormLabel-root': {
                          '&.Mui-focused': {
                            color: '#00ADEE',
                          },
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '1px solid #00ADEE',
                          },
                        },
                        '&:hover .MuiInputLabel-root': {
                          color: '#00ADEE',
                        },
                      }}
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      label="Advance Payment Date"
                      id="date"
                      type="date"
                      defaultValue={moment().format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      // className="w-100 p-1 rounded border"
                      InputLabelProps={{
                        // readOnly: true,
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register('advance_payment_date')}
                    /> */}
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
                    <DatePicker
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      label="First Payment Date"
                      readOnly
                      // {...register(`commencement_date`, { required: true })}
                      defaultValue={firstPayDate}
                      // readOnly
                  
                      // minDate={moment.utc((new Date()))}
                      // disabled={viewMode}
                      //  defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date}
                      // defaultValue={moment.utc(scheduleData?.appointmentInfo?.appointment_selected_date)}
                      format="DD MMM, YY"
                      // value={dateVal}
                      onChange={(e: any) => {setFirstPayDate(e)}}
                      sx={{
                        width:'100%',
                          '& .MuiInputBase-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },

                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: '#00ADEE',
                            },
                          },
                        }}
                    />
                    {/* <TextField
                      sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            border: '1px solid #D1D1D1',
                            // borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },
                        },
                        '& .MuiFormLabel-root': {
                          '&.Mui-focused': {
                            color: '#00ADEE',
                          },
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '1px solid #00ADEE',
                          },
                        },
                        '&:hover .MuiInputLabel-root': {
                          color: '#00ADEE',
                        },
                      }}
                      className=" !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                      label="First Payment Date"
                      id="date"
                      type="date"
                      defaultValue={moment().format('YYYY-MM-DD')}
                      min={moment().format('YYYY-MM-DD')}
                      // className="w-100 p-1 rounded border"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register('first_payment_date')}
                    /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="  !flex !w-full !justify-start items-end  ">
              <Button
                type="submit"
                variant="contained"
                className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]">
                Create
              </Button>
            </div>
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

export default CreateAgreement
