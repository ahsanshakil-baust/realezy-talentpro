export const randomNUmberGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const logo = 'logo.png'
export const authLogo = 'logo.png'

export const getAllImages = (details: any) => {
  try {
    let detailsObject = JSON.parse(details)

    let imageUrl = detailsObject.images.slice(1, -1).split(',')
    if (imageUrl != 'undefined') {
      return detailsObject.images.slice(1, -1).split(',')
    } else {
      return ['https://dev-api.real-ezy.com/index.php' + 'icon-camera.png']
    }
  } catch (e) {
    return false
  }
}

export const getTimestamp = () => {
  let timestamp = Date.now()
  return timestamp.toString()
}

export const formatDate = (date: any = '') => {
  var dd = date.getDate()
  var mm = date.getMonth() + 1
  var yyyy = date.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  date = yyyy + '-' + mm + '-' + dd
  return date
}

/**
 * GET TO DAY
 * @param getToDay
 * @returns {string}
 */
export const getToDay = () => {
  let today = new Date()
  let dayBeforeOrNext = new Date(today)
  dayBeforeOrNext.setDate(today.getDate() + 0)
  return formatDate(dayBeforeOrNext)
}

export const changeDocumentName = (docName: any, localOrForeigner: any, occupation: any) => {
  //   nric_front?: string
  // nric_back?: string
  // iras_cpf?: string
  // passport?: string
  // credit_report?: string
  // pass_id_front?: string
  // pass_id_back?: string
  // sponsor_letter?: string
  // admission_letter?: string
  // matriculation_card?: string
  // salary_slip?: string

  switch (docName) {
    case 'nric_front':
      return 'IC Front'
    //break
    case 'nric_back':
      return 'IC Back'
    //break
    case 'iras_cpf':
      return 'IRAS/CPF'
    //break
    case 'passport':
      return 'Passport'
    //break
    case 'credit_report':
      return 'Credit Report'
    //break
    case 'pass_id_front':
      return 'Pass ID Front'
    //break
    case 'pass_id_back':
      return 'Pass ID Back'
    //break
    case 'sponsor_letter':
      if (localOrForeigner == 'Local' || localOrForeigner == 'PR') {
        return "Guardian's / Guarantor's Letter of Guarantee"
      } else {
        return 'Sponsor Guarantee Letter'
      }
    //break
    case 'admission_letter':
      if (occupation == 'Student') {
        return 'Admission Letter'
      } else {
        return 'Employment Letter'
      }
    //break
    case 'matriculation_card':
      return 'Student Matriculation Card'
    //break
    case 'salary_slip':
      return 'Salary Slip'
    //break
  }
}
