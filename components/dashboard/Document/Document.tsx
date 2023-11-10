import { StoreState } from '@/types'
import { isTenant } from '@/util'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import LandlordDocument from './LandlordDocument'
import TenantDocument from './TenantDocument'

const Document = () => {
  const { data: session }: any = useSession()

  const userId = session?.user?.id as string
  const { type } = useSelector((state: StoreState) => state.entities.user)

  const [currentAgreementId,setCurrentAgreementId]=useState('')
  console.log("🚀 ~ file: Document.tsx:17 ~ Document ~ currentAgreementId:", currentAgreementId)

  const [show, setShow]:any = useState(true)
  const handelOpen:any = () => setShow(false)
  const handelClose = () => setShow(true)

  return (
    <div className="p-5 md:p-9">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {
            show ?  <svg
            className={` w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10  ${
              isTenant(type) ? 'fill-[#00ADEE] ' : 'fill-[#034EA1]'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            // className={`   ${pathname === '/dashboard/documents' ? 'fill-[#FFFFFF]' : 'fill-[#505050]'}`}
            width="22"
            height="26"
            viewBox="0 0 22 26">
            <g id="Group_34838" data-name="Group 34838" transform="translate(-3.75 -1.5)">
              <path
                id="Path_23528"
                data-name="Path 23528"
                d="M6.25,1.5a2.416,2.416,0,0,0-2.5,2.321V25.179A2.417,2.417,0,0,0,6.25,27.5h17a2.417,2.417,0,0,0,2.5-2.321v-9.75a4.831,4.831,0,0,0-5-4.643h-2.5a2.416,2.416,0,0,1-2.5-2.321V6.143a4.831,4.831,0,0,0-5-4.643Zm2.5,16.714a.966.966,0,0,1,1-.929h10a.931.931,0,1,1,0,1.857h-10A.966.966,0,0,1,8.75,18.214ZM9.75,21a.931.931,0,1,0,0,1.857h5a.931.931,0,1,0,0-1.857Z"
                transform="translate(0)"
                // fill="#505050"
                fillRule="evenodd"
              />
              <path
                id="Path_23529"
                data-name="Path 23529"
                d="M12.971,1.816a6.794,6.794,0,0,1,1.857,4.643V8.995a.527.527,0,0,0,.545.507H18.1a7.933,7.933,0,0,1,4.987,1.729A13.732,13.732,0,0,0,12.971,1.816Z"
                transform="translate(2.667 -0.293)"
                // fill="#505050"
              />
            </g>
          </svg> : <button className='w-12 h-12 rounded-full text-gray-800  hover:bg-primary hover:text-white' onClick={handelClose}>Back</button>
          }
         
          <h2
            className={classNames(
              ' dashboard-title font-roboto  ',
              isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
            )}>
           { show ? 'Property Documents' : 'Agreement Details'}
          </h2>
        </div>
      </div>

      {/* Document */}
      {isTenant(type) ? <TenantDocument userId={userId} /> : <LandlordDocument currentAgreementId={currentAgreementId} setCurrentAgreementId={setCurrentAgreementId} handelOpen={handelOpen} show={show} setShow={setShow} userId={userId} />}
    </div>
  )
}

export default Document
