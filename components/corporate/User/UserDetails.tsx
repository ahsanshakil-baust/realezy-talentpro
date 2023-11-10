import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import store, { hideLoader, hideModal, showLoader, showModal, useCreateCorporateUserMutation, useGetCorporateUserDetailsQuery, useGetCorporateUserListQuery } from '@/store'
import { useSession } from 'next-auth/react'

function UserDetails({ userId }: any) {
    const { data: session }: any = useSession()
    const { data: userDetails, isLoading: detailsLoading } = useGetCorporateUserDetailsQuery({ userId: userId, parentId: session?.user?.id })

    return (
        <div>
            <Box sx={{ pl: 6, py: 5, display: 'flex', alignItems: 'end', gap: 3 }}>
                <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', border: '1px solid #D4E8FF', boxShadow: 1, borderRadius: 1 }}>
                    <img src={userDetails?.profile_pic} alt="" />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Box>
                        <Typography variant="caption" display="block" sx={{ color: "#A1A1A1" }} gutterBottom>
                            Full Name
                        </Typography>
                        <Typography variant="subtitle1" display="block" gutterBottom>
                            {userDetails?.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" display="block" sx={{ color: "#A1A1A1" }} gutterBottom>
                            Email
                        </Typography>
                        <Typography variant="subtitle1" display="block" gutterBottom>
                            {userDetails?.email}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" display="block" sx={{ color: "#A1A1A1" }} gutterBottom>
                            Account Type
                        </Typography>
                        <Typography variant="subtitle1" display="block" gutterBottom>
                            {userDetails?.role}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Box>
                        <Typography variant="caption" display="block" sx={{ color: "#A1A1A1" }} gutterBottom>
                            Phone
                        </Typography>
                        <Typography variant="subtitle1" display="block" gutterBottom>
                            +968544788411
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default UserDetails
