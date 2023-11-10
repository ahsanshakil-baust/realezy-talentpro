// import React, { useContext, useEffect } from 'react'
// import { useState } from 'react'
// import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
// import { useForm } from 'react-hook-form'

// import { useSession } from 'next-auth/react'
// import { getToDay } from '@/util/helper'
// import {
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux'
// import { ChatCreate, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
// import store, { hideLoader, hideModal, showLoader, useCreateInventoryMutation } from '@/store'
// import { landlordCreateInventoryList } from '@/const'
// import {
//   INVENTORY_CHECKLIST_SIGNING_CREATE,
//   INVENTORY_CHECKLIST_SIGNING_UPDATE,
// } from '@/store/chatProgress/progress/constant'

// const Inventory = ({ mutateType }: any) => {
//   const { data: session }: any = useSession()
//   const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
//   const receiver =
//     session?.user?.id === payload?.threadInfo?.sender_id
//       ? payload?.threadInfo?.receiver_id
//       : payload?.threadInfo?.sender_id

//   const userId = session?.user?.id

//   const [createInventory, { isError, isLoading, data }] = useCreateInventoryMutation()

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { isValid, isDirty, errors },
//   } = useForm()

//   const [livingValue, setLivingValue] = useState<any[]>([])
//   const [diningValue, setDiningValue] = useState<any[]>([])
//   const [masterBedRoom, setMasterBedroom] = useState<any[]>([])
//   const [bedroomTwo, setBedroomTwo] = useState<any[]>([])
//   const [bedroomThree, setBedroomThree] = useState<any[]>([])
//   const [attachedBathroom, setAttachedBathroom] = useState<any[]>([])
//   const [commonToilet, setCommonToilet] = useState<any[]>([])
//   const [kitchen, setKitchen] = useState<any[]>([])
//   const [inKeys, setInKeys] = useState<any[]>([])

//   const HandleAddMore = (e: any, purpose: any) => {
//     e.preventDefault()
//     const living = [...livingValue, []]
//     const dining = [...diningValue, []]
//     const master = [...masterBedRoom, []]
//     const roomTwo = [...bedroomTwo, []]
//     const roomThree = [...bedroomThree, []]
//     const attached_bathroom = [...attachedBathroom, []]
//     const common_Toilet = [...commonToilet, []]
//     const common_kitchen = [...kitchen, []]
//     const common_keys = [...inKeys, []]

//     if (purpose == 'living_area') {
//       if (living.length < 6) {
//         setLivingValue(living)
//       }
//     } else if (purpose == 'dining_area') {
//       if (dining.length < 6) {
//         setDiningValue(dining)
//       }
//     } else if (purpose == 'master_bedroom') {
//       if (master.length < 6) {
//         setMasterBedroom(master)
//       }
//     } else if (purpose == 'bedroom_two') {
//       if (roomTwo.length < 6) {
//         setBedroomTwo(roomTwo)
//       }
//     } else if (purpose == 'bedroom_three') {
//       if (roomThree.length < 6) {
//         setBedroomThree(roomThree)
//       }
//     } else if (purpose == 'attached_bathroom') {
//       if (attached_bathroom.length < 6) {
//         setAttachedBathroom(attached_bathroom)
//       }
//     } else if (purpose == 'common_bathroom') {
//       if (common_Toilet.length < 6) {
//         setCommonToilet(common_Toilet)
//       }
//     } else if (purpose == 'kitchen') {
//       if (common_kitchen.length < 6) {
//         setKitchen(common_kitchen)
//       }
//     } else if (purpose == 'keys') {
//       if (common_keys.length < 6) {
//         setInKeys(common_keys)
//       }
//     }
//   }

//   const HandleReduceMore = (e: any, index: any) => {
//     e.preventDefault()
//     const livingElement = livingValue.filter(item => livingValue.indexOf(item) !== index)
//     setLivingValue(livingElement)

//     const diningElement = diningValue.filter(item => diningValue.indexOf(item) !== index)
//     setDiningValue(diningElement)

//     const masterElement = masterBedRoom.filter(item => masterBedRoom.indexOf(item) !== index)
//     setMasterBedroom(masterElement)

//     const bedroomElementTwo = bedroomTwo.filter(item => bedroomTwo.indexOf(item) !== index)
//     setBedroomTwo(bedroomElementTwo)

//     const bedroomElementThree = bedroomThree.filter(item => bedroomThree.indexOf(item) !== index)
//     setBedroomThree(bedroomElementThree)

//     const attachedBathroomElement = attachedBathroom.filter(item => attachedBathroom.indexOf(item) !== index)
//     setAttachedBathroom(attachedBathroomElement)

//     const common_Toilet = commonToilet.filter(item => commonToilet.indexOf(item) !== index)
//     setCommonToilet(common_Toilet)

//     const common_kitchen = kitchen.filter(item => kitchen.indexOf(item) !== index)
//     setKitchen(common_kitchen)

//     const in_keys = inKeys.filter(item => inKeys.indexOf(item) !== index)
//     setInKeys(in_keys)
//   }

//   const generateInventoryData = (nameData: any, qtyData: any, textData: any) => {
//     let inventoryData: any = []
//     nameData.forEach((item: any, index: any) => {
//       inventoryData.push({
//         description: nameData[index],
//         quantity: qtyData[index],
//         remarks: textData[index],
//       })
//     })
//     return inventoryData
//   }

//   const dispatch = useDispatch()

//   const HandleInventoryList = async (data: any) => {
//     if (data.living_name || data.living_qty || data.living_text !== '') {
//       const inventoryFormData = {
//         property_id: payload.threadInfo?.property_id,
//         property_address: payload?.tenantLandlordProgressInfo?.propertyInfo?.property_address,
//         living_area: generateInventoryData(data.living_name, data.living_qty, data.living_text),
//         dining_area: generateInventoryData(data.dining_name, data.dining_qty, data.dining_text),
//         master_bedroom: generateInventoryData(data.master_bed_name, data.master_bed_qty, data.master_bed_text),
//         bedroom2: generateInventoryData(data.bed_two_name, data.bed_two_qty, data.bed_two_text),
//         bedroom3: generateInventoryData(data.bed_three_name, data.bed_three_qty, data.bed_three_text),
//         attached_bathroom: generateInventoryData(
//           data.attached_bath_name,
//           data.attached_bath_qty,
//           data.attached_bath_text
//         ),
//         common_toilet: generateInventoryData(data.common_toilet_name, data.common_toilet_qty, data.common_toilet_text),
//         kitchen: generateInventoryData(data.kitchen_name, data.kitchen_qty, data.kitchen_text),
//         keys: generateInventoryData(data.keys_name, data.keys_qty, data.keys_text),
//         tenant_sig_date: getToDay(),
//         tenant_witness_sig_date: getToDay(),
//         landlord_sig_date: getToDay(),
//         landlord_witness_sig_date: getToDay(),
//         tenant_sig: '',
//         landlord_sig: '',
//         agreement_id: payload?.tenantLandlordProgressInfo?.propertyInfo?.agreement?.id,
//       }

//       store.dispatch(hideModal(INVENTORY_CHECKLIST_SIGNING_CREATE))

//       dispatch(showLoader('Creating Inventory List'))
//       console.log('inventory form data', inventoryFormData)
//       const { data: response }: any = await createInventory(inventoryFormData)
//       console.log(`🚀 ~ file: Inventory.tsx:174 ~ HandleInventoryList ~ response:`, response)
//       dispatch(hideLoader())

//       ChatCreate(
//         landlordCreateInventoryList,
//         'RZY',
//         payload.threadInfo?.property_id,
//         receiver,
//         payload.threadInfo?.id,
//         'RZYADMIN',
//         ''
//       )

//       const updatedData = {
//         instruction: 'Not yet',
//         is_landlord_sign: false,
//         is_tenant_sign: false,
//         progress_status: false,
//         status: 'List Created',
//       }

//       updateTenantProgress(
//         `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
//         'itemChecklist',
//         updatedData
//       )

//       updateLandlordProgress(
//         `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
//         'itemChecklist',
//         updatedData
//       )
//       dispatch(hideModal(INVENTORY_CHECKLIST_SIGNING_CREATE))
//     }
//   }

//   //   const isSubmitDisabled = isSpinner || !isDirty

//   return (
//     <div className="m-auto w-full max-h-[690px] overflow-auto p-5 ">
//       <form onSubmit={handleSubmit(HandleInventoryList)} className="h-auto">
//         <div>
//           <h5 className="font-semibold">Property Address</h5>
//           <Paper className="my-3">
//             <TextField
//               defaultValue={'property_address'}
//               {...register('inventory_description')}
//               variant="outlined"
//               fullWidth
//               multiline
//               minRows={3}
//               size="small"
//             />
//           </Paper>
//         </div>
//         <div className="mb-3">
//           <div>
//             <h5 className="font-semibold mb-3">Living Area</h5>
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Description</TableCell>
//                     <TableCell align="right">Qty</TableCell>
//                     <TableCell align="right">Remarks</TableCell>
//                     <TableCell align="right">
//                       <button
//                         className="text-success border-0"
//                         style={{ backgroundColor: 'transparent' }}
//                         onClick={e => {
//                           HandleAddMore(e, 'living_area')
//                         }}>
//                         <FaPlusCircle />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                     <TableCell data-label="Description" component="th" scope="row">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('living_name[0]')} />
//                     </TableCell>
//                     <TableCell data-label="Qty" align="right">
//                       <input className="w-full p-1 rounded border" type="number" id="" {...register('living_qty[0]')} />
//                     </TableCell>
//                     <TableCell data-label="Remarks" align="right">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('living_text[0]')} />
//                     </TableCell>
//                   </TableRow>

//                   {livingValue.map((value, i) => {
//                     return (
//                       <>
//                         <TableRow>
//                           <TableCell data-label="Description">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`living_name[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Qty">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="number"
//                               id=""
//                               {...register(`living_qty[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Remarks">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`living_text[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="">
//                             <button
//                               className="text-danger border-0 d-flex fw-bold"
//                               style={{ backgroundColor: 'transparent' }}
//                               onClick={e => HandleReduceMore(e, i)}>
//                               <FaMinusCircle />
//                             </button>
//                           </TableCell>
//                         </TableRow>
//                       </>
//                     )
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>

//         <div>
//           <h5 className="font-semibold mb-3">Dining Area</h5>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Description</TableCell>
//                   <TableCell align="right">Qty</TableCell>
//                   <TableCell align="right">Remarks</TableCell>
//                   <TableCell align="right">
//                     <button
//                       className="text-success border-0"
//                       style={{ backgroundColor: 'transparent' }}
//                       onClick={e => {
//                         HandleAddMore(e, 'dining_area')
//                       }}>
//                       <FaPlusCircle />
//                     </button>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell data-label="Description" component="th" scope="row">
//                     <input className="w-full p-1 rounded border" type="text" id="" {...register('dining_name[0]')} />
//                   </TableCell>
//                   <TableCell data-label="Qty" align="right">
//                     <input className="w-full p-1 rounded border" type="number" id="" {...register('dining_qty[0]')} />
//                   </TableCell>
//                   <TableCell data-label="Remarks" align="right">
//                     <input className="w-full p-1 rounded border" type="text" id="" {...register('dining_text[0]')} />
//                   </TableCell>
//                 </TableRow>

//                 {diningValue.map((value, i) => {
//                   return (
//                     <>
//                       <TableRow>
//                         <TableCell data-label="Description">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="text"
//                             id=""
//                             {...register(`dining_name[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="Qty">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="number"
//                             id=""
//                             {...register(`dining_qty[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="Remarks">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="text"
//                             id=""
//                             {...register(`dining_text[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="">
//                           <button
//                             className="text-danger border-0 d-flex fw-bold"
//                             style={{ backgroundColor: 'transparent' }}
//                             onClick={e => HandleReduceMore(e, i)}>
//                             <FaMinusCircle />
//                           </button>
//                         </TableCell>
//                       </TableRow>
//                     </>
//                   )
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>

//         <div>
//           <h5 className="font-semibold mb-3">Master Bedroom</h5>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Description</TableCell>
//                   <TableCell align="right">Qty</TableCell>
//                   <TableCell align="right">Remarks</TableCell>
//                   <TableCell align="right">
//                     <button
//                       className="text-success border-0"
//                       style={{ backgroundColor: 'transparent' }}
//                       onClick={e => {
//                         HandleAddMore(e, 'master_bedroom')
//                       }}>
//                       <FaPlusCircle />
//                     </button>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell data-label="Description" component="th" scope="row">
//                     <input
//                       className="w-full p-1 rounded border"
//                       type="text"
//                       id=""
//                       {...register('master_bed_name[0]')}
//                     />
//                   </TableCell>
//                   <TableCell data-label="Qty" align="right">
//                     <input
//                       className="w-full p-1 rounded border"
//                       type="number"
//                       id=""
//                       {...register('master_bed_qty[0]')}
//                     />
//                   </TableCell>
//                   <TableCell data-label="Remarks" align="right">
//                     <input
//                       className="w-full p-1 rounded border"
//                       type="text"
//                       id=""
//                       {...register('master_bed_text[0]')}
//                     />
//                   </TableCell>
//                 </TableRow>

//                 {masterBedRoom.map((value, i) => {
//                   return (
//                     <>
//                       <TableRow>
//                         <TableCell data-label="Description">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="text"
//                             id=""
//                             {...register(`master_bed_name[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="Qty">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="number"
//                             id=""
//                             {...register(`master_bed_qty[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="Remarks">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="text"
//                             id=""
//                             {...register(`master_bed_text[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="">
//                           <button
//                             className="text-danger border-0 d-flex fw-bold"
//                             style={{ backgroundColor: 'transparent' }}
//                             onClick={e => HandleReduceMore(e, i)}>
//                             <FaMinusCircle />
//                           </button>
//                         </TableCell>
//                       </TableRow>
//                     </>
//                   )
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>

//         <div>
//           <div>
//             <h5 className="font-semibold mb-3">Bedroom Two</h5>

//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Description</TableCell>
//                     <TableCell align="right">Qty</TableCell>
//                     <TableCell align="right">Remarks</TableCell>
//                     <TableCell align="right">
//                       <button
//                         className="text-success border-0"
//                         style={{ backgroundColor: 'transparent' }}
//                         onClick={e => {
//                           HandleAddMore(e, 'bedroom_two')
//                         }}>
//                         <FaPlusCircle />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                     <TableCell data-label="Description" component="th" scope="row">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('bed_two_name[0]')} />
//                     </TableCell>
//                     <TableCell data-label="Qty" align="right">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="number"
//                         id=""
//                         {...register('bed_two_qty[0]')}
//                       />
//                     </TableCell>
//                     <TableCell data-label="Remarks" align="right">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('bed_two_text[0]')} />
//                     </TableCell>
//                   </TableRow>

//                   {bedroomTwo.map((value, i) => {
//                     return (
//                       <>
//                         <TableRow>
//                           <TableCell data-label="Description">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`bed_two_name[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Qty">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="number"
//                               id=""
//                               {...register(`bed_two_qty[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Remarks">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`bed_two_text[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="">
//                             <button
//                               className="text-danger border-0 d-flex fw-bold"
//                               style={{ backgroundColor: 'transparent' }}
//                               onClick={e => HandleReduceMore(e, i)}>
//                               <FaMinusCircle />
//                             </button>
//                           </TableCell>
//                         </TableRow>
//                       </>
//                     )
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>

//         <div>
//           <h5 className="font-semibold mb-3">Bedroom Three</h5>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Description</TableCell>
//                   <TableCell align="right">Qty</TableCell>
//                   <TableCell align="right">Remarks</TableCell>
//                   <TableCell align="right">
//                     <button
//                       className="text-success border-0"
//                       style={{ backgroundColor: 'transparent' }}
//                       onClick={e => {
//                         HandleAddMore(e, 'bedroom_three')
//                       }}>
//                       <FaPlusCircle />
//                     </button>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell data-label="Description" component="th" scope="row">
//                     <input className="w-full p-1 rounded border" type="text" id="" {...register('bed_three_name[0]')} />
//                   </TableCell>
//                   <TableCell data-label="Qty" align="right">
//                     <input
//                       className="w-full p-1 rounded border"
//                       type="number"
//                       id=""
//                       {...register('bed_three_qty[0]')}
//                     />
//                   </TableCell>
//                   <TableCell data-label="Remarks" align="right">
//                     <input className="w-full p-1 rounded border" type="text" id="" {...register('bed_three_text[0]')} />
//                   </TableCell>
//                 </TableRow>

//                 {bedroomThree.map((value, i) => {
//                   return (
//                     <>
//                       <TableRow>
//                         <TableCell data-label="Description">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="text"
//                             id=""
//                             {...register(`bed_three_name[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="Qty">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="number"
//                             id=""
//                             {...register(`bed_three_qty[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="Remarks">
//                           <input
//                             className="w-full p-1 rounded border"
//                             type="text"
//                             id=""
//                             {...register(`bed_three_text[${i + 1}]`)}
//                           />
//                         </TableCell>
//                         <TableCell data-label="">
//                           <button
//                             className="text-danger border-0 d-flex fw-bold"
//                             style={{ backgroundColor: 'transparent' }}
//                             onClick={e => HandleReduceMore(e, i)}>
//                             <FaMinusCircle />
//                           </button>
//                         </TableCell>
//                       </TableRow>
//                     </>
//                   )
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>

//         <div>
//           <div>
//             <h5 className="font-semibold mb-3">Attached Bathroom</h5>
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Description</TableCell>
//                     <TableCell align="right">Qty</TableCell>
//                     <TableCell align="right">Remarks</TableCell>
//                     <TableCell align="right">
//                       <button
//                         className="text-success border-0"
//                         style={{ backgroundColor: 'transparent' }}
//                         onClick={e => {
//                           HandleAddMore(e, 'attached_bathroom')
//                         }}>
//                         <FaPlusCircle />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                     <TableCell data-label="Description" component="th" scope="row">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="text"
//                         id=""
//                         {...register('attached_bath_name[0]')}
//                       />
//                     </TableCell>
//                     <TableCell data-label="Qty" align="right">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="number"
//                         id=""
//                         {...register('attached_bath_qty[0]')}
//                       />
//                     </TableCell>
//                     <TableCell data-label="Remarks" align="right">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="text"
//                         id=""
//                         {...register('attached_bath_text[0]')}
//                       />
//                     </TableCell>
//                   </TableRow>

//                   {attachedBathroom.map((value, i) => {
//                     return (
//                       <>
//                         <TableRow>
//                           <TableCell data-label="Description">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`attached_bath_name[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Qty">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="number"
//                               id=""
//                               {...register(`attached_bath_qty[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Remarks">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`attached_bath_text[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="">
//                             <button
//                               className="text-danger border-0 d-flex fw-bold"
//                               style={{ backgroundColor: 'transparent' }}
//                               onClick={e => HandleReduceMore(e, i)}>
//                               <FaMinusCircle />
//                             </button>
//                           </TableCell>
//                         </TableRow>
//                       </>
//                     )
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//         <div>
//           <div>
//             <h5 className="font-semibold mb-3">Common toilet</h5>
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Description</TableCell>
//                     <TableCell align="right">Qty</TableCell>
//                     <TableCell align="right">Remarks</TableCell>
//                     <TableCell align="right">
//                       <button
//                         className="text-success border-0"
//                         style={{ backgroundColor: 'transparent' }}
//                         onClick={e => {
//                           HandleAddMore(e, 'common_bathroom')
//                         }}>
//                         <FaPlusCircle />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                     <TableCell data-label="Description" component="th" scope="row">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="text"
//                         id=""
//                         {...register('common_toilet_name[0]')}
//                       />
//                     </TableCell>
//                     <TableCell data-label="Qty" align="right">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="number"
//                         id=""
//                         {...register('common_toilet_qty[0]')}
//                       />
//                     </TableCell>
//                     <TableCell data-label="Remarks" align="right">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="text"
//                         id=""
//                         {...register('common_toilet_text[0]')}
//                       />
//                     </TableCell>
//                   </TableRow>

//                   {commonToilet.map((value, i) => {
//                     return (
//                       <>
//                         <TableRow>
//                           <TableCell data-label="Description">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`common_toilet_name[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Qty">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="number"
//                               id=""
//                               {...register(`common_toilet_qty[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Remarks">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`common_toilet_text[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="">
//                             <button
//                               className="text-danger border-0 d-flex fw-bold"
//                               style={{ backgroundColor: 'transparent' }}
//                               onClick={e => HandleReduceMore(e, i)}>
//                               <FaMinusCircle />
//                             </button>
//                           </TableCell>
//                         </TableRow>
//                       </>
//                     )
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//         <div>
//           <div>
//             <h5 className="font-semibold mb-3">Kitchen</h5>

//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Description</TableCell>
//                     <TableCell align="right">Qty</TableCell>
//                     <TableCell align="right">Remarks</TableCell>
//                     <TableCell align="right">
//                       <button
//                         className="text-success border-0"
//                         style={{ backgroundColor: 'transparent' }}
//                         onClick={e => {
//                           HandleAddMore(e, 'kitchen')
//                         }}>
//                         <FaPlusCircle />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                     <TableCell data-label="Description" component="th" scope="row">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('kitchen_name[0]')} />
//                     </TableCell>
//                     <TableCell data-label="Qty" align="right">
//                       <input
//                         className="w-full p-1 rounded border"
//                         type="number"
//                         id=""
//                         {...register('kitchen_qty[0]')}
//                       />
//                     </TableCell>
//                     <TableCell data-label="Remarks" align="right">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('kitchen_text[0]')} />
//                     </TableCell>
//                   </TableRow>

//                   {kitchen.map((value, i) => {
//                     return (
//                       <>
//                         <TableRow>
//                           <TableCell data-label="Description">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`kitchen_name[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Qty">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="number"
//                               id=""
//                               {...register(`kitchen_qty[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Remarks">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`kitchen_text[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="">
//                             <button
//                               className="text-danger border-0 d-flex fw-bold"
//                               style={{ backgroundColor: 'transparent' }}
//                               onClick={e => HandleReduceMore(e, i)}>
//                               <FaMinusCircle />
//                             </button>
//                           </TableCell>
//                         </TableRow>
//                       </>
//                     )
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>

//         <div>
//           <div>
//             <h5 className="font-semibold mb-3">Keys</h5>

//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Description</TableCell>
//                     <TableCell align="right">Qty</TableCell>
//                     <TableCell align="right">Remarks</TableCell>
//                     <TableCell align="right">
//                       <button
//                         className="text-success border-0"
//                         style={{ backgroundColor: 'transparent' }}
//                         onClick={e => {
//                           HandleAddMore(e, 'keys')
//                         }}>
//                         <FaPlusCircle />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                     <TableCell data-label="Description" component="th" scope="row">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('keys_name[0]')} />
//                     </TableCell>
//                     <TableCell data-label="Qty" align="right">
//                       <input className="w-full p-1 rounded border" type="number" id="" {...register('keys_qty[0]')} />
//                     </TableCell>
//                     <TableCell data-label="Remarks" align="right">
//                       <input className="w-full p-1 rounded border" type="text" id="" {...register('keys_text[0]')} />
//                     </TableCell>
//                   </TableRow>

//                   {inKeys.map((value, i) => {
//                     return (
//                       <>
//                         <TableRow>
//                           <TableCell data-label="Description">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`keys_name[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Qty">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="number"
//                               id=""
//                               {...register(`keys_qty[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="Remarks">
//                             <input
//                               className="w-full p-1 rounded border"
//                               type="text"
//                               id=""
//                               {...register(`keys_text[${i + 1}]`)}
//                             />
//                           </TableCell>
//                           <TableCell data-label="">
//                             <button
//                               className="text-danger border-0 d-flex fw-bold"
//                               style={{ backgroundColor: 'transparent' }}
//                               onClick={e => HandleReduceMore(e, i)}>
//                               <FaMinusCircle />
//                             </button>
//                           </TableCell>
//                         </TableRow>
//                       </>
//                     )
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//         <div className="rental-proposal-submit-btn-cont mt-2">
//           <Button
//             variant="contained"
//             className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]"
//             type="submit">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Inventory

import React from 'react'

const Inventory = () => {
  return (
    <div>Inventory</div>
  )
}

export default Inventory
