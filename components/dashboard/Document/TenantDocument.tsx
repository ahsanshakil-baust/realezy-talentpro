import {
  ConditionReportSvg,
  DeleteAgreementSvg,
  InventoryListSvg,
  ViewAgreementSvg,
  ViewPdf,
} from '@/components/shared'
import { useGetTenantDocumentsQuery } from '@/store'
import { toTitleCase } from '@/util'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import classNames from 'classnames'
import { MouseEvent, useState } from 'react'

interface TenantDocumentProps {
  userId: string
}

interface ActionButtonsProps {
  data: any
  link: string
}

const options = [
  {
    label: 'View Agreement',
    Icon: () => <ViewAgreementSvg className="w-5 h-5 mr-3" />,
  },
  {
    label: 'Delete Agreement',
    Icon: () => <DeleteAgreementSvg className="w-5 h-5 mr-3" />,
  },
  {
    label: 'Inventory List',
    Icon: () => <InventoryListSvg className="w-5 h-5 mr-3" />,
  },
  {
    label: 'Condition Report',
    Icon: () => <ConditionReportSvg className="w-5 h-5 mr-3" />,
  },
]

const ActionButtons = ({ data, link }: ActionButtonsProps) => {
  const [show, setShow] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const propertyName = data.property_name

  const handelOpen = () => setShow(true)
  const handelClose = () => setShow(false)

  return (
    <div className="flex gap-2">
      <Button onClick={handelOpen} variant="outlined">
        Details
      </Button>
      <ViewPdf
        show={show}
        handelClose={handelClose}
        name="Agreement"
        link={link}
        fileName={`Agreement_of_${propertyName}.pdf`}
      />
      <IconButton
        aria-label="more"
        id="my-property-menu-button"
        aria-controls={open ? 'my-property-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="text-black">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="my-property-menu"
        MenuListProps={{
          'aria-labelledby': 'my-property-menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        {anchorEl &&
          options.map(({ label, Icon }) => (
            <MenuItem key={label} onClick={handleClose} className="text-sm">
              <>
                <Icon />
                {label}
              </>
            </MenuItem>
          ))}
      </Menu>
    </div>
  )
}

const TenantDocument = ({ userId }: TenantDocumentProps) => {
  const {
    data: agreements,
    isLoading,
    // isError,
  } = useGetTenantDocumentsQuery(userId, {
    skip: !userId,
  })

  if (!userId) return null

  const columns: GridColDef[] = [
    {
      field: 'tenant_name',
      headerName: 'Tenant Name',
      flex: 1,
      renderCell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <img src={row.tenant_profile_picture} alt="" className="w-7 h-7 rounded-full object-cover" />
          {value}
        </div>
      ),
    },
    { field: 'property_name', headerName: 'Property Name', flex: 1 },
    { field: 'subcategory', headerName: 'Property Type', width: 100 },
    { field: 'rental_type', headerName: 'Rental Type', width: 100 },
    { field: 'period', headerName: 'Period', width: 80 },
    { field: 'start_date', headerName: 'Start Date', width: 150 },
    {
      field: 'agreement_status',
      headerName: 'Status',
      width: 150,
      renderCell: ({ value }) => (
        <p
          className={classNames({
            'text-primary': value.toLowerCase().includes('done'),
            'text-forestGreen': value.toLowerCase().includes('draft'),
            'text-gamboge': value.toLowerCase().includes('await'),
          })}>
          {toTitleCase(value)}
        </p>
      ),
    },
    {
      field: 'doc_url',
      headerName: '',
      width: 140,
      renderCell: ({ row, value }) => <ActionButtons data={row} link={value} />,
    },
  ]

  return (
    <div className="bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh] flex flex-col">
      <h1 className="content-header mb-7">
        All Agreements {agreements ? `(${agreements.length})` : ''}
      </h1>
      <DataGrid
        rows={agreements || []}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        localeText={{
          noRowsLabel: isLoading ? 'Loading...' : 'No Agreements Found',
        }}
        className="!flex-grow-1 content-title"
      />
    </div>
  )
}
export default TenantDocument
