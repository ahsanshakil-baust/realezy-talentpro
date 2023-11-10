import { hideModal } from '@/store'
import { StoreThunkDispatch } from '@/types'
import React from 'react'
import { useDispatch } from 'react-redux'

const MediumModalLayout = ({ modal }: any) => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const [hover, setHover] = React.useState(false)
  const handleMouseOver = () => {
    setHover(true)
  }
  const handleMouseOut = () => {
    setHover(false)
  }
  return (
    <div
      className="h-auto bg-[#f1f7ff] min-w-[1200px] max-w-[1280px] max-h-[660px] 2xl:max-h-[840px] pb-4 shadow-[0px_-5px_20px_#00000040] outline-none focus:outline-none "
      style={{
        position: 'absolute' as 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '900px',
        // height: '780px',
        // backgroundColor: 'white',
        borderRadius: '20px',
      }}>
      {modal.headingEnabled != false && (
        <div className=" bg-[#FFFFFF] shadow-[0px_2px_6px_#034EA11A]  rounded-t-[20px] px-[3.25rem] py-5  w-full flex items-center justify-between ">
          {modal.headingLeft ? (
            modal.headingLeft
          ) : (
            <h1 className="w-full capitalize text-left font-roboto font-medium tracking-[0.015rem] text-[1.5rem]/[1.8125rem] text-[#202020]">
              {modal.name.replace(/_/g, ' ')}
            </h1>
          )}

          {modal.headingRight ? (
            <div onClick={() => dispatch(hideModal(modal.name))}>{modal.headingRight}</div>
          ) : (
            <div
              className="w-10 h-10 cursor-pointer"
              onClick={() => dispatch(hideModal(modal.name))}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}>
              <img
                src={
                  !hover ? '/chat/chatProgressForm/FormCloseIcon.svg' : '/chat/chatProgressForm/FormCloseIconHover.svg'
                }
                alt="close"
                className="w-10 h-10"
              />
            </div>
          )}
        </div>
      )}
      {modal.children}
    </div>
  )
}

export default MediumModalLayout
