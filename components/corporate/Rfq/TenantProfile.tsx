import { useGetAllPropertyQuery, useGetUserProfileDetailsQuery } from '@/store'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ImagePro from 'public/image_p.jpeg'

import React from 'react'

const TenantProfile = ({ userInfo }: any) => {
  const router = useRouter()
  const { profileID }: any = router.query

  const { data: properties, isLoading } = useGetAllPropertyQuery(profileID, {
    skip: !profileID,
  })

  //   const { data: userInfo, isLoading: userInfoLoading } = useGetUserProfileDetailsQuery(profileID)
  //   console.log('🚀 ~ file: ViewProfile.tsx:17 ~ ViewProfile ~ userInfo:', userInfo)
  // const {progress} = useSelector((state: any) => state.entities.userProgress)
  // const isLandlord = progress?.roleType === 'landlord'
  const { data: session }: any = useSession()
  // const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)
  // const isTenant = selectedThread?.senderId === session?.user?.id
  const isTenant = properties ? false : true

  return (
    <div className=" bg-[#F1F7FF] w-[100%] h-full flex flex-col items-center">
      <div className=" bg-[#f1f7ff] w-full h-[348px]  mb-[158px] flex items-center justify-between ">
        <div className="w-[49.5%] h-full flex flex-col">
          <h1 className="text-[#000000] text-xl font-semibold mb-4">Personal Info</h1>
          <div className="flex items-center gap-3 mb-3">
            <div>
              <img
                className="!rounded-full w-[60px] h-[60px]"
                src={userInfo?.profile_pic}
                alt="image-pro"
              />
            </div>
            <div>
              <p className="text-base">{userInfo?.name}</p>
            </div>
          </div>
          <div className=" w-full flex mb-4 ml-3 ">
            <img alt="" src="/viewprofile/gender-symbols.svg" className="w-6 h-6" />
            <p className="text-[#505050] text-lg font-normal font-roboto ml-[30px] w-[210px]">Gender</p>
            <p className="text-[#505050] text-lg font-normal font-roboto">:</p>
            <p className="text-[#000000] text-lg font-normal font-roboto ml-[110px]">{userInfo?.gender}</p>
          </div>
          <div className=" w-full flex mb-4 ml-3 ">
            <img alt="" src="/viewprofile/flag.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-lg font-normal font-roboto ml-[30px] w-[210px]">Nationality</p>
            <p className=" text-[#505050] text-lg font-normal font-roboto">:</p>
            <p className="text-[#000000] text-lg font-normal font-roboto ml-[110px]">{userInfo?.nationality}</p>
          </div>
          <div className=" w-full flex mb-4 ml-3 ">
            <img alt="" src="/viewprofile/translate.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-lg font-normal font-roboto ml-[30px] w-[210px]">Race</p>
            <p className=" text-[#505050] text-lg font-normal font-roboto">:</p>
            <p className="text-[#000000] text-lg font-normal font-roboto ml-[110px]">{userInfo?.race}</p>
          </div>
          <div className=" w-full flex mb-4 ml-3 ">
            <img alt="" src="/viewprofile/suitcase.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-lg font-normal font-roboto ml-[30px] w-[210px]">Occupation</p>
            <p className=" text-[#505050] text-lg font-normal font-roboto">:</p>
            <p className="text-[#000000] text-lg font-normal font-roboto ml-[110px]">
              {userInfo?.occupation ? userInfo?.occupation : 'None'}
            </p>
          </div>
          <div className=" w-full flex mb-4 ml-3 ">
            <img alt="" src="/viewprofile/employee.svg" className="w-6 h-6" />

            <p className=" text-[#505050] text-lg font-normal font-roboto ml-[30px] w-[210px]">Employer Name</p>
            <p className=" text-[#505050] text-lg font-normal font-roboto">:</p>
            <p className="text-[#000000] text-lg font-normal font-roboto ml-[110px]">{userInfo?.employer_name}</p>
          </div>
        </div>
        <div className=" border border-solid border-[#D4E8FF] h-[250px]" />
        <div className="w-[548px]">
          <div className=" flex flex-col w-full">
            <h1 className="text-[#000000] text-xl font-semibold mb-4">Intro Video</h1>
            {/* <div className="w-full h-[280px] bg-[#FFFFFF] rounded-[10px]"></div> */}
            <video src={userInfo?.video_url} controls className=" rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TenantProfile
