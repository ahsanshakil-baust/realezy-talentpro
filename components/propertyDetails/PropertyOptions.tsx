import React from 'react'
// import { Icon } from '../shared'
import { MultiSelect } from '@/components'
import { demoData } from '@/util/data'

// const { facilitiesOptions, amenitiesOptions, facingOptions, othersOptions } = demoData

const PropertyOptions = ({ data }: any) => {
  // const facility = [
  //   {
  //     icon: 'bath',
  //     amenitiesName: 'Air Conditioner',
  //     type: 'Available',
  //   },
  //   {
  //     icon: 'home',
  //     amenitiesName: 'Parking',
  //     type: 'Have a Garage',
  //   },
  //   {
  //     icon: 'home',
  //     amenitiesName: 'Park Area',
  //     type: 'Have a park',
  //   },
  //   {
  //     icon: 'bed',
  //     amenitiesName: 'Floor',
  //     type: 'Hardwood',
  //   },
  //   {
  //     icon: 'bath',
  //     amenitiesName: 'Laundry Area',
  //     type: 'In Unit',
  //   },
  //   {
  //     icon: 'home',
  //     amenitiesName: 'Building',
  //     type: 'Built in 2022',
  //   },
  //   {
  //     icon: 'bath',
  //     amenitiesName: 'Building',
  //     type: 'Built in 2022',
  //   },
  //   {
  //     icon: 'home',
  //     amenitiesName: 'Building',
  //     type: 'Built in 2022',
  //   },
  //   {
  //     icon: 'bed',
  //     amenitiesName: 'Air Conditioner',
  //     type: 'Available',
  //   },
  //   {
  //     icon: 'bed',
  //     amenitiesName: 'Air Conditioner',
  //     type: 'Available',
  //   },
  // ]

  //!=====================
  // const objectOftheArray = (arr: any[]) => {
  const arrayOfobjects = (arr: any) => {
    return arr?.reduce((acc: any, item: any, index: any) => {
      acc.push({ label: item, value: arr[index] })
      return acc
    }, [])
  }
  const property_emenity = arrayOfobjects(data?.product_details?.property_emenity)
  const property_facility = arrayOfobjects(data?.product_details?.property_facility)

  //!=====================
  // console.log('data', data)
  return (
    <div className="">
      <div className="mt-6">
        {data?.product_details?.property_emenity && <><h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-[#202020] font-roboto font-bold mb-4 ">
          Amenities
        </h2>
        <div className="flex flex-wrap gap-3 md:gap-6 justify-center md:justify-start ">
          <div className="">
            <MultiSelect
              name="Facilities"
              labelId="Facilities"
              className="mb-6 md:mb-7 xl:mb-9 2xl:mb-10"
              // onChangeEv={handleChangeFacility}
              isdisable={true}
              // options={[amenitiesOptions, data?.product_details?.property_emenity]}
              options={[property_emenity, data?.product_details?.property_emenity]}
            />
          </div>
        </div></>}
        <div className="py-[10px]  md:py-[18px] lg:py-[35px]" />
        <div className="mt-5">
          {data?.product_details?.property_facility && <><h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-[#202020] font-roboto font-bold mb-4 ">
            Facilities
          </h2>
          <div className="flex flex-wrap gap-3 md:gap-6 md:justify-start">
            <div className="">
              <MultiSelect
                name="Facilities"
                labelId="Facilities"
                className="mb-6 md:mb-7 xl:mb-9 2xl:mb-10"
                // onChangeEv={handleChangeFacility}
                isdisable={true}
                options={[property_facility, data?.product_details?.property_facility]}
              />
            </div>
          </div>
          </>}
        </div>
      </div>
    </div>
  )
}

export default PropertyOptions
