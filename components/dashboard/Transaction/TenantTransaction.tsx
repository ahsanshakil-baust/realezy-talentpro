import { ViewPdf } from '@/components/shared'
import config from '@/config'
import { showModal, useGetTenantTransactionListQuery } from '@/store'
import { StoreThunkDispatch } from '@/types'
import { Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import TransactionDetails from './TransactionDetails'

interface TenantTransactionProps {
  userId: string
}
interface ActionButtonsProps {
  data: any
}

const ActionButtons = ({ data }: ActionButtonsProps) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch<StoreThunkDispatch>()
  const landlordId = data.product_owner_id
  const propertyId = data.product_id
  const propertyName = data.product_name
  const agreementId = data.agreements[0].agreement_id
  const link = `${config.ADMIN_URL}/agreements/${agreementId}/agreement`

  const handelOpen = () => setShow(true)
  const handelClose = () => setShow(false)

  const handelDetails = () => {
    dispatch(
      showModal({
        open: true,
        name: 'Transaction Details',
        children: <TransactionDetails landlordId={landlordId} propertyId={propertyId} data={data} />,
      })
    )
  }
  return (
    <div className="flex gap-2">
      <Button onClick={handelOpen} variant="outlined">
        Statements
      </Button>
      <ViewPdf
        show={show}
        handelClose={handelClose}
        name="Statements"
        link={link}
        fileName={`Statements_of_${propertyName}.pdf`}
      />
      <Button variant="contained" onClick={handelDetails}>
        Details
      </Button>
    </div>
  )
}

const TenantTransaction = ({ userId }: TenantTransactionProps) => {
  const {
    data: transactionData,
    isLoading: transactionLoading,
    // isError: transactionError,
  } = useGetTenantTransactionListQuery(userId, {
    skip: !userId,
  })

  if (!userId) return null

  const columns: GridColDef[] = [
    {
      field: 'product_owner_name',
      headerName: 'Landlord Name',
      flex: 1,
      renderCell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <img src={row.product_owner_image} alt="" className="w-7 h-7 rounded-full object-cover" />
          {value}
        </div>
      ),
    },
    { field: 'product_name', headerName: 'Property Name', flex: 1 },
    { field: 'subcategory', headerName: 'Property Type', width: 130 },
    { field: 'rental_type', headerName: 'Rental Type', width: 130 },
    { field: 'period', headerName: 'Period', width: 120 },
    { field: 'booking_start_date', headerName: 'Start Date', width: 150 },
    {
      field: 'action',
      headerName: '',
      width: 220,
      renderCell: ({ row }) => <ActionButtons data={row} />,
    },
  ]
  return (
    <div className="bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh] flex flex-col">
      <h1 className="content-header mb-7">
        {transactionData ? `All Transaction (${transactionData.length})` : 'All Transaction'}
      </h1>
      <DataGrid
        rows={transactionData || []}
        columns={columns}
        loading={transactionLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        localeText={{
          noRowsLabel: transactionLoading ? 'Loading...' : 'No Transaction Found',
        }}
        className="!flex-grow-1 content-title"
      />
    </div>
  )
}
export default TenantTransaction
