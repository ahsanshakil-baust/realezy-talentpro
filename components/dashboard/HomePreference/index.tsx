import { StoreState } from '@/types'
import { isTenant } from '@/util'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Edit from './images/edit.png'
import Add from './images/Add.png'
import DetailsOfHomePreference from './HomePreference'
import CreateHomePreference from './CreateHomePreference'

import { useGetHomePreferenceDetailsQuery } from '@/store'
import { useSession } from 'next-auth/react'

const HomePreference = () => {
  const { data: session, update }: any = useSession()
  const { type } = useSelector((state: StoreState) => state.entities.user)
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(true)
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>()
  const [forceTrigger, setForceTrigger] = useState(false)

  const {
    data: homePreference,
    refetch: refetchHomePreference,
    isLoading,
  } = useGetHomePreferenceDetailsQuery(session?.user?.id)

  console.log('homePreference', session?.user)

  useEffect(() => {
    setIsEditable(homePreference?.is_edit_able != undefined ? homePreference?.is_edit_able : true)
    setIsProfileComplete(session?.user?.userInfo?.isOfferable != undefined && session?.user?.userInfo?.isOfferable)
  }, [homePreference])

  const handleEdit = () => {
    if (session?.user?.userInfo?.isOfferable == true) {
      setIsProfileComplete(true)
      setIsEditEnabled(true)
      // if (session?.user?.userInfo?.video_url) {
      //   setIsProfileComplete(true)
      //   setIsEditEnabled(true)
      // } else if (session?.user?.userInfo?.video_url == ' ' || session?.user?.userInfo?.video_url == undefined) {

      // }
    } else if (session?.user?.userInfo?.isOfferable != undefined) {
      setIsProfileComplete(false)
      setForceTrigger(prevState => !prevState) // Toggle forceTrigger value
    }
  }

  return (
    <>
      <div className="p-5 md:p-9">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <svg
              className={` w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10  ${
                isTenant(type) ? 'fill-[#00ADEE] ' : 'fill-[#034EA1]'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="24"
              viewBox="0 0 26 24">
              <g id="search-homepage" transform="translate(-0.001 -14.8)">
                <g id="Group_35053" data-name="Group 35053" transform="translate(0.001 14.8)">
                  <path
                    id="Path_23718"
                    data-name="Path 23718"
                    d="M23.911,29.2H22.325v6.57l-4.476-4.429a5.477,5.477,0,0,0-.867-6.64,5.623,5.623,0,0,0-7.867,0,5.457,5.457,0,0,0,0,7.819,5.624,5.624,0,0,0,6.711.858l5.231,5.176a2.543,2.543,0,0,1-1.044.251H6.049A2.33,2.33,0,0,1,3.7,36.478V29.23H2.151A2.131,2.131,0,0,1,.742,25.478l9.382-9.465a4.047,4.047,0,0,1,5.779,0l2.129,2.141V16.3a1.485,1.485,0,0,1,1.516-1.465h1.262A1.455,1.455,0,0,1,22.29,16.3v6.214l2.96,3A2.081,2.081,0,0,1,23.911,29.2ZM11.067,26.7a2.639,2.639,0,0,0,0,3.752,2.7,2.7,0,0,0,3.792,0,2.639,2.639,0,0,0,0-3.752,2.675,2.675,0,0,0-3.792,0Z"
                    transform="translate(-0.001 -14.8)"
                    // fill="#505050"
                  />
                </g>
              </g>
            </svg>
            {/* <Image src={Home_Preference} alt="" /> */}
            <h2 className=" text-[20px] leading-4 md:text-[24px] md:leading-5 xl:text-[28px] xl:leading-6 font-medium font-roboto text-[#00ADEE]">
              Home Preference.
            </h2>
          </div>
          <div>
            <button
              disabled={
                session?.user?.userInfo?.isOfferable ? (isEditable ? (isEditEnabled ? true : false) : true) : false
              }
              type="button"
              className={` px-2 md:px-3 xl:px-5 py-2 md:py-3 xl:py-4 rounded-[10px]  text-[#FFFFFF] capitalize font-roboto font-normal text-base lg:text-lg xl:text-22 flex items-center gap-2 ${
                isEditable ? (isEditEnabled ? 'bg-[#D1D1D1]' : 'bg-[#00ADEE] cursor-pointer') : 'bg-[#D1D1D1]'
              }`}
              onClick={handleEdit}>
              <Image src={homePreference ? Edit : Add} height={24} width={24} alt="" />
              {homePreference ? 'Edit' : 'Add'}
            </button>
          </div>
        </div>

        {/* HomePreference */}
        {isEditEnabled ? (
          <CreateHomePreference
            isEditEnabled={setIsEditEnabled}
            homePreference={homePreference}
            refetchHomePreference={refetchHomePreference}
            isLoading={isLoading}
          />
        ) : (
          <DetailsOfHomePreference
            homePreference={homePreference}
            isProfileComplete={isProfileComplete}
            forceTrigger={forceTrigger}
          />
        )}
      </div>
    </>
  )
}

export default HomePreference
