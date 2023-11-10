import moment from 'moment';
import * as yup from 'yup';

const validationSchema = (condition: any) => {

  return yup.object().shape({

    name: yup.string().required('Name is required'),
    email: yup.string(),
    mobile: yup.string(),
    date_of_birth: yup.mixed().nullable()
    // .test(
    //   "date_of_birth",
    //   "Age must be greater than or equal to 18",
    //   value => {
    //     return moment().diff(moment(value), 'years') >= 18;
    //   },
    // )
    ,
    age: condition ?
      yup.string() :
      yup.string()
        .required('Age is required'),

    gender: condition ?
      yup.string() :
      yup.string()
        .required('Gender is required'),

    marital_status: condition ?
      yup.string() :
      yup.string()
        .required("Maritial Statuse is required"),

    education_level: condition ?
      yup.string() :
      yup.string()
        .required("Education Lavel is required"),

    localForeigner: condition ?
      yup.string() :
      yup.string()
        .required(" Local/Foreigher is required"),

    id_type: condition ?
      yup.string()
        .required("ID Type is required")
      : yup.string().when('localForeigner', {
        is: (value: any) => value !== 'Foreigner (1st Timer)',
        then: (value) => value.required("Prefix Letter is required"),
        otherwise: (value) => value,
      }),

    nric_fin: condition ?
      yup.string()
        .required("NRIC/FIN is required")
        .min(8, "NRIC/FIN must have 8 characters")
        .max(8, "NRIC/FIN must have 8 characters")
        .matches(/^[a-zA-Z0-9]{7}[a-zA-Z]$/, "Last character must be a letter")
        .matches(/^\d{7}[a-zA-Z]$/, "Only last character will be a letter")
      : yup.string().when('localForeigner', {
        is: (value: any) => value !== 'Foreigner (1st Timer)',
        then: (value) => value.required("NRIC/FIN is required")
          .min(8, "NRIC/FIN must have 8 characters")
          .max(8, "NRIC/FIN must have 8 characters")
          .matches(/^[a-zA-Z0-9]{7}[a-zA-Z]$/, "Last character must be a letter")
          .matches(/^\d{7}[a-zA-Z]$/, "Only last character will be a letter"),
        otherwise: (value) => value,
      }),

    nationality: yup.string(),
    user_nationality: yup.string(),

    race: yup.string(),

    address: condition ?
      yup.string()
        .required("Address is required")
      :
      yup.string(),

    occupation: condition ?
      yup.string() :
      yup.string()
        .required("Occupation is required"),

    employer_name: yup.string(),

    business_name: yup.string(),

    university_name: yup.string(),

    pass_type: yup.string(),

    salary: condition ?
      yup.string() :
      yup.string()
        .required("Salary is required"),

    outstanding_loan: condition ?
      yup.string() :
      yup.string()
        .required("Outstanding Loans is required"),

    passport_no: yup.string().when('localForeigner', {
      is: 'Foreigner (1st Timer)',
      then: (value) => value.required('Full Passport/FIN needed as the Landlord needs to apply for HDB approval'),
      otherwise: (value) => value,
    }),

    cbs_score: condition ?
      yup.string()
      : yup.string().when('localForeigner', {
        is: (value: any) => value !== 'Foreigner (1st Timer)',
        then: (value) => value.required('CBS score is required'),
        otherwise: (value) => value,
      }),


    nric_front: yup.string(),
    nric_back: yup.string(),
    credit_report: yup.mixed().when('localForeigner', {
      is: 'Foreigner (Returning)',
      then: (value) => value.required('Credit report is required'),
      otherwise: (value) => value,
    }),
  })
};

export default validationSchema;