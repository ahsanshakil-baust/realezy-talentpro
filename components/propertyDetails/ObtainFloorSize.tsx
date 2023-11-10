import { Button } from '@mui/material'
import { hideModal } from '../../store'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'

function ObtainFloorSize({ setIsSkiped }: any) {
  const dispatch = useDispatch<StoreThunkDispatch>()
  return (
    <div className="bg-inherit w-full flex flex-col max-h-[520px] 2xl:max-h-[700px]   overflow-auto rounded-b-[20px]">
      <div className=" w-full flex flex-col gap-4 px-[3.25rem] py-4">
        <p className=" font-roboto font-normal 2xl:text-[1rem]/[1.1875rem] text-[0.8rem]/[1rem] text-[#505050] tracking-[0.16px] ">
          Please Use SLA website to obtain the correct floor area of your Property{' '}
        </p>
        <div className=" w-full flex gap-2">
          <a href={'https://app.sla.gov.sg/MyProperty/'} target="_blank" rel="noreferrer">
            <Button
              variant={'outlined'}
              onClick={() => {
                dispatch(hideModal('Obtain Floor Size'))
              }}>
              Download
            </Button>
          </a>
          <Button
            variant="contained"
            onClick={() => {
              setIsSkiped(true)
              dispatch(hideModal('Obtain Floor Size'))
            }}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ObtainFloorSize
