import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material' // FormControl, FormControlLabel, Radio, RadioGroup, 
import { useSession } from 'next-auth/react'
import { Button } from '@mui/material'

const EditScheduleL = () => {
  // const { data: session }: any = useSession()
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const scheduleHandler = (_: any) => {
    // console.log(`🚀 ~ file: CreateScheduleL.tsx:16 ~ scheduleHandler ~ data:`, data)

    // const formData = {
    //   id: 'scheduleID',
    //   inviter_id: session?.user?.id,
    //   selected_date: data.start_date,
    //   selected_time: data.start_time,
    //   property_id: '',
    //   purpose: data.purpose,
    //   notes: data.description,
    //   period_in_min: 30,
    //   selectable_date: [data.start_date],
    //   selectable_time: [data.start_time],
    //   recipients: ['receiverId'],
    //   meeting_location: '',
    // }
  }

  return (
    <div className="w-full h-full justify-center bg-blue-400 p-5">
      <form onSubmit={handleSubmit(scheduleHandler)}>
        <div className="flex gap-5">
          <div className="w-2/5 border border-blue-300 rounded-md shadow-md">
            <input
              type="radio"
              id="house_viewing"
              defaultValue="house_viewing"
              // checked={ data?.data?.appointmentInfo.appointment_purpose == "house_viewing" ? true : false }
              {...register('purpose')}
            />
            <label className="py-3 inline-block" htmlFor="house_viewing">
              House Viewing
            </label>
          </div>
          <div className="w-2/5 border border-blue-300 rounded-md shadow-md">
            <input
              type="radio"
              disabled={true}
              id="key"
              defaultValue="keyhand_overed"
              // checked={ data?.data?.appointmentInfo.appointment_purpose == "keyhandovered" ? true : false }

              {...register('purpose')}
            />
            <label className="py-3 inline-block" htmlFor="key_handover">
              Key Handover
            </label>
          </div>
        </div>

        <div className="time flex gap-5 my-5">
          <div className="w-2/5">
            <input
              min={new Date().toISOString().split('T')[0]}
              className=" w-full border border-blue-200 px-3 py-3 rounded-md"
              style={{ width: '100%', marginRight: '10px', border: '0 none' }}
              type="date"
              // defaultValue={ data?.data?.appointmentInfo.appointment_selected_date }
              id=""
              {...register('start_date')}
            />
          </div>
          <div className="w-2/5">
            <input
              className="w-full border border-blue-200 px-3 py-3 rounded-md"
              // step="36000"
              max="22:00"
              min={new Date().getHours() + ':' + new Date().getMinutes()}
              style={{ width: '100%', border: '0 none' }}
              type="time"
              // defaultValue={ data?.data?.appointmentInfo.appointment_selected_time }
              {...register('start_time')}
            />
          </div>
        </div>
        <div className="w-5/6">
          <TextField
            label="Description"
            placeholder="Enter details here"
            color="secondary"
            className="!w-full !py-5"
            multiline
            minRows={3}
            // defaultValue={ data?.data?.appointmentInfo.appointment_notes }
            size="small"
            {...register('description')}
          />
        </div>

        <Button
          type="submit"
          className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]">
          Add Schedule
        </Button>
      </form>
    </div>
  )
}

export default EditScheduleL
