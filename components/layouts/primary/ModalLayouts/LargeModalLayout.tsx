import { hideModal } from '@/store'
import { StoreThunkDispatch } from '@/types'
import React from 'react'
import { useDispatch } from 'react-redux'

const LargeModalLayout = ({ modal }: any) => {
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
      className=" modal-custom-scrollbar bg-[#f1f7ff]  min-w-[1280px] xl:min-w-[1360px] 2xl:min-w-[1808px] max-h-[540px] xl:max-h-[620px] 2xl:max-h-[800px] shadow-[0px_-5px_20px_#00000040] outline-none focus:outline-none"
      style={{
        position: 'absolute' as 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '900px',
        // height: '780px',
        // backgroundColor: 'white',
        borderRadius: '20px',
        overflowY: 'auto',
      }}>
      {modal.headingEnabled != false && (
        <div
          style={{ position: 'sticky', top: 0, zIndex: 999 }}
          className=" bg-[#FFFFFF] shadow-[0px_2px_6px_#034EA11A]  rounded-t-[20px] px-[3.25rem] py-5  w-full flex items-center justify-between ">
          {modal.headingLeft ? (
            modal.headingLeft
          ) : (
            <h1 className=" w-full capitalize text-left font-roboto font-medium tracking-[0.015rem] text-[1.5rem]/[1.8125rem] text-[#202020]">
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

export default LargeModalLayout
