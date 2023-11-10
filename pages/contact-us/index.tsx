import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
import ContactUs from '@/components/contactUs/ContactUs'

const contactus: NextPageWithLayout = () => {
  return (
    <section className=" w-full h-[calc(100vh-85px)] mt-[85px] flex   relative  z-20 bg-[#F1F7FF] ">
      <div className="w-[90%] md:w-full ">
        <ContactUs />
      </div>
    </section>
  )
}

export default contactus

contactus.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
