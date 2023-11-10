import { StoreState } from '@/types'
import { isTenant } from '@/util'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import LandlordFees from './LandlordFees'
import TenantFees from './TenantFees'

const Fees = () => {
  const { type } = useSelector((state: StoreState) => state.entities.user)

  return (
    <>
      <div className="p-5 md:p-9">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <svg
              className={` w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10  ${
                isTenant(type) ? 'fill-[#00ADEE] ' : 'fill-[#034EA1]'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="26"
              viewBox="0 0 22 26">
              <g id="bill_1_" data-name="bill (1)" transform="translate(-53 -49)">
                <g id="SOLID" transform="translate(53 49)">
                  <path
                    id="Path_23545"
                    data-name="Path 23545"
                    d="M75,50.907a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,72.8,49H55.2A2.069,2.069,0,0,0,53,50.907V71.88a1.9,1.9,0,0,0,1.216,1.706l2.8,1.213a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0L65.016,74.8a2.511,2.511,0,0,0,1.968,0l2.927-1.269a.227.227,0,0,1,.178,0l1.727.749a2.5,2.5,0,0,0,2.141-.084A1.866,1.866,0,0,0,75,72.574ZM58,69.8H70a.876.876,0,1,0,0-1.733H58A.876.876,0,1,0,58,69.8Zm0-3.467H70A.876.876,0,1,0,70,64.6H58a.876.876,0,1,0,0,1.733Zm5-12.126a2.364,2.364,0,0,0-1.356.55A1.791,1.791,0,0,0,61,56.107v.52a1.791,1.791,0,0,0,.644,1.349,2.388,2.388,0,0,0,1.556.558h1.6a.213.213,0,0,1,.141.051.16.16,0,0,1,.059.122v.52a.16.16,0,0,1-.059.122.213.213,0,0,1-.141.051H62a.876.876,0,1,0,0,1.733h1V62a1.01,1.01,0,0,0,2,0v-.874a2.364,2.364,0,0,0,1.356-.55A1.791,1.791,0,0,0,67,59.227v-.52a1.791,1.791,0,0,0-.644-1.349A2.388,2.388,0,0,0,64.8,56.8H63.2a.213.213,0,0,1-.141-.051A.16.16,0,0,1,63,56.627v-.52a.16.16,0,0,1,.059-.122.213.213,0,0,1,.141-.051H66A.876.876,0,1,0,66,54.2H65v-.867a1.01,1.01,0,0,0-2,0Z"
                    transform="translate(-53 -49)"
                    // fill="#505050"
                    fillRule="evenodd"
                  />
                </g>
              </g>
            </svg>
            <h2
              className={classNames(
                ' dashboard-title font-roboto  ',
                isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
              )}>
              {' '}
              Fees
            </h2>{' '}
          </div>
        </div>

        <div className="w-full bg-detailsCard pt-8 pb-20 px-12 rounded-3xl min-h-[70vh]">
          {isTenant(type) ? <TenantFees /> : <LandlordFees />}
        </div>
      </div>
    </>
  )
}

export default Fees
