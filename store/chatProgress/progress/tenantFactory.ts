import {
  buttonHandler,
  buttonStateHandler,
  progressInfoHandler,
  progressStateHandler,
  progressStatusHandler,
} from './buttonHandler'
import {
  CONDITION_REPORT_SIGNING_CREATE,
  CONDITION_REPORT_SIGNING_DETAILS,
  CONDITION_REPORT_SIGNING_REQUEST,
  CONDITION_REPORT_SIGNING_SEND,
  CONDITION_REPORT_SIGNING_SIGN,
  CONDITION_REPORT_SIGNING_STATUS,
  CONDITION_REPORT_SIGNING_UPDATE,
  CONTACT_STATUS,
  HDB_DETAILS,
  HDB_REQUEST,
  HDB_STATUS,
  HDB_UPLOAD,
  INSURANCE_AND_REALEZY_SERVICE_FEE_PAY,
  INSURANCE_AND_REALEZY_SERVICE_FEE_REQUEST,
  INSURANCE_AND_REALEZY_SERVICE_FEE_STATUS,
  INVENTORY_CHECKLIST_SIGNING_CREATE,
  INVENTORY_CHECKLIST_SIGNING_DETAILS,
  INVENTORY_CHECKLIST_SIGNING_REQUEST,
  INVENTORY_CHECKLIST_SIGNING_SEND,
  INVENTORY_CHECKLIST_SIGNING_SIGN,
  INVENTORY_CHECKLIST_SIGNING_STATUS,
  INVENTORY_CHECKLIST_SIGNING_UPDATE,
  KEY_HANDOVER_SCHEDULE_ACCEPT,
  KEY_HANDOVER_SCHEDULE_CANCEL,
  KEY_HANDOVER_SCHEDULE_COMPLETE,
  KEY_HANDOVER_SCHEDULE_CREATE,
  KEY_HANDOVER_SCHEDULE_DETAILS,
  KEY_HANDOVER_SCHEDULE_EDIT,
  KEY_HANDOVER_SCHEDULE_NOT_COMPLETED,
  KEY_HANDOVER_SCHEDULE_STATUS,
  MAKE_RENTAL_PROPOSAL_ACCEPT,
  MAKE_RENTAL_PROPOSAL_CREATE,
  MAKE_RENTAL_PROPOSAL_DETAILS,
  MAKE_RENTAL_PROPOSAL_REJECT,
  MAKE_RENTAL_PROPOSAL_REQUEST,
  MAKE_RENTAL_PROPOSAL_STATUS,
  MAKE_RENTAL_PROPOSAL_UPDATE,
  PAY_FIRST_MONTH_RENTAL_PAY,
  PAY_FIRST_MONTH_RENTAL_REQUEST,
  PAY_FIRST_MONTH_RENTAL_STATUS,
  PAY_RESERVATION_FEE_PAY,
  PAY_RESERVATION_FEE_REQUEST,
  PAY_RESERVATION_FEE_STATUS,
  PROPERTY_VIEWING_SCHEDULE_ACCEPT,
  PROPERTY_VIEWING_SCHEDULE_CANCEL,
  PROPERTY_VIEWING_SCHEDULE_CREATE,
  PROPERTY_VIEWING_SCHEDULE_DETAILS,
  PROPERTY_VIEWING_SCHEDULE_STATUS,
  PROPERTY_VIEWING_SCHEDULE_UPDATE,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED,
  SEND_AGREEMENT_CREATE,
  SEND_AGREEMENT_DETAILS,
  SEND_AGREEMENT_REQUEST,
  SEND_AGREEMENT_SEND,
  SEND_AGREEMENT_STATUS,
  SEND_AGREEMENT_UPDATE,
  SIGN_AGREEMENT_REQUEST,
  SIGN_AGREEMENT_SIGN,
  SIGN_AGREEMENT_STATUS,
  SIGN_AGREEMENT_UPDATE,
  TENANT_DETAILS,
} from './constant'

const tenantFactory = (payload: any) => {
  // Todo
  let ctxstat: any = {
    Contact: {
      status: progressStateHandler(`Contact`, payload),
      progInfo: progressInfoHandler(`Contact`, payload),
      title: progressStatusHandler(CONTACT_STATUS, payload),
    },
    'Property Viewing Schedule': {
      status: progressStateHandler('Property Viewing Schedule', payload),
      progInfo: progressInfoHandler('Property Viewing Schedule', payload),
      title: progressStatusHandler(PROPERTY_VIEWING_SCHEDULE_STATUS, payload),
      buttons: {
        Create: [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_CREATE, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_CREATE, payload),
        ],
        Details: [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_DETAILS, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_DETAILS, payload),
        ],
        Reschedule: [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_UPDATE, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_UPDATE, payload),
        ],
        Accept: [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_ACCEPT, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_ACCEPT, payload),
        ],
        Reject: [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_CANCEL, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_CANCEL, payload),
        ],
        'Not Required': [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED, payload),
        ],
        'Viewing Complete': [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE, payload),
        ],
        'Viewing Not Complete': [
          buttonStateHandler(PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED, payload),
          () => buttonHandler(PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED, payload),
        ],
      },
    },
    'Make Rental Proposal': {
      status: progressStateHandler('Make Rental Proposal', payload),
      progInfo: progressInfoHandler('Make Rental Proposal', payload),
      title: progressStatusHandler(MAKE_RENTAL_PROPOSAL_STATUS, payload),
      buttons: {
        'Make Offer': [
          buttonStateHandler(MAKE_RENTAL_PROPOSAL_CREATE, payload),
          () => buttonHandler(MAKE_RENTAL_PROPOSAL_CREATE, payload),
        ],
        Edit: [
          buttonStateHandler(MAKE_RENTAL_PROPOSAL_UPDATE, payload),
          () => buttonHandler(MAKE_RENTAL_PROPOSAL_UPDATE, payload),
        ],
        'Update Offer': [
          buttonStateHandler(MAKE_RENTAL_PROPOSAL_UPDATE+'rejected', payload),
          () => buttonHandler(MAKE_RENTAL_PROPOSAL_UPDATE, payload),
        ],
        Details: [
          buttonStateHandler(MAKE_RENTAL_PROPOSAL_DETAILS, payload),
          () => buttonHandler(MAKE_RENTAL_PROPOSAL_DETAILS, payload),
        ],
        Accept: [
          buttonStateHandler(MAKE_RENTAL_PROPOSAL_ACCEPT, payload),
          () => buttonHandler(MAKE_RENTAL_PROPOSAL_ACCEPT, payload),
        ],
        Reject: [
          buttonStateHandler(MAKE_RENTAL_PROPOSAL_REJECT, payload),
          () => buttonHandler(MAKE_RENTAL_PROPOSAL_REJECT, payload),
        ],
        Request: [
          buttonStateHandler(MAKE_RENTAL_PROPOSAL_REQUEST, payload),
          () => buttonHandler(MAKE_RENTAL_PROPOSAL_REQUEST, payload),
        ],
      },
      // buttons: {
      //   'Make Offer': [true, () => buttonHandler(MAKE_RENTAL_PROPOSAL_CREATE, payload)],
      //   Update: [true, () => buttonHandler(MAKE_RENTAL_PROPOSAL_UPDATE, payload)],
      //   Details: [true, () => buttonHandler(MAKE_RENTAL_PROPOSAL_DETAILS, payload)],
      //   Accept: [true, () => buttonHandler(MAKE_RENTAL_PROPOSAL_ACCEPT, payload)],
      //   Reject: [true, () => buttonHandler(MAKE_RENTAL_PROPOSAL_REJECT, payload)],
      //   Request: [true, () => buttonHandler(MAKE_RENTAL_PROPOSAL_REQUEST, payload)],
      // },
    },
    'Pay Reservation Fee': {
      status: progressStateHandler('Pay Reservation Fee', payload),
      progInfo: progressInfoHandler('Pay Reservation Fee', payload),
      title: progressStatusHandler(PAY_RESERVATION_FEE_STATUS, payload),
      buttons: {
        'Pay Now': [
          buttonStateHandler(PAY_RESERVATION_FEE_PAY, payload),
          () => buttonHandler(PAY_RESERVATION_FEE_PAY, payload),
        ],
        Request: [
          buttonStateHandler(PAY_RESERVATION_FEE_REQUEST, payload),
          () => buttonHandler(PAY_RESERVATION_FEE_REQUEST, payload),
        ],
      },
    },
    HDB: {
      status: progressStateHandler('HDB', payload),
      progInfo: progressInfoHandler('HDB', payload),
      title: progressStatusHandler(HDB_STATUS, payload),
      buttons: {
        'Tenant Details': [buttonStateHandler(TENANT_DETAILS, payload), () => buttonHandler(TENANT_DETAILS, payload)],
        Request: [buttonStateHandler(HDB_REQUEST, payload), () => buttonHandler(HDB_REQUEST, payload)],
        Upload: [buttonStateHandler(HDB_UPLOAD, payload), () => buttonHandler(HDB_UPLOAD, payload)],
        Details: [buttonStateHandler(HDB_DETAILS, payload), () => buttonHandler(HDB_DETAILS, payload)],
      },
    },
    'Send Agreement': {
      status: progressStateHandler('Send Agreement', payload),
      progInfo: progressInfoHandler('Send Agreement', payload),
      title: progressStatusHandler(SEND_AGREEMENT_STATUS, payload),
      buttons: {
        Create: [
          buttonStateHandler(SEND_AGREEMENT_CREATE, payload),
          () => buttonHandler(SEND_AGREEMENT_CREATE, payload),
        ],
        Update: [
          buttonStateHandler(SEND_AGREEMENT_UPDATE, payload),
          () => buttonHandler(SEND_AGREEMENT_UPDATE, payload),
        ],
        Details: [
          buttonStateHandler(SEND_AGREEMENT_DETAILS, payload),
          () => buttonHandler(SEND_AGREEMENT_DETAILS, payload),
        ],
        Send: [buttonStateHandler(SEND_AGREEMENT_SEND, payload), () => buttonHandler(SEND_AGREEMENT_SEND, payload)],
        Request: [
          buttonStateHandler(SEND_AGREEMENT_REQUEST, payload),
          () => buttonHandler(SEND_AGREEMENT_REQUEST, payload),
        ],
      },
    },
    'Pay First Month Rental': {
      status: progressStateHandler('Pay First Month Rental', payload),
      progInfo: progressInfoHandler('Pay First Month Rental', payload),
      title: progressStatusHandler(PAY_FIRST_MONTH_RENTAL_STATUS, payload),
      buttons: {
        Pay: [
          buttonStateHandler(PAY_FIRST_MONTH_RENTAL_PAY, payload),
          () => buttonHandler(PAY_FIRST_MONTH_RENTAL_PAY, payload),
        ],
        Request: [
          buttonStateHandler(PAY_FIRST_MONTH_RENTAL_REQUEST, payload),
          () => buttonHandler(PAY_FIRST_MONTH_RENTAL_REQUEST, payload),
        ],
      },
    },
    'Insurance & Realezy Service Fee': {
      status: progressStateHandler('Insurance & Realezy Service Fee', payload),
      progInfo: progressInfoHandler('Insurance & Realezy Service Fee', payload),
      title: progressStatusHandler(INSURANCE_AND_REALEZY_SERVICE_FEE_STATUS, payload),
      buttons: {
        Upload: [
          buttonStateHandler(INSURANCE_AND_REALEZY_SERVICE_FEE_PAY, payload),
          () => buttonHandler(INSURANCE_AND_REALEZY_SERVICE_FEE_PAY, payload),
        ],
        Request: [
          buttonStateHandler(INSURANCE_AND_REALEZY_SERVICE_FEE_REQUEST, payload),
          () => buttonHandler(INSURANCE_AND_REALEZY_SERVICE_FEE_REQUEST, payload),
        ],
      },
    },
    'Sign Agreement': {
      status: progressStateHandler('Sign Agreement', payload),
      progInfo: progressInfoHandler('Sign Agreement', payload),
      title: progressStatusHandler(SIGN_AGREEMENT_STATUS, payload),
      buttons: {
        Sign: [buttonStateHandler(SIGN_AGREEMENT_SIGN, payload), () => buttonHandler(SIGN_AGREEMENT_SIGN, payload)],
        Update: [
          buttonStateHandler(SIGN_AGREEMENT_UPDATE, payload),
          () => buttonHandler(SIGN_AGREEMENT_UPDATE, payload),
        ],
        Request: [
          buttonStateHandler(SIGN_AGREEMENT_REQUEST, payload),
          () => buttonHandler(SIGN_AGREEMENT_REQUEST, payload),
        ],
      },
    },
    // 'Key Handover Schedule': {status: progressStateHandler('Key Handover Schedule', payload), progInfo: progressInfoHandler('Key Handover Schedule', payload), title: progressStatusHandler(KEY_HANDOVER_SCHEDULE_STATUS, payload), buttons: {
    //   'Create': [buttonStateHandler(KEY_HANDOVER_SCHEDULE_CREATE, payload), () => buttonHandler(KEY_HANDOVER_SCHEDULE_CREATE)],
    //   'Details': [buttonStateHandler(KEY_HANDOVER_SCHEDULE_DETAILS, payload), () => buttonHandler(KEY_HANDOVER_SCHEDULE_DETAILS)],
    //   'Update': [buttonStateHandler(KEY_HANDOVER_SCHEDULE_EDIT, payload), () => buttonHandler(KEY_HANDOVER_SCHEDULE_EDIT)],
    //   'Accept': [buttonStateHandler(KEY_HANDOVER_SCHEDULE_ACCEPT, payload), () => buttonHandler(KEY_HANDOVER_SCHEDULE_ACCEPT)],
    //   'Cancel': [buttonStateHandler(KEY_HANDOVER_SCHEDULE_CANCEL, payload), () => buttonHandler(KEY_HANDOVER_SCHEDULE_CANCEL)],
    //   'Viewing Completed': [buttonStateHandler(KEY_HANDOVER_SCHEDULE_COMPLETE, payload), () => buttonHandler(KEY_HANDOVER_SCHEDULE_COMPLETE)],
    //   'Viewing Not Completed': [buttonStateHandler(KEY_HANDOVER_SCHEDULE_NOT_COMPLETED, payload), () => buttonHandler(KEY_HANDOVER_SCHEDULE_NOT_COMPLETED)],
    // }},
    'Key Handover Schedule': {
      status: progressStateHandler('Key Handover Schedule', payload),
      progInfo: progressInfoHandler('Key Handover Schedule', payload),
      title: progressStatusHandler(KEY_HANDOVER_SCHEDULE_STATUS, payload),
      buttons: {
        Create: [
          buttonStateHandler(KEY_HANDOVER_SCHEDULE_CREATE, payload),
          () => buttonHandler(KEY_HANDOVER_SCHEDULE_CREATE, payload),
        ],
        Details: [
          buttonStateHandler(KEY_HANDOVER_SCHEDULE_DETAILS, payload),
          () => buttonHandler(KEY_HANDOVER_SCHEDULE_DETAILS, payload),
        ],
        Update: [
          buttonStateHandler(KEY_HANDOVER_SCHEDULE_EDIT, payload),
          () => buttonHandler(KEY_HANDOVER_SCHEDULE_EDIT, payload),
        ],
        Accept: [
          buttonStateHandler(KEY_HANDOVER_SCHEDULE_ACCEPT, payload),
          () => buttonHandler(KEY_HANDOVER_SCHEDULE_ACCEPT, payload),
        ],
        Cancel: [
          buttonStateHandler(KEY_HANDOVER_SCHEDULE_CANCEL, payload),
          () => buttonHandler(KEY_HANDOVER_SCHEDULE_CANCEL, payload),
        ],
        'Viewing Completed': [
          buttonStateHandler(KEY_HANDOVER_SCHEDULE_COMPLETE, payload),
          () => buttonHandler(KEY_HANDOVER_SCHEDULE_COMPLETE, payload),
        ],
        'Viewing Not Completed': [
          buttonStateHandler(KEY_HANDOVER_SCHEDULE_NOT_COMPLETED, payload),
          () => buttonHandler(KEY_HANDOVER_SCHEDULE_NOT_COMPLETED, payload),
        ],
      },
    },
    'Condition Report Signing': {
      status: progressStateHandler('Condition Report Signing', payload),
      progInfo: progressInfoHandler('Condition Report Signing', payload),
      title: progressStatusHandler(CONDITION_REPORT_SIGNING_STATUS, payload),
      buttons: {
        Create: [
          buttonStateHandler(CONDITION_REPORT_SIGNING_CREATE, payload),
          () => buttonHandler(CONDITION_REPORT_SIGNING_CREATE, payload),
        ],
        Send: [
          buttonStateHandler(CONDITION_REPORT_SIGNING_SEND, payload),
          () => buttonHandler(CONDITION_REPORT_SIGNING_SEND, payload),
        ],
        Request: [
          buttonStateHandler(CONDITION_REPORT_SIGNING_REQUEST, payload),
          () => buttonHandler(CONDITION_REPORT_SIGNING_REQUEST, payload),
        ],
        Details: [
          buttonStateHandler(CONDITION_REPORT_SIGNING_DETAILS, payload),
          () => buttonHandler(CONDITION_REPORT_SIGNING_DETAILS, payload),
        ],
        Sign: [
          buttonStateHandler(CONDITION_REPORT_SIGNING_SIGN, payload),
          () => buttonHandler(CONDITION_REPORT_SIGNING_SIGN, payload),
        ],
        Update: [
          buttonStateHandler(CONDITION_REPORT_SIGNING_UPDATE, payload),
          () => buttonHandler(CONDITION_REPORT_SIGNING_UPDATE, payload),
        ],
      },
    },
    // 'Inventory Checklist Signing': {status: progressStateHandler('Inventory Checklist Signing', payload), progInfo: progressInfoHandler('Inventory Checklist Signing', payload), title: progressStatusHandler(INVENTORY_CHECKLIST_SIGNING_STATUS, payload), buttons: {
    //   'Create': [buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_CREATE, payload), () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_CREATE)],
    //   'Update': [buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_UPDATE, payload), () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_UPDATE)],
    //   'Send': [buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_SEND, payload), () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_SEND)],
    //   'Sign': [buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_SIGN, payload), () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_SIGN)],
    //   'Request': [buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_REQUEST, payload), () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_REQUEST)],
    //   'Details': [buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_DETAILS, payload), () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_DETAILS)],
    // }},
    'Inventory Checklist Signing': {
      status: progressStateHandler('Inventory Checklist Signing', payload),
      progInfo: progressInfoHandler('Inventory Checklist Signing', payload),
      title: progressStatusHandler(INVENTORY_CHECKLIST_SIGNING_STATUS, payload),
      buttons: {
        Create: [
          buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_CREATE, payload),
          () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_CREATE, payload),
        ],
        Update: [
          buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_UPDATE, payload),
          () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_UPDATE, payload),
        ],
        Send: [
          buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_SEND, payload),
          () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_SEND, payload),
        ],
        Sign: [
          buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_SIGN, payload),
          () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_SIGN, payload),
        ],
        Request: [
          buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_REQUEST, payload),
          () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_REQUEST, payload),
        ],
        Details: [
          buttonStateHandler(INVENTORY_CHECKLIST_SIGNING_DETAILS, payload),
          () => buttonHandler(INVENTORY_CHECKLIST_SIGNING_DETAILS, payload),
        ],
      },
    },
  }
  return ctxstat
}

export default tenantFactory
