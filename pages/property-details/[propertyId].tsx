import React from 'react'

import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
// import DetailPageCard from '@/components/cards/EmblaCarousel/detailPage/detailPageCard/DetailPageCard'
import CustomDpCarousel from '@/components/cards/EmblaCarousel/detailPage/detailPageCarousel/DetailPageCarousel'
import Information from '@/components/propertyDetails/Information'
// import PropertyDescription from '@/components/propertyDetails/PropertyDescription'
import PropertyHeading from '@/components/propertyDetails/PropertyHeading'
import PropertyOptions from '@/components/propertyDetails/PropertyOptions'
// import TransportOption from '@/components/propertyDetails/TransportOption'
import { useRouter } from 'next/router'
import { useGetPropertyDetailsQuery } from '@/store'
// import HmSlider4 from '@/components/hmSlider4/HmSlider4'
import DetailPageLoader from '@/components/loader/DetailPageLoader'

const Index: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router
  const { propertyId } = query
  const propertyIdStr = propertyId ? propertyId.toString() : '0'
  // const propertyIdStr = propertyId ? (propertyId?.length ? propertyId[0] : propertyId) : '0'

  const { data, isLoading } = useGetPropertyDetailsQuery(propertyIdStr as string)

  // console.log(`🚀 ~ file: [propertyId].tsx:58 ~ data:`, data)

  // if (isLoading) {
  //   return <h2>Loading...</h2>
  // }

  return (
    <>
      {isLoading ? (
        <DetailPageLoader />
      ) : (
        <>
          <section className=" bg-[#F1F7FF] mt-[85px] ">
            <CustomDpCarousel
              bookingStatus={data?.booking_status}
              images={data?.product_details?.images ? data?.product_details?.images.slice(1, -1).split(',') : []}
            />
          </section>

          <section className=" 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5  bg-[#F7FAFF] ">
            <div className="w-[90%] md:w-full m-auto ">
              <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />
              <PropertyHeading data={data} />
              <div className=" py-[10px]  md:py-[18px] lg:py-[35px]" />

              {/* <PropertyDescription />
              <div className="py-[10px]  md:py-[18px] lg:py-[35px]" /> */}

              <Information data={data} />
              <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />

              <PropertyOptions data={data} />
              <div className="hidden py-[10px]  md:py-[18px] lg:py-[35px]" />

              {/* <TransportOption />
              <div className="py-[10px]  md:py-[18px] lg:py-[35px]" /> */}

              {/* <DetailPageCard /> */}
              {/* <HmSlider4 title={'Recommended Property'} /> */}
              <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />
            </div>
          </section>
        </>
      )}
      {/* <section>
        <h2>slider</h2>
      </section> */}
    </>
  )
}

export default Index

Index.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
