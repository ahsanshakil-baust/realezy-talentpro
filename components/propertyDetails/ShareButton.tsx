import { Button } from '@mui/material'
import React, { useState } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa' // FaShareAlt,
import { Icon } from '../shared'

const ShareButton = ({ url, title }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(shareUrl, '_blank')
  }

  const shareOnInstagram = () => {
    const shareUrl = `https://www.instagram.com/sharer/sharer.php?u=${url}`
    window.open(shareUrl, '_blank')
  }

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button className=" !bg-[#F1F7FF] !border-2 !border-solid !border-[#00ADEE] !rounded-[10px]" variant="outlined">
        <Icon className="  !w-5 !h-4 lg:!w-6 lg:!h-5 !mr-2 !text-[#00ADEE]" name="share" /> Share
      </Button>

      {isHovered && (
        <div className="absolute w-28 -top-6 -right-28 ease-in-out duration-[30ms]  z-10 ">
          <div className="w-full flex flex-col    gap-6  items-end justify-end ">
            <button
              onClick={shareOnFacebook}
              className=" bg-[#00ADEE] cursor-pointer mr-4 w-10 h-10  flex justify-center items-center text-white rounded-full">
              <FaFacebook className=" w-10 h-9  text-white rounded-full" />
            </button>
            {/* </div> */}
            {/* <div className="w-full"> */}
            <button
              onClick={shareOnInstagram}
              className=" bg-[#00ADEE] cursor-pointer mr-4 w-10 h-10  flex justify-center items-center text-white rounded-full">
              <FaInstagram className=" w-9 h-9  " />
            </button>
          </div>
          {/* <div className="w-full flex justify-center" style={{ marginLeft: '0px ' }}>
            <button
              onClick={shareOnLinkedIn}
              className="w-[35px] h-[35px]  bg-blue-600 flex justify-center items-center text-white rounded-full">
              <FaLinkedin />
            </button>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default ShareButton
