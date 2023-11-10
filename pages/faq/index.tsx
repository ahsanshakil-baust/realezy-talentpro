import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'

import FAQPage from '@/components/faqSection/FAQPage'

const Faq: NextPageWithLayout = () => {
  return (
    <section className=" w-full mt-[85px] flex items-center justify-center relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 bg-[#F1F7FF] ">
      <div className="w-[90%] md:w-full m-auto">
        <FAQPage />
      </div>
    </section>
  )
}

export default Faq

Faq.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
