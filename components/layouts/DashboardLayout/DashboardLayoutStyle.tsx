import { StoreState } from '@/types'
import { isTenant } from '@/util'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const DashboardLayoutStyle = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { type } = useSelector((state: StoreState) => state.entities.user)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) return null

  return (
    <style>
      {`
        .text-userRole {
          color: ${isTenant(type) ? '#00ADEE' : '#034EA1'};
        }

        .bg-userRole {
          background-color: ${isTenant(type) ? '#00ADEE' : '#034EA1'};
        }

        .border-userRole {
          border-color: ${isTenant(type) ? '#00ADEE' : '#034EA1'};
        }

        .fill-userRole {
          fill: ${isTenant(type) ? '#00ADEE' : '#034EA1'};
        }
        `}
    </style>
  )
}

export default DashboardLayoutStyle
