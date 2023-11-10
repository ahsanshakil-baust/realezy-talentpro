// import { useRouter } from 'next/router'
import { useState } from 'react'

export interface ISearch {}

const Search: React.FC<ISearch> = () => {
  // const router = useRouter()
  // const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <section className="relative z-20 overflow-hidden bg-[#ffffff] pt-0 md:pt-[0px] lg:pt-[10px] ">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-0">
            {/*-*/}
            <div className="m-0">
              <ul className="w-full rounded-lg mt-2 mb-3 text-[#034EA1] capitalize">
                <li>
                  <a
                    className="pointer-events-none w-fill md:flex block wow fadeInUp rounded-[20px] bg-[#F1F7FF] px-10 pt-6 pb-6 mb-5"
                    style={{ visibility: 'visible' }}
                  >
                    <div className="relative h-auto md:w-[100px] w-full items-center justify-center rounded-lg bg-transparent mr-5 text-center">
                      <img
                        src="download/real-estate-icon.png"
                        alt="image"
                        className="w-[100px] h-auto md:mx-0 mx-auto"
                      />
                    </div>
                    <div className="ml-2 w-[90%] md:text-left text-center">
                      <h3 className="mb-3 text-xl font-bold text-[#034EA1] text-[20px]">Do-It-Yourself Rental App </h3>
                      <p className="mt-0 text-black text-md font-normal">
                        RealEzy app provides you an easy, seamless alternative approach to complete your rental process;
                        from tenant selection to tenancy agreement completion; giving you freedom and control in
                        defining your own terms.{' '}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    className="pointer-events-none w-fill md:flex block wow fadeInUp rounded-[20px] bg-[#F1F7FF] px-10 pt-6 pb-6 mb-5"
                    style={{ visibility: 'visible' }}
                  >
                    <div className="relative h-auto md:w-[100px] w-full items-center justify-center rounded-lg bg-transparent mr-5 text-center">
                      <img src="download/no-agent-icon.png" alt="image" className="w-[100px] h-auto md:mx-0 mx-auto" />
                    </div>
                    <div className="ml-2 w-[90%] md:text-left text-center">
                      <h3 className="mb-3 text-xl font-bold text-[#034EA1] text-[20px]">Zero Agent Fee </h3>
                      <p className="mt-0 text-black text-md font-normal">
                        {' '}
                        No agent involved, allowing you to deal directly with your prospective tenants, and saving you
                        significant cost.{' '}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    className="pointer-events-none w-fill md:flex block wow fadeInUp rounded-[20px] bg-[#F1F7FF] px-10 pt-6 pb-6 mb-5"
                    style={{ visibility: 'visible' }}
                  >
                    <div className=" relative h-auto md:w-[100px] w-full items-center justify-center rounded-lg bg-transparent mr-5 text-center">
                      <img
                        src="download/reputation-icon.png"
                        alt="image"
                        className="w-[100px] h-auto md:mx-0 mx-auto"
                      />
                    </div>
                    <div className="ml-2 w-[90%] md:text-left text-center">
                      <h3 className="mb-3 text-xl font-bold text-[#034EA1] text-[20px]">Quality Tenant </h3>
                      <p className="mt-0 text-black text-md font-normal">
                        Prospective Tenants are verified with RealEzy credit verification process, reducing your risk of
                        default rental.
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    className="pointer-events-none w-fill md:flex block wow fadeInUp rounded-[20px] bg-[#F1F7FF] px-10 pt-6 pb-6 mb-5"
                    style={{ visibility: 'visible' }}
                  >
                    <div className=" relative h-auto md:w-[100px] w-full items-center justify-center rounded-lg bg-transparent mr-5 text-center">
                      <img src="download/insurance-icon.png" alt="image" className="w-[100px] h-auto md:mx-0 mx-auto" />
                    </div>
                    <div className="ml-2 w-[90%] md:text-left text-center">
                      <h3 className="mb-3 text-xl font-bold text-[#034EA1] text-[20px]">
                        Comprehensive Landlord Protection at Low and Affordable Premium{' '}
                      </h3>
                      <p className="mt-0 text-black text-md font-normal">
                        {' '}
                        Providing you rental insurance protection policy in excess of the usual rental deposit amount at
                        a fraction of the conventional agent commission rate – benefits include loss of rental up to 2
                        months’ rental, damage to household content or fixtures reinstatement claims of up to
                        SGD150,000, claim of legal and clean-up cost. With RealEzy and our partner LCH Insurance Brokers
                        Pte. Ltd., you will be supported and assisted with your claim process.{' '}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    className="pointer-events-none w-fill md:flex block wow fadeInUp rounded-[20px] bg-[#F1F7FF] px-10 pt-6 pb-6 mb-0"
                    style={{ visibility: 'visible' }}
                  >
                    <div className=" relative h-auto md:w-[100px] w-full items-center justify-center rounded-lg bg-transparent mr-5 text-center">
                      <img
                        src="download/management-icon.png"
                        alt="image"
                        className="w-[100px] h-auto md:mx-0 mx-auto"
                      />
                    </div>
                    <div className="ml-2 w-[90%] md:text-left text-center">
                      <h3 className="mb-3 text-xl font-bold text-[#034EA1] text-[20px]">
                        {' '}
                        Landlord Property Management Services
                      </h3>
                      <p className="mt-0 text-black text-md font-normal">
                        {' '}
                        Easy access to RealEzy Customer Care Support Team, your primary contact throughout your rental
                        period, supporting tenant’s maintenance request, tenant eviction process, rental collection/
                        reminders and claims.{' '}
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <form
    //   className="flex flex-col items-center gap-y-5"
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     router.push(`/results?search=${searchTerm}`);
    //   }}
    // >
    //   <input
    //     type="text"
    //     className="rounded-full border-2 w-5/6 sm:w-128 h-12 px-3"
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //   />
    //   <div className="space-x-3">
    //     <button type="submit" className="btn-primary">
    //       Search
    //     </button>
    //     <button
    //       onClick={() => alert('FEATURE COMING SOON!')}
    //       className="btn-primary"
    //     >
    //       I&apos;m Feeling Lucky
    //     </button>
    //   </div>
    // </form>
  )
}

export default Search
