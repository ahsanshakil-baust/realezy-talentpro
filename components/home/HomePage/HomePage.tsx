// import FilterDiv from '../../FilterDiv/Filter'
import HmSlider3 from '@/components/hmSlider3/HmSilder3'
import HmSlider4 from '@/components/hmSlider4/HmSlider4'
import HmSlider2 from '@/components/hmSlider2/hmSilder2'
import HmSlider1 from '@/components/hmSlider1/hmSlider1'
import FAQSection from '@/components/faqSection/FAQSection'
// import CustomDpCarousel from '@/components/cards/EmblaCarousel/detailPage/detailPageCarousel/DetailPageCarousel'
// import DetailPageCard from '@/components/cards/EmblaCarousel/detailPage/detailPageCard/DetailPageCard'
import HmSlider from '@/components/hmslider/HmSlider'
import HmDownloadSection from '@/components/hmDownloadSection/HmDownloadSection'
import HmWhyChooseUs from '@/components/hmWhyChooseUs/HmWhyChooseUs'
import HmInsurance from '@/components/hmInsuranceSection/HmInsurance'
import HmNewsLetter from '@/components/hmNewsLetter/HmNewsLetter'
import HmContactUs from '@/components/hmContactUs/HmContactUs'
// import { useGetHomeAllDataQuery } from '@/store'

import { demoData } from '@/util/data'
import HelpSupport from '@/components/faqSection/HelpSupport'
import HmSliderNew from '@/components/hmslider/HmSliderNew'
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
// import ContactForm from '@/components/formSchema/ContactForm'
// import RentalOfferTCreate from '@/components/chatProgressForm/rental_offer/tenant/RentalOfferTCreate'
// import ProfileCompleteAlertT from '@/components/chatProgressForm/rental_offer/tenant/ProfileCompleteAlertT'
// import RentalOfferTUpdate from '@/components/chatProgressForm/rental_offer/tenant/RentalOfferTUpdate'
// import RentalOfferLview from '@/components/chatProgressForm/rental_offer/landlord/RentalOfferLview'
// import CreateAgreement from '@/components/chatProgressForm/agreement_create/landlord/CreateAgreement'
// import InsurancePolicyAlert from '@/components/chatProgressForm/agreement_create/landlord/InsurancePolicyAlert'
// import AgreementDetails from '@/components/chatProgressForm/agreement_create/tenant/AgreementDetails'
// import ButtonLoader from '@/components/loader/ButtonLoader'

const { districtNameNew } = demoData

// const {_, distwo, disthree, disfour } =  districtNameWithImage
const distwo = districtNameNew[0]
const disthree = districtNameNew[1]
const disfour = districtNameNew[2]

const homeDistrictList = [
  {
    // image: distwo.images,
    title: distwo.label,
    value: distwo.value,
  },
  {
    // image: disthree.images,
    title: disthree.label,
    value: disthree.value,
  },
  {
    // image: disfour.images,
    title: disfour.label,
    value: disfour.value,
  },
]

export interface IHomePage {
  data: any
}

const HomePage: React.FC<IHomePage> = ({ data }) => {
  return (
    <>
      <section className="hidden">
        <HmSlider />
      </section>
      <section>
        <HmSliderNew />
      </section>

      <section className=" 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5 bg-[#FCFDFF]  md:pt-0 ">
        <div className="w-[90%] md:w-full m-auto ">
          <section>{data?.findProperty && <HmSlider1 data={data?.findProperty} />}</section>
          <section>{<HmSlider2 data={homeDistrictList} />}</section>
        </div>
      </section>
      <section className=" relative 2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] flex w-full items-center gap-y-5 bg-[#FCFDFF]">
        <div className="w-[90%] md:w-full m-auto z-10 ">
          <section>
            <HmDownloadSection />
          </section>

          <section>
            <HmSlider3 />
          </section>
          <section>
            <HmSlider4 title={'Popular Listings'} />
          </section>
        </div>
        <div className=" w-full h-full absolute left-0 top-[15%] bg-gradient-to-b from-[#FCFDFF] from-0% to-[#F1F7FF] to-100% z-0" />
        {/* </section> */}
      </section>

      <section className="py-[8px]  md:py-[12px] lg:py-[16px] xl:py-[22px] 2xl:py-[30px] bg-[#FCFDFF]">
        <HmWhyChooseUs />
      </section>

      <section>
        <HmInsurance />
      </section>

      <section>
        <FAQSection />
        {/* <HelpSupport /> */}
      </section>

      <section></section>

      <section>
        <HmNewsLetter />
      </section>

      <section id="contact-us">
        <HmContactUs />
      </section>
    </>
  )
}

export default HomePage
