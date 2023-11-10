import corporateUserFormValidationSchema from '@/components/shared/FormValidation/CorporateUserFormValidationSchema'
import { customFormStyle } from '@/util/customFormStyle'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, TextField } from '@mui/material'
import React from 'react'

function PhoneNumber({ register, errors }: any) {
    return (
        <div>
            <Box sx={{ display: 'flex', mb: 2 }}>
                <select
                    // sx={customFormStyle.sx_text_field}
                    {...register('country_code')}
                    className=" cursor-pointer border border-[#E4F0FE] bg-[#F8FBFF] w-[110px] rounded-lg focus-visible:border-0 focus-visible:outline-0">
                    <option
                        value="+65"
                        selected
                        className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                        +65
                    </option>
                    <option
                        value="+60"
                        className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                        +60
                    </option>
                    <option
                        value="+63"
                        className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                        +63
                    </option>
                    <option
                        value="+880"
                        className="p-2 bg-[#F8FBFF] text-[#333] checked:bg-[#007bff] checked:text-[#fff]">
                        +880
                    </option>
                </select>

                <TextField
                    type="text"
                    id="outlined-basic"
                    {...register('phone_number')}
                    label="Phone number"
                    variant="outlined"
                    className="!bg-[#F1F7FF] input-variant !rounded-[10px] !w-[100%]  !font-normal !font-roboto  !text-[16px] !tracking-[0.32px] !text-[#505050]  !opacity-100 "
                    sx={customFormStyle.sx_text_field}
                />
            </Box>

            <ErrorMessage
                errors={errors}
                name="phone_number"
                render={({ message }) => <p className=" !text-red-500 !text-xs">{message}</p>}
            />
        </div >
    )
}

export default PhoneNumber