import React, { useEffect, useState } from 'react'
import ProgressStep from './ProgressStep'
import { Box, Button, Step, Stepper } from '@mui/material'
import { useSelector } from 'react-redux'
import { ColorlibConnector } from '@/components/stepper/Stepper'
import { ColorlibConnectorLandlord } from '@/components/stepper/StepperLandlord'

import { Icon } from '@/components/shared'

export const Progress = ({ isTenant }: any) => {
  // const [activeStep, setActiveStep] = React.useState(6)

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1)
  // }

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1)
  // }

  // const handleReset = () => {
  //   setActiveStep(0)
  // }

  const { progress, status } = useSelector((state: any) => state.entities.userProgress)
  const [statnow, setStatnow]: any = useState()

  useEffect(() => {
    setStatnow(status)
  }, [status])

  return (
    <Box sx={{ maxWidth: 427 }}>
      <Stepper
        orientation="vertical"
        connector={
          isTenant ? <ColorlibConnector className="!ml-6" /> : <ColorlibConnectorLandlord className="!ml-6" />
        }>
        {statnow &&
          Object.entries(statnow).map(([key, value]: any, _: number) => {
            return value.status ? (
              <Step active={value.progInfo?.active} completed={value.progInfo?.completed} key={key}>
                <ProgressStep
                  isTenant={isTenant}
                  key={key}
                  heading={
                    key === 'Contact' ? `Contact ${progress?.roletype === 'tenant' ? 'Landlord' : 'Tenant'}` : key
                  }
                  title={value.title}>
                  {value.buttons &&
                    Object.entries(value.buttons).map(([k, v]: any) => {
                      return (
                        v[0] && (
                          <Button
                            className={` ${
                              isTenant ? '!text-[#00ADEE]' : '!text-[#034EA1]'
                            } !text-sm !py-2 !px-3 !flex !items-center `}
                            key={k}
                            onClick={v[1]}
                            variant="outlined"
                            size="small">
                            {k == 'Create' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="plusSquare" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Details' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="details" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Update' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="edit" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Edit' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="edit" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Update Offer' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="edit" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Accept' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="accept" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Cancel' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="cancel" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Viewing Not Required' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="eyeSlash" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Viewing Completed' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="eyeCheck" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Viewing Not Completed' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="eyeOff" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Reject' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="reject" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Pay' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="payment" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Send' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="send" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Sign' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="sign" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Upload' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="upload" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Request' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="request" className="w-[18px] h-[18px]" />
                              </span>
                            )}
                            {k == 'Reschedule' && (
                              <span className={`${isTenant ? 'text-[#00adee]' : 'text-[#034EA1]'} mr-2`}>
                                <Icon name="edit" className="w-[18px] h-[18px]" />
                              </span>
                            )}

                            {k}
                          </Button>
                        )
                      )
                    })}
                </ProgressStep>
              </Step>
            ) : null
          })}
      </Stepper>
    </Box>
  )
}

export default Progress
