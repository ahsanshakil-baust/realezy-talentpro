import { useGetAllPropertyQuery, useGetUserProfileDetailsQuery } from '@/store'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { Icon, MyPropertyCard } from '../shared'
import Link from 'next/link'

const ViewProfile = () => {
  const router = useRouter()
  const { profileID }: any = router.query

  const { data: properties, isLoading } = useGetAllPropertyQuery(profileID, {
    skip: !profileID,
  })

  const { data: userInfo } = useGetUserProfileDetailsQuery(profileID)
  console.log("🚀 ~ file: ViewProfile.tsx:17 ~ ViewProfile ~ userInfo:", userInfo)
  // const {progress} = useSelector((state: any) => state.entities.userProgress)
  // const isLandlord = progress?.roleType === 'landlord'
  const { data: session }: any = useSession()
  // const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)
  // const isTenant = selectedThread?.senderId === session?.user?.id
  const isTenant = properties ? false : true

  return (
    <div className=" bg-[#F1F7FF] w-[100%] h-full flex flex-col items-center">
      <div className="h-[200px] w-full relative">
        <div className={`w-full h-full ${!isTenant ? 'bg-[#034EA1] ' : 'bg-[#00ADEE]'}`} />
        <img
          className={` w-[200px] h-[200px] border-4 ${
            !isTenant ? ' border-[#034EA1]' : 'border-[#00ADEE]'
          }  left-[140px] top-[100px] rounded-full object-cover absolute`}
          src={userInfo?.profile_pic ? userInfo?.profile_pic : '/no_profile.jpg'}
          alt=""
        />
      </div>
      <div className=" bg-[#f1f7ff] w-full h-[140px]">
        <div className=" w-full h-auto flex gap-4 items-start justify-between   pt-[30px] pl-[373px] ">
          <h1 className={` text-4xl ${!isTenant ? 'text-[#034EA1]' : 'text-[#00ADEE] '} font-bold font-roboto`}>
            {userInfo?.name}
          </h1>
          <span className="flex gap-4 pr-[140px] ">
            <Link href={'/conversation'}>
            <button
              className={`cursor-pointer flex items-center gap-3  text-base md:text-lg xl:text-xl text-white  font-normal font-roboto border-none rounded-[10px] sm:px-2 sm:py-2 md:px-6 md:py-[10px] ${
                !isTenant ? 'bg-[#034EA1]' : ' bg-[#00ADEE]'
              }`}>
              <Icon
                className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] xl:w-[22px] xl:h-[22px] text-white  "
                name="chatText"
              />
              Chat
            </button>
            </Link>
            <button
              className={`flex items-center gap-3  text-base md:text-lg xl:text-xl text-white  font-normal font-roboto border-none rounded-[10px] sm:px-2 sm:py-2 md:px-6 md:py-[10px] ${
                !isTenant ? ' bg-[#034EA1]' : 'bg-[#00ADEE]'
              }`}>
              <img src="/viewprofile/New Text Document (2).svg" className="w-6 h-6" />
              Share
            </button>
          </span>
        </div>
      </div>

      <div className=" bg-[#f1f7ff] w-full h-[348px]  mb-[158px] flex items-center justify-between ">
        <div className=" pl-[140px] w-[49.5%] h-full flex flex-col">
          <h1 className="text-[#000000] text-3xl font-bold font-roboto mb-[30px]">Personal Info</h1>
          <div className=" w-full flex mb-6 ">
            <img src="/viewprofile/gender-symbols.svg" className="w-6 h-6" />
            <p className=" text-[#505050] text-xl font-normal font-roboto ml-[30px] w-[210px]">Gender</p>
            <p className=" text-[#505050] text-xl font-normal font-roboto">:</p>
            <p className="text-[#000000] text-xl font-normal font-roboto ml-[110px]">{userInfo?.gender}</p>
          </div>
          <div className=" w-full flex mb-6 ">
            <img src="/viewprofile/flag.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-xl font-normal font-roboto ml-[30px] w-[210px]">Nationality</p>
            <p className=" text-[#505050] text-xl font-normal font-roboto">:</p>
            <p className="text-[#000000] text-xl font-normal font-roboto ml-[110px]">{userInfo?.nationality}</p>
          </div>
          <div className=" w-full flex mb-6 ">
            <img src="/viewprofile/translate.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-xl font-normal font-roboto ml-[30px] w-[210px]">Race</p>
            <p className=" text-[#505050] text-xl font-normal font-roboto">:</p>
            <p className="text-[#000000] text-xl font-normal font-roboto ml-[110px]">{userInfo?.race}</p>
          </div>
          <div className=" w-full flex mb-6 ">
            <img src="/viewprofile/suitcase.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-xl font-normal font-roboto ml-[30px] w-[210px]">Occupation</p>
            <p className=" text-[#505050] text-xl font-normal font-roboto">:</p>
            <p className="text-[#000000] text-xl font-normal font-roboto ml-[110px]">{userInfo?.occupation ? userInfo?.occupation : "None" }</p>
          </div>
          <div className=" w-full flex mb-6 ">
            <img src="/viewprofile/employee.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-xl font-normal font-roboto ml-[30px] w-[210px]">Employer Name</p>
            <p className=" text-[#505050] text-xl font-normal font-roboto">:</p>
            <p className="text-[#000000] text-xl font-normal font-roboto ml-[110px]">{userInfo?.employer_name}</p>
          </div>
        </div>
        <div className=" border border-solid border-[#D4E8FF] h-[250px]" />
        <div className=" pr-[140px] w-[49.5%] flex justify-end">
          <div className=" flex flex-col w-full pl-[226px]">
            <h1 className="text-[#000000] text-3xl font-bold font-roboto mb-[30px] text-">Intro Video</h1>
            {/* <div className="w-full h-[280px] bg-[#FFFFFF] rounded-[10px]"></div> */}
            <video src={userInfo?.video_url} controls className=" rounded-xl" />
          </div>
        </div>
      </div>

      {/*  */}
      {isTenant ? null : (
        <div className="w-full bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh]">
          <h1 className="text-2xl text-textValueColor font-bold mb-7">
            {properties ? `All Properties (${properties.length})` : 'All Properties'}
          </h1>
          {isLoading ? (
            <div className="flex justify-center items-center">Loading...</div>
          ) : (
            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-7">
              {properties?.map((property: any) => (
                <MyPropertyCard
                  images={property.details.images}
                  propertyName={property.name}
                  price={property.price}
                  type={property.details.subcategory}
                  rentalType={property.rental_type}
                  bedroom={property.bedroom}
                  bathroom={property.bathroom}
                  status={property.status}
                  squareFeet={property.details.floor_size}
                  id={property.id}
                  key={property.id}
                  isApproved={property.is_approved}
                  ownershipEligibility={property.ownership_eligibility}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ViewProfile
