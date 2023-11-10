import { useRouter } from 'next/router'
import ProdSliderContent from '../home/HomePage/ProdSliderContent/ProdSliderContent'
import { useGetHomeAllDataQuery } from '@/store'
import Link from 'next/link'
import { useState } from 'react'

const HmSlider4 = ({ title }: any) => {
  /*  const cards = [
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
  ] */
  const { pathname } = useRouter()
  const { data: homedata, isLoading } = useGetHomeAllDataQuery('')

  const [subCategory, setSubCategory] = useState('condo')

  return (
    <>
      {/* <section className="flex flex-col items-center  gap-y-5  bg-[#F7FAFF] "> */}
      <section
        className={` ${
          pathname === '/'
            ? 'py-[15px] sm:py-[25px] md:py-[25px] lg:py-[25px] xl:py-[25px] 2xl:py-[25px] w-full flex flex-col items-center justify-center '
            : ' w-full flex items-center justify-center relative  z-20 overflow-hidden bg-[#F7FAFF] py-[15px] sm:py-[25px] md:py-[25px] lg:py-[25px] xl:py-[25px] 2xl:py-[25px]'
        }`}>
        <div className="w-[90%] md:w-full m-auto">
          <div className=" w-full flex flex-col items-center justify-center">
            <ProdSliderContent title={title} cards={homedata?.popular_products} isLoading={isLoading} />
            <Link href="/filter" passHref>
              <button
                className={` ${
                  pathname === '/'
                    ? 'hidden mt-[30px] md:mt-[30px] xl:mt-[30px] xl:px-6 xl:py-3 px-6 py-3 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px]  text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer '
                    : ' block md:hidden mt-[30px] md:mt-[40px] xl:mt-[50px] xl:px-6 xl:py-3 px-6 py-3 rounded-[10px] bg-[#FFFFFF] tracking-[0.48px]  text-[18px] text-xl xl:text-[24px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer'
                }`}>
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* /</section> */}

      {/**product slider without tab**/}
    </>
  )
}

export default HmSlider4
