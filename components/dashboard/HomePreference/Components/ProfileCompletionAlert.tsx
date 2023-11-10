import { Button } from '@mui/material'
import { hideModal, showModal } from '../../../../store'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'

import { customFormStyle } from '../../../../util/customFormStyle'
import { ButtonStyles } from '../Styles'
import Warning from '../images/warning.png'
import Image from 'next/image'
import { useRouter } from 'next/router'

function ProfileCompletionAlert({ setProfileCompletionAlart }: any) {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const router = useRouter()

  const handleProfileCompletion = () => {
    dispatch(hideModal('Profile Completion Alert'))
    router.push('personal-info/?hp=true')
  }

  return (
    // <div className=" rounded-lg flex flex-col justify-evenly w-2/5 bg-white shadow-lg">
    <div className=" flex flex-col pl-12 pr-16 pt-12 pb-10 gap-14">
      <div className=" flex flex-col">
        <div className=" flex flex-row items-center gap-6">
          <Image src={Warning} alt="" height={50} width={50} />
          <p className=" text-[#EEA840] text-2xl font-medium">Profile Completion Alert !</p>
        </div>
        <p className=" pt-7 pb-5 text-base text-justify">
          You did not complete your profile's required fields. This is important to calculate your credit score. Based
          on the credit score you can enjoy the zero deposit service. Required field of credit scoring..
        </p>
        <p className=" text-[#EEA840] text-lg font-medium text-justify">
          Salary (All Occupants), Outstanding Loans, Gender, Local/Foreigner, Marital Status, Education Level, Age
          Ratio.
        </p>
      </div>
      <div className=" w-full flex flex-row justify-end gap-5">
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            dispatch(hideModal('Profile Completion Alert'))
            setProfileCompletionAlart(false)
          }}
          sx={{ ...ButtonStyles.resetButton }}
          className=" hover:cursor-pointer !rounded-[10px] !px-2 !py-1.5 !text-[#505050] !border-[#505050] !text-22 !font-normal !font-roboto !capitalize !shadow-none">
          Later
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ ...ButtonStyles.publishButton, width: '248px !important' }}
          onClick={handleProfileCompletion}
          className="!rounded-[10px] !px-2 !py-1.5 !text-[#FFFFFF] bg-[#00adee] !text-22 !font-normal !font-roboto !capitalize !shadow-none">
          Complete Profile
        </Button>
      </div>
    </div>
  )
}

export default ProfileCompletionAlert
