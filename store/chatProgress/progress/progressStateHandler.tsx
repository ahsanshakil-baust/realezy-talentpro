export const progressStateHandler = (ctxtype: any, payload: any) => {
  switch (ctxtype) {
    case 'Contact':
      return true
    case 'Property Viewing Schedule':
      return true
    case 'Make Rental Proposal':
      return true
    case 'Pay Reservation Fee':
      return true
    case 'HDB':
      if (payload?.tenantLandlordProgressInfo?.propertyInfo?.sub_category_name === 'HDB') {
        return true
      } else return false
    case 'Send Agreement':
      return true
    case 'Pay First Month Rental':
      return true
    case 'Insurance & Realezy Service Fee':
      if (payload?.roletype === 'landlord') {
        return true
      } else return false
    case 'Sign Agreement':
      return true
    case 'Key Handover Schedule':
      return true
    case 'Condition Report Signing':
      return true
    case 'Inventory Checklist Signing':
      return true
  }
}
