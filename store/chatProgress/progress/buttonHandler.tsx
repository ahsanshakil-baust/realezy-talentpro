// import ButtonStatusHandler from '@/components/chatProgressForm/ButtonStatusHandler'
import ConditionSignReportLandlord from '@/components/chatProgressForm/ConditionReport/ConditionSignReport/ConditionSignReportLandlord'
import ConditionSignReportTenant from '@/components/chatProgressForm/ConditionReport/ConditionSignReport/ConditionSignReportTenant'
import ConditionReport from '@/components/chatProgressForm/ConditionReport/Landlord/ConditionReport'
import Confirm from '@/components/chatProgressForm/Confirm'
import HdbUpload from '@/components/chatProgressForm/Hdb/Landlord/HdbUpload'
import HdbView from '@/components/chatProgressForm/Hdb/Landlord/HdbView'
import Insurance from '@/components/chatProgressForm/Insurance/Landlord/Insurance'
import Inventory from '@/components/chatProgressForm/Inventory/Landlord/Inventory'
import InventoryViewL from '@/components/chatProgressForm/Inventory/Landlord/InventoryViewL'
import InventoryViewT from '@/components/chatProgressForm/Inventory/Tenant/InventoryViewT'
import FirstMonthRental from '@/components/chatProgressForm/PayFirstMonthRental/Tenanat/FirstMonthRental'
import Reservation from '@/components/chatProgressForm/Payreservation/Tenant/Reservation'
import CreateSchedule from '@/components/chatProgressForm/Property_Viewing_Schedule/Landlord/CreateSchedule'
import CreateAgreement from '@/components/chatProgressForm/agreement_create/landlord/CreateAgreement'
import LandlordSignAgreement from '@/components/chatProgressForm/agreement_create/landlord/LandlordSignAgreement'
// import SignAgreement from '@/components/chatProgressForm/agreement_create/landlord/SignAgreement'
import UpdateAgreement from '@/components/chatProgressForm/agreement_create/landlord/UpdateAgreement'
import TenantSignAgreement from '@/components/chatProgressForm/agreement_create/tenant/TenantSignAgreement'
import RentalOfferTCreate from '@/components/chatProgressForm/rental_offer/tenant/RentalOfferTCreate'

import store, { hideModal, showModal } from '@/store'

import {
  CONDITION_REPORT_SIGNING_CREATE,
  CONDITION_REPORT_SIGNING_DETAILS,
  CONDITION_REPORT_SIGNING_REQUEST,
  CONDITION_REPORT_SIGNING_SEND,
  CONDITION_REPORT_SIGNING_SIGN,
  CONDITION_REPORT_SIGNING_UPDATE,
  HDB_DETAILS,
  HDB_REQUEST,
  HDB_UPLOAD,
  INSURANCE_AND_REALEZY_SERVICE_FEE_PAY,
  INSURANCE_AND_REALEZY_SERVICE_FEE_REQUEST,
  INVENTORY_CHECKLIST_SIGNING_CREATE,
  INVENTORY_CHECKLIST_SIGNING_DETAILS,
  INVENTORY_CHECKLIST_SIGNING_REQUEST,
  INVENTORY_CHECKLIST_SIGNING_SEND,
  INVENTORY_CHECKLIST_SIGNING_SIGN,
  INVENTORY_CHECKLIST_SIGNING_UPDATE,
  KEY_HANDOVER_SCHEDULE_ACCEPT,
  KEY_HANDOVER_SCHEDULE_CANCEL,
  KEY_HANDOVER_SCHEDULE_COMPLETE,
  KEY_HANDOVER_SCHEDULE_CREATE,
  KEY_HANDOVER_SCHEDULE_DETAILS,
  KEY_HANDOVER_SCHEDULE_EDIT,
  KEY_HANDOVER_SCHEDULE_NOT_COMPLETED,
  MAKE_RENTAL_PROPOSAL_ACCEPT,
  MAKE_RENTAL_PROPOSAL_CREATE,
  MAKE_RENTAL_PROPOSAL_DETAILS,
  MAKE_RENTAL_PROPOSAL_REJECT,
  MAKE_RENTAL_PROPOSAL_REQUEST,
  MAKE_RENTAL_PROPOSAL_UPDATE,
  PAY_FIRST_MONTH_RENTAL_PAY,
  PAY_FIRST_MONTH_RENTAL_REQUEST,
  PAY_RESERVATION_FEE_PAY,
  PAY_RESERVATION_FEE_REQUEST,
  PROPERTY_VIEWING,
  PROPERTY_VIEWING_SCHEDULE_ACCEPT,
  PROPERTY_VIEWING_SCHEDULE_CANCEL,
  PROPERTY_VIEWING_SCHEDULE_CREATE,
  PROPERTY_VIEWING_SCHEDULE_DETAILS,
  PROPERTY_VIEWING_SCHEDULE_UPDATE,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED,
  SEND_AGREEMENT_CREATE,
  SEND_AGREEMENT_DETAILS,
  SEND_AGREEMENT_REQUEST,
  SEND_AGREEMENT_SEND,
  SEND_AGREEMENT_UPDATE,
  SIGN_AGREEMENT_REQUEST,
  SIGN_AGREEMENT_SIGN,
  SIGN_AGREEMENT_UPDATE,
  SIGN_THE_AGREEMENT,
  TENANT_DETAILS,
} from './constant'
import { progressStatusHandler } from './progressStatusHandler'
import { progressInfoHandler } from './progressInfoHandler'
import { progressStateHandler } from './progressStateHandler'
import { buttonStateHandler } from './buttonStateHandler'
// import RentalOfferTUpdate from '@/components/chatProgressForm/rental_offer/tenant/RentalOfferTUpdate'
import { Button } from '@mui/material'
import { Icon } from '@/components'
import OptOut from '@/components/chatProgressForm/Insurance/Landlord/OptOut'
import ViewingConfirmation from '@/components/chatProgressForm/Property_Viewing_Schedule/Landlord/ViewingConfirmation'
import TenantDetails from '@/components/chatProgressForm/Hdb/TenantDetails'
import Link from 'next/link'
import AgreementDetails from '@/components/chatProgressForm/agreement_create/tenant/AgreementDetails'
import Policy from '@/components/chatProgressForm/agreement_create/landlord/Policy'
import NricRequired from '@/components/chatProgressForm/agreement_create/landlord/NricRequired'
// import { log } from 'console'

export const buttonHandler = (ctxtype: any, payload: any) => {
  // console.log(ctxtype)
  switch (ctxtype) {
    // PROPERTY_VIEWING_SCHEDULE
    case PROPERTY_VIEWING_SCHEDULE_CREATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: 'House_Viewing',
            children: <ViewingConfirmation />,
          })
        )
      })()
      return false
    case PROPERTY_VIEWING_SCHEDULE_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PROPERTY_VIEWING_SCHEDULE_DETAILS,
            children: (
              <CreateSchedule
                ctxType={PROPERTY_VIEWING_SCHEDULE_DETAILS}
                createType={PROPERTY_VIEWING}
                viewMode={true}
              />
            ),
            className: '',
          })
        )
      })()
      return false
    case PROPERTY_VIEWING_SCHEDULE_UPDATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PROPERTY_VIEWING_SCHEDULE_UPDATE,
            children: (
              <CreateSchedule
                ctxType={PROPERTY_VIEWING_SCHEDULE_UPDATE}
                createType={PROPERTY_VIEWING}
                mutateType="edit"
              />
            ),
            className: '',
          })
        )
      })()
      return false

    //BUTTON STATUS HANDLER
    case PROPERTY_VIEWING_SCHEDULE_ACCEPT:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PROPERTY_VIEWING_SCHEDULE_ACCEPT,
            children: (
              <Confirm
                message={'Are you sure you want to accept the property viewing schedule?'}
                ctxtype={PROPERTY_VIEWING_SCHEDULE_ACCEPT}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case PROPERTY_VIEWING_SCHEDULE_CANCEL:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PROPERTY_VIEWING_SCHEDULE_CANCEL,
            children: (
              <Confirm
                message={'Are you sure to cancel property viewing schedule?'}
                ctxtype={PROPERTY_VIEWING_SCHEDULE_CANCEL}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED,
            children: (
              <Confirm
                message={'Are you sure property viewing schedule not required?'}
                ctxtype={PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE,
            children: (
              <Confirm
                message={'Are you sure that the property viewing has been completed?'}
                ctxtype={PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED,
            children: (
              <Confirm
                message={'Are you sure property viewing not completed?'}
                ctxtype={PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    // MAKE_RENTAL_PROPOSAL
    case MAKE_RENTAL_PROPOSAL_CREATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: MAKE_RENTAL_PROPOSAL_CREATE,
            children: <RentalOfferTCreate mutateType={'create'} />,
            className: '',
          })
        )
      })()

      return false
    case MAKE_RENTAL_PROPOSAL_UPDATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: MAKE_RENTAL_PROPOSAL_UPDATE,
            children: <RentalOfferTCreate mutateType={'update'} />,
            className: '',
          })
        )
      })()
      return false
    case MAKE_RENTAL_PROPOSAL_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: MAKE_RENTAL_PROPOSAL_DETAILS,
            children: <RentalOfferTCreate mutateType={'details'} />,
            className: '',
          })
        )
      })()
      return false

    case MAKE_RENTAL_PROPOSAL_ACCEPT:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: MAKE_RENTAL_PROPOSAL_ACCEPT,
            children: (
              <Confirm
                message={'Are you sure you want to accept the rental proposal?'}
                ctxtype={MAKE_RENTAL_PROPOSAL_ACCEPT}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case MAKE_RENTAL_PROPOSAL_REJECT:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: MAKE_RENTAL_PROPOSAL_REJECT,
            children: (
              <Confirm message={'Are you sure reject rental proposal?'} ctxtype={MAKE_RENTAL_PROPOSAL_REJECT} />
            ),
            className: '',
          })
        )
      })()
      return false

    case MAKE_RENTAL_PROPOSAL_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: MAKE_RENTAL_PROPOSAL_REQUEST,
            children: (
              <Confirm message={'Are you sure request for rental proposal?'} ctxtype={MAKE_RENTAL_PROPOSAL_REQUEST} />
            ),
            className: '',
          })
        )
      })()
      return false

    // PAY_RESERVATION_FEE
    case PAY_RESERVATION_FEE_PAY:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PAY_RESERVATION_FEE_PAY,
            children: <Reservation />,
            className: '',
          })
        )
      })()
      return false

    case PAY_RESERVATION_FEE_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PAY_RESERVATION_FEE_REQUEST,
            children: (
              <Confirm message={'Are you sure request for reservasion fee?'} ctxtype={PAY_RESERVATION_FEE_REQUEST} />
            ),
            className: '',
          })
        )
      })()
      return false

    // HDB
    case HDB_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: HDB_REQUEST,
            children: <Confirm message={'Are you sure reuest for HDB upload?.'} ctxtype={HDB_REQUEST} />,
            className: '',
          })
        )
      })()
      return false
    case HDB_UPLOAD:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: HDB_UPLOAD,
            children: <HdbUpload />,
            className: '',
          })
        )
      })()
      return false
    case HDB_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: HDB_DETAILS,
            children: <HdbView />,
            className: '',
          })
        )
      })()
      return false

    case TENANT_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: TENANT_DETAILS,
            children: <TenantDetails />,
            className: '',
          })
        )
      })()
      return false

    // SEND_AGREEMENT
    // case SEND_AGREEMENT_CREATE:
    //   ; (() => {
    //     if (
    //       (payload?.session?.user?.userInfo?.nationality == 'Foreigner (1st Timer)' &&
    //         payload?.session?.user?.userInfo?.passport_no == '') ||
    //       ((payload?.session?.user?.userInfo?.nationality == 'Local' ||
    //         payload?.session?.user?.userInfo?.nationality == 'PR' ||
    //         payload?.session?.user?.userInfo?.nationality == '' ||
    //         payload?.session?.user?.userInfo?.nationality == 'Foreigner (Returning)') &&
    //         payload?.session?.user?.userInfo?.user_id_numer == '')
    //     ) {
    //       store.dispatch(
    //         showModal({
    //           open: true,
    //           name: 'NRIC_/_FIN_REQUIRED',
    //           children: (
    //             <div className=" flex flex-col px-[3.25rem] py-4 bg-inherit rounded-b-[20px]">
    //               <h1 className="text-violet-950 font-semibold text-xl mb-2">Profile Completion Alert!</h1>
    //               <p className="">Full NRIC/FIN needed as per the Women's charter program</p>
    //               <div className="flex justify-end gap-2 mt-32">
    //                 <Button variant="contained" onClick={() => store.dispatch(hideModal('NRIC_/_FIN_REQUIRED'))}>
    //                   Later
    //                 </Button>
    //                 <Link href={{ pathname: '/dashboard/personal-info', query: { complePro: true } }}>
    //                   <Button
    //                     variant="contained"
    //                     className=""
    //                     onClick={() => {
    //                       store.dispatch(hideModal('NRIC_/_FIN_REQUIRED'))
    //                     }}>
    //                     Complete Profile
    //                   </Button>
    //                 </Link>
    //               </div>
    //             </div>
    //           ),
    //         })
    //       )
    //     } else
    //       store.dispatch(
    //         showModal({
    //           open: true,
    //           name: 'POLICY',
    //           children: (
    //             <Policy />
    //           ),
    //         })
    //       )
    //   })()
    //   return false

    case SEND_AGREEMENT_CREATE:
      ;(() => {
        // console.log('indicate--->', Boolean(payload?.session?.user?.userInfo?.user_id_number))
        !Boolean(payload?.session?.user?.userInfo?.user_id_number)
          ? ( payload?.session?.user?.isCorporate !== "yes" ? store.dispatch(
              showModal({
                open: true,
                name: 'NRIC_/_FIN_REQUIRED',
                children: <NricRequired />,
              })
            ) : store.dispatch(
              showModal({
                open: true,
                name: 'POLICY',
                children: <Policy />,
              })
            ))
          : store.dispatch(
              showModal({
                open: true,
                name: 'POLICY',
                children: <Policy />,
              })
            )
      })()
      return false

    case SEND_AGREEMENT_UPDATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: SEND_AGREEMENT_UPDATE,
            children: <UpdateAgreement />,
            className: '',
          })
        )
      })()
      return false

    case SEND_AGREEMENT_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: SEND_AGREEMENT_DETAILS,
            // children: <UpdateAgreement />,
            children: <AgreementDetails />,
            className: '',
          })
        )
      })()
      return false

    case SEND_AGREEMENT_SEND:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: SEND_AGREEMENT_SEND,
            children: (
              <Confirm
                message={'Are you sure you want to send the agreement to the tenant?'}
                ctxtype={SEND_AGREEMENT_SEND}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case SEND_AGREEMENT_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: SEND_AGREEMENT_REQUEST,
            children: (
              <Confirm message={'Are you sure request for draft agreement?'} ctxtype={SEND_AGREEMENT_REQUEST} />
            ),
            className: '',
          })
        )
      })()
      return false

    // SIGN_AGREEMENT
    case SIGN_AGREEMENT_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: SIGN_AGREEMENT_REQUEST,
            children: <Confirm message={'Are you sure request for agreement sign?'} ctxtype={SIGN_AGREEMENT_REQUEST} />,
            className: '',
          })
        )
      })()
      return false

    // PAY_FIRST_MONTH_RENTAL
    case PAY_FIRST_MONTH_RENTAL_PAY:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PAY_FIRST_MONTH_RENTAL_PAY,
            children: <FirstMonthRental />,
            className: '',
          })
        )
      })()
      return false

    case PAY_FIRST_MONTH_RENTAL_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: PAY_FIRST_MONTH_RENTAL_REQUEST,
            children: (
              <Confirm
                message={'Are you sure you want to request for the first month’s rent?'}
                ctxtype={PAY_FIRST_MONTH_RENTAL_REQUEST}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    // INSURANCE_AND_REALEZY_SERVICE_FEE
    case INSURANCE_AND_REALEZY_SERVICE_FEE_PAY:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: INSURANCE_AND_REALEZY_SERVICE_FEE_PAY,
            children: <Insurance />,
            className: '',
          })
        )
      })()
      return false
    case INSURANCE_AND_REALEZY_SERVICE_FEE_REQUEST:
      return false

    // SIGN_AGREEMENT
    case SIGN_AGREEMENT_SIGN:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: SIGN_THE_AGREEMENT,
            children: payload?.roletype == 'tenant' ? <TenantSignAgreement /> : <LandlordSignAgreement />,
            className: '',
          })
        )
      })()
      return false

    case SIGN_AGREEMENT_UPDATE:
      return false

    //----------------------------------KEY_HANDOVER_SCHEDULE----------------------------------//

    // KEY_HANDOVER_SCHEDULE
    case KEY_HANDOVER_SCHEDULE_CREATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: KEY_HANDOVER_SCHEDULE_CREATE,
            children: <CreateSchedule ctxType={KEY_HANDOVER_SCHEDULE_CREATE} mutateType="add" />,
            className: '',
          })
        )
      })()
      return false
    case KEY_HANDOVER_SCHEDULE_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: KEY_HANDOVER_SCHEDULE_DETAILS,
            children: <CreateSchedule ctxType={KEY_HANDOVER_SCHEDULE_DETAILS} viewMode={true} />,
            className: '',
          })
        )
      })()
      return false
    case KEY_HANDOVER_SCHEDULE_EDIT:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: KEY_HANDOVER_SCHEDULE_EDIT,
            children: <CreateSchedule ctxType={KEY_HANDOVER_SCHEDULE_EDIT} mutateType="edit" />,
            className: '',
          })
        )
      })()
      return false

    case KEY_HANDOVER_SCHEDULE_ACCEPT:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: KEY_HANDOVER_SCHEDULE_ACCEPT,
            children: (
              <Confirm
                message={'Are you sure to accept property key handover?'}
                ctxtype={KEY_HANDOVER_SCHEDULE_ACCEPT}
              />
            ),
            className: '',
          })
        )
      })()
      return false
    case KEY_HANDOVER_SCHEDULE_CANCEL:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: KEY_HANDOVER_SCHEDULE_CANCEL,
            children: (
              <Confirm
                message={'Are you sure to cancel property key handover?'}
                ctxtype={KEY_HANDOVER_SCHEDULE_CANCEL}
              />
            ),
            className: '',
          })
        )
      })()
      return false
    case KEY_HANDOVER_SCHEDULE_COMPLETE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: KEY_HANDOVER_SCHEDULE_COMPLETE,
            children: (
              <Confirm
                message={'Are you sure property key handover completed?'}
                ctxtype={KEY_HANDOVER_SCHEDULE_COMPLETE}
              />
            ),
            className: '',
          })
        )
      })()
      return false
    case KEY_HANDOVER_SCHEDULE_NOT_COMPLETED:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: KEY_HANDOVER_SCHEDULE_NOT_COMPLETED,
            children: (
              <Confirm
                message={'Are you sure property key handover not completed?'}
                ctxtype={KEY_HANDOVER_SCHEDULE_NOT_COMPLETED}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    // CONDITION_REPORT_SIGNING
    case CONDITION_REPORT_SIGNING_CREATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: CONDITION_REPORT_SIGNING_CREATE,
            children: <ConditionReport mutateType={'create'} />,
            className: '',
          })
        )
      })()
      return false
    case CONDITION_REPORT_SIGNING_SEND:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: CONDITION_REPORT_SIGNING_SEND,
            children: (
              <Confirm
                message={' Are you sure you want to send the condition report to the tenant?'}
                ctxtype={CONDITION_REPORT_SIGNING_SEND}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case CONDITION_REPORT_SIGNING_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: CONDITION_REPORT_SIGNING_REQUEST,
            children: (
              <Confirm
                message={'Are you sure request for condition report ?'}
                ctxtype={CONDITION_REPORT_SIGNING_REQUEST}
              />
            ),
            className: '',
          })
        )
      })()
      return false

    case CONDITION_REPORT_SIGNING_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: CONDITION_REPORT_SIGNING_UPDATE,
            children: <ConditionReport mutateType={'update'} />,
            className: '',
          })
        )
      })()
      return false
    case CONDITION_REPORT_SIGNING_SIGN:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: CONDITION_REPORT_SIGNING_SIGN,
            children: payload?.roletype == 'tenant' ? <ConditionSignReportTenant /> : <ConditionSignReportLandlord />,
            className: '',
          })
        )
      })()
      return false
    case CONDITION_REPORT_SIGNING_UPDATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: CONDITION_REPORT_SIGNING_UPDATE,
            children: <ConditionReport mutateType={'update'} />,
            className: '',
          })
        )
      })()
      return false

    // INVENTORY_CHECKLIST_SIGNING
    case INVENTORY_CHECKLIST_SIGNING_CREATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: INVENTORY_CHECKLIST_SIGNING_CREATE,
            children: <Inventory mutateType={'create'} />,
            className: '',
          })
        )
      })()
      return false
    case INVENTORY_CHECKLIST_SIGNING_UPDATE:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: INVENTORY_CHECKLIST_SIGNING_UPDATE,
            children: <Inventory mutateType={'update'} />,
            className: '',
          })
        )
      })()
      return false
    case INVENTORY_CHECKLIST_SIGNING_DETAILS:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: INVENTORY_CHECKLIST_SIGNING_DETAILS,
            // children:
            //   payload?.roletype === 'landlord' ? (
            //     <InventoryViewL
            //       type="inventory_Sign_Landlord"
            //       signOnly={false}
            //       modalName={INVENTORY_CHECKLIST_SIGNING_DETAILS}
            //     />
            //   ) : (
            //     <InventoryViewT
            //       type="inventory_Sign_tenant"
            //       signOnly={false}
            //       modalName={INVENTORY_CHECKLIST_SIGNING_DETAILS}
            //     />
            //   ),
            children: <Inventory mutateType={'update'} />,
            className: payload?.roletype === 'landlord' ? 'inventory-view-l' : 'inventory-view-t',
          })
        )
      })()

      return false
    case INVENTORY_CHECKLIST_SIGNING_SEND:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: INVENTORY_CHECKLIST_SIGNING_SEND,
            children: (
              <Confirm
                message={'Are you sure you want to send checklist?'}
                ctxtype={INVENTORY_CHECKLIST_SIGNING_SEND}
              />
            ),
            className: '',
          })
        )
      })()
      return false
    case INVENTORY_CHECKLIST_SIGNING_SIGN:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: INVENTORY_CHECKLIST_SIGNING_SIGN,
            children:
              payload?.roletype === 'landlord' ? (
                <InventoryViewL
                  type="'inventory_Sign_Landlord'"
                  signOnly={true}
                  modalName={INVENTORY_CHECKLIST_SIGNING_SIGN}
                />
              ) : (
                <InventoryViewT
                  type="inventory_Sign_tenant"
                  signOnly={true}
                  modalName={INVENTORY_CHECKLIST_SIGNING_SIGN}
                />
              ),
            className: payload?.roletype === 'landlord' ? 'inventory-view-l' : 'inventory-view-t',
          })
        )
      })()
      return false

    case INVENTORY_CHECKLIST_SIGNING_REQUEST:
      ;(() => {
        store.dispatch(
          showModal({
            open: true,
            name: INVENTORY_CHECKLIST_SIGNING_REQUEST,
            children: (
              <Confirm message={'Are you sure request for inventory?'} ctxtype={INVENTORY_CHECKLIST_SIGNING_REQUEST} />
            ),
            className: '',
          })
        )
      })()
      return false
  }
}

export { progressStatusHandler, progressInfoHandler, progressStateHandler, buttonStateHandler }
