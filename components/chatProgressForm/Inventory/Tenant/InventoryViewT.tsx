import { useSession } from 'next-auth/react'
import React, { useState } from 'react' // useContext, 
import { useForm } from 'react-hook-form'
// import InventoryCheckList from '../Landlord/InventoryCheckList'
import { Button } from '@mui/material'
import { getToDay } from '@/util/helper'
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
import { tenantSignedInventoryList } from '@/const'
import Image from 'next/image'
import { StoreThunkDispatch } from '@/types'
import { Icon } from '@/components/shared'

const InventoryViewT = ({ type, signOnly, modalName }: any) => {
  const { data: session }: any = useSession()
  const dispatch = useDispatch<StoreThunkDispatch>()
  // const userId = session?.user?.id
  const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  const [uploadFiles] =
    useMultiFileUploadMutation() // , { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }
  const [createInventory] = useCreateInventoryMutation() // , { isError, isLoading }
  const { data: inventoryDetails} = useInventoryDetailsQuery(
    payload.threadInfo?.property_id
  ) // , isLoading: inventoryLoading 

  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
    // setValue,
  } = useForm()

  const [tenantSignatureUrl, setTenantSignatureUrl] = useState(null)

  const uploadImage = (e: any) => {
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setTenantSignatureUrl(reader.result)
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
      tenant_sig: url,
      landlord_sig: inventoryDetails?.inventoryList?.landlord_sign ? inventoryDetails?.inventoryList?.landlord_sig : '',
      agreement_id: payload?.tenantLandlordProgressInfo?.propertyInfo?.agreement?.id,
    }
    // console.log('🚀 ~ file: InventoryViewT.tsx:58 ~ handleInventory ~ reportFormData', reportFormData)
    dispatch(hideModal(modalName))

    dispatch(showLoader('Uploading Tenant Signed Inventory'))
    const { data: response }: any = await createInventory(reportFormData)
    // console.log(`🚀 ~ file: InventoryViewT.tsx:58 ~ handleInventory ~ response:`, response)
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
            <p className="text-md my-3">
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
      tenantSignedInventoryList,
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
    updateConversationNew(senderInfo, selectedThread.id, recieverInfo, tenantSignedInventoryList)

    const updateData = {
      instruction: 'Not yet',
      is_landlord_sign: false,
      is_tenant_sign: true,
      progress_status: false,
      status: 'Tenant Signed',
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
        {/* <div className="mt-5 shadow-lg p-2 my-2 rounded w-80">
          <div className="p-2 ">
            <p className="text-muted">Tenant Signature</p>
            <img src="/No_signature.png" style={{ width: '100%' }} alt="" />
          </div>
          {type === 'inventory_Sign_tenant' && (
            <>
              <input
                type="file"
                {...register('tenant', {
                  required: true,
                })}
                id=""
              />

              {errors?.tenant?.type === 'required' && <p className="text-danger"> This field is required</p>}

              <button
                className="px-10 py-2 rounded-lg font-roboto font-medium bg-[#034EA1] text-white text-lg cursor-pointer"
                type="submit">
                Submit
              </button>
            </>
          )}
        </div> */}
        {/*  {
          type === "inventory_Sign_tenant" && <Button disabled={ isSpinner } className="px-5 mx-2" type="submit">
            { isSpinner ? <Spinner size="sm" animation="border" /> : "Submit" }
          </Button>
        } */}
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
    // <div>
    //   <div className="mt-5 p-2 my-2 rounded w-80">
    //     <div className="p-2 ">
    //       <p className="text-muted">Landlord Signature</p>
    //       <div className="p-2 py-3">
    //         <img src="/No_signature.png" alt="landlord_signature" style={{ width: '100%' }} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default InventoryViewT
