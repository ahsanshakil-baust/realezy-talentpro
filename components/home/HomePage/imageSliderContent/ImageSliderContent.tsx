import { useState, useRef } from 'react'
import Slider, { Settings } from 'react-slick'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ImageCard from '@/components/cards/Property/ImageCard'

export interface IImageCardProps {
  images: string
  label: string
  desc: string
}

export interface IImageSliderContentProps extends React.ComponentPropsWithoutRef<'div'> {
  //cards: IProdCardProps[]
  imgCards: IImageCardProps[]
}

const ImageSliderContent: React.FC<IImageSliderContentProps> = ({
  className,
  imgCards,
  ...IImageSliderContentProps
}) => {
  const sliderRef = useRef<Slider>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const sliderSettings: Settings = {
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,

    responsive: [
      {
        breakpoint: 1640,
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
    if (slideIndex === imgCards.length - 1) {
      return
    }

    sliderRef.current?.slickNext()
    setSlideIndex(prevSlideIndex => prevSlideIndex + 1)
  }

  const [isLeftHover, setIsLeftHover] = useState(false)
  const [isRightHover, setIsRightHover] = useState(false)

  return (
    <div {...IImageSliderContentProps} className={`prod-slider-content ${className} w-full flex flex-col h-auto `}>
      <div className="w-full flex items-center justify-between mb-3 lg:mb-5 xl:mb-6 2xl:mb-8">
        <div className="w-[50%]">
          <h3 className="hidden text-[#00ADEE] text-[16px] lg:text-[20px] xl:text-[22.5px] 2xl:text-[30px] tracking-[0.6px] text-left font-normal capitalize font-roboto">
            Quickly Find Property
          </h3>
          <h1 className="w-[100%] text-[#00ADEE] mobile-home-title lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] text-left font-roboto font-bold  xl:tracking-[0.6px] 2xl:tracking-[0.8px]  ">
            Browse
          </h1>
        </div>
        <div className="w-[50%] controls items-center justify-end flex   gap-3 ">
          <div
            onClick={previousSlide}
            onMouseEnter={() => setIsLeftHover(true)}
            onMouseLeave={() => setIsLeftHover(false)}
            className="   cursor-pointer   ">
            {isLeftHover ? (
              <img
                src="/download/rightFill.svg"
                className="w-8 h-8 md:w-12 md:h-12 2xl:w-[60px] 2xl:h-[60px]"
                style={{ rotate: '180deg' }}
              />
            ) : (
              <img src="/download/right.svg" className="w-8 h-8 md:w-12 md:h-12 2xl:w-[60px] 2xl:h-[60px]" />
            )}
          </div>
          <div
            onClick={nextSlide}
            onMouseEnter={() => setIsRightHover(true)}
            onMouseLeave={() => setIsRightHover(false)}
            className="   cursor-pointer   ">
            {isRightHover ? (
              <img src="/download/rightFill.svg" className="w-8 h-8 md:w-12 md:h-12 2xl:w-[60px] 2xl:h-[60px]" />
            ) : (
              <img
                src="/download/right.svg"
                style={{ rotate: '180deg' }}
                className="w-8 h-8 md:w-12 md:h-12 2xl:w-[60px] 2xl:h-[60px]"
              />
            )}
          </div>
        </div>
      </div>

      {/* <Slider ref={sliderRef} {...sliderSettings} afterChange={(index) => setSlideIndex(index)}>
        {console.log(typeof cards)}
        {cards?.map((card, index) => (
          <ProdCard key={index} {...card} />
        ))}
      </Slider> */}
      <Slider ref={sliderRef} {...sliderSettings} afterChange={index => setSlideIndex(index)}>
        {/* {console.log(typeof imgCards)} */}
        {imgCards?.map((imgCard, index) => (
          <ImageCard key={index} images={imgCard.images} label={imgCard.label} desc={imgCard.desc} />
        ))}
      </Slider>
    </div>
  )
}
export default ImageSliderContent
