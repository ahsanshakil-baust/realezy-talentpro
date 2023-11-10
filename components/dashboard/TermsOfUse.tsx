import { StoreState } from '@/types'
import { isTenant } from '@/util'
import classNames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'

const TermsOfUse = () => {
  const { type } = useSelector((state: StoreState) => state.entities.user)

  return (
    <>
      <div className="p-5 md:p-9">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <svg
              id="e"
              className={` w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10  ${
                isTenant(type) ? 'fill-[#00ADEE] ' : 'fill-[#034EA1]'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26">
              <path
                id="Path_23546"
                data-name="Path 23546"
                d="M14.226,20.823a6.6,6.6,0,0,1,10.555-5.279c.063-.92.1-1.949.1-3.1a39.679,39.679,0,0,0-.506-6.579A6.956,6.956,0,0,0,19.022.506,39.615,39.615,0,0,0,12.442,0a39.686,39.686,0,0,0-6.58.506A6.956,6.956,0,0,0,.506,5.863,39.735,39.735,0,0,0,0,12.442a39.742,39.742,0,0,0,.506,6.58,6.956,6.956,0,0,0,5.357,5.357,39.738,39.738,0,0,0,6.58.506c1.152,0,2.181-.041,3.1-.1a6.548,6.548,0,0,1-1.318-3.958ZM6.295,6.013h12.3a1.44,1.44,0,0,1,0,2.88H6.295a1.44,1.44,0,0,1,0-2.88Zm0,8.894a1.44,1.44,0,0,1,0-2.88h7.218a1.44,1.44,0,0,1,0,2.88Z"
                // fill="#505050"
              />
              <path
                id="Path_23547"
                data-name="Path 23547"
                d="M313.341,308.16a5.181,5.181,0,1,0,5.181,5.181A5.181,5.181,0,0,0,313.341,308.16Zm.966,7.752a.966.966,0,1,1-1.932,0v-2.548a.966.966,0,0,1,1.932,0Zm-.04-4.616a.545.545,0,0,1-.42.42,3.143,3.143,0,0,1-.516.04,3.091,3.091,0,0,1-.516-.04.545.545,0,0,1-.42-.42,3.14,3.14,0,0,1-.04-.516,3.091,3.091,0,0,1,.04-.516.545.545,0,0,1,.42-.42,3.14,3.14,0,0,1,.516-.04,3.091,3.091,0,0,1,.516.04.545.545,0,0,1,.42.42,3.14,3.14,0,0,1,.04.516A3.091,3.091,0,0,1,314.267,311.3Z"
                transform="translate(-292.522 -292.522)"
                // fill="#505050"
              />
            </svg>
            <h2
              className={classNames(
                ' dashboard-title font-roboto  ',
                isTenant(type) ? 'text-[#00ADEE]' : 'text-[#034EA1]'
              )}>
              {' '}
              Terms Of Use
            </h2>{' '}
          </div>
        </div>

        <div className="w-full bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh]">
          <h2 className="content-header">General</h2>
          <p className=" p-text mb-5">
            Please carefully read all of these terms and conditions ("Terms"). You and Real Ezy Pte Ltd ("Company,"
            "Real Ezy," "we," or "us") are bound by these Terms, which also govern your use of www.Real-Ezy.com, Real
            Ezy App and Real Ezy Web App (collectively, the " Real Ezy Platforms" including all material and features
            thereof). You accept the terms and conditions set out in this document and all other terms that are
            referenced herein by accessing or using the Real Ezy Platforms. Do not use the Real Ezy Platforms if you do
            not agree to these Terms. Real Ezy shall not be liable for any damages resulting from your use of any
            information or content on the Real Ezy Platforms. You are solely responsible for ensuring that any
            information, goods, or services obtained from the Real Ezy Platforms satisfy your individual needs.
          </p>
          <h2 className="content-header">Data Security</h2>
          <p className=" p-text mb-5">
            You should read the Company's PDPA before using the website as it also applies to how you use it. You
            confirm that you have read the Company's PDPA by using Real Ezy Platforms.
          </p>
          <h2 className="content-header">Ownership</h2>
          <p className=" p-text mb-5">
            Real Ezy Pte Ltd ("Real Ezy") owns the rights to the Real Ezy Platforms and its contents. Real Ezy and/or
            its service providers own all rights, title, and interest in the Real Ezy Platforms, including all
            information and intellectual property contained within, and you acknowledge and agree that they do so. Real
            Ezy retains sole and exclusive ownership of all rights to the information, materials, services, and products
            described on this Real Ezy Platforms, including all title, ownership, copyright, trademarks, and other types
            of intellectual property rights. Real Ezy urges you to report any materials or anything that you think
            should be taken down from the Real Ezy Platforms, such as if you think that it infringes in any way on yours
            or another person's intellectual property. The methods provided in the "Contact Information" section below
            can be used to contact Real Ezy.
          </p>
          <h2 className="content-header">Termination</h2>
          <p className=" p-text mb-5">
            This contract between you and Real Ezy may be immediately terminated at any time for any reason, including
            if you violate any provision of these Terms.
          </p>
          <h2 className="content-header">Misuse of the Website</h2>
          <p className=" p-text mb-5">
            You are responsible for making sure that your use of the Real Ezy Platforms and access to it always complies
            with all applicable laws. It is forbidden for you to use the Real Ezy Platforms or access it in any way that
            could endanger Real Ezy, its partners or service providers, interfere with how the Real Ezy Platforms
            functions, or break any laws that may be in force. You are not permitted to, for example: attempt to probe,
            scan, or test the vulnerability of Real Ezy's network or system; send, store, or distribute any viruses,
            worms, disabling code, or malware component harmful to a network; or circumvent or disable any security or
            other technological features or measures of this Real Ezy Platforms; Violations of third parties' privacy or
            intellectual property rights, as well as injury, menace, or harassment of any person or organization, are
            prohibited from being uploaded, presented, or provided for processing through the Real Ezy Platforms.
            Unauthorized use of the Real Ezy Platforms could result in Real Ezy suing for damages and/or be illegal.
          </p>
          <h2 className="content-header">A Warning About Links to Other Websites</h2>
          <p className=" p-text mb-5">
            The Real Ezy Platforms might include ties to other services. including social media websites, or offer links
            to other services. Real Ezy provides these links and integrations for your convenience but makes no
            guarantees or representations regarding them or any other goods or services advertised or run by third
            parties. Real Ezy has no control over. doesn't support. and doesn't take responsibility for any losses or
            harm caused by your use Of third-party services. You use such services at your own risk because Real Ezy
            disclaims any responsibility for their content.
          </p>
          <h2 className="content-header">A Revision to These Terms</h2>
          <p className=" p-text mb-5">
            Real Ezy reserves the right to modify these Terms at any time and without notice. The 'Effective Date' above
            will be changed when we materially update the Terms. and the new Terms will be posted. If we update the
            Terms, they will become effective upon your acceptance of the updated Terms or your continuing use of the
            Website. Non-material modifications take effect as soon as the revised terms are posted. You must
            periodically check this page to stay informed of any updates.
          </p>
          <h2 className="content-header">Rule of Law</h2>
          <p className=" p-text mb-5">
            You consent that any claim, action, or dispute between Real Ezy and you will only be heard in the Republic
            of Singapore if one occurs.
          </p>
          <h2 className="content-header">No Warranties</h2>
          <p className=" p-text mb-5">
            You acknowledge that Real Ezy Platforms are used at your own risk. The Real Ezy Platforms are made available
            •as is' and "as available. • Real Ezy disclaims all warranties, express or implied. and guarantees regarding
            the accuracy. timeliness. performance. completeness, or fitness of the Real Ezy Platforms for any particular
            purpose to the fullest extent permitted by law. You agree that there may be errors or inaccuracies on the
            Real Ezy Platforms, and we expressly disclaim all responsibility for any such errors or inaccuracies to the
            fullest extent by law. You also fully acknowledge that your use of the Real Ezy Platforms may result in data
            loss or harm to your property, including but not limited to damage to your computer system or mobile device.
            You acknowledge that Real Ezy Platforms may not be available at all times.
          </p>
          <h2 className="content-header">Limitation of Liability</h2>
          <p className=" p-text mb-5">
            To the fullest extent permitted by applicable law. REAL EZY DISCLAIMS ALL LIABILITY FOR ANY COSTS, LOSSES.
            CLAIMS. DAMAGEs. expenses. or proceedings of any kind incurred or suffered by you as a result of your use of
            the Real Ezy Platforms or as a result of any partial or total unavailability of the Real Ezy Platforms or
            any materials or associated services. AN APPLICABLE LAW MAY NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR
            THE EXCLUSION OR LIMITATION OF DAMAGES, SO IN NO EVENT SHALL REAL EZY'S TOTAL LIABILITY TO YOU FOR ALL
            DAMAGES. LOSSES, AND CAUSES OF ACTION OF ANY TYPE EXCEED $100.
          </p>
          <h2 className="content-header">Severability</h2>
          <p className=" p-text mb-5">
            The validity and enforceability of the remaining provisions of these Terms of Use shall not be affected in
            the event that any provision of these Terms of Use is found to be unlawful. void. or for any Other reason
            unenforceable.
          </p>
          <h2 className="content-header">Contact Information</h2>
          <p className=" p-text mb-5">
            Please contact Real Ezy Pte Ltd (incorporated and registered in the Republic of Singapore with our IJEN
            202126955R at our Registered office address Suite 22-03A International Plaza, 10 Anson Road Singapore 079903
            or support@Real-Ezy.com with any questions or concerns regarding these Terms or the Real Ezy Platforms.
          </p>
        </div>
      </div>
    </>
  )
}

export default TermsOfUse
