import { Icon, MultiSelect, PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
import React, { useEffect, useState } from 'react'

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   'label + &': {
//     marginTop: theme.spacing(3),
//   },
//   '& .MuiInputBase-input': {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))

import NoImageProperty from '@/public/NoImageProperty.jpg'
import NoTaxDocument from '@/public/tax.png'
import { demoData } from '@/util/data'
// import { FaTrash } from 'react-icons/fa'
// import { FaCloudDownloadAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import customValidator from '@/util/custom-validator'
import {
  // Box,
  Button,
  Card,
  FormControl,
  // InputBase,
  InputLabel,
  MenuItem,
  // NativeSelect,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  // styled,
  Autocomplete,
  Paper,
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
} from '@/store'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'
// import { blue } from '@mui/material/colors'
// import { makeStyles } from '@mui/styles'
import { useSession } from 'next-auth/react'
// import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { StoreThunkDispatch } from '@/types'
// import { ErrorMessage } from '@hookform/error-message'
import FormHelperText from '@mui/material/FormHelperText'

const {
  districtName,
  condo,
  // currencies,
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

const PropertyAdd: NextPageWithLayout = () => {
  const router = useRouter()
  // const classes = useStyles();
  const [createProperty] =
    useCreatePropertyMutation() // , { isError: propertyCreateError, isLoading: propertyCreateIsLoading, data: propertyData }
  const { data: session }: any = useSession()
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(true)
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
  }
  const [uploadFiles] =
    useMultiFileUploadMutation() // , { isError: uploadFilesIsError, isLoading: uploadFilesIsLoading, data: uploadedFiles }
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) {
      router.push('/')
    }
  }, [userId, router])

  // const userId = '105'
  const [helperText, setHelperText] = React.useState({
    rentalType: '',
    propertyType: '',
    pstcode: '',
    propertyName: '',
    address: '',
    unitNumber: '',
    mntrent: '',
    availdate: '',
    flrsz: '',
    bedroom: '',
    bathroom: '',
    propertyEstate: '',
  })
  const [pstcode, setPstcode] = useState('') // postalCode
  const [propertyName, setPropertyName] = useState('') // propertyName
  const [district, setDistrict] = useState('') // district
  const [address, setAddress] = useState('') // address
  const [unitNumber, setUnitNumber] = useState('') // unit_number
  const [hdb, setHdb] = useState('') // estate
  const [mntrent, setMntrent] = useState('') // monthly rental
  const [flrsz, setFlrsz] = useState('') // floor / room size
  const [unitType, setUnitType] = useState('') // unit type
  const [bedroom, setBedroom] = useState('') // bedroom
  const [bathroom, setBathroom] = useState('') // bathroom
  const [rentTerm, setRentTerm] = useState('') // rent term
  const [furnishing, setFurnishing] = useState('') // furnishing
  const [floorLevel, setFloorLevel] = useState('') // floor level
  const [gender, setGender] = useState('') // gender
  const [view, setView] = useState('') // view
  const [amenity, setAmenity] = useState<string[]>([]) // amenity
  const [facility, setFacility] = useState<string[]>([]) // facility
  const [other, setOther] = useState<string[]>([]) // room facility
  const [description, setDescription] = useState('') // description
  const [document, setDocument] = useState<any[]>([]) // document

  const [availdate, setAvaildate] = useState('')
  const [availableFrom, setAvailableFrom] = useState(new Date())

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

  const { register} = useForm() // , handleSubmit, control, setValue 

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
    }
  }

  const [previewImage, setPreviewImage] = useState<any[]>([])
  const [previewTaxImage, setPreviewTaxImage] = useState<any[]>([])
  //INITIAL STATE
  const [isSubmit, setIsSubmit] = useState(false)
  const [productId, setProductId] = useState(0)
  const [rentalType, setRentalType] = useState('')

  const [floorSize, setFloorSize] = useState(0)
  const [buildYear, setBuildYear] = useState('2000')

  const [adderRole, setAdderRole] = useState('')
  const [priceNegotiable, setPriceNegotiable] = useState('')
  const [paxNumber, setPaxNumber] = useState(0)
  const [parkingVehicleNum, setParkingVehicleNum] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [country, setCountry] = useState('Singapore')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetName, setStreetName] = useState('')
  const [houseNo, setHouseNo] = useState('')

  const [streetNo, setStreetNo] = useState('')
  const [listingPurpose, setListingPurpose] = useState('')

  //DETAILS STATE
  const [city, setCity] = useState('Singapore')

  const [monthlyRental, setMonthlyRental] = useState(0)
  const [priceUnit, setPriceUnit] = useState('Month')
  const [subcategory, setSubcategory] = useState('')

  const [mrt, setMrt] = useState([])

  const [roomUnitLanded, setRoomUnitLanded] = useState(false)
  const [roomUnitCondo, setRoomUnitCondo] = useState(false)
  const [roomUnitHDB, setRoomUnitHDB] = useState(false)
  const [propertyText, setPropertyText] = useState('')

  const [propertyType, setPropertyType] = useState('')
  const [bedRoom, setBedRoom] = useState('')
  const [bathRoom, setBathRoom] = useState('')

  const [unit, setUnit] = useState('')

  // USE MODAL SHOW PICTURE CATEGORIZATION
  const [modalShow, setModalShow] = useState(false)
  const [files, setFiles] = useState<FileList>()
  const [modalType, setModalType] = useState('')

  // WHOLE PROPERTY TYPE
  const [wholeLandedList, setWholeLandedList] = useState(false)
  const [wholeCondoList, setWholeCondoList] = useState(false)
  const [wholeHdbList, setWholeHdbList] = useState(false)

  //WHOLE HDB ESTATE
  const [wholeHDBEstate, setWholeHDBEstate] = useState(false)

  const [downloadPass, setDownloadPass] = useState(true)
  const [purchasePass, setPurchasePass] = useState(false)

  // HANDLE GENDER

  const [roomUnit, setRoomUnit] = useState<any>({ value: '', label: '' })

  // RENTAL_TYPE
  const [wholeUnit, setWholeUnit] = useState(false)
  const [room, setRoom] = useState(false)

  const [iSpublish, setIsPublish] = useState(true)

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

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

  // ROOM HDB UNIT
  // HANDLE PROPERTY UNIT FOR WHOLE UNIT
  const handlePropertyType = (unit: any) => {
    // console.log('unit =====> ', unit)

    setError({ ...error, propertyType: undefined })
    setRoomReq(false)
    let typ = ''
    if (unit.value == '44') {
      typ = 'Landed'
    } else if (unit.value == '45') {
      typ = 'Condo'
    } else typ = 'HDB'

    setPropertyText(unit.value)
    setPropertyType(typ)
    setSubcategory(typ)

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

    setHelperText({ ...helperText, propertyType: '' })
    setError(false)
  }

  const handlePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    if (inputText.length > 40) {
      inputText.substring(0, 40)
      // toast.error('Property name max limit 40 charracters')
      setHelperText({ ...helperText, propertyName: 'Property name max limit 40 charracters' })
      setError(true)
      return
    } else {
      setPropertyName(e.target.value)
    }
    setError({ ...error, propertyName: undefined })

    setHelperText({ ...helperText, propertyName: '' })
    setError(false)
  }

  // HANDLE RENTAL TYPE
  const handleRentalType = (unit: any) => {
    //
    setError({ ...error, rentalType: undefined })
    setRoomUnit(unit.value)
    setRentalType(unit.value)
    setWholeUnitReq(false)
    if (unit.label === 'Whole Unit') {
      // console.log("==========here")
      setWholeUnit(true)
      setRoom(false)
    } else if (unit.label === 'Room') {
      setRoom(true)
      setWholeUnit(false)
    }

    setHelperText({ ...helperText, rentalType: '' })
    setError(false)
  }

  // HANDLE LANDED LIST
  const handleUnitType = (event: any, e: any) => {
    // setError({ ...error, unit_type: undefined, wholeUnitCondo: undefined, wholeUnitHDB: undefined })
    // setUnitType(e.value)
    // setValue('hdb_unite', e.value)

    setHelperText({ ...helperText, rentalType: '' })
    setError(false)
  }

  // HANDLE HDB ESTATE LIST
  const handleHDBESTATEList = (event: any, e: any) => {
    setError({ ...error, wholeUnitHDBEsate: undefined })
    setHdb(e.value)

    setHelperText({ ...helperText, propertyEstate: '' })
    setError(false)
  }

  const handleGender = (e: any) => {
    setGender(e.target.value)
  }

  const handlePostalCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ ...error, postalCode: undefined })
    setPostalCodeReq(true)
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
        setLatitude(' ')
        setLongitude(' ')
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
      dispatch(showLoader('Please wait...'))
      const { data } = await axios.post('/api/sglocat', { postalCode: e.target.value })
      dispatch(hideLoader())
      if (data?.status === 'success') {
        setPostalCodeReq(false)
        setPropertyName(
          data?.Postcodes[0]?.BuildingName !== '' ? data?.Postcodes[0].BuildingName : data?.Postcodes[0]?.StreetName
        )
        findDistrict(e.target.value)
        setAddress(
          `${data?.Postcodes[0]?.BuildingNumber}${data?.Postcodes[0]?.BuildingNumber !== '' ? ', ' : ''}${
            data?.Postcodes[0]?.BuildingName
          }${data?.Postcodes[0]?.BuildingName !== '' ? ', ' : ''}${data?.Postcodes[0]?.StreetName}`
        )
        setPropertyAddressReq(false)
        setLatitude(data?.Postcodes[0]?.Longitude)
        setLongitude(data?.Postcodes[0]?.Latitude)
      }
    }
    setHelperText({ ...helperText, pstcode: '' })
    setError(false)
  }

  const handleDistrict = (event: any, e: any) => {
    setError({ ...error, district: undefined })
    setDistrict(e ? e.value : '')
  }
  const handleAddress = (e: any) => {
    setError({ ...error, address: undefined })
    setAddress(e.target.value)
    setPropertyAddressReq(true)

    setHelperText({ ...helperText, address: '' })
    setError(false)
  }
  const handleUnitNumber = (e: any) => {
    setError({ ...error, address: undefined })
    setUnitNumber(e.target.value)
    setUnitReq(true)

    setHelperText({ ...helperText, unitNumber: '' })
    setError(false)
  }
  const handleAvailableDate = (datestr: Date) => {
    const date = new Date(datestr)
    setError({ ...error, availableFrom: undefined })
    const resdate =
      date.getFullYear() +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      '-' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      ' 00:00:00.000'
    // console.log("resdate ---->",resdate)
    setAvaildate(resdate)
    setAvailableFrom(date)

    setHelperText({ ...helperText, availdate: '' })
    setError(false)
  }
  const handleMonthlyRental = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ ...error, monthlyRental: undefined })
    if (
      e.target.value[e.target.value.length - 1] >= '0' &&
      e.target.value[e.target.value.length - 1] <= '9' &&
      e.target.value[0] !== '0'
    )
      setMntrent(e.target.value)
    else setMntrent(e.target.value.slice(0, -1))
    setMonthlyRental(parseInt(e.target.value))

    setHelperText({ ...helperText, mntrent: '' })
    setError(false)
  }
  const handleBedroom = (e: any) => {
    setError({ ...error, bedroom: undefined })
    setBedroom(e.target.value)

    setHelperText({ ...helperText, bedroom: '' })
    setError(false)
  }
  const handleBathroom = (e: any) => {
    setError({ ...error, bathroom: undefined })
    setBathroom(e.target.value)

    setHelperText({ ...helperText, bathroom: '' })
    setError(false)
  }
  const handleFloorSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ ...error, floorSize: undefined })
    if (
      e.target.value[e.target.value.length - 1] >= '0' &&
      e.target.value[e.target.value.length - 1] <= '9' &&
      e.target.value[0] !== '0'
    )
      setFlrsz(e.target.value)
    else setFlrsz(e.target.value.slice(0, -1))
    setFloorSize(parseInt(e.target.value))

    setHelperText({ ...helperText, flrsz: '' })
    setError(false)
  }

  //UPLOAD POI
  const HandleUploadDocument = (e: any) => {
    setFiles(e.target.files)
    handleTaxSaveUploadImage(e.target.files)
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

  const addPropertyRequired = {
    propertyName,
    rentalType,
    propertyType,
    gender,
    bedroom,
    bathroom,
    postalCode,
    district,
    address,
    availableFrom,
    monthlyRental,
    floorSize,
    floorLevel,
    furnishing,
    room,
    bathRoom,
    bedRoom,
    hdb,
    rentTerm,
    unitType,
    roomUnit,
    wholeUnit,
    mrtList,
  }

  const [error, setError] = useState<any>({})

  //PREPARE DETAILS
  if (typeof window !== 'undefined') {
    localStorage.getItem('realezy-web-token')
  }

  const dispatch = useDispatch<StoreThunkDispatch>()

  //FORM SUBMIT HANDLER
  const handlePublishProperties = async (statusCode: any) => {
    try {
      let tempimage: any = []
      let temptaximage: any = []
      // console.log(previewImage, previewTaxImage)
      if (previewImage.length === 0) {
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
      // GET ALL ERROR USING CUSTOM VALIDATION FUNCTION
      let requiredProperties: any = customValidator(addPropertyRequired)
      if (requiredProperties.isValid) {
        setError({})
      } else {
        if (
          requiredProperties.error.propertyName ||
          requiredProperties.error.rentalType ||
          requiredProperties.error.monthlyRental ||
          requiredProperties.error.floorSize
        ) {
          setError(requiredProperties.error)
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        } else {
          if (rentalType == 'whole Unit') {
            delete requiredProperties.error.bathRoom
            delete requiredProperties.error.bedRoom
            delete requiredProperties.error.floorLevel
            delete requiredProperties.error.furnishing
            delete requiredProperties.error.gender
            delete requiredProperties.error.hdb
            delete requiredProperties.error.rentTerm
            delete requiredProperties.error.room
            if (Object.keys(requiredProperties.error).length !== 0) {
              setError(requiredProperties.error)
            }
          } else if (rentalType == 'room') {
            delete requiredProperties.error.bathroom
            delete requiredProperties.error.bedroom
            delete requiredProperties.error.floorLevel
            delete requiredProperties.error.furnishing
            delete requiredProperties.error.rentTerm
            delete requiredProperties.error.unitType
            delete requiredProperties.error.unit
            delete requiredProperties.error.wholeUnit
            if (Object.keys(requiredProperties.error).length !== 0) {
              setError(requiredProperties.error)
            }
          }
        }
      }
      const propertyDetails = {
        address: `${address}`,
        property_address: `${address}`,
        city: `${city}`,
        category: `Residential`,
        description: `${description}`,
        document: `[${temptaximage}]`,
        fileds: null,
        images: `[${tempimage}]`,
        all_images_list: `[${tempimage}]`,
        cover_image_url: `${tempimage[0]}`,
        min_booking_amount: null,
        mobile_no: null,
        // name: `${session?.user?.name}`,
        name: 'demo',
        price: `${monthlyRental}`,
        price_unit: `${priceUnit}`,
        product_name: `${propertyName}`,
        subcategory: `${subcategory}`,
        rental_type: `${rentalType}`,
        unit_type: `${unitType || unit}`,
        bedroom: `${bedroom || bedRoom}`,
        bathroom: `${bathroom || bathRoom}`,
        floor_size: `${floorSize}`,
        build_year: `${buildYear}`,
        floor_level: `${floorLevel}`,
        furnishing: `${furnishing}`,
        rent_term: `${rentTerm}`,
        property_estate: `${hdb}`,
        permit_gender: `${gender}`,
        keyword: keyword !== '' ? `${keyword}` : null,
        adder_role: adderRole !== '' ? `${adderRole}` : null,
        country: null,
        price_negotiable: priceNegotiable !== '' ? `${priceNegotiable}` : null,
        state: null,
        postal_code: `${postalCode}`,
        street_name: null,
        house_no: null,
        street_no: null,
        pax_number: null,
        parking_vehicle_num: null,
        property_city: `${district}`,
        facing: `${view}`,
        listing_purpose: null,
        latitude: `${latitude}`,
        longitude: `${longitude}`,
        hdb: `${hdb}`,
        mrt: null,
        property_emenity: amenity, // dataAmenities
        property_facility: facility, // dataFacility
        room_facility: other, // othersFacilities
        available_from: `${availdate}`,
        upload_title: null,
        image_list: `[${tempimage}]`,
        unit_number: `${unitNumber}`,
        status: `${statusCode ? statusCode : '0'}`,
      }
      // "unit_type_index": 0,
      // "bedroom_index": 0,
      // "bathroom_index": 0,
      // "leasing_period_index": 0,
      // "furnishing_index": 0,
      // "floor_level_index": 0,
      // "facing_view_index": 0,
      // "gender_index": 0,
      const formData = {
        name: propertyName,
        details: JSON.stringify(propertyDetails),
        category_id: '7', //[incoming]
        sub_category_id: propertyText,
        category_name: 'Residential',
        sub_category_name: propertyType,
        is_featured: '0',
        featured_at: '2022-10-18 05:47:09',
        created_at: '2022-10-18 00:00:00',
        updated_at: null,
        user_id: userId,
        status: statusCode ? statusCode : '0',
        is_delete: '0',
        is_approved: '0',
        rental_type: rentalType,
        bedroom: bedroom || bedRoom,
        bathroom: bathroom || bathRoom,
        floor_size: floorSize,
        build_year: buildYear,
        floor_level: floorLevel,
        furnishing: furnishing,
        rent_term: rentTerm,
        adder_role: adderRole,
        location_detail: null,
        price_psf: '0',
        price_term: null,
        price_negotiable: '',
        pax_number: paxNumber,
        parking: null,
        parking_vehicle_num: parkingVehicleNum,
        keyword: keyword,
        country: country,
        state: state,
        property_city: district,
        postal_code: postalCode,
        street_name: streetName,
        house_no: houseNo,
        address: address,
        street_no: streetNo,
        facing: view,
        listing_purpose: listingPurpose,
        latitude: latitude,
        longitude: longitude,
        video_url: null,
        property_address: address,
        rental_amount: monthlyRental,
        ownership_eligibility: null,
        booking_status: 'available',
        viewed: '100',
        favourite_count: '0',
        available_from: availableFrom,
        agreement_template: null,
        // "property_emenity": dataAmenities,
        // "property_facility": dataFacility,
        // "room_facility": othersFacilities,
        hdb: null,
        mrt: null,
      }
      // "available_from": randdate[0] + '-' + anodate[0] + '-' + randdate[1] + ' ' + anodate[1],

      // FORM INSTANCE CREATE FOR SUBMIT PROPERTY ADD FORM

      // return false;

      if (!isSubmit) {
        let product: any = {}
        try {
          dispatch(showLoader('Adding Property...'))
          // product = await EasyListingAdded(formData) // need to work
          const productresp: any = await createProperty(formData)
          product = productresp?.data
          dispatch(hideLoader())
          router.push('/dashboard/my-properties')
        } catch (e) {
          console.log(e)
        }

        if (product?.status === 200) {
          // ${e.target.innerText == "Clone" ? "Cloned" : "Added"}
          setProductId(product.data.id)
          // setIsSubmit(true)
        } else {
          console.log('Error: Something went wrong')
        }
      } else {
        // setIsSpiner(true)
        // formData.id = productId > 0 ? productId : undefined
        const propertyDetails = `{
        "address": "${address}",
        "property_address": "${address}",
        "city": "${city}",
        "category":"Residential",
        "description": "${description}",
        "document": "[${document}]",
        "images": "[${tempimage}]",
        "cover_image_url": "${tempimage[0]}",
        "min_booking_amount": null,
        "mobile_no": null,
        "name": null,
        "price": "${monthlyRental}",
        "price_unit": "${priceUnit}",
        "product_name": "${propertyName}",
        "subcategory": "${subcategory}",
        "rental_type": "${rentalType}",
        "unit_type": "${unitType || unit}",
        "bedroom": "${bedRoom || bedroom}",
        "bathroom": "${bathRoom || bathroom}",
        "floor_size": "${floorSize}",
        "build_year": "${buildYear}",
        "floor_level": "${floorLevel}",
        "furnishing": "${furnishing}",
        "rent_term": "${rentTerm}",
        "property_estate": "${hdb}",
        "permit_gender": "${gender == 'null' ? null : gender}",
        "keyword": "${keyword}",
        "adder_role": "${adderRole}",
        "country": null,
        "price_negotiable": "${priceNegotiable}",
        "state": null,
        "postal_code": "${postalCode}",
        "street_name": null,
        "house_no": null,
        "street_no": null,
        "pax_number": null,
        "parking_vehicle_num": null,
        "property_city": "${district}",
        "facing":"${view}",
        "listing_purpose": null,
        "latitude": null,
        "longitude": null,
        "hdb":"${hdb}",
        "mrt":"[Admiralty, Aljunied, Bartley]",
        "property_emenity":${JSON.stringify(amenity)},
        "property_facility":${JSON.stringify(facility)},
        "room_facility":${JSON.stringify(other)},
        "available_from":"${availdate}",
        "upload_title":null,
        "image_list": "[${tempimage}]"
      }`

        // FORM INSTANCE CREATE FOR SUBMIT PROPERTY ADD FORM

        const formData: any = new FormData()
        formData.id = productId
        formData.property_address = address
        formData.name = propertyName
        formData.details = propertyDetails
        formData.sub_category_name = propertyType
        formData.sub_category_id = propertyText
        formData.property_city = district
        formData.user_id = userId
        formData.rental_type = rentalType
        formData.address = address
        formData.bedroom = bedRoom || bedroom
        formData.bathroom = bathRoom || bathroom
        formData.floor_size = floorSize
        formData.build_year = buildYear
        formData.floor_level = floorLevel
        formData.furnishing = furnishing
        formData.rent_term = monthlyRental
        formData.keyword = keyword
        formData.adder_role = adderRole
        formData.country = country
        formData.price_negotiable = priceNegotiable
        formData.state = state
        formData.postal_code = postalCode
        formData.street_name = streetName
        formData.house_no = houseNo
        formData.street_no = streetNo
        formData.pax_number = paxNumber
        formData.parking_vehicle_num = parkingVehicleNum
        formData.facing = view
        formData.listing_purpose = listingPurpose
        formData.available_from = availableFrom
        formData.unit_number = unitNumber

        //PROPERTY SAVE
        // await axios
        //   .put(
        //     'https://dev-api.realezy.com' + `index.php/product/update/${productId}`,
        //     JSON.stringify(formData),
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         "Client-Service": "frontend-client",
        //         "Auth-Key": "simplerestapi",
        //         "user-id": userId,
        //         "token": "xlkkjlskjofhojsfljlkksjioflsjflkjj"
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     if (response.status === 200) {
        //       console.log("Success: Property Updated Successfully")
        //     } else {
        //       console.log("Error: Something went wrong")
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
      }
    } catch (e) {
      console.log(e)
    }
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

  const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  }

  const handelUploadBtnClick = () => {
    setModalType('property')
    setModalShow(true)
  } // need to remove
  const handelTaxUploadBtnClick = () => {
    setModalType('tax')
    setModalShow(true)
  } // need to remove

  const handleFloorSizeSLA = () => {
    dispatch(
      showModal({
        name: 'Obtain Floor Size',
        open: true,
        children: (
          <div className="bg-inherit w-full flex flex-col max-h-[520px] 2xl:max-h-[700px]   overflow-auto rounded-b-[20px]">
            <div className=" w-full flex flex-col gap-4 px-[3.25rem] py-4">
              <p className=" font-roboto font-normal 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#505050] tracking-[0.16px] ">
                Please Use SLA website to obtain the correct floor area of your Property{' '}
              </p>
              <div className=" w-full flex gap-2">
                <a href={'https://app.sla.gov.sg/MyProperty/'} target="_blank" rel="noreferrer">
                  <Button
                    variant={'outlined'}
                    onClick={() => {
                      dispatch(hideModal('Obtain Floor Size'))
                    }}>
                    Download
                  </Button>
                </a>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(hideModal('Obtain Floor Size'))
                  }}>
                  Skip
                </Button>
              </div>
            </div>
          </div>
        ),
      })
    )
  }
  // DRAFT PEROPERTY REQUIRED FIELD
  const [wholeUnitReq, setWholeUnitReq] = useState(false)
  const [roomReq, setRoomReq] = useState(false)
  const [landedReq, setLandedReq] = useState()
  const [condoReq, setCondoReq] = useState()
  const [hdbReq, setHdbReq] = useState()
  const [postalCodeReq, setPostalCodeReq] = useState(false)
  const [propertyAddressReq, setPropertyAddressReq] = useState(false)
  const [unitReq, setUnitReq] = useState(false)
  const [errors, setErrors] = useState(false)

  // ON CLICK FORM SUBMIT
  const handleValidation = (publishStatus: any) => {
    // setStatusCode(publishStatus)
    if (rentalType === '') {
      // toast.error('Select Your Rental Type')
      // setWholeUnitReq(true)
      // return

      setHelperText({ ...helperText, rentalType: 'Select Your Rental Type' })
      setError(true)
      return
    }
    if (propertyType === '') {
      // setRoomReq(true)
      // toast.error('Select Your Property Type')
      // return
      setHelperText({ ...helperText, propertyType: 'Select Your Property Typee' })
      setError(true)
      return
    }
    if (pstcode === '') {
      // toast.error('Enter Your Property Postal Code')
      // setPostalCodeReq(true)
      // return
      setHelperText({ ...helperText, pstcode: 'Enter Your Property Postal Code' })
      setError(true)
      return
    }
    if (propertyType === 'Condo' && propertyName === '') {
      // toast.error('Enter Your Property Name')
      // setUnitReq(true)
      // return
      setHelperText({ ...helperText, propertyName: 'Enter Your Property Name' })
      setError(true)
      return
    }
    if (address === '') {
      // toast.error('Enter Your Property Address')
      // return
      setHelperText({ ...helperText, address: 'Enter Your Property Address' })
      setError(true)
      return
    }
    if ((propertyType === 'Condo' || propertyType === 'HDB') && unitNumber === '') {
      // toast.error('Enter Your Property Unit Number')
      // return
      setHelperText({ ...helperText, unitNumber: 'Enter Your Property Unit Number' })
      setError(true)
      return
    }

    if (publishStatus !== '3') {
      if (mntrent === '') {
        // toast.error('Enter Your Property Monthly Rental Amount')
        setHelperText({ ...helperText, mntrent: 'Enter Your Property Monthly Rental Amount' })
        setError(true)
        return
      }
      if (availdate === '') {
        // toast.error('Select Your Property Available Date')
        setHelperText({ ...helperText, availdate: 'Select Your Property Available Date' })
        setError(true)
        return
      }
      if (flrsz === '') {
        // toast.error('Enter Your Property Floor Size')
        setHelperText({ ...helperText, flrsz: 'Enter Your Property Floor Size' })
        setError(true)
        return
      }
      if (bedroom === '') {
        // toast.error('Select Your Property Bedroom Number')
        setHelperText({ ...helperText, bedroom: 'Select Your Property Bedroom Number' })
        setError(true)
        return
      }
      if (bathroom === '') {
        // toast.error('Select Your Property Bathroom Number')
        setHelperText({ ...helperText, bathroom: 'Select Your Property Bathroom Number' })
        setError(true)
        return
      }
      if (rentalType === 'Whole Unit' && propertyType === 'HDB' && hdb === '') {
        // toast.error('Select Your Property Estate Name')
        setHelperText({ ...helperText, propertyEstate: 'Select Your Property Estate Namer' })
        setError(true)
        return
      }
    }

    if (!errors) {
      handlePublishProperties(publishStatus)
    }
  }

  // MUI STYLE FUNCTION
  const muiStyle = () => {
    return {
      width: { sm: 250, md: 350 },
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#F1F7FF',
        '& > fieldset': {
          // border: '2px solid #E4F0FE',
          border: '2px solid ',
          borderColor: '#E4F0FE',
          borderRadius: '10px',
        },
        '&.Mui-focused': {
          '& > fieldset': {
            borderColor: '#00ADEE',
          },
        },
      },

      '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
          border: '2px solid ',
          borderColor: '#00ADEE',
        },
      },
      '& .MuiInputLabel-root': {
        color: '#000',
        '&.Mui-focused': {
          color: '#00ADEE',
        },
      },
    }
  }

  return (
    <>
      <section className=" sticky !z-20 top-[85px] 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center  bg-[#F8FBFF] shadow-[0px_4px_6px_#034EA10D]  ">
        <div className="w-[90%] md:w-full m-auto ">
          <div className="  w-full flex flex-col sm:flex-row gap-3 sm:items-center justify-between pt-3 xl:pt-4 2xl:pt-6 pb-3 xl:pb-4 2xl:pb-5 ">
            <h2 className="text-[#034EA1] text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold font-roboto uppercase ">
              Add A New Property
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
              <Link passHref href={'/'}>
                <Button
                  variant="outlined"
                  sx={{ borderColor: '#FF3434', color: '#FF3434' }}
                  className=" !rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#FF3434] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize">
                  Cancel
                </Button>
              </Link>
              <Button
                variant="outlined"
                onClick={() => handleValidation('3')}
                /* disabled={
                  !(
                    propertyType !== '' &&
                    subcategory !== '' &&
                    pstcode !== '' &&
                    address !== '' &&
                    (propertyType == 'Condo' || propertyType == 'HDB' ? unitNumber !== '' : true) &&
                    (propertyType == 'Condo' ? propertyName !== '' : true)
                  )
                } */
                sx={{ borderColor: '#034EA1', color: '#034EA1' }}
                className="!rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#034EA1] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize">
                Save As A Draft
              </Button>
              <Button
                variant="contained"
                // disabled={
                //   !(
                //     propertyType !== '' &&
                //     subcategory !== '' &&
                //     pstcode !== '' &&
                //     address !== '' &&
                //     (propertyType == 'Condo' || propertyType == 'HDB' ? unitNumber !== '' : true) &&
                //     (propertyType == 'Condo' ? propertyName !== '' : true)
                //   )
                // }
                sx={{
                  backgroundColor: '#034EA1 ',
                  opacity: 1,
                  color: '#fff',
                  ':hover': {
                    backgroundColor: '#00ADEE',
                  },
                  ':disabled': {
                    backgroundColor: '#034EA1',
                    opacity: 0.6,
                  },
                }}
                // onClick={handlePublishProperties}
                onClick={() => handleValidation('')}
                className="!rounded-[10px] !px-2 sm:!px-3 md:!px-4 xl:!px-6 2xl:!px-8 !py-1.5 xl:!py-3 !text-[#FFFFFF] !text-sm lg:!text-lg xl:!text-xl !font-normal !font-roboto !capitalize !shadow-none">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className=" mt-[183px] sm:mt-[143px] lg:mt-[149px] xl:mt-[171px] 2xl:mt-[183px] pt-7 xl:pt-10 2xl:pt-[50px] 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5 bg-[#F1F7FF]  ">
        {/* <div className="py-[10px]  md:py-[10px] lg:py-[40px]" /> */}
        {/* ====== Download Section Start */}
        {/* <section className="w-full pt-[60px] pb-8 lg:pt-[70px] lg:pb-[70px] "> */}
        <div className="w-[90%] md:w-full m-auto ">
          <section className="  ">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 2xl:gap-20 overflow-auto pb-10 ">
              <div>
                <div>
                  <RadioButton
                    name="rental_type"
                    label="Rental Type*"
                    labelId="rental_type"
                    className={` !text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5`}
                    onChangeEv={handleRentalType}
                    options={rental_Type}
                    rentalReq={wholeUnitReq}
                  />
                  <FormHelperText className="text-red-500">{helperText?.rentalType}</FormHelperText>
                </div>
                <RadioButton
                  name="property_type"
                  label="Property Type*"
                  labelId="property_type"
                  className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5"
                  onChangeEv={handlePropertyType}
                  options={property_Type}
                  rentalReq={roomReq}
                />
                <FormHelperText className="text-red-500">{helperText?.propertyType}</FormHelperText>
                <div className="">
                  <Typography
                    className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mb-3 md:!mb-4 2xl:!mb-5"
                    variant="h1"
                    sx={muiStyle()}
                    component="h1">
                    Property Address
                  </Typography>
                  <div className="grid grid-cols-2 gap-7 mb-6 custom-inputs ">
                    <TextField
                      id="outlined-basic"
                      label="Postal Code*"
                      variant="outlined"
                      value={pstcode}
                      onChange={handlePostalCode}
                      className={` custom-input-outline `}
                      // sx={{
                      //     '&:hover .MuiOutlinedInput-notchedOutline': {
                      //     borderColor: '#034EA1',
                      //   }
                      // }}
                      sx={{
                        // width: { sm: 250, md: 350 },
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F1F7FF',
                          '& > fieldset': {
                            // border: '2px solid #E4F0FE',
                            // border: '2px solid ',
                            // borderColor: postalCodeReq ? 'red' : 'transparent',
                            borderColor: 'transparent',
                            borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },
                        },

                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '2px solid ',
                            borderColor: '#00ADEE',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          // color: '#000',
                          '&.Mui-focused': {
                            color: '#00ADEE',
                          },
                        },
                      }}
                      color="primary"
                    />

                    <FormHelperText className="text-red-500">{helperText?.pstcode}</FormHelperText>

                    {/* <FormControl variant="outlined">
                      <InputLabel>Choose District*</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={district}
                        onChange={handleDistrict}
                        sx={{
                          '& fieldset': { borderColor: 'transparent' },
                        }}
                        input={<OutlinedInput label="Choose District" />}>
                        <MenuItem key="none" value="">
                          <em>None</em>
                        </MenuItem>
                        {districtName.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={ind === 0 ? '' : option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <Autocomplete
                        id="estate"
                        options={districtName}
                        onChange={handleDistrict}
                        getOptionLabel={option => option.label}
                        value={{ label: district, value: district }}
                        renderInput={params => <TextField {...params} label="Choose District*" />}
                        PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                      />
                    </FormControl>
                  </div>
                  <div className="!grid !grid-cols-1 !gap-7 !mb-3 md:!mb-4 2xl:!mb-5 custom-inputs">
                    <TextField
                      id="property"
                      value={propertyName}
                      onChange={handlePropertyName}
                      required={propertyType === 'Condo'}
                      name="name"
                      label={`Property Name${propertyType === 'Condo' ? '*' : ''}`}
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}
                    />
                    <FormHelperText className="text-red-500">{helperText?.propertyName}</FormHelperText>
                    <TextField
                      onChange={handleAddress}
                      value={address}
                      id="address"
                      label="Address*"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F1F7FF',
                          '& > fieldset': {
                            // border: '2px solid #E4F0FE',
                            border: '2px solid ',
                            borderColor: propertyAddressReq ? 'red' : 'transparent',
                            borderRadius: '10px',
                          },
                          '&.Mui-focused': {
                            '& > fieldset': {
                              borderColor: '#00ADEE',
                            },
                          },
                        },

                        '& .MuiOutlinedInput-root:hover': {
                          '& > fieldset': {
                            border: '2px solid ',
                            borderColor: '#00ADEE',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#000',
                          '&.Mui-focused': {
                            color: '#00ADEE',
                          },
                        },
                      }}
                    />
                    <FormHelperText className="text-red-500">{helperText?.address}</FormHelperText>

                    {(propertyType === 'Condo' || propertyType === 'HDB') && (
                      <>
                        <TextField
                          onChange={handleUnitNumber}
                          value={unitNumber}
                          id="unitNumber"
                          label="Unit Number*"
                          variant="outlined"
                          // sx={{
                          //   '& .MuiOutlinedInput-root': {
                          //     backgroundColor: '#F1F7FF',
                          //     '& > fieldset': {
                          //       // border: '2px solid #E4F0FE',
                          //       border: '2px solid ',
                          //       borderColor: unitReq ? 'red' : '#E4F0FE',
                          //       borderRadius: '10px',
                          //     },
                          //     '&.Mui-focused': {
                          //       '& > fieldset': {
                          //         borderColor: '#00ADEE',
                          //       },
                          //     },
                          //   },

                          //   '& .MuiOutlinedInput-root:hover': {
                          //     '& > fieldset': {
                          //       border: '2px solid ',
                          //       borderColor: '#00ADEE',
                          //     },
                          //   },
                          //   '& .MuiInputLabel-root': {
                          //     color: '#000',
                          //     '&.Mui-focused': {
                          //       color: '#00ADEE',
                          //     },
                          //   },
                          // }}
                        />

                        <FormHelperText className="text-red-500">{helperText?.unitNumber}</FormHelperText>
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
                  <div className="!grid !grid-cols-2 !gap-7 !mb-6 custom-inputs ">
                    <TextField
                      value={mntrent}
                      onChange={handleMonthlyRental}
                      // sx={{
                      //   backgroundColor: '#F8FBFF',
                      //   border: '2px solid #FFFFFF',
                      //   borderRadius: '8px',
                      //   backdropFilter: 'blur(4px)',
                      //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      //   display: 'block',
                      //   padding: '4px',
                      // }}
                      fullWidth
                      id="outlined-basic"
                      label="Monthly Rental*"
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}
                    />
                    <FormHelperText className="text-red-500">{helperText?.mntrent}</FormHelperText>
                    <DatePicker
                      minDate={moment()}
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}
                      // sx={{
                      //   backgroundColor: '#F8FBFF',
                      //   border: '2px solid #FFFFFF',
                      //   borderRadius: '8px',
                      //   backdropFilter: 'blur(4px)',
                      //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      //   display: 'block',
                      //   padding: '4px',
                      // }}
                      label="Available From*"
                      onChange={(e: any) => handleAvailableDate(e._d)} //
                    />
                    <FormHelperText className="text-red-500">{helperText?.availdate}</FormHelperText>
                  </div>
                  <div className="!grid !grid-cols-2 !gap-7 !mb-6 custom-inputs">
                    {room && (
                      <>
                        <TextField
                          // sx={{
                          //   backgroundColor: '#F8FBFF',
                          //   border: '2px solid #FFFFFF',
                          //   borderRadius: '8px',
                          //   backdropFilter: 'blur(4px)',
                          //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          //   display: 'block',
                          //   padding: '4px',
                          // }}
                          value={flrsz}
                          onChange={handleFloorSize}
                          fullWidth
                          id="outlined-basic"
                          label="Room Size*"
                          variant="outlined"
                          sx={{
                            '& fieldset': { borderColor: 'transparent' },
                          }}
                        />
                        <FormHelperText className="text-red-500">{helperText?.flrsz}</FormHelperText>
                      </>
                    )}
                    {wholeUnit && (
                      <>
                        <TextField
                          // sx={{
                          //   backgroundColor: '#F8FBFF',
                          //   border: '2px solid #FFFFFF',
                          //   borderRadius: '8px',
                          //   backdropFilter: 'blur(4px)',
                          //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          //   display: 'block',
                          //   padding: '4px',
                          // }}
                          value={flrsz}
                          onClick={handleFloorSizeSLA}
                          onChange={handleFloorSize}
                          fullWidth
                          id="outlined-basic"
                          label="Floor Size (sqft)*"
                          variant="outlined"
                          sx={{
                            '& fieldset': { borderColor: 'transparent' },
                          }}
                        />
                        <FormHelperText className="text-red-500">{helperText?.flrsz}</FormHelperText>
                      </>
                    )}
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <InputLabel>Leasing Period*</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={rentTerm}
                        onChange={(e: any) => {
                          setRentTerm(e.target.value)
                        }}
                        input={<OutlinedInput label="Leasing Period*" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {rentalSession.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  {wholeUnit || room ? (
                    <div className="!grid !grid-cols-2 !gap-7 !mb-6 custom-inputs">
                      {wholeUnit && wholeLandedList && (
                        <FormControl
                          variant="outlined"
                          sx={{
                            '& fieldset': { borderColor: 'transparent' },
                          }}>
                          {/* <InputLabel>Unit Type (Landed)</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            value={unitType}
                            onChange={handleUnitType}
                            input={<OutlinedInput label="Unit Type (Landed)" />}>
                            {landed.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={ind === 0 ? '' : option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select> */}
                          <Autocomplete
                            id=""
                            options={landed}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Unit Type (Landed)" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                            onChange={handleUnitType}
                            // onChange={handleNationalityOnChange}
                            // sx={{
                            //   '& .MuiInputLabel-root': {
                            //     '&.Mui-focused': {
                            //       color: '#00ADEE',
                            //     },
                            //   },
                            // }}
                          />
                        </FormControl>
                      )}
                      {wholeUnit && wholeCondoList && (
                        <FormControl
                          variant="outlined"
                          sx={{
                            '& fieldset': { borderColor: 'transparent' },
                          }}>
                          {/* <InputLabel>Unit Type (Condo)</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            value={unitType}
                            onChange={handleUnitType}
                            input={<OutlinedInput label="Unit Type (Condo)" />}>
                            {condo.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={ind === 0 ? '' : option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select> */}
                          <Autocomplete
                            id=""
                            options={condo}
                            onChange={handleUnitType}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Unit Type (Condo)" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                            // onChange={handleNationalityOnChange}
                            // sx={{
                            //   '& .MuiInputLabel-root': {
                            //     '&.Mui-focused': {
                            //       color: '#00ADEE',
                            //     },
                            //   },
                            // }}
                          />
                        </FormControl>
                      )}
                      {wholeUnit && wholeHdbList && (
                        <FormControl
                          variant="outlined"
                          sx={{
                            '& fieldset': { borderColor: 'transparent' },
                          }}>
                          {/* <InputLabel>Unit Type (HDB)</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            value={unitType}
                            onChange={handleUnitType}
                            input={<OutlinedInput label="Unit Type (HDB)" />}>
                            {hdbUnit.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={ind === 0 ? '' : option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select> */}
                          <Autocomplete
                            {...register('hdb_unite')}
                            id=""
                            options={hdbUnit}
                            onChange={handleUnitType}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Unit Type (HDB)" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                            // onChange={handleNationalityOnChange}
                            // sx={{
                            //   '& .MuiInputLabel-root': {
                            //     '&.Mui-focused': {
                            //       color: '#00ADEE',
                            //     },
                            //   },
                            // }}
                          />
                        </FormControl>
                      )}

                      {wholeUnit && wholeHDBEstate && wholeHdbList && (
                        <FormControl
                          variant="outlined"
                          sx={{
                            '& fieldset': { borderColor: 'transparent' },
                          }}>
                          <Autocomplete
                            id="estate"
                            options={hdbEstate}
                            onChange={handleHDBESTATEList}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Estate" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                            // onChange={handleNationalityOnChange}
                            // sx={{
                            //   '& .MuiInputLabel-root': {
                            //     '&.Mui-focused': {
                            //       color: '#00ADEE',
                            //     },
                            //   },
                            // }}
                          />
                          <FormHelperText className="text-red-500">{helperText?.propertyEstate}</FormHelperText>

                          {/* <InputLabel>Estate</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            value={hdb}
                            onChange={handleHDBESTATEList}
                            input={<OutlinedInput label="Estate" />}>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {hdbEstate.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={ind === 0 ? '' : option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select> */}
                        </FormControl>
                      )}
                      {room && (
                        <FormControl
                          variant="outlined"
                          sx={{
                            '& fieldset': { borderColor: 'transparent' },
                          }}>
                          {/* <InputLabel>Estate</InputLabel>
                          <Select
                            MenuProps={{ disableScrollLock: true }}
                            value={hdb}
                            onChange={handleHDBESTATEList}
                            input={<OutlinedInput label="Estate" />}>
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {hdbEstate.map((option: any, ind: number) => (
                              <MenuItem key={ind.toString()} value={ind === 0 ? '' : option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select> */}
                          <Autocomplete
                            // {...register('nationality')}
                            // id="nationality"
                            className=""
                            options={hdbEstate}
                            onChange={handleHDBESTATEList}
                            getOptionLabel={option => option.label}
                            renderInput={params => <TextField {...params} label="Estate" />}
                            PaperComponent={props => <Paper {...props} style={{ marginBottom: '10px' }} />}
                            // onChange={handleNationalityOnChange}
                            // sx={{
                            //   '& .MuiInputLabel-root': {
                            //     '&.Mui-focused': {
                            //       color: '#00ADEE',
                            //     },
                            //   },
                            // }}
                          />
                          <FormHelperText className="text-red-500">{helperText?.flrsz}</FormHelperText>
                        </FormControl>
                      )}
                    </div>
                  ) : (
                    <div className=" !hidden"></div>
                  )}
                  <div className="!grid !grid-cols-2 !gap-7 !mb-6 custom-inputs">
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <InputLabel>Floor Level</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={floorLevel}
                        onChange={(e: any) => {
                          setFloorLevel(e.target.value)
                        }}
                        input={<OutlinedInput label="Floor Level" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {floorLevelOptions.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <InputLabel>Furnishing</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={furnishing}
                        onChange={(e: any) => {
                          setFurnishing(e.target.value)
                        }}
                        input={<OutlinedInput label="Furnishing" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {furnishingOptions.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="!grid !grid-cols-2 !gap-7 !mb-6 custom-inputs">
                    {wholeUnit && (
                      <FormControl
                        variant="outlined"
                        sx={{
                          '& fieldset': { borderColor: 'transparent' },
                        }}>
                        <InputLabel>View</InputLabel>
                        <Select
                          MenuProps={{ disableScrollLock: true }}
                          value={view}
                          onChange={(e: any) => {
                            setView(e.target.value)
                          }}
                          input={<OutlinedInput label="View" />}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
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
                        variant="outlined"
                        sx={{
                          '& fieldset': { borderColor: 'transparent' },
                        }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          MenuProps={{ disableScrollLock: true }}
                          value={gender}
                          onChange={handleGender}
                          input={<OutlinedInput label="Gender" />}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
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
                    {previewImage?.length > 0 ? (
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
                  <h1 className="text-sm lg:text-lg xl:text-xl text-[#202020] font-bold font-roboto mt-4 mb-6">
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
                        <Image alt='no-image' src="/icon/upload.svg" width="22px" height="18px" className=" !pr-1" />
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
                        <Image alt='no-image' src="/icon/download.svg" width="22px" height="18px" className=" !pr-1" />
                        Download
                      </button>
                    </a>
                  </div>
                </div>

                {/* Bed Room & Bath Room*/}
                {wholeUnit && (
                  <div className="grid grid-cols-2 mt-11 mb-6 gap-7 custom-inputs">
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <InputLabel>Bedroom*</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={bedroom}
                        onChange={handleBedroom}
                        input={<OutlinedInput label="Bedroom" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {bedroomOptions.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText className="text-red-500">{helperText?.bedroom}</FormHelperText>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <InputLabel>Bathroom*</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={bathroom}
                        onChange={handleBathroom}
                        input={<OutlinedInput label="Bathroom" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {bathroomOptions.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText className="text-red-500">{helperText?.bathroom}</FormHelperText>
                    </FormControl>
                  </div>
                )}

                {room && (
                  <div className="grid grid-cols-2 mt-11 mb-6 gap-7 custom-inputs ">
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <InputLabel>Bedroom*</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={bedroom}
                        onChange={handleBedroom}
                        input={<OutlinedInput label="Bedroom" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {UnitBedRoom.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      sx={{
                        '& fieldset': { borderColor: 'transparent' },
                      }}>
                      <InputLabel>Bathroom*</InputLabel>
                      <Select
                        MenuProps={{ disableScrollLock: true }}
                        value={bathroom}
                        onChange={handleBathroom}
                        input={<OutlinedInput label="Bathroom" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {UnitBathRoom.map((option: any, ind: number) => (
                          <MenuItem key={ind.toString()} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText className="text-red-500">{helperText?.bathroom}</FormHelperText>
                    </FormControl>
                  </div>
                )}

                <div className=" custom-inputs mt-10">
                  {/* DESCRIPTION */}
                  {/* <TextField
                    // variant="filled"
                  style={{ backgroundColor: '#F8FBFF', border: '2px solid #FFFFFF' }}
                  id="outlined-select-currency"
                  label="Write a Description"
                  fullWidth
                  multiline
                  minRows={8}
                  size="small"></TextField> */}

                  <TextField
                    id="outlined-select-currency"
                    label="Write a Description"
                    fullWidth
                    multiline
                    value={description}
                    minRows={8}
                    size="small"
                    sx={{ background: 'transparent', borderRadius: '10px' }}
                    onChange={e => {
                      setDescription(e.target.value)
                    }}
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
                      options={[amenitiesOptions]}
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
                      options={[facilitiesOptions]}
                    />
                  </div>
                </div>
              )}

              {room && (
                <div className="facilities">
                  <Typography
                    className="!text-sm lg:!text-lg xl:!text-xl !text-[#202020] !font-bold !font-roboto !mt-4 !mb-6"
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
    </>
  )
}

export default PropertyAdd
PropertyAdd.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
