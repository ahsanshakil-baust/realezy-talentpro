import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/dist/client/script'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta name="apple-mobile-web-app-title" content="RealEzy" />
          <title>Welcome to RealEzy</title>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon.png" />
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
          <Script id="" src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer></Script>
          <Script id="" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" defer></Script>
          <Script id="" src="js/wow.min.js"></Script>
          <Script id="">new WOW().init();</Script>
          <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
          {/* <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-SBBCPJ3J8C"
          ></Script>

          <Script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SBBCPJ3J8C', {
              page_path: window.location.pathname,
            });
          `,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script id="" src="https://unpkg.com/swiper/swiper-bundle.min.js" defer></Script>
          <Script id="" src="/js/main.js"></Script>
          
        </body>
      </Html>
    )
  }
}

export default MyDocument
