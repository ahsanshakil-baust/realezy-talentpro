import { Box, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'
import store, { hideLoader, hideModal, showLoader, showModal, useCreateCorporateUserMutation, useGetCorporateUserDetailsQuery, useGetCorporateUserListQuery, useMultiFileUploadMutation, useUpdateCorporateUserMutation } from '@/store'
import { StoreThunkDispatch } from '@/types'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Paper } from '@mui/material'
import ImagePro from 'public/image_p.jpeg'
import PhotoCropper from '@/components/shared/PhotoCropper/PhotoCropper'
import classNames from 'classnames'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'
import corporateUserFormValidationSchema from '@/components/shared/FormValidation/CorporateUserFormValidationSchema'
import { customFormStyle } from '@/util/customFormStyle'
import PhoneNumber from './PhoneNumber'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

function UserUpdate({ userId,refetchUserList }: any) {
    const dispatch = useDispatch<StoreThunkDispatch>()
    const { data: session }: any = useSession()
    const [imageFile, setImageFile]: any = useState(null)
  const [profPaymentFile, setProfPaymentFile]:any = useState<File | null>(null)
    const router = useRouter()
    const { data: userDetails, isLoading: detailsLoading } = useGetCorporateUserDetailsQuery({ userId: userId, parentId: session?.user?.id })
    const [updateCorporateUser, { error: updateCorporateUserError } ] = useUpdateCorporateUserMutation()
    const [uploadFiles] = useMultiFileUploadMutation()

    console.log('userDetails',userDetails)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(corporateUserFormValidationSchema({})),
    })


    const uploadImage = (e: any) => {
      setImageFile(e.target.files[0])
      const file = e.target.files[0]
      const reader: any = new FileReader()
      reader.onloadend = () => {
        setProfPaymentFile(reader.result)
      }

      if (file) {
        reader.readAsDataURL(file)
      }
    }

    const handleSubAccountForm = async (data: any) => {
      const formData = new FormData()
    formData.append('media[0]', imageFile)
    const res: any = await uploadFiles(formData)
    const url = res.data.url[0]

        try {
            dispatch(showLoader('Update Corporate user...'))

            const payload = {
                name: data?.full_name,
                email: data?.email,
                password: data?.password,
                parent_id: session?.user?.id,
                mobile: data.phone_number,
                organization_name: "Organization Name",
                organization_address: "Organization Address",
                role_id: data?.user_type,
                profile_pic: url
            }

            const response = await updateCorporateUser({userId:userId, data:JSON.stringify(payload)})


            console.log('response',response)
            if (response?.data?.message == 'User updated successfully') {
                refetchUserList()
                dispatch(hideModal("Update Sub-Account"))
                router.push('/corporate/user')
            } else {
                store.dispatch(hideLoader())
                toast.error('Error: Something went wrong')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handelHideModal = () => {
        dispatch(hideModal("Update Sub-Account"))
    }


    return (
        <div>
            <form onSubmit={handleSubmit(handleSubAccountForm)}>
                <Box sx={{ p: 2, display: 'flex', gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            sx={customFormStyle.sx_text_field}
                            fullWidth
                            id="first-name"
                            label="Full Name"
                            defaultValue={userDetails?.name}
                            className='!mb-4'
                            {...register('full_name')}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="full_name"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />

                        <FormControl fullWidth sx={{ minWidth: 120, p: 0, mb: 2 }}>
                            <InputLabel id="demo-simple-select-helper-label">User Type</InputLabel>
                            <Select
                                sx={customFormStyle.sx_text_field}
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="User Type"
                                defaultValue={userDetails?.role}
                                {...register('user_type')}
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value={1}>Sinior Manager</MenuItem>
                                <MenuItem value={2}>Manager</MenuItem>
                                <MenuItem value={3}>Executive</MenuItem>
                                <MenuItem value={4}>Staff</MenuItem>
                            </Select>
                            <ErrorMessage
                                errors={errors}
                                name="user_type"
                                render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                            />
                        </FormControl>

                        <TextField
                            sx={customFormStyle.sx_text_field}
                            fullWidth
                            id="email"
                            label="Email"
                            type="text"
                            className='!mb-4'
                            defaultValue={userDetails?.email}
                            {...register('email')}

                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />

                        <PhoneNumber register={register} errors={errors} />
                        <TextField
                            sx={customFormStyle.sx_text_field}
                            fullWidth
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            {...register('password')}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                        />

                        <Box sx={{ display: 'flex', gap: 3, mt: 2, alignItems: 'center' }}>
                            <Button type='submit' variant="contained" className='px-10 py-3 cursor-pointer'>Update</Button>
                            <button onClick={handelHideModal} type='button' className='text-[#FF3434] rounded-lg px-10 py-4 bg-transparent border border-[#FF3434] cursor-pointer'>Cancel</button>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ mb: 4, background: '#F8FBFF', borderRadius: '10px', boxShadow: .5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2.8, px: 2, gap: 2 }}>
                                <Box>
                                    {/* <Image alt='' width={'150px'} height={'150px'} objectFit='cover' className='rounded-full' src={userDetails?.profile_pic ? userDetails?.profile_pic : ImagePro} /> */}
                                    {/* src={profPaymentFile == null ? ImagePro : `${profPaymentFile}`} */}
                                   {!userDetails?.profile_pic ? '...loading': 
                                   <img className='rounded-full w-40 h-40 object-cover' src={!userDetails?.profile_pic ? `${profPaymentFile}` :userDetails?.profile_pic} alt="" />
                                   }
                                  
                                </Box>
                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button  component="label" sx={{ px: 3, py: 1, borderRadius: '6px', backgroundColor: '#D4E8FF', color: '#034EA1' }}>
                                            Upload Photo
                                            <input onChange={uploadImage} hidden accept="image/*" type="file" />
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                sx={customFormStyle.sx_text_field}
                                id="outlined-password-input"
                                label="Confirm Password"
                                type="password"
                                {...register('confirm_password')}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="confirm_password"
                                render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
                            />
                        </Box>
                    </Box>
                </Box>
            </form>
        </div>
    )
}

export default UserUpdate
