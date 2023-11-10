// interface CustomImageGridProps {
//   images: string
//   label: string
//   desc: string
// }

import { demoData } from '@/util/data'

const insOne = demoData.districtNameWithImage[10]
const insTwo = demoData.districtNameWithImage[9]

// import { TextField } from '@mui/material'

const ImageGrid = (props: { path: any; imgGrids: any }) => {
  const { imgGrids, path } = props
  // console.log('imgGrids ------------------> ', imgGrids)
  return (
    <>
      {/*  <h3 className="text-[#00ADEE] text-[16px] lg:text-[20px] xl:text-[22.5px] 2xl:text-[30px] tracking-[0.6px] text-left font-normal capitalize font-roboto">
        District
      </h3> */}

      {/* <div className="w-full flex items-center justify-between mb-8 ">
        <h1 className="w-[50%] text-[#034EA1] text-xl lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] text-left font-roboto font-bold tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px]  ">
          ALL DISTRICT IN SINGAPORE
        </h1>
        <div className="w-[50%] controls items-center justify-end flex   gap-2 ">
          <TextField placeholder="Search by, districts name" />
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full rounded-[20px] h-auto">
        {imgGrids.map((imgGrid: any) => {
          const { label, images } = imgGrid
          return images && (
            <div
              key={label}
              className="relative bg-white rounded-[20px] shadow-md w-full h-[171px] lg:h-[214px] xl:h-[240px]  2xl:h-[320px]  ">
              <img className="rounded-[20px] w-full h-full  object-cover" src={images} alt="" />
              <div
                className="absolute w-full md:w-[85%] h-[35px] md:h-[45px] xl:h-[60px] text-center flex items-center justify-center  pt-2 xl:pt-4 2xl:pt-5 pb-1 xl:pb-3 2xl:pb-4 bottom-0 left-0  z-10 bg-[#FFFFFF66] backdrop-blur-[4px] overflow-hidden "
                style={{ borderRadius: '0px 10px 0px 20px' }}>
                <span className=" font-medium font-roboto text-[15px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[20px] text-center tracking-[0.2px] 2xl:tracking-[0.4px] uppercase text-[#FFFFFF]">
                  {label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      {path !== '/district' && (
        <div className="grid grid-cols-3 gap-4 mt-4 rounded-[20px]  ">
          <div className=" hidden sm:block  sm:col-span-1  ">
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
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGrid
