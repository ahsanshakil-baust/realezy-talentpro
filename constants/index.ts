export const DOCUMENT_TYPES = [
  'nric_front',
  'nric_back',
  'iras_cpf',
  'passport',
  'credit_report',
  'pass_id_front',
  'pass_id_back',
  'sponsor_letter',
  'admission_letter',
  'matriculation_card',
  'salary_slip',
] as const

export const BED_ROOM = [
  { label: 'Any', value: 'Any' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5+', value: '5+', width: '3rem' },
  { label: 'Studio', value: 'Studio' },
]

export const BATH_ROOM = [
  { label: 'Any', value: 'Any' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5+', value: '5+', width: '3rem' },
]

export const NUMBER_OF_OCCUPIERS = [
  { label: 'Any', value: 'Any' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
]

export const SIZE_MARKS = [
  {
    // value: 100,
    value: 1,
    label: '100 sqft',
  },
  {
    // value: 2000,
    value: 100,
    label: '2000 sqft',
  },
]

export const RENTAL_BUDGET_MARKS = [
  {
    value: 500,
    label: '$500',
  },
  {
    value: 10000,
    label: '$10000',
  },
]

export const LOCAL_STORAGE_USER_KEY = 'realezy_user'
