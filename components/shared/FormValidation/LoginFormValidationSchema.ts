import * as yup from 'yup';

const loginformvalidationSchema =(condition:any) => yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    rememberMe: yup.string(),
  });

  export default loginformvalidationSchema;
