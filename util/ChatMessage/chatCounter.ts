
import { db } from '../../firebase'
import { addDoc, collection, doc, onSnapshot, getDocs,updateDoc,where ,query, DocumentData} from 'firebase/firestore'
import {CONVERSATION_COLLECTION , CHAT_COLLECTION} from '@/const'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'



export const getUnreadConversation = async (userId: any , callback: { (count: any): void; (arg0: number): void; }) => {


  const docRef = collection(db, CONVERSATION_COLLECTION, userId, userId)
  const q = query(docRef,where('read', '==', false));
  try {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const matchingDocuments: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.senderId !== userId.toString()) {
          matchingDocuments.push(data);
        }
      });

      const unreadCount = matchingDocuments.length;

      callback(unreadCount);
    });

    return () => {
      unsubscribe();
    };
  } catch (error) {
    console.error('Error fetching unread conversation count:', error);
    throw error;
  }
}

export const getUnreadUserWiseConversationCounting = async (thraedId : any ,userId : any, callback : {(count:any) : void;(arg0:number) : void;}) => {
  const docRef = collection(db, CHAT_COLLECTION, thraedId, thraedId)


  const q = query(docRef,where('seen', '==', false));
  try {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const matchingDocuments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.chatSenderId !== userId.toString()) {
          matchingDocuments.push(data);
        }
      });

      const unreadCount = matchingDocuments.length;
      callback(unreadCount);
    });

    return () => {
      unsubscribe();
    };
  } catch (error) {
    console.error('Error fetching unread conversation count:', error);
    throw error;
  }
}

export const updateUnreadConversationCounting = async(chats : any[], userId: any) => {
      console.log("DDDDDDDDDDDDDDDDD"+userId)
      for (const chat of chats) {
        // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX"+JSON.stringify(chat))
        if(chat?.chatSenderId != userId && chat?.seen == false){

          const docRef = doc(collection(db, CHAT_COLLECTION, chat?.threadId, chat?.threadId), chat?.chatId);
          await updateDoc(docRef, {
            seen: true
          });

          const docRefForSenderCoversation = doc(collection(db, CONVERSATION_COLLECTION, chat?.chatSenderId, chat?.chatSenderId),chat?.threadId);
          await updateDoc(docRefForSenderCoversation, {
            read: true
          });


          const docRefForReceiverCoversation = doc(collection(db, CONVERSATION_COLLECTION, chat?.receiverId, chat?.receiverId),chat?.threadId);
          await updateDoc(docRefForReceiverCoversation, {
            read: true
          });

         }
      }
}
