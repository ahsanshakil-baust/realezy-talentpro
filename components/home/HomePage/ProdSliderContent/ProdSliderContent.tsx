import { useState, useRef } from 'react'
import Slider, { Settings } from 'react-slick'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import HomeCustomCard from '@/components/cards/Property/HomeCardSlide'
// import { getAllImages } from '@/util/helper'
import { useRouter } from 'next/router'
import CardLoader from '@/components/loader/CardLoader'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'

export interface IProdCardProps {
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
  isLoading: boolean
}

export interface IProdSliderContentProps extends React.ComponentPropsWithoutRef<'div'> {
  cards: any
  title: string
  isLoading: boolean
}

const ProdSliderContent: React.FC<IProdSliderContentProps> = ({
  className,
  cards,
  title,
  isLoading,
  ...ProdSliderContentProps
}) => {
  const sliderRef = useRef<Slider>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const sliderSettings: Settings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    //infinite: true,
    //centerMode: true,
    //variableWidth: true,
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
    if (slideIndex === cards.length - 1) {
      return
    }

    sliderRef.current?.slickNext()
    setSlideIndex(prevSlideIndex => prevSlideIndex + 1)
  }
  const { pathname } = useRouter()

  const cardshow = cards ? cards.slice(0, 12) : []
  const totalCardShow = cardshow ? cardshow.length : 0

  return (
    <div {...ProdSliderContentProps} className={`prod-slider-content ${className} w-full flex flex-col `}>
      <h3 className="hidden text-[#00ADEE] text-[16px] lg:text-[20px] xl:text-[22.5px] 2xl:text-[30px] tracking-[0.6px] text-left font-normal capitalize font-roboto">
        {title}
      </h3>
      <div className="w-full flex items-center justify-between mb-3 md:mb-5 2xl:mb-6">
        <h1 className="w-auto text-[#00ADEE] text-xl lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] text-left font-roboto font-bold tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px] ">
          {title}
        </h1>
        <Link href="/filter" passHref>
          <div className="w-auto md:w-1/3 cursor-pointer controls items-center   justify-end flex gap-2 md:gap-3  ">
            <h1 className=" text-[#00ADEE] font-roboto font-medium capitalize 2xl:text-[1.75rem]/[2.125rem] md:text-[1.4rem]/[1.7rem] text-[1rem]/[1.25rem] ">
              See All
            </h1>
            <Image src="download/rightarrow.svg" width={10} height={22} alt="right arrow" />
          </div>
        </Link>
        <div className="w-auto md:w-1/3 controls items-center  justify-end hidden gap-2 sm:gap-4   ">
          <button
            className={` ${
              pathname === '/'
                ? 'hidden'
                : ' hidden md:block xl:px-6 xl:py-3 px-6 py-3 rounded-[10px] bg-[#FFFFFF] text-[18px] md:text-[20px] text-[#00ADEE] border-2 border-solid border-[#00ADEE] hover:bg-[#00ADEE] hover:text-white cursor-pointer '
            }`}>
            Explore More
          </button>
          <button
            onClick={previousSlide}
            className="p-2 lg:p-3 rounded-[16px] text-[#00ADEE] bg-white border-2 border-[#00ADEE] cursor-pointer hover:bg-[#00ADEE] hover:text-white">
            <AiOutlineArrowLeft size={25} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 lg:p-3 rounded-[16px] text-[#00ADEE] bg-white border-2 border-[#00ADEE] cursor-pointer hover:bg-[#00ADEE] hover:text-white">
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

      <div className="z-30 w-full controls items-center justify-between flex   gap-2 relative  ">
        <button
          onClick={previousSlide}
          className={
            slideIndex > 0
              ? ' p-3.5  rounded-3xl text-[#00ADEE] bg-white  leftArrowTranslate  hover:shadow-[0px_10px_30px_rgba(3,78,161,0.16)] hover:bg-[#00ADEE] hover:text-white  shadow-[0px_10px_30px_rgba(3,78,161,0.16)] absolute top-52 left-0 cursor-pointer'
              : 'hidden'
          }>
          <BsArrowLeft size={30} />
        </button>

        <button
          onClick={nextSlide}
          className={
            slideIndex > 5
              ? ' hidden'
              : 'p-3.5 rounded-3xl text-[#00ADEE] bg-white rightArrowTranslate   hover:shadow-[0px_10px_30px_rgba(3,78,161,0.16)] hover:bg-[#00ADEE] hover:text-white  shadow-[0px_10px_30px_rgba(3,78,161,0.16)] absolute top-52 right-0 cursor-pointer'
          }>
          <BsArrowRight size={30} />
        </button>
      </div>

      <Slider ref={sliderRef} {...sliderSettings} afterChange={index => setSlideIndex(index)}>
        {isLoading
          ? Array.from(new Array(6)).map((_, item) => <CardLoader key={item} />)
          : cardshow &&
            cardshow?.map((card: any, index: any) => (
              <HomeCustomCard
                bookingStatus=""
                key={index}
                images={JSON.parse(card.details).images.slice(1, -1).split(',')}
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
                index={index}
                totalCardShow={totalCardShow}
              />

              /*
        key={index}
        images={getAllImages(card.details)}
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


      */
            ))}
      </Slider>
    </div>
  )
}
export default ProdSliderContent
