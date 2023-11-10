import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { flushSync } from 'react-dom'
// import ImageByIndex from './ImageByIndex'
import { Icon } from '@/components/shared'
// import { DotButton, PrevButton, NextButton } from './DetailEmblaArrow'

const TWEEN_FACTOR = 0.8

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max)

type PropType = {
  bookingStatus: string
  slides: String[]
  options?: EmblaOptionsType
}

const DetailPageEmbla: React.FC<PropType> = props => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const [tweenValues, setTweenValues] = useState<number[]>([])

  const onScroll = useCallback(() => {
    if (!emblaApi) return

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      if (!emblaApi.slidesInView().includes(index)) return 0
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach(loopItem => {
          const target = loopItem.target().get()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
      return numberWithinRange(tweenValue, 0, 1)
    })
    setTweenValues(styles)
  }, [emblaApi, setTweenValues])

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
    onScroll()
    emblaApi.on('scroll', () => {
      flushSync(() => onScroll())
    })
    emblaApi.on('reInit', onScroll)
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect, onScroll])

  // useEffect(() => {
  //   if (!emblaApi) return

  //   onScroll()
  //   emblaApi.on('scroll', () => {
  //     flushSync(() => onScroll())
  //   })
  //   emblaApi.on('reInit', onScroll)
  // }, [emblaApi, onScroll])

  return (
    <div className="relative">
      <div className="detail_embla">
        <div className="detail_embla__viewport" ref={emblaRef}>
          <div className="detail_embla__container">
            {slides.map((slide: any, index: number) => (
              <div
                className="detail_embla__slide"
                key={index}
                style={{
                  ...(tweenValues.length && { opacity: tweenValues[index] }),
                }}>
                {/* .........Reserved with shadow............ */}

                <div className=" relative flex flex-col justify-center items-center">
                  {props?.bookingStatus == 'reserve' && (
                    <div className=" absolute flex flex-col justify-center items-center w-full h-full opacity-40 bg-black z-10">
                      <div
                        style={{ transform: 'rotate(-20deg)' }}
                        className=" inline-block text-center text-8xl border-white text-white rounded-lg bg-transparent font-semibold font-roboto opacity-90 tracking-wider py-3 px-4">
                        RESERVED
                      </div>
                    </div>
                  )}

                  {/* ..........Reserved with shadow ........*/}

                  {slide.includes('jpg') || slide.includes('jpeg') || slide.includes('png') ? (
                    <img className="detail_embla__slide__img " src={slide} alt="Your alt text" />
                  ) : (
                    <video
                      id={index.toString()}
                      autoPlay
                      muted
                      className=" w-full h-[500px] object-cover"
                      src={slide}></video>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-2 md:right-12 xl:right-20 flex text-center gap-3 px-3 md:px-5 py-1.5 rounded z-10 bg-gradient-to-r from-white/90 to-white/20 bg-blur">
        <Icon name="picture" className=" w-6 h-4 md:w-8 md:h-6 text-white" />

        <span className="text-white text-sm md:text-base lg:text-lg xl:text-xl">{slides.length}</span>
      </div>
      <div className=" w-full h-16 z-10 pl-2 pr-2 md:pl-8 md:pr-8 xl:pl-[80px] xl:pr-[80px] absolute flex items-center justify-between top-[45%]  cursor-pointer   ">
        {/* <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} /> */}
        <button onClick={scrollPrev} className=" bg-transparent rightArrowTranslate" style={{ rotate: '180deg' }}>
          <img alt="no-image" src="/download/left(1).svg" className=" w-[60px] h-[60px]" />
        </button>

        <button onClick={scrollNext} className=" bg-transparent rightArrowTranslate">
          <img alt="no-image" src="/download/right(1).svg" className=" w-[60px] h-[60px]" />
        </button>
      </div>
    </div>
  )
}

export default DetailPageEmbla
