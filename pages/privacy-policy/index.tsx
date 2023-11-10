import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
import PrivacyPolicy from '@/components/privacy-policy/PrivacyPolicy'

const PrivacyPol: NextPageWithLayout = () => {
  return (
    <section className=" w-full mt-[85px] flex items-center justify-center relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 bg-[#F1F7FF] ">
      <div className="w-[90%] md:w-full m-auto">
        <PrivacyPolicy />
      </div>
    </section>
  )
}

export default PrivacyPol

PrivacyPol.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
