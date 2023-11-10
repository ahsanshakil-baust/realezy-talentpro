import * as yup from 'yup';

const corporateUserFormValidationSchema = (condition: any) => {
    return yup.object().shape({
        full_name: yup.string().required('Full name is required'),
        user_type: yup.string().required('User type is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        country_code: yup.string().required('Country code is required'),
        phone_number: yup.string().required('Phone number is required'),
        password: yup.string().required('Password is required'),
        confirm_password: yup.string().required('Confirm Password is required'),
    });
}

export default corporateUserFormValidationSchema;
