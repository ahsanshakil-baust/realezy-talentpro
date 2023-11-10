// import { Icon, ImageDisplay } from '@/components/shared'
// import Image from 'next/image'
import { useState } from 'react'
// import Train from '@/public/Icon/train.png'
import DetailPageEmbla from './DetailPageEmbla'
import { EmblaOptionsType } from 'embla-carousel-react'

interface CustomDpCarouselProps {
  bookingStatus: string
  images: string[]
}

// const OPTIONS: EmblaOptionsType = { loop: true }
// const SLIDE_COUNT = 5
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const CustomDpCarousel = ({ bookingStatus, images }: CustomDpCarouselProps) => {
  const OPTIONS: EmblaOptionsType = { loop: true }
  // const SLIDE_COUNT = images.length
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  // const [currentImage, setCurrentImage] = useState(0)

  // const handleNextImage = () => {
  //   if (currentImage === images.length - 1) {
  //     setCurrentImage(0)
  //   } else {
  //     setCurrentImage(currentImage + 1)
  //   }
  // }

  // const handlePrevImage = () => {
  //   if (currentImage === 0) {
  //     setCurrentImage(images.length - 1)
  //   } else {
  //     setCurrentImage(currentImage - 1)
  //   }
  // }

  return (
    <div className=" w-full relative overflow-hidden ">
      <DetailPageEmbla bookingStatus={bookingStatus} slides={images} options={OPTIONS} />
    </div>
  )
}

export default CustomDpCarousel
