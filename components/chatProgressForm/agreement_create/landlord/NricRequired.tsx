import { hideModal } from '@/store'
import { StoreThunkDispatch } from '@/types'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

function NricRequired() {
    const dispatch = useDispatch<StoreThunkDispatch>()
    return (
        <div className=" flex flex-col px-[3.25rem] py-4 bg-inherit rounded-b-[20px]">
            <h1 className="text-violet-950 font-semibold text-xl mb-2">Profile Completion Alert!</h1>
            <p className="">Full NRIC/FIN needed as per the Women's charter program</p>
            <div className="flex justify-end gap-2 mt-32">
                <Button variant="contained" onClick={() => dispatch(hideModal('NRIC_/_FIN_REQUIRED'))}>
                    Later
                </Button>
                <Link href={{ pathname: '/dashboard/personal-info', query: { complePro: true } }}>
                    <Button
                        variant="contained"
                        className=""
                        onClick={() => {
                            dispatch(hideModal('NRIC_/_FIN_REQUIRED'))
                        }}>
                        Complete Profile
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NricRequired