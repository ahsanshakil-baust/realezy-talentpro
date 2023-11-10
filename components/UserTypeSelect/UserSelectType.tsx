import { hideModal, useUpdateUserProfileMutation } from '@/store' // hideModal, showModal,
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { authLogo, logo } from '@/util/helper'
import Image from 'next/image'
import logoXl from '@/public/Logo@2x.png'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'
import { useCookies } from 'react-cookie'


const UserSelectType = ({ userId }: any) => {
  const [cookies, setCookie, removeCookie] = useCookies(['stateOfTour'])
  const { data: session, update }: any = useSession()
  const router = useRouter()
  const dispatch = useDispatch<StoreThunkDispatch>()

  const [updateUserInfo] = useUpdateUserProfileMutation()

  const hanleUpdateUserType = async (userType: string) => {
    await updateUserInfo({
      userId: session?.user?.id,
      data: {
        user_type: userType,
      },
    }).then(async (res: any) => {
      console.log("user infor update ----", res)
      if (res?.data?.status == 200) {

        //UPDATE SESSION
        await update()

        //MODAL CLOSE
        dispatch(hideModal('select_user_type'))

        //DESTROY COOKIE
        removeCookie('stateOfTour', { path: '/' })
        // window.location.reload()
        router.push('/')
      }
    })
  }

  return (
    <div className="">
      <div className="mt-10 z-10 w-[100%] flex flex-col items-center px-8 md:px-[45px]  pb-1 md:pb-[7.5px] 2xl:pb-[14px] ">
        <div className="relative">
          {/* <img src="./usertypeselect.svg" alt="no-image" /> */}
          <Image
            width={288}
            height={102}
            src={logoXl}
            // className="w-[288.09px] mb-3"
            // className=" w-[110px] lg:w-[130px] xl:w-[150px] 2xl:w-[180px] h-[30px] lg:h-[35px] xl:h-[40px] 2xl:h-[50px]"
            alt=""
          />
        </div>
        <h2 className="font-bold text-5xl mb-1 lg:mb-2 mt-6 text-center capitalize font-roboto  text-[#00ADEE] ">
          Welcome!
        </h2>
        <p className=" text-[#00ADEE] mb-3 lg:mb-4 xl:mb-5 2xl:mb-2 text-center  sm:text-left font-roboto font-normal text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]">
          Thanks for signing up with RealEzy
        </p>
        <p className=" mb-3 lg:mb-4 xl:mb-5 2xl:mb-7 text-center  sm:text-left font-roboto font-base text-[14px] md:text-[16px] 2xl:text-[20px] tracking-[0.4px]  text-[#A1A1A1]">
          Please select your user type!
        </p>
      </div>
      <div className="flex justify-center items-center gap-5 mb-5">
        <button
          onClick={() => hanleUpdateUserType('tenant')}
          className="bg-[#00ADEE] px-10 py-3 text-base rounded-md tracking-wider text-white cursor-pointer">
          Tenant
        </button>
        <button
          onClick={() => hanleUpdateUserType('landlord')}
          className="bg-[#034EA1] px-10 py-3 text-base rounded-md tracking-wider text-white cursor-pointer">
          Landlord
        </button>
      </div>
    </div>
  )
}

export default UserSelectType
