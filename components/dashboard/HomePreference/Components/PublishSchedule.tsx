import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import { hideModal, showModal } from '../../../../store'
import { useDispatch } from 'react-redux'
import { StoreThunkDispatch } from '@/types'

import { customFormStyle } from '../../../../util/customFormStyle'
import { ErrorMessage } from '@hookform/error-message'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { TextField } from '@mui/material'
import CalendarIcon from '../images/calender.png'
import { useEffect } from 'react'

function PublishSchedule({ onSubmit, setAvailableFrom, availableFromDate, setDuration, durationValue }: any) {
  const dispatch = useDispatch<StoreThunkDispatch>()

  useEffect(() => {
    setValue('availableFrom', availableFromDate)
  }, [])

  // console.log('durationValue', durationValue)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    trigger,
  } = useForm()

  return (
    // <div className=" rounded-lg flex flex-col justify-evenly w-2/5 bg-white shadow-lg">
    <form onSubmit={handleSubmit(onSubmit)} className=" w-full flex flex-col items-center mt-10 pl-12 pr-16">
      <div className=" flex flex-col gap-8 w-1/2 mb-12">
        <div>
          <Controller
            control={control}
            {...register('availableFrom')}
            rules={availableFromDate ? {} : { required: 'This field is required' }}
            render={({ field: { onChange } }) => (
              <DatePicker
                className={`!w-full !my-0`}
                format="DD MMMM YYYY"
                defaultValue={availableFromDate}
                minDate={moment()}
                label="Available From*"
                onChange={event => {
                  onChange(event)
                  // console.log('home_', event)
                  // setAvailableFrom(event.target.value)
                  // getCustomerDateOfBirth(event)
                }}
                //   openPickerIcon={<CalendarIcon />}
                sx={customFormStyle.sx_text_field}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="availableFrom"
            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
          />
        </div>

        <FormControl
          {...register('duration', { required: 'This field is required' })}
          variant="outlined"
          sx={{ ...customFormStyle?.sx_text_field, width: '100%' }}>
          <InputLabel id="demo-simple-select-label">Duration*</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={durationValue}
            label="Duration*"
            onChange={(e: any) => {
              setValue('duration', e?.target?.value)
              console.log('duration', e?.target?.value)
              trigger('duration')
              // setDuration(e.target.dataset.value)
            }}
            // input={<OutlinedInput label="Area*" />}
          >
            <MenuItem value={1}>1 Month</MenuItem>
            {/* <MenuItem value={2}>2 Month</MenuItem> */}
          </Select>
          <ErrorMessage
            errors={errors}
            name="duration"
            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
          />
        </FormControl>
      </div>
      <div className=" w-1/2">
        <Button
          type="submit"
          variant="contained"
          sx={customFormStyle.sx_publish_button}
          // onClick={handlePoiWarningButton}
          className="!rounded-[10px] !px-2 !py-1.5 !text-[#FFFFFF] bg-[#00adee] !text-sm !font-normal !font-roboto !capitalize !shadow-none !w-full !h-14">
          Apply
        </Button>
      </div>
    </form>
  )
}

export default PublishSchedule
