import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'

import ViewProfile from '@/components/viewProfile/ViewProfile'
// import { useRouter } from 'next/router'

const Viewprofile: NextPageWithLayout = () => {
  return (
    <section className=" w-full mt-[85px] flex items-center justify-center z-20 bg-[#F1F7FF] ">
      <div className="w-[90%] md:w-full ">
        <ViewProfile />
      </div>
    </section>
  )
}

export default Viewprofile

Viewprofile.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
