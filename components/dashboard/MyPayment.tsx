import { StoreState } from '@/types'
// import { isTenant } from '@/util'
// import { type } from 'os'
import React from 'react'
import { useSelector } from 'react-redux'
// import paymentIcon from '@/public/payment_icon.svg'
// import edit from '@/public/edit.svg'
// import Image from 'next/image'
// import { Button } from '@mui/material'

const MyPayment = () => {
  // const { type } = useSelector((state: StoreState) => state.entities.user)

  return (
    <>
      <div className="p-5 md:p-9">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10 fill-[#034EA1]"
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="22"
              viewBox="0 0 26 22">
              <path
                id="Path_23530"
                data-name="Path 23530"
                d="M0,5.667A3.477,3.477,0,0,1,3.25,2h19.5A3.477,3.477,0,0,1,26,5.667V20.333A3.477,3.477,0,0,1,22.75,24H3.25A3.477,3.477,0,0,1,0,20.333ZM4.063,7.5a.869.869,0,0,0-.812.917V10.25a.869.869,0,0,0,.813.917h3.25a.869.869,0,0,0,.813-.917V8.417A.869.869,0,0,0,7.313,7.5Zm0,5.5a.923.923,0,0,0,0,1.833h8.125a.923.923,0,0,0,0-1.833Zm0,3.667a.923.923,0,0,0,0,1.833H5.688a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Zm4.875,0a.923.923,0,0,0,0,1.833h1.625a.923.923,0,0,0,0-1.833Z"
                transform="translate(0 -2)"
                // fill="#505050"
              />
            </svg>{' '}
            <h2 className=" dashboard-title font-roboto text-[#034EA1]">
              Payment Info
            </h2>{' '}
          </div>
          <div>
            <button className=" db-button bg-[#034EA1]">
              {' '}
              {/* <Image src={edit} width={'15%'} height={'15%'} />  */}
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25.999" viewBox="0 0 26 25.999">
                <g id="edit" transform="translate(0 -0.001)">
                  <path
                    id="Path_21131"
                    data-name="Path 21131"
                    d="M20.992,12.839a1.1,1.1,0,0,0-1.1,1.1v8.839a1.106,1.106,0,0,1-1.1,1.1H3.315a1.106,1.106,0,0,1-1.1-1.1V7.315a1.106,1.106,0,0,1,1.1-1.1h8.839a1.1,1.1,0,0,0,0-2.21H3.315A3.319,3.319,0,0,0,0,7.315V22.782A3.319,3.319,0,0,0,3.315,26.1H18.782A3.319,3.319,0,0,0,22.1,22.782V13.944A1.1,1.1,0,0,0,20.992,12.839Z"
                    transform="translate(0 -0.097)"
                    fill="#fff"
                  />
                  <path
                    id="Path_21132"
                    data-name="Path 21132"
                    d="M9.633,13.471a.659.659,0,0,0-.178.332l-.92,4.6a.65.65,0,0,0,.639.778.615.615,0,0,0,.128-.013l4.6-.92a.647.647,0,0,0,.333-.178L24.527,7.776l-4.6-4.6Z"
                    transform="translate(-2.184 0.481)"
                    fill="#fff"
                  />
                  <path
                    id="Path_21133"
                    data-name="Path 21133"
                    d="M24.749.952a3.255,3.255,0,0,0-4.6,0l-1.8,1.8,4.6,4.6,1.8-1.8a3.252,3.252,0,0,0,0-4.6Z"
                    transform="translate(0.299)"
                    fill="#fff"
                  />
                </g>
              </svg>
              Update
            </button>
          </div>
        </div>
        
        {/* payment */}
        <div className="md:flex  gap-3 md:gap-4 xl:gap-5 ">
          <div className="w-full  bg-[#F1F7FF] py-4 md:py-6 xl:py-8 px-4 md:px-7 xl:px-11 border border-solid border-[#D4E8FF] rounded-[10px] ">
            <div className="w-full md:w-2/3 bg-[#F1F7FF] py-3 md:py-5 xl:py-7 px-4 md:px-7 xl:px-11  border border-solid border-[#D4E8FF] rounded-[10px] ">
              <div>
                <div>
                  <h2 className=" content-header ">
                    Payment Details
                  </h2>
                  <p className="payment-content-title ">
                    You have not set up any payment method yet.
                  </p>
                  <p className="text-[#A1A1A1] mb-4 md:mb-5 xl:mb-7 font-normal font-roboto text-sm md:text-[0.8rem] 2xl:text-base/tight">
                    Tell us how you want to receive your funds. It may take up to some days to activate your payment
                    method.
                  </p>
                </div>

                <div className="w-full flex justify-between gap-0">
                  <div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Payment Method</p>
                      <p className=" db-content capitalize ">
                        Ex: Bank Transfer
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Account Name
                      </p>
                      <p className=" capitalize db-content">
                        Ex: Clarissa Tan Hossain
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Account Number
                      </p>
                      <p className="capitalize db-content">
                        EX: A/C 968544788411
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Branch</p>
                        <p className="capitalize db-content">
                        Ex: Anson Road
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0 mb-[22px] md:mb-[32px] xl:mb-[50px]">
                    <p className="payment-content-title">
                        Swift Code
                      </p>
                      <p className="capitalize db-content">
                        Ex: 123 654
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0">
                    <h2 className="content-header">
                        Bank Statement
                      </h2>
                      <p className=" !text-[#505050] !leading-none db-content ">
                        You have not add any bank statement yet.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Bank Name
                      </p>
                      <p className="capitalize db-content">
                        Ex: Standard Chartered Singapore
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Account Type
                      </p>
                      <p className="capitalize db-content">
                        Ex: Personal Account
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Bank Code
                      </p>
                      <p className="capitalize db-content">
                        EX: 9685
                      </p>
                    </div>
                    <div className=" flex flex-col gap-0 mb-2 md:mb-3 xl:mb-5">
                    <p className="payment-content-title">
                        Branch Code
                      </p>
                      <p className="capitalize db-content">
                        Ex: 123456
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPayment
