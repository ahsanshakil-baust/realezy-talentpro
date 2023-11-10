import React from 'react'
import { Modal } from '@mui/material' // IconButton
import { hideModal } from '@/store'
import { Modal as ModalType, StoreState } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import ModalLayouts from './ModalLayouts/ModalLayouts'
import { Box } from '@mui/material'
import { Button } from 'flowbite-react'
// import { Icon } from '@/components/shared'
// import { Button } from '@mui/material'
// import { doc } from '@firebase/firestore'

const PrimaryModalLayout = () => {
  const modalData = useSelector((state: StoreState) => state.entities.modals.list)
  const dispatch = useDispatch()

  return (
    <>
      {(() => {
        const arr: any = modalData.map((modal: ModalType) => {
          if (modal.open)
            return (
              <Modal
                //onClose={() => dispatch(hideModal(modal.name))}
                key={modal.name}
                open={modal.open}
                className={modal.className}
                disableScrollLock={true}>
                <ModalLayouts size={modal.size} modal={modal} />
              </Modal>
            )
        })
        return arr
      })()}
    </>
  )
}

export default PrimaryModalLayout
