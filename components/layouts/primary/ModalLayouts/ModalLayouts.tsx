import React from 'react'
import SmallModalLayout from './SmallModalLayout'
import MediumModalLayout from './MediumModalLayout'
import LargeModalLayout from './LargeModalLayout'

const ModalLayouts = ({ size, modal }: any) => {
  if (size === 'large') {
    return <LargeModalLayout modal={modal} />
  } else if (size === 'medium') {
    return <MediumModalLayout modal={modal} />
  } else {
    return <SmallModalLayout modal={modal} />
  }
}

export default ModalLayouts
