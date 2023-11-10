// import { StoreState } from '@/types'
// import { isTenant } from '@/util' // toTitleCase
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     TextField,
//     Autocomplete,
//     Paper,
//     // Box,
// } from '@mui/material'
// import { makeStyles } from '@mui/styles'
// import classNames from 'classnames'
// import React, { useEffect, useRef, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { ProgressBar } from './Personal'
// import Image from 'next/image'
// import userBlueIcon from '@/public/userEditBlue.svg'
// import upload from '@/public/uploadIcon.svg'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { Controller, useForm } from 'react-hook-form' // set
// import PhotoCropper from '../shared/PhotoCropper/PhotoCropper'
// // import { StoreThunkDispatch } from '@/types'
// import pdfView from '@/public/pdf.svg'
// import store, {
//     // closeDocumentModal,
//     // deleteDocument,
//     // hideLoader,
//     // openDocumentModal,
//     showLoader,
//     showModal,
//     // updateDocumentUrl,
//     // uploadDocument,
//     useGetUserProfileDetailsQuery,
//     useMultiFileUploadMutation,
//     useUpdateUserProfileMutation,
// } from '@/store'
// // import { StoreGetState } from '@/types'
// // import { DOCUMENT_TYPES } from '@/constants'
// import { useSession } from 'next-auth/react'
// import { demoData } from '@/util/data'
// // import { route } from 'next/dist/server/router'
// // import { useRouter } from 'next/router'
// // import MuiPhoneNumber from 'mui-phone-number'
// import moment from 'moment'
// import { ErrorMessage } from '@hookform/error-message'
// // import Tooltip from '@mui/material/Tooltip'
// import HelpIcon from '@mui/icons-material/Help'
// // import { log } from 'console'
// import { changeDocumentName } from '@/util/helper'
// import IDTypeInfo from './IDTypeInfo'
// // import { BsFillInfoCircleFill } from 'react-icons/bs'

// //!==============
// import { customFormStyle } from '../../util/customFormStyle'
// import { yupResolver } from '@hookform/resolvers/yup'
// import ValidationSchema from '../shared/FormValidation/ValidationSchema'
// //!==============
// type DocumentType = {
//     nric_front?: string
//     nric_back?: string
//     iras_cpf?: string
//     passport?: string
//     credit_report?: string
//     pass_id_front?: string
//     pass_id_back?: string
//     sponsor_letter?: string
//     admission_letter?: string
//     matriculation_card?: string
//     salary_slip?: string
// }

// //INTERNAL STYLE SHEET. WILL TRANSFER TO CSS FILE LATER
// const useStyles = makeStyles((_: any) => ({
//     select: {},
//     input: {
//         '& .MuiOutlinedInput-root': {
//             '& .MuiOutlinedInput-input': {
//                 color: '#202020', // Set the text color to your desired color
//             },
//             '&.Mui-focused fieldset': {
//                 borderWidth: 1,
//                 borderColor: '#00ADEE', // Set the border color on focus
//                 boxShadow: '0px 2px 8px #034EA10F',
//             },
//             '&:hover fieldset': {
//                 borderWidth: 1,
//                 borderColor: '#00ADEE', // Set the border color on focus
//             },
//             '&.Mui-error .MuiOutlinedInput-notchedOutline': {
//                 borderWidth: 1,
//                 // borderColor: '#C1C1C1', // Set the border color on focus
//                 borderColor: '#C1C1C1C1', // Set the border color on focus
//             },
//             '&:hover.Mui-error .MuiOutlinedInput-notchedOutline': {
//                 borderWidth: 1,
//                 borderColor: '#00ADEE', // Set the border color on focus
//             },
//             '&:hover .MuiInputLabel-root fieldset': {
//                 color: '#00ADEE', // Change label color if there is an error
//             },
//         },
//     },
//     id_type: {
//         '& .MuiOutlinedInput-root': {
//             borderRadius: '8px 0 0 8px',
//             '& .MuiOutlinedInput-input': {
//                 color: '#202020', // Set the text color to your desired color
//             },
//             '&.Mui-focused fieldset': {
//                 borderWidth: 1,
//                 borderColor: '#00ADEE', // Set the border color on focus
//             },
//             '&:hover fieldset': {
//                 borderWidth: 1,
//                 borderColor: '#00ADEE', // Set the border color on focus
//             },
//         },
//     },
//     partial_nric: {
//         '& .MuiOutlinedInput-root': {
//             borderRadius: ' 0 8px 8px 0',
//             '&.Mui-focused': {
//                 backgroundColor: 'transparent',
//             },
//             '& .MuiOutlinedInput-input': {
//                 color: '#202020', // Set the text color to your desired color
//             },
//             '&.Mui-focused fieldset': {
//                 borderWidth: 1,
//                 borderColor: '#00ADEE', // Set the border color on focus
//             },
//             '&:hover fieldset': {
//                 borderWidth: 1,
//                 borderColor: '#00ADEE', // Set the border color on focus
//             },
//         },
//     },
// }))

// //MAIN FUNCTION
// const PersonalEdit = ({ setEditView, refetchUserProfileDetails }: any) => {
//     const {
//         local_foreigner,
//         cbsList,
//         genderItems,
//         ageFactorList,
//         maritalStatusList,
//         employmentType,
//         idTypeListSin,
//         nationalityList,
//         raceList,
//         educationLevel,
//         nricTypeList,
//         // occup,
//     } = demoData

//     const { data: session }: any = useSession()
//     const { data: userProfile } = useGetUserProfileDetailsQuery(session?.user?.id)
//     // const [multiFileUpload, { data: fileData, isLoading, error }] = useMultiFileUploadMutation()
//     // const [userProfilePreview, setUserProfilePreview] = useState(session?.user?.user_profile)
//     const [title, setTitle] = useState('Change Profile Photo')
//     const [dialogTitle, setDialogTitle] = useState<string | any>()
//     const { type } = useSelector((state: StoreState) => state.entities.user)
//     const [documents, setDocuments]: any = useState<DocumentType>(
//         userProfile?.document_url
//             ? userProfile?.document_url
//             : {
//                 nric_front: '',
//                 nric_back: '',
//                 iras_cpf: '',
//                 passport: '',
//                 credit_report: '',
//                 pass_id_front: '',
//                 pass_id_back: '',
//                 sponsor_letter: '',
//                 admission_letter: '',
//                 matriculation_card: '',
//                 salary_slip: '',
//             }
//     )
//     const [salaryOpen, setSalaryOpen] = useState(false)
//     const [previewImage, setPreviewImage]: any = useState()
//     const [preview, setPreview]: any = useState()
//     const occupiersSalaryList = {
//         mainTenant_salary: 0,
//         occupant1_salary: 0,
//         occupant2_salary: 0,
//         occupant3_salary: 0,
//         occupant4_salary: 0,
//         occupant5_salary: 0,
//         ...userProfile?.occupiers_salary_list,
//     }
//     const [salary, setSalary] = useState({
//         ...occupiersSalaryList,
//     })

//     const [totalSalary, setTotalSalary] = useState()
//     const [localForeigner, setLocalForeigner]: any = useState(userProfile?.nationality)
//     const [occupation, setOccupation] = useState(userProfile?.occupation)
//     const [documentNow, setDocumentNow]: any = useState<DocumentType>({
//         nric_front: '',
//         nric_back: '',
//         credit_report: '',
//         // iras_cpf: '',
//         // passport: '',
//         // pass_id_front: '',
//         // pass_id_back: '',
//         // sponsor_letter: '',
//         // admission_letter: '',
//         // matriculation_card: '',
//         // sponsor_letter: '',
//         // salary_slip: '',
//     })
//     // working
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         control,
//         formState: { errors },
//         trigger,
//     } = useForm({
//         resolver: yupResolver(ValidationSchema(type !== 'tenant')),
//     })

//     const handelTotalSalaryCount = (e: any) => {
//         const { name, value } = e.target
//         setSalary((prev: any) => ({
//             ...prev,
//             [name]: parseInt(value),
//         }))
//     }

//     const [idType, setIdType] = useState(userProfile?.nric_type)
//     // const [dateObject, setDateObject] = useState()
//     const getCustomerDateOfBirth = (date: any) => {
//         const dateObject: any = new Date(date)
//         // setDateObject(dateObject)
//         if (dateObject.getFullYear() < 2000) {
//             setIdType('S')
//             setValue('id_type', 'S')
//         }

//         if (dateObject.getFullYear() >= 2000) {
//             setIdType('T')
//             setValue('id_type', 'T')
//         }
//     }

//     // const handlePhoneOnChange = (newValue: any) => {
//     //   setValue('phone', newValue)
//     // }

//     const handleEmailOnChange = (newValue: any) => {
//         setValue('email', newValue ? newValue.target.value : ' ')
//     }

//     const handleRaceOnChange = (event: any, newValue: any) => {
//         setValue('race', newValue ? newValue.value : ' ')
//     }
//     const handleNationalityOnChange = (event: any, newValue: any) => {
//         setValue('nationality', newValue ? newValue.value : ' ')
//     }

//     const handleCBSOnChange = (newValue: any) => {
//         setValue('cbs', newValue ? newValue.target.value : ' ')
//     }

//     const handlePassTypeOnChange = (newValue: any) => {
//         setValue('pass_type', newValue ? newValue.target.value : ' ')
//     }

//     const handleAgeOnChange = (newValue: any) => {
//         setValue('age', newValue ? newValue.target.value : ' ')
//     }

//     const handleMaritialStatusOnChange = (newValue: any) => {
//         setValue('marital_status', newValue ? newValue.target.value : ' ')
//     }

//     const handleGenderOnChange = (newValue: any) => {
//         setValue('gender', newValue ? newValue.target.value : ' ')
//     }

//     const handleLocalForeignerOnChange = (newValue: any) => {
//         setValue('localForeigner', newValue ? newValue.target.value : ' ')
//     }

//     const handleOccupationOnChange = (newValue: any) => {
//         setValue('Occupation', newValue ? newValue.target.value : ' ')
//     }
//     const handleEducationLevelChange = (newValue: any) => {
//         setValue('education_level', newValue ? newValue.target.value : ' ')
//     }

//     useEffect(() => {
//         switch (localForeigner) {
//             case 'Local':
//                 switch (occupation) {
//                     case 'Employed':
//                         setDocumentNow({
//                             nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
//                             nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
//                             sponsor_letter: userProfile?.document_url?.sponsor_letter
//                                 ? userProfile?.document_url['sponsor_letter']
//                                 : '',
//                         })
//                         break
//                     case 'Self Employed':
//                         setDocumentNow({
//                             nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
//                             nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                         })
//                         break
//                     case 'Student':
//                         setDocumentNow({
//                             nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
//                             nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             sponsor_letter: userProfile?.document_url?.sponsor_letter
//                                 ? userProfile?.document_url['sponsor_letter']
//                                 : '',
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                         })
//                         break
//                 }

//                 break
//             case 'PR':
//                 switch (occupation) {
//                     case 'Employed':
//                         setDocumentNow({
//                             nric_front: userProfile?.document_url?.nric_front
//                                 ? userProfile?.document_url['nric_front']
//                                 : setDocumentNow['nric_front'],
//                             nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
//                             sponsor_letter: userProfile?.document_url?.sponsor_letter
//                                 ? userProfile?.document_url['sponsor_letter']
//                                 : '',
//                         })
//                         break
//                     case 'Self Employed':
//                         setDocumentNow({
//                             nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
//                             nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                         })
//                         break
//                     case 'Student':
//                         setDocumentNow({
//                             nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
//                             nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             sponsor_letter: userProfile?.document_url?.sponsor_letter
//                                 ? userProfile?.document_url['sponsor_letter']
//                                 : '',
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                         })
//                         break
//                 }

//                 break
//             case 'Foreigner (Returning)':
//                 switch (occupation) {
//                     case 'Employed':
//                         setDocumentNow({
//                             pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
//                             pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
//                         })
//                         break
//                     case 'Self Employed':
//                         setDocumentNow({
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
//                             pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
//                         })
//                         break
//                     case 'Student':
//                         setDocumentNow({
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                             passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             sponsor_letter: userProfile?.document_url?.sponsor_letter
//                                 ? userProfile?.document_url['sponsor_letter']
//                                 : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             matriculation_card: userProfile?.document_url?.matriculation_card
//                                 ? userProfile?.document_url['matriculation_card']
//                                 : '',
//                         })
//                         break
//                 }

//                 break
//             case 'Foreigner (1st Timer)':
//                 switch (occupation) {
//                     case 'Employed':
//                         setDocumentNow({
//                             passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
//                             pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
//                             pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
//                             sponsor_letter: userProfile?.document_url?.sponsor_letter
//                                 ? userProfile?.document_url['sponsor_letter']
//                                 : '',
//                         })
//                         break
//                     case 'Self Employed':
//                         setDocumentNow({
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                             passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
//                             pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
//                             pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
//                         })
//                         break
//                     case 'Student':
//                         setDocumentNow({
//                             iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
//                             passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
//                             credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
//                             sponsor_letter: userProfile?.document_url?.sponsor_letter
//                                 ? userProfile?.document_url['sponsor_letter']
//                                 : '',
//                             admission_letter: userProfile?.document_url?.admission_letter
//                                 ? userProfile?.document_url['admission_letter']
//                                 : '',
//                             matriculation_card: userProfile?.document_url?.matriculation_card
//                                 ? userProfile?.document_url['matriculation_card']
//                                 : '',
//                         })
//                         break
//                 }

//                 break
//         }
//     }, [localForeigner, occupation, userProfile?.document_url])

//     const handleClose = () => {
//         setSalaryOpen(false)
//     }

//     const totalCount = () => {
//         const total: any = Object.values(salary).reduce((acc: any, val: any) => parseInt(acc) + parseInt(val), 0)
//         setTotalSalary(total)
//         setValue('salary', `${total}`, { shouldValidate: true })
//         handleClose()
//     }

//     const handleLocalForeigner = (e: any) => {
//         if (e.target.textContent === '') {
//             return false
//         }
//         setLocalForeigner(e.target.textContent)
//     }

//     const handleLocalOccupation = (e: any) => {
//         if (e.target.textContent === '') {
//             return false
//         }
//         setOccupation(e.target.textContent)
//     }

//     const fileRef = useRef<HTMLInputElement | null>(null)

//     const handleSave = (documentType: any) => {
//         // if (fileRef.current) {
//         //   fileRef.current.value = null
//         // }
//         setDocumentNow((prev: any) => {
//             const newObj = {
//                 ...prev,
//             }
//             newObj[documentType] = previewImage
//             return newObj
//         })
//         setOpen(false)
//         setPreviewImage('')
//     }

//     //const router = useRouter()

//     const progress = userProfile?.completion_rate
//     const classes = useStyles()
//     // const full_Name = watch('full_name')
//     const cbs_Value = watch('cbs')
//     const nric_Fin = watch('nric_fin')
//     const passport_Number = watch('passport_number')
//     const pass_Type = watch('pass_type')
//     const Occupation = watch('Occupation')
//     const local_Foreigner = watch('localForeigner')
//     const education_Level = watch('education_level')
//     const marital_Status = watch('marital_status')
//     const gender = watch('gender')
//     const age = watch('age')
//     const university_Name = watch('university_name')
//     const employer_Name = watch('employer_name')
//     const business_Name = watch('business_name')
//     const outstanding_Loan = watch('outstanding_loan')
//     const Nationality = watch('nationality')
//     const Race = watch('race')

//     const handleCropComplete = (croppedImageUrl: any) => {
//         // Handle the cropped image URL here

//         const base64ImageWithoutPrefix = croppedImageUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')

//         // Decode the Base64 string
//         const decodedData = atob(base64ImageWithoutPrefix)

//         // Create a Uint8Array from the decoded data
//         const byteArray = new Uint8Array(decodedData.length)
//         for (let i = 0; i < decodedData.length; i++) {
//             byteArray[i] = decodedData.charCodeAt(i)
//         }

//         // Create a Blob from the Uint8Array
//         const blobData = new Blob([byteArray], { type: 'image/png' })

//         // Create a file from the blob data
//         const file = new File([blobData], 'profileImage.png', { type: 'image/png' })
//         setPreview(file)
//     }
//     const [uploadFiles] =
//         useMultiFileUploadMutation() //  { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }
//     const [updateUserInfo] =
//         useUpdateUserProfileMutation() // , { isError: userIsError, isLoading: userIsLoading, data: userUpdatedDate }

//     const handleUploadDocument = (e: any) => {
//         // console.log('e.target.files', e.target.files)
//         // console.log('e.target.files[0]', e.target.files[0])
//         setValue('credit_report', e.target.files[0])
//         setPreviewImage(e.target.files[0])
//     }
//     const dispatch = useDispatch()
//     const [open, setOpen] = useState(false)

//     const handlePersonalInfoUpdate = async (data: any) => {
//         let previewProfileImage = ''
//         if (typeof preview === 'object') {
//             const imageFormData = new FormData()
//             imageFormData.append(`media[0]`, preview)

//             const response: any = await uploadFiles(imageFormData)
//             previewProfileImage = response.data.url[0]
//         }
//         const result = Object.entries(documents).map(async ([key, value]: any, _: number) => {
//             if (typeof value === 'object') {
//                 const docImageFormData = new FormData()
//                 docImageFormData.append(`media[0]`, value)
//                 const response: any = await uploadFiles(docImageFormData)
//                 return [key, response.data.url[0]]
//             } else {
//                 return [key, value]
//             }
//         })
//         const res = await Promise.all(result)
//         const actualdoc: any = {}
//         res.map((ent: any) => {
//             actualdoc[ent[0]] = ent[1]
//         })

//         const {
//             full_name,
//             phone,
//             address,
//             business_name,
//             nationality,
//             gender,
//             occupation,
//             race,
//             date_picker,
//             outstanding_loan,
//             employer_name,
//             id_type,
//             nric_fin,
//             pass_type,
//             marital_status,
//             education_level,
//             age,
//             localForeigner,
//             university_name,
//             cbs,
//         } = data

//         const salaryStr: any = {}

//         Object.entries(salary).forEach(([key, value]: any) => (salaryStr[key] = value.toString()))

//         const payload = {
//             name: full_name,
//             last_name: '',
//             profile_pic: previewProfileImage,
//             country_code: '',
//             mobile: phone,
//             address,
//             representation: '',
//             company_name: business_name || university_name,
//             nickname: '',
//             nationality: localForeigner,
//             date_of_birth: date_picker, //.format('YYYY-MM-DD')
//             gender,
//             industry: '',
//             employment_type: occupation,
//             occupation: occupation,
//             employer_name: employer_name,
//             number_pax: '',
//             reason_move: '',
//             desired_property_details: '',
//             payment_info: '',
//             document_url: JSON.stringify(actualdoc),
//             user_id_type: pass_type,
//             user_id_number: nric_fin,
//             signature: '',
//             race,
//             video_url: '',
//             user_type: '',
//             survey_data: '',
//             cbs_score: cbs,
//             address_type: '',
//             education_level: education_level,
//             salary: totalSalary,
//             outstanding_loan: outstanding_loan,
//             user_nationality: nationality,
//             age: age,
//             marital_status,
//             nric_type: id_type,
//             occupiers_salary_list: JSON.stringify(salaryStr),
//         }

//         dispatch(showLoader('Updating user info...'))
//         await updateUserInfo({ userId: session?.user?.id, data: payload })
//         // setEditView(false)
//         window.location.reload()
//         // dispatch(hideLoader())
//         // refetchUserProfileDetails()
//         // setTimeout(() => dispatch(hideLoader()), 1000)
//     }

//     const handleClickOpen = () => {
//         setSalaryOpen(true)
//     }

//     const showIDTypeInfo = () => {
//         store.dispatch(
//             showModal({
//                 open: true,
//                 name: 'DETAILS OF PREFIX LETTERFOR NRIC/FIN',
//                 children: <IDTypeInfo />,
//                 className: ' ',
//             })
//         )
//     }

//     // console.log('-----------error------------', errors)

//     // const sortednationalityList = nationalityList.slice().sort((a, b) => a.label.localeCompare(b.label))

//     return (
//         <>
//             <div className="p-5 md:p-9">
//                 <div className="flex items-center justify-between ">
//                     <div className="flex items-baseline gap-2">
//                         <div style={{ width: '40px', height: '40px' }}>
//                             <Image objectFit="contain" style={{ width: '20%', height: '20%' }} src={userBlueIcon} alt='no-image' />
//                         </div>
//                         <h2 className="text-[#034EA1] text-lg font-bold mb-5">
//                             <span>Edit Personal Info</span>
//                         </h2>
//                     </div>
//                     <div className="flex justify-between">
//                         <div className="w-full">
//                             <h5
//                                 className={classNames(
//                                     'font-normal font-roboto text-sm md:text-base xl:text-lg',
//                                     isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
//                                 )}>
//                                 Your profile is <span className="font-bold">80% get complete!</span>
//                             </h5>
//                             <ProgressBar progress={progress} />
//                         </div>

//                         <div className="flex gap-5 w-[300px] ml-5 justify-end">
//                             <Button
//                                 style={{ border: '1px solid #FF3434', color: '#FF3434' }}
//                                 onClick={() => setEditView(false)}
//                                 variant="outlined"
//                                 className="!flex !items-center !gap-2 !rounded-md !px-8 !py-3 !cursor-pointer">
//                                 <span className="!font-normal">Cancel</span>
//                             </Button>
//                             {/*  <Button
//                 style={{ backgroundColor: isTenant(type) ? '#00ADEE' : '#034EA1', color: '#fff' }}
//                 variant="contained"
//                 className="flex items-center gap-2 text-white rounded-md px-8 py-3 cursor-pointer">
//                 <span className="font-normal">Publish</span>
//               </Button> */}
//                             <label
//                                 className="flex items-center gap-2 text-white rounded-md px-8 py-3 cursor-pointer"
//                                 style={{ backgroundColor: isTenant(type) ? '#00ADEE' : '#034EA1', color: '#fff' }}
//                                 htmlFor="submitBtn"
//                             // onClick={handleFormSubmit}
//                             >
//                                 Update
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-[#F1F7FF] min-h-full rounded-lg shadow-lg md:p-8 flex justify-between">
//                     {/* GENERAL INFO */}
//                     <form onSubmit={handleSubmit(handlePersonalInfoUpdate)} className="w-[60%]">
//                         <button id="submitBtn" type="submit" style={{ display: 'none' }}></button>
//                         <div className="md:flex gap-3 md:gap-5 xl:gap-8 ">
//                             <div className="w-full  bg-[#F1F7FF] py-2 md:py-3 xl:py-4 px-4 md:px-7 xl:px-11  rounded-[10px] ">
//                                 <div>
//                                     <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
//                                         General Info
//                                     </h2>

//                                     <div className="w-full">
//                                         <div className=" !flex !gap-5 !mb-2 md:!mb-3 xl:!mb-5">
//                                             <div className=" w-1/2">
//                                                 <TextField
//                                                     defaultValue={userProfile?.name}
//                                                     {...register('full_name')} /* { required: true } */
//                                                     id="outlined-basic"
//                                                     label="Full Name"
//                                                     variant="outlined"
//                                                     // required={true}
//                                                     autoComplete="off"
//                                                     className={`${classes.input}`}
//                                                     fullWidth
//                                                     sx={{
//                                                         '& .MuiInputLabel-root.Mui-focused': {
//                                                             color: errors.full_name ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                             // '&.Mui-focused': {
//                                                             // color: '#00ADEE', // Change label color if there is an error
//                                                             // },
//                                                         },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.full_name ? 'red' : '',
//                                                             boxShadow: errors.full_name ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },
//                                                     }}
//                                                 />
//                                                 {/* {errors.full_name && <span>{errors.full_name.message}</span>} */}
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="full_name"
//                                                     render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </div>

//                                             {/* DATE OF BIRTH INPUT */}
//                                             <div className=" w-1/2">
//                                                 <Controller
//                                                     control={control}
//                                                     name="date_picker"
//                                                     defaultValue={moment(`${userProfile?.date_of_birth}`).toDate()}
//                                                     // rules={{
//                                                     //   // required: true,
//                                                     //   validate: (age: any) => {
//                                                     //     const differenceInMilliseconds = moment().diff(age, 'milliseconds')
//                                                     //     const differenceInYears = moment.duration(differenceInMilliseconds).years()
//                                                     //     const isAdult = differenceInYears >= 18
//                                                     //     return isAdult || 'You must be at least 18 years old'
//                                                     //   },
//                                                     // }}
//                                                     render={({ field: { onChange } }) => (
//                                                         <DatePicker
//                                                             className={`${classes.input} !w-full !my-0`}
//                                                             format="DD MMMM YYYY"
//                                                             defaultValue={moment(`${userProfile?.date_of_birth}`)}
//                                                             maxDate={moment()}
//                                                             label="Date of Birth"
//                                                             onChange={event => {
//                                                                 onChange(event)
//                                                                 getCustomerDateOfBirth(event)
//                                                             }}
//                                                             slotProps={{
//                                                                 textField: {
//                                                                     margin: 'dense',
//                                                                     fullWidth: true,
//                                                                     id: 'date_picker',
//                                                                     label: 'Date of Birth',

//                                                                     // error: !!errors.dob,
//                                                                     // helperText: errors.dob?.message,
//                                                                 },
//                                                             }}
//                                                             sx={{
//                                                                 '& .MuiInputLabel-root.Mui-focused': {
//                                                                     color: errors.date_picker ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                                 },
//                                                                 '&:hover fieldset': {
//                                                                     borderWidth: 1,
//                                                                     borderColor: 'green',
//                                                                     // borderColor: errors.date_picker ? 'red' : '',
//                                                                     // boxShadow: errors.date_picker ? ' ' : '0px 2px 8px #034EA10F',
//                                                                 },
//                                                                 '& .MuiOutlinedInput-root.Mui-error': {
//                                                                     backgroundColor: errors.date_picker ? '#F8FBFF' : 'transparent',
//                                                                     '& .MuiFormControl-root fieldset': {
//                                                                         borderWidth: 1,
//                                                                         borderColor: 'green',
//                                                                     },
//                                                                 },
//                                                             }}
//                                                         />
//                                                     )}
//                                                 />
//                                                 {/* <DatePicker
//                           className=" !w-full"
//                           format="DD MMMM YYYY"
//                           maxDate={moment()}
//                           sx={customFormStyle.sx_text_field}
//                           label="Date of Birth*"
//                           {...register('date_picker')}
//                           onChange={(e: any) => getCustomerDateOfBirth(e?._d)}
//                           defaultValue={userProfile?.date_of_birth ? moment(userProfile?.date_of_birth) : null}
//                         /> */}
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="date_picker"
//                                                     render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </div>

//                                             {/*//!========================*/}
//                                         </div>

//                                         <div className=" !flex  !gap-5 !mb-2 md:!mb-3 xl:!mb-5">
//                                             <TextField
//                                                 {...register('email')}
//                                                 // required={true}
//                                                 fullWidth
//                                                 type="email"
//                                                 id="outlined-basic"
//                                                 label="Email"
//                                                 variant="outlined"
//                                                 className={classes.input}
//                                                 defaultValue={userProfile?.email}
//                                                 onChange={handleEmailOnChange}
//                                                 InputProps={{
//                                                     readOnly: true, // Setting the readOnly attribute
//                                                 }}
//                                                 sx={{
//                                                     '& .MuiInputLabel-root.Mui-focused': {
//                                                         color: errors.email ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                     },
//                                                     // '& .Mui-focused .MuiInputLabel-root': {
//                                                     //   color: 'red', // Change label color if there is an error
//                                                     // },
//                                                     '& fieldset': {
//                                                         borderWidth: 1,
//                                                         borderColor: errors.email ? 'red' : '',
//                                                         boxShadow: errors.email ? ' ' : '0px 2px 8px #034EA10F',
//                                                     },

//                                                     '& .MuiOutlinedInput-root': {
//                                                         backgroundColor: errors.email ? '#F8FBFF' : 'transparent',
//                                                     },
//                                                 }}
//                                             />

//                                             {/* //!=========================== */}
//                                             {/* <MuiPhoneNumber
//                         {...register('phone')}
//                         // required={true}
//                         className={`${classes.input}`}
//                         label="Phone"
//                         defaultCountry={'sg'}
//                         value={userProfile?.mobile}
//                         onlyCountries={['sg', 'bd', 'my', 'ph']}
//                         onChange={handlePhoneOnChange}
//                         // onCountryChange={handleCountryChange}
//                         fullWidth
//                         variant="outlined"
//                         disableDropdown
//                         InputProps={{
//                           readOnly: true, // Setting the readOnly attribute
//                         }}
//                         disableAreaCodes={true}
//                         // disableAreaCodes={false}
//                         // disableCountryCode={true}
//                         sx={{
//                           '& .MuiInputLabel-root.Mui-focused': {
//                             color: errors.phone ? 'red' : '#00ADEE', // Change label color if there is an error
//                           },
//                           // '& .Mui-focused .MuiInputLabel-root': {
//                           //   color: 'red', // Change label color if there is an error
//                           // },
//                           '& fieldset': {
//                             borderWidth: 1,
//                             borderColor: errors.phone ? 'red' : '',
//                             boxShadow: errors.phone ? ' ' : '0px 2px 8px #034EA10F',
//                           },

//                           '& .MuiOutlinedInput-root': {
//                             backgroundColor: errors.phone ? '#F8FBFF' : 'transparent',
//                           },
//                         }}
//                       /> */}
//                                             <TextField
//                                                 // {...register('phone')}
//                                                 // required={true}
//                                                 className={`${classes.input}`}
//                                                 label="Phone"
//                                                 value={userProfile?.mobile}
//                                                 InputProps={{ readOnly: true }}
//                                                 fullWidth
//                                                 variant="outlined"
//                                                 // readOnly={true} // Setting the readOnly attribute
//                                                 sx={{
//                                                     '& .MuiInputLabel-root.Mui-focused': {
//                                                         color: errors.phone ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                     },
//                                                     // '& .Mui-focused .MuiInputLabel-root': {
//                                                     //   color: 'red', // Change label color if there is an error
//                                                     // },
//                                                     '& fieldset': {
//                                                         borderWidth: 1,
//                                                         borderColor: errors.phone ? 'red' : '',
//                                                         boxShadow: errors.phone ? ' ' : '0px 2px 8px #034EA10F',
//                                                     },

//                                                     '& .MuiOutlinedInput-root': {
//                                                         backgroundColor: errors.phone ? '#F8FBFF' : 'transparent',
//                                                     },
//                                                 }}
//                                             />
//                                             {/* <ErrorMessage
//                         errors={errors}
//                         name="age"
//                         render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                       /> */}
//                                             {/* //!=========================================== */}
//                                         </div>

//                                         <div className=" flex  gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
//                                             <div className=" w-full">
//                                                 <FormControl className={`${classes.input}`} fullWidth>
//                                                     <InputLabel
//                                                         id="demo-simple-select-label"
//                                                         sx={{
//                                                             color: errors.age ? 'red' : age ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         }}>
//                                                         {/* required={true} */}
//                                                         Age Range
//                                                     </InputLabel>
//                                                     <Select
//                                                         defaultValue={userProfile?.age}
//                                                         {...register('age')}
//                                                         fullWidth
//                                                         id="age"
//                                                         onClick={() => {
//                                                             trigger('age')
//                                                         }}
//                                                         onChange={handleAgeOnChange}
//                                                         label="Age range"
//                                                         sx={{
//                                                             '& .MuiInputLabel-root.Mui-focused': {
//                                                                 color: errors.age ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                             },
//                                                             // '& .Mui-focused .MuiInputLabel-root': {
//                                                             //   color: 'red', // Change label color if there is an error
//                                                             // },
//                                                             '& fieldset': {
//                                                                 borderWidth: 1,
//                                                                 borderColor: errors.age ? 'red' : '',
//                                                                 boxShadow: errors.age ? ' ' : '0px 2px 8px #034EA10F',
//                                                             },

//                                                             '& .MuiOutlinedInput-root': {
//                                                                 backgroundColor: errors.age ? '#F8FBFF' : 'transparent',
//                                                             },
//                                                         }}>
//                                                         {ageFactorList.map(option => (
//                                                             <MenuItem key={option.value} value={option.value}>
//                                                                 {option.label}
//                                                             </MenuItem>
//                                                         ))}
//                                                     </Select>
//                                                 </FormControl>
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="age"
//                                                     render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </div>
//                                             <div className="w-full">
//                                                 <FormControl className={`${classes.input}`} fullWidth>
//                                                     <InputLabel
//                                                         id="demo-simple-select-label"
//                                                         sx={{
//                                                             color: errors.gender ? 'red' : gender ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         }}>
//                                                         Gender
//                                                     </InputLabel>
//                                                     <Select
//                                                         defaultValue={userProfile?.gender}
//                                                         {...register('gender')}
//                                                         id="gender"
//                                                         label="Gender"
//                                                         onClick={() => {
//                                                             trigger('gender')
//                                                         }}
//                                                         onChange={handleGenderOnChange}
//                                                         sx={{
//                                                             '& .MuiInputLabel-root.Mui-focused': {
//                                                                 color: errors.gender ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                             },
//                                                             // '& .Mui-focused .MuiInputLabel-root': {
//                                                             //   color: 'red', // Change label color if there is an error
//                                                             // },
//                                                             '& fieldset': {
//                                                                 borderWidth: 1,
//                                                                 borderColor: errors.gender ? 'red' : '',
//                                                                 boxShadow: errors.gender ? ' ' : '0px 2px 8px #034EA10F',
//                                                             },

//                                                             '& .MuiOutlinedInput-root': {
//                                                                 backgroundColor: errors.gender ? '#F8FBFF' : 'transparent',
//                                                             },
//                                                         }}>
//                                                         {genderItems.map(option => (
//                                                             <MenuItem key={option.value} value={option.value}>
//                                                                 {option.label}
//                                                             </MenuItem>
//                                                         ))}
//                                                     </Select>
//                                                 </FormControl>
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="gender"
//                                                     render={({ message }: any) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className=" flex gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
//                                             <div className=" w-full">
//                                                 <FormControl className={`${classes.input}`} fullWidth>
//                                                     <InputLabel
//                                                         id="demo-simple-select-label"
//                                                         sx={{
//                                                             color: errors.marital_status ? 'red' : marital_Status ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         }}>
//                                                         Marital status
//                                                     </InputLabel>
//                                                     <Select
//                                                         {...register('marital_status')}
//                                                         fullWidth
//                                                         id="marital_status"
//                                                         label="Marital status"
//                                                         onClick={() => {
//                                                             trigger('marital_status')
//                                                         }}
//                                                         onChange={handleMaritialStatusOnChange}
//                                                         defaultValue={userProfile?.marital_status}>
//                                                         {maritalStatusList.map(option => (
//                                                             <MenuItem key={option.value} value={option.value}>
//                                                                 {option.label}
//                                                             </MenuItem>
//                                                         ))}
//                                                     </Select>
//                                                 </FormControl>
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="marital_status"
//                                                     render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </div>

//                                             <div className=" w-full">
//                                                 <FormControl className={`${classes.input}`} fullWidth>
//                                                     <InputLabel
//                                                         id="demo-simple-select-label"
//                                                         sx={{
//                                                             color: errors.education_level ? 'red' : education_Level ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         }}>
//                                                         Education Level
//                                                     </InputLabel>
//                                                     <Select
//                                                         defaultValue={userProfile?.education_level}
//                                                         {...register('education_level')}
//                                                         fullWidth
//                                                         id=""
//                                                         label="Education Level"
//                                                         onClick={() => {
//                                                             trigger('education_level')
//                                                         }}
//                                                         onChange={handleEducationLevelChange}
//                                                         sx={{
//                                                             // '& .MuiInputLabel-root.Mui-focused': {
//                                                             //   color: errors.education_level ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                             // },
//                                                             // '& .Mui-focused .MuiInputLabel-root': {
//                                                             //   color: 'red', // Change label color if there is an error
//                                                             // },
//                                                             '& fieldset': {
//                                                                 borderWidth: 1,
//                                                                 borderColor: errors.education_level ? 'red' : '',
//                                                                 boxShadow: errors.education_level ? ' ' : '0px 2px 8px #034EA10F',
//                                                             },

//                                                             '& .MuiOutlinedInput-root': {
//                                                                 backgroundColor: errors.education_level ? '#F8FBFF' : 'transparent',
//                                                             },
//                                                         }}>
//                                                         {educationLevel.map(option => (
//                                                             <MenuItem key={option.value} value={option.value}>
//                                                                 {option.label}
//                                                             </MenuItem>
//                                                         ))}
//                                                     </Select>
//                                                 </FormControl>
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="education_level"
//                                                     render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className=" flex gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
//                                             <div className="w-1/2">
//                                                 <FormControl className={`${classes.input} w-full`}>
//                                                     <InputLabel
//                                                         id="demo-simple-select-label"
//                                                         sx={{
//                                                             color: errors.localForeigner ? 'red' : local_Foreigner ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         }}>
//                                                         Local/Foreigner
//                                                     </InputLabel>
//                                                     <Select
//                                                         {...register('localForeigner')}
//                                                         onClick={e => {
//                                                             handleLocalForeigner(e)
//                                                             trigger('localForeigner')
//                                                             trigger('credit_report')
//                                                         }}
//                                                         onChange={handleLocalForeignerOnChange}
//                                                         fullWidth
//                                                         id=""
//                                                         label="Local/Foreigner"
//                                                         defaultValue={localForeigner}>
//                                                         {local_foreigner.map(option => (
//                                                             <MenuItem key={option.value} value={option.value}>
//                                                                 {option.label}
//                                                             </MenuItem>
//                                                         ))}
//                                                     </Select>
//                                                 </FormControl>
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="localForeigner"
//                                                     render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </div>

//                                             {/* PREFIX LETTER AND NRIC|FIN */}
//                                             {localForeigner != 'Foreigner (1st Timer)' ? (
//                                                 <div className=" w-1/2 flex flex-col !relative">
//                                                     <div className="flex w-full personal-info-idType ">
//                                                         <FormControl className={`${classes.id_type} !w-[25%] `}>
//                                                             <HelpIcon
//                                                                 onClick={showIDTypeInfo}
//                                                                 className="!absolute !text-sm !top-1 !right-1 !z-10"></HelpIcon>
//                                                             <InputLabel id="demo-simple-select-label">Prefix Letter </InputLabel>

//                                                             <Select
//                                                                 // className="personal-info-idType"
//                                                                 {...register('id_type')}
//                                                                 label="Prefix Letter"
//                                                                 fullWidth
//                                                                 id="idtype"
//                                                                 onChange={e => (setIdType(e.target.value), trigger('id_type'))}
//                                                                 defaultValue={idType}>
//                                                                 {nricTypeList.map(option => (
//                                                                     <MenuItem key={option.value} value={option.value}>
//                                                                         {option.label}
//                                                                     </MenuItem>
//                                                                 ))}
//                                                             </Select>
//                                                             {/* <TextField
//                                 // defaultValue={idType}
//                                 className=" !text-center"
//                                 value={idType}
//                                 fullWidth
//                                 type="text"
//                                 id="outlined-basic"
//                                 label="Type"
//                                 variant="outlined"
//                                 InputProps={{
//                                   readOnly: true, // Setting the readOnly attribute
//                                 }}
//                                 sx={{
//                                   '& .MuiInputLabel-root.Mui-focused': {
//                                     color: errors.nric_fin ? 'red' : nric_Fin ? '#00ADEE' : ' ', // Change label color if there is an error
//                                   },
//                                   // '& .Mui-focused .MuiInputLabel-root': {
//                                   //   color: 'red', // Change label color if there is an error
//                                   // },
//                                   '& fieldset': {
//                                     borderWidth: 1,
//                                     // borderRightWidth: 0,
//                                     borderColor: errors.nric_fin ? 'red' : '',
//                                     boxShadow: errors.nric_fin ? ' ' : '0px 2px 8px #034EA10F',
//                                   },

//                                   '& .MuiOutlinedInput-root': {
//                                     backgroundColor: errors.nric_fin ? '#F8FBFF' : 'transparent',
//                                   },
//                                 }}
//                               /> */}
//                                                         </FormControl>

//                                                         <TextField
//                                                             defaultValue={userProfile?.user_id_number}
//                                                             onKeyUp={() => {
//                                                                 trigger('nric_fin')
//                                                             }}
//                                                             {...register('nric_fin')}
//                                                             className={`${classes.partial_nric}`}
//                                                             fullWidth
//                                                             type="text"
//                                                             id="outlined-basic"
//                                                             label="NRIC/FIN"
//                                                             variant="outlined"
//                                                             sx={{
//                                                                 '& .MuiInputLabel-root.Mui-focused': {
//                                                                     color: errors.nric_fin ? 'red' : nric_Fin ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                                 },
//                                                                 // '& .Mui-focused .MuiInputLabel-root': {
//                                                                 //   color: 'red', // Change label color if there is an error
//                                                                 // },
//                                                                 '& fieldset': {
//                                                                     borderWidth: 1,
//                                                                     borderLeftWidth: 1,
//                                                                     borderColor: errors.nric_fin ? 'red' : ' ',
//                                                                     boxShadow: errors.nric_fin ? ' ' : '0px 2px 8px #034EA10F',
//                                                                 },

//                                                                 '& .MuiOutlinedInput-root': {
//                                                                     backgroundColor: errors.nric_fin ? '#F8FBFF' : 'transparent',
//                                                                 },
//                                                             }}
//                                                         />
//                                                     </div>
//                                                     <ErrorMessage
//                                                         errors={errors}
//                                                         name="nric_fin"
//                                                         render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                     />
//                                                 </div>
//                                             ) : (
//                                                 <div className="w-1/2 ">
//                                                     <TextField
//                                                         defaultValue={userProfile?.passport_number}
//                                                         {...register('passport_number')}
//                                                         className={`${classes.input}`}
//                                                         fullWidth
//                                                         type="text"
//                                                         id="outlined-basic"
//                                                         label="Passport/FIN"
//                                                         variant="outlined"
//                                                         sx={{
//                                                             '& .MuiInputLabel-root.Mui-focused': {
//                                                                 color: errors.passport_number ? 'red' : passport_Number ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                             },
//                                                             // '& .Mui-focused .MuiInputLabel-root': {
//                                                             //   color: 'red', // Change label color if there is an error
//                                                             // },
//                                                             '& fieldset': {
//                                                                 borderWidth: 1,
//                                                                 borderColor: errors.passport_number ? 'red' : '',
//                                                                 boxShadow: errors.passport_number ? ' ' : '0px 2px 8px #034EA10F',
//                                                             },

//                                                             '& .MuiOutlinedInput-root': {
//                                                                 backgroundColor: errors.passport_number ? '#F8FBFF' : 'transparent',
//                                                             },
//                                                         }}
//                                                     />
//                                                     <ErrorMessage
//                                                         errors={errors}
//                                                         name="passport_number"
//                                                         render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                     />
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className=" flex gap-5 mb-[18px] md:mb-[22px] xl:mb-[30px]">
//                                             <FormControl fullWidth>
//                                                 <Autocomplete
//                                                     // {...inputProps}
//                                                     {...register('nationality')}
//                                                     // {...defaultProps}
//                                                     id="nationality"
//                                                     className={`${classes.input}`}
//                                                     options={nationalityList}
//                                                     getOptionLabel={option => option.label}
//                                                     defaultValue={nationalityList.find(
//                                                         (option: any) => option.label === userProfile?.user_nationality
//                                                     )}
//                                                     // groupBy={option => (customGroup.includes(option) ? 'Custom' : 'Options')}
//                                                     renderInput={params => <TextField {...params} label="Nationality" />}
//                                                     PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
//                                                     onChange={handleNationalityOnChange}
//                                                     sx={{
//                                                         '& .MuiInputLabel-root.Mui-focused': {
//                                                             color: errors.nationality
//                                                                 ? 'red'
//                                                                 : Nationality || userProfile?.user_nationality
//                                                                     ? '#00ADEE'
//                                                                     : ' ', // Change label color if there is an error
//                                                         },
//                                                         // '& .Mui-focused .MuiInputLabel-root': {
//                                                         //   color: 'red', // Change label color if there is an error
//                                                         // },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.nationality ? 'red' : '',
//                                                             boxShadow: errors.nationality ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },

//                                                         '& .MuiOutlinedInput-root': {
//                                                             backgroundColor: errors.nationality ? '#F8FBFF' : 'transparent',
//                                                         },
//                                                     }}
//                                                 />
//                                             </FormControl>
//                                             <FormControl fullWidth>
//                                                 <Autocomplete
//                                                     className={`${classes.input}`}
//                                                     {...register('race')}
//                                                     id="race"
//                                                     options={raceList}
//                                                     getOptionLabel={option => option.label}
//                                                     defaultValue={raceList.find((option: any) => option.label === userProfile?.race)}
//                                                     renderInput={params => <TextField {...params} label="Race" />}
//                                                     PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />} //controlling popup position
//                                                     onChange={handleRaceOnChange}
//                                                     sx={{
//                                                         '& .MuiInputLabel-root.Mui-focused': {
//                                                             color: errors.race ? 'red' : Race ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         },
//                                                         // '& .Mui-focused .MuiInputLabel-root': {
//                                                         //   color: 'red', // Change label color if there is an error
//                                                         // },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.race ? 'red' : '',
//                                                             boxShadow: errors.race ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },

//                                                         '& .MuiOutlinedInput-root': {
//                                                             backgroundColor: errors.race ? '#F8FBFF' : 'transparent',
//                                                         },
//                                                     }}
//                                                 />
//                                             </FormControl>
//                                         </div>
//                                         <div className="!my-3">
//                                             <TextField
//                                                 className={`${classes.input}`}
//                                                 defaultValue={userProfile?.address == 'NA' ? '' : userProfile?.address.replace(`null`, ``)}
//                                                 {...register('address')}
//                                                 // required={true}
//                                                 fullWidth
//                                                 type="text"
//                                                 id="outlined-basic"
//                                                 label="Address"
//                                                 variant="outlined"
//                                                 autoComplete="off"
//                                                 sx={{
//                                                     '& .MuiInputLabel-root.Mui-focused': {
//                                                         color: errors.address ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                     },
//                                                     // '& .Mui-focused .MuiInputLabel-root': {
//                                                     //   color: 'red', // Change label color if there is an error
//                                                     // },
//                                                     '& fieldset': {
//                                                         borderWidth: 1,
//                                                         borderColor: errors.address ? 'red' : '',
//                                                         boxShadow: errors.address ? ' ' : '0px 2px 8px #034EA10F',
//                                                     },

//                                                     '& .MuiOutlinedInput-root': {
//                                                         backgroundColor: errors.address ? '#F8FBFF' : 'transparent',
//                                                     },
//                                                 }}
//                                             />
//                                             <ErrorMessage
//                                                 errors={errors}
//                                                 name="address"
//                                                 render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="">
//                                     <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
//                                         Credit Info
//                                     </h2>

//                                     <div className="w-full flex flex-wrap gap-y-5 justify-between">
//                                         <div className=" !w-[48%]">
//                                             <FormControl className={`${classes.input} !w-full `}>
//                                                 <InputLabel
//                                                     id="demo-simple-select-label"
//                                                     sx={{
//                                                         color: errors.Occupation ? 'red' : Occupation ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                     }}>
//                                                     Occupation
//                                                 </InputLabel>
//                                                 <Select
//                                                     {...register('Occupation')}
//                                                     // onClick={handleLocalOccupation}
//                                                     fullWidth
//                                                     id="outlined-basic"
//                                                     label="Occupation"
//                                                     onClick={e => {
//                                                         handleLocalOccupation(e)
//                                                         trigger('Occupation')
//                                                     }}
//                                                     onChange={handleOccupationOnChange}
//                                                     defaultValue={occupation}
//                                                     // defaultValue={occup.find((option: any) => option.label === userProfile?.occupation)}
//                                                     sx={{
//                                                         '& .MuiInputLabel-root.Mui-focused': {
//                                                             color: errors.Occupation ? 'red' : '#00ADEE', // Change label color if there is an error
//                                                         },
//                                                         // '& .Mui-focused .MuiInputLabel-root': {
//                                                         //   color: 'red', // Change label color if there is an error
//                                                         // },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.Occupation ? 'red' : '',
//                                                             boxShadow: errors.Occupation ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },

//                                                         '& .MuiOutlinedInput-root': {
//                                                             backgroundColor: errors.Occupation ? '#F8FBFF' : 'transparent',
//                                                         },
//                                                     }}>
//                                                     {employmentType.map(option => (
//                                                         <MenuItem key={option.value} value={option.value}>
//                                                             {option.label}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             </FormControl>
//                                             <ErrorMessage
//                                                 errors={errors}
//                                                 name="Occupation"
//                                                 render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                             />
//                                         </div>

//                                         <div className="!w-[48%]">
//                                             {occupation === 'Employed' && (
//                                                 <TextField
//                                                     className={`${classes.input}`}
//                                                     fullWidth
//                                                     // className="mt-3"
//                                                     type="text"
//                                                     id="outlined-basic"
//                                                     autoComplete="off"
//                                                     label="Employer Name"
//                                                     variant="outlined"
//                                                     defaultValue={userProfile?.occupation === 'Employed' ? userProfile.employer_name : ''}
//                                                     {...register('employer_name')}
//                                                     sx={{
//                                                         '& .MuiInputLabel-root.Mui-focused': {
//                                                             color: errors.employer_name ? 'red' : employer_Name ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         },
//                                                         // '& .Mui-focused .MuiInputLabel-root': {
//                                                         //   color: 'red', // Change label color if there is an error
//                                                         // },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.employer_name ? 'red' : '',
//                                                             boxShadow: errors.employer_name ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },

//                                                         '& .MuiOutlinedInput-root': {
//                                                             backgroundColor: errors.employer_name ? '#F8FBFF' : 'transparent',
//                                                         },
//                                                     }}
//                                                 />
//                                             )}
//                                             {occupation === 'Self Employed' && (
//                                                 <TextField
//                                                     className={`${classes.input}`}
//                                                     fullWidth
//                                                     // className="mt-3"
//                                                     type="text"
//                                                     id="outlined-basic"
//                                                     label="Business Name"
//                                                     variant="outlined"
//                                                     autoComplete="off"
//                                                     defaultValue={userProfile?.occupation === 'Self Employed' ? userProfile?.employer_name : ''}
//                                                     {...register('business_name')}
//                                                     sx={{
//                                                         '& .MuiInputLabel-root.Mui-focused': {
//                                                             color: errors.business_name ? 'red' : business_Name ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         },
//                                                         // '& .Mui-focused .MuiInputLabel-root': {
//                                                         //   color: 'red', // Change label color if there is an error
//                                                         // },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.business_name ? 'red' : '',
//                                                             boxShadow: errors.business_name ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },

//                                                         '& .MuiOutlinedInput-root': {
//                                                             backgroundColor: errors.business_name ? '#F8FBFF' : 'transparent',
//                                                         },
//                                                     }}
//                                                 />
//                                             )}
//                                             {occupation === 'Student' && (
//                                                 <TextField
//                                                     className={`${classes.input}`}
//                                                     fullWidth
//                                                     // className="mt-3"
//                                                     type="text"
//                                                     id="outlined-basic"
//                                                     label="University/School Name"
//                                                     variant="outlined"
//                                                     autoComplete="off"
//                                                     defaultValue={userProfile?.occupation === 'Student' ? userProfile?.employer_name : ''}
//                                                     {...register('university_name')}
//                                                     sx={{
//                                                         '& .MuiInputLabel-root.Mui-focused': {
//                                                             color: errors.university_name ? 'red' : university_Name ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         },
//                                                         // '& .Mui-focused .MuiInputLabel-root': {
//                                                         //   color: 'red', // Change label color if there is an error
//                                                         // },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.university_name ? 'red' : '',
//                                                             boxShadow: errors.university_name ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },

//                                                         '& .MuiOutlinedInput-root': {
//                                                             backgroundColor: errors.university_name ? '#F8FBFF' : 'transparent',
//                                                         },
//                                                     }}
//                                                 />
//                                             )}
//                                         </div>
//                                         {(localForeigner === 'Foreigner (1st Timer)' || localForeigner === 'Foreigner (Returning)') && (
//                                             <FormControl className={`${classes.input} !w-[48%]`}>
//                                                 <InputLabel
//                                                     id="demo-simple-select-label"
//                                                     sx={{
//                                                         color: errors.pass_type ? 'red' : pass_Type ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                     }}>
//                                                     Pass Type
//                                                 </InputLabel>
//                                                 <Select
//                                                     {...register('pass_type')}
//                                                     fullWidth
//                                                     id=""
//                                                     label="Pass Type"
//                                                     onClick={handlePassTypeOnChange}
//                                                     autoComplete="off"
//                                                     defaultValue={userProfile?.user_id_type}>
//                                                     {idTypeListSin.map(option => (
//                                                         <MenuItem key={option.value} value={option.value}>
//                                                             {option.label}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             </FormControl>
//                                         )}

//                                         <div className="!w-[48%]">
//                                             <Dialog
//                                                 fullWidth
//                                                 open={salaryOpen}
//                                                 onClose={handleClose}
//                                                 aria-labelledby="alert-dialog-title"
//                                                 aria-describedby="alert-dialog-description">
//                                                 <DialogContent>
//                                                     <DialogContentText id="alert-dialog-description">
//                                                         <TextField
//                                                             className={`${classes.input}`}
//                                                             fullWidth
//                                                             type="number"
//                                                             id="outlined-basic"
//                                                             label="Main Tenant"
//                                                             variant="outlined"
//                                                             value={salary.mainTenant_salary ? salary.mainTenant_salary : ''}
//                                                             name="mainTenant_salary"
//                                                             onChange={handelTotalSalaryCount}
//                                                             onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
//                                                         />
//                                                         <TextField
//                                                             className={`${classes.input} !my-3`}
//                                                             fullWidth
//                                                             type="number"
//                                                             id="outlined-basic"
//                                                             label="Occupant 01 "
//                                                             variant="outlined"
//                                                             onChange={handelTotalSalaryCount}
//                                                             value={salary.occupant1_salary ? salary.occupant1_salary : ''}
//                                                             name="occupant1_salary"
//                                                             onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
//                                                         />
//                                                         <TextField
//                                                             fullWidth
//                                                             type="number"
//                                                             className={`${classes.input} !my-3`}
//                                                             id="outlined-basic"
//                                                             label="Occupant 02 "
//                                                             variant="outlined"
//                                                             onChange={handelTotalSalaryCount}
//                                                             value={salary.occupant2_salary ? salary.occupant2_salary : ''}
//                                                             name="occupant2_salary"
//                                                         // onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
//                                                         // onKeyUp={e => {
//                                                         //   const inputElement = e.target as HTMLInputElement
//                                                         //   inputElement.value = inputElement.value.replace(/\D/, '')
//                                                         // }}
//                                                         />
//                                                         <TextField
//                                                             fullWidth
//                                                             type="number"
//                                                             className={`${classes.input} !my-3`}
//                                                             id="outlined-basic"
//                                                             label="Occupant 03 "
//                                                             variant="outlined"
//                                                             onChange={handelTotalSalaryCount}
//                                                             value={salary.occupant3_salary ? salary.occupant3_salary : ''}
//                                                             name="occupant3_salary"
//                                                             onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
//                                                         />
//                                                         <TextField
//                                                             fullWidth
//                                                             type="number"
//                                                             className={`${classes.input} !my-3`}
//                                                             id="outlined-basic"
//                                                             label="Occupant 04"
//                                                             variant="outlined"
//                                                             onChange={handelTotalSalaryCount}
//                                                             value={salary.occupant4_salary ? salary.occupant4_salary : ''}
//                                                             name="occupant4_salary"
//                                                             onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
//                                                         />
//                                                         <TextField
//                                                             fullWidth
//                                                             type="number"
//                                                             className={`${classes.input} !my-3`}
//                                                             id="outlined-basic"
//                                                             label="Occupant 05"
//                                                             variant="outlined"
//                                                             onChange={handelTotalSalaryCount}
//                                                             value={salary.occupant5_salary ? salary.occupant5_salary : ''}
//                                                             name="occupant5_salary"
//                                                             onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
//                                                         />
//                                                     </DialogContentText>
//                                                 </DialogContent>
//                                                 <DialogActions>
//                                                     <Button onClick={handleClose} autoFocus>
//                                                         No Breakdown
//                                                     </Button>
//                                                     <Button onClick={totalCount} autoFocus>
//                                                         Save
//                                                     </Button>
//                                                 </DialogActions>
//                                             </Dialog>
//                                             <TextField
//                                                 className={`${classes.input}`}
//                                                 {...register('salary')}
//                                                 fullWidth
//                                                 onClick={handleClickOpen}
//                                                 type="number"
//                                                 id="outlined-basic"
//                                                 label="Salary"
//                                                 variant="outlined"
//                                                 // onChange={e => {
//                                                 //   setTotalSalary(e.target.value)
//                                                 // }}
//                                                 value={totalSalary ? totalSalary : userProfile?.salary}
//                                                 // onKeyUp={(e: any) => (e.target.value = e.target.value.replace(/\D/, ''))}
//                                                 sx={{
//                                                     '& .MuiInputLabel-root.Mui-focused': {
//                                                         color: errors.salary ? 'red' : totalSalary || userProfile?.salary ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                     },
//                                                     // '& .Mui-focused .MuiInputLabel-root': {
//                                                     //   color: 'red', // Change label color if there is an error
//                                                     // },
//                                                     '& fieldset': {
//                                                         borderWidth: 1,
//                                                         borderColor: errors.salary ? 'red' : '',
//                                                         boxShadow: errors.salary ? ' ' : '0px 2px 8px #034EA10F',
//                                                     },

//                                                     '& .MuiOutlinedInput-root': {
//                                                         backgroundColor: errors.salary ? '#F8FBFF' : 'transparent',
//                                                     },
//                                                 }}
//                                             />
//                                             <ErrorMessage
//                                                 errors={errors}
//                                                 name="salary"
//                                                 render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                             />
//                                         </div>
//                                         <div className="!w-[48%]">
//                                             <TextField
//                                                 className={`${classes.input} !w-full `}
//                                                 defaultValue={userProfile?.outstanding_loan ? userProfile?.outstanding_loan : ''}
//                                                 {...register('outstanding_loan')}
//                                                 type="number"
//                                                 id="outlined-basic"
//                                                 label="Outstanding Loans"
//                                                 variant="outlined"
//                                                 // onKeyUp={(e: any) => {
//                                                 //   trigger('outstanding_loan')
//                                                 //    (e.target.value = e.target.value.replace(/\D/, ''))
//                                                 // }}
//                                                 sx={{
//                                                     '& .MuiInputLabel-root.Mui-focused': {
//                                                         color: errors.outstanding_loan ? 'red' : outstanding_Loan ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                     },
//                                                     // '& .Mui-focused .MuiInputLabel-root': {
//                                                     //   color: 'red', // Change label color if there is an error
//                                                     // },
//                                                     '& fieldset': {
//                                                         borderWidth: 1,
//                                                         borderColor: errors.outstanding_loan ? 'red' : '',
//                                                         boxShadow: errors.outstanding_loan ? ' ' : '0px 2px 8px #034EA10F',
//                                                     },

//                                                     '& .MuiOutlinedInput-root': {
//                                                         backgroundColor: errors.outstanding_loan ? '#F8FBFF' : 'transparent',
//                                                     },
//                                                 }}
//                                             />
//                                             <ErrorMessage
//                                                 errors={errors}
//                                                 name="outstanding_loan"
//                                                 render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                             />
//                                         </div>
//                                         {/* ${classes.input} */}
//                                         {localForeigner != 'Foreigner (1st Timer)' && (
//                                             <FormControl className={` !w-[48%]`}>
//                                                 <InputLabel
//                                                     id="demo-simple-select-label"
//                                                     sx={{
//                                                         color: errors.cbs ? 'red' : cbs_Value ? '#00ADEE' : ' ',
//                                                     }}>
//                                                     {/*required={true} */}
//                                                     CBS Rating
//                                                 </InputLabel>
//                                                 <Select
//                                                     {...register('cbs')}
//                                                     // required={true}
//                                                     fullWidth
//                                                     onClick={() => {
//                                                         trigger('cbs')
//                                                     }}
//                                                     id=""
//                                                     label="CBS Rating"
//                                                     defaultValue={userProfile?.cbs_score}
//                                                     // defaultValue={cbsList.find((option: any) => option.label === userProfile?.cbs_score)}
//                                                     onChange={handleCBSOnChange}
//                                                     sx={{
//                                                         // '& .MuiInputLabel-root.Mui-focused': {
//                                                         //   color: errors.cbs ? 'red' : cbsValue ? '#00ADEE' : ' ', // Change label color if there is an error
//                                                         // },
//                                                         '& fieldset': {
//                                                             borderWidth: 1,
//                                                             borderColor: errors.cbs ? 'red' : '',
//                                                             boxShadow: errors.cbs ? ' ' : '0px 2px 8px #034EA10F',
//                                                         },

//                                                         '& .MuiOutlinedInput-root': {
//                                                             backgroundColor: errors.cbs ? 'red' : 'transparent',
//                                                         },
//                                                     }}>
//                                                     {cbsList.map(option => (
//                                                         <MenuItem key={option.value} value={option.value}>
//                                                             {option.label}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                                 <ErrorMessage
//                                                     errors={errors}
//                                                     name="cbs"
//                                                     render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
//                                                 />
//                                             </FormControl>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/*here*/}
//                         </div>
//                     </form>
//                     <div className="w-[40%]">
//                         <div className="w-full mb-5 bg-[#F8FBFF] py-4 px-8 border border-[#D4E8FF] rounded-lg flex items-center gap-5 bg-radial-gradient ">
//                             <div className="w-full ">
//                                 <h2 className="font-bold font-roboto text-[#000000] text-lg md:text-xl xl:text-2xl">
//                                     Your Profile Photo
//                                 </h2>

//                                 <div className=" flex">
//                                     <div className="w-full">
//                                         {(() => {
//                                             if (preview) {
//                                                 if (typeof preview === 'string') {
//                                                     return (
//                                                         <img
//                                                             src={preview}
//                                                             alt=""
//                                                             className="w-[100px] h-[100px] rounded-full"
//                                                         // style={{ width: '80px', height: '80px', borderRadius: '50%' }}
//                                                         />
//                                                     )
//                                                 } else {
//                                                     return (
//                                                         <img
//                                                             src={URL.createObjectURL(preview)}
//                                                             alt=""
//                                                             className="w-[100px] h-[100px] rounded-full"
//                                                         // style={{ width: '80px', height: '80px', borderRadius: '50%' }}
//                                                         />
//                                                     )
//                                                 }
//                                             } else {
//                                                 if (userProfile?.profile_pic) {
//                                                     return (
//                                                         <img
//                                                             src={userProfile?.profile_pic}
//                                                             alt=""
//                                                             className="w-[100px] h-[100px] rounded-full"
//                                                         // style={{ width: '80px', height: '80px', borderRadius: '50%' }}
//                                                         />
//                                                     )
//                                                 } else {
//                                                     return (
//                                                         <img
//                                                             src="/no_profile.jpg"
//                                                             alt=""
//                                                             className="w-[100px] h-[100px] rounded-full"
//                                                         // style={{ width: '80px', height: '80px', borderRadius: '50%' }}
//                                                         />
//                                                     )
//                                                 }
//                                             }
//                                         })()}
//                                     </div>
//                                     <div className="w-full">
//                                         <PhotoCropper
//                                             className={classNames(
//                                                 '!text-white !rounded-md !p-3 !cursor-pointer',
//                                                 isTenant(type) ? '!bg-[#00ADEE]' : '!bg-[#034EA1]'
//                                             )}
//                                             onCropComplete={handleCropComplete}
//                                             title={title}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-[#F1F7FF] py-3 md:py-4 xl:py-6 px-4 md:px-7 xl:px-11 border border-[#D4E8FF] mt-5 md:mt-0 rounded-md w-full">
//                             <h2 className="font-bold font-roboto text-[#202020] text-lg sm:text-xl xl:text-2xl  mb-[18px] md:mb-[22px] xl:mb-[30px]">
//                                 My Documents
//                             </h2>
//                             <div className=" !rounded-[10px]">
//                                 <Dialog
//                                     open={open}
//                                     keepMounted
//                                     onClose={() => {
//                                         trigger(dialogTitle)
//                                         setOpen(false)
//                                     }}
//                                     aria-describedby="alert-dialog-slide-description">
//                                     <DialogTitle>{dialogTitle}</DialogTitle>
//                                     <DialogContent>
//                                         <DialogContentText id="alert-dialog-slide-description">
//                                             {previewImage && (
//                                                 <a href={URL.createObjectURL(previewImage)} target="_blank" rel="noreferrer">
//                                                     <Image width="100px" height="100px" src={pdfView} alt="" />
//                                                 </a>
//                                             )}
//                                             <TextField
//                                                 ref={fileRef}
//                                                 // {...register(dialogTitle)}
//                                                 name={dialogTitle}
//                                                 // value=""
//                                                 onChange={e => {
//                                                     handleUploadDocument(e)
//                                                 }}
//                                                 // onClick={() => trigger(dialogTitle)}
//                                                 id={dialogTitle}
//                                                 type="file"
//                                                 className="!w-full"
//                                                 inputProps={{ accept: 'application/pdf' }}
//                                             />
//                                         </DialogContentText>
//                                     </DialogContent>
//                                     <DialogActions>
//                                         <Button
//                                             variant="text"
//                                             onClick={() => {
//                                                 setPreviewImage('')
//                                                 // setValue('credit_report', undefined)
//                                                 setOpen(false)
//                                                 console.log('PreviewImage..', previewImage)
//                                                 // setPreviewImage(e.target.files[0])
//                                             }}>
//                                             Cancel
//                                         </Button>
//                                         <Button
//                                             variant="contained"
//                                             onClick={() => {
//                                                 trigger(dialogTitle)
//                                                 if (fileRef.current) {
//                                                     fileRef.current.files = null
//                                                 }
//                                                 handleSave(dialogTitle)
//                                             }}>
//                                             Save
//                                         </Button>
//                                     </DialogActions>
//                                 </Dialog>

//                                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2  md:gap-3 xl:gap-5">
//                                     {Object.entries(documentNow).map(([key, value]: any, _: number) => (
//                                         <div key={key}>
//                                             {/* <Controller
//                         control={control}
//                         name={key}

//                          render={({ field: { onChange, value } }) => ( */}
//                                             <div className="flex items-center justify-center flex-col h-[170px]">
//                                                 {/* {console.log('documentNow', `${value}`)} */}
//                                                 {/*w-[130px] h-[130px] */}
//                                                 <div
//                                                     className={classNames(
//                                                         'rounded-lg border-2 flex shrink-0 items-center justify-center w-[130px] h-4/6  mb-2',
//                                                         {
//                                                             'border-dashed border-[#A1A1A1]': !value,
//                                                             'border-[#D4E8FF]': value,
//                                                         }
//                                                     )}>
//                                                     {documentNow[key] ? (
//                                                         typeof value === 'string' ? (
//                                                             <a href={value} target="_blank" rel="noreferrer">
//                                                                 <Image src={pdfView} alt="" width="100px" height="100px" />
//                                                             </a>
//                                                         ) : (
//                                                             <a href={URL.createObjectURL(value)} target="_blank" rel="noreferrer">
//                                                                 <Image width="100px" height="100px" src={pdfView} alt="" />
//                                                             </a>
//                                                         )
//                                                     ) : (
//                                                         <button
//                                                             onClick={() => {
//                                                                 setDialogTitle(key)
//                                                                 setOpen(true)
//                                                             }}
//                                                             type="button"
//                                                             className="cursor-pointer bg-transparent w-full h-full">
//                                                             <Image width="50px" height="50px" src={upload} alt="" />
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                                 <p className=" shrink capitalize text-xl/none text-center h-2/6">
//                                                     {changeDocumentName(key, localForeigner, occupation)}
//                                                 </p>
//                                             </div>
//                                             {/* // )}
//                       // /> */}
//                                             <ErrorMessage
//                                                 errors={errors}
//                                                 name={key}
//                                                 render={({ message }) => <p className=" !text-red-500 !text-xs">{key + message}</p>}
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PersonalEdit

import React from 'react'

const PersonalEditOldV1 = () => {
  return (
    <div>PersonalEditOldV1</div>
  )
}

export default PersonalEditOldV1
