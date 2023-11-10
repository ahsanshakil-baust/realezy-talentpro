import { Icon } from '@/components/shared'
import { Box, Tab, Tabs } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import uploadDrag from '@/public/uploadDrag.svg'
import { useDispatch, useSelector } from 'react-redux'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useCreatePaymentMutation,
  useMultiFileUploadMutation,
  useTenantLandlordProgressInfoMutation,
  useUpdateAgreementMutation,
} from '@/store'
import { useSession } from 'next-auth/react'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { draft_tenant_sign, rentalFeeProcessingMessage } from '@/const'
import UpdateAgreement from '../landlord/UpdateAgreement'
import { Button } from '@mui/material'
import { SIGN_THE_AGREEMENT } from '@/store/chatProgress/progress/constant'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

const TenantSignAgreement = () => {
  const dispatch = useDispatch()

  const { data: session }: any = useSession()
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [value, setValue] = React.useState(0)
  const [imageFile, setImageFile]: any = useState(null)
  const [signatureUrl, setSignatureUrl] = useState<File | null>(null)
  const [uploadFiles, { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }] =
    useMultiFileUploadMutation()
  const [updateAgreement, { isLoading, isError }] = useUpdateAgreementMutation()

  const uploadImage = (e: any) => {
    setImageFile(e.target.files[0])
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setSignatureUrl(reader.result)
    }
    file && reader.readAsDataURL(file)
  }

  const HandleFIleUpload = async (data: any) => {
    const filePayload = new FormData()
    filePayload.append('media[0]', imageFile)
    const res: any = await uploadFiles(filePayload)
    const url = res.data.url[0]

    //AGREEMENT SINGATURE PAYLOAD
    const agreementSingPayload = {
      tenant_signature_url: url,
      agreement_status: 'processing',
      tenant_signed: 1,
    }

    store.dispatch(hideModal(SIGN_THE_AGREEMENT))

    dispatch(showLoader('Updating Agreement...'))

    const { data: response }: any = await updateAgreement({
      agreementId: payload?.tenancyAgreement?.id,
      data: agreementSingPayload,
    })

    dispatch(hideLoader())

    ChatCreate(
      'Tenant Signed The Agreement',
      'RZY',
      payload.threadInfo?.property_id,
      receiver,
      payload.threadInfo?.id,
      'RZYADMIN',
      ''
    )

    const agreementUpdateFirestoreCollection = {
      id: payload?.tenancyAgreement?.id,
      status: draft_tenant_sign,
      instruction: '',
      landLord_signed: false,
      tenant_signed: true,
      progress_status: true,
      time: parseInt(getTimestamp()),
      chatId: parseInt(getTimestamp()),
    }

    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'tenancyAgreement',
      agreementUpdateFirestoreCollection
    )
    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'tenancyAgreement',
      agreementUpdateFirestoreCollection
    )
  }

  return (
    <div className=" w-full bg-inherit max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto gap-4 flex">
      <form onSubmit={handleSubmit(HandleFIleUpload)}>
        <div className="text-left">
          <h5 className="font-medium font-roboto 2xl:text-[1.25rem]/[1.5rem] text-[1rem]/[1.25rem] text-[#202020] tracking-[0.025rem] mb-3">
            Upload Signature
          </h5>
          <div className="p-0">
            {/* <label htmlFor="uploadAgreementSing" className="cursor-pointer hidden">
              <Image src={uploadDrag} width={'100%'} height={'100%'} alt="" />
            </label>
            <input
              accept=".jpeg,.jpg,.png,.pdf"
              type="file"
              {...register('file', { required: true })}
              onChange={uploadImage}
              id=""
            />
            <img
              style={{ width: '100%', height: '250px' }}
              src={signatureUrl == null ? '/no-image.jpg' : `${signatureUrl}`}
              alt=""
            /> */}

            {/* <Button
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
                </Button> */}
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
                src={signatureUrl == null ? '/chat/chatProgressForm/uploadimg.svg' : `${signatureUrl}`}
                alt="no-fall-back"
                width="71"
                height="71"
              />

              <div className=" w-full flex flex-col justify-center">
                <p className=" text-left font-medium font-roboto text-[#505050] text-[1.25rem]/[1.375rem] mb-3">
                  Image
                </p>

                <p className="text-left font-noraml font-roboto text-[#A1A1A1] 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem]">
                  Upload your signature
                </p>
              </div>
            </Button>

            {errors?.file?.type === 'required' && <p className="text-red-700">You need to upload signature</p>}
          </div>
        </div>

        <div className="text-left mt-5">
          <Button
            variant="contained"
            type="submit"
            className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TenantSignAgreement
