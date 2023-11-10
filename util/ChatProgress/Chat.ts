// import { async } from "@firebase/util"
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  // getDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import {
  CHAT_COLLECTION,
  CONVERSATION_COLLECTION,
  LANDLORD_PROGRESS_COLLECTION,
  PRIVATE_CHAT_COLLECTION,
  PRIVATE_MESSENGER,
  TENANT_PROGRESS_COLLECTION,
} from '@/const'
// import { getTimestamp } from "../helper"
function getTimestamp() {
  let timestamp = Date.now()

  return timestamp.toString()
}

function getToDay() {
  let today = new Date()
  let dayBeforeOrNext = new Date(today)
  dayBeforeOrNext.setDate(today.getDate() + 0)
  let date: any = dayBeforeOrNext
  var dd: any = date.getDate()
  var mm: any = date.getMonth() + 1
  var yyyy = date.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  date = yyyy + '-' + mm + '-' + dd
  return date
}

// Chat Create
export const ChatCreate = async (
  chatText: string,
  chatSenderID: string,
  propertyID: string,
  receiverID: string,
  threadID: string,
  chatType: string,
  appointmentId: string,
  schedulePurpose = ''
): Promise<void> => {
  let timestamp = Date.now()
  try {
    const docRef: any = await setDoc(doc(db, CHAT_COLLECTION, threadID, threadID, getTimestamp()), {
      appointmentId: appointmentId.toString(),
      chatId: timestamp.toString(),
      chatSenderId: chatSenderID,
      chatType: chatType,
      media: null,
      message: chatText,
      propertyId: propertyID,
      receiverId: receiverID,
      seen: false,
      threadId: threadID,
      time: timestamp.toString(),
      isDeleted: false,
      isNewInChat: false,
      schedulePurpose: schedulePurpose,
    })

  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const privateChatCreate = async (adminId: string, threadId: string, userId: string, privateMessage: string): Promise<void> => {
  let timestamp = Date.now()
  threadId = threadId ? threadId : `${userId}-rzyThread`

  try {
    const docRef: any = await setDoc(doc(db, PRIVATE_MESSENGER, threadId, threadId, getTimestamp()), {
      adminId: adminId,
      customerId: userId,
      isDeleted: false,
      media: '',
      message: privateMessage,
      messageFrom: 'CUSTOMER',
      messageId: timestamp.toString(),
      messageType: 'GENERAL',
      seen: false,
      threadId: threadId,
      time: timestamp.toString(),
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const privateConversationCreate = async (
  threadId: string,
  userId: string,
  privateMessage: string
): Promise<void> => {
  let timestamp = Date.now()
  threadId = threadId ? threadId : `${userId}-rzyThread`

  try {
    const docRef: any = await setDoc(doc(db, PRIVATE_CHAT_COLLECTION, userId, userId, threadId), {
      adminId: '',
      csaName: [],
      lastMessage: privateMessage,
      customerId: userId,
      read: false,
      threadId: threadId,
      time: timestamp.toString(),
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const updateTenantProgress = async (
  tenantProgressId: string = '',
  stepName: string = '',
  updatedData: any = ''
): Promise<void> => {
  // console.log(
  //   `🚀 ~ file: Chat.js ~ line 34 ~ updateTenantProgress ~ updatedData`,
  //   updatedData
  // )

  switch (stepName) {
    case 'contactTenant':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          contactTenant: true,
        })
      } catch (e: any) {
        console.error('Error adding document: ', e)
      }
      break
    case 'viewingScheduleConfirmed':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          viewingScheduleConfirmed: {
            selected_time: updatedData.selected_time,
            inviterId: updatedData.inviterId,
            id: updatedData.id,
            time: updatedData.time,
            selected_date: updatedData.selected_date,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
            purpose: updatedData.purpose,
          },
        })
      } catch (e: any) {
        console.error('Error adding document: ', e)
      }
      break

      case 'insurancePackage':
        try {
          const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
          await updateDoc(docRef, {
            insurancePackage: {
              instruction: updatedData.instruction,
              progress_status: updatedData.progress_status,
              status: updatedData.status,
            },
          })
        } catch (e) {
          console.error('Error adding insurance: ', e)
        }
        break

    case 'viewingCompleted':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          viewingCompleted: {
            progress_status: updatedData.progress_status,
            time: updatedData.time,
            interested: updatedData.interested,
          },
        })
      } catch (e: any) {
        console.error('Error adding document: ', e)
      }
      break

    case 'rzyServiceFee':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          rzyServiceFee: {
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e: any) {
        console.error('Error occurs in rzyServiceFee: ', e.message)
      }
      break

    case 'rentOffer':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          rentOffer: {
            id: updatedData.id,
            accepted: updatedData.accepted,
            offer_amount: updatedData.offer_amount,
            inviter_id: updatedData.inviter_id,
            tenancy_period: updatedData.tenancy_period,
            commencement_date: updatedData.commencement_date,
            additional_request: updatedData.additional_request,
            creator: updatedData.creator,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'payBookingFee':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          payBookingFee: {
            amount: updatedData.amount,
            is_booking_by_others: updatedData.is_booking_by_others,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'hdbApproval':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          hdbApproval: {
            instruction: updatedData.instruction,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'occupiers':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          occupiers: {
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'creditReportInfo':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          creditReportInfo: {
            instruction: updatedData.instruction,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'tenancyAgreement':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          tenancyAgreement: {
            id: updatedData.id,
            instruction: updatedData.instruction,
            landLord_signed: updatedData.landLord_signed,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
            tenant_signed: updatedData.tenant_signed,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'itemChecklist':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          itemChecklist: {
            instruction: updatedData.instruction,
            is_landlord_sign: updatedData.is_landlord_sign,
            is_tenant_sign: updatedData.is_tenant_sign,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'propertyCondition':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          propertyCondition: {
            instruction: updatedData.instruction,
            is_landlord_sign: updatedData.is_landlord_sign,
            is_tenant_sign: updatedData.is_tenant_sign,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'firstMonthRental':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          firstMonthRental: {
            amount: updatedData.amount,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
            time: '',
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'keyHandover':
      try {
        const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId)
        await updateDoc(docRef, {
          keyHandover: {
            selected_time: updatedData.selected_time,
            inviterId: updatedData.inviterId,
            id: updatedData.id,
            time: updatedData.time,
            selected_date: updatedData.selected_date,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
            purpose: updatedData.purpose,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    default:
    // code block
  }
}

// UPDATE LANDLORD PROGRESS

export const updateLandlordProgress = async (landlordProgressId: any, stepName: any, updatedData: any) => {
  switch (stepName) {
    case 'contactTenant':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          contactTenant: true,
        })
      } catch (e: any) {
        console.error('Error adding document: ', e)
      }
      break
    case 'occupiers':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          occupiers: {
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e: any) {
        console.error('Error adding document: ', e)
      }
      break

    case 'rzyServiceFee':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          rzyServiceFee: {
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e: any) {
        console.error('Error adding document: ', e)
      }
      break

    case 'viewingScheduleConfirmed':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          viewingScheduleConfirmed: {
            selected_time: updatedData.selected_time,
            inviterId: updatedData.inviterId,
            id: updatedData.id,
            time: updatedData.time,
            selected_date: updatedData.selected_date,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
            purpose: updatedData.purpose,
          },
        })
      } catch (e: any) {
        console.error('Error adding document: ', e)
      }
      break

    case 'rentOffer':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          rentOffer: {
            id: updatedData.id,
            accepted: updatedData.accepted,
            offer_amount: updatedData.offer_amount,
            inviter_id: updatedData.inviter_id,
            tenancy_period: updatedData.tenancy_period,
            commencement_date: updatedData.commencement_date,
            additional_request: updatedData.additional_request,
            creator: updatedData.creator,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'viewingCompleted':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          viewingCompleted: {
            progress_status: updatedData.progress_status,
            time: updatedData.time,
            interested: updatedData.interested,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'payBookingFee':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          payBookingFee: {
            amount: updatedData.amount,
            is_booking_by_others: updatedData.is_booking_by_others,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'hdbApproval':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          hdbApproval: {
            instruction: updatedData.instruction,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
        // console.log(
        //   `Reference: ${docRef}`,
        //   `Updated Data: ${updatedData.progress}`,
        //   `Status: ${updatedData.status}`

        // )
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'creditReportInfo':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          creditReportInfo: {
            instruction: updatedData.instruction,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'tenancyAgreement':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          tenancyAgreement: {
            id: updatedData.id,
            instruction: updatedData.instruction,
            landLord_signed: updatedData.landLord_signed,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
            tenant_signed: updatedData.tenant_signed,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'itemChecklist':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          itemChecklist: {
            instruction: updatedData.instruction,
            is_landlord_sign: updatedData.is_landlord_sign,
            is_tenant_sign: updatedData.is_tenant_sign,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'propertyCondition':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          propertyCondition: {
            instruction: updatedData.instruction,
            is_landlord_sign: updatedData.is_landlord_sign,
            is_tenant_sign: updatedData.is_tenant_sign,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break

    case 'firstMonthRental':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          firstMonthRental: {
            amount: updatedData.amount,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
            time: '',
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'signAgreement':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          signAgreement: {
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    case 'insurancePackage':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          insurancePackage: {
            instruction: updatedData.instruction,
            progress_status: updatedData.progress_status,
            status: updatedData.status,
          },
        })
      } catch (e) {
        console.error('Error adding insurance: ', e)
      }
      break
    case 'keyHandover':
      try {
        const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId)
        await updateDoc(docRef, {
          keyHandover: {
            selected_time: updatedData.selected_time,
            inviterId: updatedData.inviterId,
            id: updatedData.id,
            time: updatedData.time,
            selected_date: updatedData.selected_date,
            status: updatedData.status,
            progress_status: updatedData.progress_status,
            purpose: updatedData.purpose,
          },
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
      break
    default:
    // code block
  }
}

export const updateConversation = async (userId: any, activeThreadId: any, context: any, textMessage: any) => {
  await updateDoc(doc(db, CONVERSATION_COLLECTION, userId, userId, activeThreadId), {
    ConversationName:
      userId == context?.value?.threadInfo?.receiver_id
        ? context?.value?.threadInfo.sender_info.sender_name
        : context?.value?.threadInfo.receiver_info.receiver_name,
    conversationImage:
      userId == context?.value?.threadInfo.receiver_id
        ? context?.value?.threadInfo.sender_info.sender_image
        : context?.value?.threadInfo.receiver_info.receiver_image,

    // ConversationName: context?.value?.threadInfo.sender_info.sender_name,
    // conversationImage: context?.value?.threadInfo.sender_info.sender_image,
    date: getToDay(),
    id: context?.value?.threadInfo.id,
    inChat: false,
    isNew: false,
    isOnline: true,
    lastMessage: textMessage,
    propertyId: context?.value?.threadInfo?.property_info?.property_id,
    propertyImage: context?.value?.threadInfo?.property_info?.property_image,
    propertyName: context?.value?.threadInfo?.property_info?.property_name,
    read: false,
    receiverId: context?.value?.threadInfo?.receiver_id,
    receiverImage: context?.value?.threadInfo.receiver_info.receiver_image,
    receiverName: context?.value?.threadInfo.receiver_info.receiver_name,
    senderId: context?.value?.threadInfo.sender_id,
    senderImage: context?.value?.threadInfo.sender_info.sender_image,
    senderName: context?.value?.threadInfo.sender_info.sender_name,
    time: parseInt(getTimestamp()),
  })
}

export const updateConversationNew = async (
  senderInfo: any,
  activeThreadId: any,
  receiverInfo: any,
  textMessage: any
) => {
  await updateDoc(doc(db, CONVERSATION_COLLECTION, senderInfo.id, senderInfo.id, activeThreadId), {
    ConversationName: receiverInfo.name,
    conversationImage: receiverInfo.image,
    date: getToDay(),
    id: activeThreadId,
    inChat: false,
    isNew: false,
    isOnline: true,
    lastMessage: textMessage,
    read: false,
    receiverId: receiverInfo.id,
    receiverImage: receiverInfo.image,
    receiverName: receiverInfo.name,
    senderId: senderInfo.id,
    senderImage: senderInfo.image,
    senderName: senderInfo.name,
    time: parseInt(getTimestamp()),
  })
  await updateDoc(doc(db, CONVERSATION_COLLECTION, receiverInfo.id, receiverInfo.id, activeThreadId), {
    ConversationName: senderInfo.name,
    conversationImage: senderInfo.image,
    date: getToDay(),
    id: activeThreadId,
    inChat: false,
    isNew: false,
    isOnline: true,
    lastMessage: textMessage,
    read: false,
    receiverId: senderInfo.id,
    receiverImage: senderInfo.image,
    receiverName: senderInfo.name,
    senderId: receiverInfo.id,
    senderImage: receiverInfo.image,
    senderName: receiverInfo.name,
    time: parseInt(getTimestamp()),
  })
}
export const updatePrivateConversationNew = async (
  threadInfo: any
) => {
  console.log(threadInfo)
  // await updateDoc(doc(db, CONVERSATION_COLLECTION, senderInfo.id, senderInfo.id, activeThreadId), {
  //   ConversationName: receiverInfo.name,
  //   conversationImage: receiverInfo.image,
  //   date: getToDay(),
  //   id: activeThreadId,
  //   inChat: false,
  //   isNew: false,
  //   isOnline: true,
  //   lastMessage: textMessage,
  //   read: false,
  //   receiverId: receiverInfo.id,
  //   receiverImage: receiverInfo.image,
  //   receiverName: receiverInfo.name,
  //   senderId: senderInfo.id,
  //   senderImage: senderInfo.image,
  //   senderName: senderInfo.name,
  //   time: parseInt(getTimestamp()),
  // })
  // await updateDoc(doc(db, CONVERSATION_COLLECTION, receiverInfo.id, receiverInfo.id, activeThreadId), {
  //   ConversationName: senderInfo.name,
  //   conversationImage: senderInfo.image,
  //   date: getToDay(),
  //   id: activeThreadId,
  //   inChat: false,
  //   isNew: false,
  //   isOnline: true,
  //   lastMessage: textMessage,
  //   read: false,
  //   receiverId: senderInfo.id,
  //   receiverImage: senderInfo.image,
  //   receiverName: senderInfo.name,
  //   senderId: receiverInfo.id,
  //   senderImage: receiverInfo.image,
  //   senderName: receiverInfo.name,
  //   time: parseInt(getTimestamp()),
  // })
}

export const fireStoreSaveDocument = async (collectionName: any) => {
  const docRef = await addDoc(collection(db, collectionName), {
    id: getTimestamp(),
  })
}
