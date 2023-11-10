import { useGetAllStatementQuery } from '@/store'
import { getStatementName } from '@/util'
import { Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import TransactionInvoice from './TransactionInvoice'

interface TenantDetailsProps {
  landlordId: string
  propertyId: string
  data: any
}
interface ActionButtonsProps {
  data: any
  link: string
}

const ActionButtons = ({ data, link }: ActionButtonsProps) => {
  const [show, setShow] = useState(false)
  const { id, payment_status: paymentStatus, month, year } = data

  const handelOpen = () => setShow(true)
  const handelClose = () => setShow(false)

  return (
    <div className="flex gap-2">
      <Button onClick={handelOpen} variant="contained" color={paymentStatus === 'paid' ? 'secondary' : 'primary'}>
        {getStatementName(paymentStatus)}
      </Button>
      <TransactionInvoice
        show={show}
        handelClose={handelClose}
        statementId={id}
        paymentStatus={paymentStatus}
        link={link}
        month={month}
        year={year}
      />
    </div>
  )
}

const TransactionDetails = ({ landlordId, propertyId }: TenantDetailsProps) => {
  const {
    data: statementData,
    isLoading: statementLoading,
    // isError: statementError,
  } = useGetAllStatementQuery(
    { landlordId, propertyId },
    {
      skip: !landlordId && !propertyId,
    }
  )

  const columns: GridColDef[] = [
    { field: 'month', headerName: 'Month', width: 120 },
    { field: 'payment_status', headerName: 'Status', width: 120 },
    { field: 'payable_amount', headerName: 'Amount', width: 150 },
    { field: 'payment_date', headerName: 'Due Date', width: 150 },
    {
      field: 'rent_bill',
      headerName: 'Action',
      width: 120,
      renderCell: ({ row, value }) => <ActionButtons data={row} link={value} />,
    },
  ]
  return (
    <div className="h-[60vh] bg-detailsCard px-2 rounded-lg">
      <DataGrid
        rows={statementData || []}
        columns={columns}
        loading={statementLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        localeText={{
          noRowsLabel: statementLoading ? 'Loading...' : 'No Statement Found',
        }}
        className="!flex-grow-1"
      />
    </div>
  )
}

export default TransactionDetails
