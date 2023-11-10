import React, { useEffect } from 'react'

const TermsAndCondition = () => {

  const handleScroll = () => {
    const scrollY = window.scrollY;
    parent.postMessage({ type: 'scroll', scrollY }, '*');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
  };
 }, []);


  return (
    <>
      <section id="home" className="relative overflow-hidden bg-inherit pt-[0px] md:pt-[0px] lg:pt-[0px]  ">
        <div className="container">
          <div className="wow fadeInUp" data-wow-delay=".2s" style={{ animationDelay: '0.2s', visibility: 'visible' }}>
            <div className=" flex flex-wrap">
              <div className="w-full px-4 mt-3">
                <section className="relative z-20 overflow-hidden bg-inherit ">
                  <div className="container">
                    <div className=" flex flex-wrap">
                      <div className="w-full px-0 lg:w-full">
                        <div className="w-full px-0">
                          <div className="mb-0 max-w-[620px] lg:mb-0">
                            <h2 className="mb-4 text-[25px] font-bold text-[#034EA1] sm:text-[25px] md:text-[35px]">
                              Terms and Conditions
                            </h2>
                          </div>
                        </div>
                        <div className="m-0 text-justify">
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            Real Ezy Pte. Ltd. ("<b>we</b>" or "<b>us</b>" or "<b>our</b>") is the operator of the
                            website known as www.real-ezy.com (the “<b>Website</b>”) and our mobile application, known
                            as RealEzy App (“<b>App</b>”).
                          </p>
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            Your privacy is important to us. The purpose of this Privacy Policy is to inform you of how
                            we manage personal data in accordance with the Personal Data Protection Act 2012 (the
                            “Act"). Please take a moment to read this Privacy Policy so that you know and understand the
                            purposes for which we collect, use and disclose your Personal Data.
                          </p>
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            By interacting with us, submitting information to us or signing up for any promotions or
                            services offered by us, you agree and consent to us, as well as our respective
                            representatives collecting, using, disclosing and sharing amongst themselves your Personal
                            Data, and disclosing such Personal Data to our authorised service providers and relevant
                            third parties in the manner set forth in this Privacy Policy.
                          </p>
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            This Privacy Policy supplements but does not supersede nor replace any other consents you
                            may have previously provided to us, nor does it affect any rights which we may have at law
                            in connection with the collection, use or disclosure of your Personal Data. We may from time
                            to time update this Privacy Policy to ensure that this Privacy Policy is consistent with our
                            future developments, industry trends and/or any changes in legal or regulatory requirements.
                            Subject to your rights at law, you agree to be bound by the prevailing terms of the Privacy
                            Policy as updated from time to time on our websites. Please check regularly for updated
                            information on the handling of your Personal Data.
                          </p>
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            For avoidance of doubt, this Privacy Policy forms a part of the Website Terms and Conditions
                            (“<b>Website Conditions</b>”) as well as mobile application Terms and Conditions (“
                            <b>App Conditions</b>”). In the event of any conflict, inconsistency or conflict between
                            this Privacy Policy and the Website Conditions and App Conditions, the Privacy Policy shall
                            prevail. All defined terms contained in the Website Conditions and App Conditions shall
                            apply to this Privacy Policy unless otherwise specifically stated.
                          </p>
                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            1. Your Personal Data
                          </h3>
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            1.1. In this Privacy Policy, "Personal Data" refers to any data or information about you
                            from which you can be identified either (a) from that data; or (b) from that data and other
                            information to which we have or are likely to have access. Examples of such Personal Data
                            which you may provide to us include (depending on the nature of your interaction with us:
                          </p>
                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    your name, NRIC, passport or other identification number, telephone number(s),
                                    mailing address, email address and any other information relating to you which you
                                    have provided us in any forms you may have submitted to us, or in other forms of
                                    interaction with you;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    information about your use of our website, mobile applications and services,
                                    including cookies, IP address, subscription account details and membership details,
                                    but only to the extent that we may identify you from such information;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    your employment history, education background, and income levels;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    your payment related information, such as your bank account or credit card
                                    information, and your credit history; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    details about your own home or other properties that you own, rent or may be
                                    interested in
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    information about your usage of and interaction with our website and/or services
                                    including computer and connection information, device capability, bandwidth,
                                    statistics on page views, and traffic to and from our website.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            2. Collection of Personal Data
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ animationDelay: '0.1s', visibility: 'visible' }}>
                            2.1. You can choose to browse the Website and the App without disclosing your Personal Data.
                            You are not required to provide Personal Data as a condition of using the Website or the
                            App, except as may be necessary for us to be able to provide any services which you purchase
                            or access through our Website or Apps, respond to your requests, or in cases where you
                            contact us directly.
                          </p>
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            2.2 Generally, we collect your Personal Data in the following ways, namely when
                          </p>
                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you submit forms relating to any of our products or services;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you register for or use any of our services on websites and Apps owned or operated
                                    by us or when you register as a member of websites and Apps owned and/or operated by
                                    us, or use services on such websites and Apps;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you interact with our customer service officers or sales teams, whether that be by
                                    email, telephone or face to face;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you use some of our services, e.g. our subscription service;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you establish any online accounts with us;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you request that we contact you;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you are contacted by, and respond to, our marketing representatives and agents;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you respond to our request for additional Personal Data;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you ask to be included in an email or other mailing list;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you respond to our promotions and other initiatives;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you submit a job application;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you choose to carry out transactions with us on or in relation to our Websites or
                                    Apps; or
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you complete other forms or transactions, such as calculators, or applications for
                                    products or services; or
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    you correspond with a real estate professional (such as a real estate agent or
                                    broker, mortgage lender or loan officer, property manager, investor, homebuilder, or
                                    others) via the Services; or
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    we receive references from business partners and third parties, for example, where
                                    you have been referred by them;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    when you submit your Personal Data to us for any other reason.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            2.3. When you browse our website, you generally do so anonymously but please see the section
                            below on cookies.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            2.4. You may also provide information about a third party through the Services, for example,
                            if you choose to share a real estate listing with a friend or family member via SMS,
                            WhatsApp, email or other sharing services
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            2.5. If you provide us with any Personal Data relating to a third party (e.g. information of
                            spouse, children, parents, employees and/or authorised representatives), by submitting such
                            information to us, you represent to us that you have obtained the consent of the third party
                            to you providing us with their Personal Data for the respective purposes.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            2.6. You should ensure that all Personal Data submitted to us is complete, accurate, true
                            and correct. Failure on your part to do so may result in our inability to provide you with
                            products and services you have requested.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            3. Purposes for the Collection, Use and Disclosure of Your Personal Data
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            3.1. Unless restricted by applicable law, by using the Website and the App, you agree that
                            any and all Personal Data relating to you collected by us or provided by you from time to
                            time may be used, processed, and disclosed for such purposes and to such persons as set out
                            in this Privacy Policy.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            3.2. Generally, we collect, use and disclose your Personal Data for the following purposes:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    responding to your queries and requests and responding to complaints;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    managing our infrastructure and business operations and complying with internal
                                    policies and procedures;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    facilitating business asset transactions (which may extend to any merger,
                                    acquisition or asset sale);
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    matching any Personal Data held which relates to you for any of the purposes listed
                                    herein;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    verifying your identity;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    preventing, detecting and investigating crime, including fraud and money-laundering,
                                    and analyzing and managing other commercial risks;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    protecting and enforcing our contractual and legal rights and obligations;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting audits, reviews and analysis of our internal processes, action planning
                                    and managing commercial risks;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    preventing, detecting and investigating crime and managing the safety and security
                                    of our premises and services (including but not limited to carrying out CCTV
                                    surveillance and conducting security clearances;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    compliance with any applicable rules, laws and regulations, codes of practice or
                                    guidelines or to assist in law enforcement and investigations by relevant
                                    authorities; and/or
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any other purpose relating to any of the above.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            3.3. In addition, we may collect, use and disclose your Personal Data for the following
                            purposes, depending on the nature of our relationship with you:
                          </p>

                          <p
                            className="wow fadeInUp mb-3 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            - If you have a subscription or membership account with us:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    to process your application for Online Subscription Services;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    to maintain your account with us;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    to verify and process your personal particulars and payments in relation to
                                    provision of Online Subscription Service to you;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    to provide you with the goods and services which you have signed up for;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    sending you general commercial communications via any communication channel, not
                                    limited to email, voice call, SMS and app notifications;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    communicating with you to inform you of changes and development to our policies,
                                    terms and conditions and other administrative information, including for the
                                    purposes of servicing you in relation to products and services offered to you;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    sending your marketing information about our goods or services including notifying
                                    you of our marketing events, initiatives and promotions, lucky draws, membership and
                                    rewards schemes and other promotions;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    resolving complaints and handling requests and enquiries;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting market research for statistical, profiling and statistical analysis for
                                    the improvement of services provided to you; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    the processing of your Personal Data in relation to any of the purposes stated
                                    above.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-3 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            - If you use download or use any of our Apps:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    where the App includes App Subscription Services, to process your application for
                                    these services;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    to maintain your account with us and to ensure your access of the App is within the
                                    scope of your subscription;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    to verify and process your personal particulars and payments in relation to
                                    provision of goods and services connected to the App;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    to provide you with the goods and services which you have signed up for and to push
                                    articles to you which may be relevant to you;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    sending you general commercial communications via any communication channel, not
                                    limited to email, voice call, SMS and app notifications;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    communicating with you to inform you of changes and development to our policies,
                                    terms and conditions and other administrative information, including for the
                                    purposes of servicing you in relation to products and services offered to you;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    resolving complaints and handling requests and enquiries;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting market research for statistical, profiling and statistical analysis for
                                    the improvement of services provided to you; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    the processing of your Personal Data in relation to any of the purposes stated
                                    above.
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal"></h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-3 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            - If you are a prospective tenant or a tenant:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting appropriate due diligence checks to ensure suitability of tenant;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    preparation of documentation, including letters of offer, other relevant leasing
                                    documentation and applications for any relevant licences which may be required; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any other purpose directly relating to any of the above.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-3 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            - If you are a prospective seller or a seller, prospective landlord or a landlord:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting appropriate due diligence checks to ensure property ownership
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    preparation of documentation, including letters of offer, other relevant marketing
                                    documentation and applications for any relevant licences which may be required; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any other purpose directly relating to any of the above.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-3 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            - If you are a prospective buyer or a buyer:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting appropriate due diligence checks to ensure suitability of buyer;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    preparation of documentation, including letters of offer, other relevant purchase
                                    documentation and applications for any relevant licences which may be required; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any other purpose directly relating to any of the above.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-3 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            - If you submit an application to us as a candidate for employment or an internship:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    processing your application including pre-recruitment checks;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    providing or obtaining employee references or other references where relevant for
                                    background screening/vetting;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    collecting information about your suitability for the position applied for;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    organising training and staff development programs;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    assessing your performance;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    administering benefits and payroll processing;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting appropriate due diligence checks to ensure suitability of tenant;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    communicating with you as required by to comply with its policies and processes,
                                    including for business continuity purposes; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any other purposes relating to the aforesaid.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            3.4. In addition, where permitted under the Act, we may also collect, use and disclose your
                            Personal Data for the following purposes (which we may describe in our documents and
                            agreements as "Additional Purposes" for the handling of Personal Data):
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    providing services, products and benefits to you, including promotions, loyalty and
                                    reward programmes;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    matching Personal Data with other data collected for other purposes and from other
                                    sources (including third parties) in connection with the provision or offering of
                                    products and services, whether by us or other third parties;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    administering contests, competitions and conducting lucky draws, including, where
                                    necessary, in order to announce the results of these contests, competitions and
                                    lucky draws and identify and contact the winners, and in order to publicise and
                                    conduct marketing strictly related to these contests, competitions and lucky draws;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    sending you details of products, services, special offers and rewards, either to our
                                    customers generally, or of particular products and services which may be of interest
                                    to you; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    conducting market research, understanding and determining customer location,
                                    preferences and demographics for us to review, develop and improve our products,
                                    services and also develop special offers and marketing programmes.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            3.5. <b>Do Not Call Provisions</b>. If you have provided your Singapore telephone number(s)
                            and have indicated that you consent to receiving marketing or promotional information via
                            your Singapore telephone number(s), then from time to time, we may contact you using such
                            Singapore telephone number(s) (including via voice calls, sms, fax or other means) even if
                            these Numbers are registered with the Do Not Call Registry, with information about our
                            products and services (including discounts and special offers). You may however advise in
                            writing should you wish not to be contacted by us at your Numbers for such purposes.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            3.6. In relation to particular products or services or in your interactions with us, we may
                            also have specifically notified you of other purposes for which we collect, use or disclose
                            your Personal Data. If so, then we will collect, use and disclose your Personal Data for
                            these additional purposes as well, unless we have specifically notified you otherwise.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            4. Disclosure of Personal Data
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            4.1. We will take reasonable steps to protect your Personal Data against unauthorised
                            disclosure. Subject to the provisions of any applicable law, this Personal Data may be
                            disclosed, for the purposes listed above (where applicable), to the following third parties,
                            whether they are located overseas or in Singapore:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any of our affiliates;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    agents, contractors or third party service providers who provide us with operational
                                    services, such as telecommunications, information technology, payment, payroll,
                                    processing, training, market research, newspaper vendor services, newspaper delivery
                                    services, storage, archival or other services to us;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    vendors or any third party business partners who offer goods and services or sponsor
                                    contests or other promotional programs on our sites, whether in conjunction with us
                                    or not;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    external business and charity partners in relation to corporate promotional events;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    the Credit Bureau, or in the event of default or disputes, any debt collection
                                    agencies or dispute resolution centres;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any business partner, investor, assignee or transferee (actual or prospective) to
                                    facilitate business asset transactions (which may extend to any merger, acquisition
                                    or asset sale;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    anyone to whom we transfer or may transfer our rights and duties;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    banks, credit card companies and their respective service providers;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    our professional advisors such as our auditors and lawyers;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    relevant government regulators or authority or law enforcement agency to comply with
                                    any laws or rules and regulations imposed by any governmental authority; and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    any other party to whom you authorise us to disclose your personal data
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            5. Use of cookies, pixels and other tracking mechanism
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            5.1. We and our partners use various technologies to collect information automatically when
                            you access and use the Website and App, including cookies, and other similar technologies.
                            Cookies are bits of electronic information that can be transferred to your computer or other
                            electronic device to uniquely identify your browser. When you use the Website and App, we
                            and our partners may place one or more cookies on your computer or other electronic devices
                            or use other technologies that provide similar functionality.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            5.2. We and our partners may use cookies to connect your activity on the Services with other
                            information we store about you in your account profile or your prior interactions on our
                            Services to, for example, store your preferences. The use of cookies helps us improve the
                            quality of our Services to you, by identifying information which is most interesting to you,
                            tracking trends, measuring the effectiveness of advertising, or storing information you may
                            want to retrieve on a regular basis, such as your shortlisted properties or preferred
                            searches.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            5.3. Some of our pages may include pixels, or we may use an independent company (the{' '}
                            <b>"Third Party Market Research Company"</b>) to measure and analyse the Internet usage of
                            the Website. We use the information from the pixels and the Third Party Market Research
                            Company's services to collect the following core information on the usage of the Website,
                            including:
                          </p>

                          <div>
                            <ul className="w-full rounded-lg mt-2 mb-8 text-body-color">
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    The number of page views (or page impressions) that occur on the Website;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    The number of unique visitors to the Website;
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    How long these unique visitors (on average) spend on the Website when they do visit;
                                    and
                                  </h4>
                                </a>
                              </li>
                              <li className="mb-[2px]">
                                <a href="" className="w-fill flex py-0 pointer-events-none">
                                  <div className="flex-none relative z-10 mb-0 flex h-[23px] w-[23px] items-center justify-center rounded-full bg-white font-bold shadow-masonry mt-[12px] border-[5px] border-[#034EA1] "></div>
                                  <h4 className="ml-1 text-md font-normal text-body-color sm:text-md pt-3 px-3 normal">
                                    Common entry and exit points into the Website.
                                  </h4>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            5.4. Such data is also accessible by media organizations and research companies, for the
                            purpose of conducting industry comparisons with other Internet portals.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            5.5. Pages on the Website may be coded with software which enables the Third Party Market
                            Research Company to track visitors to the Website.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            5.6. Should you wish to disable the cookies associated with these technologies, you may do
                            so by changing the setting on your browser. However, you may not be able to enter certain
                            part(s) of the Website and many of the free features of our services may not operate
                            properly.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            6. International Data Transfers
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            6.1. We operate in many countries and may temporarily store, process or transfer your
                            Personal Data between any of the countries in which we operate in order to enable us to use
                            your Personal Data in accordance with this Privacy Policy and our Terms of Service at the
                            Website.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            6.2. We take all steps reasonably necessary to ensure that your Personal Data is transferred
                            in accordance with any applicable law or regulation and take all reasonable steps to ensure
                            that any foreign recipient organisation of your Personal Data is bound by legally
                            enforceable obligations to provide to the transferred Personal Data a standard of protection
                            that is at least comparable to the protection under the PDPA.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            7. Third-Party Sites
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            7.1. Our website may contain links to other websites operated by third parties, such as our
                            business partners. We are not responsible for the privacy practices of websites operated by
                            third parties that are linked to our website. We encourage you to learn about the privacy
                            policies of such third party websites. Some of these third party websites may be co-branded
                            with our logo or trademark, even though they are not operated or maintained by us. Once you
                            have left our website, you should check the applicable terms, conditions and policies of the
                            third party website to determine how they will handle any information they collect from you.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            8. Withdrawal, Access and Correction of your Personal Data
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            8.1. Should you wish to withdraw consent to use of your Personal Data or obtain access to or
                            make corrections to your Personal Data records, please log in to the relevant account
                            through which the Personal Data was provided. We provide you with the ability to access,
                            rectify, port and delete your data. You may do so under your Account Settings. Failing which
                            please contact the relevant Personal Data Protection Officer, contact details of which are
                            found in the Personal Data Protection Statement at https://www.real-ezy.com
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            8.2. Please note that if you withdraw your consent to any or all use of your Personal Data,
                            depending on the nature of your request, we may not be in a position to continue to provide
                            our products or services to you or administer any contractual relationship in place, and
                            this may also result in the termination of any agreements with us and your being in breach
                            of your contractual obligations or undertaking. All our legal rights and remedies in such
                            event are expressly reserved.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            8.3. We store data until it is no longer necessary to provide our services, or until your
                            account is deleted - whichever comes first. This is a case-by-case determination that
                            depends on things such as the nature of the data, why it is collected and processed, and
                            relevant legal and operational retention needs.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            8.4. We may also refuse to disclose, delete or amend any Personal Data for the reasons set
                            out in the PDPA.
                          </p>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            8.5. As far as reasonably possible, we will respond to your request within fourteen (14)
                            working days from the date of receipt of the request. If that is not possible, you will be
                            so notified within fourteen (14) working days from the date of receipt of the request.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            9. Governing Law
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            9.1. This Privacy Policy shall be governed in all respects by the laws of Singapore.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            10. Disclaimer
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            We shall not be liable for any voluntary disclosure or personal data made by you to other
                            users in connection with the use of our Websites or Apps.
                          </p>

                          <h3
                            className="wow fadeInUp mb-8 text-2xl font-bold text-dark sm:text-[26px]"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            11. Contact Us
                          </h3>

                          <p
                            className="wow fadeInUp mb-8 text-base leading-relaxed text-body-color"
                            data-wow-delay=".1s"
                            style={{ visibility: 'hidden', animationDelay: '0.1s', animationName: 'none' }}>
                            11.1 Should you require further information about the treatment of your Personal Data by us,
                            please do not hesitate to contact our Data Protection Officer at:{' '}
                            <a href="https://www.real-ezy.com"> https://www.real-ezy.com </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsAndCondition
