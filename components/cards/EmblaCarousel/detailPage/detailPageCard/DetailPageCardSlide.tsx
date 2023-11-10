import { Icon } from '@/components/shared'
// import Image from 'next/image'
import { useState } from 'react'
import EmblaCarousel from '../../EmblaCarousel'
// import Train from '@/public/Icon/train.png'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

interface CustomDetailCardProps {
  images: string[]
  property: string
  price: string
  address: string
  district: string
  furnished: string
  type: string
  squareFeet: string
  amenities: string[]
  distance: string
  mrtStation: string
  label: string
  id: string
  tourId?: any
}

const DetailCustomCard = ({
  images,
  address,
  property,
  price,
  district,
  type,
  furnished,
  squareFeet,
  amenities,
  // distance,
  // mrtStation,
  label,
  id,
  tourId,
}: CustomDetailCardProps) => {
  // const [currentImage, setCurrentImage] = useState(0)

  // const handleNextImage = () => {
  //   if (currentImage === images.length - 1) {
  //     setCurrentImage(0)
  //   } else {
  //     setCurrentImage(currentImage + 1)
  //   }
  // }

  // const handlePrevImage = () => {
  //   if (currentImage === 0) {
  //     setCurrentImage(images.length - 1)
  //   } else {
  //     setCurrentImage(currentImage - 1)
  //   }
  // }
  const { data: session } = useSession()

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col mb-5 w-full p-0 ml-0">
      <div className="relative w-full">
        <div className="absolute top-3 left-4 text-center mb-4 px-5 py-1.5 rounded z-10 bg-gradient-to-r from-white/90 to-white/20 bg-blur">
          <span className="font-bold text-xs text-[#034EA1]">{label}</span>
        </div>
        <button className="absolute top-3 right-4 z-10 bg-transparent p-0 cursor-pointer">
          <Icon name="favorite" className="w-6 h-6 text-secondary" />
        </button>
        {/* <ImageSlider images={images} /> */}
        <EmblaCarousel options={{}} slides={images}  tourId={tourId}/>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex">
          {property && <h2 className="text-md font-medium text-lg text-black">{property}</h2>}
          {/* {price && <h2 className="text-md font-medium text-lg text-secondary">{price}</h2>} */}
        </div>
        <div className="mt-2 flex justify-between ">
          {address && (
            <div className="text-[#00adee] font-thin text-base mb-4 flex gap-2 items-center">
              <Icon className="w-4 h-4" name="marker" />
              {address}
            </div>
          )}
          {district && (
            <div className="text-sm font-thin text-district mb-4">
              <span
                className="text-district"
                style={{
                  width: 10,
                  height: 10,
                  background: '#133d99',
                  borderRadius: 50,
                  display: 'inline-block',
                  marginRight: '5px',
                }}></span>
              {district}
            </div>
          )}
        </div>
        <div className=" flex justify-between items-center mb-4">
          {amenities && (
            <div className="text-common gap-2 font-thin text-base flex items-center">
              <Icon className="w-[20px] h-[22px] " name="bed" /> {amenities[0]}
              <Icon className="w-[20px] h-[22px] " name="bath" /> {amenities[1]}
              <Icon className="w-[20px] h-[22px] " name="area" /> {squareFeet} Sq Ft
            </div>
          )}
          {furnished && (
            <div className="text-[12px] text-[#7A7A7A] font-thin text-xs">
              <span className="mr-2">{type}</span>
              <span>{furnished}</span>
            </div>
          )}
        </div>
        {/* <div className="text-primary gap-2 font-medium flex items-center mb-4 ">
          <Icon className="w-[20px] h-[22px]" name="walk" />
          {distance && (
            <span className="text-primary gap-2 font-medium flex items-center">
              {distance}
              <Image src={Train} alt="" />
            </span>
          )}
          {mrtStation && (
            <span className="text-mrtStation gap-2 font-medium">
              <span className="bg-mrtStation text-white font-thin px-1">NE</span> {mrtStation}
            </span>
          )}
        </div> */}
        {price && (
          <div className="mt-2 flex justify-between items-center">
            {/* <ImageDisplay
            className="text-primary font-medium"
            imageUrl="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=892"
            userName="Kenneth Chong"
            altText="profile"
          /> */}

            <h2 className="text-md font-medium text-[20px] text-secondary">${price}/mo</h2>

            {session ? <button className="flex gap-2 border border-[#00adee] text-[#00adee] text-sm tracking-[0.28px] rounded-lg px-6 py-2 bg-white hover:bg-[#00ADEE] hover:text-white cursor-pointer">
              <Link href={`/property-details/${id}`}>See details</Link>
            </button> :
              <button onClick={()=> toast.error("Please Login First")} className="flex gap-2 border border-[#00adee] text-[#00adee] text-sm tracking-[0.28px] rounded-lg px-6 py-2 bg-white hover:bg-[#00ADEE] hover:text-white cursor-pointer">
              See details
            </button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailCustomCard
