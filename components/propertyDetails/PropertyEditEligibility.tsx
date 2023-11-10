import { Button } from '@mui/material'
import { hideModal } from '../../store'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'

function PropertyEditEligibility() {
  const dispatch = useDispatch<StoreThunkDispatch>()
  return (
    <div className=" bg-inherit w-full p-3 flex flex-col items-center gap-8 max-h-[520px] 2xl:max-h-[700px]  overflow-auto rounded-b-[20px]">
      <p className=" text-left pl-10 w-full">You are not eligible to edit the property. Please contact with CSO.</p>
    </div>
  )
}

export default PropertyEditEligibility
