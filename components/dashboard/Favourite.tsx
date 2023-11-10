import { StoreState } from '@/types'
import { isTenant } from '@/util'
// import { type } from 'os'
import React from 'react'
import { useSelector } from 'react-redux'
// import FavouriteIcon from '@/public/Favourite_icon.svg'
// import edit from '@/public/edit.svg'
// import Image from 'next/image'
// import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useGetUserWishListQuery } from '@/store' // useGetAllPropertyQuery
import { MyFavouritePropertyCard } from '../shared' // MyPropertyCard
import CardLoader from '../loader/CardLoader'

const Favourite = () => {
  const { type } = useSelector((state: StoreState) => state.entities.user)
  const { data: session }: any = useSession()

  const userId = session?.user?.id

  // const { data: properties, isLoading } = useGetAllPropertyQuery(userId, {
  //   skip: !userId,
  // })
  const {
    data: properties,
    isLoading,
    // isError,
  } = useGetUserWishListQuery(userId, {
    skip: !userId,
  })

  console.log('properties', properties)
  // console.log('🚀 ~ file: Favourite.tsx:27 ~ Favourite ~ properties:', properties)

  if (!userId) return null

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
              <g id="Layer_12" transform="translate(-2 -3.375)">
                <path
                  id="Path_23573"
                  data-name="Path 23573"
                  d="M22.824,27.821c-2.868-.915-6.613-3.672-6.186-7.045a3.477,3.477,0,0,1,6.186-2.055,3.477,3.477,0,0,1,6.186,2.055C29.435,24.15,25.692,26.9,22.824,27.821Z"
                  transform="translate(-1.043 -0.446)"
                  // fill="#505050"
                />
                <path
                  id="Path_23574"
                  data-name="Path 23574"
                  d="M13.936,19.947a5.072,5.072,0,0,1,7.845-4.089,5.173,5.173,0,0,1,2.785-.826,4.811,4.811,0,0,1,1.7.317V13.01A3.712,3.712,0,0,0,24.7,9.977L16.152,4.017a3.5,3.5,0,0,0-4.039,0L3.569,9.977A3.7,3.7,0,0,0,2,13.01V23.7a3.632,3.632,0,0,0,3.584,3.679H18.017C15.466,25.611,13.568,22.922,13.936,19.947Z"
                  // fill="#505050"
                />
              </g>
            </svg>
            <h2 className=" text-[20px] leading-4 md:text-[24px] md:leading-5 xl:text-[28px] xl:leading-6 font-medium font-roboto text-[#00ADEE]">
              Favourite
            </h2>{' '}
          </div>
          <div>
            <button className=" px-2 md:px-3 xl:px-5 py-2 md:py-3 xl:py-4 rounded-[10px]  text-[#FFFFFF] capitalize font-roboto font-normal text-base lg:text-lg xl:text-xl flex items-center gap-2 bg-[#00ADEE]">
              {/* <Image src={edit} width={'15%'} height={'15%'} />  */}
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25.999" viewBox="0 0 26 25.999">
                <g id="edit" transform="translate(0 -0.001)">
                  <path
                    id="Path_21131"
                    data-name="Path 21131"
                    d="M20.992,12.839a1.1,1.1,0,0,0-1.1,1.1v8.839a1.106,1.106,0,0,1-1.1,1.1H3.315a1.106,1.106,0,0,1-1.1-1.1V7.315a1.106,1.106,0,0,1,1.1-1.1h8.839a1.1,1.1,0,0,0,0-2.21H3.315A3.319,3.319,0,0,0,0,7.315V22.782A3.319,3.319,0,0,0,3.315,26.1H18.782A3.319,3.319,0,0,0,22.1,22.782V13.944A1.1,1.1,0,0,0,20.992,12.839Z"
                    transform="translate(0 -0.097)"
                    fill="#fff"
                  />
                  <path
                    id="Path_21132"
                    data-name="Path 21132"
                    d="M9.633,13.471a.659.659,0,0,0-.178.332l-.92,4.6a.65.65,0,0,0,.639.778.615.615,0,0,0,.128-.013l4.6-.92a.647.647,0,0,0,.333-.178L24.527,7.776l-4.6-4.6Z"
                    transform="translate(-2.184 0.481)"
                    fill="#fff"
                  />
                  <path
                    id="Path_21133"
                    data-name="Path 21133"
                    d="M24.749.952a3.255,3.255,0,0,0-4.6,0l-1.8,1.8,4.6,4.6,1.8-1.8a3.252,3.252,0,0,0,0-4.6Z"
                    transform="translate(0.299)"
                    fill="#fff"
                  />
                </g>
              </svg>
              Update
            </button>
          </div>
        </div>

        {/* Favourite */}
        {/* <div className="md:flex  gap-3 md:gap-4 xl:gap-5 ">
          <div className="w-full  bg-[#F1F7FF] py-4 md:py-6 xl:py-8 px-4 md:px-7 xl:px-11 border border-solid border-[#D4E8FF] rounded-[10px] ">
            <div className="w-full md:w-2/3 bg-[#F1F7FF] py-3 md:py-5 xl:py-7 px-4 md:px-7 xl:px-11  border border-solid border-[#D4E8FF] rounded-[10px] "> */}
        {/* <div>
                <div>
                  <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
                    Favourite Details
                  </h2>
                  <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                    You have not set up any Favourite method yet.
                  </p>
                  <p className="text-[#A1A1A1] mb-4 md:mb-5 xl:mb-7 font-normal font-roboto text-sm sm:text-base xl:text-lg">
                    Tell us how you want to receive your funds. It may take up to some days to activate your Favourite
                    method.
                  </p>
                </div>

                <div className="w-full flex justify-between gap-2">
                  <div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                        Favourite Method
                      </p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Bank Transfer
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Account Name</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Clarissa Tan Hossain
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                        Account Number
                      </p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        EX: A/C 968544788411
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Branch</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Anson Road
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-[22px] md:mb-[32px] xl:mb-[50px]">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Swift Code</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: 123 654
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-[18px] md:mb-[22px] xl:mb-[30px]">
                      <h2 className="font-bold font-roboto text-[#202020] text-lg  sm:text-xl xl:text-2xl mb-2 md:mb-4 xl:mb-6">
                        Bank Statement
                      </h2>
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">
                        You have not add any bank statement yet.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Bank Name</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Standard Chartered Singapore
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Account Type</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: Personal Account
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Bank Code</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        EX: 9685
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2 mb-2 md:mb-3 xl:mb-5">
                      <p className="text-[#505050] mb-2 font-medium font-roboto sm:text-lg xl:text-xl">Branch Code</p>
                      <p className="text-[#A1A1A1] capitalize font-roboto font-normal text-base sm:text-lg xl:text-xl">
                        Ex: 123456
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
        {/* <h3
                className="wow  fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                data-wow-delay=".1s"
                style={{ animationDelay: '0.1s' }}>
                General
              </h3>

              <p
                className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                data-wow-delay=".1s"
                style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                {' '}
                Please carefully read all of these terms and conditions ("Terms"). You and Real Ezy Pte Ltd ("Company,"
                "Real Ezy," "we," or "us") are bound by these Terms, which also govern your use of www.Real-Ezy.com,
                Real Ezy App and Real Ezy Web App (collectively, the " Real Ezy Platforms" including all material and
                features thereof). You accept the terms and conditions set out in this document and all other terms that
                are referenced herein by accessing or using the Real Ezy Platforms. Do not use the Real Ezy Platforms if
                you do not agree to these Terms. Real Ezy shall not be liable for any damages resulting from your use of
                any information or content on the Real Ezy Platforms. You are solely responsible for ensuring that any
                information, goods, or services obtained from the Real Ezy Platforms satisfy your individual needs.
              </p>
            </div>
          </div>
        </div> */}
        <div className="w-full bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh]">
          <h1 className="text-2xl text-textValueColor font-bold mb-7">
            {properties ? `Favourite Properties (${properties.length})` : 'Favourite Properties'}
          </h1>
          <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-7">
            {isLoading ? (
              Array.from(new Array(6)).map((_, item) => <CardLoader key={item} />)
            ) : properties ? (
              properties?.map((property: any) => {
                return (
                  <MyFavouritePropertyCard
                    images={JSON.parse(property.details).images.slice(1, -1).split(',')}
                    propertyName={property.name}
                    price={property.rental_amount}
                    type={property.sub_category_name}
                    rentalType={property.rental_type}
                    bedroom={property.bedroom}
                    bathroom={property.bathroom}
                    status={property.status}
                    squareFeet={property.floor_size}
                    id={property.id}
                    key={property.id}
                  />
                )
              })
            ) : (
              <h1 className="font-roboto font-medium text-xl">No favourite property found</h1>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Favourite
