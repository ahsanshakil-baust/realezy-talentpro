import EmblaCarousel from '@/components/cards/EmblaCarousel/EmblaCarousel'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Chip, IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Icon } from '../Icon'
import { HomeDeleteSvg, HomeEditSvg, StatusSvg } from '../Svg'
import Link from 'next/link'
import { useUpdateStatusPropertyMutation } from '@/store'
import Image from 'next/image'
import deletePropertyIcon from '@/public/download/myproduct/houseDelete.svg'
import editPropertyIcon from '@/public/download/myproduct/houseEdit.svg'
import { toast } from 'react-toastify'

interface MyPropertyCardProps {
  images: string[]
  propertyName: string
  price: string
  type: string
  rentalType: string
  bedroom: string
  bathroom: string
  status: string
  squareFeet: string
  id: string
  isApproved: string
  ownershipEligibility: boolean
  onActionButton?: any
  tourId?: any
  previousData?: any
}

let options = [
  {
    label: 'Edit',
    Icon: () => <HomeEditSvg className="w-5 h-5 mr-3" />,
  },
  {
    label: 'Delete',
    Icon: () => <HomeDeleteSvg className="w-5 h-5 mr-3" />,
  },
]

const MyPropertyCard = ({
  images,
  propertyName,
  price,
  type,
  rentalType,
  bedroom,
  bathroom,
  status,
  squareFeet,
  id,
  isApproved,
  ownershipEligibility,
  onActionButton,
  tourId,
  previousData
}: MyPropertyCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [statusNow, setStatusNow] = useState(status)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const [updatePropertyStatusOfProperty] = useUpdateStatusPropertyMutation()
  // console.log("🚀 ~ file: MyPropertyCard.tsx:63 ~ previousData:", previousData)


  // const [updateProperty, { isError: propertyUpdateError, isLoading: propertyUpdateIsLoading, data: propertyData }] =
  //   useUpdatePropertyMutation()
  const updatePropertyStatus = async () => {
    const statusNew = statusNow == "1" ? 2 : 1
    setStatusNow(statusNew.toString())
    const productresp = await updatePropertyStatusOfProperty({
      new_status: statusNew,
      property_id: parseInt(previousData?.id),
    })
    console.log("🚀 ~ file: MyPropertyCard.tsx:74 ~ updatePropertyStatus ~ productresp:", productresp)
  }
  const handleDelete = () => {
    if(status === "3"){
      onActionButton('Delete', id)
    }
    else{
      toast.error("You can't delete this property")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md flex  w-full h-full p-0 ml-0">
      <div className="h-[236px] w-[336px] pl-4 py-[18px]">
        <EmblaCarousel options={{}} slides={images} tourId={tourId} />
        {/* <div className="absolute top-0 right-0">
          <IconButton
            aria-label="more"
            id="my-property-menu-button"
            aria-controls={open ? 'my-property-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="text-black">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="my-property-menu"
            MenuListProps={{
              'aria-labelledby': 'my-property-menu-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                width: '150px',
              },
            }}>
            {anchorEl &&
              options.length > 0 &&
              options.map(({ label, Icon }) => {
                return label == 'Delete' ? (
                  status === '3' ? (
                    <MenuItem
                      key={label}
                      onClick={() => {
                        handleClose(), onActionButton(label, id)
                      }}
                      className="">
                      <div className="flex justify-center items-center ">
                        <Icon />
                        {label}
                      </div>
                    </MenuItem>
                  ) : null
                ) : (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      handleClose(), onActionButton(label, id)
                    }}
                    className="">
                    <div className="flex justify-center items-center ">
                      <Icon />
                      {label}
                    </div>
                  </MenuItem>
                )
              })}
          </Menu>
        </div> */}
      </div>
      <div className="pt-5 pb-7 px-7 flex flex-col h-full justify-between flex-grow">
        <div className="flex justify-between mb-2">
          <p className="text-secondary flex gap-2 text-[16px]/[19px] font-roboto">
            <span className="text-battleshipGray">{`${type} -`} </span>
            <span>{rentalType}</span>
          </p>
          <div onClick={handleDelete} className='!w-10 h-10 flex items-center justify-center rounded-[10px] outline outline-2 cursor-pointer outline-red-500 !p-0'><Image src={deletePropertyIcon} height={25} width={25} /></div>
          {/* <h2 className="w-1/3 text-md truncate font-bold text-xl text-secondary text-right">${price}/mo</h2> */}
        </div>
        <h2 className="w-full -mt-4 truncate font-bold font-roboto uppercase tracking-wide text-[16px]/[19px] text-textValueColor mb-4">
          {propertyName}
        </h2>
        <div className="mb-4 flex justify-between w-full items-center gap-2">
          <div className="text-davysGrey gap-2 text-base flex items-center">
            <Icon className="w-6 h-6" name="bed" />
            <p className="truncate">{bedroom} </p>
            <Icon className="w-6 h-6" name="bath" />
            <p className="truncate">{bathroom}</p>
            <Icon className="w-6 h-6" name="area" />
            <p className="truncate">{squareFeet}&nbsp;Sq Ft</p>
          </div>
        </div>


        <div className="mb-5 flex justify-between w-full items-center gap-2">
          {/* <div className="text-davysGrey gap-2 text-base flex items-center">
            <Icon className="w-6 h-6" name="bed" />
            <p className="truncate">{bedroom} </p>
            <Icon className="w-6 h-6" name="bath" />
            <p className="truncate">{bathroom}</p>
            <Icon className="w-6 h-6" name="area" />
            <p className="truncate">{squareFeet}&nbsp;Sq Ft</p>
          </div> */}
          <h2 className="w-1/3 text-md truncate font-bold text-xl text-secondary text-right">${price}/mo</h2>
          <Chip
            icon={<StatusSvg className="w-4 h-4 !text-primary path-fill-current" />}
            label={status === "3" ? "Draft" : (isApproved === "1" ? 'Approved' : 'Pending')}
            className="!bg-lavender !text-primary"
          />
        </div>
        <div className="flex gap-5 h-[52px]">
          
          {/* <Link href={`/property-details/${id}`} passHref>
            <Button variant="contained" size="large">
              Property Details
            </Button>
          </Link> */}
          <div onClick={()=>onActionButton('Edit', id)} className='bg-[#034EA1] rounded-[10px] w-[105px] text-white text-[18px]/[20px] flex gap-2 justify-center items-center cursor-pointer'>
            <Image src={editPropertyIcon} height={20} width={20} />
            <div>Edit</div>
          </div>
          <Button
            disabled={isApproved === "0"}
            variant="text"
            className={`${statusNow == "1" ? "bg-[#D4E8FF]" : "bg-[#00ADEE] text-white hover:text-primary"} px-9 text-[18px]/[22px] `}
            onClick={updatePropertyStatus}
            startIcon={statusNow == "1" ? <VisibilityOff /> : <Visibility />}>
            <span>{statusNow == "1" ? "Unpublish" : "Publish"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyPropertyCard

