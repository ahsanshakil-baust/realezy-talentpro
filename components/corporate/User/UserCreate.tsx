import { Box, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'
import store, {
  hideLoader,
  hideModal,
  showLoader,
  showModal,
  useCreateCorporateUserMutation,
  useGetCorporateUserListQuery,
  useMultiFileUploadMutation,
} from '@/store'
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

function UserCreate({refetchUserList}:any) {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const [imageFile, setImageFile]: any = useState(null)
  const [profPaymentFile, setProfPaymentFile] = useState<File | null>(null)
  // const session = store.getState().session
  const { data: session }: any = useSession()

  const router = useRouter()
  const [createCorporateUser, { error: createCorporateUserError }] = useCreateCorporateUserMutation()
  const [uploadFiles] = useMultiFileUploadMutation()
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
    console.log('e.target.files[0]', e.target.files[0])
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
      store.dispatch(showLoader('Adding Corporate user...'))
      const payload = {
        name: data?.full_name,
        email: data?.email,
        password: data?.password,
        parent_id: session?.user?.id,
        mobile: data.phone_number,
        organization_name: 'Organization Name',
        organization_address: 'Organization Address',
        role_id: data?.user_type,
        profile_pic: url,
      }
      const response = await createCorporateUser(JSON.stringify(payload))
      console.log("🚀 ~ file: UserCreate.tsx:86 ~ handleSubAccountForm ~ response:", response?.data?.message)
      

      if (response?.data?.message == "User created successfully") {
        refetchUserList()
        store.dispatch(hideLoader())
        dispatch(hideModal('Add Sub-Account'))
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
    store.dispatch(hideModal('Add Sub-Account'))
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
                {...register('user_type')}>
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
              <Button type="submit" variant="contained" className="px-10 py-3 cursor-pointer">
                Create
              </Button>
              <button
                onClick={handelHideModal}
                type="button"
                className="text-[#FF3434] rounded-lg px-10 py-4 bg-transparent border border-[#FF3434] cursor-pointer">
                Cancel
              </button>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 4, background: '#F8FBFF', borderRadius: '10px', boxShadow: 0.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2.8, px: 2, gap: 2 }}>
                <Box>
                  {/*  <Image alt='image' width={'150px'} height={'150px'} objectFit='cover' className='rounded-full' src={ImagePro} /> */}
                  <Image
                    src={profPaymentFile == null ? '/no_profile.jpg' : `${profPaymentFile}`}
                    alt="no-fall-back"
                    width={'150px'} height={'150px'} objectFit='cover'
                    className='rounded-full'
                  />
                </Box>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ px: 3, py: 1, borderRadius: '6px', backgroundColor: '#D4E8FF', color: '#034EA1' }}>
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

export default UserCreate
