// import { Icon } from '@/components/shared'
// import { Box, Tab, Tabs } from '@mui/material'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import uploadDrag from '@/public/uploadDrag.svg'
// import { useDispatch, useSelector } from 'react-redux'
// import store, {
//   hideLoader,
//   hideModal,
//   showLoader,
//   useCreatePaymentMutation,
//   useMultiFileUploadMutation,
//   useTenantLandlordProgressInfoMutation,
// } from '@/store'
// import { useSession } from 'next-auth/react'
// import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
// import { rentalFeeProcessingMessage } from '@/const'
// import { PAY_FIRST_MONTH_RENTAL_PAY } from '@/store/chatProgress/progress/constant'

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}>
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <h4>{children}</h4>
//         </Box>
//       )}
//     </div>
//   )
// }

// const getTimestamp = () => {
//   let timestamp = Date.now()

//   return timestamp.toString()
// }

// const FirstMonthRental = () => {
//   const { data: session }: any = useSession()
//   const sender = session?.user?.id

//   const [value, setValue] = React.useState(0)
//   const [firstMonthRental, setFirstMonthRental] = useState<File | null>(null)
//   const [stampFile, setStampFile] = useState<File | null>(null)
//   const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
//   const [uploadFiles, { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }] =
//     useMultiFileUploadMutation()

//   const receiver =
//     session?.user?.id === payload?.threadInfo?.sender_id
//       ? payload?.threadInfo?.receiver_id
//       : payload?.threadInfo?.sender_id
//   const [createPayment, { isError, isLoading, data }] = useCreatePaymentMutation()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const uploadImage = (e: any) => {
//     const file = e.target.files[0]
//     const reader: any = new FileReader()
//     reader.onloadend = () => {
//       setFirstMonthRental(reader.result)
//     }

//     if (file) {
//       reader.readAsDataURL(file)
//     }
//   }
//   /* const stampUploadImage = (e: any) => {
//     const file = e.target.stamp_files[0]
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setStampFile(reader.result)
//     }

//     if (file) {
//       reader.readAsDataURL(file)
//     }
//   } */

//   // todo file upload icon need to fixed
//   const dispatch = useDispatch()
//   const HandleFirstMonthReantSubmit = async (data: any) => {
//     console.log('data first month', data)
//     const formData = new FormData()

//     formData.append('media[0]', data.file[0])
//     const res: any = await uploadFiles(formData)
//     const url = res.data.url[0]

//     const firstRentalMonthData = {
//       tenant_id: payload?.threadInfo?.sender_id,
//       landlord_id: payload?.threadInfo?.receiver_id,
//       description: 'First Month Rental',
//       purpose: 'rzy_first_month_rental_fee',
//       mode: 'Manual',
//       amount: payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_amount,
//       payment_ref_id: 'gnamlymh',
//       doc_url: url,
//       property_id: payload?.threadInfo?.property_id,
//       // stamp_duty_amount: 1000,
//       // stamp_duty_doc_url: 'stampUrl',
//     }

//     store.dispatch(hideModal(PAY_FIRST_MONTH_RENTAL_PAY))

//     dispatch(showLoader('Uploading First Month Rental'))

//     const { data: response }: any = await createPayment(firstRentalMonthData)
//     console.log('response', response)
//     dispatch(hideLoader())

// ChatCreate(
//   rentalFeeProcessingMessage,
//   'RZY',
//   payload.threadInfo?.property_id,
//   receiver,
//   payload.threadInfo?.id,
//   'RZYADMIN',
//   ''
// )

// const updatedData = {
//   amount: payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_amount,
//   progress_status: false,
//   status: 'tenant_paid',
//   time: parseInt(getTimestamp()),
// }

// updateTenantProgress(
//   `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
//   'firstMonthRental',
//   updatedData
// )
// updateLandlordProgress(
//   `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
//   'firstMonthRental',
//   updatedData
// )
//   }

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue)
//   }
//   return (
//     <div className="bg-inherit flex flex-col w-full max-h-[690px] overflow-auto p-5">
//       <div>
//         <div>
//           <div className="">
//             <h5 className="font-semibold mb-3">Property Info</h5>
//             <div className=" flex items-center gap-5">
//               <img style={{ height: '150px', borderRadius: '20px' }} src="/NoImageProperty.jpg" alt="" />
//               <div className="">
//                 <p className="">property name</p>
//                 <p className="">Rent: $5000 /month</p>
//                 <p className="">Address: Serangoon Garden Estate</p>
//               </div>
//             </div>
//           </div>
//           <div className="">
//             <h5 className="font-semibold mt-5">Payment Details</h5>
//             <div className="">
//               <div className="">
//                 <div className="flex justify-between my-5">
//                   <div className="">
//                     <p className="font-medium flex items-center gap-3">
//                       First Month Rental <Icon name="infoPop" />
//                     </p>
//                     <p className="font-medium flex items-center gap-3">
//                       Total IRAS Stump duty <Icon name="infoPop" />
//                     </p>
//                   </div>
//                   <div className="">
//                     <span className="font-medium">$ 510.00</span>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="flex justify-between my-5">
//                   <div className="">
//                     <span className="font-medium">Pay (Refundable)</span>
//                   </div>
//                   <div className="">
//                     <span className="font-medium">$ 510.00</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="">
//         <h5 className="font-semibold mt-5">Payment Method</h5>
//         <div className="">
//           <div className="">
//             <Box sx={{ width: '100%' }}>
//               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                   <Tab label="Pay Now" />
//                   <Tab label="Bank Transfer" />
//                   <Tab label="SGQR" />
//                 </Tabs>
//               </Box>
//               <TabPanel value={value} index={0}>
//                 <div className="">
//                   <div className="flex justify-between">
//                     <div className="">
//                       <span>Pay Now ID :</span>
//                     </div>

//                     <div className="">
//                       <span>2022525252336</span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="">
//                       <span>UEN No :</span>
//                     </div>

//                     <div className="">
//                       <span>2022525252336</span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="">
//                       <span>Account Name :</span>
//                     </div>
//                     <div className="">
//                       <span>Real Ezy Pte Ltd</span>
//                     </div>
//                   </div>
//                 </div>
//               </TabPanel>
//               <TabPanel value={value} index={1}>
//                 <div className="px-2">
//                   <p className="flex justify-between">
//                     Bank Name : <span>Maybank</span>
//                   </p>
//                   <p className="flex justify-between">
//                     Account Name : <span>Real Ezy Pte Ltd</span>
//                   </p>
//                   <p className="flex justify-between">
//                     Account Number : <span>04011137475</span>
//                   </p>
//                   <p className="flex justify-between">
//                     Swift Code : <span>04011137475</span>
//                   </p>
//                 </div>
//               </TabPanel>
//               <TabPanel value={value} index={2}>
//                 <div className="px-2">
//                   <p>Scan QR Code</p>
//                 </div>
//               </TabPanel>
//             </Box>
//             <div className="text-center">
//               <span className="border border-primary py-1 px-5 rounded-2xl inline-block text-secondary mb-5">
//                 View Instructions
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit(HandleFirstMonthReantSubmit)}>
//         <div className="text-center">
//           <h5 className="">Upload screenshot of prof of payment First Month's Rental</h5>
//           <div className="p-0">
//             <label htmlFor="uploadHdb" className="cursor-pointer hidden">
//               <Image src={uploadDrag} width={'100%'} height={'100%'} alt="" />
//             </label>
//             <input
//               accept=".jpeg,.jpg,.png,.pdf"
//               type="file"
//               {...register('file', {
//                 required: true,
//               })}
//               onChange={uploadImage}
//               id=""
//             />
//             <img
//               style={{ width: '250px', height: '250px' }}
//               src={firstMonthRental == null ? './NoImageProperty.jpg' : `${firstMonthRental}`}
//               alt=""
//             />
//             {errors?.file?.type === 'required' && <p className="text-red-700">You need to provide a Booking Payment</p>}
//           </div>
//           {/*  <div className="mt-5 shadow-lg p-3 my-2 rounded">
//             <div className="p-2">
//               <p>Upload Stamp Certificate</p>
//               <input type="file" multiple={true} id="" {...register('stamp_files')} onChange={stampUploadImage} />
//               <img
//                 style={{ width: '250px', height: '250px' }}
//                 src={stampFile == null ? '/no-image.jpg' : stampFile}
//                 alt=""
//               />
//             </div>
//           </div> */}
//         </div>

//         <div className="text-center mt-5">
//           <button
//             className="px-10 py-2 rounded-lg font-roboto font-medium bg-[#034EA1] text-white text-lg cursor-pointer"
//             type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default FirstMonthRental

import { Icon } from '@/components/shared'
import { rentalFeeProcessingMessage } from '@/const' // PROPERTIES_BOOKINGS, bookingFeeReceiptApprovalMessage,
import {
  hideLoader,
  hideModal,
  showLoader,
  showModal,
  // useCreateAppointmentMutation,
  useCreatePaymentMutation,
  useMultiFileUploadMutation,
} from '@/store'
import {
  PAY_FIRST_MONTH_RENTAL_PAY,
  // PAY_RESERVATION_FEE_PAY,
  // PAY_RESERVATION_FEE_REQUEST,
} from '@/store/chatProgress/progress/constant'
import { calculateIrasStampDutyAndGST } from '@/store/chatProgress/progress/progressStatusHandler'
import { StoreThunkDispatch } from '@/types'
// import { getReservationFee } from '@/util'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress' //  fireStoreSaveDocument,
import { Box, Button, Tab, Tabs } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

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
      {value === index && (
        <Box sx={{ p: 0 }}>
          <h4>{children}</h4>
        </Box>
      )}
    </div>
  )
}

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

const FirstMonthRental = () => {
  const [value, setValue] = React.useState(0)

  const { data: session }: any = useSession()

  const [imageFile, setImageFile]: any = useState(null)

  const [profPaymentFile, setProfPaymentFile] = useState<File | null>(null)
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const [uploadFiles] =
    useMultiFileUploadMutation() // , { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }

  const [createPayment] = useCreatePaymentMutation() // , { isError, isLoading, data }
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const uploadImage = (e: any) => {
    setImageFile(e.target.files[0])
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setProfPaymentFile(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const dispatch = useDispatch<StoreThunkDispatch>()

  const handleBookingPaySubmit = async (data: any) => {

    const formData = new FormData()
    formData.append('media[0]', imageFile)
    const res: any = await uploadFiles(formData)
    const url = res.data.url[0]

    const bookingFormData = {
      // mode: 'payNow',
      // property_id: payload?.threadInfo?.property_id,
      // purpose: 'rzy_booking_fee',
      // tenant_id: payload?.threadInfo?.sender_id,
      // landlord_id: payload?.threadInfo?.receiver_id,
      // amount: payload?.rentOffer?.offer_amount,
      // doc_url: url,
      tenant_id: payload?.threadInfo?.sender_id,
      landlord_id: payload?.threadInfo?.receiver_id,
      description: 'First Month Rental',
      purpose: 'rzy_first_month_rental_fee',
      mode: 'Manual',
      amount: calculateIrasStampDutyAndGST(payload?.rentOffer?.offer_amount, payload?.rentOffer?.tenancy_period)[3],
      payment_ref_id: 'gnamlymh',
      doc_url: url,
      property_id: payload?.threadInfo?.property_id,
      // stamp_duty_amount: 1000,
      // stamp_duty_doc_url: 'stampUrl',
    }

    /*

    paymentBody['property_id'] = widget.pModel.data.id;
                        paymentBody['tenant_id'] = data.data.id;
                        paymentBody['landlord_id'] = widget.pModel.data.userId;
                        paymentBody['purpose'] = "rzy_booking_fee";
                        paymentBody['mode'] = _paymentModeValue == 0
                            ? "PayNow"
                            : _paymentModeValue == 1
                                ? "Bank Transfer"
                                : _paymentModeValue == 2
                                    ? "SGQR"
                                    : "Cash Pay";
                        paymentBody["doc_url"] = paymentProofDocumentUrl;

    */

    dispatch(hideModal(PAY_FIRST_MONTH_RENTAL_PAY))

    dispatch(showLoader('Processing...'))
    const { data: response }: any = await createPayment(bookingFormData)
    dispatch(hideLoader())

    dispatch(
      showModal({
        open: true,
        name: 'Payment_Successfull',
        children: (
          <div className=" flex flex-col px-[3.25rem] py-4 bg-inherit rounded-b-[20px]">
            <p className="text-justify text-md">
              Your First Month Rental payment has been successfully submitted for verification.
            </p>
            <div className="mt-8 flex justify-end">
              <Button onClick={() => dispatch(hideModal('Payment_Successfull'))} variant="contained" className="!w-24">
                Done
              </Button>
            </div>
          </div>
        ),
      })
    )

    ChatCreate(
      rentalFeeProcessingMessage,
      'RZY',
      payload.threadInfo?.property_id,
      receiver,
      payload.threadInfo?.id,
      'RZYADMIN',
      ''
    )

    const updatedData = {
      amount: payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_amount,
      progress_status: false,
      status: 'tenant_paid',
      time: parseInt(getTimestamp()),
    }

    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'firstMonthRental',
      updatedData
    )
    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'firstMonthRental',
      updatedData
    )
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className="bg-inherit w-full md:min-w-[1020px] max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4  overflow-auto rounded-b-[20px]">
      <form className=" w-full flex flex-col items-start" onSubmit={handleSubmit(handleBookingPaySubmit)}>
        <div className=" bg-[#F8FBFF] rounded-[10px] border border-solid border-[#D4E8FF] py-7 px-9 w-full flex  items-start gap-6">
          <div className=" w-full flex flex-col ">
            <div className="">
              <h5 className="font-medium font-roboto 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#202020] tracking-[0.025rem] mb-3">
                Property Info
              </h5>{' '}
              <div className=" flex flex-col gap-5">
                <img
                  className="2xl:w-[25rem] 2xl:h-[13.75rem] w-[20rem] h-[11rem] object-cover rounded-[10px]"
                  src={
                    payload?.tenantLandlordProgressInfo?.propertyInfo?.details.cover_image_url
                      ? payload?.tenantLandlordProgressInfo?.propertyInfo?.details.cover_image_url
                      : '/NoImageProperty.jpg'
                  }
                  alt=""
                />
                <div className=" w-full justify-between flex">
                  <p className=" font-roboto font-normal 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#505050] tracking-[0.16px] ">
                    <span className=" font-roboto font-normal 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#00ADEE] tracking-[0.16px]">
                      {payload?.tenantLandlordProgressInfo?.propertyInfo?.details?.rental_type}
                    </span>
                    &nbsp; - &nbsp;
                    {payload?.tenantLandlordProgressInfo?.propertyInfo?.details?.unit_type}
                  </p>
                  <p className=" font-roboto font-medium 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#034EA1] tracking-[0.16px]">
                    Rent: &nbsp;
                    <span className="font-bold font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#034EA1] tracking-[0.16px]">
                      ${payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_amount}/mo{' '}
                    </span>
                  </p>
                </div>
                <div className="">
                  <p className="font-medium font-roboto text-[1.125rem]/[1.375rem] text-[#202020] tracking-[0.0225rem]">
                    {payload?.tenantLandlordProgressInfo?.propertyInfo?.name}
                  </p>

                  <p className=" flex font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[5205050] tracking-[0.16px]">
                    <Icon
                      className="w-3 h-4 font-normal font-roboto tracking-[0.32px] text-[#505050] mr-2"
                      name="marker"
                    />
                    {payload?.tenantLandlordProgressInfo?.propertyInfo?.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <h5 className="font-medium font-roboto 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#202020] tracking-[0.025rem] mt-5">
                Payment Details
              </h5>
              <div className="">
                <div className="">
                  <div className="flex justify-between my-5">
                    <div className=" flex">
                      <span className="font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[5205050] tracking-[0.16px]">
                        First Month Rental Fee
                      </span>
                      <img src="/chat/chatProgressForm/info.svg" alt="info" className="w-4 h-4 ml-2" />
                    </div>
                    <div className="">
                      <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[5205050] tracking-[0.16px]">
                        S${payload?.rentOffer?.offer_amount}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between my-5">
                    <div className="">
                      <span className="font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[5205050] tracking-[0.16px]">
                        Total IRAS Stamp duty & GST{' '}
                      </span>
                    </div>
                    <div className="">
                      <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[5205050] tracking-[0.16px]">
                        ${calculateIrasStampDutyAndGST(payload?.rentOffer?.offer_amount, payload?.rentOffer?.tenancy_period)[2]}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between my-5">
                    <div className="">
                      <span className="font-medium font-roboto text-[1.125rem]/[1.375rem] text-[#202020] tracking-[0.18px]">
                        Pay (Refundable)
                      </span>
                    </div>
                    <div className="">
                      <span className="font-medium font-roboto text-[1.125rem]/[1.375rem] text-[#202020] tracking-[0.18px]">
                        ${calculateIrasStampDutyAndGST(payload?.rentOffer?.offer_amount, payload?.rentOffer?.tenancy_period)[3]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" border-l  border-solid h-[32.5rem] border-l-[#D4E8FF] ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]" />

          <div className="ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem] w-full">
            <div className="">
              <h5 className="font-medium font-roboto 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#202020] tracking-[0.025rem] mb-3">
                Payment Methods
              </h5>
              <div className="">
                <div className="">
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',

                      '& .MuiBox-root ': {
                        padding: '0px',
                      },
                    }}>
                    <Box
                      sx={{
                        width: '85%',
                        backgroundColor: '#cad9e9',
                        borderRadius: '21px',
                        '& .MuiTab-textColorPrimary:hover':{
                          color:'#fff'
                        }
                      }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        className="2xl:!text-[1rem]/[1.1875rem]  !text-[0.8rem]/[1rem]"
                        sx={{
                          '& .MuiTabs-flexContainer': {
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'start',
                          },
                          '& .MuiTabs-indicator': {
                            backgroundColor: 'transparent !important',
                          },
                          '& .Mui-selected': {
                            backgroundColor: '#00ADEE   !important',
                            color: '#FFFFFF !important ',
                            borderRadius: '21px',
                            px: '1.7rem',

                            // py: '0.5rem',
                          },
                        }}>
                        <Tab label="Pay Now" />
                        <Tab label="Bank Transfer" />
                        <Tab label="SGQR" />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <div className="w-full pt-4 flex flex-col gap-4">
                        <div className="w-full flex justify-between">
                          <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                            Pay Now ID :
                          </span>

                          <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                            202126955R
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <div className="">
                            <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                              UEN No :
                            </span>
                          </div>

                          <div className="">
                            <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                              202126955R002
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="">
                            <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                              Account Name :
                            </span>
                          </div>
                          <div className="">
                            <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                              Real Ezy Pte. Ltd.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-start">
                        <button
                        type='button'
                          onClick={() =>
                            dispatch(
                              showModal({
                                open: true,
                                name: 'Pay Now Corporate',
                                children: (
                                  <div className=" flex flex-col px-8 py-5 bg-[#FFFFFF] rounded-b-[20px]">
                                    {/* <h1 className="text-2xl">PayNow Corporate</h1> */}
                                    <p className="font-normal font-roboto 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#202020] mb-5">
                                      Log in to your banking application/internet banking
                                    </p>
                                    <h2 className="font-medium font-roboto text-[1.375rem]/[1.6875rem] text-[#202020] mb-5">
                                      Select PayNow
                                    </h2>
                                    <div className="flex justify-start gap-1">
                                      <svg
                                        className="w-5 h-5 text-[#A1A1A1] dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 10 16">
                                        <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                                      </svg>
                                      <p className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#505050] mb-2">
                                        Select Unique Entity Number (UEN)
                                      </p>
                                    </div>
                                    <div className="m-4 gap-1 flex justify-start">
                                      <svg
                                        className="w-5 h-5 text-[#A1A1A1] dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path
                                          fill="currentColor"
                                          d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                                        />
                                      </svg>
                                      <p className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#505050] mb-2">
                                        Enter 202126955R - "REAL EZY PTE. LTD."
                                      </p>
                                    </div>
                                    <div className="flex justify-start gap-1">
                                      <svg
                                        className="w-5 h-5 text-[#A1A1A1] dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 10 16">
                                        <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                                      </svg>
                                      <p className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#505050] mb-2">
                                        Enter SGD amount and make payment
                                      </p>
                                    </div>
                                  </div>
                                ),
                              })
                            )
                          }
                          className=" bg-[#00ADEE] flex items-center py-3 px-5 font-roboto font-normal capitalize 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#FFFFFF] rounded-[10px] shadow-[1px_2px_6px_#0000001A0] my-5">
                          <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.5"
                            height="16.5"
                            viewBox="0 0 16.5 16.5">
                            <g id="info" transform="translate(0.25 0.25)">
                              <g id="Group_11499" data-name="Group 11499">
                                <g id="Group_11498" data-name="Group 11498">
                                  <path
                                    id="Path_21344"
                                    data-name="Path 21344"
                                    d="M200.958,218.657a.846.846,0,0,1-.51-.115.53.53,0,0,1-.146-.435,2.259,2.259,0,0,1,.047-.4,4.358,4.358,0,0,1,.1-.443l.467-1.606a2.428,2.428,0,0,0,.095-.486c0-.178.024-.3.024-.372a1.04,1.04,0,0,0-.368-.826,1.546,1.546,0,0,0-1.044-.316,2.709,2.709,0,0,0-.791.131q-.419.13-.882.312l-.134.522c.091-.032.2-.067.328-.107a1.342,1.342,0,0,1,.372-.055.759.759,0,0,1,.5.123.573.573,0,0,1,.131.431,1.873,1.873,0,0,1-.044.4q-.042.208-.107.439l-.471,1.613a4.618,4.618,0,0,0-.091.455,2.825,2.825,0,0,0-.028.4,1.032,1.032,0,0,0,.4.819,1.582,1.582,0,0,0,1.06.324,2.44,2.44,0,0,0,.791-.115q.336-.115.9-.328l.127-.5a2.184,2.184,0,0,1-.312.1A1.5,1.5,0,0,1,200.958,218.657Z"
                                    transform="translate(-191.869 -206.972)"
                                    fill="#FFFFFF"
                                  />
                                  <path
                                    id="Path_21345"
                                    data-name="Path 21345"
                                    d="M250.785,128.37a1.306,1.306,0,0,0-1.843,0,1.3,1.3,0,0,0-.115,1.71,1.158,1.158,0,0,0,.115.126,1.289,1.289,0,0,0,1.843,0,1.3,1.3,0,0,0,.108-1.717A1.162,1.162,0,0,0,250.785,128.37Z"
                                    transform="translate(-241.203 -124.325)"
                                    fill="#FFFFFF"
                                  />
                                  <path
                                    id="Path_21346"
                                    data-name="Path 21346"
                                    d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,15.273A7.273,7.273,0,1,1,15.273,8,7.273,7.273,0,0,1,8,15.273Z"
                                    fill="#FFFFFF"
                                    stroke="#00adee"
                                    strokeWidth="0.5"
                                  />
                                </g>
                              </g>
                            </g>
                          </svg>
                          View Instructions
                        </button>
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <div className="w-full pt-4 flex flex-col gap-4">
                        <p className="w-full flex">
                          <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                            Bank Name :
                          </span>
                          <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000] text-end">
                            Oversea-Chinese Banking Corporation
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                            Account Name :
                          </span>
                          <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                            Real Ezy Pte. Ltd
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                            Account Number :
                          </span>
                          <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                            601890734001
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                            UEN :
                          </span>
                          <span className="font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                            202126955R
                          </span>
                        </p>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() =>
                            dispatch(
                              showModal({
                                open: true,
                                name: 'Pay Now Corporate',
                                children: (
                                  <div className=" flex flex-col px-8 py-5 bg-[#FFFFFF] rounded-b-[20px]">
                                    {/* <h1 className="text-2xl">Bank Transfer to Maybank Corporate Account</h1> */}
                                    <div className="flex justify-start gap-1">
                                      <svg
                                        className="w-5 h-5 text-[#A1A1A1] dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 10 16">
                                        <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                                      </svg>
                                      <p>Bank: Maybank</p>
                                    </div>
                                    <div className="flex justify-start gap-1">
                                      <svg
                                        className="w-5 h-5 text-[#A1A1A1] dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 10 16">
                                        <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                                      </svg>
                                      <p>Account Name: REAL EZY PTE. LTD.</p>
                                    </div>
                                    <div className="flex justify-start gap-1">
                                      <svg
                                        className="w-5 h-5 text-[#A1A1A1] dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 10 16">
                                        <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                                      </svg>
                                      <p>Account Number: 04011137475</p>
                                    </div>
                                    <div className="flex justify-start gap-1">
                                      <svg
                                        className="w-5 h-5 text-[#A1A1A1] dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 10 16">
                                        <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                                      </svg>
                                      <p>Swift Code: MBBESGSG</p>
                                    </div>
                                  </div>
                                ),
                              })
                            )
                          }
                          className=" bg-[#00ADEE] flex items-center py-3 px-5 font-roboto font-normal capitalize 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#FFFFFF] rounded-[10px] shadow-[1px_2px_6px_#0000001A0] my-5">
                          View Instructions
                        </button>
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <div className="px-2 flex justify-center">
                        <Image src="/download/sgqr.jpeg" alt="sgqr" width="300" height="400" />
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() =>
                            dispatch(
                              showModal({
                                open: true,
                                name: 'Scan To Pay',
                                children: (
                                  <div className="flex justify-center w-full">
                                    <Image src="/download/sgqr.jpeg" alt="sgqr" width="550" height="700" />
                                  </div>
                                ),
                              })
                            )
                          }
                          className="border border-primary py-1 px-5 rounded-2xl inline-block text-secondary mb-5">
                          Full View
                        </button>
                      </div>
                    </TabPanel>
                  </Box>
                </div>
              </div>
            </div>
            <div className="text-center">
              {/* <h5 className="">Upload screenshot of prof of payment First Month's Rental</h5> */}
              <div className="p-0 flex flex-col gap-2 justify-center">
                <Button
                  variant="text"
                  component="label"
                  className="!flex !gap-2 !bg-[#f1f7ff] !rounded-[10px]  !px-[1rem] !py-[0.9rem] !border !border-[#00ADEE] !border-dashed">
                  <input
                    accept=".jpeg,.jpg,.png,.pdf"
                    hidden
                    type="file"
                    {...register('file', {
                      required: true,
                    })}
                    onChange={uploadImage}
                    id="file"
                  />

                  <Image
                    src={profPaymentFile == null ? '/chat/chatProgressForm/uploadimg.svg' : `${profPaymentFile}`}
                    alt="no-fall-back"
                    width="71"
                    height="71"
                  />

                  <div className=" w-full flex flex-col justify-center">
                    <p className=" text-left font-medium font-roboto text-[#505050] text-[1.25rem]/[1.375rem] mb-3">
                      Image or PDF
                    </p>

                    <p className="text-left font-noraml font-roboto text-[#A1A1A1] 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem]">
                      Upload screenshot of proof of payment
                    </p>
                  </div>
                </Button>
                {errors?.file?.type === 'required' && (
                  <p className="text-red-700">You need to provide a Booking Payment</p>
                )}
              </div>
              <div className="text-center w-full flex justify-end mt-[60px]">
                <Button
                  variant="contained"
                  className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]"
                  type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* <div className=" mt-5">
          <Button
            variant="contained"
            className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]"
            type="submit">
            Submit
          </Button>
        </div> */}
      </form>
    </div>
  )
}

export default FirstMonthRental
