import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { TENANT_PROGRESS_COLLECTION } from "@/const";




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

const useTenantProgressList = (tenantProgressId : any) => {
    const [tenant, setTenant] = useState(null);

    useEffect(() => {
      if (!tenantProgressId) return
      const docRef = doc(db, TENANT_PROGRESS_COLLECTION, tenantProgressId, tenantProgressId, tenantProgressId);
      const unsubscribe : any = onSnapshot(docRef, (querySnapshot) => {
          const tenantProgress : any = querySnapshot.data()
          setTenant(tenantProgress);
      });
      return unsubscribe
    }, [tenantProgressId])

    return tenant;
}



const useTenantProgressCreate = async (param : any, propertyLandlordTenantInfo : any) => {
    try {

        const docRef : any = await setDoc(doc(db, TENANT_PROGRESS_COLLECTION, param, param, param), {

            codeVersion: 1,
            contactTenant: false,
            creditReportInfo: {
                instruction: "Full fill as per guideline",
                progress_status: false,
                status: "Pending"
            },

            firstMonthRental: {
                amount: `${propertyLandlordTenantInfo?.details?.price}`.toString(),
                progress_status: false,
                status: "Pending",
                time: ""
            },
            insurancePackage: {
                instruction: "Full fill as per guideline",
                progress_status: false,
                status: "Pending"
            },

            rzyServiceFee: {
                progress_status: false,
                status: "Pending"
            },

            itemChecklist: {
                instruction: "Not yet",
                is_landlord_sign: false,
                is_tenant_sign: false,
                progress_status: false,
                status: "Pending",
                item: ""
            },

            keyHandover: {
                id: "",
                inviterId: "",
                progress_status: false,
                selected_date: "",
                selected_time: "",
                status: "",
                purpose: "key_handover"
            },

            occupiers: {
                progress_status: false,
                status: "Request"
            },

            payBookingFee: {
                amount: "500",
                is_booking_by_others: false,
                progress_status: false,
                status: "Pending"
            },

            propertyCondition: {
                instruction: "Not yet",
                is_landlord_sign: false,
                is_tenant_sign: false,
                progress_status: false,
                status: "Pending"
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
                tenancy_period: ""
            },
            hdbApproval: {
                instruction: "",
                progress_status: false,
                status: "Pending"
            },
            tenancyAgreement: {
                id: "",
                instruction: "",
                landLord_signed: false,
                progress_status: false,
                status: "You can request for draft",
                tenant_signed: false
            },
            viewingCompleted: {
                interested: "requested",
                progress_status: false,
                time: ""
            },
            viewingScheduleConfirmed: {
                id: "",
                inviterId: "",
                progress_status: false,
                selected_date: "",
                selected_time: "",
                status: "",
                time: "",
                purpose: "house_viewing"
            },
            isNewInChat: false

        });

    } catch (e : any) {
        console.error("Error adding document: ", e);
    }
}

const tenantProgressCreate = async (param : any, propertyLandlordTenantInfo : any) => {
  try {

      const docRef : any = await setDoc(doc(db, TENANT_PROGRESS_COLLECTION, param, param, param), {

          codeVersion: 1,
          contactTenant: false,
          creditReportInfo: {
              instruction: "Full fill as per guideline",
              progress_status: false,
              status: "Pending"
          },

          firstMonthRental: {
              amount: `${propertyLandlordTenantInfo?.details?.price}`.toString(),
              progress_status: false,
              status: "Pending",
              time: ""
          },
          insurancePackage: {
              instruction: "Full fill as per guideline",
              progress_status: false,
              status: "Pending"
          },

          rzyServiceFee: {
              progress_status: false,
              status: "Pending"
          },

          itemChecklist: {
              instruction: "Not yet",
              is_landlord_sign: false,
              is_tenant_sign: false,
              progress_status: false,
              status: "Pending",
              item: ""
          },

          keyHandover: {
              id: "",
              inviterId: "",
              progress_status: false,
              selected_date: "",
              selected_time: "",
              status: "",
              purpose: "key_handover"
          },

          occupiers: {
              progress_status: false,
              status: "Request"
          },

          payBookingFee: {
              amount: "500",
              is_booking_by_others: false,
              progress_status: false,
              status: "Pending"
          },

          propertyCondition: {
              instruction: "Not yet",
              is_landlord_sign: false,
              is_tenant_sign: false,
              progress_status: false,
              status: "Pending"
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
              tenancy_period: ""
          },
          hdbApproval: {
              instruction: "",
              progress_status: false,
              status: "Pending"
          },
          tenancyAgreement: {
              id: "",
              instruction: "",
              landLord_signed: false,
              progress_status: false,
              status: "You can request for draft",
              tenant_signed: false
          },
          viewingCompleted: {
              interested: "requested",
              progress_status: false,
              time: ""
          },
          viewingScheduleConfirmed: {
              id: "",
              inviterId: "",
              progress_status: false,
              selected_date: "",
              selected_time: "",
              status: "",
              time: "",
              purpose: "house_viewing"
          },
          isNewInChat: false

      });

  } catch (e : any) {
      console.error("Error adding document: ", e);
  }
}




export {
    useTenantProgressList,
    useTenantProgressCreate,
    tenantProgressCreate,
}
