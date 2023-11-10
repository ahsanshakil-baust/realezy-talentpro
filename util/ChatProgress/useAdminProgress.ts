import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ADMIN_COLLECTION } from "@/const";




// const [chatThreadsList, setChatThreadsList] = useState([]);


//     useEffect(() => {
//       if (!userId) return
//       const docRef = collection(db, CONVERSATION_COLLECTION, userId, userId);
//       const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
//           const chatThreads : any = [];
//           querySnapshot.forEach((doc: any) => {
//             // console.log("jlsjfljsljf", doc.data())
//               chatThreads.push(doc.data());

//           });
//           setChatThreadsList(chatThreads);
//       });

//       return unsubscribe
//     }, [userId])

//     return [chatThreadsList];



/*
 "landlordId": conversation.receiverId,
                     "landlordImage": conversation.receiverInfo.receiverImage,
                     "landlordName": conversation.receiverInfo.receiverName,
                     "propertyId": conversation.propertyId,
                     "propertyImage": conversation.propertyInfo.propertyImage,
                     "propertyName": conversation.propertyInfo.propertyName,
                     "tenantId": conversation.senderId,
                     "tenantImage": conversation.senderInfo.senderImage,
                     "tenantName": conversation.senderInfo.senderName,
                     "threadId": conversation.id,
                     "lastMessage": "",
                     "time": time,
*/







export {

}
