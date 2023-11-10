import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import ConditionFileUpload from './ConditionFileUpload'

const ConditionUpload = (props: any) => {
  // const [open, setOpen] = React.useState(false)

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  const handleClose = () => {
    setShowConditionModal(false)
  }

  const {
    handleFormSubmit,
    showConditionModal,
    setShowConditionModal,
    fileName,
    handleSubmit,
    register,
    isSpinner,
    errors,
  } = props

  return (
    <>
      <Dialog
        open={showConditionModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Add Condition Report</DialogTitle>
        <DialogContent>
          <ConditionFileUpload
            isSpinner={isSpinner}
            // handleSubmitCondition={handleSubmitCondition}
            handleFormSubmit={handleFormSubmit}
            setShowConditionModal={setShowConditionModal}
            register={register}
            handleSubmit={handleSubmit}
            fileName={fileName}
            errors={errors}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ConditionUpload
