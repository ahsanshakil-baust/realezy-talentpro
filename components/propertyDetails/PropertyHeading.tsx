import { Icon, ImageDisplay } from '@/components/shared'
import { Button } from '@mui/material'
import ShareButton from './ShareButton'
import ChatButton from './ChatButton'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  hideLoader,
  showLoader,
  useCreateWishListMutation,
  useDeleteWishListMutation,
  useGetUserWishListQuery,
} from '@/store'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const PropertyHeading = ({ data }: any) => {
  const { propertyId }: any = useRouter().query
  const profileID = data?.user_id
  const { data: session }: any = useSession()
  const { data: wishlists } = useGetUserWishListQuery(session?.user?.id) // , isLoading, isError
  const wishlistids = wishlists?.map((ent: any) => ent.wish_product_id)
  // const wishlisted = wishlistids?.includes(id)
  const wishlisted = wishlistids?.includes(propertyId)
  const [addWishList] = useCreateWishListMutation() // , { isError: error, isLoading: isWishList, data: dataWishList }
  const [removeWishList] = useDeleteWishListMutation() // , { isError: rmIsError, isLoading: rmIsLoading, data: rmData }
  const [like, setLike] = useState(wishlisted)

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
    } else {
      dispatch(showLoader('Adding to wishlist...'))
      const res = await addWishList({
        user_id: parseInt(session?.user?.id),
        product_id: parseInt(propertyId),
        // product_id: parseInt(id),
        status: 1,
      })
      dispatch(hideLoader())
    }
    setLike((prev: any) => !prev)
  }

  return (
    <div className={`rounded-lg shadow-md flex flex-col md:flex-row bg-[#FFFFFF]`}>
      <div className="px-11 py-8 flex flex-col flex-grow">
        <div className="flex flex-row justify-between">
          <div className="flex items-center flex-wrap md:flex-nowrap gap-3 md:gap-5">
            <p className="font-bold font-roboto text-sm md:text-base bg-[#00ADEE] px-5 md:px-8 py-2 rounded-[8px] backdrop-blur-[5px] text-white">
              {data?.product_details?.subcategory}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold font-roboto text-left text-[#00ADEE]">
              {data?.product_details?.product_name}
            </h2>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl text-right font-bold font-roboto text-[#00ADEE]">
            ${data?.product_details?.price}/mo
          </h2>
        </div>

        {/* <div className=" mt-3 md:mt-4 xl:mt-5 hidden flex-col md:flex-row justify-start md:items-center gap-4 md:gap-8 xl:gap-10 ">
          <div className="text-[#034EA1]  font-normal font-roboto text-base md:text-lg xl:text-xl flex gap-2 items-center">
            <Icon className=" w-4 h-5 md:w-4 md:h-6 xl:w-5 xl:h-7" name="marker" />
            {data?.product_details?.property_address}
          </div>
          <div className="text-[#034EA1] font-normal font-roboto text-base md:text-lg xl:text-xl flex gap-2 items-center">
            <span
              className="text-[#034EA1]"
              style={{
                width: 10,
                height: 10,
                background: '#133d99',
                borderRadius: 50,
                display: 'inline-block',
                marginRight: '5px',
              }}></span>
            {data?.product_details?.property_city}
          </div>
        </div> */}
        {/* start */}
        <div className=" mt-3 md:mt-4 xl:mt-5 flex  flex-row sm:items-center justify-between md:items-end">
          <div className=" w-full flex justify-start sm:flex-wrap flex-col sm:flex-row sm:items-center gap-4 md:gap-8 xl:gap-10">
            <div className="text-[#034EA1]  font-normal font-roboto text-base md:text-lg xl:text-xl flex gap-2 items-center">
              <Icon className=" w-4 h-5 md:w-4 md:h-6 xl:w-5 xl:h-7" name="marker" />
              {data?.product_details?.property_address}
            </div>
            <div className="text-[#034EA1] font-normal font-roboto text-base md:text-lg xl:text-xl flex gap-2 items-center">
              <span
                className="text-[#034EA1]"
                style={{
                  width: 10,
                  height: 10,
                  background: '#133d99',
                  borderRadius: 50,
                  display: 'inline-block',
                  marginRight: '5px',
                }}></span>
              District {data?.product_details?.property_city.slice(1, 3)}
            </div>
          </div>

          <div className=" hidden md:gap-3 xl:gap-5 md:flex justify-center mt-4 lg:mt-0">
            {session && session.user.id !== data?.user_id && (
              <Button
                onClick={handleLikeButton}
                className=" !bg-[#F1F7FF] gap-x-1 !border-2 !border-solid !border-[#00ADEE] !rounded-[10px]"
                variant="outlined">
                {like ? (
                  <Icon name="favoriteFill" className="w-6 h-6 text-secondary" />
                ) : (
                  <Icon name="favorite" className="w-6 h-6 text-secondary" />
                )}
                Favourite
              </Button>
            )}

            {/* <Button className=" bg-[#F1F7FF] border-2 border-solid border-[#00ADEE] rounded-[10px]" variant="outlined">
              <Icon className="  w-5 h-4 lg:w-6 lg:h-5 mr-2 text-[#00ADEE]" name="share" /> Share
            </Button> */}
            <div>
              <ShareButton />
            </div>
          </div>
        </div>
        <div className="mt-3 md:mt-4 xl:mt-5 flex flex-row gap-4 items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
            <div className="text-[#A1A1A1] gap-1 md:gap-2 font-thin text-base md:text-lg xl:text-xl flex items-center">
              <Icon className=" w-[16px] h-[20px] md:w-[20px] md:h-[25px] xl:w-[25px] xl:h-[29px]" name="bed" />{' '}
              {data?.product_details?.bedroom}
              <Icon className=" w-[16px] h-[20px] md:w-[20px] md:h-[25px] xl:w-[25px] xl:h-[29px]" name="bath" />{' '}
              {data?.product_details?.bathroom}
              <Icon className=" w-[16px] h-[20px] md:w-[20px] md:h-[25px] xl:w-[25px] xl:h-[29px]" name="area" />{' '}
              {data?.product_details?.floor_size}SqFt
            </div>
            <div className="flex flex-wrap gap-2 md:gap-[10px] ">
              <span className="text-[#6495CC] font-[300] font-roboto text-base md:text-lg xl:text-xl underline whitespace-nowrap">
                {data?.product_details?.rental_type}
              </span>
              <span className="text-[#6495CC] font-[300] font-roboto text-base md:text-lg xl:text-xl underline whitespace-nowrap">
                {data?.product_details?.furnishing}
              </span>
              <span className="text-[#6495CC] font-[300] font-roboto text-base md:text-lg xl:text-xl underline whitespace-nowrap">
                {data?.product_details?.facing}
              </span>
            </div>
          </div>

          {/* {session && session.user.id !== data?.user_id && ( */}
          <div className=" hidden md:flex justify-center items-center gap-2 sm:gap-3 md:gap-[70px] xl:gap-[90px]">
            {/* <Link href={`/viewprofile/${data?.user_id}`} passHref> */}
            {/* <div>
              <ImageDisplay
                className="text-[#034EA1]  text-sm md:text-base xl:text-lg text-left font-roboto font-medium tracking-[0.18px] "
                imageUrl={data?.landlord_profile_pic}
                userName={data?.landlord_name}
                altText="profile"
                activity="Property Owner"
              />
            </div> */}
            {/* </Link> */}
            {data?.booking_status != 'reserve' && <ChatButton propertyId={propertyId} propertyOwner={data?.user_id} />}
          </div>
          {/* )} */}
        </div>
        {/* end */}
        <div className=" mt-3 md:mt-4 xl:mt-5 hidden flex-wrap lg:flex-nowrap flex-row sm:items-center justify-between md:items-end ">
          <div className=" w-full flex justify-start sm:flex-wrap flex-col sm:flex-row sm:items-center gap-4 md:gap-8 xl:gap-10">
            <div className="text-[#A1A1A1] gap-1 md:gap-2 font-thin text-base md:text-lg xl:text-xl flex items-center">
              <Icon className=" w-[16px] h-[20px] md:w-[20px] md:h-[25px] xl:w-[25px] xl:h-[29px]" name="bed" />{' '}
              {data?.product_details?.bedroom}
              <Icon className=" w-[16px] h-[20px] md:w-[20px] md:h-[25px] xl:w-[25px] xl:h-[29px]" name="bath" />{' '}
              {data?.product_details?.bathroom}
              <Icon className=" w-[16px] h-[20px] md:w-[20px] md:h-[25px] xl:w-[25px] xl:h-[29px]" name="area" />{' '}
              {data?.product_details?.floor_size}SqFt
            </div>
            <div className="flex flex-wrap gap-2 md:gap-[10px] ">
              <span className="text-[#6495CC] font-[300] font-roboto text-base md:text-lg xl:text-xl underline whitespace-nowrap">
                {data?.product_details?.rental_type}
              </span>
              <span className="text-[#6495CC] font-[300] font-roboto text-base md:text-lg xl:text-xl underline whitespace-nowrap">
                {data?.product_details?.furnishing}
              </span>
              <span className="text-[#6495CC] font-[300] font-roboto text-base md:text-lg xl:text-xl underline whitespace-nowrap">
                {data?.product_details?.facing}
              </span>
            </div>
          </div>
          <div className=" hidden md:gap-3 xl:gap-5 md:flex justify-center mt-4 lg:mt-0">
            <Button
              onClick={handleLikeButton}
              className=" !bg-[#F1F7FF] gap-x-1 !border-2 !border-solid !border-[#00ADEE] !rounded-[10px]"
              variant="outlined">
              {like ? (
                <Icon name="favoriteFill" className="w-6 h-6 text-secondary" />
              ) : (
                <Icon name="favorite" className="w-6 h-6 text-secondary" />
              )}
              Favourite
            </Button>
            {/* <Button className=" bg-[#F1F7FF] border-2 border-solid border-[#00ADEE] rounded-[10px]" variant="outlined">
              <Icon className="  w-5 h-4 lg:w-6 lg:h-5 mr-2 text-[#00ADEE]" name="share" /> Share
            </Button> */}
            <div>
              <ShareButton />
            </div>
          </div>
        </div>

        {/* <div className="mt-3 md:mt-4 xl:mt-5 flex flex-row gap-4 items-center justify-between md:hidden">
          <div className="hidden flex-row gap-4 items-center">
            <div className=" gap-1 md:gap-2 lg:gap-3  flex md:flex-wrap items-center"></div>
            <div className=" gap-1 md:gap-2 lg:gap-3  flex md:flex-wrap items-center">
              <Icon className="text-[#7B6363] w-5 h-5 md:w-[20px] md:h-[22px]" name="walk" />
              <span className="text-[#7B6363] md:gap-2 font-normal font-roboto text-sm md:text-xl flex items-center">
                8 mins (480m) to
              </span>
              <span className="text-[#7B6363] gap-2 font-normal font-roboto text-sm md:text-xl flex items-center">
                <span className="bg-[#7B6363] font-normal font-roboto text-sm text-white  p-0.5">NE</span> 8 Farrer Park
                MRT
              </span>
            </div>
          </div>
          <div className="mt-2 flex md:flex-row md:flex-wrap justify-around lg:justify-between items-center w-full md:w-1/4">
            <ImageDisplay
              className="text-primary text-[10px] lg:font-medium md:mr-4"
              imageUrl="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=892"
              userName={data?.landlord_name}
              altText="profile"
              activity="Property Owner"
            />
            <button className="flex px-4 py-2 items-center gap-2 rounded-md md:px-8 md:py-2 lg:px-6 lg:py-2 bg-primary text-white mt-3 ">
              <Icon className="sm:w-3 sm:h-3 lg:w-[20px] lg:h-[22px]" name="chatText" />
              Chat
            </button>
          </div>

          <div className=" hidden sm:flex justify-center items-center gap-2 sm:gap-3 md:gap-[70px] xl:gap-[90px]">
            {/* <Link href={`/viewprofile/${data?.user_id}`} passHref>
            <div>
              <ImageDisplay
                className="!text-[#034EA1]  !text-sm md:!text-base xl:!text-lg !text-left !font-roboto !font-medium !tracking-[0.18px] "
                imageUrl={data?.landlord_profile_pic}
                userName={data?.landlord_name}
                altText="profile"
                activity="Property Owner"
              />
            </div>
            {/* </Link> 

            <ChatButton propertyId={propertyId} propertyOwner={data?.user_id} />
          </div>
        </div> */}
        <div className=" mt-3 w-full gap-3 sm:gap-5 flex  md:hidden">
          <Button
            className=" !bg-[#F1F7FF] !border-2 !border-solid !border-[#00ADEE] !rounded-[10px]"
            variant="outlined">
            <Icon className=" !w-5 !h-4 lg:!w-6 lg:!h-5 !mr-2 !text-[#00ADEE]" name="favoriteFill" /> Favourite
          </Button>
          <Button
            className=" !bg-[#F1F7FF] !border-2 !border-solid !border-[#00ADEE] !rounded-[10px]"
            variant="outlined">
            <Icon className="  !w-5 !h-4 lg:!w-6 lg:!h-5 !mr-2 !text-[#00ADEE]" name="share" /> Share
          </Button>
        </div>
        <div className=" mt-3 md:hidden w-full flex justify-between gap-3 sm:gap-[20px] md:gap-[70px] xl:gap-[90px]">
          <Link href={`/viewprofile/${profileID}`} passHref>
            <div>
              <ImageDisplay
                className="!text-[#034EA1] !text-xs sm:!text-base md:!text-sm xl:!text-lg !text-left !font-roboto !font-medium !tracking-[0.18px] "
                imageUrl={data?.landlord_profile_pic}
                userName={data?.landlord_name}
                altText="profile"
                activity="Property Owner"
              />
            </div>
          </Link>

          {data?.booking_status != 'reserve' && <ChatButton propertyId={propertyId} propertyOwner={data?.user_id} />}
        </div>
      </div>
    </div>
  )
}

export default PropertyHeading
