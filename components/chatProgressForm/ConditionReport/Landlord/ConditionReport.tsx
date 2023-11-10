import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useConditionDetailsQuery,
  useCreateConditionReportMutation,
  useMultiFileUploadMutation,
} from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, FormControl, TextField } from '@mui/material'
import { getToDay } from '@/util/helper'
import {
  CONDITION_REPORT_SIGNING_CREATE,
  CONDITION_REPORT_SIGNING_UPDATE,
} from '@/store/chatProgress/progress/constant'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { Icon } from '@/components/shared'
import { toast } from 'react-toastify'

const ConditionReport = ({ mutateType }: any) => {
  // redux tools
  const dispatch = useDispatch()
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)

  const [createConditionReport, { isError, isLoading, data }] = useCreateConditionReportMutation()
  const { data: conditionDetails, isLoading: conditionsLoading } = useConditionDetailsQuery(
    payload.threadInfo?.property_id
  )

  // form controller
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()
  const {
    fields: conditionOfFloor,
    append: conditionOfFloorAppend,
    remove: conditionOfFloorRemove,
  } = useFieldArray({ control, name: 'conditionOfFloor' })
  const {
    fields: conditionOfWall,
    append: conditionOfWallAppend,
    remove: conditionOfWallRemove,
  } = useFieldArray({ control, name: 'conditionOfWall' })
  const {
    fields: conditionOfCelling,
    append: conditionOfCellingAppend,
    remove: conditionOfCellingRemove,
  } = useFieldArray({ control, name: 'conditionOfCelling' })
  const {
    fields: conditionOfDoorAndLock,
    append: conditionOfDoorAndLockAppend,
    remove: conditionOfDoorAndLockRemove,
  } = useFieldArray({ control, name: 'conditionOfDoorAndLock' })
  const {
    fields: conditionOfLightingFixtures,
    append: conditionOfLightingFixturesAppend,
    remove: conditionOfLightingFixturesRemove,
  } = useFieldArray({ control, name: 'conditionOfLightingFixtures' })
  const {
    fields: conditionOfWindows,
    append: conditionOfWindowsAppend,
    remove: conditionOfWindowsRemove,
  } = useFieldArray({ control, name: 'conditionOfWindows' })
  const {
    fields: conditionOfCurtainsDrapes,
    append: conditionOfCurtainsDrapesAppend,
    remove: conditionOfCurtainsDrapesRemove,
  } = useFieldArray({ control, name: 'conditionOfCurtainsDrapes' })
  const {
    fields: conditionOfAppliances,
    append: conditionOfAppliancesAppend,
    remove: conditionOfAppliancesRemove,
  } = useFieldArray({ control, name: 'conditionOfAppliances' })
  const {
    fields: conditionOfFurnitures,
    append: conditionOfFurnituresAppend,
    remove: conditionOfFurnituresRemove,
  } = useFieldArray({ control, name: 'conditionOfFurnitures' })

  // session and data make
  const { data: session }: any = useSession()

  const roleType = payload?.roletype === 'landlord' ? 'Landlord' : 'Tenant'
  // const userId = session?.user?.id
  useEffect(() => {
    Object.entries(
      conditionDetails?.propertyConditionReportList ? conditionDetails?.propertyConditionReportList : { hello: 'world' }
    )?.map(async ([key, value]: any, _: number) => {
      switch (key) {
        case 'condition_of_walls':
          value?.map(async (item: any, index: number) => {
            conditionOfWallAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfWallAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'condition_of_celling':
          value?.map(async (item: any, index: number) => {
            conditionOfCellingAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfCellingAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'condition_of_doors_locks':
          value?.map(async (item: any, index: number) => {
            conditionOfDoorAndLockAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfDoorAndLockAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'condition_of_lighting_fixtures':
          value?.map(async (item: any, index: number) => {
            conditionOfLightingFixturesAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfLightingFixturesAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'condition_of_windows':
          value?.map(async (item: any, index: number) => {
            conditionOfWindowsAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfWindowsAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'condition_of_curtains_drapes':
          value?.map(async (item: any, index: number) => {
            conditionOfCurtainsDrapesAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfCurtainsDrapesAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'appliances':
          value?.map(async (item: any, index: number) => {
            conditionOfAppliancesAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfAppliancesAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'furniture':
          value?.map(async (item: any, index: number) => {
            conditionOfFurnituresAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfFurnituresAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        case 'condition_of_floor':
          value?.map(async (item: any, index: number) => {
            conditionOfFloorAppend({
              move: item?.move_in ? 'Move In' : 'Move Out',
              image_name: item?.image_name,
              condition: item?.move_in ? item?.move_in : item?.move_out,
              file: item?.image,
              counterImage: item?.counter_image,
              counterDescription: item?.counter_comment,
            })
          })
          if(value?.length == 0) {
            conditionOfFloorAppend({
              move: '',
              image_name: '',
              condition: '',
              file: null,
              counterImage: null,
              counterDescription: '',
            })
          }
          break
        default:
          break
      }
    })
  }, [conditionDetails, conditionOfFloorAppend])
  const [uploadFiles, { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }] =
    useMultiFileUploadMutation()

  // const addNewValue = async (conditionDetails: any, key: any, value: any) => {
  //   let dataToSubmit = conditionDetails?.data?.propertyConditionReportList
  //   if (key) {
  //     if (typeof value === 'string') {
  //       dataToSubmit[key] = value
  //     } else {
  //       dataToSubmit[key].push(value)
  //     }
  //   }
  //   const conditionResponse = await createConditionReport(dataToSubmit)
  //   return conditionResponse
  // }
  const handleUploadFile = async (data: any) => {
    // console.log('🚀 ~ file: ConditionReport.tsx:48 ~ handleUploadFile ~ data:', data)
    const filePayload = new FormData()
    filePayload.append('media[0]', data)
    const res: any = await uploadFiles(filePayload)
    const url = res.data?.url[0]
    return url
  }

  const makeFormDate = async (data: any) => {
    const formData: any = {
      property_id: payload.threadInfo?.property_id,
      tenant_id: payload.threadInfo?.sender_id,
      landlord_id: payload.threadInfo?.receiver_id,
      move_in_date: getToDay(),
      landlord_signature: '',
      tenant_signature: '',
      tenant_date_sig: getToDay(),
      tenant_witness_date_sig: '',
      landlord_date_sig: getToDay(),
      landlord_witness_date_sig: '',
      condition_of_floor: [],
      condition_of_walls: [],
      condition_of_celling: [],
      condition_of_doors_locks: [],
      condition_of_lighting_fixtures: [],
      condition_of_windows: [],
      condition_of_curtains_drapes: [],
      appliances: [],
      furniture: [],
    }

    Object.entries(data)?.map(async ([key, value]: any, _: number) => {
      await value?.map(async (item: any, ind: number) => {
        let imageFile = ''
        try {
          imageFile = await handleUploadFile(item?.file[0])
        } catch (e) {
          console.log('e', e)
        }
        let counterImage = ''
        try {
          counterImage = await handleUploadFile(item?.counterImage[0])
        } catch (e) {
          console.log('e', e)
        }
        const returnData = {
          image: imageFile,
          move_in: item?.move === 'Move In' ? item?.condition : '',
          move_out: item?.move === 'Move Out' ? item?.condition : '',
          image_name: item?.image_name,
          uploader_role: roleType,
          counter_image: counterImage,
          counter_comment: item?.counterDescription ? item?.counterDescription : '',
          upload_date: '',
          counter_date: '',
          counter_role: '',
          landlord_id: payload?.threadInfo?.receiver_id,
          tenant_id: payload?.threadInfo?.sender_id,
        }

        switch (key) {
          case 'conditionOfFloor':
            if (conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.image && imageFile === '') {
              imageFile = conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.image
            }
            if (
              conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.counter_image &&
              counterImage === ''
            ) {
              counterImage = conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.counter_image
            }

            formData['condition_of_floor'].push(returnData)

            return false
          case 'conditionOfWall':
            if (conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.image && imageFile === '') {
              imageFile = conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.image
            }
            if (
              conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.counter_image &&
              counterImage === ''
            ) {
              counterImage = conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.counter_image
            }
            formData['condition_of_walls'].push(returnData)
            break
          case 'conditionOfCelling':
            if (conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.image && imageFile === '') {
              imageFile = conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.image
            }
            if (
              conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.counter_image &&
              counterImage === ''
            ) {
              counterImage = conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.counter_image
            }
            formData['condition_of_celling'].push(returnData)
            break
          case 'conditionOfDoorAndLock':
            if (conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.image) {
              imageFile = conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.image
            }
            if (
              conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.counter_image &&
              counterImage === ''
            ) {
              counterImage = conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.counter_image
            }
            formData['condition_of_doors_locks'].push(returnData)
            break
          case 'conditionOfLightingFixtures':
            if (conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.image) {
              imageFile = conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.image
            }
            if (
              conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.counter_image &&
              counterImage === ''
            ) {
              counterImage =
                conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.counter_image
            }
            formData['condition_of_lighting_fixtures'].push(returnData)
            break
          case 'conditionOfWindows':
            if (conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.image) {
              imageFile = conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.image
            }
            if (
              conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.counter_image &&
              counterImage === ''
            ) {
              counterImage = conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.counter_image
            }
            formData['condition_of_windows'].push(returnData)
            break
          case 'conditionOfCurtainsDrapes':
            if (conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.image) {
              imageFile = conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.image
            }
            if (
              conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.counter_image &&
              counterImage === ''
            ) {
              counterImage =
                conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.counter_image
            }
            formData['condition_of_curtains_drapes'].push(returnData)
            break
          case 'conditionOfAppliances':
            if (conditionDetails?.propertyConditionReportList?.appliances[ind]?.image) {
              imageFile = conditionDetails?.propertyConditionReportList?.appliances[ind]?.image
            }
            if (conditionDetails?.propertyConditionReportList?.appliances[ind]?.counter_image && counterImage === '') {
              counterImage = conditionDetails?.propertyConditionReportList?.appliances[ind]?.counter_image
            }
            formData['appliances'].push(returnData)
            break
          case 'conditionOfFurnitures':
            if (conditionDetails?.propertyConditionReportList?.furniture[ind]?.image) {
              imageFile = conditionDetails?.propertyConditionReportList?.furniture[ind]?.image
            }
            if (conditionDetails?.propertyConditionReportList?.furniture[ind]?.counter_image && counterImage === '') {
              counterImage = conditionDetails?.propertyConditionReportList?.furniture[ind]?.counter_image
            }
            formData['furniture'].push(returnData)
            break
          default:
            break
        }
        // formData[key].push({
        //   image: imageFile,
        //   move_in: item?.move === 'Move In' ? item?.condition : '',
        //   move_out: item?.move === 'Move Out' ? item?.condition : '',
        //   image_name: item?.image_name,
        //   uploader_role: roleType,
        //   counter_image: counterImage,
        //   counter_comment: item?.counterDescription ? item?.counterDescription : "",
        //   upload_date: '',
        //   counter_date: '',
        //   counter_role: '',
        //   landlord_id: payload?.threadInfo?.receiver_id,
        //   tenant_id: payload?.threadInfo?.sender_id,
        // })
        // console.log("Form D", formD['condition_of_floor'])
        // formD[key].push(returnData)
        // console.log("🚀 ~ file: ConditionReport.tsx:89 ~ res ~ returnData:", returnData)
        // return returnData
      })
      // formData.append(key, res)
      // return [key, res]
    })
    return formData
  }

  const handleFormSubmit = async (data: any) => {
    makeFormDate(data).then(async (value)=>{
      // console.log("valueeeeeeeeeeeee", value)
      if (mutateType !== 'update') store.dispatch(hideModal(CONDITION_REPORT_SIGNING_CREATE))
      else store.dispatch(hideModal(CONDITION_REPORT_SIGNING_UPDATE))
      dispatch(showLoader('Creating Condition Report'))

      const res = await createConditionReport(value).then((resp)=>console.log("response value-----", resp))

      dispatch(hideLoader())
      ChatCreate(
        "Landlord Added Condition Report",
        'RZY',
        payload?.threadInfo?.property_id,
        payload?.threadInfo?.receiver_id,
        payload?.threadInfo?.id,
        "CONDITION_REPORT",
        ''
      )

      const updatedData = {
        instruction: 'Not yet',
        is_landlord_sign: false,
        is_tenant_sign: false,
        progress_status: false,
        status: roleType === 'Tenant' ? 'draft_send' : 'draft_created',
      }

      updateTenantProgress(
        `${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
        'propertyCondition',
        updatedData
      )

      updateLandlordProgress(
        `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
        'propertyCondition',
        updatedData
      )
    })

    // const formData: any = {
    //   property_id: payload.threadInfo?.property_id,
    //   move_in_date: getToDay(),
    //   landlord_signature: '',
    //   tenant_signature: '',
    //   tenant_date_sig: getToDay(),
    //   tenant_witness_date_sig: '',
    //   landlord_date_sig: getToDay(),
    //   landlord_witness_date_sig: '',
    //   condition_of_floor: [],
    //   condition_of_walls: [],
    //   condition_of_celling: [],
    //   condition_of_doors_locks: [],
    //   condition_of_lighting_fixtures: [],
    //   condition_of_windows: [],
    //   condition_of_curtains_drapes: [],
    //   appliances: [],
    //   furniture: [],
    // }
    // Object.entries(data)?.map(async ([key, value]: any, _: number) => {
    //   const refres = await value?.map(async (item: any, ind: number) => {
    //     let imageFile = ''
    //     try {
    //       imageFile = await handleUploadFile(item?.file[0])
    //     } catch (e) {
    //       console.log('e', e)
    //     }
    //     let counterImage = ''
    //     try {
    //       counterImage = await handleUploadFile(item?.counterImage[0])
    //     } catch (e) {
    //       console.log('e', e)
    //     }
    //     const returnData = {
    //       image: imageFile,
    //       move_in: item?.move === 'Move In' ? item?.condition : '',
    //       move_out: item?.move === 'Move Out' ? item?.condition : '',
    //       image_name: item?.image_name,
    //       uploader_role: roleType,
    //       counter_image: counterImage,
    //       counter_comment: item?.counterDescription ? item?.counterDescription : "",
    //       upload_date: '',
    //       counter_date: '',
    //       counter_role: '',
    //       landlord_id: payload?.threadInfo?.receiver_id,
    //       tenant_id: payload?.threadInfo?.sender_id,
    //     }
    //     switch (key) {
    //       case 'conditionOfFloor':
    //         if (conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.image && imageFile === '')
    //           returnData['image'] = conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.image
    //         if (
    //           conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.counter_image &&
    //           counterImage === ''
    //         )
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_floor[ind]?.counter_image
    //         formData['condition_of_floor'].push(returnData)
    //         break
    //       case 'conditionOfWall':
    //         if (conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.image && imageFile === '')
    //           returnData['image'] = conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.image
    //         if (
    //           conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.counter_image &&
    //           counterImage === ''
    //         )
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_walls[ind]?.counter_image
    //         formData['condition_of_walls'].push(returnData)
    //         break
    //       case 'conditionOfCelling':
    //         if (conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.image && imageFile === '')
    //           returnData['image'] = conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.image
    //         if (
    //           conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.counter_image &&
    //           counterImage === ''
    //         )
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_celling[ind]?.counter_image
    //         formData['condition_of_celling'].push(returnData)
    //         break
    //       case 'conditionOfDoorAndLock':
    //         if (conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.image)
    //           returnData['image'] = conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.image
    //         if (
    //           conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.counter_image &&
    //           counterImage === ''
    //         )
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_doors_locks[ind]?.counter_image
    //         formData['condition_of_doors_locks'].push(returnData)
    //         break
    //       case 'conditionOfLightingFixtures':
    //         if (conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.image)
    //           returnData['image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.image
    //         if (
    //           conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.counter_image &&
    //           counterImage === ''
    //         )
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_lighting_fixtures[ind]?.counter_image
    //         formData['condition_of_lighting_fixtures'].push(returnData)
    //         break
    //       case 'conditionOfWindows':
    //         if (conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.image)
    //           returnData['image'] = conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.image
    //         if (
    //           conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.counter_image &&
    //           counterImage === ''
    //         )
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_windows[ind]?.counter_image
    //         formData['condition_of_windows'].push(returnData)
    //         break
    //       case 'conditionOfCurtainsDrapes':
    //         if (conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.image)
    //           returnData['image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.image
    //         if (
    //           conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.counter_image &&
    //           counterImage === ''
    //         )
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.condition_of_curtains_drapes[ind]?.counter_image
    //         formData['condition_of_curtains_drapes'].push(returnData)
    //         break
    //       case 'conditionOfAppliances':
    //         if (conditionDetails?.propertyConditionReportList?.appliances[ind]?.image)
    //           returnData['image'] = conditionDetails?.propertyConditionReportList?.appliances[ind]?.image
    //         if (conditionDetails?.propertyConditionReportList?.appliances[ind]?.counter_image && counterImage === '')
    //           returnData['counter_image'] =
    //             conditionDetails?.propertyConditionReportList?.appliances[ind]?.counter_image
    //         formData['appliances'].push(returnData)
    //         break
    //       case 'conditionOfFurnitures':
    //         if (conditionDetails?.propertyConditionReportList?.furniture[ind]?.image)
    //           returnData['image'] = conditionDetails?.propertyConditionReportList?.furniture[ind]?.image
    //         if (conditionDetails?.propertyConditionReportList?.furniture[ind]?.counter_image && counterImage === '')
    //           returnData['counter_image'] = conditionDetails?.propertyConditionReportList?.furniture[ind]?.counter_image
    //         formData['furniture'].push(returnData)
    //         break
    //       default:
    //         break
    //     }
    //     // console.log("Form D", formD['condition_of_floor'])
    //     // formD[key].push(returnData)
    //     // console.log("🚀 ~ file: ConditionReport.tsx:89 ~ res ~ returnData:", returnData)
    //     return returnData
    //   })
    //   console.log("refres-----", refres)
    //   // formData.append(key, res)
    //   // return [key, res]
    // })

    

    // const move = data?.move
    // const image_name = data?.image_name
    // const imageFile = await handleUploadFile(data?.file)
    // delete data.move
    // delete data.image_name
    // delete data.file
    // const [key, value] = Object.entries(data)[0]
    // const formData = {
    //   image: imageFile,
    //   move_in: move === 'true' ? value : '',
    //   move_out: move === 'false' ? value : '',
    //   image_name: image_name,
    //   uploader_role: roleType,
    // }
    // const newresp = await addNewValue(conditionDetails, key, formData)
    // console.log('new respo ============---> ', newresp)
  }

  // const handleChange = (event: any) => {
  //   setValue('conditionArea', event.target.value)
  // }

  return (
    <div className="bg-inherit w-full md:min-w-[1020px] max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4  overflow-auto rounded-b-[20px]">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          {/* CONDITION OF FLOOR */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>CONDITION OF FLOOR</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfFloor.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfFloor?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfFloor-${index}-moveIn`}
                            value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfFloor.${index}.move` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfFloor-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfFloor.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfFloor-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfFloor.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfFloor-${index}-file`}
                                {...register(`conditionOfFloor.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfFloor-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfFloorRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfFloor-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfFloor.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfFloor-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfFloor.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfFloorAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* CONDITION OF WALLS */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>CONDITION OF WALLS</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfWall.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfWall?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfWall-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfWall.${index}.move` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfWall-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfWall.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfWall-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfWall.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfWall-${index}-file`}
                                {...register(`conditionOfWall.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfWall-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfWallRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfWall-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfWall.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfWall-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfWall.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfWallAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* APPLIANCES */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>APPLIANCES</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfAppliances.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfAppliances?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfAppliances-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfAppliances.${index}.moveIn` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfAppliances-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfAppliances.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfAppliances-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfAppliances.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfAppliances-${index}-file`}
                                {...register(`conditionOfAppliances.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfAppliances-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfAppliancesRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfAppliances-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfAppliances.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfAppliances-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfAppliances.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfAppliancesAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* CONDITION OF CEILING */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>CONDITION OF CEILING</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfCelling.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfCelling?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfCelling-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfCelling.${index}.moveIn` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfCelling-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfCelling.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfCelling-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfCelling.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfCelling-${index}-file`}
                                {...register(`conditionOfCelling.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfCelling-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfCellingRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfCelling-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfCelling.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfCelling-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfCelling.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfCellingAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* CONDITION OF CURTAINS DRAPES */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>CONDITION OF CURTAINS DRAPES</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfCurtainsDrapes.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfCurtainsDrapes?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfCurtainsDrapes-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfCurtainsDrapes.${index}.moveIn` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfCurtainsDrapes-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfCurtainsDrapes.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfCurtainsDrapes-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfCurtainsDrapes.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfCurtainsDrapes-${index}-file`}
                                {...register(`conditionOfCurtainsDrapes.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfCurtainsDrapes-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfCurtainsDrapesRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfCurtainsDrapes-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfCurtainsDrapes.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfCurtainsDrapes-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfCurtainsDrapes.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfCurtainsDrapesAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* CONDITION OF DOORS LOCKS */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>CONDITION OF DOORS LOCKS</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfDoorAndLock.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfDoorAndLock?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfDoorAndLock-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfDoorAndLock.${index}.moveIn` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-60' : '!w-80 !m-2'}
                            id={`conditionOfDoorAndLock-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfDoorAndLock.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfDoorAndLock-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfDoorAndLock.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfDoorAndLock-${index}-file`}
                                {...register(`conditionOfDoorAndLock.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfDoorAndLock-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfDoorAndLockRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfDoorAndLock-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfDoorAndLock.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfDoorAndLock-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfDoorAndLock.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfDoorAndLockAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* FURNITURE */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>FURNITURE</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfFurnitures.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfFurnitures?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfFurnitures-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfFurnitures.${index}.moveIn` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-60' : '!w-80 !m-2'}
                            id={`conditionOfFurnitures-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfFurnitures.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfFurnitures-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfFurnitures.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfFurnitures-${index}-file`}
                                {...register(`conditionOfFurnitures.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfFurnitures-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfFurnituresRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfFurnitures-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfFurnitures.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfFurnitures-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfFurnitures.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfFurnituresAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* CONDITION OF LIGHTING FIXTURES */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>CONDITION OF LIGHTING FIXTURES</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfLightingFixtures.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfLightingFixtures?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfLightingFixtures-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfLightingFixtures.${index}.moveIn` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-60' : '!w-80 !m-2'}
                            id={`conditionOfLightingFixtures-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfLightingFixtures.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfLightingFixtures-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfLightingFixtures.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfLightingFixtures-${index}-file`}
                                {...register(`conditionOfLightingFixtures.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfLightingFixtures-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfLightingFixturesRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfLightingFixtures-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfLightingFixtures.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfLightingFixtures-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfLightingFixtures.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfLightingFixturesAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* CONDITION OF WINDOWS */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <div className='flex w-full justify-between'>
                <p>CONDITION OF WINDOWS</p>
                <div  className='mr-8 w-7 h-7 flex items-center justify-center bg-[#00ADEE] rounded-full'>
                  <p className=' font-normal font-roboto text-sm text-[#ffffff]'>{conditionOfWindows.length}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {conditionOfWindows?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <input
                            type="radio"
                            hidden
                            id={`conditionOfWindows-${index}-moveIn`}
                            // value={'Move In'}
                            defaultValue={item?.move}
                            {...register(`conditionOfWindows.${index}.moveIn` as const)}
                          />
                          <TextField
                            className={mutateType !== 'update' ? '!w-60' : '!w-80 !m-2'}
                            id={`conditionOfWindows-${index}-image_name`}
                            select
                            label="Select Condition For"
                            defaultValue={item?.image_name}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfWindows.${index}.image_name` as const)}>
                            <option value=""></option>
                            <option value="Living area">Living area</option>
                            <option value="Dining area">Dining area</option>
                            <option value="Master bedroom">Master bedroom</option>
                            <option value="bedroom #02">bedroom #02</option>
                            <option value="bedroom #03">bedroom #03</option>
                            <option value="Attached bathroom">Attached bathroom</option>
                            <option value="Common toilet">Common toilet</option>
                            <option value="Kitchen">Kitchen</option>
                          </TextField>
                          <TextField
                            className={mutateType !== 'update' ? '!w-56' : '!w-80 !m-2'}
                            id={`conditionOfWindows-${index}-condition`}
                            select
                            label="Select Condition"
                            defaultValue={item?.condition}
                            SelectProps={{
                              native: true,
                            }}
                            {...register(`conditionOfWindows.${index}.condition` as const)}>
                            <option value=""></option>
                            <option value="no defect">no defect</option>
                            <option value="brand new">brand new</option>
                            <option value="pristine">pristine</option>
                            <option value="stains">stains</option>
                            <option value="burns">burns</option>
                            <option value="holes">holes</option>
                            <option value="snags">snags</option>
                            <option value="worn">worn</option>
                          </TextField>
                          {mutateType !== 'update' && (
                            <div>
                              <input
                                id={`conditionOfWindows-${index}-file`}
                                {...register(`conditionOfWindows.${index}.file` as const)}
                                type="file"
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={`conditionOfWindows-${index}-file`}
                                className="p-4 cursor-pointer border border-gray-400 rounded-md">
                                Upload Condition
                              </label>
                            </div>
                          )}
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-10 w-10"
                              onClick={() => conditionOfWindowsRemove(index)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {mutateType === 'update' && (
                        <Accordion className="!mt-4">
                          <AccordionSummary>
                            <Button variant="outlined">Add Counter</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <TextField
                                label={'Description'}
                                id={`conditionOfWindows-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`conditionOfWindows.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counter'}
                                id={`conditionOfWindows-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`conditionOfWindows.${index}.counterImage` as const)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type="file"
                              />
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </div>
                  </>
                ))}

                {mutateType !== 'update' && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      conditionOfWindowsAppend({
                        move: 'Move In',
                        image_name: '',
                        condition: '',
                        file: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
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

export default ConditionReport
