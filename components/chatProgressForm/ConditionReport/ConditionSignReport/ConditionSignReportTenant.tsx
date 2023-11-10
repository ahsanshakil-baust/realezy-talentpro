import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import ViewConditionReport from './ViewConditionReport'
import { Button } from '@mui/material'
import { getToDay } from '@/util/helper'
import { useDispatch, useSelector } from 'react-redux'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useConditionDetailsQuery,
  useCreateConditionReportMutation,
  useMultiFileUploadMutation,
} from '@/store'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { draft_tenant_sign } from '@/const'
import uploadDrag from '@/public/uploadDrag.svg'

const ConditionSignReportTenant = ({ type }: any) => {
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const roleType = payload?.roletype === 'landlord' ? 'Landlord' : 'Tenant'
  const { data: session }: any = useSession()
  const userId = session?.user?.id
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id
  const [tenantSignatureUrl, setTenantSignatureUrl] = useState(null)
  const [createConditionReport, { isError, isLoading }] = useCreateConditionReportMutation()
  const { data: conditionDetails, isLoading: conditionsLoading } = useConditionDetailsQuery(
    payload.threadInfo?.property_id
  )
  const [uploadFiles, { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }] =
    useMultiFileUploadMutation()

  const uploadImage = (e: any) => {
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setTenantSignatureUrl(reader.result)
    }

    file && reader.readAsDataURL(file)
  }
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm()

  const handleConditionReport = async (data: any) => {
    const filePayload = new FormData()
    filePayload.append('media[0]', data.file[0])
    const res: any = await uploadFiles(filePayload)
    const url = res.data.url[0]

    const reportFormData = {
      property_id: payload.threadInfo?.property_id,
      tenant_signature: url,
      move_in_date: conditionDetails?.propertyConditionReportList?.move_in_date,
      landlord_signature: conditionDetails?.propertyConditionReportList?.landlord_signature,
      condition_of_floor: conditionDetails?.propertyConditionReportList?.condition_of_floor,
      condition_of_walls: conditionDetails?.propertyConditionReportList?.condition_of_walls,
      condition_of_celling: conditionDetails?.propertyConditionReportList?.condition_of_celling,
      condition_of_doors_locks: conditionDetails?.propertyConditionReportList?.condition_of_doors_locks,
      condition_of_lighting_fixtures: conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures,
      condition_of_windows: conditionDetails?.propertyConditionReportList?.condition_of_windows,
      condition_of_curtains_drapes: conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes,
      appliances: conditionDetails?.propertyConditionReportList?.appliances,
      furniture: conditionDetails?.propertyConditionReportList?.furniture,
    }

    store.dispatch(hideModal('CONDITION_REPORT_SIGNING_SIGN'))
    dispatch(showLoader('Uploading Signature'))

    const { data: response }: any = await createConditionReport(reportFormData)
    dispatch(hideLoader())

    // FIRESTORE PAYLOAD
    ChatCreate(
      'Tenant Signed The Conditional Report',
      'RZY',
      payload.threadInfo?.property_id,
      receiver,
      payload.threadInfo?.id,
      'RZYADMIN',
      ''
    )

    const conditionalReportFirestoreCollection = {
      id: payload?.tenancyAgreement?.id,
      status: draft_tenant_sign,
      instruction: '',
      is_landlord_sign: false,
      is_tenant_sign: true,
      progress_status: false,
    }
    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'propertyCondition',
      conditionalReportFirestoreCollection
    )
    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'propertyCondition',
      conditionalReportFirestoreCollection
    )
  }

  return (
    <div className="bg-inherit w-full md:min-w-[1020px] max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4  overflow-auto rounded-b-[20px]">
      <form onSubmit={handleSubmit(handleConditionReport)}>
        <div className="p-0 flex flex-col gap-2 justify-center mt-3">
          <Button
            variant="text"
            component="label"
            className="!flex !flex-col !gap-2 !bg-[#f1f7ff] !rounded-[10px]  !px-[1rem] !py-[0.9rem] !border !border-[#00ADEE] !border-dashed">
            <input
              accept=".jpeg,.jpg,.png,.pdf"
              hidden
              type="file"
              {...register('file', {
                required: true,
                onChange: uploadImage,
              })}
              id="file"
            />
            {tenantSignatureUrl == null ? (
              <h1 className="text-2xl">Not Sign Yet</h1>
            ) : (
              <h1 className="text-2xl">Sign Uploaded</h1>
            )}
            <Image
              src={tenantSignatureUrl == null ? '/chat/chatProgressForm/uploadimg.svg' : `${tenantSignatureUrl}`}
              alt="no-fall-back"
              width="100%"
              height="100%"
            />
            {tenantSignatureUrl == null ? (
              <h1 className="text-xl">Click to Upload Sign</h1>
            ) : (
              <h1 className="text-xl">Click to Change Sign</h1>
            )}
          </Button>
          {errors?.file?.type === 'required' && <p className="text-red-700">You need to upload sign</p>}
        </div>

        <div className=" mt-5">
          <Button
            type="submit"
            variant="contained"
            className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ConditionSignReportTenant
