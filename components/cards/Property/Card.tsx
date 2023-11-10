import { Icon, ImageDisplay } from '@/components/shared'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel'
import Train from '@/public/Icon/train (1).png'
import {
  hideLoader,
  setSliderList,
  showLoader,
  useCreateWishListMutation,
  useDeleteWishListMutation,
  // useGetPropertyDetailsQuery,
  // useGetUserWishListQuery,
} from '@/store'
// import { useSession } from 'next-auth/react'
// import { postRequest } from '@/util/axios'
import React from 'react'
import { useRouter } from 'next/router'
import ChatButton from '@/components/propertyDetails/ChatButton'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
interface CustomCardProps {
  className?: string
  images?: string[]
  property: string
  price: string
  address: string
  district: string
  furnished: string
  type: string
  squareFeet: string
  // amenities: string[]
  bedroom: string
  bathroom: string
  distance: string
  mrtStation: string
  label: string
  propertyId: string
  propertyOwner: string
  wishlisted: boolean
  session: any
  landlordProfilePic: string
  landlordName: string
  tourId?: any
  bookingStatus?: string
}

const CustomCard = ({
  className,
  images,
  address,
  property,
  price,
  district,
  type,
  furnished,
  squareFeet,
  // amenities,
  bedroom,
  bathroom,
  distance,
  mrtStation,
  label,
  propertyId,
  propertyOwner,
  wishlisted,
  session = null,
  landlordProfilePic,
  landlordName,
  tourId,
  bookingStatus,
}: CustomCardProps) => {
  const router = useRouter()
  // const [currentImage, setCurrentImage] = useState(0)
  const [addWishList] = useCreateWishListMutation() // , { isError, isLoading: isWishList, data: dataWishList }
  const [removeWishList] = useDeleteWishListMutation() // , { isError: rmIsError, isLoading: rmIsLoading, data: rmData }

  // const { data: session }: any = useSession()

  const [like, setLike] = useState(wishlisted)
  // console.log('wishlisted ---->>', wishlisted)
  // console.log('likkee ---> ', like)

  useEffect(() => {
    setLike(wishlisted)
  }, [wishlisted, setLike])

  const dispatch = useDispatch()

  const handleLikeButton = async () => {
    if (like) {
      dispatch(showLoader('Removing from wishlist...'))
      const res = await removeWishList({
        user_id: parseInt(session?.user?.id),
        product_id: parseInt(propertyId),
        status: 0,
      })
      dispatch(hideLoader())
      // console.log('De Liked -----------> ', res)
    } else {
      dispatch(showLoader('Adding to wishlist...'))
      const res = await addWishList({
        user_id: parseInt(session?.user?.id),
        product_id: parseInt(propertyId),
        status: 1,
      })
      dispatch(hideLoader())
      // console.log('Liked -------> ', res)
    }
    setLike((prev: any) => !prev)
  }
  // console.log('landlord name', landlordName)
  // console.log('landlord profile pic', landlordProfilePic)

  const { pathname } = useRouter()

  return (
    <div
      className="filtered__slide"
      onClick={() => {
        if (session) {
          router.push(`/property-details/${propertyId}`)
        } else {
          toast.error('Please Login First')
        }
      }}>
      <div
        className={`rounded-[10px] cursor-pointer  ${
          pathname === '/filter' ? 'h-auto mb-0' : 'h-[470px] mb-5 '
        } md:px-4 md:py-3 hover:shadow-[0px_4px_10px_#034EA129] flex flex-col md:flex-row  md:border-2 border-solid border-[#FFFFFF] ${
          className ? className : 'bg-white'
        }`}>
        {images && (
          <div className="relative w-full md:w-[40%] ">
            <div className="absolute top-3 left-4 text-center mb-4 px-5 py-1.5 rounded z-10 bg-gradient-to-r from-white/90 to-white/20 bg-blur">
              <span className="font-bold text-xs text-[#034EA1]  ">{label}</span>
            </div>
            <button
              onClick={handleLikeButton}
              className="absolute top-3 right-4 z-10 bg-transparent p-0 cursor-pointer">
              {like ? (
                <Icon name="favoriteFill" className="w-6 h-6 text-secondary" />
              ) : (
                <Icon name="favorite" className="w-6 h-6 text-secondary" />
              )}
            </button>
            <EmblaCarousel bookingStatus={bookingStatus} options={{}} slides={images} tourId={tourId} />
          </div>
        )}

        <div className=" md:py-[10px] p-4 md:pl-7 flex flex-col flex-grow justify-between w-full md:w-[60%]">
          <div className="w-full flex justify-between gap-2">
            {session ? (
              // <Link href={`/property-details/${propertyId}`} passHref>
              <h2
                id={`${tourId == '0' && 'searchPropertyName'}`}
                className={` ${
                  bookingStatus == 'reserve' && 'opacity-50'
                } cursor-pointer  truncate font-medium font-roboto tracking-[0.4px] text-xl md:text-lg xl:text-xl text-left text-[#202020]`}>
                {property}
              </h2>
            ) : (
              // </Link>
              <h2
                onClick={() => {
                  toast.error('Please Login First')
                }}
                id={`${tourId == '0' && 'searchPropertyName'}`}
                className={` ${
                  bookingStatus == 'reserve' && 'opacity-50'
                } cursor-pointer  truncate font-medium font-roboto tracking-[0.4px] text-xl md:text-lg xl:text-xl text-left text-[#202020]`}>
                {property}
              </h2>
            )}

            <h2
              className={` ${
                bookingStatus == 'reserve' && 'opacity-50'
              } truncate font-medium font-roboto tracking-[0.4px] text-xl md:text-lg xl:text-xl text-left text-[#00ADEE] `}>
              {price}
            </h2>
          </div>
          <div className="mt-2 w-full flex justify-between gap-8 lg:gap-12 ">
            <div className={` ${bookingStatus == 'reserve' && 'opacity-50'} w-[60%] flex gap-2 items-center `}>
              <Icon
                className="w-5 h-6 font-normal font-roboto tracking-[0.32px] text-[#A1A1A1] text-xs sm:text-sm md:text-xs xl:text-base"
                name="marker"
              />
              <p className=" truncate font-normal font-roboto tracking-[0.32px] text-[#A1A1A1] text-xs sm:text-sm md:text-xs xl:text-base">
                {address}{' '}
              </p>
            </div>
            <div
              className={` ${
                bookingStatus == 'reserve' && 'opacity-50'
              } truncate w-[40%] text-xs sm:text-sm md:text-xs xl:text-base font-normal font-roboto text-right text-[#7AA1CC] `}>
              <span className="text-[#7AA1CC] 2xl:w-3.5 md:w-3 w-2.5 2xl:h-3.5 md:h-3 h-2.5 bg-[#7AA1CC] rounded-[5px] inline-block mr-[0.3125rem] "></span>

              {district.slice(0, 3)}
            </div>
          </div>
          <div
            className={` ${bookingStatus == 'reserve' && 'opacity-50'} mt-2 flex justify-between items-center gap-1 `}>
            <div className="text-common w-[60%] gap-1 2xl:gap-2 font-thin text-base flex items-center">
              <Icon
                className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[16px] md:h-[14px] xl:w-[23px] xl:h-[20px] "
                name="bed"
              />{' '}
              {bedroom}
              <Icon
                className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[16px] md:h-[14px] xl:w-[23px] xl:h-[20px]  "
                name="bath"
              />{' '}
              {bathroom}
              <Icon
                className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[16px] md:h-[14px] xl:w-[23px] xl:h-[20px]  "
                name="area"
              />{' '}
              {squareFeet} Sq Ft
            </div>
            <div className="grid grid-rows-2 w-[50%] text-[11px] leading-[16px] sm:text-sm md:text-[11px] md:leading-[16px]  xl:text-sm text-[#707070]  text-right font-roboto tracking-[0.28px] font-normal  ">
              <div className=" underline">{type}</div>
              <div className=" underline ">{furnished}</div>
            </div>
          </div>
          <div className="text-primary xs:hidden gap-1 md:gap-2 mt-2  w-full truncate lg:gap-2 font-medium flex items-center">
            <Icon
              className=" w-[14px] h-[18px] sm:w-[16px] sm:h-[20px] md:w-[16px] md:h-[18px] xl:w-[16px] xl:h-[20px] "
              name="walk"
            />
            <span className="text-[#034EA1] gap-1 text-[11px] leading-[16px] sm:text-sm md:text-[11px] md:leading-[16px] lg:text-sm  xl:text-sm  font-roboto tracking-[0.28px]  lg:gap-2 font-normal">
              {distance}
              {/* <Image src={Train} className='w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[16px] md:h-[16px] xl:w-[20px] xl:h-[20px]' alt="" /> */}
            </span>
            <Image
              src={Train}
              alt=""
              className="  w-[14px] h-[18px] sm:w-[16px] sm:h-[20px] md:w-[16px] md:h-[18px] xl:w-[16px] xl:h-[20px]"
            />
            <p className="text-[#6C2E96] text-[11px] leading-[16px] sm:text-xs md:text-[11px] md:leading-[16px] lg:text-sm  xl:text-sm text-left font-roboto tracking-[0.28px] font-normal ">
              <span className="bg-[#6C2E96] text-white text-left font-roboto text-[10] leading-3 xl:text-sm font-normal p-[0.2px]">
                NE
              </span>{' '}
              {mrtStation}
            </p>
          </div>
          <div className={` ${bookingStatus == 'reserve' && 'opacity-50'} mt-2 flex justify-end items-center`}>
            {/* <ImageDisplay
            className="text-[#034EA1] text-sm sm:text-base md:text-sm xl:text-lg text-left font-roboto font-medium tracking-[0.18px] "
            imageUrl="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=892"
            userName="Kenneth Chong"
            altText="profile"
          />

          <button className="flex gap-2 border-none rounded-lg px-6 py-[10px] sm:px-4 sm:py-2 md:px-6 md:py-[10px] bg-[#D4E8FF]">
            <Icon
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[15px] md:h-[15px] xl:w-[18px] xl:h-[18px]  "
              name="chatText"
            />
            Chat
          </button> */}
            {/* <ImageDisplay
              className="text-[#034EA1] hidden text-xs sm:text-base md:text-sm xl:text-lg text-left font-roboto font-medium tracking-[0.18px] "
              imageUrl={landlordProfilePic}
              userName={landlordName}
              altText="profile"
              activity="Property Owner"
            /> */}

            {bookingStatus != 'reserve' && (
              <ChatButton propertyId={propertyId} propertyOwner={propertyOwner} tourId={tourId} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomCard
