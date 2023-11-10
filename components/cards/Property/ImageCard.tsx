// import Image from 'next/image'
// import { useState } from 'react'
import Link from 'next/link'
interface CustomImageCardProps {
  images: string
  label: string
  desc: string
}

const ImageCard = ({ images, label, desc }: CustomImageCardProps) => {
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
    // <div className="bg-white rounded-lg shadow-md flex flex-col mb-5 w-full ">
    //   <div className="relative w-full">
    //     <div className="absolute top-3 left-4 flex flex-col px-5 py-1.5 rounded z-10 ">
    //       <span className="font-bold text-lg tracking-[0.8px] uppercase text-[#FFFFFF]">{label}</span>
    //       <span className=" font-normal text-xs text-[#FFFFFF] tracking-[0.2px]">{desc}</span>
    //     </div>
    //     <button className="absolute bottom-8 right-8 z-10 bg-transparent p-0 cursor-pointer">
    //       <img src="download/right (1).png" className="w-[60px] h-[60px] " />
    //     </button>
    //     <div className='w-50'>
    //     <img className="object-cover  " src={images} alt="img" />

    //     </div>
    //   </div>
    // </div>
    <div className="relative rounded-xl w-full h-[182px] lg:h-[227px] xl:h-[255px] 2xl:h-[340px]  backdrop-blur-[2px] shadow-[0px_10px_20px_rgba(12.16%, 16.08%, 21.57%, 10.2%)] ">
      <img
        className="rounded-xl w-full h-full object-cover"
        src={images ? images : './NoImageProperty.jpg'}
        alt="img"
      />
      <div className=" rounded-xl absolute top-0 left-0 w-full h-full bg-black/25" />

      <div className="absolute top-[20px] left-[32px] lg:top-[26px] lg:left-[40px] xl:top-[30px] xl:left-[45px] 2xl:top-10 2xl:left-[60px] flex flex-col px-5 py-1.5 rounded z-10 ">
        <span className="font-bold font-roboto text-xl lg:text-[26.5px] lg:leading-8 xl:text-3xl 2xl:text-[40px] 2xl:leading-[70px] tracking-[0.3px] xl:tracking-[0.6px] 2xl:tracking-[0.8px] capitalize text-[#FFFFFF] text-left">
          {label}
        </span>
        <span className=" font-normal font-roboto  text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[20px] text-[#FFFFFF] tracking-[0.2px] text-left capitalize">
          {desc}
        </span>
      </div>
      <Link passHref href="/filter">
        <button className="absolute bottom-4 right-7 lg:bottom-[21px] lg:right-9 xl:bottom-6 xl:right-10 2xl:bottom-8 2xl:right-[54px] z-10 bg-transparent p-0 cursor-pointer">
          <img
            alt="no-image"
            src="download/right (1).png"
            className="  w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] xl:w-[45px] xl:h-[45px] 2xl:w-[60px] 2xl:h-[60px] "
          />
        </button>
      </Link>
    </div>
  )
}

export default ImageCard
