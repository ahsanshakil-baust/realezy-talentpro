import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { LANDLORD_PROGRESS_COLLECTION } from "@/const";



const useLandlordProgressList = (landlordProgressId : any) => {
    const [landlord, setLandlord] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, LANDLORD_PROGRESS_COLLECTION, landlordProgressId, landlordProgressId, landlordProgressId);
            const unsubscribe : any = onSnapshot(docRef, (querySnapshot) => {
                const landlordProgress : any = querySnapshot.data()
                setLandlord(landlordProgress);
            });
        }
        getData()

    }, [landlordProgressId])

    return landlord;
}

export default useLandlordProgressList

