import React, { useEffect, useState } from "react"
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { LANDLORD_PROGRESS_COLLECTION } from "@/const"

const useLandlordProgressList = (landlordProgressId: any) => {
  const [landlord, setLandlord] = useState(null)

  useEffect(() => {
    if(!landlordProgressId) return

    const docRef = doc(
      db,
      LANDLORD_PROGRESS_COLLECTION,
      landlordProgressId,
      landlordProgressId,
      landlordProgressId
    )
    const unsubscribe : any = onSnapshot(docRef, (querySnapshot) => {
      const landlordProgress : any = querySnapshot.data()
      setLandlord(landlordProgress)
    })
    return unsubscribe
  }, [landlordProgressId])

  return landlord
}

const useLandlordProgressCreate = async (param : any, propertyLandlordTenantInfo : any) => {
  try {
    const docRef : any = await setDoc(
      doc(db, LANDLORD_PROGRESS_COLLECTION, param, param, param),
      {
        codeVersion: 1,
        contactTenant: false,
        creditReportInfo: {
          instruction: "Full fill as per guideline",
          progress_status: false,
          status: "Pending",
        },

        firstMonthRental: {
          amount: `${propertyLandlordTenantInfo?.details?.price}`.toString(),
          progress_status: false,
          status: "Pending",
          time: "",
        },

        insurancePackage: {
          instruction: "Full fill as per guideline",
          progress_status: false,
          status: "Pending",
        },

        rzyServiceFee: {
          progress_status: false,
          status: "Pending",
        },

        itemChecklist: {
          instruction: "Not yet",
          is_landlord_sign: false,
          is_tenant_sign: false,
          progress_status: false,
          status: "Pending",
          time: "",
        },

        keyHandover: {
          id: "",
          inviterId: "",
          progress_status: false,
          selected_date: "",
          selected_time: "",
          status: "",
          purpose: "key_handover",
        },

        occupiers: {
          progress_status: false,
          status: "Request",
        },

        payBookingFee: {
          amount: "500",
          is_booking_by_others: false,
          progress_status: false,
          status: "Pending",
        },

        propertyCondition: {
          instruction: "Not yet",
          is_landlord_sign: false,
          is_tenant_sign: false,
          progress_status: false,
          status: "Pending",
        },
        rentOffer: {
          progress_status: false,
          id: "",
          offer_amount: "",
          accepted: "",
          additional_request: "",
          commencement_date: "",
          creator: "",
          inviter_id: "",
          status: "Pending",
          tenancy_period: "",
        },
        tenancyAgreement: {
          id: "",
          instruction: "",
          landLord_signed: false,
          progress_status: false,
          status: "You can create draft",
          tenant_signed: false,
        },
        hdbApproval: {
          instruction: "",
          progress_status: false,
          status: "Pending",
        },
        viewingCompleted: {
          interested: "requested",
          progress_status: false,
          time: "",
        },
        viewingScheduleConfirmed: {
          id: "",
          inviterId: "",
          progress_status: false,
          selected_date: "",
          selected_time: "",
          status: "",
          time: "",
          purpose: "house_viewing",
        },
        isNewInChat: false,
      }
    )
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

const landlordProgressCreate = async (param : any, propertyLandlordTenantInfo : any) => {
  try {
    const docRef : any = await setDoc(
      doc(db, LANDLORD_PROGRESS_COLLECTION, param, param, param),
      {
        codeVersion: 1,
        contactTenant: false,
        creditReportInfo: {
          instruction: "Full fill as per guideline",
          progress_status: false,
          status: "Pending",
        },

        firstMonthRental: {
          amount: `${propertyLandlordTenantInfo?.details?.price}`.toString(),
          progress_status: false,
          status: "Pending",
          time: "",
        },

        insurancePackage: {
          instruction: "Full fill as per guideline",
          progress_status: false,
          status: "Pending",
        },

        rzyServiceFee: {
          progress_status: false,
          status: "Pending",
        },

        itemChecklist: {
          instruction: "Not yet",
          is_landlord_sign: false,
          is_tenant_sign: false,
          progress_status: false,
          status: "Pending",
          time: "",
        },

        keyHandover: {
          id: "",
          inviterId: "",
          progress_status: false,
          selected_date: "",
          selected_time: "",
          status: "",
          purpose: "key_handover",
        },

        occupiers: {
          progress_status: false,
          status: "Request",
        },

        payBookingFee: {
          amount: "500",
          is_booking_by_others: false,
          progress_status: false,
          status: "Pending",
        },

        propertyCondition: {
          instruction: "Not yet",
          is_landlord_sign: false,
          is_tenant_sign: false,
          progress_status: false,
          status: "Pending",
        },
        rentOffer: {
          progress_status: false,
          id: "",
          offer_amount: "",
          accepted: "",
          additional_request: "",
          commencement_date: "",
          creator: "",
          inviter_id: "",
          status: "Pending",
          tenancy_period: "",
        },
        tenancyAgreement: {
          id: "",
          instruction: "",
          landLord_signed: false,
          progress_status: false,
          status: "You can create draft",
          tenant_signed: false,
        },
        hdbApproval: {
          instruction: "",
          progress_status: false,
          status: "Pending",
        },
        viewingCompleted: {
          interested: "requested",
          progress_status: false,
          time: "",
        },
        viewingScheduleConfirmed: {
          id: "",
          inviterId: "",
          progress_status: false,
          selected_date: "",
          selected_time: "",
          status: "",
          time: "",
          purpose: "house_viewing",
        },
        isNewInChat: false,
      }
    )
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export { useLandlordProgressList, useLandlordProgressCreate, landlordProgressCreate }
