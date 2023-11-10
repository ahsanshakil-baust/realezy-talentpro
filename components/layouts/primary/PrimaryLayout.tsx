import Head from 'next/head'
import Footer from '../../navigation/footer/Footer'
// import Header from '../../navigation/header/Header'
// import PrimaryModalLayout from './PrimaryModalLayout'

// import { useEffect } from 'react'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import GlobalLayout from '../GlobalLayout/GlobalLayout'
export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start'
}
import { CookiesProvider } from 'react-cookie'
import Script from 'next/script'

const PrimaryLayoutContent: React.FC<IPrimaryLayout> = ({ children, justify = 'items-center', ...divProps }) => {
  return (
    <>
      <Head>
        <title>Welcome to RealEzy</title>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, shrink-to-fit=no"
        />
        {/* <meta name="description" content="" /> */}
        <link rel="icon" href="/favicon.ico" />        
      </Head>
      <div {...divProps} className={`min-h-screen overflow-hidden item-center`}>
        {/* <Header /> */}
        <main className="">{children}</main>
        {/* <div className="m-auto" /> */}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </div>
    </>
  )
}

const PrimaryLayout: React.FC<IPrimaryLayout> = props => (
  <CookiesProvider>
    <GlobalLayout>
      <PrimaryLayoutContent {...props} />
    </GlobalLayout>
  </CookiesProvider>
)

export default PrimaryLayout
