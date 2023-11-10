import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
// import Login from '@/components/Login/Login'
import FinLogin from '@/components/Login/FinLogin'

const LoginPage: NextPageWithLayout = () => {
  return (
    <section className="bg-[#F1F7FF] flex flex-col mt-[85px] shadow-md py-10">
      <div className="w-[90%] md:w-full m-auto">
        {/* <Login /> */}
        <FinLogin />
      </div>
    </section>
  )
}

export default LoginPage

LoginPage.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
