// import Link from 'next/link'
import React, { useState } from 'react'
const ReadMore = ({ children }:any) => {
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <p className="text-[#505050] font-normal font-roboto text-base md:text-lg xl:text-xl">
      {isReadMore ? text.slice(0, 550) : text}
      <span onClick={toggleReadMore} className="hidden md:inline text-[#01ACF0] capitalize font-medium font-roboto text-base md:text-lg xl:text-xl">
        {isReadMore ?  'show more' : 'show less'}
      </span>
    </p>
  )
}
const PropertyDescription = () => {
  return (
    <div className="hidden">
      <h2 className=" text-lg sm:text-xl md:text-2xl xl:text-3xl text-[#202020] font-roboto font-bold pb-4">
        Description
      </h2>

      <ReadMore >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. &nbsp;
      </ReadMore>
    </div>
  )
}

export default PropertyDescription
