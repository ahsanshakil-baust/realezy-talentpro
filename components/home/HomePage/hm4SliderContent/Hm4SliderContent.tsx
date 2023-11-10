import { useState, useRef, useEffect } from 'react'
import Slider, { Settings } from 'react-slick'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import HomeCustomCard from '@/components/cards/Property/HomeCardSlide'
import { setSliderList, useGetPropertyByRentTypeQuery } from '@/store'
import CardLoader from '@/components/loader/CardLoader'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

export interface IHm4CardProps {
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
  id: string
}

export interface IHm4SliderContentProps extends React.ComponentPropsWithoutRef<'div'> {
  // cards: IHm4CardProps[],
  finding: string
}

// const Hm4Card: React.FC<IHm4CardProps> = ({ imageSrc, title, description, pricingText, features }) => {
//   return (
//     <div className='card'>
//       <img src={imageSrc} alt={title} className='card-image' />
//       <div className='text-info'>
//         <div className='card-header'>
//           <h2>{title}</h2>
//           <span>{pricingText}</span>
//         </div>
//         <p>{description}</p>
//         <ul>
//           {features?.map((feature, index) => (
//             <li key={index}>{feature}</li>
//           ))}
//         </ul>
//       </div>
//       <button>Buy Now</button>
//     </div>
//   );
// };

const Hm4SliderContent: React.FC<IHm4SliderContentProps> = ({ className, finding, ...Hm4SliderContentProps }) => {
  const { data, isLoading } = useGetPropertyByRentTypeQuery(finding)
  // console.log('datahm3', data)
  const cardshow = data ? data.slice(0, 12) : []
  const totalCardShow = cardshow ? cardshow.length : 0

  const sliderRef = useRef<Slider>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [next, setNext] = useState(1)
  const dispatch = useDispatch()

  const list = useSelector((state: any) => state.entities.slider.sliderList)

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
    cssEase: 'ease-in-out',
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
    // setSlideIndex(prevSlideIndex => prevSlideIndex - 1)
    setSlideIndex(slideIndex - 1)
  }

  const nextSlide = () => {
    if (slideIndex === data.length - 1) {
      return
    }
    sliderRef.current?.slickNext()
    setSlideIndex(prevSlideIndex => prevSlideIndex + 1)
    const listArray = document.querySelectorAll('#listing__slider .slick-slide')

    const newArr: any = []

    setNext(prevState => prevState + 1)
    const convertedArray = [...listArray].splice(next * 4, 4)

    convertedArray.forEach(el => {
      const h2Content = el.querySelector('h2')?.textContent

      if (h2Content && !list?.includes(h2Content)) {
        newArr.push(h2Content)
      }
    })

    dispatch(setSliderList([...list, ...newArr]))
  }

  console.log(list)

  return (
    <div {...Hm4SliderContentProps} className={`Hm4-slider-content ${className} w-full flex flex-col `}>
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
            slideIndex > 7
              ? ' hidden'
              : 'p-3.5 rounded-3xl text-[#00ADEE] bg-white rightArrowTranslate   hover:shadow-[0px_10px_30px_rgba(3,78,161,0.16)] hover:bg-[#00ADEE] hover:text-white  shadow-[0px_10px_30px_rgba(3,78,161,0.16)] absolute top-52 right-0 cursor-pointer'
          }>
          <BsArrowRight size={30} />
        </button>
      </div>

      {/* <Slider ref={sliderRef} {...sliderSettings} afterChange={(index) => setSlideIndex(index)}>
        {console.log(typeof cards)}
        {cards?.map((card, index) => (
          <Hm4Card key={index} {...card} />
        ))}
      </Slider> */}
      <Slider ref={sliderRef} {...sliderSettings} afterChange={index => setSlideIndex(index)}>
        {isLoading
          ? Array.from(new Array(6)).map((_, item) => <CardLoader key={item} />)
          : cardshow?.map((card: any, index: number) => {
              return (
                <>
                  <HomeCustomCard
                    key={index}
                    images={
                      card.details.images.slice(1, -1).split(',')
                      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
                      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
                      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
                      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
                      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
                    }
                    address={card.details.property_address}
                    property={card.details.product_name}
                    price={card.details.price}
                    district={card.details.property_city}
                    type={card.details.subcategory}
                    furnished={card.details.furnishing}
                    amenities={[card.details.bedroom, card.details.bathroom]}
                    squareFeet={card.details.floor_size}
                    distance={card.details.distance ? card.details.distance : '0'}
                    mrtStation={card.details.mrtStation ? card.details.mrtStation : '0'}
                    label={card.details.subcategory}
                    id={card.id}
                    bookingStatus={card.booking_status}
                    index={index}
                    totalCardShow={totalCardShow}
                  />
                </>
              )
            })}
      </Slider>
    </div>
  )
}
export default Hm4SliderContent
