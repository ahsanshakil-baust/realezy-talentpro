// import DetailPageCard from '@/components/cards/EmblaCarousel/detailPage/detailPageCard/DetailPageCard'
// import CustomDpCarousel from '@/components/cards/EmblaCarousel/detailPage/detailPageCarousel/DetailPageCarousel'
// import Information from '@/components/propertyDetails/Information'
// import PropertyDescription from '@/components/propertyDetails/PropertyDescription'
// import PropertyHeading from '@/components/propertyDetails/PropertyHeading'
// import PropertyOptions from '@/components/propertyDetails/PropertyOptions'
// import TransportOption from '@/components/propertyDetails/TransportOption'
// import React from 'react'

// const index = () => {
//   return (
//     <>
//       <section className="w-full">
//         <div>
//           {/* <h2 className="">Property Image Slider</h2> */}
//             <CustomDpCarousel images={[]} />
//         </div>
//       </section>
//       <section className="bg-detailsCard pb-6">
//         <div className="px-5 md:container md:mx-auto">
//           <PropertyHeading />
//           <PropertyDescription />
//           <Information />
//           <PropertyOptions />
//           <TransportOption />
//           <DetailPageCard />
//         </div>
//       </section>
//       {/* <section>
//         <h2>slider</h2>
//       </section> */}
//     </>
//   )
// }

// export default index

import React from 'react'

import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
import DetailPageCard from '@/components/cards/EmblaCarousel/detailPage/detailPageCard/DetailPageCard'
import CustomDpCarousel from '@/components/cards/EmblaCarousel/detailPage/detailPageCarousel/DetailPageCarousel'
import Information from '@/components/propertyDetails/Information'
import PropertyDescription from '@/components/propertyDetails/PropertyDescription'
import PropertyHeading from '@/components/propertyDetails/PropertyHeading'
import PropertyOptions from '@/components/propertyDetails/PropertyOptions'
import TransportOption from '@/components/propertyDetails/TransportOption'

const index: NextPageWithLayout = () => {
  return (
    <>
      <section className="w-full mt-[85px]">
        <div>
          {/* <h2 className="">Property Image Slider</h2> */}
          <CustomDpCarousel bookingStatus='' images={[]} />
        </div>
      </section>
      <section className="bg-detailsCard pb-6 py-[10px]  md:py-[10px] lg:py-[35px]">
        <div className="px-5 md:container md:mx-auto">
          <PropertyHeading />
          <PropertyDescription />
          <Information />
          <PropertyOptions />
          <TransportOption />
          <DetailPageCard />
        </div>
      </section>
      {/* <section>
        <h2>slider</h2>
      </section> */}
    </>
  )
}

export default index

index.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
