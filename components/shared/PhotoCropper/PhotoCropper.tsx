import { useState, useRef } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
// import { RxCrossCircled } from 'react-icons/rx'

import { Button, Grid, Typography, Dialog, DialogContent, DialogActions } from '@mui/material'
import 'react-image-crop/dist/ReactCrop.css'
import { Icon } from '../Icon'
interface LogoCropperProps {
  onCropComplete: (_: string) => void
  className: string
  title: string
}

const PhotoCropper: React.FC<LogoCropperProps> = ({ onCropComplete, title, className }: any) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // const [isLoading, setIsLoading] = useState(false)
  // const [completedCrop, setCompletedCrop] = useState<string>()
  const [crop, setCrop] = useState<Crop>()
  const [imgSrc, setImgSrc] = useState<string>('')

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCropClose = () => {
    setOpen(false)
  }

  const handleLoad = () => {
    inputRef.current?.click()
  }

  const handleClose = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    // setIsLoading(false)
    // setShow(false)
    setImgSrc('')
    setCrop(undefined)
    // setCompletedCrop(undefined)
  }

  //   const handleShow = () => setShow(true)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
      handleClickOpen()
    }
  }

  const onImageLoad = (image: any) => {
    const { width, height } = image
    const defaultCrop = makeDefaultCrop(width, height)
    setCrop(defaultCrop)
  }

  const makeDefaultCrop = (width: number, height: number): Crop => {
    const size = Math.min(width, height)
    const x = (width - size) / 2
    const y = (height - size) / 2
    return {
      unit: 'px',
      //   aspect: 1,
      width: size,
      height: size,
      x,
      y,
    }
  }

  const makeClientCrop = async (crop: Crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop, 'newFile.jpeg')
      // setCompletedCrop(croppedImageUrl)
      onCropComplete(croppedImageUrl)
    }
  }

  const getCroppedImg = async (image: HTMLImageElement, crop: Crop, _: string): Promise<string> => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width || 0
    canvas.height = crop.height || 0
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(
        image,
        (crop.x || 0) * scaleX,
        (crop.y || 0) * scaleY,
        (crop.width || 0) * scaleX,
        (crop.height || 0) * scaleY,
        0,
        0,
        crop.width || 0,
        crop.height || 0
      )
    }

    return canvas.toDataURL('image/png')
  }

  // const handelSubmit = () => {
  //   // Handle submit logic if needed
  // }

  const onCropChange = (crop: Crop) => setCrop(crop)

  //   useEffect(() => {
  //     handleLoad()
  //   }, [])

  return (
    <Grid container>
      <Grid item xs={8}>
        <div>
          <input type="file" id="formFile" value="" onChange={handleFile} ref={inputRef} style={{ display: 'none' }} />

          <Dialog
            open={open}
            onClose={handleCropClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <div className="flex items-center justify-between pt-5 px-5">
              <Typography variant="h6">Update Profile Photo</Typography>
              <button
                type="button"
                className="text-red-500 text-3xl bg-transparent cursor-pointer"
                onClick={handleCropClose}>
                <Icon name="cross" />
              </button>
            </div>
            <DialogContent className="!px-10">
              <div>
                {imgSrc ? (
                  <ReactCrop crop={crop} onChange={onCropChange} onComplete={crop => makeClientCrop(crop)} aspect={1}>
                    <img
                      ref={imgRef}
                      alt="Crop me"
                      src={imgSrc}
                      style={{ transform: `scale(1) rotate(0deg)`, width: '400px' }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </DialogContent>
            <DialogActions className="!px-5 !pb-5">
              <Button variant="text" onClick={handleCropClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleCropClose} autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <br />
          <button type='button' className={className} onClick={handleLoad}>
            {title}
          </button>

          {/* Modal */}
          {/*  <Modal open={show} onClose={handleClose}>
            <>
              <div>
                <Typography variant="h6">Upload Mobile Photo</Typography>
              </div>
              <div>
                {!!imgSrc ? (
                  <ReactCrop crop={crop} onChange={onCropChange} onComplete={crop => makeClientCrop(crop)} aspect={1}>
                    <img
                      ref={imgRef}
                      alt="Crop me"
                      src={imgSrc}
                      style={{ transform: `scale(1) rotate(0deg)` }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div>
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="contained" onClick={handelSubmit} disabled={isLoading}>
                  {isLoading && <span>Loading...</span>}
                  Done
                </Button>
              </div>
            </>
          </Modal> */}
          {/* /Modal */}
        </div>
      </Grid>
    </Grid>
  )
}

export default PhotoCropper
