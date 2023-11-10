import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import ViewConditionReport from './ViewConditionReport'
import { Button } from '@mui/material'
import { getToDay } from '@/util/helper'
import { useSelector } from 'react-redux'
import { useConditionDetailsQuery, useCreateConditionReportMutation, useMultiFileUploadMutation } from '@/store'

const ConditionSignReportTenant = ({ type }: any) => {
  const { data: session }: any = useSession()
  // const userId = session?.user?.id
  const [profPaymentFile, setProfPaymentFile] = useState(null)

  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  // const roleType = payload?.roletype === 'landlord' ? 'Landlord' : 'Tenant'

  const [createConditionReport] = useCreateConditionReportMutation()
  const { data: conditionDetails } = useConditionDetailsQuery(
    payload.threadInfo?.property_id
  )
  const [uploadFiles] =
    useMultiFileUploadMutation() //  { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }

  const uploadImage = (e: any) => {
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setProfPaymentFile(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
    // setValue,
  } = useForm()

  const handleConditionReport = async (inputData: any) => {
    const formData = new FormData()
    formData.append('media[0]', inputData.tenant?.[0])
    const res: any = await uploadFiles(formData)
    const url = res.data.url[0]

    const reportFormData = {
      property_id: conditionDetails?.propertyConditionReportList?.property_id,
      move_in_date: conditionDetails?.propertyConditionReportList?.move_in_date,
      landlord_signature: conditionDetails?.propertyConditionReportList?.landlord_signature,
      tenant_signature: url,
      condition_of_floor: conditionDetails?.propertyConditionReportList?.condition_of_floor,
      condition_of_walls: conditionDetails?.propertyConditionReportList?.condition_of_walls,
      condition_of_celling: conditionDetails?.propertyConditionReportList?.condition_of_celling,
      condition_of_doors_locks: conditionDetails?.propertyConditionReportList?.condition_of_doors_locks,
      condition_of_lighting_fixtures: conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures,
      condition_of_windows: conditionDetails?.propertyConditionReportList?.condition_of_windows,
      condition_of_curtains_drapes: conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes,
      appliances: conditionDetails?.propertyConditionReportList?.appliances,
      furniture: conditionDetails?.propertyConditionReportList?.furniture,
      tenant_date_sig: getToDay(),
      tenant_witness_date_sig: getToDay(),
      landlord_date_sig: getToDay(),
      landlord_witness_date_sig: getToDay(),
    }

    const { data: response }: any = await createConditionReport(reportFormData)
  }

  return (
    <div>
      <ViewConditionReport data={conditionDetails} />
      <form onSubmit={handleSubmit(handleConditionReport)}>
        <div>
          <div className="mb-3">
            {type === 'report_signing' && (
              <>
                <h5 className="occupier-title">Tenant Signature</h5>
                <input
                  style={{ width: '100%' }}
                  className="p-1 rounded border"
                  type="file"
                  id="tent-sign"
                  {...register('tenant', {
                    required: true,
                  })}
                  onChange={uploadImage}
                />
                {errors?.tenant?.type === 'required' && <p className="text-danger"> This field is required</p>}
              </>
            )}
          </div>
        </div>

        <div className="tenant-cond-report-signing-form-row">
          <div className="mb-3">
            <h5 className="occupier-title">Landlord Signature</h5>
            <div className="landlord-signature-cont">
              {profPaymentFile ? (
                <img
                  style={{ width: '100px', height: '100px' }}
                  src={profPaymentFile == null ? '/no-image.jpg' : profPaymentFile}
                  alt=""
                />
              ) : (
                <img
                  className="landlord-signature"
                  src={
                    conditionDetails?.propertyConditionReportList?.landlord_signature
                      ? conditionDetails?.propertyConditionReportList?.landlord_signature
                      : '/No_signature.png'
                  }
                  alt="landlord_signature"
                />
              )}
            </div>
          </div>
          <div className="mb-3">
            <h5 className="occupier-title">Tenant Signature</h5>
            <div className="landlord-signature-cont">
              <img
                className="landlord-witness-signature"
                src={
                  conditionDetails?.propertyConditionReportList?.tenant_signature
                    ? conditionDetails?.propertyConditionReportList?.tenant_signature
                    : '/No_signature.png'
                }
                alt=""
              />
            </div>
          </div>
        </div>
        {/***********cstm end************/}
        {type === 'report_signing' && (
          <div className="rental-proposal-submit-btn-cont">
            <Button
              className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]"
              type="submit">
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default ConditionSignReportTenant
