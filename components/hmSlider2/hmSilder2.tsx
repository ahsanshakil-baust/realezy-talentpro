import Link from 'next/link'
import ImageGrid from '../cards/Property/ImageGrid'
import DistrictGrid from '../cards/Property/DistrictGrid'

const HmSlider2 = ({ data }: any) => {
  // const imgGrids = [
  //   {
  //     images: 'https://mobileimages.lowes.com/productimages/994a2bec-6b6b-4f08-a477-93b1d7375261/40889064.jpg',

  //     label: 'BISHAN',
  //   },
  //   {
  //     images:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo74GDsxSm8-Gh3Qx2pg85rh0qfWHuZavK01n41PSLqKjdzFKS',

  //     label: 'BUKIT MERAH',
  //   },
  //   {
  //     images:
  //       'https://www.simmonslivingstone.com.au/wp-content/uploads/2021/04/Everything-you-need-to-know-about-land-tax-in-Queensland-1536x977.png',

  //     label: 'CHANGI',
  //   },
  // ]
  const imgGrids: any = []
  data?.map((ent: any) => {
    imgGrids.push({
      images: ent?.image,
      label: ent?.title,
    })
  })

  const districtGrids: any = []
  data?.map((ent: any) => {
    districtGrids.push({
      label: ent?.title,
      value: ent?.value,
    })
  })

  return (
    <>
      <div className=" py-[15px] sm:py-[25px] md:py-[25px] lg:py-[25px] xl:py-[25px] 2xl:py-[25px] w-full">
        <h3 className="hidden text-[#00ADEE] text-[16px] lg:text-[20px] xl:text-[22.5px] 2xl:text-[30px] tracking-[0.6px] text-left font-normal capitalize font-roboto">
          District
        </h3>
        <div className="w-full flex items-center justify-between mb-3 lg:mb-5 xl:mb-6 2xl:mb-8">
          <h1 className="w-[70%] text-[#00ADEE] text-xl lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] text-left font-roboto font-bold tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px]  ">
            Search by District
          </h1>
          <Link passHref href="/district">
            <div className=" hidden lg:flex w-[30%] controls items-center justify-end   gap-2  ">
              <button className=" xl:px-6 xl:py-3 px-6 py-3 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px]  text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer ">
                All Districts
              </button>
            </div>
          </Link>
        </div>
        {/* new requirement start*/}
        <div className=" hidden">
          <img alt="no-image" src="/districts-in-singapore.jpg" className="w-full rounded-2xl" />
        </div>
        {/* new requirement end*/}
        <div className="">
          <DistrictGrid path={''} districtGrids={districtGrids} />
          {/* <ImageGrid path={''} imgGrids={imgGrids} /> */}
        </div>
      </div>

      {/**product slider without tab**/}
    </>
  )
}

export default HmSlider2
