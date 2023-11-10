import { StoreState } from '@/types'
import { isTenant } from '@/util'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
  Paper,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ProgressBar } from './Personal'
import Image from 'next/image'
import userBlueIcon from '@/public/userEditBlue.svg'
import upload from '@/public/uploadIcon.svg'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, useForm } from 'react-hook-form' // set
import PhotoCropper from '../shared/PhotoCropper/PhotoCropper'
import pdfView from '@/public/pdf.svg'
import store, {
  showLoader,
  showModal,
  useGetUserProfileDetailsQuery,
  useMultiFileUploadMutation,
  useUpdateUserProfileMutation,
} from '@/store'
import { useSession } from 'next-auth/react'
import { demoData } from '@/util/data'
import moment from 'moment'
import { ErrorMessage } from '@hookform/error-message'
import HelpIcon from '@mui/icons-material/Help'
import { changeDocumentName } from '@/util/helper'
import IDTypeInfo from './IDTypeInfo'
import { customFormStyle } from '../../util/customFormStyle'
import { yupResolver } from '@hookform/resolvers/yup'
import ValidationSchema from '../shared/FormValidation/ValidationSchema'
import { useRouter } from 'next/router'

type DocumentType = {
  nric_front?: string
  nric_back?: string
  iras_cpf?: string
  passport?: string
  credit_report?: string
  pass_id_front?: string
  pass_id_back?: string
  sponsor_letter?: string
  admission_letter?: string
  matriculation_card?: string
  salary_slip?: string
}

//MAIN FUNCTION
const PersonalEdit = ({ setEditView, refetchUserProfileDetails }: any) => {
  const {
    local_foreigner,
    cbsList,
    genderItems,
    ageFactorList,
    maritalStatusList,
    employmentType,
    idTypeListSin,
    nationalityList,
    raceList,
    educationLevel,
    nricTypeList,
  } = demoData

  const router = useRouter()
  const isChatRoute = router.query?.complePro

  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const { data: session, update }: any = useSession()

  const { data: userProfile } = useGetUserProfileDetailsQuery(session?.user?.id)

  const [title, setTitle] = useState('Change Profile Photo')
  const [dialogTitle, setDialogTitle] = useState<string | any>()
  const { type } = useSelector((state: StoreState) => state.entities.user)
  const [documents, setDocuments]: any = useState<DocumentType>(
    userProfile?.document_url
      ? userProfile?.document_url
      : {
          nric_front: '',
          nric_back: '',
          iras_cpf: '',
          passport: '',
          credit_report: '',
          pass_id_front: '',
          pass_id_back: '',
          sponsor_letter: '',
          admission_letter: '',
          matriculation_card: '',
          salary_slip: '',
        }
  )
  const [salaryOpen, setSalaryOpen] = useState(false)
  const [previewImage, setPreviewImage]: any = useState()
  const [preview, setPreview]: any = useState()
  const occupiersSalaryList = {
    mainTenant_salary: 0,
    occupant1_salary: 0,
    occupant2_salary: 0,
    occupant3_salary: 0,
    occupant4_salary: 0,
    occupant5_salary: 0,
    ...userProfile?.occupiers_salary_list,
  }
  const [salary, setSalary] = useState({
    ...occupiersSalaryList,
  })

  const [totalSalary, setTotalSalary] = useState()
  const [localForeigner, setLocalForeigner]: any = useState(userProfile?.nationality)
  const [occupation, setOccupation] = useState(userProfile?.occupation)
  const [documentNow, setDocumentNow]: any = useState<DocumentType>({
    nric_front: '',
    nric_back: '',
    credit_report: '',
    iras_cpf: '',
    passport: '',
    pass_id_front: '',
    pass_id_back: '',
    sponsor_letter: '',
    admission_letter: '',
    matriculation_card: '',
    salary_slip: '',
  })
  // working
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    trigger,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(ValidationSchema(type !== 'tenant')),
  })
  console.log('payload_type', type)
  console.log('payload_errors:', errors) //!~~~~~~~~~~~~

  const handelTotalSalaryCount = (e: any) => {
    const { name, value } = e.target
    setSalary((prev: any) => ({
      ...prev,
      [name]: parseInt(value),
    }))
  }

  const [idType, setIdType] = useState(userProfile?.nric_type)
  // const [Address, setAddress] = useState(userProfile?.address) //!~~~~~~~~~~~~~~~~
  const getCustomerDateOfBirth = (date: any) => {
    const dateObject: any = new Date(date)
    if (dateObject.getFullYear() < 2000) {
      setIdType('S')
      setValue('id_type', 'S')
    }

    if (dateObject.getFullYear() >= 2000) {
      setIdType('T')
      setValue('id_type', 'T')
    }
  }

  const handleLocalForeignerOnChange = (newValue: any) => {
    setValue('localForeigner', newValue ? newValue.target.value : ' ')
  }

  const handleOccupationOnChange = (newValue: any) => {
    setValue('occupation', newValue ? newValue.target.value : ' ')
  }

  useEffect(() => {
    if (isChatRoute && payload?.threadInfo?.receiver_id != session?.user?.id) {
      trigger('age')
      trigger('gender')
      trigger('marital_status')
      trigger('occupation')
      trigger('localForeigner')
      trigger('education_level')
      trigger('salary')
      trigger('outstanding_loan')
      trigger('cbs_score')
      trigger('passport_no')
    }

    if (isChatRoute && payload?.threadInfo?.receiver_id == session?.user?.id) {
      trigger('address')
      trigger('nric_fin')
    }

    setValue('user_nationality', userProfile?.user_nationality)
    setValue('race', userProfile?.race)
  }, [isChatRoute, userProfile])

  useEffect(() => {
    switch (localForeigner) {
      case 'Local':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
        }

        break
      case 'PR':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front
                ? userProfile?.document_url['nric_front']
                : setDocumentNow['nric_front'],
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
        }

        break
      case 'Foreigner (Returning)':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              matriculation_card: userProfile?.document_url?.matriculation_card
                ? userProfile?.document_url['matriculation_card']
                : '',
            })
            break
        }

        break
      case 'Foreigner (1st Timer)':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              matriculation_card: userProfile?.document_url?.matriculation_card
                ? userProfile?.document_url['matriculation_card']
                : '',
            })
            break
        }

        break
    }
  }, [localForeigner, occupation, userProfile?.document_url])

  const handleClose = () => {
    setSalaryOpen(false)
  }

  const totalCount = () => {
    const total: any = Object.values(salary).reduce((acc: any, val: any) => parseInt(acc) + parseInt(val), 0)
    setTotalSalary(total)
    setValue('salary', `${total}`, { shouldValidate: true })
    handleClose()
  }

  const handleLocalForeigner = (e: any) => {
    if (e.target.textContent === '') {
      return false
    }
    setLocalForeigner(e.target.textContent)
  }

  const handleLocalOccupation = (e: any) => {
    if (e.target.textContent === '') {
      return false
    }
    setOccupation(e.target.textContent)
  }

  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleSave = (documentType: any) => {
    setDocumentNow((prev: any) => {
      const newObj = {
        ...prev,
      }
      newObj[documentType] = previewImage
      return newObj
    })
    setOpen(false)
    setPreviewImage('')
  }

  const progress = userProfile?.completion_rate

  const handleCropComplete = (croppedImageUrl: any) => {
    const base64ImageWithoutPrefix = croppedImageUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
    const decodedData = atob(base64ImageWithoutPrefix)
    const byteArray = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i)
    }

    const blobData = new Blob([byteArray], { type: 'image/png' })
    const file = new File([blobData], 'profileImage.png', { type: 'image/png' })
    setPreview(file)
  }
  const [uploadFiles] = useMultiFileUploadMutation()
  const [updateUserInfo] = useUpdateUserProfileMutation()

  const handleUploadDocument = (e: any) => {
    setValue('credit_report', e.target.files[0])
    setPreviewImage(e.target.files[0])
  }
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  //!======

  const handlePersonalInfoUpdate = async (data: any, event: any) => {
    event.preventDefault()

    let previewProfileImage = ''
    if (typeof preview === 'object') {
      const imageFormData = new FormData()
      imageFormData.append(`media[0]`, preview)

      const response: any = await uploadFiles(imageFormData)
      previewProfileImage = response.data.url[0]
    }
    const result = Object.entries(documents).map(async ([key, value]: any, _: number) => {
      if (typeof value === 'object') {
        const docImageFormData = new FormData()
        docImageFormData.append(`media[0]`, value)
        const response: any = await uploadFiles(docImageFormData)
        return [key, response.data.url[0]]
      } else {
        return [key, value]
      }
    })
    const res = await Promise.all(result)
    const actualdoc: any = {}
    res.map((ent: any) => {
      actualdoc[ent[0]] = ent[1]
    })

    const salaryStr: any = {}

    Object.entries(salary).forEach(([key, value]: any) => (salaryStr[key] = value.toString()))
    const addr = watch('address') //!~~~~~~~~~~~~~~
    const fin = watch('nric_fin') //!~~~~~~~~~~~~~~
    const age = watch('age') //!~~~~~~~~~~~~~~
    console.log('payload_addr_watch', addr)
    console.log('payload_fin_watch', fin)
    console.log('payload_age_watch', age)

    const form_Data = {
      name: data.name,
      last_name: '',
      profile_pic: previewProfileImage,
      address: data.address,
      // address: Address,
      representation: '',
      // company_name: business_name || university_name,
      nickname: '',
      nationality: data.localForeigner,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      industry: '',
      employment_type: data.occupation,
      occupation: data.occupation,
      employer_name: data.employer_name,
      number_pax: '',
      reason_move: '',
      desired_property_details: '',
      payment_info: '',
      document_url: JSON.stringify(actualdoc),
      user_id_type: data.pass_type,
      nric_type: data.id_type,
      user_id_number: data.nric_fin,
      race: data.race,
      cbs_score: data.cbs_score,
      address_type: '',
      education_level: data.education_level,
      salary: data.salary,
      outstanding_loan: data.outstanding_loan,
      user_nationality: data.user_nationality,
      age: data.age,
      marital_status: data.marital_status,
      occupiers_salary_list: JSON.stringify(salaryStr),
    }

    dispatch(showLoader('Updating user info...'))
    // await updateUserInfo({ userId: session?.user?.id, data: payload })
    await updateUserInfo({ userId: session?.user?.id, data: form_Data })
    await update()
    try {
      await refetchUserProfileDetails()
    } catch (error) {
      // console.log('error', error)
    }

    console.log('payload..', form_Data)

    if (isChatRoute) {
      router.push('/conversation')
    } else {
      router.push('/dashboard/personal-info')
    }

    //window.location.reload()
  }

  const handleClickOpen = () => {
    setSalaryOpen(true)
  }

  const showIDTypeInfo = () => {
    store.dispatch(
      showModal({
        open: true,
        name: 'DETAILS OF PREFIX LETTERFOR NRIC/FIN',
        children: <IDTypeInfo />,
        className: ' ',
      })
    )
  }
  //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // const addr = watch('address') //!~~~~~~~~~~~~~~
  // const fin = watch('nric_fin') //!~~~~~~~~~~~~~~
  // const age = watch('age') //!~~~~~~~~~~~~~~
  // console.log('payload_addr_watch', addr)
  // console.log('payload_fin_watch', fin)
  // console.log('payload_age_watch', age)

  //!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <>
      <div className="p-5 md:p-9">
        <div className="flex items-center justify-between ">
          <div className="flex items-baseline gap-2">
            <div style={{ width: '40px', height: '40px' }}>
              <Image objectFit="contain" style={{ width: '20%', height: '20%' }} src={userBlueIcon} alt="no-image" />
            </div>
            <h2 className="text-[#034EA1] text-lg font-bold mb-5">
              <span>Edit Personal Info</span>
            </h2>
          </div>
          <div className="flex justify-between">
            <div className="w-full">
              <h5
                className={classNames(
                  'font-normal font-roboto text-sm md:text-base xl:text-lg',
                  isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
                )}>
                Your profile is <span className="font-bold">{progress}% get complete!</span>
              </h5>
              <ProgressBar progress={progress} />
            </div>

            <div className="flex gap-5 w-[300px] ml-5 justify-end">
              <Button
                style={{ border: '1px solid #FF3434', color: '#FF3434' }}
                onClick={() => setEditView(false)}
                variant="outlined"
                className="!flex !items-center !gap-2 !rounded-md !px-8 !py-3 !cursor-pointer">
                <span className="!font-normal">Cancel</span>
              </Button>
              <label
                className="flex items-center gap-2 text-white rounded-md px-8 py-3 cursor-pointer"
                style={{ backgroundColor: isTenant(type) ? '#00ADEE' : '#034EA1', color: '#fff' }}
                htmlFor="submitBtn">
                Update
              </label>
            </div>
          </div>
        </div>
        <div className="bg-[#F1F7FF] min-h-full rounded-lg shadow-lg md:p-8 flex justify-between">
          {/* GENERAL INFO */}
          <form onSubmit={handleSubmit(handlePersonalInfoUpdate)} className="w-[60%]">
            <button id="submitBtn" type="submit" style={{ display: 'none' }}></button>
            <div className="md:flex gap-3 md:gap-5 xl:gap-8 ">
              <div className="w-full  bg-[#F1F7FF] py-2 md:py-3 xl:py-4 px-4 md:px-7 xl:px-11  rounded-[10px] ">
                <div>
                  <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
                    General Info
                  </h2>

                  <div className="w-full">
                    <div className=" !flex !gap-5 !mb-2 md:!mb-3 xl:!mb-5">
                      {/* FULL NAME INPUT */}
                      <div className=" w-1/2">
                        <TextField
                          defaultValue={userProfile?.name}
                          {...register('name')}
                          inputProps={{ readOnly: userProfile?.isThread }}
                          id="outlined-basic"
                          label="Full Name"
                          variant="outlined"
                          autoComplete="off"
                          fullWidth
                          sx={customFormStyle.sx_text_field}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="name"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>

                      {/* DATE OF BIRTH INPUT */}
                      <div className=" w-1/2">
                        <Controller
                          control={control}
                          {...register('date_of_birth')}
                          render={({ field: { onChange } }) => (
                            <DatePicker
                              className={`!w-full !my-0`}
                              format="DD MMMM YYYY"
                              defaultValue={
                                userProfile?.date_of_birth
                                  ? moment(userProfile?.date_of_birth)
                                  : moment().subtract(18, 'years')
                              }
                              maxDate={moment().subtract(18, 'years')}
                              label="Date of Birth"
                              onChange={event => {
                                onChange(event)
                                getCustomerDateOfBirth(event)
                              }}
                              sx={customFormStyle.sx_text_field}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="date_of_birth"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>
                    </div>

                    {/* EMAIL AND MOBILE INPUT */}
                    <div className=" !flex  !gap-5 !mb-2 md:!mb-3 xl:!mb-5">
                      <TextField
                        {...register('email')}
                        fullWidth
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        defaultValue={userProfile?.email}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={customFormStyle.sx_text_field}
                      />
                      <TextField
                        label="Phone"
                        value={userProfile?.mobile}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        sx={customFormStyle.sx_text_field}
                      />
                    </div>

                    <div className=" flex  gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
                      {/* AGE RANGE INPUT */}
                      <div className=" w-full">
                        <FormControl fullWidth sx={customFormStyle.sx_text_field}>
                          <InputLabel>Age Range</InputLabel>
                          <Select defaultValue={userProfile?.age} {...register('age')} fullWidth label="Age range">
                            {ageFactorList.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name="age"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>

                      {/* GENDER INPUT */}
                      <div className="w-full">
                        <FormControl fullWidth sx={customFormStyle.sx_text_field}>
                          <InputLabel>Gender</InputLabel>
                          <Select label="Gender" defaultValue={userProfile?.gender} {...register('gender')}>
                            {genderItems.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name="gender"
                          render={({ message }: any) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>
                    </div>

                    <div className=" flex gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
                      {/* marital_status */}
                      <div className=" w-full">
                        <FormControl fullWidth sx={customFormStyle.sx_text_field}>
                          <InputLabel>Marital status</InputLabel>
                          <Select
                            {...register('marital_status')}
                            fullWidth
                            id="marital_status"
                            label="Marital status"
                            defaultValue={userProfile?.marital_status}>
                            {maritalStatusList.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name="marital_status"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>

                      {/* Education Level */}
                      <div className=" w-full">
                        <FormControl fullWidth sx={customFormStyle.sx_text_field}>
                          <InputLabel>Education Level</InputLabel>
                          <Select
                            defaultValue={userProfile?.education_level}
                            {...register('education_level')}
                            fullWidth
                            label="Education Level">
                            {educationLevel.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name="education_level"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>
                    </div>

                    <div className=" flex gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
                      <div className="w-1/2">
                        <FormControl fullWidth sx={customFormStyle.sx_text_field}>
                          <InputLabel>Local/Foreigner</InputLabel>
                          <Select
                            {...register('localForeigner')}
                            onClick={e => {
                              handleLocalForeigner(e)
                              // trigger('localForeigner')
                              trigger('credit_report')
                            }}
                            onChange={handleLocalForeignerOnChange}
                            fullWidth
                            label="Local/Foreigner"
                            defaultValue={userProfile?.nationality}>
                            {local_foreigner.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <ErrorMessage
                          errors={errors}
                          name="localForeigner"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>

                      {/* PREFIX LETTER AND NRIC|FIN */}
                      {localForeigner != 'Foreigner (1st Timer)' ? (
                        <div className=" w-1/2 flex flex-col !relative">
                          <div className="flex w-full personal-info-idType ">
                            <FormControl className={`!w-[35%]  pr-1`} sx={customFormStyle.sx_text_field}>
                              <HelpIcon
                                onClick={showIDTypeInfo}
                                className="!absolute !text-sm !top-1 !right-1 !z-10"></HelpIcon>
                              <InputLabel id="demo-simple-select-label">Prefix Letter </InputLabel>

                              <Select
                                {...register('id_type')}
                                label="Prefix Letter"
                                fullWidth
                                id="idtype"
                                onChange={e => (setIdType(e.target.value), trigger('id_type'))}
                                defaultValue={idType}>
                                {nricTypeList.map(option => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            <TextField
                              {...register('nric_fin')}
                              // onChange={() => {
                              //   trigger('nric_fin')
                              // }}
                              // defaultValue={userProfile?.user_id_number}
                              fullWidth
                              type="text"
                              id="outlined-basic"
                              label="NRIC/FIN"
                              variant="outlined"
                              sx={customFormStyle.sx_text_field}
                            />
                          </div>
                          <ErrorMessage
                            errors={errors}
                            name="nric_fin"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </div>
                      ) : (
                        <div className="w-1/2 ">
                          <TextField
                            defaultValue={userProfile?.passport_no}
                            {...register('passport_no')}
                            fullWidth
                            type="text"
                            id="outlined-basic"
                            label="Passport/FIN"
                            variant="outlined"
                            sx={customFormStyle.sx_text_field}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="passport_no"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </div>
                      )}
                    </div>
                    <div className=" flex gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
                      <FormControl fullWidth>
                        <Autocomplete
                          {...register('user_nationality')}
                          options={nationalityList}
                          getOptionLabel={option => option.label}
                          onChange={(event: any, newValue: any) => {
                            setValue('user_nationality', newValue ? newValue.value : userProfile?.user_nationality)
                          }}
                          defaultValue={nationalityList.find(
                            (option: any) => option.label === userProfile?.user_nationality
                          )}
                          renderInput={params => <TextField {...params} label="Nationality" />}
                          PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                          sx={customFormStyle.sx_text_field}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <Autocomplete
                          {...register('race')}
                          options={raceList}
                          getOptionLabel={option => option.label}
                          defaultValue={{ value: userProfile?.race, label: userProfile?.race }}
                          onChange={(event: any, newValue: any) => {
                            setValue('race', newValue ? newValue.value : userProfile?.race)
                          }}
                          renderInput={params => <TextField {...params} label="Race" />}
                          PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                          sx={customFormStyle.sx_text_field}
                        />
                      </FormControl>
                    </div>
                    <div className="!my-3">
                      <TextField
                        defaultValue={userProfile?.address == 'NA' ? '' : userProfile?.address.replace(`null`, ``)}
                        // value={Address}
                        {...register('address')}
                        // onChange={(e: any) => {
                        //   // setValue('address', e.target.value)
                        //   // setAddress(e.target.value)
                        //   trigger('address')
                        // }}
                        fullWidth
                        type="text"
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        autoComplete="off"
                        sx={customFormStyle.sx_text_field}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="address"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
                    Credit Info
                  </h2>

                  <div className="w-full flex flex-wrap gap-y-5 justify-between">
                    <div className=" !w-[48%]">
                      <FormControl fullWidth sx={customFormStyle.sx_text_field}>
                        <InputLabel>Occupation</InputLabel>
                        <Select
                          {...register('occupation')}
                          onClick={e => {
                            handleLocalOccupation(e)
                            // trigger('occupation')
                          }}
                          fullWidth
                          id="outlined-basic"
                          label="Occupation"
                          onChange={handleOccupationOnChange}
                          defaultValue={userProfile?.occupation}>
                          {employmentType.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <ErrorMessage
                        errors={errors}
                        name="occupation"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />
                    </div>

                    <div className="!w-[48%]">
                      {occupation === 'Employed' && (
                        <TextField
                          fullWidth
                          type="text"
                          id="outlined-basic"
                          autoComplete="off"
                          label="Employer Name"
                          variant="outlined"
                          defaultValue={userProfile?.occupation === 'Employed' ? userProfile.employer_name : ''}
                          {...register('employer_name')}
                          sx={customFormStyle.sx_text_field}
                        />
                      )}
                      {occupation === 'Self Employed' && (
                        <TextField
                          fullWidth
                          type="text"
                          id="outlined-basic"
                          label="Business Name"
                          variant="outlined"
                          autoComplete="off"
                          defaultValue={userProfile?.occupation === 'Self Employed' ? userProfile?.employer_name : ''}
                          {...register('business_name')}
                          sx={customFormStyle.sx_text_field}
                        />
                      )}
                      {occupation === 'Student' && (
                        <TextField
                          fullWidth
                          type="text"
                          id="outlined-basic"
                          label="University/School Name"
                          variant="outlined"
                          autoComplete="off"
                          defaultValue={userProfile?.occupation === 'Student' ? userProfile?.employer_name : ''}
                          {...register('university_name')}
                          sx={customFormStyle.sx_text_field}
                        />
                      )}
                    </div>
                    {(localForeigner === 'Foreigner (1st Timer)' || localForeigner === 'Foreigner (Returning)') && (
                      <FormControl className="!w-[48%]" sx={customFormStyle.sx_text_field}>
                        <InputLabel>Pass Type</InputLabel>
                        <Select
                          {...register('pass_type')}
                          fullWidth
                          label="Pass Type"
                          autoComplete="off"
                          defaultValue={userProfile?.user_id_type}>
                          {idTypeListSin.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    <div className="!w-[48%]">
                      <Dialog
                        fullWidth
                        open={salaryOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            <TextField
                              className="!w-full py-2"
                              fullWidth
                              type="number"
                              id="outlined-basic"
                              label="Main Tenant"
                              variant="outlined"
                              value={salary.mainTenant_salary ? salary.mainTenant_salary : ''}
                              name="mainTenant_salary"
                              onChange={handelTotalSalaryCount}
                              onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
                            />
                            <TextField
                              className="!w-full py-2"
                              fullWidth
                              type="number"
                              id="outlined-basic"
                              label="Occupant 01 "
                              variant="outlined"
                              onChange={handelTotalSalaryCount}
                              value={salary.occupant1_salary ? salary.occupant1_salary : ''}
                              name="occupant1_salary"
                              onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
                            />
                            <TextField
                              className="!w-full py-2"
                              fullWidth
                              type="number"
                              id="outlined-basic"
                              label="Occupant 02 "
                              variant="outlined"
                              onChange={handelTotalSalaryCount}
                              value={salary.occupant2_salary ? salary.occupant2_salary : ''}
                              name="occupant2_salary"
                            />
                            <TextField
                              className="!w-full py-2"
                              fullWidth
                              type="number"
                              id="outlined-basic"
                              label="Occupant 03 "
                              variant="outlined"
                              onChange={handelTotalSalaryCount}
                              value={salary.occupant3_salary ? salary.occupant3_salary : ''}
                              name="occupant3_salary"
                              onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
                            />
                            <TextField
                              className="!w-full py-2"
                              fullWidth
                              type="number"
                              id="outlined-basic"
                              label="Occupant 04"
                              variant="outlined"
                              onChange={handelTotalSalaryCount}
                              value={salary.occupant4_salary ? salary.occupant4_salary : ''}
                              name="occupant4_salary"
                              onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
                            />
                            <TextField
                              className="!w-full py-2"
                              fullWidth
                              type="number"
                              id="outlined-basic"
                              label="Occupant 05"
                              variant="outlined"
                              onChange={handelTotalSalaryCount}
                              value={salary.occupant5_salary ? salary.occupant5_salary : ''}
                              name="occupant5_salary"
                              onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
                            />
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} autoFocus>
                            No Breakdown
                          </Button>
                          <Button onClick={totalCount} autoFocus>
                            Save
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <TextField
                        {...register('salary')}
                        fullWidth
                        onClick={handleClickOpen}
                        type="number"
                        id="outlined-basic"
                        label="Salary"
                        variant="outlined"
                        value={totalSalary ? totalSalary : userProfile?.salary}
                        sx={customFormStyle.sx_text_field}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="salary"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />
                    </div>
                    <div className="!w-[48%]">
                      <TextField
                        fullWidth
                        defaultValue={userProfile?.outstanding_loan ? userProfile?.outstanding_loan : ''}
                        {...register('outstanding_loan')}
                        type="number"
                        id="outlined-basic"
                        label="Outstanding Loans"
                        variant="outlined"
                        sx={customFormStyle.sx_text_field}
                        onKeyUp={(e: any) => {
                          e.target.value = e.target.value.replace(/\D/, '')
                        }}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="outstanding_loan"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />
                    </div>
                    {localForeigner != 'Foreigner (1st Timer)' && (
                      <FormControl className="!w-[48%]" sx={customFormStyle.sx_text_field}>
                        <InputLabel>CBS Rating</InputLabel>
                        <Select
                          {...register('cbs_score')}
                          fullWidth
                          label="CBS Rating"
                          defaultValue={userProfile?.cbs_score}
                          sx={customFormStyle.sx_text_field}>
                          {cbsList.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          errors={errors}
                          name="cbs_score"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </FormControl>
                    )}
                  </div>
                </div>
              </div>

              {/*here*/}
            </div>
          </form>
          <div className="w-[40%]">
            <div className="w-full mb-5 bg-[#F8FBFF] py-4 px-8 border border-[#D4E8FF] rounded-lg flex items-center gap-5 bg-radial-gradient ">
              <div className="w-full ">
                <h2 className="font-bold font-roboto text-[#000000] text-lg md:text-xl xl:text-2xl">
                  Your Profile Photo
                </h2>

                <div className=" flex">
                  <div className="w-full">
                    {(() => {
                      if (preview) {
                        if (typeof preview === 'string') {
                          return <img src={preview} alt="" className="w-[100px] h-[100px] rounded-full" />
                        } else {
                          return (
                            <img
                              src={URL.createObjectURL(preview)}
                              alt=""
                              className="w-[100px] h-[100px] rounded-full"
                            />
                          )
                        }
                      } else {
                        if (userProfile?.profile_pic) {
                          return (
                            <img src={userProfile?.profile_pic} alt="" className="w-[100px] h-[100px] rounded-full" />
                          )
                        } else {
                          return <img src="/no_profile.jpg" alt="" className="w-[100px] h-[100px] rounded-full" />
                        }
                      }
                    })()}
                  </div>
                  <div className="w-full">
                    <PhotoCropper
                      className={classNames(
                        '!text-white !rounded-md !p-3 !cursor-pointer',
                        isTenant(type) ? '!bg-[#00ADEE]' : '!bg-[#034EA1]'
                      )}
                      onCropComplete={handleCropComplete}
                      title={title}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F1F7FF] py-3 md:py-4 xl:py-6 px-4 md:px-7 xl:px-11 border border-[#D4E8FF] mt-5 md:mt-0 rounded-md w-full">
              <h2 className="font-bold font-roboto text-[#202020] text-lg sm:text-xl xl:text-2xl  mb-[18px] md:mb-[22px] xl:mb-[30px]">
                My Documents
              </h2>
              <div className=" !rounded-[10px]">
                <Dialog
                  open={open}
                  keepMounted
                  onClose={() => {
                    trigger(dialogTitle)
                    setOpen(false)
                  }}
                  aria-describedby="alert-dialog-slide-description">
                  <DialogTitle>{dialogTitle}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {previewImage && (
                        <a href={URL.createObjectURL(previewImage)} target="_blank" rel="noreferrer">
                          <Image width="100px" height="100px" src={pdfView} alt="" />
                        </a>
                      )}
                      <TextField
                        ref={fileRef}
                        name={dialogTitle}
                        onChange={e => {
                          handleUploadDocument(e)
                        }}
                        id={dialogTitle}
                        type="file"
                        className="!w-full"
                        inputProps={{ accept: 'application/pdf' }}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="text"
                      onClick={() => {
                        setPreviewImage('')
                        setOpen(false)
                      }}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        trigger(dialogTitle)
                        if (fileRef.current) {
                          fileRef.current.files = null
                        }
                        handleSave(dialogTitle)
                      }}>
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2  md:gap-3 xl:gap-5">
                  {Object.entries(documentNow).map(([key, value]: any, _: number) => (
                    <div key={key}>
                      <div className="flex items-center justify-center flex-col h-[170px]">
                        <div
                          className={classNames(
                            'rounded-lg border-2 flex shrink-0 items-center justify-center w-[130px] h-4/6  mb-2',
                            {
                              'border-dashed border-[#A1A1A1]': !value,
                              'border-[#D4E8FF]': value,
                            }
                          )}>
                          {documentNow[key] ? (
                            typeof value === 'string' ? (
                              <a href={value} target="_blank" rel="noreferrer">
                                <Image src={pdfView} alt="" width="100px" height="100px" />
                              </a>
                            ) : (
                              <a href={URL.createObjectURL(value)} target="_blank" rel="noreferrer">
                                <Image width="100px" height="100px" src={pdfView} alt="" />
                              </a>
                            )
                          ) : (
                            <button
                              onClick={() => {
                                setDialogTitle(key)
                                setOpen(true)
                              }}
                              type="button"
                              className="cursor-pointer bg-transparent w-full h-full">
                              <Image width="50px" height="50px" src={upload} alt="" />
                            </button>
                          )}
                        </div>
                        <p className=" shrink capitalize text-xl/none text-center h-2/6">
                          {changeDocumentName(key, localForeigner, occupation)}
                        </p>
                      </div>
                      <ErrorMessage
                        errors={errors}
                        name={key}
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{key + message}</p>}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalEdit
