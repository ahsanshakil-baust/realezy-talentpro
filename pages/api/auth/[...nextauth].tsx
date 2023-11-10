// // import NextAuth from 'next-auth'
// // import CredentialProvider from 'next-auth/providers/credentials'

// // //added by oni
// // import GoogleProvider from 'next-auth/providers/google'
// // import FacebookProvider from 'next-auth/providers/facebook'
// // import { postRequest } from '@/util/axios'
// // //added end

// // export default NextAuth({
// //   providers: [
// //     //added by oni
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID || '',
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
// //     }),
// //     FacebookProvider({
// //       clientId: process.env.FACEBOOK_CLIENT_ID || '',
// //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
// //     }),
// //     //added end
// //     CredentialProvider({
// //       name: 'Credentials',
// //       credentials: {
// //         email: { label: 'Email', type: 'email' },
// //         password: { label: 'Password', type: 'password' },
// //         csrfToken: { label: '', type: 'hidden' },
// //       },
// //       async authorize(credentials, req) {
// //         console.log(`🚀 ~ file: [...nextauth].tsx:30 ~ authorize ~ credentials:`, credentials)
// //         const formData = {
// //           email: credentials?.email,
// //           password: credentials?.password,
// //           device_token: credentials?.csrfToken,
// //         }

// //         const response: any = await postRequest('index.php/auth/login', JSON.stringify(formData))
// //         console.log(`🚀 ~ file: [...nextauth].tsx:37 ~ authorize ~ response:`, response)

// //         if (response.status === 200) {
// //           return response?.data.data
// //         }

// //         // Return null if user data could not be retrieved
// //         return null
// //       },
// //     }),
// //   ],
// //   secret: process.env.NEXTAUTH_SECRET_KEY,
// //   callbacks: {
// //     jwt: async ({ token, user, account }: any) => {
// //       //added by oni
// //       console.log('token ====', token)
// //       console.log('user =====', user)
// //       console.log('account =====', account)
// //       user && ((token.user = user), (token.provider = account?.provider))
// //       const response: any = await postRequest(
// //         'index.php/auth/socialMobileLogin',
// //         JSON.stringify({
// //           social_type: token.provider === 'google' ? 'gplus' : 'fb',
// //           social_id: parseInt(token?.user.id),
// //           first_name: token?.user.name,
// //           email: token?.user.email,
// //           photoUrl: token?.user.image,
// //           device_token: token?.user.token,
// //         })
// //       )
// //       console.log(`🚀 ~ file: [...nextauth].tsx:68 ~ jwt: ~ Socialresponse:`, response)
// //       token.user.id = response.data.data.id
// //       token.token = response.data.data.token
// //       const respo: any = await postRequest(`index.php/auth/getUserType/${token.user.id}`, JSON.stringify({}))
// //       token.user.profile_pic = respo.data.userInfo.profile_pic
// //       token.user.user_type = respo.data.userInfo.user_type
// //       //added end
// //       return token
// //     },
// //     session: async ({ session, token }: any) => {
// //       session = {
// //         ...session,
// //         user: { ...token.user, provider: token.provider, token: token.token },
// //       } //added by oni
// //       return session
// //     },
// //   },
// //   pages: {
// //     signIn: '/login', //Need to define custom login page (if using)
// //     newUser: '/sign-up',
// //   },
// // })
import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  timeout: 1000 * 50,
  headers: {
    'Content-Type': 'application/json',
    'Client-Service': 'frontend-client',
    'Auth-Key': 'simplerestapi',
    'user-id': 863,
    device_token: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts=',
    token:
      '$6$rounds=5042$61a9f776d664a5.2$id/9.5ooBpti/wzmjgZfJnCzsA3VDc8kCJLb/pET12Pn1vxEc86h8w14L8A9sZ6Jk8HZEpa5G/cd8hTyswXvF0',
  },
})

import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

//added by oni
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { postRequest } from '@/util/axios'
//added end

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),

    //EMAIL LOGIN
    CredentialProvider({
      id: 'emailLogin',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any, req) {
        const formData = {
          email: credentials.email,
          password: credentials.password,
          device_token: credentials.csrfToken,
        }

        const { data: responseData } = await instance.post('index.php/auth/login', JSON.stringify(formData))
        // console.log('🚀 ~ file: [...nextauth].tsx:139 ~ authorize ~ responseData:', responseData)

        if (responseData?.status === 200) {
          // const { data: userData } = responseData
          // const { id, token } = responseData
          // console.log("id ========> ", responseData?.data?.id)
          // console.log("token ======>", responseData?.data?.token)
          // const { data: responseDataUserProfile, status } = await instance.get(`index.php/profile/detail/${id}`)
          // if (status === 200) {
          //   console.log(
          //     '🚀 ~ file: [...nextauth].tsx:146 ~ authorize ~ responseDataUserProfile:',
          //     responseDataUserProfile
          //   )
          //   const { data: userProfileData } = responseDataUserProfile
          //   const userInfo = {
          //     id: userProfileData?.id,
          //     email: userProfileData?.email,
          //     name: userProfileData?.name,
          //     user_type: userProfileData?.user_type,
          //     isOfferable: userProfileData?.isOfferable,
          //     completion_rate: userProfileData?.completion_rate,
          //     address: userProfileData?.address,
          //     nationality: userProfileData?.nationality,
          //     date_of_birth: userProfileData?.date_of_birth,
          //     gender: userProfileData?.gender,
          //     creadit_score: userProfileData?.creadit_score,
          //     occupiers_salary_list: userProfileData?.occupiers_salary_list,
          //     user_id_number: userProfileData?.user_id_number,
          //     max_rental_range: userProfileData?.max_rental_range
          //   }
          //   const user = { ...userData, loginType: 'email', userInfo: userInfo, token }
          //   return user
          // }
          const user = {
            id: responseData?.data?.id,
            token: responseData?.data?.token,
            loginType: 'email',
            isCorporate: responseData?.data?.is_corporate,
          }
          return user
        }

        return null
      },
    }),

    //MOBILE LOGIN
    CredentialProvider({
      id: 'mobileLogin',
      name: 'Mobile',
      credentials: {},
      async authorize(credentials: any, req) {
        const formData = {
          mobile: credentials?.number,
          country_code: credentials?.country_code,
          device_token: '$dfdfdfdfdf64df4df4df4d6f4df6df46',
          login_type: 'mobile',
        }

        const responseData = await postRequest('index.php/auth/loginMobile', JSON.stringify(formData))
        // console.log("🚀 ~ file: [...nextauth].tsx:197 ~ authorize ~ responseData:", responseData)

        if (responseData.status === 200) {
          const { data: userData } = responseData
          const { id, token } = userData
          // const { data: responseDataUserProfile, status } = await instance.get(`index.php/profile/detail/${id}`)
          // if (status === 200) {
          //   const { data: userProfileData } = responseDataUserProfile
          //   const userInfo = {
          //     id: userProfileData?.id,
          //     email: userProfileData?.email,
          //     name: userProfileData?.name,
          //     user_type: userProfileData?.user_type,
          //     isOfferable: userProfileData?.isOfferable,
          //     completion_rate: userProfileData?.completion_rate,
          //     address: userProfileData?.address,
          //     nationality: userProfileData?.nationality,
          //     date_of_birth: userProfileData?.date_of_birth,
          //     gender: userProfileData?.gender,
          //     creadit_score: userProfileData?.creadit_score,
          //     occupiers_salary_list: userProfileData?.occupiers_salary_list,
          //     user_id_number: userProfileData?.user_id_number,
          //     max_rental_range: userProfileData?.max_rental_range
          //   }
          //   const user = { ...userData, loginType: 'mobile', userInfo: userInfo, token }
          //   return user
          // }
          const user = {
            id: id,
            token: token,
            loginType: 'mobile',
            isCorporate: responseData?.data?.is_corporate,
          }
          return user
        }

        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET_KEY,
  callbacks: {
    jwt: async ({ token, user, account }: any) => {
      // console.log('🚀 ~ file: [...nextauth].tsx:190 ~ jwt: ~ token:', user)
      user && ((token.user = user), (token.provider = account.provider), (token.token = user.token))
      // const response = await instance.post(
      //   'index.php/auth/socialMobileLogin',
      //   JSON.stringify({
      //     social_type: token.provider === 'google' ? 'gplus' : 'fb',
      //     social_id: parseInt(token.user.id),
      //     first_name: token.user.name,
      //     email: token.user.email,
      //     photoUrl: token.user.image
      //       ? token.user.image
      //       : 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/dev/64c4db8636dee.png',
      //     device_token: token.user.token,
      //   })
      // )
      // console.log("user --------------> ", user)
      const { data: responseDataUserProfile, status } = await instance.get(
        `index.php/profile/detail/${token?.user?.id}`
      )
      const { data: userProfileData } = responseDataUserProfile
      // console.log("🚀 ~ file: [...nextauth].tsx:257 ~ jwt: ~ userProfileData:", userProfileData)
      // console.log("🚀 ~ file: [...nextauth].tsx:254 ~ jwt: ~ responseDataUserProfile:", responseDataUserProfile)

      // token.user = user
      if (userProfileData) {
        token.userInfo = {
          isOfferable: userProfileData?.isOfferable,
          completion_rate: userProfileData?.completion_rate,
          profile_pic: userProfileData?.profile_pic,
          name: userProfileData?.name,
          mobile: userProfileData?.mobile,
          country_code: userProfileData?.country_code,
          address: userProfileData?.address,
          nationality: userProfileData?.nationality,
          date_of_birth: userProfileData?.date_of_birth,
          gender: userProfileData?.gender,
          desired_property_details: userProfileData?.desired_property_details,
          document_url: userProfileData?.document_url,
          user_id_type: userProfileData?.user_id_type,
          user_id_number: userProfileData?.user_id_number,
          passport_no: userProfileData?.passport_no,
          cbs_score: userProfileData?.cbs_score,
          user_type: userProfileData?.user_type,
          age: userProfileData?.age,
          salary: userProfileData?.salary,
          outstanding_loan: userProfileData?.outstanding_loan,
          user_nationality: userProfileData?.user_nationality,
          nric_type: userProfileData?.nric_type,
          email: userProfileData?.email,
          credit_score: userProfileData?.credit_score,
          occupiers_salary_list: userProfileData?.occupiers_salary_list,
          max_rental_range: userProfileData?.max_rental_range,
          video_url: userProfileData?.video_url,
        }
      } else {
        token.userInfo = {}
      }
      // token.token = user?.token
      // token.provider = account?.provider

      // const respo = await instance.post(`index.php/auth/getUserType/${token.user.id}`, JSON.stringify({}))
      // const respoInfo: any = await instance.get(`index.php/profile/detail/${token.user.id}`)

      // const actdata: any = respoInfo?.data?.data

      // token.userInfo = {
      //   id: actdata?.id,
      //   email: actdata.email,
      //   name: actdata.name,
      //   user_type: actdata.user_type,
      //   isOfferable: actdata.isOfferable,
      //   completion_rate: actdata.completion_rate,
      //   address: actdata.address,
      //   nationality: actdata.nationality,
      //   date_of_birth: actdata.date_of_birth,
      //   gender: actdata.gender,
      //   creadit_score: actdata.creadit_score,
      //   occupiers_salary_list: actdata.occupiers_salary_list,
      // }
      return token
    },
    session: async ({ session, token }: any) => {
      // console.log("token----",token)
      if (!token.userInfo || Object.keys(token.userInfo).length === 0) {
        return {} // Log the user out
      }
      session = {
        ...session,
        user: { ...token.user, provider: token.provider, token: token.token, userInfo: token.userInfo },
      }
      return session
    },

    // jwt: async ({ token, user, account }: any) => {
    //   if (user) {
    //     token.user = user
    //     // console.log('🚀 ~ file: [...nextauth].tsx:192 ~ jwt: ~ user:', user)
    //   }
    //   return token
    // },
    // session: async ({ session, token }: any) => ({
    //   ...session,
    //   user: token.user,
    // }),
  },
  pages: {
    signIn: '/login', //Need to define custom login page (if using)
    newUser: '/signup',
  },
})

// import axios from 'axios';
// import NextAuth from 'next-auth';
// import CredentialProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
//   timeout: 1000 * 50,
//   headers: {
//     'Content-Type': 'application/json',
//     'Client-Service': 'frontend-client',
//     'Auth-Key': 'simplerestapi',
//     'user-id': 863,
//     device_token: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts=',
//     token:
//       '$6$rounds=5042$61a9f776d664a5.2$id/9.5ooBpti/wzmjgZfJnCzsA3VDc8kCJLb/pET12Pn1vxEc86h8w14L8A9sZ6Jk8HZEpa5G/cd8hTyswXvF0',
//   },
// });

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID || '',
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
//     }),
//     createCredentialProvider('emailLogin', {}),
//     createCredentialProvider('mobileLogin', {}),
//   ],
//   secret: process.env.NEXTAUTH_SECRET_KEY,
//   callbacks: {
//     jwt: handleJWTCallback,
//     session: handleSessionCallback,
//   },
//   pages: {
//     signIn: '/login',
//     newUser: '/signup',
//   },
// });

// function createCredentialProvider(id: string, credentials: any) {
//   return CredentialProvider({
//     id,
//     name: 'Credentials',
//     credentials,
//     async authorize(credentials: any, req) {
//       try {
//         const formData = {
//           email: credentials.email,
//           password: credentials.password,
//           device_token: credentials.csrfToken,
//         };
//         const { data: responseData } = await instance.post('index.php/auth/login', JSON.stringify(formData));

//         if (responseData?.status === 200) {
//           const user = {
//             id: responseData?.data?.id,
//             token: responseData?.data?.token,
//             loginType: id,
//           };
//           return user;
//         }
//       } catch (error) {
//         console.error('Error in authorize:', error);
//       }

//       return null;
//     },
//   });
// }

// async function handleJWTCallback({ token, user, account }: any) {
//   if (user) {
//     token.user = user;
//     token.provider = account.provider;
//     token.token = user.token;

//     const { data: responseDataUserProfile } = await instance.get(`index.php/profile/detail/${token?.user?.id}`);
//     const userProfileData = responseDataUserProfile?.data;
//     console.log("🚀 ~ file: [...nextauth].tsx:422 ~ handleJWTCallback ~ userProfileData:", userProfileData)

//     token.userInfo = {
//       isOfferable: userProfileData?.isOfferable,
//       completion_rate: userProfileData?.completion_rate,
//       profile_pic: userProfileData?.profile_pic,
//       name: userProfileData?.name,
//       mobile: userProfileData?.mobile,
//       country_code: userProfileData?.country_code,
//       address: userProfileData?.address,
//       nationality: userProfileData?.nationality,
//       date_of_birth: userProfileData?.date_of_birth,
//       gender: userProfileData?.gender,
//       desired_property_details: userProfileData?.desired_property_details,
//       document_url: userProfileData?.document_url,
//       user_id_type: userProfileData?.user_id_type,
//       user_id_number: userProfileData?.user_id_number,
//       passport_no: userProfileData?.passport_no,
//       cbs_score: userProfileData?.cbs_score,
//       user_type: userProfileData?.user_type,
//       age: userProfileData?.age,
//       salary: userProfileData?.salary,
//       outstanding_loan: userProfileData?.outstanding_loan,
//       user_nationality: userProfileData?.user_nationality,
//       nric_type: userProfileData?.nric_type,
//       email: userProfileData?.email,
//       credit_score: userProfileData?.credit_score,
//       occupiers_salary_list: userProfileData?.occupiers_salary_list,
//       max_rental_range: userProfileData?.max_rental_range,
//     };
//   }
//   return token;
// }

// function handleSessionCallback({ session, token }: any) {
//   if (!token.userInfo || Object.keys(token.userInfo).length === 0) {
//     return null; // Log the user out
//   }

//   session = {
//     ...session,
//     user: { ...token.user, provider: token.provider, token: token.token, userInfo: token.userInfo },
//   };
//   return session;
// }
