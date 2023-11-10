import { useCheckEmailMutation } from '@/store';
import { postRequest } from '@/util/axios';
import * as yup from 'yup';

const emailregistrationformvalidationSchema =(condition:any) =>  yup.object().shape({
    username: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required')
    .test(
      'email',
      `Email address exist`,
      async (value, testContext) =>
        (await postRequest('index.php/auth/check-email-or-phone', JSON.stringify({email: value})))?.status == '200',
    ),
    countryCode: yup.string().required('Country Code is required'),
    phoneNumber: yup.number().required(`Phone number is required`).typeError(`Accept only digit`).positive(`Input must be positive number`)
    .test(
      'phoneNumber',
      `Phone number exist`,
      async (value, testContext) =>
        (await postRequest('index.php/auth/check-email-or-phone', JSON.stringify({mobile: value})))?.status == '200',
    ),
    password: yup.string().required('Password is required').min(6, 'Password is too short - should be 6 chars minimum.'),
    passConfirm: yup.string().required('Confirm Password is required').min(6, 'Password is too short - should be 6 chars minimum.').oneOf([yup.ref('password'), ''], 'Passwords must match'),
    rememberMe: yup.string(),
  });


  export default emailregistrationformvalidationSchema;
