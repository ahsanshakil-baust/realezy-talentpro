import { hideModal, showModal, useMultiFileUploadMutation, useUpdateUserProfileMutation } from '@/store'
import { StoreThunkDispatch } from '@/types'
import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { getIntroModalTitle } from './IntroVideo' // IntroVideo
import { toast } from 'react-toastify'
import Image from 'next/image'
import { route } from 'next/dist/server/router'
import { log } from 'console'
import { useRouter } from 'next/router'

type FileDropzoneProps = {
  // eslint-disable-next-line no-unused-vars
  onUpload?: (file: File) => void
}

type IntroVideoCancelProps = {
  modelTitle: string
}

type IntroVideoDeleteProps = {
  modelTitle: string
  refetchUserProfileDetails?: any,
}

type IntroVideoProps = {
  videoUrl?: string
  refetchUserProfileDetails?: any,
}

type IntroVideoUpdatedProps = {
}

const DISCARD_CHANGES = 'Discard Changes'
const DELETE_YOUR_INTRO_VIDEO = 'Delete Your Intro Video'

const FileDropzone = ({ onUpload }: FileDropzoneProps) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the accepted file (e.g., upload to a server, process, etc.)
    // console.log('Accepted File:', acceptedFiles[0])
    if (onUpload) onUpload(acceptedFiles[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const maxSize = 25 * 1024 * 1024 // 30 MB in bytes
  const minDuration = 15 // 15 seconds
  const maxDuration = 30 // 30 seconds

  const getVideoDuration = async (file: any) => {
    return new Promise(resolve => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        resolve(video.duration)
      }
      video.src = URL.createObjectURL(file)
    })
  }

  const onDropAccepted = useCallback(
    async acceptedFiles => {
      const validatedFiles = await Promise.all(
        acceptedFiles.map(async (file: any) => {
          const duration: any = await getVideoDuration(file)
          if (
            file.type.startsWith('video/') &&
            file.size <= maxSize &&
            duration >= minDuration &&
            duration <= maxDuration
          ) {
            return file
          }
          return null
        })
      )

      const filteredFiles = validatedFiles.filter(file => file !== null)

      if (filteredFiles.length > 0) {
        onDrop(filteredFiles)
      } else {
        toast.error(
          `Please upload a video file that is between ${minDuration} and ${maxDuration} seconds and less than 25MB.`
        )
      }
    },
    [onDrop, maxSize]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //onDrop,
    maxFiles: 1, // Allow only one file to be selected
    multiple: false, // Do not allow multiple files to be selected
    accept: {
      // Only allow video files to be selected
      'video/*': [],
    },
    //maxSize,
    onDropAccepted,
  })

  return (
    <div className="  w-full px-[3.25rem]">
      <div className="  file-dropzone-container">
        <div {...getRootProps()} className={`file-dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <div className="text-center">
              <Image src="/chat/chatProgressForm/uploadvdo.svg" width={150} height={150} alt="upload" />
              <h2 className="text- textValueColor text-xl font-medium mt-10 mb-4">
                Drag & Drop Video Or Click To Upload
              </h2>
              <p className="text-common text-lg">Supported formats : MP4, AVI, FLV, WMV to 25MB</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const IntroVideoCancel = ({ modelTitle }: IntroVideoCancelProps) => {
  const dispatch = useDispatch<StoreThunkDispatch>()

  const onDiscard = () => {
    dispatch(hideModal(DISCARD_CHANGES))
    dispatch(hideModal(modelTitle))
  }

  const onCancel = () => dispatch(hideModal(DISCARD_CHANGES))

  return (
    <div className="px-[3.25rem] py-5 w-full">
      <h2 className="text- textValueColor text-xl font-medium mt-5 mb-12">
        Are You Sure You Want To Discard Your Changes?
      </h2>
      <div className="flex justify-end gap-7 py-5">
        <Button onClick={onCancel} color="error" size="large" className="!px-10">
          Cancel
        </Button>
        <Button onClick={onDiscard} variant="contained" color="secondary" size="large" className="!px-10">
          Discard
        </Button>
      </div>
    </div>
  )
}


const IntroVideoUpdated = () => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const router = useRouter()

  const onViewVideo = () => dispatch(hideModal("Back to Progress"))
  const onBackToProgress = () => {
    dispatch(hideModal("Back to Progress"))
    if (router?.query?.compleIv) {
      router.push('/conversation')
      return
    }

  }

  return (
    <div className="px-[3.25rem] py-5 w-full">
      <h2 className="text- textValueColor text-xl font-medium mt-5 mb-12">
        You add the intro video, Back to progress and make rental proposal.
      </h2>
      <div className="flex justify-end gap-7 py-5">
        <Button onClick={onViewVideo} variant="contained" color="secondary" size="large" className="!px-10">
          View Video
        </Button>

        <Button onClick={onBackToProgress} variant="contained" color="secondary" size="large" className="!px-10">
          Back To Progress
        </Button>
      </div>
    </div>
  )
}



const IntroVideoDelete = ({ modelTitle, refetchUserProfileDetails }: IntroVideoDeleteProps) => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const { data: session }: any = useSession()
  const [updateUserInfo, { isLoading: userIsLoading }] = useUpdateUserProfileMutation()

  const onDelete = async () => {
    const userInfoPayload = {
      userId: session.user.id,
      data: {
        video_url: '',
      },
    }
    const { data: response }: any = await updateUserInfo(userInfoPayload)
    if (response.status === 200) {
      refetchUserProfileDetails()
      dispatch(hideModal(DELETE_YOUR_INTRO_VIDEO))
      dispatch(hideModal(modelTitle))
    }
  }

  const onCancel = () => dispatch(hideModal(DELETE_YOUR_INTRO_VIDEO))

  return (
    <div className="">
      <h2 className="text- textValueColor text-xl font-medium mt-5 mb-12 ml-12">
        Are You Sure You Want To Delete Your Intro Video?
      </h2>
      <div className="flex justify-end gap-7 py-5">
        <Button onClick={onDelete} disabled={userIsLoading} color="error" size="large" className="!px-10">
          Delete
        </Button>
        <Button
          onClick={onCancel}
          disabled={userIsLoading}
          variant="contained"
          color="secondary"
          size="large"
          className="!px-10 mr-5">
          Cancel
        </Button>
      </div>
    </div>
  )
}

const IntroVideoModal = ({ videoUrl, refetchUserProfileDetails }: IntroVideoProps) => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const router = useRouter()
  const { data: session }: any = useSession()
  const [uploadFiles, { isLoading: uploadFilesIsLoading }] = useMultiFileUploadMutation()
  const [updateUserInfo, { isLoading: userIsLoading }] = useUpdateUserProfileMutation()
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | undefined>(videoUrl)

  const modelTitle = getIntroModalTitle(videoUrl)

  const onUpload = (file: File) => setFile(file)

  const onSave = async () => {
    if (!file) return
    const filePayload = new FormData()
    filePayload.append('media[0]', file)
    const { data: responseData }: any = await uploadFiles(filePayload)
    if (responseData.status === 'success') {
      const url = responseData.url[0]
      const userInfoPayload = {
        userId: session.user.id,
        data: {
          video_url: url,
        },
      }
      const { data: response }: any = await updateUserInfo(userInfoPayload)
      if (response.status === 200) {
        refetchUserProfileDetails()
        dispatch(hideModal(modelTitle))

        if (router?.query?.compleIv) {
          dispatch(
            showModal({
              name: "Back to Progress",
              open: true,
              children: <IntroVideoUpdated />,
            })
          )
        }

      }
    }
  }

  const onChange = () => setFileUrl(undefined)

  const onCancel = () =>
    dispatch(
      showModal({
        name: DISCARD_CHANGES,
        open: true,
        children: <IntroVideoCancel modelTitle={modelTitle} />,
      })
    )

  const onDelete = () =>
    dispatch(
      showModal({
        name: DELETE_YOUR_INTRO_VIDEO,
        open: true,
        children: <IntroVideoDelete modelTitle={modelTitle} refetchUserProfileDetails={refetchUserProfileDetails} />,
      })
    )

  if (fileUrl)
    return (
      <div className="w-full h-auto lg:h-[400px] object-contain">
        <video src={videoUrl} controls className="w-full h-auto lg:h-[300px] mt-8 rounded-2xl" />
        <div className="flex gap-7 justify-center py-8">
          <Button onClick={onDelete} variant="contained" color="error" size="large" className="!px-10">
            Delete Video
          </Button>
          <Button onClick={onChange} variant="contained" color="secondary" size="large" className="!px-10">
            Change Video
          </Button>
        </div>
      </div>
    )

  return (
    <div>
      {!file ? (
        <FileDropzone onUpload={onUpload} />
      ) : (
        <div className="w-full h-auto lg:h-[400px] object-contain">
          <video src={URL.createObjectURL(file)} controls className="w-full h-auto lg:h-[300px] mt-8 rounded-2xl" />
          <div className="flex gap-7 justify-center py-8">
            <Button
              onClick={onCancel}
              disabled={uploadFilesIsLoading || userIsLoading}
              variant="contained"
              color="error"
              size="large"
              className="!px-10">
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={uploadFilesIsLoading || userIsLoading}
              variant="contained"
              color="secondary"
              size="large"
              className="!px-10">
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default IntroVideoModal
