import { Icon, ReserveLogo } from '@/components/shared'
import classNames from 'classnames'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import { DotButton } from './EmblaCarouselDot'
import { useRouter } from 'next/router'

import NoImage from '@/public/NoImageProperty.jpg'

type PropType = {
  slides: any[]
  options?: EmblaOptionsType
  className?: string
  tourId?: any
  bookingStatus?: string
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options, className, tourId, bookingStatus }) => {
  // console.log('bookingStatus....', bookingStatus)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  const { pathname } = useRouter()

  return (
    <div className={classNames('relative', className)} id={`${tourId == '0' && 'searchPropertyImg'}`}>
      <div className={` ${pathname === '/filter' || pathname === '/dashboard/my-properties'  ? 'embla_filter' : 'embla'}`}>
        <div className={` ${pathname === '/filter' || pathname === '/dashboard/my-properties' ? 'embla_viewport_filter' : 'embla__viewport'}`} ref={emblaRef}>
          <div className={` ${pathname === '/filter' || pathname === '/dashboard/my-properties' ? 'embla_container_filter' : 'embla__container'}`}>
            {slides.map((slide, index) => (
              <div className={` ${pathname === '/filter' || pathname === '/dashboard/my-properties' ? 'embla_slide_filter' : 'embla__slide'}`} key={index}>
                {/* <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div> */}
                {/* {slide.includes('jpg') || slide.includes('jpeg') || slide.includes('png') || slide.includes('webp') || slide.includes('258434') ? (
                  <img
                    className={` ${pathname === '/filter' ? 'embla_slide_img_filter' : 'embla__slide__img'}`}
                    src={slide}
                    alt={`slide-${index}`}
                  />
                ) : (
                  <img
                    className={` ${pathname === '/filter' ? 'embla_slide_img_filter' : 'embla__slide__img'}`}
                    src={NoImage.src}
                    alt="Your alt text"
                  />
                )} */}

                <div className=" relative flex flex-col justify-center items-center">
                  {bookingStatus == 'reserve' && (
                    <div
                      className={` ${
                        pathname === '/filter' ? 'rounded-[10px]' : 'rounded-[10px]'
                      } absolute flex flex-col justify-center items-center w-full h-full opacity-70 bg-black z-10 `}>
                      {/* <div
                      // style={{ transform: 'rotate(-25deg)' }}
                      // className=" inline-block text-center border-[3px] text-2xl border-white text-white rounded-lg bg-transparent font-semibold font-serif py-2 px-4"
                      > */}
                      {/* RESERVED */}
                      <ReserveLogo width={'80%'} />
                      {/* </div> */}
                    </div>
                  )}
                  {slide.includes('mp4') ||
                  slide.includes('mkv') ||
                  slide.includes('webm') ||
                  slide.includes('mov') ||
                  slide.includes('avi') ||
                  slide.includes('wmv') ||
                  slide.includes('flv') ||
                  slide.includes('3gp') ||
                  slide.includes('gif') ? (
                    <video
                      id={index.toString()}
                      autoPlay
                      muted
                      className={` ${
                        pathname === '/filter'
                          ? 'embla_slide_img_filter cardImgHover'
                          : 'embla__slide__img cardImgHover'
                      }`}
                      src={slide === '' ? NoImage.src : slide}></video>
                  ) : (
                    // <img
                    //   className={` ${pathname === '/filter' ? 'embla_slide_img_filter' : 'embla__slide__img'}`}
                    //   src={NoImage.src}
                    //   alt="Your alt text"
                    // />
                    <img
                      className={` ${
                        pathname === '/filter' || pathname === '/dashboard/my-properties'
                          ? 'embla_slide_img_filter cardImgHover'
                          : 'embla__slide__img cardImgHover'
                      } `}
                      src={slide === '' ? NoImage.src : slide}
                      alt={`slide-${index}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
      </div>
      <div className="absolute bottom-3 left-4 flex gap-3 ">
        <Icon name="picture" className="w-6 h-6 text-white" />
        <span className="text-white">{slides.length}</span>
      </div>
      {pathname === '/dashboard/my-properties' && slides.length > 1 && (
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EmblaCarousel
