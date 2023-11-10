import * as yup from 'yup';

const propertyFormValidationSchema =(condition:any) => {
  // console.log("condition",condition);
  return yup.object().shape({

    property_name: yup.string().max(40, `Property name max limit 40 character`).when('property_type', {
        is: '45', //Condo
        then: (schema) => schema.required(`Property Name is required`),
        otherwise: (schema) => schema,
        }),
    rental_type: yup.string().required(`Rental Type is required`),
    property_type: yup.string().required(`Property Type is required`),
    postal_code: yup.number().typeError(`Accept only digit`).min(6, `Post code number minimum 6 digit`).positive(`Input must be positive number`).required(`Postal Code is required`),
    address: yup.string().required(`Address is required`),


    unit_number: yup.string().when('property_type', {
      is: '45',
      then: (schema) => schema.required(`Unit number is required`),
      otherwise: (schema) => schema,
      }).when('property_type', {
        is: '47', //HDB
        then: (schema) => schema.required(`Unit number is required`),
        otherwise: (schema) => schema,
        }),


    rental_amount: condition.submitType == `3` ? yup.string() : yup.string().required(`Rental Amount is required`),
    available_from: condition.submitType == `3` ? yup.string() : yup.string().required(`Available From is required`),
    floor_size: condition.submitType == `3` ? yup.string() : yup.string().required(`Floor Size is required`),
    bedroom: condition.submitType == `3` ? yup.string() : yup.string().required(`Bedroom is required`),
    bathroom: condition.submitType == `3` ? yup.string() : yup.string().required(`Bathroom is required`),
    facing: yup.string(),
    gender: yup.string(),
    district: yup.string(),
    floor_level: yup.string(),
    furnishing: yup.string(),
    room_facilities: yup.string(),
    facilities: yup.string(),
    amenities: yup.string(),
    description: yup.string(),
    hdb_estate: condition.submitType == `3` 
      ? 
      yup.string() 
      : 
      yup.string().when('property_type', {
        is: '47', //HDB
        then: (schema) => schema.required(`HDB estate is required`),
        otherwise: (schema) => schema,
        }),
    rent_term: yup.string(),
    unit_type: yup.string(),
  });
}

  export default propertyFormValidationSchema;
