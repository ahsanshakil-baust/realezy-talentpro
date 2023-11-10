import { PrimaryLayout } from '@/components'
import { NextPageWithLayout } from '../page'
import Searchoptions from '@/components/filter/Searchoptions'
import { useEffect, useRef } from 'react'
import { useFilterMutation } from '@/store'
import SearchResult from '@/components/filter/SearchResult'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { updatePropertyType } from '@/store'
import FilterCardLoader from '@/components/loader/FilterCardLoader'

const FilterPage: NextPageWithLayout = () => {
  const dispatch = useDispatch()
  const [searchFilter, { data, isLoading }] = useFilterMutation() //  isError, isLoading,
  let filter = useSelector((state: any) => state.entities.filter)

  console.log('filter', filter) //!===========================

  const { query } = useRouter()

  const subCategory = Array.isArray(query?.sub_category)
    ? query.sub_category.join(',') // Join array elements with a comma or another delimiter
    : query?.sub_category ?? 'Any'

  useEffect(() => {
    searchFilter({ ...filter, ...query })
    // dispatch(updatePropertyType(subCategory))
    console.log('useEffect', filter)
    // searchFilter({ ...filter })
  }, [query, searchFilter])
  //!======================

  // const isInitialRender = useRef(true)

  // useEffect(() => {
  //   if (isInitialRender.current) {
  //     // Do nothing during initial render
  //     isInitialRender.current = false
  //   } else {
  //     searchFilter({ ...filter })
  //     console.log('useEffect..1', filter)
  //   }
  // }, [filter, searchFilter])

  // useEffect(() => {
  //   searchFilter({ ...filter })
  //   console.log('useEffect..1', filter)
  //   // searchFilter({ ...filter })
  // }, [filter, searchFilter])
  //!======================

  const handleApplyFilter = () => {
    // searchFilter({ ...filter, ...query })
    searchFilter({ ...filter })
  }

  return (
    <>
      <section className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] bg-[#F1F7FF] flex flex-col items-center mt-[85px] shadow-md">
        <div className="w-[90%] md:w-full m-auto ">
          <div className="relative ">
            <section className="overflow-hidden  my-4 w-full flex items-center justify-between">
              <Searchoptions handleApplyFilter={handleApplyFilter} filter={filter} subCategory={subCategory} />
            </section>
          </div>
        </div>
      </section>

      <section className="2xl:px-[140px] xl:px-[105px] lg:px-[93.33px] md:px-[74.67px] bg-[#F1F7FF] ">
        <div className=" w-[90%] md:w-full m-auto">
          <div className="relative">
            {isLoading ? (
              <div
                className=" grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-4  md:grid-cols-2 overflow-y-auto mt-0.5 py-4 card-overflow-y-auto"
                style={{ WebkitOverflowScrolling: 'touch' }}>
                {Array.from(new Array(6)).map((_, item) => (
                  <FilterCardLoader key={item} />
                ))}
              </div>
            ) : (
              <section className="overflow-hidden mt-0.5 py-4 w-full flex items-center justify-between">
                <SearchResult data={data} handleApplyFilter={handleApplyFilter} filter={filter} />
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default FilterPage

FilterPage.getLayout = page => <PrimaryLayout>{page}</PrimaryLayout>
