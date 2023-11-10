import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Stack } from '@mui/material'
import { Switch } from '@mui/material'
import { useGetCorporatePropertyListQuery, useGetCorporateUserListQuery } from '@/store'
import { useSession } from 'next-auth/react'
import { Box } from '@mui/material'
import Image from 'next/image'
import store, { hideLoader, hideModal, showLoader, showModal } from '@/store'
import PropertyDetails from './PropertyDetails'
import UpdateSingleProperty from './UpdateSingleProperty'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

function PublishedPropertyTable({ propertyList }: any) {
  const { data: session }: any = useSession()
  //   const {
  //     data: propertyList,
  //     isLoading: propertyLoading,
  //     refetch: refetchCorporateProperties,
  //   }: any = useGetCorporatePropertyListQuery(session?.user?.id) //session?.user?.id

  console.log('propertyList..', propertyList)

  const handleCorporatePropertyDetails = (propertyId: any) => {
    store.dispatch(
      showModal({
        open: true,
        name: 'Property Details',
        children: <PropertyDetails propertyId={propertyId} />,
        className: '',
      })
    )
  }

  const handleCorporatePropertyUpdate = (propertyId: any) => {
    store.dispatch(
      showModal({
        open: true,
        name: 'Update Property',
        children: <UpdateSingleProperty propertyId={propertyId} />,
        className: '',
      })
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property name and image</TableCell>
            <TableCell>Representative</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Property Type</TableCell>
            <TableCell>Create Date</TableCell>
            <TableCell>Update Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {propertyList?.map((item: any) => (
            <TableRow key={item?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      item?.image
                        ? item?.image
                        : 'https://rzylivebucket.s3.ap-southeast-1.amazonaws.com/dev/64ffe14a5edb9.jpg'
                    }
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  {item.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={
                      item?.representative_image
                        ? item?.representative_image
                        : 'https://dev-admin.realezyapp.com/img/noimage.png'
                    }
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  {item?.representative}
                </div>
              </TableCell>
              <TableCell>{item?.amount}</TableCell>
              <TableCell>{item?.property_type}</TableCell>
              <TableCell>{item?.create_date}</TableCell>
              <TableCell>{item?.update_date}</TableCell>
              <TableCell>{item?.status}</TableCell>
              <TableCell>
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" onClick={() => handleCorporatePropertyDetails(item.id)}>
                    Details
                  </Button>
                  <Button variant="outlined" onClick={() => handleCorporatePropertyUpdate(item.id)}>
                    Edit
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PublishedPropertyTable
