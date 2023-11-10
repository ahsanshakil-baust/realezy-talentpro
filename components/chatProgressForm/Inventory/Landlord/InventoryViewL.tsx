import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useSession } from 'next-auth/react'
import { getToDay } from '@/util/helper'
import { Button } from '@mui/material'
// import InventoryCheckList from './InventoryCheckList'
import {
  hideLoader,
  hideModal,
  showLoader,
  showModal,
  useCreateInventoryMutation,
  useInventoryDetailsQuery,
  useMultiFileUploadMutation,
} from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { ChatCreate, updateConversationNew, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { landlordSignedInventoryList } from '@/const'
import Image from 'next/image'
import { Icon } from '@/components/shared'
import { StoreThunkDispatch } from '@/types'

const InventoryViewL = ({ type, signOnly, modalName }: any) => {
  const { data: session }: any = useSession()
  const dispatch = useDispatch<StoreThunkDispatch>()
  // const userId = session?.user?.id
  const [uploadFiles] =
    useMultiFileUploadMutation() // , { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)
  const [createInventory] = useCreateInventoryMutation() // , { isError, isLoading }
  const { data: inventoryDetails } = useInventoryDetailsQuery(
    payload.threadInfo?.property_id
  ) // , isLoading: inventoryLoading
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
    // setValue,
  } = useForm()

  const [landlordSignatureUrl, setLandlordSignatureUrl] = useState(null)

  const uploadImage = (e: any) => {
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setLandlordSignatureUrl(reader.result)
    }

    file && reader.readAsDataURL(file)
  }

  const handleInventory = async (inputData: any) => {
    const formData = new FormData()
    formData.append('media[0]', inputData?.file[0])
    const res: any = await uploadFiles(formData)
    const url = res.data.url[0]

    const reportFormData = {
      property_id: inventoryDetails?.inventoryList?.property_id,
      property_address: inventoryDetails?.inventoryList?.property_address,
      living_area: inventoryDetails?.inventoryList?.attached_bathroom,
      dining_area: inventoryDetails?.inventoryList?.bedroom2,
      master_bedroom: inventoryDetails?.inventoryList?.bedroom3,
      bedroom2: inventoryDetails?.inventoryList?.common_toilet,
      bedroom3: inventoryDetails?.inventoryList?.dining_area,
      attached_bathroom: inventoryDetails?.inventoryList?.keys,
      common_toilet: inventoryDetails?.inventoryList?.kitchen,
      kitchen: inventoryDetails?.inventoryList?.living_area,
      keys: inventoryDetails?.inventoryList?.master_bedroom,
      tenant_sig_date: getToDay(),
      tenant_witness_sig_date: getToDay(),
      landlord_sig_date: getToDay(),
      landlord_witness_sig_date: getToDay(),
      tenant_sig: inventoryDetails?.inventoryList?.tenant_sig,
      landlord_sig: url,
      agreement_id: payload?.tenantLandlordProgressInfo?.propertyInfo?.agreement?.id,
    }

    dispatch(hideModal(modalName))
    dispatch(showLoader('Uploading Inventory'))

    const { data: response }: any = await createInventory(reportFormData)

    dispatch(hideLoader())
    dispatch(
      showModal({
        open: true,
        children: (
          <div className="w-full h-auto  bg-inherit px-[3.25rem] py-10 rounded-b-[20px] ">
            <div className=" w-full flex justify-center text-center mb-2">
              <div className=" border border-green-500 rounded-full w-24 h-24 bg-green-500 flex items-center justify-center ">
                <Icon
                  name="roundedCheck"
                  className="w-[92px] h-[92px] bg-white text-green-500 border-4 border-[#FFFFFF] rounded-full "
                />
              </div>
            </div>
            <h1 className="text-2xl text-center">Congratulations</h1>
            <p className="text-md my-3 text-center">
              You have completed the full rental process! Here's to a happy and successfull stay in your new rental
              property!
            </p>
            <Button
              onClick={() => dispatch(hideModal('   '))}
              variant="contained"
              className=" !px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE] !mt-10">
              Ok
            </Button>
          </div>
        ),
        name: '   ',
      })
    )

    ChatCreate(
      landlordSignedInventoryList,
      'RZY',
      payload.threadInfo?.property_id,
      receiver,
      payload.threadInfo?.id,
      'RZYADMIN',
      ''
    )
    const senderInfo: any = {
      id: selectedThread.senderId,
      image: selectedThread.senderImage,
      name: selectedThread.senderName,
    }
    const recieverInfo: any = {
      id: selectedThread.receiverId,
      image: selectedThread.receiverImage,
      name: selectedThread.receiverName,
    }
    updateConversationNew(senderInfo, selectedThread.id, recieverInfo, landlordSignedInventoryList)

    const updateData = {
      instruction: 'Not yet',
      is_landlord_sign: true,
      is_tenant_sign: true,
      progress_status: true,
      status: 'Landlord Signed',
    }

    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'itemChecklist',
      updateData
    )

    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'itemChecklist',
      updateData
    )
  }

  return (
    <div className="bg-inherit w-full max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4  overflow-auto rounded-b-[20px]">
      <form onSubmit={handleSubmit(handleInventory)}>
        {/* {!signOnly && <InventoryCheckList data={inventoryDetails} />}
        <div className="flex items-center gap-10">
          <div>
            {type === 'inventory_Sign_Landlord' && (
              <>
                <h5 className="occupier-title">Landlord Signature</h5>
                <input
                  style={{ width: '100%' }}
                  className="p-1 rounded border mb-2"
                  type="file"
                  id="tent-sign"
                  {...register('landlord', {
                    required: true,
                  })}
                />
                {errors?.landlord?.type === 'required' && <p className="text-danger">This field is required</p>}
              </>
            )}

            <Paper className="p-2">
              <h5 className="occupier-title">Landlord Signature</h5>
              <img className="w-1/2" src="/No_signature.png" alt="tenant" />
            </Paper>
          </div>
          <div className="mb-3">
            <Paper className="p-2">
              <h5 className="occupier-title">Tenant Signature</h5>
              <img className="w-1/2" src="/No_signature.png" alt="tenant" />
            </Paper>
          </div>
        </div>
        {type === 'inventory_Sign_Landlord' && (
          <div className="rental-proposal-submit-btn-cont">
            <button
              className="px-10 py-2 rounded-lg font-roboto font-medium bg-[#034EA1] text-white text-lg cursor-pointer"
              type="submit">
              Submit
            </button>
          </div>
        )} */}
        <div className="p-0 flex flex-col gap-2 justify-center mt-3">
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
                onChange: uploadImage,
              })}
              id="file"
            />
            {landlordSignatureUrl == null ? (
              <h1 className="text-2xl">Not Sign Yet</h1>
            ) : (
              <h1 className="text-2xl">Sign Uploaded</h1>
            )}
            <Image
              src={landlordSignatureUrl == null ? '/chat/chatProgressForm/uploadimg.svg' : `${landlordSignatureUrl}`}
              alt="no-fall-back"
              width="100%"
              height="100%"
            />
            {landlordSignatureUrl == null ? (
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

export default InventoryViewL
