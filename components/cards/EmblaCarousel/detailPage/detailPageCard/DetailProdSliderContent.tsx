import { useState, useRef } from 'react'
import Slider, { Settings } from 'react-slick'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import DetailCustomCard from './DetailPageCardSlide'
// import { getAllImages } from '@/util/helper'

export interface IDetailProdCardProps {
  // image: string;
  // title: string;
  // description: string;
  // pricingText: string;
  // features: string[];

  images: string[]
  property: string
  price: string
  address: string
  district: string
  furnished: string
  type: string
  squareFeet: string
  amenities: string[]
  distance: string
  mrtStation: string
  label: string
}

export interface IDetailProdSliderContentProps extends React.ComponentPropsWithoutRef<'div'> {
  detailCards: any
}

const DetailProdSliderContent: React.FC<IDetailProdSliderContentProps> = ({
  className,
  detailCards,
  ...DetailProdSliderContentProps
}) => {
  const sliderRef = useRef<Slider>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const sliderSettings: Settings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    centerMode: false,
    initialSlide: 0,
    cssEase: 'ease',
    responsive: [
      {
        breakpoint: 1318,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  const previousSlide = () => {
    if (slideIndex === 0) {
      return
    }

    sliderRef.current?.slickPrev()
    setSlideIndex(prevSlideIndex => prevSlideIndex - 1)
  }

  const nextSlide = () => {
    if (slideIndex === detailCards.length - 1) {
      return
    }

    sliderRef.current?.slickNext()
    setSlideIndex(prevSlideIndex => prevSlideIndex + 1)
  }

  return (
    <div
      {...DetailProdSliderContentProps}
      className={`prod-slider-content ${className} w-full flex flex-col items-center justify-center `}>
      {/* <h3 className="text-[#00ADEE] text-2xl md:text-3xl font-semibold uppercase mb-2 lg:mb-3">Lorem Ipsum</h3> */}
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="w-auto md:w-[50%] text-[#034EA1] text-3xl lg:text-4xl font-bold uppercase pr-2 ">
          Best For You
        </h1>
        <div className="w-auto md:w-[50%] controls items-center  justify-end flex gap-2 sm:gap-4  md:gap-6 xl:gap-10 ">
          <button className=" xl:px-6 xl:py-3 px-6 py-3 hidden sm:block rounded-[10px] bg-[#FFFFFF] text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer ">
            Explore More
          </button>
          <button
            onClick={previousSlide}
            className="p-2 lg:p-3 rounded-[16px] bg-[#00ADEE]  text-white border-2 border-[#00ADEE] cursor-pointer hover:bg-[#00ADEE] hover:text-white">
            {/* <FaChevronLeft /> */}
            <AiOutlineArrowLeft size={25} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 lg:p-3 rounded-[16px] text-[#00ADEE] bg-white border-2 border-[#00ADEE] cursor-pointer hover:bg-[#00ADEE] hover:text-white">
            {/* <FaChevronRight /> */}
            <AiOutlineArrowRight size={25} />
          </button>
        </div>
      </div>

      {/* <Slider ref={sliderRef} {...sliderSettings} afterChange={(index) => setSlideIndex(index)}>
        {console.log(typeof cards)}
        {cards?.map((card, index) => (
          <ProdCard key={index} {...card} />
        ))}
      </Slider> */}
      <Slider ref={sliderRef} {...sliderSettings} afterChange={index => setSlideIndex(index)}>
        {detailCards?.map((card: any, index: any) => (
          <DetailCustomCard
            key={index}
            images={[]}
            address={card.property_address}
            property={card.name}
            price={card.rental_amount}
            district={card.property_city}
            type={card.rental_type}
            furnished={card.furnishing}
            amenities={[card.bedroom, card.bathroom]}
            squareFeet={card.floor_size}
            distance=""
            mrtStation={card.mrtStation}
            label={card.sub_category_name}
            id={card.id}
          />
        ))}
      </Slider>

      <button className=" xl:px-6 xl:py-3 px-6 py-3 block sm:hidden md:px-6 rounded-[10px] bg-[#FFFFFF] text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer ">
        Explore More
      </button>
    </div>
  )
}
export default DetailProdSliderContent
