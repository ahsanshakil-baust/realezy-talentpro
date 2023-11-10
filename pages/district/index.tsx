import District from '@/components/district/District'
// import { useRouter } from 'next/router'
import React from 'react'
// import { NextPageWithLayout } from '../page'
import { PrimaryLayout } from '@/components'
import UpDistrict from '@/components/district/UpDistrict'

const index = () => {
  return (
    <section className=" 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5 bg-[#F1F7FF] mt-[85px]">
      <div className="w-[90%] md:w-full m-auto ">
        <UpDistrict />
        <District />
      </div>
    </section>
  )
}

export default index

index.getLayout = (page: any) => <PrimaryLayout>{page}</PrimaryLayout>
