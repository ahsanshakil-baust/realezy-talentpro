// import { Icon } from '@/components/shared'
import { Button, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// import uploadDrag from '@/public/uploadDrag.svg'
import { useDispatch, useSelector } from 'react-redux'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  // useCreatePaymentMutation,
  useMultiFileUploadMutation,
  // useTenantLandlordProgressInfoMutation,
  useUpdateAgreementMutation,
} from '@/store'
import { useSession } from 'next-auth/react'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { draft_landlord_sign } from '@/const' // , draft_tenant_sign, rentalFeeProcessingMessage
import { SIGN_THE_AGREEMENT } from '@/store/chatProgress/progress/constant'
// import UpdateAgreement from './UpdateAgreement'

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

interface IFormInput {
  landlord_name: string
  file: string
  fileOne: string
  fileTwo: string
  fileThree: string
  number_of_co_owner: number
  first_co_owner_name: string
  first_co_owner_signature: string
  second_co_owner_name: string
  second_co_owner_signature: string
  third_co_owner_name: string
  third_co_owner_signature: string
  first_co_owner_file: string
  second_co_owner_file: string
  third_co_owner_file: string
}

const LandlordSignAgreement = () => {
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
  } = useForm<IFormInput>()

  // const [value, setValue] = React.useState(0)
  const [signatureUrl, setSignatureUrl]: any = useState(null)
  const [signatureFile, setSignatureFile]: any = useState(null)

  //FIRST CO OWNER SINGATUIRE
  const [firstCoOwnerSignatureUrl, setFirstCoOwnerSignatureUrl]: any = useState(null)
  const [firstCoOwnerSignatureFile, setFirstCoOwnerSignatureFile]: any = useState(null)

  //SECOND CO OWNER SINGATUIRE
  const [secondCoOwnerSignatureUrl, setSecondCoOwnerSignatureUrl]: any = useState(null)
  const [secondCoOwnerSignatureFile, setSecondCoOwnerSignatureFile]: any = useState(null)

  //THIRD CO OWNER SINGATUIRE
  const [thirdCoOwnerSignatureUrl, setThirdCoOwnerSignatureUrl]: any = useState(null)
  const [thirdCoOwnerSignatureFile, setThirdCoOwnerSignatureFile]: any = useState(null)

  const [uploadFiles, { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }] =
    useMultiFileUploadMutation()
  const [updateAgreement, { isLoading, isError }] = useUpdateAgreementMutation()

  const uploadImage = (e: any) => {
    setSignatureFile(e.target.files[0])
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setSignatureUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const uploadFirstCoOwnerFile = (e: any) => {
    setFirstCoOwnerSignatureFile(e.target.files[0])
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setFirstCoOwnerSignatureUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const uploadSecondCoOwnerFile = (e: any) => {
    setSecondCoOwnerSignatureFile(e.target.files[0])
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setSecondCoOwnerSignatureUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const uploadThirdCoOwnerFile = (e: any) => {
    setThirdCoOwnerSignatureFile(e.target.files[0])
    const file = e.target.files[0]
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setThirdCoOwnerSignatureUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const HandleAgreementSignature = async (data: any) => {
    let url = ''
    try {
      const filePayload = new FormData()
      filePayload.append('media[0]', signatureFile)
      const res: any = await uploadFiles(filePayload)
      url = res.data.url[0]
    } catch (e) {
      // console.log(e)
    }
    const coOwners: any = []
    Array.from({ length: ownerChange }, async (_, ind) => {
      let coOwner = ''
      let coOwnerUrl = ''
      if (ind === 0) {
        coOwner = data?.first_co_owner_name
        try {
          const filePayload = new FormData()
          filePayload.append('media[0]', firstCoOwnerSignatureFile)
          const res: any = await uploadFiles(filePayload)
          coOwnerUrl = res.data.url[0]
        } catch (e) {
          // console.log(e)
        }
      } else if (ind === 1) {
        coOwner = data?.second_co_owner_name
        try {
          const filePayload = new FormData()
          filePayload.append('media[0]', secondCoOwnerSignatureFile)
          const res: any = await uploadFiles(filePayload)
          coOwnerUrl = res.data.url[0]
        } catch (e) {
          // console.log(e)
        }
      } else if (ind === 2) {
        coOwner = data?.third_co_owner_name
        try {
          const filePayload = new FormData()
          filePayload.append('media[0]', thirdCoOwnerSignatureFile)
          const res: any = await uploadFiles(filePayload)
          coOwnerUrl = res.data.url[0]
        } catch (e) {
          // console.log(e)
        }
      }
      coOwners.push({
        owner_name: coOwner,
        signature: coOwnerUrl,
      })
    })
    const agreementSingPayload = {
      landlord_signature_url: url,
      agreement_status: 'done',
      landlord_signed: 1,
      number_of_co_owner: ownerChange,
      coOwnerInfo: coOwners,
    }

    store.dispatch(hideModal(SIGN_THE_AGREEMENT))

    dispatch(showLoader('Updating Agreement...'))

    const { data: response }: any = await updateAgreement({
      agreementId: payload?.tenancyAgreement?.id,
      data: agreementSingPayload,
    })

    dispatch(hideLoader())

    ChatCreate(
      'Landlord Signed The Agreement',
      'RZY',
      payload.threadInfo?.property_id,
      receiver,
      payload.threadInfo?.id,
      'RZYADMIN',
      ''
    )

    const agreementUpdateFirestoreCollection = {
      id: payload?.tenancyAgreement?.id,
      status: draft_landlord_sign,
      instruction: '',
      landLord_signed: true,
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

  const [ownerChange, setOwnerChange] = useState(-1)

  const handleCoOwnerChange = (e: any) => {
    if (e.target.value === 'No Co-Owners') setOwnerChange(0)
    else if (e.target.value === '1') setOwnerChange(1)
    else if (e.target.value === '2') setOwnerChange(2)
    else if (e.target.value === '3') setOwnerChange(3)
    else setOwnerChange(-1)
  }

  return (
    <div className=" w-full bg-inherit max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto gap-4 ">
      <form onSubmit={handleSubmit(HandleAgreementSignature)}>
        {/* NUMBER_OF_CO_OWNER */}
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
            className="!w-full  !bg-[#F1F7FF]   !shadow-[0px_4px_8px_#034EA11A] !mb-4"
            id={`number_of_co_owner`}
            select
            label="Please Select The Number of Co-Owners"
            SelectProps={{
              native: true,
            }}
            onChange={handleCoOwnerChange}>
            <option key={''} value={''}></option>
            <option key={'No Co-Owners'} value={'No Co-Owners'}>
              No Co-Owners
            </option>
            <option key={'1'} value={'1'}>
              1
            </option>
            <option key={'2'} value={'2'}>
              2
            </option>
            <option key={'3'} value={'3'}>
              3
            </option>
          </TextField>
        </div>
        {/* MAIN LANDLORD SIGNATURE */}
        {ownerChange >= 0 && (
          <div>
            <h1 className="text-xl font-bold m-3">Main Owner</h1>
            <div className="text-center">
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
                className="!w-full  !bg-[#F1F7FF]   !shadow-[0px_4px_8px_#034EA11A] !mb-4"
                label="Name of Property Owner"
                value={session?.user?.name}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('landlord_name', { required: true })}
              />
            </div>
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
                {signatureUrl == null ? (
                  <h1 className="text-2xl">Not Sign Yet</h1>
                ) : (
                  <h1 className="text-2xl">Sign Uploaded</h1>
                )}
                <Image
                  src={signatureUrl == null ? '/chat/chatProgressForm/uploadimg.svg' : `${signatureUrl}`}
                  alt="no-fall-back"
                  width="100%"
                  height="100%"
                />
                {signatureUrl == null ? (
                  <h1 className="text-xl">Click to Upload Sign</h1>
                ) : (
                  <h1 className="text-xl">Click to Change Sign</h1>
                )}
              </Button>
              {errors?.file?.type === 'required' && <p className="text-red-700">You need to upload sign</p>}
            </div>
          </div>
        )}

        {ownerChange >= 1 && (
          <div>
            <h1 className="text-xl font-bold m-3">Co-Owner 2</h1>
            <div className="text-center">
              <TextField
                label="Name of Property Co-Owner"
                className="!w-full"
                {...register('first_co_owner_name', { required: true })}
              />
            </div>
            <div className="p-0 flex flex-col gap-2 justify-center mt-3">
              <Button
                variant="text"
                component="label"
                className="!flex !gap-2 !bg-[#f1f7ff] !rounded-[10px]  !px-[1rem] !py-[0.9rem] !border !border-[#00ADEE] !border-dashed">
                <input
                  accept=".jpeg,.jpg,.png,.pdf"
                  hidden
                  type="file"
                  {...register('fileOne', {
                    required: true,
                    onChange: uploadFirstCoOwnerFile,
                  })}
                  id="fileOne"
                />
                {firstCoOwnerSignatureUrl == null ? (
                  <h1 className="text-2xl">Not Sign Yet</h1>
                ) : (
                  <h1 className="text-2xl">Sign Uploaded</h1>
                )}
                <Image
                  src={
                    firstCoOwnerSignatureUrl == null
                      ? '/chat/chatProgressForm/uploadimg.svg'
                      : `${firstCoOwnerSignatureUrl}`
                  }
                  alt="no-fall-back"
                  width="100%"
                  height="100%"
                />
                {firstCoOwnerSignatureUrl == null ? (
                  <h1 className="text-xl">Click to Upload Sign</h1>
                ) : (
                  <h1 className="text-xl">Click to Change Sign</h1>
                )}
              </Button>
              {errors?.fileOne?.type === 'required' && <p className="text-red-700">You need to upload sign</p>}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}

        {/* SECOND OWNER */}
        {ownerChange >= 2 && (
          <div>
            <h1 className="text-xl font-bold m-3">Co-Owner 3</h1>
            <div className="text-center">
              <TextField
                label="Name of Property Co-Owner"
                className="w-full"
                {...register('second_co_owner_name', { required: true })}
              />
            </div>
            <div className="p-0 flex flex-col gap-2 justify-center mt-3">
              <Button
                variant="text"
                component="label"
                className="!flex !gap-2 !bg-[#f1f7ff] !rounded-[10px]  !px-[1rem] !py-[0.9rem] !border !border-[#00ADEE] !border-dashed">
                <input
                  accept=".jpeg,.jpg,.png,.pdf"
                  hidden
                  type="file"
                  {...register('fileTwo', {
                    required: true,
                    onChange: uploadSecondCoOwnerFile,
                  })}
                  id="fileTwo"
                />
                {secondCoOwnerSignatureUrl == null ? (
                  <h1 className="text-2xl">Not Sign Yet</h1>
                ) : (
                  <h1 className="text-2xl">Sign Uploaded</h1>
                )}
                <Image
                  src={
                    secondCoOwnerSignatureUrl == null
                      ? '/chat/chatProgressForm/uploadimg.svg'
                      : `${secondCoOwnerSignatureUrl}`
                  }
                  alt="no-fall-back"
                  width="100%"
                  height="100%"
                />
                {secondCoOwnerSignatureUrl == null ? (
                  <h1 className="text-xl">Click to Upload Sign</h1>
                ) : (
                  <h1 className="text-xl">Click to Change Sign</h1>
                )}
              </Button>
              {errors?.fileTwo?.type === 'required' && <p className="text-red-700">You need to upload sign</p>}
            </div>
          </div>
        )}
        {ownerChange >= 3 && (
          <div>
            <h1 className="text-xl font-bold m-3">Co-Owner 4</h1>
            <div className="text-center">
              <TextField
                label="Name of Property Co-Owner"
                className="!w-full"
                {...register('third_co_owner_name', { required: true })}
              />
            </div>
            <div className="p-0 flex flex-col gap-2 justify-center mt-3">
              <Button
                variant="text"
                component="label"
                className="!flex !gap-2 !bg-[#f1f7ff] !rounded-[10px]  !px-[1rem] !py-[0.9rem] !border !border-[#00ADEE] !border-dashed">
                <input
                  accept=".jpeg,.jpg,.png,.pdf"
                  hidden
                  type="file"
                  {...register('fileThree', {
                    required: true,
                    onChange: uploadThirdCoOwnerFile,
                  })}
                  id="fileThree"
                />
                {thirdCoOwnerSignatureUrl == null ? (
                  <h1 className="text-2xl">Not Sign Yet</h1>
                ) : (
                  <h1 className="text-2xl">Sign Uploaded</h1>
                )}
                <Image
                  src={
                    thirdCoOwnerSignatureUrl == null
                      ? '/chat/chatProgressForm/uploadimg.svg'
                      : `${thirdCoOwnerSignatureUrl}`
                  }
                  alt="no-fall-back"
                  width="100%"
                  height="100%"
                />
                {thirdCoOwnerSignatureUrl == null ? (
                  <h1 className="text-xl">Click to Upload Sign</h1>
                ) : (
                  <h1 className="text-xl">Click to Change Sign</h1>
                )}
              </Button>
              {errors?.fileThree?.type === 'required' && <p className="text-red-700">You need to upload sign</p>}
            </div>
          </div>
        )}

        {ownerChange >= 0 && (
          <div className="text-left mt-5">
            <Button
              variant="contained"
              type="submit"
              className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]">
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default LandlordSignAgreement
