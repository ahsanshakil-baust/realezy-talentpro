import EmblaCarousel from '@/components/cards/EmblaCarousel/EmblaCarousel'
// import { Visibility } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, Chip, IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Icon } from '../Icon'
import { HomeDeleteSvg, HomeEditSvg, StatusSvg } from '../Svg'
import Link from 'next/link'

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
  tourId?: any
}

const options = [
  {
    label: 'View',
    Icon: () => <HomeEditSvg className="w-5 h-5 mr-3" />,
  },
  {
    label: 'Delete',
    Icon: () => <HomeDeleteSvg className="w-5 h-5 mr-3" />,
  },
]

const MyFavouritePropertyCard = ({
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
  tourId,
}: MyPropertyCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col w-full h-full p-0 ml-0">
      <div className="relative">
        <EmblaCarousel options={{}} slides={images} tourId={tourId} className="my-property-carousel" />
        <div className="absolute top-0 right-0">
          <IconButton
            aria-label="more"
            id="my-property-menu-button"
            aria-controls={open ? 'my-property-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="!text-black">
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
              options.map(({ label, Icon }) => (
                <MenuItem key={label} onClick={handleClose} className="">
                  <>
                    <Icon />
                    {label}
                  </>
                </MenuItem>
              ))}
          </Menu>
        </div>
      </div>
      <div className="pt-5 pb-7 px-7 flex flex-col h-full justify-between flex-grow">
        <div className="flex justify-between mb-2">
          <p className="text-secondary flex gap-2">
            <span className="text-battleshipGray">{`${type} -`} </span>
            <span>{rentalType}</span>
          </p>
          <h2 className="w-1/3 text-md truncate font-bold text-xl text-secondary text-right">${price}/mo</h2>
        </div>
        <h2 className="w-full truncate font-medium font-roboto tracking-wide text-xl text-textValueColor mb-4">
          {propertyName}
        </h2>

        <div className="mb-5 flex justify-between w-full items-center gap-2">
          <div className="text-davysGrey gap-2 text-base flex items-center">
            <Icon className="w-6 h-6" name="bed" />
            <p className="truncate">{bedroom} </p>
            <Icon className="w-6 h-6" name="bath" />
            <p className="truncate">{bathroom}</p>
            <Icon className="w-6 h-6" name="area" />
            <p className="truncate">{squareFeet}&nbsp;Sq Ft</p>
          </div>
          <Chip
            icon={<StatusSvg className="w-4 h-4 !text-primary path-fill-current" />}
            label={status}
            className="bg-lavender text-primary"
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          <Button variant="contained" size="large" className=" !cursor-pointer">
            <Link href={`/property-details/${id}`}>Property Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyFavouritePropertyCard
