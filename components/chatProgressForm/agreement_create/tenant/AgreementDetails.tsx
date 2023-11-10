import React from 'react'
import { Icon } from '@/components/shared'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { showModal, useGetDetailsAgreementQuery } from '@/store'
import { StoreThunkDispatch } from '@/types'
import config from '@/config'

const AgreementDetails = () => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  console.log("🚀 ~ file: AgreementDetails.tsx:9 ~ AgreementDetails ~ payload:", payload)

  const {data, isLoading} = useGetDetailsAgreementQuery(payload?.tenancyAgreement?.id)
  console.log("AgreementDetails ~ data:", data)

  return (
    <>
      <div className="w-full grid grid-cols-12 pl-6 pt-4">
        <div className="col-span-4 w-full ">
          <div className=" flex flex-col w-full  ">
            <h1 className=" font-roboto font-semibold mb-2 text-sm text-[#010101] ">Property Info</h1>
            <div className="w-full flex gap-4">
              {
                data?.image && <img
                src={ data?.image ? data?.image : "https://via.placeholder.com/150"}
                className=" rounded-[10px] w-[160px] h-[130px] object-cover"
                alt=""
              />
              }
              
              <div className=" w-full flex flex-col">
                <p className='text-[#8B8B8B] text-sm font-medium'>
                  {data?.property_type}-<span className='text-[#00ADEE]'>{payload?.tenantLandlordProgressInfo?.propertyInfo?.rental_type}</span>
                </p>
                <p className='font-semibold text-sm my-1'>{data?.property_name}</p>
                <div className="text-common w-full gap-1 font-thin text-sm mb-2 flex items-center">
                  <Icon
                    className=" !w-[18px] !h-[16px] sm:!w-[20px] sm:!h-[18px] md:!w-[16px] md:!h-[14px] xl:!w-[23px] xl:!h-[20px]"
                    name="bed"
                  />
                  {payload?.tenantLandlordProgressInfo?.propertyInfo?.bedroom}
                  <Icon
                    className=" !w-[18px] !h-[16px] sm:!w-[20px] sm:!h-[18px] md:!w-[16px] md:!h-[14px] xl:!w-[23px] xl:!h-[20px]"
                    name="bath"
                    />
                    {payload?.tenantLandlordProgressInfo?.propertyInfo?.bathroom}
                  <Icon
                    className=" !w-[18px] !h-[16px] sm:!w-[20px] sm:!h-[18px] md:!w-[16px] md:!h-[14px] xl:!w-[23px] xl:!h-[20px]  "
                    name="area"
                    />
                    {payload?.tenantLandlordProgressInfo?.propertyInfo?.floor_size} Sq Ft
                </div>
                <div className=" flex gap-2 items-center">
                  <Icon
                    className="w-4 h-4 font-normal font-roboto tracking-[0.32px] text-[#A1A1A1] text-sm"
                    name="marker"
                  />
                  <p className=" truncate font-normal font-roboto tracking-[0.32px] text-[#A1A1A1] text-[12px] w-2/4">
                    {data?.property_address}
                  </p>
                </div>
              </div>
            </div>
            <h1 className=" font-roboto font-semibold my-2 text-sm text-[#034EA1]">Landlord Info</h1>
            <div className=" w-full flex flex-col ">
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-sm text-[#202020] text-left">Name:</p>
                <p className=" font-roboto font-medium text-sm text-[#101010] text-right">{data?.landlord_name}</p>
              </div>
              <div className=" w-full flex justify-between my-2">
                <p className=" font-roboto font-normal text-sm text-[#202020]  text-left">Email:</p>
                <p className=" font-roboto font-medium text-sm text-[#101010] text-right">{data?.landlord_email}</p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-sm text-[#202020]   text-left">Phone:</p>
                <p className=" font-roboto font-medium text-sm text-[#101010]  text-right">{data?.landlord_mobile}</p>
              </div>
            </div>
            <h1 className=" font-roboto font-semibold my-2 text-sm text-[#00ADEE]">Tenant Info</h1>
            <div className=" w-full flex flex-col   ">
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-sm text-[#202020]  text-left">Name:</p>
                <p className=" font-roboto font-medium text-sm text-[#101010]  text-right">{data?.tenant_name}</p>
              </div>
              <div className=" w-full flex justify-between my-2">
                <p className=" font-roboto font-normal text-sm text-[#202020]   text-left">Email:</p>
                <p className=" font-roboto font-medium text-sm text-[#101010]  text-right">{data?.tenant_email}</p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-sm text-[#202020]   text-left">Phone:</p>
                <p className=" font-roboto font-medium text-sm text-[#101010]  text-right">{data?.tenant_mobile}</p>
              </div>
            </div>
          </div>
        </div>
          <div className="border-s-2 ml-[102px] border-[#D4E8FF]"></div>

        <div className=" col-span-7  w-full">
          <div className=" flex flex-col w-full px-12 gap-3 ">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className=" font-roboto font-semibold mb-2 text-sm text-[#202020] ">Agreement Status</h1>
                <span className=" flex items-center gap-2 my-3 ">
                  <img src="/chat/chatProgress/status.svg" />
                  <p className=" font-roboto font-normal text-sm text-[#E99400]">{data?.agreement_status}</p>
                </span>
              </div>
              <div>
                <h1 className=" font-roboto font-semibold mb-2 text-sm text-[#202020] ">Option To Renew</h1>
                <span className=" flex items-center gap-2 my-3 ">
                  <p className=" font-roboto font-normal text-base text-[#034EA1]">{data?.agreement_details?.renew_option} :</p>
                  <p className=" font-roboto font-normal text-base text-[#034EA1]">{data?.agreement_details?.renew_year} Year</p>
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className=" w-full">
                <h1 className=" font-roboto font-semibold mb-2 text-sm text-[#202020] ">Leasing Period</h1>
                <div className="w-full flex justify-between my-3">
                  <span className=" flex items-center gap-2 ">
                    <p className=" font-roboto font-normal text-base text-[#034EA1]">Start Date :</p>
                    <p className=" font-roboto font-normal text-base text-[#034EA1]">{data?.start_date.split(" ")[0]}</p>
                  </span>
                  <span className=" flex items-center gap-2  ">
                    <p className=" font-roboto font-normal text-base text-[#034EA1]">End Date :</p>
                    {/* <p className=" font-roboto font-normal text-base text-[#034EA1]">27-October-2024</p> */}
                    <p className=" font-roboto font-normal text-base text-[#034EA1]">{data?.end_date.split(" ")[0]}</p>
                  </span>
                </div>
              </div>
            </div>
            <h1 className="font-roboto font-semibold mb-2 text-sm text-[#010101] ">Payment Info</h1>
            <div className=" w-full flex flex-col">
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-base text-[#202020] mb-3 text-left">Rent:</p>
                <p className=" font-roboto font-medium text-base text-[#101010] mb-3 text-right">S$ {data?.rent_amount}</p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-base text-[#202020] mb-3  text-left">
                  Advance Payment Date:
                </p>
                {/* <p className=" font-roboto font-medium text-base text-[#101010] mb-3 text-right">28-October-2022</p> */}
                <p className=" font-roboto font-medium text-base text-[#101010] mb-3 text-right">{data?.agreement_details?.advance_payment_date}</p>
              </div>
              <div className=" w-full flex justify-between">
                <p className=" font-roboto font-normal text-base text-[#202020] mb-3  text-left">First Payment Date:</p>
                {/* <p className=" font-roboto font-medium text-base text-[#101010] mb-3 text-right">29-October-2022</p> */}
                <p className=" font-roboto font-medium text-base text-[#101010] mb-3 text-right">{data?.agreement_details?.first_payment_date}</p>
              </div>
            </div>
            <div>
              <Button onClick={()=>{
                dispatch(showModal({
                  open: true,
                  name: 'AGREEMENT_VIEW',
                  children: <div className='h-[700px] w-[1000px]'>
                    <iframe src={`${config.ADMIN_URL}/agreements/${payload?.tenancyAgreement?.id}/agreement`} width="100%" height="100%" />
                  </div>
                }))
              }} variant='contained'>PDF VIEW</Button>
            </div>
            {/* <a
              href="#"
              target="_blank"
              className=" w-[200px]  bg-[#00ADEE] text-white p-3 rounded-[10px] mt-5 capitalize text-center">
              Agreement Full Details
            </a> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default AgreementDetails
