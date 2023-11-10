import { useGetHdbDetailsQuery } from '@/store' // { hideLoader, hideModal, showLoader,}  store, 
// import { HDB_DETAILS } from '@/store/chatProgress/progress/constant'
import { useSession } from 'next-auth/react'
// import Image from 'next/image'
import React from 'react' // , { useContext }
import { useSelector } from 'react-redux' // useDispatch,

const HdbView = () => {
  const { progress: payload } = useSelector((state: any) => state.entities.userProgress)

  // const { data: session } = useSession()

  const { data: hdbDetails } = useGetHdbDetailsQuery(payload?.threadInfo?.property_id) // , isLoading: hdbLoading
  console.log('hdbDetails', hdbDetails)
  // const dispatch = useDispatch()

  return (
    <div className="flex justify-center items-center w-full object-contain py-4">
      {/* {hdbLoading && store?.dispatch(hideModal(HDB_DETAILS))}
      {hdbLoading ? store?.dispatch(showLoader('Please Wait...')) : dispatch(hideLoader())} */}

      {hdbDetails?.hdb_document && (
        <img src={hdbDetails?.hdb_document} alt="no found"  className='h-[300px]' />
      )}
    </div>
  )
}

export default HdbView
