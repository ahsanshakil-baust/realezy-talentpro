import { Button } from '@mui/material'
import { hideModal, showModal } from '../../store'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'

import { customFormStyle } from '../../util/customFormStyle'

function PoiWarning({ handlePoiWarningButton, setSkipPoiWarning, setPoiWarning }: any) {
  const dispatch = useDispatch<StoreThunkDispatch>()
  return (
    // <div className=" rounded-lg flex flex-col justify-evenly w-2/5 bg-white shadow-lg">
    <div className=" bg-inherit w-full p-3 flex flex-col items-center gap-8 max-h-[520px] 2xl:max-h-[700px]  overflow-auto rounded-b-[20px]">
      <p className=" text-left pl-10 w-full">
        Your property has been uploaded without the proof of property ownership. Please upload the document for
        verifying and publishing the property
      </p>
      <div className=" w-full flex justify-evenly">
        <Button
          type="button"
          variant="contained"
          sx={customFormStyle.sx_publish_button}
          onClick={handlePoiWarningButton}
          className="!rounded-[10px] !px-2 !py-1.5 !text-[#FFFFFF] bg-[#00adee] !text-sm !font-normal !font-roboto !capitalize !shadow-none">
          Upload POI
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            dispatch(hideModal('POI Update Warning'))
            setSkipPoiWarning(true)
            setPoiWarning(false)
          }}
          sx={customFormStyle.sx_publish_button}
          className=" hover:cursor-pointer !rounded-[10px] !px-2 !py-1.5 !text-[#FFFFFF] !text-sm !font-normal !font-roboto !capitalize !shadow-none">
          Skip Now
        </Button>
      </div>
    </div>
  )
}

export default PoiWarning
