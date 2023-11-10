import { UserType } from '@/types'
import moment from 'moment'

// check if window is defined
export const isBrowser = () => typeof window !== 'undefined'

export const isTenant = (type: UserType) => type === 'tenant'

// convert to normal case
export const toNormalCase = (string: string) => {
  const result = string
    .replace(/[^A-Za-z0-9]/gi, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const toTitleCase = (string: string) => toNormalCase(string).replace(/\b\w+/g, word => toNormalCase(word))

export const propertyHandler = (property: any) => {
  let { status, details, name, price } = property

  if (status) status = handelStatus(status)
  if (details) details = propertyDetailsHandler(details)
  name = name || details.name
  price = price || details.price

  return [{
    ...property,
    name,
    price,
    details,
    status,
  },property]
}

// property details json handler
export const propertyDetailsHandler = (details: string) => {
  const data = JSON.parse(details)

  let { all_images_list, document, image_list, images } = data

  if (all_images_list) all_images_list = extractUrls(all_images_list)
  if (document) document = extractUrls(document)
  if (image_list) image_list = extractUrls(image_list)
  if (images) images = extractUrls(images)

  return {
    ...data,
    all_images_list,
    document,
    image_list,
    images,
  }
}

export const extractUrls = (string: string) => string.slice(1, -1).split(',')

export const handelStatus = (status: string) => {
  switch (status) {
    case '1':
      return 'Approved'
    case '2':
      return 'Published'
    case '3':
      return 'Unpublished'
    default:
      return 'Unapproved'
  }
}

export const handelPeriod = (period: string) => {
  switch (period) {
    case '1':
      return '1 Year'
    case '2':
      return '2 Years'
    default:
      return 'N/A'
  }
}

export const getReservationFee = (acceptedAmount: any) => {
  acceptedAmount = parseFloat(acceptedAmount)
  if (acceptedAmount <= 1500.0) {
    return 160.0
  } else if (acceptedAmount > 1500.0 && acceptedAmount <= 2000.0) {
    return 210.0
  } else if (acceptedAmount > 2000.0 && acceptedAmount <= 2500.0) {
    return 260.0
  } else if (acceptedAmount > 2500.0 && acceptedAmount <= 3000.0) {
    return 310.0
  } else if (acceptedAmount > 3000.0 && acceptedAmount <= 3500.0) {
    return 360.0
  } else if (acceptedAmount > 3500.0 && acceptedAmount <= 4000.0) {
    return 410.0
  } else if (acceptedAmount > 4000.0 && acceptedAmount <= 4500.0) {
    return 460.0
  } else if (acceptedAmount > 4500.0 && acceptedAmount <= 5000.0) {
    return 510.0
  } else if (acceptedAmount > 5000.0) {
    return 610.0
  }
  return 0
}

// Add query params to a URL
export const addQueryParams = (url: string, params: any) => {
  Object.keys(params).forEach(key => (params[key] === undefined || params[key] === null) && delete params[key])
  const searchParams = new URLSearchParams(params)
  const searchParamsStr = searchParams.toString()
  return searchParamsStr.length > 1 ? `${url}?${searchParamsStr}` : url
}

export const handelAmount = (amount: string) => (amount ? `$ ${parseFloat(amount).toFixed(2)}` : '$ 0.00')

export const handelAmountWithText = (amount: string) => (amount ? `SGD ${parseFloat(amount).toFixed(2)}` : 'SGD 0.00')

export const getUserTypeNumber = (type: UserType) => {
  switch (type) {
    case 'tenant':
      return 0
    case 'landlord':
      return 1
    default:
      return 0
  }
}

export const isPaid = (status: string) => status === 'paid'

export const getStatementName = (status: string) => (isPaid(status) ? 'Invoice' : 'Receipt')

export const formatToUTC = (dateTime: any, formatString: any) => moment(dateTime).utc().format(formatString)

export const formatToLocal = (dateTime: any, formatString: any) => moment.utc(dateTime).local().format(formatString)

export const inputTime = (dateTime: any, formatString: any) => formatToUTC(dateTime, formatString)

export const outputTime = (dateTime: any, formatString: any) => formatToLocal(dateTime, formatString)
