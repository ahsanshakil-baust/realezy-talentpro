import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { ADMIN_COLLECTION, CONVERSATION_COLLECTION, PRIVATE_CHAT_COLLECTION } from '@/const'

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

const useConversationList = (userId: any, selectedThreadId: any) => {
  const [chatThreadsList, setChatThreadsList] = useState([])
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (!userId) return
    const docRef = collection(db, CONVERSATION_COLLECTION, userId, userId)
    const unsubscribe = onSnapshot(docRef, querySnapshot => {
      const chatThreads: any = []
      querySnapshot.forEach((doc: any) => {
        const data = doc.data()
        if (data.lastMessage === '') {
          if(data.id == selectedThreadId) chatThreads.push(data);
        } else {
          chatThreads.push(data)
        }
      })
      setChatThreadsList(chatThreads)
      setLength(chatThreads.length + 1)
    })

    return unsubscribe
  }, [userId])

  return [chatThreadsList, length]
}

const usePrivateChatCollection = (userId: any) => {
  const [privateChatCollection, setPrivateChatCollection] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = collection(db, PRIVATE_CHAT_COLLECTION, userId, userId)
        const unsubscribe: any = onSnapshot(docRef, querySnapshot => {
          const chatThreads: any = []
          querySnapshot.forEach(doc => {
            chatThreads.push(doc.data())
          })
          setPrivateChatCollection(chatThreads)
        })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])
  return [privateChatCollection]
}

const useConversationCreate = async (userId: any, activeThreadId: any, threadInfo: any) => {
  try {
    await setDoc(doc(db, CONVERSATION_COLLECTION, userId, userId, activeThreadId), {
      ConversationName:
        userId == threadInfo.receiver_id ? threadInfo.sender_info.sender_name : threadInfo.receiver_info.receiver_name,
      conversationImage:
        userId == threadInfo.receiver_id
          ? threadInfo.sender_info.sender_image
          : threadInfo.receiver_info.receiver_image,
      date: threadInfo.created_at,
      id: threadInfo.id,
      inChat: false,
      isNew: false,
      isOnline: true,
      lastMessage: '',
      propertyId: threadInfo.property_info.property_id,
      propertyImage: threadInfo.property_info.property_image,
      propertyName: threadInfo.property_info.property_name,
      read: false,
      receiverId: threadInfo.receiver_id,
      receiverImage: threadInfo.receiver_info.receiver_image,
      receiverName: threadInfo.receiver_info.receiver_name,
      senderId: threadInfo.sender_id,
      senderImage: threadInfo.sender_info.sender_image,
      senderName: threadInfo.sender_info.sender_name,
      time: parseInt(getTimestamp()),
    })

    await setDoc(
      doc(
        db,
        CONVERSATION_COLLECTION,
        threadInfo.receiver_id.toString(),
        threadInfo.receiver_id.toString(),
        activeThreadId
      ),
      {
        ConversationName: threadInfo.sender_info.sender_name,
        conversationImage: threadInfo.sender_info.sender_image,
        date: threadInfo.created_at,
        id: threadInfo.id,
        inChat: false,
        isNew: false,
        isOnline: true,
        lastMessage: '',
        propertyId: threadInfo.property_info.property_id,
        propertyImage: threadInfo.property_info.property_image,
        propertyName: threadInfo.property_info.property_name,
        read: false,
        receiverId: threadInfo.receiver_id,
        receiverImage: threadInfo.receiver_info.receiver_image,
        receiverName: threadInfo.receiver_info.receiver_name,
        senderId: threadInfo.sender_id,
        senderImage: threadInfo.sender_info.sender_image,
        senderName: threadInfo.sender_info.sender_name,
        time: parseInt(getTimestamp()),
      }
    )
  } catch (e: any) {
    console.error('Error adding document: ', e)
  }
}

const conversationCreate = async (userId: any, activeThreadId: any, threadInfo: any) => {
  try {
    const tenantData = {
      ConversationName:
        userId == threadInfo.receiver_id ? threadInfo.sender_info.sender_name : threadInfo.receiver_info.receiver_name,
      conversationImage:
        userId == threadInfo.receiver_id
          ? threadInfo.sender_info.sender_image
          : threadInfo.receiver_info.receiver_image,
      date: threadInfo.created_at,
      id: threadInfo.id,
      isDeleted: false,
      inChat: false,
      isNew: false,
      isOnline: true,
      lastMessage: '',
      propertyId: threadInfo.property_info.property_id,
      propertyImage: threadInfo.property_info.property_image,
      propertyName: threadInfo.property_info.property_name,
      read: false,
      receiverId: threadInfo.receiver_id,
      receiverImage: threadInfo.receiver_info.receiver_image,
      receiverName: threadInfo.receiver_info.receiver_name,
      senderId: threadInfo.sender_id,
      senderImage: threadInfo.sender_info.sender_image,
      senderName: threadInfo.sender_info.sender_name,
      time: parseInt(getTimestamp()),
    }
    await setDoc(doc(db, CONVERSATION_COLLECTION, userId, userId, activeThreadId), tenantData)

    const landlordData = {
      ConversationName: threadInfo.sender_info.sender_name,
      conversationImage: threadInfo.sender_info.sender_image,
      date: threadInfo.created_at,
      id: threadInfo.id,
      inChat: false,
      isNew: false,
      isDeleted: false,
      isOnline: true,
      lastMessage: '',
      propertyId: threadInfo.property_info.property_id,
      propertyImage: threadInfo.property_info.property_image,
      propertyName: threadInfo.property_info.property_name,
      read: false,
      receiverId: threadInfo.receiver_id,
      receiverImage: threadInfo.receiver_info.receiver_image,
      receiverName: threadInfo.receiver_info.receiver_name,
      senderId: threadInfo.sender_id,
      senderImage: threadInfo.sender_info.sender_image,
      senderName: threadInfo.sender_info.sender_name,
      time: parseInt(getTimestamp()),
    }

    await setDoc(
      doc(
        db,
        CONVERSATION_COLLECTION,
        threadInfo.receiver_id.toString(),
        threadInfo.receiver_id.toString(),
        activeThreadId
      ),
      landlordData
    )

    const adminData = {
      landlordId: threadInfo.receiver_id,
      landlordImage: threadInfo.receiver_info.receiver_image,
      landlordName: threadInfo.receiver_info.receiver_name,
      propertyId: threadInfo.property_info.property_id,
      propertyImage: threadInfo.property_info.property_image,
      propertyName: threadInfo.property_info.property_name,
      tenantId: threadInfo.sender_id,
      tenantImage: threadInfo.sender_info.sender_image,
      tenantName: threadInfo.sender_info.sender_name,
      threadId: threadInfo.id,
      lastMessage: '',
      time: parseInt(getTimestamp()),
    }

    await setDoc(doc(db, ADMIN_COLLECTION, activeThreadId), adminData)

    return tenantData
  } catch (e: any) {
    console.error('Error adding document: ', e)
  }
}
// const conversationCreateLandlord = async (userId: any, activeThreadId: any, threadInfo: any) => {
//   try {
//     const tenantData = {
//       ConversationName:
//         userId == threadInfo.receiver_id ? threadInfo.sender_info.sender_name : threadInfo.receiver_info.receiver_name,
//       conversationImage:
//         userId == threadInfo.receiver_id
//           ? threadInfo.sender_info.sender_image
//           : threadInfo.receiver_info.receiver_image,
//       date: threadInfo.created_at,
//       id: threadInfo.id,
//       isDeleted: false,
//       inChat: false,
//       isNew: false,
//       isOnline: true,
//       lastMessage: '',
//       propertyId: threadInfo.property_info.property_id,
//       propertyImage: threadInfo.property_info.property_image,
//       propertyName: threadInfo.property_info.property_name,
//       read: false,
//       receiverId: threadInfo.receiver_id,
//       receiverImage: threadInfo.receiver_info.receiver_image,
//       receiverName: threadInfo.receiver_info.receiver_name,
//       senderId: threadInfo.sender_id,
//       senderImage: threadInfo.sender_info.sender_image,
//       senderName: threadInfo.sender_info.sender_name,
//       time: parseInt(getTimestamp()),
//     }
//     await setDoc(
//       doc(
//         db,
//         CONVERSATION_COLLECTION,
//         threadInfo.receiver_id.toString(),
//         threadInfo.receiver_id.toString(),
//         activeThreadId
//       ),
//       tenantData
//     )
    

//     const landlordData = {
//       ConversationName: threadInfo.sender_info.sender_name,
//       conversationImage: threadInfo.sender_info.sender_image,
//       date: threadInfo.created_at,
//       id: threadInfo.id,
//       inChat: false,
//       isNew: false,
//       isDeleted: false,
//       isOnline: true,
//       lastMessage: '',
//       propertyId: threadInfo.property_info.property_id,
//       propertyImage: threadInfo.property_info.property_image,
//       propertyName: threadInfo.property_info.property_name,
//       read: false,
//       receiverId: threadInfo.receiver_id,
//       receiverImage: threadInfo.receiver_info.receiver_image,
//       receiverName: threadInfo.receiver_info.receiver_name,
//       senderId: threadInfo.sender_id,
//       senderImage: threadInfo.sender_info.sender_image,
//       senderName: threadInfo.sender_info.sender_name,
//       time: parseInt(getTimestamp()),
//     }
//     await setDoc(doc(db, CONVERSATION_COLLECTION, userId, userId, activeThreadId), landlordData)
    

//     const adminData = {
//       landlordId: threadInfo.receiver_id,
//       landlordImage: threadInfo.receiver_info.receiver_image,
//       landlordName: threadInfo.receiver_info.receiver_name,
//       propertyId: threadInfo.property_info.property_id,
//       propertyImage: threadInfo.property_info.property_image,
//       propertyName: threadInfo.property_info.property_name,
//       tenantId: threadInfo.sender_id,
//       tenantImage: threadInfo.sender_info.sender_image,
//       tenantName: threadInfo.sender_info.sender_name,
//       threadId: threadInfo.id,
//       lastMessage: '',
//       time: parseInt(getTimestamp()),
//     }

//     await setDoc(doc(db, ADMIN_COLLECTION, activeThreadId), adminData)

//     return tenantData
//   } catch (e: any) {
//     console.error('Error adding document: ', e)
//   }
// }

export { useConversationList, useConversationCreate, conversationCreate, usePrivateChatCollection}