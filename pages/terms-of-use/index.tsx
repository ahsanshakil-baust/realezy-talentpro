import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
// import TermsOfUse from '@/components/dashboard/TermsOfUse'
import TermsOfUse from '@/components/terms-of-use/TermsOfUse'

const TermsUse: NextPageWithLayout = () => {
  return (
    <section className=" w-full mt-[85px] flex items-center justify-center relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 bg-[#F1F7FF] ">
      <div className="w-[90%] md:w-full m-auto pt-3">
        <div className='container'>
          <TermsOfUse />
        </div>
      </div>
    </section>
  )
}

export default TermsUse

TermsUse.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
