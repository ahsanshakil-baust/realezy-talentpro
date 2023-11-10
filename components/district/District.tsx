import React from 'react'
// import ImageGrid from '../cards/Property/ImageGrid'
import { useRouter } from 'next/router'

import { demoData } from '@/util/data'
import DistrictGrid from '../cards/Property/DistrictGrid'

const { districtNameNew } = demoData

const District = () => {
  const router = useRouter()
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
  //   {
  //     images:
  //       'https://www.simmonslivingstone.com.au/wp-content/uploads/2021/04/Everything-you-need-to-know-about-land-tax-in-Queensland-1536x977.png',

  //     label: 'CHANGI',
  //   },
  //   {
  //     images:
  //       'https://www.simmonslivingstone.com.au/wp-content/uploads/2021/04/Everything-you-need-to-know-about-land-tax-in-Queensland-1536x977.png',

  //     label: 'CHANGI',
  //   },
  //   {
  //     images:
  //       'https://www.simmonslivingstone.com.au/wp-content/uploads/2021/04/Everything-you-need-to-know-about-land-tax-in-Queensland-1536x977.png',

  //     label: 'CHANGI',
  //   },
  //   {
  //     images:
  //       'https://www.simmonslivingstone.com.au/wp-content/uploads/2021/04/Everything-you-need-to-know-about-land-tax-in-Queensland-1536x977.png',

  //     label: 'CHANGI',
  //   },
  //   {
  //     images:
  //       'https://www.simmonslivingstone.com.au/wp-content/uploads/2021/04/Everything-you-need-to-know-about-land-tax-in-Queensland-1536x977.png',

  //     label: 'CHANGI',
  //   },
  //   {
  //     images:
  //       'https://www.simmonslivingstone.com.au/wp-content/uploads/2021/04/Everything-you-need-to-know-about-land-tax-in-Queensland-1536x977.png',

  //     label: 'CHANGI',
  //   },
  // ]

  return (
    <div className=" py-10">
      {/* <ImageGrid path={router.pathname} imgGrids={districtNameWithImage} /> */}
      <DistrictGrid path={router.pathname} districtGrids={districtNameNew} />
    </div>
  )
}

export default District
