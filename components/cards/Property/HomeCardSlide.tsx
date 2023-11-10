import { Icon } from '@/components/shared'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import EmblaCarousel from '../EmblaCarousel/EmblaCarousel'
// import Train from '@/public/Icon/train.png'
import Link from 'next/link'
import {
  hideLoader,
  hideModal,
  showLoader,
  showModal,
  useCreateWishListMutation,
  useDeleteWishListMutation,
  useGetUserWishListQuery,
} from '@/store'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { StoreThunkDispatch } from '@/types'
import logoXl from '@/public/Logo@2x.png'
import AuthButton from '@/components/buttons/auth/AuthButton'

interface CustomCardProps {
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
  bookingStatus: string
  index: number
  totalCardShow: number
}

const HomeCustomCard = ({
  images,
  address,
  property,
  price,
  district,
  type,
  furnished,
  squareFeet,
  amenities,
  distance,
  mrtStation,
  label,
  id,
  tourId,
  bookingStatus,
  index,
  totalCardShow,
}: CustomCardProps) => {
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

  const { data: session }: any = useSession()
  const router = useRouter()

  const { data: wishlists, isLoading, isError } = useGetUserWishListQuery(session?.user?.id)
  const wishlistids = wishlists?.map((ent: any) => ent.wish_product_id)
  const wishlisted = wishlistids?.includes(id)

  const [addWishList] = useCreateWishListMutation() // , { isError: error, isLoading: isWishList, data: dataWishList }
  const [removeWishList] = useDeleteWishListMutation() // , { isError: rmIsError, isLoading: rmIsLoading, data: rmData }

  const [like, setLike] = useState(wishlisted)
  // console.log('wishlisted ---->>', wishlisted)
  // console.log('likkee ---> ', like)

  useEffect(() => {
    setLike(wishlisted)
  }, [wishlisted, setLike])

  const dispatch = useDispatch<StoreThunkDispatch>()

  const handleLikeButton = async () => {
    if (!session) {
      toast.error('Please login to add to wishlist')
      return false
    }

    if (like) {
      dispatch(showLoader('Removing from wishlist...'))
      const res = await removeWishList({
        user_id: parseInt(session?.user?.id),
        // product_id: parseInt(propertyId),
        product_id: parseInt(id),
        status: 0,
      })
      dispatch(hideLoader())
    } else {
      dispatch(showLoader('Adding to wishlist...'))
      const res = await addWishList({
        user_id: parseInt(session?.user?.id),
        // product_id: parseInt(propertyId),
        product_id: parseInt(id),
        status: 1,
      })
      dispatch(hideLoader())
    }
    setLike((prev: any) => !prev)
  }

  return (
    <>
      <div className="relative w-full h-[410px] ">
        <div className="absolute top-[18px] left-[18px] flex items-center justify-center px-5 pt-[6.5px] pb-[5px] text-center  rounded z-10 bg-gradient-to-r from-white from-0% to-100% to-[#FFFFFF33] bg-blur">
          <span className="font-bold font-roboto text-[11px] text-[#034EA1] capitalize">{label}</span>
        </div>
        <div onClick={handleLikeButton} className="absolute z-40 top-5 right-5  bg-transparent p-0 cursor-pointer">
          {like ? (
            <Icon name="favoriteFill" className="w-6 h-6 text-secondary" />
          ) : (
            <Icon name="favorite" className="w-6 h-6 text-secondary" />
          )}
        </div>
        <div
          onClick={() => {
            if (session) {
              router.push(`/property-details/${id}`)
            } else {
              toast.error('Please Login First')
              // dispatch(showModal({
              //   name: "Login_Required",
              //   open: true,
              //   children: <div className="">
              //   <div className="mt-10 z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px]  pb-1 md:pb-[7.5px] 2xl:pb-[14px] ">
              //     <div className="relative">
              //       {/* <img src="./usertypeselect.svg" alt="no-image" /> */}
              //       <Image
              //         width={288}
              //         height={102}
              //         src={logoXl}
              //         // className="w-[288.09px] mb-3"
              //         // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
              //         alt=""
              //       />
              //     </div>
              //     <h2 className="font-bold text-5xl mb-1 lg:mb-2 mt-6 text-center capitalize font-roboto  text-[#00ADEE] ">
              //       Welcome!
              //     </h2>
              //     <p className=" text-[#00ADEE] mb-3 lg:mb-4 xl:mb-5 2xl:mb-2 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]">
              //       Thanks for choosing RealEzy
              //     </p>
              //     <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-base text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
              //       Please Login for access and roaming website
              //     </p>
              //   </div>
              //   <div className="flex justify-center items-center gap-5 mb-5">
              //     <button
              //       onClick={() => dispatch(hideModal('Login_Required'))}
              //       className="!outline-none focus:outline-none h-[50px] !cursor-pointer  !shadow-[0px_2px_6px_#0000000D] !backdrop-blur-[10px] !px-[10px] lg:!px-5 xl:!px-9  !text-sm lg:!text-lg xl:!text-xl !bg-[#00ADEE] !font-normal !font-roboto !capitalize !rounded-[10px] !text-[#FFFFFF]">
              //       Later
              //     </button>
              //     <button
              //       onClick={() => dispatch(hideModal('Login_Required'))}
              //       className="!outline-none focus:outline-none h-[50px] !cursor-pointer  !shadow-[0px_2px_6px_#0000000D] !backdrop-blur-[10px] !px-[10px] lg:!px-5 xl:!px-9  !text-sm lg:!text-lg xl:!text-xl !bg-[#00ADEE] !font-normal !font-roboto !capitalize !rounded-[10px] !text-[#FFFFFF]">
              //       Log In
              //     </button>
              //     {/* <button
              //       // onClick={() => hanleUpdateUserType('landlord')}
              //       className="bg-[#034EA1] px-10 py-3 text-base rounded-md tracking-wider text-white cursor-pointer">
              //       Login
              //     </button> */}
              //   </div>
              // </div>
              // }))
            }
          }}>
          <div
            className={` ${
              index !== totalCardShow - 1 ? 'cardHover' : ''
            } bg-white absolute left-0 top-0 rounded-[10px] cursor-pointer shadow-[0px_4px_20px_#034EA100]  hover:shadow-[0px_4px_16px_#034EA13D] flex flex-col  w-full h-full border border-solid border-[#F2F2F2]  p-0 ml-0 `}>
            <Link href="/filter">
              <div
                className={
                  index === totalCardShow - 1
                    ? ' z-30  w-full h-full absolute bg-[#000000CC] rounded-[10px]  m-auto flex flex-col gap-[1.25rem] md:gap-[1.6rem] 2xl:gap-8 items-center justify-center'
                    : 'hidden'
                }>
                <Image
                  src="/download/left(1).svg"
                  className="text-white bg-transparent rotate-180  cursor-pointer"
                  width={60}
                  height={60}
                />
                <h1 className="text-[#FFFFFF] 2xl:text-[2rem]/[2.375rem] md:text-[1.6rem]/[1.9rem] text-[1.25rem]/[1.5rem] font-medium font-roboto">
                  See More
                </h1>
              </div>
            </Link>

            <div className="relative w-full">
              {/* <ImageSlider images={images} /> */}
              <EmblaCarousel bookingStatus={bookingStatus} options={{}} slides={images} tourId={tourId} />
            </div>
            <div className="2xl:p-5 md:p-4 p-[0.8rem] flex flex-col h-full justify-between flex-grow">
              <div className="flex">
                <h2
                  className={` ${
                    bookingStatus == 'reserve' && 'opacity-50'
                  } truncate font-medium font-roboto tracking-[0.2px] text-base/[1.125rem] md:text-[1rem]/[1.25rem] 2xl:text-[1.25rem]/[1.5rem] text-left text-[#202020] `}>
                  {property && property}
                </h2>
                {/* {price && <h2 className="text-md font-medium text-lg text-secondary">{price}</h2>} */}
              </div>
              <div className="mt-1.5 md:mt-2 2xl:mt-3.5 w-full flex justify-between gap-4 ">
                <div className=" w-[75%] flex gap-2 items-center">
                  <img
                    src="/download/marker.svg"
                    alt="marker"
                    className={` ${bookingStatus == 'reserve' && 'opacity-50'} 2xl:w-3.5 w-2.5 2xl:h-[1.125rem] h-4 `}
                  />
                  <p
                    className={` ${
                      bookingStatus == 'reserve' && 'opacity-50'
                    } truncate font-medium font-roboto tracking-[0.32px] text-[#505050] text-xs sm:text-sm md:text-sm/[1rem] 2xl:text-base/[1.1875rem] `}>
                    {address && address}
                  </p>
                </div>
                <div
                  className={` ${
                    bookingStatus == 'reserve' && 'opacity-50'
                  }  flex-grow text-xs sm:text-sm md:text-sm/[1rem] 2xl:text-base/[1.1875rem] font-normal font-roboto text-right text-[#7AA1CC] `}>
                  <span className="text-[#7AA1CC] 2xl:w-3.5 w-2.5 2xl:h-3.5 h-2.5 bg-[#7AA1CC] rounded-[5px] inline-block mr-[0.3125rem] "></span>
                  {district.slice(0, 3)}
                </div>
              </div>
              <div className="mt-3 md:mt-4 2xl:mt-5 flex justify-between w-full items-center gap-2">
                {amenities && (
                  <div
                    className={` ${
                      bookingStatus == 'reserve' && 'opacity-50'
                    } text-common  w-[75%] space-x-1 2xl:space-x-2 font-thin text-base/[1.125rem] 2xl:text-[1.125rem]/[1.375rem] flex items-center justify-start `}>
                    {/* <div className="text-common  gap-2 font-thin text-base flex items-center"> */}
                    <img
                      className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                      src="/download/bed.svg"
                    />
                    <p className=" truncate">{amenities[0]} </p>
                    <img
                      className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                      src="/download/bath.svg"
                    />
                    <p className=" truncate">{amenities[1]}</p>
                    <img
                      className=" w-[18px] h-[16px] sm:w-[20px] sm:h-[18px] md:w-[1.05rem] md:h-[0.95rem] 2xl:w-[1.3125rem] 2xl:h-[1.1875rem] "
                      src="/download/area.svg"
                    />
                    <p className=" truncate">
                      {squareFeet} <span className="">Sq Ft</span>
                    </p>
                    {/* </div> */}
                  </div>
                )}
                <div
                  className={` ${
                    bookingStatus == 'reserve' && 'opacity-50'
                  } flex-grow  pl-1  flex gap-2 justify-end  text-[11px] leading-[16px] sm:text-sm md:text-[11px] md:leading-[16px]  xl:text-sm text-[#034EA1]  text-right font-roboto tracking-[0.28px] font-normal  `}>
                  <span className=" truncate ">{type}</span>
                  <span className=" truncate hidden  ">{furnished}</span>
                </div>
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
                <div
                  className={` ${
                    bookingStatus == 'reserve' && 'opacity-50'
                  } mt-3 md:mt-4 xl:mt-6 flex justify-between items-center `}>
                  {/* <ImageDisplay
            className="text-primary font-medium"
            imageUrl="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=892"
            userName="Kenneth Chong"
            altText="profile"
          /> */}
                  <div className=" truncate w-[50%] gap-1 2xl:gap-2  flex justify-start">
                    <h2 className="text-md truncate font-medium text-base/[1.25rem] md:text-[1.2rem]/[1.5rem] 2xl:text-[1.5rem]/[1.875rem] text-secondary">
                      ${parseInt(price)}/mo
                    </h2>
                  </div>
                  <div className="hidden">
                    <div className="truncate w-[50%] gap-1 2xl:gap-2 flex justify-end">
                      <Link href={`/property-details/${id}`} passHref>
                        <button
                          // onClick={()=>}
                          disabled={!session}
                          className="flex gap-2 border border-[#00adee] text-[#00adee] text-xs  md:text-sm  rounded-lg px-1 sm:px-3 md:px-3 lg:px-5 xl:px-6 py-2 bg-white hover:bg-[#00ADEE] hover:text-white cursor-pointer">
                          See details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeCustomCard
