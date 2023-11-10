import React from 'react'
import { FormBuilder } from '../shared'

const ContactForm = () => {
  const initialFields = [
    {
      label: 'District',
      name: 'District',
      type: 'heading',
      className: ['text-blue-700', 'font-bold', 'bg-blue-200', 'p-2'],
    },
    {
      onChangeCustom: () => [{ label: 'Message', name: 'message', type: 'text' }],
      label: 'First Name*',
      name: 'firstName',
      type: 'text',
      xs: 6,
      rules: {
        required: 'Please enter your first name',
      },
    },
    {
      label: 'Last Name*',
      onChangeCustom: () => [{ label: 'Message', name: 'message', type: 'text' }],
      name: 'lastName',
      type: 'text',
      xs: 6,
      rules: {
        required: 'Please enter your last name',
      },
    },
    {
      label: 'Your Mail*',
      name: 'mail',
      type: 'email',
      xs: 6,
      rules: {
        required: 'Please enter your valid mail',
      },
    },
    {
      label: 'Phone Number*',
      name: 'phoneNumber',
      type: 'text',
      xs: 6,
      rules: {
        required: 'Please enter your phone number',
      },
      condition: {
        field: 'mail',
        conditionRender: (value: string) => value.length > 3,
        asyncOption: (_: string) => [ // value
          {
            label: 'Male',
            value: 'male',
          },
          { label: 'Female', value: 'female' },
          { label: 'Female', value: 'female' },
          { label: 'Female', value: 'female' },
        ],
      },
    },

    {
      label: 'Message',
      name: 'message',
      type: 'text',
      xs: 6,
    },
    {
      label: 'Gender',
      name: 'gender2',
      type: 'radio',
      row: false,
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        { label: 'Female', value: 'female' },
        { label: 'Female', value: 'female' },
        { label: 'Female', value: 'female' },
      ],
    },
    { label: 'File Upload', name: 'fileInput', type: 'file', xs: 4 },
    { label: 'Time', name: 'time', type: 'time', xs: 4 },
    { label: 'Date', name: 'date', type: 'date', xs: 4 },

    { label: 'I agree to the Terms & Conditions', name: 'termsAndCondition', type: 'checkbox', xs: 10 },
    { label: 'SEND MESSAGE', type: 'button', xs: 2, name: 'home', variant: 'contained' },
  ]

  // const buttons = [{ label: 'SEND MESSAGE', type: 'submit', xs: 2, name: 'button', variant: 'contained' }]

  const onSubmitHandler = (data: any) => {
    console.log('onSubmitHandler', data)
  }

  return (
    <>
      <FormBuilder onSubmit={onSubmitHandler} fields={initialFields} />
    </>
  )
}

export default ContactForm
