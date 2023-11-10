import { useEffect } from 'react'
import { theme } from '@/config'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../state/auth/AuthContext'
import '@/styles/base.css'
import '@/styles/globals.css'
import '@/styles/embla.css'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import '@/styles/emblaDetail.css'
import { SessionProvider } from 'next-auth/react'
// import { NextPageWithLayout } from './page'
import { Provider } from 'react-redux'
import store from '@/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ReactNode } from 'react'
import Head from 'next/head'
// import ReactGA from 'analytics';

interface AppPropsWithLayout extends AppProps {
  Component: any
}

type GetLayout = (page: any) => ReactNode

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout: GetLayout = Component.getLayout || (page => page)
  // useEffect(() => {
  //   // Track page view
  //   ReactGA.pageview(window.location.pathname);
  // }, []);

  // const router = useRouter();
  // useEffect(() => {

  //   const handleRouteChange = (url: any) => {
  //     window.gtag("config", "G-SBBCPJ3J8C", {
  //       page_path: url,
  //     });
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`;
  //   script.async = true;

  //   script.onload = () => {
  //     window.dataLayer = window.dataLayer || [];
  //     window.gtag = function (...args: any[]) {
  //       window.dataLayer.push(...args);
  //     };
  //     window.gtag('js', new Date());
  //     window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
  //       page_path: window.location.pathname,
  //     });
  //   };

  //   document.head.appendChild(script);

  //   // Clean up the script tag on unmount
  //   return () => {
  //     document.head.removeChild(script);
  //     // delete window.gtag;
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>Welcome to RealEzy!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <CssBaseline />
              <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </>
  )
}

export default MyApp
