import { Icon, MultiSelect, PrimaryLayout } from '@/components'
import React, { useEffect, useState } from 'react'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))

import NoImageProperty from '@/public/NoImageProperty.jpg'
import NoTaxDocument from '@/public/tax.png'
import { demoData } from '@/util/data'
import { FaTrash } from 'react-icons/fa'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import axios from 'axios'
import customValidator from '@/util/custom-validator'
import {
  Box,
  Button,
  Card,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  styled,
  Autocomplete,
  Paper,
  FormLabel,
} from '@mui/material'
import { RadioButton } from '@/components/shared/Radio'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import {
  hideLoader,
  hideModal,
  showLoader,
  showModal,
  useCreatePropertyMutation,
  useMultiFileUploadMutation,
  useUpdatePropertyMutation,
} from '@/store'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'
import { blue } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { StoreThunkDispatch } from '@/types'
import { ErrorMessage } from '@hookform/error-message'
import ObtainFloorSize from '../../../components/propertyDetails/ObtainFloorSize'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import propertyFormValidationSchema from '../../../components/shared/FormValidation/PropertyFormValidationSchema'
import { RadioGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Radio } from '@mui/material'
import { customFormStyle } from '../../../util/customFormStyle'

const {
  districtName,
  condo,
  currencies,
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

const EditPropertyV2 = ({ singlePropertyInfo }: any) => {
  // console.log('singlePropertyInfo', singlePropertyInfo)
  const router = useRouter()

  const [updateProperty] = useUpdatePropertyMutation()

  const { data: session }: any = useSession()
  const [isHovered, setIsHovered] = useState(false)
  const handleHover = () => {
    setIsHovered(true)
  }
  const handleHoverEnd = () => {
    setIsHovered(false)
  }
  const [uploadFiles, { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }] =
    useMultiFileUploadMutation()
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
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(propertyFormValidationSchema({ submitType: submitType })),
  })

  const [previewImage, setPreviewImage] = useState<any[]>([])
  const [previewTaxImage, setPreviewTaxImage] = useState<any[]>([])
  const [files, setFiles] = useState<FileList>()
  const [document, setDocument] = useState<any[]>([]) // document
  const [productId, setProductId] = useState(0)
  const [wholeUnit, setWholeUnit] = useState(false)
  const [room, setRoom] = useState(false)
  const [wholeLandedList, setWholeLandedList] = useState(false)
  const [wholeCondoList, setWholeCondoList] = useState(false)
  const [wholeHdbList, setWholeHdbList] = useState(false)
  const [roomUnitLanded, setRoomUnitLanded] = useState(false)
  const [roomUnitCondo, setRoomUnitCondo] = useState(false)
  const [roomUnitHDB, setRoomUnitHDB] = useState(false)
  const [propertyText, setPropertyText] = useState('')
  const [roomUnit, setRoomUnit] = useState<any>({ value: '', label: '' })
  const [rentalType, setRentalType] = useState('')
  const [wholeHDBEstate, setWholeHDBEstate] = useState(false)
  const [district, setDistrict] = useState('') // district
  const [pstcode, setPstcode] = useState('') // postalCode
  const [address, setAddress] = useState('') // address
  const [propertyName, setPropertyName] = useState('') // propertyName
  const [postalCode, setPostalCode] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [availdate, setAvaildate] = useState('')
  const [availableFrom, setAvailableFrom] = useState(new Date())
  const [amenity, setAmenity] = useState<string[]>([]) // amenity
  const [facility, setFacility] = useState<string[]>([]) // facility
  const [other, setOther] = useState<string[]>([]) // room facility
  const [hdb, setHdb] = useState('') // estate
  const [mrt, setMrt] = useState([])

  useEffect(() => {
    setValue('hdb_estate', singlePropertyInfo?.details?.hdb ? singlePropertyInfo?.details?.hdb : '')
    setValue('unit_number', singlePropertyInfo?.details?.unit_number ? singlePropertyInfo?.details?.unit_number : '')
    if (singlePropertyInfo?.rental_type == 'Whole Unit') {
      setWholeUnit(true)
    }
    if (singlePropertyInfo?.rental_type == 'Room') {
      setRoom(true)
    }
    if (singlePropertyInfo?.sub_category_id == '45') {
      setWholeCondoList(true)
    }
    if (singlePropertyInfo?.sub_category_id == '47') {
      setWholeHdbList(true)
    }
    if (singlePropertyInfo?.property_city) {
      setDistrict(singlePropertyInfo?.property_city)
      setValue('district', singlePropertyInfo?.property_city)
    }
    if (singlePropertyInfo?.property_address) {
      setAddress(singlePropertyInfo?.property_address)
    }
    if (singlePropertyInfo?.postal_code) {
      setPostalCode(singlePropertyInfo?.postal_code)
    }

    if (singlePropertyInfo?.sub_category_id == '47') {
      setPropertyType('HDB')
    } else if (singlePropertyInfo?.sub_category_id == '45') {
      setPropertyType('Condo')
    } else {
      setPropertyType('Landed')
    }
  }, [singlePropertyInfo])

  // HANDLE RENTAL TYPE
  const handleRentalType = (unit: any) => {
    setValue('rental_type', unit.value)
    console.log('rental_type', unit.value)

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

    setPropertyType(typ)

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
      // console.log(districtName[ind].value)
      setDistrict(districtName[ind].value)
      setValue('district', districtName[ind].value)
    }
  }

  const getAddressByPostalCode = async (postalCode: any) => {
    if (postalCode.length == 6) {
      dispatch(showLoader('Please wait...'))
    }
    const { data } = await axios.post('/api/sglocat', { postalCode: postalCode })
    dispatch(hideLoader())
    if (data?.status === 'success') {
      setPropertyName(
        data?.Postcodes[0]?.BuildingName !== '' ? data?.Postcodes[0].BuildingName : data?.Postcodes[0]?.StreetName
      )
      findDistrict(postalCode)
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
      // setLatitude(data?.Postcodes[0]?.Longitude)
      // setLongitude(data?.Postcodes[0]?.Latitude)
    } else {
      setPropertyName(' ')
      setDistrict(' ')
      setValue('district', '')
      setAddress(' ')
      setValue('address', '')
    }
  }

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
        setAddress(' ')
        setPropertyName(' ')
        setDistrict(' ')
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
      //Call postal code function
      // getAddressByPostalCode(e.target.value)
    }
  }

  useEffect(() => {
    getAddressByPostalCode(postalCode)
  }, [postalCode])

  const handleAvailableDate = (datestr: Date) => {
    setValue('available_from', datestr ? datestr?.toDateString() : '')
    trigger('available_from')
    const date = new Date(datestr)
    const resdate =
      date.getFullYear() +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      '-' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '00:00:00.000'
    // console.log("resdate ---->",resdate)
    setAvaildate(resdate)
    setAvailableFrom(date)
  }

  const handleFloorSizeSLA = () => {
    dispatch(
      showModal({
        name: 'Obtain Floor Size',
        open: true,
        children: <ObtainFloorSize />,
      })
    )
  }
  const handleSaveUploadImage = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      let notfound = true
      for (let j = 0; j < previewImage.length; j++) {
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
      if (file.size <= 18874368) dt.items.add(file)
      else alert('File size must be below 18mb.')
    }

    e.target.files = dt.files
    // console.log(e)
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
  const handleHDBESTATEList = (event: any, newValue: any) => {
    setValue('hdb_estate', newValue ? newValue.value : ' ')
    trigger('hdb_estate')
    setHdb(newValue?.value)
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
  const propertyFormSubmiteHandler = async (data: any) => {
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
    if (previewImage.length === 0) {
      console.log('Error: Please Upload Property Images')
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } else if (previewTaxImage.length === 0) {
      console.log('Error: Please Upload Property Tax Document')
    } else {
      const imageFormData = new FormData()
      tempimage = []
      let k = 0
      for (let i = 0; i < previewImage.length; i++) {
        if (typeof previewImage[i] === 'string') {
          tempimage.push(previewImage[i])
        } else {
          imageFormData.append(`media[${k}]`, previewImage[i])
          k++
        }
      }
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
          // console.log('uploaded files respon --->>>><<<', respon)
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
    }

    const propertyDetails = {
      address: `${address}`,
      property_address: `${district}`,
      city: `Singapore`,
      category: `Residential`,
      description: `${data.description}`,
      document: `[${temptaximage}]`,
      fileds: null,
      images: `[${tempimage}]`,
      all_images_list: `[${tempimage}]`,
      cover_image_url: `${tempimage[0]}`,
      min_booking_amount: null,
      mobile_no: null,
      // name: `${session?.user?.name}`,
      name: 'demo',
      price: `${data.rental_amount}`,
      price_unit: `Month`,
      product_name: `${data.property_name}`,
      subcategory: `${sub_category_name}`,
      rental_type: `${data.rental_type}`,
      unit_type: `${data.unite_type}`,
      bedroom: `${data.bedroom}`,
      bathroom: `${data.bathroom}`,
      floor_size: `${data.floor_size}`,
      build_year: null,
      floor_level: `${data.floor_level}`,
      furnishing: `${data.furnishing}`,
      rent_term: `${data.rent_term}`,
      property_estate: `${data.hdb_estate}`,
      permit_gender: `${data.gender}`,
      keyword: null,
      adder_role: null,
      country: 'Singapore',
      price_negotiable: null,
      state: null,
      postal_code: `${data.postal_code}`,
      street_name: null,
      house_no: null,
      street_no: null,
      pax_number: null,
      parking_vehicle_num: null,
      property_city: `${district}`,
      facing: `${data.facing}`,
      listing_purpose: null,
      latitude: null,
      longitude: null,
      hdb: `${data.hdb_estate}`,
      mrt: null,
      property_emenity: amenity, // dataAmenities
      property_facility: facility, // dataFacility
      room_facility: other, // othersFacilities
      available_from: `${availableFrom}`,
      upload_title: null,
      image_list: `[${tempimage}]`,
      unit_number: `${data.unit_number}`,
      status: `${submitType ? submitType : '0'}`,
    }

    const formData = {
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
      address: address,
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

    try {
      dispatch(showLoader('Updating Property...'))
      const productresp: any = await updateProperty({ productId: singlePropertyInfo?.id, data: formData })
      if (productresp?.data?.status == 200) {
        dispatch(hideLoader())
        router.push('/dashboard/my-properties')
      } else {
        dispatch(hideLoader())
        toast.error('Error: Something went wrong')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // RENDER COMPONENT
  return (
    <>
      {/* HEADER SECTION FOR BUTTON CONTROL */}
      <form onSubmit={handleSubmit(propertyFormSubmiteHandler)}>
        <section className=" sticky !z-20 top-[85px] flex items-center  bg-[#F8FBFF] shadow-[0px_4px_6px_#034EA10D] py-1 w-[70%]">
          <div className=" md:w-full m-auto ">
            <div className="w-full flex px-3 py-3 justify-between">
              <h2 className="text-[#034EA1] text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold font-roboto uppercase ">
                Edit Property
              </h2>
              <div className="flex  items-center gap-2 sm:gap-3 md:gap-4 xl:gap-6">
                <Button
                  className=" !hidden !bg-primary !px-8 !py-3 !rounded-md !shadow-md"
                  sx={{
                    ':hover': {
                      backgroundColor: '#034EA1',
                    },
                  }}>
                  <Icon name="microphone" className="!w-7 !h-7 !text-white" />
                </Button>

                {/* CANCEL BUTTON CONTROL */}
                <Link href={'/'} passHref>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: '#FF3434', color: '#FF3434' }}
                    className=" !rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#FF3434] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize">
                    Cancel
                  </Button>
                </Link>

                {/* SAVE AS DRAFT BUTTON CONTROL */}
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={e => setSubmitType('3')}
                  // onClick={() => handleValidation('3')}
                  sx={{ borderColor: '#034EA1', color: '#034EA1' }}
                  className="!rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#034EA1] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize">
                  Save As A Draft
                </Button>

                {/* PROPERTY PUBLISH BUTTON CONTROL */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={customFormStyle.sx_publish_button}
                  onClick={e => setSubmitType('')}
                  // onClick={handleSubmit(() => handleValidation(''))}
                  // onClick={() => handleValidation('')}
                  className="!rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#FFFFFF] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize !shadow-none">
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="  pt-7 xl:pt-10 2xl:pt-[50px] flex w-full items-center gap-y-5 bg-[#F1F7FF]  ">
          <div className="w-[90%] md:w-full m-auto ">
            <section className="  ">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 overflow-auto pb-10 ">
                <div className="w-full">
                  {/* RENTAL TYPE INPUT */}
                  <div>
                    <FormControl
                      className={`custom-radio fullWidth !text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5`}>
                      <FormLabel id="demo-row-radio-buttons-group-label">Rental Type*</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        defaultValue={singlePropertyInfo?.rental_type}>
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

                    {/* <RadioButton
                      label="Rental Type*"
                      labelId="rental_type"
                      className={` !text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5`}
                      onChangeEv={handleRentalType}
                      options={rental_Type}
                      // {...register('rental_type')}
                    /> */}
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
                      defaultValue={singlePropertyInfo?.sub_category_id}>
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

                  {/* <RadioButton
                    label="Property Type*"
                    labelId="property_type"
                    className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5"
                    onChangeEv={handlePropertyType}
                    options={property_Type}
                    {...register('property_type'
                    )}
                  /> */}
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

                    <div className="grid grid-cols-2 gap-7 mb-6  ">
                      {/* POSTAL CODE INPUT */}
                      <div>
                        <TextField
                          id="outlined-basic"
                          label="Postal Code*"
                          variant="outlined"
                          className={` custom-input-outline  !w-full  !bg-[#F1F7FF]  !shadow-[0px_4px_8px_#034EA11A] `}
                          sx={customFormStyle.sx_text_field}
                          color="primary"
                          onKeyUp={e => handlePostalCode(e)}
                          defaultValue={singlePropertyInfo?.postal_code ? singlePropertyInfo?.postal_code : pstcode}
                          {...register('postal_code')}
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
                          id="estate"
                          options={districtName}
                          getOptionLabel={option => option.label}
                          // value={{ label: district, value: district }}
                          renderInput={params => <TextField {...params} label="Choose District*" />}
                          PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                          sx={customFormStyle.sx_text_field}
                          // defaultValue={districtName.find((option: any) => option.label == district)}
                          {...register('district')}
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
                        id="property"
                        value={propertyName}
                        {...register('property_name', { onChange: e => setPropertyName(e.target.value) })}
                        label={`Property Name${propertyType === 'Condo' ? '*' : ''}`}
                        variant="outlined"
                        defaultValue={singlePropertyInfo?.name ? singlePropertyInfo?.name : propertyName}
                        sx={customFormStyle.sx_text_field}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="property_name"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />

                      {/* PROPERTY ADDRESS */}
                      <TextField
                        {...register('address', { onChange: e => setAddress(e.target.value) })}
                        id="address"
                        label="Address*"
                        variant="outlined"
                        value={address}
                        sx={customFormStyle.sx_text_field}
                        defaultValue={address}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="address"
                        render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                      />

                      {/* PROPERTRY UNIT NUMBER INPUT */}
                      {(propertyType === 'Condo' || propertyType === 'HDB') && (
                        <>
                          <TextField
                            id="unitNumber"
                            label="Unit Number*"
                            variant="outlined"
                            sx={customFormStyle.sx_text_field}
                            {...register('unit_number')}
                            defaultValue={
                              singlePropertyInfo?.details?.unit_number ? singlePropertyInfo?.details?.unit_number : ''
                            }
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
                    <div className="!grid !grid-cols-2 !gap-7 !mb-6  ">
                      <div>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Monthly Rental*"
                          variant="outlined"
                          sx={customFormStyle.sx_text_field}
                          {...register('rental_amount')}
                          defaultValue={singlePropertyInfo?.price ? singlePropertyInfo?.price : '0'}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="rental_amount"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>

                      <div className="w-full">
                        <DatePicker
                          className=" !w-full"
                          minDate={moment()}
                          sx={customFormStyle.sx_text_field}
                          label="Available From*"
                          {...register('available_from')}
                          onChange={(e: any) => handleAvailableDate(e?._d ?? '')}
                          defaultValue={moment(
                            singlePropertyInfo?.available_from ? singlePropertyInfo?.available_from : availdate
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="available_from"
                          render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />
                      </div>
                    </div>
                    <div className="!grid !grid-cols-2 !gap-7 !mb-6 ">
                      {room && (
                        <div>
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Room Size*"
                            variant="outlined"
                            sx={customFormStyle.sx_text_field}
                            {...register('floor_size')}
                            defaultValue={singlePropertyInfo?.floor_size ? singlePropertyInfo?.floor_size : ''}
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
                            onClick={handleFloorSizeSLA}
                            fullWidth
                            id="outlined-basic"
                            label="Floor Size (sqft)*"
                            variant="outlined"
                            sx={customFormStyle.sx_text_field}
                            {...register('floor_size')}
                            defaultValue={singlePropertyInfo?.floor_size ? singlePropertyInfo?.floor_size : ''}
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
                          MenuProps={{ disableScrollLock: true }}
                          {...register('rent_term')}
                          defaultValue={singlePropertyInfo?.rent_term ? singlePropertyInfo?.rent_term : ''}
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
                    {wholeUnit || room ? (
                      <div className="!grid !grid-cols-2 !gap-7 !mb-6 ">
                        {wholeUnit && wholeLandedList && (
                          <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                            <Autocomplete
                              id=""
                              options={landed}
                              getOptionLabel={option => option.label}
                              renderInput={params => <TextField {...params} label="Unit Type (Landed)" />}
                              PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                              {...register('unit_type')}
                              defaultValue={landed.find(
                                (option: any) => option.label === singlePropertyInfo?.details?.unit_type
                              )}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="unit_type"
                              render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                            />
                          </FormControl>
                        )}
                        {wholeUnit && wholeCondoList && (
                          <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                            <Autocomplete
                              id=""
                              options={condo}
                              {...register('unit_type')}
                              defaultValue={condo.find(
                                (option: any) => option.label === singlePropertyInfo?.details?.unit_type
                              )}
                              getOptionLabel={option => option.label}
                              renderInput={params => <TextField {...params} label="Unit Type (Condo)" />}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="unit_type"
                              render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                            />
                          </FormControl>
                        )}
                        {wholeUnit && wholeHdbList && (
                          <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                            <Autocomplete
                              id=""
                              options={hdbUnit}
                              {...register('unit_type')}
                              defaultValue={hdbUnit.find(
                                (option: any) => option.label == singlePropertyInfo?.details?.unit_type
                              )}
                              getOptionLabel={option => option.label}
                              renderInput={params => <TextField {...params} label="Unit Type (HDB)" />}
                              PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
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
                          <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                            <Autocomplete
                              id="estate"
                              options={hdbEstate}
                              {...register('hdb_estate')}
                              defaultValue={hdbEstate.find(
                                (option: any) => option.label == singlePropertyInfo?.details?.hdb
                              )}
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
                      </div>
                    ) : (
                      <div className=" !hidden"></div>
                    )}
                    <div className="!grid !grid-cols-2 !gap-7 !mb-6 ">
                      <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                        <InputLabel>Floor Level</InputLabel>
                        <Select
                          MenuProps={{ disableScrollLock: true }}
                          {...register('floor_level')}
                          defaultValue={singlePropertyInfo?.floor_level ? singlePropertyInfo?.floor_level : ''}
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

                      <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                        <InputLabel>Furnishing</InputLabel>
                        <Select
                          MenuProps={{ disableScrollLock: true }}
                          {...register('furnishing')}
                          defaultValue={singlePropertyInfo?.furnishing ? singlePropertyInfo?.furnishing : ''}
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
                    </div>

                    {/* Bed Room & Bath Room*/}
                    {wholeUnit && (
                      <div className="grid grid-cols-2 mt-11 mb-6 gap-7 ">
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Bedroom*</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            {...register('bedroom')}
                            defaultValue={singlePropertyInfo?.bedroom ? singlePropertyInfo?.bedroom : ''}
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
                            MenuProps={{ disableScrollLock: true }}
                            {...register('bathroom')}
                            defaultValue={singlePropertyInfo?.bathroom ? singlePropertyInfo?.bathroom : ''}
                            input={<OutlinedInput label="Bathroom" />}>
                            {bathroomOptions.map((option: any, ind: number) => (
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

                    {room && (
                      <div className="grid grid-cols-2 mt-11 mb-6 gap-7  ">
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Bedroom*</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            {...register('bedroom')}
                            defaultValue={singlePropertyInfo?.bedroom ? singlePropertyInfo?.bedroom : ''}
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
                            {...register('bathroom')}
                            defaultValue={singlePropertyInfo?.bathroom ? singlePropertyInfo?.bathroom : ''}
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

                    <div className="!grid !grid-cols-2 !gap-7 !mb-6 ">
                      {wholeUnit && (
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>View</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            {...register('facing')}
                            defaultValue={singlePropertyInfo?.facing ? singlePropertyInfo?.facing : ''}
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
                        <FormControl variant="outlined" sx={customFormStyle?.sx_text_field}>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
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
                    <h1 className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mt-4 !mb-6">
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
                                // fill="#a1a1a1"
                                // fillRule="evenodd"
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
                        <p className=" text-[#00ADEE]  text-sm  xl:text-base font-medium font-roboto capitalize">
                          Select Cover Image
                        </p>
                      </div>
                      {
                        previewImage?.length > 0 &&
                          previewImage?.map((item: any, index: any) => (
                            <div key={index} className=" relative flex flex-col justify-between items-center">
                              <Card id={index} className=" !w-full">
                                <button
                                  id={index}
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
                          )) /* : (
                      <div className="flex justify-start h-[81.5%]">
                        <Card className="!w-full">
                          <img style={{ width: '100%', height: '150px' }} src={NoImageProperty.src} alt="preview" />
                        </Card>
                      </div>
                    ) */
                      }
                    </div>
                  </div>
                  {/* Property Tax Document */}

                  <div>
                    {previewTaxImage?.length > 0 ? (
                      previewTaxImage?.map((item, index) => (
                        <div key={index} className=" relative mt-8 ">
                          <Card id={index.toString()} className=" !py-4 !w-full !rounded-[10px]">
                            <button
                              id={index.toString()}
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
                              <a
                                className={`btn prop-ownership-download-btn`}
                                style={{
                                  padding: ' 0.375rem 2.75rem',
                                  backgroundColor: '#00ADEE',
                                  color: '#fff',
                                  marginRight: '.5rem',
                                }}
                                href={item}
                                target="_blank"
                                rel="noreferrer">
                                PREVIEW PDF
                              </a>
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
                            {/* { item && typeof (item) !== 'string' && (item.type).includes('pdf') && <h4>{item.name}</h4> } */}
                            {item && typeof item !== 'string' && item.type.includes('pdf') && (
                              <a
                                className={`btn prop-ownership-download-btn`}
                                style={{
                                  padding: ' 0.375rem 2.75rem',
                                  backgroundColor: '#00b4f1',
                                  color: '#fff',
                                  marginRight: '.5rem',
                                }}
                                href={URL.createObjectURL(item)}
                                target="_blank"
                                rel="noreferrer">
                                PREVIEW PDF
                              </a>
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
                    <h1 className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mt-4 !mb-6">
                      Property Tax Document
                    </h1>
                    <div className="bg-white px-4 md:px-6 xl:px-8 2xl:px-10  py-3 md:py-4 xl:py-5 2xl:py-6 rounded-t-[10px] ">
                      <div className="bg-detailsCard gap-2 w-full shadow-md rounded flex items-center justify-between px-4 md:px-6 xl:px-8 2xl:px-10  py-3">
                        <p className="text-[#202020] text-sm  xl:text-base font-normal font-roboto capitalize">
                          Upload Your Property Tax Document
                        </p>
                        <label
                          htmlFor={previewTaxImage.length > 0 ? '' : 'taxUpload'}
                          className="bg-white text-sm text-center  xl:text-base font-roboto font-normal text-[#00ADEE] capitalize  px-6 py-4 rounded-md">
                          <Image src="/icon/upload.svg" width="22px" height="18px" className=" !pr-1" />
                          upload
                        </label>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="taxUpload"
                          name="upload"
                          accept=".png, .jpg, .jpeg, application/pdf"
                          value=""
                          className="form-control p-2 rounded border"
                          onChange={HandleUploadDocument}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between gap-3 md:gap-5 bg-[#EBF4FE] shadow-md rounded-b-[10px] px-6 py-3">
                      <div className="flex items-center gap-3 md:gap-5">
                        <Icon name="info" className="w-8 h-8 text-primary" />
                        <p className="text-[#034EA1] text-sm  xl:text-base font-normal font-roboto capitalize">
                          If you don't have the property tax document then download from IRAS
                        </p>
                      </div>
                      <a href="https://mytax.iras.gov.sg/ESVWeb/default.aspx" target="_blank" rel="noreferrer">
                        <button className="bg-white text-sm  xl:text-base font-roboto font-normal text-[#00ADEE] capitalize  px-6 py-4 rounded-md">
                          <Image src="/icon/download.svg" width="22px" height="18px" className=" !pr-1" />
                          Download
                        </button>
                      </a>
                    </div>
                  </div>

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
                        options={[amenitiesOptions, singlePropertyInfo?.details?.property_emenity]}
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
                        options={[facilitiesOptions, singlePropertyInfo?.details?.property_facility]}
                      />
                    </div>
                  </div>
                )}

                {room && (
                  <div className="facilities">
                    <Typography
                      className="text-sm lg:text-lg xl:text-xl text-[#202020] font-bold font-roboto mt-4 mb-6"
                      variant="h1"
                      component="h1">
                      Room Facilities
                    </Typography>
                    <div className="">
                      <MultiSelect
                        name="RoomFacilities"
                        labelId="RoomFacilities"
                        className="!mb-6 md:!mb-7 xl:!mb-9 2xl:!mb-10"
                        onChangeEv={handleChangeOther}
                        options={[othersOptions]}
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

export default EditPropertyV2
