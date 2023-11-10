import * as yup from 'yup';

const rentalProposalFormValidationSchema = (data: any) => {
    let occupiersCount = 0;
    data?.userInfo?.occupiers_salary_list && Object.entries(data?.userInfo?.occupiers_salary_list).map(([key, item]: any) => {
        if (parseInt(item) > 0) occupiersCount++
    })

    return yup.object().shape({

        leasing_period: yup.string().required(`Leasing Period is required`),

        //SHOULD NOT BEFORE PROPERTY AVAILABLE PREVIOUS DATE
        commencement_date: yup.string().required(`Commencement Date is required`),

        //SHOULD BE DIGIT, NOT NEGATIVE, NOT ZERO, AMOUNT SHOULD NOT BE BELLOW OR EQUAL THAN OFFER AMOUNT
        offer_amount: yup.number().typeError(`Accept only digit`).positive(`Input must be positive number`)
            .test(
                'offer_amount',
                `Offer amount must be less than or equal to your max rantal amount. Your max rental amount is ${data?.userInfo?.max_rental_range}`,
                async (value: any, testContext) =>
                    data?.userInfo?.max_rental_range >= value,
            ),
        tenant_type: yup.string().required(`Tenant Type is required`),

        //SHOULD BE GRATER THEN OR EQUAL TO SALRYABLE OCCUPIERS COUNT
        occupiers_count: yup.string().required(`Occupiers Count is required`)
            .test(
                'occupiers_count',
                `Occupiers must be grater than or equal to your earning added occupiers. Your added is ${occupiersCount}`,
                async (value: any, testContext) =>
                    occupiersCount <= value,
            ),

        //SHOULD MAX 400 CHARACTER
        additional_request: yup.string().max(400, `Additional Request max limit 400 character`),


        //OCCUPIER TAB FORM VALIDATION 
        occupierList: yup.array().of(
            yup.object({
                nric_type: yup.string().required('NRIC Type is required'),
                nric_fin: yup.string().required('NRIC/FIN is required')
                    .min(8, "NRIC/FIN must have 8 characters")
                    .max(8, "NRIC/FIN must have 8 characters")
                    .matches(/^[a-zA-Z0-9]{7}[a-zA-Z]$/, "Last character must be a letter")
                    .matches(/^\d{7}[a-zA-Z]$/, "Only last character will be a letter"),
                full_name: yup.string().required('Full Name is required'),
                birth_date: yup.string().required('Birth Date is required'),
                gender: yup.string().required('Gender is required'),
                citizen: yup.string().required('Citizen is required'),
                nationality: yup.string().required('Nationality is required'),
                race: yup.string().required('Race is required'),
                pass_type: yup.string().required('Pass type is required'),
                sector: yup.string().required('Sector is required'),
                relation: yup.string().required('Relation is required'),

            }).required('Occupiers is required'),
        ),



    });
}

export default rentalProposalFormValidationSchema;
