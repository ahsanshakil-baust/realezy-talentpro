import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { OccupiersForm } from './OccupiersForm'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useCreateMakeOfferMutation,
  useGetUserProfileDetailsQuery,
  useRentalOfferDetailsQuery,
} from '@/store'
import {
  MAKE_RENTAL_PROPOSAL_CREATE,
  MAKE_RENTAL_PROPOSAL_DETAILS,
  MAKE_RENTAL_PROPOSAL_UPDATE,
} from '@/store/chatProgress/progress/constant'
import { StoreThunkDispatch } from '@/types'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { customFormStyle } from '@/util/customFormStyle'
import { yupResolver } from '@hookform/resolvers/yup'
import rentalProposalFormValidationSchema from '../../../shared/FormValidation/RentalProposalFormValidationSchema'
import { ErrorMessage } from '@hookform/error-message'

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

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

const RentalOfferTCreate = ({ mutateType }: any) => {
  const { data: session }: any = useSession()

  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(rentalProposalFormValidationSchema({ userInfo: session?.user?.userInfo })),
  })
  console.log('🚀 ~ file: RentalOfferTCreate.tsx:83 ~ RentalOfferTCreate ~ errors:', errors)
  const {
    fields: occupierList,
    append: occupierListAppend,
    remove: occupierListRemove,
  } = useFieldArray({ control, name: 'occupierList' })

  const occupierCountFind = () => {
    let count = 0
    Object.entries(
      session?.user?.userInfo?.occupiers_salary_list ? session?.user?.userInfo?.occupiers_salary_list : {}
    ).map(([key, value]: any) => {
      if (parseInt(value) > 0) count++
    })
    return count
  }

  const occucount = occupierCountFind()
  const sender = session?.user?.id
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)

  const [createMakeOffer] = useCreateMakeOfferMutation() // , { isError, isLoading, data }
  let { data: rentalDetails } = useRentalOfferDetailsQuery({
    propertyId: payload?.threadInfo?.property_id,
    userId: payload?.threadInfo?.sender_id,
  })
  const { data: userInfo } = useGetUserProfileDetailsQuery(sender)
  // console.log("🚀 ~ file: RentalOfferTCreate.tsx:115 ~ RentalOfferTCreate ~ userInfo:", userInfo)

  useEffect(() => {
    if (mutateType === 'create') {
      occupierListAppend({
        nric_type: userInfo?.nric_type,
        nric_fin: userInfo?.user_id_number,
        full_name: userInfo?.name,
        birth_date: userInfo?.date_of_birth,
        gender: userInfo?.gender,
        citizen: userInfo?.nationality,
        nationality: userInfo?.user_nationality,
        race: userInfo?.race,
        pass_type: userInfo?.user_id_type,
        sector: '',
        relation: 'Main Tenant',
      })
      for (let i = 1; i < occucount; i++) {
        occupierListAppend({
          nric_type: '',
          nric_fin: '',
          full_name: '',
          birth_date: '',
          gender: '',
          citizen: '',
          nationality: '',
          race: '',
          pass_type: '',
          sector: '',
          relation: '',
        })
      }
    }
  }, [userInfo, mutateType, occupierListAppend])

  useEffect(() => {
    if (mutateType === 'update' || mutateType === 'details')
      rentalDetails?.makeOfferInfo?.occupiers_list?.map((itemVal: any) => {
        occupierListAppend({
          nric_type: itemVal?.idNumber[0],
          nric_fin: itemVal?.idNumber.slice(1),
          full_name: itemVal?.name,
          birth_date: itemVal?.dateOfBirth,
          gender: itemVal?.gender,
          citizen: itemVal?.citizenShip,
          nationality: itemVal?.nationality,
          race: itemVal?.race,
          pass_type: itemVal?.user_id_type,
          sector: itemVal?.occupation,
          relation: itemVal?.relationship,
        })
      })
  }, [rentalDetails, mutateType, occupierListAppend])

  const [tabValue, setTabValue] = useState(0)
  const [occupierCount, setOccupierCount] = useState(1)

  const userId = session?.user?.id
  const roleType = payload?.roletype
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  const propertyId = payload?.threadInfo?.property_id
  const threadId = payload?.threadInfo?.id
  const tenantId = payload?.threadInfo?.sender_id
  const landlordId = payload?.threadInfo?.receiver_id

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue)
  }
  const dispatch = useDispatch<StoreThunkDispatch>()

  const [commDate, setCommDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

  const handleRentalOfferSubmit = async (data: any) => {
    if (Number(data?.offer_amount) <= Number(session?.user?.userInfo?.max_rental_range)) {
      dispatch(showLoader('Creating Rental Offer'))

      const occupierData: any = []
      data?.occupierList?.forEach((item: any, index: any) => {
        occupierData.push({
          name: item?.full_name,
          race: item?.race,
          gender: item?.gender,
          idNumber: item?.nric_type + item?.nric_fin,
          pass_type: item?.user_id_type,
          occupation: item?.sector,
          citizenShip: item?.citizen,
          dateOfBirth: item?.birth_date,
          nationality: item?.nationality,
          tenant_type: index === 0 ? data?.tenant_type : '',
          // occupier_count: index === 0 ? data?.occupiers_count : '',
          relationship: item?.relation,
        })
      })

      const formData = {
        property_id: propertyId,
        tenant_id: tenantId,
        landlord_id: landlordId,
        offer_amount: data?.offer_amount,
        tenancy_period: parseInt(data?.leasing_period),
        commencement_date: commDate,
        renew_option: 'yes',
        renew_year: data?.leasing_period,
        additional_requirements: data?.additional_request,
        updated_by: userId,
        occupiers_list: JSON.stringify(occupierData),
      }

      if (mutateType === 'create') store.dispatch(hideModal(MAKE_RENTAL_PROPOSAL_CREATE))
      if (mutateType === 'update') store.dispatch(hideModal(MAKE_RENTAL_PROPOSAL_UPDATE))
      if (mutateType === 'details') store.dispatch(hideModal(MAKE_RENTAL_PROPOSAL_DETAILS))

      //CREATE RENTAL OFFER
      const { data: response }: any = await createMakeOffer(formData)
      // console.log("🚀 ~ file: RentalOfferTCreate.tsx:271 ~ handleRentalOfferSubmit ~ response:", response)
      const updatedData = {
        id: response?.data.offer_id,
        accepted: false,
        offer_amount: data?.offer_amount.toString(),
        progress_status: false,
        inviter_id: userId,
        tenancy_period: response?.data?.tenancy_period,
        commencement_date: response?.data?.commencement_date,
        additional_request: response?.data?.additional_requirements,
        status: 'tenant_created',
        creator: payload?.tenantLandlordProgressInfo?.tenantInfo?.id,
        chatId: parseInt(getTimestamp()),
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

      ChatCreate('Rental Proposal Offer', 'RZY', payload?.threadInfo?.property_id, receiver, threadId, 'rental_offer', '')
      dispatch(hideLoader())
    } else {
      toast.error('Your Maximum Rental Offer is ' + session?.user?.userInfo?.max_rental_range + '.')
    }
  }

  let numb = 0

  const handleOccupierCount = (value: any) => {
    numb = parseInt(value)
    const change: number = numb - occupierCount
    const diff = value - occupierList.length
    const noOfOccupierWillAddOrRemov = Math.abs(diff)
    for (let i = 0; i < noOfOccupierWillAddOrRemov; i++) {
      if (diff > 0) {
        occupierListAppend({
          nric_type: '',
          nric_fin: '',
          full_name: '',
          birth_date: '',
          gender: '',
          citizen: '',
          nationality: '',
          race: '',
          pass_type: '',
          sector: '',
          relation: '',
        })
        setTabValue(value - 1)
      } else {
        occupierListRemove(occupierList.length - (i + 1))
        setTabValue(value - 1)
      }
    }
  }

  useEffect(() => {
    setOccupierCount(numb)
  }, [numb])

  return (
    <>
      {session?.user?.userInfo?.isOfferable || (roleType === 'landlord' && mutateType === 'details') ? (
        
        ( userInfo?.video_url != '' || mutateType === 'details' ? (
          <div className=" w-[50rem] md:w-[60rem] 2xl:w-[75rem] max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] pt-10 pb-2 rounded-b-[20px] overflow-auto gap-4 ">
            <form onSubmit={handleSubmit(handleRentalOfferSubmit)} className=" w-full flex flex-col gap-2">
              <div className=" w-full h-full flex flex-row gap-6">
                <div className="w-full h-full flex flex-col gap-6">
                  <FormControl className=" !w-full form-radio ">
                    <FormLabel id="demo-row-radio-buttons-group-label">Leasing Period</FormLabel>
                    <RadioGroup
                      className="!w-full !flex !flex-row  "
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={
                        rentalDetails?.makeOfferInfo?.renew_year ? rentalDetails?.makeOfferInfo?.renew_year : 1
                      }>
                      <FormControlLabel
                        disabled={mutateType === 'details' && roleType === 'landlord'}
                        {...register('leasing_period')}
                        className="!w-[40%] !border !border-[#D1D1D1] "
                        value="1"
                        control={<Radio />}
                        label="1 Year"
                      />
                      <FormControlLabel
                        disabled={mutateType === 'details' && roleType === 'landlord'}
                        {...register('leasing_period')}
                        className="!w-[40%] !border !border-[#D1D1D1]"
                        value="2"
                        control={<Radio />}
                        label="2 Years"
                      />
                    </RadioGroup>
                    <ErrorMessage
                      errors={errors}
                      name="leasing_period"
                      render={({ message }) => <p className="text-danger">{message}</p>}
                    />
                  </FormControl>
                  <div className=" w-full flex flex-row !gap-[1.28rem] md:!gap-[1.6rem] 2xl:!gap-8">
                    <DatePicker
                      className=" 2xl:!w-[16.25rem] !w-[14.25rem]  !bg-[#F1F7FF]   !shadow-[0px_4px_8px_#034EA11A]"
                      disabled={mutateType === 'details' && roleType === 'landlord'}
                      label="Commencement Date"
                      {...register('commencement_date')}
                      defaultValue={moment.utc(rentalDetails?.makeOfferInfo?.commencement_date)}
                      minDate={moment.utc(new Date())}
                      format="DD MMM, YY"
                      onChange={(e: any) => {
                        setCommDate(moment(e._d).format('YYYY-MM-DD'))
                      }}
                      sx={{
                        width: '100%',
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
                    <ErrorMessage
                      errors={errors}
                      name="commencement_date"
                      render={({ message }) => <p className="text-danger">{message}</p>}
                    />
                    <div>
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
                        className=" 2xl:!w-[13.75rem] !w-[11rem]  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] "
                        disabled={mutateType === 'details' && roleType === 'landlord'}
                        label="Offer Amount"
                        id="outlined-start-adornment"
                        defaultValue={Math.round(payload?.rentOffer?.offer_amount === "" || payload?.rentOffer?.offer_amount == "0.00" ? payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_amount : payload?.rentOffer?.offer_amount)}
                        {...register('offer_amount')}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="offer_amount"
                        render={({ message }) => <p className="text-danger">{message}</p>}
                      />
                    </div>
                  </div>
                  <div className=" w-full flex flex-row !gap-[1.28rem] md:!gap-[1.6rem] 2xl:!gap-8">
                    {/* tenant type */}
                    <div>
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
                        className=" 2xl:!w-[16.25rem] !w-[14.25rem]  !bg-[#F1F7FF]   !shadow-[0px_4px_8px_#034EA11A]">
                        <InputLabel id="demo-simple-select-label">Tenant Type</InputLabel>
                        <Select
                          disabled={mutateType === 'details' && roleType === 'landlord'}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          {...register('tenant_type', {
                            required: true,
                          })}
                          label="Tenant Type"
                          defaultValue={rentalDetails?.makeOfferInfo?.occupiers_list[0]?.tenant_type}>
                          <MenuItem value={'Personal'}>Personal</MenuItem>
                          <MenuItem value={'Organization'}>Organization</MenuItem>
                        </Select>
                      </FormControl>
                      <ErrorMessage
                        errors={errors}
                        name="tenant_type"
                        render={({ message }) => <p className="text-danger">{message}</p>}
                      />
                    </div>
                    <div>
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
                        className=" 2xl:!w-[13.75rem] !w-[11rem]  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] ">
                        <InputLabel id="demo-simple-select-label">Occupiers</InputLabel>
                        <Select
                          disabled={mutateType === 'details' && roleType === 'landlord'}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          {...register('occupiers_count', {
                            onChange: e => {
                              trigger('occupiers_count'), handleOccupierCount(e.target.value)
                            },
                          })}
                          label="Occupiers"
                          defaultValue={
                            rentalDetails?.makeOfferInfo?.occupiers_list?.length
                              ? parseInt(rentalDetails?.makeOfferInfo?.occupiers_list?.length)
                              : occucount
                          }>
                          <MenuItem value={'1'}>1</MenuItem>
                          <MenuItem value={'2'}>2</MenuItem>
                          <MenuItem value={'3'}>3</MenuItem>
                          <MenuItem value={'4'}>4</MenuItem>
                          <MenuItem value={'5'}>5</MenuItem>
                          <MenuItem value={'6'}>6</MenuItem>
                        </Select>
                      </FormControl>
                      <ErrorMessage
                        errors={errors}
                        name="occupiers_count"
                        render={({ message }) => <p className="text-danger">{message}</p>}
                      />
                    </div>
                  </div>
                  <TextField
                    sx={{
                      width: '100%',
                      backgroundColor: '#F1F7FF',
                      border: '1px solid #D1D1D1',
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
                      '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                          border: '1px solid #00ADEE',
                        },
                      },
                    }}
                    disabled={mutateType === 'details' && roleType === 'landlord'}
                    id="outlined-multiline-static"
                    label=""
                    {...register('additional_request')}
                    multiline
                    rows={4}
                    placeholder="Additional Request"
                    defaultValue={rentalDetails?.makeOfferInfo?.additional_requirements}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="additional_request"
                    render={({ message }) => <p className="text-danger">{message}</p>}
                  />
                </div>

                <div className=" border-l mt-4 border-solid h-[32.5rem] border-l-[#D4E8FF] ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]" />

                {/* occupiers */}
                <div className=" w-full h-full flex flex-col ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]  ">
                  <div className=" w-full flex justify-between items-center">
                    <h1 className="!text-[#202020] flex gap-2  !font-roboto !font-bold 2xl:!text-[1.25rem]/[1.5rem] !text-[1rem]/[1.25rem] ">
                      Occupiers <span>(Must be 1-6)</span>
                    </h1>
                  </div>
                  <Tabs className="!occupiersForm-tab" value={tabValue} onChange={handleTabChange}>
                    {occupierList.map((tab, index): any => (
                      <Tab
                        key={index}
                        label={`Occupier ${index + 1}`}
                        sx={{
                          color: '#999999',
                          '&.Mui-selected': {
                            color: '#00ADEE',
                          },
                        }}
                      />
                    ))}
                  </Tabs>
                  {occupierList.map((item, index) => (
                    <TabPanel key={index} value={tabValue} index={index}>
                      <OccupiersForm
                        disabled={mutateType === 'details' && roleType === 'landlord'}
                        item={item}
                        index={index}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        trigger={trigger}
                      />
                    </TabPanel>
                  ))}
                </div>
              </div>
              <div className="  !flex !w-full items-end !justify-start">
                <Button
                  disabled={mutateType === 'details' && roleType === 'landlord'}
                  type="submit"
                  variant="contained"
                  className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]">
                  Save
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-auto max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto flex flex-col  ">
            <h1 className="text-[#EEA840] 2xl:text-[1.75rem]/[2.125rem] text-[1.4rem]/[1.7rem] capitalize font-semibold mb-7 ">
              Intro video Alert!
            </h1>
            <p className=" text-[#505050] text-[1rem]/[1.25rem] font-normal font-roboto mb-5 pb-5">
              Introductory video required. Please note that your self introduction video MUST include:
            </p>

            <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
              1. Your full name
            </p>
            <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
              2. Nationality
            </p>
            <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
              3. Occupation & name of employer
            </p>
            <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
              4. Who will be staying in the rental property with you, or alone
            </p>
            <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
              5. Your desired property type and number of bedrooms
            </p>
            <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
              6. Lease duration (how many years rental)
            </p>
            <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
              7. Other information that will be important for the landlord's consideration. Eg you have pets
            </p>

            <div className="flex justify-end gap-2 mt-14">
              <Button
                variant="contained"
                className="!bg-[#00ADEE] !text-[#FFFFFF] !font-roboto !h-[40px]"
                onClick={() => dispatch(hideModal(MAKE_RENTAL_PROPOSAL_CREATE))}>
                Later
              </Button>
              <Link passHref href={{ pathname: '/dashboard/personal-info', query: { compleIv: true } }}>
                <Button
                  className="!bg-[#00ADEE] !text-[#FFFFFF] !font-roboto !h-[40px]"
                  variant="contained"
                  onClick={() => {
                    dispatch(hideModal(MAKE_RENTAL_PROPOSAL_CREATE))
                  }}>
                  Add Intro Video
                </Button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="w-auto max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto flex flex-col  ">
          <h1 className="text-[#EEA840] 2xl:text-[1.75rem]/[2.125rem] text-[1.4rem]/[1.7rem] capitalize font-semibold mb-7 ">
            Profile Completion Alert!
          </h1>
          <p className=" text-[#505050] text-[1rem]/[1.25rem] font-normal font-roboto mb-5 pb-5">
            You did not complete your profile's required fields. This is important to calculate your credit score. Based
            on the credit score you can enjoy the deposit free service. Required field of credit scoring.
          </p>

          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            Salary (All Occupants): s$ {userInfo?.salary ? userInfo?.salary : ''}
          </p>
          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            Outstanding Loans: s$ {userInfo?.outstanding_loan ? userInfo?.outstanding_loan : ''}
          </p>
          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            Gender: {userInfo?.gender ? userInfo?.gender : ''}
          </p>
          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            Local/Foreigner: {userInfo?.nationality ? userInfo?.nationality : ''}
          </p>
          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            Maritial Status: {userInfo?.marital_status ? userInfo?.marital_status : ''}
          </p>
          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            Education Level: {userInfo?.education_level ? userInfo?.education_level : ''}
          </p>
          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            Age Ratio: {userInfo?.age ? userInfo?.age : ''}
          </p>
          <p className="text-[#EEA840] text-[1.125rem]/[1.375rem] font-roboto font-semibold capitalize ">
            CBS Ratio: {userInfo?.cbs_score ? userInfo?.cbs_score : ''}
          </p>

          <div className="flex justify-end gap-2 mt-14">
            <Button
              variant="contained"
              className="!bg-[#00ADEE] !text-[#FFFFFF] !font-roboto !h-[40px]"
              onClick={() => dispatch(hideModal(MAKE_RENTAL_PROPOSAL_CREATE))}>
              Later
            </Button>
            <Link passHref href={{ pathname: '/dashboard/personal-info', query: { complePro: true } }}>
              <Button
                className="!bg-[#00ADEE] !text-[#FFFFFF] !font-roboto !h-[40px]"
                variant="contained"
                onClick={() => {
                  dispatch(hideModal(MAKE_RENTAL_PROPOSAL_CREATE))
                }}>
                Complete Profile
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default RentalOfferTCreate
