import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {  FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material' // FormControl,  , colors
import { useSession } from 'next-auth/react'
import { ChatCreate, updateConversationNew, updateLandlordProgress, updateTenantProgress } from '@/util/ChatProgress'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  useCreateAppointmentMutation,
  useGetAppointmentDetailsQuery,
  useUpdateAppointmentMutation,
} from '@/store'
import { scheduleRequestMessage } from '@/const'
import { useDispatch, useSelector } from 'react-redux'
import { PROPERTY_VIEWING } from '@/store/chatProgress/progress/constant'
import classNames from 'classnames'
// import { inputTime } from '@/util'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import InsideLoader from '@/components/shared/Loaders'

const getTimestamp = () => {
  let timestamp = Date.now()

  return timestamp.toString()
}

const CreateSchedule = ({ createType, viewMode, mutateType, ctxType }: any) => {
// console.log("🚀 ~ file: CreateSchedule.tsx:29 ~ CreateSchedule ~ createType:", createType)

  const [purposeVal, setPurposeVal] = React.useState('house_viewing')
  const [dateVal, setDateVal] = React.useState(moment((new Date())).format("YYYY-MM-DD"))
  const [timeVal, setTimeVal] = React.useState(moment(new Date()).format("HH:mm:ss"))
  console.log("🚀 ~ file: CreateSchedule.tsx:33 ~ CreateSchedule ~ timeVal:", timeVal)
  const [descriptionVal, setDescriptionVal] = React.useState('')
  const [createSchedule] = useCreateAppointmentMutation() // , { isError, isLoading, data }
  const [updateSchedule] =
    useUpdateAppointmentMutation() // , { isError: updateError, isLoading: updateLoading, data: updateData }
  const { selectedThread } = useSelector((state: any) => state.entities.threadSlice)
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)
  const { data: session }: any = useSession()

  const {
    data: scheduleData,
    // isError: scheduleError,
    isLoading: scheduleLoading,
  } = useGetAppointmentDetailsQuery(
    createType == PROPERTY_VIEWING ? payload?.viewingScheduleConfirmed?.id : payload?.keyHandover?.id,{skip: !(PROPERTY_VIEWING ? payload?.viewingScheduleConfirmed?.id : payload?.keyHandover?.id)}
  )

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        start_date: scheduleData?.appointmentInfo?.appointment_selected_date,
        start_time: scheduleData?.appointmentInfo?.appointment_selected_time,
        description: scheduleData?.appointmentInfo?.appointment_notes,
        purpose: createType == PROPERTY_VIEWING ? 'house_viewing' : 'keyhandovered',
      }
    }, [scheduleData, createType]),
  })
  useEffect(() => {
    if (scheduleData) {
      setPurposeVal(scheduleData?.appointmentInfo?.appointment_purpose)
      setDateVal(scheduleData?.appointmentInfo?.appointment_selected_date)
      setTimeVal(scheduleData?.appointmentInfo?.appointment_selected_time)
      setDescriptionVal(scheduleData?.appointmentInfo?.appointment_notes)
    }

  }, [scheduleData])

  const dispatch = useDispatch()
  const scheduleHandler = async (data: any) => {
    const sender = session?.user?.id
    const receiver =
      session?.user?.id === payload?.threadInfo?.sender_id
        ? payload?.threadInfo?.receiver_id
        : payload?.threadInfo?.sender_id

    let response: any = null
    const dateTime = `${dateVal} ${timeVal}`

    const selected_date = dateVal
    const selected_time = timeVal

    if (mutateType === 'add') {
      const formData = {
        inviter_id: sender,
        selected_date: selected_date,
        selected_time: selected_time,
        // selected_time: format(new Date().getTime(data.startTime), "HH:mm:ss"),
        property_id: payload.threadInfo?.property_id,
        purpose: data.purpose,
        notes: descriptionVal,
        period_in_min: 30,
        selectable_date: [selected_date],
        selectable_time: [selected_time],
        recipients: [receiver],
        meeting_location: '',
      }
      store.dispatch(hideModal(ctxType))

      dispatch(showLoader('Creating Schedule'))

      const { data: respo }: any = await createSchedule(formData)
      response = respo
      dispatch(hideLoader())
    } else {
      const formData = {
        id: payload?.viewingScheduleConfirmed?.id,
        inviter_id: sender,
        selected_date: dateVal,
        selected_time: timeVal,
        property_id: payload.threadInfo?.property_id,
        purpose: data.purpose,
        notes: descriptionVal,
        period_in_min: 30,
        selectable_date: [dateVal],
        selectable_time: [timeVal],
        recipients: [receiver],
        meeting_location: '',
      }
      store.dispatch(hideModal(ctxType))

      dispatch(showLoader('Updating Schedule'))

      const { data: respo }: any = await updateSchedule({
        appointmentId: payload?.viewingScheduleConfirmed?.id,
        data: formData,
      })
      response = {
        id: payload?.viewingScheduleConfirmed?.id,
      }
      dispatch(hideLoader())
    }

    if(mutateType === 'add') {
      ChatCreate(
        scheduleRequestMessage,
        sender,
        payload.threadInfo?.property_id,
        receiver,
        payload.threadInfo?.id,
        'appointment',
        response?.id,
        createType == PROPERTY_VIEWING ? 'house_viewing' : 'keyhandovered'
      )
    }

    const senderInfo: any = {
      id: selectedThread.senderId,
      image: selectedThread.senderImage,
      name: selectedThread.senderName,
    }
    const recieverInfo: any = {
      id: selectedThread.receiverId,
      image: selectedThread.receiverImage,
      name: selectedThread.receiverName,
    }
    if(mutateType === 'add') updateConversationNew(senderInfo, selectedThread.id, recieverInfo, scheduleRequestMessage)

    let updatedTenantData, updatedLandlordData
    if(payload?.roletype === 'tenant'){
      updatedTenantData = {
        // selected_time: data.start_time,
        selected_time: selected_time,
        inviterId: sender,
        id: response?.id.toString(),
        time: '',
        selected_date: selected_date,
        status: mutateType === 'add' ? `tenant_create_schedule` : `tenant_reschedule`,
        progress_status: false,
        purpose: createType == PROPERTY_VIEWING ? 'house_viewing' : 'key_handover',
        chatId: getTimestamp(),
      }
      updatedLandlordData = {
        selected_time: selected_time,
        inviterId: sender,
        id: response?.id.toString(),
        time: '',
        selected_date: selected_date,
        status: mutateType === 'add' ? `landlord_receive_schedule` : `tenant_reschedule`,
        purpose: createType == PROPERTY_VIEWING ? 'house_viewing' : 'key_handover',
        progress_status: false,
        chatId: getTimestamp(),
      }
    }
    else{
      updatedTenantData = {
        // selected_time: data.start_time,
        selected_time: selected_time,
        inviterId: sender,
        id: response?.id.toString(),
        time: '',
        selected_date: selected_date,
        status: mutateType === 'add' ? `tenant_receive_schedule` : `landlord_reschedule`,
        progress_status: false,
        purpose: createType == PROPERTY_VIEWING ? 'house_viewing' : 'key_handover',
        chatId: getTimestamp(),
      }
      updatedLandlordData = {
        selected_time: selected_time,
        inviterId: sender,
        id: response?.id.toString(),
        time: '',
        selected_date: selected_date,
        status: mutateType === 'add' ? `landlord_create_schedule` : `landlord_reschedule`,
        purpose: createType == PROPERTY_VIEWING ? 'house_viewing' : 'key_handover',
        progress_status: false,
        chatId: getTimestamp(),
      }
    }

    
    /*
    viewingScheduleConfirmed: {
    status: 'landlord_reschedule',
    chatId: '1689131380691',
    time: '',
    purpose: 'house_viewing',
    progress_status: false,
    selected_date: '2023-07-12',
    selected_time: '05:09:00',
    inviterId: '767',
    id: '299'
  }
    */

    
    /*
    {
    time: '',
    purpose: 'house_viewing',
    inviterId: '767',
    selected_date: '2023-07-12',
    chatId: '1689131380691',
    status: 'landlord_reschedule',
    id: '299',
    selected_time: '05:09:00',
    progress_status: false
  }
    */

    // NEED TO UPDATE KEY HANDOVER TO FIRE STORE
    updateTenantProgress(
      `${payload.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      createType == PROPERTY_VIEWING ? 'viewingScheduleConfirmed' : 'keyHandover',
      updatedTenantData
    )

    //UPDATE LANDLORD PROGRESS
    updateLandlordProgress(
      `${payload?.threadInfo?.receiver_id}-${payload?.threadInfo?.property_id}-${payload.threadInfo?.sender_id}`,
      createType == PROPERTY_VIEWING ? 'viewingScheduleConfirmed' : 'keyHandover',
      updatedLandlordData
    )
  }
  

  console.log('Time===',scheduleData?.appointmentInfo?.appointment_selected_time)
  return (
    scheduleLoading ? <InsideLoader/>: <div className=" w-full max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto gap-4 ">
      <form className=" w-full flex flex-col  items-center justify-center " onSubmit={handleSubmit(scheduleHandler)}>
        <div className=" w-full flex flex-col gap-3 mb-[2.125rem]">
          <p className=" font-medium font-roboto text-[1.25rem]/[1.5rem] tracking-[0.025rem] text-[#202020]  ">
            Purpose
          </p>

          <div className="flex w-full gap-5 justify-between items-center">
            <div
              className={classNames(
                'w-1/2 border border-solid  rounded-[10px]  flex items-center justify-center py-[0.875rem] px-[1.875rem] ',
                { 'border-[#00ADEE]': createType == PROPERTY_VIEWING },
                { 'border-[#D1D1D1]': !(createType == PROPERTY_VIEWING) }
              )}>
              {/* <label className="py-3 inline-block" htmlFor="house_viewing">
                House Viewing
              </label>
              <input
                checked={createType == PROPERTY_VIEWING}
                disabled={!(createType == PROPERTY_VIEWING)}
                className=" w-5 h-5 "
                type="radio"
                id="house_viewing"
                {...register('purpose')}
                value="house_viewing"
              /> */}
              <RadioGroup aria-label="purpose" {...register('purpose')}>
                <FormControlLabel
                  value="house_viewing"
                  control={
                    <Radio
                      sx={{
                        color: '#202020',
                        '&.Mui-checked': { color: '#00ADEE' },
                      }}
                    />
                  }
                  label={
                    <div className=" flex items-center">
                      {/* <img src="/chat/chatProgressForm/places-to-visit.svg" className="w-8 h-8 mr-2" /> */}
                      {createType == PROPERTY_VIEWING ? (
                        <svg
                          className="w-8 h-8 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32.5"
                          height="32.5"
                          viewBox="0 0 32.5 32.5">
                          <g id="places-to-visit" transform="translate(0.25 0.25)">
                            <path
                              id="Path_21049"
                              data-name="Path 21049"
                              d="M7.694,18.536a.471.471,0,0,0-.471-.471H4.112a1.729,1.729,0,0,0-1.727,1.727V22.6a.471.471,0,0,0,.942,0V19.793a.786.786,0,0,1,.785-.785H7.223A.471.471,0,0,0,7.694,18.536Z"
                              transform="translate(-0.193 -1.564)"
                              fill="#00adee"
                              stroke="#00adee"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21050"
                              data-name="Path 21050"
                              d="M30.475,18.065H27.243a.471.471,0,0,0,0,.942h3.233a.784.784,0,0,1,.781.785V31.9a.784.784,0,0,1-.781.785H4.1a.784.784,0,0,1-.781-.785V25a.469.469,0,1,0-.937,0v6.9A1.725,1.725,0,0,0,4.1,33.626H30.475A1.725,1.725,0,0,0,32.193,31.9V19.793A1.725,1.725,0,0,0,30.475,18.065Z"
                              transform="translate(-0.193 -1.626)"
                              fill="#00adee"
                              stroke="#00adee"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21051"
                              data-name="Path 21051"
                              d="M7.883,11.2,5.39,12.651A.83.83,0,0,0,5.8,14.2H8.774V25.637H6.8a.471.471,0,0,0,0,.942H27.363a.471.471,0,0,0,0-.942H25.39V14.2h2.969a.831.831,0,0,0,.415-1.547l-7.06-4.124a.467.467,0,0,0-.64.171.472.472,0,0,0,.17.644l6.7,3.914h-2.9l-7.388-4.23a1.181,1.181,0,0,0-1.171,0L14.06,10.42V8.677l2.9-1.693a.244.244,0,0,1,.246,0L19.41,8.272a.467.467,0,0,0,.64-.171.472.472,0,0,0-.17-.644L17.676,6.169a1.179,1.179,0,0,0-1.187,0L14.06,7.587V2.237A2.23,2.23,0,0,0,11.842,0H2.218A2.23,2.23,0,0,0,0,2.237V8.959A2.23,2.23,0,0,0,2.218,11.2H7.883ZM6.22,13.257,9.748,11.2h.758a1.273,1.273,0,0,1,.842.319l.317.28L9.118,13.257Zm12.705,12.38H15.239V20.729a.157.157,0,0,1,.156-.157h3.374a.157.157,0,0,1,.156.157v4.908ZM13.6,12.888a.777.777,0,0,0,.459-.715v-.668l2.891-1.659a.245.245,0,0,1,.243,0L24.453,14V25.637h-4.59V20.729a1.1,1.1,0,0,0-1.093-1.1H15.4a1.1,1.1,0,0,0-1.093,1.1v4.908H9.711V14l2.7-1.55.353.312a.772.772,0,0,0,.512.2A.783.783,0,0,0,13.6,12.888ZM.937,8.959V2.237A1.289,1.289,0,0,1,2.218.942h9.625a1.289,1.289,0,0,1,1.281,1.294v9.59l-1.157-1.02a2.207,2.207,0,0,0-1.46-.553H2.218A1.289,1.289,0,0,1,.937,8.959Z"
                              transform="translate(0 0)"
                              fill="#00adee"
                              stroke="#00adee"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21052"
                              data-name="Path 21052"
                              d="M7.235,9.148a3.918,3.918,0,0,0,2.517-.914l2.485-2.077a.471.471,0,0,0,0-.723L9.753,3.358a3.923,3.923,0,0,0-5.036,0L2.235,5.435a.471.471,0,0,0,0,.723L4.717,8.233a3.917,3.917,0,0,0,2.519.915ZM5.321,4.082h0a2.981,2.981,0,0,1,3.827,0L11.2,5.8,9.148,7.511a2.981,2.981,0,0,1-3.827,0L3.271,5.8Z"
                              transform="translate(-0.168 -0.198)"
                              fill="#00adee"
                              stroke="#00adee"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21053"
                              data-name="Path 21053"
                              d="M7.555,7.512A1.557,1.557,0,1,0,6,5.955,1.559,1.559,0,0,0,7.555,7.512Zm0-2.172a.615.615,0,1,1-.615.615A.616.616,0,0,1,7.555,5.34Z"
                              transform="translate(-0.517 -0.357)"
                              fill="#00adee"
                              stroke="#00adee"
                              strokeWidth="0.5"
                            />
                          </g>
                        </svg>
                      ) : (
                        <svg
                          className="w-8 h-8 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32.5"
                          height="32.5"
                          viewBox="0 0 32.5 32.5">
                          <g id="places-to-visit" transform="translate(0.25 0.25)">
                            <path
                              id="Path_21049"
                              data-name="Path 21049"
                              d="M7.694,18.536a.471.471,0,0,0-.471-.471H4.112a1.729,1.729,0,0,0-1.727,1.727V22.6a.471.471,0,0,0,.942,0V19.793a.786.786,0,0,1,.785-.785H7.223A.471.471,0,0,0,7.694,18.536Z"
                              transform="translate(-0.193 -1.564)"
                              fill="#D1D1D1"
                              stroke="#D1D1D1"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21050"
                              data-name="Path 21050"
                              d="M30.475,18.065H27.243a.471.471,0,0,0,0,.942h3.233a.784.784,0,0,1,.781.785V31.9a.784.784,0,0,1-.781.785H4.1a.784.784,0,0,1-.781-.785V25a.469.469,0,1,0-.937,0v6.9A1.725,1.725,0,0,0,4.1,33.626H30.475A1.725,1.725,0,0,0,32.193,31.9V19.793A1.725,1.725,0,0,0,30.475,18.065Z"
                              transform="translate(-0.193 -1.626)"
                              fill="#D1D1D1"
                              stroke="#D1D1D1"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21051"
                              data-name="Path 21051"
                              d="M7.883,11.2,5.39,12.651A.83.83,0,0,0,5.8,14.2H8.774V25.637H6.8a.471.471,0,0,0,0,.942H27.363a.471.471,0,0,0,0-.942H25.39V14.2h2.969a.831.831,0,0,0,.415-1.547l-7.06-4.124a.467.467,0,0,0-.64.171.472.472,0,0,0,.17.644l6.7,3.914h-2.9l-7.388-4.23a1.181,1.181,0,0,0-1.171,0L14.06,10.42V8.677l2.9-1.693a.244.244,0,0,1,.246,0L19.41,8.272a.467.467,0,0,0,.64-.171.472.472,0,0,0-.17-.644L17.676,6.169a1.179,1.179,0,0,0-1.187,0L14.06,7.587V2.237A2.23,2.23,0,0,0,11.842,0H2.218A2.23,2.23,0,0,0,0,2.237V8.959A2.23,2.23,0,0,0,2.218,11.2H7.883ZM6.22,13.257,9.748,11.2h.758a1.273,1.273,0,0,1,.842.319l.317.28L9.118,13.257Zm12.705,12.38H15.239V20.729a.157.157,0,0,1,.156-.157h3.374a.157.157,0,0,1,.156.157v4.908ZM13.6,12.888a.777.777,0,0,0,.459-.715v-.668l2.891-1.659a.245.245,0,0,1,.243,0L24.453,14V25.637h-4.59V20.729a1.1,1.1,0,0,0-1.093-1.1H15.4a1.1,1.1,0,0,0-1.093,1.1v4.908H9.711V14l2.7-1.55.353.312a.772.772,0,0,0,.512.2A.783.783,0,0,0,13.6,12.888ZM.937,8.959V2.237A1.289,1.289,0,0,1,2.218.942h9.625a1.289,1.289,0,0,1,1.281,1.294v9.59l-1.157-1.02a2.207,2.207,0,0,0-1.46-.553H2.218A1.289,1.289,0,0,1,.937,8.959Z"
                              transform="translate(0 0)"
                              fill="#D1D1D1"
                              stroke="#D1D1D1"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21052"
                              data-name="Path 21052"
                              d="M7.235,9.148a3.918,3.918,0,0,0,2.517-.914l2.485-2.077a.471.471,0,0,0,0-.723L9.753,3.358a3.923,3.923,0,0,0-5.036,0L2.235,5.435a.471.471,0,0,0,0,.723L4.717,8.233a3.917,3.917,0,0,0,2.519.915ZM5.321,4.082h0a2.981,2.981,0,0,1,3.827,0L11.2,5.8,9.148,7.511a2.981,2.981,0,0,1-3.827,0L3.271,5.8Z"
                              transform="translate(-0.168 -0.198)"
                              fill="#D1D1D1"
                              stroke="#D1D1D1"
                              strokeWidth="0.5"
                            />
                            <path
                              id="Path_21053"
                              data-name="Path 21053"
                              d="M7.555,7.512A1.557,1.557,0,1,0,6,5.955,1.559,1.559,0,0,0,7.555,7.512Zm0-2.172a.615.615,0,1,1-.615.615A.616.616,0,0,1,7.555,5.34Z"
                              transform="translate(-0.517 -0.357)"
                              fill="#D1D1D1"
                              stroke="#D1D1D1"
                              strokeWidth="0.5"
                            />
                          </g>
                        </svg>
                      )}
                      <span>House Viewing</span>
                    </div>
                  }
                  className=" !font-roboto"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '1.25rem',
                      lineHeight: '1.25rem',
                      color: purposeVal == 'house_viewing' ? '#00ADEE' : '#202020',
                    },
                  }}
                  labelPlacement="start"
                  disabled={!(createType == PROPERTY_VIEWING)}
                  checked={createType == PROPERTY_VIEWING}
                />
              </RadioGroup>
            </div>
            <div
              className={classNames(
                'w-1/2 border border-solid  rounded-[10px]  flex items-center justify-center py-[0.875rem] px-[1.875rem] ',
                { 'border-[#00ADEE]': !(createType == PROPERTY_VIEWING) },
                { 'border-[#D1D1D1]': createType == PROPERTY_VIEWING }
              )}>
              {' '}
              {/* <input
                checked={!(createType == PROPERTY_VIEWING)}
                disabled={createType == PROPERTY_VIEWING}
                type="radio"
                id="keyhandovered"
                {...register('purpose')}
                value="keyhandovered"
              />
              <label className="py-3 inline-block" htmlFor="keyhandovered">
                Key Handover
              </label> */}
              <RadioGroup aria-label="purpose" {...register('purpose')}>
                <FormControlLabel
                  value="keyhandovered"
                  control={
                    <Radio
                      sx={{
                        color: '#202020',
                        '&.Mui-checked': { color: '#00ADEE' },
                      }}
                    />
                  }
                  label={
                    <div className=" flex items-center">
                      {/* <img src="/chat/chatProgressForm/deal.svg" className="w-8 h-8 mr-2" /> */}
                      {createType == PROPERTY_VIEWING ? (
                        <svg
                          className="w-8 h-8 mr-2"
                          id="deal"
                          xmlns="http://www.w3.org/2000/svg"
                          // width="32"
                          // height="32"
                          viewBox="0 0 32 32">
                          <path
                            id="Path_22871"
                            data-name="Path 22871"
                            d="M161.814,326.734l-3.017-1.1a.535.535,0,0,0-.685.321l-.183.5-3.5-1.275a.518.518,0,0,0-.275-.024l-7.272,1.284a2.145,2.145,0,0,0-1.532,1.131l-3.336-1.217a2.119,2.119,0,0,0-1.636.072,2.145,2.145,0,0,0-1.215,1.627,2.187,2.187,0,0,0,1.46,2.35l10.989,4a.523.523,0,0,0,.183.033.537.537,0,0,0,.171-.028l3.069-1.036.327.119-.183.5a.535.535,0,0,0,.321.686l3.018,1.1a.518.518,0,0,0,.182.033.535.535,0,0,0,.5-.352l2.928-8.046a.535.535,0,0,0-.322-.682Zm-6.939,5.57-3.069,1.036L140.994,329.4a1.131,1.131,0,0,1-.768-1.182,1.07,1.07,0,0,1,1.427-.856l3.472,1.263a2.315,2.315,0,0,0,.024.295,2.15,2.15,0,0,0,2.478,1.737l6.025-1.062-.186-1.054-6.022,1.062a1.078,1.078,0,0,1-1.24-.864.99.99,0,0,1,0-.369.53.53,0,0,0,.009-.054.588.588,0,0,1,.037-.133,1.075,1.075,0,0,1,.82-.689l7.13-1.257,3.361,1.223-1.83,5.03-.5-.182A.537.537,0,0,0,154.875,332.3Zm3.507,2.291-2.011-.732,2.562-7.04,2.012.732Zm0,0"
                            transform="translate(-130.167 -303.815)"
                            fill="#d1d1d1"
                          />
                          <path
                            id="Path_22872"
                            data-name="Path 22872"
                            d="M12.742,8.632a4.193,4.193,0,0,0,.93,1.7,1.028,1.028,0,0,0-.016.13v2.914a1.605,1.605,0,0,0,1.605,1.605v5.351a.535.535,0,0,0,.3.482l1.07.535a.535.535,0,0,0,.478,0l1.07-.535a.535.535,0,0,0,.3-.482V14.984a1.605,1.605,0,0,0,1.605-1.605V10.464a1.085,1.085,0,0,0-.018-.139,4.146,4.146,0,0,0,.82-1.35,1.955,1.955,0,0,0,2-.916,2.113,2.113,0,0,0-.336-2.608L18.184,1.1A3.722,3.722,0,0,0,15.536,0H9.909A.527.527,0,0,0,9.7.043L6.056,1.605H5.628V.535A.535.535,0,0,0,5.093,0H.812A.535.535,0,0,0,.277.535V9.1a.535.535,0,0,0,.535.535H5.093A.535.535,0,0,0,5.628,9.1V8.027h.078c.383,1.284,2.1,2.141,3.668,2.141a4.27,4.27,0,0,0,3.368-1.535Zm-8.184-.07H1.347V1.07H4.558ZM17.4,20l-.535.268L16.331,20v-5.02H17.4Zm1.605-6.626a.535.535,0,0,1-.535.535H15.261a.535.535,0,0,1-.535-.535V11.194a4.21,4.21,0,0,0,1.154.46,1.077,1.077,0,1,0,.15-1.075,3.174,3.174,0,0,1-.856-.366,4.2,4.2,0,0,1,1.693-.581,5.016,5.016,0,0,1,2.141.832Zm.4-3.921a5.841,5.841,0,0,0-2.539-.9,5.831,5.831,0,0,0-2.535.893A3.135,3.135,0,0,1,13.7,8.027h2.628A2.087,2.087,0,0,0,18.2,6.908l1.5,1.5a1.928,1.928,0,0,0,.189.156,3.07,3.07,0,0,1-.483.9ZM18.446,5.64a2.121,2.121,0,0,0-.53-1.177,3.211,3.211,0,0,1,2.149,2.8Zm-6.4,1.852c0,.81-1.326,1.605-2.676,1.605S6.7,8.3,6.7,7.492a.535.535,0,0,0-.535-.535H5.628V2.676h.535a.528.528,0,0,0,.211-.043L10.016,1.07h5.517a2.659,2.659,0,0,1,1.894.783l4.354,4.354a1.036,1.036,0,0,1,.191,1.274.963.963,0,0,1-.826.449h-.025a4.17,4.17,0,0,0,.025-.439,4.286,4.286,0,0,0-4.281-4.281,4.236,4.236,0,0,0-2.055.535H10.444v1.07h5.886a1.07,1.07,0,0,1,0,2.141H12.585a.535.535,0,0,0-.535.535Zm0,0"
                            transform="translate(-0.277 0)"
                            fill="#d1d1d1"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-8 h-8 mr-2"
                          id="deal"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32">
                          <path
                            id="Path_22871"
                            data-name="Path 22871"
                            d="M161.814,326.734l-3.017-1.1a.535.535,0,0,0-.685.321l-.183.5-3.5-1.275a.518.518,0,0,0-.275-.024l-7.272,1.284a2.145,2.145,0,0,0-1.532,1.131l-3.336-1.217a2.119,2.119,0,0,0-1.636.072,2.145,2.145,0,0,0-1.215,1.627,2.187,2.187,0,0,0,1.46,2.35l10.989,4a.523.523,0,0,0,.183.033.537.537,0,0,0,.171-.028l3.069-1.036.327.119-.183.5a.535.535,0,0,0,.321.686l3.018,1.1a.518.518,0,0,0,.182.033.535.535,0,0,0,.5-.352l2.928-8.046a.535.535,0,0,0-.322-.682Zm-6.939,5.57-3.069,1.036L140.994,329.4a1.131,1.131,0,0,1-.768-1.182,1.07,1.07,0,0,1,1.427-.856l3.472,1.263a2.315,2.315,0,0,0,.024.295,2.15,2.15,0,0,0,2.478,1.737l6.025-1.062-.186-1.054-6.022,1.062a1.078,1.078,0,0,1-1.24-.864.99.99,0,0,1,0-.369.53.53,0,0,0,.009-.054.588.588,0,0,1,.037-.133,1.075,1.075,0,0,1,.82-.689l7.13-1.257,3.361,1.223-1.83,5.03-.5-.182A.537.537,0,0,0,154.875,332.3Zm3.507,2.291-2.011-.732,2.562-7.04,2.012.732Zm0,0"
                            transform="translate(-130.167 -303.815)"
                            fill="#00ADEE"
                          />
                          <path
                            id="Path_22872"
                            data-name="Path 22872"
                            d="M12.742,8.632a4.193,4.193,0,0,0,.93,1.7,1.028,1.028,0,0,0-.016.13v2.914a1.605,1.605,0,0,0,1.605,1.605v5.351a.535.535,0,0,0,.3.482l1.07.535a.535.535,0,0,0,.478,0l1.07-.535a.535.535,0,0,0,.3-.482V14.984a1.605,1.605,0,0,0,1.605-1.605V10.464a1.085,1.085,0,0,0-.018-.139,4.146,4.146,0,0,0,.82-1.35,1.955,1.955,0,0,0,2-.916,2.113,2.113,0,0,0-.336-2.608L18.184,1.1A3.722,3.722,0,0,0,15.536,0H9.909A.527.527,0,0,0,9.7.043L6.056,1.605H5.628V.535A.535.535,0,0,0,5.093,0H.812A.535.535,0,0,0,.277.535V9.1a.535.535,0,0,0,.535.535H5.093A.535.535,0,0,0,5.628,9.1V8.027h.078c.383,1.284,2.1,2.141,3.668,2.141a4.27,4.27,0,0,0,3.368-1.535Zm-8.184-.07H1.347V1.07H4.558ZM17.4,20l-.535.268L16.331,20v-5.02H17.4Zm1.605-6.626a.535.535,0,0,1-.535.535H15.261a.535.535,0,0,1-.535-.535V11.194a4.21,4.21,0,0,0,1.154.46,1.077,1.077,0,1,0,.15-1.075,3.174,3.174,0,0,1-.856-.366,4.2,4.2,0,0,1,1.693-.581,5.016,5.016,0,0,1,2.141.832Zm.4-3.921a5.841,5.841,0,0,0-2.539-.9,5.831,5.831,0,0,0-2.535.893A3.135,3.135,0,0,1,13.7,8.027h2.628A2.087,2.087,0,0,0,18.2,6.908l1.5,1.5a1.928,1.928,0,0,0,.189.156,3.07,3.07,0,0,1-.483.9ZM18.446,5.64a2.121,2.121,0,0,0-.53-1.177,3.211,3.211,0,0,1,2.149,2.8Zm-6.4,1.852c0,.81-1.326,1.605-2.676,1.605S6.7,8.3,6.7,7.492a.535.535,0,0,0-.535-.535H5.628V2.676h.535a.528.528,0,0,0,.211-.043L10.016,1.07h5.517a2.659,2.659,0,0,1,1.894.783l4.354,4.354a1.036,1.036,0,0,1,.191,1.274.963.963,0,0,1-.826.449h-.025a4.17,4.17,0,0,0,.025-.439,4.286,4.286,0,0,0-4.281-4.281,4.236,4.236,0,0,0-2.055.535H10.444v1.07h5.886a1.07,1.07,0,0,1,0,2.141H12.585a.535.535,0,0,0-.535.535Zm0,0"
                            transform="translate(-0.277 0)"
                            fill="#00ADEE"
                          />
                        </svg>
                      )}
                      <span>Key Handover</span>
                    </div>
                  }
                  className=" !font-roboto"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '1.25rem',
                      lineHeight: '1.25rem',
                      color: createType == PROPERTY_VIEWING ? '#202020' : '#00ADEE',
                    },
                  }}
                  labelPlacement="start"
                  disabled={createType == PROPERTY_VIEWING}
                  checked={!(createType == PROPERTY_VIEWING)}
                />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col gap-3 mb-[2.125rem]">
          <p className=" font-medium font-roboto text-[1.25rem]/[1.5rem] tracking-[0.025rem] text-[#202020]  ">
            Start Date & Time
          </p>

          <div className="time w-full flex gap-5  justify-between items-center mt-2">
            <div className="w-1/2">
              {/* <input
                disabled={viewMode}
                defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date}
                value={dateVal}
                onChange={(e: any) => setDateVal(e.target.value)}
                type="date"
                className=" w-full border border-blue-200 px-3 py-3 rounded-md"
                // {...register('start_date')}
              /> */}
              <DatePicker
              
                minDate={scheduleData?.appointmentInfo?.appointment_selected_date ? moment.utc(scheduleData?.appointmentInfo?.appointment_selected_date) : moment.utc((new Date()))}
                disabled={viewMode}
                //  defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date}
                defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date ? moment.utc(scheduleData?.appointmentInfo?.appointment_selected_date) : moment.utc((new Date()))}
                format="DD MMM, YY"
                // value={dateVal}
                onChange={(e: any) => {setDateVal(moment(e._d).format("YYYY-MM-DD"))}}
              sx={{
                width:'100%',
                  '& .MuiInputBase-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#00ADEE',
                    },
                  },

                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#00ADEE',
                    },
                  },
                }} label="Date" />
             {/*  <TextField
                sx={{
                  '& .MuiInputBase-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#00ADEE',
                    },
                  },

                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#00ADEE',
                    },
                  },
                }}
                disabled={viewMode}
                defaultValue={scheduleData?.appointmentInfo?.appointment_selected_date}
                value={dateVal}
                onChange={(e: any) => setDateVal(e.target.value)}
                id="date"
                label="Date"
                type="date"
                className="!w-full !shadow-none "
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
            </div>
            <div className="w-1/2">
              {/* <input
                disabled={viewMode}
                defaultValue={scheduleData?.appointmentInfo?.appointment_selected_time}
                value={timeVal}
                onChange={(e: any) => setTimeVal(e.target.value)}
                type="time"
                className="w-full border border-blue-200 px-3 py-3 rounded-md"
                // {...register('start_time')}
                2022-04-17T15:30
              /> */}
              <TimePicker
              // value={timeVal}
                disabled={viewMode}
                defaultValue={scheduleData?.appointmentInfo?.appointment_selected_time ? moment(scheduleData?.appointmentInfo?.appointment_selected_date + 'T' + scheduleData?.appointmentInfo?.appointment_selected_time) : moment((new Date()))}
                onChange={(e: any) => {setTimeVal(moment(e._d).format("HH:mm:ss"))}}
              sx={{
                width:'100%',
                  '& .MuiInputBase-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#00ADEE',
                    },
                  },

                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#00ADEE',
                    },
                  },
                }} label="Time" />
              {/* <TextField
                //focused
                sx={{
                  '& .MuiInputBase-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#00ADEE',
                    },
                  },

                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#00ADEE',
                    },
                  },
                }}
                disabled={viewMode}
                defaultValue={scheduleData?.appointmentInfo?.appointment_selected_time}
                value={timeVal}
                onChange={(e: any) => setTimeVal(e.target.value)}
                id="time"
                label="Time"
                type="time"
                className="w-full shadow-none "
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              /> */}
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col gap-3 mb-[2.5rem]">
          <p className=" font-medium font-roboto text-[1.25rem]/[1.5rem] tracking-[0.025rem] text-[#202020]  ">
            Description
          </p>
          <div className="w-full flex mt-2 ">
            <TextField
              disabled={viewMode}
              defaultValue={scheduleData?.appointmentInfo?.appointment_notes}
              value={descriptionVal}
              onChange={(e: any) => setDescriptionVal(e.target.value)}
              // label="Description"
              placeholder="Enter details here..."
              color="secondary"
              className="!w-full !shadow-none "
              multiline
              minRows={3}
              size="small"
            // {...register('description')}
            />
          </div>
        </div>
        <div className=" w-full flex justify-center">
          <button
            disabled={viewMode}
            type="submit"
            className="bg-[#00ADEE] px-10 py-4 cursor-pointer rounded-[10px] text-white font-roboto font-normal text-[1.375rem]/[1.6875rem] capitalize">
            {mutateType === 'add' ? 'Create ' : 'Update'} Schedule
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateSchedule
