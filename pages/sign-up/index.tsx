import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
// import SignUp from '@/components/SignUp/Signup'
import FinSignUp from '@/components/SignUp/FinSignUp'

const SignUpPage: NextPageWithLayout = () => {
  return (
    <section className="bg-[#F1F7FF] flex flex-col mt-[85px] shadow-md py-10">
      <div className="w-[90%] md:w-full m-auto">
        {/* <SignUp /> */}
        <FinSignUp />
      </div>
    </section>
  )
}

export default SignUpPage

SignUpPage.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
