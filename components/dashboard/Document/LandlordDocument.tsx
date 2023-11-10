import {
  ConditionReportSvg,
  DeleteAgreementSvg,
  InventoryListSvg,
  ViewAgreementSvg,
  ViewPdf,
} from '@/components/shared'
import { useGetLandlordDocumentsQuery } from '@/store'
import { toTitleCase } from '@/util'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import classNames from 'classnames'
import { MouseEvent, useState } from 'react'
import AgreementPanle from './AgreementPanle'

interface LandlordDocumentProps {
  userId: string
  setShow:any
  show:any
  handelOpen:any
  currentAgreementId:any
  setCurrentAgreementId:any
}

interface ActionButtonsProps {
  data: any
  link: string
  setShow:any
  show:any
  handelOpen:any
  agreement:any
  setCurrentAgreementId:any
}



const ActionButtons = ({ data, link,show,setShow,handelOpen ,agreement,setCurrentAgreementId}: ActionButtonsProps) => {
  const options = [
    {
      label: 'Edit Agreement',
      param:'edit_agreement',
      Icon: () => <ViewAgreementSvg className="w-5 h-5 mr-3" />,
      link:  agreement.doc_url
    },
    {
      label: 'Cancel Agreement',
      param:'cancel_agreement',
      Icon: () => <DeleteAgreementSvg className="w-5 h-5 mr-3" />,
      link:  'https://www.google.com/'
    },
    {
      label: 'Inventory List',
      param:'inventory_list',
      Icon: () => <InventoryListSvg className="w-5 h-5 mr-3" />,
      link:  'https://www.google.com/'
    },
    {
      label: 'Condition Report',
      param:'condition_report',
      Icon: () => <ConditionReportSvg className="w-5 h-5 mr-3" />,
      link:  'https://www.google.com/'
    },
    {
      label: 'LCH Certificate Doc',
      param:'lch_certificate_doc',
      Icon: () => <ConditionReportSvg className="w-5 h-5 mr-3" />,
      link:  agreement.insurance_cert_url
    },
  ]
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)
  const propertyName = data.property_name
  
  const handleActionButton =(label:any)=>{
      console.log('label',label)
  }

  const CustomHandelOpen =(id:any)=>{
    setCurrentAgreementId(id)
    handelOpen()
  }


  return (
    <div className="flex gap-2">
      <Button type='button' onClick={()=>CustomHandelOpen(agreement.id)} variant="contained">
        Details
      </Button>
      {/* <ViewPdf
        show={show}
        handelClose={handelClose}
        name="Agreement"
        link={link}
        fileName={`Agreement_of_${propertyName}.pdf`}
      /> */}
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
          options.map(({ label, Icon,param ,link}) => (
            <MenuItem key={label} onClick={()=>handleActionButton(param)} className="text-sm">
              <a className='flex items-center ' href={link} target='_blank' rel="noreferrer">
                <Icon />
                {label}
              </a>
            </MenuItem>
          ))}
      </Menu>
    </div>
  )
}

const LandlordDocument = ({ userId,setShow,show,handelOpen,setCurrentAgreementId,currentAgreementId }: LandlordDocumentProps) => {
  const {
    data: agreements,
    isLoading,
    // isError,
  } = useGetLandlordDocumentsQuery(userId, {
    skip: !userId,
  })
  console.log("🚀 ~ file: LandlordDocument.tsx:115 ~ LandlordDocument ~ agreements:", agreements)
  

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
      renderCell: ({ row, value }) => <ActionButtons setCurrentAgreementId={setCurrentAgreementId}  agreement={row} handelOpen={handelOpen} setShow={setShow} show={show}  data={row} link={value} />,
    },
  ]

  return (
    <div className="bg-detailsCard py-8 px-12 rounded-3xl min-h-[70vh] flex flex-col">
      {
        show &&  <h1 className="content-header mb-7">
        All Agreements {agreements ? `(${agreements.length})` : ''}
      </h1>
      }
     
      {
        show ? <DataGrid
        sx={{
          '& .MuiDataGrid-withBorderColor:focus':{
            outline:'none'
          }
        }}
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
        /> : <AgreementPanle currentAgreementId={currentAgreementId}/>
      }
      
      
    </div>
  )
}
export default LandlordDocument
