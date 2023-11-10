import { FC } from 'react'
import { ImCheckboxChecked, ImArrowRight, ImCheckboxUnchecked, ImBriefcase } from 'react-icons/im'
import {
  AiFillCamera,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineFileSearch,
  AiOutlineQuestionCircle,
  AiOutlineSchedule,
} from 'react-icons/ai'
import { BiArea, BiBed, BiDollarCircle, BiMessageSquareError, BiReceipt, BiWalk } from 'react-icons/bi'
import {
  BsBellFill,
  BsBuildings,
  BsChatLeftText,
  BsFillShareFill,
  BsGoogle,
  BsHeadset,
  BsInfoCircle,
  BsPaypal,
  BsPersonCircle,
  // BsUpload,
  BsFillExclamationTriangleFill,
  BsCheckCircleFill,
} from 'react-icons/bs'
import {
  // FaBath,
  // FaEyeSlash,
  FaFacebookSquare,
  // FaGoogle,
  FaInbox,
  FaMapMarkerAlt,
  // FaMoneyCheck,
  FaPhoneSquareAlt,
  FaWhatsapp,
} from 'react-icons/fa'
import { FcDocument } from 'react-icons/fc'
import {
  FiBell,
  FiCalendar,
  FiCheck,
  FiCheckSquare,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiEdit3,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiInbox,
  FiLogOut,
  FiMenu,
  FiPlus,
  FiPlusSquare,
  FiSearch,
  FiSend,
  FiTrash2,
  FiUpload,
  FiUser,
  FiUsers,
  FiX,
  FiXCircle,
} from 'react-icons/fi'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { IoIosShareAlt } from 'react-icons/io'
import {  IoCheckmarkDone, IoFootball, IoImageOutline } from 'react-icons/io5' // IoBedOutline,
import { LuBath } from 'react-icons/lu'
import {
  MdClose,
  MdFavorite,
  MdFavoriteBorder,
  // MdModeEdit,
  // MdOutlineBed,
  MdOutlineCancel,
  MdOutlineMessage,
  MdHealthAndSafety,
  MdAdd,
  MdGroups
} from 'react-icons/md'
// import { RiShareForwardFill } from 'react-icons/ri'
import { TbEyeCheck, TbMap2, TbMessages, TbReceipt2 } from 'react-icons/tb'

interface IconProps {
  name: string
  onClick?: () => void
  className?: string
}

export const ICONS = {
  home: FiHome,
  user: FiUser,
  users: FiUsers,
  // userGroup: HiOutlineUserGroup,
  plus: FiPlus,
  logout: FiLogOut,
  helpCircle: FiHelpCircle,
  chevronDown: FiChevronDown,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  trash: FiTrash2,
  search: FiSearch,
  eye: FiEye,
  eyeOff: FiEyeOff,
  menu: FiMenu,
  notification: FiBell,
  notificationFill: BsBellFill,
  inbox: FiInbox,
  inboxFill: FaInbox,
  xMark: FiX,
  check: FiCheck,
  picture: IoImageOutline,
  map: TbMap2,
  paypal: BsPaypal,
  logOut: FiLogOut,
  favorite: MdFavoriteBorder,
  favoriteFill: MdFavorite,
  marker: FaMapMarkerAlt,
  bed: BiBed,
  bath: LuBath,
  area: BiArea,
  walk: BiWalk,
  chatText: BsChatLeftText,
  share: BsFillShareFill,
  info: BsInfoCircle,
  microphone: BsHeadset,
  facebook: FaFacebookSquare,
  whatsApp: FaWhatsapp,
  google: BsGoogle,
  phone: FaPhoneSquareAlt,
  person: BsPersonCircle,
  document: FcDocument,
  transaction: BiReceipt,
  building: BsBuildings,
  fees: TbReceipt2,
  cross: MdClose,
  schedule: AiOutlineSchedule,
  question: AiOutlineQuestionCircle,
  msg: MdOutlineMessage,
  chatProgress: TbMessages,
  checkmark: IoCheckmarkDone,
  plusCircle: AiFillPlusCircle,
  minusCircle: AiFillMinusCircle,
  camera: AiFillCamera,
  profileShare: IoIosShareAlt,
  infoPop: HiOutlineInformationCircle,
  plusSquare: FiPlusSquare,
  details: AiOutlineFileSearch,
  edit: FiEdit,
  accept: FiCheckSquare,
  cancel: MdOutlineCancel,
  eyeSlash: FiEyeOff,
  eyeCheck: TbEyeCheck,
  reject: FiXCircle,
  payment: BiDollarCircle,
  send: FiSend,
  sign: FiEdit3,
  upload: FiUpload,
  request: BiMessageSquareError,
  modalClose: MdOutlineCancel,
  calendar: FiCalendar,
  file: FiFileText,
  checkboxChecked: ImCheckboxChecked,
  checkboxUnchecked: ImCheckboxUnchecked,
  healthAndSafety: MdHealthAndSafety,
  arrowRight: ImArrowRight,
  briefcase: ImBriefcase,
  triExclamation: BsFillExclamationTriangleFill,
  roundedCheck: BsCheckCircleFill,
  add: MdAdd,
  groups:MdGroups
}

export const ICON_NAMES = Object.keys(ICONS) as string[]

export const Icon: FC<IconProps> = ({ name, onClick, className }) => {
  if (!ICON_NAMES.includes(name)) return null

  const Component = ICONS[name as keyof typeof ICONS]
  return <Component className={className} onClick={onClick} />
}
