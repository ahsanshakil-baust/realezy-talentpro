import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { CHAT_COLLECTION, PRIVATE_MESSENGER } from '@/const'

// const ()=>{}

const useChatList = (threadId: any) => {
  const [chats, setChats] = useState([])
  const [unseen, SetUnSeen] = useState(0)

  useEffect(() => {
    if (!threadId) return
    const docRef = collection(db, CHAT_COLLECTION, threadId, threadId)
    const unsubscribe = onSnapshot(docRef, querySnapshot => {
      const chats: any = []
      let unseencount = 0
      querySnapshot.forEach(doc => {
        const docu = doc.data()
        if (!docu.seen) unseencount++
        chats.push(docu)
        // console.log("🚀🚀🚀🚀🚀🚀 ~ docu:", docu.message)
      })
      setChats(chats)
      SetUnSeen(unseencount)
    })

    return unsubscribe
  }, [threadId])

  return [chats, unseen]
}

const usePrivateChatList = (threadId: any) => {
  const [privateChat, setPrivateChat] = useState([])

  useEffect(() => {
    if (threadId) {
      const getData = async () => {
        const docRef: any = collection(db, PRIVATE_MESSENGER, threadId, threadId)
        const unsubscribe = onSnapshot(docRef, (querySnapshot: any) => {
          const chats: any = []
          querySnapshot.forEach((doc: any) => {
            chats.push(doc.data())
          })
          setPrivateChat(chats)
        })
      }
      getData()
    }
  }, [threadId])

  return [privateChat]
}

export { useChatList, usePrivateChatList }
