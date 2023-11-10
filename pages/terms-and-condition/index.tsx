import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
import TermsAndCondition from '@/components/terms-condition/TermsAndCondition'

const TermsCondition: NextPageWithLayout = () => {
  return (
    <section className=" w-full mt-[85px] flex items-center justify-center relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 bg-[#F1F7FF] ">
      <div className="w-[90%] md:w-full m-auto">
        <TermsAndCondition />
      </div>
    </section>
  )
}

export default TermsCondition

TermsCondition.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
