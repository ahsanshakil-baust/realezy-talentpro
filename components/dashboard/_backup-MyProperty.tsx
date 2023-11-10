// import { MyPropertyCard } from '@/components'
// import { useGetAllPropertyQuery } from '@/store'
// import { useSession } from 'next-auth/react'

// import React, { useEffect, useState } from 'react'
// import CardLoader from '../loader/CardLoader'
// // import EditProperty from '../shared/PropertyCard/EditProperty'
// import EditPropertyV2 from '../shared/PropertyCard/EditPropertyV2'
// import router, { useRouter } from 'next/router'

// //!===========================
// import { hideLoader, showLoader, useDeletePropertyMutation } from '@/store'
// import { useDispatch } from 'react-redux'
// import { StoreThunkDispatch } from '@/types'
// import { toast } from 'react-toastify'
// //!===========================

// const MyProperty = () => {
//   //!===============
//   const dispatch = useDispatch<StoreThunkDispatch>()
//   const [deleteProperty] = useDeletePropertyMutation()
//   const [availablProperties, setAvailablProperties] = useState([])
//   //!===============
//   // const router = useRouter()
//   const { data: session }: any = useSession()

//   const userId = session?.user?.id

//   const {
//     data: properties,
//     isLoading,
//     // refetch: refetchUseGetAllPropertyQuery,
//   } = useGetAllPropertyQuery(userId, {
//     skip: !userId,
//   })
//   //!==============

//   useEffect(() => {
//     setAvailablProperties(properties)
//   }, [properties])
//   //!==============

//   // console.log('properties', properties)
//   const [showEditProperty, setShowEditProperty] = useState(true)
//   const [isPropertyHeadingVisible, setMyPropertiesHeadingVisible] = useState(true)

//   const editProperty = () => {
//     setMyPropertiesHeadingVisible(false)
//     setShowEditProperty(false)
//   }
//   // const deleteProperty = () => {
//   //   alert('deleteProperty')
//   // }

//   const [singlePropertyInfo, setSinglePropertyInfo] = useState()

//   const handleActionButton = async (actionLabel: any, propertyId: any) => {
//     if (actionLabel.toLowerCase() === 'edit') {
//       const object = properties.find((obj: any) => obj.id === propertyId)
//       setSinglePropertyInfo(object)
//       editProperty()
//       // router.push({
//       // pathname: '/add-property-v3',
//       //   query: object,
//       // }, '/edit-property')
//     } else if (actionLabel.toLowerCase() === 'delete') {
//       //!===============
//       try {
//         // dispatch(showLoader('Adding Property...'))
//         // const indexToRemove = properties.findIndex((item: any) => item.id === propertyId)
//         const updatedProperties = availablProperties.filter((item: any) => item.id !== propertyId)

//         alert('Are you sure you want to delete this property?')

//         const productresp: any = await deleteProperty(propertyId)
//         if (productresp?.data?.status == 201) {
//           setAvailablProperties(updatedProperties)
//           toast.success('Property deleted')
//           // dispatch(hideLoader())
//         } else {
//           // dispatch(hideLoader())
//           toast.error('Error: Something went wrong')
//         }
//       } catch (e) {
//         console.log(e)
//       }
//     }
//     //!===============
//   }

//   if (!userId) return null

//   return (
//     <div className="db-page-layout">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <svg
//             className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10 fill-primary"
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="26"
//             viewBox="0 0 26 26">
//             <g id="Icon" transform="translate(-1.25 -1.25)">
//               <path
//                 id="Path_23538"
//                 data-name="Path 23538"
//                 d="M26.343,21.25H2.157a.907.907,0,1,0,0,1.814H26.343a.907.907,0,0,0,0-1.814Z"
//                 transform="translate(0 4.186)"
//                 fillRule="evenodd"
//               />
//               <path
//                 id="Path_23539"
//                 data-name="Path 23539"
//                 d="M7.18,27.25a.907.907,0,0,1-.907-.907v-9.07a.907.907,0,0,1,.907-.907h6.047a.907.907,0,0,1,.907.907v9.07a.907.907,0,0,1-.907.907H16.25a.907.907,0,0,0,.907-.907V2.157a.907.907,0,0,0-.907-.907H4.157a.907.907,0,0,0-.907.907V26.343a.907.907,0,0,0,.907.907Zm5.14-9.07v7.256H8.087V18.18ZM8.692,13.645V12.436a.907.907,0,1,0-1.814,0v1.209a.907.907,0,1,0,1.814,0Zm4.837,0V12.436a.907.907,0,1,0-1.814,0v1.209a.907.907,0,0,0,1.814,0Zm0-6.047V6.39a.907.907,0,1,0-1.814,0V7.6a.907.907,0,1,0,1.814,0Zm-4.837,0V6.39a.907.907,0,1,0-1.814,0V7.6a.907.907,0,1,0,1.814,0Z"
//                 transform="translate(0.419)"
//                 fillRule="evenodd"
//               />
//               <path
//                 id="Path_23540"
//                 data-name="Path 23540"
//                 d="M15.785,5.25h5.14a.907.907,0,0,1,.907.907V25.506a.907.907,0,0,1-.907.907H15.582a2.108,2.108,0,0,0,.2-.907ZM17.6,16.436v1.209a.907.907,0,1,0,1.814,0V16.436a.907.907,0,0,0-1.814,0ZM19.413,11.6V10.39a.907.907,0,0,0-1.814,0V11.6a.907.907,0,1,0,1.814,0Z"
//                 transform="translate(3 0.837)"
//                 fillRule="evenodd"
//               />
//             </g>
//           </svg>
//           <h2 className="text-xl leading-4 md:text-2xl md:leading-5 xl:text-3xl xl:leading-6 font-medium font-roboto text-primary">
//             My Property
//           </h2>
//         </div>
//       </div>

//       <div className="w-full bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh]">
//         {isPropertyHeadingVisible && (
//           <h1 className="text-2xl text-textValueColor font-bold mb-7">
//             {properties ? `All Properties (${availablProperties?.length})` : 'All Properties'}
//           </h1>
//         )}
//         <button
//           className="bg-primary px-4 cursor-pointer text-white py-2"
//           onClick={() => {
//             setMyPropertiesHeadingVisible(true)
//             setShowEditProperty(true)
//           }}>
//           Back
//         </button>
//         {showEditProperty ? (
//           <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-7">
//             {isLoading ? (
//               Array.from(new Array(6)).map((_, item) => <CardLoader key={item} />)
//             ) : availablProperties ? (
//               availablProperties?.map((property: any) => (
//                 <MyPropertyCard
//                   images={property.details.images}
//                   propertyName={property.name}
//                   price={property.price}
//                   type={property.details.subcategory}
//                   rentalType={property.rental_type}
//                   bedroom={property.bedroom}
//                   bathroom={property.bathroom}
//                   status={property.status}
//                   squareFeet={property.details.floor_size}
//                   id={property.id}
//                   key={property.id}
//                   isApproved={property.is_approved}
//                   ownershipEligibility={property.ownership_eligibility}
//                   onActionButton={handleActionButton}
//                 />
//               ))
//             ) : (
//               <h1 className="font-roboto font-medium text-xl">No property found</h1>
//             )}
//           </div>
//         ) : (
//           <EditPropertyV2 singlePropertyInfo={singlePropertyInfo} />
//         )}
//       </div>
//     </div>
//   )
// }

// export default MyProperty


import React from 'react'

const MyPropertyBk = () => {
  return (
    <div>_backup-MyProperty</div>
  )
}

export default MyPropertyBk