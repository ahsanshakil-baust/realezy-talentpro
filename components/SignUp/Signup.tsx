// import { Button, MenuItem, TextField, Modal, Box } from '@mui/material'
// import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSignupMutation } from '@/store'
import { useRouter } from 'next/router'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // const { register, handleSubmit, setValue, control } = useForm()
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState({
    code: '',
    name: '',
    email: '',
  })

  const router = useRouter()

  // const handleTogglePassword = () => {
  //   setShowPassword(!showPassword)
  // }

  // const handleToggleConfirmPassword = () => {
  //   setShowConfirmPassword(!showConfirmPassword)
  // }

  // const style = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // }

  // const number = [
  //   { id: '1', code: '+880', country: 'Bangladesh' },
  //   { id: '2', code: '+65', country: 'Singapore' },
  // ]
  const [signUp, {  isLoading, data: signUpData }] = useSignupMutation()

  // const signUpHandler = async (data: any) => {
  //   const respo = await axios.post('/api/initiateAuth', {
  //     username: data?.username,
  //     email: data?.email,
  //   })
  //   setCode({ code: respo.data.code, name: data?.username, email: data?.email })
  //   setOpen(prev => !prev)
  // }

  // const handlerSubmitOtp = async (data: any) => {
  //   if (parseInt(data?.otp) === parseInt(code?.code)) {
  //     signUp({
  //       email: data?.email,
  //       name: data?.username,
  //       mobile: data?.phoneNumber,
  //       country_code: data?.code,
  //       password: data?.password,
  //       device_token: 'weqwewqewqeqwewqe',
  //       login_type: 'email',
  //     })
  //   }
  //   console.log('======================', data?.otp, code?.code)
  //   setOpen(prev => !prev)
  // }

  if (!isLoading && signUpData?.status === 201) {
    alert('SignUp successful')
    router.push('/')
  }

  return false

  // return (
  //   <>
  //     <form onSubmit={handleSubmit(signUpHandler)} className="signup-form" method="post">
  //       <div className="w-4/5 h-4/5 mx-auto shadow-md p-5 rounded-md">
  //         <TextField
  //           fullWidth
  //           type="text"
  //           id="outlined-basic"
  //           label="Name"
  //           variant="outlined"
  //           {...register('username')}
  //         />
  //         <TextField
  //           className="my-5"
  //           fullWidth
  //           type="email"
  //           id="outlined-basic"
  //           label="Enter your email"
  //           variant="outlined"
  //           {...register('email')}
  //         />
  //         <div className="flex">
  //           <TextField
  //             sx={{ width: '150px' }}
  //             id="outlined-select-currency"
  //             select
  //             label="Code"
  //             defaultValue="select"
  //             {...register('code')}>
  //             {number?.map(item => {
  //               return (
  //                 <MenuItem key={item.id} value={item.code}>
  //                   {item.code}
  //                 </MenuItem>
  //               )
  //             })}
  //           </TextField>
  //           <TextField
  //             {...register('phoneNumber')}
  //             fullWidth
  //             type="text"
  //             id="outlined-basic"
  //             label="Phone number"
  //             variant="outlined"
  //           />
  //         </div>
  //         <TextField
  //           className="my-5"
  //           fullWidth
  //           type={showPassword ? 'text' : 'password'}
  //           id="password"
  //           label="Password"
  //           variant="outlined"
  //           {...register('password')}
  //           InputProps={{
  //             endAdornment: (
  //               <span className="cursor-pointer" onClick={handleTogglePassword}>
  //                 {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
  //               </span>
  //             ),
  //           }}
  //         />

  //         <TextField
  //           fullWidth
  //           type={showConfirmPassword ? 'text' : 'password'}
  //           id="confirmPassword"
  //           label="Confirm Password"
  //           variant="outlined"
  //           {...register('passConfirm')}
  //           InputProps={{
  //             endAdornment: (
  //               <span className="cursor-pointer" onClick={handleToggleConfirmPassword}>
  //                 {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
  //               </span>
  //             ),
  //           }}
  //         />
  //         <div className="CTA flex justify-between items-center mt-3">
  //           <Button type="submit" variant="contained">
  //             Submit
  //           </Button>
  //           <a href="#" className="switch ">
  //             I have an account
  //           </a>
  //         </div>
  //       </div>
  //     </form>

  //     <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
  //       <Box sx={style}>
  //         <h5>
  //           Hey, {code?.name}. We just sent you an OTP to {code?.email} for verify your email.
  //         </h5>
  //         <form onSubmit={handleSubmit(handlerSubmitOtp)}>
  //           <input className="border rounded-md w-full py-2" type="text" id="" {...register('otp')} />
  //           <button className="bg-blue-400 text-white px-2 py-1 rounded-sm " type="submit">
  //             submit
  //           </button>
  //         </form>
  //       </Box>
  //     </Modal>
  //   </>
  // )
}

export default SignUp
