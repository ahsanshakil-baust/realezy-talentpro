import React from 'react'

interface ImageDisplayProps {
  imageUrl: string
  altText: string
  userName: string
  className: string
  activity?: string
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, altText, userName, className, activity }) => {
  return (
    <div className="flex justify-center gap-3 items-center">
      <img className=" w-6 h-6 sm:w-8 sm:h-8 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-full outline outline-2 outline-primary" src={imageUrl} alt={altText} />
      <div>
        <p className={className}>{userName}</p>
        {activity && <p className="text-[12px] font-medium text-secondary">{activity}</p>}
      </div>
    </div>
  )
}
