import { postRequest } from '@/util/axios'
import { makeStyles } from '@mui/styles'
import { Checkbox, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import store, { hideModal, showModal } from '@/store'
import { Button } from '@mui/material'
import Link from 'next/link'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { watch } from 'fs'

const HmContactUs = () => {
  const characterLimit = 500
  const {
    register,
    handleSubmit,
    // watch,
    control,
    // formState: { errors },
  } = useForm()

  const handleContactUs = async (data: any) => {
    const contactFormData = {
      // potential_landlord: potential_landlord,
      // potential_tenant: potential_tenant,
      first_name: data?.first_name,
      // last_name: data?.last_name,
      user_type: data?.user_type,
      email: data?.email,
      mobile: data?.phone,
      message: data?.message,
    }

    const response = await postRequest('https://dev-api.real-ezy.com/index.php/Inquiry/storeInquiry', contactFormData)
    const { message, status } = response
    if (status === 200) {
      toast.success(message)
    }
  }

  const useStyles = makeStyles((_: any) => ({
    select: {},
    input: {
      borderRadius: '10px',
      '& .MuiOutlinedInput-root': {
        '& > fieldset': {
          border: '1px solid #D1D1D1',
          // borderRadius: '10px',
        },
        '&.Mui-focused': {
          '& > fieldset': {
            borderColor: '#00ADEE',
          },
        },
      },
      '& .MuiFormLabel-root': {
        '&.Mui-focused': {
          color: '#00ADEE',
        },
      },
      '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
          border: '1px solid #00ADEE',
        },
      },
      '&:hover .MuiInputLabel-root': {
        color: '#00ADEE',
      },
    },
  }))
  const classes = useStyles()
  const dispatch = useDispatch()
  const [termsCondition, setTermsCondition] = useState(false)

  const handleTermsCondition = (e: any) => {
    setTermsCondition(prev => !prev)

    dispatch(hideModal('Terms and conditions'))
  }

  // const openTermsCondition = () => {
  //   //OPEN MODAL WITH IFRAME

  //   store.dispatch(
  //     showModal({
  //       open: true,
  //       name: 'Terms and conditions',
  //       children: (
  //         <div className="p-3">
  //           <iframe src="https://real-ezy.com/terms-and-conditions.html" width="100%" height="400"></iframe>

  //           <div className="flex justify-center pt-6">
  //             <Button variant="contained" id="terms_condition" onClick={handleTermsCondition}>
  //               I Read & Agree
  //             </Button>
  //           </div>
  //         </div>
  //       ),
  //       className: '',
  //     })
  //   )
  // }

  return (
    <section className="flex flex-col items-center gap-y-5 py-[15px] sm:py-[25px]  md:py-[40px] lg:py-[55px] xl:py-[78px] 2xl:py-[90px]  bg-[#F1F7FF] ">
      <section className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] w-full relative z-20 overflow-hidden bg-[#F1F7FF] ">
        <div className="w-[90%] md:w-full m-auto">
          <div className=" flex flex-wrap">
            <div className="w-full  lg:w-5/12">
              <div className="w-full ">
                <div className="mb-[65px] max-w-[620px] lg:mb-[65px]">
                  <h2 className=" font-semibold text-[#00ADEE] text-[1.5rem]/[2rem]  md:text-[2rem]/[2.4rem] 2xl:text-[2.5rem]/[3rem] text-left font-roboto capitalize   ">
                    Message us
                  </h2>
                  <p className="text-[#505050] font-normal text-base/[1.2rem] md:text-[1.2rem]/[1.5rem] 2xl:text-[1.5rem]/[1.875rem] text-left font-roboto  tracking-[0.16px] xl:tracking-[0.20px] 2xl:tracking-[0.24px] 2xl:mt-4 md:mt-3 mt-2">
                    We'd love to hear about your experience with us.
                  </p>
                </div>
              </div>
              <div className="m-0 hidden">
                <ul className="w-full rounded-lg mt-0 mb-3 text-[#034EA1]">
                  <li>
                    <a
                      href="mailto:support@real-ezy.com"
                      className="w-fill flex wow fadeInUp rounded-lg bg-transparent px-10 pt-6 pb-6 shadow-[0px_0px_15px_rgba(3,78,161,0.12)]">
                      <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-lg bg-[#F8FBFF] mr-5  shadow-[0px_0px_8px_rgba(3,78,161,0.2)]">
                        <img src="/download/email-icon.png" alt="image" className="w-[35px] h-[25px] " />
                      </div>
                      <h3 className="ml-2 mb-3 text-xl font-bold text-[#00adee] text-[20px] pt-1">
                        Mail us for information
                        <br />
                        <p className=" mt-3 text-[#034EA1] text-sm font-normal">support@real-ezy.com</p>
                      </h3>
                    </a>
                  </li>
                  {/*
                  <li className="my-5">
                    <a
                      href="https://api.whatsapp.com/send?phone=88595303"
                      className="w-fill flex wow fadeInUp rounded-lg bg-transparent px-10 pt-6 pb-6 shadow-[0px_0px_15px_rgba(3,78,161,0.12)]">
                      <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-lg bg-[#F8FBFF] mr-5  shadow-[0px_0px_8px_rgba(3,78,161,0.2)]">
                        <img src="/download/call-icon.png" alt="image" className="w-[30px] h-[30px] " />
                      </div>
                      <h3 className="ml-2 mb-3 text-xl font-bold text-[#00adee] text-[20px] pt-1">
                        Contact us
                        <br />
                        <p className="mt-3 text-[#034EA1] text-sm font-normal">88595303</p>
                      </h3>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="w-full pl-0 lg:pl-8 lg:w-7/12 py-2">
              <div
                className="wow fadeInUp rounded-lg bg-transparent p-12 shadow-[0px_0px_15px_rgba(3,78,161,0.12)]"
                data-wow-delay=".2s">
                <form
                  onSubmit={handleSubmit(handleContactUs)}
                  id="contact-form"
                  method="POST"
                  // action="https://dev-api.real-ezy.com/index.php/Inquiry/storeInquiry"
                >
                  <div className="contact-form ">
                    <div className="flex flex-wrap ">
                      <div className="grid md:grid-cols-2 gap-6 md:gap-12 xl:gap-[60px] relative z-0 w-full mb-4 md:mb-[1.5rem] 2xl:mb-[1.875rem] group px-0">
                        {/* <div className="relative z-0 w-full mb-0 group"> */}
                        {/* <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          className="block focus:bg-[#F8FBFF] py-[14px] px-[14px] w-full rounded text-sm text-gray-900 shadow-[0px_0px_8px_rgba(3,78,161,0.2)] bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:ring-0 focus:border-[#00adee] focus:border focus:py-[13px] focus:outline-[#00adee] focus:shadow-none focus:outline-0 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="first_name"
                          className="peer-focus:font-medium  absolute px-5 font-normal text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#00adee] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:z-40 peer-focus:bg-gray-50 peer-focus:px-3 peer-focus:ml-2  peer-focus:scale-75 peer-focus:-translate-y-6">
                          First name
                        </label> */}
                        <TextField
                          {...register('first_name')}
                          fullWidth
                          required
                          type="text"
                          id="outlined-basic"
                          label="First Name"
                          variant="outlined"
                          // className="!block  !rounded-[10px] !w-full !text-sm !text-gray-900 !bg-[#F8FBFF] !border-0 !border-gray-300 !appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:!ring-0 focus:!border-[#00adee] focus:!border focus:!py-[13px] focus:!outline-[#00adee] focus:!shadow-none focus:!outline-0 hover:!border-[#034EA133] peer"
                          className={`${classes.input}`}
                          InputProps={{
                            style: {
                              borderRadius: '10px',
                            },
                          }}
                        />
                        {/* </div> */}
                        {/* <div className="relative z-0 w-full mb-0 group">
                          <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="block focus:bg-[#F8FBFF] py-[14px] px-[14px] w-full rounded text-sm text-gray-900 shadow-[0px_0px_8px_rgba(3,78,161,0.2)] bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:ring-0 focus:border-[#00adee] focus:border focus:py-[13px] focus:outline-[#00adee] focus:shadow-none focus:outline-0 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute px-5 font-normal text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#00adee] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:z-40 peer-focus:bg-gray-50 peer-focus:px-3 peer-focus:ml-2  peer-focus:scale-75 peer-focus:-translate-y-6">
                            Last name
                          </label>
                        </div> */}
                        {/* <TextField
                          {...register('last_name')}
                          fullWidth
                          required
                          type="text"
                          label="Last Name"
                          id="outlined-basic"
                          variant="outlined"
                          className={`${classes.input}`}
                          // className="!block focus:!bg-[#F7FAFF] !rounded-[10px] !w-full !text-sm !text-gray-900  !bg-[#F8FBFF] !border-0 !border-gray-300 !appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:!ring-0 focus:!border-[#00adee] focus:!border focus:!py-[13px] focus:!outline-[#00adee] focus:!shadow-none focus:!outline-0 peer"
                          InputProps={{
                            style: {
                              borderRadius: '10px',
                            },
                          }}
                        /> */}
                        <FormControl fullWidth className={`${classes.input}`}>
                          <InputLabel id="demo-simple-select-label">Select User Type</InputLabel>
                          <Select
                            sx={{
                              '& .MuiSvgIcon-root': {
                                width: '30px',
                              },
                            }}
                            MenuProps={{ disableScrollLock: true }}
                            IconComponent={ExpandMoreIcon}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select User Type"
                            {...register('user_type')}>
                            <MenuItem value="tenant">Tenant</MenuItem>
                            <MenuItem value="landlord">Landlord</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 md:gap-10 xl:gap-[60px] relative z-0 w-full mb-4 md:mb-[1.5rem] 2xl:mb-[1.875rem] group px-0">
                        {/* <div className="relative z-0 w-full mb-0 group">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="block focus:bg-[#F8FBFF] py-[14px] px-[14px] w-full rounded text-sm text-gray-900 shadow-[0px_0px_8px_rgba(3,78,161,0.2)] bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:ring-0 focus:border-[#00adee] focus:border focus:py-[13px] focus:outline-[#00adee] focus:shadow-none focus:outline-0 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute px-5 font-normal text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#00adee] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:z-40 peer-focus:bg-gray-50 peer-focus:px-3 peer-focus:ml-2  peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email address
                          </label>
                        </div> */}{' '}
                        <TextField
                          fullWidth
                          required
                          type="email"
                          id="outlined-basic"
                          label="Email"
                          placeholder="Your email"
                          variant="outlined"
                          {...register('email')}
                          className={`${classes.input}`}
                          // className="!block focus:!bg-[#F7FAFF] !rounded-[10px] !w-full !text-sm !text-gray-900  !bg-[#F8FBFF] !border-0 !border-gray-300 !appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:!ring-0 focus:!border-[#00adee] focus:!border focus:!py-[13px] focus:!outline-[#00adee] focus:!shadow-none focus:!outline-0 peer"
                          InputProps={{
                            style: {
                              borderRadius: '10px',
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          required
                          type="tel"
                          id="outlined-basic"
                          label="Phone"
                          placeholder="Phone number"
                          variant="outlined"
                          {...register('phone')}
                          className={`${classes.input}`}
                          // className="!block focus:!bg-[#F7FAFF] !rounded-[10px] !w-full !text-sm !text-gray-900  !bg-[#F8FBFF] !border-0 !border-gray-300 !appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:!ring-0 focus:!border-[#00adee] focus:!border focus:!py-[13px] focus:!outline-[#00adee] focus:!shadow-none focus:!outline-0 peer"
                          InputProps={{
                            style: {
                              borderRadius: '10px',
                            },
                          }}
                        />
                      </div>

                      {/* <TextField
                        fullWidth
                        required
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={4}
                        {...register('message')}
                        className={`${classes.input}`}

                      /> */}

                      <Controller
                        {...register('message')}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            sx={{
                              '& .MuiFormHelperText-root': {
                                marginTop: '16px',
                                marginBottom: '0px',
                                marginLeft: '0px',
                                marginRight: '0px',
                                color: '#999999',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                              },
                              '& .MuiFormHelperText-root.Mui-focused': {
                                boxShadow: 'none',
                              },
                            }}
                            variant="outlined"
                            fullWidth
                            // required
                            {...field}
                            multiline
                            rows={4}
                            label="Message..."
                            // {...register('message')}
                            className={`${classes.input}`}
                            inputProps={{
                              maxLength: characterLimit,
                            }}
                            helperText={`Character count: ${field.value.length}/${characterLimit}`}
                            // error={formState.errors.multilineText}
                          />
                        )}
                      />

                      {/* <div className="w-full sm:w-full px-0 mb-0 flex items-center justify-between"> */}
                      <div className="w-full flex items-start mt-3 md:mt-4 2xl:mt-6">
                        <div className="flex items-center">
                          <Controller
                            control={control}
                            name=""
                            render={({ field }) => (
                              <input
                                id="remember"
                                className=" hidden w-4 h-4 shadow-[0px_0px_8px_rgba(3,78,161,0.2)] border-0 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                type="checkbox"
                                {...field}
                                {...register('terms')}
                              />
                            )}
                          />
                          {!termsCondition ? (
                            <Link href="/terms-and-condition">
                              <a target="_blank" rel="noopener noreferrer">
                                <div className=" text-center ">
                                  <div
                                    className="w-full h-auto flex justify-center items-center   "
                                    onClick={handleTermsCondition}>
                                    <Checkbox
                                      disabled
                                      id="terms_condition"
                                      checked={termsCondition}
                                      sx={{
                                        padding: '0px',
                                        color: '#D1D1D1',
                                        '& .MuiSvgIcon-root': {
                                          fontSize: 30,
                                        },
                                      }}
                                    />
                                    <label
                                      style={{ color: '#707070' }}
                                      htmlFor="terms_condition"
                                      className="text-base font-roboto font-light cursor-pointer 2xl:ml-5 md:ml-4 ml-3">
                                      I agree to the <span className="text-[#034EA1]"> Terms &amp; Conditions </span>
                                    </label>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          ) : (
                            <div className="text-center ">
                              <div
                                className="w-full h-auto flex justify-center items-center   "
                                onClick={handleTermsCondition}>
                                <Checkbox
                                  disabled
                                  id="terms_condition"
                                  checked={termsCondition}
                                  sx={{
                                    padding: '0px',
                                    color: '#D1D1D1',
                                    '& .MuiSvgIcon-root': {
                                      fontSize: 30,
                                    },
                                  }}
                                />
                                <label
                                  style={{ color: '#707070' }}
                                  htmlFor="terms_condition"
                                  className="text-base font-roboto font-light cursor-pointer 2xl:ml-5 md:ml-4 ml-3">
                                  I agree to the <span className="text-[#034EA1]"> Terms &amp; Conditions </span>
                                </label>
                              </div>
                            </div>
                          )}
                          {/* <p className="text-red-500">
                      {errors.termsCondition && <span>{errors.termsCondition.message}</span>}
                    </p> */}
                          {/* </div> */}

                          {/* <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className=" w-4 h-4 shadow-[0px_0px_8px_rgba(3,78,161,0.2)] border-0 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required
                          /> */}
                        </div>
                        {/* <div className="ml-3 text-sm">
                          <label htmlFor="remember" className=" text-gray-400 dark:text-gray-900 ">
                            I agree to the Terms &amp; Conditions
                          </label>
                        </div> */}
                      </div>

                      {/* </div> */}
                      <button
                        id="form-submit"
                        type="submit"
                        value="submit"
                        className=" cursor-pointer mt-8 md:mt-10 2xl:mt-12 capitalize 2xl:text-[1.5rem]/[1.875rem] md:text-[1.2rem]/[1.5rem] text-base/[1.25rem] font-normal bg-[#00adee] hover:bg-[#034EA1]  text-white 2xl:py-5 md:py-4 py-3 2xl:px-[3rem] md:px-[2.4rem] px-8 rounded-[10px] w-auto focus:outline-none focus:shadow-outline">
                        {/*<img class="flex-none w-6 h-full pt-2" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDM4LjUzNiA0MzguNTM2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzguNTM2IDQzOC41MzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzIyLjYyMSw0Mi44MjVDMjk0LjA3MywxNC4yNzIsMjU5LjYxOSwwLDIxOS4yNjgsMGMtNDAuMzUzLDAtNzQuODAzLDE0LjI3NS0xMDMuMzUzLDQyLjgyNSAgIGMtMjguNTQ5LDI4LjU0OS00Mi44MjUsNjMtNDIuODI1LDEwMy4zNTNjMCwyMC43NDksMy4xNCwzNy43ODIsOS40MTksNTEuMTA2bDEwNC4yMSwyMjAuOTg2ICAgYzIuODU2LDYuMjc2LDcuMjgzLDExLjIyNSwxMy4yNzgsMTQuODM4YzUuOTk2LDMuNjE3LDEyLjQxOSw1LjQyOCwxOS4yNzMsNS40MjhjNi44NTIsMCwxMy4yNzgtMS44MTEsMTkuMjczLTUuNDI4ICAgYzUuOTk2LTMuNjEzLDEwLjUxMy04LjU2MiwxMy41NTktMTQuODM4bDEwMy45MTgtMjIwLjk4NmM2LjI4Mi0xMy4zMjQsOS40MjQtMzAuMzU4LDkuNDI0LTUxLjEwNiAgIEMzNjUuNDQ5LDEwNS44MjUsMzUxLjE3Niw3MS4zNzgsMzIyLjYyMSw0Mi44MjV6IE0yNzAuOTQyLDE5Ny44NTVjLTE0LjI3MywxNC4yNzItMzEuNDk3LDIxLjQxMS01MS42NzQsMjEuNDExICAgcy0zNy40MDEtNy4xMzktNTEuNjc4LTIxLjQxMWMtMTQuMjc1LTE0LjI3Ny0yMS40MTQtMzEuNTAxLTIxLjQxNC01MS42NzhjMC0yMC4xNzUsNy4xMzktMzcuNDAyLDIxLjQxNC01MS42NzUgICBjMTQuMjc3LTE0LjI3NSwzMS41MDQtMjEuNDE0LDUxLjY3OC0yMS40MTRjMjAuMTc3LDAsMzcuNDAxLDcuMTM5LDUxLjY3NCwyMS40MTRjMTQuMjc0LDE0LjI3MiwyMS40MTMsMzEuNSwyMS40MTMsNTEuNjc1ICAgQzI5Mi4zNTUsMTY2LjM1MiwyODUuMjE3LDE4My41NzUsMjcwLjk0MiwxOTcuODU1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                         */}
                        Send Message
                      </button>
                      {/*
                <div class="w-full sm:w-full px-3 mt-3">
                  <button
                    class="uppercase text-sm font-bold tracking-wide bg-blue-800 text-white py-4 px-8 rounded-lg w-auto focus:outline-none focus:shadow-outline">
                    Send Message
                  </button>
                </div>
                */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Contact Form Section End */}
    </section>
  )
}

export default HmContactUs
