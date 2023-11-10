import {
  acceptedScheduleMessage,
  canceledHouseViewingScheduleMessage,
  canceledKeyHandoverScheduleMessage,
  draft_requested,
  draft_send,
  landLordBookingFeeRequest,
  landlordSignAgreementRequest,
  landlord_rejected_offer,
  requestTenantForRentProposal,
  schedule_completed,
  skipped_schedule,
  tenantAgreementCreateRequest,
  tenantConditionReportRequest,
  tenantItemCheckListRequest,
  viewingNotComplete,
} from '@/const'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useRentalOfferAcceptMutation,
  useRentalOfferDetailsQuery,
  useRentalOfferRejectMutation,
  useRentalOfferUpdateMutation,
  useToggleAppointmentMutation,
  useUpdateAgreementMutation,
} from '@/store'
import {
  CONDITION_REPORT_SIGNING_REQUEST,
  CONDITION_REPORT_SIGNING_SEND,
  HDB_REQUEST,
  INVENTORY_CHECKLIST_SIGNING_REQUEST,
  INVENTORY_CHECKLIST_SIGNING_SEND,
  KEY_HANDOVER_SCHEDULE_ACCEPT,
  KEY_HANDOVER_SCHEDULE_CANCEL,
  KEY_HANDOVER_SCHEDULE_COMPLETE,
  KEY_HANDOVER_SCHEDULE_NOT_COMPLETED,
  MAKE_RENTAL_PROPOSAL_ACCEPT,
  MAKE_RENTAL_PROPOSAL_REJECT,
  MAKE_RENTAL_PROPOSAL_REQUEST,
  PAY_FIRST_MONTH_RENTAL_REQUEST,
  PAY_RESERVATION_FEE_REQUEST,
  PROPERTY_VIEWING_SCHEDULE_ACCEPT,
  PROPERTY_VIEWING_SCHEDULE_CANCEL,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED,
  PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED,
  SEND_AGREEMENT_REQUEST,
  SEND_AGREEMENT_SEND,
  SIGN_AGREEMENT_REQUEST,
} from '@/store/chatProgress/progress/constant'
import { getReservationFee } from '@/util'
import {
  ChatCreate,
  updateLandlordProgress,
  updateTenantProgress,
  // useLandlordProgressList,
  useTenantProgressList,
} from '@/util/ChatProgress'
import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const getTimestamp = () => {
  let timestamp = Date.now()
  return timestamp.toString()
}

function Confirm({ message, ctxtype }: any) {
  //PREPARE NEEDED DATA
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  // const landlordProgress = useLandlordProgressList(
  //   `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`
  // )
  const tenantProgress: any = useTenantProgressList(
    `${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`
  )

  //GET USER SESSION
  const { data: session }: any = useSession()
  const userId = session?.user?.id
  const roleType = payload?.roletype
  const receiver =
    session?.user?.id === payload?.threadInfo?.sender_id
      ? payload?.threadInfo?.receiver_id
      : payload?.threadInfo?.sender_id

  const propertyId = payload?.threadInfo?.property_id
  const threadId = payload?.threadInfo?.id
  const tenantId = payload?.threadInfo?.sender_id
  const landlordId = payload?.threadInfo?.receiver_id
  const rentOfferId = payload?.rentOffer?.id
  const rentOfferAmount = payload?.rentOffer?.offer_amount
  const agreementId = payload?.tenancyAgreement?.id

  //APPOINTMENT ACCEPT CANCEL RTK
  const [toggleAppointment] = useToggleAppointmentMutation() // , { isError, isLoading, data }

  //RENTAL OFFER QURY & MUTATION
  const [
    rentalOfferAccept,
    // { isError: rentalOfferAcceptIsError, isLoading: rentalOfferAcceptLoading, data: rentalOfferAcceptRespone },
  ] = useRentalOfferAcceptMutation()
  const [
    rentalOfferReject,
    // { isError: rentalOfferRejectIsError, isLoading: rentalOfferRejectLoading, data: rentalOfferRejectRespone },
  ] = useRentalOfferRejectMutation()
  // const [
  //   rentalOfferUpdate,
  //   { isError: rentalOfferUpdateIsError, isLoading: rentalOfferUpdateLoading, data: rentalOfferUpdateRespone },
  // ] = useRentalOfferUpdateMutation(rentOfferId)
  // const rentalOfferDetails = useRentalOfferDetailsQuery(propertyId, userId)

  //AGREEMENT UPDATE MUTATION
  const [updateAgreement] =
    useUpdateAgreementMutation() //, { isLoading: uodateAgreementIsLoading, isError: uodateAgreementIsError }

  //PREPARE PAYLOAD FOR API
  const appointmentApiPayload = {
    id: tenantProgress?.viewingScheduleConfirmed?.id,
    inviter_id: tenantProgress?.viewingScheduleConfirmed?.inviterId,
    selected_date: tenantProgress?.viewingScheduleConfirmed?.selected_date,
    selected_time: tenantProgress?.viewingScheduleConfirmed?.selected_time,
    status: '',
  }

  //PREPARE PAYLOAD FOR FIRESTORE
  const appintmentFirestoreCollection = {
    selected_time: tenantProgress?.viewingScheduleConfirmed?.selected_time,
    inviterId: tenantProgress?.viewingScheduleConfirmed?.inviterId,
    id: tenantProgress?.viewingScheduleConfirmed?.id,
    time: parseInt(getTimestamp()),
    chatId: parseInt(getTimestamp()),
    selected_date: tenantProgress?.viewingScheduleConfirmed?.selected_date,
    status: '',
    progress_status: false,
    purpose: '',
  }

  const dispatch = useDispatch()
  const handleConfirm = async (confirmType: any) => {
    switch (confirmType) {
      //---------------------------------------------PROPERTY_VIEWING_SCHEDULE-------------------------------
      //---------------------------------------------PROPERTY_VIEWING_SCHEDULE_ACCEPT-------------------------
      case PROPERTY_VIEWING_SCHEDULE_ACCEPT:
        //PREPARE PAYLOAD FOR ACCEPT API
        (async () => {
          const acceptAppointmentApiPayload = {
            ...appointmentApiPayload,
            status: 'accepted',
          }

          // dispatch(hideModal())
          dispatch(hideModal(ctxtype))

          dispatch(showLoader('Accepting'))

          //CALL RTK MUTATION
          const { data: appointmentAcceptRespone }: any = await toggleAppointment(acceptAppointmentApiPayload)
          dispatch(hideLoader())

          //PREPARE PAYLOAD FOR FIRESTORE
          const acceptAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            status: payload?.roletype === 'tenant' ? 'Tenant Accepted' : 'Landlord Accepted',
            progress_status: false,
            purpose: 'house_viewing',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'viewingScheduleConfirmed',
            acceptAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'viewingScheduleConfirmed',
            acceptAppintmentFirestoreCollection
          )

          //UPDATE CONVERSATION ON FIRESTORE
          //CREATE MESSAGE ON FIRESTORE
          ChatCreate(
            acceptedScheduleMessage,
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )
        })()
        break

      //---------------------------------------------PROPERTY_VIEWING_SCHEDULE_CANCEL----------------------------------
      case PROPERTY_VIEWING_SCHEDULE_CANCEL:
        //PREPARE PAYLOAD FOR CANCEL API
        (async () => {
          const cancelAppointmentApiPayload = {
            ...appointmentApiPayload,
            status: 'cancelled',
          }

          dispatch(hideModal(ctxtype))
          dispatch(showLoader('Canceling'))

          //CALL RTK MUTATION
          const { data: appointmentCancelRespone }: any = await toggleAppointment(cancelAppointmentApiPayload)
          dispatch(hideLoader())

          //UPDATE TENANT PROGRESS
          //PREPARE PAYLOAD FOR FIRESTORE
          const cancelAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            status: payload?.roletype === 'tenant' ? 'Schedule Declined' : 'Schedule Declined',
            progress_status: false,
            purpose: 'house_viewing',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'viewingScheduleConfirmed',
            cancelAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'viewingScheduleConfirmed',
            cancelAppintmentFirestoreCollection
          )

          //UPDATE CONVERSATION ON FIRESTORE
          //CREATE MESSAGE ON FIRESTORE
          ChatCreate(canceledHouseViewingScheduleMessage, 'appointment', propertyId, receiver, threadId, 'RZYADMIN', '')
        })()
        break

      //---------------------------------------------PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED-----------------------
      case PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_REQUIRED:
        //UPDATE TENANT PROGRESS
        //PREPARE PAYLOAD FOR FIRESTORE
        (() => {
          const notRequiredAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            status: skipped_schedule,
            progress_status: true,
            purpose: 'house_viewing',
          }
          // const notRequiredAppintmentFirestoreCollection = {
          //   purpose: 'house_viewing',
          //   selected_date: '',
          //   inviterId: '',
          //   selected_time: '',
          //   status: '',
          //   id: '',
          //   chatId: '',
          //   time: '',
          //   progress_status: false
          // }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'viewingScheduleConfirmed',
            notRequiredAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'viewingScheduleConfirmed',
            notRequiredAppintmentFirestoreCollection
          )
          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(
            skipped_schedule,
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )

          dispatch(hideModal(ctxtype))
        })()

        break

      //---------------------------------------------PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE-----------------------
      case PROPERTY_VIEWING_SCHEDULE_VIEWING_COMPLETE:
        //PREPARE PAYLOAD FOR ACCEPT API
        (async () => {
          const completeAppointmentApiPayload = {
            ...appointmentApiPayload,
            status: 'completed',
          }

          dispatch(hideModal(ctxtype))
          dispatch(showLoader('Completing'))

          //CALL RTK MUTATION
          const { data: appointmentCompleteRespone }: any = await toggleAppointment(completeAppointmentApiPayload)
          dispatch(hideLoader())

          //UPDATE TENANT PROGRESS
          //PREPARE PAYLOAD FOR FIRESTORE
          const completeAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            status: schedule_completed,
            progress_status: true,
            purpose: 'house_viewing',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'viewingScheduleConfirmed',
            completeAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'viewingScheduleConfirmed',
            completeAppintmentFirestoreCollection
          )
          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(
            'House viewing complete',
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )
        })()

        break

      //---------------------------------------------PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED-----------------------
      case PROPERTY_VIEWING_SCHEDULE_VIEWING_NOT_COMPLETED:
        //UPDATE TENANT PROGRESS
        //PREPARE PAYLOAD FOR FIRESTORE
        (() => {
          // const notCompleteAppintmentFirestoreCollection = {
          //   ...appintmentFirestoreCollection,
          //   inviter_id: '',
          //   selected_date: '',
          //   selected_time: '',
          //   status: '',
          //   progress_status: false,
          //   purpose: 'house_viewing',
          // }
          const notCompleteAppintmentFirestoreCollection = {
            chatId: '',
            time: '',
            status: '',
            purpose: 'house_viewing',
            selected_time: '',
            id: '',
            selected_date: '',
            progress_status: false,
            inviterId: '',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'viewingScheduleConfirmed',
            notCompleteAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'viewingScheduleConfirmed',
            notCompleteAppintmentFirestoreCollection
          )
          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(
            viewingNotComplete,
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )
          dispatch(hideModal(ctxtype))
        })()

        break

      //-----------------------------------------------------------------------------------------
      //---------------------------------------------KEY_HANDOVER_SCHEDULE-----------------------
      //---------------------------------------------KEY_HANDOVER_SCHEDULE_ACCEPT-------------------------
      case KEY_HANDOVER_SCHEDULE_ACCEPT:
        //PREPARE PAYLOAD FOR ACCEPT API
        (async () => {
          const keyHandOverAcceptAppointmentApiPayload = {
            ...appointmentApiPayload,
            status: payload?.roletype === 'landlord' ? 'landlord_accept_schedule' : 'tenant_accept_schedule',
            time: parseInt(getTimestamp()),
            chatId: parseInt(getTimestamp()),
          }

          dispatch(hideModal(ctxtype))
          dispatch(showLoader('Accepting'))

          //CALL RTK MUTATION
          const { data: keyHandOverAcceptAppointmentRespone }: any = await toggleAppointment(
            keyHandOverAcceptAppointmentApiPayload
          )
          dispatch(hideLoader())

          //PREPARE PAYLOAD FOR FIRESTORE
          const keyHandOverAcceptAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            status: payload?.roletype === 'tenant' ? 'tenant_accept_schedule' : 'landlord_accept_schedule',
            progress_status: false,
            purpose: 'key_handover',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOverAcceptAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOverAcceptAppintmentFirestoreCollection
          )

          //UPDATE CONVERSATION ON FIRESTORE
          //CREATE MESSAGE ON FIRESTORE
          ChatCreate(
            acceptedScheduleMessage,
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )
        })()

        break

      //---------------------------------------------KEY_HANDOVER_SCHEDULE_CANCEL----------------------------------
      case KEY_HANDOVER_SCHEDULE_CANCEL:
        //PREPARE PAYLOAD FOR CANCEL API
        (async () => {
          const keyHandOverCancelAppointmentApiPayload = {
            ...appointmentApiPayload,
            status: 'cancelled',
          }

          dispatch(hideModal(ctxtype))
          dispatch(showLoader('Canceling'))

          //CALL RTK MUTATION
          const { data: keyHandOverAppointmentCancelRespone }: any = await toggleAppointment(
            keyHandOverCancelAppointmentApiPayload
          )
          dispatch(hideLoader())

          //UPDATE TENANT PROGRESS
          //PREPARE PAYLOAD FOR FIRESTORE
          const keyHandOverCancelAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            status: payload?.roletype === 'tenant' ? 'Schedule Declined' : 'Schedule Declined',
            progress_status: false,
            purpose: 'key_handover',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOverCancelAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOverCancelAppintmentFirestoreCollection
          )

          //UPDATE CONVERSATION ON FIRESTORE
          //CREATE MESSAGE ON FIRESTORE
          ChatCreate(
            canceledKeyHandoverScheduleMessage,
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )
        })()

        break

      //---------------------------------------------KEY_HANDOVER_SCHEDULE_COMPLETE-----------------------
      case KEY_HANDOVER_SCHEDULE_COMPLETE:
        //PREPARE PAYLOAD FOR ACCEPT API
        (async () => {
          const keyHandOvercompleteAppointmentApiPayload = {
            ...appointmentApiPayload,
            status: 'completed',
          }

          dispatch(hideModal(ctxtype))
          dispatch(showLoader('Completing'))

          //CALL RTK MUTATION
          const { data: keyHandOverAppointmentCompleteRespone }: any = await toggleAppointment(
            keyHandOvercompleteAppointmentApiPayload
          )
          dispatch(hideLoader())

          //UPDATE TENANT PROGRESS
          //PREPARE PAYLOAD FOR FIRESTORE
          const keyHandOvercompleteAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            status: schedule_completed,
            progress_status: true,
            purpose: 'key_handover',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOvercompleteAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOvercompleteAppintmentFirestoreCollection
          )
          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(
            'Key handover complete',
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )
        })()

        break

      //---------------------------------------------KEY_HANDOVER_SCHEDULE_NOT_COMPLETED-----------------------
      case KEY_HANDOVER_SCHEDULE_NOT_COMPLETED:
        //UPDATE TENANT PROGRESS
        //PREPARE PAYLOAD FOR FIRESTORE
        (() => {
          const keyHandOverNotCompleteAppintmentFirestoreCollection = {
            ...appintmentFirestoreCollection,
            inviterId: '',
            selected_date: '',
            selected_time: '',
            status: '',
            progress_status: false,
            purpose: 'key_handover',
            chatId: '',
            time: '',
            id: '',
          }

          //UPDATE TENANT PROGRESS UPDATE ON FIRESTORE
          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOverNotCompleteAppintmentFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS UPDATE ON FIRESTORE
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'keyHandover',
            keyHandOverNotCompleteAppintmentFirestoreCollection
          )
          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(
            viewingNotComplete,
            'appointment',
            payload?.threadInfo?.property_id,
            receiver,
            payload?.threadInfo?.id,
            'RZYADMIN',
            ''
          )
        })()

        break

      //---------------------------------------------------------------------------------------------
      //---------------------------------------------MAKE_RENTAL_PROPOSAL_REQUEST-----------------------
      case MAKE_RENTAL_PROPOSAL_REQUEST:
        (() => {
          const requestTentalProposalFirestoreCollection = {
            commencement_date: '',
            chatId: '',
            additional_request: '',
            progress_status: false,
            id: '',
            creator: '',
            tenancy_period: '',
            offer_amount: '0.00',
            accepted: false,
            inviter_id: '',
            status: 'landlord_requested',
          }

          store.dispatch(hideModal(ctxtype))
          dispatch(showLoader('Requesting'))

          updateTenantProgress(`${propertyId}-${tenantId}`, 'rentOffer', requestTentalProposalFirestoreCollection)
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'rentOffer',
            requestTentalProposalFirestoreCollection
          )
          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(requestTenantForRentProposal, userId, propertyId, receiver, threadId, "offer_request", '')
          dispatch(hideLoader())
        })()
        break

      //---------------------------------------------MAKE_RENTAL_PROPOSAL_ACCEPT-----------------------
      case MAKE_RENTAL_PROPOSAL_ACCEPT:
        (async () => {
          const rentalOfferApiPayload = {
            id: rentOfferId,
            accepted_by: userId,
            product_id: propertyId,
            offer_amount: rentOfferAmount,
            // updated_by: userId,
          }

          store.dispatch(hideModal(ctxtype))
          dispatch(showLoader('Accepting'))

          //CALL RTK MUTATION
          const { data: rentalOfferAcceptRespone }: any = await rentalOfferAccept({
            rentalId: rentOfferId,
            data: rentalOfferApiPayload,
          })

          if (rentalOfferAcceptRespone?.status == 201) {
            toast.error(rentalOfferAcceptRespone?.message)
            dispatch(hideLoader())
            return false
          }

          dispatch(hideLoader())

          const acceptRentalProposalFirestoreCollection = {
            id: rentalOfferAcceptRespone?.data?.offer_id,
            accepted: true,
            offer_amount: rentalOfferAcceptRespone?.data?.offer_amount,
            inviter_id: userId,
            tenancy_period: rentalOfferAcceptRespone?.data?.tenancy_period,
            commencement_date: rentalOfferAcceptRespone?.data?.commencement_date,
            additional_request: rentalOfferAcceptRespone?.data?.additional_requirements,
            creator: userId,
            status: roleType == 'landlord' ? 'landlord_accepted' : 'tenant_accepted',
            progress_status: true,
            chatId: parseInt(getTimestamp()),
          }


          updateTenantProgress(`${propertyId}-${tenantId}`, 'rentOffer', acceptRentalProposalFirestoreCollection)

          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'rentOffer',
            acceptRentalProposalFirestoreCollection
          )

          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(
            roleType == 'landlord' ? 'Landlord Accept Rental Proposal' : 'Tenant Accept Rental Proposal',
            'RZY',
            propertyId,
            receiver,
            threadId,
            'RZYADMIN',
            ''
          )
        })()

        break

      //---------------------------------------------MAKE_RENTAL_PROPOSAL_REJECT-----------------------
      case MAKE_RENTAL_PROPOSAL_REJECT:
        (async () => {
          const rentalOfferRejectApiPayload = {
            id: rentOfferId,
            reject_by: userId,
            product_id: propertyId,
            offer_amount: rentOfferAmount,
            updated_by: userId,
            reject_reason: "I don't like this offer", //WILL GET FROM INPUT
          }

          dispatch(hideModal(ctxtype))
          dispatch(showLoader('Rejecting'))
          //CALL RTK MUTATION
          const { data: rentalOfferRejectRespone }: any = await rentalOfferReject({
            rentalId: rentOfferId,
            data: rentalOfferRejectApiPayload,
          })
          dispatch(hideLoader())

          const rejectRentalProposalFirestoreCollection = {
            id: rentalOfferRejectRespone?.data?.offer_id,
            accepted: false,
            offer_amount: rentalOfferRejectRespone?.data?.offer_amount,
            inviter_id: userId,
            tenancy_period: rentalOfferRejectRespone?.data?.tenancy_period,
            commencement_date: rentalOfferRejectRespone?.data?.commencement_date,
            additional_request: rentalOfferRejectRespone?.data?.additional_requirements,
            creator: userId,
            status: landlord_rejected_offer,
            progress_status: false,
            chatId: null,
          }
          /*
          {
            accepted: false,
            tenancy_period: '1',
            chatId: null,
            additional_request: 'jkhsfkjsjsjl',
            offer_amount: '5555',
            commencement_date: '2023-07-31 00:00:00.000',
            creator: '751',
            status: 'landlord_rejected',
            inviter_id: '751',
            progress_status: false,
            id: '151'
          }
          {
            inviter_id: '751',
            creator: '751',
            offer_amount: '5555',
            chatId: null,
            additional_request: 'jkhsfkjsjsjl',
            progress_status: false,
            accepted: false,
            status: 'landlord_rejected',
            tenancy_period: '1',
            id: '151',
            commencement_date: '2023-07-31 00:00:00.000'
          }
          */

          updateTenantProgress(`${propertyId}-${tenantId}`, 'rentOffer', rejectRentalProposalFirestoreCollection)

          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'rentOffer',
            rejectRentalProposalFirestoreCollection
          )

          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(
            roleType == 'landlord' ? 'Landlord Rejected Rental Proposal' : 'Tenant Rejected Rental Proposal',
            'RZY',
            propertyId,
            receiver,
            threadId,
            'RZYADMIN',
            ''
          )
        })()

        break

      //---------------------------------------------SEND_AGREEMENT_SEND-----------------------
      case SEND_AGREEMENT_SEND:
        (async () => {
          const sendAgreementApiPayload = {
            id: agreementId,
            updated_by: userId,
            product_id: propertyId,
            agreement_status: 'sent_to_tenant',
          }

          dispatch(hideModal(ctxtype))
          dispatch(showLoader('Sending'))

          const { data: response }: any = await updateAgreement({
            agreementId: agreementId,
            data: sendAgreementApiPayload,
          })
          dispatch(hideLoader())

          //UPDATE FIRESTORE
          const sendAgreementFirestoreCollection = {
            status: draft_send,
            landLord_signed: false,
            id: agreementId,
            instruction: '',
            tenant_signed: false,
            progress_status: true,
            chatId: parseInt(getTimestamp()),
            time: parseInt(getTimestamp()),
          }
          // const insurancePackageFirestoreCollection = {
          //   status: 'Pending',
          //   instruction: 'Full fill as per guideline',
          //   progress_status: true,
          // }

          updateTenantProgress(`${propertyId}-${tenantId}`, 'tenancyAgreement', sendAgreementFirestoreCollection)

          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'tenancyAgreement',
            sendAgreementFirestoreCollection
          )
          // updateTenantProgress(`${propertyId}-${tenantId}`, 'insurancePackage', insurancePackageFirestoreCollection)

          // updateLandlordProgress(
          //   `${landlordId}-${propertyId}-${tenantId}`,
          //   'insurancePackage',
          //   insurancePackageFirestoreCollection
          // )

          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate('Landlord Shared The Draft Agreement', 'RZY', propertyId, receiver, threadId, 'RZYADMIN', '')
        })()

        break

      //---------------------------------------------SEND_AGREEMENT_REQUEST-----------------------
      case SEND_AGREEMENT_REQUEST:
        (() => {
          const requestDraftAgreementFirestoreCollection = {
            id: '',
            instruction: 'Full fill as per guideline',
            progress_status: false,
            status: draft_requested,
            property_id: propertyId,
            landlord_id: landlordId,
            tenant_id: tenantId,
            landLord_signed: false,
            tenant_signed: false,
          }

          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'tenancyAgreement',
            requestDraftAgreementFirestoreCollection
          )

          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'tenancyAgreement',
            requestDraftAgreementFirestoreCollection
          )

          //UPDATE CONVERSATION
          //CREATE MESSAGE
          ChatCreate(tenantAgreementCreateRequest, userId, propertyId, receiver, threadId, "agreement_request", '')
          dispatch(hideModal(ctxtype))
        })()
        break

      //---------------------------------------------SIGN_AGREEMENT_REQUEST-----------------------
      case SIGN_AGREEMENT_REQUEST:
        (() => {
          const signingRequestAgreementFirestoreCollection = {
            status: roleType == 'landlord' ? 'Draft Sent' : 'Requested for sign',
            progress_status: true,
            instruction: '',
            landLord_signed: false,
            tenant_signed: false,
          }

          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'tenancyAgreement',
            signingRequestAgreementFirestoreCollection
          )

          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'tenancyAgreement',
            signingRequestAgreementFirestoreCollection
          )

          ChatCreate(landlordSignAgreementRequest, userId, propertyId, receiver, threadId, 'general', '')
        })()

        break
      //---------------------------------------------PAY_FIRST_MONTH_RENTAL_REQUEST-----------------------
      case PAY_FIRST_MONTH_RENTAL_REQUEST:
        (() => {
          const payfirstmonthrentalrequest = {
            time: '',
            amount: payload?.rentOffer?.offer_amount,
            status: 'landlord_requested',
            progress_status: false,
          }
          store.dispatch(hideModal(ctxtype))
          dispatch(showLoader('Requesting'))
          //UPDATE TENANT PROGRESS
          updateTenantProgress(`${propertyId}-${tenantId}`, 'firstMonthRental', payfirstmonthrentalrequest)

          //UPDATE LANDLORD PROGRESS
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'firstMonthRental',
            payfirstmonthrentalrequest
          )

          ChatCreate(
            'landlord request for pay first month rental',
            userId,
            propertyId,
            receiver,
            threadId,
            "first_month_rental_request",
            ''
          )
          dispatch(hideLoader())
        })()
        break
      // ----------------------------------------------------HDB_REQUEST---------------------------------------
      case HDB_REQUEST:
        (() => {
          /*
          {
              hdbApproval: {
                instruction: '',
                status: 'Request from Tenant',
                progress_status: false
              }
            }
          */
          const payfirstmonthrentalrequest = {
            instruction: '',
            status: 'Request from Tenant',
            progress_status: false,
          }
          store.dispatch(hideModal(ctxtype))
          dispatch(showLoader('Requesting'))
          //UPDATE TENANT PROGRESS
          updateTenantProgress(`${propertyId}-${tenantId}`, 'hdbApproval', payfirstmonthrentalrequest)

          //UPDATE LANDLORD PROGRESS
          updateLandlordProgress(`${landlordId}-${propertyId}-${tenantId}`, 'hdbApproval', payfirstmonthrentalrequest)

          ChatCreate('Please upload HDB Approval to proceed', userId, propertyId, receiver, threadId, "hdb_request", '')
          dispatch(hideLoader())
        })()
        break
      //---------------------------------------------PAY_RESERVATION_FEE_REQUEST-----------------------
      case PAY_RESERVATION_FEE_REQUEST:
        (() => {
          const payReservationFeeFirestoreCollectionLandlord = {
            amount: `${getReservationFee(rentOfferAmount)}`,
            is_booking_by_others: false,
            progress_status: false,
            status: 'Request Sent',
            time: getTimestamp(),
          }
          const payReservationFeeFirestoreCollectionTenant = {
            amount: `${getReservationFee(rentOfferAmount)}`,
            is_booking_by_others: false,
            progress_status: false,
            status: 'Pending',
            time: getTimestamp(),
          }

          //UPDATE TENANT PROGRESS
          updateTenantProgress(`${propertyId}-${tenantId}`, 'payBookingFee', payReservationFeeFirestoreCollectionTenant)

          //UPDATE LANDLORD PROGRESS
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'payBookingFee',
            payReservationFeeFirestoreCollectionLandlord
          )

          ChatCreate(landLordBookingFeeRequest, userId, propertyId, receiver, threadId, 'reservation_request', '')
          store.dispatch(hideModal(ctxtype))
        })()
        break

      //---------------------------------------------CONDITION_REPORT_SIGNING_REQUEST-----------------------
      case CONDITION_REPORT_SIGNING_REQUEST:
        (() => {
          const signingRequestConditionReportFirestoreCollection = {
            status: draft_requested,
            progress_status: false,
            instruction: '',
            is_landLord_sign: false,
            is_tenant_sign: false,
          }

          //UPDATE TENANT PROGRESS
          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'propertyCondition',
            signingRequestConditionReportFirestoreCollection
          )

          //UPDATE LANDLORD PROGRESS
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'propertyCondition',
            signingRequestConditionReportFirestoreCollection
          )

          ChatCreate(tenantConditionReportRequest, userId, propertyId, receiver, threadId, "condition_report_request", '')
          store.dispatch(hideModal(ctxtype))
          store.dispatch(hideModal(ctxtype))
        })()
        break

      //CONDITION_REPORT_SIGNING_SEND
      case CONDITION_REPORT_SIGNING_SEND:
        (() => {
          const sendConditionReportFirestoreCollection = {
            progress_status: false,
            status: draft_send,
            instruction: '',
            is_landlord_sign: false,
            is_tenant_sign: false,
          }

          //UPDATE TENANT PROGRESS
          updateTenantProgress(`${propertyId}-${tenantId}`, 'propertyCondition', sendConditionReportFirestoreCollection)

          //UPDATE LANDLORD PROGRESS
          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'propertyCondition',
            sendConditionReportFirestoreCollection
          )
          store.dispatch(hideModal(ctxtype))

          //ChatCreate(tenantConditionReportRequest, userId, propertyId, receiver, threadId, 'general', '')
        })()
        break

      //---------------------------------------------INVENTORY_CHECKLIST_SIGNING_REQUEST-----------------------
      case INVENTORY_CHECKLIST_SIGNING_REQUEST:
        (() => {
          const signingRequestInventoryChecklistFirestoreCollection = {
            status: draft_requested,
            progress_status: false,
            instruction: '',
            is_landLord_sign: false,
            is_tenant_sign: false,
          }

          updateTenantProgress(
            `${propertyId}-${tenantId}`,
            'itemChecklist',
            signingRequestInventoryChecklistFirestoreCollection
          )

          updateLandlordProgress(
            `${landlordId}-${propertyId}-${tenantId}`,
            'itemChecklist',
            signingRequestInventoryChecklistFirestoreCollection
          )

          ChatCreate(tenantItemCheckListRequest, 'RZY', propertyId, receiver, threadId, "inventory_request", '')
          store.dispatch(hideModal(ctxtype))
        })()
        break
      case INVENTORY_CHECKLIST_SIGNING_SEND:
        (() => {
          const updatedData = {
            instruction: 'Not yet',
            is_landlord_sign: false,
            is_tenant_sign: false,
            progress_status: false,
            status: 'Added',
            time: getTimestamp(),
          }
          ChatCreate('Landlord send inventory list to tenant.', userId, propertyId, receiver, threadId, 'general', '')

          updateTenantProgress(
            `${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'itemChecklist',
            updatedData
          )
          updateLandlordProgress(
            `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload?.threadInfo?.sender_id}`,
            'itemChecklist',
            updatedData
          )
          store.dispatch(hideModal(ctxtype))
        })()

        break
    }
  }

  return (
    <div className="flex flex-col px-[3.25rem] py-4 bg-inherit rounded-b-[20px]">
      <p className="font-normal font-roboto text-[1.25rem]/[1.5rem] tracking-[0.025rem] text-[#202020]">{message}</p>
      <div className="flex justify-end gap-2 mt-8">
        <Button variant="contained" onClick={() => handleConfirm(ctxtype)}>
          Yes
        </Button>
        <Button variant="contained" onClick={() => dispatch(hideModal(ctxtype))}>
          No
        </Button>
      </div>
    </div>
  )
}

export default Confirm
