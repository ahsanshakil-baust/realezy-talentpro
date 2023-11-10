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
import { draft_created, schedule_completed, tenantPaid, tenant_added } from '@/const'
import { house_viewing_cancel_landlord } from '@/const'
import { house_viewing_reschedule_tenant } from '@/const'
import { skipped_schedule } from '@/const'
import { house_viewing_from_tenant } from '@/const'
import { Key_handOver_create_landlord } from '@/const'
import { Key_handOver_complete } from '@/const'
import { Key_handOver_cancel_landlord } from '@/const'
import { Key_handOver_reschedule_tenant } from '@/const'
import { Key_handOver_from_tenant } from '@/const'
import { tenant_created_offer } from '@/const'
import { update_offer_message } from '@/const'
import { landlord_updated_offer } from '@/const'
import { landlord_update_offer_message } from '@/const'
import { landlord_request_offer } from '@/const'
import { offer_accepted } from '@/const'
import { landlord_accepted } from '@/const'
import { tenant_accepted } from '@/const'
import { tenant_get_offer_request } from '@/const'
import { tenant_update_offer_message } from '@/const'
import { landlord_offer_message } from '@/const'
import { tenant_updated_offer } from '@/const'
import { offer_message } from '@/const'
import { Key_handOver_from_landlord } from '@/const'
import { Key_handOver_reschedule_landlord } from '@/const'
import { Key_handOver_cancel_tenant } from '@/const'
import { Key_handOver_completed } from '@/const'
import { Key_handOver_create_tenant } from '@/const'
import { house_viewing_from_landlord } from '@/const'
import { house_viewing_skipped } from '@/const'
import { house_viewing_reschedule_landlord } from '@/const'
import { house_viewing_cancel_tenant } from '@/const'
import { house_viewing_completed } from '@/const'
import { house_viewing_complete } from '@/const'
import {
  draft_landlord_sign,
  draft_requested,
  draft_send,
  draft_sign_requested,
  draft_tenant_sign,
  house_viewing_create_landlord,
  house_viewing_create_tenant,
  landlord_accept_schedule,
  landlord_accepted_offer,
  landlord_cancel_schedule,
  landlord_create_schedule,
  landlord_receive_schedule,
  landlord_rejected_offer,
  landlord_requested_offer,
  landlord_reschedule,
  rentalRequested,
  tenant_accept_schedule,
  tenant_accepted_offer,
  tenant_cancel_schedule,
  tenant_create_schedule,
  tenant_receive_schedule,
  tenant_reschedule,
} from '@/const'
import store, { showModal } from '@/store'
import { getReservationFee } from '@/util'
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
  TENANT_DETAILS,
} from './constant'
// import { log } from 'console'

export const buttonStateHandler = (ctxtype: any, payload: any) => {
  // console.log('payload', payload)
  switch (ctxtype) {
    //--------------------------------------PROPERTY_VIEWING_SCHEDULE--------------------------------------

    // PROPERTY VIEWING SCHEDULE FOR TENANT & LANDLORD
    case PROPERTY_VIEWING_SCHEDULE_CREATE:
      // return true
      if (payload?.roletype === 'tenant') {
        if (
          (payload?.viewingScheduleConfirmed?.status == '' ||
            payload?.viewingScheduleConfirmed?.status == landlord_cancel_schedule ||
            payload?.viewingScheduleConfirmed?.status == tenant_cancel_schedule) &&
          payload?.viewingScheduleConfirmed?.status !== 'Tenant Accepted' &&
          !(payload?.viewingScheduleConfirmed?.status == 'Schedule Declined')
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          payload?.viewingScheduleConfirmed?.status == '' ||
          payload?.viewingScheduleConfirmed?.status == 'Schedule Declined' ||
          ((payload?.viewingScheduleConfirmed?.status == landlord_cancel_schedule ||
            payload?.viewingScheduleConfirmed?.status == tenant_cancel_schedule) &&
            payload?.roletype === 'landlord')
        ) {
          return true
        } else {
          return false
        }
      }

    // PROPERTY VIEWING SCHEDULE DETAILS FOR TENANT & LANDLORD
    case PROPERTY_VIEWING_SCHEDULE_DETAILS:
      //FOR TENANT

      if (payload?.roletype == 'tenant') {
        if (
          (payload?.viewingScheduleConfirmed?.status == `Request Sent Awaiting Landlord's Response` ||
            payload?.viewingScheduleConfirmed?.status == tenant_create_schedule ||
            payload?.viewingScheduleConfirmed?.status == tenant_reschedule ||
            payload?.viewingScheduleConfirmed?.status == 'Tenant Changed Schedule') &&
          payload?.viewingScheduleConfirmed?.inviterId == payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          (payload?.viewingScheduleConfirmed?.status == `Request Sent Awaiting Tenant's Response` ||
            payload?.viewingScheduleConfirmed?.status == landlord_create_schedule ||
            payload?.viewingScheduleConfirmed?.status == landlord_reschedule ||
            payload?.viewingScheduleConfirmed?.status == 'tenant_receive_schedule' ||
            payload?.viewingScheduleConfirmed?.status == 'Landlord Changed Schedule') &&
          payload?.viewingScheduleConfirmed?.inviterId == payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }

    // PROPERTY VIEWING SCHEDULE EDIT FOR TENANT & LANDLORD
    case PROPERTY_VIEWING_SCHEDULE_UPDATE:
      //FOR TENANT
      if (payload?.roletype == 'tenant') {
        if (
          payload?.viewingScheduleConfirmed?.id !== '' &&
          !payload?.viewingScheduleConfirmed?.progress_status &&
          (payload?.viewingScheduleConfirmed?.status == 'Received Schedule from Landlord' ||
            payload?.viewingScheduleConfirmed?.status == tenant_receive_schedule ||
            payload?.viewingScheduleConfirmed?.status == landlord_reschedule ||
            payload?.viewingScheduleConfirmed?.status == 'Landlord Changed Schedule') &&
          payload?.viewingScheduleConfirmed?.inviterId !== payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          payload?.viewingScheduleConfirmed?.id != '' &&
          !payload?.viewingScheduleConfirmed?.progress_status &&
          (payload?.viewingScheduleConfirmed?.status == 'Received Schedule from Tenant' ||
            payload?.viewingScheduleConfirmed?.status == tenant_create_schedule ||
            payload?.viewingScheduleConfirmed?.status == 'Tenant Changed Schedule' ||
            payload?.viewingScheduleConfirmed?.status == landlord_receive_schedule ||
            payload?.viewingScheduleConfirmed?.status == 'tenant_receive_schedule' ||
            payload?.viewingScheduleConfirmed?.status == tenant_reschedule) &&
          payload?.viewingScheduleConfirmed?.inviterId !== payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }

    // PROPERTY VIEWING SCHEDULE ACCEPT FOR TENANT & LANDLORD
    case PROPERTY_VIEWING_SCHEDULE_ACCEPT:
      //FOR TENANT
      if (payload?.roletype == 'tenant') {
        if (
          payload?.viewingScheduleConfirmed?.id !== '' &&
          !payload?.viewingScheduleConfirmed?.progress_status &&
          (payload?.viewingScheduleConfirmed?.status == 'Received Schedule from Landlord' ||
            payload?.viewingScheduleConfirmed?.status == tenant_receive_schedule ||
            payload?.viewingScheduleConfirmed?.status == landlord_reschedule ||
            payload?.viewingScheduleConfirmed?.status == 'Landlord Changed Schedule') &&
          payload?.viewingScheduleConfirmed?.inviterId !== payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          payload?.viewingScheduleConfirmed?.id !== '' &&
          !payload?.viewingScheduleConfirmed?.progress_status &&
          (payload?.viewingScheduleConfirmed?.status == 'Received Schedule from Tenant' ||
            payload?.viewingScheduleConfirmed?.status == 'Tenant Changed Schedule' ||
            payload?.viewingScheduleConfirmed?.status == landlord_receive_schedule ||
            payload?.viewingScheduleConfirmed?.status == 'tenant_receive_schedule' ||
            payload?.viewingScheduleConfirmed?.status == tenant_reschedule ||
            payload?.viewingScheduleConfirmed?.status == tenant_create_schedule) &&
          payload?.viewingScheduleConfirmed?.inviterId !== payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }

    // PROPERTY VIEWING SCHEDULE DECLINE FOR TENANT & LANDLORD
    case PROPERTY_VIEWING_SCHEDULE_CANCEL:
      //FOR TENANT
      if (payload?.roletype == 'tenant') {
        if (
          payload?.viewingScheduleConfirmed?.id !== '' &&
          !payload?.viewingScheduleConfirmed?.progress_status &&
          (payload?.viewingScheduleConfirmed?.status == 'Received Schedule from Landlord' ||
            payload?.viewingScheduleConfirmed?.status == tenant_receive_schedule ||
            payload?.viewingScheduleConfirmed?.status == landlord_reschedule ||
            payload?.viewingScheduleConfirmed?.status == 'Landlord Changed Schedule') &&
          payload?.viewingScheduleConfirmed?.inviterId !== payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          payload?.viewingScheduleConfirmed?.id !== '' &&
          !payload?.viewingScheduleConfirmed?.progress_status &&
          (payload?.viewingScheduleConfirmed?.status == 'Received Schedule from Tenant' ||
            payload?.viewingScheduleConfirmed?.status == 'Tenant Changed Schedule' ||
            payload?.viewingScheduleConfirmed?.status == landlord_receive_schedule ||
            payload?.viewingScheduleConfirmed?.status == tenant_reschedule ||
            payload?.viewingScheduleConfirmed?.status == tenant_create_schedule) &&
          payload?.viewingScheduleConfirmed?.inviterId !== payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }

    // PROPERTY VIEWING SCHEDULE VIEWING NOT REQUIRED FOR TENANT & LANDLORD
    case PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.viewingScheduleConfirmed?.status === '' ||
          payload?.viewingScheduleConfirmed?.status === 'Schedule Declined' ||
          payload?.viewingScheduleConfirmed?.status === landlord_cancel_schedule ||
          payload?.viewingScheduleConfirmed?.status === tenant_cancel_schedule
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    // PROPERTY VIEWING SCHEDULE VIEWING COMPLETE FOR TENANT & LANDLORD
    case PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE:
      //FOR TENANT & LANDLORD BOTH
      if (
        payload?.viewingScheduleConfirmed?.status == 'Landlord Accepted' ||
        payload?.viewingScheduleConfirmed?.status == landlord_accept_schedule ||
        payload?.viewingScheduleConfirmed?.status == tenant_accept_schedule ||
        payload?.viewingScheduleConfirmed?.status == 'Tenant Accepted'
      ) {
        return true
      } else {
        return false
      }

    case PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED:
      //FOR TENANT & LANDLORD BOTH
      if (
        payload?.viewingScheduleConfirmed?.status == 'Landlord Accepted' ||
        payload?.viewingScheduleConfirmed?.status == landlord_accept_schedule ||
        payload?.viewingScheduleConfirmed?.status == tenant_accept_schedule ||
        payload?.viewingScheduleConfirmed?.status == 'Tenant Accepted'
      ) {
        return true
      } else {
        return false
      }

    //-----------------------------------MAKE_RENTAL_PROPOSAL---------------------------------------------

    // MAKE RENTAL PROPOSAL CREATE FOR TENANT
    case MAKE_RENTAL_PROPOSAL_CREATE:
      if (payload?.roletype == 'tenant') {
        if (payload?.rentOffer?.id == '' && payload?.viewingScheduleConfirmed?.progress_status == true) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    // MAKE RENTAL PROPOSAL UPDATE FOR TENANT & LANDLORD
    case MAKE_RENTAL_PROPOSAL_UPDATE:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.rentOffer?.status == 'created' ||
          payload?.rentOffer?.status == landlord_updated_offer ||
          payload?.rentOffer?.status == tenant_created_offer ||
          payload?.rentOffer?.status == tenant_updated_offer
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    case MAKE_RENTAL_PROPOSAL_UPDATE + 'rejected':
      if (payload?.roletype == 'tenant') {
        if (payload?.rentOffer?.status == 'landlord_rejected') {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    // MAKE RENTAL PROPOSAL DETAILS FOR TENANT & LANDLORD
    // SIMILAR FOR BOTH
    case MAKE_RENTAL_PROPOSAL_DETAILS:
      if (
        payload?.rentOffer?.status == 'created' ||
        payload?.rentOffer?.status == tenant_created_offer ||
        payload?.rentOffer?.status == tenant_updated_offer ||
        payload?.rentOffer?.status == landlord_updated_offer
      ) {
        return true
      } else {
        return false
      }

    // MAKE RENTAL PROPOSAL ACCEPT FOR TENANT & LANDLORD
    case MAKE_RENTAL_PROPOSAL_ACCEPT:
      if (payload?.roletype == 'tenant') {
        if (payload?.rentOffer?.status == landlord_updated_offer) {
          return true
        } else {
          return false
        }
      } else {
        if (
          payload?.rentOffer?.status == tenant_created_offer ||
          payload?.rentOffer?.status == tenant_updated_offer ||
          payload?.rentOffer?.status == 'created'
        ) {
          return true
        } else {
          return false
        }
      }

    // MAKE RENTAL PROPOSAL REJECT FOR LANDLORD
    case MAKE_RENTAL_PROPOSAL_REJECT:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.rentOffer?.status == tenant_created_offer ||
          payload?.rentOffer?.status == tenant_updated_offer ||
          payload?.rentOffer?.status == 'created'
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case MAKE_RENTAL_PROPOSAL_REQUEST:
      if (payload?.roletype == 'landlord') {
        if (payload?.viewingScheduleConfirmed?.progress_status == true && payload?.rentOffer?.id == '') {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    //-----------------------------------PAY_RESERVATION_FEE---------------------------------------------
    case PAY_RESERVATION_FEE_PAY:
      // return true
      if (payload?.roletype == 'tenant') {
        if (
          payload?.creditReportInfo?.progress_status == true &&
          (payload?.payBookingFee?.status == 'Pending' || payload?.payBookingFee?.status == 'Request Sent') &&
          !payload?.payBookingFee?.is_booking_by_others &&
          payload?.rentOffer?.progress_status == true
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case PAY_RESERVATION_FEE_REQUEST:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.rentOffer?.progress_status == true &&
          payload?.creditReportInfo?.progress_status == true &&
          (payload?.payBookingFee?.status == 'Pending' || payload?.payBookingFee?.status == 'Request Sent')
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    //-----------------------------------HDB---------------------------------------------
    case HDB_REQUEST:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.payBookingFee?.progress_status == true &&
          (payload?.hdbApproval?.status == 'Pending' || payload?.hdbApproval?.status == 'Request Sent to Landlord')
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case HDB_UPLOAD:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.payBookingFee?.progress_status == true &&
          (payload?.hdbApproval?.status == 'Pending' || payload?.hdbApproval?.status == 'Request from Tenant')
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case TENANT_DETAILS:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.payBookingFee?.progress_status == true &&
          (payload?.hdbApproval?.status == 'Pending' || payload?.hdbApproval?.status == 'Request from Tenant')
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case HDB_DETAILS:
      if (
        payload?.hdbApproval?.status === 'HDB letter uploaded' ||
        payload?.hdbApproval?.status === 'HDB Approval Successful'
      ) {
        return true
      } else {
        return false
      }

    //-----------------------------------AGREEMENT DRAFT AND SEND---------------------------------------------
    // SEND_AGREEMENT
    case SEND_AGREEMENT_CREATE:
      if (payload?.roletype == 'landlord') {
        if (
          (payload?.threadInfo?.property_sub_category == 'HDB'
            ? payload?.hdbApproval?.progress_status
            : payload?.payBookingFee?.progress_status) &&
          (payload?.tenancyAgreement?.status == 'You can create draft' ||
            payload?.tenancyAgreement?.status == 'Draft Requested' ||
            payload?.tenancyAgreement?.status == draft_requested)
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case SEND_AGREEMENT_UPDATE:
      if (payload?.roletype == 'landlord') {
        if (
          (payload?.tenancyAgreement?.status == draft_created || payload?.tenancyAgreement?.status == draft_send) &&
          payload?.tenancyAgreement?.tenant_signed == false
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case SEND_AGREEMENT_DETAILS:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.tenancyAgreement?.status == draft_send ||
          payload?.tenancyAgreement?.status == draft_sign_requested ||
          payload?.tenancyAgreement?.status == draft_tenant_sign ||
          payload?.tenancyAgreement?.status == draft_landlord_sign
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          payload?.tenancyAgreement?.status == draft_send ||
          payload?.tenancyAgreement?.status == draft_sign_requested ||
          payload?.tenancyAgreement?.status == draft_tenant_sign ||
          payload?.tenancyAgreement?.status == draft_landlord_sign ||
          payload?.tenancyAgreement?.status == draft_created ||
          payload?.tenancyAgreement?.status == 'Draft Requested'
        ) {
          return true
        } else {
          return false
        }
      }

    case SEND_AGREEMENT_SEND:
      // return true
      if (payload?.roletype == 'landlord') {
        if (payload?.tenancyAgreement?.status == draft_created) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case SEND_AGREEMENT_REQUEST:
      if (payload?.roletype == 'tenant') {
        if (
          (payload?.threadInfo?.property_sub_category == 'HDB'
            ? payload?.hdbApproval?.progress_status
            : payload?.payBookingFee?.progress_status) &&
          (payload?.tenancyAgreement?.status == 'You can request for draft' ||
            payload?.tenancyAgreement?.status == 'Draft Requested' ||
            payload?.tenancyAgreement?.status == draft_requested)
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    //-----------------------------------PAY_FIRST_MONTH_RENTAL---------------------------------------------
    // PAY_FIRST_MONTH_RENTAL
    case PAY_FIRST_MONTH_RENTAL_PAY:
      // return true
      if (payload?.roletype == 'tenant') {
        if (
          payload?.insurancePackage?.progress_status == true &&
          payload?.tenancyAgreement?.progress_status == true &&
          (payload?.firstMonthRental?.status == 'Pending' || payload?.firstMonthRental?.status == rentalRequested)
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case PAY_FIRST_MONTH_RENTAL_REQUEST:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.insurancePackage?.progress_status == true &&
          payload?.tenancyAgreement?.progress_status == true &&
          (payload?.insurancePackage?.status === 'Insurance Approval Successful') &&
          (payload?.firstMonthRental?.status == 'Pending' || payload?.firstMonthRental?.status == rentalRequested)
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    // return true
    // if (payload?.roletype == 'landlord') {
    //   if (
    //     payload?.insurancePackage?.progress_status == true &&
    //     payload?.tenancyAgreement?.progress_status == true && !(payload?.insurancePackage?.status === "Insurance Approval Successful") &&
    //     (payload?.firstMonthRental?.status == 'Pending' || payload?.firstMonthRental?.status == rentalRequested)
    //   ) {
    //     return true
    //   } else {
    //     return false
    //   }
    // } else {
    //   return false
    // }

    //-----------------------------------INSURANCE---------------------------------------------
    // INSURANCEANDREALEZY_SERVICE_FEE PAY
    case INSURANCE_AND_REALEZY_SERVICE_FEE_PAY:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.firstMonthRental?.progress_status == true &&
          (payload?.rzyServiceFee?.status === 'Pending' || payload?.rzyServiceFee?.status === 'Requested') &&
          payload?.tenancyAgreement?.status === 'tenant_sign'
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    // INSURANCE_AND_REALEZY_SERVICE_FEE REQUEST
    case INSURANCE_AND_REALEZY_SERVICE_FEE_REQUEST:
      return false

    //-----------------------------------SIGN_AGREEMENT---------------------------------------------
    // SIGN_AGREEMENT
    case SIGN_AGREEMENT_SIGN:
      if (payload?.roletype == 'tenant') {
        if (payload?.firstMonthRental?.progress_status == true && payload?.tenancyAgreement?.tenant_signed == false) {
          return true
        } else {
          return false
        }
      } else {
        if (
          payload?.tenancyAgreement?.tenant_signed == true &&
          payload?.tenancyAgreement?.landLord_signed == false &&
          payload?.rzyServiceFee?.status === 'Verified'
        ) {
          return true
        } else {
          return false
        }
      }

    case SIGN_AGREEMENT_UPDATE:
      return false

    case SIGN_AGREEMENT_REQUEST:
      if (payload?.roletype == 'landlord') {
        if (payload?.rzyServiceFee?.progress_status == true && payload?.tenancyAgreement?.tenant_signed == false) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    //-----------------------------------KEY HANDOVER---------------------------------------------
    // KEY_HANDOVER_SCHEDULE
    case KEY_HANDOVER_SCHEDULE_CREATE:
      if (
        payload?.keyHandover?.status == '' ||
        payload?.keyHandover?.status == 'Schedule Declined' ||
        payload?.keyHandover?.status == landlord_cancel_schedule ||
        payload?.keyHandover?.status == tenant_cancel_schedule
      ) {
        return true
      } else {
        return false
      }
    case KEY_HANDOVER_SCHEDULE_DETAILS:
      if (payload?.roletype == 'tenant') {
        if (
          (payload?.keyHandover?.status == `Request Sent Awaiting Landlord's Response` ||
            payload?.keyHandover?.status == tenant_create_schedule ||
            payload?.keyHandover?.status == tenant_reschedule ||
            payload?.keyHandover?.status == 'Tenant Changed Schedule') &&
          payload?.keyHandover?.inviterId == payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          (payload?.keyHandover?.status == `Request Sent Awaiting Tenant's Response` ||
            payload?.keyHandover?.status == landlord_create_schedule ||
            payload?.keyHandover?.status == landlord_reschedule ||
            payload?.keyHandover?.status == 'Landlord Changed Schedule') &&
          payload?.keyHandover?.inviterId == payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }
    case KEY_HANDOVER_SCHEDULE_EDIT:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.keyHandover?.id !== '' &&
          !payload?.keyHandover?.progress_status &&
          (payload?.keyHandover?.status == 'Received Schedule from Landlord' ||
            payload?.keyHandover?.status == tenant_receive_schedule ||
            payload?.keyHandover?.status == landlord_reschedule ||
            payload?.keyHandover?.status == 'Landlord Changed Schedule') &&
          payload?.keyHandover?.inviterId !== payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          payload?.keyHandover?.id !== '' &&
          !payload?.keyHandover?.progress_status &&
          (payload?.keyHandover?.status == 'Received Schedule from Tenant' ||
            payload?.keyHandover?.status == 'Tenant Changed Schedule' ||
            payload?.keyHandover?.status == landlord_receive_schedule ||
            payload?.keyHandover?.status == tenant_reschedule) &&
          payload?.keyHandover?.inviterId !== payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }

    case KEY_HANDOVER_SCHEDULE_ACCEPT:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.keyHandover?.id !== '' &&
          !payload?.keyHandover?.progress_status &&
          (payload?.keyHandover?.status == 'Received Schedule from Landlord' ||
            payload?.keyHandover?.status == tenant_receive_schedule ||
            payload?.keyHandover?.status == landlord_reschedule ||
            payload?.keyHandover?.status == 'Landlord Changed Schedule') &&
          payload?.keyHandover?.inviterId !== payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          payload?.keyHandover?.id !== '' &&
          !payload?.keyHandover?.progress_status &&
          (payload?.keyHandover?.status == 'Received Schedule from Tenant' ||
            payload?.keyHandover?.status == 'Tenant Changed Schedule' ||
            payload?.keyHandover?.status == landlord_receive_schedule ||
            payload?.keyHandover?.status == tenant_reschedule) &&
          payload?.keyHandover?.inviterId !== payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }

    case KEY_HANDOVER_SCHEDULE_CANCEL:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.keyHandover?.id !== '' &&
          !payload?.keyHandover?.progress_status &&
          (payload?.keyHandover?.status == 'Received Schedule from Landlord' ||
            payload?.keyHandover?.status == tenant_receive_schedule ||
            payload?.keyHandover?.status == landlord_reschedule ||
            payload?.keyHandover?.status == 'Landlord Changed Schedule') &&
          payload?.keyHandover?.inviterId !== payload?.threadInfo?.sender_id
        ) {
          return true
        } else {
          return false
        }
      } else {
        //FOR LANDLORD
        if (
          payload?.keyHandover?.id !== '' &&
          !payload?.keyHandover?.progress_status &&
          (payload?.keyHandover?.status == 'Received Schedule from Tenant' ||
            payload?.keyHandover?.status == 'Tenant Changed Schedule' ||
            payload?.keyHandover?.status == landlord_receive_schedule ||
            payload?.keyHandover?.status == tenant_reschedule) &&
          payload?.keyHandover?.inviterId !== payload?.threadInfo?.receiver_id
        ) {
          return true
        } else {
          return false
        }
      }

    case KEY_HANDOVER_SCHEDULE_COMPLETE:
      //FOR TENANT & LANDLORD BOTH
      if (
        payload?.keyHandover?.status == 'Landlord Accepted' ||
        payload?.keyHandover?.status == landlord_accept_schedule ||
        payload?.keyHandover?.status == tenant_accept_schedule ||
        payload?.keyHandover?.status == 'Tenant Accepted'
      ) {
        return true
      } else {
        return false
      }

    case KEY_HANDOVER_SCHEDULE_NOT_COMPLETED:
      //FOR TENANT & LANDLORD BOTH
      if (
        payload?.keyHandover?.status == 'Landlord Accepted' ||
        payload?.keyHandover?.status == landlord_accept_schedule ||
        payload?.keyHandover?.status == tenant_accept_schedule ||
        payload?.keyHandover?.status == 'Tenant Accepted'
      ) {
        return true
      } else {
        return false
      }

    //-----------------------------------CONDITION REPORT---------------------------------------------
    // CONDITION_REPORT_SIGNING
    case CONDITION_REPORT_SIGNING_CREATE:
      // return true
      if (payload?.roletype == 'landlord') {
        if (payload?.propertyCondition?.status == 'Pending' || payload?.propertyCondition?.status == draft_requested) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case CONDITION_REPORT_SIGNING_SEND:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.propertyCondition?.status == 'Landlord Added' ||
          payload?.propertyCondition?.status == draft_created
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case CONDITION_REPORT_SIGNING_REQUEST:
      if (payload?.roletype == 'tenant') {
        if (payload?.propertyCondition?.status == 'Pending' || payload?.propertyCondition == draft_requested) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case CONDITION_REPORT_SIGNING_DETAILS:
      if (payload?.roletype == 'tenant' || payload?.roletype == 'landlord') {
        if (
          payload?.propertyCondition?.status == 'Report Received' ||
          payload?.propertyCondition?.status == draft_send ||
          payload?.propertyCondition?.status == 'draft_created' ||
          (payload?.propertyCondition?.status != 'Pending' && payload?.propertyCondition?.is_tenant_sign == true)
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          payload?.propertyCondition?.status == 'Landlord Added' ||
          payload?.propertyCondition?.status == 'Tenant Signed' ||
          payload?.propertyCondition?.status == draft_tenant_sign ||
          payload?.propertyCondition?.status == draft_send ||
          payload?.propertyCondition?.status == draft_created ||
          payload?.propertyCondition?.status == 'Condition Report Signing Completed'
        ) {
          return true
        } else {
          return false
        }
      }

    case CONDITION_REPORT_SIGNING_SIGN:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.propertyCondition?.status == 'Report Received' ||
          payload?.propertyCondition?.status == draft_send
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          payload?.propertyCondition?.is_tenant_sign == true &&
          payload?.propertyCondition?.is_landlord_sign == false
        ) {
          return true
        } else {
          return false
        }
      }

    case CONDITION_REPORT_SIGNING_UPDATE:
      if (payload?.roletype == 'landlord') {
        if (
          (payload?.propertyCondition?.status == 'Landlord Added' ||
            payload?.propertyCondition?.status == 'Tenant Signed' ||
            payload?.propertyCondition?.status == draft_tenant_sign ||
            // payload?.propertyCondition?.status == draft_send ||
            payload?.propertyCondition?.status == draft_created) &&
          payload?.propertyCondition?.is_tenant_sign == false
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    // return false

    //-----------------------------------INVENTORY CHECKLIST---------------------------------------------
    // INVENTORY_CHECKLIST_SIGNING
    case INVENTORY_CHECKLIST_SIGNING_UPDATE:
      if (payload?.roletype == 'landlord') {
        if (payload?.itemChecklist?.status == 'List Created' && payload?.itemChecklist?.is_tenant_sign == false) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case INVENTORY_CHECKLIST_SIGNING_SIGN:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.keyHandover?.progress_status == true &&
          payload?.propertyCondition?.progress_status == true &&
          payload?.itemChecklist?.status == 'Added' &&
          payload?.itemChecklist?.is_tenant_sign == false
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          payload?.keyHandover?.progress_status == true &&
          payload?.propertyCondition?.progress_status == true &&
          payload?.itemChecklist?.status !== 'Pending' &&
          payload?.itemChecklist?.is_tenant_sign == true &&
          payload?.itemChecklist?.is_landlord_sign == false
        ) {
          return true
        } else {
          return false
        }
      }

    case INVENTORY_CHECKLIST_SIGNING_DETAILS:
      if (payload?.roletype == 'tenant') {
        if (
          (!(payload?.itemChecklist?.status == 'List Created') ||
            payload?.itemChecklist?.is_tenant_sign == true ||
            payload?.itemChecklist?.is_landLord_sign == true) &&
          !(payload?.itemChecklist?.status == 'Pending') &&
          (payload?.itemChecklist?.status == 'Added' ||
            !(payload?.itemChecklist?.status == 'Tenant Signed') ||
            payload?.itemChecklist?.is_tenant_sign == true ||
            payload?.itemChecklist?.is_landlord_sign == true ||
            payload?.itemChecklist?.is_landlord_sign == true)
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          (payload?.keyHandover?.progress_status == true &&
            payload?.propertyCondition?.progress_status == true &&
            payload?.itemChecklist?.status !== 'Pending' &&
            payload?.itemChecklist?.is_tenant_sign == true &&
            payload?.itemChecklist?.is_landlord_sign == true) ||
          payload?.itemChecklist?.status == 'List Created' ||
          payload?.itemChecklist?.status == 'Added' ||
          payload?.itemChecklist?.status == 'Tenant Signed'
        ) {
          return true
        } else {
          return false
        }
      }

    case INVENTORY_CHECKLIST_SIGNING_REQUEST:
      if (payload?.roletype == 'tenant') {
        if (
          payload?.keyHandover?.progress_status == true &&
          payload?.propertyCondition?.progress_status == true &&
          payload?.itemChecklist?.status == 'Pending'
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (payload?.itemChecklist?.status == 'Added' && payload?.itemChecklist?.is_tenant_sign == false) {
          return true
        } else {
          return false
        }
      }

    case INVENTORY_CHECKLIST_SIGNING_CREATE:
      // return true
      if (payload?.roletype == 'landlord') {
        if (
          payload?.keyHandover?.progress_status == true &&
          payload?.propertyCondition?.progress_status == true &&
          payload?.itemChecklist?.status == 'Pending'
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }

    case INVENTORY_CHECKLIST_SIGNING_SEND:
      if (payload?.roletype == 'landlord') {
        if (
          payload?.keyHandover?.progress_status == true &&
          payload?.propertyCondition?.progress_status == true &&
          payload?.itemChecklist?.status == 'List Created'
        ) {
          return true
        } else {
          return false
        }
      }
  }
}
