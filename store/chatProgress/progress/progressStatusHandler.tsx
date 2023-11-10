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
import {
  CONDITION_REPORT_SIGNING_STATUS,
  CONTACT_STATUS,
  HDB_STATUS,
  INSURANCE_AND_REALEZY_SERVICE_FEE_STATUS,
  INVENTORY_CHECKLIST_SIGNING_STATUS,
  KEY_HANDOVER_SCHEDULE_STATUS,
  MAKE_RENTAL_PROPOSAL_STATUS,
  PAY_FIRST_MONTH_RENTAL_STATUS,
  PAY_RESERVATION_FEE_STATUS,
  PROPERTY_VIEWING_SCHEDULE_STATUS,
  SEND_AGREEMENT_STATUS,
  SIGN_AGREEMENT_STATUS,
} from './constant'
import { getReservationFee } from '@/util'
import moment from 'moment'

//------------------PROGRESS STATUS HANDLER------------------//
let viewingCurrentStatus = ''
let viewingDateTime = ''
let rentOfferCurrentStatus = ''
let creatorId = ''
let agreementCurrentStatus = ''
let rentalPaymentCurrentStatus = ''
let agreementSigningStatus = ''
let keyHandoverCurrentStatus = ''
let keyHandoverDateTime = ''
let conditionReportCurrentStatus = ''
let itemChecklistCurrentStatus = ''

export const calculateIrasStampDutyAndGST = (offer_amount: any, years: any) => {
  const offerAmount = parseFloat(offer_amount)
  const stampDuty = 0.004 * parseInt(years) * 12 * offerAmount
  const GST = stampDuty * 0.08
  const stampDutyPlusGST = stampDuty + GST
  const totalAmount = offerAmount + stampDutyPlusGST
  return [stampDuty, GST, stampDutyPlusGST, totalAmount]
}

export const progressStatusHandler = (ctxtype: any, payload: any) => {
  const userId = payload?.session?.user?.id
  const isLandlord = payload?.roletype == 'landlord' ? true : false

  switch (ctxtype) {
    // CONTACT STATUS FOR BOTH TENANT AND LANDLORD
    case CONTACT_STATUS:
      if (payload?.contactTenant) {
        return 'Completed'
      } else {
        return ''
      }

    // PROPERTY VIEWING SCHEDULE STATUS FOR TENANT AND LANDLORD

    case PROPERTY_VIEWING_SCHEDULE_STATUS:
      viewingCurrentStatus = payload?.viewingScheduleConfirmed?.status
      viewingDateTime =
        payload?.viewingScheduleConfirmed?.selected_date + ' ' + payload?.viewingScheduleConfirmed?.selected_time

      viewingDateTime = moment(viewingDateTime).format('DD MMM YYYY hh:mm A')

      if (
        viewingCurrentStatus == landlord_create_schedule ||
        viewingCurrentStatus == "Request Sent Awaiting Tenant's Response"
      ) {
        return house_viewing_create_landlord + ' ' + viewingDateTime
      }
      if (
        viewingCurrentStatus == tenant_create_schedule ||
        viewingCurrentStatus == "Request Sent Awaiting Landlord's Response"
      ) {
        return house_viewing_create_tenant + ' ' + viewingDateTime
      }
      if (
        viewingCurrentStatus == tenant_accept_schedule ||
        viewingCurrentStatus == 'Landlord Accepted' ||
        viewingCurrentStatus == 'Tenant Accepted' ||
        viewingCurrentStatus == landlord_accept_schedule
      ) {
        return house_viewing_complete + ' ' + viewingDateTime
      }
      if (viewingCurrentStatus == schedule_completed || viewingCurrentStatus == 'Schedule Completed') {
        return house_viewing_completed + ' ' + viewingDateTime
      }
      if (viewingCurrentStatus == landlord_cancel_schedule || viewingCurrentStatus == 'Schedule Declined') {
        return house_viewing_cancel_landlord + ' ' + viewingDateTime
      }
      if (viewingCurrentStatus == tenant_cancel_schedule || viewingCurrentStatus == 'Schedule Declined') {
        return house_viewing_cancel_tenant + ' ' + viewingDateTime
      }
      if (viewingCurrentStatus == tenant_reschedule || viewingCurrentStatus == 'Tenant Changed Schedule') {
        return house_viewing_reschedule_tenant + ' ' + viewingDateTime
      }
      if (viewingCurrentStatus == landlord_reschedule || viewingCurrentStatus == 'Landlord Changed Schedule') {
        return house_viewing_reschedule_landlord + ' ' + viewingDateTime
      }
      if (viewingCurrentStatus == skipped_schedule) {
        return house_viewing_skipped + ' ' + viewingDateTime
      } else if (
        viewingCurrentStatus == landlord_receive_schedule ||
        viewingCurrentStatus == 'Received Schedule from Tenant'
      ) {
        return house_viewing_from_tenant + ' ' + viewingDateTime
      } else if (
        viewingCurrentStatus == tenant_receive_schedule ||
        viewingCurrentStatus == 'Received Schedule from Landlord'
      ) {
        return house_viewing_from_landlord + ' ' + viewingDateTime
      } else {
        return 'Tap to schedule'
      }

    // MAKE RENTAL PROPOSAL STATUS FOR TENANT AND LANDLORD
    case MAKE_RENTAL_PROPOSAL_STATUS:
      rentOfferCurrentStatus = payload?.rentOffer?.status
      creatorId = payload?.rentOffer?.creator
      if (
        (rentOfferCurrentStatus == tenant_created_offer || rentOfferCurrentStatus == 'created') &&
        userId == creatorId
      ) {
        return offer_message + ' ' + parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      } else if (
        (rentOfferCurrentStatus == tenant_updated_offer || rentOfferCurrentStatus == 'tenant_edited') &&
        isLandlord == false
      ) {
        return update_offer_message + ' ' + parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      } else if (
        (rentOfferCurrentStatus == landlord_updated_offer || rentOfferCurrentStatus == 'landlord_edited') &&
        isLandlord == true
      ) {
        return update_offer_message + ' ' + parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      } else if (
        (rentOfferCurrentStatus == tenant_created_offer || rentOfferCurrentStatus == 'created') &&
        userId != creatorId
      ) {
        return landlord_offer_message + ' ' + parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      } else if (
        (rentOfferCurrentStatus == landlord_updated_offer || rentOfferCurrentStatus == 'landlord_edited') &&
        isLandlord == false
      ) {
        return landlord_update_offer_message
      } else if (
        (rentOfferCurrentStatus == tenant_updated_offer || rentOfferCurrentStatus == 'tenant_edited') &&
        isLandlord == true
      ) {
        return tenant_update_offer_message + ' ' + parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      } else if (
        (rentOfferCurrentStatus == landlord_requested_offer || rentOfferCurrentStatus == 'requested') &&
        isLandlord
      ) {
        return landlord_request_offer
      } else if (
        (rentOfferCurrentStatus == landlord_requested_offer || rentOfferCurrentStatus == 'requested') &&
        !isLandlord
      ) {
        return tenant_get_offer_request
      } else if (rentOfferCurrentStatus == tenant_accepted_offer && !isLandlord) {
        return offer_accepted
      } else if (rentOfferCurrentStatus == tenant_accepted_offer && isLandlord) {
        return tenant_accepted
      } else if (rentOfferCurrentStatus == landlord_accepted_offer && !isLandlord) {
        return landlord_accepted + ' ' + parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      } else if (rentOfferCurrentStatus == landlord_accepted_offer && isLandlord) {
        return offer_accepted + ' ' + parseInt(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      } else if (rentOfferCurrentStatus == landlord_rejected_offer && isLandlord) {
        return 'You rejected the rental offer'
      } else if (rentOfferCurrentStatus == landlord_rejected_offer && !isLandlord) {
        return 'Landlord rejected the rental offer'
      } else {
        return 'Pending'
      }

    // MAKE RENTAL PROPOSAL STATUS FOR TENANT AND LANDLORD
    case PAY_RESERVATION_FEE_STATUS:
      if (payload?.roletype == 'landlord') {
        if (payload?.payBookingFee?.status == 'Pending') {
          return payload?.rentOffer?.offer_amount === '0.00' || payload?.rentOffer?.offer_amount === "" ? "Pending" : 'Click to request for payment'
        } else {
          return payload?.payBookingFee?.status
        }
      } else {
        if (payload?.payBookingFee?.status == 'Pending') {
          return (payload?.rentOffer?.offer_amount === '0.00' || payload?.rentOffer?.offer_amount === "" ? "Pending" : `Please pay reservation fee amount ${getReservationFee(payload?.rentOffer?.offer_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`)
        } else {
          return payload?.payBookingFee?.status
        }
      }

    // HDB STATUS FOR TENANT AND LANDLORD
    case HDB_STATUS:
      return payload?.hdbApproval?.status

    // SEND AGREEMENT STATUS FOR TENANT AND LANDLORD
    case SEND_AGREEMENT_STATUS:
      agreementCurrentStatus = payload?.tenancyAgreement?.status
      if (agreementCurrentStatus == draft_created && isLandlord) {
        return 'You Created The property draft Agreement For tenant'
      } else if (agreementCurrentStatus == draft_created && !isLandlord) {
        return 'Landlord created agreement awaiting for share'
      } else if (agreementCurrentStatus == draft_requested && !isLandlord) {
        return 'You Requested to landlord for Property Draft Agreement'
      } else if (agreementCurrentStatus == draft_requested && isLandlord) {
        return 'Please Provide The Property Draft Agreement'
      } else if (agreementCurrentStatus == draft_send && !isLandlord) {
        return 'Landlord Shared The Property Draft Agreement With You'
      } else if (agreementCurrentStatus == draft_send && isLandlord) {
        return 'You Shared The Property Draft Agreement With tenant'
      } else if (agreementCurrentStatus != 'You can create draft' && isLandlord) {
        return 'You Shared The Property Draft Agreement With tenant'
      } else if (agreementCurrentStatus != 'You can request for draft' && !isLandlord) {
        return 'Landlord Shared The Property Draft Agreement With You'
      } else if (agreementCurrentStatus == 'You can create draft' && isLandlord) {
        return 'Create and Share Agreement'
      } else if (agreementCurrentStatus == 'You can request for draft' && !isLandlord) {
        return 'Awaiting for Agreement'
      } else {
        return ''
      }

    case PAY_FIRST_MONTH_RENTAL_STATUS:
      rentalPaymentCurrentStatus = payload?.firstMonthRental?.status
      if (rentalPaymentCurrentStatus == 'Pending' && isLandlord) {
        return 'Request Tenant to pay FirstMonth Rental Fee'
      } else if (rentalPaymentCurrentStatus == 'Pending' && !isLandlord) {
        return 'Please Pay FirstMonth Rental Fee'
      } else if (rentalPaymentCurrentStatus == rentalRequested && isLandlord) {
        return 'You Requested Tenant to pay FirstMonth Rental Fee'
      } else if (rentalPaymentCurrentStatus == rentalRequested && !isLandlord) {
        return `Landlord Requested You to pay FirstMonth Rental Fee Amount of $${calculateIrasStampDutyAndGST(payload?.rentOffer.offer_amount, payload?.rentOffer?.tenancy_period)[3]}`
      } else if (rentalPaymentCurrentStatus == tenantPaid && isLandlord) {
        return 'Tenant Paid FirstMonth Rental Fee Awaiting for verification'
      } else if (rentalPaymentCurrentStatus == tenantPaid && !isLandlord) {
        return `You Paid FirstMonth Rental Fee Awaiting for verification Amount of $${calculateIrasStampDutyAndGST(payload?.rentOffer.offer_amount, payload?.rentOffer?.tenancy_period)[3]}`
      } else if (rentalPaymentCurrentStatus == 'Done') {
        return `FirstMonth Rental Fee Paid Amount of $${calculateIrasStampDutyAndGST(payload?.rentOffer.offer_amount, payload?.rentOffer?.tenancy_period)[3]}`
      } else {
        return rentalPaymentCurrentStatus
      }

    case INSURANCE_AND_REALEZY_SERVICE_FEE_STATUS:
      if (payload?.rzyServiceFee?.status === 'Uploaded') {
        return 'Payment Receipt uploaded'
      } else if (payload?.rzyServiceFee?.status === 'Verified') {
        return 'Payment Receipt Verified'
      } else {
        return payload?.rzyServiceFee?.status
      }

    case SIGN_AGREEMENT_STATUS:
      agreementSigningStatus = payload?.tenancyAgreement?.status
      if (agreementSigningStatus == draft_send && !isLandlord) {
        return 'Awaiting for signing'
      } else if (agreementSigningStatus == draft_send && isLandlord) {
        return 'Awaiting for signing'
      } else if (agreementSigningStatus == draft_sign_requested && !isLandlord) {
        return 'Landlord Requested You To Sign The Property Agreement'
      } else if (agreementSigningStatus == draft_sign_requested && isLandlord) {
        return 'You Requested Tenant To Sign The Property Agreement'
      } else if (agreementSigningStatus == draft_tenant_sign && !isLandlord) {
        return 'Waiting For landlord Sign The Property Agreement'
      } else if (agreementSigningStatus == draft_tenant_sign && isLandlord) {
        return 'Please Sign The Property Agreement'
      } else if (agreementSigningStatus == draft_landlord_sign) {
        return 'The Property Agreement Signing Completed'
      } else {
        return ''
      }

    // KEY HANDOVER SCHEDULE STATUS FOR TENANT AND LANDLORD
    case KEY_HANDOVER_SCHEDULE_STATUS:
      keyHandoverCurrentStatus = payload?.keyHandover?.status
      keyHandoverDateTime = payload?.keyHandover?.selected_date + ' ' + payload?.keyHandover?.selected_time
      if (
        keyHandoverCurrentStatus == landlord_create_schedule ||
        keyHandoverCurrentStatus == "Request Sent Awaiting Tenant's Response"
      ) {
        return Key_handOver_create_landlord + ' ' + keyHandoverDateTime
      }
      if (
        keyHandoverCurrentStatus == tenant_create_schedule ||
        keyHandoverCurrentStatus == "Request Sent Awaiting Landlord's Response"
      ) {
        return Key_handOver_create_tenant + ' ' + keyHandoverDateTime
      }
      if (
        keyHandoverCurrentStatus == tenant_accept_schedule ||
        keyHandoverCurrentStatus == 'Landlord Accepted' ||
        keyHandoverCurrentStatus == 'Tenant Accepted' ||
        keyHandoverCurrentStatus == landlord_accept_schedule
      ) {
        return Key_handOver_complete + ' ' + keyHandoverDateTime
      }
      if (keyHandoverCurrentStatus == schedule_completed || keyHandoverCurrentStatus == 'Schedule Completed') {
        return Key_handOver_completed + ' ' + keyHandoverDateTime
      }
      if (keyHandoverCurrentStatus == landlord_cancel_schedule || keyHandoverCurrentStatus == 'Schedule Declined') {
        return Key_handOver_cancel_landlord + ' ' + keyHandoverDateTime
      }
      if (keyHandoverCurrentStatus == tenant_cancel_schedule || keyHandoverCurrentStatus == 'Schedule Declined') {
        return Key_handOver_cancel_tenant + ' ' + keyHandoverDateTime
      }
      if (keyHandoverCurrentStatus == tenant_reschedule || keyHandoverCurrentStatus == 'Tenant Changed Schedule') {
        return Key_handOver_reschedule_tenant + ' ' + keyHandoverDateTime
      }
      if (keyHandoverCurrentStatus == landlord_reschedule || keyHandoverCurrentStatus == 'Landlord Changed Schedule') {
        return Key_handOver_reschedule_landlord + ' ' + keyHandoverDateTime
      } else if (
        keyHandoverCurrentStatus == landlord_receive_schedule ||
        keyHandoverCurrentStatus == 'Received Schedule from Tenant'
      ) {
        return Key_handOver_from_tenant + ' ' + keyHandoverDateTime
      } else if (
        keyHandoverCurrentStatus == tenant_receive_schedule ||
        keyHandoverCurrentStatus == 'Received Schedule from Landlord'
      ) {
        return Key_handOver_from_landlord + ' ' + keyHandoverDateTime
      } else {
        return keyHandoverCurrentStatus + ' ' + keyHandoverDateTime
      }

    case CONDITION_REPORT_SIGNING_STATUS:
      conditionReportCurrentStatus = payload?.propertyCondition?.status
      if (conditionReportCurrentStatus == 'Pending' && isLandlord) {
        return 'Create & Sent The Property condition report'
      } else if (conditionReportCurrentStatus == 'Pending' && !isLandlord) {
        return 'Request for The Property condition report'
      } else if (conditionReportCurrentStatus == draft_requested && isLandlord) {
        return 'Please Provide The Property Condition report'
      } else if (conditionReportCurrentStatus == draft_requested && !isLandlord) {
        return 'You Request Landlord For The Property Condition report'
      } else if (
        (conditionReportCurrentStatus == 'Tenant Added' || conditionReportCurrentStatus == tenant_added) &&
        isLandlord
      ) {
        return 'Tenant Modified The Property Condition Report'
      } else if (
        (conditionReportCurrentStatus == 'Tenant Added' || conditionReportCurrentStatus == tenant_added) &&
        !isLandlord
      ) {
        return 'You Modified The Property Condition Report'
      } else if (
        (conditionReportCurrentStatus == 'Landlord Added' || conditionReportCurrentStatus == draft_created) &&
        isLandlord
      ) {
        return 'You Create The Property Condition Report'
      } else if (
        (conditionReportCurrentStatus == 'Landlord Added' || conditionReportCurrentStatus == draft_created) &&
        !isLandlord
      ) {
        return 'Awaiting for Share The Property Condition Report'
      } else if (
        (conditionReportCurrentStatus == 'Report Sent' || conditionReportCurrentStatus == draft_send) &&
        isLandlord
      ) {
        return 'You Shared The Property Condition Report With tenant'
      } else if (
        (conditionReportCurrentStatus == 'Report Sent' || conditionReportCurrentStatus == draft_send) &&
        !isLandlord
      ) {
        return 'Landlord Shared The Property Condition Report With You'
      } else if (conditionReportCurrentStatus == 'Report Received') {
        return 'List received - review & sign'
      } else if (
        (conditionReportCurrentStatus == 'Tenant Signed' || conditionReportCurrentStatus == draft_tenant_sign) &&
        !isLandlord
      ) {
        return 'Awaiting for landlord signature'
      } else if (
        (conditionReportCurrentStatus == 'Tenant Signed' || conditionReportCurrentStatus == draft_tenant_sign) &&
        isLandlord
      ) {
        return 'Please Sign for completing the property condition report'
      } else if (
        (conditionReportCurrentStatus == 'Landlord Signed' || conditionReportCurrentStatus == draft_landlord_sign) &&
        isLandlord
      ) {
        return 'The Property Condition Report Signing Completed'
      } else {
        return conditionReportCurrentStatus
      }

    case INVENTORY_CHECKLIST_SIGNING_STATUS:
      itemChecklistCurrentStatus = payload?.itemChecklist?.status
      if (payload?.roletype === 'tenant') {
        if (itemChecklistCurrentStatus == 'Pending') {
          return 'Request for checklist'
        } else if (itemChecklistCurrentStatus == 'List Created') {
          return 'List modified, awaiting for Confirmation'
        } else if (itemChecklistCurrentStatus == 'Added') {
          return 'List received - review & sign'
        } else if (itemChecklistCurrentStatus == 'Tenant Signed') {
          return 'Awaiting for landlord signature'
        } else if (itemChecklistCurrentStatus == 'Landlord Signed') {
          return 'Report signed'
        } else {
          return itemChecklistCurrentStatus
        }
      } else {
        if (itemChecklistCurrentStatus == 'Pending') {
          return 'Prepare & send list'
        } else if (itemChecklistCurrentStatus == 'List Created') {
          return 'List modified, Ready for sent to tenant'
        } else if (itemChecklistCurrentStatus == 'Added') {
          return 'List sent, awaiting for tenant review'
        } else if (itemChecklistCurrentStatus == 'Tenant Signed') {
          return 'Sign to proceed'
        } else if (itemChecklistCurrentStatus == 'Landlord Signed') {
          return 'Report signed'
        } else {
          return itemChecklistCurrentStatus
        }
      }

    default:
      return ''
  }
}
