// import introVideoLandlord from '@/public/Icon/intro-video-landlord.svg'
// import introVideoTenant from '@/public/Icon/intro-video-tenant.svg'
import singpass from '@/public/singpass.svg'
// import personal from '@/public/user_dashboard.svg'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

// import document from '@/public/documents.svg'
// import pdfView from '@/public/pdf.svg'
// import UserEdit from '@/public/useredit.svg'
import store, {
  hideLoader,
  showLoader,
  showModal,
  useGetMakeOfferEligibilityCheckMutation,
  // useGetMakeOfferEligibilityCheckQuery,
  useGetUserProfileDetailsQuery,
} from '@/store'
import { StoreState, StoreThunkDispatch } from '@/types'
import { isTenant } from '@/util'
import { Button } from '@mui/material'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
// import folder1 from '@/public/folder1.svg'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Url } from 'twilio/lib/interfaces'
// import UserTypeSelect from '../UserTypeSelect/UserTypeSelect'
import PersonalEdit from './PersonalEdit'
import { IntroVideo } from './PersonalInfo'
import { Icon } from '../shared'
import { useRouter } from 'next/router'
import moment from 'moment' // , { max }
// import Iframe from 'react-iframe'
import { changeDocumentName } from '@/util/helper'

export const ProgressBar = ({ progress }: any) => {
  const { type } = useSelector((state: StoreState) => state.entities.user)

  return (
    <div className="w-full h-[0.5rem] 2xl:h-[0.625rem] bg-gray-200 rounded-full">
      <div
        className={classNames('h-full  rounded-full', isTenant(type) ? 'bg-[#00ADEE]' : 'bg-[#034EA1]')}
        style={{ width: `${progress}%` }}></div>
    </div>
  )
}

type DocumentType = {
  nric_front?: string
  nric_back?: string
  iras_cpf?: string
  passport?: string
  credit_report?: string
  pass_id_front?: string
  pass_id_back?: string
  sponsor_letter?: string
  admission_letter?: string
  matriculation_card?: string
  sponsor_guarantee_letter?: string
  salary_slip?: string
}

const Personal = () => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  const router = useRouter()
  const { data: session }: any = useSession() // , status
  const { data: userProfileDetails, refetch: refetchUserProfileDetails } = useGetUserProfileDetailsQuery(
    session?.user?.id
  )

  // const [getElegibility, { isError: eleIsError, isLoading: eleIsLoading, data: offerEligebilityInfo }] =
  //   useGetMakeOfferEligibilityCheckMutation()

  dispatch(showLoader('Loading...'))
  if (userProfileDetails?.user_id) {
    dispatch(hideLoader())
  }

  const { type } = useSelector((state: StoreState) => state.entities.user)
  const progress = userProfileDetails?.completion_rate

  const [editView, setEditView] = useState(false) //router?.query?.complePro ? true :

  useEffect(() => {
    if (router?.query?.complePro) {
      setEditView(true)
    }
  }, [])

  const [documentNow, setDocumentNow] = useState<DocumentType>({
    nric_front: '',
    nric_back: '',
    credit_report: '',
    // iras_cpf: '',
    // passport: '',
    // pass_id_front: '',
    // pass_id_back: '',
    // sponsor_letter: '',
    // admission_letter: '',
    // matriculation_card: '',
    // sponsor_guarantee_letter: '',
    // salary_slip: '',
  })

  // console.log('payload_parent') //!~~~~~~~~

  useEffect(() => {
    const occupation = userProfileDetails?.occupation
    const localForeigner = userProfileDetails?.nationality
    const userProfile = {
      document_url: userProfileDetails?.document_url,
    }
    switch (localForeigner) {
      case 'Local':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
        }

        break
      case 'PR':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              nric_front: userProfile?.document_url?.nric_front ? userProfile?.document_url['nric_front'] : '',
              nric_back: userProfile?.document_url?.nric_back ? userProfile?.document_url['nric_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
            })
            break
        }

        break
      case 'Foreigner (Returning)':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              matriculation_card: userProfile?.document_url?.matriculation_card
                ? userProfile?.document_url['matriculation_card']
                : '',
            })
            break
        }

        break
      case 'Foreigner (1st Timer)':
        switch (occupation) {
          case 'Employed':
            setDocumentNow({
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              salary_slip: userProfile?.document_url?.salary_slip ? userProfile?.document_url['salary_slip'] : '',
            })
            break
          case 'Self Employed':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              pass_id_front: userProfile?.document_url?.pass_id_front ? userProfile?.document_url['pass_id_front'] : '',
              pass_id_back: userProfile?.document_url?.pass_id_back ? userProfile?.document_url['pass_id_back'] : '',
            })
            break
          case 'Student':
            setDocumentNow({
              iras_cpf: userProfile?.document_url?.iras_cpf ? userProfile?.document_url['iras_cpf'] : '',
              passport: userProfile?.document_url?.passport ? userProfile?.document_url['passport'] : '',
              credit_report: userProfile?.document_url?.credit_report ? userProfile?.document_url['credit_report'] : '',
              sponsor_letter: userProfile?.document_url?.sponsor_letter
                ? userProfile?.document_url['sponsor_letter']
                : '',
              admission_letter: userProfile?.document_url?.admission_letter
                ? userProfile?.document_url['admission_letter']
                : '',
              matriculation_card: userProfile?.document_url?.matriculation_card
                ? userProfile?.document_url['matriculation_card']
                : '',
            })
            break
        }

        break
    }
  }, [userProfileDetails?.document_url, userProfileDetails?.nationality, userProfileDetails?.occupation])

  const calculateViewRentalRange = () => {
    store.dispatch(
      showModal({
        open: true,
        name: 'RENTAL_RANGE',
        children: (
          <div className="p-10">
            <h1 className="font-bold">Credit score will calculate on the basis of your provided profile value:</h1>
            <p>Salary( All Occupants): $ {userProfileDetails?.salary}</p>
            <p>Outstanding Loan: $ {userProfileDetails?.outstanding_loan}</p>
            <p>Gender: {userProfileDetails?.gender}</p>
            <p>Local/ Foreigner: {userProfileDetails?.nationality}</p>
            <p>Marital Status: {userProfileDetails?.marital_status}</p>
            <p>Education Level: {userProfileDetails?.education_level}</p>
            <p>Age Range: {userProfileDetails?.age}</p>
            {userProfileDetails?.nationality != 'Foreigner (1st Timer)' && (
              <p>CBS Rating: {userProfileDetails?.cbs_score}</p>
            )}
            <h1 className="font-bold">
              <span className="text-bold">Deposit free Eligibility depends on your max rental range</span>
            </h1>
            <p>Max rental range: $ {userProfileDetails?.max_rental_range}</p>
          </div>
        ),
        className: '',
      })
    )
  }

  return (
    <>
      {!editView ? (
        <div className="db-page-layout">
          <div className="flex w-full justify-between mb-3 md:mb-[1.2rem] 2xl:mb-6 ">
            <div className="flex gap-2 md:gap-4 2xl:gap-5 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10 fill-userRole"
                width="26"
                height="26"
                viewBox="0 0 26 26">
                <path
                  id="user_4_"
                  data-name="user (4)"
                  d="M8.825,2.5A29.274,29.274,0,0,1,15,2a29.273,29.273,0,0,1,6.175.5,8.277,8.277,0,0,1,4.207,2.113A8.277,8.277,0,0,1,27.5,8.825,29.276,29.276,0,0,1,28,15a29.275,29.275,0,0,1-.5,6.175,8.277,8.277,0,0,1-2.114,4.207A8.277,8.277,0,0,1,21.175,27.5,29.275,29.275,0,0,1,15,28a29.276,29.276,0,0,1-6.175-.5,8.277,8.277,0,0,1-4.207-2.114A8.277,8.277,0,0,1,2.5,21.175,29.273,29.273,0,0,1,2,15a29.274,29.274,0,0,1,.5-6.175A8.277,8.277,0,0,1,4.618,4.618,8.277,8.277,0,0,1,8.825,2.5ZM15,7.2a5.2,5.2,0,1,0,5.2,5.2A5.2,5.2,0,0,0,15,7.2Zm8.291,14.682a1.607,1.607,0,0,1-.443,2.209,6.951,6.951,0,0,1-2.237.866A26.839,26.839,0,0,1,15,25.4a26.837,26.837,0,0,1-5.611-.442,7.01,7.01,0,0,1-2.2-.842,1.606,1.606,0,0,1-.448-2.227,5.383,5.383,0,0,1,2.291-2.034A13.979,13.979,0,0,1,15,18.9a14.318,14.318,0,0,1,5.955.916A5.3,5.3,0,0,1,23.291,21.882Z"
                  transform="translate(-2 -2)"
                  // fill="#fff"
                  fillRule="evenodd"
                />
              </svg>
              <h2 className="text-userRole dashboard-title font-roboto">Personal Info</h2>
            </div>

            <button
              id="ttEditProfile"
              onClick={() => setEditView(true)}
              className="bg-userRole cursor-pointer db-button rounded-[10px] text-white capitalize font-roboto font-normal flex items-center gap-1.5 md:gap-2 2xl:gap-3">
              {/* <Image src={personal} /> */}
              <svg
                className=" w-[1rem] md:w-[1.3rem] 2xl:w-[1.625rem] h-[1rem] md:h-[1.3rem] 2xl:h-[1.625rem] "
                id="user-edit"
                xmlns="http://www.w3.org/2000/svg"
                width="25.998"
                height="26"
                viewBox="0 0 25.998 26">
                <path
                  id="Path_23480"
                  data-name="Path 23480"
                  d="M7.179,7.833a5.333,5.333,0,1,1,5.333,5.333A5.333,5.333,0,0,1,7.179,7.833Zm13.4,10.24a.533.533,0,0,0-.169-.32,7.141,7.141,0,0,0-5.24-1.92H9.833c-5.413,0-7.333,3.96-7.333,7.36,0,3.04,1.613,4.64,4.667,4.64H14.1a.363.363,0,0,0,.28-.12.432.432,0,0,0,.12-.287v-2.26a2,2,0,0,1,.587-1.413l5.373-5.4A.412.412,0,0,0,20.576,18.073ZM16.5,25.167V28.5h3.333l6.052-6.025-3.359-3.359Zm11.611-6.785-1.493-1.493a1.333,1.333,0,0,0-1.88,0l-1.279,1.293,3.359,3.359,1.293-1.279a1.333,1.333,0,0,0,0-1.879Z"
                  transform="translate(-2.5 -2.5)"
                  fill="#fff"
                />
              </svg>
              Edit
            </button>
          </div>
          <div className="bg-[#F1F7FF]  min-h-full rounded-[20px] md:pl-[2.4rem] 2xl:pl-12 md:pr-[2.2rem] 2xl:pr-11 md:py-[1.5rem] 2xl:py-[1.875rem]">
            <div className="md:flex gap-3 md:gap-4 2xl:gap-5 mb-3 md:mb-4 2xl:mb-5">
              <div className="w-full md:w-7/12 relative bg-[#F8FBFF] py-[0.6rem] md:py-[0.8rem] 2xl:py-4 px-6 md:px-8 2xl:px-10 border border-[#D4E8FF] rounded-[10px] flex items-center gap-4 md:gap-[1.2rem] 2xl:gap-6 ">
                <div className=" w-[10.75rem] md:w-[8.6rem] 2xl:w-[10.75rem] z-0 h-full bg-gradient-to-r from-[#F8FBFF] from-0% to-[#D4E8FF] to-100% absolute top-0 right-0"></div>

                <img
                  className=" w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem]  2xl:w-[6.25rem] 2xl:h-[6.25rem] object-cover rounded-full"
                  src={userProfileDetails?.profile_pic ? userProfileDetails.profile_pic : '/no_profile.jpg'}
                  alt={userProfileDetails?.name}
                />
                <div className="w-full flex flex-col z-10">
                  <div className="flex justify-between mb-1 ">
                    <div className="">
                      <h2 className="font-bold font-roboto text-[#000000] text-lg md:text-xl 2xl:text-2xl mb-[0.4rem] md:mb-[0.46rem] 2xl:mb-[0.575rem]">
                        {/* {userProfileDetails?.name} */}
                        {userProfileDetails?.name ? userProfileDetails?.name : ''}
                      </h2>
                      <h5
                        className={classNames(
                          'font-normal font-roboto text-sm md:text-base xl:text-lg mb-[0.4rem] md:mb-[0.46rem] 2xl:mb-[0.575rem]',
                          isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
                        )}>
                        Your profile is{' '}
                        <span className="font-bold">{userProfileDetails?.completion_rate}% get complete!</span>
                      </h5>
                    </div>

                    {/* INTRO VIDEO SECTION */}
                    <IntroVideo
                      refetchUserProfileDetails={refetchUserProfileDetails}
                      videoUrl={userProfileDetails?.video_url}
                    />
                  </div>
                  <ProgressBar progress={progress} />
                </div>
              </div>
              <div className="bg-[#F8FBFF] relative py-[0.6rem] md:py-[0.8rem] 2xl:py-4 px-6 md:px-8 2xl:px-10 border border-[#D4E8FF] rounded-[10px] w-full mt-5 md:mt-0 md:w-5/12  ">
                <div className=" w-[10.75rem] md:w-[8.6rem] 2xl:w-[10.75rem] z-0 h-full bg-gradient-to-r from-[#F8FBFF] from-0% to-[#D4E8FF] to-100% absolute top-0 right-0"></div>
                <div className=" z-10 relative">
                  <h2 className="font-roboto font-medium content-title text-[#505050] mb-[0.375rem] md:mb-[0.6rem] 2xl:mb-3 ">
                    Complete your profile with
                  </h2>
                  <div className="cursor-pointer singpass">
                    <a href={'https://spapirzy.real-ezy.com?userId=' + userProfileDetails?.user_id}>
                      <Image alt="no-image" src={singpass} id="retrieveMyinfoSingpass" />
                    </a>
                    {/* <a href={'https://spapirzy.real-ezy.com?userId=607'}>
                      <Image src={singpass} />
                    </a> */}
                    {/* <a href={'http://localhost:1337?userId=' + userProfileDetails?.user_id}>
                      <Image src={singpass} />
                    </a> */}
                    {/* <Image onClick={getSingpass} src={singpass} /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* GENERAL INFO */}
            <div className="md:flex  gap-3 md:gap-4 xl:gap-5 ">
              <div className="w-full md:w-7/12 bg-[#F1F7FF] py-2 md:py-[1.3rem] 2xl:py-[1.625rem] px-4 md:pl-8 md:pr-[2.2rem]  2xl:pl-10 2xl:pr-11 border border-solid border-[#D4E8FF] rounded-[10px] ">
                {/* GENERAL INFO SECTION */}
                <div>
                  <h2
                    className={classNames(
                      'font-roboto content-header-profile mb-3 md:mb-[1rem] 2xl:mb-[1.25rem]',
                      isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
                    )}>
                    General Info
                  </h2>

                  <div className="w-full grid grid-cols-12 gap-1 ">
                    <div className=" col-span-4">
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title ">Email</p>
                        <p className="text-[#000000] break-words  font-roboto font-medium  db-content-profile lowercase ">
                          {userProfileDetails?.email}
                        </p>
                      </div>

                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Age Range</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {/* 01-Jan-1991 */}
                          {userProfileDetails?.age ? userProfileDetails?.age : ''}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">
                          Education Level
                        </p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.education_level ? userProfileDetails?.education_level : ''}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Nationality</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.user_nationality ? userProfileDetails?.user_nationality : ''}
                        </p>
                      </div>
                    </div>
                    <div className="  col-span-4 2xl:ml-[4.2rem] md:ml-[1rem] sm:ml-[3rem] ml-[1rem]">
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Phone</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {/* {userProfileDetails?.country_code} */}
                          {userProfileDetails?.mobile}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Gender</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.gender ? userProfileDetails?.gender : ''}
                        </p>
                      </div>

                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Race</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.race ? userProfileDetails?.race : ''}
                        </p>
                      </div>
                    </div>
                    <div className=" col-span-4 2xl:ml-[4.2rem] md:ml-[1rem] sm:ml-[3rem] ml-[1rem]">
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">
                          Date Of Birth
                        </p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {/* 01-Jan-1991 */}
                          {userProfileDetails?.date_of_birth
                            ? moment(userProfileDetails?.date_of_birth).format('DD MMMM YYYY')
                            : ' '}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">
                          Marital Status
                        </p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.marital_status ? userProfileDetails?.marital_status : ''}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">NRIC/FIN</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.nric_type ? `(${userProfileDetails?.nric_type})` : ''}{' '}
                          {userProfileDetails?.user_id_number ? userProfileDetails?.user_id_number : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                    <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Address</p>
                    <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile w-full">
                      {userProfileDetails?.address ? userProfileDetails?.address.replace(`null`, ``) : ''}
                      {/* {userProfileDetails?.address ? (userProfileDetails?.address == 'NA' ? '' : (userProfileDetails?.address).replace("null", "")) : ''} */}
                    </p>
                  </div>
                </div>

                {/* CREDIT INFO SECTION */}
                <div className="2xl:mt-[1.875rem] md:mt-[1.5rem] mt-4">
                  <h2
                    className={classNames(
                      'font-roboto content-header-profile mb-3 md:mb-[1rem] 2xl:mb-[1.25rem] ',
                      isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
                    )}>
                    Credit Info
                  </h2>

                  <div className="w-full grid grid-cols-12 gap-2">
                    <div className=" col-span-4">
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">
                          Local / Foreigner
                        </p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.nationality ? userProfileDetails?.nationality : ''}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Occupation</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.occupation ? userProfileDetails?.occupation : ''}
                        </p>
                      </div>
                    </div>

                    <div className=" col-span-4 2xl:ml-[4.2rem] md:ml-[1rem] sm:ml-[3rem] ml-[1rem]">
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">
                          {userProfileDetails?.occupation == 'Self Employed'
                            ? 'Business Name'
                            : userProfileDetails?.occupation == 'Employed'
                              ? 'Employer Name'
                              : userProfileDetails?.occupation == 'Student'
                                ? 'University Name'
                                : ''}
                        </p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.employer_name ? userProfileDetails?.employer_name : ''}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Pass Type</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {/* {userProfileDetails?.user_id_type ? userProfileDetails?.user_id_type : ''} */}
                          {userProfileDetails?.user_id_type ? userProfileDetails?.user_id_type : ''}
                        </p>
                      </div>
                    </div>

                    <div className=" col-span-4">
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Salary</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {/* 01-Jan-1991 */}
                          {userProfileDetails?.salary ? parseFloat(userProfileDetails?.salary).toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">
                          Outstanding Loans
                        </p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {userProfileDetails?.outstanding_loan
                            ? parseFloat(userProfileDetails?.outstanding_loan).toFixed(2)
                            : '0.00'}
                        </p>
                      </div>
                    </div>

                    <div className=" col-span-4">
                      <div className=" flex flex-col mb-[0.25rem] md:mb-[0.34rem] 2xl:mb-[0.5rem] gap-0.5">
                        <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">CBS Rating</p>
                        <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                          {/* 01-Jan-1991 */}
                          {userProfileDetails?.cbs_score}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  */}
              </div>
              <div className="bg-[#F1F7FF] py-2 md:py-[1.3rem] 2xl:py-[1.625rem] px-4 md:pl-8 md:pr-[2.2rem]  2xl:pl-10 2xl:pr-11 border border-[#D4E8FF] mt-5 md:mt-0 rounded-[10px] w-full md:w-5/12">
                {/* credit score */}
                <div id="viewRentalRange">
                  <div>
                    <h2
                      className={classNames(
                        'font-roboto content-header-profile mb-3 md:mb-[1rem] 2xl:mb-[1.25rem]',
                        isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
                      )}>
                      Credit Scoring
                    </h2>

                    <div className="w-full">
                      <div className="">
                        {session && userProfileDetails?.credit_score?.credit_score_action == 'Approved' && (
                          <div className=" flex gap-5 md:gap-[1.5rem] 2xl:gap-[1.875rem] mb-5 md:mb-[1.5rem] 2xl:mb-[1.875rem]">
                            <p className="text-[#A1A1A1] font-normal font-roboto break-words  content-title">Status</p>
                            <p className="text-[#000000] break-words  capitalize font-roboto font-medium  db-content-profile">
                              Approved
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* credit score */}

                  {session && !session?.user?.userInfo?.isOfferable && (
                    <p>
                      Please complete your profile info to calculate your credit scoring. It is necessary to make a
                      rental proposal
                    </p>
                  )}

                  {session &&
                    session?.user?.userInfo?.isOfferable &&
                    userProfileDetails?.credit_score?.credit_score_action != 'Approved' && (
                      <p>Credit scoring did not calculate due to not make any rental proposal</p>
                    )}

                  {session && session?.user?.userInfo?.isOfferable && (
                    <>
                      <div className=" flex gap-5 md:gap-[1.5rem] 2xl:gap-[1.875rem] mb-5 md:mb-[1.5rem] 2xl:mb-[1.875rem]">
                        <Button variant="contained" onClick={calculateViewRentalRange}>
                          View Rental Range
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* MY DOCUMENT SECTION */}
                <h2
                  className={classNames(
                    'font-roboto content-header-profile mb-3 md:mb-[1rem] 2xl:mb-[1.25rem]',
                    isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
                  )}>
                  My Documents
                </h2>
                <div className=" rounded-[10px]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-3  gap-x-6  md:gap-x-8 2xl:gap-x-10 gap-y-9  md:gap-y-[2.7rem] 2xl:gap-y-[3.375rem]">
                    {documentNow &&
                      Object.entries(documentNow)?.map(([documentName, documentValue]) => (
                        <>
                          <div className=" gap-2 w-[6rem] sm:w-[7rem] md:w-[6rem] lg:w-[8rem] 2xl:w-[10rem] h-[5.75rem] sm:h-[6.5rem] md:h-[7.5rem] 2xl:h-[9.375rem]">
                            <div
                              className={
                                `${documentValue}`
                                  ? 'cursor-pointer rounded-[10px] border border-solid border-[#D4E8FF] flex items-center justify-center w-full h-full'
                                  : 'cursor-pointer rounded-[10px] border border-solid border-[#D4E8FF] flex items-center justify-center w-full h-full '
                              }>
                              <Link href={documentValue as Url}>
                                <a target="_blank">
                                  {documentValue ? (
                                    <img
                                      // src={pdfView}
                                      alt="no-image"
                                      src="/pdf.svg"
                                      // width=""
                                      // height=""
                                      className=" 2xl:w-[4.25rem] 2xl:h-[3.75rem] lg:w-[3.4rem] md:w-[3rem] md:h-[3rem] sm:w-[4.25rem] sm:h-[3.75rem] w-[3.4rem] h-[3rem] "
                                    />
                                  ) : (
                                    <Icon
                                      // src={folder1}
                                      name="file"
                                      // width=""
                                      // height=""
                                      className="2xl:w-[4.25rem] 2xl:h-[3.75rem] lg:w-[3.4rem] md:w-[3rem] md:h-[3rem] sm:w-[4.25rem] sm:h-[3.75rem] w-[3.4rem] h-[3rem] text-[#A1A1A1]"
                                    />
                                  )}
                                </a>
                              </Link>
                            </div>
                            <p className=" mt-[0.4rem] md:mt-[0.6rem] xl:mt-[0.75rem] text-center text-sm md:text-base xl:text-lg font-normal font-roboto capitalize">
                              {changeDocumentName(
                                documentName,
                                userProfileDetails?.nationality,
                                userProfileDetails?.occupation
                              )}
                            </p>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PersonalEdit setEditView={setEditView} refetchUserProfileDetails={refetchUserProfileDetails} />
      )}
    </>
  )
}

export default Personal
