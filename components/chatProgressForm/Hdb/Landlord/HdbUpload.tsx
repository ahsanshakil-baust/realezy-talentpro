import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// import uploadDrag from '@/public/uploadDrag.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import store, { hideLoader, hideModal, showLoader, useHdbApprovalMutation, useMultiFileUploadMutation } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { ChatCreate, fireStoreSaveDocument, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { PROPERTIES_HDB_UPLOAD } from '@/const'
import { HDB_UPLOAD } from '@/store/chatProgress/progress/constant'
import { Icon } from '@/components/shared'
import { Button } from '@mui/material'

const HdbUpload = () => {
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const { data: session }: any = useSession()
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  const [uploadFiles] =
    useMultiFileUploadMutation() // , { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }
  const [hdbApproval] = useHdbApprovalMutation() // , { isError, isLoading, data }
  const [hdvFile, setHdvFile] = useState<File | null>(null)
  const [acthdvfile, setActhdvfile] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const uploadImage = (e: any) => {
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setHdvFile(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
    setActhdvfile(file)
  }

  const dispatch = useDispatch()

  const handleHDBSubmit = async (_: any) => {
    // console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data)
    const imageFormData = new FormData()
    imageFormData.append(`media[0]`, acthdvfile)
    const res: any = await uploadFiles(imageFormData)
    // console.log("🚀 ~ file: HdbUpload.tsx:50 ~ handleHDBSubmit ~ res:", res)
    const url = res.data.url[0]

    const hdbFormData = {
      property_id: payload?.threadInfo?.property_id,
      hdb_document: url,
      hdb_status: 'approved',
    }
    console.log('🚀 ~ file: HdbUpload.tsx:62 ~ handleHDBSubmit ~ hdbFormData:', hdbFormData)

    store.dispatch(hideModal(HDB_UPLOAD))

    dispatch(showLoader('Uploading HDB Document'))

    const { data: response }: any = await hdbApproval(hdbFormData)
    console.log('response', response)

    dispatch(hideLoader())

    ChatCreate(
      'HDB Document Uploaded',
      'RZY',
      payload?.threadInfo?.property_id,
      receiver,
      payload.threadInfo?.id,
      'RZYADMIN',
      ''
    )

    const updateData = {
      instruction: '',
      progress_status: false,
      status: 'HDB letter uploaded',
    }

    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'hdbApproval',
      updateData
    )

    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'hdbApproval',
      updateData
    )
    fireStoreSaveDocument(PROPERTIES_HDB_UPLOAD)
  }

  return (
    // <div className="bg-inherit w-full p-10 flex justify-center">
    //   <form onSubmit={handleSubmit(handleHDBSubmit)}>
    //     <div className="">
    //       <div>
    //         <div className="mt-3">
    //           <h5 className="occupier-title text-center mb-5">Upload HDB Approved Letter</h5>
    //           <div className="text-center">
    //             <label htmlFor="uploadHdb" className="cursor-pointer">
    //               <Image src={uploadDrag} width={'100%'} height={'100%'} alt="" />
    //             </label>
    //             <input
    //               type="file"
    //               accept=".jpeg,.jpg,.png ,.pdf"
    //               id="uploadHdb"
    //               style={{ display: 'none' }}
    //               {...register('hdb_upload_file', {
    //                 required: true,
    //               })}
    //               onChange={uploadImage}
    //             />
    //             <img
    //               style={{ width: '250px', height: '250px' }}
    //               src={hdvFile == null ? '/no-image.jpg' : `${hdvFile}`}
    //               alt=""
    //             />
    //             {errors?.hdb_upload_file?.type === 'required' && (
    //               <p className="text-red-500"> This field is required</p>
    //             )}
    //           </div>

    //           <div className="rental-proposal-submit-btn-cont">
    //             <button className="px-20 py-1 rounded-lg mt-5 cursor-pointer" type="submit">
    //               Submit
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    <div className=" w-auto max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto flex flex-col  ">
      <form className=" w-full flex  flex-col gap-6  " onSubmit={handleSubmit(handleHDBSubmit)}>
        <div className=" w-full flex  py-7 px-9 rounded-[10px] bg-[#F8FBFF] ">
          <div className="    w-full flex-col items-start gap-6">
            <div className=" w-full flex flex-col ">
              <div className="">
                <h1 className="!text-[#202020]  !font-roboto !font-bold 2xl:!text-[1.25rem]/[1.5rem] !text-[1rem]/[1.25rem] ">
                  Property Info
                </h1>
                <div className=" flex flex-col mt-4 gap-4">
                  <img
                    // style={{ height: '150px', borderRadius: '20px' }}
                    className="w-[25rem] h-[13.75rem] object-cover rounded-[10px]"
                    src={
                      payload?.tenantLandlordProgressInfo?.propertyInfo?.details.cover_image_url
                        ? payload?.tenantLandlordProgressInfo?.propertyInfo?.details.cover_image_url
                        : '/NoImageProperty.jpg'
                    }
                    alt=""
                  />
                  <div className=" w-full justify-between flex">
                    <p className=" font-roboto font-normal text-[1rem]/[1.2rem] text-[#505050] tracking-[0.16px] ">
                      <span className=" font-roboto font-normal text-[1rem]/[1.2rem] text-[#00ADEE] tracking-[0.16px]">
                        {payload?.tenantLandlordProgressInfo?.propertyInfo?.details?.rental_type}
                      </span>
                      &nbsp; - &nbsp;
                      {payload?.tenantLandlordProgressInfo?.propertyInfo?.details?.unit_type}
                    </p>
                    <p className=" font-roboto font-medium text-[1rem]/[1.2rem] text-[#034EA1] tracking-[0.16px]">
                      Rent: &nbsp;
                      <span className="font-bold font-roboto text-[1rem]/[1.2rem] text-[#034EA1] tracking-[0.16px]">
                        ${payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_amount}/mo{' '}
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="font-medium font-roboto  text-[1.125rem]/[1.375rem] text-[#202020] tracking-[0.0225rem]">
                      {payload?.tenantLandlordProgressInfo?.propertyInfo?.name}
                    </p>

                    <p className="mt-5 flex font-normal font-roboto text-[1rem]/[1.2rem] text-[5205050] tracking-[0.16px]">
                      <Icon
                        className="w-3 h-4 font-normal font-roboto tracking-[0.32px] text-[#505050] mr-2"
                        name="marker"
                      />
                      {payload?.tenantLandlordProgressInfo?.propertyInfo?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" border-l mt-4 border-solid h-[32.5rem] border-l-[#D4E8FF] ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]" />

          <div className=" w-full flex flex-col gap-4 ml-[1.5rem] md:ml-[2rem] 2xl:ml-[2.5rem]">
            <h1 className="!text-[#202020] flex gap-2  !font-roboto !font-bold 2xl:!text-[1.25rem]/[1.5rem] !text-[1rem]/[1.25rem] ">
              HDB Document
            </h1>

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

              <Image
                src={hdvFile == null ? '/chat/chatProgressForm/uploadimg.svg' : `${hdvFile}`}
                alt="no-fall-back"
                width="71"
                height="71"
              />

              <div className=" w-full flex flex-col justify-center">
                <p className=" text-left font-medium font-roboto text-[#505050] text-[1.25rem]/[1.375rem] mb-3">
                  Image or PDF
                </p>

                <p className="text-left font-noraml font-roboto text-[#A1A1A1] text-[1rem]/[1.1875rem]">
                  Upload HDB Document (Image/PDF)
                </p>
              </div>
            </Button>
            {errors?.file?.type === 'required' && <p className="text-red-700">You need to provide a Booking Payment</p>}
          <div className="text-start flex justify-end mt-[200px]">
          <Button
            variant="contained"
            className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]"
            type="submit">
            Submit
          </Button>
        </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HdbUpload
