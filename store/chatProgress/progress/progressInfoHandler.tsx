export const progressInfoHandler = (ctxtype: any, payload: any) => {
  // console.log('payload', payload)
  switch (ctxtype) {
    case 'Contact':
      return {
        // active: !payload?.contactTenant,
        active: false,
        completed: payload?.contactTenant,
      }
    case 'Property Viewing Schedule':
      return {
        active: !payload?.viewingScheduleConfirmed?.progress_status && payload?.contactTenant,
        completed: payload?.viewingScheduleConfirmed?.progress_status,
      }
    case 'Make Rental Proposal':
      return {
        active: !payload?.rentOffer?.progress_status && payload?.viewingScheduleConfirmed?.progress_status,
        // active: true,
        completed: payload?.rentOffer?.progress_status,
        // active: true,
        // completed: true,
      }
    case 'Pay Reservation Fee':
      return {
        active: !payload?.payBookingFee?.progress_status && payload?.rentOffer?.progress_status,
        completed: payload?.payBookingFee?.progress_status,
      }
    case 'HDB':
      return {
        active: payload?.payBookingFee?.progress_status,
        completed: payload?.hdbApproval?.progress_status,
      }
    case 'Send Agreement':
      /* return {
        active:true,
        completed:true

      } */
      return {
        // active: (payload?.roletype === 'landlord' && payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_type === 'Whole Unit' && payload?.tenantLandlordProgressInfo?.propertyInfo?.sub_category_name === 'HDB') ? !(payload?.tenancyAgreement?.progress_status) && payload?.hdbApproval?.progress_status : !(payload?.tenancyAgreement?.progress_status) && payload?.payBookingFee?.progress_status,
        // active: payload?.tenancyAgreement?.status === 'You can create draft',
        active:
          payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_type === 'Whole Unit' &&
          payload?.tenantLandlordProgressInfo?.propertyInfo?.sub_category_name === 'HDB' &&
          payload?.hdbApproval?.progress_status
            ? payload?.hdbApproval?.progress_status
            : payload?.payBookingFee?.progress_status,
        completed: payload?.tenancyAgreement?.progress_status,
      }
    case 'Pay First Month Rental':
      return {
        active: payload?.insurancePackage?.progress_status,
        completed: payload?.firstMonthRental?.progress_status,
      }
    case 'Insurance & Realezy Service Fee':
      return {
        active: !payload?.rzyServiceFee?.progress_status && payload?.firstMonthRental?.progress_status,
        completed: payload?.rzyServiceFee?.progress_status,
      }
    case 'Sign Agreement':
      // return {
      //   active: true,
      //   completed: true,
      // }
      return {
        active:
          (payload?.roletype == 'tenant' && payload?.firstMonthRental?.progress_status) ||
          (!(payload?.tenancyAgreement?.tenant_signed && payload?.tenancyAgreement?.landLord_signed) &&
            payload?.rzyServiceFee?.progress_status),
        completed: payload?.tenancyAgreement?.tenant_signed && payload?.tenancyAgreement?.landLord_signed,
      }
    case 'Key Handover Schedule':
      return {
        active:
          !payload?.keyHandover?.progress_status &&
          payload?.tenancyAgreement?.tenant_signed &&
          payload?.tenancyAgreement?.landLord_signed,
        completed: payload?.keyHandover?.progress_status,
      }
    case 'Condition Report Signing':
      return {
        active: payload?.keyHandover?.progress_status, //&&
        // !(payload?.propertyCondition?.is_tenant_sign || payload?.propertyCondition?.is_landlord_sign),
        completed: payload?.propertyCondition?.progress_status,
      }
    // return {
    //   active: true,
    //   completed: true,
    // }
    case 'Inventory Checklist Signing':
      return {
        active: payload?.propertyCondition?.progress_status,
        completed: payload?.itemChecklist?.progress_status,
      }
    // return {
    //   active: true,
    //   completed: false,
    // }
  }
}
