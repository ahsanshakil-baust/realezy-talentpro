import { Icon } from '@/components/shared'
import { Box, Button } from '@mui/material' // , Tab, Tabs
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// import uploadDrag from '@/public/uploadDrag.svg'
import { updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress' // ChatCreate, 
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useCreateInsuranceMutation,
  useMultiFileUploadMutation,
} from '@/store'
import { INSURANCE_AND_REALEZY_SERVICE_FEE_PAY } from '@/store/chatProgress/progress/constant'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

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

const Insurance = () => {
  const [profPaymentFile, setProfPaymentFile] = useState<File | null>(null)
  const [imageFile, setImageFile]: any = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { data: session }: any = useSession()
  const [uploadFiles] =
    useMultiFileUploadMutation() // , { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }
  const [createInsurance] = useCreateInsuranceMutation() // , { isError, isLoading, data }
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  // const [insurance, setInsurance] = useState<File | null>(null)
  // const receiver =
  //   session?.user?.id === payload?.threadInfo?.sender_id
  //     ? payload?.threadInfo?.receiver_id
  //     : payload?.threadInfo?.sender_id

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

  const dispatch = useDispatch()

  const handleInsuranceService = async (_: any) => {
    const formData = new FormData()
    formData.append('media[0]', imageFile)
    const res: any = await uploadFiles(formData)
    const url = res.data.url[0]

    const insuranceServiceData = {
      property_id: parseInt(payload?.threadInfo?.property_id),
      landlord_id: parseInt(payload?.threadInfo?.receiver_id),
      tenant_id: parseInt(payload?.threadInfo?.sender_id),
      purpose: 'rzy_insurance_fee',
      doc_url: url,
    }

    store.dispatch(hideModal(INSURANCE_AND_REALEZY_SERVICE_FEE_PAY))
    dispatch(showLoader('Uploading Insurance & RealEzy Service Fee'))

    const { data: response }: any = await createInsurance(insuranceServiceData)

    dispatch(hideLoader())

    // dispatch(showModal({
    //   open: true,
    //   name: 'Payment_Successfull',
    //   children: <div>
    //     <p className='text-justify text-md'>Your First Month Rental payment has been successfully submitted for verification</p>
    //     <div className='mt-16 flex justify-end'>
    //       <Button onClick={()=>dispatch(hideModal('Payment_Successfull'))} variant='contained' className='w-24' >Done</Button>
    //     </div>
    //   </div>
    // }))

    const updatedData = {
      status: 'Uploaded',
      progress_status: false,
    }
    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'rzyServiceFee',
      updatedData
    )
    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'rzyServiceFee',
      updatedData
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleInsuranceService)}
      className=" w-full flex flex-col bg-inherit max-h-[520px] 2xl:max-h-[700px]  rounded-b-[20px] overflow-auto gap-4 ">
      <div className=" w-full flex bg-[#F8FBFF] px-9 py-7 rounded-[10px] border border-solid border-[#D4E8FF]">
        <div className=" w-full flex flex-col ">
          <div className="w-full">
            <h5 className="font-semibold font-roboto 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#202020] tracking-[0.025rem] mb-3">
              Property Info
            </h5>
            <div className="w -full flex flex-col  items-start gap-5">
              <img
                // style={{ height: '150px', borderRadius: '20px' }}
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
                  {payload?.tenantLandlordProgressInfo?.propertyInfo?.name.toLowerCase()}
                </p>

                <p className=" flex font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#505050] tracking-[0.16px]">
                  <Icon
                    className="w-3 h-4 font-normal font-roboto tracking-[0.32px] text-[#505050] mr-2"
                    name="marker"
                  />
                  {payload?.tenantLandlordProgressInfo?.propertyInfo?.address.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-l  border-solid h-[32.5rem] border-l-[#D4E8FF] ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]" />

        <div className="w-full ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]">
          <div className=" w-full flex flex-col">
            <div className="flex ">
              <h5 className="font-semibold font-roboto 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#202020] tracking-[0.025rem] mb-3">
                Insurance Payment Confirmation
              </h5>
            </div>
            <div className="mb-3">
              <div className="">
                <div className="w-full flex flex-col gap-4 ">
                  <p className="w-full flex justify-between items-center gap-2 font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                    <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                      Rental Period :
                    </span>
                    {payload?.rentOffer?.tenancy_period} year
                  </p>
                  <p className="w-full flex justify-between items-center gap-2 font-normal font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#000000]">
                    <span className=" font-[300] font-roboto 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#202020]">
                      Insurance & RealEzy Service Fee (1 Year) :
                    </span>
                    S${parseFloat(payload?.rentOffer?.offer_amount) * 0.25}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            {/* <h5 className="">Upload screenshot of prof of payment First Month's Rental</h5> */}
            <div className="p-0 flex flex-col gap-2 justify-center">
              <Button
                variant="text"
                component="label"
                className="!flex !flex-col !justify-center !gap-2 !bg-detailsCard !rounded-2xl !border-2 !border-uranianBlue !border-dashed">
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
                <h1 className="text-md">Upload Insurance & Service Fee Payment Receipt</h1>
                <Image
                  src={profPaymentFile == null ? '/chat/chatProgressForm/uploadimg.svg' : `${profPaymentFile}`}
                  alt="no-fall-back"
                  width="71"
                  height="71"
                />

                <h1 className="text-md">(Image/PDF)</h1>
              </Button>
              {errors?.file?.type === 'required' && <p className="text-red-700">You need to provide a Payment</p>}
            </div>
          </div>
          <div className="mt-12 flex justify-end">
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
    </form>
  )
}

export default Insurance
