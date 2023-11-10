// import { Grid } from '@mui/material'
import moment from 'moment'
import React from 'react'

const Information = ({ data }: any) => {
  // console.log("🚀 ~ file: Information.tsx:5 ~ Information ~ data:", data)
  return (
    <div className="">
      <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-[#202020] font-roboto font-bold pb-4">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl">Rental Type</td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.rental_type}
                </td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl w-3/6">
                  Property Type
                </td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.subcategory}
                </td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl w-3/6">
                  Unite Type
                </td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.unit_type}
                </td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl w-3/6">
                  Available From
                </td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {moment(data?.product_details?.available_from?.split(' ')[0]).format("DD MMM, YYYY")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl w-3/6">
                  Furnishing
                </td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.furnishing}
                </td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl">Level</td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.floor_level}
                </td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl">Min Lease</td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">{data?.rent_term ? `${data?.rent_term} ${data?.rent_term == '1' ? 'Year' : 'Years'}` : "Not mentioned"}</td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl">View</td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.facing}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl w-3/6">
                  Bed Room
                </td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.bedroom}
                </td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl">Bath Room</td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.bathroom}
                </td>
              </tr>
              <tr>
                <td className="text-[#00ADEE] font-medium font-roboto text-base md:text-lg xl:text-xl">Floor Size</td>
                <td className="text-[#202020] font-medium font-roboto text-base md:text-lg xl:text-xl">
                  {data?.product_details?.floor_size ? `${data?.product_details?.floor_size} Sq Ft` : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Information
