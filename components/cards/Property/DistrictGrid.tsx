// interface CustomImageGridProps {
//   images: string
//   label: string
//   desc: string
// }

import { demoData } from '@/util/data'
import Link from 'next/link'

// const insOne = demoData.districtNameWithImage[10]
const insOne = demoData.districtNameNew[3]
const insTwo = demoData.districtNameNew[4]

// import { TextField } from '@mui/material'

const DistrictGrid = (props: { path: any; districtGrids: any }) => {
  const { districtGrids, path } = props
  // console.log('DistrictGrids ------------------> ', DistrictGrids)

  return (
    <>
      <div
        className={`${
          path === '/district'
            ? ' grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-6'
            : ' grid md:grid-cols-3 grid-cols-1 gap-6 mb-6'
        }  `}>
        {districtGrids.map((districtGrid: any, index: number) => {
          const { label, value } = districtGrid
          return (
            <div key={index} className="w-full h-full  group  ">
              <div
                key={label}
                className="custom-hover-district wow fadeInUp  group cursor-pointer flex flex-col 2xl:gap-[1.25rem] md:gap-[1rem] gap-[0.875rem] items-start  rounded-[20px]  shadow-[0px_4px_10px_#034EA11A] h-[7rem] md:h-[8rem] 2xl:h-[10rem] px-4 md:px-6 2xl:px-[1.875rem] py-4 md:py-6 2xl:py-[1.875rem] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#F1F7FF] to-100% hover:bg-gradient-to-r hover:from-[#00ADEE] hover:from-100% hover:to-[#00ADEE] hover:to-100% hover:!text-[#FFFFFF] "
                data-wow-delay=".1s">
                {/* <div className="relative z-10 mb-8 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white group-hover:bg-[#F1F7FF] mx-auto border-2 border-[#ffffff] ">
                <img src="/download/document-icon.png" alt="image" className="mx-auto  w-[40px] h-[40px]" />
              </div> */}
                <h1 className="text-[#202020] 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.125rem] font-medium font-roboto uppercase ">
                  {label}{' '}
                </h1>

                <p className=" text-[#505050] 2xl:text-[1.125rem]/[1.75rem] md:[1rem]/[1.4rem] text-sm/[1rem] font-normal font-roboto capitalize">
                  {value}{' '}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {path !== '/district' && (
        <div className=" grid md:grid-cols-3 grid-cols-1 gap-6 ">
          <div className="w-full h-full">
            <div
              className="  custom-hover-district wow fadeInUp  group cursor-pointer flex flex-col 2xl:gap-[1.25rem] md:gap-[1rem] gap-[0.875rem] items-start  rounded-[20px]  shadow-[0px_4px_10px_#034EA11A] h-[7rem] md:h-[8rem] 2xl:h-[10rem] px-4 md:px-6 2xl:px-[1.875rem] py-4 md:py-6 2xl:py-[1.875rem] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#F1F7FF] to-100% hover:bg-gradient-to-r hover:from-[#00ADEE] hover:from-100% hover:to-[#00ADEE] hover:to-100% hover:!text-[#FFFFFF] "
              data-wow-delay=".1s">
              {/* <div className="relative z-10 mb-8 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white group-hover:bg-[#F1F7FF] mx-auto border-2 border-[#ffffff] ">
                <img src="/download/document-icon.png" alt="image" className="mx-auto  w-[40px] h-[40px]" />
              </div> */}
              <h1 className=" 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.125rem] font-medium font-roboto uppercase text-[#202020]">
                {insOne.label}{' '}
              </h1>

              <p className=" text-[#505050] 2xl:text-[1.125rem]/[1.75rem] md:[1rem]/[1.4rem] text-sm/[1rem] font-normal font-roboto capitalize">
                {insOne.value}{' '}
              </p>
            </div>
          </div>
          <div className="w-full h-full">
            <div
              className="custom-hover-district wow fadeInUp  group cursor-pointer flex flex-col 2xl:gap-[1.25rem] md:gap-[1rem] gap-[0.875rem] items-start  rounded-[20px]  shadow-[0px_4px_10px_#034EA11A] h-[7rem] md:h-[8rem] 2xl:h-[10rem] px-4 md:px-6 2xl:px-[1.875rem] py-4 md:py-6 2xl:py-[1.875rem] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#F1F7FF] to-100% hover:bg-gradient-to-r hover:from-[#00ADEE] hover:from-100% hover:to-[#00ADEE] hover:to-100% hover:!text-[#FFFFFF] "
              data-wow-delay=".1s">
              {/* <div className="relative z-10 mb-8 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white group-hover:bg-[#F1F7FF] mx-auto border-2 border-[#ffffff] ">
                <img src="/download/document-icon.png" alt="image" className="mx-auto  w-[40px] h-[40px]" />
              </div> */}
              <h1 className=" 2xl:text-[1.5rem]/[1.8125rem] md:text-[1.2rem]/[1.45rem] text-[1rem]/[1.125rem] font-medium font-roboto uppercase text-[#202020]">
                {insTwo.label}{' '}
              </h1>

              <p className=" text-[#505050] 2xl:text-[1.125rem]/[1.75rem] md:[1rem]/[1.4rem] text-sm/[1rem] font-normal font-roboto capitalize">
                {insTwo.value}{' '}
              </p>
            </div>
          </div>
          <div className="w-full h-full">
            <Link href="/district">
              <a className="">
                <div
                  className="custom-hover-district wow fadeInUp  group cursor-pointer flex flex-col 2xl:gap-[1.25rem] md:gap-[1rem] gap-[0.875rem] items-center justify-center  rounded-[20px]  shadow-[0px_4px_10px_#034EA11A] h-[7rem] md:h-[8rem] 2xl:h-[10rem] px-4 md:px-6 2xl:px-[1.875rem] py-4 md:py-6 2xl:py-[1.875rem] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#F1F7FF] to-100% hover:bg-gradient-to-r hover:from-[#00ADEE] hover:from-100% hover:to-[#00ADEE] hover:to-100% hover:!text-[#FFFFFF] "
                  data-wow-delay=".1s">
                  {/* <div className="relative z-10 mb-8 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white group-hover:bg-[#F1F7FF] mx-auto border-2 border-[#ffffff] ">
                <img src="/download/document-icon.png" alt="image" className="mx-auto  w-[40px] h-[40px]" />
              </div> */}
                  <h1 className=" 2xl:text-[1.75rem]/[2.125rem] md:text-[1.4rem]/[1.7rem] text-[1.2rem]/[1.325rem] font-medium font-roboto capitalize text-[#202020]">
                    See all 28 districts
                  </h1>
                </div>
              </a>
            </Link>
          </div>
          {/* <div className=" hidden sm:block  sm:col-span-1  ">
            <div className="relative bg-white rounded-[20px] shadow-md w-full h-[171px] lg:h-[214px] xl:h-[240px]  2xl:h-[320px]  ">
              <img
                className="rounded-[20px] w-full h-full object-cover"
                src={insOne.images} 
                alt=""
              />
              <div
                className="absolute w-full md:w-[85%] h-[35px] md:h-[45px] xl:h-[60px] text-center flex items-center justify-center  pt-2 xl:pt-4 2xl:pt-5 pb-1 xl:pb-3 2xl:pb-4 bottom-0 left-0  z-10 bg-[#FFFFFF66] backdrop-blur-[4px] overflow-hidden "
                style={{ borderRadius: '0px 10px 0px 20px' }}>
                <span className=" font-medium font-roboto text-[15px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[20px] text-center tracking-[0.2px] 2xl:tracking-[0.4px] uppercase text-[#FFFFFF]">
                  {insOne.label}
                </span>
              </div>
            </div>
          </div>
          <div className=" col-span-3 sm:col-span-2 ">
            <div className="relative bg-white rounded-[20px] shadow-md w-full h-[171px] lg:h-[214px] xl:h-[240px]  2xl:h-[320px]  ">
              <img
                className="rounded-[20px] w-full h-full object-cover"
                src={insTwo.images}
                alt=""
              />
              <div
                className="absolute w-[40%] h-[35px] md:h-[45px] xl:h-[60px] text-center flex items-center justify-center  pt-2 xl:pt-4 2xl:pt-5 pb-1 xl:pb-3 2xl:pb-4 bottom-0 left-0  z-10 bg-[#FFFFFF66] backdrop-blur-[4px] overflow-hidden "
                style={{ borderRadius: '0px 10px 0px 20px' }}>
                <span className=" font-medium font-roboto text-[15px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[20px] text-center tracking-[0.2px] 2xl:tracking-[0.4px] uppercase text-[#FFFFFF]">
                  {insTwo.label}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </>
  )
}

export default DistrictGrid
