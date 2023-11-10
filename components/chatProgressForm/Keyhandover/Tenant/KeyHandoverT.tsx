import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material' // FormControl, FormControlLabel, Radio, RadioGroup,
import { useSession } from 'next-auth/react'

const KeyHandoverT = () => {
  const { data: session }: any = useSession()
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const scheduleHandler = (_: any) => {
    // console.log(`🚀 ~ file: CreateScheduleL.tsx:16 ~ scheduleHandler ~ data:`, data)

    // const formData = {
    //   inviter_id: session?.user?.id,
    //   selected_date: data.start_date,
    //   selected_time: data.start_time,
    //   // selected_time: format(new Date().getTime(data.startTime), "HH:mm:ss"),
    //   property_id: '',
    //   purpose: data.purpose,
    //   notes: data.description,
    //   period_in_min: 30,
    //   selectable_date: [data.start_date],
    //   selectable_time: [data.start_time],
    //   recipients: ['receiverId'],
    //   meeting_location: '',
    // }

    /**
    const updatedKeyLandlordData = {
      selected_time: data.startTime,
      inviterId: userId,
      id: scheduleInfo.id.toString(),
      time: parseInt(getTimestamp()),
      selected_date: data.startDate,
      status:
        context.value.currentRoleType == "isLandlord"
          ? `Request Sent Awaiting Tenant's Response`
          : `Received Schedule from Tenant`,
      progress_status: false,
    }
    const updatedKeyTenantData = {
      selected_time: data.startTime,
      inviterId: userId,
      id: scheduleInfo.id.toString(),
      time: parseInt(getTimestamp()),
      selected_date: data.startDate,
      status:
        context.value.currentRoleType == "isLandlord"
          ? `Received Schedule from Landlord`
          : `Request Sent Awaiting Landlord's Response`,
      progress_status: false,
    }
    // NEED TO UPDATE KEY HANDOVER TO FIRE STORE
    updateTenantProgress(
      `${context?.value?.threadInfo?.property_id}-${context?.value?.threadInfo?.sender_id}`,
      "keyHandover",
      updatedKeyTenantData
    )

    //UPDATE LANDLORD PROGRESS
    updateLandlordProgress(
      `${context?.value?.threadInfo?.receiver_id}-${context?.value?.threadInfo?.property_id}-${context?.value?.threadInfo?.sender_id}`,
      "keyHandover",
      updatedKeyLandlordData
    )

 */
  }

  return (
    <div className="w-[800px] bg-blue-400 p-5">
      <form onSubmit={handleSubmit(scheduleHandler)}>
        <div className="flex gap-5">
          <div className="w-2/5 border border-blue-300 rounded-md shadow-md">
            <input
              disabled
              className=""
              type="radio"
              id="house_viewing"
              {...register('keyHandover')}
              value="house_viewing"
            />
            <label className="py-3 inline-block" htmlFor="house_viewing">
              House Viewing
            </label>
          </div>
          <div className="w-2/5 border border-blue-300 rounded-md shadow-md">
            <input checked type="radio" id="key_handover" {...register('keyHandover')} value="key_handover" />
            <label className="py-3 inline-block" htmlFor="key_handover">
              Key Handover
            </label>
          </div>
        </div>

        <div className="time flex gap-5 my-5">
          <div className="w-2/5">
            <input
              type="date"
              className=" w-full border border-blue-200 px-3 py-3 rounded-md"
              {...register(' start_date')}
            />
          </div>
          <div className="w-2/5">
            <input
              type="time"
              className="w-full border border-blue-200 px-3 py-3 rounded-md"
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
            size="small"
            {...register('description')}
          />
        </div>

        <button type="submit" className="bg-primary px-5 py-3 text-white">
          Key Handover
        </button>
      </form>
    </div>
  )
}

export default KeyHandoverT
