// import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const RedBook = ({roletype, metaData}: any) => {
  return (
    roletype === 'tenant' ? <div className=" flex flex-col gap-3 font-roboto font-medium text-[#101010]">
      <h2>Tenant DIY process:</h2>
      <div className=" w-full flex gap-2">
        <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
          <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
        </div>
        <div className="w-full flex flex-col ">
          <p>
            Review the property profile via the link below. If you're keen, chat directly with {metaData?.landlord_name} for any
            additional enquiries you may have regarding the listing.
          </p>
          <Link href={`/property-details/${metaData?.property_id}`}><a className=" text-[#00ADEE] my-4">Click for view property profile</a></Link>
        </div>
      </div>
      <div className=" w-full flex gap-2">
        <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
          <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
        </div>
        <div className="w-full  ">
          <p>
            Arrange viewing directly with {metaData?.landlord_name} and propose at least 3 viewing time slots using our RealEzy viewing
            scheduler.
          </p>
        </div>
      </div>
      <div className=" w-full flex gap-2">
        <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
          <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
        </div>
        <div className="w-full  ">
          <p>Once you are ready to deal, make a rental proposal to {metaData?.landlord_name} the RealEzy way!</p>
        </div>
      </div>
      <div className=" w-full flex gap-2">
        <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
          <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
        </div>
        <div className="w-full  ">
          <p>
            Once {metaData?.landlord_name} accepts your rental proposal, proceed to pay Reservation Fee.Once Reservation Fee payment is
            completed, the landlord will send you the Draft proposal, then you must make the 1st Month Rental payment
            and pay the Stamp duties fee.If for any reason the deal cannot go through, all monies paid by will be
            refunded except for the Platform Fee.
          </p>
        </div>
      </div>
      <div className=" w-full flex gap-2">
        <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
          <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
        </div>
        <div className="w-full  ">
          <p>Review and sign e-Tenancy Agreement.</p>
        </div>
      </div>
      <div className=" w-full flex gap-2">
        <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
          <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
        </div>
        <div className="w-full  ">
          <p>
            Receive your signed copy of the e-Tenancy Agreement and collect keys from {metaData?.landlord_name} at least one day before
            the tenancy commencement date.
          </p>
        </div>
      </div>
      <div className=" w-full flex gap-2">
        <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
          <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
        </div>
        <div className="w-full  ">
          <p>
            Sign Condition Report and Inventory Checklist of the property. Make sure you've checked everything prior to
            signing!
          </p>
        </div>
      </div>
    </div> 

    :

    <div className=" flex flex-col gap-3 font-roboto font-medium text-[#101010]">
    <h2>Landlord DIY process:</h2>
    <div className=" w-full flex gap-2">
      <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
      </div>
      <div className="w-full flex flex-col ">
        <p>
          Review the {metaData?.tenant_name} profile below, and the chat directly with {metaData?.tenant_name} for any enquiries you may have for {metaData?.tenant_name}.
        </p>
        <Link href={`/view-profile/${metaData?.tenant_id}`}><a className=" text-[#00ADEE] my-4"> Click for view {metaData?.tenant_name}'s profile</a></Link>
      </div>
    </div>
    <div className=" w-full flex gap-2">
      <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
      </div>
      <div className="w-full  ">
        <p>
          Review the rental proposal from {metaData?.tenant_name}, and either accept, or send a counter proposal.
        </p>
      </div>
    </div>
    <div className=" w-full flex gap-2">
      <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
      </div>
      <div className="w-full  ">
        <p>Apply for tenancy approval from HDB (this step is only required if you are renting out entire HDB unit or room)</p>
      </div>
    </div>
    <div className=" w-full flex gap-2">
      <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
      </div>
      <div className="w-full  ">
        <p>
          Issue RealEzy e-Tenancy Agreement for {metaData?.tenant_name} to sign.
        </p>
      </div>
    </div>
    <div className=" w-full flex gap-2">
      <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
      </div>
      <div className="w-full  ">
        <p>Pay RealEzy admin fees which includes Landlord's comprehensive protection plan from Allianz.</p>
      </div>
    </div>
    <div className=" w-full flex gap-2">
      <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
      </div>
      <div className="w-full  ">
        <p>Review and sign RealEzy e-Tenancy Agreement.</p>
      </div>
    </div>
    <div className=" w-full flex gap-2">
      <div className=" w-6 h-6 bg-white border-2 border-[#034EA1] flex items-center justify-center rounded-full shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <div className=" w-[7px] h-[7px] rounded-full bg-red-500"></div>
      </div>
      <div className="w-full  ">
        <p>
          Arrange handover of keys and property to {metaData?.tenant_name} at least one day before tenancy commencement date.
        </p>
      </div>
    </div>
  </div>
  )
}

export default RedBook
