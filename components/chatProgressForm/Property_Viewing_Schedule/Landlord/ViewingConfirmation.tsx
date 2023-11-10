import { hideModal, showModal } from '@/store'
import { StoreThunkDispatch } from '@/types'
import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import CreateSchedule from './CreateSchedule'
import { PROPERTY_VIEWING, PROPERTY_VIEWING_SCHEDULE_CREATE } from '@/store/chatProgress/progress/constant'

const ViewingConfirmation = () => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  return (
    <div className=" w-full max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto gap-4 ">
      <p className="font-normal font-roboto text-[1.25rem]/[1.5rem] tracking-[0.025rem] text-[#202020]">
        Are you sure want to create the House Viewing Schedule?
      </p>
      <div className="flex justify-end gap-2 mt-8">
        <Button
          variant="contained"
          onClick={() => {
            dispatch(hideModal('House_Viewing'))
            dispatch(
              showModal({
                open: true,
                name: PROPERTY_VIEWING_SCHEDULE_CREATE,
                children: (
                  <CreateSchedule
                    ctxType={PROPERTY_VIEWING_SCHEDULE_CREATE}
                    createType={PROPERTY_VIEWING}
                    mutateType="add"
                  />
                ),
                className: '',
              })
            )
          }}>
          Yes
        </Button>
        <Button variant="contained" onClick={() => dispatch(hideModal('House_Viewing'))}>
          No
        </Button>
      </div>
    </div>
  )
}

export default ViewingConfirmation
