import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import { Switch } from '@mui/material';
import { useDeleteCorporateUserMutation, useGetCorporateUserListQuery } from '@/store';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import Image from 'next/image';
import store, { hideLoader, hideModal, showLoader, showModal } from '@/store'
import UserDetails from './UserDetails';
import UserUpdate from './UserUpdate';
import { CircularProgress } from '@mui/material';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

function AccountTable({userList,userLoading,refetchUserList}:any) {
  const { data: session }: any = useSession()

    const [deleteCorporateUser, { error: deleteCorporateUserError }] = useDeleteCorporateUserMutation()
    

    const [count, setCount] = useState(0)
    
    const handleCorporateUserDetails = (userId: any) => {
        store.dispatch(
            showModal({
                open: true,
                name: 'Details Sub-Account',
                children: (<UserDetails userId={userId} />),
                className: '',
            })
        )
    }

    const handleCorporateUserUpdate = (userId: any) => {
        store.dispatch(
            showModal({
                open: true,
                name: 'Update Sub-Account',
                children: (<UserUpdate userId={userId} refetchUserList={refetchUserList}/>),
                className: '',
            })
        )
    }

    const handleCorporateUserRemove = async (userId: any) => {
        const payload = {
            parentId: session?.user?.id,
            userId
        }

        store.dispatch(
            showModal({
                open: true,
                name: 'Remove Sub-Account',
                children: <div className=" w-full max-h-[520px] 2xl:max-h-[700px] px-[3.25rem] py-4 rounded-b-[20px] overflow-auto gap-4 ">
                <p className="font-normal font-roboto text-[1.25rem]/[1.5rem] tracking-[0.025rem] text-[#202020]">
                Are you sure want to delete?
                </p>
                <div className="flex justify-end gap-2 mt-8">
                  <Button
                    variant="contained"
                    onClick={async() =>{
                        const response = await deleteCorporateUser(payload)

                        if(response?.data?.status == 204){
                            refetchUserList()
                            store.dispatch(hideModal('Remove Sub-Account'))
                        }
                    }}
                    >
                    Yes
                  </Button>
                  <Button variant="contained" onClick={() => store.dispatch(hideModal('Remove Sub-Account'))}>
                    No
                  </Button>
                </div>
              </div>,
                className: '',
            })
        )


    }

    return (
        <>
            {userLoading ?
                <div className='flex justify-center'>
                    <CircularProgress />
                </div>
                :
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow component={Paper}>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Supervisor</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList?.users.map((item: any) => (
                                <TableRow

                                    key={item?.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <div className='flex items-center gap-2'>
                                            <img src={item?.profile_pic ? item?.profile_pic : 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/dev/64ffe14a5edb9.jpg'} alt="" className="w-7 h-7 rounded-full object-cover" />
                                            {item?.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{item?.role}</TableCell>
                                    <TableCell>{item?.parent_name}</TableCell>
                                    <TableCell>
                                        <Switch sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#00ADEE',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#B2E9FF',
                                            },
                                        }} {...label} defaultChecked />
                                    </TableCell>
                                    <TableCell>
                                        <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <button className='border border-[#00ADEE] bg-transparent px-4 py-2 rounded-md text-base text-[#00ADEE] cursor-pointer' onClick={() => handleCorporateUserDetails(item.id)}>
                                                Details
                                            </button>
                                            <button className='border border-[#00ADEE] bg-transparent px-4 py-2 rounded-md text-base text-[#00ADEE] cursor-pointer' onClick={() => handleCorporateUserUpdate(item.id)}>
                                                Edit
                                            </button>
                                            <button className='border border-[#00ADEE] bg-transparent px-4 py-2 rounded-md text-base text-[#00ADEE] cursor-pointer' onClick={() => handleCorporateUserRemove(item.id)}>
                                                Remove
                                            </button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>

    )
}

export default AccountTable
