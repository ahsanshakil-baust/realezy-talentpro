import React, { useEffect} from 'react' // , useState  useContext, 
import { useFieldArray, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useCreateInventoryMutation,
  useInventoryDetailsQuery,
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
  // CONDITION_REPORT_SIGNING_CREATE,
  // CONDITION_REPORT_SIGNING_UPDATE,
  INVENTORY_CHECKLIST_SIGNING_CREATE,
  INVENTORY_CHECKLIST_SIGNING_UPDATE,
} from '@/store/chatProgress/progress/constant'
import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import { Icon } from '@/components/shared'
import { landlordCreateInventoryList } from '@/const'

const Inventory = ({ mutateType }: any) => {
  // redux tools
  const dispatch = useDispatch()
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const [createInventory] =
    useCreateInventoryMutation() // , { isError: invIsError, isLoading: invIsLoading, data: ivnData }
  const {
    data: inventoryDetails,
    // isLoading: inventoryIsLoading,
    // error: errorData,
  } = useInventoryDetailsQuery(payload?.threadInfo?.property_id)


  // form controller
  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
    // setValue,
  } = useForm()
  const {
    fields: livingArea,
    append: livingAreaAppend,
    remove: livingAreaRemove,
  } = useFieldArray({ control, name: 'livingArea' })
  const {
    fields: diningArea,
    append: diningAreaAppend,
    remove: diningAreaRemove,
  } = useFieldArray({ control, name: 'diningArea' })
  const {
    fields: masterBedroom,
    append: masterBedroomAppend,
    remove: masterBedroomRemove,
  } = useFieldArray({ control, name: 'masterBedroom' })
  const {
    fields: bedroomTwo,
    append: bedroomTwoAppend,
    remove: bedroomTwoRemove,
  } = useFieldArray({ control, name: 'bedroomTwo' })
  const {
    fields: bedroomThree,
    append: bedroomThreeAppend,
    remove: bedroomThreeRemove,
  } = useFieldArray({ control, name: 'bedroomThree' })
  const {
    fields: attachedBathroom,
    append: attachedBathroomAppend,
    remove: attachedBathroomRemove,
  } = useFieldArray({ control, name: 'attachedBathroom' })
  const { fields: kitchen, append: kitchenAppend, remove: kitchenRemove } = useFieldArray({ control, name: 'kitchen' })
  const { fields: keys, append: keysAppend, remove: keysRemove } = useFieldArray({ control, name: 'keys' })

  // session and data make
  const { data: session }: any = useSession()
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  // const roleType = payload?.roletype === 'landlord' ? 'Landlord' : 'Tenant'
  // const userId = session?.user?.id

  // console.log('ljslkjfj', quantityDetails)
  useEffect(() => {
    // quantityDetails?.inventoryList?.quantity_of_floor?.map(async (item: any, index: number) => {
    //     livingAreaAppend({
    //       move: item?.move_in ? 'Move In' : 'Move Out',
    //       description: item?.description,
    //       quantity: item?.move_in ? item?.move_in : item?.move_out,
    //       file: item?.image,
    //     }
    // )})
    Object.entries(inventoryDetails?.inventoryList ? inventoryDetails?.inventoryList : { hello: 'world' })?.map(
      async ([key, value]: any, _: number) => {
        // console.log(key,  value)
        switch (key) {
          case 'dining_area':
            if (value?.length == 0)
              diningAreaAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              diningAreaAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          case 'master_bedroom':
            if (value?.length == 0)
              masterBedroomAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              masterBedroomAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          case 'bedroom2':
            if (value?.length == 0)
              bedroomTwoAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              bedroomTwoAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          case 'bedroom3':
            if (value?.length == 0)
              bedroomThreeAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              bedroomThreeAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          case 'attached_bathroom':
            if (value?.length == 0)
              attachedBathroomAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              attachedBathroomAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          case 'kitchen':
            if (value?.length == 0)
              kitchenAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              kitchenAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          case 'keys':
            if (value?.length == 0)
              keysAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              keysAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          case 'living_area':
            if (value?.length == 0)
              livingAreaAppend({
                description: '',
                quantity: '',
                remarks: '',
                counterImage: null,
                counterDescription: '',
              })
            value?.map(async (item: any, _: number) => {
              livingAreaAppend({
                description: item?.description,
                quantity: item?.quantity,
                remarks: item?.remarks,
                counterImage: item?.couter_images,
                counterDescription: item?.counter_comment,
              })
            })
            break
          default:
            break
        }
      }
    )
  }, [inventoryDetails, attachedBathroomAppend, bedroomThreeAppend, bedroomTwoAppend, diningAreaAppend, keysAppend, kitchenAppend, livingAreaAppend, masterBedroomAppend ])
  const [uploadFiles] =
    useMultiFileUploadMutation() // , { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }

  // const addNewValue = async (quantityDetails: any, key: any, value: any) => {
  //   let dataToSubmit = quantityDetails?.data?.inventoryList
  //   if (key) {
  //     if (typeof value === 'string') {
  //       dataToSubmit[key] = value
  //     } else {
  //       dataToSubmit[key].push(value)
  //     }
  //   }
  //   const quantityResponse = await createquantityReport(dataToSubmit)
  //   return quantityResponse
  // }
  const handleUploadFile = async (data: any) => {
    // console.log('🚀 ~ file: quantityReport.tsx:48 ~ handleUploadFile ~ data:', data)
    const filePayload = new FormData()
    filePayload.append('media[0]', data)
    const res: any = await uploadFiles(filePayload)
    const url = res.data?.url[0]
    return url
  }

  const handleFormSubmit = async (data: any) => {
    // const quantityForm = await propertyquantity(formData);

    const formData: any = {
      property_id: payload.threadInfo?.property_id,
      tenant_id: payload.threadInfo?.sender_id,
      landlord_id: payload.threadInfo?.receiver_id,
      property_address: payload?.tenantLandlordProgressInfo?.propertyInfo?.property_address,
      living_area: [],
      dining_area: [],
      master_bedroom: [],
      bedroom2: [],
      bedroom3: [],
      attached_bathroom: [],
      kitchen: [],
      keys: [],
      tenant_sig_date: getToDay(),
      tenant_witness_sig_date: getToDay(),
      landlord_sig_date: getToDay(),
      landlord_witness_sig_date: getToDay(),
      tenant_sig: '',
      landlord_sig: '',
      agreement_id: payload?.tenantLandlordProgressInfo?.propertyInfo?.agreement?.id,
    }

    Object.entries(data)?.map(async ([key, value]: any, _: number) => {
      await value?.map(async (item: any, ind: number) => {
        let counterImage = null
        try {
          counterImage = await handleUploadFile(item?.counterImage[0])
        } catch (e) {
          console.log('e', e)
          counterImage = null
        }

        const returnData = {
          description: item?.description,
          quantity: item?.quantity,
          remarks: item?.remarks,
          couter_images: counterImage,
          comment: item?.counterDescription,
          added_date: '',
          counter_date: null,
        }
        switch (key) {
          case 'livingArea':
            if (inventoryDetails?.inventoryList?.living_area[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.living_area[ind]?.couter_images
            formData['living_area'].push(returnData)
            break
          case 'diningArea':
            if (inventoryDetails?.inventoryList?.dining_area[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.dining_area[ind]?.couter_images
            formData['dining_area'].push(returnData)
            break
          case 'masterBedroom':
            if (inventoryDetails?.inventoryList?.master_bedroom[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.master_bedroom[ind]?.couter_images
            formData['master_bedroom'].push(returnData)
            break
          case 'bedroomTwo':
            if (inventoryDetails?.inventoryList?.bedroom2[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.bedroom2[ind]?.couter_images
            formData['bedroom2'].push(returnData)
            break
          case 'bedroomThree':
            if (inventoryDetails?.inventoryList?.bedroom3[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.bedroom3[ind]?.couter_images
            formData['bedroom3'].push(returnData)
            break
          case 'attachedBathroom':
            if (inventoryDetails?.inventoryList?.attached_bathroom[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.attached_bathroom[ind]?.couter_images
            formData['attached_bathroom'].push(returnData)
            break
          case 'kitchen':
            if (inventoryDetails?.inventoryList?.kitchen[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.kitchen[ind]?.couter_images
            formData['kitchen'].push(returnData)
            break
          case 'keys':
            if (inventoryDetails?.inventoryList?.keys[ind]?.couter_images && counterImage === '')
              returnData['couter_images'] = inventoryDetails?.inventoryList?.keys[ind]?.couter_images
            formData['keys'].push(returnData)
            break
          default:
            break
        }
        // console.log("Form D", formD['quantity_of_floor'])
        // formD[key].push(returnData)
        // console.log("🚀 ~ file: quantityReport.tsx:89 ~ res ~ returnData:", returnData)
        return returnData
      })
    })

    // store.dispatch(hideModal(INVENTORY_CHECKLIST_SIGNING_CREATE))
    if (mutateType !== 'update') store.dispatch(hideModal(INVENTORY_CHECKLIST_SIGNING_CREATE))
    else store.dispatch(hideModal(INVENTORY_CHECKLIST_SIGNING_UPDATE))

    dispatch(showLoader('Creating Inventory List'))
    const { data: response }: any = await createInventory(formData)
    dispatch(hideLoader())

    ChatCreate(
      landlordCreateInventoryList,
      'RZY',
      payload.threadInfo?.property_id,
      receiver,
      payload.threadInfo?.id,
      'RZYADMIN',
      ''
    )

    const updatedData = {
      instruction: 'Not yet',
      is_landlord_sign: false,
      is_tenant_sign: false,
      progress_status: false,
      status: 'List Created',
    }

    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'itemChecklist',
      updatedData
    )

    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      'itemChecklist',
      updatedData
    )
    dispatch(hideModal(INVENTORY_CHECKLIST_SIGNING_CREATE))
  }

  // const handleChange = (event: any) => {
  //   setValue('quantityArea', event.target.value)
  // }

  return (
    <div className="bg-inherit w-full md:min-w-[1020px] max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4  overflow-auto rounded-b-[20px]">
      <div className="m-4">
        <h1 className="font-semibold">Property Address</h1>
        <p>{payload?.tenantLandlordProgressInfo?.propertyInfo?.address}</p>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className=" rounded-[20px] p-1 " style={{ maxHeight: '450px', overflowY: 'auto' }}>
          {/* LIVING AREA */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>LIVING AREA</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {livingArea?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`livingArea-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`livingArea.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`livingArea-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`livingArea.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`livingArea-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.remarks}
                            {...register(`livingArea.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-8 w-8"
                              onClick={() => livingAreaRemove(index)}
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
                                label={'Comments'}
                                id={`livingArea-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`livingArea.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`livingArea-${index}-counterImage`}
                                defaultValue={item?.counter_image}
                                {...register(`livingArea.${index}.counterImage` as const)}
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
                      livingAreaAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* DINING AREA */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>DINING AREA</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {diningArea?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`diningArea-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`diningArea.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`diningArea-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`diningArea.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`diningArea-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.quantity}
                            {...register(`diningArea.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-8 w-8"
                              onClick={() => diningAreaRemove(index)}
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
                                label={'Comments'}
                                id={`diningArea-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`diningArea.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`diningArea-${index}-counterImage`}
                                defaultValue={item?.couter_images}
                                {...register(`diningArea.${index}.counterImage` as const)}
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
                      diningAreaAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* MASTER BEDROOM */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>MASTER BEDROOM</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {masterBedroom?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`masterBedroom-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`masterBedroom.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`masterBedroom-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`masterBedroom.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`masterBedroom-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.quantity}
                            {...register(`masterBedroom.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-8 w-8"
                              onClick={() => masterBedroomRemove(index)}
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
                                label={'Comments'}
                                id={`masterBedroom-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`masterBedroom.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`masterBedroom-${index}-counterImage`}
                                defaultValue={item?.couter_images}
                                {...register(`masterBedroom.${index}.counterImage` as const)}
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
                      masterBedroomAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* BEDROOM TWO */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>BEDROOM TWO</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {bedroomTwo?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`bedroomTwo-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`bedroomTwo.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`bedroomTwo-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`bedroomTwo.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`bedroomTwo-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.quantity}
                            {...register(`bedroomTwo.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-8 w-8"
                              onClick={() => bedroomTwoRemove(index)}
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
                                label={'Comments'}
                                id={`bedroomTwo-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`bedroomTwo.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`bedroomTwo-${index}-counterImage`}
                                defaultValue={item?.couter_images}
                                {...register(`bedroomTwo.${index}.counterImage` as const)}
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
                      bedroomTwoAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* BEDROOM THREE */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>BEDROOM THREE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {bedroomThree?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`bedroomThree-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`bedroomThree.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`bedroomThree-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`bedroomThree.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`bedroomThree-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.quantity}
                            {...register(`bedroomThree.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-8 w-8"
                              onClick={() => bedroomThreeRemove(index)}
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
                                label={'Comments'}
                                id={`bedroomThree-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`bedroomThree.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`bedroomThree-${index}-counterImage`}
                                defaultValue={item?.couter_images}
                                {...register(`bedroomThree.${index}.counterImage` as const)}
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
                      bedroomThreeAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* ATTACHED BATHROOM */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>ATTACHED BATHROOM</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {attachedBathroom?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`attachedBathroom-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`attachedBathroom.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`attachedBathroom-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`attachedBathroom.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`attachedBathroom-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.quantity}
                            {...register(`attachedBathroom.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-8 w-8"
                              onClick={() => attachedBathroomRemove(index)}
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
                                label={'Comments'}
                                id={`attachedBathroom-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`attachedBathroom.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`attachedBathroom-${index}-counterImage`}
                                defaultValue={item?.couter_images}
                                {...register(`attachedBathroom.${index}.counterImage` as const)}
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
                      attachedBathroomAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* KITCHEN */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>KITCHEN</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {kitchen?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`kitchen-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`kitchen.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`kitchen-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`kitchen.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`kitchen-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.quantity}
                            {...register(`kitchen.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon
                              name="trash"
                              className="cursor-pointer h-8 w-8"
                              onClick={() => kitchenRemove(index)}
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
                                label={'Comments'}
                                id={`kitchen-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`kitchen.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`kitchen-${index}-counterImage`}
                                defaultValue={item?.couter_images}
                                {...register(`kitchen.${index}.counterImage` as const)}
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
                      kitchenAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
                      })
                    }>
                    Add More
                  </Button>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* KEYS */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>KEYS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {keys?.map((item: any, index: number) => (
                  <>
                    <div className="mb-4 border border-red-200 p-2 rounded-md shadow-md">
                      <FormControl fullWidth>
                        <div className="flex items-center justify-between">
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-60' : 'w-80 m-2'}
                            id={`keys-${index}-description`}
                            label="Description"
                            defaultValue={item?.description}
                            {...register(`keys.${index}.description` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`keys-${index}-quantity`}
                            label="Quantity"
                            type="number"
                            defaultValue={item?.quantity}
                            {...register(`keys.${index}.quantity` as const)}
                          />
                          <TextField
                            // className={ mutateType !== 'update' ? 'w-56' : 'w-80 m-2'}
                            id={`keys-${index}-remarks`}
                            label="Remarks"
                            defaultValue={item?.quantity}
                            {...register(`keys.${index}.remarks` as const)}
                          />
                          {mutateType !== 'update' && (
                            <Icon name="trash" className="cursor-pointer h-8 w-8" onClick={() => keysRemove(index)} />
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
                                label={'Comments'}
                                id={`keys-${index}-counterDescription`}
                                defaultValue={item?.counter_comment}
                                {...register(`keys.${index}.counterDescription` as const)}
                              />
                              <TextField
                                className="!ml-2"
                                label={'Upload Counters'}
                                id={`keys-${index}-counterImage`}
                                defaultValue={item?.couter_images}
                                {...register(`keys.${index}.counterImage` as const)}
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
                      keysAppend({
                        description: '',
                        quantity: '',
                        remarks: '',
                        counterDescription: '',
                        counterImage: '',
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

export default Inventory
