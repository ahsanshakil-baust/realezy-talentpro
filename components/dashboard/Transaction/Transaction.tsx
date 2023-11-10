import { StoreState } from '@/types'
import { isTenant } from '@/util'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import LandlordTransaction from './LandlordTransaction'
import TenantTransaction from './TenantTransaction'

const Transaction = () => {
  const { data: session }: any = useSession()

  const userId = session?.user?.id as string
  const { type } = useSelector((state: StoreState) => state.entities.user)
  return (
    <div className="p-5 md:p-9">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <svg
            className={` w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10  ${
              isTenant(type) ? 'fill-[#00ADEE] ' : 'fill-[#034EA1]'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26">
            <g id="Layer_2" data-name="Layer 2" transform="translate(-1.25 -1.25)">
              <path
                id="Path_23496"
                data-name="Path 23496"
                d="M4.589,1.25A3.339,3.339,0,0,0,1.25,4.589V13.7a1.518,1.518,0,0,0,1.518,1.518h4.25a.923.923,0,0,0,.911-.911V4.589A3.339,3.339,0,0,0,4.589,1.25ZM6.107,13.393H3.071v-8.8A1.506,1.506,0,0,1,4.116,3.156a1.214,1.214,0,0,1,.474-.085A1.518,1.518,0,0,1,6.107,4.589Z"
                transform="translate(0)"
                // fill="#505050"
              />
              <path
                id="Path_23497"
                data-name="Path 23497"
                d="M18.4,1.25H4.217a1.006,1.006,0,0,0-.838.43.818.818,0,0,0,0,.871l.335.523a1.417,1.417,0,0,1,.5-.081A1.538,1.538,0,0,1,5.829,4.445V23.938a2.015,2.015,0,0,0,1.11,1.743,2.489,2.489,0,0,0,2.231.046l.374-.2a3.074,3.074,0,0,1,1.767-.488,3.046,3.046,0,0,1,1.767.488,5.3,5.3,0,0,0,2.76.72,5.159,5.159,0,0,0,2.747-.732,3.452,3.452,0,0,1,3.521,0l.374.2a2.475,2.475,0,0,0,2.231,0,1.981,1.981,0,0,0,1.109-1.743V7.93C25.814,4.243,22.5,1.256,18.4,1.25ZM14.87,16.47h-5.7a.876.876,0,1,1,0-1.743h5.7a.876.876,0,1,1,0,1.743Zm6.643-3.9H9.169a.876.876,0,1,1,0-1.743H21.513a.876.876,0,1,1,0,1.743Zm0-4.076H9.169A.923.923,0,0,1,8.2,7.617a.923.923,0,0,1,.967-.871H21.513a.923.923,0,0,1,.967.871A.923.923,0,0,1,21.513,8.489Z"
                transform="translate(0.429)"
                // fill="#505050"
              />
              <circle
                id="Ellipse_637"
                data-name="Ellipse 637"
                cx="6"
                cy="6"
                r="6"
                transform="translate(15.25 15.25)"
                // fill="#f8fbff"
              />
              <path
                id="Path_23537"
                data-name="Path 23537"
                d="M317.905,208a4.674,4.674,0,1,0,4.9,4.668A4.8,4.8,0,0,0,317.905,208Zm.739,7.432v.029a.742.742,0,0,1-1.471.1h-.107a.7.7,0,1,1,0-1.408h.9a.317.317,0,0,0,.149-.6c-.252-.12-.5-.243-.756-.359a2.916,2.916,0,0,1-.5-.254,1.667,1.667,0,0,1-.815-1.439,1.73,1.73,0,0,1,1.128-1.6v-.029a.742.742,0,0,1,1.471-.1h.107a.7.7,0,1,1,0,1.407h-.9a.325.325,0,0,0-.33.318c0,.206.169.275.339.355l.727.346a2.234,2.234,0,0,1,.835.6,1.663,1.663,0,0,1,.355,1.032A1.731,1.731,0,0,1,318.644,215.432Z"
                transform="translate(-296.559 -191.418)"
                // fill="#505050"
                fillRule="evenodd"
              />
            </g>
          </svg>
          <h2
            className={classNames(
              ' dashboard-title font-roboto  ',
              isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
            )}>
            All Transactions
          </h2>
        </div>
      </div>

      {isTenant(type) ? <TenantTransaction userId={userId} /> : <LandlordTransaction userId={userId} />}
    </div>
  )
}

export default Transaction
