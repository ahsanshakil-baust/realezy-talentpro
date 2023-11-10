import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'

const Deal: NextPageWithLayout = () => {
  return (
    <section className=" w-full h-[calc(100vh-85px)] mt-[85px] flex   relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 bg-[#F1F7FF] ">
      <div className="w-[90%] md:w-full ">Deal</div>
    </section>
  )
}

export default Deal

Deal.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
