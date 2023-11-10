import { Icon } from '@/components/shared'
import { hideModal, showModal } from '@/store'
import { StoreThunkDispatch } from '@/types'
import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import OptOut from '../../Insurance/Landlord/OptOut'

export default function Policy() {
    const dispatch = useDispatch<StoreThunkDispatch>()
    return (
        <div className=" flex flex-col px-9 py-4 bg-inherit rounded-b-[20px]">
            <div className="flex justify-start items-center gap-2 ">
                <Icon name="healthAndSafety" className="!text-blue-500 h-10 w-10" />
                <p className=" font-roboto font-normal text-[#202020] text-[1rem]/[1.1875rem] capitalize">
                    Insurance Information
                </p>
            </div>
            <div className="flex justify-start items-center gap-2 mt-2 ">
                <Icon name="checkboxChecked" className="text-blue-700 h-6 w-6 ml-2" />
                <p className=" font-roboto font-normal text-[#202020] text-[1rem]/[1.1875rem] capitalize">
                    I accept insurance policy
                </p>
            </div>
            <div className="flex justify-end mt-12">
                <Button
                    onClick={() => {
                        dispatch(hideModal('POLICY'))
                        dispatch(
                            showModal({
                                open: true,
                                name: 'Service_Acknowledgement',
                                children: <OptOut />,
                            })
                        )
                    }}
                    variant="text"
                    className="text-2xl">
                    Next <Icon name="arrowRight" className="ml-3" />
                </Button>
            </div>
        </div>
    )
}
