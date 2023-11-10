import { Icon, Pagination, RadioGroup, FormControlLabel, Radio } from '@mui/material' // , Button, Typography, Grid,
import React, { useEffect, useRef, useState } from 'react'
import CustomCard from '../cards/Property/Card'
import { makeStyles } from '@mui/styles'
// import { BsChevronDown } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setSliderList, updateBathroom, updateBedroom, updatePageNumber, useGetUserWishListQuery } from '@/store'
// import SelectComponent from '../select/Select'
import FilterSelect from '../select/FilterSelect'
import { useSession } from 'next-auth/react'
import FilterCardLoader from '../loader/FilterCardLoader'

// interface User {
//   id: number
//   name: string
//   email: string
// }

// const useStyles = makeStyles(() => ({
//   rotate: {
//     transition: 'transform 0.5s ease-in-out',
//   },
//   rotate180: {
//     transform: 'rotate(-180deg)',
//   },
// }))

// const users: User[] = [
//   { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
//   { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
//   { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com' },
//   { id: 4, name: 'Alice Johnson', email: 'alicejohnson@example.com' },
//   { id: 5, name: 'Charlie Brown', email: 'charliebrown@example.com' },
//   { id: 6, name: 'Lucy van Pelt', email: 'lucyvanpelt@example.com' },
//   { id: 7, name: 'Linus van Pelt', email: 'linusvanpelt@example.com' },
//   { id: 8, name: 'Snoopy Dog', email: 'snoopydog@example.com' },
//   { id: 9, name: 'Woodstock Bird', email: 'woodstockbird@example.com' },
//   { id: 10, name: 'Peppermint Patty', email: 'peppermintpatty@example.com' },
// ]

const SearchResult = ({ data, handleApplyFilter, filter }: any) => {
  // console.log('data search -----> ', data)
  const { data: session }: any = useSession()
  const { data: wishlists, isLoading } = useGetUserWishListQuery(session?.user?.id)
  // const { data: wishlists } = useSelector((state: any) => state.entities.wishlist)
  // console.log('withlistes,', wishlists)
  const wishlistids = wishlists?.map((ent: any) => ent.wish_product_id)
  // console.log("wishlistid =====>", wishlistids)
  // const classes = useStyles()
  const dispatch = useDispatch()
  // const [open, setOpen] = useState(false)
  // console.log('data ---------> ', data)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    setCurrentPage(filter.page_number)
  }, [filter.page_number])
  const totalPages =
    data?.total_data % 10 === 0 ? parseInt(`${data?.total_data / 10}`) : parseInt(`${data?.total_data / 10 + 1}`)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    dispatch(updatePageNumber(page))
    handleApplyFilter()
    // Do something with the new page number, such as fetching new data
  }
  const [bathroom, setBathroom] = useState(filter.bathroom ? filter.bathroom : 'Any')
  const [bedroom, setBedroom] = useState(filter.bedroom ? filter.bedroom : 'Any')
  const [relevance, setRelavance] = useState('Any')
  const [scroll, setScroll] = React.useState(false)

  const cardRef: any = useRef()

  const listArr = useSelector((state: any) => state.entities.slider.sliderList)

  React.useEffect(() => {
    const listArray = cardRef.current?.querySelectorAll('.filtered__slide')
    const scrollEvent = () => {
      const lists: string[] = []

      listArray.forEach((el: any) => {
        if (el?.getBoundingClientRect().top <= 740 && el?.getBoundingClientRect().top >= 0) {
          const h2Content = el.querySelector('h2')?.textContent

          if (h2Content && !listArr?.includes(h2Content)) {
            lists.push(h2Content)
          }
        }
      })

      dispatch(setSliderList([...listArr, ...lists]))
    }

    window.addEventListener('scroll', scrollEvent)

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [dispatch, listArr])

  console.log(listArr)

  return (
    // <Grid className='z-10  ' container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    // <div className=" z-10 w-full  flex flex-col items-start justify-center space-x-0 space-y-3 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0 ">
    //   {/* <Grid item xs={6.5}> */}
    //   <div className=" w-full md:w-[55%] ">
    //     <div className="flex flex-col h-[780px]">
    //       <h1 className=" text-base sm:text-xl md:text-lg xl:text-2xl font-bold">Property for Rent in Singapore</h1>
    //       <div className="mt-3 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-between">
    //         {isLoading ? (
    //           <p>Please wait...</p>
    //         ) : data?.total_data ? (
    //           <p className="pt-1">
    //             Showing{' '}
    //             <span className="text-blue-500">
    //               {(currentPage - 1) * 10 + 1}-{(currentPage - 1) * 10 + 10} Of {data ? data?.total_data : '...'}
    //             </span>
    //             &nbsp; Listings
    //           </p>
    //         ) : (
    //           <p className="pt-1">
    //             Showing <span className="text-blue-500">0-0</span>
    //             &nbsp; Listings
    //           </p>
    //         )}

    //         <div className="  overflow-hidden  flex justify-start mt-1 sm:justify-between sm:mt-0 md:justify-start md:mt-1 lg:justify-between lg:mt-0 space-x-4">
    //           {/* <Button
    //           variant="text"
    //           // ref={anchorRef2}
    //           // id="composition-button"
    //           // aria-controls={open2 ? "composition-menu" : undefined}
    //           // aria-expanded={open2 ? "true" : undefined}
    //           aria-haspopup="true"
    //           onClick={()=> setOpen((prev)=>!prev)}
    //           disableElevation
    //           // sx={{
    //           //   height: '32px',
    //           //   width: '80px',
    //           //   boxShadow: '0px 2px 8px #034EA11F',
    //           //   borderRadius: '6px',
    //           //   textTransform: 'none',
    //           // }}
    //           className=' bg-[#FFFFFF]  px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 xl:px-5 xl:py-2.5 w-[90px] h-[36px] sm:w-[90px] sm:h-[42px] md:w-[90px] md:h-[36px] xl:w-[120px] xl:h-[42px] shadow-[0px_2px_8px_#034EA11F] rounded-md flex justify-between items-center'
    //           endIcon={
    //             <Icon className={`${classes.rotate} ${open ? classes.rotate180 : ''} text-[#505050]`}>
    //               <BsChevronDown />
    //             </Icon>
    //           }
    //         >
    //           <Typography fontWeight="normal"
    //           // sx={{color: '#A1A1A1', fontSize: '18px',}}
    //           className=' text-[#505050] font-segoe  text-lg capitalize bg-[#FFFFFF] '
    //           >
    //             Bed
    //           </Typography>
    //         </Button> */}
    //           <div className="  flex justify-between md:justify-around gap-5">
    //             <FilterSelect title={'Bed'}>
    //               <RadioGroup
    //                 defaultValue={bedroom}
    //                 onChange={(event: any) => {
    //                   setBedroom(event.target.value)
    //                   dispatch(updateBedroom(event.target.value))
    //                   handleApplyFilter()
    //                 }}
    //                 className=" !pt-3 !px-6 lg:!pt-[16px] !inline-block lg:!flex"
    //                 aria-label="options"
    //                 name="options">
    //                 {['Any', 'Studio', '1', '2', '3', '4', '5+'].map((typo: string) => (
    //                   <FormControlLabel
    //                     key={typo}
    //                     style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
    //                     value={typo}
    //                     control={
    //                       <Radio
    //                         icon={
    //                           <Icon className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
    //                         }
    //                         checkedIcon={
    //                           <Icon className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
    //                         }
    //                       />
    //                     }
    //                     label={typo}
    //                   />
    //                 ))}
    //               </RadioGroup>
    //             </FilterSelect>
    //             <FilterSelect title={'Bath'}>
    //               <RadioGroup
    //                 defaultValue={bathroom}
    //                 onChange={event => {
    //                   setBathroom(event.target.value)
    //                   dispatch(updateBathroom(event.target.value))
    //                   handleApplyFilter()
    //                 }}
    //                 className=" !pt-3 !px-6 lg:!pt-[16px] !inline-block lg:!flex"
    //                 aria-label="options"
    //                 name="options">
    //                 {['Any', '1', '2', '3', '4', '5', '6'].map((typo: string) => (
    //                   <FormControlLabel
    //                     key={typo}
    //                     style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
    //                     value={typo}
    //                     control={
    //                       <Radio
    //                         icon={
    //                           <Icon className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
    //                         }
    //                         checkedIcon={
    //                           <Icon className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
    //                         }
    //                       />
    //                     }
    //                     label={typo}
    //                   />
    //                 ))}
    //               </RadioGroup>
    //             </FilterSelect>
    //             <FilterSelect title={'Relavance'}>
    //               <RadioGroup
    //                 defaultValue={relevance}
    //                 onChange={event => {
    //                   setRelavance(event.target.value)
    //                 }}
    //                 className=" !pt-3 !px-6 lg:!pt-[16px] !inline-block lg:!flex"
    //                 aria-label="options"
    //                 name="options">
    //                 {['Any', 'Orchard', 'City Hall', 'Serangoon'].map((typo: string) => (
    //                   <FormControlLabel
    //                     key={typo}
    //                     style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
    //                     value={typo}
    //                     control={
    //                       <Radio
    //                         icon={
    //                           <Icon className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
    //                         }
    //                         checkedIcon={
    //                           <Icon className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
    //                         }
    //                       />
    //                     }
    //                     label={typo}
    //                   />
    //                 ))}
    //               </RadioGroup>
    //             </FilterSelect>
    //           </div>
    //           {/* <Button
    //           variant="text"
    //           // ref={anchorRef2}
    //           // id="composition-button"
    //           // aria-controls={open2 ? "composition-menu" : undefined}
    //           // aria-expanded={open2 ? "true" : undefined}
    //           aria-haspopup="true"
    //           // onClick={handleToggle2}
    //           disableElevation
    //           // sx={{
    //           //   height: '32px',
    //           //   width: '80px',
    //           //   boxShadow: '0px 2px 8px #034EA11F',
    //           //   borderRadius: '6px',
    //           //   textTransform: 'none',
    //           // }}
    //           className=' bg-[#FFFFFF]  px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 xl:px-5 xl:py-2.5 w-[90px] h-[36px] sm:w-[90px] sm:h-[42px] md:w-[90px] md:h-[36px] xl:w-[120px] xl:h-[42px] shadow-[0px_2px_8px_#034EA11F] rounded-md flex justify-between items-center'

    //           endIcon={
    //             <Icon className={`${classes.rotate} ${open ? classes.rotate180 : ''} text-[#505050]`}>
    //               <BsChevronDown />
    //             </Icon>
    //           }
    //         >
    //           <Typography fontWeight="normal"
    //           className=' text-[#505050] font-segoe  text-lg capitalize bg-[#FFFFFF] '
    //           >
    //             Bath
    //           </Typography>
    //         </Button>
    //         <Button
    //           variant="text"
    //           // ref={anchorRef2}
    //           // id="composition-button"
    //           // aria-controls={open2 ? "composition-menu" : undefined}
    //           // aria-expanded={open2 ? "true" : undefined}
    //           aria-haspopup="true"
    //           // onClick={handleToggle2}
    //           disableElevation
    //           // sx={{
    //           //   height: '32px',
    //           //   width: '140px',
    //           //   boxShadow: '0px 2px 8px #034EA11F',
    //           //   borderRadius: '6px',
    //           //   textTransform: 'none',
    //           // }}
    //           className='bg-[#FFFFFF] px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 xl:px-5 xl:py-2.5 w-[130px] h-[36px] sm:w-[150px] sm:h-[42px] md:w-[130px] md:h-[36px] xl:w-[180px] xl:h-[42px] shadow-[0px_2px_8px_#034EA11F] rounded-md flex justify-between items-center'

    //           endIcon={
    //             <Icon className={`${classes.rotate} ${open ? classes.rotate180 : ''} text-[#505050]`}>
    //               <BsChevronDown />
    //             </Icon>
    //           }
    //         >
    //           <Typography fontWeight="normal"
    //           className=' text-[#505050] font-segoe  text-lg capitalize bg-[#FFFFFF] '
    //           >
    //             Relevance
    //           </Typography>
    //         </Button> */}
    //         </div>
    //       </div>
    //       <div
    //         className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:gap-0  md:grid-cols-1 overflow-y-auto mt-4 card-overflow-y-auto"
    //         style={{ WebkitOverflowScrolling: 'touch' }}>
    //         {isLoading ? (
    //           <div>
    //             {Array.from(new Array(6)).map((_, item) => (
    //               <FilterCardLoader key={item} />
    //             ))}
    //           </div>
    //         ) : data?.data?.length !== 0 ? (
    //           data?.data?.map((property: any, index: number) => {
    //             console.log('property 0000----> ', property)
    //             //  console.log("propertyId ----> ", property.id, "liked ----> ", wishlistids.includes(property.id))
    //             const images = JSON.parse(property.details).images.slice(1, -1).split(',')
    //             // console.log("image ---------------", images)
    //             return (
    //               <CustomCard
    //                 key={index}
    //                 images={images}
    //                 address={property.property_address}
    //                 property={property.name}
    //                 price={'$' + property.rental_amount + '/mon'}
    //                 district={property.property_city}
    //                 type={property.rental_type}
    //                 furnished={property.furnishing}
    //                 // amenities={property.property_emenity}
    //                 bedroom={property.bedroom}
    //                 bathroom={property.bathroom}
    //                 //WILL CHANGE BY REAL property
    //                 squareFeet={property.floor_size}
    //                 distance="8 mins(480m) to"
    //                 mrtStation="8 Farrer Park MRT"
    //                 label={property.sub_category_name}
    //                 propertyId={property.id}
    //                 propertyOwner={property.user_id}
    //                 wishlisted={wishlistids?.includes(property.id)}
    //                 session={session}
    //                 landlordProfilePic={
    //                   property.landlord_profile_pic
    //                     ? property.landlord_profile_pic
    //                     : 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/dev/64c4db8636dee.png'
    //                 }
    //                 landlordName={property.landlord_name}
    //               />
    //             )
    //           })
    //         ) : (
    //           <p className=" font-roboto font-medium text-xl text-center text-[#505050] mt-1">No Properties Found</p>
    //         )}

    //         {/* Pagination */}
    //         {/* <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}
    //       </div>
    //       {totalPages > 0 ? (
    //         <div className="pagination-theme mt-4">
    //           <Pagination
    //             count={totalPages}
    //             defaultPage={currentPage}
    //             onChange={(_, page: number) => {
    //               handlePageChange(page)
    //             }}
    //             variant="outlined"
    //             shape="rounded"
    //           />
    //         </div>
    //       ) : (
    //         <div className="pagination-theme mt-4">Property not found</div>
    //       )}
    //     </div>
    //   </div>
    //   {/* </Grid> */}
    //   {/* <Grid item xs={5.5}> */}
    //   <div className=" w-full  md:w-[45%] ">
    //     <iframe
    //       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63820.012837376664!2d103.82712987461109!3d1.3254347685316308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2sbd!4v1690790635991!5m2!1sen!2sbd"
    //       width="100%"
    //       height="780"
    //       style={{ border: 0 }}
    //       allowFullScreen={false}
    //       loading="lazy"
    //       referrerPolicy="no-referrer-when-downgrade"></iframe>
    //   </div>
    //   {/* </Grid> */}

    //   {/* </Grid> */}
    // </div>

    <div className=" z-10 w-full  flex flex-col items-start justify-center space-x-0 space-y-3 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0 ">
      {/* <Grid item xs={6.5}> */}
      <div className=" w-full md:w-full ">
        <div className="flex flex-col">
          <h1 className=" text-base sm:text-xl md:text-lg xl:text-2xl font-bold">Property for Rent in Singapore</h1>
          <div className="md:mt-2 flex flex-col gap-1 items-start sm:flex-row sm:items-center justify-between">
            <div>
              {isLoading ? (
                <p>Please wait...</p>
              ) : data?.total_data ? (
                <p className="pt-1">
                  Showing{' '}
                  <span className="text-blue-500">
                    {(currentPage - 1) * 10 + 1}-
                    {data?.total_data > 10 * currentPage ? (currentPage - 1) * 10 + 10 : data?.total_data} Of{' '}
                    {data ? data?.total_data : '...'}
                  </span>
                  &nbsp; Listings
                </p>
              ) : (
                <p className="pt-1">
                  Showing <span className="text-blue-500">0-0</span>
                  &nbsp; Listings
                </p>
              )}
            </div>

            <div className="  overflow-hidden  flex justify-start mt-1 sm:justify-between sm:mt-0 md:justify-start md:mt-1 lg:justify-between lg:mt-0 space-x-4">
              {/* <Button
              variant="text"
              // ref={anchorRef2}
              // id="composition-button"
              // aria-controls={open2 ? "composition-menu" : undefined}
              // aria-expanded={open2 ? "true" : undefined}
              aria-haspopup="true"
              onClick={()=> setOpen((prev)=>!prev)}
              disableElevation
              // sx={{
              //   height: '32px',
              //   width: '80px',
              //   boxShadow: '0px 2px 8px #034EA11F',
              //   borderRadius: '6px',
              //   textTransform: 'none',
              // }}
              className=' bg-[#FFFFFF]  px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 xl:px-5 xl:py-2.5 w-[90px] h-[36px] sm:w-[90px] sm:h-[42px] md:w-[90px] md:h-[36px] xl:w-[120px] xl:h-[42px] shadow-[0px_2px_8px_#034EA11F] rounded-md flex justify-between items-center'
              endIcon={
                <Icon className={`${classes.rotate} ${open ? classes.rotate180 : ''} text-[#505050]`}>
                  <BsChevronDown />
                </Icon>
              }
            >
              <Typography fontWeight="normal"
              // sx={{color: '#A1A1A1', fontSize: '18px',}}
              className=' text-[#505050] font-segoe  text-lg capitalize bg-[#FFFFFF] '
              >
                Bed
              </Typography>
            </Button> */}
              <div className="  flex justify-between md:justify-around gap-2 md:gap-4 2xl:gap-6">
                <FilterSelect title={'Bed'}>
                  <RadioGroup
                    defaultValue={bedroom}
                    onChange={(event: any) => {
                      setBedroom(event.target.value)
                      dispatch(updateBedroom(event.target.value))
                      handleApplyFilter()
                    }}
                    className=" !pt-3 !px-6 md:!pt-4 !inline-block md:!flex md:!flex-col  !gap-2 "
                    aria-label="options"
                    name="options">
                    {['Any', 'Studio', '1', '2', '3', '4', '5+'].map((typo: string) => (
                      <FormControlLabel
                        key={typo}
                        style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
                        value={typo}
                        control={
                          <Radio
                            icon={
                              <Icon className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                            }
                            checkedIcon={
                              <Icon className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                            }
                          />
                        }
                        label={typo}
                      />
                    ))}
                  </RadioGroup>
                </FilterSelect>
                <FilterSelect title={'Bath'}>
                  <RadioGroup
                    defaultValue={bathroom}
                    onChange={event => {
                      setBathroom(event.target.value)
                      dispatch(updateBathroom(event.target.value))
                      handleApplyFilter()
                    }}
                    className=" !pt-3 !px-6 lg:!pt-[16px] !inline-block md:!flex md:!flex-col !gap-2"
                    aria-label="options"
                    name="options">
                    {['Any', '1', '2', '3', '4', '5', '6'].map((typo: string) => (
                      <FormControlLabel
                        key={typo}
                        style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
                        value={typo}
                        control={
                          <Radio
                            icon={
                              <Icon className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                            }
                            checkedIcon={
                              <Icon className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                            }
                          />
                        }
                        label={typo}
                      />
                    ))}
                  </RadioGroup>
                </FilterSelect>
                <FilterSelect title={'Relavance'}>
                  <RadioGroup
                    defaultValue={relevance}
                    onChange={event => {
                      setRelavance(event.target.value)
                    }}
                    className=" !pt-3 !px-6 lg:!pt-[16px] !inline-block md:!flex md:!flex-col !gap-2"
                    aria-label="options"
                    name="options">
                    {['Any', 'Orchard', 'City Hall', 'Serangoon'].map((typo: string) => (
                      <FormControlLabel
                        key={typo}
                        style={{ width: 'auto', color: '#00ADEE', fontSize: '18px' }}
                        value={typo}
                        control={
                          <Radio
                            icon={
                              <Icon className=" !w-[25px] !h-[25px] !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                            }
                            checkedIcon={
                              <Icon className=" !w-[25px] !h-[25px] !bg-[#00ADEE] !bg-no-repeat !border-[1px] !border-solid !border-[#C2C2C2] !rounded-[50%] !opacity-100"></Icon>
                            }
                          />
                        }
                        label={typo}
                      />
                    ))}
                  </RadioGroup>
                </FilterSelect>
              </div>
              {/* <Button
              variant="text"
              // ref={anchorRef2}
              // id="composition-button"
              // aria-controls={open2 ? "composition-menu" : undefined}
              // aria-expanded={open2 ? "true" : undefined}
              aria-haspopup="true"
              // onClick={handleToggle2}
              disableElevation
              // sx={{
              //   height: '32px',
              //   width: '80px',
              //   boxShadow: '0px 2px 8px #034EA11F',
              //   borderRadius: '6px',
              //   textTransform: 'none',
              // }}
              className=' bg-[#FFFFFF]  px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 xl:px-5 xl:py-2.5 w-[90px] h-[36px] sm:w-[90px] sm:h-[42px] md:w-[90px] md:h-[36px] xl:w-[120px] xl:h-[42px] shadow-[0px_2px_8px_#034EA11F] rounded-md flex justify-between items-center'

              endIcon={
                <Icon className={`${classes.rotate} ${open ? classes.rotate180 : ''} text-[#505050]`}>
                  <BsChevronDown />
                </Icon>
              }
            >
              <Typography fontWeight="normal"
              className=' text-[#505050] font-segoe  text-lg capitalize bg-[#FFFFFF] '
              >
                Bath
              </Typography>
            </Button>
            <Button
              variant="text"
              // ref={anchorRef2}
              // id="composition-button"
              // aria-controls={open2 ? "composition-menu" : undefined}
              // aria-expanded={open2 ? "true" : undefined}
              aria-haspopup="true"
              // onClick={handleToggle2}
              disableElevation
              // sx={{
              //   height: '32px',
              //   width: '140px',
              //   boxShadow: '0px 2px 8px #034EA11F',
              //   borderRadius: '6px',
              //   textTransform: 'none',
              // }}
              className='bg-[#FFFFFF] px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 xl:px-5 xl:py-2.5 w-[130px] h-[36px] sm:w-[150px] sm:h-[42px] md:w-[130px] md:h-[36px] xl:w-[180px] xl:h-[42px] shadow-[0px_2px_8px_#034EA11F] rounded-md flex justify-between items-center'

              endIcon={
                <Icon className={`${classes.rotate} ${open ? classes.rotate180 : ''} text-[#505050]`}>
                  <BsChevronDown />
                </Icon>
              }
            >
              <Typography fontWeight="normal"
              className=' text-[#505050] font-segoe  text-lg capitalize bg-[#FFFFFF] '
              >
                Relevance
              </Typography>
            </Button> */}
            </div>
          </div>
          <div
            ref={cardRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-4  md:grid-cols-2 overflow-y-auto mt-4 card-overflow-y-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}>
            {isLoading ? (
              Array.from(new Array(6)).map((_, item) => <FilterCardLoader key={item} />)
            ) : data?.data?.length !== 0 ? (
              data?.data?.map((property: any, index: number) => {
                const images = JSON.parse(property.details).images.slice(1, -1).split(',')
                return (
                  <CustomCard
                    key={index}
                    tourId={index}
                    images={images}
                    address={property.property_address}
                    property={property.name}
                    price={'$' + parseInt(property.rental_amount) + '/mo'}
                    district={property.property_city}
                    type={property.rental_type}
                    furnished={property.furnishing}
                    // amenities={property.property_emenity}
                    bedroom={property.bedroom}
                    bathroom={property.bathroom}
                    //WILL CHANGE BY REAL property
                    squareFeet={property.floor_size}
                    distance="8 mins(480m) to"
                    mrtStation="8 Farrer Park MRT"
                    label={property.sub_category_name}
                    propertyId={property.id}
                    propertyOwner={property.user_id}
                    wishlisted={wishlistids?.includes(property.id)}
                    session={session}
                    landlordProfilePic={
                      property.landlord_profile_pic
                        ? property.landlord_profile_pic
                        : 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/dev/64c4db8636dee.png'
                    }
                    landlordName={property.landlord_name}
                    bookingStatus={property.booking_status}
                  />
                )
              })
            ) : (
              <p className=" font-roboto font-medium text-xl text-center text-[#505050] mt-1">No Properties Found</p>
            )}

            {/* Pagination */}
            {/* <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}
          </div>
          {totalPages > 0 ? (
            <div className="pagination-theme mt-4">
              <Pagination
                count={totalPages}
                defaultPage={currentPage}
                onChange={(_, page: number) => {
                  handlePageChange(page)
                }}
                variant="outlined"
                shape="rounded"
              />
            </div>
          ) : (
            <div className="pagination-theme mt-4">Property not found</div>
          )}
        </div>
      </div>
      {/* </Grid> */}
      {/* <Grid item xs={5.5}> */}
      <div className=" w-full  md:w-[45%] hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63820.012837376664!2d103.82712987461109!3d1.3254347685316308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2sbd!4v1690790635991!5m2!1sen!2sbd"
          width="100%"
          height="780"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      {/* </Grid> */}

      {/* </Grid> */}
    </div>
  )
}

export default SearchResult
