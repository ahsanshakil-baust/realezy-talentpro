import { Clapperboard } from '@/components/shared'
import { showModal } from '@/store'
import { StoreState, StoreThunkDispatch } from '@/types'
import { isTenant } from '@/util'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import IntroVideoModal from './IntroVideoModal'
import { useRouter } from 'next/router'

type IntroVideoProps = {
  videoUrl?: string,
  refetchUserProfileDetails?: any,
}

const UPLOAD_YOUR_INTRO_VIDEO = 'Upload Your Intro Video'
const YOUR_INTRO_VIDEO = 'Your Intro Video'

export const getIntroModalTitle = (videoUrl?: string) => (videoUrl ? YOUR_INTRO_VIDEO : UPLOAD_YOUR_INTRO_VIDEO)

const IntroVideo = ({ videoUrl, refetchUserProfileDetails }: IntroVideoProps) => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const router = useRouter()

  const { type } = useSelector((state: StoreState) => state.entities.user)

  const handleClick = () =>
    dispatch(
      showModal({
        name: getIntroModalTitle(videoUrl),
        children: <IntroVideoModal refetchUserProfileDetails={refetchUserProfileDetails} videoUrl={videoUrl} />,
        open: true,
      })
    )



  if (!isTenant(type)) return null

  return (
    <div>
      <Button
        id="ttIntroVideo"
        onClick={handleClick}
        color="secondary"
        variant="outlined"
        className="!intro-video-button"
        startIcon={<Clapperboard className="path-fill-current" />}>
        {videoUrl ? 'Intro Video' : 'Add Intro Video'}
      </Button>
    </div>
  )
}
export default IntroVideo
