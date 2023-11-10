import { ColorlibStepIcon } from '@/components/stepper/Stepper'
import { ColorlibStepIconLand } from '@/components/stepper/StepperLandlord'
import { Box, StepContent, StepLabel, Typography } from '@mui/material'
import React from 'react'

const ProgressStep = ({ heading, title, children, isTenant }: any) => {
  return (
    <>
      <StepLabel
        StepIconComponent={isTenant ? ColorlibStepIcon : ColorlibStepIconLand}
        className=" !w-full !flex !justify-center !items-start !py-0  ">
        <div className=" w-full felx flex-col items-center ml-3">
          {/* {heading} */}
          <Typography className="!font-medium !font-roboto md:text-sm xl:!text-base">{heading}</Typography>
          <Typography className="!text-xs !text-[#505050] !font-roboto !font-normal">{title}</Typography>
        </div>
      </StepLabel>
      <StepContent
        className={` !border-l-[2.3px] !border-solid ${isTenant ? '!border-[#00ADEE]' : '!border-[#034EA1]'} !ml-6`}>
        {/* <Typography>{title}</Typography> */}

        <Box sx={{ mb: 0 }}>
          <div className="ml-7 flex flex-wrap gap-x-3 gap-y-2">{children}</div>
        </Box>
      </StepContent>
      {/* <h1 className='text-lg'>{heading}</h1> */}
      {/* <StepContent hidden={false}> */}

      {/* </StepContent> */}

      {/* </StepContent> */}
      {/* <p className='text-sm text-[#00adee]'>{title}</p> */}
      {/* {children} */}
    </>
  )
}

export default ProgressStep
