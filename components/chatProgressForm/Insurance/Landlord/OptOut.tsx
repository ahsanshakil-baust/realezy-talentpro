import { Icon } from '@/components/shared'
import { hideModal, showModal } from '@/store'
import { SEND_AGREEMENT_CREATE } from '@/store/chatProgress/progress/constant'
import { StoreThunkDispatch } from '@/types'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CreateAgreement from '../../agreement_create/landlord/CreateAgreement'

const OptOut = () => {
  const [opt, setOpt] = useState(true)
  const dispatch = useDispatch<StoreThunkDispatch>()
  return (
    <div className=" flex flex-col px-9 py-4 bg-inherit rounded-b-[20px]">
      <h1 className="flex gap-4 text-2xl text-blue-800">
        <Icon name="briefcase" className="h-7 w-7" />
        Mananged Services
      </h1>
      <p className="text-justify">
        All landlords are automatically subscribed to REALEZY's Managed Services, at a monthly rate of 2% of the monthy
        rent.
      </p>
      <div>
        <p>Managed Service included:</p>
        <p className="mt-2 text-justify">
          Conceirge Services for assisting with maintenance or repairs requests, Monthly rent collection, disbursements
          & reminders, as well as statement of acounts, and Matters arising from disputes, eviction or on insurance
          claims.
        </p>
      </div>
      <p>If you {opt ? 'do not ' : ''}wish to subscribe to Managed Services, please click the option below:</p>
      {/* onClick={()=> setOpt((prev: any) => !prev)} */}
      <Button
        variant="text"
        className={opt ? '!bg-red-500 !rounded-lg' : '!bg-blue-500 !rounded-lg'}
        onClick={() =>
          dispatch(
            showModal({
              open: true,
              name: 'Managed_Service',
              children: (
                <div>
                  <p
                    className={
                      opt
                        ? 'flex gap-2 text-justify text-xl text-red-600 items-center'
                        : 'flex gap-2 text-justify text-xl text-blue-600 items-center'
                    }>
                    <Icon name="triExclamation" /> Opt-{opt ? 'out' : 'in'} of Managed Service
                  </p>
                  <div className="flex justify-end gap-3 mt-16">
                    <Button variant="contained" onClick={() => dispatch(hideModal('Managed_Service'))}>
                      Return
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(hideModal('Managed_Service'))
                        setOpt((prev: any) => !prev)
                      }}>
                      Confirm
                    </Button>
                  </div>
                </div>
              ),
            })
          )
        }>
        Opt-{opt ? 'out' : 'in'}
      </Button>
      <p>Opt-out of Managed Services</p>
      <p className="text-justify">
        <div className="flex justify-start items-center gap-2">
          {!opt ? (
            <Icon name="checkboxChecked" className="text-blue-700 h-14 w-14" />
          ) : (
            <Icon name="checkboxUnchecked" className="text-blue-700 h-14 w-14" />
          )}{' '}
          I understand that by opting out, I will not enjoy the above services and will communicate directly with the
          tenant to resolve requests and other matters arising
        </div>
      </p>
      <div className="flex justify-end mt-12">
        <Button
          onClick={() => {
            dispatch(hideModal('Service_Acknowledgement'))
            dispatch(
              showModal({
                open: true,
                name: SEND_AGREEMENT_CREATE,
                children: <CreateAgreement optIn={opt} />,
                className: '',
              })
            )
          }}
          variant="text"
          className="text-2xl">
          Continue <Icon name="arrowRight" className="!ml-3" />
        </Button>
      </div>
    </div>
  )
}

export default OptOut
