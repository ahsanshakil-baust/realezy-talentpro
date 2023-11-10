import { Icon, MultiSelect, PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../../../pages/page'
import dayjs from 'dayjs'
import React, { useEffect, useState, useRef } from 'react'
import NoImageProperty from '@/public/NoImageProperty.jpg'
import NoTaxDocument from '@/public/tax.png'
import { demoData } from '@/util/data'
import axios from 'axios'
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Autocomplete,
  Paper,
  FormLabel,
  NativeSelect,
} from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import {
  showLoader,
  hideLoader,
  showModal,
  hideModal,
  useCreateCorporatePropertyMutation,
  useMultiFileUploadMutation,
  useUpdateCorporatePropertyMutation,
} from '@/store'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { StoreThunkDispatch } from '@/types'
import { ErrorMessage } from '@hookform/error-message'
import { customFormStyle } from '@/util/customFormStyle'
import ObtainFloorSize from '../../propertyDetails/ObtainFloorSize'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import propertyFormValidationSchema from '../../shared/FormValidation/PropertyFormValidationSchema'
import { RadioGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Radio } from '@mui/material'

import PoiWarning from '../../propertyDetails/PoiWarning'

const {
  districtName,
  condo,
  landed,
  hdbUnit,
  hdbEstate,
  UnitBedRoom,
  bathroomOptions,
  bedroomOptions,
  UnitBathRoom,
  rental_Type,
  property_Type,
  rentalSession,
  furnishingOptions,
  floorLevelOptions,
  facilitiesOptions,
  amenitiesOptions,
  facingOptions,
  othersOptions,
} = demoData

const AddSingleProperty = ({ refetchCorporateProperties }: any) => {
  const router = useRouter()
  const { query }: any = router

  let propertyData = query.property ? JSON.parse(query.property) : null
  const propertyID = propertyData ? propertyData.id : null
  const poiInputRef = useRef<HTMLInputElement | null>(null)
  const [previewImage, setPreviewImage] = useState<any[]>([])
  const [previewTaxImage, setPreviewTaxImage] = useState<any[]>([])
  const [files, setFiles] = useState<FileList>()
  const [document, setDocument] = useState<any[]>([]) // document

  const [propertyType, setPropertyType] = useState(propertyData?.sub_category_id ? propertyData?.sub_category_id : '')
  const [rentalType, setRentalType] = useState(propertyData?.rental_type ? propertyData?.rental_type : '')
  const [postalCode, setPostalCode] = useState(propertyData?.postal_code ? propertyData?.postal_code : '')
  const [pstcode, setPstcode] = useState('') // postalCode
  const [district, setDistrict] = useState(propertyData?.property_city ? propertyData?.property_city : '') // district
  const [propertyName, setPropertyName] = useState(propertyData?.name ? propertyData?.name : '') // propertyName
  const [address, setAddress] = useState(propertyData?.property_address ? propertyData?.property_address : '') // address
  const [unitNumber, setUnitNumber] = useState('')
  const [monthlyRental, setMonthlyRental] = useState(
    propertyData?.rental_amount ? parseInt(propertyData?.rental_amount) : ''
  )

  const [leasingPeriod, setLeasingPeriod] = useState(
    propertyData?.details?.rent_term ? propertyData?.details?.rent_term : ''
  )
  const [bedRoom, setBedRoom] = useState(propertyData?.bedroom ? propertyData?.bedroom : '')
  const [bathRoom, setBathRoom] = useState(propertyData?.bathroom ? propertyData?.bathroom : '')
  const [floorSize, setFlooreSize] = useState(propertyData?.floor_size ? propertyData?.floor_size : '')
  const [unitType, setUnitType] = useState(propertyData?.details?.unit_type ? propertyData?.details?.unit_type : '')
  const [estate, setEstate] = useState(propertyData?.details?.hdb ? propertyData?.details?.hdb : '')
  const [floorLevel, setFloorLevel] = useState(propertyData?.floor_level ? propertyData?.floor_level : '')
  const [furnishing, setFurnishing] = useState(propertyData?.furnishing ? propertyData?.furnishing : '')
  const [view, setView] = useState(propertyData?.facing ? propertyData?.facing : '')
  const [Gender, setGender] = useState(propertyData?.details?.permit_gender ? propertyData?.details?.permit_gender : '')

  const [productId, setProductId] = useState(0)
  const [wholeUnit, setWholeUnit] = useState(propertyData?.rental_type == 'Whole Unit' ? true : false)
  const [room, setRoom] = useState(propertyData?.rental_type == 'Room' ? true : false)
  const [wholeLandedList, setWholeLandedList] = useState(propertyData?.sub_category_id == '44' ? true : false)
  const [wholeCondoList, setWholeCondoList] = useState(propertyData?.sub_category_id == '45' ? true : false)
  const [wholeHdbList, setWholeHdbList] = useState(propertyData?.sub_category_id == '47' ? true : false)
  const [roomUnitLanded, setRoomUnitLanded] = useState(false)
  const [roomUnitCondo, setRoomUnitCondo] = useState(false)
  const [roomUnitHDB, setRoomUnitHDB] = useState(false)
  const [propertyText, setPropertyText] = useState('')
  const [roomUnit, setRoomUnit] = useState<any>({ value: '', label: '' })
  const [wholeHDBEstate, setWholeHDBEstate] = useState(false)
  const [availdate, setAvaildate] = useState('')
  const [availableFrom, setAvailableFrom] = useState(propertyData?.available_from ? propertyData?.available_from : null)
  const [isSkiped, setIsSkiped] = useState(false)
  useEffect(() => {
    setValue('available_from', availableFrom)
    // trigger('available_from')
  }, [availableFrom])
  const [todayDate, setTodayDate]: any = useState(moment().format('DD MMMM YYYY'))
  const [amenity, setAmenity] = useState<string[]>(
    propertyData?.details?.property_emenity ? propertyData?.details?.property_emenity : []
  )
  const [facility, setFacility] = useState<string[]>([])
  const [other, setOther] = useState<string[]>(
    propertyData?.details?.room_facility ? propertyData?.details?.room_facility : []
  )
  const [mrt, setMrt] = useState([])
  const [poiWarning, setPoiWarning] = useState<boolean>()
  const [skipPoiWarning, setSkipPoiWarning] = useState<boolean>()
  const [createProperty] = useCreateCorporatePropertyMutation()
  const [updateProperty] = useUpdateCorporatePropertyMutation()

  let unEditable
  if (propertyData?.isThread) {
    unEditable = true
  }

  const { data: session }: any = useSession()
  const [isHovered, setIsHovered] = useState(false)
  const handleHover = () => {
    setIsHovered(true)
  }
  const handleHoverEnd = () => {
    setIsHovered(false)
  }
  const [uploadFiles] = useMultiFileUploadMutation()
  const userId = session?.user?.id
  useEffect(() => {
    if (!userId) {
      router.push('/')
    }
  }, [userId, router])
  const dispatch = useDispatch<StoreThunkDispatch>()

  const [submitType, setSubmitType] = useState('')
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(propertyFormValidationSchema({ submitType: submitType })),
  })
  console.log('errors:', errors)

  useEffect(() => {
    setValue('unit_type', propertyData?.details?.unit_type ? propertyData?.details?.unit_type : '')
    setValue('hdb_estate', propertyData?.details?.hdb ? propertyData?.details?.hdb : '')
    setValue('unit_number', propertyData?.details?.unit_number ? propertyData?.details?.unit_number : '')
    setValue('district', propertyData?.property_city ? propertyData?.property_city : '')
    setValue('hdb_estate', propertyData?.details?.hdb ? propertyData?.details?.hdb : ' ')
    trigger('hdb_estate')

    setFacility(propertyData?.details?.property_facility ? propertyData?.details?.property_facility : [])

    // INITIATING PROPERTY IMAGES FOR EDIT MODE
    setPreviewImage(
      propertyData?.details?.images && propertyData?.details?.images != '' ? propertyData?.details?.images : []
    )

    setPreviewTaxImage(
      propertyData?.details?.document && propertyData?.details?.document != '' ? propertyData?.details?.document : []
    )
  }, [])

  // HANDLE RENTAL TYPE
  const handleRentalType = (unit: any) => {
    setValue('rental_type', unit.value)

    setRoomUnit(unit.value)
    setRentalType(unit.value)
    if (unit.label === 'Whole Unit') {
      setWholeUnit(true)
      setRoom(false)
    } else if (unit.label === 'Room') {
      setRoom(true)
      setWholeUnit(false)
    }
  }

  const handlePropertyType = (unit: any) => {
    setValue('property_type', unit.value)
    let typ = ''
    if (unit.value == '44') {
      typ = 'Landed'
    } else if (unit.value == '45') {
      typ = 'Condo'
    } else {
      typ = 'HDB'
    }

    setPropertyType(unit.value)

    if (typ == 'Landed') {
      setWholeLandedList(true)
      setWholeCondoList(false)
      setWholeHdbList(false)

      // ROOM
      if (roomUnit.value == 'room' && unit.value == '44') {
        setRoomUnitLanded(true)
        setRoomUnitCondo(false)
        setRoomUnitHDB(false)
      }
    }

    if (typ == 'Condo') {
      setWholeCondoList(true)
      setWholeLandedList(false)
      setWholeHdbList(false)

      // ROOM
      if (roomUnit.value == 'room' && unit.value == '45') {
        setRoomUnitCondo(true)
        setRoomUnitLanded(false)
        setRoomUnitHDB(false)
      }
    }

    if (typ == 'HDB') {
      setWholeHdbList(true)
      setWholeHDBEstate(true)
      setWholeCondoList(false)
      setWholeLandedList(false)

      // ROOM
      if (roomUnit.value == 'room' && unit.label == '47') {
        setRoomUnitHDB(true)
        setRoomUnitLanded(false)
        setRoomUnitCondo(false)
      }
    }
  }

  const findDistrict = (paramval: any) => {
    const rearchval = paramval[0] + paramval[1]
    const disarray = [
      ['00'],
      ['01', '02', '03', '04', '05', '06'],
      ['07', '08'],
      ['14', '15', '16'],
      ['09', '10'],
      ['11', '12', '13'],
      ['17'],
      ['18', '19'],
      ['20', '21'],
      ['22', '23'],
      ['24', '25', '26', '27'],
      ['28', '29', '30'],
      ['31', '32', '33'],
      ['34', '35', '36', '37'],
      ['38', '39', '40', '41'],
      ['42', '43', '44', '45'],
      ['46', '47', '48'],
      ['49', '50', '81'],
      ['51', '52'],
      ['53', '54', '55', '82'],
      ['56', '57'],
      ['58', '59'],
      ['60', '61', '62', '63', '64'],
      ['65', '66', '67', '68'],
      ['69', '70', '71'],
      ['72', '73'],
      ['77', '78'],
      ['75', '76'],
      ['79', '80'],
    ]
    let ind = -1
    let fi = false
    for (let i = 0; i < disarray.length; i++) {
      for (let j = 0; j < disarray[i].length; j++) {
        if (disarray[i][j] === rearchval) {
          fi = true
          ind = i
          break
        }
      }
      if (fi) break
    }
    if (ind !== -1) {
      setDistrict(districtName[ind].value)
    }
  }

  /**
   * ONCHANGE POSTAL CODE GET PROPERTY NAME ADDRESS AND DISTRICT
   * @param e
   * @returns object
   */
  const handlePostalCode = async (e: any) => {
    if (e.target.value.length <= 6) {
      if (
        e.target.value[e.target.value.length - 1] >= '0' &&
        e.target.value[e.target.value.length - 1] <= '9' &&
        e.target.value[0] !== '0'
      )
        setPstcode(e.target.value)
      else {
        setPstcode(e.target.value.slice(0, -1))
      }
      setPostalCode(pstcode)
    }
    if (
      e.target.value.length === 6 &&
      e.target.value[e.target.value.length - 1] >= '0' &&
      e.target.value[e.target.value.length - 1] <= '9'
    ) {
      setPstcode(e.target.value)
      setPostalCode(e.target.value)
      dispatch(showLoader('Please wait...'))
      const { data } = await axios.post('/api/sglocat', { postalCode: e.target.value })
      dispatch(hideLoader())
      if (data?.status === 'success') {
        setPropertyName(
          data?.Postcodes[0]?.BuildingName !== '' ? data?.Postcodes[0].BuildingName : data?.Postcodes[0]?.StreetName
        )
        setValue(
          'property_name',
          data?.Postcodes[0]?.BuildingName !== '' ? data?.Postcodes[0].BuildingName : data?.Postcodes[0]?.StreetName
        )
        findDistrict(e.target.value)
        setAddress(
          `${data?.Postcodes[0]?.BuildingNumber}${data?.Postcodes[0]?.BuildingNumber !== '' ? ', ' : ''}${
            data?.Postcodes[0]?.BuildingName
          }${data?.Postcodes[0]?.BuildingName !== '' ? ', ' : ''}${data?.Postcodes[0]?.StreetName}`
        )
        setValue(
          'address',
          `${data?.Postcodes[0]?.BuildingNumber}${data?.Postcodes[0]?.BuildingNumber !== '' ? ', ' : ''}${
            data?.Postcodes[0]?.BuildingName
          }${data?.Postcodes[0]?.BuildingName !== '' ? ', ' : ''}${data?.Postcodes[0]?.StreetName}`
        )
        trigger('address')
        trigger('property_name')
        // setLatitude(data?.Postcodes[0]?.Longitude)
        // setLongitude(data?.Postcodes[0]?.Latitude)
      }
    }
  }

  /**
   *
   * @param datestr
   */
  const handleAvailableDate = (datestr: Date) => {
    setValue('available_from', datestr?.toDateString())
    trigger('available_from')
    const date = new Date(datestr)
    const resdate =
      date.getFullYear() +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      '-' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '00:00:00.000'
    setAvaildate(resdate)
    setAvailableFrom(date)
  }

  const handleFloorSizeSLA = () => {
    if (isSkiped == false) {
      dispatch(
        showModal({
          name: 'Obtain Floor Size',
          open: true,
          children: <ObtainFloorSize setIsSkiped={setIsSkiped} />,
        })
      )
    }
  }
  const handleSaveUploadImage = (files: FileList) => {
    for (let i = 0; i < files?.length; i++) {
      let notfound = true
      for (let j = 0; j < previewImage?.length; j++) {
        if (previewImage[j]?.name === files[i]?.name) {
          notfound = false
          break
        }
      }
      if (notfound) {
        setPreviewImage(prev => [...prev, files[i]])
      }
    }
  }
  const handleTaxSaveUploadImage = (files: FileList) => {
    setPreviewTaxImage([files[0]])
  }

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) {
      return
    }

    const dt = new DataTransfer()

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i]
      console.log('file', file)
      if (file.size <= 18874368) dt.items.add(file)
      else alert('File size must be below 18mb.')
    }

    e.target.files = dt.files
    console.log('dt.files', dt.files)
    const files = e.target.files
    setFiles(files)
    handleSaveUploadImage(files)
  }

  const handleRemoveImage = (e: any) => {
    const prev = previewImage
    setPreviewImage([])
    prev.map((val, ind) => {
      if (ind !== parseInt(e.target.id)) {
        setPreviewImage(previous => [...previous, val])
      }
    })
  }

  const handleRemoveImageTax = (e: any) => {
    const prev = previewTaxImage
    setPreviewTaxImage([])
    prev.map((val, ind) => {
      if (ind !== parseInt(e.target.id)) {
        setPreviewTaxImage(previous => [...previous, val])
      }
    })
  }

  //UPLOAD POI
  const HandleUploadDocument = (e: any) => {
    setFiles(e.target.files)
    handleTaxSaveUploadImage(e.target.files)
  }

  const handleChangeAmenity = (option: string) => {
    if (amenity.includes(option)) {
      setAmenity(amenity.filter(item => item !== option))
    } else {
      setAmenity([...amenity, option])
    }
  }
  const handleChangeFacility = (option: string) => {
    if (facility.includes(option)) {
      setFacility(facility.filter(item => item !== option))
    } else {
      setFacility([...facility, option])
    }
  }
  const handleChangeOther = (option: string) => {
    if (other.includes(option)) {
      setOther(other.filter(item => item !== option))
    } else {
      setOther([...other, option])
    }
  }
  const handleHDBESTATEList = (newValue: any) => {
    setValue('hdb_estate', newValue ? newValue.target.textContent : ' ')
    trigger('hdb_estate')
    setEstate(newValue.target.textContent)
  }

  const dataAmenities: any = []
  const dataFacility: any = []
  const dataMRT: any = []
  const othersFacilities: any = []

  other.map((item: any) => {
    othersFacilities.push(item.value)
  })

  amenity.map((item: any) => {
    dataAmenities.push(item.value)
  })

  facility.map((item: any) => {
    dataFacility.push(item.value)
  })

  mrt.map((item: any) => dataMRT.push(item.value))

  const amenities = JSON.stringify(dataAmenities)
  const facilities = JSON.stringify(dataFacility)
  const mrtList = JSON.stringify(dataMRT).replace(/"/g, '')
  const OtherList = JSON.stringify(othersFacilities)

  // SUBMIT FORM
  const propertyFormSubmiteHandler = (data: any) => {
    // if (previewTaxImage?.length <= 0 && !skipPoiWarning && poiWarning != false) {
    //   dispatch(
    //     showModal({
    //       name: 'POI Update Warning',
    //       open: true,
    //       children: (
    //         <PoiWarning
    //           handlePoiWarningButton={handlePoiWarningButton}
    //           setSkipPoiWarning={setSkipPoiWarning}
    //           setPoiWarning={setPoiWarning}
    //         />
    //       ),
    //     })
    //   )
    // } else {
    FormSubmiteHandler(data)
    // }
  }

  const FormSubmiteHandler = async (data: any) => {
    let sub_category_name = ''
    if (data.property_type == '44') {
      sub_category_name = 'Landed'
    }
    if (data.property_type == '45') {
      sub_category_name = 'Condo'
    }
    if (data.property_type == '47') {
      sub_category_name = 'HDB'
    }

    let tempimage: any = []
    let temptaximage: any = []
    // if (previewImage.length === 0) {
    //   console.log('Error: Please Upload Property Images')
    //   window.scroll({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth',
    //   })
    // } else if (previewTaxImage.length === 0) {
    //   console.log('Error: Please Upload Property Tax Document')
    // }
    // if(false){
    //   console.log("not worked")
    // }
    // else {
    const imageFormData = new FormData()
    tempimage = []
    let k = 0
    for (let i = 0; i < previewImage?.length; i++) {
      if (typeof previewImage[i] === 'string') {
        // console.log('previewImage', previewImage[i])
        tempimage.push(previewImage[i])
      } else {
        imageFormData.append(`media[${k}]`, previewImage[i])
        // console.log('previewImage[i]', previewImage[i])
        k++
      }
    }

    //!============
    // if (previewImage?.length <= 0) {
    //   // imageFormData.append(`media[${k}]`, 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/63a0021052c2d.jpg')
    //   tempimage.push('https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/63a0021052c2d.jpg')
    // }
    //!============
    setPreviewImage([...tempimage])
    //CALL UPLOAD API
    let resurl: any = []
    try {
      const response: any = await uploadFiles(imageFormData)
      // console.log('uploaded files --->>>><<<', response)
      resurl = response.data.url
    } catch (e) {
      console.log('upload error')
    }
    tempimage = [...tempimage, ...resurl]

    resurl.length > 0 &&
      resurl.map((url: any) => {
        setPreviewImage(prev => [...prev, url])
      })

    if (previewTaxImage[0] && typeof previewTaxImage[0] !== 'string') {
      const fileFormData = new FormData()
      fileFormData.append(`media[0]`, previewTaxImage[0])
      let respon: any
      try {
        // respon = await imageUpload(fileFormData)
        respon = await uploadFiles(fileFormData)
        respon = respon.data
        // console.log('uploaded files respon --->>>><<<', respon)/
      } catch (e) {
        respon = {
          url: [],
        }
      }
      temptaximage = [...respon.url]
      setPreviewTaxImage([...respon.url])
      setDocument([...respon.url])
    } else {
      // console.log("typeof ============, ",typeof(previewTaxImage[0]))
      temptaximage = previewTaxImage
      setDocument(previewTaxImage)
    }

    const propertyDetails = {
      address: `Singapore`,
      property_address: `${address}`,
      city: `Singapore`,
      category: `Residential`,
      description: `${data.description}`,
      document: `[${temptaximage}]`,
      fileds: null,
      images: `[${
        tempimage ? tempimage : '[https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/63a0021052c2d.jpg]'
      }]`,
      //all_images_list: `[${tempimage}]`,
      cover_image_url: `${
        tempimage[0] ? tempimage[0] : 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/63a0021052c2d.jpg'
      }`,
      min_booking_amount: null,
      mobile_no: session?.user?.userInfo?.country_code + session?.user?.userInfo?.mobile,
      name: `${session?.user?.name}`,
      price: `${data.rental_amount}`,
      price_unit: `Month`,
      product_name: `${data.property_name}`,
      subcategory: `${sub_category_name}`,
      rental_type: `${data.rental_type}`,
      unit_type: `${data.unit_type}`,
      bedroom: `${data.bedroom}`,
      bathroom: `${data.bathroom}`,
      floor_size: `${data.floor_size}`,
      build_year: '2023',
      floor_level: `${data.floor_level ? data.floor_level : null}`,
      furnishing: `${data.furnishing ? data.furnishing : null}`,
      rent_term: `${data.rent_term ? data.rent_term : null}`,
      property_estate: `${data.hdb_estate ? data.hdb_estate : null}`,
      permit_gender: `${rentalType != 'Room' ? '' : data.gender}`,
      keyword: null,
      adder_role: null,
      country: '',
      price_negotiable: null,
      state: null,
      postal_code: `${data.postal_code}`,
      street_name: null,
      house_no: null,
      street_no: null,
      pax_number: null,
      parking_vehicle_num: null,
      property_city: `${district}`,
      facing: `${data.facing ? data.facing : null}`,
      listing_purpose: null,
      latitude: null,
      longitude: null,
      hdb: `${data.hdb_estate ? data.hdb_estate : null}`,
      mrt: null,
      property_emenity: amenity, // dataAmenities
      property_facility: facility, // dataFacility
      room_facility: other, // othersFacilities
      available_from: `${moment(availableFrom).format('YYYY-MM-DD')}`,
      upload_title: null,
      image_list: `[${
        tempimage ? tempimage : '[https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/63a0021052c2d.jpg]'
      }]`,
      unit_number: `${propertyType === '44' ? '' : data.unit_number}`, //IF PROPERTY TYPE 'LANDED(44)' UNIT NO. WILL BE BLANK.
      //status: `${submitType ? submitType : '0'}`,
    }

    const formData = {
      parent_id: userId,
      name: propertyName,
      details: JSON.stringify(propertyDetails),
      category_id: '7',
      sub_category_id: data.property_type,
      category_name: 'Residential',
      sub_category_name: sub_category_name,
      is_featured: '0',
      featured_at: '2022-10-18 05:47:09',
      created_at: '2022-10-18 00:00:00',
      updated_at: null,
      user_id: userId,
      status: submitType ? submitType : '0',
      is_delete: '0',
      is_approved: '0',
      rental_type: data.rental_type,
      bedroom: data.bedroom,
      bathroom: data.bathroom,
      floor_size: data.floor_size,
      build_year: '2000',
      floor_level: data.floor_level,
      furnishing: data.furnishing,
      rent_term: data.rent_term,
      adder_role: '',
      location_detail: null,
      price_psf: '0',
      price_term: null,
      price_negotiable: '',
      pax_number: null,
      parking: null,
      parking_vehicle_num: null,
      keyword: null,
      country: 'Singapore',
      state: null,
      property_city: district,
      postal_code: data.postal_code,
      street_name: null,
      house_no: null,
      address: 'Singapore',
      street_no: null,
      facing: data.facing,
      listing_purpose: null,
      latitude: '',
      longitude: '',
      video_url: null,
      property_address: address,
      rental_amount: data.rental_amount,
      ownership_eligibility: null,
      booking_status: 'available',
      viewed: '0',
      favourite_count: '0',
      available_from: availableFrom,
      agreement_template: null,
      hdb: null,
      mrt: null,
    }

    // console.log('formData', formData)

    try {
      dispatch(showLoader('Updating Data...'))
      let productresp: any
      if (propertyID) {
        // productresp = await updateProperty({ productId: propertyID, data: formData })
      } else {
        productresp = await createProperty(formData)
      }
      console.log('productresp', productresp, formData)

      if (productresp?.data?.status == 201) {
        refetchCorporateProperties()
        dispatch(hideLoader())
        dispatch(hideModal('Add A New Property'))
      } else {
        dispatch(hideLoader())
        toast.error('Error: Something went wrong')
      }
    } catch (e) {
      console.log(e)
    }
  }

  //!========================
  // RENDERING LOADER AT THE TIME OF DATA FETCHING
  // if (propertyID && isLoading) {
  //   dispatch(showLoader('Please wait...'))
  // } else {
  //   dispatch(hideLoader())
  // }

  //POI WARNING UPLOAD BUTTON CLICK HANDLER
  const handlePoiWarningButton = () => {
    setPoiWarning(false) //Poi popup disabled
    dispatch(hideModal('POI Update Warning'))
    poiInputRef?.current?.click()
  }

  const handleCancel = () => {
    dispatch(hideModal('Add A New Property'))
  }
  //!========================

  // RENDER COMPONENT
  return (
    <>
      {/* HEADER SECTION FOR BUTTON CONTROL */}
      <form className="flex flex-col" onSubmit={handleSubmit(propertyFormSubmiteHandler)}>
        <section
          style={{ position: 'sticky', bottom: 0, zIndex: 999 }}
          className="order-2 top-[85px] 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center  bg-[#F8FBFF] shadow-[0px_4px_6px_#034EA10D]  ">
          <div className="w-[90%] md:w-full m-auto ">
            <div className="  w-full flex flex-row justify-end gap-3 sm:items-center pt-3 xl:pt-4 2xl:pt-6 pb-3 xl:pb-4 2xl:pb-5 ">
              {/* <h2 className="text-[#034EA1] text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold font-roboto uppercase ">
                {propertyID ? 'Edit Property' : 'Add A New Property'}
              </h2> */}
              <div className="flex   items-center gap-2 sm:gap-3 md:gap-4 xl:gap-6">
                {/* PROPERTY PUBLISH BUTTON CONTROL */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={customFormStyle.sx_publish_button}
                  onClick={(e: any) => setSubmitType('')}
                  // onClick={handleSubmit(() => handleValidation(''))}
                  // onClick={() => handleValidation('')}
                  className="!rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#FFFFFF] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize !shadow-none">
                  Publish
                </Button>

                {/* CANCEL BUTTON CONTROL */}
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outlined"
                  sx={{ borderColor: '#FF3434', color: '#FF3434' }}
                  className=" !rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#FF3434] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize">
                  Cancel
                </Button>

                {/* SAVE AS DRAFT BUTTON CONTROL */}
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={() => {
                    setPoiWarning(false)
                    setSubmitType('3')
                  }}
                  // onClick={() => handleValidation('3')}
                  sx={{ borderColor: '#034EA1', color: '#034EA1' }}
                  className="!rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#034EA1] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize">
                  Save As A Draft
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className=" pt-7 xl:pt-10 2xl:pt-[50px] 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5 bg-[#F1F7FF]  ">
          <div className="w-[90%] md:w-full m-auto ">
            <section className="">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 overflow-auto pb-10 ">
                <div>
                  {/* RENTAL TYPE INPUT */}
                  <div>
                    <FormControl
                      className={`custom-radio fullWidth !text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5`}>
                      <FormLabel id="demo-row-radio-buttons-group-label">Rental Type*</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        // defaultValue={propertyData?.rental_type}
                        defaultValue={rentalType}>
                        {/* {console.log('data?.rental_type', propertyData?.rental_type)} */}
                        {rental_Type.map((option: any, index: number) => (
                          <FormControlLabel
                            {...register('rental_type', {
                              onChange: e => handleRentalType({ label: e.target.value, value: e.target.value }),
                            })}
                            key={index}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <ErrorMessage
                      errors={errors}
                      name="rental_type"
                      render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                    />
                  </div>

                  {/* PROPERTY TYPE INPUT */}
                  <FormControl
                    className={`custom-radio fullWidth !text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5`}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Property Type*</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      // defaultValue={propertyType}
                      defaultValue={propertyData?.sub_category_id}>
                      {property_Type.map((option: any, index: number) => (
                        <FormControlLabel
                          {...register('property_type', {
                            onChange: e => handlePropertyType({ label: e.target.value, value: e.target.value }),
                          })}
                          key={index}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="property_type"
                    render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                  />

                  {/* PROPERTY ADDRESS SECTION */}
                  <div className="">
                    <Typography
                      className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5"
                      variant="h1"
                      sx={customFormStyle.sx_text_field}
                      component="h1">
                      Property Address
                    </Typography>

                    <div className="grid grid-cols-2 gap-7 mb-6 ">
                      {/* POSTAL CODE INPUT */}
                      <div>
                        <TextField
                          InputProps={{ readOnly: unEditable }}
                          id="outlined-basic"
                          label="Postal Code*"
                          variant="outlined"
                          className="!w-full"
                          sx={customFormStyle.sx_text_field}
                          color="primary"
                          // onChange={(e: any) => handlePostalCode(e)}
                          // defaultValue={data?.postal_code}
                          defaultValue={propertyData?.postal_code}
                          {...register('postal_code', { onChange: e => handlePostalCode(e) })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="postal_code"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>

                      {/* DISTRICT INPUT */}
                      <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                        <Autocomplete
                          // disabled={unEditable ? true : false}
                          id="district"
                          options={districtName}
                          getOptionLabel={option => option.label}
                          value={{ label: district, value: district }}
                          // value={districtName.find((option: any) => option.label === district)}
                          renderInput={params => <TextField {...params} label="Choose District*" />}
                          PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                          sx={customFormStyle.sx_text_field}
                          {...register('district')}
                          onChange={(e: any) => setDistrict(e.target.textContent)}
                        />

                        <ErrorMessage
                          errors={errors}
                          name="district"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </FormControl>
                    </div>

                    <div className="!grid !grid-cols-1 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 ">
                      {/* PROPERTY NAME INPUT */}
                      <TextField
                        InputProps={{ readOnly: unEditable }}
                        id="property"
                        value={propertyName}
                        {...register('property_name', { onChange: e => setPropertyName(e.target.value) })}
                        label={`Property Name${propertyType === 'Condo' ? '*' : ''}`}
                        variant="outlined"
                        sx={customFormStyle.sx_text_field}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="property_name"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />

                      {/* PROPERTY ADDRESS */}
                      <TextField
                        InputProps={{ readOnly: unEditable }}
                        {...register('address', {
                          onChange: e => {
                            // setValue('address', e?.target?.value ? e?.target?.value : '')
                            // trigger('address')
                            setAddress(e.target.value)
                          },
                        })}
                        id="address"
                        label="Address*"
                        variant="outlined"
                        value={address}
                        sx={customFormStyle.sx_text_field}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="address"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />

                      {/* PROPERTRY UNIT NUMBER INPUT */}
                      {(propertyType === '45' || propertyType === '47') /*'45'=HDb, '47'=Condo */ && (
                        <>
                          <TextField
                            InputProps={{ readOnly: unEditable }}
                            label="Unit Number*"
                            variant="outlined"
                            sx={customFormStyle.sx_text_field}
                            {...register('unit_number')}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="unit_number"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <Typography
                      className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mt-4 !mb-6"
                      variant="h1"
                      component="h1">
                      Property Details Information
                    </Typography>
                    <div className="!grid !grid-cols-2 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5  ">
                      <div>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Monthly Rental*"
                          variant="outlined"
                          defaultValue={monthlyRental}
                          sx={customFormStyle.sx_text_field}
                          {...register('rental_amount')}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="rental_amount"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>

                      <div>
                        <Controller
                          control={control}
                          {...register('available_from')}
                          render={({ field: { onChange } }) => (
                            <DatePicker
                              className={`!w-full !my-0`}
                              format="DD MMMM YYYY"
                              defaultValue={availableFrom ? moment(availableFrom) : null}
                              minDate={moment()}
                              label="Available From"
                              onChange={(event: any) => {
                                onChange(event)
                                console.log('even -----------', event)
                                handleAvailableDate(event?._d)
                              }}
                              sx={customFormStyle.sx_text_field}
                            />
                          )}
                        />

                        <ErrorMessage
                          errors={errors}
                          name="available_from"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>
                    </div>
                    {/* Bed Room & Bath Room*/}
                    {wholeUnit && (
                      <div className="!grid !grid-cols-2 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5   ">
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Bedroom*</InputLabel>
                          <Select
                            // MenuProps={{ disableScrollLock: true }}
                            {...register('bedroom')}
                            defaultValue={bedRoom}
                            input={<OutlinedInput label="Bedroom" />}>
                            {bedroomOptions.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <ErrorMessage
                            errors={errors}
                            name="bedroom"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Bathroom*</InputLabel>
                          <Select
                            // MenuProps={{ disableScrollLock: true }}
                            defaultValue={bathRoom}
                            {...register('bathroom')}
                            input={<OutlinedInput label="Bathroom" />}>
                            {bathroomOptions.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {/* <NativeSelect
                            // defaultValue={30}
                            // inputProps={{
                            //   name: "Bathroom",
                            //   id: 'uncontrolled-native',
                            // }}
                            input={<OutlinedInput label="Bathroom" />}>
                            <option aria-label="None" value="" />
                            {bathroomOptions.map((option: any, ind: number) => (
                              <option key={ind.toString()} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </NativeSelect> */}
                          <ErrorMessage
                            errors={errors}
                            name="bathroom"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                      </div>
                    )}

                    {room && (
                      <div className="grid grid-cols-2 !mb-3 md:!mb-4 2xl:!mb-5 gap-7  ">
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Bedroom*</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            defaultValue={bedRoom}
                            {...register('bedroom')}
                            input={<OutlinedInput label="Bedroom" />}>
                            {UnitBedRoom.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <ErrorMessage
                            errors={errors}
                            name="bedroom"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Bathroom*</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            defaultValue={bathRoom}
                            {...register('bathroom')}
                            input={<OutlinedInput label="Bathroom" />}>
                            {UnitBathRoom.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <ErrorMessage
                            errors={errors}
                            name="bathroom"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                      </div>
                    )}

                    <div className="!grid !grid-cols-2 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 ">
                      {/* <div className="!grid !grid-cols-2 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 "> */}
                      {room && (
                        <div>
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Room Size*"
                            variant="outlined"
                            defaultValue={floorSize}
                            sx={customFormStyle.sx_text_field}
                            {...register('floor_size')}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="floor_size"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </div>
                      )}
                      {wholeUnit && (
                        <div>
                          <TextField
                            // type="number"
                            onClick={handleFloorSizeSLA}
                            fullWidth
                            id="outlined-basic"
                            label="Floor Size (sqft)*"
                            variant="outlined"
                            defaultValue={floorSize}
                            sx={customFormStyle.sx_text_field}
                            {...register('floor_size')}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="floor_size"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </div>
                      )}
                      <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                        <InputLabel>Leasing Period*</InputLabel>
                        <Select
                          // MenuProps={{ disableScrollLock: true }}
                          defaultValue={leasingPeriod}
                          {...register('rent_term')}
                          input={<OutlinedInput label="Leasing Period*" />}>
                          {rentalSession.map((option: any, ind: number) => (
                            <MenuItem key={ind.toString()} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          errors={errors}
                          name="rent_term"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </FormControl>
                    </div>

                    {/* //!=-================= */}
                    <div className="!flex !flex-row !flex-wrap !gap-x-7 !gap-y-3 md:!gap-y-4  2xl:!gap-y-5">
                      {/* {(wholeUnit || room) && ( */}
                      {/* // <div className="!grid !grid-cols-2 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 "> */}
                      {/* // <div className="!grid !grid-flow-col !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 "> */}
                      {wholeUnit && wholeLandedList && (
                        <FormControl
                          className=" basis-2/6 shrink grow"
                          variant="outlined"
                          sx={customFormStyle?.sx_text_field}>
                          <Autocomplete
                            id=""
                            options={landed}
                            getOptionLabel={option => option.label}
                            // defaultValue={unitType}
                            defaultValue={landed.find((option: any) => option.label === unitType)}
                            renderInput={params => <TextField {...params} label="Unit Type (Landed)" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                            {...register('unit_type')}
                            onChange={(e: any) => setValue('unit_type', e.target.textContent)}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="unit_type"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                      )}
                      {wholeUnit && wholeCondoList && (
                        <FormControl
                          className="basis-2/6 shrink grow"
                          variant="outlined"
                          sx={customFormStyle?.sx_text_field}>
                          <Autocomplete
                            id=""
                            options={condo}
                            // defaultValue={unitType}
                            defaultValue={condo.find((option: any) => option.label === unitType)}
                            {...register('unit_type')}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Unit Type (Condo)" />}
                            onChange={(e: any) => setValue('unit_type', e.target.textContent)}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="unit_type"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                      )}
                      {wholeUnit && wholeHdbList && (
                        <FormControl
                          className="basis-2/6 shrink grow"
                          variant="outlined"
                          sx={customFormStyle?.sx_text_field}>
                          <Autocomplete
                            id=""
                            options={hdbUnit}
                            // defaultValue={unitType}
                            defaultValue={hdbUnit.find((option: any) => option.label === unitType)}
                            {...register('unit_type')}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Unit Type (HDB)" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                            onChange={(e: any) => setValue('unit_type', e.target.textContent)}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="unit_type"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                      )}
                      {wholeUnit && wholeHdbList && (
                        /*&& wholeHDBEstate */
                        <FormControl
                          className="basis-2/6 shrink grow"
                          variant="outlined"
                          sx={customFormStyle?.sx_text_field}>
                          <Autocomplete
                            id="estate"
                            options={hdbEstate}
                            defaultValue={hdbEstate.find((option: any) => option.label === estate)}
                            // defaultValue={}
                            // value={{ label: hdb, value: hdb }}
                            {...register('hdb_estate')}
                            onChange={handleHDBESTATEList}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Estate" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="hdb_estate"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                          />
                        </FormControl>
                      )}
                      {/* // </div> */}
                      {/* )} */}

                      {/* <div className="!grid !grid-cols-2 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 "> */}
                      <FormControl
                        className="basis-2/6 shrink grow"
                        variant="outlined"
                        sx={customFormStyle?.sx_text_field}>
                        <InputLabel>Floor Level</InputLabel>
                        <Select
                          // MenuProps={{ disableScrollLock: true }}
                          defaultValue={floorLevel}
                          {...register('floor_level')}
                          input={<OutlinedInput label="Floor Level" />}>
                          {floorLevelOptions.map((option: any, ind: number) => (
                            <MenuItem key={ind.toString()} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          errors={errors}
                          name="floor_level"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </FormControl>

                      <FormControl
                        className="basis-2/6 shrink grow"
                        variant="outlined"
                        sx={customFormStyle?.sx_text_field}>
                        <InputLabel>Furnishing</InputLabel>
                        <Select
                          // MenuProps={{ disableScrollLock: true }}
                          defaultValue={furnishing}
                          {...register('furnishing')}
                          input={<OutlinedInput label="Furnishing" />}>
                          {furnishingOptions.map((option: any, ind: number) => (
                            <MenuItem key={ind.toString()} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          errors={errors}
                          name="furnishing"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </FormControl>
                      {/* </div> */}
                      {/* //!=-================= */}

                      {/* <div className="!grid !grid-cols-2 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 "> */}
                      {wholeUnit && (
                        <FormControl
                          className="  shrink grow-0"
                          style={{ width: 'calc(50% - 14px)' }}
                          variant="outlined"
                          sx={customFormStyle?.sx_text_field}>
                          <InputLabel>View</InputLabel>
                          <Select
                            // MenuProps={{ disableScrollLock: true }}
                            {...register('facing')}
                            defaultValue={view}
                            input={<OutlinedInput label="View" />}>
                            {facingOptions.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      {room && (
                        <FormControl
                          className="shrink grow-0"
                          style={{ width: 'calc(50% - 14px)' }}
                          variant="outlined"
                          sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Tenant Gender</InputLabel>
                          <Select
                            defaultValue={Gender}
                            // MenuProps={{ disableScrollLock: true }}
                            {...register('gender')}
                            input={<OutlinedInput label="Gender" />}>
                            <MenuItem value="Any">Any</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {/* Add Photo & Video */}

                  <div>
                    <h1 className="text-sm lg:text-lg xl:text-xl text-[#202020] font-bold font-roboto mt-4 mb-6">
                      Add Photo & Video
                    </h1>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 bg-[#FFFFFF] p-[14px] md:p-5 xl:p-[26px] gap-3  max-h-[432px] rounded-[10px] overflow-y-auto ">
                      <div className=" flex flex-col justify-between gap-2 ">
                        <div
                          onMouseEnter={handleHover}
                          onMouseLeave={handleHoverEnd}
                          className="flex flex-col  relative gap-3 h-[150px] justify-center bg-[#FFFFFF] border-2 border-dashed border-[#909090] rounded-[10px] hover:border-dotted hover:text-[#034EA1] hover:fill-[#034EA1] hover:border-2 hover:border-[#034EA1] hover:shadow-[0px_6px_4px_#034EA14D]">
                          <label
                            htmlFor="fileUpload"
                            className=" flex justify-center absolute z-10 top-0 left-0 cursor-pointer w-full h-full  ">
                            {/* <img
                              src="/Icon/Upload Image.svg"
                              className=" w-5 h-5 md:w-7 md:h-7 xl:w-9 xl:h-9  mt-10 "
                            /> */}
                            <svg
                              id="Upload_Image"
                              className={` w-9 h-9  mt-10  ${isHovered ? 'fill-[#034EA1]' : 'fill-[#A1A1A1]'}`}
                              data-name="Upload Image"
                              xmlns="http://www.w3.org/2000/svg"
                              width="36"
                              height="36"
                              viewBox="0 0 36 36">
                              <path
                                id="Upload_Image-2"
                                data-name="Upload Image"
                                d="M9.7,4.256A5.442,5.442,0,0,0,4.256,9.7V22.45l4.4,3.167a5.442,5.442,0,0,0,6.82-.371l6.858-6.172a7.954,7.954,0,0,1,9.968-.543l2.932,2.111V16.4a1.256,1.256,0,1,1,2.512,0v13.4a7.953,7.953,0,0,1-7.953,7.953H9.7a7.953,7.953,0,0,1-7.953-7.953V23.107q0-.015,0-.031V9.7A7.953,7.953,0,0,1,9.7,1.744h13.4a1.256,1.256,0,1,1,0,2.512ZM4.256,25.545v4.246A5.442,5.442,0,0,0,9.7,35.232H29.791a5.442,5.442,0,0,0,5.442-5.442V23.736l-4.4-3.167a5.442,5.442,0,0,0-6.82.371l-6.858,6.172a7.954,7.954,0,0,1-9.968.543Zm27.209-23.8A1.256,1.256,0,0,1,32.721,3V6.767h3.767a1.256,1.256,0,1,1,0,2.512H32.721v3.767a1.256,1.256,0,0,1-2.512,0V9.279H26.442a1.256,1.256,0,1,1,0-2.512h3.767V3A1.256,1.256,0,0,1,31.465,1.744ZM13.884,10.953a2.93,2.93,0,1,0,2.93,2.93A2.93,2.93,0,0,0,13.884,10.953Zm-5.442,2.93a5.442,5.442,0,1,1,5.442,5.442A5.442,5.442,0,0,1,8.442,13.884Z"
                                transform="translate(-1.744 -1.744)"
                              />
                            </svg>
                          </label>
                          <input
                            style={{ display: 'none', height: '100%' }}
                            type="file"
                            id="fileUpload"
                            multiple
                            accept=".mkv,.mov,.mp4,.jpeg,.jpg,.png"
                            size={25600}
                            name="file"
                            className="form-control p-2 rounded border"
                            onChange={handleInputFile}
                          />
                          <p className=" mt-16 font-normal font-roboto text-xs xl:text-sm text-center flex flex-col ">
                            Upload <span> Photo & Video </span>
                          </p>
                        </div>
                        <p className="text-[#00ADEE]  text-sm  xl:text-base font-medium font-roboto capitalize">
                          Select Cover Image
                        </p>
                      </div>
                      {previewImage?.length > 0 ? (
                        previewImage?.map((item: any, index: any) => (
                          <div key={index} className=" relative flex flex-col justify-between items-center">
                            <Card id={index} className=" !w-full">
                              {/*//!''''''''''''''''''''''*/}
                              <button
                                id={index}
                                type="button"
                                onClick={handleRemoveImage}
                                className=" cursor-pointer absolute -top-[3.4px] -right-[3.4px] inline-flex justify-center items-center text-center text-[#FFFFFF] bg-[#FF3434] w-[35px] h-[35px] p-1 rounded-full">
                                <AiOutlineClose size={20} style={{ pointerEvents: 'none' }} />
                              </button>
                              {typeof item === 'string' &&
                                (item.includes('jpg') || item.includes('jpeg') || item.includes('png')) && (
                                  <img
                                    id={index}
                                    // style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    className=" w-full h-[150px] object-cover"
                                    src={item}
                                    alt=""
                                  />
                                )}

                              {typeof item === 'string' &&
                                (item.includes('mkv') || item.includes('mov') || item.includes('mp4')) && (
                                  <video
                                    id={index}
                                    autoPlay
                                    muted
                                    className=" w-full h-[150px] object-cover"
                                    src={item}></video>
                                )}

                              {item && typeof item !== 'string' && item.type.includes('image') && (
                                <img
                                  id={index}
                                  className=" w-full h-[150px] object-cover"
                                  // type="video/mp4"
                                  src={URL.createObjectURL(item)}
                                  alt=""
                                />
                              )}

                              {item && typeof item !== 'string' && item.type.includes('video') && (
                                <video
                                  id={index}
                                  autoPlay
                                  muted
                                  className=" w-full h-[150px] object-cover"
                                  // type="video/mp4"
                                  src={URL.createObjectURL(item)}></video>
                              )}
                            </Card>
                            <div className=" mt-4 w-6 h-6 rounded-full bg-[#00ADEE]" />
                          </div>
                        ))
                      ) : (
                        <div className="flex xs:hidden justify-start h-[81.5%]">
                          <Card className="!w-full">
                            <img style={{ width: '100%', height: '150px' }} src={NoImageProperty.src} alt="preview" />
                          </Card>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* PROPERTY TAX DOCUMENT */}
                  {/* <div>
                    <h1 className="text-sm lg:text-lg xl:text-xl text-[#202020] font-bold font-roboto mt-5 mb-6">
                      Property Tax Document
                    </h1>
                    {previewTaxImage?.length > 0 ? (
                      previewTaxImage?.map((item, index) => (
                        <div key={index} className=" relative mt-8 ">
                          <Card id={index.toString()} className=" !py-4 !w-full !rounded-[10px]">
                            <button
                              id={index.toString()}
                              type="button"
                              onClick={handleRemoveImageTax}
                              className=" cursor-pointer absolute top-0 right-0 inline-flex justify-center items-center text-center text-[#FFFFFF] bg-[#FF3434] w-[35px] h-[35px] p-1 rounded-full">
                              <AiOutlineClose size={20} style={{ pointerEvents: 'none' }} />
                            </button>
                            {typeof item === 'string' &&
                              (item.includes('jpg') || item.includes('jpeg') || item.includes('png')) && (
                                <img
                                  key={index}
                                  id={index.toString()}
                                  style={{ width: '100%', height: '150px' }}
                                  src={item}
                                  alt=""
                                />
                              )}
                            {typeof item === 'string' && item.includes('pdf') && (
                              <div className="h-96">
                                <iframe src={item} width="100%" height="100%" />
                              </div>
                            )}
                            {item && typeof item !== 'string' && item.type.includes('image') && (
                              <img
                                key={index}
                                id={index.toString()}
                                style={{ width: '100%', height: '150px' }}
                                src={URL.createObjectURL(item)}
                                alt=""
                              />
                            )}
                            
                            {item && typeof item !== 'string' && item.type.includes('pdf') && (
                              <div className="h-96">
                                <iframe src={URL.createObjectURL(item)} width="100%" height="100%" />
                              </div>
                            )}
                          </Card>
                        </div>
                      ))
                    ) : (
                      <div className="flex xs:hidden  justify-center w-full rounded-[10px]">
                        <Card className="!px-2 !my-2 !py-2">
                          <img style={{ width: '90%', height: '150px' }} src={NoTaxDocument.src} alt="preview" />
                        </Card>
                      </div>
                    )}
                    {previewTaxImage?.length == 0 && (
                      <div className="bg-white px-4 md:px-6 xl:px-8 2xl:px-10  py-3 md:py-4 xl:py-5 2xl:py-6 rounded-t-[10px] ">
                        <div className="bg-detailsCard gap-2 w-full shadow-md rounded flex items-center justify-between px-4 md:px-6 xl:px-8 2xl:px-10  py-3">
                          <p className="text-[#202020] text-sm  xl:text-base font-normal font-roboto capitalize">
                            Upload Your Property Tax Document
                          </p>
                          <label
                            // htmlFor={previewTaxImage?.length > 0 ? '' : 'taxUpload'}
                            htmlFor="taxUpload"
                            className="bg-white text-sm text-center  xl:text-base font-roboto font-normal text-[#00ADEE] capitalize  px-6 py-4 rounded-md cursor-pointer">
                            <Image
                              alt="no-image"
                              src="/Icon/upload.svg"
                              width="22px"
                              height="18px"
                              className=" !pr-1"
                            />
                            upload
                          </label>
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            id="taxUpload"
                            name="upload"
                            ref={poiInputRef}
                            accept=".png, .jpg, .jpeg, application/pdf"
                            value=""
                            className="form-control p-2 rounded border"
                            onChange={HandleUploadDocument}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between gap-3 md:gap-5 bg-[#EBF4FE] shadow-md rounded-b-[10px] px-6 py-3">
                      <div className="flex items-center gap-3 md:gap-5">
                        <Icon name="info" className="w-8 h-8 text-primary" />
                        <p className="text-[#034EA1] text-sm  xl:text-base font-normal font-roboto capitalize">
                          If you don't have the property tax document then download from IRAS
                        </p>
                      </div>
                      <a href="https://mytax.iras.gov.sg/ESVWeb/default.aspx" target="_blank" rel="noreferrer">
                        <button
                          type="button"
                          className="bg-white text-sm  xl:text-base font-roboto font-normal text-[#00ADEE] capitalize  px-6 py-4 rounded-md cursor-pointer">
                          <Image
                            alt="no-image"
                            src="/Icon/download.svg"
                            width="22px"
                            height="18px"
                            className=" !pr-1"
                          />
                          Download
                        </button>
                      </a>
                    </div>
                  </div> */}

                  <div className="  mt-10">
                    <TextField
                      id="outlined-select-currency"
                      label="Write a Description"
                      fullWidth
                      multiline
                      minRows={8}
                      size="small"
                      sx={customFormStyle?.sx_text_field}
                      {...register('description')}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mb-10 ">
                {wholeUnit && (
                  <div className="amenities">
                    <Typography
                      className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mt-4 !mb-6"
                      variant="h2"
                      component="h2">
                      Amenities
                    </Typography>
                    <div className="">
                      <MultiSelect
                        name="Amenities"
                        labelId="Amenities"
                        className="!mb-3 md:!mb-4 2xl:!mb-5"
                        onChangeEv={handleChangeAmenity}
                        options={[amenitiesOptions, amenity]}
                      />
                    </div>
                  </div>
                )}

                {((wholeUnit && wholeLandedList) || (wholeUnit && wholeCondoList)) && (
                  <div className="facilities ">
                    <Typography
                      className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mt-4 !mb-6"
                      variant="h2"
                      component="h2">
                      Facilities
                    </Typography>
                    <div className="">
                      <MultiSelect
                        name="Facilities"
                        labelId="Facilities"
                        className="!mb-6 md:!mb-7 xl:!mb-9 2xl:!mb-10"
                        onChangeEv={handleChangeFacility}
                        options={[facilitiesOptions, propertyData?.details?.property_facility]}
                      />
                    </div>
                  </div>
                )}

                {room && (
                  <div className="facilities">
                    <Typography
                      className=" !text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mt-4 !mb-6"
                      variant="h1"
                      component="h1">
                      Others
                    </Typography>
                    <div className="">
                      <MultiSelect
                        name="RoomFacilities"
                        labelId="RoomFacilities"
                        className="!mb-6 md:!mb-7 xl:!mb-9 2xl:!mb-10"
                        onChangeEv={handleChangeOther}
                        options={[othersOptions, other]}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      </form>
    </>
  )
}

export default AddSingleProperty
