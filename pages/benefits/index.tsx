import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
import BenefitsPage from '@/components/benefits'

// import FAQPage from '@/components/faqSection/FAQPage'

const Benefits: NextPageWithLayout = () => {
  return (
    <>
    <section className=" w-full mt-[85px] flex flex-col  z-20 ">
      <div className=" w-full 2xl:h-[15.625rem] md:h-[12.5rem] h-[10rem] flex relative  items-center justify-center  bg-[url('/aboutUs/benefits-banner.png')] bg-no-repeat bg-center bg-cover">
        {/* <p className="font-roboto font-bold 2xl:text-[6.75rem]/[8.125rem] md:text-[5.4rem]/[6.5rem] text-[3.4rem]/[4.5rem]   2xl:tracking-[2.16px] md:tracking-[1.728rem] text-center uppercase text-[#FFFFFF] opacity-25">
          Benefits
        </p>
        <p className=" absolute mx-auto font-roboto font-bold 2xl:text-[2.5rem]/[3rem] md:text-[2rem]/[2.4rem] 2xl:tracking-[0.8px] md:tracking-[0.64rem] text-center uppercase text-[#FFFFFF]">
          Benefits to Landlord and Tenant
        </p> */}
      </div>
    </section>
    <section className=" w-full mt-[0px] flex relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] z-20 bg-[#F1F7FF] ">
      
      <div className="w-[90%] md:w-full ">
        <BenefitsPage />
      </div>
    </section>
    </>
  )
}

export default Benefits

Benefits.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
